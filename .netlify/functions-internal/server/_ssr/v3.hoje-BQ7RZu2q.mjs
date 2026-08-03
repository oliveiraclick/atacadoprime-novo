import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { E as ShoppingCart, It as DollarSign, T as Smartphone, Ut as ClipboardList, V as Receipt, Z as Package, an as Briefcase, en as ChartColumn, g as TrendingDown, h as TrendingUp, m as TriangleAlert, p as Truck, pn as ArrowRight, s as Wallet, t as Zap, v as Timer } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { t as Money } from "./money-C7DgSO-S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.hoje-BQ7RZu2q.js
var import_jsx_runtime = require_jsx_runtime();
var DANGER = "#dc2626";
var SUCCESS = "#10b981";
var WARNING = "#f59e0b";
var QUICK_ACTIONS = [
	{
		to: "/v3/pdv",
		label: "Venda rápida",
		desc: "Atendimento no balcão",
		icon: Zap
	},
	{
		to: "/v3/vendas/nova",
		label: "Venda em visita",
		desc: "Cliente na rota",
		icon: Briefcase
	},
	{
		to: "/v3/pedidos",
		label: "Pedidos",
		desc: "Lista de vendas",
		icon: ClipboardList
	},
	{
		to: "/v3/viagens",
		label: "Viagens",
		desc: "Rotas em aberto",
		icon: Truck
	},
	{
		to: "/v3/despesas",
		label: "Despesas",
		desc: "Gastos por viagem",
		icon: Receipt
	},
	{
		to: "/v3/prospeccao",
		label: "Prospecção",
		desc: "Novos leads",
		icon: ShoppingCart
	}
];
function V3HojePage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["v3-hoje"],
		queryFn: fetchHojeData,
		staleTime: 1e3 * 60
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Hoje",
		eyebrow: "Painel comercial",
		description: isLoading ? "Carregando dados do dia..." : "Resumo do dia, comparativos e o que precisa de atenção",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/v3/viagens",
				className: "h-11 px-4 rounded-full font-semibold text-sm flex items-center gap-2 transition active:scale-95 border",
				style: {
					borderColor: V2.GRAPHITE,
					color: V2.TEXT,
					background: V2.SURFACE
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4" }), " Lançar despesa"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/v3/pdv",
				className: "h-11 px-5 rounded-full font-semibold text-sm flex items-center gap-2 transition active:scale-95",
				style: {
					background: V2.TEAL,
					color: "#fff",
					boxShadow: `0 10px 30px -8px ${V2.TEAL}66`
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }), " Nova venda"]
			})]
		}),
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateCard, {
			title: "Não foi possível carregar o painel",
			description: error instanceof Error ? error.message : "Falha ao consultar o banco."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroBanner, {
					data,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiGrid, {
					data,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickActions, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedsAttention, {
					data,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainGrid, {
					data,
					loading: isLoading
				})
			]
		})
	});
}
function HeroBanner({ data, loading }) {
	var _data$ordersToday;
	const today = (/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
	const capitalized = today.charAt(0).toUpperCase() + today.slice(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden rounded-3xl border p-6 lg:p-8",
		style: {
			background: `radial-gradient(120% 100% at 100% 0%, ${V2.TEAL}22 0%, transparent 55%), linear-gradient(135deg, ${V2.SURFACE} 0%, ${V2.DARK} 100%)`,
			borderColor: V2.GRAPHITE
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl",
			style: { background: `${V2.TEAL}33` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex flex-wrap items-center justify-between gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.3em] font-semibold",
						style: { color: V2.TEAL },
						children: capitalized
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 text-2xl lg:text-3xl font-semibold",
						style: { color: V2.TEXT },
						children: ["Sua operação comercial em ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: V2.TEAL },
							children: "tempo real"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm",
						style: { color: V2.MUTED },
						children: [
							"Hoje: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: V2.TEXT },
								children: loading ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value: data === null || data === void 0 ? void 0 : data.revenueToday })
							}),
							" em ",
							loading ? "—" : (_data$ordersToday = data === null || data === void 0 ? void 0 : data.ordersToday) !== null && _data$ordersToday !== void 0 ? _data$ordersToday : 0,
							" pedidos · Mês: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: V2.TEXT },
								children: loading ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value: data === null || data === void 0 ? void 0 : data.revenueMonth })
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/v3/pedidos",
					className: "px-4 py-2.5 rounded-full text-sm font-semibold border transition hover:-translate-y-0.5",
					style: {
						borderColor: V2.GRAPHITE,
						color: V2.TEXT,
						background: V2.SURFACE
					},
					children: "Ver pedidos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/v3/prospeccao",
					className: "px-4 py-2.5 rounded-full text-sm font-semibold transition hover:-translate-y-0.5",
					style: {
						background: V2.TEAL,
						color: "#fff",
						boxShadow: `0 10px 24px -8px ${V2.TEAL}80`
					},
					children: "Prospectar"
				})]
			})]
		})]
	});
}
function KpiGrid({ data, loading }) {
	var _data$revenueToday, _data$revenueYesterda, _data$revenueMonth, _data$revenuePrevious, _data$ordersToday2, _data$ordersYesterday, _data$ordersMonth;
	const dayVsYesterday = compareToPrevious((_data$revenueToday = data === null || data === void 0 ? void 0 : data.revenueToday) !== null && _data$revenueToday !== void 0 ? _data$revenueToday : 0, (_data$revenueYesterda = data === null || data === void 0 ? void 0 : data.revenueYesterday) !== null && _data$revenueYesterda !== void 0 ? _data$revenueYesterda : 0, "revenue");
	const monthVsPrevious = compareToPrevious((_data$revenueMonth = data === null || data === void 0 ? void 0 : data.revenueMonth) !== null && _data$revenueMonth !== void 0 ? _data$revenueMonth : 0, (_data$revenuePrevious = data === null || data === void 0 ? void 0 : data.revenuePreviousMonth) !== null && _data$revenuePrevious !== void 0 ? _data$revenuePrevious : 0, "revenue");
	const ordersDayVsYesterday = compareToPrevious((_data$ordersToday2 = data === null || data === void 0 ? void 0 : data.ordersToday) !== null && _data$ordersToday2 !== void 0 ? _data$ordersToday2 : 0, (_data$ordersYesterday = data === null || data === void 0 ? void 0 : data.ordersYesterday) !== null && _data$ordersYesterday !== void 0 ? _data$ordersYesterday : 0, "orders");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonCard, {
				label: "Vendas hoje",
				value: data === null || data === void 0 ? void 0 : data.revenueToday,
				previousValue: data === null || data === void 0 ? void 0 : data.revenueYesterday,
				previousLabel: "Ontem",
				loading,
				tone: dayVsYesterday.tone,
				icon: DollarSign,
				helper: dayVsYesterday.helper
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonCard, {
				label: "Pedidos hoje",
				value: data === null || data === void 0 ? void 0 : data.ordersToday,
				previousValue: data === null || data === void 0 ? void 0 : data.ordersYesterday,
				previousLabel: "Ontem",
				loading,
				tone: ordersDayVsYesterday.tone,
				icon: ShoppingCart,
				helper: ordersDayVsYesterday.helper,
				isNumber: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComparisonCard, {
				label: "Vendas mês atual",
				value: data === null || data === void 0 ? void 0 : data.revenueMonth,
				previousValue: data === null || data === void 0 ? void 0 : data.revenuePreviousMonth,
				previousLabel: "Mês anterior",
				loading,
				tone: monthVsPrevious.tone,
				icon: Wallet,
				helper: monthVsPrevious.helper
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl p-5 border relative overflow-hidden transition hover:-translate-y-0.5",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute top-0 left-0 h-1 w-full",
						style: { background: V2.TEAL }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-10 w-10 rounded-xl grid place-items-center",
							style: {
								background: V2.TEAL_LIGHT,
								color: V2.TEAL
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full",
							style: {
								background: V2.TEAL_LIGHT,
								color: V2.TEAL
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), loading ? "—" : `${(_data$ordersMonth = data === null || data === void 0 ? void 0 : data.ordersMonth) !== null && _data$ordersMonth !== void 0 ? _data$ordersMonth : 0} pedidos`]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-[10px] uppercase tracking-[0.2em] font-semibold",
						style: { color: V2.LIGHT_MUTED },
						children: "Ticket médio do mês"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-semibold text-2xl lg:text-3xl",
						style: { color: V2.LIGHT_TEXT },
						children: loading ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value: data === null || data === void 0 ? void 0 : data.avgTicketMonth })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 pt-3 border-t text-[11px] font-medium",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_MUTED
						},
						children: ["Hoje: ", loading ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
							value: data === null || data === void 0 ? void 0 : data.avgTicketToday,
							className: "inline"
						})]
					})
				]
			})
		]
	});
}
function compareToPrevious(current, previous, kind) {
	if (previous === 0) return {
		tone: "neutral",
		helper: "Sem base de comparação"
	};
	const diff = current - previous;
	const percent = Math.round(diff / previous * 100);
	return {
		tone: diff >= 0 ? "positive" : "negative",
		helper: `${diff >= 0 ? "+" : ""}${kind === "revenue" ? brl(diff) : diff} (${percent >= 0 ? "+" : ""}${percent}%) vs anterior`
	};
}
function ComparisonCard({ label, value, previousValue, previousLabel, loading, tone, icon: Icon, helper, isNumber = false }) {
	const toneColor = tone === "positive" ? V2.TEAL : tone === "negative" ? DANGER : V2.LIGHT_MUTED;
	const Trend = tone === "positive" ? TrendingUp : tone === "negative" ? TrendingDown : Timer;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-5 border relative overflow-hidden transition hover:-translate-y-0.5",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute top-0 left-0 h-1 w-full",
				style: { background: toneColor }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-10 w-10 rounded-xl grid place-items-center",
					style: {
						background: V2.TEAL_LIGHT,
						color: V2.TEAL
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full",
					style: {
						background: tone === "positive" ? "#10b98122" : tone === "negative" ? "#dc262622" : V2.TEAL_LIGHT,
						color: toneColor
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trend, { className: "h-3 w-3" }),
						" ",
						loading ? "—" : helper
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 text-[10px] uppercase tracking-[0.2em] font-semibold",
				style: { color: V2.LIGHT_MUTED },
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-semibold text-2xl lg:text-3xl",
				style: { color: V2.LIGHT_TEXT },
				children: loading ? "—" : isNumber ? String(value !== null && value !== void 0 ? value : 0) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 pt-3 border-t text-[11px] font-medium",
				style: {
					borderColor: V2.LIGHT_BORDER,
					color: V2.LIGHT_MUTED
				},
				children: [
					previousLabel,
					": ",
					loading ? "—" : isNumber ? String(previousValue !== null && previousValue !== void 0 ? previousValue : 0) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
						value: previousValue,
						className: "inline"
					})
				]
			})
		]
	});
}
function QuickActions() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border p-5 lg:p-6",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-end justify-between mb-4 flex-wrap gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
					style: { color: V2.TEAL },
					children: "Acesso rápido"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-semibold text-lg",
					style: { color: V2.LIGHT_TEXT },
					children: "Ações comerciais"
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/pos",
				className: "group flex items-center gap-4 sm:gap-5 rounded-2xl border p-4 sm:p-5 mb-4 transition hover:-translate-y-0.5 active:scale-[0.98]",
				style: {
					background: V2.TEAL,
					borderColor: V2.TEAL,
					color: "#fff"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-14 w-14 rounded-xl grid place-items-center shrink-0 transition group-hover:scale-110",
						style: { background: "rgba(255,255,255,0.18)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-7 w-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-lg leading-tight",
							children: "PDV Móvel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm mt-0.5 leading-snug",
							style: { color: "rgba(255,255,255,0.85)" },
							children: "Venda rápida no tablet, imprima etiquetas e feche o caixa."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5 shrink-0 opacity-80 group-hover:translate-x-1 transition" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4",
				children: QUICK_ACTIONS.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: action.to,
					className: "group flex flex-col items-start gap-3 rounded-2xl border p-4 min-h-[128px] transition hover:-translate-y-0.5 active:scale-[0.98]",
					style: {
						background: V2.LIGHT_SURFACE_2,
						borderColor: V2.LIGHT_BORDER
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-12 w-12 rounded-xl grid place-items-center transition group-hover:scale-110 shrink-0",
						style: {
							background: V2.TEAL_LIGHT,
							color: V2.TEAL
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(action.icon, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-[15px] leading-tight break-words",
							style: { color: V2.LIGHT_TEXT },
							children: action.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs mt-1 leading-snug break-words",
							style: { color: V2.LIGHT_MUTED },
							children: action.desc
						})]
					})]
				}, action.label))
			})
		]
	});
}
function NeedsAttention({ data, loading }) {
	var _data$pendingOrders, _data$pendingOrdersVa, _data$openTrips, _data$lowStock;
	const pendingOrders = (_data$pendingOrders = data === null || data === void 0 ? void 0 : data.pendingOrders) !== null && _data$pendingOrders !== void 0 ? _data$pendingOrders : 0;
	const pendingValue = (_data$pendingOrdersVa = data === null || data === void 0 ? void 0 : data.pendingOrdersValue) !== null && _data$pendingOrdersVa !== void 0 ? _data$pendingOrdersVa : 0;
	const openTrips = (_data$openTrips = data === null || data === void 0 ? void 0 : data.openTrips) !== null && _data$openTrips !== void 0 ? _data$openTrips : [];
	const lowStock = (_data$lowStock = data === null || data === void 0 ? void 0 : data.lowStock) !== null && _data$lowStock !== void 0 ? _data$lowStock : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border p-5 lg:p-6",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
				style: { color: V2.TEAL },
				children: "Precisa de você agora"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-semibold text-lg",
				style: { color: V2.LIGHT_TEXT },
				children: "Ações pendentes"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs font-medium px-2.5 py-1 rounded-full",
				style: {
					background: V2.TEAL_LIGHT,
					color: V2.TEAL
				},
				children: [loading ? "—" : pendingOrders + openTrips.length + lowStock.length, " itens"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					to: "/v3/pedidos",
					icon: ClipboardList,
					title: `${loading ? "—" : pendingOrders} pedidos aguardando pagamento`,
					subtitle: loading ? "Carregando..." : `Valor total: ${brl(pendingValue)}`,
					tone: pendingOrders > 0 ? "warning" : "neutral"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					to: "/v3/viagens",
					icon: Truck,
					title: `${loading ? "—" : openTrips.length} viagem${openTrips.length === 1 ? "" : "ns"} em aberto`,
					subtitle: loading ? "Carregando..." : openTrips.length > 0 ? `Última: ${openTrips[0].nome}${openTrips[0].cidade ? ` — ${openTrips[0].cidade}` : ""}` : "Nenhuma viagem ativa",
					tone: openTrips.length > 0 ? "positive" : "neutral"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
					to: "/v3/estoque/alertas",
					icon: Package,
					title: `${loading ? "—" : lowStock.length} produto${lowStock.length === 1 ? "" : "s"} com estoque baixo`,
					subtitle: loading ? "Carregando..." : lowStock.length > 0 ? `Primeiro: ${lowStock[0].nome}` : "Estoque saudável",
					tone: lowStock.length > 0 ? "danger" : "neutral"
				})
			]
		})]
	});
}
function ActionCard({ to, icon: Icon, title, subtitle, tone }) {
	const color = tone === "positive" ? SUCCESS : tone === "warning" ? WARNING : tone === "danger" ? DANGER : V2.LIGHT_MUTED;
	const bg = tone === "positive" ? "#10b98111" : tone === "warning" ? "#f59e0b11" : tone === "danger" ? "#dc262611" : V2.LIGHT_SURFACE_2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group flex items-start gap-3 rounded-xl border p-4 transition hover:-translate-y-0.5",
		style: {
			background: V2.LIGHT_SURFACE_2,
			borderColor: V2.LIGHT_BORDER
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 w-10 rounded-xl grid place-items-center shrink-0",
				style: {
					background: bg,
					color
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-semibold text-sm",
					style: { color: V2.LIGHT_TEXT },
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] mt-0.5",
					style: { color: V2.LIGHT_MUTED },
					children: subtitle
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
				className: "h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition",
				style: { color: V2.TEAL }
			})
		]
	});
}
function MainGrid({ data, loading }) {
	var _data$recentOrders, _data$recentOrders$le;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "grid grid-cols-1 gap-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl p-5 border",
			style: {
				background: V2.LIGHT_SURFACE,
				borderColor: V2.LIGHT_BORDER
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
					style: { color: V2.TEAL },
					children: "Últimas vendas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-semibold text-lg",
					style: { color: V2.LIGHT_TEXT },
					children: "Pedidos recentes"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/v3/pedidos",
					className: "text-xs font-semibold flex items-center gap-1",
					style: { color: V2.TEAL },
					children: ["Ver tudo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-4",
				children: [((_data$recentOrders = data === null || data === void 0 ? void 0 : data.recentOrders) !== null && _data$recentOrders !== void 0 ? _data$recentOrders : []).map((row) => {
					var _row$companies$trade_, _row$companies, _row$companies2, _ref, _row$companies$trade_2, _row$companies3, _row$companies4;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1.5 h-2 w-2 rounded-full shrink-0",
								style: { background: V2.TEAL }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm font-semibold leading-tight truncate",
									style: { color: V2.LIGHT_TEXT },
									children: ["Pedido ", orderCodeHash(row.id, (_row$companies$trade_ = (_row$companies = row.companies) === null || _row$companies === void 0 ? void 0 : _row$companies.trade_name) !== null && _row$companies$trade_ !== void 0 ? _row$companies$trade_ : (_row$companies2 = row.companies) === null || _row$companies2 === void 0 ? void 0 : _row$companies2.legal_name)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs truncate",
									style: { color: V2.LIGHT_MUTED },
									children: [
										(_ref = (_row$companies$trade_2 = (_row$companies3 = row.companies) === null || _row$companies3 === void 0 ? void 0 : _row$companies3.trade_name) !== null && _row$companies$trade_2 !== void 0 ? _row$companies$trade_2 : (_row$companies4 = row.companies) === null || _row$companies4 === void 0 ? void 0 : _row$companies4.legal_name) !== null && _ref !== void 0 ? _ref : "Cliente",
										" · ",
										row.status
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold self-start",
								style: { color: V2.LIGHT_TEXT },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value: Number(row.total) })
							})
						]
					}, row.id);
				}), !loading && ((_data$recentOrders$le = data === null || data === void 0 ? void 0 : data.recentOrders.length) !== null && _data$recentOrders$le !== void 0 ? _data$recentOrders$le : 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-center py-6",
					style: { color: V2.LIGHT_MUTED },
					children: "Nenhum pedido recente."
				})]
			})]
		})
	});
}
function StateCard({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-8 border text-center",
		style: {
			background: V2.SURFACE,
			borderColor: V2.GRAPHITE
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
				className: "h-8 w-8 mx-auto mb-3",
				style: { color: V2.TEAL }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-semibold text-lg",
				style: { color: V2.TEXT },
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm mt-1",
				style: { color: V2.MUTED },
				children: description
			})
		]
	});
}
async function fetchHojeData() {
	var _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _todayRows$error, _monthRows$data, _todayRows$data, _yesterdayRows$data, _previousMonthRows$da, _pendingOrdersRes$dat, _openTrips$data, _lowStock$data, _recentOrders$data;
	const now = /* @__PURE__ */ new Date();
	const today = new Date(now);
	today.setHours(0, 0, 0, 0);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	const endOfPreviousMonth = new Date(startOfMonth);
	const thirtyDays = Array.from({ length: 30 }, (_, index) => {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() - (29 - index));
		date.setHours(0, 0, 0, 0);
		return date;
	});
	const [todayRows, yesterdayRows, monthRows, previousMonthRows, pendingOrdersRes, recentOrders, openTrips, lowStock] = await Promise.all([
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", today.toISOString()),
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", yesterday.toISOString()).lt("created_at", today.toISOString()),
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", startOfMonth.toISOString()),
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", startOfPreviousMonth.toISOString()).lt("created_at", endOfPreviousMonth.toISOString()),
		supabase.from("orders").select("total,status").in("status", ["PENDENTE", "AGUARDANDO_PAGAMENTO"]),
		supabase.from("orders").select("id,status,total,created_at,companies(legal_name,trade_name)").order("created_at", { ascending: false }).limit(5),
		supabase.from("trips").select("id,nome,cidade,estado,status,opened_at").eq("status", "open").order("opened_at", { ascending: false }).limit(5),
		supabase.from("products").select("id,nome,sku,estoque,estoque_minimo").lte("estoque", 5).order("estoque", { ascending: true }).limit(5)
	]);
	const firstError = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_todayRows$error = todayRows.error) !== null && _todayRows$error !== void 0 ? _todayRows$error : yesterdayRows.error) !== null && _ref7 !== void 0 ? _ref7 : monthRows.error) !== null && _ref6 !== void 0 ? _ref6 : previousMonthRows.error) !== null && _ref5 !== void 0 ? _ref5 : pendingOrdersRes.error) !== null && _ref4 !== void 0 ? _ref4 : recentOrders.error) !== null && _ref3 !== void 0 ? _ref3 : openTrips.error) !== null && _ref2 !== void 0 ? _ref2 : lowStock.error;
	if (firstError) throw firstError;
	const monthData = (_monthRows$data = monthRows.data) !== null && _monthRows$data !== void 0 ? _monthRows$data : [];
	const todayData = (_todayRows$data = todayRows.data) !== null && _todayRows$data !== void 0 ? _todayRows$data : [];
	const yesterdayData = (_yesterdayRows$data = yesterdayRows.data) !== null && _yesterdayRows$data !== void 0 ? _yesterdayRows$data : [];
	const previousMonthData = (_previousMonthRows$da = previousMonthRows.data) !== null && _previousMonthRows$da !== void 0 ? _previousMonthRows$da : [];
	const revenueToday = todayData.reduce((sum, row) => {
		var _row$total;
		return sum + Number((_row$total = row.total) !== null && _row$total !== void 0 ? _row$total : 0);
	}, 0);
	const revenueYesterday = yesterdayData.reduce((sum, row) => {
		var _row$total2;
		return sum + Number((_row$total2 = row.total) !== null && _row$total2 !== void 0 ? _row$total2 : 0);
	}, 0);
	const revenueMonth = monthData.reduce((sum, row) => {
		var _row$total3;
		return sum + Number((_row$total3 = row.total) !== null && _row$total3 !== void 0 ? _row$total3 : 0);
	}, 0);
	const revenuePreviousMonth = previousMonthData.reduce((sum, row) => {
		var _row$total4;
		return sum + Number((_row$total4 = row.total) !== null && _row$total4 !== void 0 ? _row$total4 : 0);
	}, 0);
	const ordersMonth = monthData.length;
	const ordersPreviousMonth = previousMonthData.length;
	const avgTicketMonth = ordersMonth ? revenueMonth / ordersMonth : 0;
	const avgTicketToday = todayData.length ? revenueToday / todayData.length : 0;
	const pendingOrders = (_pendingOrdersRes$dat = pendingOrdersRes.data) !== null && _pendingOrdersRes$dat !== void 0 ? _pendingOrdersRes$dat : [];
	const pendingOrdersValue = pendingOrders.reduce((sum, row) => {
		var _row$total5;
		return sum + Number((_row$total5 = row.total) !== null && _row$total5 !== void 0 ? _row$total5 : 0);
	}, 0);
	const salesBars = thirtyDays.map((date) => {
		const next = new Date(date);
		next.setDate(next.getDate() + 1);
		const value = monthData.filter((row) => row.created_at >= date.toISOString() && row.created_at < next.toISOString()).reduce((sum, row) => {
			var _row$total6;
			return sum + Number((_row$total6 = row.total) !== null && _row$total6 !== void 0 ? _row$total6 : 0);
		}, 0);
		return {
			label: date.toLocaleDateString("pt-BR", {
				day: "2-digit",
				month: "2-digit"
			}),
			value
		};
	});
	return {
		revenueToday,
		revenueYesterday,
		ordersToday: todayData.length,
		ordersYesterday: yesterdayData.length,
		revenueMonth,
		revenuePreviousMonth,
		ordersMonth,
		ordersPreviousMonth,
		avgTicketMonth,
		avgTicketToday,
		pendingOrders: pendingOrders.length,
		pendingOrdersValue,
		openTrips: (_openTrips$data = openTrips.data) !== null && _openTrips$data !== void 0 ? _openTrips$data : [],
		lowStock: (_lowStock$data = lowStock.data) !== null && _lowStock$data !== void 0 ? _lowStock$data : [],
		recentOrders: (_recentOrders$data = recentOrders.data) !== null && _recentOrders$data !== void 0 ? _recentOrders$data : [],
		salesBars
	};
}
//#endregion
export { V3HojePage as component };
