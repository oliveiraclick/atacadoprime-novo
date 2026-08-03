import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { B as RefreshCw, Bt as CloudUpload, E as ShoppingCart, G as Plus, Jt as CircleAlert, Z as Package, _ as Trash2, a as WifiOff, dt as LoaderCircle, i as Wifi, qt as CircleCheck, tt as Minus } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as loadCachedCatalog, o as syncCatalogFromServer } from "./offline-store-Ddf--0UV.mjs";
import { t as Card } from "./card-D3HaXZP2.mjs";
import { t as Badge } from "./badge-CnQ0tQ74.mjs";
import { n as useOnlineStatus } from "./offline-sync-DZ35t7yP.mjs";
import { t as useOfflineSales } from "./use-offline-sales-DfbnYiqb.mjs";
import { t as Textarea } from "./textarea-DerICSB1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vendas-offline-BkoPNvjk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useOfflineCatalog() {
	const online = useOnlineStatus();
	const [state, setState] = (0, import_react.useState)({
		products: [],
		categories: [],
		brands: [],
		companies: [],
		leads: [],
		syncedAt: null,
		loading: true,
		syncing: false,
		error: null
	});
	const reload = (0, import_react.useCallback)(async () => {
		const cached = await loadCachedCatalog();
		setState((s) => _objectSpread2(_objectSpread2(_objectSpread2({}, s), cached), {}, { loading: false }));
	}, []);
	const sync = (0, import_react.useCallback)(async () => {
		setState((s) => _objectSpread2(_objectSpread2({}, s), {}, {
			syncing: true,
			error: null
		}));
		try {
			const res = await syncCatalogFromServer();
			await reload();
			toast.success(`Catálogo sincronizado (${res.count} produtos)`);
		} catch (e) {
			var _e$message;
			const msg = (_e$message = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message !== void 0 ? _e$message : "Falha ao sincronizar";
			setState((s) => _objectSpread2(_objectSpread2({}, s), {}, { error: msg }));
			toast.error(`Erro ao sincronizar: ${msg}`);
		} finally {
			setState((s) => _objectSpread2(_objectSpread2({}, s), {}, { syncing: false }));
		}
	}, [reload]);
	(0, import_react.useEffect)(() => {
		reload();
	}, [reload]);
	(0, import_react.useEffect)(() => {
		if (!online) return;
		if ((!state.syncedAt || Date.now() - state.syncedAt > 6 * 3600 * 1e3) && !state.syncing) sync();
	}, [online, state.syncedAt]);
	return _objectSpread2(_objectSpread2({}, state), {}, {
		online,
		sync
	});
}
function toCartItem(product) {
	var _product$sku, _product$preco, _product$quantidade_p;
	return {
		product_id: product.id,
		nome: product.nome,
		sku: (_product$sku = product.sku) !== null && _product$sku !== void 0 ? _product$sku : "",
		image_url: product.imagem_url,
		tipo_compra: "UNITARIO",
		quantidade: 1,
		preco_unitario: Number((_product$preco = product.preco) !== null && _product$preco !== void 0 ? _product$preco : 0),
		quantidade_pacote: Number((_product$quantidade_p = product.quantidade_pacote) !== null && _product$quantidade_p !== void 0 ? _product$quantidade_p : 0),
		preco_pacote: product.preco_pacote != null ? Number(product.preco_pacote) : null
	};
}
function itemTotal(item) {
	var _item$desconto_pct;
	const price = item.tipo_compra === "PACOTE" && item.preco_pacote ? item.preco_pacote : item.preco_unitario;
	return Number(price) * item.quantidade * (1 - ((_item$desconto_pct = item.desconto_pct) !== null && _item$desconto_pct !== void 0 ? _item$desconto_pct : 0) / 100);
}
function StandaloneOfflineSalesPage() {
	const { user } = useAuth();
	const catalog = useOfflineCatalog();
	const sales = useOfflineSales();
	const [search, setSearch] = (0, import_react.useState)("");
	const [items, setItems] = (0, import_react.useState)([]);
	const [clientName, setClientName] = (0, import_react.useState)("");
	const [clientPhone, setClientPhone] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("");
	const [payment, setPayment] = (0, import_react.useState)("DINHEIRO");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [freight, setFreight] = (0, import_react.useState)(0);
	const [discount, setDiscount] = (0, import_react.useState)(0);
	const filteredProducts = (0, import_react.useMemo)(() => {
		const needle = search.trim().toLowerCase();
		const products = catalog.products;
		if (!needle) return products.slice(0, 80);
		return products.filter((product) => {
			var _product$sku2, _product$marca_nome;
			return product.nome.toLowerCase().includes(needle) || ((_product$sku2 = product.sku) !== null && _product$sku2 !== void 0 ? _product$sku2 : "").toLowerCase().includes(needle) || ((_product$marca_nome = product.marca_nome) !== null && _product$marca_nome !== void 0 ? _product$marca_nome : "").toLowerCase().includes(needle);
		}).slice(0, 80);
	}, [catalog.products, search]);
	const subtotal = items.reduce((total, item) => total + itemTotal(item), 0);
	const total = Math.max(0, subtotal + Number(freight || 0) - Number(discount || 0));
	function addProduct(product) {
		setItems((current) => {
			if (!current.find((item) => item.product_id === product.id && item.tipo_compra === "UNITARIO")) return [...current, toCartItem(product)];
			return current.map((item) => item.product_id === product.id && item.tipo_compra === "UNITARIO" ? _objectSpread2(_objectSpread2({}, item), {}, { quantidade: item.quantidade + 1 }) : item);
		});
	}
	function changeQuantity(productId, delta) {
		setItems((current) => current.map((item) => item.product_id === productId ? _objectSpread2(_objectSpread2({}, item), {}, { quantidade: Math.max(0, item.quantidade + delta) }) : item).filter((item) => item.quantidade > 0));
	}
	function resetSale() {
		setItems([]);
		setClientName("");
		setClientPhone("");
		setCity("");
		setState("");
		setNotes("");
		setFreight(0);
		setDiscount(0);
		setPayment("DINHEIRO");
	}
	async function saveSale() {
		if (items.length === 0) {
			toast.error("Adicione pelo menos um produto");
			return;
		}
		if (!clientName.trim()) {
			toast.error("Informe o nome do cliente");
			return;
		}
		await sales.enqueueSale({
			local_id: crypto.randomUUID(),
			created_at: Date.now(),
			status: "pending",
			new_client: {
				legal_name: clientName.trim(),
				phone: clientPhone.trim(),
				cidade: city.trim() || null,
				estado: state.trim() || null
			},
			items,
			frete: Number(freight || 0),
			desconto: Number(discount || 0),
			acrescimo: 0,
			observacao: notes.trim() || null,
			pagamento: payment,
			origem: "VISITA",
			subtotal,
			total
		});
		toast.success(sales.online && user ? "Venda salva e enviada para sincronização" : "Venda salva neste aparelho");
		resetSale();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground pt-[var(--app-safe-top)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase text-primary",
							children: "Sistema separado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-bold leading-tight sm:text-xl",
							children: "Vendas Offline"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Salva no aparelho e envia para pedidos quando voltar online."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: sales.online ? "default" : "destructive",
						className: "gap-1",
						children: [sales.online ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { className: "h-3 w-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-3 w-3" }), sales.online ? "Online" : "Offline"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							search: {
								mode: "login",
								redirect: void 0
							},
							children: "Sistema online"
						})
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-6xl gap-4 px-3 py-4 sm:px-4 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 text-xs text-muted-foreground",
								children: [
									"Catálogo: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: catalog.products.length
									}),
									" produtos",
									catalog.syncedAt ? ` · atualizado ${new Date(catalog.syncedAt).toLocaleString("pt-BR")}` : " · ainda não sincronizado"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => catalog.sync(),
								disabled: !sales.online || catalog.syncing,
								children: [catalog.syncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1",
									children: "Atualizar"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: search,
						onChange: (event) => setSearch(event.target.value),
						placeholder: "Buscar produto, SKU ou marca",
						"aria-label": "Buscar produto"
					}),
					catalog.loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "grid min-h-40 place-items-center p-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-muted-foreground" })
					}) : filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "grid min-h-40 place-items-center p-6 text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: "Nenhum produto no cache"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Abra esta tela com internet e toque em Atualizar antes de usar offline."
								})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3 md:grid-cols-3",
						children: filteredProducts.map((product) => {
							var _product$sku3;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "flex flex-col gap-2 p-3",
								children: [
									product.imagem_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: product.imagem_url,
										alt: product.nome,
										loading: "lazy",
										className: "aspect-square w-full rounded-md bg-muted object-cover"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid aspect-square w-full place-items-center rounded-md bg-muted text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-7 w-7" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "line-clamp-2 text-sm font-medium leading-tight",
											children: product.nome
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[11px] text-muted-foreground",
											children: (_product$sku3 = product.sku) !== null && _product$sku3 !== void 0 ? _product$sku3 : "Sem SKU"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-auto flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-sm",
											children: brl(product.preco)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											className: "h-8 w-8",
											onClick: () => addProduct(product),
											"aria-label": `Adicionar ${product.nome}`,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
										})]
									})
								]
							}, product.id);
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "space-y-3 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 text-sm font-semibold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4" }),
								" Venda",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									variant: "secondary",
									className: "ml-auto",
									children: [items.length, " itens"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: clientName,
									onChange: (event) => setClientName(event.target.value),
									placeholder: "Cliente / empresa"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: clientPhone,
									onChange: (event) => setClientPhone(event.target.value),
									placeholder: "Telefone"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "col-span-2 uppercase",
										value: city,
										onChange: (event) => setCity(event.target.value.toUpperCase()),
										placeholder: "Cidade"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: state,
										onChange: (event) => setState(event.target.value.toUpperCase()),
										placeholder: "UF",
										maxLength: 2
									})]
								})
							]
						}),
						items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-dashed border-border p-3 text-sm text-muted-foreground",
							children: "Toque em + nos produtos para montar a venda."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-72 space-y-2 overflow-y-auto",
							children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 border-b border-border pb-2 text-sm last:border-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "flex-1 font-medium leading-tight",
										children: item.nome
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "icon",
										variant: "ghost",
										className: "h-7 w-7",
										onClick: () => changeQuantity(item.product_id, -item.quantidade),
										"aria-label": `Remover ${item.nome}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "outline",
												className: "h-7 w-7",
												onClick: () => changeQuantity(item.product_id, -1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3 w-3" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-7 text-center",
												children: item.quantidade
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "icon",
												variant: "outline",
												className: "h-7 w-7",
												onClick: () => changeQuantity(item.product_id, 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(itemTotal(item)) })]
								})]
							}, `${item.product_id}-${item.tipo_compra}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: freight,
								onChange: (event) => setFreight(Number(event.target.value)),
								placeholder: "Frete"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 0,
								value: discount,
								onChange: (event) => setDiscount(Number(event.target.value)),
								placeholder: "Desconto"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: payment,
							onValueChange: (value) => setPayment(value),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "DINHEIRO",
									children: "Dinheiro"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "PIX",
									children: "PIX"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "CARTAO",
									children: "Cartão"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: notes,
							onChange: (event) => setNotes(event.target.value),
							placeholder: "Observações",
							rows: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: "Subtotal"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(subtotal) })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(total) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full",
							size: "lg",
							onClick: saveSale,
							disabled: items.length === 0,
							children: [sales.online && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "mr-2 h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "mr-2 h-4 w-4" }), "Salvar venda offline"]
						})
					]
				}), sales.queue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "space-y-2 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm font-semibold",
								children: "Fila de envio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => sales.sync(),
								disabled: !sales.online || !user || sales.syncing,
								children: [sales.syncing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1",
									children: "Enviar"
								})]
							})]
						}),
						!user && sales.online && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Entre no sistema online para enviar as vendas pendentes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-56 space-y-1 overflow-y-auto",
							children: sales.queue.slice().reverse().map((sale) => {
								var _sale$new_client$lega, _sale$new_client;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 border-b border-border py-2 text-xs last:border-0",
									children: [sale.status === "sent" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }) : sale.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5 text-destructive" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate font-medium",
											children: [
												(_sale$new_client$lega = (_sale$new_client = sale.new_client) === null || _sale$new_client === void 0 ? void 0 : _sale$new_client.legal_name) !== null && _sale$new_client$lega !== void 0 ? _sale$new_client$lega : "Cliente",
												" · ",
												brl(sale.total)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-muted-foreground",
											children: [new Date(sale.created_at).toLocaleString("pt-BR"), sale.error ? ` · ${sale.error}` : ""]
										})]
									})]
								}, sale.local_id);
							})
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { StandaloneOfflineSalesPage as component };
