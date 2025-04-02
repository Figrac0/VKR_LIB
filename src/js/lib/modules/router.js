const Router = {
    routes: [],
    currentRoute: null,
    mode: "history",
    components: {}, // 🔹 Список зарегистрированных компонентов

    init(mode = "history") {
        this.mode = mode;
        if (mode === "history") {
            window.addEventListener("popstate", this.onPopState.bind(this));
        } else {
            window.addEventListener("hashchange", this.onHashChange.bind(this));
        }

        if (!this.findRoute(this.getCurrentPath())) {
            this.navigate("/");
        } else {
            this.renderRoute(this.getCurrentPath());
        }
    },

    addRoute(path, component, options = {}) {
        this.routes.push({
            path: this.parsePath(path),
            component,
            beforeEnter: options.beforeEnter || null,
            afterEnter: options.afterEnter || null,
            title: options.title || "SPA Page",
            description: options.description || "",
        });
    },

    findRoute(path) {
        return this.routes.find((route) => this.matchRoute(route.path, path));
    },

    navigate(path) {
        const route = this.findRoute(path);
        if (route) {
            if (route.beforeEnter && typeof route.beforeEnter === "function") {
                const allowNavigation = route.beforeEnter();
                if (!allowNavigation) return;
            }

            this.currentRoute = route;
            this.updateHistory(path);
            this.renderRoute(path);

            if (route.afterEnter && typeof route.afterEnter === "function") {
                route.afterEnter();
            }
        }
    },

    getCurrentPath() {
        return this.mode === "history"
            ? window.location.pathname
            : window.location.hash.slice(1);
    },

    updateHistory(path) {
        if (this.mode === "history") {
            window.history.pushState({}, "", path);
        } else {
            window.location.hash = path;
        }
    },

    // 🔹 **Обновленный метод renderRoute()**
    renderRoute(path) {
        const route = this.findRoute(path);
        const rootElement = document.getElementById("app");

        if (!route) {
            rootElement.innerHTML = "<h1>404 - Страница не найдена</h1>";
            return;
        }

        // 🔹 Проверяем, является ли компонентом
        if (this.components[route.component]) {
            rootElement.innerHTML = this.renderComponent(route.component);
        } else if (typeof route.component === "function") {
            route.component().then((html) => (rootElement.innerHTML = html));
        } else {
            rootElement.innerHTML = route.component;
        }

        // Обновление мета-тегов
        document.title = route?.title || "SPA Page";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.setAttribute("content", route?.description || "");
        }
    },

    onPopState() {
        this.renderRoute(this.getCurrentPath());
    },

    onHashChange() {
        this.renderRoute(this.getCurrentPath());
    },

    parsePath(path) {
        return path.replace(/:([a-zA-Z]+)/g, "(?<$1>[^/]+)");
    },

    matchRoute(routePath, realPath) {
        const regex = new RegExp(`^${routePath}$`);
        return regex.test(realPath);
    },

    getParams(path) {
        const route = this.routes.find((route) =>
            this.matchRoute(route.path, path)
        );
        if (!route) return {};

        const match = path.match(new RegExp(`^${route.path}$`));
        return match?.groups || {};
    },

    // 📌 **Метод для регистрации компонентов**
    component(name, options) {
        this.components[name] = options;
    },

    // 📌 **Метод для рендеринга компонентов**
    renderComponent(name, props = {}) {
        const component = this.components[name];

        if (!component) {
            console.error(`Компонент ${name} не найден`);
            return "";
        }

        let html = component.template;
        if (component.state) {
            Object.keys(component.state).forEach((key) => {
                const regex = new RegExp(`{{${key}}}`, "g");
                html = html.replace(regex, component.state[key]);
            });
        }

        if (typeof component.mounted === "function") {
            setTimeout(() => component.mounted(props), 0);
        }

        return html;
    },
};

export default Router;
