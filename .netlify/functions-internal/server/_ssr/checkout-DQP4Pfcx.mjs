import { o as __toESM } from "../_runtime.mjs";
import { _ as string, g as object, h as number, p as array } from "../_libs/@lovable.dev/mcp-js.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { l as createServerFn } from "./esm-BG-5H9y6.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-bu9wKdsd.mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useMyCompany, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { $ as PackageCheck, $t as Check, Lt as CreditCard, Rt as Copy, U as QrCode, d as UserCheck, dt as LoaderCircle, mn as ArrowLeft, rt as MessageCircle } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { n as useCreateOrder } from "./use-orders-CBi7bZ2w.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BCRdNRut.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as cartSubtotal, s as useCart } from "./use-cart-D1K0BW4t.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
import { n as useCreateAddress, t as useAddresses } from "./use-addresses-C_eHrBQe.mjs";
import { t as WhatsAppFab } from "./whatsapp-fab-BGRFc-KK.mjs";
import { c as usePaymentFees, l as usePaymentSettings, t as buildPlansFromFees } from "./use-catalog-DqziQTPw.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
import { t as parseLeadAddress } from "./lead-address-NMtqYJJZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-DQP4Pfcx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CartItemSchema = object({
	product_id: string(),
	quantidade: number().int().positive(),
	preco_unitario: number()
});
var InputSchema = object({
	cepDestino: string().min(8),
	items: array(CartItemSchema).min(1)
});
var calculateShipping = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => InputSchema.parse(data)).handler(createSsrRpc("87fa976c53e2ed770ba0a10b119bddda639806f28586797d6826bfe67748b182"));
var DEFAULTS = {
	copia_cola: "",
	qr_image_url: "",
	beneficiario: "",
	cidade: ""
};
function usePixSettings() {
	return useQuery({
		queryKey: ["pix-settings"],
		staleTime: 6e4,
		queryFn: async () => {
			const { data, error } = await supabase.from("system_settings").select("chave, valor").eq("categoria", "pix");
			if (error) throw error;
			const out = _objectSpread2({}, DEFAULTS);
			for (const row of data !== null && data !== void 0 ? data : []) {
				var _row$valor$value, _row$valor, _row$valor2;
				const v = typeof row.valor === "string" ? row.valor : (_row$valor$value = (_row$valor = row.valor) === null || _row$valor === void 0 ? void 0 : _row$valor.value) !== null && _row$valor$value !== void 0 ? _row$valor$value : String((_row$valor2 = row.valor) !== null && _row$valor2 !== void 0 ? _row$valor2 : "");
				if (row.chave in out) out[row.chave] = v;
			}
			return out;
		}
	});
}
var REGISTRATION_ADDRESS_ID = "registration-address";
function normalizeZip(value) {
	const digits = (value !== null && value !== void 0 ? value : "").replace(/\D/g, "").slice(0, 8);
	return digits.length === 8 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : "";
}
function normalizeState(value) {
	const uf = (value !== null && value !== void 0 ? value : "").replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);
	return uf.length === 2 ? uf : "";
}
function normalizeAddressForOrder(addr) {
	var _addr$zip, _addr$state;
	return _objectSpread2(_objectSpread2({}, addr), {}, {
		zip: normalizeZip((_addr$zip = addr.zip) !== null && _addr$zip !== void 0 ? _addr$zip : ""),
		state: normalizeState((_addr$state = addr.state) !== null && _addr$state !== void 0 ? _addr$state : "")
	});
}
function useSellerCompany(companyId) {
	return useQuery({
		queryKey: ["seller-company", companyId],
		enabled: !!companyId,
		queryFn: async () => {
			var _lead$observacoes;
			const { data, error } = await supabase.from("companies").select("id, cidade, estado").eq("id", companyId).maybeSingle();
			if (error) throw error;
			const { data: lead, error: leadError } = await supabase.from("leads").select("observacoes").eq("company_id", companyId).order("created_at", { ascending: false }).limit(1).maybeSingle();
			if (leadError) throw leadError;
			return data ? _objectSpread2(_objectSpread2({}, data), {}, { lead_observacoes: (_lead$observacoes = lead === null || lead === void 0 ? void 0 : lead.observacoes) !== null && _lead$observacoes !== void 0 ? _lead$observacoes : null }) : null;
		}
	});
}
var STEPS = [
	"Cliente",
	"Endereço",
	"Frete",
	"Pagamento"
];
function CheckoutPage() {
	var _sellerCompanyFull$ci, _sellerCompanyFull$es, _settings$find$value, _settings$find, _settings$find$value2, _settings$find2, _sellerCustomer$trade, _sellerCustomer$trade2, _sellerCustomer$tax_i, _company$tax_id, _company$cidade, _company$estado;
	const { user } = useAuth();
	const { data: ownCompany } = useMyCompany(user);
	const sellerCustomer = useSellerSession((s) => s.customer);
	const sellerTripId = useSellerSession((s) => s.tripId);
	const endSellerSale = useSellerSession((s) => s.endSale);
	const isSellerMode = !!sellerCustomer;
	const { data: activeTripId } = useQuery({
		queryKey: ["active-trip-id"],
		enabled: !sellerTripId,
		queryFn: async () => {
			var _data$id;
			const { data } = await supabase.from("trips").select("id").eq("status", "open").order("opened_at", { ascending: false }).limit(1).maybeSingle();
			return (_data$id = data === null || data === void 0 ? void 0 : data.id) !== null && _data$id !== void 0 ? _data$id : null;
		}
	});
	const { data: sellerCompanyFull } = useSellerCompany(isSellerMode ? sellerCustomer.id : void 0);
	const company = isSellerMode ? {
		id: sellerCustomer.id,
		legal_name: sellerCustomer.legal_name,
		tax_id: sellerCustomer.tax_id,
		status: "approved",
		cidade: (_sellerCompanyFull$ci = sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.cidade) !== null && _sellerCompanyFull$ci !== void 0 ? _sellerCompanyFull$ci : null,
		estado: (_sellerCompanyFull$es = sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.estado) !== null && _sellerCompanyFull$es !== void 0 ? _sellerCompanyFull$es : null
	} : ownCompany;
	const items = useCart((s) => s.items);
	const clear = useCart((s) => s.clear);
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)(0);
	const { data: addresses = [] } = useAddresses(company === null || company === void 0 ? void 0 : company.id);
	const registrationAddress = (0, import_react.useMemo)(() => isSellerMode ? parseLeadAddress(sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.lead_observacoes, sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.cidade, sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.estado) : null, [
		isSellerMode,
		sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.cidade,
		sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.estado,
		sellerCompanyFull === null || sellerCompanyFull === void 0 ? void 0 : sellerCompanyFull.lead_observacoes
	]);
	const checkoutAddresses = (0, import_react.useMemo)(() => addresses.length > 0 || !registrationAddress ? addresses : [_objectSpread2(_objectSpread2({}, registrationAddress), {}, {
		id: REGISTRATION_ADDRESS_ID,
		kind: "both"
	})], [addresses, registrationAddress]);
	const [addressId, setAddressId] = (0, import_react.useState)("");
	const [frete, setFrete] = (0, import_react.useState)(0);
	const [freteLabel, setFreteLabel] = (0, import_react.useState)("");
	const [isRetirada, setIsRetirada] = (0, import_react.useState)(false);
	const [cepManual, setCepManual] = (0, import_react.useState)("");
	const [shippingOptions, setShippingOptions] = (0, import_react.useState)([]);
	const [shippingLoading, setShippingLoading] = (0, import_react.useState)(false);
	const calcShipping = useServerFn(calculateShipping);
	const [observacao, setObservacao] = (0, import_react.useState)("");
	const [pagamento, setPagamento] = (0, import_react.useState)("PIX");
	const [parcelas, setParcelas] = (0, import_react.useState)(1);
	const [multiplicador, setMultiplicador] = (0, import_react.useState)(1);
	const [cardDialogOpen, setCardDialogOpen] = (0, import_react.useState)(false);
	const [pixAlertOpen, setPixAlertOpen] = (0, import_react.useState)(false);
	const [descontoInput, setDescontoInput] = (0, import_react.useState)(0);
	const [descontoTipo, setDescontoTipo] = (0, import_react.useState)("BRL");
	const { data: fees = [] } = usePaymentFees();
	const { data: settings = [] } = usePaymentSettings();
	const parcelasSemJuros = Number((_settings$find$value = (_settings$find = settings.find((s) => s.key === "parcelas_sem_juros")) === null || _settings$find === void 0 ? void 0 : _settings$find.value) !== null && _settings$find$value !== void 0 ? _settings$find$value : 0);
	const antecMensal = Number((_settings$find$value2 = (_settings$find2 = settings.find((s) => s.key === "antecipacao_mensal")) === null || _settings$find2 === void 0 ? void 0 : _settings$find2.value) !== null && _settings$find$value2 !== void 0 ? _settings$find$value2 : 0);
	const plans = (0, import_react.useMemo)(() => buildPlansFromFees(fees, parcelasSemJuros, antecMensal), [
		fees,
		parcelasSemJuros,
		antecMensal
	]);
	const baseSubtotal = cartSubtotal(items);
	const fator = pagamento === "CARTAO" ? multiplicador : 1;
	const subtotal = baseSubtotal * fator;
	const acrescimo = subtotal - baseSubtotal;
	const desconto = isSellerMode ? descontoTipo === "PCT" ? subtotal * (Math.min(100, Math.max(0, descontoInput)) / 100) : Math.max(0, Number(descontoInput || 0)) : 0;
	const total = Math.max(0, subtotal + frete - desconto);
	const valorParcela = pagamento === "CARTAO" && parcelas > 0 ? total / parcelas : 0;
	const create = useCreateOrder();
	const selectedAddress = checkoutAddresses.find((a) => a.id === addressId);
	(0, import_react.useEffect)(() => {
		if (selectedAddress === null || selectedAddress === void 0 ? void 0 : selectedAddress.zip) setCepManual(String(selectedAddress.zip));
	}, [selectedAddress === null || selectedAddress === void 0 ? void 0 : selectedAddress.zip]);
	(0, import_react.useEffect)(() => {
		if (!addressId && checkoutAddresses.length === 1) setAddressId(checkoutAddresses[0].id);
		if (addressId && !checkoutAddresses.some((a) => a.id === addressId)) setAddressId("");
	}, [addressId, checkoutAddresses]);
	async function handleCalcShipping() {
		const cep = (cepManual || "").replace(/\D/g, "");
		if (cep.length !== 8) {
			toast.error("Informe um CEP válido (8 dígitos).");
			return;
		}
		setShippingLoading(true);
		setShippingOptions([]);
		try {
			const opts = await calcShipping({ data: {
				cepDestino: cep,
				items: items.map((i) => ({
					product_id: i.product_id,
					quantidade: i.quantidade,
					preco_unitario: Number(i.preco_unitario)
				}))
			} });
			if (opts.filter((o) => !o.error && o.price > 0).length === 0) toast.error("Nenhuma opção de frete disponível para este CEP.");
			setShippingOptions(opts);
		} catch (e) {
			toast.error(e.message);
		} finally {
			setShippingLoading(false);
		}
	}
	function pickShipping(opt) {
		setIsRetirada(false);
		setFrete(opt.price);
		setFreteLabel(`${opt.company} ${opt.name} (${opt.delivery_days} dias úteis)`);
	}
	function pickRetirada() {
		setIsRetirada(true);
		setFrete(0);
		setFreteLabel("Retirada / Entrega em mãos");
		setShippingOptions([]);
	}
	function openCardDialog() {
		setPagamento("CARTAO");
		setCardDialogOpen(true);
	}
	function selectPix() {
		setPagamento("PIX");
		setParcelas(1);
		setMultiplicador(1);
		setPixAlertOpen(true);
	}
	function confirmPlan(p) {
		setParcelas(p.parcelas);
		setMultiplicador(p.multiplicador);
		setCardDialogOpen(false);
	}
	if (!company || company.status !== "approved") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutV3Shell, {
		title: "Checkout B2B",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border p-6 text-sm max-w-md mx-auto my-8 text-center",
			style: {
				background: "#ffffff",
				borderColor: "#e8e2d8"
			},
			children: isSellerMode ? "Cliente inválido para venda. Volte e escolha outro." : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-bold text-base mb-2",
					style: { color: "#3d2b1f" },
					children: "Empresa em Aprovação"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mb-4",
					children: "Sua empresa precisa estar aprovada para finalizar pedidos no atacado."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/companies",
					className: "inline-flex h-10 px-5 rounded-full text-xs font-bold items-center text-white",
					style: { background: "#c9a96e" },
					children: "Ver meu cadastro"
				})
			] })
		})
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutV3Shell, {
		title: "Checkout B2B",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border p-8 text-center max-w-md mx-auto my-8 space-y-4",
			style: {
				background: "#ffffff",
				borderColor: "#e8e2d8"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-semibold",
				style: { color: "#3d2b1f" },
				children: "Seu carrinho está vazio."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "inline-flex h-11 px-6 rounded-full text-xs font-bold items-center text-white",
				style: { background: "#c9a96e" },
				children: "Voltar ao catálogo"
			})]
		})
	});
	async function finalizar() {
		if (pagamento === "CARTAO" && parcelas < 1) {
			toast.error("Selecione a quantidade de parcelas.");
			setCardDialogOpen(true);
			return;
		}
		try {
			const observacaoFinal = [observacao, pagamento === "CARTAO" ? `Cartão em ${parcelas}x de ${brl(valorParcela)}${acrescimo > 0 ? ` (acréscimo ${brl(acrescimo)})` : " sem juros"}.` : ""].filter(Boolean).join(" — ");
			let finalAddressId = addressId || null;
			let createdAddressId = null;
			if (finalAddressId === REGISTRATION_ADDRESS_ID && registrationAddress) {
				var _data$id2;
				const normalized = normalizeAddressForOrder(registrationAddress);
				if (!normalized.zip || !normalized.state) {
					toast.error("O CEP/UF do endereço do cadastro está incompleto. Edite o cadastro do cliente ou informe um novo endereço.");
					setStep(1);
					return;
				}
				const { data, error } = await supabaseInsertAddress(company.id, normalized);
				if (error) throw error;
				finalAddressId = (_data$id2 = data === null || data === void 0 ? void 0 : data.id) !== null && _data$id2 !== void 0 ? _data$id2 : null;
				createdAddressId = finalAddressId;
				if (finalAddressId) setAddressId(finalAddressId);
			} else if (finalAddressId && selectedAddress) {
				if (!normalizeZip(selectedAddress.zip) || !normalizeState(selectedAddress.state)) {
					toast.error("Endereço selecionado tem CEP ou UF inválido. Edite-o antes de finalizar.");
					setStep(1);
					return;
				}
			}
			try {
				var _ref;
				const id = await create.mutateAsync({
					company_id: company.id,
					address_id: finalAddressId,
					origem: isSellerMode ? "VISITA" : "PORTAL",
					items,
					frete,
					desconto,
					acrescimo,
					observacao: observacaoFinal,
					pagamento,
					trip_id: (_ref = sellerTripId !== null && sellerTripId !== void 0 ? sellerTripId : activeTripId) !== null && _ref !== void 0 ? _ref : null
				});
				clear();
				if (isSellerMode) endSellerSale();
				toast.success(isSellerMode ? "Venda finalizada! Pronto para o próximo cliente." : "Pedido criado!");
				if (isSellerMode) navigate({ to: "/vendas/nova" });
				else navigate({
					to: "/orders/$id",
					params: { id },
					search: { edit: false }
				});
			} catch (orderErr) {
				if (createdAddressId) {
					const { supabase } = await import("./client-CtYDXrXg.mjs").then((n) => n.n).then((n) => n.t);
					await supabase.from("addresses").delete().eq("id", createdAddressId);
					setAddressId(REGISTRATION_ADDRESS_ID);
				}
				throw orderErr;
			}
		} catch (e) {
			toast.error(e.message);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckoutV3Shell, {
		title: isSellerMode ? "Finalizar Venda em Visita" : "Checkout — Finalizar Pedido",
		description: isSellerMode ? `Cliente: ${(_sellerCustomer$trade = sellerCustomer.trade_name) !== null && _sellerCustomer$trade !== void 0 ? _sellerCustomer$trade : sellerCustomer.legal_name}` : "Conclua seu pedido em 4 passos.",
		children: [
			isSellerMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-xl border border-primary/30 bg-primary/5 p-3 flex items-center gap-3 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-4 w-4 text-primary shrink-0" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex-1",
						children: [
							"Venda para ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: (_sellerCustomer$trade2 = sellerCustomer.trade_name) !== null && _sellerCustomer$trade2 !== void 0 ? _sellerCustomer$trade2 : sellerCustomer.legal_name }),
							" · CNPJ ",
							(_sellerCustomer$tax_i = sellerCustomer.tax_id) !== null && _sellerCustomer$tax_i !== void 0 ? _sellerCustomer$tax_i : "—"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							endSellerSale();
							clear();
							navigate({ to: "/vendas/nova" });
						},
						className: "text-xs underline text-muted-foreground hover:text-destructive",
						children: "Cancelar venda"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "flex gap-2 mb-6 overflow-x-auto",
				children: STEPS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: cn("flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border whitespace-nowrap", i === step ? "bg-primary text-primary-foreground border-primary" : i < step ? "bg-success/10 text-success border-success/40" : "bg-card text-muted-foreground border-border"),
					children: [i < step && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [
							i + 1,
							". ",
							s
						]
					})]
				}, s))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 bg-card border border-border rounded-xl p-6 space-y-4",
					children: [
						step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: "Dados do cliente"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Empresa",
									value: company.legal_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "CNPJ",
									value: (_company$tax_id = company.tax_id) !== null && _company$tax_id !== void 0 ? _company$tax_id : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observação (opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: observacao,
										onChange: (e) => setObservacao(e.target.value),
										className: "w-full min-h-20 rounded-md border border-border bg-background p-2 text-sm"
									})]
								})
							]
						}),
						step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: "Endereço de entrega"
								}),
								isSellerMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setAddressId("");
										setStep(2);
									},
									className: "w-full flex items-center gap-3 px-3 py-3 rounded-md border border-primary/40 bg-primary/5 text-sm text-left hover:bg-primary/10 transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "w-5 h-5 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: "Pular endereço — venda em loco"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Entrega já feita em mãos. Não precisa informar endereço."
										})]
									})]
								}),
								checkoutAddresses.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: checkoutAddresses.map((a) => {
										var _a$label;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: cn("flex gap-3 p-3 rounded-md border cursor-pointer transition-colors", addressId === a.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "radio",
												name: "addr",
												value: a.id,
												checked: addressId === a.id,
												onChange: () => setAddressId(a.id),
												className: "mt-1"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "font-medium",
													children: (_a$label = a.label) !== null && _a$label !== void 0 ? _a$label : a.kind
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-muted-foreground",
													children: [
														a.street,
														", ",
														a.number,
														" — ",
														a.district,
														", ",
														a.city,
														"/",
														a.state,
														" · CEP ",
														a.zip
													]
												})]
											})]
										}, a.id);
									})
								}),
								checkoutAddresses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InlineAddressForm, {
									companyId: company.id,
									defaultCity: (_company$cidade = company.cidade) !== null && _company$cidade !== void 0 ? _company$cidade : "",
									defaultState: (_company$estado = company.estado) !== null && _company$estado !== void 0 ? _company$estado : "",
									prefill: registrationAddress,
									onCreated: (id) => {
										setAddressId(id);
										setStep(2);
									}
								})
							]
						}),
						step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: "Entrega"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: pickRetirada,
									className: cn("w-full flex items-center gap-3 px-3 py-3 rounded-md border text-sm text-left transition-colors", isRetirada ? "border-primary bg-primary/5" : "border-border hover:bg-muted"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageCheck, { className: "w-5 h-5 text-primary shrink-0" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: "Retirada / Entrega em mãos"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "Mercadoria entregue na hora pelo vendedor. Sem custo de frete."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: brl(0)
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative my-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 flex items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full border-t border-border" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative flex justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-card px-2 text-[11px] uppercase tracking-wider text-muted-foreground",
											children: "ou calcular frete"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 items-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CEP de destino" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											inputMode: "numeric",
											maxLength: 9,
											placeholder: "00000-000",
											value: cepManual,
											onChange: (e) => setCepManual(e.target.value)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										onClick: handleCalcShipping,
										disabled: shippingLoading,
										variant: "outline",
										children: shippingLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : "Calcular"
									})]
								}),
								shippingOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2 pt-2",
									children: shippingOptions.map((o) => {
										const disabled = !!o.error || o.price <= 0;
										const selected = !disabled && frete === o.price && freteLabel.includes(o.name);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											disabled,
											onClick: () => pickShipping(o),
											className: cn("w-full flex items-center justify-between px-3 py-2 rounded-md border text-sm text-left transition-colors", disabled && "opacity-50 cursor-not-allowed", selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-medium",
												children: [
													o.company,
													" — ",
													o.name
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: o.error ? o.error : `Entrega em ${o.delivery_days} dias úteis`
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold",
												children: disabled ? "—" : brl(o.price)
											})]
										}, o.id);
									})
								}),
								freteLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-success/40 bg-success/10 p-2 text-xs",
									children: [
										"Selecionado: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: freteLabel }),
										" — ",
										brl(frete)
									]
								})
							]
						}),
						step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-semibold",
									children: "Pagamento"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayOption, {
										icon: QrCode,
										label: "PIX",
										active: pagamento === "PIX",
										onClick: selectPix
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayOption, {
										icon: CreditCard,
										label: "Cartão",
										active: pagamento === "CARTAO",
										onClick: openCardDialog
									})]
								}),
								pagamento === "CARTAO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-primary/40 bg-primary/5 p-3 text-xs flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										parcelas,
										"× de ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(valorParcela) }),
										acrescimo > 0 ? ` (acréscimo ${brl(acrescimo)})` : " — sem juros"
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setCardDialogOpen(true),
										className: "underline text-primary",
										children: "Alterar"
									})]
								}),
								isSellerMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border p-3 space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs uppercase tracking-wider text-muted-foreground",
												children: "Desconto na venda"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "inline-flex rounded-md border border-border overflow-hidden",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: cn("px-2 text-[11px] leading-6", descontoTipo === "BRL" ? "bg-primary text-primary-foreground" : "hover:bg-accent"),
													onClick: () => setDescontoTipo("BRL"),
													children: "R$"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													className: cn("px-2 text-[11px] leading-6", descontoTipo === "PCT" ? "bg-primary text-primary-foreground" : "hover:bg-accent"),
													onClick: () => setDescontoTipo("PCT"),
													children: "%"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											min: 0,
											max: descontoTipo === "PCT" ? 100 : void 0,
											step: "0.01",
											value: descontoInput,
											onChange: (e) => setDescontoInput(Number(e.target.value)),
											placeholder: "0"
										}),
										desconto > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground",
											children: ["Desconto aplicado: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-destructive",
												children: ["- ", brl(desconto)]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground",
									children: [
										"A integração com Mercado Pago (geração de QR Code PIX e processamento de cartão) será concluída assim que você fornecer a chave de acesso da sua conta MP. Por enquanto o pedido é criado com status ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Aguardando pagamento" }),
										"."
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between pt-4 border-t border-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								disabled: step === 0,
								onClick: () => setStep(step - 1),
								children: "Voltar"
							}), step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => setStep(step + 1),
								disabled: step === 1 && !addressId && !isSellerMode,
								children: "Continuar"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: finalizar,
								disabled: create.isPending,
								children: create.isPending ? "Criando…" : "Finalizar pedido"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border border-border rounded-xl p-5 h-fit space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Resumo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-1 text-xs",
							children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate",
									children: [
										i.quantidade,
										"× ",
										i.nome,
										" ",
										i.tipo_compra === "PACOTE" ? "(pacote)" : ""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl((i.tipo_compra === "PACOTE" && i.preco_pacote ? Number(i.preco_pacote) : Number(i.preco_unitario)) * i.quantidade * fator) })]
							}, `${i.product_id}-${i.tipo_compra}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border pt-3 space-y-1 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(subtotal) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frete" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(frete) })]
								}),
								desconto > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-destructive",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Desconto", descontoTipo === "PCT" ? ` (${descontoInput}%)` : ""] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["- ", brl(desconto)] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-semibold pt-1 border-t border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(total) })]
								}),
								pagamento === "CARTAO" && parcelas > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground text-right",
									children: [
										parcelas,
										"× de ",
										brl(valorParcela)
									]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: cardDialogOpen,
				onOpenChange: setCardDialogOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Parcelamento no cartão" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Escolha em quantas vezes deseja pagar. O total é recalculado com a taxa correspondente." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-80 overflow-y-auto divide-y divide-border border border-border rounded-md",
							children: plans.map((p) => {
								const totalPlan = baseSubtotal * p.multiplicador + frete;
								const parcela = totalPlan / p.parcelas;
								const semJuros = p.multiplicador === 1;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => confirmPlan(p),
									className: cn("w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted text-left", p.parcelas === parcelas && "bg-primary/10"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium",
										children: [
											p.parcelas,
											"× de ",
											brl(parcela)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("text-xs", semJuros ? "text-success" : "text-muted-foreground"),
										children: semJuros ? "sem juros" : `total ${brl(totalPlan)}`
									})]
								}, p.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setCardDialogOpen(false),
							children: "Fechar"
						}) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PixDialog, {
				open: pixAlertOpen,
				onOpenChange: setPixAlertOpen,
				total
			})
		]
	});
}
function PixDialog({ open, onOpenChange, total }) {
	var _pix$copia_cola, _pix$qr_image_url;
	const { data: pix } = usePixSettings();
	const copiaCola = (_pix$copia_cola = pix === null || pix === void 0 ? void 0 : pix.copia_cola) !== null && _pix$copia_cola !== void 0 ? _pix$copia_cola : "";
	const qr = (_pix$qr_image_url = pix === null || pix === void 0 ? void 0 : pix.qr_image_url) !== null && _pix$qr_image_url !== void 0 ? _pix$qr_image_url : "";
	async function copy() {
		if (!copiaCola) return toast.error("Chave PIX ainda não configurada pelo admin.");
		try {
			await navigator.clipboard.writeText(copiaCola);
			toast.success("Copiado! Cole no app do seu banco.");
		} catch (_unused) {
			toast.error("Não foi possível copiar.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md border-2 border-warning max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-2xl font-extrabold text-warning",
					children: "⚠️ ATENÇÃO!"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "sr-only",
					children: "Instruções para pagamento via PIX"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-warning/10 border border-warning/40 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-base font-semibold leading-relaxed",
								children: [
									"Digite o ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-warning font-extrabold underline",
										children: "VALOR EXATO"
									}),
									" da sua compra ao pagar o PIX."
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: [
									"O QR Code é ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "sem valor pré-definido" }),
									". Sem o valor exato, o sistema não identifica seu pagamento automaticamente."
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-primary/10 border border-primary/30 p-3 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Valor a pagar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-3xl font-extrabold text-primary",
								children: brl(total)
							})]
						}),
						qr ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg border border-border bg-white p-3 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: qr,
								alt: "QR Code PIX",
								className: "w-56 h-56 object-contain"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-dashed border-border p-6 text-center text-xs text-muted-foreground",
							children: [
								"QR Code ainda não configurado. Peça ao admin para cadastrar em ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Administração › PIX" }),
								"."
							]
						}),
						copiaCola && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "PIX copia e cola"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 rounded-md border border-border bg-muted/40 p-2 text-[11px] font-mono break-all max-h-24 overflow-y-auto",
								children: copiaCola
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: copy,
								variant: "outline",
								className: "w-full mt-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4" }), " Copiar código PIX"]
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					onClick: () => onOpenChange(false),
					children: "Entendi, vou pagar"
				}) })
			]
		})
	});
}
function Field({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs uppercase tracking-wider text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm font-medium",
		children: value
	})] });
}
function PayOption({ icon: Icon, label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		className: cn("border rounded-lg p-4 flex flex-col items-center gap-2 transition-colors", active ? "border-primary bg-primary/5" : "border-border hover:bg-muted"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-6 h-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-medium text-sm",
			children: label
		})]
	});
}
function InlineAddressForm({ companyId, defaultCity, defaultState, prefill, onCreated }) {
	var _prefill$label, _prefill$street, _prefill$number, _prefill$complement, _prefill$district, _ref2, _prefill$city, _ref3, _prefill$state, _prefill$zip;
	const create = useCreateAddress(companyId);
	const [form, setForm] = (0, import_react.useState)({
		label: (_prefill$label = prefill === null || prefill === void 0 ? void 0 : prefill.label) !== null && _prefill$label !== void 0 ? _prefill$label : "Entrega",
		street: (_prefill$street = prefill === null || prefill === void 0 ? void 0 : prefill.street) !== null && _prefill$street !== void 0 ? _prefill$street : "",
		number: (_prefill$number = prefill === null || prefill === void 0 ? void 0 : prefill.number) !== null && _prefill$number !== void 0 ? _prefill$number : "",
		complement: (_prefill$complement = prefill === null || prefill === void 0 ? void 0 : prefill.complement) !== null && _prefill$complement !== void 0 ? _prefill$complement : "",
		district: (_prefill$district = prefill === null || prefill === void 0 ? void 0 : prefill.district) !== null && _prefill$district !== void 0 ? _prefill$district : "",
		city: (_ref2 = (_prefill$city = prefill === null || prefill === void 0 ? void 0 : prefill.city) !== null && _prefill$city !== void 0 ? _prefill$city : defaultCity) !== null && _ref2 !== void 0 ? _ref2 : "",
		state: (_ref3 = (_prefill$state = prefill === null || prefill === void 0 ? void 0 : prefill.state) !== null && _prefill$state !== void 0 ? _prefill$state : defaultState) !== null && _ref3 !== void 0 ? _ref3 : "",
		zip: (_prefill$zip = prefill === null || prefill === void 0 ? void 0 : prefill.zip) !== null && _prefill$zip !== void 0 ? _prefill$zip : ""
	});
	function set(k, v) {
		setForm((f) => _objectSpread2(_objectSpread2({}, f), {}, { [k]: v }));
	}
	async function submit() {
		if (!form.street || !form.number || !form.city || !form.state || !form.zip) {
			toast.error("Preencha rua, número, cidade, UF e CEP.");
			return;
		}
		try {
			const { data, error } = await supabaseInsertAddress(companyId, form);
			if (error) throw error;
			toast.success("Endereço cadastrado");
			if (data === null || data === void 0 ? void 0 : data.id) onCreated(data.id);
			setForm((f) => _objectSpread2(_objectSpread2({}, f), {}, {
				street: "",
				number: "",
				complement: "",
				district: "",
				zip: ""
			}));
			create.reset();
		} catch (e) {
			toast.error((e === null || e === void 0 ? void 0 : e.message) || "Erro ao salvar endereço");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-muted/30 p-3 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Adicionar endereço de entrega"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-6 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Rua"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.street,
							onChange: (e) => set("street", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Número"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.number,
							onChange: (e) => set("number", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Complemento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.complement,
							onChange: (e) => set("complement", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Bairro"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.district,
							onChange: (e) => set("district", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Cidade"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.city,
							onChange: (e) => set("city", e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "UF"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							maxLength: 2,
							value: form.state,
							onChange: (e) => set("state", e.target.value.toUpperCase())
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "CEP"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.zip,
							onChange: (e) => set("zip", e.target.value)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: submit,
					disabled: create.isPending,
					children: create.isPending ? "Salvando…" : "Salvar endereço"
				})
			})
		]
	});
}
async function supabaseInsertAddress(companyId, form) {
	const { supabase } = await import("./client-CtYDXrXg.mjs").then((n) => n.n).then((n) => n.t);
	return supabase.from("addresses").insert(_objectSpread2(_objectSpread2({}, form), {}, { company_id: companyId })).select("id").single();
}
function CheckoutV3Shell({ children, title, description }) {
	const BG = "#faf8f5";
	const SURFACE = "#ffffff";
	const BORDER = "#e8e2d8";
	const ORANGE = "#c9a96e";
	const TEXT = "#3d2b1f";
	const MUTED = "#8b7355";
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
								children: "Checkout Seguro"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "https://wa.me/5534998651112?text=Ol%C3%A1!%20Estou%20no%20checkout%20do%20site%20e%20preciso%20de%20suporte.",
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
							to: "/cart",
							className: "h-9 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border transition-colors hover:bg-black/5",
							style: {
								borderColor: BORDER,
								color: TEXT
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Voltar ao carrinho"]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 max-w-6xl w-full mx-auto px-5 py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl sm:text-3xl font-black",
						style: { color: TEXT },
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium mt-1",
						style: { color: MUTED },
						children: description
					})]
				}), children]
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppFab, { message: "Olá! Estou no checkout do Atacado Prime e preciso de suporte com meu pedido." })
		]
	});
}
//#endregion
export { CheckoutPage as component };
