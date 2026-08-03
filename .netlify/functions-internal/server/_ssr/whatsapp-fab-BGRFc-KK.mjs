import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { rt as MessageCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/whatsapp-fab-BGRFc-KK.js
var import_jsx_runtime = require_jsx_runtime();
function WhatsAppFab({ phone = "5534998651112", message = "Olá! Vim pelo site do Atacado Prime e gostaria de atendimento para revendedor." }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
		target: "_blank",
		rel: "noopener noreferrer",
		"aria-label": "Atendimento via WhatsApp",
		className: "fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group",
		style: {
			background: "#25D366",
			color: "#ffffff",
			boxShadow: "0 8px 24px rgba(37, 211, 102, 0.4)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6 fill-current transition-transform duration-300 group-hover:rotate-12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-bold text-xs sm:text-sm tracking-wide hidden xs:inline-block",
			children: "Falar com Consultor"
		})]
	});
}
//#endregion
export { WhatsAppFab as t };
