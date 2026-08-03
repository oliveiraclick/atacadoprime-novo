import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useRoles, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { E as ShoppingCart, G as Plus, Lt as CreditCard, N as Search, U as QrCode, Y as Pencil, Z as Package, _ as Trash2, dt as LoaderCircle, l as User, ln as Banknote, mn as ArrowLeft, nn as CalendarClock, qt as CircleCheck, tt as Minus } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { n as useCreateOrder, t as useConfirmPayment } from "./use-orders-CBi7bZ2w.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { t as useBankAccounts } from "./use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as effectiveUnitPrice, n as cartEffectiveSubtotal, s as useCart, t as TIER_3_MIN } from "./use-cart-D1K0BW4t.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.pdv-7zyc-S7u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _excluded = [
	"className",
	"align",
	"sideOffset"
];
var Popover = Root2;
var PopoverTrigger = Trigger;
var PopoverContent = import_react.forwardRef((_ref, ref) => {
	let { className, align = "center", sideOffset = 4 } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, _objectSpread2({
		ref,
		align,
		sideOffset,
		className: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-popover-content-transform-origin)", className)
	}, props)) });
});
PopoverContent.displayName = Content2.displayName;
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
var GROUPS = [
	{
		label: "Todos",
		tipo: ""
	},
	{
		label: "Capas",
		tipo: "carcaca"
	},
	{
		label: "Chaves",
		tipo: "chave"
	},
	{
		label: "Controles",
		tipo: "controle"
	}
];
function PdvPage() {
	var _customer$trade_name;
	const { user } = useAuth();
	const { data: roles = [] } = useRoles(user);
	const isStaff = roles.some((r) => r === "admin" || r === "vendedor" || r === "gerente");
	const navigate = useNavigate();
	const customer = useSellerSession((s) => s.customer);
	const tripId = useSellerSession((s) => s.tripId);
	const endSale = useSellerSession((s) => s.endSale);
	const items = useCart((s) => s.items);
	const addToCart = useCart((s) => s.add);
	const setQty = useCart((s) => s.setQty);
	const setPreco = useCart((s) => s.setPreco);
	const removeItem = useCart((s) => s.remove);
	const clearCart = useCart((s) => s.clear);
	const [q, setQ] = (0, import_react.useState)("");
	const [tipo, setTipo] = (0, import_react.useState)("");
	const [cartOpen, setCartOpen] = (0, import_react.useState)(false);
	const [descontoPct, setDescontoPct] = (0, import_react.useState)(0);
	const [descontoRs, setDescontoRs] = (0, import_react.useState)(0);
	const [frete, setFrete] = (0, import_react.useState)(0);
	const [quickAdd, setQuickAdd] = (0, import_react.useState)(null);
	const searchRef = (0, import_react.useRef)(null);
	const { data: products = [], isLoading } = useQuery({
		queryKey: ["pdv-products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, nome, sku, tipo, preco_unitario, preco_pacote, preco_nivel_1, preco_nivel_2, preco_nivel_3, quantidade_pacote, estoque, categoria_id, marca_id, brands(nome), categories(nome), product_images(image_url, tipo_imagem, ordem)").eq("status", true).order("nome");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	(0, import_react.useEffect)(() => {
		var _searchRef$current;
		(_searchRef$current = searchRef.current) === null || _searchRef$current === void 0 || _searchRef$current.focus();
	}, []);
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			var _document$activeEleme;
			if (e.key === "/" && ((_document$activeEleme = document.activeElement) === null || _document$activeEleme === void 0 ? void 0 : _document$activeEleme.tagName) !== "INPUT") {
				var _searchRef$current2;
				e.preventDefault();
				(_searchRef$current2 = searchRef.current) === null || _searchRef$current2 === void 0 || _searchRef$current2.focus();
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const term = q.trim().toLowerCase();
		return products.filter((p) => {
			var _p$nome, _p$sku, _p$brands;
			if (tipo && p.tipo !== tipo) return false;
			if (!term) return true;
			return ((_p$nome = p.nome) === null || _p$nome === void 0 ? void 0 : _p$nome.toLowerCase().includes(term)) || ((_p$sku = p.sku) === null || _p$sku === void 0 ? void 0 : _p$sku.toLowerCase().includes(term)) || ((_p$brands = p.brands) === null || _p$brands === void 0 || (_p$brands = _p$brands.nome) === null || _p$brands === void 0 ? void 0 : _p$brands.toLowerCase().includes(term));
		});
	}, [
		products,
		q,
		tipo
	]);
	function primaryImage(p) {
		var _p$product_images, _list$0$image_url, _list$;
		return (_list$0$image_url = (_list$ = ((_p$product_images = p.product_images) !== null && _p$product_images !== void 0 ? _p$product_images : []).slice().sort((a, b) => {
			var _a$ordem, _b$ordem;
			return ((_a$ordem = a.ordem) !== null && _a$ordem !== void 0 ? _a$ordem : 999) - ((_b$ordem = b.ordem) !== null && _b$ordem !== void 0 ? _b$ordem : 999);
		})[0]) === null || _list$ === void 0 ? void 0 : _list$.image_url) !== null && _list$0$image_url !== void 0 ? _list$0$image_url : null;
	}
	function handleSearchEnter(e) {
		e.preventDefault();
		if (filtered.length > 0) {
			setQuickAdd(filtered[0]);
			setQ("");
		}
	}
	const { subtotal, tier } = cartEffectiveSubtotal(items);
	const descontoTotal = Math.min(subtotal, descontoRs + subtotal * descontoPct / 100);
	const total = Math.max(0, subtotal - descontoTotal + frete);
	const totalUnidades = items.reduce((s, it) => {
		var _it$quantidade_pacote;
		return s + (it.tipo_compra === "PACOTE" ? it.quantidade * ((_it$quantidade_pacote = it.quantidade_pacote) !== null && _it$quantidade_pacote !== void 0 ? _it$quantidade_pacote : 1) : it.quantidade);
	}, 0);
	const nextTierGap = (() => {
		if (items.length === 0) return null;
		if (!items.some((i) => {
			var _i$preco_nivel_, _i$preco_nivel_2;
			return i.tipo_compra === "UNITARIO" && i.preco_nivel_2 != null && i.preco_nivel_3 != null && (Number(i.preco_nivel_2) < Number((_i$preco_nivel_ = i.preco_nivel_1) !== null && _i$preco_nivel_ !== void 0 ? _i$preco_nivel_ : i.preco_unitario) || Number(i.preco_nivel_3) < Number((_i$preco_nivel_2 = i.preco_nivel_1) !== null && _i$preco_nivel_2 !== void 0 ? _i$preco_nivel_2 : i.preco_unitario));
		})) return null;
		if (tier === 1 && subtotal < 500) return {
			falta: 500 - subtotal,
			proxNivel: 2
		};
		if (tier === 2 && subtotal < 1e3) return {
			falta: TIER_3_MIN - subtotal,
			proxNivel: 3
		};
		return null;
	})();
	if (!isStaff) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "PDV",
		eyebrow: "Venda rápida",
		description: "Área exclusiva da equipe de vendas.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border p-6 text-sm",
			style: {
				background: V2.LIGHT_SURFACE,
				borderColor: V2.LIGHT_BORDER,
				color: V2.LIGHT_TEXT
			},
			children: "Esta área é exclusiva da equipe de vendas."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "PDV — Venda rápida",
		eyebrow: "Atendimento em campo",
		description: customer ? `Cliente: ${(_customer$trade_name = customer.trade_name) !== null && _customer$trade_name !== void 0 ? _customer$trade_name : customer.legal_name}` : "Selecione um cliente para iniciar.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/v3/vendas/nova",
				className: "h-10 px-4 rounded-full text-sm font-medium grid place-items-center border",
				style: {
					borderColor: V2.LIGHT_BORDER,
					color: V2.LIGHT_TEXT,
					background: V2.LIGHT_SURFACE
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1.5 inline" }), " Trocar cliente"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
				open: cartOpen,
				onOpenChange: setCartOpen,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setCartOpen(true),
					className: "lg:hidden h-10 px-4 rounded-full relative",
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4 mr-1.5" }),
						items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-1 font-bold",
							children: items.length
						}),
						brl(total)
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "p-0 gap-0 overflow-hidden grid grid-rows-[auto_minmax(0,1fr)_auto] max-w-2xl w-[96vw] h-[92dvh] sm:h-[88vh]",
					style: {
						background: V2.LIGHT_BG,
						color: V2.LIGHT_TEXT,
						borderColor: V2.LIGHT_BORDER
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, {
						className: "px-4 py-2.5 border-b shrink-0 pr-11",
						style: {
							borderColor: V2.LIGHT_BORDER,
							background: V2.LIGHT_SURFACE
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
									className: "h-4 w-4 shrink-0",
									style: { color: V2.TEAL }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
									className: "text-base leading-tight",
									style: { color: V2.LIGHT_TEXT },
									children: "Carrinho"
								}),
								items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-semibold px-2 py-0.5 rounded-full",
									style: {
										background: V2.TEAL_LIGHT,
										color: V2.TEAL
									},
									children: [
										items.length,
										" ",
										items.length === 1 ? "item" : "itens"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCartOpen(false),
									className: "ml-auto h-8 px-3 rounded-full text-xs font-semibold border transition-all hover:opacity-90",
									style: {
										background: V2.LIGHT_SURFACE_2,
										color: V2.TEAL,
										borderColor: V2.LIGHT_BORDER
									},
									children: "Continuar"
								})
							]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPanel, {
						items,
						setQty,
						setPreco,
						removeItem,
						clearCart,
						customer,
						tripId,
						subtotal,
						descontoPct,
						setDescontoPct,
						descontoRs,
						setDescontoRs,
						descontoTotal,
						frete,
						setFrete,
						total,
						totalUnidades,
						tier,
						nextTierGap,
						onFinalized: () => {
							setCartOpen(false);
							endSale();
							navigate({ to: "/v3/hoje" });
						}
					})]
				})]
			})]
		}),
		children: [
			!customer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border p-4 mb-4 flex items-center gap-3",
				style: {
					background: V2.TEAL_LIGHT,
					borderColor: V2.TEAL,
					color: V2.LIGHT_TEXT
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
						className: "h-5 w-5 shrink-0",
						style: { color: V2.TEAL }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex-1 text-sm",
						children: "Nenhum cliente selecionado. Escolha um cliente antes de finalizar a venda."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/v3/vendas/nova",
						className: "h-9 px-4 rounded-full text-xs font-semibold grid place-items-center",
						style: {
							background: V2.TEAL,
							color: "#fff"
						},
						children: "Escolher cliente"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleSearchEnter,
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4",
								style: { color: V2.LIGHT_MUTED }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								ref: searchRef,
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Buscar peça ou SKU… (Enter adiciona a primeira, / foca aqui)",
								className: "pl-10 h-12 rounded-full border",
								style: {
									background: V2.LIGHT_SURFACE,
									borderColor: V2.LIGHT_BORDER,
									color: V2.LIGHT_TEXT
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setTipo(g.tipo),
								className: "h-9 px-4 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors",
								style: tipo === g.tipo ? {
									background: V2.TEAL,
									color: "#fff",
									borderColor: V2.TEAL
								} : {
									background: V2.LIGHT_SURFACE,
									color: V2.LIGHT_TEXT,
									borderColor: V2.LIGHT_BORDER
								},
								children: g.label
							}, g.tipo || "all")), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-auto text-xs self-center",
								style: { color: V2.LIGHT_MUTED },
								children: [filtered.length, " produtos"]
							})]
						}),
						isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border p-10 text-center text-sm",
							style: {
								background: V2.LIGHT_SURFACE,
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_MUTED
							},
							children: "Carregando peças…"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3",
							children: [filtered.map((p) => {
								var _p$quantidade_pacote3, _p$brands$nome, _p$brands2, _p$preco_nivel_2;
								const hasPkg = !!(p.preco_pacote && ((_p$quantidade_pacote3 = p.quantidade_pacote) !== null && _p$quantidade_pacote3 !== void 0 ? _p$quantidade_pacote3 : 1) > 1);
								const img = primaryImage(p);
								const already = items.find((it) => it.product_id === p.id);
								const qtyInCart = items.filter((it) => it.product_id === p.id).reduce((s, it) => {
									var _it$quantidade_pacote2;
									return s + (it.tipo_compra === "PACOTE" ? it.quantidade * ((_it$quantidade_pacote2 = it.quantidade_pacote) !== null && _it$quantidade_pacote2 !== void 0 ? _it$quantidade_pacote2 : 1) : it.quantidade);
								}, 0);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setQuickAdd(p),
									className: "text-left rounded-2xl border-2 p-2.5 flex flex-col transition-all active:scale-[0.98] touch-manipulation",
									style: {
										background: already ? V2.TEAL_LIGHT : V2.LIGHT_SURFACE,
										borderColor: already ? V2.TEAL : V2.LIGHT_BORDER
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-square rounded-xl mb-2 overflow-hidden grid place-items-center",
											style: { background: V2.LIGHT_SURFACE_2 },
											children: [img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: img,
												alt: p.nome,
												className: "max-w-full max-h-full object-contain pointer-events-none"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
												className: "h-8 w-8",
												style: { color: V2.LIGHT_MUTED }
											}), already && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-0",
													style: { background: "rgba(13,115,119,0.15)" }
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "absolute top-1.5 right-1.5 h-7 min-w-7 px-2 rounded-full text-xs font-bold grid place-items-center shadow",
													style: {
														background: V2.TEAL,
														color: "#fff"
													},
													children: qtyInCart
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "absolute bottom-1.5 left-1.5 h-6 w-6 rounded-full grid place-items-center shadow",
													style: {
														background: "#16a34a",
														color: "#fff"
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" })
												})
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold line-clamp-2 min-h-[2rem]",
											style: { color: V2.LIGHT_TEXT },
											children: p.nome
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px]",
											style: { color: V2.LIGHT_MUTED },
											children: (_p$brands$nome = (_p$brands2 = p.brands) === null || _p$brands2 === void 0 ? void 0 : _p$brands2.nome) !== null && _p$brands$nome !== void 0 ? _p$brands$nome : p.sku
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1.5 flex items-baseline justify-between gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-bold tabular-nums",
												style: { color: V2.LIGHT_TEXT },
												children: brl(Number((_p$preco_nivel_2 = p.preco_nivel_1) !== null && _p$preco_nivel_2 !== void 0 ? _p$preco_nivel_2 : p.preco_unitario))
											}), hasPkg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] tabular-nums",
												style: { color: V2.TEAL },
												children: ["pct ", brl(Number(p.preco_pacote))]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-2 w-full h-9 rounded-full font-bold text-xs grid place-items-center",
											style: {
												background: V2.TEAL,
												color: "#fff"
											},
											children: "+ Adicionar"
										})
									]
								}, p.id);
							}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-full rounded-2xl border p-10 text-center text-sm",
								style: {
									background: V2.LIGHT_SURFACE,
									borderColor: V2.LIGHT_BORDER,
									color: V2.LIGHT_MUTED
								},
								children: [
									"Nada encontrado para \"",
									q,
									"\""
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-4 rounded-2xl border overflow-hidden flex flex-col max-h-[calc(100vh-2rem)]",
						style: {
							background: V2.LIGHT_SURFACE,
							borderColor: V2.LIGHT_BORDER
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4 border-b",
							style: { borderColor: V2.LIGHT_BORDER },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
										className: "h-4 w-4",
										style: { color: V2.TEAL }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold",
										style: { color: V2.LIGHT_TEXT },
										children: "Carrinho"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs ml-auto",
										style: { color: V2.LIGHT_MUTED },
										children: [totalUnidades, " un"]
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartPanel, {
							items,
							setQty,
							setPreco,
							removeItem,
							clearCart,
							customer,
							tripId,
							subtotal,
							descontoPct,
							setDescontoPct,
							descontoRs,
							setDescontoRs,
							descontoTotal,
							frete,
							setFrete,
							total,
							totalUnidades,
							tier,
							nextTierGap,
							onFinalized: () => {
								endSale();
								navigate({ to: "/v3/hoje" });
							}
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAddDialog, {
				product: quickAdd,
				onClose: () => setQuickAdd(null),
				existing: items.filter((it) => it.product_id === (quickAdd === null || quickAdd === void 0 ? void 0 : quickAdd.id)),
				onConfirm: (mode, qty, preco) => {
					var _quickAdd$preco_nivel, _quickAdd$quantidade_, _quickAdd$preco_nivel2;
					if (!quickAdd) return;
					addToCart({
						product_id: quickAdd.id,
						nome: quickAdd.nome,
						sku: quickAdd.sku,
						image_url: primaryImage(quickAdd),
						tipo_compra: mode,
						preco_unitario: mode === "UNITARIO" ? preco : Number((_quickAdd$preco_nivel = quickAdd.preco_nivel_1) !== null && _quickAdd$preco_nivel !== void 0 ? _quickAdd$preco_nivel : quickAdd.preco_unitario),
						quantidade_pacote: Number((_quickAdd$quantidade_ = quickAdd.quantidade_pacote) !== null && _quickAdd$quantidade_ !== void 0 ? _quickAdd$quantidade_ : 1),
						preco_pacote: mode === "PACOTE" ? preco : quickAdd.preco_pacote != null ? Number(quickAdd.preco_pacote) : null,
						preco_nivel_1: quickAdd.preco_nivel_1 != null ? Number(quickAdd.preco_nivel_1) : Number(quickAdd.preco_unitario),
						preco_nivel_2: quickAdd.preco_nivel_2 != null ? Number(quickAdd.preco_nivel_2) : Number(quickAdd.preco_unitario),
						preco_nivel_3: quickAdd.preco_nivel_3 != null ? Number(quickAdd.preco_nivel_3) : Number(quickAdd.preco_unitario),
						quantidade: qty
					});
					const nivel1 = Number((_quickAdd$preco_nivel2 = quickAdd.preco_nivel_1) !== null && _quickAdd$preco_nivel2 !== void 0 ? _quickAdd$preco_nivel2 : quickAdd.preco_unitario);
					if (mode === "UNITARIO" && Math.abs(preco - nivel1) > .001) setPreco(quickAdd.id, mode, preco);
					if (mode === "PACOTE") setPreco(quickAdd.id, mode, preco);
					toast.success(`${quickAdd.nome} · ${qty}× lançado`, { duration: 1200 });
				}
			})
		]
	});
}
function QuickAddDialog(props) {
	var _product$quantidade_p, _product$brands, _product$preco_pacote2;
	const { product, existing, onClose, onConfirm } = props;
	const hasPkg = !!((product === null || product === void 0 ? void 0 : product.preco_pacote) && ((_product$quantidade_p = product === null || product === void 0 ? void 0 : product.quantidade_pacote) !== null && _product$quantidade_p !== void 0 ? _product$quantidade_p : 1) > 1);
	const [mode, setMode] = (0, import_react.useState)("UNITARIO");
	const [qty, setQty] = (0, import_react.useState)(1);
	const [preco, setPreco] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!product) return;
		setMode("UNITARIO");
		setQty(1);
		setPreco(Number(product.preco_unitario));
	}, [product === null || product === void 0 ? void 0 : product.id]);
	(0, import_react.useEffect)(() => {
		var _product$preco_pacote;
		if (!product) return;
		setPreco(mode === "PACOTE" ? Number((_product$preco_pacote = product.preco_pacote) !== null && _product$preco_pacote !== void 0 ? _product$preco_pacote : 0) : Number(product.preco_unitario));
	}, [mode, product === null || product === void 0 ? void 0 : product.id]);
	if (!product) return null;
	const totalLinha = preco * qty;
	const jaLancado = existing.reduce((s, it) => s + it.quantidade, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!product,
		onOpenChange: (o) => {
			if (!o) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-lg p-0 gap-0 overflow-hidden",
			style: {
				background: V2.LIGHT_SURFACE,
				color: V2.LIGHT_TEXT,
				borderColor: V2.LIGHT_BORDER
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "p-4 border-b",
					style: { borderColor: V2.LIGHT_BORDER },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						style: { color: V2.LIGHT_TEXT },
						className: "text-base",
						children: product.nome
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						style: { color: V2.LIGHT_MUTED },
						children: [
							((_product$brands = product.brands) === null || _product$brands === void 0 ? void 0 : _product$brands.nome) ? `${product.brands.nome} · ` : "",
							"SKU ",
							product.sku,
							jaLancado > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 font-semibold",
								style: { color: V2.TEAL },
								children: [
									"· ",
									jaLancado,
									" já no carrinho"
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 space-y-4",
					children: [
						hasPkg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setMode("UNITARIO"),
								className: "h-14 rounded-xl border-2 text-sm font-bold flex flex-col items-center justify-center",
								style: mode === "UNITARIO" ? {
									background: V2.TEAL,
									color: "#fff",
									borderColor: V2.TEAL
								} : {
									background: V2.LIGHT_SURFACE_2,
									color: V2.LIGHT_TEXT,
									borderColor: V2.LIGHT_BORDER
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Unidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] opacity-80 tabular-nums",
									children: brl(Number(product.preco_unitario))
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setMode("PACOTE"),
								className: "h-14 rounded-xl border-2 text-sm font-bold flex flex-col items-center justify-center",
								style: mode === "PACOTE" ? {
									background: V2.TEAL,
									color: "#fff",
									borderColor: V2.TEAL
								} : {
									background: V2.LIGHT_SURFACE_2,
									color: V2.LIGHT_TEXT,
									borderColor: V2.LIGHT_BORDER
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Pacote · ",
									product.quantidade_pacote,
									" un"
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] opacity-80 tabular-nums",
									children: brl(Number((_product$preco_pacote2 = product.preco_pacote) !== null && _product$preco_pacote2 !== void 0 ? _product$preco_pacote2 : 0))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs uppercase tracking-wider",
							style: { color: V2.LIGHT_MUTED },
							children: "Quantidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQty((q) => Math.max(1, q - 1)),
									className: "h-16 w-16 rounded-2xl grid place-items-center text-2xl font-bold border-2 active:scale-95",
									style: {
										background: V2.LIGHT_SURFACE_2,
										borderColor: V2.LIGHT_BORDER,
										color: V2.LIGHT_TEXT
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-6 w-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									inputMode: "numeric",
									value: qty,
									onChange: (e) => setQty(Math.max(1, Number(e.target.value) || 1)),
									className: "h-16 text-3xl font-black text-center tabular-nums flex-1",
									style: {
										background: V2.LIGHT_SURFACE_2,
										borderColor: V2.LIGHT_BORDER,
										color: V2.LIGHT_TEXT
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setQty((q) => q + 1),
									className: "h-16 w-16 rounded-2xl grid place-items-center text-2xl font-bold border-2 active:scale-95",
									style: {
										background: V2.TEAL,
										borderColor: V2.TEAL,
										color: "#fff"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-6 w-6" })
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							className: "text-xs uppercase tracking-wider",
							style: { color: V2.LIGHT_MUTED },
							children: ["Preço ", mode === "PACOTE" ? "do pacote" : "unitário"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.01",
							inputMode: "decimal",
							value: preco,
							onChange: (e) => setPreco(Number(e.target.value) || 0),
							className: "mt-1.5 h-14 text-2xl font-bold text-center tabular-nums",
							style: {
								background: V2.LIGHT_SURFACE_2,
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_TEXT
							}
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl p-4 flex items-center justify-between",
							style: { background: V2.TEAL_LIGHT },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold",
								style: { color: V2.LIGHT_TEXT },
								children: "Total desta linha"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-black tabular-nums",
								style: { color: V2.TEAL },
								children: brl(totalLinha)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "p-4 border-t grid grid-cols-2 gap-2",
					style: { borderColor: V2.LIGHT_BORDER },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: onClose,
						className: "h-14 rounded-2xl text-base font-bold",
						style: {
							background: V2.LIGHT_SURFACE_2,
							color: V2.LIGHT_TEXT,
							borderColor: V2.LIGHT_BORDER
						},
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => {
							onConfirm(mode, qty, preco);
							onClose();
						},
						className: "h-14 rounded-2xl text-base font-bold",
						style: {
							background: V2.TEAL,
							color: "#fff"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-5 w-5 mr-1" }),
							" Lançar ",
							qty,
							"×"
						]
					})]
				})
			]
		})
	});
}
function CartPanel(props) {
	const { items, setQty, setPreco, removeItem, clearCart, customer, tripId, subtotal, descontoPct, setDescontoPct, descontoRs, setDescontoRs, descontoTotal, frete, setFrete, total, tier, nextTierGap, onFinalized } = props;
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 overflow-y-auto no-scrollbar",
			style: { background: V2.LIGHT_BG },
			children: [nextTierGap && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-2.5 mt-2 px-3 py-2 rounded-lg text-[11px] flex items-center gap-2 border",
				style: {
					background: V2.TEAL_LIGHT,
					borderColor: V2.TEAL,
					color: V2.LIGHT_TEXT
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-1.5 w-1.5 rounded-full shrink-0",
					style: { background: V2.TEAL },
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex-1 leading-snug truncate",
					children: [
						"Faltam ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums font-bold",
							style: { color: V2.TEAL },
							children: brl(nextTierGap.falta)
						}),
						" para a faixa N",
						nextTierGap.proxNivel,
						"."
					]
				})]
			}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-10 text-center flex flex-col items-center gap-3",
				style: { color: V2.LIGHT_MUTED },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-16 w-16 rounded-full grid place-items-center",
					style: { background: V2.LIGHT_SURFACE_2 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-7 w-7" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						style: { color: V2.LIGHT_TEXT },
						children: "Carrinho vazio"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs mt-0.5",
						children: "Toque em uma peça para adicionar."
					})]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-2.5 space-y-1.5",
				children: items.map((it) => {
					var _it$preco_pacote, _it$preco_nivel_;
					const precoEfetivo = effectiveUnitPrice(it, tier);
					const precoBase = it.tipo_compra === "PACOTE" ? Number((_it$preco_pacote = it.preco_pacote) !== null && _it$preco_pacote !== void 0 ? _it$preco_pacote : 0) : Number((_it$preco_nivel_ = it.preco_nivel_1) !== null && _it$preco_nivel_ !== void 0 ? _it$preco_nivel_ : it.preco_unitario);
					const lineTotal = precoEfetivo * it.quantidade;
					const tierAtivo = it.tipo_compra === "UNITARIO" && tier > 1 && precoEfetivo < precoBase;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-2.5 py-2 rounded-lg border grid grid-cols-[36px_minmax(0,1fr)_28px] gap-x-2 gap-y-1.5",
						style: {
							background: V2.LIGHT_SURFACE,
							borderColor: V2.LIGHT_BORDER
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-9 w-9 rounded-md shrink-0 grid place-items-center overflow-hidden",
								style: { background: V2.LIGHT_SURFACE_2 },
								children: it.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: it.image_url,
									alt: it.nome,
									className: "max-w-full max-h-full object-contain"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
									className: "h-5 w-5",
									style: { color: V2.LIGHT_MUTED }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold leading-tight truncate",
									style: { color: V2.LIGHT_TEXT },
									children: it.nome
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px]",
									style: { color: V2.LIGHT_MUTED },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: it.tipo_compra === "PACOTE" ? `Pacote c/ ${it.quantidade_pacote}` : "Unitário" }), tierAtivo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "px-1 py-0.5 rounded text-[9px] font-bold",
										style: {
											background: V2.TEAL_LIGHT,
											color: V2.TEAL
										},
										children: ["N", tier]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeItem(it.product_id, it.tipo_compra),
								className: "h-7 w-7 rounded-md grid place-items-center transition-colors hover:bg-red-50",
								style: { color: V2.LIGHT_MUTED },
								title: "Remover",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-start-2 col-span-2 flex items-center gap-1.5 justify-between min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center rounded-md border overflow-hidden",
										style: {
											borderColor: V2.LIGHT_BORDER,
											background: V2.LIGHT_SURFACE_2
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQty(it.product_id, it.tipo_compra, Math.max(1, it.quantidade - 1)),
												className: "h-7 w-7 grid place-items-center transition-colors hover:bg-black/5",
												style: { color: V2.LIGHT_TEXT },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "number",
												min: 1,
												value: it.quantidade,
												onChange: (e) => setQty(it.product_id, it.tipo_compra, Math.max(1, parseInt(e.target.value) || 1)),
												className: "h-7 w-9 text-xs text-center tabular-nums bg-transparent outline-none font-semibold",
												style: { color: V2.LIGHT_TEXT }
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setQty(it.product_id, it.tipo_compra, it.quantidade + 1),
												className: "h-7 w-7 grid place-items-center transition-colors hover:bg-black/5",
												style: { color: V2.LIGHT_TEXT },
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PricePopover, {
										value: precoEfetivo,
										onChange: (v) => setPreco(it.product_id, it.tipo_compra, v)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "w-[82px] text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-bold tabular-nums leading-tight",
											style: { color: V2.LIGHT_TEXT },
											children: brl(lineTotal)
										}), tierAtivo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[9px] tabular-nums line-through",
											style: { color: V2.LIGHT_MUTED },
											children: brl(precoBase * it.quantidade)
										})]
									})
								]
							})
						]
					}, `${it.product_id}-${it.tipo_compra}`);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3 border-t space-y-2 shrink-0",
			style: {
				borderColor: V2.LIGHT_BORDER,
				background: V2.LIGHT_SURFACE
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-[10px] uppercase tracking-wider font-semibold",
						style: { color: V2.LIGHT_MUTED },
						children: "Desconto R$"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						value: descontoRs || "",
						onChange: (e) => {
							setDescontoRs(Math.max(0, parseFloat(e.target.value) || 0));
							setDescontoPct(0);
						},
						placeholder: "0,00",
						className: "h-9 text-sm mt-1 rounded-lg",
						style: {
							background: V2.LIGHT_SURFACE_2,
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_TEXT
						}
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						className: "text-[10px] uppercase tracking-wider font-semibold",
						style: { color: V2.LIGHT_MUTED },
						children: "Frete"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "number",
						min: 0,
						value: frete || "",
						onChange: (e) => setFrete(Math.max(0, parseFloat(e.target.value) || 0)),
						placeholder: "0,00",
						className: "h-9 text-sm mt-1 rounded-lg",
						style: {
							background: V2.LIGHT_SURFACE_2,
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_TEXT
						}
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl px-3 py-2 space-y-1",
					style: { background: V2.LIGHT_SURFACE_2 },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[11px] flex flex-wrap gap-x-3 gap-y-1",
						style: { color: V2.LIGHT_MUTED },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Subtotal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "tabular-nums",
								style: { color: V2.LIGHT_TEXT },
								children: brl(subtotal)
							})] }),
							descontoTotal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Desconto ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
								className: "tabular-nums",
								style: { color: V2.TEAL },
								children: ["- ", brl(descontoTotal)]
							})] }),
							frete > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Frete ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
								className: "tabular-nums",
								style: { color: V2.LIGHT_TEXT },
								children: brl(frete)
							})] })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between pt-1 border-t",
						style: { borderColor: V2.LIGHT_BORDER },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs uppercase tracking-wider font-semibold",
							style: { color: V2.LIGHT_MUTED },
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xl font-extrabold tabular-nums tracking-tight",
							style: { color: V2.TEAL },
							children: brl(total)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: items.length === 0 || !customer,
					onClick: () => setPayOpen(true),
					className: "w-full h-11 rounded-xl text-sm font-bold transition-all hover:brightness-110 disabled:opacity-50",
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: "Finalizar venda"
				}),
				items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						if (confirm("Limpar carrinho?")) clearCart();
					},
					className: "w-full text-[11px] text-center hover:underline",
					style: { color: V2.LIGHT_MUTED },
					children: "Limpar carrinho"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinalizeDialog, {
			open: payOpen,
			onOpenChange: setPayOpen,
			items,
			customer,
			tripId,
			total,
			desconto: descontoTotal,
			frete,
			tier,
			onFinalized: () => {
				clearCart();
				setDescontoPct(0);
				setDescontoRs(0);
				setFrete(0);
				onFinalized();
			}
		})
	] });
}
function PricePopover({ value, onChange }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [v, setV] = (0, import_react.useState)(String(value));
	(0, import_react.useEffect)(() => {
		setV(String(value));
	}, [value, open]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "h-7 px-2 rounded text-[10px] font-semibold flex items-center gap-1 border shrink-0",
				style: {
					background: V2.LIGHT_SURFACE_2,
					color: V2.LIGHT_TEXT,
					borderColor: V2.LIGHT_BORDER
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-3 w-3" }),
					" ",
					brl(value)
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopoverContent, {
			className: "w-56 p-3",
			style: {
				background: V2.LIGHT_SURFACE,
				borderColor: V2.LIGHT_BORDER,
				color: V2.LIGHT_TEXT
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					className: "text-[10px] uppercase",
					style: { color: V2.LIGHT_MUTED },
					children: "Novo preço unitário"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					autoFocus: true,
					type: "number",
					step: "0.01",
					value: v,
					onChange: (e) => setV(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							onChange(parseFloat(v) || 0);
							setOpen(false);
						}
					},
					className: "h-9 mt-1",
					style: {
						background: V2.LIGHT_SURFACE_2,
						borderColor: V2.LIGHT_BORDER,
						color: V2.LIGHT_TEXT
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 mt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						className: "flex-1",
						onClick: () => setOpen(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "flex-1",
						style: {
							background: V2.TEAL,
							color: "#fff"
						},
						onClick: () => {
							onChange(parseFloat(v) || 0);
							setOpen(false);
						},
						children: "OK"
					})]
				})
			]
		})]
	});
}
function FinalizeDialog({ open, onOpenChange, items, customer, tripId, total, desconto, frete, tier, onFinalized }) {
	var _ref, _customer$trade_name2, _dupWarn$total, _customer$trade_name3;
	const [tipo, setTipo] = (0, import_react.useState)("PIX");
	const [modalidade, setModalidade] = (0, import_react.useState)("CREDITO");
	const [bandeira, setBandeira] = (0, import_react.useState)("");
	const [parcelas, setParcelas] = (0, import_react.useState)(1);
	const [prazo, setPrazo] = (0, import_react.useState)("30");
	const [antecipar, setAntecipar] = (0, import_react.useState)(false);
	const [accountId, setAccountId] = (0, import_react.useState)("");
	const [obs, setObs] = (0, import_react.useState)("");
	const { data: accounts = [] } = useBankAccounts();
	const create = useCreateOrder();
	const confirmPay = useConfirmPayment();
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [dupWarn, setDupWarn] = (0, import_react.useState)(null);
	const [forceSave, setForceSave] = (0, import_react.useState)(false);
	const { data: fees = [] } = useQuery({
		queryKey: ["payment_fees"],
		queryFn: async () => {
			const { data, error } = await supabase.from("payment_fees").select("bandeira,credito_avista,credito_2_6,credito_7_12,debito").eq("ativo", true).order("ordem");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: antecTaxa = 2.09 } = useQuery({
		queryKey: ["setting", "antecipacao_taxa"],
		queryFn: async () => {
			const { data } = await supabase.from("system_settings").select("valor").eq("categoria", "financeiro").eq("chave", "antecipacao_taxa_percentual").maybeSingle();
			const v = data === null || data === void 0 ? void 0 : data.valor;
			return typeof v === "number" ? v : Number(v !== null && v !== void 0 ? v : 2.09);
		}
	});
	const feeInfo = (0, import_react.useMemo)(() => {
		var _b$credito_avista, _b$credito_2_, _b$credito_7_;
		if (tipo !== "CARTAO" || modalidade !== "CREDITO" || !bandeira) return null;
		const b = fees.find((f) => f.bandeira.toLowerCase() === bandeira.toLowerCase());
		if (!b) return null;
		const marca = parcelas === 1 ? Number((_b$credito_avista = b.credito_avista) !== null && _b$credito_avista !== void 0 ? _b$credito_avista : 0) : parcelas === 2 ? Number((_b$credito_2_ = b.credito_2_6) !== null && _b$credito_2_ !== void 0 ? _b$credito_2_ : 0) : Number((_b$credito_7_ = b.credito_7_12) !== null && _b$credito_7_ !== void 0 ? _b$credito_7_ : 0);
		const antec = antecipar ? Number(antecTaxa) : 0;
		const totalPct = marca + antec;
		const taxaValor = Math.round(total * totalPct / 100 * 100) / 100;
		return {
			marca,
			antec,
			totalPct,
			taxaValor,
			liquido: total - taxaValor
		};
	}, [
		tipo,
		modalidade,
		bandeira,
		parcelas,
		antecipar,
		fees,
		antecTaxa,
		total
	]);
	(0, import_react.useEffect)(() => {
		if (open && !accountId && accounts.length > 0) setAccountId(accounts[0].id);
	}, [
		open,
		accounts,
		accountId
	]);
	async function checkDuplicate() {
		if (!customer) return false;
		const start = /* @__PURE__ */ new Date();
		start.setHours(0, 0, 0, 0);
		const end = /* @__PURE__ */ new Date();
		end.setHours(23, 59, 59, 999);
		const { data } = await supabase.from("orders").select("id, total, created_at, status").eq("company_id", customer.id).neq("status", "CANCELADO").gte("created_at", start.toISOString()).lte("created_at", end.toISOString());
		const match = (data !== null && data !== void 0 ? data : []).find((o) => Math.abs(Number(o.total) - total) < .01);
		if (match) {
			setDupWarn({
				id: match.id,
				total: Number(match.total),
				created_at: match.created_at
			});
			return true;
		}
		return false;
	}
	const submittingRef = (0, import_react.useRef)(false);
	async function finalizar() {
		if (submittingRef.current) return;
		if (!customer) {
			toast.error("Sem cliente.");
			return;
		}
		if (items.length === 0) {
			toast.error("Carrinho vazio.");
			return;
		}
		if (!forceSave && await checkDuplicate()) return;
		submittingRef.current = true;
		setSaving(true);
		try {
			var _account$nome;
			const itemsPriced = items.map((i) => _objectSpread2(_objectSpread2({}, i), {}, { preco_unitario: i.tipo_compra === "UNITARIO" ? effectiveUnitPrice(i, tier) : i.preco_unitario }));
			const orderId = await create.mutateAsync({
				company_id: customer.id,
				address_id: null,
				origem: tripId ? "VISITA" : "VISITA",
				items: itemsPriced,
				frete,
				desconto,
				observacao: obs || void 0,
				pagamento: tipo === "CARTAO" ? "CARTAO" : "PIX",
				trip_id: tripId !== null && tripId !== void 0 ? tripId : null
			});
			const account = accounts.find((a) => a.id === accountId);
			const isCartao = tipo === "CARTAO";
			await confirmPay.mutateAsync({
				order_id: orderId,
				company_id: customer.id,
				total,
				tipo,
				modalidade: isCartao ? modalidade : void 0,
				bandeira: isCartao ? bandeira || null : null,
				antecipado: isCartao && modalidade === "CREDITO" ? antecipar : false,
				conta: (_account$nome = account === null || account === void 0 ? void 0 : account.nome) !== null && _account$nome !== void 0 ? _account$nome : "—",
				account_id: accountId || null,
				parcelas: isCartao && modalidade === "CREDITO" ? parcelas : 1,
				prazos: tipo === "FATURADO" ? prazo.split("-").map(Number) : void 0,
				observacao: obs || void 0
			});
			toast.success("Venda finalizada!");
			setForceSave(false);
			onOpenChange(false);
			onFinalized();
		} catch (e) {
			var _e$message;
			toast.error((_e$message = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message !== void 0 ? _e$message : "Erro ao finalizar");
		} finally {
			submittingRef.current = false;
			setSaving(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Finalizar venda" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: ["Cliente: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: (_ref = (_customer$trade_name2 = customer === null || customer === void 0 ? void 0 : customer.trade_name) !== null && _customer$trade_name2 !== void 0 ? _customer$trade_name2 : customer === null || customer === void 0 ? void 0 : customer.legal_name) !== null && _ref !== void 0 ? _ref : "—" })] })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs uppercase text-muted-foreground",
							children: "Forma de pagamento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2 mt-1",
							children: [
								{
									k: "PIX",
									icon: QrCode,
									label: "PIX"
								},
								{
									k: "CARTAO",
									icon: CreditCard,
									label: "Cartão"
								},
								{
									k: "DINHEIRO",
									icon: Banknote,
									label: "Dinheiro"
								},
								{
									k: "FATURADO",
									icon: CalendarClock,
									label: "Faturado"
								}
							].map((p) => {
								const Icon = p.icon;
								const active = tipo === p.k;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setTipo(p.k),
									className: cn("h-16 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold transition-colors"),
									style: active ? {
										background: V2.TEAL,
										color: "#fff",
										borderColor: V2.TEAL
									} : {
										background: V2.LIGHT_SURFACE_2,
										color: V2.LIGHT_TEXT,
										borderColor: V2.LIGHT_BORDER
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), p.label]
								}, p.k);
							})
						})] }),
						tipo === "CARTAO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 rounded-xl border p-3",
							style: {
								borderColor: V2.LIGHT_BORDER,
								background: V2.LIGHT_SURFACE_2
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs uppercase text-muted-foreground",
									children: "Modalidade"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-2 mt-1",
									children: ["CREDITO", "DEBITO"].map((m) => {
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setModalidade(m);
												if (m === "DEBITO") {
													setParcelas(1);
													setAntecipar(false);
												}
											},
											className: "h-10 rounded-md border text-xs font-semibold",
											style: modalidade === m ? {
												background: V2.TEAL,
												color: "#fff",
												borderColor: V2.TEAL
											} : {
												background: "#fff",
												color: V2.LIGHT_TEXT,
												borderColor: V2.LIGHT_BORDER
											},
											children: m === "CREDITO" ? "Crédito" : "Débito (sem taxa)"
										}, m);
									})
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs uppercase text-muted-foreground",
										children: "Bandeira"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: bandeira,
										onChange: (e) => setBandeira(e.target.value),
										className: "w-full h-10 rounded-md border px-2 text-sm mt-1",
										style: {
											background: "#fff",
											borderColor: V2.LIGHT_BORDER,
											color: V2.LIGHT_TEXT
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "— Selecione —"
										}), fees.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: f.bandeira,
											children: f.bandeira
										}, f.bandeira))]
									})] }), modalidade === "CREDITO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs uppercase text-muted-foreground",
										children: "Parcelas"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: parcelas,
										onChange: (e) => setParcelas(Number(e.target.value)),
										className: "w-full h-10 rounded-md border px-2 text-sm mt-1",
										style: {
											background: "#fff",
											borderColor: V2.LIGHT_BORDER,
											color: V2.LIGHT_TEXT
										},
										children: [
											1,
											2,
											3
										].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: n,
											children: [n, "x"]
										}, n))
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border p-2 text-xs",
									style: {
										borderColor: V2.LIGHT_BORDER,
										background: "#fff"
									},
									children: [
										"Todos os recebimentos no cartão caem em ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "D+1" }),
										" na conta ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "TON" }),
										"."
									]
								}),
								feeInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md bg-white border p-2 text-xs space-y-1",
									style: { borderColor: V2.LIGHT_BORDER },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												"Taxa Ton (",
												modalidade === "CREDITO" ? `${parcelas}x` : "Débito",
												")"
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [feeInfo.marca.toFixed(2), "%"] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between font-semibold border-t pt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Taxa total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												brl(feeInfo.taxaValor),
												" (",
												feeInfo.totalPct.toFixed(2),
												"%)"
											] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between",
											style: { color: V2.TEAL },
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Líquido a receber (D+1)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-bold",
												children: brl(feeInfo.liquido)
											})]
										})
									]
								})
							]
						}),
						tipo === "FATURADO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 rounded-xl border p-3",
							style: {
								borderColor: V2.LIGHT_BORDER,
								background: V2.LIGHT_SURFACE_2
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs uppercase text-muted-foreground",
									children: "Prazo de recebimento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: prazo,
									onChange: (e) => setPrazo(e.target.value),
									className: "w-full h-10 rounded-md border px-2 text-sm",
									style: {
										background: "#fff",
										borderColor: V2.LIGHT_BORDER,
										color: V2.LIGHT_TEXT
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: "30",
											children: ["30 dias — 1x de ", brl(total)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: "30-60",
											children: ["30/60 dias — 2x de ", brl(total / 2)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
											value: "30-60-90",
											children: ["30/60/90 dias — 3x de ", brl(total / 3)]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Gera contas a receber em aberto no Financeiro, com os vencimentos escolhidos."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs uppercase text-muted-foreground",
							children: "Conta / caixa"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: accountId,
							onChange: (e) => setAccountId(e.target.value),
							className: "w-full h-10 rounded-md border px-3 text-sm mt-1",
							style: {
								background: V2.LIGHT_SURFACE_2,
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_TEXT
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "— Selecione —"
							}), accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: a.id,
								children: a.nome
							}, a.id))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs uppercase text-muted-foreground",
							children: "Observação (opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: obs,
							onChange: (e) => setObs(e.target.value),
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl p-3 flex items-center justify-between",
							style: {
								background: V2.LIGHT_SURFACE_2,
								color: V2.LIGHT_TEXT
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "Total a receber"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-extrabold tabular-nums",
								style: { color: V2.TEAL },
								children: brl(total)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					disabled: saving,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: finalizar,
					disabled: saving || !accountId || tipo === "CARTAO" && !bandeira,
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 mr-1" }), "Confirmar e concluir"]
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!dupWarn,
			onOpenChange: (v) => !v && setDupWarn(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Venda duplicada?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
					"Já existe uma venda de ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl((_dupWarn$total = dupWarn === null || dupWarn === void 0 ? void 0 : dupWarn.total) !== null && _dupWarn$total !== void 0 ? _dupWarn$total : 0) }),
					" para ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: (_customer$trade_name3 = customer === null || customer === void 0 ? void 0 : customer.trade_name) !== null && _customer$trade_name3 !== void 0 ? _customer$trade_name3 : customer === null || customer === void 0 ? void 0 : customer.legal_name }),
					" hoje",
					dupWarn ? ` às ${new Date(dupWarn.created_at).toLocaleTimeString("pt-BR", {
						hour: "2-digit",
						minute: "2-digit"
					})}` : "",
					". Deseja lançar mesmo assim?"
				] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setDupWarn(null),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					onClick: () => {
						setDupWarn(null);
						setForceSave(true);
						setTimeout(finalizar, 0);
					},
					children: "Lançar mesmo assim"
				})] })]
			})
		})]
	});
}
//#endregion
export { PdvPage as component };
