import $ from "../core";

$.prototype.countdown = function (options = {}) {
    const defaultOptions = {
        endDate: "2025-12-31 23:59:59", // Default end date (can be set by user)
        format: "MM:DD:HH:MM", // The format of the countdown
        labelText: "До конца акции:", // Default text (can be customized by user)
    };

    const config = { ...defaultOptions, ...options };

    return this.each(function () {
        const container = document.createElement("div");
        container.classList.add("countdown-container");

        // Function to format time
        const formatTime = (time) => (time < 10 ? `0${time}` : time);

        // Function to update the countdown
        const updateCountdown = () => {
            const endDate = new Date(config.endDate);
            const now = new Date();
            const timeLeft = endDate - now;

            if (timeLeft <= 0) {
                container.innerHTML = "<h2>Акция завершена!</h2>";
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
        setInterval(updateCountdown, 1000); // Update every second

        document.body.appendChild(container);
    });
};
