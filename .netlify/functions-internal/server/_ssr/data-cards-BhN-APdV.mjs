import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/data-cards-BhN-APdV.js
var import_jsx_runtime = require_jsx_runtime();
var TONE_SOLID = {
	blue: "bg-blue-500",
	green: "bg-emerald-500",
	orange: "bg-orange-500",
	purple: "bg-violet-500",
	pink: "bg-pink-500",
	red: "bg-rose-500",
	yellow: "bg-amber-500",
	indigo: "bg-indigo-500",
	slate: "bg-slate-500"
};
function StatCard({ label, value, icon: Icon, tone = "blue" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-2xl p-3 sm:p-5 shadow-sm border border-slate-100 flex items-center justify-between gap-2 sm:gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] sm:text-[12px] text-slate-500 font-medium truncate",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base sm:text-[28px] leading-tight font-bold text-slate-900 mt-1 tabular-nums truncate",
				children: value
			})]
		}), Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: cn("h-9 w-9 sm:h-12 sm:w-12 rounded-xl grid place-items-center text-white shadow-sm shrink-0", TONE_SOLID[tone]),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "h-4 w-4 sm:h-5 sm:w-5",
				strokeWidth: 2.2
			})
		})]
	});
}
//#endregion
export { StatCard as t };
