import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { J as Percent, Lt as CreditCard, N as Search, P as ScanLine, Q as PackageSearch, St as Handshake, Ut as ClipboardList, an as Briefcase, at as Megaphone, c as Users, cn as Bell, en as ChartColumn, et as Navigation, in as Building2, k as ShieldCheck, mt as LayoutGrid, n as X, nn as CalendarClock, nt as MessageSquare, ot as Map$1, p as Truck, pt as LifeBuoy, qt as CircleCheck, r as Workflow, rt as MessageCircle, s as Wallet, sn as Boxes, vt as Image, w as Sparkles, y as Target, zt as Cog } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { t as useConfirmPayment } from "./use-orders-CBi7bZ2w.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { r as isPendingPayment } from "./status-Dxqe_Ggj.mjs";
import { t as useBankAccounts } from "./use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/V2ModulePage-XE7HL7Oe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MODULES = {
	trips: {
		title: "Viagens",
		eyebrow: "Operação externa",
		description: "Controle real de viagens, cargas e saldo em rota.",
		icon: Truck
	},
	visitSale: {
		title: "Venda em visita",
		eyebrow: "Atendimento em campo",
		description: "Base real de visitas e clientes para venda presencial.",
		icon: Briefcase
	},
	orders: {
		title: "Pedidos",
		eyebrow: "Vendas & entregas",
		description: "Pedidos reais do sistema, com status e totais do banco.",
		icon: ClipboardList
	},
	catalogAdmin: {
		title: "Catálogo interno",
		eyebrow: "Produtos & preços",
		description: "Produtos reais, estoque, marcas e itens críticos.",
		icon: LayoutGrid
	},
	prospecting: {
		title: "Prospecção",
		eyebrow: "CRM comercial",
		description: "Leads reais por status, score e origem comercial.",
		icon: Briefcase
	},
	campaigns: {
		title: "Campanhas",
		eyebrow: "Marketing comercial",
		description: "Campanhas comerciais reais e suas metas.",
		icon: Megaphone
	},
	whatsappCampaigns: {
		title: "Campanhas WhatsApp",
		eyebrow: "Mensageria",
		description: "Disparos e campanhas WhatsApp reais.",
		icon: MessageSquare
	},
	field: {
		title: "Campo",
		eyebrow: "Equipe externa",
		description: "Visitas, check-ins e resultados da operação em campo.",
		icon: Navigation
	},
	routes: {
		title: "Rotas & mapa",
		eyebrow: "Planejamento",
		description: "Rotas reais planejadas para atendimento externo.",
		icon: Map$1
	},
	finance: {
		title: "Financeiro",
		eyebrow: "Caixa & contas",
		description: "Entradas financeiras reais registradas no sistema.",
		icon: Wallet
	},
	approvals: {
		title: "Aprovações",
		eyebrow: "Governança",
		description: "Cadastros e pedidos pendentes de aprovação.",
		icon: ShieldCheck
	},
	crm: {
		title: "CRM — Leads",
		eyebrow: "Comercial",
		description: "Todos os leads com posição, etapa e responsável.",
		icon: Handshake
	},
	crmAgenda: {
		title: "Agenda de tarefas",
		eyebrow: "CRM",
		description: "Tarefas comerciais pendentes e agendadas.",
		icon: CalendarClock
	},
	whatsappInbox: {
		title: "Inbox WhatsApp",
		eyebrow: "Atendimento",
		description: "Conversas ativas do WhatsApp em tempo real.",
		icon: MessageCircle
	},
	whatsappTemplates: {
		title: "Templates WhatsApp",
		eyebrow: "Mensageria",
		description: "Modelos aprovados para disparos e respostas.",
		icon: MessageSquare
	},
	postSale: {
		title: "Pós-venda WhatsApp",
		eyebrow: "Retenção",
		description: "Mensagens agendadas de pós-venda por pedido.",
		icon: MessageCircle
	},
	bi: {
		title: "Business Intelligence",
		eyebrow: "Análises",
		description: "Dashboards e relatórios internos configurados.",
		icon: ChartColumn
	},
	ai: {
		title: "Inteligência artificial",
		eyebrow: "IA aplicada",
		description: "Recomendações, previsões e classificações do motor.",
		icon: Sparkles
	},
	automation: {
		title: "Automação",
		eyebrow: "Workflows",
		description: "Fluxos automatizados e histórico de execuções.",
		icon: Workflow
	},
	portal: {
		title: "Portal do cliente",
		eyebrow: "Suporte",
		description: "Chamados abertos e atendimentos do portal.",
		icon: LifeBuoy
	},
	settings: {
		title: "Configurações",
		eyebrow: "Sistema",
		description: "Ajustes globais e parâmetros do sistema.",
		icon: Cog
	},
	inventory: {
		title: "Estoque",
		eyebrow: "Inventário",
		description: "Visão geral de contagens, alertas e movimentações.",
		icon: Boxes
	},
	inventoryAlerts: {
		title: "Alertas de estoque",
		eyebrow: "Inventário",
		description: "Produtos abaixo do mínimo ou zerados.",
		icon: PackageSearch
	},
	inventoryCounts: {
		title: "Contagens de inventário",
		eyebrow: "Inventário",
		description: "Contagens realizadas com divergências reais.",
		icon: ScanLine
	},
	financeReconciliation: {
		title: "Conciliação bancária",
		eyebrow: "Financeiro",
		description: "Extratos bancários importados para conciliação.",
		icon: Wallet
	},
	companies: {
		title: "Clientes & empresas",
		eyebrow: "Base cadastral",
		description: "Empresas cadastradas no sistema com contato e status.",
		icon: Building2
	},
	adminUsers: {
		title: "Usuários & permissões",
		eyebrow: "Administração",
		description: "Perfis e papéis atribuídos aos usuários.",
		icon: Users
	},
	adminPromotions: {
		title: "Promoções",
		eyebrow: "Administração",
		description: "Regras de promoção ativas no catálogo público.",
		icon: Percent
	},
	adminBanners: {
		title: "Banners do site",
		eyebrow: "Administração",
		description: "Banners e slides publicados no site.",
		icon: Image
	},
	adminSalesTargets: {
		title: "Metas de vendas",
		eyebrow: "Administração",
		description: "Metas atribuídas por vendedor ou equipe.",
		icon: Target
	},
	adminAbandonedCarts: {
		title: "Carrinhos abandonados",
		eyebrow: "Administração",
		description: "Carrinhos abertos sem checkout finalizado.",
		icon: ClipboardList
	},
	adminPush: {
		title: "Notificações push",
		eyebrow: "Administração",
		description: "Campanhas de push agendadas ou enviadas.",
		icon: Bell
	}
};
var PAGE_SIZE = 10;
function V2ModulePage({ moduleKey }) {
	var _data$records;
	const config = MODULES[moduleKey];
	const { data, isLoading, error } = useQuery({
		queryKey: ["v2-module", moduleKey],
		queryFn: () => fetchModuleData(moduleKey)
	});
	const [page, setPage] = (0, import_react.useState)(1);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	(0, import_react.useEffect)(() => {
		setPage(1);
		setSearchTerm("");
		setStatusFilter("ALL");
	}, [moduleKey]);
	const allRecords = (_data$records = data === null || data === void 0 ? void 0 : data.records) !== null && _data$records !== void 0 ? _data$records : [];
	const filteredRecords = allRecords.filter((record) => {
		const term = searchTerm.toLowerCase().trim();
		if (!(!term || record.title.toLowerCase().includes(term) || record.subtitle.toLowerCase().includes(term) || record.status && record.status.toLowerCase().includes(term) || record.value && record.value.toLowerCase().includes(term) || record.date && record.date.toLowerCase().includes(term) || record.id.toLowerCase().includes(term))) return false;
		if (moduleKey === "orders" && statusFilter !== "ALL") {
			const isPending = record.status ? isPendingPayment(record.status) : false;
			if (statusFilter === "PENDING") return isPending;
			if (statusFilter === "PAGO") return record.status === "PAGO";
			if (statusFilter === "CANCELADO") return record.status === "CANCELADO";
		}
		return true;
	});
	const totalPages = Math.max(1, Math.ceil(filteredRecords.length / PAGE_SIZE));
	const currentPage = Math.min(page, totalPages);
	const pageRecords = filteredRecords.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: config.title,
		eyebrow: config.eyebrow,
		description: config.description,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/v3/hoje",
			className: "h-11 px-5 rounded-full font-medium text-sm grid place-items-center",
			style: {
				background: V2.TEAL,
				color: "#fff"
			},
			children: "Voltar ao Hoje"
		}),
		children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateCard, {
			title: "Não foi possível carregar",
			description: error instanceof Error ? error.message : "Falha ao buscar os dados reais."
		}) : isLoading || !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateCard, {
			title: "Carregando dados reais",
			description: "Consultando o banco de dados do sistema."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
				children: data.stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl p-5 border shadow-sm",
					style: {
						background: V2.LIGHT_SURFACE,
						borderColor: V2.LIGHT_BORDER
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
							style: { color: V2.LIGHT_MUTED },
							children: stat.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 text-2xl font-semibold",
							style: { color: V2.LIGHT_TEXT },
							children: stat.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs",
							style: { color: V2.LIGHT_MUTED },
							children: stat.helper
						})
					]
				}, stat.label))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border shadow-sm overflow-hidden",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-5 border-b space-y-4",
					style: { borderColor: V2.LIGHT_BORDER },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-between gap-3 flex-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-10 w-10 rounded-xl grid place-items-center",
								style: {
									background: V2.TEAL_LIGHT,
									color: V2.TEAL
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(config.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold text-lg",
								children: "Registros"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs",
								style: { color: V2.LIGHT_MUTED },
								children: filteredRecords.length > 0 ? `${filteredRecords.length} de ${allRecords.length} registro(s) · página ${currentPage} de ${totalPages}` : "Lista gerada somente com dados do banco."
							})] })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none",
									style: { color: V2.LIGHT_MUTED }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: searchTerm,
									onChange: (e) => {
										setSearchTerm(e.target.value);
										setPage(1);
									},
									placeholder: moduleKey === "orders" ? "Buscar por código (#1234), cliente, valor, status..." : "Buscar registros...",
									className: "w-full h-10 pl-10 pr-9 rounded-xl border text-sm focus:outline-none transition-colors",
									style: {
										borderColor: V2.LIGHT_BORDER,
										background: V2.LIGHT_SURFACE_2,
										color: V2.LIGHT_TEXT
									}
								}),
								searchTerm && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setSearchTerm("");
										setPage(1);
									},
									className: "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md",
									style: { color: V2.LIGHT_MUTED },
									title: "Limpar busca",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" })
								})
							]
						}), moduleKey === "orders" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setStatusFilter("ALL");
										setPage(1);
									},
									className: `h-9 px-3 rounded-xl font-semibold border transition-all ${statusFilter === "ALL" ? "shadow-sm" : ""}`,
									style: {
										background: statusFilter === "ALL" ? V2.TEAL : V2.LIGHT_SURFACE_2,
										color: statusFilter === "ALL" ? "#fff" : V2.LIGHT_TEXT,
										borderColor: statusFilter === "ALL" ? V2.TEAL : V2.LIGHT_BORDER
									},
									children: "Todos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setStatusFilter("PENDING");
										setPage(1);
									},
									className: `h-9 px-3 rounded-xl font-semibold border transition-all ${statusFilter === "PENDING" ? "shadow-sm" : ""}`,
									style: {
										background: statusFilter === "PENDING" ? "#f59e0b" : V2.LIGHT_SURFACE_2,
										color: statusFilter === "PENDING" ? "#fff" : V2.LIGHT_TEXT,
										borderColor: statusFilter === "PENDING" ? "#f59e0b" : V2.LIGHT_BORDER
									},
									children: "Pendentes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setStatusFilter("PAGO");
										setPage(1);
									},
									className: `h-9 px-3 rounded-xl font-semibold border transition-all ${statusFilter === "PAGO" ? "shadow-sm" : ""}`,
									style: {
										background: statusFilter === "PAGO" ? "#059669" : V2.LIGHT_SURFACE_2,
										color: statusFilter === "PAGO" ? "#fff" : V2.LIGHT_TEXT,
										borderColor: statusFilter === "PAGO" ? "#059669" : V2.LIGHT_BORDER
									},
									children: "Pagos"
								})
							]
						})]
					})]
				}), filteredRecords.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8 text-center text-sm",
					style: { color: V2.LIGHT_MUTED },
					children: searchTerm || statusFilter !== "ALL" ? "Nenhum registro encontrado para esta busca." : "Nenhum registro encontrado para este módulo."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [moduleKey === "orders" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersRecords, { records: pageRecords }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					style: { borderColor: V2.LIGHT_BORDER },
					children: pageRecords.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 md:items-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold truncate",
									style: { color: V2.LIGHT_TEXT },
									children: record.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs mt-0.5 truncate",
									style: { color: V2.LIGHT_MUTED },
									children: record.subtitle
								})]
							}),
							record.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "justify-self-start md:justify-self-end text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border",
								style: {
									color: V2.TEAL,
									borderColor: V2.TEAL,
									background: V2.TEAL_LIGHT
								},
								children: record.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [record.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-sm",
									style: { color: V2.LIGHT_TEXT },
									children: record.value
								}), record.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px]",
									style: { color: V2.LIGHT_MUTED },
									children: record.date
								})]
							})
						]
					}, record.id))
				}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-t flex items-center justify-between gap-3 flex-wrap",
					style: { borderColor: V2.LIGHT_BORDER },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs",
						style: { color: V2.LIGHT_MUTED },
						children: [
							"Mostrando ",
							(currentPage - 1) * PAGE_SIZE + 1,
							"–",
							Math.min(currentPage * PAGE_SIZE, filteredRecords.length),
							" de ",
							filteredRecords.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPage(Math.max(1, currentPage - 1)),
								disabled: currentPage <= 1,
								className: "h-9 px-4 rounded-full text-xs font-semibold border disabled:opacity-40",
								style: {
									borderColor: V2.LIGHT_BORDER,
									color: V2.LIGHT_TEXT
								},
								children: "Anterior"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-semibold",
								style: { color: V2.LIGHT_TEXT },
								children: [
									currentPage,
									"/",
									totalPages
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPage(Math.min(totalPages, currentPage + 1)),
								disabled: currentPage >= totalPages,
								className: "h-9 px-4 rounded-full text-xs font-semibold disabled:opacity-40",
								style: {
									background: V2.TEAL,
									color: "#fff"
								},
								children: "Próxima"
							})
						]
					})]
				})] })]
			})]
		})
	});
}
function StateCard({ title, description }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-8 border text-center shadow-sm",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-semibold text-lg",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm mt-1",
			style: { color: V2.LIGHT_MUTED },
			children: description
		})]
	});
}
function OrdersRecords({ records }) {
	var _selected$total2, _selected$subtitle;
	const queryClient = useQueryClient();
	const confirmPay = useConfirmPayment();
	const { data: bankAccounts = [] } = useBankAccounts();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [payTipo, setPayTipo] = (0, import_react.useState)("PIX");
	const [payAccountId, setPayAccountId] = (0, import_react.useState)("");
	const [payParcelas, setPayParcelas] = (0, import_react.useState)(1);
	const [payObs, setPayObs] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!payAccountId && bankAccounts.length > 0) setPayAccountId(bankAccounts[0].id);
	}, [bankAccounts, payAccountId]);
	const openPayment = (record) => {
		setSelected(record);
		setPayTipo("PIX");
		setPayParcelas(1);
		setPayObs("");
	};
	const confirmSelectedPayment = () => {
		var _selected$companyId, _selected$total;
		if (!selected) return;
		const account = bankAccounts.find((item) => item.id === payAccountId);
		if (!account) {
			toast.error("Selecione uma conta bancária para receber esse pagamento");
			return;
		}
		confirmPay.mutate({
			order_id: selected.id,
			company_id: (_selected$companyId = selected.companyId) !== null && _selected$companyId !== void 0 ? _selected$companyId : null,
			total: Number((_selected$total = selected.total) !== null && _selected$total !== void 0 ? _selected$total : 0),
			tipo: payTipo,
			conta: account.nome,
			account_id: account.id,
			parcelas: payTipo === "CARTAO" ? payParcelas : 1,
			observacao: payObs.trim() || void 0
		}, {
			onSuccess: () => {
				toast.success("Pagamento confirmado");
				setSelected(null);
				queryClient.invalidateQueries({ queryKey: ["v2-module", "orders"] });
			},
			onError: (error) => toast.error(error instanceof Error ? error.message : "Erro ao confirmar pagamento")
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y",
		style: { borderColor: V2.LIGHT_BORDER },
		children: records.map((record) => {
			const pending = record.status ? isPendingPayment(record.status) : false;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold truncate",
								style: { color: V2.LIGHT_TEXT },
								children: record.title
							}), record.status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border",
								style: {
									color: V2.TEAL,
									borderColor: V2.TEAL,
									background: V2.TEAL_LIGHT
								},
								children: record.status.replace(/_/g, " ")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs mt-0.5 truncate",
							style: { color: V2.LIGHT_MUTED },
							children: record.subtitle
						}),
						record.date && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] mt-1",
							style: { color: V2.LIGHT_MUTED },
							children: record.date
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row lg:justify-end gap-2 sm:items-center",
					children: [
						record.value && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-sm sm:min-w-24 sm:text-right",
							style: { color: V2.LIGHT_TEXT },
							children: record.value
						}),
						pending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => openPayment(record),
							className: "h-10 px-4 rounded-full text-xs font-semibold inline-flex items-center justify-center gap-2",
							style: {
								background: V2.TEAL,
								color: V2.TEXT
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Confirmar pagamento"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders/$id",
							search: { edit: false },
							params: { id: record.id },
							className: "h-10 px-4 rounded-full text-xs font-semibold inline-flex items-center justify-center gap-2 border",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_TEXT,
								background: V2.LIGHT_SURFACE_2
							},
							children: "Abrir detalhes"
						})
					]
				})]
			}, record.id);
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!selected,
		onOpenChange: (open) => {
			if (!open) setSelected(null);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Confirmar pagamento — ", selected ? brl(Number((_selected$total2 = selected.total) !== null && _selected$total2 !== void 0 ? _selected$total2 : 0)) : ""] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-3 text-sm",
							style: { borderColor: V2.LIGHT_BORDER },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: (_selected$subtitle = selected === null || selected === void 0 ? void 0 : selected.subtitle) !== null && _selected$subtitle !== void 0 ? _selected$subtitle : "Cliente"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["Pedido ", selected ? orderCodeHash(selected.id, selected.subtitle) : ""]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Forma de pagamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: payTipo,
								onValueChange: (value) => setPayTipo(value),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "PIX",
										children: "PIX"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "CARTAO",
										children: "Cartão"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "DINHEIRO",
										children: "Dinheiro"
									})
								] })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Conta que recebeu" }), bankAccounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Cadastre uma conta bancária no Financeiro antes de confirmar."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: payAccountId,
								onValueChange: setPayAccountId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione a conta" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: bankAccounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: account.id,
									children: [account.nome, account.banco ? ` — ${account.banco}` : ""]
								}, account.id)) })]
							})]
						}),
						payTipo === "CARTAO" && selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Parcelas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: String(payParcelas),
								onValueChange: (value) => setPayParcelas(Number(value)),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Array.from({ length: 12 }, (_, index) => index + 1).map((parcel) => {
									var _selected$total3;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: String(parcel),
										children: [
											parcel,
											"x de ",
											brl(Number((_selected$total3 = selected.total) !== null && _selected$total3 !== void 0 ? _selected$total3 : 0) / parcel)
										]
									}, parcel);
								}) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Ex: comprovante conferido",
								value: payObs,
								onChange: (event) => setPayObs(event.target.value)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-10 px-4 rounded-md border text-sm font-medium",
					onClick: () => setSelected(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					disabled: !payAccountId || confirmPay.isPending,
					onClick: confirmSelectedPayment,
					className: "h-10 px-4 rounded-md text-sm font-semibold disabled:opacity-50 inline-flex items-center justify-center gap-2",
					style: {
						background: V2.TEAL,
						color: V2.TEXT
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" }),
						" ",
						confirmPay.isPending ? "Salvando…" : "Confirmar pagamento"
					]
				})] })
			]
		})
	})] });
}
async function fetchModuleData(moduleKey) {
	switch (moduleKey) {
		case "trips": return fetchTripsData();
		case "visitSale": return fetchVisitSaleData();
		case "orders": return fetchOrdersData();
		case "catalogAdmin": return fetchCatalogData();
		case "prospecting": return fetchProspectingData();
		case "campaigns": return fetchCampaignsData();
		case "whatsappCampaigns": return fetchWhatsappData();
		case "field": return fetchFieldData();
		case "routes": return fetchRoutesData();
		case "finance": return fetchFinanceData();
		case "approvals": return fetchApprovalsData();
		case "crm": return fetchCrmData();
		case "crmAgenda": return fetchCrmAgendaData();
		case "whatsappInbox": return fetchWhatsappInboxData();
		case "whatsappTemplates": return fetchWhatsappTemplatesData();
		case "postSale": return fetchPostSaleData();
		case "bi": return fetchBiData();
		case "ai": return fetchAiData();
		case "automation": return fetchAutomationData();
		case "portal": return fetchPortalData();
		case "settings": return fetchSettingsData();
		case "inventory": return fetchInventoryData();
		case "inventoryAlerts": return fetchInventoryAlertsData();
		case "inventoryCounts": return fetchInventoryCountsData();
		case "financeReconciliation": return fetchFinanceReconciliationData();
		case "companies": return fetchCompaniesData();
		case "adminUsers": return fetchAdminUsersData();
		case "adminPromotions": return fetchAdminPromotionsData();
		case "adminBanners": return fetchAdminBannersData();
		case "adminSalesTargets": return fetchAdminSalesTargetsData();
		case "adminAbandonedCarts": return fetchAdminAbandonedCartsData();
		case "adminPush": return fetchAdminPushData();
	}
}
async function fetchTripsData() {
	var _ref, _total$error, _rows$data;
	const [total, open, rows] = await Promise.all([
		supabase.from("trips").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("trips").select("*", {
			count: "exact",
			head: true
		}).eq("status", "open"),
		supabase.from("trips").select("id,nome,status,cidade,estado,opened_at,created_at").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref = (_total$error = total.error) !== null && _total$error !== void 0 ? _total$error : open.error) !== null && _ref !== void 0 ? _ref : rows.error);
	const records = ((_rows$data = rows.data) !== null && _rows$data !== void 0 ? _rows$data : []).map((row) => {
		var _row$opened_at;
		return {
			id: row.id,
			title: row.nome,
			subtitle: [row.cidade, row.estado].filter(Boolean).join(" — ") || "Sem local informado",
			status: row.status,
			date: formatDate((_row$opened_at = row.opened_at) !== null && _row$opened_at !== void 0 ? _row$opened_at : row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Viagens",
				value: countText(total.count),
				helper: "total cadastrado"
			},
			{
				label: "Abertas",
				value: countText(open.count),
				helper: "em operação"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos registros"
			}
		],
		records
	};
}
async function fetchVisitSaleData() {
	var _ref2, _visits$error, _rows$data2;
	const [visits, leads, rows] = await Promise.all([
		supabase.from("visits").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("leads").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("visits").select("id,created_at,checkin_at,checkout_at,resultado,leads(empresa,contato,cidade,estado)").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref2 = (_visits$error = visits.error) !== null && _visits$error !== void 0 ? _visits$error : leads.error) !== null && _ref2 !== void 0 ? _ref2 : rows.error);
	const records = ((_rows$data2 = rows.data) !== null && _rows$data2 !== void 0 ? _rows$data2 : []).map((row) => {
		var _row$leads$empresa, _row$leads, _row$leads2, _row$leads3, _row$leads4, _row$resultado;
		return {
			id: row.id,
			title: (_row$leads$empresa = (_row$leads = row.leads) === null || _row$leads === void 0 ? void 0 : _row$leads.empresa) !== null && _row$leads$empresa !== void 0 ? _row$leads$empresa : "Visita sem lead vinculado",
			subtitle: [
				(_row$leads2 = row.leads) === null || _row$leads2 === void 0 ? void 0 : _row$leads2.contato,
				(_row$leads3 = row.leads) === null || _row$leads3 === void 0 ? void 0 : _row$leads3.cidade,
				(_row$leads4 = row.leads) === null || _row$leads4 === void 0 ? void 0 : _row$leads4.estado
			].filter(Boolean).join(" · ") || "Atendimento em visita",
			status: (_row$resultado = row.resultado) !== null && _row$resultado !== void 0 ? _row$resultado : row.checkout_at ? "finalizada" : row.checkin_at ? "em visita" : "planejada",
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Visitas",
				value: countText(visits.count),
				helper: "registradas"
			},
			{
				label: "Leads",
				value: countText(leads.count),
				helper: "disponíveis para venda"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas visitas"
			}
		],
		records
	};
}
async function fetchOrdersData() {
	var _ref3, _ref4, _total$error2, _monthRows$data, _rows$data3;
	const month = /* @__PURE__ */ new Date();
	month.setMonth(month.getMonth() - 1);
	const [total, pending, monthRows, rows] = await Promise.all([
		supabase.from("orders").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("orders").select("*", {
			count: "exact",
			head: true
		}).in("status", ["PENDENTE", "AGUARDANDO_PAGAMENTO"]),
		supabase.from("orders").select("total").gte("created_at", month.toISOString()),
		supabase.from("orders").select("id,status,total,company_id,created_at,companies(legal_name,trade_name)").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref3 = (_ref4 = (_total$error2 = total.error) !== null && _total$error2 !== void 0 ? _total$error2 : pending.error) !== null && _ref4 !== void 0 ? _ref4 : monthRows.error) !== null && _ref3 !== void 0 ? _ref3 : rows.error);
	const monthTotal = ((_monthRows$data = monthRows.data) !== null && _monthRows$data !== void 0 ? _monthRows$data : []).reduce((sum, row) => {
		var _row$total;
		return sum + Number((_row$total = row.total) !== null && _row$total !== void 0 ? _row$total : 0);
	}, 0);
	const records = ((_rows$data3 = rows.data) !== null && _rows$data3 !== void 0 ? _rows$data3 : []).map((row) => {
		var _row$companies$trade_, _row$companies, _row$companies2, _ref5, _row$companies$trade_2, _row$companies3, _row$companies4;
		return {
			id: row.id,
			title: orderCodeHash(row.id, (_row$companies$trade_ = (_row$companies = row.companies) === null || _row$companies === void 0 ? void 0 : _row$companies.trade_name) !== null && _row$companies$trade_ !== void 0 ? _row$companies$trade_ : (_row$companies2 = row.companies) === null || _row$companies2 === void 0 ? void 0 : _row$companies2.legal_name),
			subtitle: (_ref5 = (_row$companies$trade_2 = (_row$companies3 = row.companies) === null || _row$companies3 === void 0 ? void 0 : _row$companies3.trade_name) !== null && _row$companies$trade_2 !== void 0 ? _row$companies$trade_2 : (_row$companies4 = row.companies) === null || _row$companies4 === void 0 ? void 0 : _row$companies4.legal_name) !== null && _ref5 !== void 0 ? _ref5 : "Cliente não informado",
			status: row.status,
			value: brl(Number(row.total)),
			date: formatDate(row.created_at),
			total: Number(row.total),
			companyId: row.company_id
		};
	});
	return {
		stats: [
			{
				label: "Pedidos",
				value: countText(total.count),
				helper: "total no sistema"
			},
			{
				label: "Pendentes",
				value: countText(pending.count),
				helper: "aguardando ação"
			},
			{
				label: "Últimos 30 dias",
				value: brl(monthTotal),
				helper: "faturamento bruto"
			}
		],
		records
	};
}
async function fetchCatalogData() {
	var _ref6, _ref7, _total$error3, _stock$data, _rows$data4;
	const [total, active, stock, rows] = await Promise.all([
		supabase.from("products").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("products").select("*", {
			count: "exact",
			head: true
		}).eq("status", true),
		supabase.from("products").select("estoque,estoque_minimo"),
		supabase.from("products").select("id,nome,sku,estoque,estoque_minimo,preco_unitario,status").order("updated_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref6 = (_ref7 = (_total$error3 = total.error) !== null && _total$error3 !== void 0 ? _total$error3 : active.error) !== null && _ref7 !== void 0 ? _ref7 : stock.error) !== null && _ref6 !== void 0 ? _ref6 : rows.error);
	const low = ((_stock$data = stock.data) !== null && _stock$data !== void 0 ? _stock$data : []).filter((row) => Number(row.estoque) > 0 && Number(row.estoque) <= Number(row.estoque_minimo)).length;
	const records = ((_rows$data4 = rows.data) !== null && _rows$data4 !== void 0 ? _rows$data4 : []).map((row) => ({
		id: row.id,
		title: row.nome,
		subtitle: `SKU ${row.sku} · estoque ${row.estoque}`,
		status: row.status ? "ativo" : "inativo",
		value: brl(Number(row.preco_unitario))
	}));
	return {
		stats: [
			{
				label: "Produtos",
				value: countText(total.count),
				helper: "cadastrados"
			},
			{
				label: "Ativos",
				value: countText(active.count),
				helper: "visíveis no catálogo"
			},
			{
				label: "Baixo estoque",
				value: countText(low),
				helper: "abaixo do mínimo"
			}
		],
		records
	};
}
async function fetchProspectingData() {
	var _ref8, _total$error4, _rows$data5;
	const [total, open, rows] = await Promise.all([
		supabase.from("leads").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("leads").select("*", {
			count: "exact",
			head: true
		}).neq("status", "PEDIDO"),
		supabase.from("leads").select("id,empresa,contato,cidade,estado,status,score,created_at").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref8 = (_total$error4 = total.error) !== null && _total$error4 !== void 0 ? _total$error4 : open.error) !== null && _ref8 !== void 0 ? _ref8 : rows.error);
	const records = ((_rows$data5 = rows.data) !== null && _rows$data5 !== void 0 ? _rows$data5 : []).map((row) => ({
		id: row.id,
		title: row.empresa,
		subtitle: [
			row.contato,
			row.cidade,
			row.estado
		].filter(Boolean).join(" · "),
		status: row.status,
		value: `${row.score} pts`,
		date: formatDate(row.created_at)
	}));
	return {
		stats: [
			{
				label: "Leads",
				value: countText(total.count),
				helper: "total captado"
			},
			{
				label: "Em aberto",
				value: countText(open.count),
				helper: "a trabalhar"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos cadastros"
			}
		],
		records
	};
}
async function fetchCampaignsData() {
	var _ref9, _total$error5, _rows$data6;
	const [total, active, rows] = await Promise.all([
		supabase.from("commercial_campaigns").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("commercial_campaigns").select("*", {
			count: "exact",
			head: true
		}).eq("status", "EM_EXECUCAO"),
		supabase.from("commercial_campaigns").select("id,nome,status,objetivo,meta_valor,created_at").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref9 = (_total$error5 = total.error) !== null && _total$error5 !== void 0 ? _total$error5 : active.error) !== null && _ref9 !== void 0 ? _ref9 : rows.error);
	const records = ((_rows$data6 = rows.data) !== null && _rows$data6 !== void 0 ? _rows$data6 : []).map((row) => {
		var _row$objetivo;
		return {
			id: row.id,
			title: row.nome,
			subtitle: (_row$objetivo = row.objetivo) !== null && _row$objetivo !== void 0 ? _row$objetivo : "Campanha comercial",
			status: row.status,
			value: row.meta_valor ? brl(Number(row.meta_valor)) : void 0,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Campanhas",
				value: countText(total.count),
				helper: "total criado"
			},
			{
				label: "Ativas",
				value: countText(active.count),
				helper: "em execução"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas campanhas"
			}
		],
		records
	};
}
async function fetchWhatsappData() {
	var _ref10, _total$error6, _rows$data7;
	const [total, sending, rows] = await Promise.all([
		supabase.from("whatsapp_campaigns").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("whatsapp_campaigns").select("*", {
			count: "exact",
			head: true
		}).eq("status", "SENDING"),
		supabase.from("whatsapp_campaigns").select("id,nome,status,segmento,send_limit,created_at").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref10 = (_total$error6 = total.error) !== null && _total$error6 !== void 0 ? _total$error6 : sending.error) !== null && _ref10 !== void 0 ? _ref10 : rows.error);
	const records = ((_rows$data7 = rows.data) !== null && _rows$data7 !== void 0 ? _rows$data7 : []).map((row) => {
		var _row$segmento;
		return {
			id: row.id,
			title: row.nome,
			subtitle: (_row$segmento = row.segmento) !== null && _row$segmento !== void 0 ? _row$segmento : "Todos os segmentos",
			status: row.status,
			value: row.send_limit ? `${row.send_limit} envios` : void 0,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Campanhas",
				value: countText(total.count),
				helper: "WhatsApp"
			},
			{
				label: "Enviando",
				value: countText(sending.count),
				helper: "em processamento"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos disparos"
			}
		],
		records
	};
}
async function fetchFieldData() {
	var _ref11, _total$error7, _rows$data8;
	const today = /* @__PURE__ */ new Date();
	today.setHours(0, 0, 0, 0);
	const [total, todayCount, rows] = await Promise.all([
		supabase.from("visits").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("visits").select("*", {
			count: "exact",
			head: true
		}).gte("created_at", today.toISOString()),
		supabase.from("visits").select("id,created_at,resultado,duracao_min,leads(empresa,cidade,estado)").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref11 = (_total$error7 = total.error) !== null && _total$error7 !== void 0 ? _total$error7 : todayCount.error) !== null && _ref11 !== void 0 ? _ref11 : rows.error);
	const records = ((_rows$data8 = rows.data) !== null && _rows$data8 !== void 0 ? _rows$data8 : []).map((row) => {
		var _row$leads$empresa2, _row$leads5, _row$leads6, _row$leads7, _row$resultado2;
		return {
			id: row.id,
			title: (_row$leads$empresa2 = (_row$leads5 = row.leads) === null || _row$leads5 === void 0 ? void 0 : _row$leads5.empresa) !== null && _row$leads$empresa2 !== void 0 ? _row$leads$empresa2 : "Visita sem lead",
			subtitle: [(_row$leads6 = row.leads) === null || _row$leads6 === void 0 ? void 0 : _row$leads6.cidade, (_row$leads7 = row.leads) === null || _row$leads7 === void 0 ? void 0 : _row$leads7.estado].filter(Boolean).join(" — ") || "Campo",
			status: (_row$resultado2 = row.resultado) !== null && _row$resultado2 !== void 0 ? _row$resultado2 : "registrada",
			value: row.duracao_min ? `${row.duracao_min} min` : void 0,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Visitas",
				value: countText(total.count),
				helper: "total"
			},
			{
				label: "Hoje",
				value: countText(todayCount.count),
				helper: "registradas"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas ações"
			}
		],
		records
	};
}
async function fetchRoutesData() {
	var _ref12, _total$error8, _rows$data9;
	const [total, active, rows] = await Promise.all([
		supabase.from("route_plans").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("route_plans").select("*", {
			count: "exact",
			head: true
		}).neq("status", "CONCLUIDA"),
		supabase.from("route_plans").select("id,nome,status,cidade,estado,data,created_at").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref12 = (_total$error8 = total.error) !== null && _total$error8 !== void 0 ? _total$error8 : active.error) !== null && _ref12 !== void 0 ? _ref12 : rows.error);
	const records = ((_rows$data9 = rows.data) !== null && _rows$data9 !== void 0 ? _rows$data9 : []).map((row) => {
		var _row$data;
		return {
			id: row.id,
			title: row.nome,
			subtitle: [row.cidade, row.estado].filter(Boolean).join(" — ") || "Rota planejada",
			status: row.status,
			date: formatDate((_row$data = row.data) !== null && _row$data !== void 0 ? _row$data : row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Rotas",
				value: countText(total.count),
				helper: "total"
			},
			{
				label: "Em aberto",
				value: countText(active.count),
				helper: "a executar"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos planos"
			}
		],
		records
	};
}
async function fetchFinanceData() {
	var _ref13, _total$error9, _monthRows$data2, _monthRows$data3, _rows$data10;
	const month = /* @__PURE__ */ new Date();
	month.setMonth(month.getMonth() - 1);
	const [total, monthRows, rows] = await Promise.all([
		supabase.from("financial_entries").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("financial_entries").select("tipo,valor").gte("data", month.toISOString().slice(0, 10)),
		supabase.from("financial_entries").select("id,descricao,tipo,valor,data,created_at").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref13 = (_total$error9 = total.error) !== null && _total$error9 !== void 0 ? _total$error9 : monthRows.error) !== null && _ref13 !== void 0 ? _ref13 : rows.error);
	const receitas = ((_monthRows$data2 = monthRows.data) !== null && _monthRows$data2 !== void 0 ? _monthRows$data2 : []).filter((row) => row.tipo === "RECEITA").reduce((sum, row) => {
		var _row$valor;
		return sum + Number((_row$valor = row.valor) !== null && _row$valor !== void 0 ? _row$valor : 0);
	}, 0);
	const despesas = ((_monthRows$data3 = monthRows.data) !== null && _monthRows$data3 !== void 0 ? _monthRows$data3 : []).filter((row) => row.tipo === "DESPESA").reduce((sum, row) => {
		var _row$valor2;
		return sum + Number((_row$valor2 = row.valor) !== null && _row$valor2 !== void 0 ? _row$valor2 : 0);
	}, 0);
	const records = ((_rows$data10 = rows.data) !== null && _rows$data10 !== void 0 ? _rows$data10 : []).map((row) => {
		var _row$data2;
		return {
			id: row.id,
			title: row.descricao,
			subtitle: row.tipo,
			status: row.tipo,
			value: brl(Number(row.valor)),
			date: formatDate((_row$data2 = row.data) !== null && _row$data2 !== void 0 ? _row$data2 : row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Lançamentos",
				value: countText(total.count),
				helper: "total"
			},
			{
				label: "Receitas 30d",
				value: brl(receitas),
				helper: "entradas"
			},
			{
				label: "Despesas 30d",
				value: brl(despesas),
				helper: "saídas"
			}
		],
		records
	};
}
async function fetchApprovalsData() {
	var _ref14, _pendingCompanies$err, _rows$data11;
	const [pendingCompanies, pendingOrders, rows] = await Promise.all([
		supabase.from("companies").select("*", {
			count: "exact",
			head: true
		}).eq("status", "pending"),
		supabase.from("orders").select("*", {
			count: "exact",
			head: true
		}).in("status", ["PENDENTE", "AGUARDANDO_PAGAMENTO"]),
		supabase.from("companies").select("id,legal_name,trade_name,phone,status,created_at").eq("status", "pending").order("created_at", { ascending: false }).limit(200)
	]);
	assertNoError((_ref14 = (_pendingCompanies$err = pendingCompanies.error) !== null && _pendingCompanies$err !== void 0 ? _pendingCompanies$err : pendingOrders.error) !== null && _ref14 !== void 0 ? _ref14 : rows.error);
	const records = ((_rows$data11 = rows.data) !== null && _rows$data11 !== void 0 ? _rows$data11 : []).map((row) => {
		var _row$trade_name;
		return {
			id: row.id,
			title: (_row$trade_name = row.trade_name) !== null && _row$trade_name !== void 0 ? _row$trade_name : row.legal_name,
			subtitle: row.phone,
			status: row.status,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Empresas",
				value: countText(pendingCompanies.count),
				helper: "pendentes"
			},
			{
				label: "Pedidos",
				value: countText(pendingOrders.count),
				helper: "aguardando"
			},
			{
				label: "Fila",
				value: countText(records.length),
				helper: "cadastros recentes"
			}
		],
		records
	};
}
async function fetchCrmData() {
	var _ref15, _total$error10, _rows$data12;
	const [total, active, rows] = await Promise.all([
		supabase.from("leads").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("leads").select("*", {
			count: "exact",
			head: true
		}).not("status", "in", "(PEDIDO,CLIENTE)"),
		supabase.from("leads").select("id,empresa,contato,status,cidade,estado,score,ultimo_contato,created_at").order("updated_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref15 = (_total$error10 = total.error) !== null && _total$error10 !== void 0 ? _total$error10 : active.error) !== null && _ref15 !== void 0 ? _ref15 : rows.error);
	const records = ((_rows$data12 = rows.data) !== null && _rows$data12 !== void 0 ? _rows$data12 : []).map((row) => {
		var _row$score, _row$ultimo_contato;
		return {
			id: row.id,
			title: row.empresa,
			subtitle: [
				row.contato,
				row.cidade,
				row.estado
			].filter(Boolean).join(" · "),
			status: row.status,
			value: `${(_row$score = row.score) !== null && _row$score !== void 0 ? _row$score : 0} pts`,
			date: formatDate((_row$ultimo_contato = row.ultimo_contato) !== null && _row$ultimo_contato !== void 0 ? _row$ultimo_contato : row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Leads",
				value: countText(total.count),
				helper: "no funil"
			},
			{
				label: "Em aberto",
				value: countText(active.count),
				helper: "sem pedido ainda"
			},
			{
				label: "Movimentados",
				value: countText(records.length),
				helper: "recentes"
			}
		],
		records
	};
}
async function fetchCrmAgendaData() {
	var _ref16, _total$error11, _rows$data13;
	const [total, pending, rows] = await Promise.all([
		supabase.from("lead_tasks").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("lead_tasks").select("*", {
			count: "exact",
			head: true
		}).eq("status", "PENDENTE"),
		supabase.from("lead_tasks").select("id,titulo,data,hora,status,leads(empresa)").order("data", { ascending: true }).limit(10)
	]);
	assertNoError((_ref16 = (_total$error11 = total.error) !== null && _total$error11 !== void 0 ? _total$error11 : pending.error) !== null && _ref16 !== void 0 ? _ref16 : rows.error);
	const records = ((_rows$data13 = rows.data) !== null && _rows$data13 !== void 0 ? _rows$data13 : []).map((row) => {
		var _row$leads$empresa3, _row$leads8;
		return {
			id: row.id,
			title: row.titulo,
			subtitle: (_row$leads$empresa3 = (_row$leads8 = row.leads) === null || _row$leads8 === void 0 ? void 0 : _row$leads8.empresa) !== null && _row$leads$empresa3 !== void 0 ? _row$leads$empresa3 : "Sem lead vinculado",
			status: row.status,
			date: [formatDate(row.data), row.hora].filter(Boolean).join(" · ") || void 0
		};
	});
	return {
		stats: [
			{
				label: "Tarefas",
				value: countText(total.count),
				helper: "cadastradas"
			},
			{
				label: "Pendentes",
				value: countText(pending.count),
				helper: "a executar"
			},
			{
				label: "Próximas",
				value: countText(records.length),
				helper: "no radar"
			}
		],
		records
	};
}
async function fetchWhatsappInboxData() {
	var _ref17, _total$error12, _rows$data14;
	const [total, unread, rows] = await Promise.all([
		supabase.from("whatsapp_conversations").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("whatsapp_conversations").select("*", {
			count: "exact",
			head: true
		}).gt("unread_count", 0),
		supabase.from("whatsapp_conversations").select("id,phone,contact_name,last_message_preview,last_message_at,unread_count,status").order("last_message_at", {
			ascending: false,
			nullsFirst: false
		}).limit(10)
	]);
	assertNoError((_ref17 = (_total$error12 = total.error) !== null && _total$error12 !== void 0 ? _total$error12 : unread.error) !== null && _ref17 !== void 0 ? _ref17 : rows.error);
	const records = ((_rows$data14 = rows.data) !== null && _rows$data14 !== void 0 ? _rows$data14 : []).map((row) => {
		var _row$contact_name, _row$last_message_pre, _row$status;
		return {
			id: row.id,
			title: (_row$contact_name = row.contact_name) !== null && _row$contact_name !== void 0 ? _row$contact_name : row.phone,
			subtitle: (_row$last_message_pre = row.last_message_preview) !== null && _row$last_message_pre !== void 0 ? _row$last_message_pre : "Sem prévia",
			status: (_row$status = row.status) !== null && _row$status !== void 0 ? _row$status : void 0,
			value: row.unread_count > 0 ? `${row.unread_count} novas` : void 0,
			date: formatDate(row.last_message_at)
		};
	});
	return {
		stats: [
			{
				label: "Conversas",
				value: countText(total.count),
				helper: "totais"
			},
			{
				label: "Não lidas",
				value: countText(unread.count),
				helper: "aguardando resposta"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos contatos"
			}
		],
		records
	};
}
async function fetchWhatsappTemplatesData() {
	var _ref18, _total$error13, _rows$data15, _rows$data16;
	const [total, active, rows] = await Promise.all([
		supabase.from("whatsapp_templates").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("whatsapp_templates").select("*", {
			count: "exact",
			head: true
		}).eq("ativo", true),
		supabase.from("whatsapp_templates").select("id,nome,categoria,ativo,updated_at").order("updated_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref18 = (_total$error13 = total.error) !== null && _total$error13 !== void 0 ? _total$error13 : active.error) !== null && _ref18 !== void 0 ? _ref18 : rows.error);
	const records = ((_rows$data15 = rows.data) !== null && _rows$data15 !== void 0 ? _rows$data15 : []).map((row) => {
		var _row$categoria;
		return {
			id: row.id,
			title: row.nome,
			subtitle: (_row$categoria = row.categoria) !== null && _row$categoria !== void 0 ? _row$categoria : "Sem categoria",
			status: row.ativo ? "ativo" : "inativo",
			date: formatDate(row.updated_at)
		};
	});
	return {
		stats: [
			{
				label: "Templates",
				value: countText(total.count),
				helper: "cadastrados"
			},
			{
				label: "Ativos",
				value: countText(active.count),
				helper: "em uso"
			},
			{
				label: "Categorias",
				value: countText(new Set(((_rows$data16 = rows.data) !== null && _rows$data16 !== void 0 ? _rows$data16 : []).map((r) => r.categoria)).size),
				helper: "no total"
			}
		],
		records
	};
}
async function fetchPostSaleData() {
	var _ref19, _total$error14, _rows$data17;
	const [total, pending, rows] = await Promise.all([
		supabase.from("post_sale_messages").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("post_sale_messages").select("*", {
			count: "exact",
			head: true
		}).eq("status", "PENDING"),
		supabase.from("post_sale_messages").select("id,phone,status,send_at,sent_at").order("send_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref19 = (_total$error14 = total.error) !== null && _total$error14 !== void 0 ? _total$error14 : pending.error) !== null && _ref19 !== void 0 ? _ref19 : rows.error);
	const records = ((_rows$data17 = rows.data) !== null && _rows$data17 !== void 0 ? _rows$data17 : []).map((row) => {
		var _row$phone;
		return {
			id: row.id,
			title: (_row$phone = row.phone) !== null && _row$phone !== void 0 ? _row$phone : "Sem telefone",
			subtitle: `Envio programado ${formatDate(row.send_at)}`,
			status: row.status,
			date: row.sent_at ? `Enviado ${formatDate(row.sent_at)}` : void 0
		};
	});
	return {
		stats: [
			{
				label: "Mensagens",
				value: countText(total.count),
				helper: "no pipeline"
			},
			{
				label: "Pendentes",
				value: countText(pending.count),
				helper: "aguardando envio"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos gatilhos"
			}
		],
		records
	};
}
async function fetchBiData() {
	var _ref20, _total$error15, _rows$data18;
	const [total, shared, rows] = await Promise.all([
		supabase.from("dashboards").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("dashboards").select("*", {
			count: "exact",
			head: true
		}).eq("is_shared", true),
		supabase.from("dashboards").select("id,nome,tipo,is_shared,updated_at").order("updated_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref20 = (_total$error15 = total.error) !== null && _total$error15 !== void 0 ? _total$error15 : shared.error) !== null && _ref20 !== void 0 ? _ref20 : rows.error);
	const records = ((_rows$data18 = rows.data) !== null && _rows$data18 !== void 0 ? _rows$data18 : []).map((row) => {
		var _row$tipo;
		return {
			id: row.id,
			title: row.nome,
			subtitle: (_row$tipo = row.tipo) !== null && _row$tipo !== void 0 ? _row$tipo : "Dashboard",
			status: row.is_shared ? "compartilhado" : "privado",
			date: formatDate(row.updated_at)
		};
	});
	return {
		stats: [
			{
				label: "Dashboards",
				value: countText(total.count),
				helper: "criados"
			},
			{
				label: "Compartilhados",
				value: countText(shared.count),
				helper: "com equipe"
			},
			{
				label: "Atualizados",
				value: countText(records.length),
				helper: "recentes"
			}
		],
		records
	};
}
async function fetchAiData() {
	var _ref21, _total$error16, _rows$data19;
	const [total, high, rows] = await Promise.all([
		supabase.from("ai_recommendations").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("ai_recommendations").select("*", {
			count: "exact",
			head: true
		}).eq("prioridade", "ALTA"),
		supabase.from("ai_recommendations").select("id,titulo,descricao,tipo,prioridade,status,created_at").order("created_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref21 = (_total$error16 = total.error) !== null && _total$error16 !== void 0 ? _total$error16 : high.error) !== null && _ref21 !== void 0 ? _ref21 : rows.error);
	const records = ((_rows$data19 = rows.data) !== null && _rows$data19 !== void 0 ? _rows$data19 : []).map((row) => {
		var _row$descricao, _row$prioridade;
		return {
			id: row.id,
			title: row.titulo,
			subtitle: (_row$descricao = row.descricao) !== null && _row$descricao !== void 0 ? _row$descricao : row.tipo,
			status: (_row$prioridade = row.prioridade) !== null && _row$prioridade !== void 0 ? _row$prioridade : row.status,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Recomendações",
				value: countText(total.count),
				helper: "geradas"
			},
			{
				label: "Alta prioridade",
				value: countText(high.count),
				helper: "para ação"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas"
			}
		],
		records
	};
}
async function fetchAutomationData() {
	var _ref22, _total$error17, _rows$data20;
	const [total, active, rows] = await Promise.all([
		supabase.from("workflows").select("*", {
			count: "exact",
			head: true
		}).is("deleted_at", null),
		supabase.from("workflows").select("*", {
			count: "exact",
			head: true
		}).eq("status", "ATIVO").is("deleted_at", null),
		supabase.from("workflows").select("id,nome,categoria,status,execucoes_count,falhas_count,last_run_at").is("deleted_at", null).order("last_run_at", {
			ascending: false,
			nullsFirst: false
		}).limit(10)
	]);
	assertNoError((_ref22 = (_total$error17 = total.error) !== null && _total$error17 !== void 0 ? _total$error17 : active.error) !== null && _ref22 !== void 0 ? _ref22 : rows.error);
	const records = ((_rows$data20 = rows.data) !== null && _rows$data20 !== void 0 ? _rows$data20 : []).map((row) => {
		var _row$categoria2, _row$execucoes_count, _row$falhas_count;
		return {
			id: row.id,
			title: row.nome,
			subtitle: (_row$categoria2 = row.categoria) !== null && _row$categoria2 !== void 0 ? _row$categoria2 : "Workflow",
			status: row.status,
			value: `${(_row$execucoes_count = row.execucoes_count) !== null && _row$execucoes_count !== void 0 ? _row$execucoes_count : 0} execuções · ${(_row$falhas_count = row.falhas_count) !== null && _row$falhas_count !== void 0 ? _row$falhas_count : 0} falhas`,
			date: formatDate(row.last_run_at)
		};
	});
	return {
		stats: [
			{
				label: "Workflows",
				value: countText(total.count),
				helper: "cadastrados"
			},
			{
				label: "Ativos",
				value: countText(active.count),
				helper: "em execução"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas execuções"
			}
		],
		records
	};
}
async function fetchPortalData() {
	var _ref23, _total$error18, _rows$data21;
	const [total, open, rows] = await Promise.all([
		supabase.from("customer_support").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("customer_support").select("*", {
			count: "exact",
			head: true
		}).in("status", ["ABERTO", "EM_ANDAMENTO"]),
		supabase.from("customer_support").select("id,assunto,canal,status,prioridade,created_at").order("created_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref23 = (_total$error18 = total.error) !== null && _total$error18 !== void 0 ? _total$error18 : open.error) !== null && _ref23 !== void 0 ? _ref23 : rows.error);
	const records = ((_rows$data21 = rows.data) !== null && _rows$data21 !== void 0 ? _rows$data21 : []).map((row) => {
		var _row$canal, _row$prioridade2;
		return {
			id: row.id,
			title: row.assunto,
			subtitle: `${(_row$canal = row.canal) !== null && _row$canal !== void 0 ? _row$canal : "portal"} · ${(_row$prioridade2 = row.prioridade) !== null && _row$prioridade2 !== void 0 ? _row$prioridade2 : "normal"}`,
			status: row.status,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Chamados",
				value: countText(total.count),
				helper: "total"
			},
			{
				label: "Abertos",
				value: countText(open.count),
				helper: "aguardando"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos contatos"
			}
		],
		records
	};
}
async function fetchSettingsData() {
	var _total$error19, _rows$data22, _rows$data23;
	const [total, rows] = await Promise.all([supabase.from("system_settings").select("*", {
		count: "exact",
		head: true
	}), supabase.from("system_settings").select("id,categoria,chave,valor,updated_at").order("updated_at", { ascending: false }).limit(10)]);
	assertNoError((_total$error19 = total.error) !== null && _total$error19 !== void 0 ? _total$error19 : rows.error);
	const cats = new Set(((_rows$data22 = rows.data) !== null && _rows$data22 !== void 0 ? _rows$data22 : []).map((r) => r.categoria)).size;
	const records = ((_rows$data23 = rows.data) !== null && _rows$data23 !== void 0 ? _rows$data23 : []).map((row) => {
		var _row$categoria3;
		return {
			id: row.id,
			title: row.chave,
			subtitle: (_row$categoria3 = row.categoria) !== null && _row$categoria3 !== void 0 ? _row$categoria3 : "Sistema",
			value: typeof row.valor === "string" ? row.valor : JSON.stringify(row.valor).slice(0, 40),
			date: formatDate(row.updated_at)
		};
	});
	return {
		stats: [
			{
				label: "Ajustes",
				value: countText(total.count),
				helper: "cadastrados"
			},
			{
				label: "Categorias",
				value: countText(cats),
				helper: "distintas"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "editados"
			}
		],
		records
	};
}
async function fetchInventoryData() {
	var _ref24, _total$error20, _movRows$data;
	const [total, adjustments, movRows] = await Promise.all([
		supabase.from("inventory_counts").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("inventory_counts").select("*", {
			count: "exact",
			head: true
		}).not("aprovado_em", "is", null),
		supabase.from("stock_movements").select("id,tipo,quantidade,motivo,created_at,products(nome)").order("created_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref24 = (_total$error20 = total.error) !== null && _total$error20 !== void 0 ? _total$error20 : adjustments.error) !== null && _ref24 !== void 0 ? _ref24 : movRows.error);
	const records = ((_movRows$data = movRows.data) !== null && _movRows$data !== void 0 ? _movRows$data : []).map((row) => {
		var _row$products$nome, _row$products, _row$motivo;
		return {
			id: row.id,
			title: (_row$products$nome = (_row$products = row.products) === null || _row$products === void 0 ? void 0 : _row$products.nome) !== null && _row$products$nome !== void 0 ? _row$products$nome : "Produto removido",
			subtitle: (_row$motivo = row.motivo) !== null && _row$motivo !== void 0 ? _row$motivo : "Movimentação",
			status: row.tipo,
			value: `${row.quantidade} un`,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Contagens",
				value: countText(total.count),
				helper: "registradas"
			},
			{
				label: "Aprovadas",
				value: countText(adjustments.count),
				helper: "com ajuste aplicado"
			},
			{
				label: "Movimentos",
				value: countText(records.length),
				helper: "recentes"
			}
		],
		records
	};
}
async function fetchInventoryAlertsData() {
	const { data, error } = await supabase.from("products").select("id,nome,sku,estoque,estoque_minimo,updated_at").order("estoque", { ascending: true }).limit(200);
	assertNoError(error);
	const low = (data !== null && data !== void 0 ? data : []).filter((row) => Number(row.estoque) > 0 && Number(row.estoque) <= Number(row.estoque_minimo));
	const zero = (data !== null && data !== void 0 ? data : []).filter((row) => Number(row.estoque) <= 0);
	const records = [...zero, ...low].slice(0, 10).map((row) => ({
		id: row.id,
		title: row.nome,
		subtitle: `SKU ${row.sku} · mínimo ${row.estoque_minimo}`,
		status: Number(row.estoque) <= 0 ? "zerado" : "baixo",
		value: `${row.estoque} un`,
		date: formatDate(row.updated_at)
	}));
	return {
		stats: [
			{
				label: "Zerados",
				value: countText(zero.length),
				helper: "sem estoque"
			},
			{
				label: "Abaixo do mínimo",
				value: countText(low.length),
				helper: "críticos"
			},
			{
				label: "Total monitorado",
				value: countText((data !== null && data !== void 0 ? data : []).length),
				helper: "produtos"
			}
		],
		records
	};
}
async function fetchInventoryCountsData() {
	var _ref25, _total$error21, _rows$data24;
	const [total, pending, rows] = await Promise.all([
		supabase.from("inventory_counts").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("inventory_counts").select("*", {
			count: "exact",
			head: true
		}).is("aprovado_em", null),
		supabase.from("inventory_counts").select("id,tipo,quantidade_sistema,quantidade_contada,diferenca,created_at,aprovado_em,products(nome)").order("created_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref25 = (_total$error21 = total.error) !== null && _total$error21 !== void 0 ? _total$error21 : pending.error) !== null && _ref25 !== void 0 ? _ref25 : rows.error);
	const records = ((_rows$data24 = rows.data) !== null && _rows$data24 !== void 0 ? _rows$data24 : []).map((row) => {
		var _row$products$nome2, _row$products2, _row$tipo2, _row$quantidade_siste, _row$quantidade_conta, _row$diferenca;
		return {
			id: row.id,
			title: (_row$products$nome2 = (_row$products2 = row.products) === null || _row$products2 === void 0 ? void 0 : _row$products2.nome) !== null && _row$products$nome2 !== void 0 ? _row$products$nome2 : "Produto removido",
			subtitle: `${(_row$tipo2 = row.tipo) !== null && _row$tipo2 !== void 0 ? _row$tipo2 : "contagem"} · sistema ${(_row$quantidade_siste = row.quantidade_sistema) !== null && _row$quantidade_siste !== void 0 ? _row$quantidade_siste : 0} × contado ${(_row$quantidade_conta = row.quantidade_contada) !== null && _row$quantidade_conta !== void 0 ? _row$quantidade_conta : 0}`,
			status: row.aprovado_em ? "aprovada" : "pendente",
			value: `Δ ${(_row$diferenca = row.diferenca) !== null && _row$diferenca !== void 0 ? _row$diferenca : 0}`,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Contagens",
				value: countText(total.count),
				helper: "totais"
			},
			{
				label: "Pendentes",
				value: countText(pending.count),
				helper: "sem aprovação"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas"
			}
		],
		records
	};
}
async function fetchFinanceReconciliationData() {
	var _ref26, _total$error22, _rows$data25;
	const [total, notReconciled, rows] = await Promise.all([
		supabase.from("bank_statements").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("bank_statements").select("*", {
			count: "exact",
			head: true
		}).eq("conciliado", false),
		supabase.from("bank_statements").select("id,descricao,valor,tipo,data,conciliado").order("data", { ascending: false }).limit(10)
	]);
	assertNoError((_ref26 = (_total$error22 = total.error) !== null && _total$error22 !== void 0 ? _total$error22 : notReconciled.error) !== null && _ref26 !== void 0 ? _ref26 : rows.error);
	const records = ((_rows$data25 = rows.data) !== null && _rows$data25 !== void 0 ? _rows$data25 : []).map((row) => {
		var _row$descricao2, _row$tipo3;
		return {
			id: row.id,
			title: (_row$descricao2 = row.descricao) !== null && _row$descricao2 !== void 0 ? _row$descricao2 : "Lançamento bancário",
			subtitle: (_row$tipo3 = row.tipo) !== null && _row$tipo3 !== void 0 ? _row$tipo3 : "extrato",
			status: row.conciliado ? "conciliado" : "pendente",
			value: brl(Number(row.valor)),
			date: formatDate(row.data)
		};
	});
	return {
		stats: [
			{
				label: "Extratos",
				value: countText(total.count),
				helper: "importados"
			},
			{
				label: "Pendentes",
				value: countText(notReconciled.count),
				helper: "sem match"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos lançamentos"
			}
		],
		records
	};
}
async function fetchCompaniesData() {
	var _ref27, _total$error23, _rows$data26;
	const [total, approved, rows] = await Promise.all([
		supabase.from("companies").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("companies").select("*", {
			count: "exact",
			head: true
		}).eq("status", "approved"),
		supabase.from("companies").select("id,legal_name,trade_name,phone,cidade,estado,status,created_at").order("created_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref27 = (_total$error23 = total.error) !== null && _total$error23 !== void 0 ? _total$error23 : approved.error) !== null && _ref27 !== void 0 ? _ref27 : rows.error);
	const records = ((_rows$data26 = rows.data) !== null && _rows$data26 !== void 0 ? _rows$data26 : []).map((row) => {
		var _row$trade_name2;
		return {
			id: row.id,
			title: (_row$trade_name2 = row.trade_name) !== null && _row$trade_name2 !== void 0 ? _row$trade_name2 : row.legal_name,
			subtitle: [
				row.phone,
				row.cidade,
				row.estado
			].filter(Boolean).join(" · "),
			status: row.status,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Empresas",
				value: countText(total.count),
				helper: "cadastradas"
			},
			{
				label: "Aprovadas",
				value: countText(approved.count),
				helper: "ativas"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos cadastros"
			}
		],
		records
	};
}
async function fetchAdminUsersData() {
	var _ref28, _total$error24, _roles$data, _rows$data27;
	const [total, roles, rows] = await Promise.all([
		supabase.from("profiles").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("user_roles").select("role,user_id"),
		supabase.from("profiles").select("id,full_name,cargo,telefone,status,created_at").order("created_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref28 = (_total$error24 = total.error) !== null && _total$error24 !== void 0 ? _total$error24 : roles.error) !== null && _ref28 !== void 0 ? _ref28 : rows.error);
	const admins = ((_roles$data = roles.data) !== null && _roles$data !== void 0 ? _roles$data : []).filter((r) => r.role === "admin").length;
	const records = ((_rows$data27 = rows.data) !== null && _rows$data27 !== void 0 ? _rows$data27 : []).map((row) => {
		var _row$full_name, _row$status2;
		return {
			id: row.id,
			title: (_row$full_name = row.full_name) !== null && _row$full_name !== void 0 ? _row$full_name : "Sem nome",
			subtitle: [row.cargo, row.telefone].filter(Boolean).join(" · ") || "Sem dados",
			status: (_row$status2 = row.status) !== null && _row$status2 !== void 0 ? _row$status2 : void 0,
			date: formatDate(row.created_at)
		};
	});
	return {
		stats: [
			{
				label: "Usuários",
				value: countText(total.count),
				helper: "cadastrados"
			},
			{
				label: "Admins",
				value: countText(admins),
				helper: "com privilégio"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos"
			}
		],
		records
	};
}
async function fetchAdminPromotionsData() {
	var _ref29, _total$error25, _rows$data28;
	const [total, active, rows] = await Promise.all([
		supabase.from("promotions").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("promotions").select("*", {
			count: "exact",
			head: true
		}).eq("ativo", true),
		supabase.from("promotions").select("id,titulo,desconto_percentual,ativo,valido_de,valido_ate").order("ordem", { ascending: true }).limit(10)
	]);
	assertNoError((_ref29 = (_total$error25 = total.error) !== null && _total$error25 !== void 0 ? _total$error25 : active.error) !== null && _ref29 !== void 0 ? _ref29 : rows.error);
	const records = ((_rows$data28 = rows.data) !== null && _rows$data28 !== void 0 ? _rows$data28 : []).map((row) => {
		var _row$desconto_percent;
		return {
			id: row.id,
			title: row.titulo,
			subtitle: `${(_row$desconto_percent = row.desconto_percentual) !== null && _row$desconto_percent !== void 0 ? _row$desconto_percent : 0}% · ${formatDate(row.valido_de)} → ${formatDate(row.valido_ate)}`,
			status: row.ativo ? "ativa" : "inativa"
		};
	});
	return {
		stats: [
			{
				label: "Promoções",
				value: countText(total.count),
				helper: "criadas"
			},
			{
				label: "Ativas",
				value: countText(active.count),
				helper: "no ar"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas"
			}
		],
		records
	};
}
async function fetchAdminBannersData() {
	var _ref30, _total$error26, _rows$data29;
	const [total, active, rows] = await Promise.all([
		supabase.from("hero_slides").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("hero_slides").select("*", {
			count: "exact",
			head: true
		}).eq("ativo", true),
		supabase.from("hero_slides").select("id,titulo,subtitulo,cta_label,ativo,updated_at").order("ordem", { ascending: true }).limit(10)
	]);
	assertNoError((_ref30 = (_total$error26 = total.error) !== null && _total$error26 !== void 0 ? _total$error26 : active.error) !== null && _ref30 !== void 0 ? _ref30 : rows.error);
	const records = ((_rows$data29 = rows.data) !== null && _rows$data29 !== void 0 ? _rows$data29 : []).map((row) => {
		var _row$titulo, _ref31, _row$subtitulo;
		return {
			id: row.id,
			title: (_row$titulo = row.titulo) !== null && _row$titulo !== void 0 ? _row$titulo : "Sem título",
			subtitle: (_ref31 = (_row$subtitulo = row.subtitulo) !== null && _row$subtitulo !== void 0 ? _row$subtitulo : row.cta_label) !== null && _ref31 !== void 0 ? _ref31 : "Banner do site",
			status: row.ativo ? "publicado" : "rascunho",
			date: formatDate(row.updated_at)
		};
	});
	return {
		stats: [
			{
				label: "Banners",
				value: countText(total.count),
				helper: "cadastrados"
			},
			{
				label: "Ativos",
				value: countText(active.count),
				helper: "no site"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "editados"
			}
		],
		records
	};
}
async function fetchAdminSalesTargetsData() {
	var _total$error27, _rows$data30, _rows$data31;
	const [total, rows] = await Promise.all([supabase.from("sales_targets").select("*", {
		count: "exact",
		head: true
	}), supabase.from("sales_targets").select("id,vendedor_id,mes_ref,meta_valor,meta_qtd_pedidos,observacao,created_at").order("mes_ref", { ascending: false }).limit(10)]);
	assertNoError((_total$error27 = total.error) !== null && _total$error27 !== void 0 ? _total$error27 : rows.error);
	const vendedorIds = Array.from(new Set(((_rows$data30 = rows.data) !== null && _rows$data30 !== void 0 ? _rows$data30 : []).map((r) => r.vendedor_id).filter(Boolean)));
	const profilesById = /* @__PURE__ */ new Map();
	if (vendedorIds.length > 0) {
		const { data: profs } = await supabase.from("profiles").select("id,full_name").in("id", vendedorIds);
		(profs !== null && profs !== void 0 ? profs : []).forEach((p) => {
			var _p$full_name;
			return profilesById.set(p.id, (_p$full_name = p.full_name) !== null && _p$full_name !== void 0 ? _p$full_name : "");
		});
	}
	const records = ((_rows$data31 = rows.data) !== null && _rows$data31 !== void 0 ? _rows$data31 : []).map((row) => {
		var _row$observacao, _row$meta_qtd_pedidos;
		return {
			id: row.id,
			title: profilesById.get(row.vendedor_id) || "Sem vendedor",
			subtitle: (_row$observacao = row.observacao) !== null && _row$observacao !== void 0 ? _row$observacao : `Meta ${(_row$meta_qtd_pedidos = row.meta_qtd_pedidos) !== null && _row$meta_qtd_pedidos !== void 0 ? _row$meta_qtd_pedidos : 0} pedidos`,
			value: row.meta_valor ? brl(Number(row.meta_valor)) : void 0,
			date: row.mes_ref
		};
	});
	return {
		stats: [
			{
				label: "Metas",
				value: countText(total.count),
				helper: "cadastradas"
			},
			{
				label: "Vendedores",
				value: countText(new Set(records.map((r) => r.title)).size),
				helper: "com meta"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas"
			}
		],
		records
	};
}
async function fetchAdminAbandonedCartsData() {
	var _ref32, _total$error28, _rows$data32;
	const [total, recovered, rows] = await Promise.all([
		supabase.from("abandoned_carts").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("abandoned_carts").select("*", {
			count: "exact",
			head: true
		}).not("recovered_at", "is", null),
		supabase.from("abandoned_carts").select("id,total,last_activity,recovered_at,notified_at,companies(legal_name,trade_name)").order("last_activity", { ascending: false }).limit(10)
	]);
	assertNoError((_ref32 = (_total$error28 = total.error) !== null && _total$error28 !== void 0 ? _total$error28 : recovered.error) !== null && _ref32 !== void 0 ? _ref32 : rows.error);
	const records = ((_rows$data32 = rows.data) !== null && _rows$data32 !== void 0 ? _rows$data32 : []).map((row) => {
		var _ref33, _row$companies$trade_3, _row$companies5, _row$companies6, _row$total2;
		return {
			id: row.id,
			title: (_ref33 = (_row$companies$trade_3 = (_row$companies5 = row.companies) === null || _row$companies5 === void 0 ? void 0 : _row$companies5.trade_name) !== null && _row$companies$trade_3 !== void 0 ? _row$companies$trade_3 : (_row$companies6 = row.companies) === null || _row$companies6 === void 0 ? void 0 : _row$companies6.legal_name) !== null && _ref33 !== void 0 ? _ref33 : "Visitante anônimo",
			subtitle: row.notified_at ? `Notificado ${formatDate(row.notified_at)}` : "Sem notificação enviada",
			status: row.recovered_at ? "recuperado" : "aberto",
			value: brl(Number((_row$total2 = row.total) !== null && _row$total2 !== void 0 ? _row$total2 : 0)),
			date: formatDate(row.last_activity)
		};
	});
	return {
		stats: [
			{
				label: "Carrinhos",
				value: countText(total.count),
				helper: "abandonados"
			},
			{
				label: "Recuperados",
				value: countText(recovered.count),
				helper: "com pedido"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimos"
			}
		],
		records
	};
}
async function fetchAdminPushData() {
	var _ref34, _total$error29, _rows$data33;
	const [total, sent, rows] = await Promise.all([
		supabase.from("push_campaigns").select("*", {
			count: "exact",
			head: true
		}),
		supabase.from("push_campaigns").select("*", {
			count: "exact",
			head: true
		}).eq("status", "DONE"),
		supabase.from("push_campaigns").select("id,titulo,segmento,status,scheduled_at,sent_at,total,enviados,falhas").order("created_at", { ascending: false }).limit(10)
	]);
	assertNoError((_ref34 = (_total$error29 = total.error) !== null && _total$error29 !== void 0 ? _total$error29 : sent.error) !== null && _ref34 !== void 0 ? _ref34 : rows.error);
	const records = ((_rows$data33 = rows.data) !== null && _rows$data33 !== void 0 ? _rows$data33 : []).map((row) => {
		var _row$titulo2, _row$segmento2, _row$enviados, _row$total3, _row$falhas, _row$sent_at;
		return {
			id: row.id,
			title: (_row$titulo2 = row.titulo) !== null && _row$titulo2 !== void 0 ? _row$titulo2 : "Sem título",
			subtitle: `${(_row$segmento2 = row.segmento) !== null && _row$segmento2 !== void 0 ? _row$segmento2 : "todos"} · ${(_row$enviados = row.enviados) !== null && _row$enviados !== void 0 ? _row$enviados : 0}/${(_row$total3 = row.total) !== null && _row$total3 !== void 0 ? _row$total3 : 0} enviados · ${(_row$falhas = row.falhas) !== null && _row$falhas !== void 0 ? _row$falhas : 0} falhas`,
			status: row.status,
			date: formatDate((_row$sent_at = row.sent_at) !== null && _row$sent_at !== void 0 ? _row$sent_at : row.scheduled_at)
		};
	});
	return {
		stats: [
			{
				label: "Campanhas",
				value: countText(total.count),
				helper: "totais"
			},
			{
				label: "Enviadas",
				value: countText(sent.count),
				helper: "concluídas"
			},
			{
				label: "Recentes",
				value: countText(records.length),
				helper: "últimas"
			}
		],
		records
	};
}
function countText(value) {
	return String(value !== null && value !== void 0 ? value : 0);
}
function assertNoError(error) {
	if (error) throw error;
}
//#endregion
export { V2ModulePage as t };
