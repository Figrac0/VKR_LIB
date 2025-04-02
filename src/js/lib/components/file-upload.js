import $ from "../core";

$.prototype.fileUpload = function (options = {}) {
    const {
        apiUrl = "/upload-endpoint",
        buttonText = "Выберите файл для загрузки",
    } = options;

    return this.each(function () {
        const container = this;

        // Создаем элементы
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*, .pdf, .txt, .doc, .docx, .xls, .xlsx";
        fileInput.style.display = "none";

        const uploadButton = document.createElement("button");
        uploadButton.textContent = buttonText;
        uploadButton.classList.add("btn-upload");

        const fileInfo = document.createElement("div");
        fileInfo.classList.add("file-info");

        const submitButton = document.createElement("button");
        submitButton.textContent = "Отправить файл";
        submitButton.classList.add("btn-submit");
        submitButton.disabled = true;

        // Открытие выбора файла
        uploadButton.addEventListener("click", () => {
            fileInput.click();
        });

        // Обработка выбора файла
        fileInput.addEventListener("change", (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                const file = files[0];
                fileInfo.innerHTML = `<span>Вы выбрали файл: ${file.name}</span>`;
                submitButton.disabled = false; // ✅ включаем кнопку
            } else {
                fileInfo.innerHTML = "";
                submitButton.disabled = true;
            }
        });

        // Отправка файла
        submitButton.addEventListener("click", async () => {
            const file = fileInput.files[0];
            if (!file) return;

            const formData = new FormData();
            formData.append("file", file);

            try {
                const res = await fetch(apiUrl, {
                    method: "POST",
                    body: formData,
                });

                if (!res.ok) throw new Error("Ошибка загрузки");

                const result = await res.json();
                // Используем toast вместо alert
                $(document.body).showToast(
                    "✅ Файл успешно загружен!",
                    "success",
                    3000
                );
                console.log(result);
                fileInput.value = "";
                fileInfo.innerHTML = "";
                submitButton.disabled = true;
            } catch (err) {
                // Используем toast для ошибок
                $(document.body).showToast(
                    "❌ Ошибка загрузки файла",
                    "error",
                    3000
                );
                console.error(err);
            }
        });

        // Добавляем элементы в DOM
        container.appendChild(uploadButton);
        container.appendChild(fileInfo);
        container.appendChild(submitButton);
        container.appendChild(fileInput); // Обязательно добавить в DOM
    });
};
