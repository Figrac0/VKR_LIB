import $ from "../core";

$.prototype.lightbox = function () {
    for (let i = 0; i < this.length; i++) {
        $(this[i]).click((e) => {
            e.preventDefault();

            if (document.querySelector(".lightbox")) return;

            const src = this[i].getAttribute("href") || this[i].dataset.src;
            if (!src) return;

            const lightboxContainer = document.createElement("div");
            lightboxContainer.classList.add("lightbox");

            lightboxContainer.innerHTML = `
                
                <div class="lightbox-content">
                    <img src="${src}" class="lightbox-img" alt="Lightbox Image">
                    <button class="lightbox-close" aria-label="Close">&times;</button>
                    <button class="lightbox-prev" aria-label="Prev">&#10094;</button>
                    <button class="lightbox-next" aria-label="Next">&#10095;</button>
                </div>
            `;

            document.body.appendChild(lightboxContainer);
            const $lightbox = $(lightboxContainer);

            const closeBtn = $lightbox[0].querySelector(".lightbox-close");
            const content = $lightbox[0].querySelector(".lightbox-content");

            const images = [...document.querySelectorAll("[data-lightbox]")];
            let currentIndex = images.indexOf(this[i]);

            const updateImage = (index) => {
                if (index >= 0 && index < images.length) {
                    const newSrc =
                        images[index].getAttribute("href") ||
                        images[index].dataset.src;
                    $lightbox[0].querySelector(".lightbox-img").src = newSrc;
                    currentIndex = index;
                }
            };

            let isClosing = false;

            const closeLightbox = () => {
                if (isClosing) return;
                isClosing = true;

                document.removeEventListener("keydown", handleKeydown);

                $lightbox.fadeOut(300, () => {
                    $lightbox[0].remove();
                    isClosing = false;
                });
            };

            const handleKeydown = (e) => {
                if (e.key === "Escape") {
                    closeLightbox();
                } else if (e.key === "ArrowLeft") {
                    updateImage(currentIndex - 1);
                } else if (e.key === "ArrowRight") {
                    updateImage(currentIndex + 1);
                }
            };

            // --- События
            document.addEventListener("keydown", handleKeydown);
            closeBtn.addEventListener("click", closeLightbox);
            $lightbox[0].addEventListener("click", closeLightbox);

            // Защита от ложного закрытия
            content.addEventListener("click", (e) => e.stopPropagation());

            $lightbox[0]
                .querySelector(".lightbox-prev")
                .addEventListener("click", () => updateImage(currentIndex - 1));

            $lightbox[0]
                .querySelector(".lightbox-next")
                .addEventListener("click", () => updateImage(currentIndex + 1));
        });
    }
};

// Автоинициализация
$("[data-lightbox]").lightbox();
