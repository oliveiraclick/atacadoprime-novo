import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { i as useRoles, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { Ht as Clock, It as DollarSign, N as Search, Nt as ExternalLink, R as RotateCcw, Z as Package, _ as Trash2, jt as Eye, n as X, qt as CircleCheck, s as Wallet, tn as Calendar } from "../_libs/lucide-react.mjs";
import { i as useMyOrders, r as useDeleteOrder } from "./use-orders-CBi7bZ2w.mjs";
import { r as isPendingPayment } from "./status-Dxqe_Ggj.mjs";
import { t as StatusPill } from "./status-pill-nUgOhmrP.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as useCart } from "./use-cart-D1K0BW4t.mjs";
import { t as AppShell } from "./app-shell-KlJx9hrW.mjs";
import { t as StatCard } from "./data-cards-BhN-APdV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-CxqzWVDf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useRecomprar() {
	const addToCart = useCart((s) => s.add);
	return (0, import_react.useCallback)(async (orderId) => {
		const { data } = await supabase.from("order_items").select("*, products(nome, sku, preco_unitario, quantidade_pacote, preco_pacote, product_images(image_url, ordem))").eq("order_id", orderId);
		(data !== null && data !== void 0 ? data : []).forEach((it) => {
			var _p$product_images, _img$image_url;
			const p = it.products;
			if (!p) return;
			const img = ((_p$product_images = p.product_images) !== null && _p$product_images !== void 0 ? _p$product_images : []).slice().sort((a, b) => a.ordem - b.ordem)[0];
			addToCart({
				product_id: it.product_id,
				nome: p.nome,
				sku: p.sku,
				image_url: (_img$image_url = img === null || img === void 0 ? void 0 : img.image_url) !== null && _img$image_url !== void 0 ? _img$image_url : null,
				tipo_compra: it.tipo_compra,
				quantidade: it.quantidade,
				preco_unitario: Number(p.preco_unitario),
				quantidade_pacote: p.quantidade_pacote,
				preco_pacote: p.preco_pacote ? Number(p.preco_pacote) : null
			});
		});
	}, [addToCart]);
}
function OrdersPage() {
	var _orders$;
	const { data: orders = [], isLoading } = useMyOrders();
	const recomprar = useRecomprar();
	const { user } = useAuth();
	const { data: roles = [] } = useRoles(user);
	const isAdmin = roles.includes("admin");
	const del = useDeleteOrder();
	const [search, setSearch] = (0, import_react.useState)("");
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("ALL");
	const pagos = orders.filter((o) => o.status === "PAGO").length;
	const pendentes = orders.filter((o) => isPendingPayment(o.status)).length;
	const totalComprado = orders.reduce((s, o) => s + Number(o.total), 0);
	const totalPago = orders.filter((o) => o.status === "PAGO").reduce((s, o) => s + Number(o.total), 0);
	const ultima = (_orders$ = orders[0]) === null || _orders$ === void 0 ? void 0 : _orders$.created_at;
	const filteredOrders = orders.filter((o) => {
		var _o$companies, _o$companies2;
		const cname = ((_o$companies = o.companies) === null || _o$companies === void 0 ? void 0 : _o$companies.trade_name) || ((_o$companies2 = o.companies) === null || _o$companies2 === void 0 ? void 0 : _o$companies2.legal_name) || "";
		const code = orderCodeHash(o.id, cname);
		const dateStr = formatDate(o.created_at);
		const totalStr = brl(Number(o.total));
		const term = search.toLowerCase().trim();
		const matchesSearch = !term || code.toLowerCase().includes(term) || o.id.toLowerCase().includes(term) || cname.toLowerCase().includes(term) || o.status.toLowerCase().includes(term) || dateStr.toLowerCase().includes(term) || totalStr.toLowerCase().includes(term);
		const pending = isPendingPayment(o.status);
		let matchesStatus = true;
		if (statusFilter === "PENDING") matchesStatus = pending;
		else if (statusFilter === "PAGO") matchesStatus = o.status === "PAGO";
		else if (statusFilter === "CANCELADO") matchesStatus = o.status === "CANCELADO";
		return matchesSearch && matchesStatus;
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Meus pedidos",
		description: "Histórico e recompra rápida.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Pedidos pendentes",
						value: pendentes,
						icon: Clock,
						tone: "orange"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Pedidos pagos",
						value: pagos,
						icon: CircleCheck,
						tone: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Valor total",
						value: brl(totalComprado),
						icon: DollarSign,
						tone: "blue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Valor total pago",
						value: brl(totalPago),
						icon: Wallet,
						tone: "indigo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Última compra",
						value: formatDate(ultima),
						icon: Calendar,
						tone: "purple"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-xl p-4 mb-6 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							placeholder: "Buscar por código (ex: #1234), cliente, valor, data ou status...",
							className: "w-full h-10 pl-9 pr-9 bg-background border border-input rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						}),
						search && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearch(""),
							className: "absolute right-3 p-1 rounded-md text-muted-foreground hover:text-foreground",
							title: "Limpar busca",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 flex-wrap text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 flex-wrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground font-medium mr-1",
								children: "Filtrar:"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStatusFilter("ALL"),
								className: `px-3 py-1.5 rounded-full font-medium transition-colors ${statusFilter === "ALL" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`,
								children: [
									"Todos (",
									orders.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStatusFilter("PENDING"),
								className: `px-3 py-1.5 rounded-full font-medium transition-colors ${statusFilter === "PENDING" ? "bg-amber-500 text-white" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`,
								children: [
									"Pendentes (",
									pendentes,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStatusFilter("PAGO"),
								className: `px-3 py-1.5 rounded-full font-medium transition-colors ${statusFilter === "PAGO" ? "bg-emerald-600 text-white" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`,
								children: [
									"Pagos (",
									pagos,
									")"
								]
							})
						]
					}), (search || statusFilter !== "ALL") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted-foreground",
						children: [
							"Mostrando ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-foreground",
								children: filteredOrders.length
							}),
							" de ",
							orders.length,
							" pedido(s)"
						]
					})]
				})]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Carregando…"
			}) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-10 h-10 mx-auto text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted-foreground",
						children: "Nenhum pedido ainda."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/v3",
							children: "Comprar agora"
						})
					})
				]
			}) : filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-12 bg-card border border-border rounded-xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "w-8 h-8 mx-auto text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Nenhum pedido encontrado para a busca especificada."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						className: "mt-3",
						onClick: () => {
							setSearch("");
							setStatusFilter("ALL");
						},
						children: "Limpar filtros"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3",
				children: filteredOrders.map((o) => {
					var _o$payments, _o$order_items, _o$companies3, _o$companies4;
					const link = (_o$payments = o.payments) === null || _o$payments === void 0 || (_o$payments = _o$payments[0]) === null || _o$payments === void 0 ? void 0 : _o$payments.payment_link;
					const pending = isPendingPayment(o.status);
					const showPay = !!link && pending;
					const itensQtd = ((_o$order_items = o.order_items) !== null && _o$order_items !== void 0 ? _o$order_items : []).reduce((s, i) => s + Number(i.quantidade), 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-4 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs text-muted-foreground",
									children: orderCodeHash(o.id, ((_o$companies3 = o.companies) === null || _o$companies3 === void 0 ? void 0 : _o$companies3.trade_name) || ((_o$companies4 = o.companies) === null || _o$companies4 === void 0 ? void 0 : _o$companies4.legal_name))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm mt-0.5",
									children: formatDate(o.created_at)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: o.status })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2 text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info$1, {
									label: "Itens",
									value: itensQtd.toString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info$1, {
									label: "Total",
									value: brl(Number(o.total)),
									strong: true
								})]
							}),
							showPay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "w-full h-9 text-xs font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: link,
									target: "_blank",
									rel: "noopener noreferrer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5 mr-1.5" }), " Pagar agora"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 pt-1 border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "ghost",
										size: "sm",
										className: "flex-1 h-8 text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/orders/$id",
											params: { id: o.id },
											search: { edit: false },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5 mr-1" }), " Ver"]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										size: "sm",
										className: "flex-1 h-8 text-xs",
										onClick: () => recomprar(o.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "w-3.5 h-3.5 mr-1" }), " Recomprar"]
									}),
									isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										disabled: del.isPending,
										className: `h-8 text-xs ${itensQtd === 0 ? "border-destructive/40 text-destructive hover:bg-destructive/10" : "text-muted-foreground"}`,
										title: itensQtd === 0 ? "Excluir pedido vazio" : "Excluir pedido",
										onClick: () => {
											var _o$companies5, _o$companies6;
											const cname = ((_o$companies5 = o.companies) === null || _o$companies5 === void 0 ? void 0 : _o$companies5.trade_name) || ((_o$companies6 = o.companies) === null || _o$companies6 === void 0 ? void 0 : _o$companies6.legal_name);
											const code = orderCodeHash(o.id, cname);
											const msg = itensQtd === 0 ? `Excluir pedido ${code} (sem itens)?` : `ATENÇÃO: excluir pedido ${code} com ${itensQtd} item(ns) por ${brl(Number(o.total))}?\n\nEsta ação é irreversível.`;
											if (confirm(msg)) del.mutate(o.id, {
												onSuccess: () => toast.success("Pedido excluído"),
												onError: (e) => toast.error(e instanceof Error ? e.message : "Erro ao excluir")
											});
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
									})
								]
							})
						]
					}, o.id);
				})
			})
		]
	});
}
function Info$1({ label, value, strong }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-muted/40 rounded-md px-2.5 py-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-0.5 ${strong ? "font-semibold text-sm" : "text-xs"}`,
			children: value
		})]
	});
}
//#endregion
export { OrdersPage as component };
