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
import { It as DollarSign, W as Printer, Z as Package, g as TrendingDown, h as TrendingUp, mn as ArrowLeft, s as Wallet } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.resultado-Cr3w5nzK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isoDay(d) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return x.toISOString().slice(0, 10);
}
function rangeFor(p, from, to) {
	const today = /* @__PURE__ */ new Date(/* @__PURE__ */ new Date());
	today.setHours(0, 0, 0, 0);
	const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const startPrev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
	const endPrev = new Date(today.getFullYear(), today.getMonth(), 0);
	const startYear = new Date(today.getFullYear(), 0, 1);
	const d7 = new Date(today);
	d7.setDate(d7.getDate() - 6);
	const d30 = new Date(today);
	d30.setDate(d30.getDate() - 29);
	switch (p) {
		case "hoje": return {
			from: isoDay(today),
			to: isoDay(today)
		};
		case "7d": return {
			from: isoDay(d7),
			to: isoDay(today)
		};
		case "30d": return {
			from: isoDay(d30),
			to: isoDay(today)
		};
		case "mes": return {
			from: isoDay(startMonth),
			to: isoDay(endMonth)
		};
		case "mes_ant": return {
			from: isoDay(startPrev),
			to: isoDay(endPrev)
		};
		case "ano": return {
			from: isoDay(startYear),
			to: isoDay(today)
		};
		case "custom": return {
			from,
			to
		};
	}
}
function ResultadoPage() {
	const [periodo, setPeriodo] = (0, import_react.useState)("mes");
	const today = isoDay(/* @__PURE__ */ new Date());
	const [from, setFrom] = (0, import_react.useState)(today);
	const [to, setTo] = (0, import_react.useState)(today);
	const range = (0, import_react.useMemo)(() => rangeFor(periodo, from, to), [
		periodo,
		from,
		to
	]);
	const { data, isLoading } = useQuery({
		queryKey: [
			"resultado-report",
			range.from,
			range.to
		],
		queryFn: async () => {
			var _ordersRes$data, _tripExpRes$data, _finTxRes$data, _finEntRes$data;
			const startISO = (/* @__PURE__ */ new Date(range.from + "T00:00:00")).toISOString();
			const endISO = (/* @__PURE__ */ new Date(range.to + "T23:59:59.999")).toISOString();
			const [ordersRes, tripExpRes, finTxRes, finEntRes] = await Promise.all([
				supabase.from("orders").select("id,created_at,status,total,order_items(quantidade,custo_unitario,preco_final,subtotal)").gte("created_at", startISO).lte("created_at", endISO).neq("status", "CANCELADO"),
				supabase.from("trip_expenses").select("id,data,valor,categoria,descricao").gte("data", range.from).lte("data", range.to),
				supabase.from("financial_transactions").select("id,tipo,valor,status,descricao,pagamento,vencimento,order_id").eq("tipo", "DESPESA").gte("created_at", startISO).lte("created_at", endISO),
				supabase.from("financial_entries").select("id,tipo,valor,data,descricao").eq("tipo", "DESPESA").gte("data", range.from).lte("data", range.to)
			]);
			if (ordersRes.error) throw ordersRes.error;
			if (tripExpRes.error) throw tripExpRes.error;
			if (finTxRes.error) throw finTxRes.error;
			if (finEntRes.error) throw finEntRes.error;
			return {
				orders: (_ordersRes$data = ordersRes.data) !== null && _ordersRes$data !== void 0 ? _ordersRes$data : [],
				tripExpenses: (_tripExpRes$data = tripExpRes.data) !== null && _tripExpRes$data !== void 0 ? _tripExpRes$data : [],
				finTx: (_finTxRes$data = finTxRes.data) !== null && _finTxRes$data !== void 0 ? _finTxRes$data : [],
				finEnt: (_finEntRes$data = finEntRes.data) !== null && _finEntRes$data !== void 0 ? _finEntRes$data : []
			};
		}
	});
	const calc = (0, import_react.useMemo)(() => {
		var _data$orders, _data$tripExpenses, _data$finTx, _data$finEnt;
		const orders = (_data$orders = data === null || data === void 0 ? void 0 : data.orders) !== null && _data$orders !== void 0 ? _data$orders : [];
		const receita = orders.reduce((s, o) => s + Number(o.total || 0), 0);
		const custoPecas = orders.reduce((s, o) => s + (o.order_items || []).reduce((a, i) => a + Number(i.quantidade || 0) * Number(i.custo_unitario || 0), 0), 0);
		const pedidos = orders.length;
		const despViagem = ((_data$tripExpenses = data === null || data === void 0 ? void 0 : data.tripExpenses) !== null && _data$tripExpenses !== void 0 ? _data$tripExpenses : []).reduce((s, e) => s + Number(e.valor || 0), 0);
		const isCogsLine = (d) => !!d && /custo.*pe[çc]a/i.test(d);
		const despFinanceiro = ((_data$finTx = data === null || data === void 0 ? void 0 : data.finTx) !== null && _data$finTx !== void 0 ? _data$finTx : []).filter((t) => !isCogsLine(t.descricao)).reduce((s, t) => s + Number(t.valor || 0), 0);
		const despLancadas = ((_data$finEnt = data === null || data === void 0 ? void 0 : data.finEnt) !== null && _data$finEnt !== void 0 ? _data$finEnt : []).reduce((s, e) => s + Number(e.valor || 0), 0);
		const despesasOperacionais = despViagem + despFinanceiro + despLancadas;
		const custoTotal = custoPecas + despesasOperacionais;
		const lucroBruto = receita - custoPecas;
		const resultado = receita - custoTotal;
		const margemBruta = receita > 0 ? lucroBruto / receita * 100 : 0;
		const margemLiquida = receita > 0 ? resultado / receita * 100 : 0;
		const pct = (n) => receita > 0 ? n / receita * 100 : 0;
		return {
			receita,
			custoPecas,
			despViagem,
			despFinanceiro,
			despLancadas,
			despesasOperacionais,
			custoTotal,
			lucroBruto,
			resultado,
			margemBruta,
			margemLiquida,
			pedidos,
			pct
		};
	}, [data]);
	const rangeLabel = `${range.from.split("-").reverse().join("/")} → ${range.to.split("-").reverse().join("/")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Resultado do período",
		eyebrow: "Relatórios",
		description: "Receita, custos, despesas e lucro líquido — com percentual de cada item sobre a venda total.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => window.print(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-2" }), " Imprimir"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/v3/relatorios",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-2" }), " Voltar"]
				})
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border p-4 mb-4 flex flex-wrap items-end gap-3",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.MUTED },
						children: "Período"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: periodo,
						onValueChange: (v) => setPeriodo(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "hoje",
								children: "Hoje"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "7d",
								children: "Últimos 7 dias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "30d",
								children: "Últimos 30 dias"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "mes",
								children: "Este mês"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "mes_ant",
								children: "Mês anterior"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "ano",
								children: "Este ano"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "custom",
								children: "Personalizado"
							})
						] })]
					})] }),
					periodo === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.MUTED },
						children: "De"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: from,
						onChange: (e) => setFrom(e.target.value),
						className: "w-40"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.MUTED },
						children: "Até"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value),
						className: "w-40"
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto text-xs",
						style: { color: V2.MUTED },
						children: [
							"A reserva da empresa e a transferência ficam em",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/v3/fechamento",
								className: "underline",
								style: { color: V2.TEAL },
								children: "Fechamento"
							}),
							"."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs mb-3 px-1",
				style: { color: V2.MUTED },
				children: [
					rangeLabel,
					" · ",
					calc.pedidos,
					" pedidos"
				]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border p-8 text-center",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE,
					color: V2.MUTED
				},
				children: "Carregando..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Receita (vendas)",
							value: brl(calc.receita),
							sub: `${calc.pedidos} pedidos`,
							icon: DollarSign,
							accent: V2.TEAL
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Custo das peças",
							value: brl(calc.custoPecas),
							sub: `${calc.pct(calc.custoPecas).toFixed(1)}% da venda`,
							icon: Package,
							accent: "#f59e0b"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Despesas operacionais",
							value: brl(calc.despesasOperacionais),
							sub: `${calc.pct(calc.despesasOperacionais).toFixed(1)}% da venda`,
							icon: Wallet,
							accent: "#ef4444"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
							label: "Resultado líquido",
							value: brl(calc.resultado),
							sub: `Margem ${calc.margemLiquida.toFixed(1)}%`,
							icon: calc.resultado >= 0 ? TrendingUp : TrendingDown,
							accent: calc.resultado >= 0 ? "#16a34a" : "#dc2626"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border overflow-hidden",
					style: {
						borderColor: V2.GRAPHITE,
						background: V2.SURFACE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-4 py-3 border-b font-semibold",
						style: {
							borderColor: V2.GRAPHITE,
							color: V2.TEXT
						},
						children: "Demonstrativo de resultado"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left border-b",
							style: {
								borderColor: V2.GRAPHITE,
								color: V2.MUTED
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2",
									children: "Linha"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 text-right",
									children: "Valor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-2 text-right w-32",
									children: "% da venda"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLine, {
								label: "(+) Receita bruta de vendas",
								valor: calc.receita,
								pct: 100,
								bold: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLine, {
								label: "(−) Custo das peças vendidas",
								valor: -calc.custoPecas,
								pct: -calc.pct(calc.custoPecas)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLine, {
								label: "(=) Lucro bruto",
								valor: calc.lucroBruto,
								pct: calc.margemBruta,
								bold: true,
								accent: calc.lucroBruto >= 0 ? "#16a34a" : "#dc2626"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLine, {
								label: "(−) Despesas de viagem",
								valor: -calc.despViagem,
								pct: -calc.pct(calc.despViagem),
								muted: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLine, {
								label: "(−) Despesas financeiras/contas",
								valor: -calc.despFinanceiro,
								pct: -calc.pct(calc.despFinanceiro),
								muted: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLine, {
								label: "(−) Despesas lançadas manualmente",
								valor: -calc.despLancadas,
								pct: -calc.pct(calc.despLancadas),
								muted: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowLine, {
								label: "(=) Total de despesas operacionais",
								valor: -calc.despesasOperacionais,
								pct: -calc.pct(calc.despesasOperacionais)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								style: { background: `${V2.TEAL}10` },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-bold",
										style: { color: V2.TEXT },
										children: "(=) Resultado líquido"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 text-right font-bold",
										style: { color: calc.resultado >= 0 ? "#16a34a" : "#dc2626" },
										children: brl(calc.resultado)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3 text-right font-bold",
										style: { color: calc.resultado >= 0 ? "#16a34a" : "#dc2626" },
										children: [calc.margemLiquida.toFixed(1), "%"]
									})
								]
							})
						] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
						title: "Composição do custo",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								label: "Custo das peças",
								value: calc.custoPecas,
								total: calc.receita,
								color: "#f59e0b"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								label: "Despesas de viagem",
								value: calc.despViagem,
								total: calc.receita,
								color: "#f97316"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								label: "Despesas financeiras",
								value: calc.despFinanceiro,
								total: calc.receita,
								color: "#ef4444"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								label: "Despesas manuais",
								value: calc.despLancadas,
								total: calc.receita,
								color: "#dc2626"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoCard, {
						title: "Indicadores",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between py-1.5 border-b",
								style: { borderColor: V2.GRAPHITE },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: V2.MUTED },
									children: "Ticket médio"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: V2.TEXT },
									children: brl(calc.pedidos ? calc.receita / calc.pedidos : 0)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between py-1.5 border-b",
								style: { borderColor: V2.GRAPHITE },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: V2.MUTED },
									children: "Margem bruta"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { color: V2.TEXT },
									children: [calc.margemBruta.toFixed(2), "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between py-1.5 border-b",
								style: { borderColor: V2.GRAPHITE },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: V2.MUTED },
									children: "Margem líquida"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { color: calc.margemLiquida >= 0 ? "#16a34a" : "#dc2626" },
									children: [calc.margemLiquida.toFixed(2), "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between py-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: V2.MUTED },
									children: "Custo total / venda"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { color: V2.TEXT },
									children: [calc.pct(calc.custoTotal).toFixed(2), "%"]
								})]
							})
						]
					})]
				})
			] })
		]
	});
}
function KpiCard({ label, value, sub, icon: Icon, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-4",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs",
					style: { color: V2.MUTED },
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 w-8 rounded-lg flex items-center justify-center",
					style: {
						background: `${accent}22`,
						color: accent
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-bold",
				style: { color: V2.TEXT },
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs mt-1",
				style: { color: V2.MUTED },
				children: sub
			})
		]
	});
}
function RowLine({ label, valor, pct, bold, muted, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
		className: "border-b",
		style: { borderColor: V2.GRAPHITE },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2",
				style: {
					color: muted ? V2.MUTED : V2.TEXT,
					fontWeight: bold ? 600 : 400,
					paddingLeft: muted ? 24 : 16
				},
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
				className: "px-4 py-2 text-right",
				style: {
					color: accent || (muted ? V2.MUTED : V2.TEXT),
					fontWeight: bold ? 600 : 400
				},
				children: brl(valor)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
				className: "px-4 py-2 text-right",
				style: {
					color: accent || (muted ? V2.MUTED : V2.TEXT),
					fontWeight: bold ? 600 : 400
				},
				children: [pct.toFixed(1), "%"]
			})
		]
	});
}
function InfoCard({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-4",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold mb-3",
			style: { color: V2.TEXT },
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children
		})]
	});
}
function Bar({ label, value, total, color }) {
	const pct = total > 0 ? Math.min(100, value / total * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-xs mb-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: { color: V2.MUTED },
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			style: { color: V2.TEXT },
			children: [
				brl(value),
				" · ",
				pct.toFixed(1),
				"%"
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-2 rounded-full overflow-hidden",
		style: { background: `${color}22` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full",
			style: {
				width: `${pct}%`,
				background: color
			}
		})
	})] });
}
//#endregion
export { ResultadoPage as component };
