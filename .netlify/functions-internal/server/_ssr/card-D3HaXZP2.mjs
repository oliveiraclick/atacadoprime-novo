import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-D3HaXZP2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _excluded = ["className"], _excluded2 = ["className"], _excluded3 = ["className"], _excluded4 = ["className"], _excluded5 = ["className"], _excluded6 = ["className"];
var Card = import_react.forwardRef((_ref, ref) => {
	let { className } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({
		ref,
		className: cn("rounded-xl border bg-card text-card-foreground shadow", className)
	}, props));
});
Card.displayName = "Card";
var CardHeader = import_react.forwardRef((_ref2, ref) => {
	let { className } = _ref2, props = _objectWithoutProperties(_ref2, _excluded2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({
		ref,
		className: cn("flex flex-col space-y-1.5 p-6", className)
	}, props));
});
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef((_ref3, ref) => {
	let { className } = _ref3, props = _objectWithoutProperties(_ref3, _excluded3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({
		ref,
		className: cn("font-semibold leading-none tracking-tight", className)
	}, props));
});
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef((_ref4, ref) => {
	let { className } = _ref4, props = _objectWithoutProperties(_ref4, _excluded4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({
		ref,
		className: cn("text-sm text-muted-foreground", className)
	}, props));
});
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef((_ref5, ref) => {
	let { className } = _ref5, props = _objectWithoutProperties(_ref5, _excluded5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({
		ref,
		className: cn("p-6 pt-0", className)
	}, props));
});
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef((_ref6, ref) => {
	let { className } = _ref6, props = _objectWithoutProperties(_ref6, _excluded6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({
		ref,
		className: cn("flex items-center p-6 pt-0", className)
	}, props));
});
CardFooter.displayName = "CardFooter";
//#endregion
export { CardTitle as i, CardContent as n, CardHeader as r, Card as t };
