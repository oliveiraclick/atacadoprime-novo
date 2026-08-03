import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { o as formatDateTime } from "./pdf-CsVsL9dt.mjs";
import { t as orderCode } from "./order-code-C-NI66BU.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { F as ScanBarcode, G as Plus, Lt as CreditCard, N as Search, U as QrCode, W as Printer, _ as Trash2, dt as LoaderCircle, in as Building2, l as User, ln as Banknote, nn as CalendarClock, qt as CircleCheck, st as MapPin, tt as Minus, u as UserPlus, yt as ImageOff } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { n as useCreateOrder, t as useConfirmPayment } from "./use-orders-CBi7bZ2w.mjs";
import { t as useBankAccounts } from "./use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as effectiveUnitPrice, n as cartEffectiveSubtotal, s as useCart } from "./use-cart-D1K0BW4t.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
import { r as printHTML, s as useNativePrinterReady, t as POS_PRINT_COLOR } from "./pos-printer-Cb2iJw0o.mjs";
import { r as renderTicket, t as pagamentoLabel } from "./pos-templates-kUAheyLO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.vender-47Q54dil.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PosCustomerDialog({ open, onOpenChange }) {
	const qc = useQueryClient();
	const setCustomer = useSellerSession((s) => s.setCustomer);
	const [q, setQ] = (0, import_react.useState)("");
	const [novo, setNovo] = (0, import_react.useState)(false);
	const { data: companies = [], isLoading } = useQuery({
		queryKey: ["pos-customers", q],
		enabled: open && !novo,
		queryFn: async () => {
			let query = supabase.from("companies").select("id, legal_name, trade_name, tax_id, cidade, estado").eq("status", "approved").order("legal_name").limit(60);
			if (q.trim().length >= 2) {
				const term = `%${q.trim()}%`;
				query = query.or(`legal_name.ilike.${term},trade_name.ilike.${term},tax_id.ilike.${term}`);
			}
			const { data, error } = await query;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	function escolher(c) {
		var _c$trade_name;
		setCustomer(c);
		toast.success(`Cliente: ${(_c$trade_name = c.trade_name) !== null && _c$trade_name !== void 0 ? _c$trade_name : c.legal_name}`);
		setNovo(false);
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) setNovo(false);
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-sm max-h-[calc(100vh-2rem)] overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: novo ? "Novo cliente" : "Selecionar cliente" }) }), novo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NovoClienteForm, {
				onCancel: () => setNovo(false),
				onCreated: (c) => {
					qc.invalidateQueries({ queryKey: ["pos-customers"] });
					escolher(c);
				}
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Buscar por nome ou CNPJ",
							className: "pl-8 h-12 text-base"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "w-full h-12",
						onClick: () => setNovo(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 mr-2" }), " Cadastrar novo cliente"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-sm py-4 justify-center",
								style: { color: V2.LIGHT_MUTED },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Carregando..."]
							}),
							!isLoading && companies.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-center py-4",
								style: { color: V2.LIGHT_MUTED },
								children: "Nenhum cliente encontrado."
							}),
							companies.map((c) => {
								var _c$trade_name2;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => escolher(c),
									className: "w-full text-left p-3 rounded-lg border active:scale-[.99] transition",
									style: {
										background: V2.LIGHT_SURFACE,
										borderColor: V2.LIGHT_BORDER
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
											className: "h-4 w-4 mt-0.5 shrink-0",
											style: { color: V2.TEAL }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-sm truncate",
												children: (_c$trade_name2 = c.trade_name) !== null && _c$trade_name2 !== void 0 ? _c$trade_name2 : c.legal_name
											}), (c.cidade || c.estado) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-[11px] flex items-center gap-1",
												style: { color: V2.LIGHT_MUTED },
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
													" ",
													c.cidade,
													c.estado ? `/${c.estado}` : ""
												]
											})]
										})]
									})
								}, c.id);
							})
						]
					})
				]
			})]
		})
	});
}
function NovoClienteForm({ onCancel, onCreated }) {
	const { user } = useAuth();
	const [nome, setNome] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [taxId, setTaxId] = (0, import_react.useState)("");
	const [cidade, setCidade] = (0, import_react.useState)("");
	const [estado, setEstado] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function salvar() {
		if (!user || !nome.trim()) {
			toast.error("Nome é obrigatório");
			return;
		}
		setSaving(true);
		const name = nome.trim();
		const { data, error } = await supabase.from("companies").insert({
			legal_name: name,
			trade_name: name,
			tax_id: taxId.trim() || null,
			phone: phone.trim(),
			cidade: cidade.trim() || null,
			estado: estado.trim().toUpperCase() || null,
			status: "approved",
			owner_id: user.id
		}).select("id, legal_name, trade_name, tax_id").single();
		setSaving(false);
		if (error || !data) {
			var _error$message;
			toast.error((_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : "Erro ao cadastrar");
			return;
		}
		toast.success("Cliente cadastrado");
		onCreated(data);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 pb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome do cliente *",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: nome,
					onChange: (e) => setNome(e.target.value),
					className: "h-12 text-base"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Telefone / WhatsApp",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					inputMode: "tel",
					className: "h-12 text-base"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "CNPJ / CPF",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: taxId,
					onChange: (e) => setTaxId(e.target.value),
					inputMode: "numeric",
					className: "h-12 text-base"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_80px] gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cidade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: cidade,
						onChange: (e) => setCidade(e.target.value),
						className: "h-12 text-base"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "UF",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: estado,
						onChange: (e) => setEstado(e.target.value),
						maxLength: 2,
						className: "h-12 text-base uppercase"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "h-12 flex-1",
					onClick: onCancel,
					disabled: saving,
					children: "Voltar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-12 flex-1 font-semibold",
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					onClick: salvar,
					disabled: saving,
					children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Salvar e usar"
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs mb-1",
		style: { color: V2.LIGHT_MUTED },
		children: label
	}), children] });
}
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
function PosVender() {
	var _items$find, _customer$trade_name;
	const [q, setQ] = (0, import_react.useState)("");
	const inputRef = (0, import_react.useRef)(null);
	const items = useCart((s) => s.items);
	const add = useCart((s) => s.add);
	const setQty = useCart((s) => s.setQty);
	const remove = useCart((s) => s.remove);
	const clear = useCart((s) => s.clear);
	const setPreco = useCart((s) => s.setPreco);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const pickedExisting = picked ? (_items$find = items.find((i) => i.product_id === picked.id)) !== null && _items$find !== void 0 ? _items$find : null : null;
	const [checkoutOpen, setCheckoutOpen] = (0, import_react.useState)(false);
	const [customerOpen, setCustomerOpen] = (0, import_react.useState)(false);
	const [modoScanner, setModoScanner] = (0, import_react.useState)(false);
	const customer = useSellerSession((s) => s.customer);
	const endSale = useSellerSession((s) => s.endSale);
	const { data: products = [] } = useQuery({
		queryKey: [
			"pos",
			"products",
			q
		],
		queryFn: async () => {
			let query = supabase.from("products").select("id,nome,sku,ean13,preco_unitario,preco_pacote,preco_nivel_1,preco_nivel_2,preco_nivel_3,quantidade_pacote,product_images(image_url)").eq("status", true).order("nome").limit(500);
			if (q.trim()) query = query.or(`nome.ilike.%${q}%,sku.ilike.%${q}%,ean13.eq.${q}`);
			const { data, error } = await query;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { subtotal, tier } = cartEffectiveSubtotal(items);
	(0, import_react.useEffect)(() => {
		var _inputRef$current;
		(_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
	}, []);
	function onSearchKeyDown(e) {
		if (e.key !== "Enter") return;
		const val = q.trim();
		if (!val) return;
		const exact = products.find((p) => p.ean13 === val || p.sku === val);
		if (exact && modoScanner) {
			addProduct(exact);
			setQ("");
			toast.success(`${exact.nome} adicionado`);
			return;
		}
		const target = exact !== null && exact !== void 0 ? exact : products[0];
		if (target) {
			setPicked(target);
			setQ("");
		}
	}
	function addProduct(p, opts) {
		var _opts$tipo, _p$product_images$0$i, _p$product_images, _opts$quantidade, _p$quantidade_pacote;
		const tipo = (_opts$tipo = opts === null || opts === void 0 ? void 0 : opts.tipo) !== null && _opts$tipo !== void 0 ? _opts$tipo : "UNITARIO";
		add({
			product_id: p.id,
			nome: p.nome,
			sku: p.sku,
			image_url: (_p$product_images$0$i = (_p$product_images = p.product_images) === null || _p$product_images === void 0 || (_p$product_images = _p$product_images[0]) === null || _p$product_images === void 0 ? void 0 : _p$product_images.image_url) !== null && _p$product_images$0$i !== void 0 ? _p$product_images$0$i : null,
			tipo_compra: tipo,
			quantidade: (_opts$quantidade = opts === null || opts === void 0 ? void 0 : opts.quantidade) !== null && _opts$quantidade !== void 0 ? _opts$quantidade : 1,
			preco_unitario: Number(p.preco_unitario),
			preco_pacote: p.preco_pacote != null ? Number(p.preco_pacote) : null,
			quantidade_pacote: Number((_p$quantidade_pacote = p.quantidade_pacote) !== null && _p$quantidade_pacote !== void 0 ? _p$quantidade_pacote : 1),
			preco_nivel_1: p.preco_nivel_1 != null ? Number(p.preco_nivel_1) : null,
			preco_nivel_2: p.preco_nivel_2 != null ? Number(p.preco_nivel_2) : null,
			preco_nivel_3: p.preco_nivel_3 != null ? Number(p.preco_nivel_3) : null
		});
		if ((opts === null || opts === void 0 ? void 0 : opts.preco) != null && Number.isFinite(opts.preco)) setPreco(p.id, tipo, opts.preco);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border p-3 flex items-center gap-2",
				style: {
					background: customer ? V2.TEAL_LIGHT : V2.LIGHT_SURFACE,
					borderColor: customer ? V2.TEAL : V2.LIGHT_BORDER
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {
						className: "h-4 w-4 shrink-0",
						style: { color: V2.TEAL }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-wide font-semibold",
							style: { color: V2.LIGHT_MUTED },
							children: "Cliente"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium truncate",
							children: customer ? (_customer$trade_name = customer.trade_name) !== null && _customer$trade_name !== void 0 ? _customer$trade_name : customer.legal_name : "Nenhum cliente selecionado"
						})]
					}),
					customer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "text-xs underline shrink-0",
						style: { color: V2.TEAL },
						onClick: () => setCustomerOpen(true),
						children: "trocar"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						className: "h-9 px-3 text-xs shrink-0",
						style: {
							background: V2.TEAL,
							color: "#fff"
						},
						onClick: () => setCustomerOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-3.5 w-3.5 mr-1" }), " Escolher"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosCustomerDialog, {
				open: customerOpen,
				onOpenChange: setCustomerOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						ref: inputRef,
						value: q,
						onChange: (e) => setQ(e.target.value),
						onKeyDown: onSearchKeyDown,
						placeholder: "Escaneie ou busque por nome, SKU, código",
						className: "pl-8 h-12 text-base"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setModoScanner((v) => !v),
					className: cn("shrink-0 h-12 px-3 rounded-md border flex items-center gap-1.5 text-xs font-semibold transition-colors", modoScanner ? "border-transparent text-white" : "text-foreground"),
					style: {
						background: modoScanner ? V2.TEAL : V2.LIGHT_SURFACE,
						borderColor: modoScanner ? V2.TEAL : V2.LIGHT_BORDER
					},
					"aria-pressed": modoScanner,
					title: modoScanner ? "Modo scanner ativo: leitura adiciona direto" : "Ativar modo scanner contínuo",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScanBarcode, { className: "h-4 w-4" }),
						" ",
						modoScanner ? "Scan ON" : "Scan"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between text-[11px]",
				style: { color: V2.LIGHT_MUTED },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					products.length,
					" produto",
					products.length === 1 ? "" : "s"
				] }), modoScanner && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium",
					style: { color: V2.TEAL },
					children: "Leitura direta ativada"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: products.map((p) => {
					var _p$product_images2, _p$preco_nivel_;
					const qtyInCart = items.filter((it) => it.product_id === p.id).reduce((s, it) => {
						var _it$quantidade_pacote;
						return s + (it.tipo_compra === "PACOTE" ? it.quantidade * ((_it$quantidade_pacote = it.quantidade_pacote) !== null && _it$quantidade_pacote !== void 0 ? _it$quantidade_pacote : 1) : it.quantidade);
					}, 0);
					const already = qtyInCart > 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setPicked(p),
						className: "relative text-left p-2 rounded-lg border-2 active:scale-[.98] transition",
						style: {
							background: already ? V2.TEAL_LIGHT : V2.LIGHT_SURFACE,
							borderColor: already ? V2.TEAL : V2.LIGHT_BORDER
						},
						children: [
							already && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute top-1.5 right-1.5 h-6 min-w-6 px-1.5 rounded-full text-[11px] font-bold grid place-items-center shadow",
								style: {
									background: V2.TEAL,
									color: "#fff"
								},
								children: qtyInCart
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
								className: "absolute bottom-1.5 right-1.5 h-4 w-4",
								style: { color: "#16a34a" }
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [((_p$product_images2 = p.product_images) === null || _p$product_images2 === void 0 || (_p$product_images2 = _p$product_images2[0]) === null || _p$product_images2 === void 0 ? void 0 : _p$product_images2.image_url) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: p.product_images[0].image_url,
									alt: p.nome,
									loading: "lazy",
									className: "h-11 w-11 shrink-0 rounded-md object-cover border",
									style: {
										borderColor: V2.LIGHT_BORDER,
										background: "#fff"
									}
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-11 w-11 shrink-0 rounded-md border grid place-items-center",
									style: {
										borderColor: V2.LIGHT_BORDER,
										background: "#fff"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
										className: "h-4 w-4",
										style: { color: V2.LIGHT_MUTED }
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-sm line-clamp-2 min-h-[36px] pr-7",
										children: p.nome
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] truncate",
										style: { color: V2.LIGHT_MUTED },
										children: p.sku
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-sm mt-1",
								style: { color: V2.TEAL },
								children: brl(Number((_p$preco_nivel_ = p.preco_nivel_1) !== null && _p$preco_nivel_ !== void 0 ? _p$preco_nivel_ : p.preco_unitario))
							}),
							already && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] mt-0.5",
								style: { color: V2.TEAL },
								children: "toque para editar"
							})
						]
					}, p.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddItemModal, {
				product: picked,
				existing: pickedExisting,
				onClose: () => setPicked(null),
				onRemove: () => {
					if (pickedExisting) {
						remove(pickedExisting.product_id, pickedExisting.tipo_compra);
						toast.success("Item removido");
					}
					setPicked(null);
				},
				onConfirm: (opts) => {
					if (!picked) return;
					if (pickedExisting) {
						if (opts.tipo !== pickedExisting.tipo_compra) {
							remove(pickedExisting.product_id, pickedExisting.tipo_compra);
							addProduct(picked, opts);
						} else {
							var _opts$quantidade2;
							setQty(picked.id, opts.tipo, (_opts$quantidade2 = opts.quantidade) !== null && _opts$quantidade2 !== void 0 ? _opts$quantidade2 : 1);
							if (opts.preco != null && Number.isFinite(opts.preco)) setPreco(picked.id, opts.tipo, opts.preco);
						}
						toast.success("Item atualizado");
					} else addProduct(picked, opts);
					setPicked(null);
				}
			}),
			items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-3 py-2 border-b",
						style: { borderColor: V2.LIGHT_BORDER },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold",
							children: [
								"Carrinho (",
								items.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: clear,
							className: "text-xs",
							style: { color: V2.LIGHT_MUTED },
							children: "limpar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[42vh] overflow-y-auto divide-y",
						style: { borderColor: V2.LIGHT_BORDER },
						children: items.map((i) => {
							const unit = effectiveUnitPrice(i, tier);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-3 py-2 flex items-center gap-2",
								children: [
									i.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: i.image_url,
										alt: i.nome,
										loading: "lazy",
										className: "h-9 w-9 shrink-0 rounded-md object-cover border",
										style: {
											borderColor: V2.LIGHT_BORDER,
											background: "#fff"
										}
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-9 w-9 shrink-0 rounded-md border grid place-items-center",
										style: {
											borderColor: V2.LIGHT_BORDER,
											background: "#fff"
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageOff, {
											className: "h-3.5 w-3.5",
											style: { color: V2.LIGHT_MUTED }
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-sm font-medium truncate",
											children: i.nome
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px]",
											style: { color: V2.LIGHT_MUTED },
											children: [
												brl(unit),
												" · ",
												brl(unit * i.quantidade)
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "h-8 w-8 rounded border flex items-center justify-center",
												style: { borderColor: V2.LIGHT_BORDER },
												onClick: () => setQty(i.product_id, i.tipo_compra, Math.max(1, i.quantidade - 1)),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-6 text-center text-sm font-semibold",
												children: i.quantidade
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "h-8 w-8 rounded border flex items-center justify-center",
												style: { borderColor: V2.LIGHT_BORDER },
												onClick: () => setQty(i.product_id, i.tipo_compra, i.quantidade + 1),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3.5 w-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												className: "h-8 w-8 rounded flex items-center justify-center text-red-500",
												onClick: () => remove(i.product_id, i.tipo_compra),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})
										]
									})
								]
							}, `${i.product_id}-${i.tipo_compra}`);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-3 py-2 border-t flex items-center justify-between",
						style: { borderColor: V2.LIGHT_BORDER },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px]",
							style: { color: V2.LIGHT_MUTED },
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xl font-bold",
							style: { color: V2.TEAL },
							children: brl(subtotal)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => {
								if (!customer) {
									toast.error("Selecione o cliente antes de cobrar");
									setCustomerOpen(true);
									return;
								}
								setCheckoutOpen(true);
							},
							className: "h-12 px-6 text-base font-semibold",
							style: {
								background: V2.TEAL,
								color: "#fff"
							},
							children: "Cobrar"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutModal, {
				open: checkoutOpen,
				onOpenChange: setCheckoutOpen,
				total: subtotal,
				onDone: () => {
					clear();
					endSale();
					setCheckoutOpen(false);
				}
			})
		]
	});
}
function AddItemModal({ product, existing, onClose, onConfirm, onRemove }) {
	const [tipo, setTipo] = (0, import_react.useState)("UNITARIO");
	const [qtd, setQtd] = (0, import_react.useState)(1);
	const [preco, setPreco] = (0, import_react.useState)("");
	const basePreco = (t) => {
		var _product$preco_pacote, _ref, _product$preco_nivel_;
		return t === "PACOTE" ? Number((_product$preco_pacote = product === null || product === void 0 ? void 0 : product.preco_pacote) !== null && _product$preco_pacote !== void 0 ? _product$preco_pacote : 0) : Number((_ref = (_product$preco_nivel_ = product === null || product === void 0 ? void 0 : product.preco_nivel_1) !== null && _product$preco_nivel_ !== void 0 ? _product$preco_nivel_ : product === null || product === void 0 ? void 0 : product.preco_unitario) !== null && _ref !== void 0 ? _ref : 0);
	};
	(0, import_react.useEffect)(() => {
		var _existing$tipo_compra, _existing$quantidade, _existing$preco_pacot, _existing$preco_nivel;
		if (!product) return;
		const t = (_existing$tipo_compra = existing === null || existing === void 0 ? void 0 : existing.tipo_compra) !== null && _existing$tipo_compra !== void 0 ? _existing$tipo_compra : "UNITARIO";
		setTipo(t);
		setQtd((_existing$quantidade = existing === null || existing === void 0 ? void 0 : existing.quantidade) !== null && _existing$quantidade !== void 0 ? _existing$quantidade : 1);
		setPreco((existing ? t === "PACOTE" ? Number((_existing$preco_pacot = existing.preco_pacote) !== null && _existing$preco_pacot !== void 0 ? _existing$preco_pacot : 0) : Number((_existing$preco_nivel = existing.preco_nivel_1) !== null && _existing$preco_nivel !== void 0 ? _existing$preco_nivel : existing.preco_unitario) : basePreco(t)).toFixed(2));
	}, [product === null || product === void 0 ? void 0 : product.id]);
	if (!product) return null;
	const precoNum = Number(String(preco).replace(",", ".")) || 0;
	const total = precoNum * qtd;
	const temPacote = product.preco_pacote != null && Number(product.preco_pacote) > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: !!product,
		onOpenChange: (v) => {
			if (!v) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-base leading-snug",
					children: existing ? "Editar item" : product.nome
				}), existing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm",
					children: product.nome
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px]",
							style: { color: V2.LIGHT_MUTED },
							children: product.sku
						}),
						temPacote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: ["UNITARIO", "PACOTE"].map((t) => {
								var _product$quantidade_p;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setTipo(t);
										setPreco(basePreco(t).toFixed(2));
									},
									className: "h-10 rounded-lg border text-sm font-medium",
									style: {
										background: tipo === t ? V2.TEAL : V2.LIGHT_SURFACE,
										color: tipo === t ? "#fff" : "inherit",
										borderColor: V2.LIGHT_BORDER
									},
									children: t === "UNITARIO" ? "Unidade" : `Pacote (${(_product$quantidade_p = product.quantidade_pacote) !== null && _product$quantidade_p !== void 0 ? _product$quantidade_p : 1})`
								}, t);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs mb-1",
							style: { color: V2.LIGHT_MUTED },
							children: "Quantidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "h-12 w-12",
									onClick: () => setQtd((v) => Math.max(1, v - 1)),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									inputMode: "numeric",
									value: qtd,
									onChange: (e) => setQtd(Math.max(1, Number(e.target.value) || 1)),
									className: "h-12 text-center text-lg font-semibold"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "h-12 w-12",
									onClick: () => setQtd((v) => v + 1),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" })
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs mb-1",
							style: { color: V2.LIGHT_MUTED },
							children: ["Preço ", tipo === "PACOTE" ? "do pacote" : "unitário"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "text",
							inputMode: "decimal",
							value: preco,
							onChange: (e) => setPreco(e.target.value),
							className: "h-12 text-base"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-lg px-3 py-2",
							style: { background: V2.LIGHT_BG },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								style: { color: V2.LIGHT_MUTED },
								children: "Total do item"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-bold",
								style: { color: V2.TEAL },
								children: brl(total)
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "gap-2 sm:flex-row",
					children: [existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "h-12 flex-1 text-red-600 border-red-200",
						onClick: onRemove,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 mr-1" }), " Remover"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "h-12 flex-1",
						onClick: onClose,
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "h-12 flex-1 font-semibold",
						style: {
							background: V2.TEAL,
							color: "#fff"
						},
						onClick: () => onConfirm({
							quantidade: qtd,
							tipo,
							preco: precoNum
						}),
						children: existing ? "Salvar" : "Adicionar"
					})]
				})
			]
		})
	});
}
function CheckoutModal({ open, onOpenChange, total, onDone }) {
	const items = useCart((s) => s.items);
	const customer = useSellerSession((s) => s.customer);
	const [tipo, setTipo] = (0, import_react.useState)("PIX");
	const [modalidade, setModalidade] = (0, import_react.useState)("CREDITO");
	const [parcelas, setParcelas] = (0, import_react.useState)(1);
	const [prazo, setPrazo] = (0, import_react.useState)("30");
	const { data: accounts = [] } = useBankAccounts();
	const [accountId, setAccountId] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const createOrder = useCreateOrder();
	const confirmPay = useConfirmPayment();
	const [printPrompt, setPrintPrompt] = (0, import_react.useState)(null);
	const [soldItems, setSoldItems] = (0, import_react.useState)([]);
	const [soldTier, setSoldTier] = (0, import_react.useState)(1);
	const [soldTotal, setSoldTotal] = (0, import_react.useState)(0);
	const [soldPayment, setSoldPayment] = (0, import_react.useState)(null);
	const [printing, setPrinting] = (0, import_react.useState)(false);
	const clearCart = useCart((s) => s.clear);
	const queryClient = useQueryClient();
	const { tier } = cartEffectiveSubtotal(items);
	(0, import_react.useEffect)(() => {
		if (open && !accountId && accounts.length > 0) setAccountId(accounts[0].id);
	}, [
		open,
		accounts,
		accountId
	]);
	(0, import_react.useEffect)(() => {
		if (tipo !== "CARTAO") {
			setModalidade("CREDITO");
			setParcelas(1);
		}
	}, [tipo]);
	const submittingRef = (0, import_react.useRef)(false);
	async function finalizar() {
		if (submittingRef.current) return;
		if (items.length === 0) {
			toast.error("Carrinho vazio");
			return;
		}
		if (!customer) {
			toast.error("Selecione o cliente");
			return;
		}
		submittingRef.current = true;
		setSaving(true);
		try {
			var _account$nome, _customer$trade_name2;
			const priced = items.map((i) => _objectSpread2(_objectSpread2({}, i), {}, { preco_unitario: i.tipo_compra === "UNITARIO" ? effectiveUnitPrice(i, tier) : i.preco_unitario }));
			const companyId = customer.id;
			const orderId = await createOrder.mutateAsync({
				company_id: companyId,
				address_id: null,
				origem: "VISITA",
				items: priced,
				frete: 0,
				desconto: 0,
				pagamento: tipo === "CARTAO" ? "CARTAO" : "PIX"
			});
			const account = accounts.find((a) => a.id === accountId);
			await confirmPay.mutateAsync({
				order_id: orderId,
				company_id: companyId,
				total,
				tipo,
				modalidade: tipo === "CARTAO" ? modalidade : void 0,
				bandeira: null,
				antecipado: false,
				conta: (_account$nome = account === null || account === void 0 ? void 0 : account.nome) !== null && _account$nome !== void 0 ? _account$nome : "—",
				account_id: accountId || null,
				parcelas: tipo === "CARTAO" ? parcelas : 1,
				prazos: tipo === "FATURADO" ? prazo.split("-").map(Number) : void 0
			});
			const codigo = orderCode(orderId, (_customer$trade_name2 = customer.trade_name) !== null && _customer$trade_name2 !== void 0 ? _customer$trade_name2 : customer.legal_name);
			setSoldItems(items);
			setSoldTier(tier);
			setSoldTotal(total);
			setSoldPayment({
				tipo,
				modalidade: tipo === "CARTAO" ? modalidade : void 0,
				parcelas: tipo === "CARTAO" ? parcelas : 1,
				prazos: tipo === "FATURADO" ? prazo.split("-").map(Number) : void 0
			});
			setPrintPrompt({
				orderId,
				codigo
			});
			queryClient.invalidateQueries({ queryKey: ["pos", "recent-orders"] });
			clearCart();
		} catch (e) {
			var _e$message;
			toast.error((_e$message = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message !== void 0 ? _e$message : "Erro ao finalizar");
		} finally {
			submittingRef.current = false;
			setSaving(false);
		}
	}
	function buildTicketHtml() {
		var _customer$trade_name3, _soldPayment$prazos, _soldPayment$modalida, _soldPayment$parcelas;
		if (!printPrompt) return null;
		return renderTicket({
			codigo: printPrompt.codigo,
			data: formatDateTime(/* @__PURE__ */ new Date()),
			itens: soldItems.map((i) => {
				const unit = effectiveUnitPrice(i, soldTier);
				return {
					nome: i.nome,
					qtd: i.quantidade,
					unit,
					total: unit * i.quantidade
				};
			}),
			cliente: customer ? (_customer$trade_name3 = customer.trade_name) !== null && _customer$trade_name3 !== void 0 ? _customer$trade_name3 : customer.legal_name : null,
			subtotal: soldTotal,
			total: soldTotal,
			pagamento: !soldPayment ? "—" : soldPayment.tipo === "FATURADO" ? `Faturado ${((_soldPayment$prazos = soldPayment.prazos) !== null && _soldPayment$prazos !== void 0 ? _soldPayment$prazos : [30]).join("/")} dias` : pagamentoLabel(soldPayment.tipo, {
				modalidade: (_soldPayment$modalida = soldPayment.modalidade) !== null && _soldPayment$modalida !== void 0 ? _soldPayment$modalida : null,
				parcelas: (_soldPayment$parcelas = soldPayment.parcelas) !== null && _soldPayment$parcelas !== void 0 ? _soldPayment$parcelas : 1
			})
		});
	}
	async function doPrint(preview = false) {
		const html = buildTicketHtml();
		if (!html) {
			toast.error("Cupom indisponível");
			return;
		}
		setPrinting(true);
		try {
			await printHTML(html, { preview });
			if (!preview) {
				toast.success("Cupom enviado para impressão");
				setPrintPrompt(null);
				onDone();
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : "Falha ao acessar a impressora interna";
			toast.error(message, { duration: 8e3 });
		} finally {
			setPrinting(false);
		}
	}
	const nativePrinterReady = useNativePrinterReady();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (!v) {
				setPrintPrompt(null);
				onDone();
			}
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: printPrompt ? "Venda concluída" : "Cobrar" }) }), !printPrompt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs",
							style: { color: V2.LIGHT_MUTED },
							children: "Total"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-3xl font-bold",
							style: { color: V2.TEAL },
							children: brl(total)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2",
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
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setTipo(p.k),
								className: "h-16 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs font-semibold",
								style: tipo === p.k ? {
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
					}),
					tipo === "CARTAO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs mb-1",
							style: { color: V2.LIGHT_MUTED },
							children: "Modalidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: modalidade,
							onChange: (e) => setModalidade(e.target.value),
							className: "w-full h-11 rounded border px-2 text-sm",
							style: {
								background: V2.LIGHT_SURFACE,
								borderColor: V2.LIGHT_BORDER
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "CREDITO",
								children: "Crédito"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "DEBITO",
								children: "Débito"
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs mb-1",
							style: { color: V2.LIGHT_MUTED },
							children: "Parcelas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: parcelas,
							onChange: (e) => setParcelas(Number(e.target.value)),
							className: "w-full h-11 rounded border px-2 text-sm",
							style: {
								background: V2.LIGHT_SURFACE,
								borderColor: V2.LIGHT_BORDER
							},
							children: [
								1,
								2,
								3
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: n,
								children: [
									n,
									"x ",
									modalidade === "CREDITO" ? "crédito" : "débito"
								]
							}, n))
						})] })]
					}),
					tipo === "FATURADO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.LIGHT_MUTED },
						children: "Prazo de recebimento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: prazo,
						onChange: (e) => setPrazo(e.target.value),
						className: "w-full h-11 rounded border px-2 text-sm",
						style: {
							background: V2.LIGHT_SURFACE,
							borderColor: V2.LIGHT_BORDER
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
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.LIGHT_MUTED },
						children: "Conta destino"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: accountId,
						onChange: (e) => setAccountId(e.target.value),
						className: "w-full h-11 rounded border px-2 text-sm",
						style: {
							background: V2.LIGHT_SURFACE,
							borderColor: V2.LIGHT_BORDER
						},
						children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: a.id,
							children: a.nome
						}, a.id))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: finalizar,
						disabled: saving,
						className: "w-full h-12 text-base font-semibold",
						style: {
							background: V2.TEAL,
							color: "#fff"
						},
						children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Confirmar venda"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center text-sm",
						children: ["Pedido ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: printPrompt.codigo })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: printing,
						onClick: () => {
							doPrint(false);
						},
						className: "w-full h-12",
						style: {
							background: POS_PRINT_COLOR,
							color: "#fff"
						},
						children: printing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-2" }), " Imprimir"] })
					}),
					!nativePrinterReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-[11px]",
						style: { color: V2.LIGHT_MUTED },
						children: "Ponte nativa ainda não detectada — o botão tenta imprimir mesmo assim."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => {
							doPrint(true);
						},
						className: "w-full h-11",
						children: "Ver cupom na tela"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => {
							setPrintPrompt(null);
							onDone();
						},
						className: "w-full h-11",
						children: "Concluir"
					})
				]
			})]
		})
	});
}
//#endregion
export { PosVender as component };
