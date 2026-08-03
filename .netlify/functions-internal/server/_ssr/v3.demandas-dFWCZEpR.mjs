import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { $t as Check, G as Plus, Q as PackageSearch, Ut as ClipboardList, Z as Package, _ as Trash2, n as X } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DerICSB1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.demandas-dFWCZEpR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PRIORIDADES = [
	{
		value: "ALTA",
		label: "Alta"
	},
	{
		value: "MEDIA",
		label: "Média"
	},
	{
		value: "BAIXA",
		label: "Baixa"
	}
];
var STATUS_LABEL = {
	PENDENTE: "A comprar",
	COMPRADO: "Comprado",
	DESCARTADO: "Descartado"
};
function DemandasPage() {
	var _products$find;
	const qc = useQueryClient();
	const { user } = useAuth();
	const [modo, setModo] = (0, import_react.useState)("MANUAL");
	const [productId, setProductId] = (0, import_react.useState)("");
	const [productSearch, setProductSearch] = (0, import_react.useState)("");
	const [descricao, setDescricao] = (0, import_react.useState)("");
	const [quantidade, setQuantidade] = (0, import_react.useState)("1");
	const [clienteNome, setClienteNome] = (0, import_react.useState)("");
	const [cidade, setCidade] = (0, import_react.useState)("");
	const [prioridade, setPrioridade] = (0, import_react.useState)("MEDIA");
	const [observacao, setObservacao] = (0, import_react.useState)("");
	const [filtro, setFiltro] = (0, import_react.useState)("PENDENTE");
	const { data: products = [] } = useQuery({
		queryKey: ["demanda-products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id,nome,sku,estoque").order("nome").limit(1e3);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: rows = [], isLoading } = useQuery({
		queryKey: ["product-requests", filtro],
		queryFn: async () => {
			let q = supabase.from("product_requests").select("*, products(nome,sku,estoque)").order("created_at", { ascending: false }).limit(300);
			if (filtro !== "TODOS") q = q.eq("status", filtro);
			const { data, error } = await q;
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
		}).slice(0, 8);
	}, [productSearch, products]);
	const selectedProduct = (_products$find = products.find((p) => p.id === productId)) !== null && _products$find !== void 0 ? _products$find : null;
	function resetForm() {
		setProductId("");
		setProductSearch("");
		setDescricao("");
		setQuantidade("1");
		setClienteNome("");
		setCidade("");
		setPrioridade("MEDIA");
		setObservacao("");
	}
	const create = useMutation({
		mutationFn: async () => {
			var _selectedProduct$nome, _user$id;
			const nome = modo === "CADASTRADO" ? (_selectedProduct$nome = selectedProduct === null || selectedProduct === void 0 ? void 0 : selectedProduct.nome) !== null && _selectedProduct$nome !== void 0 ? _selectedProduct$nome : "" : descricao.trim();
			if (!nome) throw new Error("Informe o produto ou escreva o nome do item");
			const qtd = Number(quantidade.replace(",", ".")) || 1;
			const { error } = await supabase.from("product_requests").insert({
				product_id: modo === "CADASTRADO" ? productId || null : null,
				descricao: nome,
				quantidade: qtd,
				cliente_nome: clienteNome.trim() || null,
				cidade: cidade.trim() || null,
				observacao: observacao.trim() || null,
				prioridade,
				status: "PENDENTE",
				created_by: (_user$id = user === null || user === void 0 ? void 0 : user.id) !== null && _user$id !== void 0 ? _user$id : null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Demanda registrada");
			resetForm();
			qc.invalidateQueries({ queryKey: ["product-requests"] });
		},
		onError: (e) => {
			var _e$message;
			return toast.error((_e$message = e.message) !== null && _e$message !== void 0 ? _e$message : "Erro ao registrar demanda");
		}
	});
	const updateStatus = useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("product_requests").update({ status }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["product-requests"] }),
		onError: (e) => {
			var _e$message2;
			return toast.error((_e$message2 = e.message) !== null && _e$message2 !== void 0 ? _e$message2 : "Erro ao atualizar");
		}
	});
	const remove = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("product_requests").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Demanda removida");
			qc.invalidateQueries({ queryKey: ["product-requests"] });
		},
		onError: (e) => {
			var _e$message3;
			return toast.error((_e$message3 = e.message) !== null && _e$message3 !== void 0 ? _e$message3 : "Sem permissão para remover");
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
	const pendentes = rows.filter((r) => r.status === "PENDENTE");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Demanda de produtos",
		eyebrow: "Lista de compras",
		description: "Registre o que os clientes procuram e você não tem em estoque. Depois use essa lista para fechar a compra com o fornecedor.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/v3/compras",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				style: {
					borderColor: V2.GRAPHITE,
					color: V2.TEXT
				},
				children: "Lançar compra"
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
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
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageSearch, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							style: { color: V2.TEXT },
							children: "Nova demanda"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 mb-4",
						children: [{
							v: "MANUAL",
							t: "Escrever o item"
						}, {
							v: "CADASTRADO",
							t: "Produto cadastrado"
						}].map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setModo(o.v),
							className: "h-9 px-3 rounded-lg border text-xs font-semibold",
							style: {
								background: modo === o.v ? V2.TEAL_LIGHT : V2.SURFACE,
								borderColor: modo === o.v ? V2.TEAL : V2.GRAPHITE,
								color: modo === o.v ? V2.TEAL : V2.MUTED
							},
							children: o.t
						}, o.v))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3",
						children: [
							modo === "MANUAL" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [label("Item que o cliente pediu"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: descricao,
									onChange: (e) => setDescricao(e.target.value),
									placeholder: "Ex.: Capa de chave Fiat Argo 3 botões",
									className: "mt-1",
									style: inputStyle
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [label("Buscar produto cadastrado"), selectedProduct ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 flex items-center gap-2 rounded-lg border px-3 h-10",
									style: {
										borderColor: V2.GRAPHITE,
										background: V2.BG
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
											className: "h-4 w-4",
											style: { color: V2.TEAL }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm truncate flex-1",
											style: { color: V2.TEXT },
											children: selectedProduct.nome
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => {
												setProductId("");
												setProductSearch("");
											},
											"aria-label": "Trocar produto",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
												className: "h-4 w-4",
												style: { color: V2.MUTED }
											})
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: productSearch,
									onChange: (e) => setProductSearch(e.target.value),
									placeholder: "Nome ou SKU",
									className: "mt-1",
									style: inputStyle
								}), filteredProducts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 rounded-lg border overflow-hidden",
									style: {
										borderColor: V2.GRAPHITE,
										background: V2.SURFACE
									},
									children: filteredProducts.map((p) => {
										var _p$sku2, _p$estoque;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => {
												setProductId(p.id);
												setProductSearch("");
											},
											className: "w-full text-left px-3 py-2 text-sm hover:opacity-80",
											style: { color: V2.TEXT },
											children: [p.nome, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[11px] ml-2",
												style: { color: V2.MUTED },
												children: [
													(_p$sku2 = p.sku) !== null && _p$sku2 !== void 0 ? _p$sku2 : "",
													" · estoque ",
													Number((_p$estoque = p.estoque) !== null && _p$estoque !== void 0 ? _p$estoque : 0)
												]
											})]
										}, p.id);
									})
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Quantidade"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: quantidade,
								onChange: (e) => setQuantidade(e.target.value),
								className: "mt-1",
								style: inputStyle
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Prioridade"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: prioridade,
								onValueChange: (v) => setPrioridade(v),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1",
									style: inputStyle,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									style: {
										background: V2.SURFACE,
										borderColor: V2.GRAPHITE
									},
									children: PRIORIDADES.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: p.value,
										children: p.label
									}, p.value))
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Cliente (opcional)"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: clienteNome,
								onChange: (e) => setClienteNome(e.target.value),
								placeholder: "Quem pediu",
								className: "mt-1",
								style: inputStyle
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [label("Cidade (opcional)"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: cidade,
								onChange: (e) => setCidade(e.target.value),
								placeholder: "Ex.: Uberlândia",
								className: "mt-1",
								style: inputStyle
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [label("Observação"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: observacao,
									onChange: (e) => setObservacao(e.target.value),
									placeholder: "Detalhes: modelo, ano, frequência, fornecedor sugerido...",
									className: "mt-1 min-h-[40px]",
									style: inputStyle
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => create.mutate(),
							disabled: create.isPending,
							style: {
								background: V2.TEAL,
								color: "#fff"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Adicionar à lista"]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border p-4 lg:p-5",
				style: {
					background: V2.SURFACE,
					borderColor: V2.GRAPHITE
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded-lg grid place-items-center",
							style: {
								background: V2.TEAL_LIGHT,
								color: V2.TEAL
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "text-sm font-semibold",
							style: { color: V2.TEXT },
							children: [
								"Lista de compras · ",
								pendentes.length,
								" pendente(s)"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-1.5 flex-wrap",
						children: [
							"PENDENTE",
							"COMPRADO",
							"DESCARTADO",
							"TODOS"
						].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFiltro(f),
							className: "h-8 px-3 rounded-lg border text-[11px] font-semibold",
							style: {
								background: filtro === f ? V2.TEAL_LIGHT : V2.SURFACE,
								borderColor: filtro === f ? V2.TEAL : V2.GRAPHITE,
								color: filtro === f ? V2.TEAL : V2.MUTED
							},
							children: f === "TODOS" ? "Todos" : STATUS_LABEL[f]
						}, f))
					})]
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					style: { color: V2.MUTED },
					children: "Carregando…"
				}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm",
					style: { color: V2.MUTED },
					children: "Nenhuma demanda registrada nesse filtro."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: rows.map((r) => {
						var _r$products$nome, _r$products, _r$products$estoque, _r$products2;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-3 flex flex-col sm:flex-row sm:items-center gap-3",
							style: {
								background: V2.BG,
								borderColor: V2.GRAPHITE
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-semibold truncate",
												style: { color: V2.TEXT },
												children: [
													Number(r.quantidade),
													"x ",
													(_r$products$nome = (_r$products = r.products) === null || _r$products === void 0 ? void 0 : _r$products.nome) !== null && _r$products$nome !== void 0 ? _r$products$nome : r.descricao
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] font-bold px-1.5 py-0.5 rounded",
												style: {
													background: r.prioridade === "ALTA" ? "rgba(239,68,68,0.12)" : V2.SURFACE_2,
													color: r.prioridade === "ALTA" ? "#ef4444" : V2.MUTED
												},
												children: r.prioridade
											}),
											r.product_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-[10px]",
												style: { color: V2.MUTED },
												children: ["cadastrado · estoque ", Number((_r$products$estoque = (_r$products2 = r.products) === null || _r$products2 === void 0 ? void 0 : _r$products2.estoque) !== null && _r$products$estoque !== void 0 ? _r$products$estoque : 0)]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px]",
												style: { color: V2.MUTED },
												children: "item novo"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] mt-0.5",
										style: { color: V2.MUTED },
										children: [[
											r.cliente_nome,
											r.cidade,
											formatDate(r.created_at)
										].filter(Boolean).join(" · "), r.status !== "PENDENTE" ? ` · ${STATUS_LABEL[r.status]}` : ""]
									}),
									r.observacao && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-[11px] mt-0.5 italic",
										style: { color: V2.MUTED },
										children: r.observacao
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5",
								children: [
									r.status !== "COMPRADO" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => updateStatus.mutate({
											id: r.id,
											status: "COMPRADO"
										}),
										className: "h-9 px-3 rounded-lg border text-xs font-semibold flex items-center gap-1",
										style: {
											borderColor: V2.GRAPHITE,
											color: V2.SUCCESS
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }), " Comprado"]
									}),
									r.status === "PENDENTE" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => updateStatus.mutate({
											id: r.id,
											status: "DESCARTADO"
										}),
										className: "h-9 px-3 rounded-lg border text-xs font-semibold",
										style: {
											borderColor: V2.GRAPHITE,
											color: V2.MUTED
										},
										children: "Descartar"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => remove.mutate(r.id),
										className: "h-9 w-9 rounded-lg border grid place-items-center",
										style: {
											borderColor: V2.GRAPHITE,
											color: "#ef4444"
										},
										"aria-label": "Remover",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								]
							})]
						}, r.id);
					})
				})]
			})]
		})
	});
}
//#endregion
export { DemandasPage as component };
