import $ from "../core";
import Store from "../modules/store";

$.prototype.datepicker = function () {
    const months = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const formatDate = (d) =>
        d.toLocaleDateString("ru-RU", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

    return this.each(function () {
        const input = this;
        input.setAttribute("readonly", "true");

        let selected = { from: null, to: null };
        let currentDate = new Date();

        const renderCalendar = (container) => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const offset = (firstDay.getDay() || 7) - 1;
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            container.querySelector(
                ".datepicker-month"
            ).textContent = `${months[month]} ${year}`;

            const grid = container.querySelector(".datepicker-grid");
            grid.innerHTML =
                weekdays
                    .map((d) => `<div class="datepicker-dayname">${d}</div>`)
                    .join("") +
                "<div class='datepicker-empty'></div>".repeat(offset) +
                Array.from({ length: lastDay.getDate() }, (_, i) => {
                    const day = i + 1;
                    const current = new Date(year, month, day);
                    const isToday = current.getTime() === today.getTime();
                    const isSelected =
                        (selected.from &&
                            current.getTime() === selected.from.getTime()) ||
                        (selected.to &&
                            current.getTime() === selected.to.getTime());
                    const inRange =
                        selected.from &&
                        selected.to &&
                        current > selected.from &&
                        current < selected.to;

                    return `<div class="datepicker-day ${
                        isToday ? "today" : ""
                    } 
                        ${isSelected ? "selected" : ""} ${
                        inRange ? "in-range" : ""
                    }"
                        data-date="${current.toISOString()}">${day}</div>`;
                }).join("");

            // Обработчики дней
            grid.querySelectorAll(".datepicker-day").forEach((day) => {
                day.addEventListener("click", () => {
                    const date = new Date(day.dataset.date);
                    if (!selected.from || (selected.from && selected.to)) {
                        selected.from = date;
                        selected.to = null;
                    } else if (date < selected.from) {
                        selected.to = selected.from;
                        selected.from = date;
                    } else {
                        selected.to = date;
                    }
                    renderCalendar(container);
                });
            });
        };

        const createCalendar = () => {
            const calendar = document.createElement("div");
            calendar.classList.add("datepicker");

            calendar.innerHTML = `
                <div class="datepicker-close">&times;</div>
                <div class="datepicker-header">
                    <button class="prev-month">&#10094;</button>
                    <span class="datepicker-month"></span>
                    <button class="next-month">&#10095;</button>
                </div>
                <div class="datepicker-grid"></div>
                <div class="datepicker-actions">
                    <button class="datepicker-clear">Очистить</button>
                    <button class="datepicker-apply">Применить</button>
                </div>
            `;

            calendar.querySelector(".datepicker-close").onclick = () => {
                calendar.remove();
            };

            // Навигация
            calendar.querySelector(".prev-month").onclick = () => {
                currentDate = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                );
                renderCalendar(calendar);
            };

            calendar.querySelector(".next-month").onclick = () => {
                currentDate = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                );
                renderCalendar(calendar);
            };

            calendar.querySelector(".datepicker-clear").onclick = () => {
                selected.from = null;
                selected.to = null;
                renderCalendar(calendar);
            };

            calendar.querySelector(".datepicker-apply").onclick = () => {
                if (selected.from && selected.to) {
                    input.value = `${formatDate(selected.from)} — ${formatDate(
                        selected.to
                    )}`;
                } else if (selected.from) {
                    input.value = formatDate(selected.from);
                }

                Store.setState("datepickerRange", {
                    from: selected.from,
                    to: selected.to,
                });

                calendar.remove();
            };

            renderCalendar(calendar);
            return calendar;
        };

        const toggleCalendar = () => {
            const existing = document.querySelector(".datepicker");
            if (existing) {
                existing.remove();
                return;
            }

            const calendar = createCalendar();
            const rect = input.getBoundingClientRect();
            calendar.style.position = "absolute";
            calendar.style.top = `${rect.bottom + window.scrollY + 8}px`;
            calendar.style.left = `${rect.left + window.scrollX}px`;

            document.body.appendChild(calendar);
        };

        input.addEventListener("click", toggleCalendar);

        document.addEventListener("click", (e) => {
            const calendar = document.querySelector(".datepicker");
            if (
                calendar &&
                !e.target.closest(".datepicker") &&
                e.target !== input
            ) {
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                const calendar = document.querySelector(".datepicker");
                if (calendar) {
                    calendar.remove();
                }
            }
        });
    });
};
