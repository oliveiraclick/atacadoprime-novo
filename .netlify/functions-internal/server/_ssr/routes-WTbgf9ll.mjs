import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-WTbgf9ll.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error }) => {
	var _error$message;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			padding: 24,
			color: "#3d2b1f",
			background: "#faf8f5",
			minHeight: "100vh"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Erro ao carregar página inicial" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			style: { whiteSpace: "pre-wrap" },
			children: String((_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : error)
		})]
	});
};
//#endregion
export { SplitErrorComponent as errorComponent };
