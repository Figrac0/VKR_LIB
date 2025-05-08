import $ from "../core";
import Chart from "chart.js/auto";

$.prototype.chart = function (options = {}) {
    const defaultOptions = {
        type: "line",
        labels: [],
        datasets: [], // теперь можно передавать массив
        title: "График",
    };

    const config = { ...defaultOptions, ...options };

    return this.each(function () {
        const container = this;

        // Удаляем старый canvas, если есть
        const oldCanvas = container.querySelector("canvas");
        if (oldCanvas) oldCanvas.remove();

        const canvas = document.createElement("canvas");
        container.appendChild(canvas);

        new Chart(canvas, {
            type: config.type,
            data: {
                labels: config.labels,
                datasets: config.datasets,
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: config.title,
                        font: {
                            size: 18,
                        },
                    },
                    legend: {
                        position: "top",
                    },
                },
            },
        });
    });
};
