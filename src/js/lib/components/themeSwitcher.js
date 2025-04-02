// themeSwitcher.js

// Проверка, если сохранена тема в localStorage
const currentTheme = localStorage.getItem("theme") || "light";

// Устанавливаем текущую тему
document.body.classList.add(`${currentTheme}-theme`);

// Переключатель темы
const themeSwitcherButton = document.getElementById("theme-switcher");

themeSwitcherButton.addEventListener("click", () => {
    // Переключаем тему
    if (document.body.classList.contains("light-theme")) {
        document.body.classList.replace("light-theme", "dark-theme");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.replace("dark-theme", "light-theme");
        localStorage.setItem("theme", "light");
    }
});
