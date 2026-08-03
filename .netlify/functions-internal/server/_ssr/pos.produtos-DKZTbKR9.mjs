import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { N as Search, W as Printer } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as printHTML } from "./pos-printer-Cb2iJw0o.mjs";
import { n as renderLabel } from "./pos-templates-kUAheyLO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.produtos-DKZTbKR9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
function PosProdutos() {
	const [q, setQ] = (0, import_react.useState)("");
	const [copies, setCopies] = (0, import_react.useState)(1);
	const { data: products = [] } = useQuery({
		queryKey: [
			"pos",
			"produtos-lista",
			q
		],
		queryFn: async () => {
			let query = supabase.from("products").select("id,nome,sku,ean13,preco_unitario,preco_nivel_1").eq("status", true).order("nome").limit(500);
			if (q.trim()) query = query.or(`nome.ilike.%${q}%,sku.ilike.%${q}%`);
			const { data, error } = await query;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	async function printLabel(p) {
		var _p$preco_nivel_;
		if (!p.ean13) {
			toast.error("Produto sem código EAN13");
			return;
		}
		await printHTML(renderLabel({
			nome: p.nome,
			preco: Number((_p$preco_nivel_ = p.preco_nivel_1) !== null && _p$preco_nivel_ !== void 0 ? _p$preco_nivel_ : p.preco_unitario),
			codigo: p.ean13,
			sku: p.sku
		}), { copies });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar produto",
					className: "pl-8 h-11"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
				value: copies,
				onChange: (e) => setCopies(Number(e.target.value)),
				className: "h-11 rounded border px-2 text-sm",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				"aria-label": "Cópias",
				children: [
					1,
					2,
					5,
					10
				].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: n,
					children: [n, "x"]
				}, n))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: products.map((p) => {
				var _p$preco_nivel_2;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-3 rounded-lg border flex items-center gap-3",
					style: {
						background: V2.LIGHT_SURFACE,
						borderColor: V2.LIGHT_BORDER
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium truncate",
								children: p.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px]",
								style: { color: V2.LIGHT_MUTED },
								children: [
									p.sku,
									" ",
									p.ean13 ? `· EAN ${p.ean13}` : "· sem EAN"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-sm mt-0.5",
								style: { color: V2.TEAL },
								children: brl(Number((_p$preco_nivel_2 = p.preco_nivel_1) !== null && _p$preco_nivel_2 !== void 0 ? _p$preco_nivel_2 : p.preco_unitario))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => printLabel(p),
						className: "h-10 px-3 rounded-lg border flex items-center gap-1.5 text-xs font-semibold",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.TEAL
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), " Etiqueta"]
					})]
				}, p.id);
			})
		})]
	});
}
//#endregion
export { PosProdutos as component };
