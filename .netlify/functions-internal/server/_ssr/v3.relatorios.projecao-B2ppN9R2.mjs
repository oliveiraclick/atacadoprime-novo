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
import { W as Printer, _t as Info, h as TrendingUp, mn as ArrowLeft, rn as Calculator, y as Target } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.projecao-B2ppN9R2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PERIODS = [
	{
		v: "30",
		label: "Últimos 30 dias"
	},
	{
		v: "60",
		label: "Últimos 60 dias"
	},
	{
		v: "90",
		label: "Últimos 90 dias"
	},
	{
		v: "180",
		label: "Últimos 6 meses"
	},
	{
		v: "365",
		label: "Últimos 12 meses"
	},
	{
		v: "0",
		label: "Todo o período"
	}
];
var QUICK_TARGETS = [
	3e3,
	5e3,
	1e4,
	15e3,
	2e4,
	3e4
];
function ProjectionReport() {
	var _PERIODS$find;
	const [period, setPeriod] = (0, import_react.useState)("90");
	const [target, setTarget] = (0, import_react.useState)(1e4);
	const sinceIso = (0, import_react.useMemo)(() => {
		const days = Number(period);
		if (!days) return null;
		const d = /* @__PURE__ */ new Date();
		d.setDate(d.getDate() - days);
		return d.toISOString();
	}, [period]);
	const { data: orders = [], isLoading: loadingOrders } = useQuery({
		queryKey: ["proj-orders", sinceIso],
		queryFn: async () => {
			let q = supabase.from("orders").select("id,total,created_at,status").neq("status", "CANCELADO");
			if (sinceIso) q = q.gte("created_at", sinceIso);
			const { data, error } = await q;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: items = [], isLoading: loadingItems } = useQuery({
		queryKey: ["proj-items", sinceIso],
		queryFn: async () => {
			let q = supabase.from("order_items").select("quantidade,custo_unitario,preco_final,orders!inner(status,created_at)").neq("orders.status", "CANCELADO");
			if (sinceIso) q = q.gte("orders.created_at", sinceIso);
			const { data, error } = await q;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: expenses = [], isLoading: loadingExp } = useQuery({
		queryKey: ["proj-expenses", sinceIso],
		queryFn: async () => {
			let q = supabase.from("trip_expenses").select("valor,data");
			if (sinceIso) q = q.gte("data", sinceIso.slice(0, 10));
			const { data, error } = await q;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const stats = (0, import_react.useMemo)(() => {
		const receita = orders.reduce((s, o) => s + Number(o.total || 0), 0);
		const grossItems = items.reduce((s, i) => s + Number(i.preco_final || 0) * Number(i.quantidade || 0), 0);
		const custo = items.reduce((s, i) => s + Number(i.custo_unitario || 0) * Number(i.quantidade || 0), 0);
		const despesas = expenses.reduce((s, e) => s + Number(e.valor || 0), 0);
		const custoReal = receita * (grossItems > 0 ? custo / grossItems : 0);
		const lucroBruto = receita - custoReal;
		const lucroLiquido = lucroBruto - despesas;
		return {
			receita,
			custo: custoReal,
			despesas,
			lucroBruto,
			lucroLiquido,
			margemBrutaPct: receita > 0 ? lucroBruto / receita : 0,
			margemLiquidaPct: receita > 0 ? lucroLiquido / receita : 0,
			despesasPct: receita > 0 ? despesas / receita : 0,
			pedidos: orders.length,
			ticketMedio: orders.length > 0 ? receita / orders.length : 0
		};
	}, [
		orders,
		items,
		expenses
	]);
	const projection = (0, import_react.useMemo)(() => {
		const t = Number(target) || 0;
		const mLiq = stats.margemLiquidaPct;
		const mBruta = stats.margemBrutaPct;
		const receitaNecA = mLiq > 0 ? t / mLiq : 0;
		const receitaNecB = mBruta > 0 ? (t + stats.despesas) / mBruta : 0;
		return {
			receitaNecA,
			receitaNecB,
			pedidosA: stats.ticketMedio > 0 ? receitaNecA / stats.ticketMedio : 0,
			pedidosB: stats.ticketMedio > 0 ? receitaNecB / stats.ticketMedio : 0,
			gap: t - stats.lucroLiquido
		};
	}, [target, stats]);
	const loading = loadingOrders || loadingItems || loadingExp;
	const hasData = stats.receita > 0 && stats.margemLiquidaPct > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Projeção de ganho",
		eyebrow: "Relatório",
		description: "Calcule quanto precisa vender para atingir um lucro-alvo, com base no seu histórico real.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/v3/relatorios",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Voltar"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				size: "sm",
				onClick: () => window.print(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-1" }), " Imprimir"]
			})]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border p-4 mb-4 grid gap-3 md:grid-cols-2",
			style: {
				borderColor: V2.GRAPHITE,
				background: V2.SURFACE
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				className: "text-xs mb-1 block",
				style: { color: V2.MUTED },
				children: "Período base (histórico)"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: period,
				onValueChange: setPeriod,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PERIODS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
					value: p.v,
					children: p.label
				}, p.v)) })]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
					className: "text-xs mb-1 block",
					style: { color: V2.MUTED },
					children: "Lucro líquido desejado (R$)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					step: 100,
					value: target,
					onChange: (e) => setTarget(Number(e.target.value) || 0),
					placeholder: "10000"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5 mt-2",
					children: QUICK_TARGETS.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTarget(v),
						className: "text-xs px-2.5 py-1 rounded-full border transition",
						style: {
							borderColor: target === v ? V2.TEAL : V2.GRAPHITE,
							background: target === v ? `${V2.TEAL}22` : "transparent",
							color: target === v ? V2.TEAL : V2.MUTED
						},
						children: brl(v)
					}, v))
				})
			] })]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center py-8",
			style: { color: V2.MUTED },
			children: "Carregando histórico…"
		}) : !hasData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border p-6 text-center",
			style: {
				borderColor: V2.GRAPHITE,
				background: V2.SURFACE,
				color: V2.MUTED
			},
			children: "Sem dados suficientes no período selecionado. Escolha um período maior ou registre mais vendas."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 text-xs uppercase tracking-wide",
				style: { color: V2.MUTED },
				children: [
					"Base histórica (",
					(_PERIODS$find = PERIODS.find((p) => p.v === period)) === null || _PERIODS$find === void 0 ? void 0 : _PERIODS$find.label,
					")"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 grid-cols-2 md:grid-cols-4 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Receita",
						value: brl(stats.receita),
						tone: "teal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Custo (CMV)",
						value: brl(stats.custo),
						sub: pct(1 - stats.margemBrutaPct)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Despesas",
						value: brl(stats.despesas),
						sub: pct(stats.despesasPct)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Lucro líquido",
						value: brl(stats.lucroLiquido),
						sub: pct(stats.margemLiquidaPct),
						tone: stats.lucroLiquido >= 0 ? "green" : "red"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 grid-cols-2 md:grid-cols-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Margem bruta",
						value: pct(stats.margemBrutaPct)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Margem líquida",
						value: pct(stats.margemLiquidaPct)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ticket médio",
						value: brl(stats.ticketMedio),
						sub: `${stats.pedidos} pedidos`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border p-5 mb-4",
				style: {
					borderColor: V2.TEAL,
					background: `${V2.TEAL}0d`
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {
							className: "h-5 w-5",
							style: { color: V2.TEAL }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-lg font-semibold",
							style: { color: V2.TEXT },
							children: [
								"Para lucrar ",
								brl(target),
								" líquido"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioCard, {
							id: "A",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
							title: "Cenário A — despesas proporcionais",
							desc: "Assumindo que as despesas crescem junto com as vendas (mesma margem líquida atual).",
							receita: projection.receitaNecA,
							pedidos: projection.pedidosA,
							margem: stats.margemLiquidaPct,
							base: stats.receita,
							target,
							stats
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioCard, {
							id: "B",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-4 w-4" }),
							title: "Cenário B — despesas fixas",
							desc: "Assumindo despesas iguais ao período histórico (não escalam). Realista para viagens curtas.",
							receita: projection.receitaNecB,
							pedidos: projection.pedidosB,
							margem: stats.margemBrutaPct,
							base: stats.receita,
							target,
							stats,
							extra: `Despesas fixas consideradas: ${brl(stats.despesas)}`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl border p-3 text-sm",
						style: {
							borderColor: V2.GRAPHITE,
							background: V2.SURFACE,
							color: V2.MUTED
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: V2.TEXT },
								children: "Comparativo: "
							}),
							"seu lucro atual no período é ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: V2.TEXT },
								children: brl(stats.lucroLiquido)
							}),
							".",
							" ",
							projection.gap > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Faltam ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { color: V2.TEAL },
									children: brl(projection.gap)
								}),
								" de lucro para chegar na meta."
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Você já superou a meta em ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { color: "#16a34a" },
									children: brl(-projection.gap)
								}),
								"."
							] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border p-4 text-xs",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE,
					color: V2.MUTED
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: { color: V2.TEXT },
						children: "Como é calculado: "
					}),
					"usamos suas vendas reais (receita líquida de descontos), o custo das peças vendidas (CMV) e as despesas de viagem lançadas no período. A margem líquida é ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "(receita − custo − despesas) ÷ receita" }),
					". A receita necessária é ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "lucro-alvo ÷ margem" }),
					"."
				]
			})
		] })]
	});
}
function Kpi({ label, value, sub, tone }) {
	const color = tone === "green" ? "#16a34a" : tone === "red" ? "#dc2626" : tone === "teal" ? V2.TEAL : V2.TEXT;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-3",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] uppercase tracking-wide",
				style: { color: V2.MUTED },
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-lg font-bold",
				style: { color },
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px]",
				style: { color: V2.MUTED },
				children: sub
			})
		]
	});
}
function ScenarioCard(props) {
	const { id, icon, title, desc, receita, pedidos, margem, base, extra, target, stats } = props;
	const [open, setOpen] = (0, import_react.useState)(false);
	const mult = base > 0 ? receita / base : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen(true),
		className: "text-left rounded-xl border p-4 w-full transition hover:shadow-lg hover:-translate-y-0.5",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-semibold",
					style: { color: V2.TEXT },
					children: [
						icon,
						" ",
						title
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					className: "h-4 w-4 opacity-60",
					style: { color: V2.TEAL }
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs mb-3",
				style: { color: V2.MUTED },
				children: desc
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-extrabold",
				style: { color: V2.TEAL },
				children: brl(receita)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs mt-1",
				style: { color: V2.MUTED },
				children: ["em vendas · margem base ", pct(margem)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 space-y-1 text-sm",
				style: { color: V2.TEXT },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"≈ ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: Math.ceil(pedidos) }),
						" pedidos (no ticket médio atual)"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						"≈ ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [mult.toFixed(2), "x"] }),
						" o volume atual do período"
					] }),
					extra && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs",
						style: { color: V2.MUTED },
						children: extra
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 text-[11px] uppercase tracking-wide",
				style: { color: V2.TEAL },
				children: "Toque para ver o cálculo detalhado →"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScenarioDialog, {
		open,
		onClose: () => setOpen(false),
		id,
		title,
		target,
		stats,
		receita,
		pedidos
	})] });
}
function ScenarioDialog({ open, onClose, id, title, target, stats, receita, pedidos }) {
	const custo = receita * (1 - stats.margemBrutaPct);
	const despesasProj = id === "A" ? receita * (stats.despesas / (stats.receita || 1)) : stats.despesas;
	const lucroConf = receita - custo - despesasProj;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl max-h-[85vh] overflow-y-auto",
			style: {
				background: V2.SURFACE,
				color: V2.TEXT,
				borderColor: V2.GRAPHITE
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				style: { color: V2.TEXT },
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
				style: { color: V2.MUTED },
				children: [
					"Como esse cenário chegou em ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: { color: V2.TEAL },
						children: brl(receita)
					}),
					" para você lucrar ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						style: { color: V2.TEAL },
						children: brl(target)
					}),
					" líquido."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "🎯 Quando usar este cenário",
						children: id === "A" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Use quando estiver ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "planejando um período longo" }),
							" (mês, trimestre, ano) e as despesas de viagem, combustível, hospedagem tendem a ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "crescer proporcionalmente" }),
							" ao volume de vendas. É a visão mais ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "conservadora" }),
							"."
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Use quando quiser saber ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "quanto ainda precisa vender NESTA viagem" }),
							" que já está aberta. As despesas (combustível, hotel, refeições) já foram planejadas e ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "não sobem" }),
							" se você vender mais. Toda receita extra vira lucro sobre a margem bruta."
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "📊 Premissas usadas do seu histórico",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• Receita real (líquida de descontos): ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(stats.receita) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• Custo das peças vendidas (CMV): ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(stats.custo) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• Despesas de viagem lançadas: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(stats.despesas) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• Margem bruta = (receita − custo) ÷ receita = ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pct(stats.margemBrutaPct) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• Margem líquida = (receita − custo − despesas) ÷ receita = ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pct(stats.margemLiquidaPct) })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["• Ticket médio: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(stats.ticketMedio) })] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "🧮 Fórmula pensada",
						children: id === "A" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "Receita necessária = Lucro-alvo ÷ Margem líquida" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							style: { color: V2.MUTED },
							children: "Como estamos assumindo que a margem líquida se mantém (despesas crescem junto), basta dividir o lucro desejado pela % que sobra hoje em cada real vendido."
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { children: "Receita necessária = (Lucro-alvo + Despesas fixas) ÷ Margem bruta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2",
							style: { color: V2.MUTED },
							children: [
								"As despesas já são conhecidas e não escalam. Então: você precisa gerar lucro bruto suficiente para pagar as despesas fixas ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "e ainda sobrar" }),
								" o lucro-alvo. Por isso somamos as despesas no numerador."
							]
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "🔢 Aplicando aos seus números",
						children: id === "A" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Calc, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								brl(target),
								" ÷ ",
								pct(stats.margemLiquidaPct)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"= ",
								brl(target),
								" ÷ ",
								stats.margemLiquidaPct.toFixed(4)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { color: V2.TEAL },
								children: [
									"= ",
									brl(receita),
									" de vendas"
								]
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Calc, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"(",
								brl(target),
								" + ",
								brl(stats.despesas),
								") ÷ ",
								pct(stats.margemBrutaPct)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								"= ",
								brl(target + stats.despesas),
								" ÷ ",
								stats.margemBrutaPct.toFixed(4)
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { color: V2.TEAL },
								children: [
									"= ",
									brl(receita),
									" de vendas"
								]
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "✅ Conferência (DRE projetada)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border p-3 space-y-1",
							style: {
								borderColor: V2.GRAPHITE,
								background: V2.BG
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "Receita projetada",
									value: brl(receita)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: `(−) Custo das peças (${pct(1 - stats.margemBrutaPct)})`,
									value: `− ${brl(custo)}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: "(=) Lucro bruto",
									value: brl(receita - custo),
									strong: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
									label: id === "A" ? "(−) Despesas proporcionais" : "(−) Despesas fixas",
									value: `− ${brl(despesasProj)}`
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "pt-1 mt-1 border-t",
									style: { borderColor: V2.GRAPHITE },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										label: "(=) Lucro líquido",
										value: brl(lucroConf),
										strong: true,
										tone: "teal"
									})
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
						title: "🛒 O que isso significa na prática",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• Você precisa fechar ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
										"≈ ",
										Math.ceil(pedidos),
										" pedidos"
									] }),
									" no ticket médio atual de ",
									brl(stats.ticketMedio),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• Isso equivale a ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [(stats.receita > 0 ? receita / stats.receita : 0).toFixed(2), "x"] }),
									" o volume que você fez no período base."
								] }),
								id === "B" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• Todo real vendido acima disso, nesta viagem, vira ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pct(stats.margemBrutaPct) }),
									" direto no bolso."
								] })
							]
						})
					})
				]
			})]
		})
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs uppercase tracking-wide mb-1.5",
		style: { color: V2.TEAL },
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { color: V2.TEXT },
		children
	})] });
}
function Formula({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border p-3 font-mono text-sm text-center",
		style: {
			borderColor: V2.TEAL,
			background: `${V2.TEAL}14`,
			color: V2.TEAL
		},
		children
	});
}
function Calc({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg border p-3 font-mono text-sm space-y-1",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.BG,
			color: V2.TEXT
		},
		children
	});
}
function Row({ label, value, strong, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: { color: V2.MUTED },
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				color: tone === "teal" ? V2.TEAL : V2.TEXT,
				fontWeight: strong ? 700 : 500
			},
			children: value
		})]
	});
}
function pct(v) {
	return `${(v * 100).toFixed(1)}%`;
}
//#endregion
export { ProjectionReport as component };
