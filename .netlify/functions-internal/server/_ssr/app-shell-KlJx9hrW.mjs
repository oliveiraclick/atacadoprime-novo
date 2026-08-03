import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime, d as DialogContent, f as DialogDescription, h as DialogTitle, l as Dialog, m as DialogPortal, p as DialogOverlay, u as DialogClose } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link, l as useRouterState, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { i as useRoles, r as useProfile, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { B as RefreshCw, C as SquareDashed, E as ShoppingCart, Gt as CircleUser, It as DollarSign, N as Search, O as Shield, Qt as ChevronDown, Ut as ClipboardList, Vt as CloudOff, Xt as ChevronRight, Y as Pencil, Z as Package, an as Briefcase, at as Megaphone, c as Users, cn as Bell, d as UserCheck, et as Navigation, gt as Landmark, h as TrendingUp, ht as LayoutDashboard, in as Building2, it as Menu, j as Settings, k as ShieldCheck, kt as FileText, lt as LogOut, m as TriangleAlert, n as X, o as Warehouse, on as Brain, ot as Map, r as Workflow, rt as MessageCircle, st as MapPin, tn as Calendar, vn as Activity, xt as Heart, y as Target, z as Rocket } from "../_libs/lucide-react.mjs";
import { h as VisuallyHidden } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as loadSalesQueue } from "./offline-store-Ddf--0UV.mjs";
import { a as subscribePendingMutations, t as loadPendingMutations } from "./offline-mutations-BlLFZEVf.mjs";
import { s as useCart } from "./use-cart-D1K0BW4t.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/radix-ui__react-avatar.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-KlJx9hrW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _excluded$1 = ["className"], _excluded2$1 = ["className"], _excluded3$1 = ["className"];
var Avatar = import_react.forwardRef((_ref, ref) => {
	let { className } = _ref, props = _objectWithoutProperties(_ref, _excluded$1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, _objectSpread2({
		ref,
		className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)
	}, props));
});
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef((_ref2, ref) => {
	let { className } = _ref2, props = _objectWithoutProperties(_ref2, _excluded2$1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, _objectSpread2({
		ref,
		className: cn("aspect-square h-full w-full", className)
	}, props));
});
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef((_ref3, ref) => {
	let { className } = _ref3, props = _objectWithoutProperties(_ref3, _excluded3$1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, _objectSpread2({
		ref,
		className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)
	}, props));
});
AvatarFallback.displayName = AvatarFallback$1.displayName;
var _excluded = ["className"], _excluded2 = [
	"side",
	"className",
	"children"
], _excluded3 = ["className"], _excluded4 = ["className"], _excluded5 = ["className"], _excluded6 = ["className"];
var Sheet = Dialog;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef((_ref, ref) => {
	let { className } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, _objectSpread2(_objectSpread2({ className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className) }, props), {}, { ref }));
});
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef((_ref2, ref) => {
	let { side = "right", className, children } = _ref2, props = _objectWithoutProperties(_ref2, _excluded2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, _objectSpread2(_objectSpread2({
		ref,
		className: cn(sheetVariants({ side }), className)
	}, props), {}, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children] }))] });
});
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = (_ref3) => {
	let { className } = _ref3, props = _objectWithoutProperties(_ref3, _excluded3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({ className: cn("flex flex-col space-y-2 text-center sm:text-left", className) }, props));
};
SheetHeader.displayName = "SheetHeader";
var SheetFooter = (_ref4) => {
	let { className } = _ref4, props = _objectWithoutProperties(_ref4, _excluded4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({ className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className) }, props));
};
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef((_ref5, ref) => {
	let { className } = _ref5, props = _objectWithoutProperties(_ref5, _excluded5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, _objectSpread2({
		ref,
		className: cn("text-lg font-semibold text-foreground", className)
	}, props));
});
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef((_ref6, ref) => {
	let { className } = _ref6, props = _objectWithoutProperties(_ref6, _excluded6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, _objectSpread2({
		ref,
		className: cn("text-sm text-muted-foreground", className)
	}, props));
});
SheetDescription.displayName = DialogDescription.displayName;
/**
* SoulPageHeader — header padrão de TODAS as páginas autenticadas.
*
* Mesma alma da página /crm/prospeccao:
*   • Barra lateral navy (#2b3a8c) à esquerda
*   • Título em maiúsculas itálico extrabold
*   • Última palavra (ou trecho após " — ") em destaque navy não-itálico
*   • Subtítulo cinza-slate
*
* Uso transparente: AppShell já injeta este header a partir das props
* `title` e `description`. Nenhuma página precisa importar diretamente.
*/
function SoulPageHeader({ title, description }) {
	let lead = title;
	let accent = "";
	if (title.includes(" — ")) {
		const [a, b] = title.split(" — ");
		lead = a;
		accent = b;
	} else {
		const parts = title.trim().split(/\s+/);
		if (parts.length > 1) {
			accent = parts.pop();
			lead = parts.join(" ");
		} else {
			accent = title;
			lead = "";
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "border-l-4 border-[#2b3a8c] pl-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "text-2xl lg:text-3xl font-extrabold uppercase italic tracking-tight text-slate-900 leading-none",
			children: [lead && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [lead, " "] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "not-italic text-[#2b3a8c]",
				children: accent
			})]
		}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-slate-500 font-medium mt-2 max-w-2xl",
			children: description
		})]
	});
}
function OfflinePendingBadge() {
	const [mutations, setMutations] = (0, import_react.useState)([]);
	const [sales, setSales] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const reload = async () => {
			const [m, s] = await Promise.all([loadPendingMutations(), loadSalesQueue()]);
			setMutations(m);
			setSales(s);
		};
		reload();
		const un = subscribePendingMutations(() => void reload());
		const onFocus = () => void reload();
		window.addEventListener("focus", onFocus);
		const t = setInterval(reload, 15e3);
		return () => {
			un();
			window.removeEventListener("focus", onFocus);
			clearInterval(t);
		};
	}, []);
	const pending = mutations.filter((m) => m.status !== "sent").length + sales.filter((s) => s.status === "pending" || s.status === "sending" || s.status === "error").length;
	const hasErr = mutations.some((m) => m.status === "error") || sales.some((s) => s.status === "error");
	const syncing = mutations.some((m) => m.status === "sending") || sales.some((s) => s.status === "sending");
	if (pending === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/offline-pendentes",
		className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold border transition-colors ${hasErr ? "bg-destructive/10 text-destructive border-destructive/30 hover:bg-destructive/15" : "bg-amber-500/10 text-amber-700 border-amber-500/30 hover:bg-amber-500/15"}`,
		"aria-label": `${pending} pendentes de sincronização`,
		children: [syncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudOff, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			pending,
			" pendente",
			pending > 1 ? "s" : ""
		] })]
	});
}
var isGroup = (n) => "items" in n;
var customerNav = [
	{
		to: "/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/portal",
		label: "Portal do Cliente",
		icon: CircleUser
	},
	{
		label: "Compras",
		icon: Package,
		items: [
			{
				to: "/v3",
				label: "Catálogo",
				icon: Package
			},
			{
				to: "/cart",
				label: "Carrinho",
				icon: ShoppingCart
			},
			{
				to: "/favorites",
				label: "Favoritos",
				icon: Heart
			}
		]
	},
	{
		label: "Pedidos",
		icon: ClipboardList,
		items: [{
			to: "/orders",
			label: "Meus pedidos",
			icon: ClipboardList
		}]
	},
	{
		label: "Minha Conta",
		icon: Building2,
		items: [
			{
				to: "/companies",
				label: "Minha empresa",
				icon: Building2
			},
			{
				to: "/addresses",
				label: "Endereços",
				icon: MapPin
			},
			{
				to: "/settings",
				label: "Configurações",
				icon: Settings
			}
		]
	}
];
var adminNav = [
	{
		to: "/dashboard",
		label: "Visão Geral",
		icon: LayoutDashboard
	},
	{
		to: "/bi",
		label: "BI Executivo",
		icon: TrendingUp
	},
	{
		label: "Comercial",
		icon: Target,
		items: [
			{
				to: "/vendas/nova",
				label: "Venda em Visita",
				icon: Briefcase
			},
			{
				to: "/crm",
				label: "CRM",
				icon: Target
			},
			{
				to: "/crm/prospeccao",
				label: "Prospecção",
				icon: Search
			},
			{
				to: "/ai",
				label: "IA Comercial",
				icon: Brain
			},
			{
				to: "/campaigns",
				label: "Campanhas",
				icon: Rocket
			}
		]
	},
	{
		label: "Operações",
		icon: Navigation,
		items: [
			{
				to: "/field",
				label: "Campo",
				icon: Navigation
			},
			{
				to: "/vendas-offline",
				label: "Venda Offline",
				icon: CloudOff
			},
			{
				to: "/field/agenda",
				label: "Agenda",
				icon: Calendar
			},
			{
				to: "/routes",
				label: "Rotas & Mapa",
				icon: Map
			}
		]
	},
	{
		label: "Catálogo",
		icon: SquareDashed,
		items: [
			{
				to: "/admin/catalog",
				label: "Produtos",
				icon: SquareDashed
			},
			{
				to: "/inventory",
				label: "Estoque",
				icon: Warehouse
			},
			{
				to: "/inventory/alerts",
				label: "Alertas de estoque",
				icon: TriangleAlert
			},
			{
				to: "/inventory/counts",
				label: "Inventário cíclico",
				icon: ClipboardList
			},
			{
				to: "/admin/labels",
				label: "Etiquetas / Cód. Barras",
				icon: FileText
			}
		]
	},
	{
		label: "Pedidos & Financeiro",
		icon: ClipboardList,
		items: [
			{
				to: "/admin/orders",
				label: "Pedidos",
				icon: ClipboardList
			},
			{
				to: "/admin/abandoned-carts",
				label: "Carrinhos abandonados",
				icon: ShoppingCart
			},
			{
				to: "/finance",
				label: "Financeiro",
				icon: DollarSign
			},
			{
				to: "/finance/reconciliation",
				label: "Conciliação bancária",
				icon: Landmark
			},
			{
				to: "/admin/fees",
				label: "Taxas & Parcelamento",
				icon: DollarSign
			}
		]
	},
	{
		label: "Comunicação",
		icon: MessageCircle,
		items: [
			{
				to: "/whatsapp",
				label: "WhatsApp",
				icon: MessageCircle
			},
			{
				to: "/whatsapp/campaigns",
				label: "Campanhas WhatsApp",
				icon: Megaphone
			},
			{
				to: "/whatsapp/templates",
				label: "Templates",
				icon: FileText
			},
			{
				to: "/admin/push",
				label: "Push de Ofertas",
				icon: Bell
			}
		]
	},
	{
		label: "Automações",
		icon: Workflow,
		items: [{
			to: "/automation",
			label: "Workflows",
			icon: Workflow
		}]
	},
	{
		label: "Administração",
		icon: Shield,
		items: [
			{
				to: "/admin/companies",
				label: "Clientes / Aprovações",
				icon: ShieldCheck
			},
			{
				to: "/admin/users",
				label: "Usuários",
				icon: Users
			},
			{
				to: "/admin/sales-targets",
				label: "Metas de vendas",
				icon: Target
			},
			{
				to: "/admin/observability",
				label: "Observabilidade & LGPD",
				icon: Activity
			},
			{
				to: "/admin/promotions",
				label: "Promoções",
				icon: Megaphone
			},
			{
				to: "/admin/banners",
				label: "Banners da loja",
				icon: Megaphone
			},
			{
				to: "/admin/system",
				label: "Sistema",
				icon: Shield
			},
			{
				to: "/settings",
				label: "Configurações",
				icon: Settings
			}
		]
	}
];
var segmentLabels = {
	admin: "Admin",
	companies: "Empresas",
	catalog: "Catálogo",
	orders: "Pedidos",
	users: "Usuários",
	system: "Sistema",
	dashboard: "Dashboard",
	whatsapp: "WhatsApp",
	campaigns: "Campanhas",
	templates: "Templates",
	field: "Campo",
	"venda-offline": "Venda Offline",
	agenda: "Agenda",
	routes: "Rotas",
	inventory: "Estoque",
	finance: "Financeiro",
	crm: "CRM",
	ai: "IA Comercial",
	bi: "BI Executivo",
	automation: "Automações",
	settings: "Configurações",
	portal: "Portal",
	cart: "Carrinho",
	favorites: "Favoritos",
	addresses: "Endereços"
};
function AppShell({ children, title, description }) {
	var _ref, _profile$full_name, _profile$full_name2, _sellerCustomer$trade;
	const { user } = useAuth();
	const { data: profile } = useProfile(user);
	const { data: roles = [] } = useRoles(user);
	const isAdmin = roles.includes("admin");
	const isStaff = isAdmin || roles.includes("vendedor") || roles.includes("gerente");
	const sellerCustomer = useSellerSession((s) => s.customer);
	const endSellerSale = useSellerSession((s) => s.endSale);
	const clearCart = useCart((s) => s.clear);
	const cartCount = useCart((s) => s.items.reduce((n, i) => n + i.quantidade, 0));
	const router = useRouter();
	const qc = useQueryClient();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const onCheckout = pathname.startsWith("/checkout");
	const cartEmpty = cartCount === 0;
	function encerrarVenda() {
		endSellerSale();
		clearCart();
		toast.success("Venda encerrada");
		router.navigate({ to: "/vendas/nova" });
	}
	const initials = ((_ref = (_profile$full_name = profile === null || profile === void 0 ? void 0 : profile.full_name) !== null && _profile$full_name !== void 0 ? _profile$full_name : user === null || user === void 0 ? void 0 : user.email) !== null && _ref !== void 0 ? _ref : "?").split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
	async function signOut() {
		await qc.cancelQueries();
		qc.clear();
		await supabase.auth.signOut();
		router.navigate({
			to: "/auth",
			search: {
				mode: "login",
				redirect: void 0
			},
			replace: true
		});
	}
	const sections = isStaff ? adminNav : customerNav;
	const segments = pathname.split("/").filter(Boolean);
	const [mobileOpen, setMobileOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMobileOpen(false);
	}, [pathname]);
	function renderNav() {
		return sections.map((s) => isGroup(s) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavGroupItem, {
			group: s,
			pathname
		}, s.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlatNavLink, { item: s }, s.to));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-[#f4f6fb] text-foreground flex selection:bg-primary/15",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden lg:flex w-[240px] flex-col bg-[#2b3a8c] text-white shrink-0 pt-[var(--app-safe-top)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-5 h-16 flex items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/dashboard",
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-full bg-white/10 grid place-items-center overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/brand-logo.png",
									alt: "Prime",
									className: "h-6 w-6 object-contain"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "leading-tight",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-[15px] font-extrabold tracking-tight text-white",
									children: ["Atacado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/60",
										children: "Prime"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold",
									children: isAdmin ? "Painel Admin" : "Painel B2B"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 px-3 py-4 space-y-1 overflow-y-auto",
						children: renderNav()
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3 border-t border-white/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/5 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
									className: "h-9 w-9",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										className: "bg-white/15 text-white text-[12px] font-semibold",
										children: initials
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[12px] font-semibold text-white truncate leading-tight",
										children: (_profile$full_name2 = profile === null || profile === void 0 ? void 0 : profile.full_name) !== null && _profile$full_name2 !== void 0 ? _profile$full_name2 : isAdmin ? "Admin" : "Usuário"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-white/60 truncate",
										children: user === null || user === void 0 ? void 0 : user.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									onClick: signOut,
									"aria-label": "Sair",
									className: "h-7 w-7 text-white/70 hover:text-white hover:bg-white/10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" })
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: mobileOpen,
				onOpenChange: setMobileOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "w-[272px] p-0 bg-[#2b3a8c] text-white border-0 pt-[var(--app-safe-top)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VisuallyHidden, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Menu de navegação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetDescription, { children: "Navegação principal do sistema" })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-5 h-16 flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-9 w-9 rounded-full bg-white/10 grid place-items-center overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: "/brand-logo.png",
										alt: "Prime",
										className: "h-6 w-6 object-contain"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-[15px] font-extrabold tracking-tight text-white",
									children: ["Atacado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/60",
										children: "Prime"
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "px-3 py-4 space-y-1 overflow-y-auto h-[calc(100dvh_-_64px_-_var(--app-safe-top))]",
							children: renderNav()
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 min-w-0 flex flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "sticky top-0 z-20 bg-primary border-b border-primary-foreground/10 pt-[var(--app-safe-top)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 lg:px-8 h-16 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setMobileOpen(true),
								className: "lg:hidden shrink-0 text-primary-foreground hover:bg-primary-foreground/10",
								"aria-label": "Abrir menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "hidden md:flex flex-1 max-w-md",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative w-full",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "search",
										placeholder: "Buscar…",
										className: "w-full h-10 pl-10 pr-3 rounded-full bg-primary-foreground/10 border border-primary-foreground/10 text-[13px] text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:bg-primary-foreground/20 focus:border-primary-foreground/20 transition-colors"
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ml-auto flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflinePendingBadge, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
										"aria-label": "Breadcrumb",
										className: "hidden md:flex items-center gap-1 text-[12px] font-medium text-primary-foreground/70",
										children: segments.map((seg, idx) => {
											var _segmentLabels$seg;
											const label = (_segmentLabels$seg = segmentLabels[seg]) !== null && _segmentLabels$seg !== void 0 ? _segmentLabels$seg : decodeURIComponent(seg).replace(/-/g, " ");
											const last = idx === segments.length - 1;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1 capitalize",
												children: [idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3 text-primary-foreground/40 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: cn(last ? "text-primary-foreground" : "text-primary-foreground/70"),
													children: label
												})]
											}, idx);
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: signOut,
										"aria-label": "Sair",
										className: "lg:hidden text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
									})
								]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-slate-50 flex-1 flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 lg:px-10 pt-10 pb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SoulPageHeader, {
								title,
								description
							})
						}),
						sellerCustomer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 lg:px-10 pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/30 bg-primary/[0.04] p-3 flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-5 w-5 text-primary shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-muted-foreground",
												children: "Venda em andamento para "
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												className: "text-foreground",
												children: (_sellerCustomer$trade = sellerCustomer.trade_name) !== null && _sellerCustomer$trade !== void 0 ? _sellerCustomer$trade : sellerCustomer.legal_name
											}),
											sellerCustomer.tax_id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-muted-foreground",
												children: [" · CNPJ ", sellerCustomer.tax_id]
											})
										]
									}),
									onCheckout ? cartEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/v3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											children: "Adicionar produtos"
										})
									}) : null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/v3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "sm",
											variant: cartEmpty ? "default" : "outline",
											children: cartEmpty ? "Adicionar produtos" : "Continuar comprando"
										})
									}),
									!cartEmpty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/cart",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											className: "gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3.5 w-3.5" }), " Editar preços"]
										})
									}),
									!onCheckout && !cartEmpty && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/checkout",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											children: [
												"Ir ao checkout (",
												cartCount,
												")"
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: encerrarVenda,
										className: "text-muted-foreground hover:text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4 mr-1" }), "Encerrar"]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 lg:px-10 py-8 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-w-7xl",
								children
							})
						})
					]
				})]
			})
		]
	});
}
function FlatNavLink({ item }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		activeOptions: { exact: false },
		className: cn("group flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium transition-colors", "text-white/70 hover:text-white hover:bg-white/10", "data-[status=active]:bg-white data-[status=active]:text-[#2b3a8c] data-[status=active]:font-semibold data-[status=active]:shadow-sm"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
			className: "h-[18px] w-[18px] shrink-0",
			strokeWidth: 2
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "truncate",
			children: item.label
		})]
	});
}
function NavGroupItem({ group, pathname }) {
	const [open, setOpen] = (0, import_react.useState)(group.items.some((it) => pathname.startsWith(it.to)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => setOpen((v) => !v),
			className: "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13.5px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors",
			"aria-expanded": open,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(group.icon, {
					className: "h-[18px] w-[18px] shrink-0",
					strokeWidth: 2
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "truncate",
					children: group.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("h-4 w-4 ml-auto opacity-60 transition-transform duration-200", open && "rotate-180") })
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pl-3 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150",
			children: group.items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlatNavLink, { item: it }, it.to))
		})]
	});
}
//#endregion
export { AppShell as t };
