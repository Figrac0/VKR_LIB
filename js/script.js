document.addEventListener("DOMContentLoaded", () => {
    if (location.hash === "") {
        location.hash = "/";
    }

    // 📌 Маршруты
    Router.addRoute("/", "HomePage", { title: "Главная" });
    Router.addRoute("/catalog", "CatalogPage", { title: "Каталог" });
    Router.addRoute("/about", "AboutPage", { title: "О нас" });
    Router.addRoute("/contact", "ContactPage", { title: "Контакты" });
    Router.addRoute("/extra", "ExtraPage", { title: "Дополнительно" });

    // 📌 Навигация
    $("#home").on("click", () => Router.navigate("/"));
    $("#catalog").on("click", () => Router.navigate("/catalog"));
    $("#about").on("click", () => Router.navigate("/about"));
    $("#contact").on("click", () => Router.navigate("/contact"));
    $("#extra").on("click", () => Router.navigate("/extra"));

    Router.init("hash");
});

Router.component("HomePage", {
    template: `
        <h1 class="text-center">Добро пожаловать в наш магазин!</h1>

        <!-- Карусель -->
        <div class="carousel mt-20" id="main-carousel">
            <ol class="carousel-indicators">
                <li class="active" data-slide-to="0"></li>
                <li data-slide-to="1"></li>
                <li data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-slides">
                    <div class="carousel-item">
                        <img src="https://stoneforest.ru/wp-content/uploads/2018/10/AF1-nba-utility-1.jpg" alt="1" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://imgproxy.cdn-tinkoff.ru/t_device_1920_x2/aHR0cHM6Ly9wdWJsaWMtc3RhdGljLnRpbmtvZmZqb3VybmFsLnJ1L2RvbHlhbWUvdXBsb2Fkcy8yMDI0LzEyL3JZaG84VzVGLWNvdmVyLWgucG5n" alt="2" />
                    </div>
                    <div class="carousel-item">
                        <img src="https://mpost.io/wp-content/uploads/RTFKT-and-Nike-announce-phygital-sneakers-forging-event.jpg" alt="3" />
                    </div>
                </div>
            </div>
            <a href="#" class="carousel-prev" data-slide="prev"><span class="carousel-prev-icon">&lt;</span></a>
            <a href="#" class="carousel-next" data-slide="next"><span class="carousel-next-icon">&gt;</span></a>
        </div>

        <!-- Таймер акции -->
        <div class="mt-40 mb-20 text-center">
            <h2>🔥 Успей купить по акции!</h2>
            <div id="countdown"></div>
        </div>

        <!-- Табы -->
        <div class="tab mt-40 block-center">
    <div class="tab-panel" data-tabpanel>
        <div class="tab-item tab-item--active">Новинки</div>
        <div class="tab-item">Популярное</div>
        <div class="tab-item">Скидки</div>
    </div>
    <div class="tab-content tab-content--active">
        <p>
            👟 Весна/Лето 2025 — это время ярких цветов и технологичных решений! Среди новинок выделяются <strong>Nike Air Max Pulse</strong> с обновлённой амортизацией, <strong>Adidas Ultraboost 24</strong> с переработанной подошвой для максимального комфорта, а также <strong>Puma Velocity Nitro</strong> в стильных пастельных тонах. Все модели выполнены из дышащих материалов и идеально подходят как для спорта, так и для повседневной носки.
        </p>
    </div>
    <div class="tab-content">
        <p>
            🔥 В числе самых популярных моделей этого сезона — <strong>Nike Dunk Low Panda</strong>, не теряющие актуальности, <strong>New Balance 550</strong> в нейтральных цветах, а также <strong>Converse Run Star Hike</strong> с массивной подошвой. Эти кроссовки идеально сочетаются с городским стилем и активно выбираются как молодёжью, так и взрослыми поклонниками удобства.
        </p>
    </div>
    <div class="tab-content">
        <p>
            💸 Сейчас действуют отличные скидки на <strong>Reebok Classic Leather</strong> — до 30%, <strong>Asics Gel-Kayano 30</strong> — минус 25%, и <strong>Fila Disruptor</strong> — со скидкой до 40%! Это отличный шанс приобрести проверенные модели по приятной цене. Акции действуют до конца месяца — поспешите!
        </p>
    </div>
</div>

        <h2 class=" mt-40 mb-20 text-center">Наши аксессуары!</h2>
        <!-- Мини-галерея -->
        <div class="gallery mt-40">
            <a href="https://img.alicdn.com/imgextra/i4/TB1.QwxKVXXXXabXFXXXXXXXXXX_!!0-item_pic.jpg" data-lightbox>
                <img src="https://cs1.livemaster.ru/storage/a7/86/d81b9ac14ce1ee8484a9d931ebcl--materialy-dlya-tvorchestva-shnurki-ploskie-s-metallicheskimi-.jpg" alt="img1" />
            </a>
            <a href="https://ae04.alicdn.com/kf/Saa8d04ca923a4e2a9bb40459917e803ag.jpg_480x480.jpg" data-lightbox>
                <img src="https://ae04.alicdn.com/kf/S90b0718cd51a4efe88a6ac3093648b19s.jpg_480x480.jpg" alt="img2" />
            </a>
            <a href="https://i.siteapi.org/VMq-EcopRgKmU2509TKdAyDMN6Y=/fit-in/1024x768/center/top/f9bec4084cb3f03.ru.s.siteapi.org/img/420abf89367c5fe8573e393737f29fc102a566b0.jpg" data-lightbox>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWKu_iR_EC9YmUYLCm7gRvUDUnS6EPpfCr5w&s" alt="img3" />
            </a>
        </div>

        <!-- Тултип и Тост -->
        <div class="text-center mt-20">
            <button class="btn btn-info mb-30" data-tooltip="Это кнопка уведомления" data-toast data-toast-message="Товар добавлен!" data-toast-type="success">Добавить в корзину</button>
        </div>
            <!-- Футер -->
        <footer class="footer">
    <div class="footer-container">
        <div class="footer-logo">
            <h2 class="footer-title">👟 SneakerStore</h2>
            <p class="footer-subtitle">Лучшие кроссовки – только у нас!</p>
        </div>

        <div class="footer-links">
            <h4 class="footer-heading">Навигация</h4>
            <ul class="footer-list">
                <li><a href="#/" class="footer-link">Главная</a></li>
                <li><a href="#/catalog" class="footer-link">Каталог</a></li>
                <li><a href="#/contact" class="footer-link">Контакты</a></li>
                <li><a href="#/about" class="footer-link">О нас</a></li>
            </ul>
        </div>

        <div class="footer-social">
            <h4 class="footer-heading">Мы в соцсетях</h4>
            <div class="footer-icons">
                <a href="#" class="footer-icon">📸 Instagram</a>
                <a href="#" class="footer-icon">💬 Telegram</a>
                <a href="#" class="footer-icon">🌐 VK</a>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <p class="footer-copy">&copy; 2025 SneakerStore — Все права защищены</p>
    </div>
</footer>
<style>
    .footer {
    background: #1a1a1a;
    color: #f0f0f0;
    width: 100%;
    height: auto;
    padding: 20px 10px 10px;

    .footer-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        max-width: 1200px;
        margin: 0 auto;
        gap: 40px;
    }

    .footer-logo {
        flex: 1 1 250px;

        .footer-title {
            font-size: 18px;
            margin-bottom: 10px;
            color: #ffffff;
        }

        .footer-subtitle {
            font-size: 14px;
            color: #aaa;
        }
    }

    .footer-links,
    .footer-social {
        flex: 1 1 200px;
    }

    .footer-heading {
        font-size: 14px;
        margin-bottom: 12px;
        color: #fff;
    }

    .footer-list {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            margin-bottom: 8px;
        }

        .footer-link {
            color: #ccc;
            text-decoration: none;

            &:hover {
                color: #fff;
                text-decoration: underline;
            }
        }
    }

    .footer-icons {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .footer-icon {
            color: #ccc;
            text-decoration: none;

            &:hover {
                color: #fff;
            }
        }
    }

    .footer-bottom {
        border-top: 1px solid #333;
        margin-top: 5px;
        padding-top: 5px;
        text-align: center;
        font-size: 13px;
        color: #888;
    }
}
</style>     
    `,
    mounted() {
        $("#main-carousel").carousel();
        $("#countdown").countdown({
            endDate: "2025-12-31 23:59:59",
            labelText: "До конца года осталось:",
        });
        $("[data-tabpanel] .tab-item").tab();
        $("[data-lightbox]").lightbox();
        $("[data-tooltip]").tooltip();
    },
});

Router.component("CatalogPage", {
    template: `
        <h1 class="text-center mb-20">Каталог товаров</h1>
        <div class="catalog "></div>

        <div class="consultation mt-40 p-20 block-center text-center">
        <h2 class="mb-10">Запишитесь на консультацию</h2>
        <p class="mb-10">Выберите удобную дату и нажмите "Записаться"</p>
        <input type="text" id="date" class="form-control mb-30" placeholder="Выберите диапазон" />
        <button class="btn btn-success " id="book-btn">Записаться</button>

        <style>
            .form-control {
                margin-bottom:500px;
            }
        </style>
    </div>
    `,
    mounted() {
        // Очистка предыдущих инстансов
        $("#date").off?.("click");

        $("#date").datepicker();

        $("#book-btn")
            .off?.("click")
            .click(() => {
                const selected = $("#date")[0]?.value;
                if (selected) {
                    $.toast({
                        message: `Вы записаны на: ${selected}`,
                        type: "success",
                    });
                } else {
                    $.toast({
                        message: "Пожалуйста, выберите дату!",
                        type: "warning",
                    });
                }
            });

        const products = [
            {
                id: 1,
                title: "Кроссовки Nike Air Max",
                price: 8990,
                image: "https://sneaker-street.ru/image/catalog/foto/FN6957-100/1__w-825__h-825__f-jpg.jpg",
                description:
                    "Классические кроссовки Nike с отличной амортизацией.",
                details: "Подошва Air, кожаный верх, отличная фиксация стопы.",
                category: "Обувь",
                brand: "Nike",
                sku: "NK-AIR-001",
                discount: 15,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 2,
                title: "Adidas Ultraboost 24",
                price: 10490,
                image: "https://myreact.ru/storage/catalog/products/2504/thumbnail/lzLOgb.png",
                description:
                    "Современные беговые кроссовки с амортизацией Boost.",
                details: "Идеально для бега и повседневной носки.",
                category: "Обувь",
                brand: "Adidas",
                sku: "AD-ULTRA-024",
                discount: 10,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 3,
                title: "Puma RS-X",
                price: 7990,
                image: "https://cdn.urbanvibes.com/upload/mdm/media_content/resize/4d3/1000_1000_a650/77502400299.jpg",
                description: "Яркие кроссовки с ретро-дизайном.",
                details: "Вдохновлены 80-ми годами, отличная посадка.",
                category: "Обувь",
                brand: "Puma",
                sku: "PM-RSX-321",
                discount: 20,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 4,
                title: "New Balance 550",
                price: 8690,
                image: "https://sneaker-street.ru/image/catalog/foto/BB550STG/1__w-825__h-825__f-jpg.jpg",
                description: "Модель в стиле ретро баскетбольной обуви.",
                details: "Натуральная кожа, высокая устойчивость.",
                category: "Обувь",
                brand: "New Balance",
                sku: "NB-550-WHT",
                discount: 12,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 5,
                title: "Reebok Classic Leather",
                price: 5990,
                image: "https://m.sportkult.ru/ipreview/goods/820/820/011B764-100_26729__single_.jpg",
                description: "Иконические кроссовки на каждый день.",
                details: "Комфортная посадка и стильный силуэт.",
                category: "Обувь",
                brand: "Reebok",
                sku: "RB-CLASSIC-001",
                discount: 30,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 6,
                title: "Asics Gel-Kayano 30",
                price: 9990,
                image: "https://run365.ru/wp-content/uploads/2023/12/1011B548-001.jpg",
                description: "Максимальная стабильность и поддержка.",
                details: "Идеальны для длительных тренировок.",
                category: "Обувь",
                brand: "Asics",
                sku: "AS-GK30-BLK",
                discount: 25,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 7,
                title: "Nike Dunk Low Panda",
                price: 8590,
                image: "https://myreact.ru/storage/catalog/products/UY9QjD.jpg",
                description: "Самая хайповая модель сезона.",
                details: "Универсальный чёрно-белый стиль.",
                category: "Обувь",
                brand: "Nike",
                sku: "NK-DUNK-001",
                discount: 5,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 8,
                title: "Converse Run Star Hike",
                price: 7590,
                image: "https://i.siteapi.org/oHhxhaVufsSSrE5_Ro_8FUwjkoM=/fit-in/330x/top/s2.siteapi.org/0024b9c2210848f/img/d5a2hrsta20ow8cogwwo40w48gowow",
                description: "Фирменный стиль Converse с массивной подошвой.",
                details: "Идеальны для уличной моды.",
                category: "Обувь",
                brand: "Converse",
                sku: "CV-RSH-123",
                discount: 18,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 9,
                title: "Fila Disruptor II",
                price: 6490,
                image: "https://i.siteapi.org/x6lVYT4Nhcyst_5gWZWTTqTb7Xg=/fit-in/330x/top/35fc4a469a2f47d.s2.siteapi.org/img/4gzycett1nggwkw084kkc00scc88k0",
                description: "Массивный силуэт, привлекающий внимание.",
                details: "Отличный выбор для смелого образа.",
                category: "Обувь",
                brand: "Fila",
                sku: "FL-DISP-02",
                discount: 40,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 10,
                title: "Jordan 1 Mid Bred",
                price: 11490,
                image: "https://slamdunk.shop/wp-content/uploads/2023/04/Air-Jordan-1-Mid-Bred-Toe.jpg",
                description: "Легендарный силуэт в классическом цвете.",
                details: "История баскетбола в каждой паре.",
                category: "Обувь",
                brand: "Jordan",
                sku: "JR-1MID-BRED",
                discount: 8,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 11,
                title: "Yeezy Boost 350 V2",
                price: 16990,
                image: "https://optim.tildacdn.com/tild3666-6365-4964-b034-333431646432/-/format/webp/16586460_32420795_20.jpg.webp",
                description: "Современный стиль и комфорт от Kanye West.",
                details: "Primeknit верх и амортизация Boost.",
                category: "Обувь",
                brand: "Adidas",
                sku: "AD-YZY-350",
                discount: 10,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
            {
                id: 12,
                title: "Nike ZoomX Invincible",
                price: 10990,
                image: "https://www.центрбега.рф/upload/iblock/e03/7nutll4e8so75t0wktu4k34l8ql1tl18.jpg",
                description: "Максимум энергии на каждом шаге.",
                details: "ZoomX пена — одна из самых мягких и пружинящих.",
                category: "Обувь",
                brand: "Nike",
                sku: "NK-ZMX-INV",
                discount: 20,
                video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            },
        ];

        const $catalog = $(".catalog");
        $catalog.each(function () {
            this.innerHTML = ""; // принудительно очищаем DOM
        });

        $(".catalog").catalog({
            products,
            columns: 3,
            showBuyButton: true,
            showDetailsButton: true,
            showImage: true,
            showPrice: true,
            showDescription: true,
        });
    },
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");

    if (sidebarContainer) {
        $(sidebarContainer).sidebar({
            socialLinks: {
                telegram: true,
                instagram: true,
                facebook: true,
                github: true,
                twitch: true,
                youtube: true,
                pinterest: true,
                twitter: true,
                tiktok: true,
                whatsapp: true,
                reddit: true,
            },
        });
    }
});

Router.component("AboutPage", {
    template: `
        <h1 class="text-center mt-40 mb-30">Наши магазины</h1>

        <div class="goods d-flex f-space-around flex-wrap">
            <!-- Магазин №1 -->
            <div class="card" style="max-width: 400px;">
                <img
                    class="card-img"
                    src="https://storeinteriors.ru/wp-content/uploads/street-beat-store-14.jpg"
                    alt="store-1"
                />
                <div class="card-body">
                    <div class="card-title">SneakerStore — Центр</div>
                    <p class="card-text">
                        Флагманский магазин в центре города. Большой выбор и самые новые модели!
                    </p>
                    <a
                        href="#"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#storeModal1"
                    >Подробнее</a>
                </div>
            </div>

            <!-- Магазин №2 -->
            <div class="card" style="max-width: 400px;">
                <img
                    class="card-img"
                    src="https://arhitectyra.ru/wp-content/uploads/2018/01/IMG_5165.jpg"
                    alt="store-2"
                />
                <div class="card-body">
                    <div class="card-title">SneakerStore — ТРЦ Galaxy</div>
                    <p class="card-text">
                        Магазин в торговом центре с отличным ассортиментом и уютной атмосферой.
                    </p>
                    <a
                        href="#"
                        class="btn btn-primary"
                        data-toggle="modal"
                        data-target="#storeModal2"
                    >Узнать больше</a>
                </div>
            </div>
        </div>

        <!-- Модальное окно 1 -->
        <div class="modal" id="storeModal1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <button class="close" data-close>&times;</button>
                    <div class="modal-header">
                        <div class="modal-title">SneakerStore — Центр</div>
                    </div>
                    <div class="modal-body">
                        <p><strong>Адрес:</strong> г. Москва, ул. Тверская, д. 12</p>
                        <p><strong>Особенности:</strong> Огромный ассортимент, примерочные зоны, персональные стилисты, эксклюзивные релизы.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-close>Закрыть</button>
                        <button class="btn btn-success">
                                Посетить
                            </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Модальное окно 2 -->
        <div class="modal" id="storeModal2">
            <div class="modal-dialog">
                <div class="modal-content">
                    <button class="close" data-close>&times;</button>
                    <div class="modal-header">
                        <div class="modal-title">SneakerStore — ТРЦ Galaxy</div>
                    </div>
                    <div class="modal-body">
                        <p><strong>Адрес:</strong> г. Москва, ТРЦ Galaxy, 2 этаж</p>
                        <p><strong>Особенности:</strong> Удобное расположение, акции по выходным, быстрый заказ онлайн с самовывозом.</p>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-danger" data-close>Закрыть</button>
                        <button class="btn btn-success">
                                Посетить
                            </button>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="text-center mt-40 mb-20">Наши принципы и действия</h2>

        <div class="tab mt-20 block-center">
            <div class="tab-panel d-flex align-center gap-20" data-tabpanel>
                <div class="tab-item tab-item--active">Принципы</div>
                <div class="tab-item">О клиентах</div>
                <div class="tab-item">Производство</div>

                <div class="dropdown ml-auto">
                    <button
                        class="btn btn-primary dropdown-toggle"
                        id="dropdownMenuButton2"
                    >
                        Подробнее
                    </button>
                    <div
                        class="dropdown-menu"
                        data-toggle-id="dropdownMenuButton2"
                    >
                        <a href="#" class="dropdown-item">Наша история</a>
                        <a href="#" class="dropdown-item">Работа в команде</a>
                        <a href="#" class="dropdown-item">Партнёрская сеть</a>
                    </div>
                </div>
            </div>

            <div class="tab-content tab-content--active">
                <ul class="list-disc p-20">
                    <strong>Качество превыше всего:</strong> Мы используем только проверенные материалы и надёжных поставщиков.<br>
                    <strong>Комфорт для клиента:</strong> Каждая пара тестируется на удобство и поддержку стопы.<br>
                    <strong>Доступность:</strong> Мы стремимся держать цены на уровне и предлагаем акции каждый месяц.<br>
                    <strong>Экологичность:</strong> Упаковка и часть моделей создаются из переработанных материалов.<br>
                    <strong>Индивидуальный подход:</strong> Наши стилисты всегда готовы подобрать обувь по вкусу клиента.
                </ul>
            </div>

            <div class="tab-content">
                <p class="p-20">
                    Мы ценим наших покупателей. Для постоянных клиентов действует программа лояльности, персональные предложения и быстрый возврат без вопросов.
                </p>
            </div>

            <div class="tab-content">
                <p class="p-20">
                    Производство обуви ведется в соответствии с мировыми стандартами. Мы следим за модой, но не жертвуем комфортом. Каждая пара — это результат кропотливой работы дизайнеров, технологов и тест-групп.
                </p>
            </div>
        </div>

        <!-- Accordion -->
<h2 class="text-center mt-40 mb-20">Наша история и ценности</h2>

<div class="accordion mt-20 block-center">
    <div class="accordion-head">
        <span>Основание бренда</span>
    </div>
    <div class="accordion-content">
        <div class="accordion-inner">
            Всё началось в 2010 году с мечты создать идеальные кроссовки для активных людей. Мы начинали с маленькой мастерской и большим желанием изменить рынок обуви.
        </div>
    </div>

    <div class="accordion-head">
        <span>Первые модели</span>
    </div>
    <div class="accordion-content">
        <div class="accordion-inner">
            Первая линейка кроссовок была вручную собрана из премиальных материалов. Мы учились на каждом шаге и слушали наших первых клиентов, чтобы становиться лучше.
        </div>
    </div>

    <div class="accordion-head">
        <span>Современные технологии</span>
    </div>
    <div class="accordion-content">
        <div class="accordion-inner">
            Сегодня мы используем 3D-моделирование, экологичные материалы и инновационные подошвы, чтобы каждая пара обеспечивала комфорт и долговечность.
        </div>
    </div>

    <div class="accordion-head">
        <span>Философия бренда</span>
    </div>
    <div class="accordion-content">
        <div class="accordion-inner">
            Мы верим, что обувь — это больше, чем стиль. Это забота о здоровье, проявление индивидуальности и свобода движения.
        </div>
    </div>

    <div class="accordion-head">
        <span>Планы на будущее</span>
    </div>
    <div class="accordion-content">
        <div class="accordion-inner">
            В ближайшие годы мы планируем открыть магазины в новых городах, расширить линейку спортивной обуви и активно поддерживать локальные спортивные мероприятия.
        </div>
    </div>
</div>

<h2 class="mt-60 mb-20 mt-20 text-center">Наши любимые модели</h2>
<!-- Lightbox-галерея -->
<div class="gallery mt-20">
    <a href="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-air-jordan-1-retro-high-og-tie-dye-sine-belo-chernye-35-39-600x422.jpg" data-lightbox>
        <img src="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-air-jordan-1-retro-high-og-tie-dye-sine-belo-chernye-35-39-600x422.jpg" alt="model-1" />
    </a>
    <a href="https://samara.streetfoot.ru/wp-content/uploads/2021/07/new-balance-mr-530-belye-s-sinim-35-44-600x400.jpg" data-lightbox>
        <img src="https://samara.streetfoot.ru/wp-content/uploads/2021/07/new-balance-mr-530-belye-s-sinim-35-44-600x400.jpg" alt="model-2" />
    </a>
    <a href="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-air-force-1-new-york-raznocvetnye-39-43-600x421.jpg" data-lightbox>
        <img src="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-air-force-1-new-york-raznocvetnye-39-43-600x421.jpg" alt="model-3" />
    </a>
    <a href="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-air-jordan-1-retro-cherno-rozovye-35-39-600x421.jpg" data-lightbox>
        <img src="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-air-jordan-1-retro-cherno-rozovye-35-39-600x421.jpg" alt="model-4" />
    </a>
    <a href="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-jordan-1-retro-high-tokyo-bio-hack-sine-cherno-korichnevyj-goluboj-40-45-450x450.jpg" data-lightbox>
        <img src="https://samara.streetfoot.ru/wp-content/uploads/2021/01/nike-jordan-1-retro-high-tokyo-bio-hack-sine-cherno-korichnevyj-goluboj-40-45-450x450.jpg" alt="model-5" />
    </a>
    <a href="https://samara.streetfoot.ru/wp-content/uploads/2021/01/adidas-yeezy-boost-700-v3-golubye-s-chernym-svetyashhiesya-35-39-600x360.jpg" data-lightbox>
        <img src="https://samara.streetfoot.ru/wp-content/uploads/2021/01/adidas-yeezy-boost-700-v3-golubye-s-chernym-svetyashhiesya-35-39-600x360.jpg" alt="model-6" />
    </a>
</div>

    <h2 class="mt-60 mb-20 mt-20 text-center">Наши лучшие качества</h2>
    <p class="text-center mb-20">Можете менять местами — ничего не поменяется 😄</p>

    <div class="drag-container block-center" id="drag-container">
        <div class="draggable" id="item1">🔥 Высокое качество продукции</div>
        <div class="draggable" id="item2">💬 Отличная клиентская поддержка</div>
        <div class="draggable" id="item3">🚚 Быстрая и бесплатная доставка</div>
        <div class="draggable" id="item4">🎁 Уникальные акции и бонусы</div>
    </div>

    <h2 class="mt-60 mb-20 text-center">Сравнение с конкурентами</h2>
    <p class="text-center mb-10">Наглядная разница по важным параметрам</p>
    <div id="chart-container" class="chart-container mt-20 mb-20"></div>


    `,
    mounted() {
        $('[data-toggle="modal"]').modal();
        $("[data-tabpanel] .tab-item").tab();

        $(".dropdown-toggle").dropdown();

        $(".accordion-head").accordion();

        $("[data-lightbox]").lightbox();
        $("#drag-container").dragAndDrop();

        const chartContainer = document.getElementById("chart-container");
        if (chartContainer) {
            $(chartContainer).chart({
                type: "bar",
                labels: [
                    "Качество",
                    "Ассортимент",
                    "Скорость доставки",
                    "Цены",
                    "Программа лояльности",
                    "Обслуживание",
                ],
                title: "Наш магазин vs Конкуренты",
                datasets: [
                    {
                        label: "Наш магазин",
                        data: [95, 90, 98, 85, 92, 97],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Конкуренты",
                        data: [80, 75, 60, 88, 70, 78],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            });
        }
    },
});

Router.component("ContactPage", {
    template: `
         <div class="form-container block-center mt-40"></div>
    <div class="rating-section mt-40 mb-40 text-center">
        <h3 class="mb-10">Оставьте нам ваш отзыв</h3>
        <div id="rating-container" class="rating-container"></div>
    </div>
    `,
    mounted() {
        // Очищаем предыдущий HTML
        document.querySelector(".form-container").innerHTML = "";

        // Отображаем форму
        $(".form-container").form({
            action: "https://your-api-server.com/api/send",
            method: "POST",
            fields: [
                {
                    name: "name",
                    label: "Имя",
                    type: "text",
                    required: true,
                },
                {
                    name: "surname",
                    label: "Фамилия",
                    type: "text",
                    required: true,
                },
                {
                    name: "email",
                    label: "Email",
                    type: "email",
                    required: true,
                },
                {
                    name: "phone",
                    label: "Телефон",
                    type: "tel",
                    required: true,
                },
                { name: "dob", label: "Дата рождения", type: "date" },
                {
                    name: "gender",
                    label: "Пол",
                    type: "select",
                    options: [
                        { value: "", label: "Выберите" },
                        { value: "male", label: "Мужской" },
                        { value: "female", label: "Женский" },
                    ],
                },
                {
                    name: "consent",
                    label: "Согласие на обработку данных",
                    type: "checkbox",
                    required: true,
                },
                {
                    name: "message",
                    label: "Сообщение",
                    type: "textarea",
                },
            ],
            submitLabel: "Отправить данные",
        });

        // Инициализация рейтинга
        const ratingContainer = document.getElementById("rating-container");
        if (ratingContainer) {
            $(ratingContainer).rating({
                totalStars: 5,
                defaultRating: Store.getState("rating") || 0,
                onRatingChange: (newRating) => {
                    console.log("Новый рейтинг: " + newRating);
                    Store.setState("rating", newRating); // сохраняем в Store
                    $.toast({
                        message: `Спасибо за вашу оценку: ${newRating} ⭐`,
                        type: "success",
                    });
                },
            });
        }
    },
});

$("#auth-button").on("click", () => {
    $("body").loginModal({
        apiUrl: "/api/auth", // оставь путь как фиктивный
    });
});

Router.component("ExtraPage", {
    template: `
        <section class="extra-page block-center p-20 text-center">
            <h1 class="mb-20">Тест анимаций</h1>
            <button class="btn btn-primary mb-10" id="show-box">Показать элемент</button>

            <div id="test-box" style="
                display:none;
                background:#e3f2fd;
                margin:20px auto;
                max-width:300px;
                border-radius:8px;
                box-sizing: border-box;
                overflow: hidden;
            ">
                <div id="test-box-inner" style="padding:20px;">
                    Я анимируемый элемент
                </div>
            </div>

            <div class="animations mt-20">
                <button class="btn btn-secondary m-5" data-effect="fadeIn">fadeIn</button>
                <button class="btn btn-secondary m-5" data-effect="fadeOut">fadeOut</button>
                <button class="btn btn-secondary m-5" data-effect="slideDown">slideDown</button>
                <button class="btn btn-secondary m-5" data-effect="slideUp">slideUp</button>
                <button class="btn btn-secondary m-5" data-effect="scaleIn">scaleIn</button>
                <button class="btn btn-secondary m-5" data-effect="scaleOut">scaleOut</button>
                <button class="btn btn-secondary m-5" data-effect="bounce">bounce</button>
                <button class="btn btn-secondary m-5" data-effect="shake">shake</button>
            </div>

            <h2 class="mb-20 mt-30">Тест локального хранилища</h2>
            <div class="storage-buttons">
                <button class="btn btn-success m-5" id="saveUser">Сохранить пользователя</button>
                <button class="btn btn-warning m-5" id="getUser">Получить пользователя</button>
                <button class="btn btn-danger m-5" id="clearUser">Удалить пользователя</button>
                <button class="btn btn-info m-5" id="cacheRequest">Запрос с кешем</button>
                <button class="btn btn-dark m-5" id="clearCache">Очистить кеш</button>
            </div>

            <h2 class="mb-20 mt-30">Тест классов и атрибутов</h2>
            <div id="class-attr-box" style="
                border: 2px solid black;
                padding: 20px;
                margin-top: 10px;
                display: inline-block;
            ">
                Я блок для теста классов/атрибутов
            </div>
            <div class="mt-10">
                <button class="btn btn-outline m-5" id="add-class">addClass</button>
                <button class="btn btn-outline m-5" id="remove-class">removeClass</button>
                <button class="btn btn-outline m-5" id="toggle-class">toggleClass</button>
                <button class="btn btn-outline m-5" id="set-attr">setAttributes</button>
                <button class="btn btn-outline m-5" id="remove-attr">removeAttributes</button>
                <button class="btn btn-outline m-5" id="toggle-attr">toggleAttributes</button>
            </div>

           <h2 class="mb-20 mt-30">Прогресс-бар</h2>
            <div id="my-progress" style="height: 30px; background: #f0f0f0; border-radius: 6px; overflow: hidden;" data-progress></div>
            <div class="mt-10">
                <button class="btn btn-success m-5" id="inc-progress">+</button>
                <button class="btn btn-danger m-5" id="dec-progress">-</button>
            </div>

            <h2 class="mb-20 mt-30">Спиннер</h2>
            <div id="my-spinner" class="mb-30 mt-30" style="height: 50px;" data-spinner data-spinner-size="large"></div>
            <button class="btn btn-primary m-5" id="show-spinner">Показать спиннер</button>
            <button class="btn btn-outline-secondary m-5" id="hide-spinner">Скрыть спиннер</button>

            <h2 class="mb-20 mt-30">Загрузка файлов</h2>
            <div id="file-upload" class="p-20 border mb-40" style="background: #fafafa;"></div>
        </section>
    `,
    mounted() {
        const $box = $("#test-box");
        const $test = $("#class-attr-box");

        $("#show-box").click(() => $box.fadeIn());

        $("[data-effect]").click(function () {
            const effect = this.dataset.effect;
            switch (effect) {
                case "fadeIn":
                    $box.fadeIn();
                    break;
                case "fadeOut":
                    $box.fadeOut();
                    break;
                case "slideDown":
                    $box.slideDown();
                    break;
                case "slideUp":
                    $box.slideUp();
                    break;
                case "scaleIn":
                    $box.scaleIn();
                    break;
                case "scaleOut":
                    $box.scaleOut();
                    break;
                case "bounce":
                    $box.bounce(4, 20, 100);
                    break;
                case "shake":
                    $box.shake(4, 15, 80);
                    break;
            }
        });

        // Storage
        $("#saveUser").click(() => {
            Storage.setItem("user", { name: "Иван", age: 25 });
            $.toast({ message: "✅ Пользователь сохранен!", type: "success" });
        });

        $("#getUser").click(() => {
            const user = Storage.getItem("user");
            console.log("👤 Пользователь:", user);
            $.toast({
                message: user
                    ? `Имя: ${user.name}, возраст: ${user.age}`
                    : "❌ Пользователь не найден",
                type: user ? "info" : "warning",
            });
        });

        $("#clearUser").click(() => {
            Storage.removeItem("user");
            $.toast({ message: "🗑️ Пользователь удален!", type: "error" });
        });

        $("#cacheRequest").click(async () => {
            const data = await Storage.fetchWithCache(
                "https://jsonplaceholder.typicode.com/users/1"
            );
            console.log("📦 Данные из API или кеша:", data);
            $.toast({
                message: "✅ Данные получены! Смотри консоль",
                type: "success",
            });
        });

        $("#clearCache").click(() => {
            Storage.clearCache();
            $.toast({ message: "🧹 Кеш очищен!", type: "info" });
        });

        // Тест классов и атрибутов
        $("#add-class").click(() => {
            $test.addClass("bg-primary", "text-white");
            console.log("✅ addClass:", $test[0].classList);
        });

        $("#remove-class").click(() => {
            $test.removeClass("bg-primary");
            console.log("✅ removeClass:", $test[0].classList);
        });

        $("#toggle-class").click(() => {
            $test.toggleClass("border-red");
            console.log("✅ toggleClass:", $test[0].classList);
        });

        $("#set-attr").click(() => {
            $test.setAttributes({ "data-role": "test", "aria-hidden": "true" });
            console.log("✅ setAttributes:", $test[0].outerHTML);
        });

        $("#remove-attr").click(() => {
            $test.removeAttributes("aria-hidden");
            console.log("✅ removeAttributes:", $test[0].outerHTML);
        });

        $("#toggle-attr").click(() => {
            $test.toggleAttributes({ "data-role": "test" });
            console.log("✅ toggleAttributes:", $test[0].outerHTML);
        });
        // Прогресс-бар
        let progress = 30;
        $("#my-progress").progressBar({ value: progress });

        $("#inc-progress").click(() => {
            progress = Math.min(progress + 10, 100);
            document.getElementById("my-progress").updateProgress(progress);
        });
        $("#dec-progress").click(() => {
            progress = Math.max(progress - 10, 0);
            document.getElementById("my-progress").updateProgress(progress);
        });

        // Спиннер
        $("#my-spinner").spinner({ size: "large" });
        $("#show-spinner").click(() => {
            document.getElementById("my-spinner").showSpinner();
        });
        $("#hide-spinner").click(() => {
            document.getElementById("my-spinner").hideSpinner();
        });

        // Загрузка файлов
        $("#file-upload").fileUpload({
            apiUrl: "/upload-endpoint",
            buttonText: "📁 Выбрать и загрузить файл",
        });
    },
});
