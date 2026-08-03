import { o as __toESM } from "./_runtime.mjs";
import { _ as string, g as object } from "./_libs/@lovable.dev/mcp-js.mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "./_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./_ssr/objectSpread2-Dy4Ru7eO.mjs";
import { l as createServerFn } from "./_ssr/esm-BG-5H9y6.mjs";
import { t as requireSupabaseAuth } from "./_ssr/auth-middleware-bu9wKdsd.mjs";
import { i as brl, n as generateOrderPdf, o as formatDateTime } from "./_ssr/pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./_ssr/order-code-C-NI66BU.mjs";
import { t as Button } from "./_ssr/button-Bsporrlm.mjs";
import { t as Input } from "./_ssr/input-DeD3Xbgy.mjs";
import { t as Route } from "./_id-CLQlsMny.mjs";
import { i as useRoles, t as useAuth } from "./_ssr/use-auth-DI-712Mw.mjs";
import { t as Label } from "./_ssr/label-OjExnIog.mjs";
import { At as FileDown, I as Save, M as Send, Nt as ExternalLink, Rt as Copy, Y as Pencil, n as X, p as Truck } from "./_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./_ssr/InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./_ssr/dialog-TZjTs9D2.mjs";
import { a as useOrder, c as useUpdatePaymentLink, o as useUpdateOrderItems, s as useUpdateOrderStatus, t as useConfirmPayment } from "./_ssr/use-orders-CBi7bZ2w.mjs";
import { t as createSsrRpc } from "./_ssr/createSsrRpc-BCRdNRut.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./_ssr/select-BVkvqzl6.mjs";
import { i as nextStatus, n as isPaidStatus, t as canCancel } from "./_ssr/status-Dxqe_Ggj.mjs";
import { t as StatusPill } from "./_ssr/status-pill-nUgOhmrP.mjs";
import { t as useBankAccounts } from "./_ssr/use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-C5oIHWCD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = object({ orderId: string().uuid() });
var getOrderShare = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => schema.parse(d)).handler(createSsrRpc("71c81ba1192ae4ab2d910d5c5b11fc68b9b1e27920658c12696428255685c1d8"));
function OrderDetail() {
	var _o$payments, _o$companies, _o$companies2, _o$order_items3, _o$order_history, _o$companies5;
	const { id } = Route.useParams();
	const { edit } = Route.useSearch();
	const { data: o, isLoading } = useOrder(id);
	const { user } = useAuth();
	const { data: roles = [] } = useRoles(user);
	const isAdmin = roles.includes("admin");
	const isSeller = roles.some((r) => r === "admin" || r === "vendedor" || r === "gerente");
	const update = useUpdateOrderStatus();
	const updateLink = useUpdatePaymentLink();
	const updateItems = useUpdateOrderItems();
	const confirmPay = useConfirmPayment();
	const { data: bankAccounts = [] } = useBankAccounts();
	const [linkDraft, setLinkDraft] = (0, import_react.useState)("");
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [payReplace, setPayReplace] = (0, import_react.useState)(false);
	const [payTipo, setPayTipo] = (0, import_react.useState)("PIX");
	const [payAccountId, setPayAccountId] = (0, import_react.useState)("");
	const [payParcelas, setPayParcelas] = (0, import_react.useState)(1);
	const [payPrazo, setPayPrazo] = (0, import_react.useState)("30");
	const [payObs, setPayObs] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!payAccountId && bankAccounts.length > 0) setPayAccountId(bankAccounts[0].id);
	}, [bankAccounts, payAccountId]);
	const pay = o === null || o === void 0 || (_o$payments = o.payments) === null || _o$payments === void 0 ? void 0 : _o$payments[0];
	(0, import_react.useEffect)(() => {
		var _pay$payment_link;
		setLinkDraft((_pay$payment_link = pay === null || pay === void 0 ? void 0 : pay.payment_link) !== null && _pay$payment_link !== void 0 ? _pay$payment_link : "");
	}, [pay === null || pay === void 0 ? void 0 : pay.payment_link]);
	const [editMode, setEditMode] = (0, import_react.useState)(false);
	const [drafts, setDrafts] = (0, import_react.useState)([]);
	const [freteDraft, setFreteDraft] = (0, import_react.useState)(0);
	const [descontoDraft, setDescontoDraft] = (0, import_react.useState)(0);
	const canEdit = !!(isSeller && o && o.status !== "CANCELADO" && o.status !== "ENTREGUE");
	(0, import_react.useEffect)(() => {
		if (edit && canEdit) setEditMode(true);
	}, [edit, canEdit]);
	(0, import_react.useEffect)(() => {
		var _o$order_items;
		if (!o) return;
		setDrafts(((_o$order_items = o.order_items) !== null && _o$order_items !== void 0 ? _o$order_items : []).map((it) => ({
			id: it.id,
			quantidade: Number(it.quantidade),
			preco_final: Number(it.preco_final)
		})));
		setFreteDraft(Number(o.frete));
		setDescontoDraft(Number(o.desconto));
	}, [o === null || o === void 0 ? void 0 : o.id, editMode]);
	const draftSubtotal = (0, import_react.useMemo)(() => drafts.reduce((s, d) => s + Number(d.preco_final) * Number(d.quantidade), 0), [drafts]);
	const draftTotal = draftSubtotal + Number(freteDraft || 0) - Number(descontoDraft || 0);
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Pedido",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Carregando…"
		})
	});
	if (!o) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Pedido",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Pedido não encontrado."
		})
	});
	const next = nextStatus(o.status);
	const isPaid = isPaidStatus(o.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: `Pedido ${orderCodeHash(o.id, ((_o$companies = o.companies) === null || _o$companies === void 0 ? void 0 : _o$companies.trade_name) || ((_o$companies2 = o.companies) === null || _o$companies2 === void 0 ? void 0 : _o$companies2.legal_name))}`,
		description: formatDateTime(o.created_at),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5 flex items-center justify-between flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-muted-foreground",
								children: "Status atual"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: o.status })
							})] }),
							isAdmin && next && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => {
									if (next === "PAGO") {
										setPayTipo("PIX");
										setPayParcelas(1);
										setPayObs("");
										setPayOpen(true);
									} else update.mutate({
										id: o.id,
										status: next
									}, { onSuccess: () => toast.success("Status atualizado") });
								},
								children: ["Avançar para ", next.replace(/_/g, " ")]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: () => {
									var _o$order_items2;
									return generateOrderPdf({
										id: o.id,
										created_at: o.created_at,
										subtotal: o.subtotal,
										frete: o.frete,
										desconto: o.desconto,
										total: o.total,
										observacao: o.observacao,
										status: o.status,
										company: o.companies,
										address: o.addresses,
										items: ((_o$order_items2 = o.order_items) !== null && _o$order_items2 !== void 0 ? _o$order_items2 : []).map((it) => {
											var _it$products$nome, _it$products, _it$products2;
											return {
												nome: (_it$products$nome = (_it$products = it.products) === null || _it$products === void 0 ? void 0 : _it$products.nome) !== null && _it$products$nome !== void 0 ? _it$products$nome : "—",
												sku: (_it$products2 = it.products) === null || _it$products2 === void 0 ? void 0 : _it$products2.sku,
												tipo_compra: it.tipo_compra,
												quantidade: it.quantidade,
												preco_final: it.preco_final,
												subtotal: it.subtotal
											};
										}),
										payment: pay ? {
											tipo: pay.tipo,
											status: pay.status,
											payment_link: pay.payment_link
										} : null
									});
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, { className: "w-4 h-4 mr-1" }), " Imprimir PDF"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								onClick: async () => {
									try {
										var _o$companies3, _o$companies4;
										const share = await getOrderShare({ data: { orderId: o.id } });
										if (!share.phone) {
											toast.error("Cliente sem telefone cadastrado");
											return;
										}
										const digits = share.phone.replace(/\D/g, "");
										const phone = digits.startsWith("55") ? digits : `55${digits}`;
										const url = `${window.location.origin}${share.path}`;
										const txt = `Olá${share.name ? ` ${share.name}` : ""}! Segue o orçamento do pedido ${orderCodeHash(o.id, ((_o$companies3 = o.companies) === null || _o$companies3 === void 0 ? void 0 : _o$companies3.trade_name) || ((_o$companies4 = o.companies) === null || _o$companies4 === void 0 ? void 0 : _o$companies4.legal_name))} no valor de ${brl(Number(o.total))}.\n\nPDF: ${url}`;
										window.open(`https://wa.me/${phone}?text=${encodeURIComponent(txt)}`, "_blank", "noopener,noreferrer");
									} catch (e) {
										toast.error(e instanceof Error ? e.message : "Erro ao gerar link");
									}
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "w-4 h-4 mr-1" }), " Enviar WhatsApp"]
							}),
							isAdmin && canCancel(o.status) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => {
									if (confirm("Cancelar pedido?")) update.mutate({
										id: o.id,
										status: "CANCELADO"
									});
								},
								children: "Cancelar"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-3 gap-2 flex-wrap",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-semibold",
										children: "Itens"
									}),
									canEdit && !editMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => setEditMode(true),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "w-3.5 h-3.5 mr-1" }), " Editar valores"]
									}),
									editMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "ghost",
											onClick: () => setEditMode(false),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "w-3.5 h-3.5 mr-1" }), " Cancelar"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											disabled: updateItems.isPending,
											onClick: () => {
												updateItems.mutate({
													order_id: o.id,
													items: drafts,
													frete: Number(freteDraft || 0),
													desconto: Number(descontoDraft || 0)
												}, {
													onSuccess: () => {
														toast.success("Pedido atualizado");
														setEditMode(false);
													},
													onError: (e) => toast.error(e instanceof Error ? e.message : "Erro ao salvar")
												});
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-3.5 h-3.5 mr-1" }), " Salvar alterações"]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-2",
								children: ((_o$order_items3 = o.order_items) !== null && _o$order_items3 !== void 0 ? _o$order_items3 : []).map((it) => {
									var _d$quantidade, _d$preco_final, _it$products$nome2, _it$products3, _it$products4;
									const d = drafts.find((x) => x.id === it.id);
									const qty = (_d$quantidade = d === null || d === void 0 ? void 0 : d.quantidade) !== null && _d$quantidade !== void 0 ? _d$quantidade : Number(it.quantidade);
									const preco = (_d$preco_final = d === null || d === void 0 ? void 0 : d.preco_final) !== null && _d$preco_final !== void 0 ? _d$preco_final : Number(it.preco_final);
									const sub = qty * preco;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3 text-sm border-b border-border last:border-0 pb-2 last:pb-0 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-[180px]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-medium",
												children: (_it$products$nome2 = (_it$products3 = it.products) === null || _it$products3 === void 0 ? void 0 : _it$products3.nome) !== null && _it$products$nome2 !== void 0 ? _it$products$nome2 : "—"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													"SKU ",
													(_it$products4 = it.products) === null || _it$products4 === void 0 ? void 0 : _it$products4.sku,
													" · ",
													it.tipo_compra
												]
											})]
										}), editMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] uppercase text-muted-foreground",
													children: "Qtd"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													min: 1,
													className: "h-8 w-20",
													value: qty,
													onChange: (e) => setDrafts((prev) => prev.map((x) => x.id === it.id ? _objectSpread2(_objectSpread2({}, x), {}, { quantidade: Number(e.target.value) }) : x))
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] uppercase text-muted-foreground",
													children: "Preço unit."
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													step: "0.01",
													min: 0,
													className: "h-8 w-28",
													value: preco,
													onChange: (e) => setDrafts((prev) => prev.map((x) => x.id === it.id ? _objectSpread2(_objectSpread2({}, x), {}, { preco_final: Number(e.target.value) }) : x))
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-right min-w-[90px]",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-[10px] uppercase text-muted-foreground",
														children: "Subtotal"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-semibold",
														children: brl(sub)
													})]
												})
											]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground",
											children: [
												qty,
												"× ",
												brl(preco)
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium min-w-[80px] text-right",
											children: brl(Number(it.subtotal))
										})] })]
									}, it.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 border-t border-border pt-3 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(editMode ? draftSubtotal : Number(o.subtotal)) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Frete" }), editMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											step: "0.01",
											min: 0,
											className: "h-8 w-28 text-right",
											value: freteDraft,
											onChange: (e) => setFreteDraft(Number(e.target.value))
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(Number(o.frete)) })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between items-center text-success",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Desconto" }), editMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											step: "0.01",
											min: 0,
											className: "h-8 w-28 text-right",
											value: descontoDraft,
											onChange: (e) => setDescontoDraft(Number(e.target.value))
										}) : Number(o.desconto) > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["- ", brl(Number(o.desconto))] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "—"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between font-semibold pt-2 border-t border-border",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: brl(editMode ? draftTotal : Number(o.total)) })]
									})
								]
							})
						]
					}),
					!pay && isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-semibold",
								children: "Forma de pagamento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Nenhum pagamento registrado neste pedido. Registre agora escolhendo PIX, cartão, dinheiro ou venda faturada."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"PIX",
									"CARTAO",
									"DINHEIRO",
									"FATURADO"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: t === "PIX" ? "default" : "outline",
									onClick: () => {
										setPayTipo(t);
										setPayParcelas(1);
										setPayPrazo("30");
										setPayObs("");
										setPayReplace(false);
										setPayOpen(true);
									},
									children: t === "CARTAO" ? "Cartão" : t === "DINHEIRO" ? "Dinheiro" : t === "FATURADO" ? "Venda faturada" : "PIX"
								}, t))
							})
						]
					}),
					pay && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-semibold",
									children: ["Pagamento — ", pay.tipo]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs px-2 py-1 rounded-full bg-muted",
									children: pay.status
								})]
							}),
							pay.payment_link && !isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-md border border-primary/40 bg-primary/5 p-3 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Link de pagamento"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-mono break-all",
										children: pay.payment_link
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: pay.payment_link,
												target: "_blank",
												rel: "noopener noreferrer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3 h-3 mr-1" }), " Pagar agora"]
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "outline",
											onClick: () => {
												navigator.clipboard.writeText(pay.payment_link);
												toast.success("Link copiado");
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3 h-3 mr-1" }), " Copiar"]
										})]
									})
								]
							}),
							!pay.payment_link && !isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Aguardando o time gerar o link de pagamento. Você será notificado por WhatsApp assim que estiver disponível."
							}),
							isAdmin && !isPaid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2 pt-2 border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
										children: "Admin · gerar link manual"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Cole o link de pagamento (PIX copia-cola, Mercado Pago, etc.)",
											value: linkDraft,
											onChange: (e) => setLinkDraft(e.target.value)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											onClick: () => updateLink.mutate({
												order_id: o.id,
												payment_link: linkDraft.trim()
											}, { onSuccess: () => toast.success("Link salvo. O cliente já pode ver no pedido.") }),
											disabled: !linkDraft.trim() || updateLink.isPending,
											children: "Salvar"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-muted-foreground",
										children: "O envio automático via WhatsApp (Z-API) será habilitado quando os tokens forem cadastrados."
									})
								]
							}),
							isAdmin && isPaid && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2 border-t border-border space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-success",
										children: "Pagamento confirmado — pronto para emitir etiqueta."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
												children: "Alterar forma de pagamento"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex flex-wrap gap-2",
												children: [
													"PIX",
													"CARTAO",
													"DINHEIRO",
													"FATURADO"
												].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													size: "sm",
													variant: pay.tipo === t ? "default" : "outline",
													onClick: () => {
														setPayTipo(t);
														setPayParcelas(1);
														setPayPrazo("30");
														setPayObs("");
														setPayReplace(true);
														setPayOpen(true);
													},
													children: t === "CARTAO" ? "Cartão" : t === "DINHEIRO" ? "Dinheiro" : t === "FATURADO" ? "Venda faturada" : "PIX"
												}, t))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] text-muted-foreground",
												children: "Os lançamentos financeiros deste pedido são refeitos com a nova forma escolhida. O total não muda."
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										disabled: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "w-3 h-3 mr-1" }), " Gerar etiqueta (Melhor Envio)"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold mb-3",
							children: "Histórico"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "space-y-2 text-sm",
							children: ((_o$order_history = o.order_history) !== null && _o$order_history !== void 0 ? _o$order_history : []).slice().reverse().map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: h.status.replace(/_/g, " ")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										formatDateTime(h.created_at),
										" · ",
										h.observacao
									]
								})] })]
							}, h.id))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm mb-2",
								children: "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: (_o$companies5 = o.companies) === null || _o$companies5 === void 0 ? void 0 : _o$companies5.legal_name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: ["Origem: ", o.origem]
							})
						]
					}),
					o.addresses && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold text-sm mb-2",
								children: "Entrega"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									o.addresses.street,
									", ",
									o.addresses.number
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									o.addresses.district,
									", ",
									o.addresses.city,
									"/",
									o.addresses.state
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: ["CEP ", o.addresses.zip]
							})
						]
					}),
					o.observacao && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card border border-border rounded-xl p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm mb-2",
							children: "Observação"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm whitespace-pre-line",
							children: o.observacao
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/orders",
							children: "Voltar para pedidos"
						})
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: payOpen,
			onOpenChange: setPayOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
						payReplace ? "Alterar forma de pagamento" : "Confirmar pagamento",
						" — ",
						brl(Number(o.total))
					] }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Forma de pagamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: payTipo,
									onValueChange: (v) => setPayTipo(v),
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
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "FATURADO",
											children: "Venda faturada (a prazo)"
										})
									] })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Conta bancária de destino" }), bankAccounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Cadastre uma conta bancária no Financeiro antes de confirmar."
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: payAccountId,
									onValueChange: setPayAccountId,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione a conta" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: bankAccounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: a.id,
										children: [a.nome, a.banco ? ` — ${a.banco}` : ""]
									}, a.id)) })]
								})]
							}),
							payTipo === "CARTAO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Parcelas" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: String(payParcelas),
									onValueChange: (v) => setPayParcelas(Number(v)),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Array.from({ length: 12 }, (_, i) => i + 1).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
										value: String(n),
										children: [
											n,
											"x de ",
											brl(Number(o.total) / n)
										]
									}, n)) })]
								})]
							}),
							payTipo === "FATURADO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Prazo de recebimento" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: payPrazo,
										onValueChange: (v) => setPayPrazo(v),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: "30",
												children: ["30 dias — 1x de ", brl(Number(o.total))]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: "30-60",
												children: ["30/60 dias — 2x de ", brl(Number(o.total) / 2)]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
												value: "30-60-90",
												children: ["30/60/90 dias — 3x de ", brl(Number(o.total) / 3)]
											})
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Gera contas a receber em aberto no Financeiro, com os vencimentos escolhidos."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observação (opcional)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Ex: pago na hora, comprovante enviado…",
									value: payObs,
									onChange: (e) => setPayObs(e.target.value)
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setPayOpen(false),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !payAccountId || confirmPay.isPending,
						onClick: () => {
							var _o$company_id;
							const acc = bankAccounts.find((a) => a.id === payAccountId);
							if (!acc) {
								toast.error("Selecione uma conta bancária");
								return;
							}
							confirmPay.mutate({
								order_id: o.id,
								company_id: (_o$company_id = o.company_id) !== null && _o$company_id !== void 0 ? _o$company_id : null,
								total: Number(o.total),
								tipo: payTipo,
								conta: acc.nome,
								account_id: acc.id,
								parcelas: payTipo === "CARTAO" ? payParcelas : 1,
								prazos: payTipo === "FATURADO" ? payPrazo.split("-").map(Number) : void 0,
								observacao: payObs.trim() || void 0,
								replace: payReplace
							}, {
								onSuccess: () => {
									toast.success(payReplace ? "Forma de pagamento atualizada" : "Pagamento confirmado");
									setPayOpen(false);
									setPayReplace(false);
								},
								onError: (e) => toast.error(e instanceof Error ? e.message : "Erro ao confirmar")
							});
						},
						children: confirmPay.isPending ? "Salvando…" : payReplace ? "Salvar alteração" : "Confirmar pagamento"
					})] })
				]
			})
		})]
	});
}
//#endregion
export { OrderDetail as component };
