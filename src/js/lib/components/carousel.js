import $ from "../core";

$.prototype.carousel = function ({
    autoplay = false,
    interval = 3000,
    swipe = true,
    transitionSpeed = 600, // Добавляем скорость анимации
} = {}) {
    for (let i = 0; i < this.length; i++) {
        const width = window.getComputedStyle(
            this[i].querySelector(".carousel-inner")
        ).width;
        const slides = this[i].querySelectorAll(".carousel-item");
        const slidesField = this[i].querySelector(".carousel-slides");
        const dots = this[i].querySelectorAll(".carousel-indicators li");

        slidesField.style.width = 100 * slides.length + "%";
        slidesField.style.transition = `transform ${transitionSpeed}ms ease-in-out`; // Добавляем анимацию

        slides.forEach((slide) => (slide.style.width = width));

        let offset = 0;
        let slideIndex = 0;

        const updateActiveDot = () => {
            dots.forEach((dot) => dot.classList.remove("active"));
            dots[slideIndex].classList.add("active");
        };

        const nextSlide = () => {
            if (offset == +width.replace(/\D/g, "") * (slides.length - 1)) {
                offset = 0;
                slideIndex = 0;
            } else {
                offset += +width.replace(/\D/g, "");
                slideIndex++;
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            updateActiveDot();
        };

        const prevSlide = () => {
            if (offset == 0) {
                offset = +width.replace(/\D/g, "") * (slides.length - 1);
                slideIndex = slides.length - 1;
            } else {
                offset -= +width.replace(/\D/g, "");
                slideIndex--;
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
            updateActiveDot();
        };

        // 🔹 Автопрокрутка
        let autoplayInterval;
        if (autoplay) {
            autoplayInterval = setInterval(nextSlide, interval);

            // Остановка при наведении мыши
            this[i].addEventListener("mouseenter", () =>
                clearInterval(autoplayInterval)
            );
            this[i].addEventListener(
                "mouseleave",
                () => (autoplayInterval = setInterval(nextSlide, interval))
            );
        }

        // 🔹 Свайпы для мобильных устройств
        if (swipe) {
            let startX = 0;
            this[i].addEventListener(
                "touchstart",
                (e) => (startX = e.touches[0].clientX)
            );
            this[i].addEventListener("touchend", (e) => {
                let endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) nextSlide(); // Свайп влево
                if (startX - endX < -50) prevSlide(); // Свайп вправо
            });
        }

        // 🔹 Управление стрелками на клавиатуре
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowRight") nextSlide();
            if (e.key === "ArrowLeft") prevSlide();
        });

        $(this[i].querySelector('[data-slide="next"]')).click((e) => {
            e.preventDefault();
            nextSlide();
        });

        $(this[i].querySelector('[data-slide="prev"]')).click((e) => {
            e.preventDefault();
            prevSlide();
        });

        const sliderId = this[i].getAttribute("id");
        $(`#${sliderId} .carousel-indicators li`).click((e) => {
            const slideTo = e.target.getAttribute("data-slide-to");

            slideIndex = slideTo;
            offset = +width.replace(/\D/g, "") * slideTo;

            slidesField.style.transform = `translateX(-${offset}px)`;
            updateActiveDot();
        });
    }
};

$(".carousel").carousel({
    autoplay: true,
    interval: 4000,
    swipe: true,
    transitionSpeed: 800,
});
