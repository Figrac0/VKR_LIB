import $ from "../core";

$.prototype.countdown = function (options = {}) {
    const defaultOptions = {
        endDate: "2025-12-31 23:59:59",
        format: "MM:DD:HH:MM",
        labelText: "До конца акции:",
    };

    const config = { ...defaultOptions, ...options };

    return this.each(function () {
        // 💡 Очистка предыдущего таймера, если был
        if (this._countdownTimer) {
            clearInterval(this._countdownTimer);
        }

        const container = document.createElement("div");
        container.classList.add("countdown-container");

        const formatTime = (time) => (time < 10 ? `0${time}` : time);

        const updateCountdown = () => {
            const endDate = new Date(config.endDate);
            const now = new Date();
            const timeLeft = endDate - now;

            if (timeLeft <= 0) {
                container.innerHTML = "<h2>Акция завершена!</h2>";
                clearInterval(this._countdownTimer);
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
                (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
                (timeLeft % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            let formattedTime = config.format;
            formattedTime = formattedTime.replace("MM", formatTime(days));
            formattedTime = formattedTime.replace("DD", formatTime(hours));
            formattedTime = formattedTime.replace("HH", formatTime(minutes));
            formattedTime = formattedTime.replace("MM", formatTime(seconds));

            container.innerHTML = `<h3>${config.labelText}</h3><h2>${formattedTime}</h2>`;
        };

        updateCountdown();
        this._countdownTimer = setInterval(updateCountdown, 1000);

        this.innerHTML = ""; // Очищаем
        this.appendChild(container);
    });
};
