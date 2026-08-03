import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { r as useProfile, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { Ct as HandCoins, J as Percent, Kt as CircleQuestionMark, N as Search, P as ScanLine, Q as PackageSearch, Qt as ChevronDown, St as Handshake, T as Smartphone, Ut as ClipboardList, Xt as ChevronRight, Zt as ChevronLeft, an as Briefcase, at as Megaphone, c as Users, cn as Bell, en as ChartColumn, et as Navigation, ht as LayoutDashboard, in as Building2, it as Menu, j as Settings, k as ShieldCheck, lt as LogOut, mt as LayoutGrid, n as X, nn as CalendarClock, nt as MessageSquare, ot as Map, p as Truck, pt as LifeBuoy, r as Workflow, rt as MessageCircle, s as Wallet, sn as Boxes, vt as Image, w as Sparkles, wt as Globe, y as Target, zt as Cog } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/InternalShell-Dh7pQCf3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		title: "Comece pelo Hoje",
		body: "O painel Hoje mostra a venda do dia comparada a ontem, o mês vs. mês anterior e o que precisa da sua ação agora (pedidos pendentes, estoque baixo, viagens abertas).",
		hint: "Menu → Geral → Hoje"
	},
	{
		title: "Venda no cliente",
		body: "Em Vender você tem Pedidos, Venda em visita e o PDV rápido (tablet). Toda venda em viagem aberta é vinculada automaticamente pela cidade do cliente.",
		hint: "Menu → Vender"
	},
	{
		title: "Viagens e despesas",
		body: "Abra uma viagem antes de sair. Lance despesas por categoria — combustível, alimentação, hospedagem — e adicione várias cidades num mesmo roteiro.",
		hint: "Menu → Vender → Viagens / Despesas"
	},
	{
		title: "Relatórios que decidem",
		body: "Curva ABC de produtos e clientes, projeção de lucro, giro de estoque e resultado por viagem. Tudo com filtros por período e cidade.",
		hint: "Menu → Crescer → Relatórios"
	},
	{
		title: "Cresça com automações",
		body: "WhatsApp (inbox, campanhas, pós-venda), push, promoções e banners ficam em Crescer. IA e Automação ajudam a repetir o que já funciona.",
		hint: "Menu → Crescer"
	}
];
function GuidedTour() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [step, setStep] = (0, import_react.useState)(0);
	const start = () => {
		setStep(0);
		setOpen(true);
	};
	const close = () => setOpen(false);
	const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
	const prev = () => setStep((s) => Math.max(s - 1, 0));
	const current = STEPS[step];
	const isLast = step === STEPS.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: start,
		className: "h-10 w-10 rounded-full grid place-items-center border transition hover:opacity-80",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER,
			color: V2.LIGHT_MUTED
		},
		"aria-label": "Ver tour guiado",
		title: "Ver tour guiado",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" })
	}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[60] flex items-center justify-center p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Fechar tour",
			onClick: close,
			className: "absolute inset-0 bg-black/60"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-labelledby": "tour-title",
			className: "relative w-full max-w-lg rounded-2xl border shadow-2xl",
			style: {
				background: V2.LIGHT_SURFACE,
				borderColor: V2.LIGHT_BORDER,
				color: V2.LIGHT_TEXT
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 py-4 border-b",
					style: { borderColor: V2.LIGHT_BORDER },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] font-semibold uppercase tracking-[0.15em]",
						style: { color: V2.TEAL },
						children: [
							"Tour · ",
							step + 1,
							" de ",
							STEPS.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: close,
						className: "h-8 w-8 rounded-lg grid place-items-center border",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_MUTED
						},
						"aria-label": "Fechar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-6 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							id: "tour-title",
							className: "text-xl font-semibold tracking-tight",
							children: current.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed",
							style: { color: V2.LIGHT_MUTED },
							children: current.body
						}),
						current.hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "inline-block rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.TEAL
							},
							children: current.hint
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 py-4 border-t",
					style: { borderColor: V2.LIGHT_BORDER },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5",
						children: STEPS.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-1.5 rounded-full transition-all",
							style: {
								width: i === step ? 20 : 8,
								background: i === step ? V2.TEAL : V2.LIGHT_BORDER
							}
						}, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: prev,
							disabled: step === 0,
							className: "h-9 px-3 rounded-lg border text-sm font-medium disabled:opacity-40 inline-flex items-center gap-1",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_TEXT
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Voltar"]
						}), isLast ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: close,
							className: "h-9 px-4 rounded-lg text-sm font-semibold text-white",
							style: { background: V2.TEAL },
							children: "Concluir"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: next,
							className: "h-9 px-3 rounded-lg text-sm font-semibold text-white inline-flex items-center gap-1",
							style: { background: V2.TEAL },
							children: ["Próximo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
						})]
					})]
				})
			]
		})]
	})] });
}
var V2_INTERNAL_LINKS = [
	{
		to: "/v3/hoje",
		label: "Hoje",
		icon: LayoutDashboard,
		section: "Geral"
	},
	{
		to: "/v3/dashboard",
		label: "Cockpit",
		icon: ChartColumn,
		section: "Geral"
	},
	{
		to: "/v3",
		label: "Ver o site",
		icon: Globe,
		section: "Geral"
	},
	{
		to: "/v3/pedidos",
		label: "Pedidos",
		icon: ClipboardList,
		section: "Vender"
	},
	{
		to: "/v3/vendas/nova",
		label: "Venda em visita",
		icon: Briefcase,
		section: "Vender"
	},
	{
		to: "/v3/pdv",
		label: "PDV rápido",
		icon: ScanLine,
		section: "Vender"
	},
	{
		to: "/pos",
		label: "PDV Móvel",
		icon: Smartphone,
		section: "Vender"
	},
	{
		to: "/v3/viagens",
		label: "Viagens",
		icon: Truck,
		section: "Vender"
	},
	{
		to: "/v3/despesas",
		label: "Despesas viagem",
		icon: Wallet,
		section: "Vender"
	},
	{
		to: "/v3/despesa-empresa",
		label: "Despesa empresa",
		icon: Building2,
		section: "Vender"
	},
	{
		to: "/v3/campo",
		label: "Campo",
		icon: Navigation,
		section: "Vender"
	},
	{
		to: "/v3/rotas",
		label: "Rotas & mapa",
		icon: Map,
		section: "Vender"
	},
	{
		to: "/v3/crm",
		label: "CRM — Leads",
		icon: Handshake,
		section: "Clientes"
	},
	{
		to: "/v3/crm/agenda",
		label: "Agenda",
		icon: CalendarClock,
		section: "Clientes"
	},
	{
		to: "/v3/prospeccao",
		label: "Prospecção",
		icon: Search,
		section: "Clientes"
	},
	{
		to: "/v3/empresas",
		label: "Clientes & empresas",
		icon: Building2,
		section: "Clientes"
	},
	{
		to: "/v3/portal",
		label: "Portal do cliente",
		icon: LifeBuoy,
		section: "Clientes"
	},
	{
		to: "/v3/catalogo-admin",
		label: "Produtos",
		icon: LayoutGrid,
		section: "Operação"
	},
	{
		to: "/v3/compras",
		label: "Compra de material",
		icon: Boxes,
		section: "Operação"
	},
	{
		to: "/v3/demandas",
		label: "Demanda de produtos",
		icon: PackageSearch,
		section: "Operação"
	},
	{
		to: "/v3/estoque",
		label: "Estoque",
		icon: Boxes,
		section: "Operação"
	},
	{
		to: "/v3/estoque/alertas",
		label: "Alertas de estoque",
		icon: PackageSearch,
		section: "Operação"
	},
	{
		to: "/v3/estoque/contagens",
		label: "Contagens",
		icon: ScanLine,
		section: "Operação"
	},
	{
		to: "/v3/financeiro",
		label: "Financeiro",
		icon: Wallet,
		section: "Operação"
	},
	{
		to: "/v3/fechamento",
		label: "Fechamento",
		icon: HandCoins,
		section: "Operação"
	},
	{
		to: "/v3/financeiro/conciliacao",
		label: "Conciliação bancária",
		icon: Wallet,
		section: "Operação"
	},
	{
		to: "/v3/admin/carrinhos",
		label: "Carrinhos abandonados",
		icon: ClipboardList,
		section: "Operação"
	},
	{
		to: "/v3/relatorios",
		label: "Relatórios",
		icon: ChartColumn,
		section: "Crescer"
	},
	{
		to: "/v3/campanhas",
		label: "Campanhas",
		icon: Megaphone,
		section: "Crescer"
	},
	{
		to: "/v3/whatsapp",
		label: "Inbox WhatsApp",
		icon: MessageCircle,
		section: "Crescer"
	},
	{
		to: "/v3/whatsapp/campanhas",
		label: "Campanhas WhatsApp",
		icon: MessageSquare,
		section: "Crescer"
	},
	{
		to: "/v3/whatsapp/templates",
		label: "Templates WhatsApp",
		icon: MessageSquare,
		section: "Crescer"
	},
	{
		to: "/v3/whatsapp/pos-venda",
		label: "Pós-venda",
		icon: MessageCircle,
		section: "Crescer"
	},
	{
		to: "/v3/admin/promocoes",
		label: "Promoções",
		icon: Percent,
		section: "Crescer"
	},
	{
		to: "/v3/admin/banners",
		label: "Banners",
		icon: Image,
		section: "Crescer"
	},
	{
		to: "/v3/admin/push",
		label: "Push",
		icon: Bell,
		section: "Crescer"
	},
	{
		to: "/v3/admin/metas",
		label: "Metas de vendas",
		icon: Target,
		section: "Crescer"
	},
	{
		to: "/v3/bi",
		label: "Business Intelligence",
		icon: ChartColumn,
		section: "Crescer"
	},
	{
		to: "/v3/ia",
		label: "Inteligência artificial",
		icon: Sparkles,
		section: "Crescer"
	},
	{
		to: "/v3/automacao",
		label: "Automação",
		icon: Workflow,
		section: "Crescer"
	},
	{
		to: "/v3/particular",
		label: "Meu financeiro",
		icon: Wallet,
		section: "Particular"
	},
	{
		to: "/v3/aprovacoes",
		label: "Aprovações",
		icon: ShieldCheck,
		section: "Ajustes"
	},
	{
		to: "/v3/admin/usuarios",
		label: "Usuários & permissões",
		icon: Users,
		section: "Ajustes"
	},
	{
		to: "/v3/configuracoes",
		label: "Configurações",
		icon: Cog,
		section: "Ajustes"
	}
];
function V2InternalShell({ children, title, eyebrow = "Painel de comando", description, actions }) {
	var _ref, _profile$full_name$sp, _profile$full_name, _user$email;
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user } = useAuth();
	const { data: profile } = useProfile(user);
	const firstName = (_ref = (_profile$full_name$sp = profile === null || profile === void 0 || (_profile$full_name = profile.full_name) === null || _profile$full_name === void 0 ? void 0 : _profile$full_name.split(" ")[0]) !== null && _profile$full_name$sp !== void 0 ? _profile$full_name$sp : user === null || user === void 0 || (_user$email = user.email) === null || _user$email === void 0 ? void 0 : _user$email.split("@")[0]) !== null && _ref !== void 0 ? _ref : "Usuário";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full flex",
		style: {
			background: V2.LIGHT_BG,
			color: V2.LIGHT_TEXT
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:flex flex-col w-64 shrink-0 border-r",
				style: {
					background: V2.SURFACE,
					borderColor: V2.GRAPHITE,
					color: V2.TEXT
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellBrand, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellNav, {
						pathname,
						onNavigate: void 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellFooter, {})
				]
			}),
			mobileOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:hidden fixed inset-0 z-50 flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute inset-0 bg-black/50",
					onClick: () => setMobileOpen(false),
					"aria-label": "Fechar menu"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "relative flex flex-col w-64 max-w-[78%] border-r",
					style: {
						background: V2.SURFACE,
						borderColor: V2.GRAPHITE,
						color: V2.TEXT
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b px-3 py-2.5",
							style: { borderColor: V2.GRAPHITE },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellBrand, { compact: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMobileOpen(false),
								className: "h-8 w-8 rounded-lg grid place-items-center border",
								style: {
									borderColor: V2.GRAPHITE,
									color: V2.MUTED
								},
								"aria-label": "Fechar menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellNav, {
							pathname,
							onNavigate: () => setMobileOpen(false),
							compact: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShellFooter, { compact: true })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-40 flex items-center gap-2 sm:gap-3 safe-x h-16 border-b backdrop-blur supports-[backdrop-filter]:bg-opacity-80",
					style: {
						background: `${V2.LIGHT_SURFACE}f2`,
						borderColor: V2.LIGHT_BORDER
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMobileOpen(true),
							className: "lg:hidden h-11 w-11 shrink-0 rounded-lg grid place-items-center border",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_MUTED
							},
							"aria-label": "Abrir menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0 max-w-md flex items-center gap-2 rounded-full px-4 h-10 border",
							style: {
								background: V2.LIGHT_SURFACE_2,
								borderColor: V2.LIGHT_BORDER
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "h-4 w-4 shrink-0",
								style: { color: V2.LIGHT_MUTED }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								placeholder: "Buscar pedido, cliente, SKU...",
								className: "flex-1 min-w-0 bg-transparent outline-none text-sm",
								style: { color: V2.LIGHT_TEXT }
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuidedTour, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "h-10 w-10 rounded-full grid place-items-center border relative",
							style: {
								background: V2.LIGHT_SURFACE,
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_MUTED
							},
							"aria-label": "Notificações",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full",
								style: {
									background: V2.TEAL,
									boxShadow: `0 0 0 2px ${V2.LIGHT_SURFACE}`
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 pl-3 border-l",
							style: { borderColor: V2.LIGHT_BORDER },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right leading-tight hidden md:block",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-semibold",
										style: { color: V2.LIGHT_TEXT },
										children: firstName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[10px] uppercase tracking-widest",
										style: { color: V2.LIGHT_MUTED },
										children: "Conta ativa"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-10 w-10 rounded-full grid place-items-center font-semibold",
									style: {
										background: V2.TEAL,
										color: "#fff"
									},
									children: firstName.slice(0, 1).toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoutButton, {})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex-1 safe-x py-5 lg:py-8 overflow-y-auto overflow-x-hidden",
					style: {
						background: V2.LIGHT_BG,
						color: V2.LIGHT_TEXT
					},
					children: [(title || description || actions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "relative overflow-hidden rounded-3xl border p-6 lg:p-8 mb-6",
						style: {
							background: `radial-gradient(120% 100% at 100% 0%, ${V2.TEAL}22 0%, transparent 55%), linear-gradient(135deg, ${V2.SURFACE} 0%, ${V2.DARK} 100%)`,
							borderColor: V2.GRAPHITE
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							"aria-hidden": true,
							className: "absolute -top-16 -right-16 h-64 w-64 rounded-full blur-3xl pointer-events-none",
							style: { background: `${V2.TEAL}33` }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-end justify-between flex-wrap gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] font-semibold uppercase tracking-[0.15em]",
										style: { color: V2.TEAL },
										children: eyebrow
									}),
									title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-2 font-semibold text-fluid-title tracking-tight truncate",
										style: { color: V2.TEXT },
										children: title
									}),
									description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm mt-1",
										style: { color: V2.MUTED },
										children: description
									})
								]
							}), actions]
						})]
					}), children]
				})]
			})
		]
	});
}
function ShellBrand({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-3 ${compact ? "px-3 py-2.5" : "p-5"}`,
		style: compact ? void 0 : { borderBottom: `1px solid ${V2.GRAPHITE}` },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/brand-logo.png",
			alt: "Atacado Prime",
			className: compact ? "h-8 w-8 object-contain rounded-full" : "h-10 w-10 object-contain rounded-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `font-semibold tracking-tight ${compact ? "text-sm" : "text-base"}`,
				children: ["Atacado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color: V2.TEAL },
					children: "Prime"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-[0.2em]",
				style: { color: V2.MUTED },
				children: "Painel"
			})]
		})]
	});
}
function ShellNav({ pathname, onNavigate, compact = false }) {
	const grouped = (0, import_react.useMemo)(() => {
		return V2_INTERNAL_LINKS.reduce((acc, item) => {
			var _item$section, _acc$key;
			const key = (_item$section = item.section) !== null && _item$section !== void 0 ? _item$section : "Outros";
			((_acc$key = acc[key]) !== null && _acc$key !== void 0 ? _acc$key : acc[key] = []).push(item);
			return acc;
		}, {});
	}, []);
	const order = (0, import_react.useMemo)(() => [
		"Geral",
		"Vender",
		"Clientes",
		"Operação",
		"Crescer",
		"Ajustes",
		"Particular"
	], []);
	const sections = (0, import_react.useMemo)(() => order.filter((k) => grouped[k]), [order, grouped]);
	const activeSections = (0, import_react.useMemo)(() => {
		const active = /* @__PURE__ */ new Set();
		for (const section of sections) if (grouped[section].some((it) => pathname === it.to || it.to !== "/v3" && it.to !== "/v3" && pathname.startsWith(`${it.to}/`))) active.add(section);
		return active;
	}, [
		pathname,
		sections,
		grouped
	]);
	const [open, setOpen] = (0, import_react.useState)(() => {
		const initial = {};
		for (const section of sections) initial[section] = activeSections.has(section);
		return initial;
	});
	const toggle = (section) => setOpen((prev) => _objectSpread2(_objectSpread2({}, prev), {}, { [section]: !prev[section] }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: `flex-1 overflow-y-auto ${compact ? "p-2 space-y-1.5" : "p-3 space-y-4"}`,
		children: sections.map((section) => {
			var _open$section;
			const isOpen = (_open$section = open[section]) !== null && _open$section !== void 0 ? _open$section : activeSections.has(section);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => toggle(section),
				className: `w-full flex items-center justify-between rounded-lg transition ${compact ? "px-2 py-1.5" : "px-3 py-2"}`,
				style: { color: V2.MUTED },
				"aria-expanded": isOpen,
				"aria-controls": `nav-section-${section}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `uppercase tracking-[0.2em] font-semibold ${compact ? "text-[10px]" : "text-[10px]"}`,
					children: section
				}), isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `shrink-0 ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}` }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: `shrink-0 ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}` })]
			}), isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				id: `nav-section-${section}`,
				className: `space-y-0.5 ${compact ? "mt-1" : "mt-1"}`,
				children: grouped[section].map((it) => {
					const active = pathname === it.to || it.to !== "/v3" && it.to !== "/v3" && pathname.startsWith(`${it.to}/`);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: it.to,
						onClick: onNavigate,
						className: `w-full flex items-center gap-2 rounded-lg font-medium transition ${compact ? "px-2 h-8 text-xs" : "px-3 h-10 text-sm"}`,
						style: active ? {
							background: V2.TEAL,
							color: "#fff"
						} : { color: V2.MUTED },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, { className: `shrink-0 ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 text-left truncate",
							children: it.label
						})]
					}, it.to);
				})
			})] }, section);
		})
	});
}
function LogoutButton() {
	const navigate = useNavigate();
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: (0, import_react.useCallback)(async () => {
			setBusy(true);
			await supabase.auth.signOut();
			navigate({ to: "/" });
		}, [navigate]),
		disabled: busy,
		className: "h-10 w-10 rounded-full grid place-items-center border transition hover:opacity-80 disabled:opacity-50",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER,
			color: V2.LIGHT_MUTED
		},
		"aria-label": "Sair e ir para a home",
		title: "Sair e ir para a home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
	});
}
function ShellFooter({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `border-t space-y-0.5 ${compact ? "p-2" : "p-3"}`,
		style: { borderColor: V2.GRAPHITE },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/v3/aprovacoes",
			className: `w-full flex items-center gap-2 rounded-lg font-medium transition ${compact ? "px-2 h-8 text-xs" : "px-3 h-10 text-sm"}`,
			style: { color: V2.MUTED },
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: `shrink-0 ${compact ? "h-3.5 w-3.5" : "h-4 w-4"}` }), " Configurações"]
		})
	});
}
//#endregion
export { V2InternalShell as t };
