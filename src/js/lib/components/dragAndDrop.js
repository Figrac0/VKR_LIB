import $ from "../core";

$.prototype.dragAndDrop = function () {
    return this.each(function () {
        const container = this;

        // Все элементы, которые могут быть перетащены
        const draggableItems = container.querySelectorAll(".draggable");

        // Функция для перетаскивания
        draggableItems.forEach((item) => {
            item.setAttribute("draggable", true);

            item.addEventListener("dragstart", (e) => {
                // При начале перетаскивания, записываем информацию о перетаскиваемом элементе
                item.classList.add("dragging");
                e.dataTransfer.setData("text/plain", item.id);
            });

            item.addEventListener("dragend", () => {
                // При завершении перетаскивания, убираем классы и стили
                item.classList.remove("dragging");
            });
        });

        // Функция для сортировки
        container.addEventListener("dragover", (e) => {
            e.preventDefault(); // Обязательное для разрешения drop
            const draggingItem = document.querySelector(".dragging");
            const afterElement = getDragAfterElement(container, e.clientY);
            if (afterElement == null) {
                container.appendChild(draggingItem);
            } else {
                container.insertBefore(draggingItem, afterElement);
            }
        });

        // Функция для получения элемента, перед которым будет вставлен перетаскиваемый элемент
        function getDragAfterElement(container, y) {
            const draggableElements = [
                ...container.querySelectorAll(".draggable:not(.dragging)"),
            ];

            return draggableElements.reduce(
                (closest, child) => {
                    const box = child.getBoundingClientRect();
                    const offset = y - box.top - box.height / 2;
                    if (offset < 0 && offset > closest.offset) {
                        return { offset: offset, element: child };
                    } else {
                        return closest;
                    }
                },
                { offset: Number.NEGATIVE_INFINITY }
            ).element;
        }
    });
};
