import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime, d as DialogContent$1, f as DialogDescription$1, g as DialogTrigger$1, h as DialogTitle$1, l as Dialog$1, m as DialogPortal$1, p as DialogOverlay$1, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as X } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dialog-TZjTs9D2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _excluded = ["className"], _excluded2 = ["className", "children"], _excluded3 = ["className"], _excluded4 = ["className"], _excluded5 = ["className"], _excluded6 = ["className"];
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef((_ref, ref) => {
	let { className } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, _objectSpread2({
		ref,
		className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className)
	}, props));
});
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef((_ref2, ref) => {
	let { className, children } = _ref2, props = _objectWithoutProperties(_ref2, _excluded2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, _objectSpread2(_objectSpread2({
		ref,
		className: cn("fixed left-[50%] top-[50%] z-50 grid w-[calc(100vw-1.5rem)] max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 [transform:translate(-50%,-50%)]", className)
	}, props), {}, { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})] }))] });
});
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = (_ref3) => {
	let { className } = _ref3, props = _objectWithoutProperties(_ref3, _excluded3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({ className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className) }, props));
};
DialogHeader.displayName = "DialogHeader";
var DialogFooter = (_ref4) => {
	let { className } = _ref4, props = _objectWithoutProperties(_ref4, _excluded4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({ className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className) }, props));
};
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef((_ref5, ref) => {
	let { className } = _ref5, props = _objectWithoutProperties(_ref5, _excluded5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, _objectSpread2({
		ref,
		className: cn("text-lg font-semibold leading-none tracking-tight", className)
	}, props));
});
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef((_ref6, ref) => {
	let { className } = _ref6, props = _objectWithoutProperties(_ref6, _excluded6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, _objectSpread2({
		ref,
		className: cn("text-sm text-muted-foreground", className)
	}, props));
});
DialogDescription.displayName = DialogDescription$1.displayName;
//#endregion
export { DialogHeader as a, DialogFooter as i, DialogContent as n, DialogTitle as o, DialogDescription as r, DialogTrigger as s, Dialog as t };
