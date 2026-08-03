import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { E as ShoppingCart, It as DollarSign, N as Search, Ot as Flag, Pt as Ellipsis, Q as PackageSearch, Tt as Gauge, Ut as ClipboardList, Xt as ChevronRight, an as Briefcase, at as Megaphone, en as ChartColumn, et as Navigation, g as TrendingDown, h as TrendingUp, in as Building2, k as ShieldCheck, kt as FileText, mt as LayoutGrid, nt as MessageSquare, ot as Map, p as Truck, s as Wallet, t as Zap, v as Timer, wt as Globe } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { n as MoneyMasterToggle, t as Money } from "./money-C7DgSO-S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.dashboard-qjTU_kOS.js
var import_jsx_runtime = require_jsx_runtime();
var DANGER = "#dc2626";
var QUICK_ACTIONS = [
	{
		to: "/v3/viagens",
		label: "Viagens",
		desc: "Estoque da rota",
		icon: Truck
	},
	{
		to: "/v3/despesas",
		label: "Despesas viagem",
		desc: "Gastos de rota",
		icon: FileText
	},
	{
		to: "/v3/despesa-empresa",
		label: "Despesa empresa",
		desc: "Fora de viagem",
		icon: Building2
	},
	{
		to: "/v3/vendas/nova",
		label: "Venda em visita",
		desc: "Atender cliente",
		icon: Briefcase
	},
	{
		to: "/v3/pedidos",
		label: "Pedidos",
		desc: "Vendas & entregas",
		icon: ClipboardList
	},
	{
		to: "/v3/catalogo-admin",
		label: "Catálogo",
		desc: "Produtos & preços",
		icon: LayoutGrid
	},
	{
		to: "/v3/compras",
		label: "Compra material",
		desc: "Entrada de nota",
		icon: Truck
	},
	{
		to: "/v3/demandas",
		label: "Demanda de produtos",
		desc: "Lista a comprar",
		icon: PackageSearch
	},
	{
		to: "/v3/prospeccao",
		label: "Prospecção",
		desc: "Novos leads",
		icon: Search
	},
	{
		to: "/v3/campanhas",
		label: "Campanhas",
		desc: "Marketing",
		icon: Megaphone
	},
	{
		to: "/v3/whatsapp/campanhas",
		label: "WhatsApp",
		desc: "Disparos",
		icon: MessageSquare
	},
	{
		to: "/v3/campo",
		label: "Campo",
		desc: "Equipe externa",
		icon: Navigation
	},
	{
		to: "/v3/rotas",
		label: "Rotas & mapa",
		desc: "Planejamento",
		icon: Map
	},
	{
		to: "/v3/financeiro",
		label: "Financeiro",
		desc: "Caixa & contas",
		icon: Wallet
	},
	{
		to: "/v3/aprovacoes",
		label: "Aprovações",
		desc: "Pendências",
		icon: ShieldCheck
	},
	{
		to: "/v3",
		label: "Ver o site",
		desc: "Visão do cliente",
		icon: Globe
	},
	{
		to: "/v3/relatorios",
		label: "Relatórios",
		desc: "Central de relatórios",
		icon: ChartColumn
	}
];
function V3Dashboard() {
	var _data$recentOrders;
	const { data, isLoading, error } = useQuery({
		queryKey: ["v3-dashboard-real"],
		queryFn: fetchDashboardData
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Cockpit",
		eyebrow: "Painel de comando",
		description: isLoading ? "Carregando dados reais do banco..." : "Dark mode oficial · métricas ao vivo",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyMasterToggle, { style: {
					borderColor: V2.GRAPHITE,
					color: V2.TEXT,
					background: V2.SURFACE
				} }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/v3/viagens",
					className: "h-11 px-4 rounded-full font-semibold text-sm flex items-center gap-2 transition active:scale-95 border",
					style: {
						borderColor: V2.GRAPHITE,
						color: V2.TEXT,
						background: V2.SURFACE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" }), " Despesa viagem"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/v3/despesa-empresa",
					className: "h-11 px-4 rounded-full font-semibold text-sm flex items-center gap-2 transition active:scale-95 border",
					style: {
						borderColor: V2.GRAPHITE,
						color: V2.TEXT,
						background: V2.SURFACE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" }), " Despesa empresa"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/v3/vendas/nova",
					className: "h-11 px-5 rounded-full font-semibold text-sm flex items-center gap-2 transition active:scale-95",
					style: {
						background: V2.TEAL,
						color: "#fff",
						boxShadow: `0 10px 30px -8px ${V2.TEAL}66`
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4" }), " Nova venda"]
				})
			]
		}),
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateCard, {
			title: "Não foi possível carregar o dashboard",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAccess, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainGrid, {
					data,
					loading: isLoading
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecentOrders, {
					data: (_data$recentOrders = data === null || data === void 0 ? void 0 : data.recentOrders) !== null && _data$recentOrders !== void 0 ? _data$recentOrders : [],
					loading: isLoading
				})
			]
		})
	});
}
function HeroBanner({ data, loading }) {
	var _data$ordersToday;
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
						children: "Boas-vindas de volta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-2 text-2xl lg:text-3xl font-semibold",
						style: { color: V2.TEXT },
						children: ["Sua operação em ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
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
	var _data$revenueToday, _data$revenueYesterda, _data$revenueMonth, _data$revenuePrevious, _data$pendingOrders, _data$ordersMonth;
	const dayVsYesterday = compareToPrevious((_data$revenueToday = data === null || data === void 0 ? void 0 : data.revenueToday) !== null && _data$revenueToday !== void 0 ? _data$revenueToday : 0, (_data$revenueYesterda = data === null || data === void 0 ? void 0 : data.revenueYesterday) !== null && _data$revenueYesterda !== void 0 ? _data$revenueYesterda : 0);
	const monthVsPrevious = compareToPrevious((_data$revenueMonth = data === null || data === void 0 ? void 0 : data.revenueMonth) !== null && _data$revenueMonth !== void 0 ? _data$revenueMonth : 0, (_data$revenuePrevious = data === null || data === void 0 ? void 0 : data.revenuePreviousMonth) !== null && _data$revenuePrevious !== void 0 ? _data$revenuePrevious : 0);
	const projection = projectMonth(data);
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
				label: "Vendas mês atual",
				value: data === null || data === void 0 ? void 0 : data.revenueMonth,
				previousValue: data === null || data === void 0 ? void 0 : data.revenuePreviousMonth,
				previousLabel: "Mês anterior",
				loading,
				tone: monthVsPrevious.tone,
				icon: Wallet,
				helper: monthVsPrevious.helper
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectionCard, {
				data,
				loading,
				projection
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[11px] font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full",
							style: {
								background: V2.TEAL_LIGHT,
								color: V2.TEAL
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), loading ? "—" : `${(_data$pendingOrders = data === null || data === void 0 ? void 0 : data.pendingOrders) !== null && _data$pendingOrders !== void 0 ? _data$pendingOrders : 0} pendentes`]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-[10px] uppercase tracking-[0.2em] font-semibold",
						style: { color: V2.LIGHT_MUTED },
						children: "Pedidos no mês"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-semibold text-2xl lg:text-3xl",
						style: { color: V2.LIGHT_TEXT },
						children: loading ? "—" : String((_data$ordersMonth = data === null || data === void 0 ? void 0 : data.ordersMonth) !== null && _data$ordersMonth !== void 0 ? _data$ordersMonth : 0)
					})
				]
			})
		]
	});
}
function compareToPrevious(current, previous) {
	if (previous === 0) return {
		tone: "neutral",
		helper: "Sem base de comparação"
	};
	const diff = current - previous;
	const percent = Math.round(diff / previous * 100);
	return {
		tone: diff >= 0 ? "positive" : "negative",
		helper: `${diff >= 0 ? "+" : ""}${brl(diff)} (${percent >= 0 ? "+" : ""}${percent}%) vs anterior`
	};
}
function projectMonth(data) {
	if (!data || data.daysInMonth === 0) return {
		percent: 0,
		label: "—",
		status: "neutral"
	};
	const ratio = data.revenuePreviousMonth === 0 ? 1 : data.projectedMonth / data.revenuePreviousMonth;
	const percent = Math.round((ratio - 1) * 100);
	const status = percent >= 0 ? "positive" : "negative";
	return {
		percent,
		label: `${data.daysElapsedMonth}/${data.daysInMonth} dias · média ${brl(data.avgDailyMonth)}/dia`,
		status
	};
}
function ComparisonCard({ label, value, previousValue, previousLabel, loading, tone, icon: Icon, helper }) {
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
				children: loading ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value })
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
					loading ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, {
						value: previousValue,
						className: "inline"
					})
				]
			})
		]
	});
}
function ProjectionCard({ data, loading, projection }) {
	const color = projection.status === "positive" ? V2.TEAL : projection.status === "negative" ? DANGER : V2.LIGHT_MUTED;
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
				style: { background: color }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-10 w-10 rounded-xl grid place-items-center",
					style: {
						background: V2.TEAL_LIGHT,
						color: V2.TEAL
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[11px] font-semibold flex items-center gap-0.5 px-2 py-1 rounded-full",
					style: {
						background: projection.status === "positive" ? "#10b98122" : projection.status === "negative" ? "#dc262622" : V2.TEAL_LIGHT,
						color
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3 w-3" }), loading ? "—" : projection.status === "positive" ? "Acima do mês anterior" : projection.status === "negative" ? "Abaixo do mês anterior" : "Sem projeção"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 text-[10px] uppercase tracking-[0.2em] font-semibold",
				style: { color: V2.LIGHT_MUTED },
				children: "Projeção final do mês"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 font-semibold text-2xl lg:text-3xl",
				style: { color: V2.LIGHT_TEXT },
				children: loading ? "—" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value: data === null || data === void 0 ? void 0 : data.projectedMonth })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 pt-3 border-t text-[11px] font-medium",
				style: {
					borderColor: V2.LIGHT_BORDER,
					color: V2.LIGHT_MUTED
				},
				children: loading ? "—" : projection.label
			})
		]
	});
}
function QuickAccess() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border p-5 lg:p-6",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between mb-4 flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
				style: { color: V2.TEAL },
				children: "Acesso rápido"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-semibold text-lg",
				style: { color: V2.LIGHT_TEXT },
				children: "Áreas do sistema"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-medium",
				style: { color: V2.LIGHT_MUTED },
				children: "Layout v3 · dark/orange"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3",
			children: QUICK_ACTIONS.map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: action.to,
				className: "group flex flex-col items-start gap-3 rounded-xl border p-3 transition hover:-translate-y-0.5",
				style: {
					background: V2.LIGHT_SURFACE_2,
					borderColor: V2.LIGHT_BORDER
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-10 w-10 rounded-xl grid place-items-center transition group-hover:scale-110",
					style: {
						background: V2.TEAL_LIGHT,
						color: V2.TEAL
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(action.icon, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-sm leading-tight truncate",
						style: { color: V2.LIGHT_TEXT },
						children: action.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] mt-0.5 truncate",
						style: { color: V2.LIGHT_MUTED },
						children: action.desc
					})]
				})]
			}, action.label))
		})]
	});
}
function MainGrid({ data, loading }) {
	var _data$salesBars, _data$activities, _data$activities$leng;
	const bars = (_data$salesBars = data === null || data === void 0 ? void 0 : data.salesBars) !== null && _data$salesBars !== void 0 ? _data$salesBars : [
		0,
		0,
		0,
		0,
		0,
		0,
		0
	];
	const max = Math.max(...bars, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid grid-cols-1 lg:grid-cols-3 gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-2 rounded-2xl p-5 border",
			style: {
				background: V2.LIGHT_SURFACE,
				borderColor: V2.LIGHT_BORDER
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
					style: { color: V2.TEAL },
					children: "Volume de vendas"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-semibold text-lg",
					style: { color: V2.LIGHT_TEXT },
					children: "Últimos 7 dias"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-medium",
					style: { color: V2.LIGHT_MUTED },
					children: loading ? "Carregando" : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value: data === null || data === void 0 ? void 0 : data.revenueMonth })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-52 flex items-end gap-3 px-1",
				children: bars.map((value, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 flex flex-col items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full rounded-t-lg relative min-h-2 transition hover:opacity-80",
						style: {
							height: `${Math.max(6, value / max * 100)}%`,
							background: index === bars.length - 1 ? V2.TEAL : V2.LIGHT_SURFACE_2,
							border: `1px solid ${index === bars.length - 1 ? V2.TEAL : V2.LIGHT_BORDER}`,
							boxShadow: index === bars.length - 1 ? `0 -6px 16px -4px ${V2.TEAL}66` : "none"
						},
						title: brl(value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold",
						style: { color: V2.LIGHT_MUTED },
						children: [
							"S",
							"T",
							"Q",
							"Q",
							"S",
							"S",
							"D"
						][index]
					})]
				}, `${index}-${value}`))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
					children: "Atividade"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-semibold text-lg",
					style: { color: V2.LIGHT_TEXT },
					children: "Registros recentes"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-8 w-8 rounded-full grid place-items-center border",
					style: {
						borderColor: V2.LIGHT_BORDER,
						color: V2.LIGHT_MUTED
					},
					"aria-label": "Mais opções",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-4",
				children: [((_data$activities = data === null || data === void 0 ? void 0 : data.activities) !== null && _data$activities !== void 0 ? _data$activities : []).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1.5 h-2 w-2 rounded-full shrink-0",
							style: { background: item.tone }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold leading-tight truncate",
								style: { color: V2.LIGHT_TEXT },
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs truncate",
								style: { color: V2.LIGHT_MUTED },
								children: item.subtitle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-mono self-start",
							style: { color: V2.LIGHT_MUTED },
							children: item.time
						})
					]
				}, item.id)), !loading && ((_data$activities$leng = data === null || data === void 0 ? void 0 : data.activities.length) !== null && _data$activities$leng !== void 0 ? _data$activities$leng : 0) === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-center py-6",
					style: { color: V2.LIGHT_MUTED },
					children: "Nenhuma atividade encontrada."
				})]
			})]
		})]
	});
}
function RecentOrders({ data, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border overflow-hidden",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between p-5 border-b",
			style: { borderColor: V2.LIGHT_BORDER },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
				style: { color: V2.TEAL },
				children: "Últimos pedidos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-1 font-semibold text-lg",
				style: { color: V2.LIGHT_TEXT },
				children: "Pedidos reais"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/v3/pedidos",
				className: "text-xs font-semibold flex items-center gap-1",
				style: { color: V2.TEAL },
				children: ["Ver tudo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "text-[10px] uppercase tracking-[0.15em] font-semibold",
					style: {
						color: V2.LIGHT_MUTED,
						background: V2.LIGHT_SURFACE_2
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3",
							children: "#"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3",
							children: "Cliente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-5 py-3",
							children: "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-right px-5 py-3",
							children: "Valor"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-right px-5 py-3",
							children: "Data"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [data.map((row) => {
					var _row$companies$trade_, _row$companies, _row$companies2, _ref, _row$companies$trade_2, _row$companies3, _row$companies4;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t transition hover:bg-white/[0.02]",
						style: { borderColor: V2.LIGHT_BORDER },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 font-mono font-semibold",
								style: { color: V2.TEAL },
								children: orderCodeHash(row.id, (_row$companies$trade_ = (_row$companies = row.companies) === null || _row$companies === void 0 ? void 0 : _row$companies.trade_name) !== null && _row$companies$trade_ !== void 0 ? _row$companies$trade_ : (_row$companies2 = row.companies) === null || _row$companies2 === void 0 ? void 0 : _row$companies2.legal_name)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 font-medium",
								style: { color: V2.LIGHT_TEXT },
								children: (_ref = (_row$companies$trade_2 = (_row$companies3 = row.companies) === null || _row$companies3 === void 0 ? void 0 : _row$companies3.trade_name) !== null && _row$companies$trade_2 !== void 0 ? _row$companies$trade_2 : (_row$companies4 = row.companies) === null || _row$companies4 === void 0 ? void 0 : _row$companies4.legal_name) !== null && _ref !== void 0 ? _ref : "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border",
									style: {
										borderColor: V2.TEAL,
										color: V2.TEAL,
										background: V2.TEAL_LIGHT
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "h-3 w-3" }),
										" ",
										row.status
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-right font-semibold",
								style: { color: V2.LIGHT_TEXT },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Money, { value: Number(row.total) })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-5 py-4 text-right font-mono text-xs",
								style: { color: V2.LIGHT_MUTED },
								children: formatDate(row.created_at)
							})
						]
					}, row.id);
				}), !loading && data.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					colSpan: 5,
					className: "px-5 py-8 text-center",
					style: { color: V2.LIGHT_MUTED },
					children: "Nenhum pedido encontrado."
				}) })] })]
			})
		})]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, {
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
async function fetchDashboardData() {
	var _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _todayRows$error, _monthRows$data, _todayRows$data, _yesterdayRows$data, _previousMonthRows$da, _recentOrders$data, _recentLeads$data, _recentVisits$data, _pendingOrders$count, _recentOrders$data2;
	const now = /* @__PURE__ */ new Date();
	const today = new Date(now);
	today.setHours(0, 0, 0, 0);
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
	const endOfPreviousMonth = new Date(startOfMonth);
	const month = /* @__PURE__ */ new Date();
	month.setMonth(month.getMonth() - 1);
	const sevenDays = Array.from({ length: 7 }, (_, index) => {
		const date = /* @__PURE__ */ new Date();
		date.setDate(date.getDate() - (6 - index));
		date.setHours(0, 0, 0, 0);
		return date;
	});
	const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
	const daysElapsedMonth = Math.max(1, Math.min(now.getDate(), daysInMonth));
	const [todayRows, yesterdayRows, monthRows, previousMonthRows, pendingOrders, recentOrders, recentLeads, recentVisits] = await Promise.all([
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", today.toISOString()),
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", yesterday.toISOString()).lt("created_at", today.toISOString()),
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", startOfMonth.toISOString()),
		supabase.from("orders").select("total,created_at,status").neq("status", "CANCELADO").gte("created_at", startOfPreviousMonth.toISOString()).lt("created_at", endOfPreviousMonth.toISOString()),
		supabase.from("orders").select("*", {
			count: "exact",
			head: true
		}).in("status", ["PENDENTE", "AGUARDANDO_PAGAMENTO"]),
		supabase.from("orders").select("id,status,total,created_at,companies(legal_name,trade_name)").order("created_at", { ascending: false }).limit(5),
		supabase.from("leads").select("id,empresa,status,created_at").order("created_at", { ascending: false }).limit(3),
		supabase.from("visits").select("id,created_at,resultado,leads(empresa)").order("created_at", { ascending: false }).limit(3)
	]);
	const firstError = (_ref2 = (_ref3 = (_ref4 = (_ref5 = (_ref6 = (_ref7 = (_todayRows$error = todayRows.error) !== null && _todayRows$error !== void 0 ? _todayRows$error : yesterdayRows.error) !== null && _ref7 !== void 0 ? _ref7 : monthRows.error) !== null && _ref6 !== void 0 ? _ref6 : previousMonthRows.error) !== null && _ref5 !== void 0 ? _ref5 : pendingOrders.error) !== null && _ref4 !== void 0 ? _ref4 : recentOrders.error) !== null && _ref3 !== void 0 ? _ref3 : recentLeads.error) !== null && _ref2 !== void 0 ? _ref2 : recentVisits.error;
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
	const avgDailyMonth = revenueMonth / daysElapsedMonth;
	const projectedMonth = avgDailyMonth * daysInMonth;
	const salesBars = sevenDays.map((date) => {
		const next = new Date(date);
		next.setDate(next.getDate() + 1);
		return monthData.filter((row) => row.created_at >= date.toISOString() && row.created_at < next.toISOString()).reduce((sum, row) => {
			var _row$total5;
			return sum + Number((_row$total5 = row.total) !== null && _row$total5 !== void 0 ? _row$total5 : 0);
		}, 0);
	});
	const orderActivities = ((_recentOrders$data = recentOrders.data) !== null && _recentOrders$data !== void 0 ? _recentOrders$data : []).slice(0, 3).map((row) => {
		var _row$companies$trade_3, _row$companies5, _row$companies6, _ref8, _row$companies$trade_4, _row$companies7, _row$companies8;
		return {
			id: `order-${row.id}`,
			title: `Pedido ${orderCodeHash(row.id, (_row$companies$trade_3 = (_row$companies5 = row.companies) === null || _row$companies5 === void 0 ? void 0 : _row$companies5.trade_name) !== null && _row$companies$trade_3 !== void 0 ? _row$companies$trade_3 : (_row$companies6 = row.companies) === null || _row$companies6 === void 0 ? void 0 : _row$companies6.legal_name)}`,
			subtitle: `${(_ref8 = (_row$companies$trade_4 = (_row$companies7 = row.companies) === null || _row$companies7 === void 0 ? void 0 : _row$companies7.trade_name) !== null && _row$companies$trade_4 !== void 0 ? _row$companies$trade_4 : (_row$companies8 = row.companies) === null || _row$companies8 === void 0 ? void 0 : _row$companies8.legal_name) !== null && _ref8 !== void 0 ? _ref8 : "Cliente"} · ${brl(Number(row.total))}`,
			time: formatDate(row.created_at),
			tone: V2.TEAL
		};
	});
	const leadActivities = ((_recentLeads$data = recentLeads.data) !== null && _recentLeads$data !== void 0 ? _recentLeads$data : []).slice(0, 2).map((row) => ({
		id: `lead-${row.id}`,
		title: row.empresa,
		subtitle: `Lead · ${row.status}`,
		time: formatDate(row.created_at),
		tone: "#e11d48"
	}));
	const visitActivities = ((_recentVisits$data = recentVisits.data) !== null && _recentVisits$data !== void 0 ? _recentVisits$data : []).slice(0, 2).map((row) => {
		var _row$leads$empresa, _row$leads, _row$resultado;
		return {
			id: `visit-${row.id}`,
			title: (_row$leads$empresa = (_row$leads = row.leads) === null || _row$leads === void 0 ? void 0 : _row$leads.empresa) !== null && _row$leads$empresa !== void 0 ? _row$leads$empresa : "Visita registrada",
			subtitle: (_row$resultado = row.resultado) !== null && _row$resultado !== void 0 ? _row$resultado : "Campo",
			time: formatDate(row.created_at),
			tone: "#14b8a6"
		};
	});
	return {
		revenueToday,
		revenueYesterday,
		revenueMonth,
		revenuePreviousMonth,
		avgDailyMonth,
		daysElapsedMonth,
		daysInMonth,
		projectedMonth,
		ordersToday: todayData.length,
		ordersMonth: monthData.length,
		avgTicketMonth: monthData.length ? revenueMonth / monthData.length : 0,
		pendingOrders: (_pendingOrders$count = pendingOrders.count) !== null && _pendingOrders$count !== void 0 ? _pendingOrders$count : 0,
		recentOrders: (_recentOrders$data2 = recentOrders.data) !== null && _recentOrders$data2 !== void 0 ? _recentOrders$data2 : [],
		activities: [
			...orderActivities,
			...leadActivities,
			...visitActivities
		].slice(0, 5),
		salesBars
	};
}
//#endregion
export { V3Dashboard as component };
