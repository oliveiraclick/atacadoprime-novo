import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { W as Printer, Z as Package, h as TrendingUp, mn as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.abc-DQY8Vjj0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERIOD_LABEL = {
	"7d": "Últimos 7 dias",
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
function AbcReportPage() {
	const [period, setPeriod] = (0, import_react.useState)("90d");
	const [search, setSearch] = (0, import_react.useState)("");
	const [criteria, setCriteria] = (0, import_react.useState)("receita");
	const { data: raw = [], isLoading } = useQuery({
		queryKey: ["abc-report", period],
		queryFn: async () => {
			const start = periodStart(period);
			let q = supabase.from("order_items").select("product_id, quantidade, preco_final, custo_unitario, orders!inner(status,created_at), products(nome,sku)").neq("orders.status", "CANCELADO");
			if (start) q = q.gte("orders.created_at", start);
			const { data, error } = await q;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { rows, totals } = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const it of raw) {
			var _it$products, _it$products2;
			const pid = it.product_id;
			const qtd = Number(it.quantidade) || 0;
			const preco = Number(it.preco_final) || 0;
			const custo = Number(it.custo_unitario) || 0;
			const cur = map.get(pid) || {
				product_id: pid,
				nome: ((_it$products = it.products) === null || _it$products === void 0 ? void 0 : _it$products.nome) || "—",
				sku: ((_it$products2 = it.products) === null || _it$products2 === void 0 ? void 0 : _it$products2.sku) || null,
				quantidade: 0,
				receita: 0,
				custo: 0,
				margem: 0,
				pctReceita: 0,
				pctAcum: 0,
				classe: "C"
			};
			cur.quantidade += qtd;
			cur.receita += qtd * preco;
			cur.custo += qtd * custo;
			map.set(pid, cur);
		}
		const arr = Array.from(map.values()).map((r) => _objectSpread2(_objectSpread2({}, r), {}, { margem: r.receita - r.custo }));
		const getKey = (r) => criteria === "receita" ? r.receita : criteria === "quantidade" ? r.quantidade : r.margem;
		arr.sort((a, b) => getKey(b) - getKey(a));
		const totalCrit = arr.reduce((s, r) => s + Math.max(getKey(r), 0), 0);
		let acum = 0;
		for (const r of arr) {
			const v = Math.max(getKey(r), 0);
			const pct = totalCrit > 0 ? v / totalCrit * 100 : 0;
			acum += pct;
			r.pctReceita = pct;
			r.pctAcum = acum;
			r.classe = acum <= 80 ? "A" : acum <= 95 ? "B" : "C";
		}
		const totRec = arr.reduce((s, r) => s + r.receita, 0);
		const totCusto = arr.reduce((s, r) => s + r.custo, 0);
		const totQtd = arr.reduce((s, r) => s + r.quantidade, 0);
		const skus = arr.length;
		const grupos = arr.reduce((acc, r) => {
			acc[r.classe].count += 1;
			acc[r.classe].receita += r.receita;
			acc[r.classe].quantidade += r.quantidade;
			acc[r.classe].margem += r.margem;
			return acc;
		}, {
			A: {
				count: 0,
				receita: 0,
				quantidade: 0,
				margem: 0
			},
			B: {
				count: 0,
				receita: 0,
				quantidade: 0,
				margem: 0
			},
			C: {
				count: 0,
				receita: 0,
				quantidade: 0,
				margem: 0
			}
		});
		return {
			rows: arr,
			totals: {
				receita: totRec,
				custo: totCusto,
				quantidade: totQtd,
				margem: totRec - totCusto,
				skus,
				grupos
			}
		};
	}, [raw, criteria]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		if (!q) return rows;
		return rows.filter((r) => r.nome.toLowerCase().includes(q) || (r.sku || "").toLowerCase().includes(q));
	}, [rows, search]);
	const classeColor = (c) => c === "A" ? V2.TEAL : c === "B" ? V2.TEAL_DARK : V2.MUTED;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Curva ABC de produtos",
		eyebrow: "Relatórios",
		description: "Classificação das peças mais vendidas por receita, quantidade ou margem.",
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
					value: criteria,
					onValueChange: (v) => setCriteria(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[200px]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "receita",
							children: "Classificar por receita"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "quantidade",
							children: "Classificar por quantidade"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "margem",
							children: "Classificar por margem"
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
		}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8 text-center rounded-2xl border",
			style: {
				borderColor: V2.GRAPHITE,
				background: V2.SURFACE,
				color: V2.MUTED
			},
			children: "Sem vendas no período selecionado."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Receita total",
						value: brl(totals.receita),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Itens vendidos",
						value: totals.quantidade.toLocaleString("pt-BR"),
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Margem bruta",
						value: brl(totals.margem)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "SKUs distintos",
						value: String(totals.skus)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3 mb-6",
				children: [
					"A",
					"B",
					"C"
				].map((c) => {
					const g = totals.grupos[c];
					const pct = totals.receita > 0 ? g.receita / totals.receita * 100 : 0;
					const help = c === "A" ? "Top ~80% do critério — foque atenção, estoque e negociação" : c === "B" ? "Próximos ~15% — importantes, revisar mix" : "Últimos ~5% — avaliar descontinuar ou reduzir compra";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border p-4",
						style: {
							borderColor: V2.GRAPHITE,
							background: V2.SURFACE
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-flex h-8 w-8 items-center justify-center rounded-full font-bold text-white",
									style: { background: classeColor(c) },
									children: c
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm font-semibold",
									style: { color: V2.TEXT },
									children: ["Classe ", c]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs",
									style: { color: V2.MUTED },
									children: [
										g.count,
										" SKU",
										g.count === 1 ? "" : "s"
									]
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-lg font-bold",
								style: { color: V2.TEXT },
								children: brl(g.receita)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs",
								style: { color: V2.MUTED },
								children: [
									pct.toFixed(1),
									"% da receita · ",
									g.quantidade,
									" un"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-xs",
								style: { color: V2.MUTED },
								children: help
							})
						]
					}, c);
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
								children: "#"
							}),
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
								children: "Qtd"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Receita"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Margem"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
								className: "p-3 text-right",
								children: ["% ", criteria]
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
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [filtered.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
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
								className: "p-3",
								style: { color: V2.MUTED },
								children: r.sku || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-right",
								children: r.quantidade
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-right",
								children: brl(r.receita)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-right",
								children: brl(r.margem)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-3 text-right",
								children: [r.pctReceita.toFixed(1), "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "p-3 text-right",
								children: [r.pctAcum.toFixed(1), "%"]
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
					}, r.product_id)), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 9,
						className: "p-4 text-center",
						style: { color: V2.MUTED },
						children: "Nenhum produto encontrado com esse filtro."
					}) })] })]
				})
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
export { AbcReportPage as component };
