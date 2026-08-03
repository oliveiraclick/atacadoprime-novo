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
import { W as Printer, Z as Package, g as TrendingDown, h as TrendingUp, m as TriangleAlert, mn as ArrowLeft, sn as Boxes } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.giro-hkbYAiKH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERIOD_LABEL = {
	"30d": "Últimos 30 dias",
	"60d": "Últimos 60 dias",
	"90d": "Últimos 90 dias",
	"180d": "Últimos 6 meses",
	"365d": "Últimos 12 meses"
};
var PERIOD_DAYS = {
	"30d": 30,
	"60d": 60,
	"90d": 90,
	"180d": 180,
	"365d": 365
};
function statusMeta(s) {
	switch (s) {
		case "PARADO": return {
			label: "Parado",
			color: "#6b7280",
			help: "Zero vendas no período"
		};
		case "LENTO": return {
			label: "Lento",
			color: "#d97706",
			help: "Cobertura > 180 dias"
		};
		case "SAUDAVEL": return {
			label: "Saudável",
			color: V2.TEAL,
			help: "Cobertura 30–180 dias"
		};
		case "RAPIDO": return {
			label: "Rápido",
			color: "#0ea5e9",
			help: "Cobertura < 30 dias — repor logo"
		};
		case "RUPTURA": return {
			label: "Ruptura",
			color: "#dc2626",
			help: "Estoque zerado com histórico de venda"
		};
	}
}
function GiroPage() {
	const [period, setPeriod] = (0, import_react.useState)("90d");
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("todos");
	const startISO = (0, import_react.useMemo)(() => {
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - PERIOD_DAYS[period]);
		return d.toISOString();
	}, [period]);
	const { data: products = [], isLoading: loadingP } = useQuery({
		queryKey: ["giro-products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, nome, sku, estoque, preco_custo, preco_unitario, status").eq("status", true);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: sales = [], isLoading: loadingS } = useQuery({
		queryKey: ["giro-sales", period],
		queryFn: async () => {
			const { data, error } = await supabase.from("order_items").select("product_id, quantidade, preco_final, orders!inner(status,created_at)").neq("orders.status", "CANCELADO").gte("orders.created_at", startISO);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { rows, totals } = (0, import_react.useMemo)(() => {
		const salesMap = /* @__PURE__ */ new Map();
		for (const it of sales) {
			const pid = it.product_id;
			const cur = salesMap.get(pid) || {
				qtd: 0,
				receita: 0
			};
			cur.qtd += Number(it.quantidade) || 0;
			cur.receita += (Number(it.quantidade) || 0) * (Number(it.preco_final) || 0);
			salesMap.set(pid, cur);
		}
		const days = PERIOD_DAYS[period];
		const arr = products.map((p) => {
			const s = salesMap.get(p.id) || {
				qtd: 0,
				receita: 0
			};
			const estoque = Number(p.estoque) || 0;
			const custo = Number(p.preco_custo) || 0;
			const vendaDia = s.qtd / days;
			const diasCobertura = vendaDia > 0 ? estoque / vendaDia : null;
			const estoqueMedio = estoque + s.qtd / 2;
			const giro = estoqueMedio > 0 ? s.qtd / estoqueMedio : 0;
			let status;
			if (s.qtd === 0) status = "PARADO";
			else if (estoque === 0) status = "RUPTURA";
			else if (diasCobertura !== null && diasCobertura < 30) status = "RAPIDO";
			else if (diasCobertura !== null && diasCobertura > 180) status = "LENTO";
			else status = "SAUDAVEL";
			return {
				product_id: p.id,
				nome: p.nome,
				sku: p.sku,
				estoque,
				custoUnit: custo,
				precoUnit: Number(p.preco_unitario) || 0,
				vendidoQtd: s.qtd,
				vendidoReceita: s.receita,
				capitalParado: estoque * custo,
				giro,
				diasCobertura,
				status
			};
		});
		arr.sort((a, b) => {
			const order = {
				PARADO: 0,
				LENTO: 1,
				RUPTURA: 2,
				SAUDAVEL: 3,
				RAPIDO: 4
			};
			if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
			return b.capitalParado - a.capitalParado;
		});
		const grupos = arr.reduce((acc, r) => {
			acc[r.status].count += 1;
			acc[r.status].capital += r.capitalParado;
			acc[r.status].receita += r.vendidoReceita;
			return acc;
		}, {
			PARADO: {
				count: 0,
				capital: 0,
				receita: 0
			},
			LENTO: {
				count: 0,
				capital: 0,
				receita: 0
			},
			SAUDAVEL: {
				count: 0,
				capital: 0,
				receita: 0
			},
			RAPIDO: {
				count: 0,
				capital: 0,
				receita: 0
			},
			RUPTURA: {
				count: 0,
				capital: 0,
				receita: 0
			}
		});
		return {
			rows: arr,
			totals: {
				capitalTotal: arr.reduce((s, r) => s + r.capitalParado, 0),
				receitaTotal: arr.reduce((s, r) => s + r.vendidoReceita, 0),
				skus: arr.length,
				grupos
			}
		};
	}, [
		products,
		sales,
		period
	]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		let out = rows;
		if (statusFilter !== "todos") out = out.filter((r) => r.status === statusFilter);
		if (q) out = out.filter((r) => r.nome.toLowerCase().includes(q) || (r.sku || "").toLowerCase().includes(q));
		return out;
	}, [
		rows,
		search,
		statusFilter
	]);
	const isLoading = loadingP || loadingS;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Giro de estoque",
		eyebrow: "Relatórios",
		description: "Identifique produtos parados, capital empatado e itens que precisam de reposição.",
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
					value: statusFilter,
					onValueChange: (v) => setStatusFilter(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[200px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "todos",
							children: "Todos os status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "PARADO",
							children: "Parado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "LENTO",
							children: "Lento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "SAUDAVEL",
							children: "Saudável"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "RAPIDO",
							children: "Rápido"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "RUPTURA",
							children: "Ruptura"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Buscar produto ou SKU…",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "max-w-xs"
				})
			]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8 text-center",
			style: { color: V2.MUTED },
			children: "Carregando…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Capital em estoque",
						value: brl(totals.capitalTotal),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Receita no período",
						value: brl(totals.receitaTotal),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "SKUs ativos",
						value: String(totals.skus),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Capital parado",
						value: brl(totals.grupos.PARADO.capital + totals.grupos.LENTO.capital),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-5 mb-6",
				children: [
					"PARADO",
					"LENTO",
					"SAUDAVEL",
					"RAPIDO",
					"RUPTURA"
				].map((s) => {
					const m = statusMeta(s);
					const g = totals.grupos[s];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border p-4",
						style: {
							borderColor: V2.GRAPHITE,
							background: V2.SURFACE
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block h-3 w-3 rounded-full",
									style: { background: m.color }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold",
									style: { color: V2.TEXT },
									children: m.label
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-bold",
								style: { color: V2.TEXT },
								children: g.count
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs",
								style: { color: V2.MUTED },
								children: [brl(g.capital), " parado"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-xs",
								style: { color: V2.MUTED },
								children: m.help
							})
						]
					}, s);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-2xl border",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						style: {
							background: V2.GRAPHITE,
							color: V2.TEXT
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-left",
								children: "Produto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-left",
								children: "SKU"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Estoque"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Vendido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Receita"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Capital parado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Giro"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Cobertura"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-center",
								children: "Status"
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((r) => {
						const m = statusMeta(r.status);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t",
							style: { borderColor: V2.GRAPHITE },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									style: { color: V2.TEXT },
									children: r.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									style: { color: V2.MUTED },
									children: r.sku || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right",
									children: r.estoque
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right",
									children: r.vendidoQtd
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right",
									children: brl(r.vendidoReceita)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right",
									children: brl(r.capitalParado)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-3 text-right",
									children: [r.giro.toFixed(2), "x"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right",
									children: r.diasCobertura === null ? "—" : `${Math.round(r.diasCobertura)} d`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold text-white",
										style: { background: m.color },
										children: m.label
									})
								})
							]
						}, r.product_id);
					}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 9,
						className: "p-4 text-center",
						style: { color: V2.MUTED },
						children: "Nenhum produto encontrado com esses filtros."
					}) })] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl border p-4 text-xs",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE,
					color: V2.MUTED
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-2",
					style: { color: V2.TEXT },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Como lemos os números" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "list-disc pl-5 space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Giro" }), " = vendas do período ÷ estoque médio (estoque atual + metade do vendido). Quanto maior, mais rápido o produto rotaciona."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Cobertura" }), " = estoque atual ÷ venda média diária. Diz quantos dias o estoque atual dura no ritmo atual de venda."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Capital parado" }), " = estoque × preço de custo. É quanto dinheiro está imobilizado naquele SKU."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Status" }), ": Parado (0 vendas), Lento (> 180 d de cobertura), Saudável (30–180 d), Rápido (< 30 d — repor logo), Ruptura (estoque 0 com histórico de venda)."] })
					]
				})]
			})
		] })]
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
export { GiroPage as component };
