import $ from "../core";

const Storage = {
    setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Ошибка при сохранении в localStorage:", error);
        }
    },

    getItem(key) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (error) {
            console.error("Ошибка при получении из localStorage:", error);
            return null;
        }
    },

    removeItem(key) {
        localStorage.removeItem(key);
    },

    clearStorage() {
        localStorage.clear();
    },

    setSessionItem(key, value) {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Ошибка при сохранении в sessionStorage:", error);
        }
    },

    getSessionItem(key) {
        try {
            return JSON.parse(sessionStorage.getItem(key));
        } catch (error) {
            console.error("Ошибка при получении из sessionStorage:", error);
            return null;
        }
    },

    removeSessionItem(key) {
        sessionStorage.removeItem(key);
    },

    clearSessionStorage() {
        sessionStorage.clear();
    },

    async fetchWithCache(url, cacheTime = 60 * 60 * 1000) {
        const cacheKey = `cache_${url}`;
        const cachedData = this.getItem(cacheKey);

        if (cachedData) {
            const now = Date.now();
            if (now - cachedData.timestamp < cacheTime) {
                console.log(`🔹 Данные из кеша: ${url}`);
                return cachedData.data;
            } else {
                this.removeItem(cacheKey);
            }
        }

        try {
            console.log(`🔄 Запрос к API: ${url}`);
            const response = await fetch(url);
            if (!response.ok)
                throw new Error(`Ошибка HTTP: ${response.status}`);
            const data = await response.json();

            this.setItem(cacheKey, { timestamp: Date.now(), data });
            return data;
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
            return null;
        }
    },

    clearCache() {
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("cache_")) {
                localStorage.removeItem(key);
            }
        });
    },
};
window.Storage = Storage;
export default Storage;
