import $ from "../core";
import Chart from "chart.js/auto"; // Подключаем Chart.js

$.prototype.chart = function (options = {}) {
    const defaultOptions = {
        type: "line", // Тип графика по умолчанию (линейный)
        labels: [], // Метки на оси X
        data: [], // Данные для графика
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Цвет фона графика
        borderColor: "rgba(75, 192, 192, 1)", // Цвет линии
        borderWidth: 1, // Толщина линии
        fill: true, // Заполнение области под графиком
        title: "График", // Заголовок графика
    };

    const config = { ...defaultOptions, ...options };

    return this.each(function () {
        const container = this;

        // Создаем canvas элемент для отображения графика
        const canvas = document.createElement("canvas");
        container.appendChild(canvas);

        // Создаем график с настройками
        new Chart(canvas, {
            type: config.type,
            data: {
                labels: config.labels,
                datasets: [
                    {
                        label: config.title,
                        data: config.data,
                        backgroundColor: config.backgroundColor,
                        borderColor: config.borderColor,
                        borderWidth: config.borderWidth,
                        fill: config.fill,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: config.title,
                    },
                },
            },
        });
    });
};
