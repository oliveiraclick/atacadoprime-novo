import { j as parseRedirect, k as isRedirect } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as defaultSerovalPlugins, c as makeSerovalPlugin, i as mergeHeaders } from "../_libs/@tanstack/router-core+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { t as createMiddleware } from "./createStart-ZMLkT8B7.mjs";
import { n as toResponse, t as H3Event } from "../_libs/h3-v2.mjs";
import { AsyncLocalStorage } from "node:async_hooks";
//#region node_modules/.nitro/vite/services/ssr/assets/esm-BG-5H9y6.js
var GLOBAL_EVENT_STORAGE_KEY = Symbol.for("tanstack-start:event-storage");
var globalObj$1 = globalThis;
if (!globalObj$1[GLOBAL_EVENT_STORAGE_KEY]) globalObj$1[GLOBAL_EVENT_STORAGE_KEY] = new AsyncLocalStorage();
var eventStorage = globalObj$1[GLOBAL_EVENT_STORAGE_KEY];
function isPromiseLike(value) {
	return typeof value.then === "function";
}
function getSetCookieValues(headers) {
	const headersWithSetCookie = headers;
	if (typeof headersWithSetCookie.getSetCookie === "function") return headersWithSetCookie.getSetCookie();
	const value = headers.get("set-cookie");
	return value ? [value] : [];
}
function mergeEventResponseHeaders(response, event) {
	if (response.ok) return;
	const eventSetCookies = getSetCookieValues(event.res.headers);
	if (eventSetCookies.length === 0) return;
	const responseSetCookies = getSetCookieValues(response.headers);
	response.headers.delete("set-cookie");
	for (const cookie of responseSetCookies) response.headers.append("set-cookie", cookie);
	for (const cookie of eventSetCookies) response.headers.append("set-cookie", cookie);
}
function attachResponseHeaders(value, event) {
	if (isPromiseLike(value)) return value.then((resolved) => {
		if (resolved instanceof Response) mergeEventResponseHeaders(resolved, event);
		return resolved;
	});
	if (value instanceof Response) mergeEventResponseHeaders(value, event);
	return value;
}
function requestHandler(handler) {
	return (request, requestOpts) => {
		let h3Event;
		try {
			h3Event = new H3Event(request);
		} catch (error) {
			if (error instanceof URIError) return new Response(null, {
				status: 400,
				statusText: "Bad Request"
			});
			throw error;
		}
		return toResponse(attachResponseHeaders(eventStorage.run({ h3Event }, () => handler(request, requestOpts)), h3Event), h3Event);
	};
}
function getH3Event() {
	const event = eventStorage.getStore();
	if (!event) throw new Error(`No StartEvent found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return event.h3Event;
}
function getRequest() {
	return getH3Event().req;
}
function getResponse() {
	return getH3Event().res;
}
var TSS_FORMDATA_CONTEXT = "__TSS_CONTEXT";
var TSS_SERVER_FUNCTION = Symbol.for("TSS_SERVER_FUNCTION");
var TSS_SERVER_FUNCTION_FACTORY = Symbol.for("TSS_SERVER_FUNCTION_FACTORY");
var X_TSS_SERIALIZED = "x-tss-serialized";
var X_TSS_RAW_RESPONSE = "x-tss-raw";
/** Content-Type for multiplexed framed responses (RawStream support) */
var TSS_CONTENT_TYPE_FRAMED = "application/x-tss-framed";
/**
* Frame types for binary multiplexing protocol.
*/
var FrameType = {
	/** Seroval JSON chunk (NDJSON line) */
	JSON: 0,
	/** Raw stream data chunk */
	CHUNK: 1,
	/** Raw stream end (EOF) */
	END: 2,
	/** Raw stream error */
	ERROR: 3
};
/** Full Content-Type header value with version parameter */
var TSS_CONTENT_TYPE_FRAMED_VERSIONED = `${TSS_CONTENT_TYPE_FRAMED}; v=1`;
function isSafeKey(key) {
	return key !== "__proto__" && key !== "constructor" && key !== "prototype";
}
/**
* Merge target and source into a new null-proto object, filtering dangerous keys.
*/
function safeObjectMerge(target, source) {
	const result = Object.create(null);
	if (target) {
		for (const key of Object.keys(target)) if (isSafeKey(key)) result[key] = target[key];
	}
	if (source && typeof source === "object") {
		for (const key of Object.keys(source)) if (isSafeKey(key)) result[key] = source[key];
	}
	return result;
}
/**
* Create a null-prototype object, optionally copying from source.
*/
function createNullProtoObject(source) {
	if (!source) return Object.create(null);
	const obj = Object.create(null);
	for (const key of Object.keys(source)) if (isSafeKey(key)) obj[key] = source[key];
	return obj;
}
var GLOBAL_STORAGE_KEY = Symbol.for("tanstack-start:start-storage-context");
var globalObj = globalThis;
if (!globalObj[GLOBAL_STORAGE_KEY]) globalObj[GLOBAL_STORAGE_KEY] = new AsyncLocalStorage();
var startStorage = globalObj[GLOBAL_STORAGE_KEY];
async function runWithStartContext(context, fn) {
	return startStorage.run(context, fn);
}
function getStartContext(opts) {
	const context = startStorage.getStore();
	if (!context && (opts === null || opts === void 0 ? void 0 : opts.throwIfNotFound) !== false) throw new Error(`No Start context found in AsyncLocalStorage. Make sure you are using the function within the server runtime.`);
	return context;
}
var getStartOptions = () => getStartContext().startOptions;
var getStartContextServerOnly = getStartContext;
var _excluded = [
	"next",
	"sendContext",
	"fetch"
], _excluded2 = ["next"];
var createServerFn = (options, __opts) => {
	const resolvedOptions = __opts || options || {};
	if (typeof resolvedOptions.method === "undefined") resolvedOptions.method = "GET";
	const setValidator = (validator) => {
		return createServerFn(void 0, _objectSpread2(_objectSpread2({}, resolvedOptions), {}, {
			validator,
			inputValidator: validator
		}));
	};
	const res = {
		options: resolvedOptions,
		middleware: (middleware) => {
			const newMiddleware = [...resolvedOptions.middleware || []];
			middleware.map((m) => {
				if (TSS_SERVER_FUNCTION_FACTORY in m) {
					if (m.options.middleware) newMiddleware.push(...m.options.middleware);
				} else newMiddleware.push(m);
			});
			const res = createServerFn(void 0, _objectSpread2(_objectSpread2({}, resolvedOptions), {}, { middleware: newMiddleware }));
			res[TSS_SERVER_FUNCTION_FACTORY] = true;
			return res;
		},
		validator: setValidator,
		inputValidator: setValidator,
		handler: (...args) => {
			const [extractedFn, serverFn] = args;
			const newOptions = _objectSpread2(_objectSpread2({}, resolvedOptions), {}, {
				extractedFn,
				serverFn
			});
			const resolvedMiddleware = [...newOptions.middleware || [], serverFnBaseToMiddleware(newOptions)];
			extractedFn.method = resolvedOptions.method;
			return Object.assign(async (opts) => {
				const result = await executeMiddleware(resolvedMiddleware, "client", _objectSpread2(_objectSpread2(_objectSpread2({}, extractedFn), newOptions), {}, {
					data: opts === null || opts === void 0 ? void 0 : opts.data,
					headers: opts === null || opts === void 0 ? void 0 : opts.headers,
					signal: opts === null || opts === void 0 ? void 0 : opts.signal,
					fetch: opts === null || opts === void 0 ? void 0 : opts.fetch,
					context: createNullProtoObject()
				}));
				const redirect = parseRedirect(result.error);
				if (redirect) throw redirect;
				if (result.error) throw result.error;
				return result.result;
			}, _objectSpread2(_objectSpread2({}, extractedFn), {}, {
				method: resolvedOptions.method,
				__executeServer: async (opts) => {
					const startContext = getStartContextServerOnly();
					const serverContextAfterGlobalMiddlewares = startContext.contextAfterGlobalMiddlewares;
					return await executeMiddleware(resolvedMiddleware, "server", _objectSpread2(_objectSpread2(_objectSpread2({}, extractedFn), opts), {}, {
						serverFnMeta: extractedFn.serverFnMeta,
						context: safeObjectMerge(opts.context, serverContextAfterGlobalMiddlewares),
						request: startContext.request
					})).then((d) => ({
						result: d.result,
						error: d.error,
						context: d.sendContext
					}));
				}
			}));
		}
	};
	const fun = (options) => {
		return createServerFn(void 0, _objectSpread2(_objectSpread2({}, resolvedOptions), options));
	};
	return Object.assign(fun, res);
};
async function executeMiddleware(middlewares, env, opts) {
	var _getStartOptions;
	let flattenedMiddlewares = flattenMiddlewares([...((_getStartOptions = getStartOptions()) === null || _getStartOptions === void 0 ? void 0 : _getStartOptions.functionMiddleware) || [], ...middlewares]);
	if (env === "server") {
		const startContext = getStartContextServerOnly({ throwIfNotFound: false });
		if (startContext === null || startContext === void 0 ? void 0 : startContext.executedRequestMiddlewares) flattenedMiddlewares = flattenedMiddlewares.filter((m) => !startContext.executedRequestMiddlewares.has(m));
	}
	const callNextMiddleware = async (ctx) => {
		const nextMiddleware = flattenedMiddlewares.shift();
		if (!nextMiddleware) return ctx;
		try {
			let validator = "validator" in nextMiddleware.options ? nextMiddleware.options.validator : void 0;
			if (!validator && "inputValidator" in nextMiddleware.options) validator = nextMiddleware.options.inputValidator;
			if (validator && env === "server") ctx.data = await execValidator(validator, ctx.data);
			let middlewareFn = void 0;
			if (env === "client") {
				if ("client" in nextMiddleware.options) middlewareFn = nextMiddleware.options.client;
			} else if ("server" in nextMiddleware.options) middlewareFn = nextMiddleware.options.server;
			if (middlewareFn) {
				const userNext = async (userCtx = {}) => {
					var _ref, _ctx$_callSiteFetch, _userCtx$error;
					const result = await callNextMiddleware(_objectSpread2(_objectSpread2(_objectSpread2({}, ctx), userCtx), {}, {
						context: safeObjectMerge(ctx.context, userCtx.context),
						sendContext: safeObjectMerge(ctx.sendContext, userCtx.sendContext),
						headers: mergeHeaders(ctx.headers, userCtx.headers),
						_callSiteFetch: ctx._callSiteFetch,
						fetch: (_ref = (_ctx$_callSiteFetch = ctx._callSiteFetch) !== null && _ctx$_callSiteFetch !== void 0 ? _ctx$_callSiteFetch : userCtx.fetch) !== null && _ref !== void 0 ? _ref : ctx.fetch,
						result: userCtx.result !== void 0 ? userCtx.result : userCtx instanceof Response ? userCtx : ctx.result,
						error: (_userCtx$error = userCtx.error) !== null && _userCtx$error !== void 0 ? _userCtx$error : ctx.error
					}));
					if (result.error) throw result.error;
					return result;
				};
				const result = await middlewareFn(_objectSpread2(_objectSpread2({}, ctx), {}, { next: userNext }));
				if (isRedirect(result)) return _objectSpread2(_objectSpread2({}, ctx), {}, { error: result });
				if (result instanceof Response) return _objectSpread2(_objectSpread2({}, ctx), {}, { result });
				if (!result) throw new Error("User middleware returned undefined. You must call next() or return a result in your middlewares.");
				return result;
			}
			return callNextMiddleware(ctx);
		} catch (error) {
			return _objectSpread2(_objectSpread2({}, ctx), {}, { error });
		}
	};
	return callNextMiddleware(_objectSpread2(_objectSpread2({}, opts), {}, {
		headers: opts.headers || {},
		sendContext: opts.sendContext || {},
		context: opts.context || createNullProtoObject(),
		_callSiteFetch: opts.fetch
	}));
}
function flattenMiddlewares(middlewares, maxDepth = 100) {
	const seen = /* @__PURE__ */ new Set();
	const flattened = [];
	const recurse = (middleware, depth) => {
		if (depth > maxDepth) throw new Error(`Middleware nesting depth exceeded maximum of ${maxDepth}. Check for circular references.`);
		middleware.forEach((m) => {
			if (m.options.middleware) recurse(m.options.middleware, depth + 1);
			if (!seen.has(m)) {
				seen.add(m);
				flattened.push(m);
			}
		});
	};
	recurse(middlewares, 0);
	return flattened;
}
async function execValidator(validator, input) {
	if (validator == null) return {};
	if ("~standard" in validator) {
		const result = await validator["~standard"].validate(input);
		if (result.issues) throw new Error(JSON.stringify(result.issues, void 0, 2));
		return result.value;
	}
	if ("parse" in validator) return validator.parse(input);
	if (typeof validator === "function") return validator(input);
	throw new Error("Invalid validator type!");
}
function serverFnBaseToMiddleware(options) {
	var _options$validator;
	return {
		"~types": void 0,
		options: {
			inputValidator: (_options$validator = options.validator) !== null && _options$validator !== void 0 ? _options$validator : options.inputValidator,
			client: async (_ref2) => {
				var _options$extractedFn;
				let { next, sendContext, fetch } = _ref2;
				const payload = _objectSpread2(_objectSpread2({}, _objectWithoutProperties(_ref2, _excluded)), {}, {
					context: sendContext,
					fetch
				});
				return next(await ((_options$extractedFn = options.extractedFn) === null || _options$extractedFn === void 0 ? void 0 : _options$extractedFn.call(options, payload)));
			},
			server: async (_ref3) => {
				var _options$serverFn;
				let { next } = _ref3, ctx = _objectWithoutProperties(_ref3, _excluded2);
				const result = await ((_options$serverFn = options.serverFn) === null || _options$serverFn === void 0 ? void 0 : _options$serverFn.call(options, ctx));
				return next(_objectSpread2(_objectSpread2({}, ctx), {}, { result }));
			}
		}
	};
}
var innerCreateCsrfMiddleware = (opts = {}) => {
	return createMiddleware().server(async (ctx) => {
		const csrfCtx = ctx;
		if (opts.filter && !await opts.filter(csrfCtx)) return ctx.next();
		if (await isCsrfRequestAllowed(opts, csrfCtx)) return ctx.next();
		return getFailureResponse(opts, csrfCtx);
	});
};
var createCsrfMiddleware = innerCreateCsrfMiddleware;
async function isCsrfRequestAllowed(opts, ctx) {
	const result = await getCsrfRequestValidationResult(opts, ctx);
	return result === true || result === void 0 && opts.allowRequestsWithoutOriginCheck === true;
}
async function getCsrfRequestValidationResult(opts, ctx) {
	var _opts$secFetchSite;
	const fetchSite = ctx.request.headers.get("Sec-Fetch-Site");
	if (fetchSite !== null) return matchValue((_opts$secFetchSite = opts.secFetchSite) !== null && _opts$secFetchSite !== void 0 ? _opts$secFetchSite : "same-origin", fetchSite, ctx);
	const origin = ctx.request.headers.get("Origin");
	if (origin !== null) {
		if (opts.origin) return matchValue(opts.origin, origin, ctx);
		return origin === new URL(ctx.request.url).origin;
	}
	const referer = ctx.request.headers.get("Referer");
	if (referer === null || opts.referer === false) return;
	if (typeof opts.referer === "function") return opts.referer(referer, ctx);
	if (opts.origin) {
		const refererOrigin = getOriginFromUrl(referer);
		return refererOrigin !== void 0 && matchValue(opts.origin, refererOrigin, ctx);
	}
	return isRefererSameOrigin(referer, new URL(ctx.request.url).origin);
}
async function matchValue(matcher, value, ctx) {
	if (typeof matcher === "function") return matcher(value, ctx);
	if (Array.isArray(matcher)) return matcher.includes(value);
	return value === matcher;
}
function getOriginFromUrl(url) {
	try {
		return new URL(url).origin;
	} catch (_unused) {
		return;
	}
}
function isRefererSameOrigin(referer, requestOrigin) {
	if (referer === requestOrigin) return true;
	if (!referer.startsWith(requestOrigin)) return false;
	if (referer.length === requestOrigin.length) return true;
	const code = referer.charCodeAt(requestOrigin.length);
	return code === 47 || code === 63 || code === 35;
}
async function getFailureResponse(opts, ctx) {
	var _opts$failureResponse, _opts$failureResponse2;
	if (typeof opts.failureResponse === "function") return opts.failureResponse(ctx);
	return (_opts$failureResponse = (_opts$failureResponse2 = opts.failureResponse) === null || _opts$failureResponse2 === void 0 ? void 0 : _opts$failureResponse2.clone()) !== null && _opts$failureResponse !== void 0 ? _opts$failureResponse : new Response("Forbidden", { status: 403 });
}
function getDefaultSerovalPlugins() {
	var _getStartOptions$seri, _getStartOptions;
	return [...(_getStartOptions$seri = (_getStartOptions = getStartOptions()) === null || _getStartOptions === void 0 || (_getStartOptions = _getStartOptions.serializationAdapters) === null || _getStartOptions === void 0 ? void 0 : _getStartOptions.map(makeSerovalPlugin)) !== null && _getStartOptions$seri !== void 0 ? _getStartOptions$seri : [], ...defaultSerovalPlugins];
}
//#endregion
export { safeObjectMerge as _, X_TSS_RAW_RESPONSE as a, createNullProtoObject as c, getDefaultSerovalPlugins as d, getRequest as f, runWithStartContext as g, requestHandler as h, TSS_SERVER_FUNCTION as i, createServerFn as l, getStartContext as m, TSS_CONTENT_TYPE_FRAMED_VERSIONED as n, X_TSS_SERIALIZED as o, getResponse as p, TSS_FORMDATA_CONTEXT as r, createCsrfMiddleware as s, FrameType as t, flattenMiddlewares as u };
