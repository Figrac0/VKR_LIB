document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector(".sticky-header");
    const authButton = document.getElementById("auth-button");
    const authModal = document.createElement("div"); // Для модального окна авторизации

    let prevScrollPos = window.pageYOffset;

    // При скроллинге страницы добавляем или убираем класс sticky
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        if (currentScrollPos > 10) {
            // Если прокручено больше 10px
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        prevScrollPos = currentScrollPos;
    };
});
