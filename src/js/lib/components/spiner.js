import $ from "../core";

$.prototype.spinner = function ({ size = "medium", color = "#007bff" } = {}) {
    for (let i = 0; i < this.length; i++) {
        const spinnerContainer = this[i];

        // Проверяем, существует ли уже spinner
        if (!spinnerContainer.querySelector(".spinner")) {
            spinnerContainer.innerHTML = `
                <div class="spinner spinner-${size}" style="border-color: ${color}; border-top-color: transparent;"></div>
            `;
        }

        // Методы для управления spinner
        spinnerContainer.showSpinner = () => {
            spinnerContainer.style.display = "block";
        };

        spinnerContainer.hideSpinner = () => {
            spinnerContainer.style.display = "none";
        };

        // По умолчанию скрываем spinner
        spinnerContainer.hideSpinner();
    }
};

// Автоматическая инициализация для элементов с data-spinner
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-spinner]").forEach((el) => {
        const size = el.getAttribute("data-spinner-size") || "medium";
        const color = el.getAttribute("data-spinner-color") || "#007bff";

        $(el).spinner({
            size,
            color,
        });
    });
});
