import { b as _assertClassBrand, v as _classPrivateFieldGet2, x as _classPrivateFieldInitSpec, y as _classPrivateFieldSet2 } from "./@lovable.dev/mcp-js.mjs";
import { d as _classPrivateMethodInitSpec } from "./@tanstack/query-core.mjs";
import { d as _objectSpread2, f as init_objectSpread2, m as init_defineProperty, p as _defineProperty } from "./@dnd-kit/core.mjs";
import "node:http";
import { PassThrough, Readable } from "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
//#region node_modules/rou3/dist/index.mjs
var NullProtoObj = /* @__PURE__ */ (() => {
	const e = function() {};
	return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
//#endregion
//#region node_modules/srvx/dist/_chunks/_url.mjs
function lazyInherit(target, source, sourceKey) {
	for (const key of [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]) {
		if (key === "constructor") continue;
		const targetDesc = Object.getOwnPropertyDescriptor(target, key);
		const desc = Object.getOwnPropertyDescriptor(source, key);
		let modified = false;
		if (desc.get) {
			modified = true;
			desc.get = (targetDesc === null || targetDesc === void 0 ? void 0 : targetDesc.get) || function() {
				return this[sourceKey][key];
			};
		}
		if (desc.set) {
			modified = true;
			desc.set = (targetDesc === null || targetDesc === void 0 ? void 0 : targetDesc.set) || function(value) {
				this[sourceKey][key] = value;
			};
		}
		if (!(targetDesc === null || targetDesc === void 0 ? void 0 : targetDesc.value) && typeof desc.value === "function") {
			modified = true;
			desc.value = function(...args) {
				return this[sourceKey][key](...args);
			};
		}
		if (modified) Object.defineProperty(target, key, desc);
	}
}
var _needsNormRE = /(?:(?:^|\/)(?:\.|\.\.|%2e|%2e\.|\.%2e|%2e%2e)(?:\/|$))|[\\^\x80-\uffff]/i;
var FastURL = /* @__PURE__ */ (() => {
	var _url, _href, _protocol, _host, _pathname, _search, _searchParams, _pos, _URL_brand;
	let _Symbol$hasInstance;
	const NativeURL = globalThis.URL;
	const FastURL = (_url = /* @__PURE__ */ new WeakMap(), _href = /* @__PURE__ */ new WeakMap(), _protocol = /* @__PURE__ */ new WeakMap(), _host = /* @__PURE__ */ new WeakMap(), _pathname = /* @__PURE__ */ new WeakMap(), _search = /* @__PURE__ */ new WeakMap(), _searchParams = /* @__PURE__ */ new WeakMap(), _pos = /* @__PURE__ */ new WeakMap(), _URL_brand = /* @__PURE__ */ new WeakSet(), _Symbol$hasInstance = Symbol.hasInstance, class URL {
		constructor(url) {
			_classPrivateMethodInitSpec(this, _URL_brand);
			_classPrivateFieldInitSpec(this, _url, void 0);
			_classPrivateFieldInitSpec(this, _href, void 0);
			_classPrivateFieldInitSpec(this, _protocol, void 0);
			_classPrivateFieldInitSpec(this, _host, void 0);
			_classPrivateFieldInitSpec(this, _pathname, void 0);
			_classPrivateFieldInitSpec(this, _search, void 0);
			_classPrivateFieldInitSpec(this, _searchParams, void 0);
			_classPrivateFieldInitSpec(this, _pos, void 0);
			if (typeof url === "string") if (url[0] === "/") _classPrivateFieldSet2(_href, this, url);
			else _classPrivateFieldSet2(_url, this, new NativeURL(url));
			else if (_needsNormRE.test(url.pathname)) _classPrivateFieldSet2(_url, this, new NativeURL(`${url.protocol || "http:"}//${url.host || "localhost"}${url.pathname}${url.search || ""}`));
			else {
				_classPrivateFieldSet2(_protocol, this, url.protocol);
				_classPrivateFieldSet2(_host, this, url.host);
				_classPrivateFieldSet2(_pathname, this, url.pathname);
				_classPrivateFieldSet2(_search, this, url.search);
			}
		}
		static [_Symbol$hasInstance](val) {
			return val instanceof NativeURL;
		}
		get _url() {
			if (_classPrivateFieldGet2(_url, this)) return _classPrivateFieldGet2(_url, this);
			_classPrivateFieldSet2(_url, this, new NativeURL(this.href));
			_classPrivateFieldSet2(_href, this, void 0);
			_classPrivateFieldSet2(_protocol, this, void 0);
			_classPrivateFieldSet2(_host, this, void 0);
			_classPrivateFieldSet2(_pathname, this, void 0);
			_classPrivateFieldSet2(_search, this, void 0);
			_classPrivateFieldSet2(_searchParams, this, void 0);
			_classPrivateFieldSet2(_pos, this, void 0);
			return _classPrivateFieldGet2(_url, this);
		}
		get href() {
			if (_classPrivateFieldGet2(_url, this)) return _classPrivateFieldGet2(_url, this).href;
			if (!_classPrivateFieldGet2(_href, this)) _classPrivateFieldSet2(_href, this, `${_classPrivateFieldGet2(_protocol, this) || "http:"}//${_classPrivateFieldGet2(_host, this) || "localhost"}${_classPrivateFieldGet2(_pathname, this) || "/"}${_classPrivateFieldGet2(_search, this) || ""}`);
			return _classPrivateFieldGet2(_href, this);
		}
		get pathname() {
			if (_classPrivateFieldGet2(_url, this)) return _classPrivateFieldGet2(_url, this).pathname;
			if (_classPrivateFieldGet2(_pathname, this) === void 0) {
				const [, pathnameIndex, queryIndex] = _assertClassBrand(_URL_brand, this, _getPos).call(this);
				if (pathnameIndex === -1) return this._url.pathname;
				_classPrivateFieldSet2(_pathname, this, this.href.slice(pathnameIndex, queryIndex === -1 ? void 0 : queryIndex));
			}
			return _classPrivateFieldGet2(_pathname, this);
		}
		get search() {
			if (_classPrivateFieldGet2(_url, this)) return _classPrivateFieldGet2(_url, this).search;
			if (_classPrivateFieldGet2(_search, this) === void 0) {
				const [, pathnameIndex, queryIndex] = _assertClassBrand(_URL_brand, this, _getPos).call(this);
				if (pathnameIndex === -1) return this._url.search;
				const url = this.href;
				_classPrivateFieldSet2(_search, this, queryIndex === -1 || queryIndex === url.length - 1 ? "" : url.slice(queryIndex));
			}
			return _classPrivateFieldGet2(_search, this);
		}
		get searchParams() {
			if (_classPrivateFieldGet2(_url, this)) return _classPrivateFieldGet2(_url, this).searchParams;
			if (!_classPrivateFieldGet2(_searchParams, this)) _classPrivateFieldSet2(_searchParams, this, new URLSearchParams(this.search));
			return _classPrivateFieldGet2(_searchParams, this);
		}
		get protocol() {
			if (_classPrivateFieldGet2(_url, this)) return _classPrivateFieldGet2(_url, this).protocol;
			if (_classPrivateFieldGet2(_protocol, this) === void 0) {
				const [protocolIndex] = _assertClassBrand(_URL_brand, this, _getPos).call(this);
				if (protocolIndex === -1) return this._url.protocol;
				const url = this.href;
				_classPrivateFieldSet2(_protocol, this, url.slice(0, protocolIndex + 1));
			}
			return _classPrivateFieldGet2(_protocol, this);
		}
		toString() {
			return this.href;
		}
		toJSON() {
			return this.href;
		}
	});
	function _getPos() {
		if (!_classPrivateFieldGet2(_pos, this)) {
			const url = this.href;
			const protoIndex = url.indexOf("://");
			const pathnameIndex = protoIndex === -1 ? -1 : url.indexOf("/", protoIndex + 4);
			const qIndex = pathnameIndex === -1 ? -1 : url.indexOf("?", pathnameIndex);
			_classPrivateFieldSet2(_pos, this, [
				protoIndex,
				pathnameIndex,
				qIndex
			]);
		}
		return _classPrivateFieldGet2(_pos, this);
	}
	lazyInherit(FastURL.prototype, NativeURL.prototype, "_url");
	Object.setPrototypeOf(FastURL.prototype, NativeURL.prototype);
	Object.setPrototypeOf(FastURL, NativeURL);
	return FastURL;
})();
function callMiddleware$1(request, fetchHandler, middleware, index) {
	if (index === middleware.length) return fetchHandler(request);
	return middleware[index](request, () => callMiddleware$1(request, fetchHandler, middleware, index + 1));
}
//#endregion
//#region node_modules/srvx/dist/adapters/node.mjs
init_defineProperty();
init_objectSpread2();
var NodeResponse = /* @__PURE__ */ (() => {
	var _globalThis$process, _globalThis$process$g;
	let _Symbol$hasInstance4;
	const NativeResponse = globalThis.Response;
	const STATUS_CODES = ((_globalThis$process = globalThis.process) === null || _globalThis$process === void 0 || (_globalThis$process$g = _globalThis$process.getBuiltinModule) === null || _globalThis$process$g === void 0 || (_globalThis$process$g = _globalThis$process$g.call(_globalThis$process, "node:http")) === null || _globalThis$process$g === void 0 ? void 0 : _globalThis$process$g.STATUS_CODES) || {};
	var _body = /* @__PURE__ */ new WeakMap();
	var _init = /* @__PURE__ */ new WeakMap();
	var _headers4 = /* @__PURE__ */ new WeakMap();
	var _response = /* @__PURE__ */ new WeakMap();
	_Symbol$hasInstance4 = Symbol.hasInstance;
	class NodeResponse {
		constructor(body, init) {
			_classPrivateFieldInitSpec(this, _body, void 0);
			_classPrivateFieldInitSpec(this, _init, void 0);
			_classPrivateFieldInitSpec(this, _headers4, void 0);
			_classPrivateFieldInitSpec(this, _response, void 0);
			_classPrivateFieldSet2(_body, this, body);
			_classPrivateFieldSet2(_init, this, init);
		}
		static [_Symbol$hasInstance4](val) {
			return val instanceof NativeResponse;
		}
		get status() {
			var _classPrivateFieldGet3, _classPrivateFieldGet4;
			return ((_classPrivateFieldGet3 = _classPrivateFieldGet2(_response, this)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.status) || ((_classPrivateFieldGet4 = _classPrivateFieldGet2(_init, this)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.status) || 200;
		}
		get statusText() {
			var _classPrivateFieldGet5, _classPrivateFieldGet6;
			return ((_classPrivateFieldGet5 = _classPrivateFieldGet2(_response, this)) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.statusText) || ((_classPrivateFieldGet6 = _classPrivateFieldGet2(_init, this)) === null || _classPrivateFieldGet6 === void 0 ? void 0 : _classPrivateFieldGet6.statusText) || STATUS_CODES[this.status] || "";
		}
		get headers() {
			var _classPrivateFieldGet7;
			if (_classPrivateFieldGet2(_response, this)) return _classPrivateFieldGet2(_response, this).headers;
			if (_classPrivateFieldGet2(_headers4, this)) return _classPrivateFieldGet2(_headers4, this);
			const initHeaders = (_classPrivateFieldGet7 = _classPrivateFieldGet2(_init, this)) === null || _classPrivateFieldGet7 === void 0 ? void 0 : _classPrivateFieldGet7.headers;
			return _classPrivateFieldSet2(_headers4, this, initHeaders instanceof Headers ? initHeaders : new Headers(initHeaders));
		}
		get ok() {
			if (_classPrivateFieldGet2(_response, this)) return _classPrivateFieldGet2(_response, this).ok;
			const status = this.status;
			return status >= 200 && status < 300;
		}
		get _response() {
			if (_classPrivateFieldGet2(_response, this)) return _classPrivateFieldGet2(_response, this);
			let body = _classPrivateFieldGet2(_body, this);
			if (body && typeof body.pipe === "function" && !(body instanceof Readable)) {
				const stream = new PassThrough();
				body.pipe(stream);
				const abort = body.abort;
				if (abort) stream.once("close", () => abort());
				body = stream;
			}
			_classPrivateFieldSet2(_response, this, new NativeResponse(body, _classPrivateFieldGet2(_headers4, this) ? _objectSpread2(_objectSpread2({}, _classPrivateFieldGet2(_init, this)), {}, { headers: _classPrivateFieldGet2(_headers4, this) }) : _classPrivateFieldGet2(_init, this)));
			_classPrivateFieldSet2(_init, this, void 0);
			_classPrivateFieldSet2(_headers4, this, void 0);
			_classPrivateFieldSet2(_body, this, void 0);
			return _classPrivateFieldGet2(_response, this);
		}
		_toNodeResponse() {
			var _classPrivateFieldGet8, _classPrivateFieldGet9;
			const status = this.status;
			const statusText = this.statusText;
			let body;
			let contentType;
			let contentLength;
			if (_classPrivateFieldGet2(_response, this)) body = _classPrivateFieldGet2(_response, this).body;
			else if (_classPrivateFieldGet2(_body, this)) if (_classPrivateFieldGet2(_body, this) instanceof ReadableStream) body = _classPrivateFieldGet2(_body, this);
			else if (typeof _classPrivateFieldGet2(_body, this) === "string") {
				body = _classPrivateFieldGet2(_body, this);
				contentType = "text/plain; charset=UTF-8";
				contentLength = Buffer.byteLength(_classPrivateFieldGet2(_body, this));
			} else if (_classPrivateFieldGet2(_body, this) instanceof ArrayBuffer) {
				body = Buffer.from(_classPrivateFieldGet2(_body, this));
				contentLength = _classPrivateFieldGet2(_body, this).byteLength;
			} else if (_classPrivateFieldGet2(_body, this) instanceof Uint8Array) {
				body = _classPrivateFieldGet2(_body, this);
				contentLength = _classPrivateFieldGet2(_body, this).byteLength;
			} else if (_classPrivateFieldGet2(_body, this) instanceof DataView) {
				body = Buffer.from(_classPrivateFieldGet2(_body, this).buffer);
				contentLength = _classPrivateFieldGet2(_body, this).byteLength;
			} else if (_classPrivateFieldGet2(_body, this) instanceof Blob) {
				body = _classPrivateFieldGet2(_body, this).stream();
				contentType = _classPrivateFieldGet2(_body, this).type;
				contentLength = _classPrivateFieldGet2(_body, this).size;
			} else if (typeof _classPrivateFieldGet2(_body, this).pipe === "function") body = _classPrivateFieldGet2(_body, this);
			else body = this._response.body;
			const headers = [];
			const initHeaders = (_classPrivateFieldGet8 = _classPrivateFieldGet2(_init, this)) === null || _classPrivateFieldGet8 === void 0 ? void 0 : _classPrivateFieldGet8.headers;
			const headerEntries = ((_classPrivateFieldGet9 = _classPrivateFieldGet2(_response, this)) === null || _classPrivateFieldGet9 === void 0 ? void 0 : _classPrivateFieldGet9.headers) || _classPrivateFieldGet2(_headers4, this) || (initHeaders ? Array.isArray(initHeaders) ? initHeaders : (initHeaders === null || initHeaders === void 0 ? void 0 : initHeaders.entries) ? initHeaders.entries() : Object.entries(initHeaders).map(([k, v]) => [k.toLowerCase(), v]) : void 0);
			let hasContentTypeHeader;
			let hasContentLength;
			if (headerEntries) for (const [key, value] of headerEntries) {
				if (Array.isArray(value)) for (const v of value) headers.push([key, v]);
				else headers.push([key, value]);
				if (key === "content-type") hasContentTypeHeader = true;
				else if (key === "content-length") hasContentLength = true;
			}
			if (contentType && !hasContentTypeHeader) headers.push(["content-type", contentType]);
			if (contentLength && !hasContentLength) headers.push(["content-length", String(contentLength)]);
			_classPrivateFieldSet2(_init, this, void 0);
			_classPrivateFieldSet2(_headers4, this, void 0);
			_classPrivateFieldSet2(_response, this, void 0);
			_classPrivateFieldSet2(_body, this, void 0);
			return {
				status,
				statusText,
				headers,
				body
			};
		}
	}
	lazyInherit(NodeResponse.prototype, NativeResponse.prototype, "_response");
	Object.setPrototypeOf(NodeResponse, NativeResponse);
	Object.setPrototypeOf(NodeResponse.prototype, NativeResponse.prototype);
	return NodeResponse;
})();
//#endregion
//#region node_modules/h3/dist/h3.mjs
init_defineProperty();
init_objectSpread2();
var _Class, _headers, _init2, _Class2;
function decodePathname(pathname) {
	return decodeURI(pathname.includes("%25") ? pathname.replace(/%25/g, "%2525") : pathname);
}
var kEventNS = "h3.internal.event.";
var kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
var kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
var kEventResErrHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.err.headers`);
var H3Event = (_Class = class {
	constructor(req, context, app) {
		_defineProperty(this, "app", void 0);
		_defineProperty(this, "req", void 0);
		_defineProperty(this, "url", void 0);
		_defineProperty(this, "context", void 0);
		this.context = context || req.context || new NullProtoObj();
		this.req = req;
		this.app = app;
		const _url = req._url;
		const url = _url && _url instanceof URL ? _url : new FastURL(req.url);
		if (url.pathname.includes("%")) url.pathname = decodePathname(url.pathname);
		this.url = url;
	}
	get res() {
		return this[kEventRes] || (this[kEventRes] = new H3EventResponse());
	}
	get runtime() {
		return this.req.runtime;
	}
	waitUntil(promise) {
		var _this$req$waitUntil, _this$req;
		(_this$req$waitUntil = (_this$req = this.req).waitUntil) === null || _this$req$waitUntil === void 0 || _this$req$waitUntil.call(_this$req, promise);
	}
	toString() {
		return `[${this.req.method}] ${this.req.url}`;
	}
	toJSON() {
		return this.toString();
	}
	get node() {
		var _this$req$runtime;
		return (_this$req$runtime = this.req.runtime) === null || _this$req$runtime === void 0 ? void 0 : _this$req$runtime.node;
	}
	get headers() {
		return this.req.headers;
	}
	get path() {
		return this.url.pathname + this.url.search;
	}
	get method() {
		return this.req.method;
	}
}, _defineProperty(_Class, "__is_event__", true), _Class);
var H3EventResponse = class {
	constructor() {
		_defineProperty(this, "status", void 0);
		_defineProperty(this, "statusText", void 0);
	}
	get headers() {
		return this[kEventResHeaders] || (this[kEventResHeaders] = new Headers());
	}
	get errHeaders() {
		return this[kEventResErrHeaders] || (this[kEventResErrHeaders] = new Headers());
	}
};
var DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = +statusCode;
	if (statusCode < 100 || statusCode > 599) return defaultStatusCode;
	return statusCode;
}
var HTTPError = class HTTPError extends Error {
	get name() {
		return "HTTPError";
	}
	static isError(input) {
		return input instanceof Error && (input === null || input === void 0 ? void 0 : input.name) === "HTTPError";
	}
	static status(status, statusText, details) {
		return new HTTPError(_objectSpread2(_objectSpread2({}, details), {}, {
			statusText,
			status
		}));
	}
	constructor(arg1, arg2) {
		var _details$cause, _details$cause2, _details$cause3, _details$cause4, _details$cause5, _details$cause6, _ref, _details$unhandled, _details$cause7;
		let messageInput;
		let details;
		if (typeof arg1 === "string") {
			messageInput = arg1;
			details = arg2;
		} else details = arg1;
		const status = sanitizeStatusCode((details === null || details === void 0 ? void 0 : details.status) || (details === null || details === void 0 ? void 0 : details.statusCode) || (details === null || details === void 0 || (_details$cause = details.cause) === null || _details$cause === void 0 ? void 0 : _details$cause.status) || (details === null || details === void 0 || (_details$cause2 = details.cause) === null || _details$cause2 === void 0 ? void 0 : _details$cause2.statusCode), 500);
		const statusText = sanitizeStatusMessage((details === null || details === void 0 ? void 0 : details.statusText) || (details === null || details === void 0 ? void 0 : details.statusMessage) || (details === null || details === void 0 || (_details$cause3 = details.cause) === null || _details$cause3 === void 0 ? void 0 : _details$cause3.statusText) || (details === null || details === void 0 || (_details$cause4 = details.cause) === null || _details$cause4 === void 0 ? void 0 : _details$cause4.statusMessage));
		const message = messageInput || (details === null || details === void 0 ? void 0 : details.message) || (details === null || details === void 0 || (_details$cause5 = details.cause) === null || _details$cause5 === void 0 ? void 0 : _details$cause5.message) || (details === null || details === void 0 ? void 0 : details.statusText) || (details === null || details === void 0 ? void 0 : details.statusMessage) || [
			"HTTPError",
			status,
			statusText
		].filter(Boolean).join(" ");
		super(message, { cause: details });
		_defineProperty(this, "status", void 0);
		_defineProperty(this, "statusText", void 0);
		_defineProperty(this, "headers", void 0);
		_defineProperty(this, "cause", void 0);
		_defineProperty(this, "data", void 0);
		_defineProperty(this, "body", void 0);
		_defineProperty(this, "unhandled", void 0);
		this.cause = details;
		this.status = status;
		this.statusText = statusText || void 0;
		const rawHeaders = (details === null || details === void 0 ? void 0 : details.headers) || (details === null || details === void 0 || (_details$cause6 = details.cause) === null || _details$cause6 === void 0 ? void 0 : _details$cause6.headers);
		this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
		this.unhandled = (_ref = (_details$unhandled = details === null || details === void 0 ? void 0 : details.unhandled) !== null && _details$unhandled !== void 0 ? _details$unhandled : details === null || details === void 0 || (_details$cause7 = details.cause) === null || _details$cause7 === void 0 ? void 0 : _details$cause7.unhandled) !== null && _ref !== void 0 ? _ref : void 0;
		this.data = details === null || details === void 0 ? void 0 : details.data;
		this.body = details === null || details === void 0 ? void 0 : details.body;
	}
	get statusCode() {
		return this.status;
	}
	get statusMessage() {
		return this.statusText;
	}
	toJSON() {
		const unhandled = this.unhandled;
		return _objectSpread2({
			status: this.status,
			statusText: this.statusText,
			unhandled,
			message: unhandled ? "HTTPError" : this.message,
			data: unhandled ? void 0 : this.data
		}, unhandled ? void 0 : this.body);
	}
};
function isJSONSerializable(value, _type) {
	if (value === null || value === void 0) return true;
	if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
	if (typeof value.toJSON === "function") return true;
	if (Array.isArray(value)) return true;
	if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
	if (value instanceof NullProtoObj) return true;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
var kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
var kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse(val, event, config = {}) {
	if (typeof (val === null || val === void 0 ? void 0 : val.then) === "function") return val.then((resolvedVal) => toResponse(resolvedVal, event, config), (r) => toResponse(typeof r === "number" ? new HTTPError({ status: r }) : r, event, config));
	const response = prepareResponse(val, event, config);
	if (typeof (response === null || response === void 0 ? void 0 : response.then) === "function") return toResponse(response, event, config);
	const { onResponse } = config;
	return onResponse ? Promise.resolve(onResponse(response, event)).then(() => response) : response;
}
var HTTPResponse = (_headers = /* @__PURE__ */ new WeakMap(), _init2 = /* @__PURE__ */ new WeakMap(), class {
	constructor(body, init) {
		_classPrivateFieldInitSpec(this, _headers, void 0);
		_classPrivateFieldInitSpec(this, _init2, void 0);
		_defineProperty(this, "body", void 0);
		this.body = body;
		_classPrivateFieldSet2(_init2, this, init);
	}
	get status() {
		var _classPrivateFieldGet2$1;
		return ((_classPrivateFieldGet2$1 = _classPrivateFieldGet2(_init2, this)) === null || _classPrivateFieldGet2$1 === void 0 ? void 0 : _classPrivateFieldGet2$1.status) || 200;
	}
	get statusText() {
		var _classPrivateFieldGet3;
		return ((_classPrivateFieldGet3 = _classPrivateFieldGet2(_init2, this)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.statusText) || "OK";
	}
	get headers() {
		var _classPrivateFieldGet4;
		return _classPrivateFieldGet2(_headers, this) || _classPrivateFieldSet2(_headers, this, new Headers((_classPrivateFieldGet4 = _classPrivateFieldGet2(_init2, this)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.headers));
	}
});
function prepareResponse(val, event, config, nested) {
	if (val === kHandled) return new NodeResponse(null);
	if (val === kNotFound) val = new HTTPError({
		status: 404,
		message: `Cannot find any route matching [${event.req.method}] ${event.url}`
	});
	if (val && val instanceof Error) {
		var _event$kEventRes;
		const isHTTPError = HTTPError.isError(val);
		const error = isHTTPError ? val : new HTTPError(val);
		if (!isHTTPError) {
			error.unhandled = true;
			if (val === null || val === void 0 ? void 0 : val.stack) error.stack = val.stack;
		}
		if (error.unhandled && !config.silent) console.error(error);
		const { onError } = config;
		const errHeaders = (_event$kEventRes = event[kEventRes]) === null || _event$kEventRes === void 0 ? void 0 : _event$kEventRes[kEventResErrHeaders];
		return onError && !nested ? Promise.resolve(onError(error, event)).catch((error) => error).then((newVal) => prepareResponse(newVal !== null && newVal !== void 0 ? newVal : val, event, config, true)) : errorResponse(error, config.debug, errHeaders);
	}
	const preparedRes = event[kEventRes];
	const preparedHeaders = preparedRes === null || preparedRes === void 0 ? void 0 : preparedRes[kEventResHeaders];
	event[kEventRes] = void 0;
	if (!(val instanceof Response)) {
		const res = prepareResponseBody(val, event, config);
		const status = res.status || (preparedRes === null || preparedRes === void 0 ? void 0 : preparedRes.status);
		return new NodeResponse(nullBody(event.req.method, status) ? null : res.body, {
			status,
			statusText: res.statusText || (preparedRes === null || preparedRes === void 0 ? void 0 : preparedRes.statusText),
			headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
		});
	}
	if (!preparedHeaders || nested || !val.ok) return val;
	try {
		mergeHeaders$1(val.headers, preparedHeaders, val.headers);
		return val;
	} catch (_unused2) {
		return new NodeResponse(nullBody(event.req.method, val.status) ? null : val.body, {
			status: val.status,
			statusText: val.statusText,
			headers: mergeHeaders$1(val.headers, preparedHeaders)
		});
	}
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
	for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
	else target.set(name, value);
	return target;
}
var frozen = (name) => (...args) => {
	throw new Error(`Headers are frozen (${name} ${args.join(", ")})`);
};
var FrozenHeaders = class extends Headers {
	constructor(..._args) {
		super(..._args);
		_defineProperty(this, "set", frozen("set"));
		_defineProperty(this, "append", frozen("append"));
		_defineProperty(this, "delete", frozen("delete"));
	}
};
var emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
var jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
	var _val$constructor;
	if (val === null || val === void 0) return {
		body: "",
		headers: emptyHeaders
	};
	const valType = typeof val;
	if (valType === "string") return { body: val };
	if (val instanceof Uint8Array) {
		event.res.headers.set("content-length", val.byteLength.toString());
		return { body: val };
	}
	if (val instanceof HTTPResponse || (val === null || val === void 0 || (_val$constructor = val.constructor) === null || _val$constructor === void 0 ? void 0 : _val$constructor.name) === "HTTPResponse") return val;
	if (isJSONSerializable(val, valType)) return {
		body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
		headers: jsonHeaders
	};
	if (valType === "bigint") return {
		body: val.toString(),
		headers: jsonHeaders
	};
	if (val instanceof Blob) {
		const headers = new Headers({
			"content-type": val.type,
			"content-length": val.size.toString()
		});
		let filename = val.name;
		if (filename) {
			filename = encodeURIComponent(filename);
			headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
		}
		return {
			body: val.stream(),
			headers
		};
	}
	if (valType === "symbol") return { body: val.toString() };
	if (valType === "function") return { body: `${val.name}()` };
	return { body: val };
}
function nullBody(method, status) {
	return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug, errHeaders) {
	let headers = error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders);
	if (errHeaders) headers = mergeHeaders$1(headers, errHeaders);
	return new NodeResponse(JSON.stringify(_objectSpread2(_objectSpread2({}, error.toJSON()), {}, { stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0 }), void 0, debug ? 2 : void 0), {
		status: error.status,
		statusText: error.statusText,
		headers
	});
}
function callMiddleware(event, middleware, handler, index = 0) {
	if (index === middleware.length) return handler(event);
	const fn = middleware[index];
	let nextCalled;
	let nextResult;
	const next = () => {
		if (nextCalled) return nextResult;
		nextCalled = true;
		nextResult = callMiddleware(event, middleware, handler, index + 1);
		return nextResult;
	};
	const ret = fn(event, next);
	return isUnhandledResponse(ret) ? next() : typeof (ret === null || ret === void 0 ? void 0 : ret.then) === "function" ? ret.then((resolved) => isUnhandledResponse(resolved) ? next() : resolved) : ret;
}
function isUnhandledResponse(val) {
	return val === void 0 || val === kNotFound;
}
function toRequest(input, options) {
	if (typeof input === "string") {
		let url = input;
		if (url[0] === "/") {
			const headers = (options === null || options === void 0 ? void 0 : options.headers) ? new Headers(options.headers) : void 0;
			const host = (headers === null || headers === void 0 ? void 0 : headers.get("host")) || "localhost";
			url = `${(headers === null || headers === void 0 ? void 0 : headers.get("x-forwarded-proto")) === "https" ? "https" : "http"}://${host}${url}`;
		}
		return new Request(url, options);
	} else if (options || input instanceof URL) return new Request(input, options);
	return input;
}
function defineHandler(input) {
	var _input$middleware;
	if (typeof input === "function") return handlerWithFetch(input);
	const handler = input.handler || (input.fetch ? function _fetchHandler(event) {
		return input.fetch(event.req);
	} : NoHandler);
	return Object.assign(handlerWithFetch(((_input$middleware = input.middleware) === null || _input$middleware === void 0 ? void 0 : _input$middleware.length) ? function _handlerMiddleware(event) {
		return callMiddleware(event, input.middleware, handler);
	} : handler), input);
}
function handlerWithFetch(handler) {
	if ("fetch" in handler) return handler;
	return Object.assign(handler, { fetch: (req) => {
		if (typeof req === "string") req = new URL(req, "http://_");
		if (req instanceof URL) req = new Request(req);
		const event = new H3Event(req);
		try {
			return Promise.resolve(toResponse(handler(event), event));
		} catch (error) {
			return Promise.resolve(toResponse(error, event));
		}
	} });
}
function defineLazyEventHandler(loader) {
	let handler;
	let promise;
	return defineHandler(function lazyHandler(event) {
		var _promise;
		return handler ? handler(event) : ((_promise = promise) !== null && _promise !== void 0 ? _promise : promise = Promise.resolve(loader()).then(function resolveLazyHandler(r) {
			handler = toEventHandler(r) || toEventHandler(r.default);
			if (typeof handler !== "function") throw new TypeError("Invalid lazy handler", { cause: { resolved: r } });
			return handler;
		})).then((r) => r(event));
	});
}
function toEventHandler(handler) {
	var _handler$constructor;
	if (typeof handler === "function") return handler;
	if (typeof (handler === null || handler === void 0 ? void 0 : handler.handler) === "function" && ((_handler$constructor = handler.constructor) === null || _handler$constructor === void 0 ? void 0 : _handler$constructor["~h3"])) return handler.handler;
	if (typeof (handler === null || handler === void 0 ? void 0 : handler.fetch) === "function") return function _fetchHandler(event) {
		return handler.fetch(event.req);
	};
}
var NoHandler = () => kNotFound;
var H3Core = (_Class2 = class {
	constructor(config = {}) {
		_defineProperty(this, "config", void 0);
		_defineProperty(this, "~middleware", void 0);
		_defineProperty(this, "~routes", []);
		this["~middleware"] = [];
		this.config = config;
		this.fetch = this.fetch.bind(this);
		this.handler = this.handler.bind(this);
	}
	fetch(request) {
		return this["~request"](request);
	}
	handler(event) {
		const route = this["~findRoute"](event);
		if (route) {
			event.context.params = route.params;
			event.context.matchedRoute = route.data;
		}
		const routeHandler = (route === null || route === void 0 ? void 0 : route.data.handler) || NoHandler;
		const middleware = this["~getMiddleware"](event, route);
		return middleware.length > 0 ? callMiddleware(event, middleware, routeHandler) : routeHandler(event);
	}
	"~request"(request, context) {
		const event = new H3Event(request, context, this);
		let handlerRes;
		try {
			if (this.config.onRequest) {
				const hookRes = this.config.onRequest(event);
				handlerRes = typeof (hookRes === null || hookRes === void 0 ? void 0 : hookRes.then) === "function" ? hookRes.then(() => this.handler(event)) : this.handler(event);
			} else handlerRes = this.handler(event);
		} catch (error) {
			handlerRes = Promise.reject(error);
		}
		return toResponse(handlerRes, event, this.config);
	}
	"~findRoute"(_event) {}
	"~addRoute"(_route) {
		this["~routes"].push(_route);
	}
	"~getMiddleware"(_event, route) {
		const routeMiddleware = route === null || route === void 0 ? void 0 : route.data.middleware;
		const globalMiddleware = this["~middleware"];
		return routeMiddleware ? [...globalMiddleware, ...routeMiddleware] : globalMiddleware;
	}
}, _defineProperty(_Class2, "~h3", true), _Class2);
//#endregion
export { NodeResponse as a, toRequest as i, HTTPError as n, FastURL as o, defineLazyEventHandler as r, NullProtoObj as s, H3Core as t };
