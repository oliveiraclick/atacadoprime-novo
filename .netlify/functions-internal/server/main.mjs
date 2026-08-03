globalThis.__nitro_main__ = import.meta.url;
import { a as NodeResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { d as _objectSpread2, f as init_objectSpread2 } from "./_libs/@dnd-kit/core.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_GJtqIf = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_GJtqIf
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
init_objectSpread2();
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	var _error$unhandled;
	const unhandled = (_error$unhandled = error.unhandled) !== null && _error$unhandled !== void 0 ? _error$unhandled : !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: _objectSpread2({ error: true }, unhandled ? {
			status,
			unhandled: true
		} : typeof error.toJSON === "function" ? error.toJSON() : {
			status,
			statusText,
			message: error.message
		})
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx === null || errorCtx === void 0 ? void 0 : errorCtx.event) {
			var _errorCtx$event$req$c;
			const errors = (_errorCtx$event$req$c = errorCtx.event.req.context) === null || _errorCtx$event$req$c === void 0 || (_errorCtx$event$req$c = _errorCtx$event$req$c.nitro) === null || _errorCtx$event$req$c === void 0 ? void 0 : _errorCtx$event$req$c.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context || (req.context = {});
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		var _route$data;
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules === null || routeRules === void 0 ? void 0 : routeRules.routeRules;
		if (routeRules === null || routeRules === void 0 ? void 0 : routeRules.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route === null || route === void 0 || (_route$data = route.data) === null || _route$data === void 0 || (_route$data = _route$data.middleware) === null || _route$data === void 0 ? void 0 : _route$data.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
init_objectSpread2();
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!(m === null || m === void 0 ? void 0 : m.length)) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = _objectSpread2(_objectSpread2({}, currentRule.options), rule.options);
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = _objectSpread2(_objectSpread2({}, currentRule.params), layer.params);
		} else if (rule.options !== false) routeRules[rule.name] = _objectSpread2(_objectSpread2({}, rule), {}, { params: layer.params });
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => {
		var _a$handler, _b$handler;
		return (((_a$handler = a.handler) === null || _a$handler === void 0 ? void 0 : _a$handler.order) || 0) - (((_b$handler = b.handler) === null || _b$handler === void 0 ? void 0 : _b$handler.order) || 0);
	});
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/netlify/runtime/netlify.mjs
var nitroApp = useNitroApp();
var ONE_YEAR_IN_SECONDS = 365 * 24 * 60 * 60;
var handler = async (req) => {
	var _req$runtime, _req$ip, _ref, _req$context;
	(_req$runtime = req.runtime) !== null && _req$runtime !== void 0 || (req.runtime = { name: "netlify" });
	(_req$ip = req.ip) !== null && _req$ip !== void 0 || (req.ip = req.headers.get("x-nf-client-connection-ip") || void 0);
	const response = await nitroApp.fetch(req);
	const isr = (_ref = ((_req$context = req.context) === null || _req$context === void 0 ? void 0 : _req$context.routeRules) || {}) === null || _ref === void 0 || (_ref = _ref.isr) === null || _ref === void 0 ? void 0 : _ref.options;
	if (isr) {
		const maxAge = typeof isr === "number" ? isr : ONE_YEAR_IN_SECONDS;
		const revalidateDirective = typeof isr === "number" ? `stale-while-revalidate=${ONE_YEAR_IN_SECONDS}` : "must-revalidate";
		if (!response.headers.has("Cache-Control")) response.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
		response.headers.set("Netlify-CDN-Cache-Control", `public, max-age=${maxAge}, ${revalidateDirective}, durable`);
	}
	return response;
};
//#endregion
export { handler as default };
