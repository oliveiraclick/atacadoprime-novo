import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { D as ShoppingBag, N as Search, Xt as ChevronRight, b as Tag, bt as House, it as Menu, k as ShieldCheck, n as X, p as Truck, q as Phone, rt as MessageCircle, ut as LogIn, w as Sparkles, xt as Heart } from "../_libs/lucide-react.mjs";
import { i as cartUnitCount, r as cartSubtotal, s as useCart$1 } from "./use-cart-D1K0BW4t.mjs";
import { t as WhatsAppFab } from "./whatsapp-fab-BGRFc-KK.mjs";
import { t as productImageUrl } from "./storage-D5q-6nwW.mjs";
import { i as useCanSeePrices } from "./use-catalog-DqziQTPw.mjs";
import { n as productsQueryOptions, t as categoriesQueryOptions } from "./routes-DTnN_21C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BIst0wBT.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function toLine(i) {
	const preco = i.tipo_compra === "PACOTE" && i.preco_pacote != null ? Number(i.preco_pacote) : Number(i.preco_unitario);
	return {
		id: i.product_id,
		tipo: i.tipo_compra,
		nome: i.nome,
		sku: i.sku,
		image: i.image_url,
		preco,
		qty: i.quantidade,
		raw: i
	};
}
function useCart() {
	const rawItems = useCart$1((s) => s.items);
	const addReal = useCart$1((s) => s.add);
	const removeReal = useCart$1((s) => s.remove);
	const setQtyReal = useCart$1((s) => s.setQty);
	const clear = useCart$1((s) => s.clear);
	return {
		items: rawItems.map(toLine),
		add: (0, import_react.useCallback)((item, qty = 1) => {
			var _item$tipo, _item$sku, _item$image, _item$preco, _item$quantidade_paco;
			const tipo = (_item$tipo = item.tipo) !== null && _item$tipo !== void 0 ? _item$tipo : "UNITARIO";
			addReal({
				product_id: item.id,
				nome: item.nome,
				sku: (_item$sku = item.sku) !== null && _item$sku !== void 0 ? _item$sku : "",
				image_url: (_item$image = item.image) !== null && _item$image !== void 0 ? _item$image : null,
				tipo_compra: tipo,
				preco_unitario: Number((_item$preco = item.preco) !== null && _item$preco !== void 0 ? _item$preco : 0),
				quantidade_pacote: Number((_item$quantidade_paco = item.quantidade_pacote) !== null && _item$quantidade_paco !== void 0 ? _item$quantidade_paco : 1) || 1,
				preco_pacote: item.preco_pacote != null ? Number(item.preco_pacote) : null,
				quantidade: qty
			});
		}, [addReal]),
		remove: (0, import_react.useCallback)((id, tipo) => {
			rawItems.filter((i) => i.product_id === id && (tipo ? i.tipo_compra === tipo : true)).forEach((i) => removeReal(i.product_id, i.tipo_compra));
		}, [rawItems, removeReal]),
		setQty: (0, import_react.useCallback)((id, qty, tipo) => {
			const line = rawItems.find((i) => i.product_id === id && (tipo ? i.tipo_compra === tipo : true));
			if (!line) return;
			if (qty <= 0) {
				removeReal(line.product_id, line.tipo_compra);
				return;
			}
			setQtyReal(line.product_id, line.tipo_compra, qty);
		}, [
			rawItems,
			removeReal,
			setQtyReal
		]),
		clear,
		count: cartUnitCount(rawItems),
		total: cartSubtotal(rawItems)
	};
}
var v3_hero_warm_default = "/assets/v3-hero-warm-DMB9bn8l.jpg";
var BG = "#faf8f5";
var SURFACE = "#ffffff";
var SURFACE_2 = "#f5f0e8";
var BORDER = "#e8e2d8";
var ORANGE = "#c9a96e";
var TEXT = "#3d2b1f";
var MUTED = "#8b7355";
function RootHome() {
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)(null);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const { data: cats = [] } = useSuspenseQuery(categoriesQueryOptions());
	const { data: products = [] } = useSuspenseQuery(productsQueryOptions());
	const { canSeePrices } = useCanSeePrices();
	const { add: addToCart } = useCart();
	const GROUPS = [
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
	const catIds = cat ? new Set([cat, ...cats.filter((c) => c.parent_id === cat).map((c) => c.id)]) : null;
	const groups = GROUPS.map(({ label, tipo }) => {
		return {
			label,
			id: null,
			items: products.filter((p) => p.tipo === tipo && (!catIds || p.categoria_id && catIds.has(p.categoria_id)))
		};
	}).filter((g) => g.items.length > 0);
	const submitSearch = (e) => {
		e.preventDefault();
		const term = q.trim();
		navigate({
			to: "/",
			search: term ? { q: term } : {}
		});
	};
	const rootCats = cats.filter((c) => !c.parent_id).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full",
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
						to: "/",
						className: "flex items-center gap-2.5 group",
						"aria-label": "Atacado Prime",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand-logo.png",
							alt: "Atacado Prime",
							width: 48,
							height: 48,
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
								children: "Distribuidor B2B"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://wa.me/5534998651112?text=Ol%C3%A1!%20Gostaria%20de%20atendimento%20para%20revendedor%20no%20Atacado%20Prime.",
								target: "_blank",
								rel: "noopener noreferrer",
								className: "h-9 px-3.5 rounded-full text-xs font-bold hidden md:inline-flex items-center gap-1.5 transition-colors border",
								style: {
									borderColor: "#25D366",
									color: "#1b8a43",
									background: "rgba(37, 211, 102, 0.08)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-3.5 w-3.5 fill-current" }), "WhatsApp"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								className: "h-9 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-transform active:scale-95 shadow-sm",
								style: {
									background: ORANGE,
									color: "#fff"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pedido" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMenuOpen(true),
								"aria-label": "Abrir menu",
								className: "h-10 w-10 grid place-items-center rounded-full border transition-colors hover:bg-black/5",
								style: {
									borderColor: BORDER,
									color: TEXT,
									background: SURFACE
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
							})
						]
					})]
				})
			}),
			menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex",
				role: "dialog",
				"aria-modal": "true",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Fechar menu",
					onClick: () => setMenuOpen(false),
					className: "flex-1",
					style: { background: "rgba(61,43,31,0.4)" }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "w-[82%] max-w-sm h-full flex flex-col",
					style: {
						background: SURFACE,
						borderLeft: `1px solid ${BORDER}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-14 px-5 flex items-center justify-between border-b",
							style: { borderColor: BORDER },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-black tracking-[0.25em] uppercase",
								style: { color: TEXT },
								children: "Menu"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMenuOpen(false),
								"aria-label": "Fechar menu",
								className: "h-9 w-9 grid place-items-center rounded-full",
								style: { color: TEXT },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex-1 overflow-y-auto py-4",
							children: [
								{
									to: "/",
									label: "Home",
									icon: House
								},
								{
									to: "/v3/descontos",
									label: "Como funcionam os descontos",
									icon: Tag
								},
								{
									to: "/favorites",
									label: "Favoritos",
									icon: Heart
								},
								{
									to: "/cart",
									label: "Meu carrinho",
									icon: ShoppingBag
								},
								{
									to: "/auth",
									label: "Entrar / Cadastrar",
									icon: LogIn
								}
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: i.to,
								onClick: () => setMenuOpen(false),
								className: "flex items-center gap-3 px-5 py-3 text-sm font-semibold",
								style: { color: TEXT },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-9 w-9 grid place-items-center rounded-lg",
									style: {
										background: "rgba(201,169,110,0.12)",
										color: ORANGE
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i.icon, { className: "h-4 w-4" })
								}), i.label]
							}, i.to + i.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-5 border-t text-[11px]",
							style: {
								borderColor: BORDER,
								color: MUTED
							},
							children: "(34) 99865-1112 · Uberlândia-MG"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden",
				style: { background: "#faf8f5" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: v3_hero_warm_default,
						alt: "",
						"aria-hidden": true,
						width: 1920,
						height: 1080,
						className: "absolute inset-0 w-full h-full object-cover object-right"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute inset-0 md:hidden",
						style: { background: "linear-gradient(180deg, rgba(250,248,245,0.96) 0%, rgba(250,248,245,0.88) 55%, rgba(250,248,245,0.75) 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute inset-0 hidden md:block",
						style: { background: "linear-gradient(90deg, rgba(250,248,245,0.95) 0%, rgba(250,248,245,0.80) 45%, rgba(250,248,245,0.15) 85%, transparent 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						"aria-hidden": true,
						className: "absolute inset-x-0 bottom-0 h-32",
						style: { background: `linear-gradient(180deg, transparent, ${BG})` }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative max-w-6xl mx-auto px-5 py-14 lg:py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-[0.15em] mb-5 shadow-sm",
									style: {
										background: ORANGE,
										color: "#ffffff"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3.5 w-3.5" }), " Lançamento Oficial · Catálogo B2B"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "font-black text-fluid-hero text-balance leading-[1.1]",
									style: { color: TEXT },
									children: [
										"Chaves, Capas e Controles.",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: { color: ORANGE },
											children: "Direto de quem distribui."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-fluid-body max-w-xl font-medium leading-relaxed",
									style: { color: "#5a4633" },
									children: "Linha completa Pósitron, Olimpus, Sistec, Hinor, Bravo e modelos originais. Tabela especial para revendedores, chaveiros e lojas automotivas em todo o Brasil."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitSearch,
									className: "mt-8 flex items-center gap-2 max-w-md rounded-full px-3 py-2 border shadow-xl transition-all focus-within:ring-2 focus-within:ring-[#c9a96e]",
									style: {
										background: SURFACE,
										borderColor: BORDER
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 flex items-center gap-2 px-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
											className: "h-5 w-5 shrink-0",
											style: { color: MUTED }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: q,
											onChange: (e) => setQ(e.target.value),
											placeholder: "Buscar modelo de chave, capa ou controle...",
											className: "flex-1 outline-none bg-transparent text-sm font-medium",
											style: { color: TEXT }
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										className: "h-11 px-6 rounded-full font-extrabold text-sm transition-transform active:scale-95 shadow",
										style: {
											background: ORANGE,
											color: "#fff"
										},
										children: "Buscar"
									})]
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "max-w-6xl mx-auto px-5 pb-32 -mt-12 relative z-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "grid grid-cols-1 md:grid-cols-3 gap-4",
						children: [
							{
								icon: Truck,
								t: "Entrega rápida",
								s: "Enviamos em até 24h"
							},
							{
								icon: ShieldCheck,
								t: "Garantia real",
								s: "Troca sem burocracia"
							},
							{
								icon: Phone,
								t: "Suporte especializado",
								s: "Atendimento técnico"
							}
						].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl p-5 border flex items-center gap-4",
							style: {
								background: SURFACE,
								borderColor: BORDER
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-xl grid place-items-center shrink-0",
								style: {
									background: "rgba(201,169,110,0.12)",
									color: ORANGE
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(b.icon, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-bold",
								style: { color: TEXT },
								children: b.t
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs",
								style: { color: MUTED },
								children: b.s
							})] })]
						}, b.t))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/v3/descontos",
						className: "mt-6 rounded-2xl p-5 sm:p-6 flex items-center gap-4 border transition hover:shadow-md",
						style: {
							background: SURFACE,
							borderColor: ORANGE
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-12 w-12 rounded-xl grid place-items-center shrink-0",
								style: {
									background: ORANGE,
									color: "#fff"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm sm:text-base font-black",
									style: { color: TEXT },
									children: "Quanto mais você leva, mais barato fica"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs sm:text-sm mt-0.5",
									style: { color: MUTED },
									children: "Entenda as três tabelas de desconto em 30 segundos."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								className: "h-5 w-5 shrink-0",
								style: { color: ORANGE }
							})
						]
					}),
					rootCats.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold text-xl",
								style: { color: TEXT },
								children: "Categorias"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setCat(null),
								className: "text-xs font-semibold flex items-center gap-0.5",
								style: { color: ORANGE },
								children: ["Ver tudo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "inline h-3 w-3" })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 snap-x",
							children: rootCats.map((c) => {
								const active = cat === c.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCat(active ? null : c.id),
									className: cn("shrink-0 snap-start px-5 h-11 rounded-full text-sm font-semibold transition border"),
									style: active ? {
										background: ORANGE,
										color: "#fff",
										borderColor: ORANGE
									} : {
										background: SURFACE,
										color: TEXT,
										borderColor: BORDER
									},
									children: c.nome
								}, c.id);
							})
						})]
					}),
					groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end justify-between mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-bold text-xl",
								style: { color: TEXT },
								children: group.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs",
								style: { color: MUTED },
								children: [
									group.items.length,
									" ",
									group.items.length === 1 ? "produto" : "produtos",
									" disponíveis"
								]
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
							children: group.items.map((p) => {
								var _p$preco_unitario, _p$quantidade_pacote, _p$product_images, _imgs$, _p$categories$nome, _p$categories, _ref, _p$sku;
								const price = Number((_p$preco_unitario = p.preco_unitario) !== null && _p$preco_unitario !== void 0 ? _p$preco_unitario : 0);
								const pkgPrice = p.preco_pacote != null ? Number(p.preco_pacote) : null;
								const pkgQty = Number((_p$quantidade_pacote = p.quantidade_pacote) !== null && _p$quantidade_pacote !== void 0 ? _p$quantidade_pacote : 1);
								const hasPkg = pkgPrice != null && pkgQty > 1;
								const image = (_imgs$ = ((_p$product_images = p.product_images) !== null && _p$product_images !== void 0 ? _p$product_images : []).slice().sort((a, b) => {
									var _a$ordem, _b$ordem;
									return ((_a$ordem = a.ordem) !== null && _a$ordem !== void 0 ? _a$ordem : 0) - ((_b$ordem = b.ordem) !== null && _b$ordem !== void 0 ? _b$ordem : 0);
								})[0]) === null || _imgs$ === void 0 ? void 0 : _imgs$.image_url;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
									className: "rounded-2xl border overflow-hidden flex flex-col hover:shadow-md transition-shadow",
									style: {
										background: SURFACE,
										borderColor: BORDER
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "block aspect-square relative overflow-hidden",
										style: { background: SURFACE },
										children: image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: productImageUrl(image),
											alt: p.nome,
											loading: "lazy",
											className: "w-full h-full object-contain p-3"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute inset-0 grid place-items-center text-[10px] font-mono uppercase tracking-wider",
											style: { color: MUTED },
											children: (_p$categories$nome = (_p$categories = p.categories) === null || _p$categories === void 0 ? void 0 : _p$categories.nome) !== null && _p$categories$nome !== void 0 ? _p$categories$nome : "sem foto"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-3 flex-1 flex flex-col",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-mono font-bold uppercase tracking-wider",
												style: { color: ORANGE },
												children: (_ref = (_p$sku = p.sku) !== null && _p$sku !== void 0 ? _p$sku : p.codigo_fabricante) !== null && _ref !== void 0 ? _ref : "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-1 font-bold text-sm leading-tight line-clamp-2",
												style: { color: TEXT },
												children: p.nome
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 space-y-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-baseline justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[9px] uppercase tracking-wider",
														style: { color: MUTED },
														children: "unitário"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-black text-base",
														style: { color: TEXT },
														children: ["R$ ", price.toFixed(2).replace(".", ",")]
													})]
												}), hasPkg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-baseline justify-between gap-2 rounded-md px-2 py-1",
													style: { background: SURFACE_2 },
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "text-[9px] uppercase tracking-wider",
														style: { color: MUTED },
														children: [
															"pacote ",
															pkgQty,
															"un"
														]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "font-bold text-sm",
														style: { color: ORANGE },
														children: ["R$ ", pkgPrice.toFixed(2).replace(".", ",")]
													})]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													if (!canSeePrices) {
														navigate({
															to: "/auth",
															search: {
																mode: "signup",
																redirect: "/"
															}
														});
														return;
													}
													addToCart({
														id: p.id,
														nome: p.nome,
														sku: p.sku,
														preco: price,
														image: image !== null && image !== void 0 ? image : null,
														quantidade_pacote: pkgQty,
														preco_pacote: pkgPrice
													});
												},
												className: "mt-3 w-full h-11 rounded-full font-bold text-xs sm:text-sm active:scale-[0.98] transition shadow",
												style: {
													background: ORANGE,
													color: "#fff"
												},
												title: canSeePrices ? "Adicionar ao carrinho" : "Cadastre-se para comprar",
												children: canSeePrices ? "Adicionar ao Pedido" : "Entrar para comprar"
											})
										]
									})]
								}, p.id);
							})
						})]
					}, group.label)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl p-8 lg:p-10 overflow-hidden relative shadow-lg",
							style: { background: ORANGE },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90",
									children: "// Primeira Compra B2B"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "mt-2 font-bold text-2xl lg:text-3xl leading-tight text-white",
									children: [
										"Cadastre sua empresa e receba a ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-black",
											children: "tabela exclusiva"
										}),
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									search: { mode: "signup" },
									className: "mt-5 inline-flex h-12 px-6 rounded-full font-bold text-sm items-center shadow",
									style: {
										background: "#faf8f5",
										color: TEXT
									},
									children: "Criar conta de revendedor →"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl p-8 lg:p-10 relative overflow-hidden border-2",
							style: {
								background: SURFACE,
								borderColor: ORANGE
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-semibold uppercase tracking-[0.2em]",
									style: { color: ORANGE },
									children: "// Promoções & Lançamentos"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-2 font-bold text-2xl lg:text-3xl leading-tight",
									style: { color: TEXT },
									children: "Receba ofertas antes de todo mundo."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm",
									style: { color: MUTED },
									children: "Ative as notificações para saber quando uma nova linha de chaves ou controles chegar."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: async () => {
										if (typeof window === "undefined" || !("Notification" in window)) {
											alert("Seu navegador não suporta notificações.");
											return;
										}
										if (await Notification.requestPermission() === "granted") new Notification("Prime Automotive", { body: "Pronto! Você receberá as promoções em primeira mão." });
									},
									className: "mt-5 h-12 px-6 rounded-full font-bold text-sm text-white inline-flex items-center gap-2 shadow",
									style: { background: ORANGE },
									children: ["Ativar notificações ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t",
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFab, {})
		]
	});
}
//#endregion
export { RootHome as component };
