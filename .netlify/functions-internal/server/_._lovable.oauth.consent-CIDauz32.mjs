import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Shell } from "./_._lovable.oauth.consent-DTClbIDf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-CIDauz32.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error }) => {
	var _error$message;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm",
		style: { color: "#b91c1c" },
		children: ["Não foi possível carregar esta autorização: ", String((_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : error)]
	}) });
};
//#endregion
export { SplitErrorComponent as errorComponent };
