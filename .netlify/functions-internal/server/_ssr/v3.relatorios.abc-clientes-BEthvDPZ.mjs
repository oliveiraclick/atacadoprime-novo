import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { W as Printer, c as Users, h as TrendingUp, mn as ArrowLeft, st as MapPin } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.abc-clientes-BEthvDPZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERIOD_LABEL = {
	"30d": "Últimos 30 dias",
	"90d": "Últimos 90 dias",
	"180d": "Últimos 6 meses",
	"365d": "Últimos 12 meses",
	all: "Todo o período"
};
function periodStart(p) {
	if (p === "all") return null;
	const days = Number(p.replace("d", ""));
	const d = /* @__PURE__ */ new Date();
	d.setDate(d.getDate() - days);
	return d.toISOString();
}
function AbcCustomersPage() {
	const [period, setPeriod] = (0, import_react.useState)("180d");
	const [search, setSearch] = (0, import_react.useState)("");
	const [topN, setTopN] = (0, import_react.useState)("5");
	const { data: raw = [], isLoading } = useQuery({
		queryKey: ["abc-customers", period],
		queryFn: async () => {
			const start = periodStart(period);
			let q = supabase.from("orders").select("id,total,created_at,status,company_id,companies!inner(legal_name,trade_name,cidade,estado)").neq("status", "CANCELADO").not("company_id", "is", null);
			if (start) q = q.gte("created_at", start);
			const { data, error } = await q;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { cidades, totals } = (0, import_react.useMemo)(() => {
		const byCliente = /* @__PURE__ */ new Map();
		for (const o of raw) {
			const c = o.companies || {};
			const cid = o.company_id;
			const total = Number(o.total || 0);
			const cur = byCliente.get(cid) || {
				company_id: cid,
				nome: c.trade_name || c.legal_name || "Cliente",
				cidade: (c.cidade || "SEM CIDADE").toString(),
				estado: (c.estado || "").toString(),
				pedidos: 0,
				receita: 0,
				ticket: 0,
				ultima: null,
				pctCidade: 0,
				pctAcumCidade: 0,
				classe: "C"
			};
			cur.pedidos += 1;
			cur.receita += total;
			if (!cur.ultima || o.created_at > cur.ultima) cur.ultima = o.created_at;
			byCliente.set(cid, cur);
		}
		for (const r of byCliente.values()) r.ticket = r.pedidos > 0 ? r.receita / r.pedidos : 0;
		const byCidade = /* @__PURE__ */ new Map();
		for (const r of byCliente.values()) {
			const key = `${r.cidade}|${r.estado}`;
			if (!byCidade.has(key)) byCidade.set(key, []);
			byCidade.get(key).push(r);
		}
		const cidades = Array.from(byCidade.entries()).map(([key, list]) => {
			const [cidade, estado] = key.split("|");
			list.sort((a, b) => b.receita - a.receita);
			const totalCidade = list.reduce((s, r) => s + r.receita, 0);
			let acum = 0;
			for (const r of list) {
				const pct = totalCidade > 0 ? r.receita / totalCidade * 100 : 0;
				acum += pct;
				r.pctCidade = pct;
				r.pctAcumCidade = acum;
				r.classe = acum <= 80 ? "A" : acum <= 95 ? "B" : "C";
			}
			return {
				cidade,
				estado,
				clientes: list,
				totalReceita: totalCidade,
				totalPedidos: list.reduce((s, r) => s + r.pedidos, 0)
			};
		});
		cidades.sort((a, b) => b.totalReceita - a.totalReceita);
		return {
			cidades,
			totals: {
				cidades: cidades.length,
				clientes: byCliente.size,
				receita: cidades.reduce((s, c) => s + c.totalReceita, 0),
				pedidos: cidades.reduce((s, c) => s + c.totalPedidos, 0)
			}
		};
	}, [raw]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		if (!q) return cidades;
		return cidades.filter((c) => c.cidade.toLowerCase().includes(q) || c.estado.toLowerCase().includes(q) || c.clientes.some((cl) => cl.nome.toLowerCase().includes(q)));
	}, [cidades, search]);
	const limit = topN === "all" ? Infinity : Number(topN);
	const classeColor = (c) => c === "A" ? V2.TEAL : c === "B" ? V2.TEAL_DARK : V2.MUTED;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Curva ABC de clientes",
		eyebrow: "Relatórios",
		description: "Melhores clientes por cidade, classificados por receita.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/v3/relatorios",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Relatórios"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => window.print(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-1" }), " Imprimir"]
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: period,
					onValueChange: (v) => setPeriod(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[200px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Object.keys(PERIOD_LABEL).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: p,
						children: PERIOD_LABEL[p]
					}, p)) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: topN,
					onValueChange: (v) => setTopN(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[180px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "5",
							children: "Top 5 por cidade"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "10",
							children: "Top 10 por cidade"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Todos por cidade"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar cidade, UF ou cliente…",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "max-w-xs"
				})
			]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8 text-center",
			style: { color: V2.MUTED },
			children: "Carregando…"
		}) : cidades.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8 text-center rounded-2xl border",
			style: {
				borderColor: V2.GRAPHITE,
				background: V2.SURFACE,
				color: V2.MUTED
			},
			children: "Sem vendas com cliente vinculado no período."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Receita total",
					value: brl(totals.receita),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Pedidos",
					value: totals.pedidos.toLocaleString("pt-BR")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Clientes distintos",
					value: String(totals.clientes),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
					label: "Cidades",
					value: String(totals.cidades),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [filtered.map((c) => {
				const list = c.clientes.slice(0, limit);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border overflow-hidden",
					style: {
						borderColor: V2.GRAPHITE,
						background: V2.SURFACE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b",
						style: {
							borderColor: V2.GRAPHITE,
							background: V2.GRAPHITE
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							style: { color: V2.TEXT },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									className: "h-4 w-4",
									style: { color: V2.TEAL }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: c.cidade
								}),
								c.estado && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									style: { color: V2.MUTED },
									children: c.estado
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm flex items-center gap-4",
							style: { color: V2.MUTED },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									c.clientes.length,
									" cliente",
									c.clientes.length === 1 ? "" : "s"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									c.totalPedidos,
									" pedido",
									c.totalPedidos === 1 ? "" : "s"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									style: { color: V2.TEXT },
									children: brl(c.totalReceita)
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								style: { color: V2.MUTED },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-left",
										children: "#"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-left",
										children: "Cliente"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "Pedidos"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "Ticket médio"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "Receita"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "% cidade"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-right",
										children: "% acum."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-3 text-center",
										children: "Classe"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [list.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t",
								style: { borderColor: V2.GRAPHITE },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										style: { color: V2.MUTED },
										children: i + 1
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										style: { color: V2.TEXT },
										children: r.nome
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right",
										children: r.pedidos
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right",
										children: brl(r.ticket)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right font-semibold",
										style: { color: V2.TEXT },
										children: brl(r.receita)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3 text-right",
										children: [r.pctCidade.toFixed(1), "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "p-3 text-right",
										children: [r.pctAcumCidade.toFixed(1), "%"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-bold text-white",
											style: { background: classeColor(r.classe) },
											children: r.classe
										})
									})
								]
							}, r.company_id)), c.clientes.length > list.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								colSpan: 8,
								className: "p-3 text-center text-xs",
								style: { color: V2.MUTED },
								children: [
									"+",
									c.clientes.length - list.length,
									" cliente",
									c.clientes.length - list.length === 1 ? "" : "s",
									" não exibido",
									c.clientes.length - list.length === 1 ? "" : "s",
									" — mude o filtro para ver mais."
								]
							}) })] })]
						})
					})]
				}, `${c.cidade}-${c.estado}`);
			}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-6 text-center text-sm",
				style: { color: V2.MUTED },
				children: "Nenhuma cidade/cliente corresponde à busca."
			})]
		})] })]
	});
}
function Kpi({ label, value, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-4",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-xs mb-1",
			style: { color: V2.MUTED },
			children: [icon, label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-lg font-bold",
			style: { color: V2.TEXT },
			children: value
		})]
	});
}
//#endregion
export { AbcCustomersPage as component };
