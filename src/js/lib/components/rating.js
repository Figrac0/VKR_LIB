import $ from "../core";
import Store from "../modules/store";

$.prototype.rating = function (options = {}) {
    const {
        totalStars = 5,
        defaultRating = 0,
        onRatingChange = () => {},
        apiUrl = "/api/submit-rating", // URL для отправки рейтинга
    } = options;

    return this.each(function () {
        const container = this;

        // Попытаться получить рейтинг из Store, если он сохранен
        let currentRating = Store.getState("rating") || defaultRating;

        // Создаем контейнер для звезд
        const starsContainer = document.createElement("div");
        starsContainer.classList.add("stars-container");

        // Функция для обновления отображения звезд
        const updateStars = (rating) => {
            const stars = starsContainer.querySelectorAll(".star");
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add("filled");
                } else {
                    star.classList.remove("filled");
                }
            });
        };

        // Создаем звезды
        for (let i = 0; i < totalStars; i++) {
            const star = document.createElement("div");
            star.classList.add("star");
            star.addEventListener("click", async () => {
                currentRating = i + 1;
                updateStars(currentRating);
                onRatingChange(currentRating); // Вызов функции для обработки изменения

                // Сохраняем рейтинг в Store
                Store.setState("rating", currentRating);

                // Отправляем рейтинг на сервер
                try {
                    const response = await fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ rating: currentRating }),
                    });

                    if (!response.ok) throw new Error("Ошибка отправки отзыва");

                    const result = await response.json();
                    console.log(result);

                    // Показать сообщение об успешной отправке
                    $(container).toast({
                        message: "Отзыв отправлен!",
                        type: "success",
                    });
                } catch (error) {
                    console.error(error);
                    $(container).toast({
                        message: "Ошибка отправки отзыва",
                        type: "error",
                    });
                }
            });
            starsContainer.appendChild(star);
        }

        // Инициализируем отображение рейтинга
        updateStars(currentRating);

        // Добавляем контейнер звезд в DOM
        container.appendChild(starsContainer);
    });
};
