import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { i as useRoles, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { D as ShoppingBag, E as ShoppingCart, G as Plus, _ as Trash2, k as ShieldCheck, mn as ArrowLeft, p as Truck, pn as ArrowRight, rt as MessageCircle, tt as Minus } from "../_libs/lucide-react.mjs";
import { o as itemLineTotal, r as cartSubtotal, s as useCart } from "./use-cart-D1K0BW4t.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
import { t as WhatsAppFab } from "./whatsapp-fab-BGRFc-KK.mjs";
import { t as productImageUrl } from "./storage-D5q-6nwW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-MAjsN05X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BG = "#faf8f5";
var SURFACE = "#ffffff";
var SURFACE_2 = "#f5f0e8";
var BORDER = "#e8e2d8";
var ORANGE = "#c9a96e";
var TEXT = "#3d2b1f";
var MUTED = "#8b7355";
function CartPageV3() {
	var _sellerCustomer$trade;
	const { user } = useAuth();
	const { data: roles = [] } = useRoles(user);
	roles.some((r) => r === "admin" || r === "vendedor" || r === "gerente");
	const sellerCustomer = useSellerSession((s) => s.customer);
	const items = useCart((s) => s.items);
	const setQty = useCart((s) => s.setQty);
	const setTipo = useCart((s) => s.setTipo);
	useCart((s) => s.setPreco);
	useCart((s) => s.setDesconto);
	const remove = useCart((s) => s.remove);
	const clear = useCart((s) => s.clear);
	const navigate = useNavigate();
	const subtotal = cartSubtotal(items);
	const totalItemsCount = items.reduce((n, i) => n + i.quantidade * (i.tipo_compra === "PACOTE" && i.quantidade_pacote ? i.quantidade_pacote : 1), 0);
	const [editing, setEditing] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full flex flex-col",
		style: {
			background: BG,
			color: TEXT
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 backdrop-blur border-b",
				style: {
					background: "rgba(255,255,255,0.92)",
					borderColor: BORDER
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto px-5 h-16 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/v3",
						className: "flex items-center gap-2.5 group",
						"aria-label": "Atacado Prime",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand-logo.png",
							alt: "Atacado Prime",
							width: 44,
							height: 44,
							className: "h-11 w-11 object-contain transition-transform duration-300 group-hover:scale-105"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-extrabold tracking-tight text-base sm:text-lg leading-none",
								style: { color: TEXT },
								children: ["Atacado ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { color: ORANGE },
									children: "Prime"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold tracking-wider uppercase text-amber-700/80 mt-0.5",
								children: "Meu Carrinho"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://wa.me/5534998651112?text=Ol%C3%A1!%20Estou%20no%20carrinho%20do%20site%20e%20preciso%20de%20ajuda.",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "h-9 px-3.5 rounded-full text-xs font-bold hidden sm:inline-flex items-center gap-1.5 transition-colors border",
							style: {
								borderColor: "#25D366",
								color: "#1b8a43",
								background: "rgba(37, 211, 102, 0.08)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5 fill-current" }), "WhatsApp"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/v3",
							className: "h-9 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border transition-colors hover:bg-black/5",
							style: {
								borderColor: BORDER,
								color: TEXT
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), "Continuar comprando"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 max-w-6xl w-full mx-auto px-5 py-8 sm:py-12",
				children: [sellerCustomer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 rounded-2xl p-4 border flex flex-wrap items-center justify-between gap-3",
					style: {
						background: SURFACE,
						borderColor: ORANGE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-extrabold uppercase tracking-widest",
						style: { color: ORANGE },
						children: "Venda em Visita (Vendedor)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-bold text-sm sm:text-base",
						style: { color: TEXT },
						children: ["Cliente: ", (_sellerCustomer$trade = sellerCustomer.trade_name) !== null && _sellerCustomer$trade !== void 0 ? _sellerCustomer$trade : sellerCustomer.legal_name]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs px-3 py-1 rounded-full font-semibold",
						style: {
							background: SURFACE_2,
							color: MUTED
						},
						children: "Modo Edição de Preços Ativo"
					})]
				}), items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl border p-12 text-center max-w-lg mx-auto my-8 shadow-sm",
					style: {
						background: SURFACE,
						borderColor: BORDER
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 w-20 rounded-full mx-auto grid place-items-center mb-5",
							style: {
								background: SURFACE_2,
								color: ORANGE
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-10 w-10" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-black tracking-tight",
							style: { color: TEXT },
							children: "Seu carrinho está vazio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm max-w-xs mx-auto font-medium",
							style: { color: MUTED },
							children: "Navegue pelo nosso catálogo de chaves, capas e controles para adicionar produtos com preço de atacado."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/v3",
							className: "mt-6 inline-flex h-12 px-8 rounded-full font-black text-sm items-center gap-2 shadow-lg transition-transform active:scale-95",
							style: {
								background: ORANGE,
								color: "#ffffff"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4" }), " Ir ao Catálogo B2B"]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid lg:grid-cols-12 gap-8 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-7 xl:col-span-8 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-2 border-b",
							style: { borderColor: BORDER },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-xl sm:text-2xl font-black",
								style: { color: TEXT },
								children: [
									"Itens do Pedido (",
									items.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: clear,
								className: "text-xs font-bold transition-colors hover:underline",
								style: { color: "#dc2626" },
								children: "Esvaziar carrinho"
							})]
						}), items.map((i) => {
							const unitPrice = i.tipo_compra === "PACOTE" && i.preco_pacote ? Number(i.preco_pacote) : Number(i.preco_unitario);
							const lineTotal = itemLineTotal(i);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border p-4 sm:p-5 flex gap-4 transition-shadow hover:shadow-md",
								style: {
									background: SURFACE,
									borderColor: BORDER
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-20 h-20 sm:w-24 sm:h-24 rounded-xl border shrink-0 overflow-hidden relative grid place-items-center",
									style: {
										background: SURFACE_2,
										borderColor: BORDER
									},
									children: i.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: productImageUrl(i.image_url),
										alt: i.nome,
										className: "w-full h-full object-contain p-2"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-mono text-center uppercase",
										style: { color: MUTED },
										children: "sem foto"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0 flex flex-col justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] font-mono font-bold uppercase tracking-wider block",
												style: { color: ORANGE },
												children: ["SKU: ", i.sku || "—"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-sm sm:text-base leading-tight mt-0.5 line-clamp-2",
												style: { color: TEXT },
												children: i.nome
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => remove(i.product_id, i.tipo_compra),
											className: "p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors",
											title: "Remover produto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
										})]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t",
										style: { borderColor: BORDER },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [i.preco_pacote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: i.tipo_compra,
												onChange: (e) => setTipo(i.product_id, i.tipo_compra, e.target.value),
												className: "h-9 px-3 rounded-lg border text-xs font-semibold bg-white outline-none",
												style: {
													borderColor: BORDER,
													color: TEXT
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "UNITARIO",
													children: "Unitário"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: "PACOTE",
													children: [
														"Pacote (",
														i.quantidade_pacote,
														"un)"
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center rounded-lg border overflow-hidden",
												style: {
													borderColor: BORDER,
													background: SURFACE
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setQty(i.product_id, i.tipo_compra, Math.max(1, i.quantidade - 1)),
														className: "h-9 w-9 grid place-items-center hover:bg-black/5 transition-colors",
														style: { color: TEXT },
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														type: "number",
														min: 1,
														value: i.quantidade,
														onChange: (e) => setQty(i.product_id, i.tipo_compra, Math.max(1, Number(e.target.value))),
														className: "w-12 h-9 text-center font-bold text-sm outline-none bg-transparent",
														style: { color: TEXT }
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setQty(i.product_id, i.tipo_compra, i.quantidade + 1),
														className: "h-9 w-9 grid place-items-center hover:bg-black/5 transition-colors",
														style: { color: TEXT },
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-right",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px] uppercase font-semibold block",
												style: { color: MUTED },
												children: [
													i.tipo_compra === "PACOTE" ? `Pacote (${i.quantidade_pacote}un)` : "Unitário",
													" · ",
													brl(unitPrice)
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-black text-base sm:text-lg",
												style: { color: TEXT },
												children: brl(lineTotal)
											})]
										})]
									})]
								})]
							}, `${i.product_id}-${i.tipo_compra}`);
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:col-span-5 xl:col-span-4 sticky top-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border p-6 shadow-lg space-y-5",
							style: {
								background: SURFACE,
								borderColor: BORDER
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pb-3 border-b",
									style: { borderColor: BORDER },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-extrabold text-lg",
										style: { color: TEXT },
										children: "Resumo do Pedido"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-xs font-bold px-2.5 py-1 rounded-full",
										style: {
											background: SURFACE_2,
											color: ORANGE
										},
										children: [totalItemsCount, " peças"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { color: MUTED },
											children: "Subtotal dos produtos"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-bold",
											style: { color: TEXT },
											children: brl(subtotal)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { color: MUTED },
											children: "Frete de envio"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-amber-700",
											children: "Calculado no Checkout"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-4 border-t space-y-1",
									style: { borderColor: BORDER },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black text-lg",
											style: { color: TEXT },
											children: "Total Estimado"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black text-2xl",
											style: { color: ORANGE },
											children: brl(subtotal)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-right",
										style: { color: MUTED },
										children: "Condições de pagamento selecionáveis na próxima etapa"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => navigate({ to: "/checkout" }),
									className: "w-full h-14 rounded-full font-black text-base flex items-center justify-center gap-2 shadow-xl transition-transform active:scale-95",
									style: {
										background: ORANGE,
										color: "#ffffff"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Avançar para o Checkout" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-5 w-5" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pt-4 space-y-2.5 border-t text-xs font-medium",
									style: {
										borderColor: BORDER,
										color: MUTED
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
											className: "h-4 w-4 shrink-0",
											style: { color: ORANGE }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Despachamos em até 24 horas úteis" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
											className: "h-4 w-4 shrink-0",
											style: { color: ORANGE }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Garantia de fábrica e troca descompllicada" })]
									})]
								})
							]
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t mt-auto",
				style: {
					borderColor: BORDER,
					background: SURFACE
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-6xl mx-auto px-5 py-8 text-xs",
					style: { color: MUTED },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-black text-sm tracking-[0.2em] uppercase mb-2",
							style: { color: TEXT },
							children: "Atacado Prime"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Uberlândia-MG · (34) 99865-1112 · contato@primeautomotive.app" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 opacity-60",
							children: [
								"© ",
								(/* @__PURE__ */ new Date()).getFullYear(),
								" Prime Automotive · Distribuidor B2B"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFab, { message: "Olá! Estou montando um pedido no carrinho do Atacado Prime e gostaria de suporte." })
		]
	});
}
//#endregion
export { CartPageV3 as component };
