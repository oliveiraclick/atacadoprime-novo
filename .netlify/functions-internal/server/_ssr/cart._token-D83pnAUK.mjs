import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { v as useParams } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Card } from "./card-D3HaXZP2.mjs";
import { t as Badge } from "./badge-CnQ0tQ74.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart._token-D83pnAUK.js
var import_jsx_runtime = require_jsx_runtime();
function useSharedCart(token) {
	return useQuery({
		queryKey: ["shared-cart", token],
		enabled: !!token,
		queryFn: async () => {
			var _data$;
			const { data, error } = await supabase.rpc("get_shared_cart", { _token: token });
			if (error) throw error;
			return (_data$ = data === null || data === void 0 ? void 0 : data[0]) !== null && _data$ !== void 0 ? _data$ : null;
		}
	});
}
function SharedCartPage() {
	var _data$items;
	const { token } = useParams({ from: "/cart/$token" });
	const { data, isLoading } = useSharedCart(token);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Centered, { children: "Carregando carrinho…" });
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Centered, { children: "Carrinho não encontrado ou expirado." });
	const items = (_data$items = data.items) !== null && _data$items !== void 0 ? _data$items : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background py-10 px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-2xl font-semibold",
							children: "Seu carrinho"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Montado pelo seu consultor durante a visita."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							className: "mt-2",
							variant: data.status === "CONVERTIDO" ? "secondary" : "outline",
							children: data.status
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "divide-y",
					children: items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: it.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								it.quantidade,
								" × ",
								brl(Number(it.preco))
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: brl(it.quantidade * Number(it.preco))
						})]
					}, idx))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between mt-4 text-lg font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(Number(data.subtotal)) })]
				}),
				data.observacoes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground bg-muted/40 rounded-md p-3",
					children: data.observacoes
				})
			]
		})
	});
}
function Centered({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen grid place-items-center p-6 text-muted-foreground",
		children
	});
}
//#endregion
export { SharedCartPage as component };
