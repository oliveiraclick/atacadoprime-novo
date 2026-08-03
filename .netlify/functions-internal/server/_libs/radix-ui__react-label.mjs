import { o as __toESM } from "../_runtime.mjs";
import { d as _objectSpread2, f as init_objectSpread2 } from "./@dnd-kit/core.mjs";
import { N as require_jsx_runtime, k as Primitive } from "./@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "./dnd-kit__accessibility+react.mjs";
//#region node_modules/@radix-ui/react-label/dist/index.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
init_objectSpread2();
var NAME = "Label";
var Label = import_react.forwardRef((props, forwardedRef) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.label, _objectSpread2(_objectSpread2({}, props), {}, {
		ref: forwardedRef,
		onMouseDown: (event) => {
			var _props$onMouseDown;
			if (event.target.closest("button, input, select, textarea")) return;
			(_props$onMouseDown = props.onMouseDown) === null || _props$onMouseDown === void 0 || _props$onMouseDown.call(props, event);
			if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
		}
	}));
});
Label.displayName = NAME;
var Root = Label;
//#endregion
export { Root as t };
