import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { Mt as EyeOff, jt as Eye } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/money-C7DgSO-S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "money-hidden-global";
var listeners = /* @__PURE__ */ new Set();
var hidden = typeof window !== "undefined" && window.localStorage.getItem(KEY) === "1";
function setHidden(v) {
	hidden = v;
	try {
		window.localStorage.setItem(KEY, v ? "1" : "0");
	} catch (_unused) {}
	listeners.forEach((l) => l());
}
function subscribe(l) {
	listeners.add(l);
	return () => {
		listeners.delete(l);
	};
}
function useMoneyHidden() {
	return [
		(0, import_react.useSyncExternalStore)(subscribe, () => hidden, () => false),
		setHidden,
		(0, import_react.useCallback)(() => setHidden(!hidden), [])
	];
}
function Money({ value, className, style, iconClassName, alwaysVisible }) {
	const [globalHidden, , toggleGlobal] = useMoneyHidden();
	const [localReveal, setLocalReveal] = (0, import_react.useState)(false);
	const shouldHide = !alwaysVisible && globalHidden && !localReveal;
	const handleClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (globalHidden) setLocalReveal((v) => !v);
		else toggleGlobal();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className,
		style,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": shouldHide,
			style: {
				filter: shouldHide ? "blur(8px)" : void 0,
				transition: "filter 150ms ease",
				userSelect: shouldHide ? "none" : void 0
			},
			children: brl(value)
		}), !alwaysVisible && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: handleClick,
			className: `ml-1.5 inline-flex align-middle opacity-60 hover:opacity-100 transition ${iconClassName !== null && iconClassName !== void 0 ? iconClassName : ""}`,
			"aria-label": shouldHide ? "Mostrar valor" : "Ocultar valor",
			title: shouldHide ? "Mostrar valor" : "Ocultar valor",
			children: shouldHide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-3.5 w-3.5" })
		})]
	});
}
function MoneyMasterToggle({ className, style }) {
	const [isHidden, , toggle] = useMoneyHidden();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: toggle,
		className: `inline-flex items-center gap-1.5 h-9 px-3 rounded-full border text-xs font-semibold transition hover:-translate-y-0.5 ${className !== null && className !== void 0 ? className : ""}`,
		style,
		"aria-label": isHidden ? "Mostrar valores" : "Ocultar valores",
		title: isHidden ? "Mostrar valores" : "Ocultar valores",
		children: [isHidden ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }), isHidden ? "Mostrar $" : "Ocultar $"]
	});
}
//#endregion
export { MoneyMasterToggle as n, Money as t };
