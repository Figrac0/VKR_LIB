import $ from "../core";

function createToastContainer() {
    const container = document.createElement("div");
    container.classList.add("toast-container");
    document.body.appendChild(container);
    return container;
}

function removeToast(toast) {
    toast.classList.add("toast-hide");
    setTimeout(() => toast.remove(), 500);
}

// Глобальный метод $.toast
$.toast = function ({ message, type = "info", duration = 3000 } = {}) {
    const toastContainer =
        document.querySelector(".toast-container") || createToastContainer();

    const toast = document.createElement("div");
    toast.classList.add("toast", `toast-${type}`);
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    // Удаляем через timeout
    setTimeout(() => removeToast(toast), duration);

    // Удаляем по нажатию на крестик
    toast.querySelector(".toast-close").addEventListener("click", () => {
        removeToast(toast);
    });
};

// Автоматическая инициализация по атрибуту data-toast
document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-toast]");
    if (target) {
        const message =
            target.getAttribute("data-toast-message") || "Уведомление";
        const type = target.getAttribute("data-toast-type") || "info";
        const duration =
            parseInt(target.getAttribute("data-toast-duration")) || 3000;

        $.toast({ message, type, duration });
    }
});
