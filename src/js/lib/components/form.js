import $ from "../core";
import Store from "../modules/store";

$.prototype.form = function (options = {}) {
    const {
        fields = [],
        method = "POST",
        action = "/",
        submitLabel = "Отправить",
    } = options;

    const validators = {
        email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        phone: (val) => /^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/.test(val),
    };

    const applyPhoneMask = (input) => {
        input.addEventListener("input", () => {
            let value = input.value.replace(/\D/g, "");
            if (value.startsWith("8")) value = "7" + value.slice(1);
            if (!value.startsWith("7")) value = "7" + value;
            value = value.slice(0, 11);

            let result = "+7";
            if (value.length > 1) result += "-" + value.slice(1, 4);
            if (value.length > 4) result += "-" + value.slice(4, 7);
            if (value.length > 7) result += "-" + value.slice(7, 9);
            if (value.length > 9) result += "-" + value.slice(9, 11);

            input.value = result;
        });

        input.addEventListener("keydown", (e) => {
            if (
                e.key.match(/[^0-9]/) &&
                ![
                    "Backspace",
                    "ArrowLeft",
                    "ArrowRight",
                    "Delete",
                    "Tab",
                ].includes(e.key)
            ) {
                e.preventDefault();
            }
        });
    };

    return this.each(function () {
        const form = document.createElement("form");
        form.method = method;
        form.action = action;
        form.classList.add("form");

        fields.forEach((field) => {
            const {
                label,
                name,
                type = "text",
                required = false,
                options = [],
            } = field;

            const wrapper = document.createElement("div");
            wrapper.classList.add("form-group");

            const labelEl = document.createElement("label");
            labelEl.textContent = label;
            wrapper.appendChild(labelEl);

            let input;

            if (type === "textarea") {
                input = document.createElement("textarea");
                input.style.resize = "none";
            } else if (type === "select") {
                input = document.createElement("select");
                options.forEach((opt) => {
                    const option = document.createElement("option");
                    option.value = opt.value;
                    option.textContent = opt.label;
                    input.appendChild(option);
                });
            } else if (type === "checkbox") {
                input = document.createElement("input");
                input.type = "checkbox";
                input.classList.add("form-checkbox");
            } else {
                input = document.createElement("input");
                input.type = type;
            }

            input.name = name;
            input.required = required;
            input.classList.add("form-control");

            if (name === "phone") {
                input.placeholder = "+7-999-999-99-99";
                applyPhoneMask(input);
            }

            if (name === "email") {
                input.placeholder = "example@mail.com";
            }

            if (name === "name" || name === "surname") {
                input.placeholder = " ";
                input.addEventListener("input", () => {
                    if (input.value.length === 1) {
                        input.value = input.value.toUpperCase();
                    }
                });
            }

            const error = document.createElement("div");
            error.classList.add("form-error");

            wrapper.appendChild(input);
            wrapper.appendChild(error);
            form.appendChild(wrapper);
        });

        const btn = document.createElement("button");
        btn.type = "submit";
        btn.textContent = submitLabel;
        btn.classList.add("btn", "btn-primary", "mt-10");
        form.appendChild(btn);
        this.appendChild(form);

        const validateForm = () => {
            let isValid = true;

            fields.forEach(({ name, type = "text", required }) => {
                const input = form.querySelector(`[name="${name}"]`);
                const error = input.nextElementSibling;
                const val =
                    type === "checkbox" ? input.checked : input.value.trim();

                input.classList.remove("invalid");
                error.textContent = "";

                if (required && !val) {
                    error.textContent = "Поле обязательно";
                    input.classList.add("invalid");
                    isValid = false;
                }

                if (type === "email" && val && !validators.email(val)) {
                    error.textContent = "Некорректный email";
                    input.classList.add("invalid");
                    isValid = false;
                }

                if (type === "tel" && val && !validators.phone(val)) {
                    error.textContent = "Формат: +7-999-999-99-99";
                    input.classList.add("invalid");
                    isValid = false;
                }
            });

            return isValid;
        };

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("📤 Отправка формы...");

            if (!validateForm()) {
                console.warn("❌ Валидация не пройдена");
                return;
            }

            const data = {};
            fields.forEach(({ name, type }) => {
                const el = form.querySelector(`[name="${name}"]`);
                if (el) {
                    data[name] =
                        type === "checkbox" ? el.checked : el.value.trim();
                }
            });

            const selectedRange = Store.getState("selectedRange");
            if (selectedRange?.from && selectedRange?.to) {
                data.dateRange = {
                    from: selectedRange.from.toISOString(),
                    to: selectedRange.to.toISOString(),
                };
            }

            console.log("✅ Данные формы с датами из store:", data);

            const spinner = document.querySelector("[data-spinner]");
            spinner?.showSpinner();

            try {
                const res = await fetch(action, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (!res.ok) {
                    throw new Error(`Ошибка: ${res.status}`);
                }

                const result = await res.json();
                console.log("🟢 Ответ сервера:", result);
                form.reset();
                $(form).showToast("Форма успешно отправлена!", "success");
            } catch (err) {
                console.error("🚫 Ошибка отправки:", err.message);
                $(form).showToast("Произошла ошибка", "error");
            } finally {
                spinner?.hideSpinner();
            }
        });
    });
};
