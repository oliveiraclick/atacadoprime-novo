import { o as __toESM } from "../_runtime.mjs";
import { _ as string, g as object } from "../_libs/@lovable.dev/mcp-js.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { l as createServerFn } from "./esm-BG-5H9y6.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-bu9wKdsd.mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as buttonVariants, t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { E as ShoppingCart, G as Plus, Z as Package, _ as Trash2, p as Truck, sn as Boxes, tn as Calendar } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { t as createSsrRpc } from "./createSsrRpc-BCRdNRut.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { t as useBankAccounts } from "./use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useServerFn } from "./useServerFn-CrZF2pjq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.compras-D0jKXVev.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var _excluded = ["className"], _excluded2 = ["className"], _excluded3 = ["className"], _excluded4 = ["className"], _excluded5 = ["className"], _excluded6 = ["className"], _excluded7 = ["className"], _excluded8 = ["className"];
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef((_ref, ref) => {
	let { className } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, _objectSpread2(_objectSpread2({ className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className) }, props), {}, { ref }));
});
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef((_ref2, ref) => {
	let { className } = _ref2, props = _objectWithoutProperties(_ref2, _excluded2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, _objectSpread2({
		ref,
		className: cn("fixed left-[50%] top-[50%] z-50 grid w-[calc(100vw-1.5rem)] max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 [transform:translate(-50%,-50%)]", className)
	}, props))] });
});
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = (_ref3) => {
	let { className } = _ref3, props = _objectWithoutProperties(_ref3, _excluded3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({ className: cn("flex flex-col space-y-2 text-center sm:text-left", className) }, props));
};
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = (_ref4) => {
	let { className } = _ref4, props = _objectWithoutProperties(_ref4, _excluded4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", _objectSpread2({ className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className) }, props));
};
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef((_ref5, ref) => {
	let { className } = _ref5, props = _objectWithoutProperties(_ref5, _excluded5);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, _objectSpread2({
		ref,
		className: cn("text-lg font-semibold", className)
	}, props));
});
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef((_ref6, ref) => {
	let { className } = _ref6, props = _objectWithoutProperties(_ref6, _excluded6);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, _objectSpread2({
		ref,
		className: cn("text-sm text-muted-foreground", className)
	}, props));
});
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef((_ref7, ref) => {
	let { className } = _ref7, props = _objectWithoutProperties(_ref7, _excluded7);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, _objectSpread2({
		ref,
		className: cn(buttonVariants(), className)
	}, props));
});
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef((_ref8, ref) => {
	let { className } = _ref8, props = _objectWithoutProperties(_ref8, _excluded8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, _objectSpread2({
		ref,
		className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)
	}, props));
});
AlertDialogCancel.displayName = Cancel.displayName;
var deleteSchema = object({ purchaseOrderId: string().uuid() });
var deletePurchaseOrder = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => deleteSchema.parse(d)).handler(createSsrRpc("8e752f335adf8bdf0273c4f4a47d906ab023ffd55b8ec2e0641a34545e3b61ad"));
var todayISO = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var plusDays = (days) => new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
function PurchasePage() {
	const qc = useQueryClient();
	const { data: accounts = [] } = useBankAccounts();
	const [supplierId, setSupplierId] = (0, import_react.useState)("");
	const [data, setData] = (0, import_react.useState)(todayISO());
	const [condicao, setCondicao] = (0, import_react.useState)("AVISTA");
	const [accountId, setAccountId] = (0, import_react.useState)("");
	const [vencimento, setVencimento] = (0, import_react.useState)(plusDays(30));
	const [frete, setFrete] = (0, import_react.useState)("");
	const [observacoes, setObservacoes] = (0, import_react.useState)("");
	const [productSearch, setProductSearch] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([]);
	const [deleteTargetId, setDeleteTargetId] = (0, import_react.useState)(null);
	const { data: suppliers = [] } = useQuery({
		queryKey: ["purchase-suppliers"],
		queryFn: async () => {
			const { data, error } = await supabase.from("suppliers").select("id,razao_social,nome_fantasia").order("razao_social");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const [newSupplierOpen, setNewSupplierOpen] = (0, import_react.useState)(false);
	const [newSupplierName, setNewSupplierName] = (0, import_react.useState)("");
	const createSupplier = useMutation({
		mutationFn: async () => {
			const nome = newSupplierName.trim();
			if (!nome) throw new Error("Informe o nome do fornecedor");
			const { data, error } = await supabase.from("suppliers").insert({
				razao_social: nome,
				nome_fantasia: nome
			}).select("id,razao_social,nome_fantasia").single();
			if (error) throw error;
			return data;
		},
		onSuccess: (row) => {
			qc.invalidateQueries({ queryKey: ["purchase-suppliers"] });
			setSupplierId(row.id);
			setNewSupplierName("");
			setNewSupplierOpen(false);
			toast.success("Fornecedor cadastrado");
		},
		onError: (e) => {
			var _e$message;
			return toast.error((_e$message = e.message) !== null && _e$message !== void 0 ? _e$message : "Erro ao cadastrar fornecedor");
		}
	});
	const { data: products = [] } = useQuery({
		queryKey: ["purchase-products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id,nome,sku,estoque,preco_custo").order("nome").limit(1e3);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: history = [], isLoading } = useQuery({
		queryKey: ["purchase-orders"],
		queryFn: async () => {
			const { data, error } = await supabase.from("purchase_orders").select("id,status,valor_total,data_emissao,observacoes,suppliers(razao_social,nome_fantasia)").order("data_emissao", { ascending: false }).limit(50);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const filteredProducts = (0, import_react.useMemo)(() => {
		const q = productSearch.trim().toLowerCase();
		if (!q) return [];
		return products.filter((p) => {
			var _p$sku;
			return `${p.nome} ${(_p$sku = p.sku) !== null && _p$sku !== void 0 ? _p$sku : ""}`.toLowerCase().includes(q);
		}).filter((p) => !lines.some((l) => l.product_id === p.id)).slice(0, 8);
	}, [
		products,
		productSearch,
		lines
	]);
	const totalItens = (0, import_react.useMemo)(() => lines.reduce((s, l) => s + Number(l.quantidade || 0) * Number(l.custo || 0), 0), [lines]);
	const total = totalItens + Number(frete || 0);
	function addLine(p) {
		setLines((prev) => {
			var _p$preco_custo;
			return [...prev, {
				product_id: p.id,
				nome: p.nome,
				quantidade: "1",
				custo: String((_p$preco_custo = p.preco_custo) !== null && _p$preco_custo !== void 0 ? _p$preco_custo : "")
			}];
		});
		setProductSearch("");
	}
	function updateLine(id, patch) {
		setLines((prev) => prev.map((l) => l.product_id === id ? _objectSpread2(_objectSpread2({}, l), patch) : l));
	}
	const save = useMutation({
		mutationFn: async () => {
			var _suppliers$find, _suppliers$find2;
			if (lines.length === 0) throw new Error("Adicione pelo menos um produto");
			for (const l of lines) {
				if (Number(l.quantidade) <= 0) throw new Error(`Quantidade inválida em ${l.nome}`);
				if (Number(l.custo) <= 0) throw new Error(`Custo inválido em ${l.nome}`);
			}
			if (condicao === "AVISTA" && !accountId) throw new Error("Escolha a conta que pagou a compra");
			const { data: po, error: poError } = await supabase.from("purchase_orders").insert({
				supplier_id: supplierId || null,
				status: "RECEBIDO",
				valor_total: total,
				data_emissao: data,
				data_recebimento: data,
				observacoes: observacoes || null
			}).select("id").single();
			if (poError) throw poError;
			const { error: itemsError } = await supabase.from("purchase_order_items").insert(lines.map((l) => ({
				purchase_order_id: po.id,
				product_id: l.product_id,
				quantidade: Number(l.quantidade),
				quantidade_recebida: Number(l.quantidade),
				valor_unitario: Number(l.custo)
			})));
			if (itemsError) throw itemsError;
			for (const l of lines) {
				const { error: stockError } = await supabase.rpc("stock_apply_delta", {
					_product_id: l.product_id,
					_delta: Number(l.quantidade),
					_tipo: "ENTRADA",
					_motivo: `Compra ${po.id.slice(0, 8)}`,
					_ref: po.id,
					_allow_negative: true
				});
				if (stockError) throw stockError;
				const { error: costError } = await supabase.from("products").update({ preco_custo: Number(l.custo) }).eq("id", l.product_id);
				if (costError) throw costError;
			}
			const supplierName = ((_suppliers$find = suppliers.find((s) => s.id === supplierId)) === null || _suppliers$find === void 0 ? void 0 : _suppliers$find.nome_fantasia) || ((_suppliers$find2 = suppliers.find((s) => s.id === supplierId)) === null || _suppliers$find2 === void 0 ? void 0 : _suppliers$find2.razao_social) || "fornecedor";
			const { error: finError } = await supabase.from("financial_transactions").insert({
				tipo: "DESPESA",
				status: condicao === "AVISTA" ? "PAGO" : "PENDENTE",
				valor: total,
				valor_bruto: total,
				vencimento: condicao === "AVISTA" ? data : vencimento,
				pagamento: condicao === "AVISTA" ? data : null,
				descricao: `Compra de mercadoria — ${supplierName}`,
				forma_pagamento: "OUTRO",
				account_id: condicao === "AVISTA" ? accountId : null,
				purchase_order_id: po.id
			});
			if (finError) throw finError;
			return po.id;
		},
		onSuccess: () => {
			toast.success("Compra lançada: estoque e financeiro atualizados");
			setLines([]);
			setFrete("");
			setObservacoes("");
			qc.invalidateQueries({ queryKey: ["purchase-orders"] });
			qc.invalidateQueries({ queryKey: ["purchase-products"] });
			qc.invalidateQueries({ queryKey: ["fin-transactions"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const deleteFn = useServerFn(deletePurchaseOrder);
	const deleteMutation = useMutation({
		mutationFn: async (id) => {
			await deleteFn({ data: { purchaseOrderId: id } });
		},
		onSuccess: () => {
			toast.success("Compra excluída: estoque e financeiro revertidos");
			setDeleteTargetId(null);
			qc.invalidateQueries({ queryKey: ["purchase-orders"] });
			qc.invalidateQueries({ queryKey: ["purchase-products"] });
			qc.invalidateQueries({ queryKey: ["fin-transactions"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => {
			var _e$message2;
			return toast.error((_e$message2 = e.message) !== null && _e$message2 !== void 0 ? _e$message2 : "Erro ao excluir compra");
		}
	});
	const label = (t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: "text-[10px] uppercase tracking-wider font-semibold",
		style: { color: V2.MUTED },
		children: t
	});
	const inputStyle = {
		background: V2.BG,
		borderColor: V2.GRAPHITE,
		color: V2.TEXT
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Compra de material",
		eyebrow: "Entrada de mercadoria",
		description: "Lance a nota do fornecedor: dá entrada no estoque, atualiza o custo das peças e gera o financeiro.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/v3/financeiro",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				style: {
					borderColor: V2.GRAPHITE,
					color: V2.TEXT
				},
				children: "Ver financeiro"
			})
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border p-4 lg:p-5",
					style: {
						background: V2.SURFACE,
						borderColor: V2.GRAPHITE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded-lg grid place-items-center",
							style: {
								background: V2.TEAL_LIGHT,
								color: V2.TEAL
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							style: { color: V2.TEXT },
							children: "Dados da compra"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [label("Fornecedor"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setNewSupplierOpen((v) => !v),
										className: "text-xs font-medium",
										style: { color: V2.TEAL },
										children: newSupplierOpen ? "Cancelar" : "+ Novo fornecedor"
									})]
								}), newSupplierOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										autoFocus: true,
										placeholder: "Nome do fornecedor",
										value: newSupplierName,
										onChange: (e) => setNewSupplierName(e.target.value),
										onKeyDown: (e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												createSupplier.mutate();
											}
										},
										style: inputStyle
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										onClick: () => createSupplier.mutate(),
										disabled: createSupplier.isPending || !newSupplierName.trim(),
										style: {
											background: V2.TEAL,
											color: "#fff"
										},
										children: "Salvar"
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: supplierId,
									onValueChange: setSupplierId,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1",
										style: inputStyle,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecionar fornecedor" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										style: {
											background: V2.SURFACE,
											borderColor: V2.GRAPHITE
										},
										children: suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: s.id,
											children: s.nome_fantasia || s.razao_social
										}, s.id))
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Data da nota"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: data,
								onChange: (e) => setData(e.target.value),
								className: "mt-1",
								style: inputStyle
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Frete / outros (R$)"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: "0.01",
								placeholder: "0,00",
								value: frete,
								onChange: (e) => setFrete(e.target.value),
								className: "mt-1 tabular-nums",
								style: inputStyle
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Condição"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: condicao,
								onValueChange: (v) => setCondicao(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1",
									style: inputStyle,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
									style: {
										background: V2.SURFACE,
										borderColor: V2.GRAPHITE
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "AVISTA",
										children: "À vista (já paguei)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "PRAZO",
										children: "A prazo (conta a pagar)"
									})]
								})]
							})] }),
							condicao === "AVISTA" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [label("Conta que pagou"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: accountId,
									onValueChange: setAccountId,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "mt-1",
										style: inputStyle,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Escolher conta" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
										style: {
											background: V2.SURFACE,
											borderColor: V2.GRAPHITE
										},
										children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: a.id,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-2 h-2 rounded-full",
													style: { background: a.cor }
												}), a.nome]
											})
										}, a.id))
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Vencimento"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: vencimento,
								onChange: (e) => setVencimento(e.target.value),
								className: "mt-1",
								style: inputStyle
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2 lg:col-span-1",
								children: [label("Observações"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Nº da nota, pedido...",
									value: observacoes,
									onChange: (e) => setObservacoes(e.target.value),
									className: "mt-1",
									style: inputStyle
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border p-4 lg:p-5",
					style: {
						background: V2.SURFACE,
						borderColor: V2.GRAPHITE
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-8 w-8 rounded-lg grid place-items-center",
								style: {
									background: V2.TEAL_LIGHT,
									color: V2.TEAL
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Boxes, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-semibold",
								style: { color: V2.TEXT },
								children: "Itens comprados"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Buscar produto por nome ou SKU...",
								value: productSearch,
								onChange: (e) => setProductSearch(e.target.value),
								style: inputStyle
							}), filteredProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute z-20 left-0 right-0 mt-1 rounded-xl border overflow-hidden",
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE
								},
								children: filteredProducts.map((p) => {
									var _p$sku2, _p$estoque;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => addLine(p),
										className: "w-full text-left px-3 py-2 text-sm transition hover:opacity-80",
										style: { color: V2.TEXT },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: p.nome
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "ml-2 text-[11px]",
											style: { color: V2.MUTED },
											children: [
												"SKU ",
												(_p$sku2 = p.sku) !== null && _p$sku2 !== void 0 ? _p$sku2 : "—",
												" · estoque ",
												(_p$estoque = p.estoque) !== null && _p$estoque !== void 0 ? _p$estoque : 0
											]
										})]
									}, p.id);
								})
							})]
						}),
						lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-10 mt-4 border-2 border-dashed rounded-xl",
							style: { borderColor: V2.GRAPHITE },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
								className: "h-8 w-8 mx-auto mb-2",
								style: { color: V2.MUTED }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								style: { color: V2.MUTED },
								children: "Busque um produto acima para adicionar à compra"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2 mt-4",
							children: [lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-12 gap-2 items-center p-3 rounded-xl border",
								style: {
									background: V2.BG,
									borderColor: V2.GRAPHITE
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-12 sm:col-span-5 text-sm font-medium truncate",
										style: { color: V2.TEXT },
										children: l.nome
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-4 sm:col-span-2",
										children: [label("Qtd"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											step: "1",
											value: l.quantidade,
											onChange: (e) => updateLine(l.product_id, { quantidade: e.target.value }),
											className: "mt-1 tabular-nums",
											style: inputStyle
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "col-span-5 sm:col-span-2",
										children: [label("Custo un."), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											step: "0.01",
											value: l.custo,
											onChange: (e) => updateLine(l.product_id, { custo: e.target.value }),
											className: "mt-1 tabular-nums",
											style: inputStyle
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "col-span-2 text-sm font-semibold tabular-nums text-right",
										style: { color: V2.TEXT },
										children: brl(Number(l.quantidade || 0) * Number(l.custo || 0))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setLines((prev) => prev.filter((x) => x.product_id !== l.product_id)),
										className: "col-span-1 p-2 rounded-lg justify-self-end",
										style: {
											color: "#dc2626",
											background: "#dc262612"
										},
										"aria-label": "Remover item",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								]
							}, l.product_id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t",
								style: { borderColor: V2.GRAPHITE },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-wider font-semibold",
										style: { color: V2.MUTED },
										children: "Total da compra"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xl font-semibold tabular-nums",
										style: { color: V2.TEXT },
										children: brl(total)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px]",
										style: { color: V2.MUTED },
										children: [
											lines.length,
											" item(ns) · mercadoria ",
											brl(totalItens),
											" + frete ",
											brl(Number(frete || 0))
										]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: () => save.mutate(),
									disabled: save.isPending || lines.length === 0,
									style: {
										background: V2.SUCCESS,
										color: "#fff"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), save.isPending ? "Lançando..." : "Lançar compra"]
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border p-4",
					style: {
						background: V2.SURFACE,
						borderColor: V2.GRAPHITE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, {
							className: "h-4 w-4",
							style: { color: V2.TEAL }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							style: { color: V2.TEXT },
							children: "Compras recentes"
						})]
					}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm py-8 text-center",
						style: { color: V2.MUTED },
						children: "Carregando..."
					}) : history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm py-8 text-center",
						style: { color: V2.MUTED },
						children: "Nenhuma compra registrada ainda"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: history.map((h) => {
							var _h$suppliers, _h$suppliers2;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 p-3 rounded-xl border",
								style: {
									background: V2.BG,
									borderColor: V2.GRAPHITE
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold truncate",
										style: { color: V2.TEXT },
										children: ((_h$suppliers = h.suppliers) === null || _h$suppliers === void 0 ? void 0 : _h$suppliers.nome_fantasia) || ((_h$suppliers2 = h.suppliers) === null || _h$suppliers2 === void 0 ? void 0 : _h$suppliers2.razao_social) || "Sem fornecedor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-1 text-[11px]",
										style: { color: V2.MUTED },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
											formatDate(h.data_emissao),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-1 h-1 rounded-full",
												style: { background: V2.MUTED }
											}),
											h.status,
											h.observacoes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "truncate",
												children: ["· ", h.observacoes]
											}) : null
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold tabular-nums",
										style: { color: V2.TEXT },
										children: brl(h.valor_total)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setDeleteTargetId(h.id),
										className: "p-2 rounded-lg",
										style: {
											color: "#dc2626",
											background: "#dc262612"
										},
										"aria-label": "Excluir compra",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})]
								})]
							}, h.id);
						})
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: !!deleteTargetId,
			onOpenChange: (open) => !open && setDeleteTargetId(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				style: {
					background: V2.SURFACE,
					borderColor: V2.GRAPHITE
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
					style: { color: V2.TEXT },
					children: "Tem certeza?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
					style: { color: V2.MUTED },
					children: "Excluir esta compra reverte a entrada no estoque e remove o lançamento financeiro. Essa ação não pode ser desfeita."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					onClick: () => setDeleteTargetId(null),
					className: "border",
					style: {
						borderColor: V2.GRAPHITE,
						color: V2.TEXT,
						background: V2.BG
					},
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: () => deleteTargetId && deleteMutation.mutate(deleteTargetId),
					disabled: deleteMutation.isPending,
					style: {
						background: "#dc2626",
						color: "#fff"
					},
					children: deleteMutation.isPending ? "Excluindo..." : "Sim, excluir"
				})] })]
			})
		})]
	});
}
//#endregion
export { PurchasePage as component };
