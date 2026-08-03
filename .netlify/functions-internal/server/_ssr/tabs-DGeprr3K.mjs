import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tabs-DGeprr3K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _excluded = ["className"], _excluded2 = ["className"], _excluded3 = ["className"];
var Tabs = Root2;
var TabsList = import_react.forwardRef((_ref, ref) => {
	let { className } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, _objectSpread2({
		ref,
		className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className)
	}, props));
});
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef((_ref2, ref) => {
	let { className } = _ref2, props = _objectWithoutProperties(_ref2, _excluded2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, _objectSpread2({
		ref,
		className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className)
	}, props));
});
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef((_ref3, ref) => {
	let { className } = _ref3, props = _objectWithoutProperties(_ref3, _excluded3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, _objectSpread2({
		ref,
		className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)
	}, props));
});
TabsContent.displayName = Content.displayName;
//#endregion
export { TabsTrigger as i, TabsContent as n, TabsList as r, Tabs as t };
