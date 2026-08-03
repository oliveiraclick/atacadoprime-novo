import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.fechamento-D5Emhj3T.js
var import_jsx_runtime = require_jsx_runtime();
function FechamentoErro({ error, reset }) {
	var _error$message;
	console.error("[fechamento]", error);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-lg font-semibold",
				style: { color: V2.TEXT },
				children: "Não foi possível abrir o fechamento"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm mt-2",
				style: { color: V2.MUTED },
				children: (_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : "Erro inesperado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => reset(),
					children: "Tentar de novo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/v3/dashboard",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						children: "Voltar ao painel"
					})
				})]
			})
		]
	});
}
//#endregion
export { FechamentoErro as errorComponent };
