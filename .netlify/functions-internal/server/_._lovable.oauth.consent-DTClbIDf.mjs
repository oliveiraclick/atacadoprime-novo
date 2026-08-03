import { r as supabase } from "./_ssr/client-CtYDXrXg.mjs";
import { t as brand_logo_png_asset_default } from "./_ssr/brand-logo.png.asset-9qqK49Y7.mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-DTClbIDf.js
var import_jsx_runtime = require_jsx_runtime();
var oauth = () => supabase.auth.oauth;
function Shell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen grid place-items-center p-6",
		style: {
			background: "#faf8f5",
			color: "#3d2b1f"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-2xl border p-7 space-y-5",
			style: {
				background: "#ffffff",
				borderColor: "#e8e2d8"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-11 h-11 rounded-xl grid place-items-center overflow-hidden border",
					style: { borderColor: "#e8e2d8" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: brand_logo_png_asset_default.url,
						alt: "Atacado Prime",
						className: "w-7 h-7 object-contain"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "leading-tight",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "uppercase tracking-[0.25em] text-[10px]",
						style: { color: "#8b7355" },
						children: "Autorização"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "uppercase tracking-widest text-sm font-bold",
						children: "Atacado Prime"
					})]
				})]
			}), children]
		})
	});
}
//#endregion
export { oauth as n, Shell as t };
