import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.hoje-B5NF5do-.js
var import_jsx_runtime = require_jsx_runtime();
var SplitErrorComponent = ({ error, reset }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "min-h-screen grid place-items-center p-8",
	style: {
		background: V2.BG,
		color: V2.TEXT
	},
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-md text-center space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-xl font-semibold",
				children: "Erro ao carregar o painel Hoje"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm",
				style: { color: V2.MUTED },
				children: error instanceof Error ? error.message : String(error)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: reset,
				className: "px-4 py-2 rounded-full text-sm font-semibold",
				style: {
					background: V2.TEAL,
					color: "#fff"
				},
				children: "Tentar novamente"
			})
		]
	})
});
//#endregion
export { SplitErrorComponent as errorComponent };
