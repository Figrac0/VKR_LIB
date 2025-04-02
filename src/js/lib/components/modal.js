import $ from "../core";

window.modalStack = []; // 🔹 Делаем стек глобальным

$.prototype.modal = function (created) {
    for (let i = 0; i < this.length; i++) {
        const target = this[i].getAttribute("data-target");
        const modalElement = document.querySelector(target);

        $(this[i]).click((e) => {
            e.preventDefault();
            $(target).fadeIn(500);
            document.body.style.overflow = "hidden";

            window.modalStack.push(target);
        });

        const closeElements = modalElement.querySelectorAll("[data-close]");
        closeElements.forEach((elem) => {
            $(elem).click(() => closeModal(target, created));
        });

        $(modalElement).click((e) => {
            if (e.target.classList.contains("modal")) {
                closeModal(target, created);
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && window.modalStack.length > 0) {
                closeModal(
                    window.modalStack[window.modalStack.length - 1],
                    created
                );
            }
        });

        modalElement.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                trapFocus(modalElement, e);
            }
        });
    }
};

// 🔹 Функция закрытия модального окна
function closeModal(target, created) {
    $(target).fadeOut(500);
    document.body.style.overflow = "";
    window.modalStack.pop(); // 🔹 Теперь стек доступен глобально

    if (created) {
        document.querySelector(target).remove();
    }
}

// 🔹 Фокусировка внутри модального окна (focus trap)
function trapFocus(modal, e) {
    const focusableElements = modal.querySelectorAll(
        "a, button, input, textarea, select"
    );
    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
    }
}

$('[data-toggle="modal"]').modal();
