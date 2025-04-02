import $ from "../core";

$.prototype.progressBar = function ({
    value = 0,
    max = 100,
    animated = true,
} = {}) {
    for (let i = 0; i < this.length; i++) {
        const progressContainer = this[i];

        // Проверяем, существует ли уже progress-bar
        if (!progressContainer.querySelector(".progress-bar")) {
            progressContainer.innerHTML = `
                <div class="progress-bar ${
                    animated ? "progress-bar-animated" : ""
                }" style="width: ${value}%;"></div>
            `;
        }

        const progressBar = progressContainer.querySelector(".progress-bar");
        progressBar.style.width = `${value}%`;
        progressBar.textContent = `${value}%`;

        // Метод обновления прогресса
        progressContainer.updateProgress = (newValue) => {
            progressBar.style.width = `${newValue}%`;
            progressBar.textContent = `${newValue}%`;
        };
    }
};

// Автоматическая инициализация для элементов с data-progress
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-progress]").forEach((el) => {
        const value = el.getAttribute("data-progress-value") || 0;
        const max = el.getAttribute("data-progress-max") || 100;
        const animated = el.hasAttribute("data-progress-animated");

        $(el).progressBar({
            value: parseInt(value),
            max: parseInt(max),
            animated,
        });
    });
});
