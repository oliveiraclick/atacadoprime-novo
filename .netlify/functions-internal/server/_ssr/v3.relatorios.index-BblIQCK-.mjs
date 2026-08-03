import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { E as ShoppingCart, Xt as ChevronRight, c as Users, en as ChartColumn, h as TrendingUp, p as Truck, sn as Boxes, y as Target } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.index-BblIQCK-.js
var import_jsx_runtime = require_jsx_runtime();
var REPORTS = [
	{
		to: "/v3/relatorios/resultado",
		label: "Resultado do período",
		desc: "Venda, custo das peças, despesas e lucro líquido — com % de cada item sobre a venda total. Escolha o período.",
		icon: TrendingUp,
		available: true
	},
	{
		to: "/v3/relatorios/vendas",
		label: "Relatório de vendas",
		desc: "Filtre por dia, semana, mês ou período customizado. Receita, ticket, pagamentos e pedidos.",
		icon: ShoppingCart,
		available: true
	},
	{
		to: "/v3/relatorios/viagem",
		label: "Relatório de viagem",
		desc: "Produtos vendidos, custo, margem, despesas e resultado líquido por viagem.",
		icon: Truck,
		available: true
	},
	{
		to: "/v3/relatorios/abc",
		label: "Curva ABC de produtos",
		desc: "Peças mais vendidas classificadas em A/B/C por receita, quantidade ou margem.",
		icon: ChartColumn,
		available: true
	},
	{
		to: "/v3/relatorios/abc-clientes",
		label: "Curva ABC de clientes",
		desc: "Melhores clientes por cidade (Top 5/10) classificados por receita.",
		icon: Users,
		available: true
	},
	{
		to: "/v3/relatorios/projecao",
		label: "Projeção de ganho",
		desc: "Defina um lucro-alvo e veja quanto precisa vender com base no seu histórico.",
		icon: Target,
		available: true
	},
	{
		to: "/v3/relatorios/giro",
		label: "Giro de estoque",
		desc: "Produtos parados, capital empatado, cobertura em dias e alertas de reposição.",
		icon: Boxes,
		available: true
	}
];
function ReportsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Relatórios",
		eyebrow: "Central de relatórios",
		description: "Escolha um relatório para análise detalhada.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
			children: REPORTS.map((r) => {
				const Icon = r.icon;
				const Card = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "group flex items-center gap-4 rounded-2xl border p-4 transition hover:shadow-lg",
					style: {
						borderColor: V2.GRAPHITE,
						background: V2.SURFACE
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 w-12 items-center justify-center rounded-xl",
							style: {
								background: `${V2.TEAL}22`,
								color: V2.TEAL
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-semibold",
								style: { color: V2.TEXT },
								children: r.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs",
								style: { color: V2.MUTED },
								children: r.desc
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5 opacity-40 group-hover:opacity-100 transition" })
					]
				});
				return r.available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: r.to,
					children: Card
				}, r.to) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "opacity-50 cursor-not-allowed",
					children: Card
				}, r.to);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 rounded-2xl border p-4 text-sm",
			style: {
				borderColor: V2.GRAPHITE,
				background: V2.SURFACE,
				color: V2.MUTED
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-2",
				style: { color: V2.TEXT },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Novos relatórios em breve" })]
			}), "Descreva o próximo relatório que você precisa e adicionamos aqui como submenu."]
		})]
	});
}
//#endregion
export { ReportsIndex as component };
