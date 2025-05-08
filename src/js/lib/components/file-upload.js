import $ from "../core";

$.prototype.fileUpload = function (options = {}) {
    const {
        apiUrl = "/upload-endpoint",
        buttonText = "Выберите файл для загрузки",
    } = options;

    return this.each(function () {
        const container = this;

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

        uploadButton.addEventListener("click", () => {
            fileInput.click();
        });

        fileInput.addEventListener("change", (e) => {
            const files = e.target.files;
            if (files.length > 0) {
                const file = files[0];
                fileInfo.innerHTML = `<span>Вы выбрали файл: ${file.name}</span>`;
                submitButton.disabled = false;
            } else {
                fileInfo.innerHTML = "";
                submitButton.disabled = true;
            }
        });

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
                $.toast({
                    message: "✅ Файл успешно загружен!",
                    type: "success",
                    duration: 3000,
                });

                console.log(result);
                fileInput.value = "";
                fileInfo.innerHTML = "";
                submitButton.disabled = true;
            } catch (err) {
                $.toast({
                    message: "❌ Ошибка загрузки файла",
                    type: "error",
                    duration: 3000,
                });
                console.error(err);
            }
        });

        container.appendChild(uploadButton);
        container.appendChild(fileInfo);
        container.appendChild(submitButton);
        container.appendChild(fileInput);
    });
};
