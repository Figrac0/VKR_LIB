import Router from "./lib/modules/router";
import $ from "./lib/lib";
import Storage from "./lib/modules/storage";

// document.addEventListener("DOMContentLoaded", () => {
//     Router.init("history"); // Можно заменить на "hash"

//     Router.addRoute("/", "<h1>Главная</h1>", { title: "Главная страница" });
//     Router.addRoute(
//         "/about",
//         `

//         <div class="goods d-flex f-space-around">
//             <div class="card">
//                 <img class="card-img" src="https://www.apple.com/newsroom/images/product/iphone/lifestyle/Apple_Shot-on-iPhone-Challenge-2020_Austin-Mann_01072020_big.jpg.large.jpg" alt="photo">
//                 <div class="card-body">
//                     <div class="card-title">Card title</div>
//                     <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia itaque placeat qui suscipit.</p>
//                     <a href="#" id="trigger" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Link to</a>
//                 </div>
//             </div>
//             <div class="card">
//                 <img class="card-img" src="https://www.apple.com/newsroom/images/product/iphone/lifestyle/Apple_Shot-on-iPhone-Challenge-2020_Austin-Mann_01072020_big.jpg.large.jpg" alt="photo">
//                 <div class="card-body">
//                     <div class="card-title">Card title #2</div>
//                     <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia itaque placeat qui suscipit.</p>
//                     <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">Link to</a>
//                 </div>
//             </div>
//         </div>
//     `,
//         { title: "О компании" }
//     );

//     Router.addRoute("/contact", "<h1>Контакты</h1>", { title: "Контакты" });
//     Router.addRoute(
//         "/user/:id",
//         (params) => `<h1>Профиль пользователя ${params.id}</h1>`,
//         { title: "Профиль" }
//     );
//     Router.addRoute("/admin", "<h1>Админ панель</h1>", {
//         title: "Админка",
//         beforeEnter: () => {
//             if (!localStorage.getItem("auth")) {
//                 alert("Нет доступа!");
//                 return false;
//             }
//             return true;
//         },
//         afterEnter: () => console.log("Зашли в админку"),
//     });

//     // Добавляем обработчики событий для навигации
//     document
//         .getElementById("home")
//         .addEventListener("click", () => Router.navigate("/"));
//     document
//         .getElementById("about")
//         .addEventListener("click", () => Router.navigate("/about"));
//     document
//         .getElementById("contact")
//         .addEventListener("click", () => Router.navigate("/contact"));
//     document
//         .getElementById("profile")
//         .addEventListener("click", () => Router.navigate("/user/42"));
//     document
//         .getElementById("admin")
//         .addEventListener("click", () => Router.navigate("/admin"));
// });

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Router initialized");

    Router.init("history");

    // 📌 **Компонент "Главная"**
    Router.component("HomePage", {
        template: `
            <h1>Добро пожаловать</h1>
            <p>Это главная страница</p>
        `,
    });

    // 📌 **Компонент "О нас"**
    Router.component("AboutPage", {
        template: `
            <!-- Modal -->
            <div class="goods d-flex f-space-around">
                <div class="card">
                    <img
                        class="card-img"
                        src="https://www.apple.com/newsroom/images/product/iphone/lifestyle/Apple_Shot-on-iPhone-Challenge-2020_Austin-Mann_01072020_big.jpg.large.jpg"
                        alt="photo"
                    />
                    <div class="card-body">
                        <div class="card-title">Card title</div>
                        <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Officia itaque placeat qui suscipit.
                        </p>
                        <a
                            href="#"
                            id="trigger"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            >Link to</a
                        >
                    </div>
                </div>
                <div class="card">
                    <img
                        class="card-img"
                        src="https://www.apple.com/newsroom/images/product/iphone/lifestyle/Apple_Shot-on-iPhone-Challenge-2020_Austin-Mann_01072020_big.jpg.large.jpg"
                        alt="photo"
                    />
                    <div class="card-body">
                        <div class="card-title">Card title #2</div>
                        <p class="card-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Officia itaque placeat qui suscipit.
                        </p>
                        <a
                            href="#"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#exampleModal2"
                            >Link to</a
                        >
                    </div>
                </div>
            </div>

            <div class="modal" id="exampleModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <button class="close" data-close>
                            <span>&times;</span>
                        </button>
                        <div class="modal-header">
                            <div class="modal-title">Modal title</div>
                        </div>
                        <div class="modal-body">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Harum minus doloremque nesciunt enim rem quam
                            corporis? Dolorem pariatur magnam distinctio
                            perferendis. Ratione dolorem voluptates iusto
                            facilis odit veritatis, suscipit voluptatibus!
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-danger" data-close>
                                Close
                            </button>
                            <button class="btn btn-success">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal" id="exampleModal2">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <button class="close" data-close>
                            <span>&times;</span>
                        </button>
                        <div class="modal-header">
                            <div class="modal-title">Modal title #2</div>
                        </div>
                        <div class="modal-body">Lorem ipsum dolor sit</div>
                        <div class="modal-footer">
                            <button class="btn btn-danger" data-close>
                                Close
                            </button>
                            <button class="btn btn-success">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `,
        mounted() {
            $('[data-toggle="modal"]').modal();
        },
    });

    Router.component("ContactPage", {
        template: `<div class="form-container block-center mt-40"></div>`,
        mounted() {
            $(".form-container").form({
                action: "https://your-api-server.com/api/send", // Подставь свой адрес
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
        },
    });

    // 📌 **Компонент "Профиль пользователя" с state**
    Router.component("UserProfile", {
        template: `
            <h1>Профиль пользователя</h1>
            <p>Имя: {{username}}</p>
            <p>Возраст: {{age}}</p>
        `,
        state: {
            username: "Иван",
            age: 25,
        },
    });

    // 📌 **Регистрация маршрутов с компонентами**
    Router.addRoute("/", "HomePage", { title: "Главная страница" });
    Router.addRoute("/about", "AboutPage", { title: "О компании" });
    Router.addRoute("/user", "UserProfile", { title: "Профиль" });
    Router.addRoute("/contact", "ContactPage", { title: "Контакты" });

    // 📌 **Кнопки навигации**
    document
        .getElementById("home")
        .addEventListener("click", () => Router.navigate("/"));
    document
        .getElementById("about")
        .addEventListener("click", () => Router.navigate("/about"));
    document
        .getElementById("profile")
        .addEventListener("click", () => Router.navigate("/user"));
    document.getElementById("contact").addEventListener("click", () => {
        Router.navigate("/contact");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Анимации загружены!");

    $("#fadeInBtn").on("click", () => $("#testBox").fadeIn(500));
    $("#fadeOutBtn").on("click", () => $("#testBox").fadeOut(500));
    $("#fadeToggleBtn").on("click", () => $("#testBox").fadeToggle(500));

    $("#slideUpBtn").on("click", () => $("#testBox").slideUp(500));
    $("#slideDownBtn").on("click", () => $("#testBox").slideDown(500));
    $("#slideToggleBtn").on("click", () => $("#testBox").slideToggle(500));

    $("#scaleInBtn").on("click", () => $("#testBox").scaleIn(500));
    $("#scaleOutBtn").on("click", () => $("#testBox").scaleOut(500));

    $("#bounceBtn").on("click", () => $("#testBox").bounce(3, 10, 150));
    $("#shakeBtn").on("click", () => $("#testBox").shake(4, 8, 100));
});

document.getElementById("saveUser").addEventListener("click", () => {
    Storage.setItem("user", { name: "Иван", age: 25 });
    console.log("✅ Пользователь сохранен в localStorage!");
});

document.getElementById("getUser").addEventListener("click", () => {
    const user = Storage.getItem("user");
    console.log("👤 Данные пользователя из localStorage:", user);
});

document.getElementById("clearUser").addEventListener("click", () => {
    Storage.removeItem("user");
    console.log("🗑️ Пользователь удален из localStorage!");
});

document.getElementById("cacheRequest").addEventListener("click", async () => {
    const data = await Storage.fetchWithCache(
        "https://jsonplaceholder.typicode.com/users/1"
    );
    console.log("📦 Данные из API или кеша:", data);
});

document.getElementById("clearCache").addEventListener("click", () => {
    Storage.clearCache();
    console.log("🗑️ Кеш очищен!");
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Тестирование классов и атрибутов");

    // Создаем тестовый элемент
    const testElement = document.createElement("div");
    testElement.textContent = "Тестовый блок";
    testElement.style.padding = "20px";
    testElement.style.margin = "10px";
    testElement.style.border = "2px solid black";
    document.body.appendChild(testElement);

    // Тестируем классы
    console.log("✅ Добавляем классы:");
    $(testElement).addClass("bg-primary", "text-white");
    console.log(testElement.classList);

    console.log("✅ Удаляем класс 'bg-primary':");
    $(testElement).removeClass("bg-primary");
    console.log(testElement.classList);

    console.log("✅ Переключаем класс 'border-red':");
    $(testElement).toggleClass("border-red");
    console.log(testElement.classList);

    // Тестируем атрибуты
    console.log("✅ Устанавливаем атрибуты:");
    $(testElement).setAttributes({
        "data-role": "test",
        "aria-hidden": "true",
    });
    console.log(testElement.getAttribute("data-role"));
    console.log(testElement.getAttribute("aria-hidden"));

    console.log("✅ Переключаем атрибуты:");
    $(testElement).toggleAttributes({ "data-role": "test" });
    console.log(testElement.getAttribute("data-role"));

    console.log("✅ Удаляем атрибут 'aria-hidden':");
    $(testElement).removeAttributes("aria-hidden");
    console.log(testElement.getAttribute("aria-hidden"));
});

document.getElementById("increaseProgress").addEventListener("click", () => {
    const progress = document.getElementById("progress1");
    let currentValue = parseInt(
        progress.querySelector(".progress-bar").style.width
    );
    let newValue = Math.min(currentValue + 2, 100);
    progress.updateProgress(newValue);
});

document.getElementById("resetProgress").addEventListener("click", () => {
    const progress = document.getElementById("progress1");
    progress.updateProgress(0);
});

document.getElementById("showSpinner").addEventListener("click", () => {
    const spinner = document.getElementById("spinner1");
    spinner.showSpinner();
});

document.getElementById("hideSpinner").addEventListener("click", () => {
    const spinner = document.getElementById("spinner1");
    spinner.hideSpinner();
});

document.addEventListener("DOMContentLoaded", () => {
    $("[data-lightbox]").lightbox();
});

document.addEventListener("DOMContentLoaded", () => {
    $("[data-tabpanel] .tab-item").tab({
        animated: true, // или false
        remote: false, // или false, если не используешь data-tab-url
    });
});

$("#date").datepicker();

const products = [
    {
        id: 1,
        title: "Кроссовки Nike Air Max",
        price: 8990,
        image: "https://www.shoes-report.ru/upload/resize_cache/webp/iblock/586/sstwystwcedl99sipbvyy97hlvsl79gw.webp",
        description: "Классические кроссовки Nike с отличной амортизацией.",
        details: "Подробное описание...",
        category: "Обувь",
        brand: "Nike",
        sku: "NK-AIR-001",
        discount: 15,
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
        id: 2,
        title: "Футболка Puma",
        price: 1990,
        image: "https://www.shoes-report.ru/upload/resize_cache/webp/iblock/586/sstwystwcedl99sipbvyy97hlvsl79gw.webp",
        description: "Удобная повседневная футболка.",
    },
    {
        id: 3,
        title: "Кепка Adidas",
        price: 990,
        image: "https://www.shoes-report.ru/upload/resize_cache/webp/iblock/586/sstwystwcedl99sipbvyy97hlvsl79gw.webp",
        description: "Лёгкая кепка с защитой от солнца.",
    },
    {
        id: 4,
        title: "Рюкзак Supreme",
        price: 4590,
        image: "https://www.shoes-report.ru/upload/resize_cache/webp/iblock/586/sstwystwcedl99sipbvyy97hlvsl79gw.webp",
        description: "Стильный рюкзак для города и путешествий.",
        details:
            "Подробное описание товара: технология подошвы, материал, и т.дdsadasddassdasddas.",
    },
];

$(".catalog").catalog({
    products,
    columns: 4,
    showBuyButton: true,
    showDetailsButton: true,
    showImage: true,
    showPrice: true,
    showDescription: true,
});

$("#auth-button").on("click", () => {
    $("body").loginModal({
        apiUrl: "/api/auth", // оставь путь как фиктивный
    });
});

$("#countdown").countdown({
    endDate: "2025-04-02 23:59:59", // Установите дату окончания акции
    labelText: "До окончания акции осталось:", // Пользовательский текст
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Router initialized");

    Router.init("history");

    // 📌 Инициализация загрузки файла
    const fileUploadContainer = document.getElementById(
        "file-upload-container"
    );
    if (fileUploadContainer) {
        $(fileUploadContainer).fileUpload({
            apiUrl: "/upload-endpoint",
            buttonText: "Выберите файл для загрузки",
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const ratingContainer = document.getElementById("rating-container");

    // Инициализируем рейтинг, устанавливаем начальное значение из Store
    if (ratingContainer) {
        $(ratingContainer).rating({
            totalStars: 5,
            defaultRating: Store.getState("rating") || 0, // Получаем рейтинг из Store
            onRatingChange: (newRating) => {
                console.log("Новый рейтинг: " + newRating);
                // Можно отправить этот рейтинг на сервер, если нужно
            },
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const sidebarContainer = document.getElementById("sidebar-container");

    // Инициализация компонента Sidebar
    $(sidebarContainer).sidebar({
        socialLinks: {
            telegram: true,
            instagram: true,
            facebook: true,
            github: true,
            twitch: true,
            youtube: true, // You can set to false to hide YouTube
            pinterest: true,
            twitter: true,
            tiktok: true,
            whatsapp: true,
            reddit: true,
        },
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const chartContainer = document.getElementById("chart-container");

    // Данные и настройки для графика
    const chartOptions = {
        type: "bar", // Тип графика: столбчатый
        labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь"],
        data: [12, 19, 3, 5, 2, 3], // Данные для графика
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Цвет фона столбцов
        borderColor: "rgba(255, 99, 132, 1)", // Цвет границ столбцов
        borderWidth: 1, // Толщина границы
        title: "Месячные продажи", // Заголовок графика
    };

    // Вставляем график в контейнер
    $(chartContainer).chart(chartOptions);
});

document.addEventListener("DOMContentLoaded", () => {
    const dragContainer = document.getElementById("drag-container");

    // Применяем компонент drag-and-drop к контейнеру
    $(dragContainer).dragAndDrop();
});
