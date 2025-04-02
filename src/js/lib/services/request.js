import $ from "../core";

$.prototype.errorHandler = function (error, url) {
    console.error(`API Error at ${url}:`, error.message);
    return { error: true, message: error.message };
};

$.prototype.get = async function (url, options = {}) {
    try {
        let res = await fetch(url, {
            method: "GET",
            headers: options.headers || {},
        });

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }

        switch (options.dataType || "json") {
            case "json":
                return await res.json();
            case "text":
                return await res.text();
            case "blob":
                return await res.blob();
            default:
                return await res.json();
        }
    } catch (error) {
        return this.errorHandler(error, url);
    }
};

$.prototype.post = async function (url, data, options = {}) {
    try {
        let res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }

        switch (options.dataType || "json") {
            case "json":
                return await res.json();
            case "text":
                return await res.text();
            case "blob":
                return await res.blob();
            default:
                return await res.json();
        }
    } catch (error) {
        return this.errorHandler(error, url);
    }
};

$.prototype.put = async function (url, data, options = {}) {
    try {
        let res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
        });

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        return this.errorHandler(error, url);
    }
};

$.prototype.delete = async function (url, options = {}) {
    try {
        let res = await fetch(url, {
            method: "DELETE",
            headers: options.headers || {},
        });

        if (!res.ok) {
            throw new Error(`HTTP Error ${res.status}`);
        }

        return await res.json();
    } catch (error) {
        return this.errorHandler(error, url);
    }
};

// WebSocket Support
$.prototype.ws = function (url) {
    let socket = new WebSocket(url);

    return {
        on: function (event, callback) {
            socket.addEventListener(event, callback);
        },
        send: function (data) {
            if (socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(data));
            } else {
                console.error("WebSocket is not open.");
            }
        },
        close: function () {
            socket.close();
        },
    };
};
