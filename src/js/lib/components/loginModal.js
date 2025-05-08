$.prototype.loginModal = function (options = {}) {
    const defaultOptions = {
        title: "Добро пожаловать",
        apiUrl: "/api/auth", // Можете оставить этот путь как фиктивный для локальной работы
    };

    const config = { ...defaultOptions, ...options };

    return this.each(function () {
        const modal = document.createElement("div");
        modal.classList.add("login-modal");
        document.body.style.overflow = "hidden"; // ⛔ Запрет прокрутки

        let mode = "login";

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

        // Функция закрытия модального окна
        const closeModal = () => {
            modal.remove();
            document.body.style.overflow = "";
        };

        const renderForm = () => {
            modal.innerHTML = "";

            const content = document.createElement("div");
            content.classList.add("login-modal-content");

            const titleEl = document.createElement("h2");
            titleEl.classList.add("login-title");
            titleEl.textContent = mode === "login" ? "Вход" : "Регистрация";

            const form = document.createElement("form");
            form.classList.add("login-form");

            if (mode === "register") {
                form.innerHTML += `
                    <div class="form-group">
                        <label>Имя</label>
                        <input type="text" name="name" class="form-control" required placeholder="Введите ваше имя" />
                    </div>
                    <div class="form-group">
                        <label>Телефон</label>
                        <input type="tel" name="phone" class="form-control" required placeholder="+7-XXX-XXX-XX-XX" />
                    </div>
                `;
            }

            form.innerHTML += `
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" name="email" class="form-control" required placeholder="example@example.com" />
                </div>
                <div class="form-group">
                    <label>Пароль</label>
                    <input type="password" name="password" class="form-control" required placeholder="Введите ваш пароль" />
                </div>
                ${
                    mode === "register"
                        ? `
                    <div class="form-group">
                        <label>Подтвердите пароль</label>
                        <input type="password" name="confirmPassword" class="form-control" required placeholder="Повторите ваш пароль" />
                    </div>
                `
                        : ""
                }
                <div class="form-actions">
                    <button type="submit" class="btn-login">${
                        mode === "login" ? "Войти" : "Зарегистрироваться"
                    }</button>
                    <button type="button" class="btn-switch">${
                        mode === "login" ? "Регистрация" : "Войти"
                    }</button>
                    <button type="button" class="btn-logout">${
                        mode === "login" ? "Выйти" : "Выйти"
                    }</button>
                </div>
            `;

            content.appendChild(titleEl);
            content.appendChild(form);
            modal.appendChild(content);
            document.body.appendChild(modal);

            const phoneInput = form.querySelector('[name="phone"]');
            if (phoneInput) applyPhoneMask(phoneInput);

            // Закрытие модалки по клику вне формы или Esc
            modal.addEventListener("click", (e) => {
                if (e.target === modal) closeModal();
            });
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape") closeModal();
            });

            form.querySelector(".btn-switch").addEventListener("click", () => {
                mode = mode === "login" ? "register" : "login";
                renderForm();
            });

            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const email = form.email.value.trim();
                const password = form.password.value.trim();
                const name = form.name ? form.name.value.trim() : undefined;
                const phone = form.phone ? form.phone.value.trim() : undefined;
                const confirmPassword = form.confirmPassword
                    ? form.confirmPassword.value.trim()
                    : undefined;

                const payload = { email, password };

                // Валидация
                if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                    $.toast({
                        message: "Введите корректный email.",
                        type: "error",
                    });
                    return;
                }

                if (mode === "register") {
                    if (!name || !/^[А-ЯЁA-Z][а-яёa-z]+$/.test(name)) {
                        $.toast({
                            message: "Имя должно начинаться с заглавной буквы.",
                            type: "error",
                        });
                        return;
                    }
                    if (!/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/.test(phone)) {
                        $.toast({
                            message:
                                "Введите корректный телефон в формате +7-XXX-XXX-XX-XX.",
                            type: "error",
                        });
                        return;
                    }
                    if (password !== confirmPassword) {
                        $.toast({
                            message: "Пароли не совпадают.",
                            type: "error",
                        });
                        return;
                    }
                    if (password.length < 6) {
                        $.toast({
                            message:
                                "Пароль должен содержать минимум 6 символов.",
                            type: "error",
                        });
                        return;
                    }

                    payload.name = name;
                    payload.phone = phone;
                }

                // Локальное сохранение данных
                if (mode === "register") {
                    Store.setState("authUser", payload);
                    localStorage.setItem("authUser", JSON.stringify(payload));
                    $.toast({ message: "Добро пожаловать!", type: "success" });
                    closeModal();
                } else if (mode === "login") {
                    // Логика входа
                    const savedUser = JSON.parse(
                        localStorage.getItem("authUser")
                    );
                    if (
                        savedUser &&
                        savedUser.email === email &&
                        savedUser.password === password
                    ) {
                        $.toast({
                            message: "Вы успешно вошли!",
                            type: "success",
                        });
                        Store.setState("authUser", savedUser);
                        closeModal();
                    } else {
                        $.toast({
                            message: "Неверные данные. Зарегистрируйтесь.",
                            type: "error",
                        });
                    }
                }
            });

            // Выход из аккаунта
            const logoutButton = form.querySelector(".btn-logout");
            logoutButton.addEventListener("click", () => {
                const savedUser = localStorage.getItem("authUser");

                if (!savedUser) {
                    $.toast({
                        message: "Вы уже вышли!",
                        type: "error",
                    });
                    return;
                }

                localStorage.removeItem("authUser");
                Store.setState("authUser", null);
                $.toast({ message: "Вы вышли из аккаунта", type: "success" });
                closeModal();
            });
        };

        renderForm();
    });
};
