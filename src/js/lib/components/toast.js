import $ from "../core";

$.prototype.toast = function ({
    message,
    type = "info",
    duration = 3000,
} = {}) {
    const toastContainer =
        document.querySelector(".toast-container") || createToastContainer();

    const toast = document.createElement("div");
    toast.classList.add("toast", `toast-${type}`);
    toast.innerHTML = `
        <span>${message}</span>
        <button class="toast-close">&times;</button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => removeToast(toast), duration);

    toast
        .querySelector(".toast-close")
        .addEventListener("click", () => removeToast(toast));
};

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

$.prototype.showToast = function (message, type = "info", duration = 3000) {
    this.toast({ message, type, duration });
};

$("[data-toast]").click(function () {
    const message = this.getAttribute("data-toast-message") || "Уведомление";
    const type = this.getAttribute("data-toast-type") || "info";
    const duration = this.getAttribute("data-toast-duration") || 3000;

    $(this).showToast(message, type, duration);
});
