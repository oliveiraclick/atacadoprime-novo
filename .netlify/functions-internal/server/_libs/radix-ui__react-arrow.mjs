import { o as __toESM } from "../_runtime.mjs";
import { d as _objectSpread2, f as init_objectSpread2, u as _objectWithoutProperties } from "./@dnd-kit/core.mjs";
import { N as require_jsx_runtime, k as Primitive } from "./@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "./dnd-kit__accessibility+react.mjs";
//#region node_modules/@radix-ui/react-arrow/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
init_objectSpread2();
var _excluded = [
	"children",
	"width",
	"height"
];
var NAME = "Arrow";
var Arrow = import_react.forwardRef((props, forwardedRef) => {
	const { children, width = 10, height = 5 } = props, arrowProps = _objectWithoutProperties(props, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.svg, _objectSpread2(_objectSpread2({}, arrowProps), {}, {
		ref: forwardedRef,
		width,
		height,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: props.asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "0,0 30,0 15,10" })
	}));
});
Arrow.displayName = NAME;
var Root = Arrow;
//#endregion
export { Root as t };
