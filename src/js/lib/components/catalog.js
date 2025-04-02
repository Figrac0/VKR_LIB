import $ from "../core";

$.prototype.catalog = function (options = {}) {
    const defaultOptions = {
        products: [],
        columns: 4,
        showBuyButton: true,
        showDetailsButton: true,
        showImage: true,
        showPrice: true,
        showDescription: true,
    };

    const config = { ...defaultOptions, ...options };

    return this.each(function () {
        const container = this;
        container.classList.add("catalog-grid");
        container.style.gridTemplateColumns = `repeat(${config.columns}, 1fr)`;

        config.products.forEach((product) => {
            const {
                id,
                title = "Товар",
                price = null,
                image = null,
                description = "Описание отсутствует",
                details = "Подробной информации пока нет.",
            } = product;

            const card = document.createElement("div");
            card.classList.add("catalog-card");
            card.setAttribute("data-id", id);

            const renderDefaultView = () => {
                card.innerHTML = `
                    ${
                        config.showImage && image
                            ? `<div class="catalog-img"><img src="${image}" alt="${title}" /></div>`
                            : ""
                    }
                    <div class="catalog-body">
                        <h3 class="catalog-title">${title}</h3>
                        ${
                            config.showPrice && price
                                ? `<div class="catalog-price">${price} ₽</div>`
                                : ""
                        }
                        ${
                            config.showDescription
                                ? `<p class="catalog-description">${description}</p>`
                                : ""
                        }
                        <div class="catalog-actions">
                            ${
                                config.showBuyButton
                                    ? `<button class="btn-buy">Купить</button>`
                                    : ""
                            }
                            ${
                                config.showDetailsButton
                                    ? `<button class="btn-details">Подробнее</button>`
                                    : ""
                            }
                        </div>
                    </div>
                `;

                card.querySelector(".btn-details")?.addEventListener(
                    "click",
                    () => renderDetailsView()
                );
            };

            const renderDetailsView = () => {
                card.innerHTML = `
                    <div class="catalog-body">
                        <h3 class="catalog-title">${title}</h3>
                        <p class="catalog-description">${details}</p>
            
                        <ul class="catalog-info">
                            ${
                                product.category
                                    ? `<li><strong>Категория:</strong> ${product.category}</li>`
                                    : ""
                            }
                            ${
                                product.brand
                                    ? `<li><strong>Бренд:</strong> ${product.brand}</li>`
                                    : ""
                            }
                            ${
                                product.sku
                                    ? `<li><strong>Артикул:</strong> ${product.sku}</li>`
                                    : ""
                            }
                            ${
                                product.discount
                                    ? `<li><strong>Скидка:</strong> ${product.discount}%</li>`
                                    : ""
                            }
                        </ul>
            
                        ${
                            product.video
                                ? `
                            <div class="catalog-video">
                                <iframe src="${product.video}" frameborder="0" allowfullscreen></iframe>
                            </div>
                        `
                                : ""
                        }
            
                        <div class="catalog-actions">
                            <button class="btn-back">Назад</button>
                        </div>
                    </div>
                `;

                card.querySelector(".btn-back")?.addEventListener("click", () =>
                    renderDefaultView()
                );
            };

            renderDefaultView();
            container.appendChild(card);
        });
    });
};
