import $ from "../core";

// 🔹 Добавляет несколько классов (addClass([...]))
$.prototype.addClass = function (...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList) continue;
        this[i].classList.add(...classNames.flat());
    }
    return this;
};

// 🔹 Удаляет несколько классов (removeClass([...]))
$.prototype.removeClass = function (...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList) continue;
        this[i].classList.remove(...classNames.flat());
    }
    return this;
};

// 🔹 Переключает несколько классов (toggleClass([...]))
$.prototype.toggleClass = function (...classNames) {
    for (let i = 0; i < this.length; i++) {
        if (!this[i].classList) continue;
        classNames.flat().forEach((cls) => {
            this[i].classList.toggle(cls);
        });
    }
    return this;
};
