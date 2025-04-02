import $ from "../core";
//Управляет содержимым HTML-элементов. Возвращает или устанавливает HTML-содержимое выбранных элементов.
$.prototype.html = function (content) {
    for (let i = 0; i < this.length; i++) {
        if (content) {
            this[i].innerHTML = content;
        } else {
            return this[i].innerHTML;
        }
    }

    return this;
};
//Выбирает элемент по индексу. Оставляет только один элемент из коллекции, соответствующий указанному индексу.
$.prototype.eq = function (i) {
    const swap = this[i];
    const objLength = Object.keys(this).length;

    for (let i = 0; i < objLength; i++) {
        delete this[i];
    }

    this[0] = swap;
    this.length = 1;
    return this;
};
//Определяет позицию текущего элемента среди его соседних элементов в родительском узле.
$.prototype.index = function () {
    const parent = this[0].parentNode;
    const childs = [...parent.children];

    const findMyIndex = (item) => {
        return item == this[0];
    };

    return childs.findIndex(findMyIndex);
};
//Находит потомков элементов по селектору. Возвращает элементы, соответствующие заданному CSS-селектору внутри текущего набора элементов.
$.prototype.find = function (selector) {
    // Переменная для хранения общего числа найденных элементов.
    let numberOfItems = 0;

    // Переменная для отслеживания позиции, куда будут сохраняться найденные элементы.
    let counter = 0;

    // Создание поверхностной копии текущего объекта (`this`) с помощью `Object.assign`.
    const copyObj = Object.assign({}, this);

    // Цикл проходит по всем элементам в `copyObj`.
    for (let i = 0; i < copyObj.length; i++) {
        // Используем `querySelectorAll`, чтобы найти все элементы внутри текущего элемента,
        // которые соответствуют заданному селектору.
        const arr = copyObj[i].querySelectorAll(selector);

        // Если элементов не найдено, переходим к следующему элементу `copyObj`.
        if (arr.length == 0) {
            continue;
        }

        // Вложенный цикл проходит по всем найденным элементам и сохраняет их в текущем объекте (`this`).
        for (let j = 0; j < arr.length; j++) {
            this[counter] = arr[j];
            counter++;
        }

        // Обновляем количество найденных элементов.
        numberOfItems += arr.length;
    }

    // Обновляем свойство `length` текущего объекта, чтобы оно отражало количество найденных элементов.
    this.length = numberOfItems;

    // Получаем текущее количество ключей (свойств) в объекте `this`.
    const objLength = Object.keys(this).length;

    // Удаляем все свойства объекта `this`, которые находятся за пределами найденных элементов.
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};

// $.prototype.closest = function(selector) {
//     let counter = 0;

//     for (let i = 0; i < this.length; i++) {
//         this[i] = this[i].closest(selector);
//         counter++;
//     }

//     const objLength = Object.keys(this).length;
//     for (; counter < objLength; counter++) {
//         delete this[counter];
//     }

//     return this;
// };

$.prototype.closest = function (selector) {
    // Создаем массив, чтобы хранить элементы, удовлетворяющие селектору
    let result = [];

    // Проходим по каждому элементу
    for (let i = 0; i < this.length; i++) {
        // Находим ближайшего предка для текущего элемента, соответствующего селектору
        const closestElement = this[i].closest(selector);
        // Если элемент найден, добавляем его в массив result
        if (closestElement) {
            result.push(closestElement);
        }
    }

    // Обновляем длину объекта, чтобы она соответствовала количеству найденных элементов
    this.length = result.length;
    // Обновляем объект с элементами из массива result
    for (let i = 0; i < result.length; i++) {
        this[i] = result[i];
    }

    // Удаляем лишние элементы, которые могут остаться
    for (let i = result.length; i < this.length; i++) {
        delete this[i];
    }

    // Возвращаем обновленный объект
    return this;
};

$.prototype.siblings = function () {
    let numberOfItems = 0;
    let counter = 0;

    const copyObj = Object.assign({}, this);

    for (let i = 0; i < copyObj.length; i++) {
        const arr = copyObj[i].parentNode.children;

        for (let j = 0; j < arr.length; j++) {
            if (copyObj[i] === arr[j]) {
                continue;
            }

            this[counter] = arr[j];
            counter++;
        }

        numberOfItems += arr.length - 1;
    }

    this.length = numberOfItems;

    const objLength = Object.keys(this).length;
    for (; numberOfItems < objLength; numberOfItems++) {
        delete this[numberOfItems];
    }

    return this;
};
