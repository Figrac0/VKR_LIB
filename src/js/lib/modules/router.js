import $ from "../core";

const Router = {
    routes: [],
    currentRoute: null,
    mode: "history",
    basePath: "/VKR", // если проект в подкаталоге
    components: {},

    init(mode = "history") {
        this.mode = mode;

        if (mode === "history") {
            window.addEventListener("popstate", this.onPopState.bind(this));
        } else {
            window.addEventListener("hashchange", this.onHashChange.bind(this));
        }

        const currentPath = this.getCurrentPath() || "/";
        if (!this.findRoute(currentPath)) {
            this.navigate("/");
        } else {
            this.renderRoute(currentPath);
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
        const rawPath =
            this.mode === "history"
                ? window.location.pathname
                : window.location.hash.slice(1);

        return this.mode === "history" && this.basePath
            ? rawPath.replace(this.basePath, "") || "/"
            : rawPath || "/";
    },

    updateHistory(path) {
        if (this.mode === "history") {
            const fullPath = this.basePath ? `${this.basePath}${path}` : path;
            window.history.pushState({}, "", fullPath);
        } else {
            window.location.hash = path;
        }
    },

    renderRoute(path) {
        const existingDatepicker = document.querySelector(".datepicker");
        if (existingDatepicker) {
            existingDatepicker.remove();
        }

        const route = this.findRoute(path);
        const rootElement = document.getElementById("app");

        if (!route) {
            rootElement.innerHTML = "<h1>404 - Страница не найдена</h1>";
            return;
        }

        const html = this.renderComponent(route.component);
        rootElement.innerHTML = html;

        requestAnimationFrame(() => {
            const component = this.components[route.component];
            if (typeof component?.mounted === "function") {
                component.mounted();
            }
        });

        document.title = route?.title || "SPA Page";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.setAttribute("content", route?.description || "");
        }
    },

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

        return html; // ❗ HTML возвращается, но не вставляется
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

    component(name, options) {
        this.components[name] = options;
    },
};

window.Router = Router;
export default Router;
