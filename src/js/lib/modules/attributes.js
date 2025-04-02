import "../core";

// 🔹 Устанавливает несколько атрибутов (setAttributes({ key: value }))
$.prototype.setAttributes = function (attributes = {}) {
    if (typeof attributes !== "object") return this;

    for (let i = 0; i < this.length; i++) {
        for (let key in attributes) {
            if (attributes[key] !== null) {
                this[i].setAttribute(key, attributes[key]);
            }
        }
    }
    return this;
};

// 🔹 Удаляет несколько атрибутов (removeAttributes([...]))
$.prototype.removeAttributes = function (...names) {
    for (let i = 0; i < this.length; i++) {
        names.forEach((name) => {
            this[i].removeAttribute(name);
        });
    }
    return this;
};

// 🔹 Переключает несколько атрибутов (toggleAttributes({ key: value }))
$.prototype.toggleAttributes = function (attributes = {}) {
    if (typeof attributes !== "object") return this;

    for (let i = 0; i < this.length; i++) {
        for (let key in attributes) {
            if (this[i].hasAttribute(key)) {
                this[i].removeAttribute(key);
            } else {
                this[i].setAttribute(key, attributes[key]);
            }
        }
    }
    return this;
};
