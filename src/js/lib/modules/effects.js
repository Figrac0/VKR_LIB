import $ from "../core";

// Функция для плавной анимации
$.prototype.animateOverTime = function (dur, cb, fin) {
    let timeStart;

    function _animateOverTime(time) {
        if (!timeStart) {
            timeStart = time;
        }

        let timeElapsed = time - timeStart;
        let completion = Math.min(timeElapsed / dur, 1);

        cb(completion);

        if (timeElapsed < dur) {
            requestAnimationFrame(_animateOverTime);
        } else {
            if (typeof fin === "function") {
                fin();
            }
        }
    }

    return _animateOverTime;
};

// 🔹 **Функции fadeIn и fadeOut**
function _fadeIn(element, dur, display = "block", fin) {
    element.style.display = display;

    const fadeInAction = (completion) => {
        element.style.opacity = completion;
    };

    const ani = $.prototype.animateOverTime(dur, fadeInAction, fin);
    requestAnimationFrame(ani);
}

function _fadeOut(element, dur, fin) {
    const fadeOutAction = (completion) => {
        element.style.opacity = 1 - completion;
        if (completion === 1) {
            element.style.display = "none";
        }
    };

    const ani = $.prototype.animateOverTime(dur, fadeOutAction, fin);
    requestAnimationFrame(ani);
}

// 🔹 **Функции slideUp и slideDown**
function _slideUp(element, dur, fin) {
    element.style.overflow = "hidden";
    const height = element.scrollHeight;

    element.style.transition = `height ${dur}ms ease-out`;
    element.style.height = `${height}px`;

    setTimeout(() => {
        element.style.height = "0px";
    }, 10);

    setTimeout(() => {
        element.style.display = "none";
        if (typeof fin === "function") fin();
    }, dur);
}

function _slideDown(element, dur, fin) {
    element.style.display = "block";
    const height = element.scrollHeight;

    element.style.overflow = "hidden";
    element.style.height = "0px";
    element.style.transition = `height ${dur}ms ease-in`;

    setTimeout(() => {
        element.style.height = `${height}px`;
    }, 10);

    setTimeout(() => {
        element.style.height = "";
        element.style.overflow = "";
        if (typeof fin === "function") fin();
    }, dur);
}

// 🔹 **Функции scaleIn и scaleOut**
function _scaleIn(element, dur, fin) {
    element.style.transform = "scale(0)";
    element.style.display = "block";
    element.style.transition = `transform ${dur}ms ease-in-out`;

    setTimeout(() => {
        element.style.transform = "scale(1)";
        if (typeof fin === "function") fin();
    }, 10);
}

function _scaleOut(element, dur, fin) {
    element.style.transition = `transform ${dur}ms ease-in-out`;
    element.style.transform = "scale(0)";

    setTimeout(() => {
        element.style.display = "none";
        if (typeof fin === "function") fin();
    }, dur);
}

// 🔹 **Bounce (подпрыгивание)**
function _bounce(element, times, distance, duration, fin) {
    let count = 0;
    function animateBounce() {
        if (count >= times) {
            if (typeof fin === "function") fin();
            return;
        }
        count++;
        element.style.transform = `translateY(-${distance}px)`;
        setTimeout(() => {
            element.style.transform = "translateY(0px)";
            setTimeout(animateBounce, duration);
        }, duration);
    }
    animateBounce();
}

// 🔹 **Shake (встряска)**
function _shake(element, times, distance, duration, fin) {
    let count = 0;
    function animateShake() {
        if (count >= times) {
            if (typeof fin === "function") fin();
            return;
        }
        count++;
        element.style.transform = `translateX(-${distance}px)`;
        setTimeout(() => {
            element.style.transform = `translateX(${distance}px)`;
            setTimeout(() => {
                element.style.transform = "translateX(0px)";
                setTimeout(animateShake, duration);
            }, duration);
        }, duration);
    }
    animateShake();
}

// 🔹 **Добавляем функции к прототипу $**
$.prototype.fadeIn = function (dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        _fadeIn(this[i], dur || $.animationSpeed, display, fin);
    }
    return this;
};

$.prototype.fadeOut = function (dur, fin) {
    for (let i = 0; i < this.length; i++) {
        _fadeOut(this[i], dur || $.animationSpeed, fin);
    }
    return this;
};

$.prototype.fadeToggle = function (dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === "none") {
            _fadeIn(this[i], dur || $.animationSpeed, display, fin);
        } else {
            _fadeOut(this[i], dur || $.animationSpeed, fin);
        }
    }
    return this;
};

$.prototype.slideUp = function (dur, fin) {
    for (let i = 0; i < this.length; i++) {
        _slideUp(this[i], dur || $.animationSpeed, fin);
    }
    return this;
};

$.prototype.slideDown = function (dur, fin) {
    for (let i = 0; i < this.length; i++) {
        _slideDown(this[i], dur || $.animationSpeed, fin);
    }
    return this;
};

$.prototype.slideToggle = function (dur, fin) {
    for (let i = 0; i < this.length; i++) {
        if (window.getComputedStyle(this[i]).display === "none") {
            _slideDown(this[i], dur || $.animationSpeed, fin);
        } else {
            _slideUp(this[i], dur || $.animationSpeed, fin);
        }
    }
    return this;
};

$.prototype.scaleIn = function (dur, fin) {
    for (let i = 0; i < this.length; i++) {
        _scaleIn(this[i], dur || $.animationSpeed, fin);
    }
    return this;
};

$.prototype.scaleOut = function (dur, fin) {
    for (let i = 0; i < this.length; i++) {
        _scaleOut(this[i], dur || $.animationSpeed, fin);
    }
    return this;
};

$.prototype.bounce = function (times = 3, distance = 10, duration = 200, fin) {
    for (let i = 0; i < this.length; i++) {
        _bounce(this[i], times, distance, duration, fin);
    }
    return this;
};

$.prototype.shake = function (times = 3, distance = 10, duration = 100, fin) {
    for (let i = 0; i < this.length; i++) {
        _shake(this[i], times, distance, duration, fin);
    }
    return this;
};

// 🔹 **Глобальная настройка скорости анимаций**
$.animationSpeed = 500;
