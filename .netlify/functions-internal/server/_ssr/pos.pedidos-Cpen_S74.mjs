import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { o as formatDateTime } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash, t as orderCode } from "./order-code-C-NI66BU.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { B as RefreshCw, N as Search, W as Printer, Xt as ChevronRight, Zt as ChevronLeft, _ as Trash2, dt as LoaderCircle, m as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as printHTML } from "./pos-printer-Cb2iJw0o.mjs";
import { r as renderTicket, t as pagamentoLabel } from "./pos-templates-kUAheyLO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.pedidos-Cpen_S74.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
var PAGE_SIZE = 10;
function PosPedidos() {
	var _data$rows, _data$total;
	const qc = useQueryClient();
	const [toDelete, setToDelete] = (0, import_react.useState)(null);
	const [deleting, setDeleting] = (0, import_react.useState)(false);
	const [toPrint, setToPrint] = (0, import_react.useState)(null);
	const [printing, setPrinting] = (0, import_react.useState)(false);
	const [q, setQ] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(0);
	const termo = q.trim();
	const { data, isLoading, error, isFetching, refetch } = useQuery({
		queryKey: [
			"pos",
			"recent-orders",
			termo,
			page
		],
		refetchOnMount: "always",
		staleTime: 0,
		queryFn: async () => {
			let companyIds = null;
			if (termo.length >= 2) {
				const like = `%${termo}%`;
				const { data: cs, error: cErr } = await supabase.from("companies").select("id").or(`legal_name.ilike.${like},trade_name.ilike.${like},tax_id.ilike.${like}`).limit(200);
				if (cErr) throw cErr;
				companyIds = (cs !== null && cs !== void 0 ? cs : []).map((c) => c.id);
				if (companyIds.length === 0) return {
					rows: [],
					total: 0
				};
			}
			let query = supabase.from("orders").select("id,total,status,created_at,company_id,companies(trade_name,legal_name),order_items(quantidade,preco_final,preco_unitario,products(nome)),payments(tipo,bandeira,valor,payload,created_at)", { count: "exact" }).order("created_at", { ascending: false }).range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
			if (companyIds) query = query.in("company_id", companyIds);
			const { data, error, count } = await query;
			if (error) throw error;
			return {
				rows: data !== null && data !== void 0 ? data : [],
				total: count !== null && count !== void 0 ? count : 0
			};
		}
	});
	const orders = (_data$rows = data === null || data === void 0 ? void 0 : data.rows) !== null && _data$rows !== void 0 ? _data$rows : [];
	const total = (_data$total = data === null || data === void 0 ? void 0 : data.total) !== null && _data$total !== void 0 ? _data$total : 0;
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
	function clientName(o) {
		var _ref, _o$companies$trade_na, _o$companies, _o$companies2;
		return (_ref = (_o$companies$trade_na = (_o$companies = o.companies) === null || _o$companies === void 0 ? void 0 : _o$companies.trade_name) !== null && _o$companies$trade_na !== void 0 ? _o$companies$trade_na : (_o$companies2 = o.companies) === null || _o$companies2 === void 0 ? void 0 : _o$companies2.legal_name) !== null && _ref !== void 0 ? _ref : "Cliente";
	}
	async function reprint(o) {
		var _o$order_items;
		const nome = clientName(o);
		const codigo = orderCode(o.id, nome);
		const itens = ((_o$order_items = o.order_items) !== null && _o$order_items !== void 0 ? _o$order_items : []).map((it) => {
			var _ref2, _it$preco_final, _it$products$nome, _it$products;
			const unit = Number((_ref2 = (_it$preco_final = it.preco_final) !== null && _it$preco_final !== void 0 ? _it$preco_final : it.preco_unitario) !== null && _ref2 !== void 0 ? _ref2 : 0);
			const qtd = Number(it.quantidade);
			return {
				nome: (_it$products$nome = (_it$products = it.products) === null || _it$products === void 0 ? void 0 : _it$products.nome) !== null && _it$products$nome !== void 0 ? _it$products$nome : "Item",
				qtd,
				unit,
				total: unit * qtd
			};
		});
		await printHTML(renderTicket({
			codigo,
			cliente: nome,
			data: formatDateTime(o.created_at),
			itens,
			subtotal: Number(o.total),
			total: Number(o.total),
			pagamento: (() => {
				var _o$payments, _p$payload, _payload$modalidade, _p$bandeira, _payload$parcelas;
				const p = (_o$payments = o.payments) === null || _o$payments === void 0 ? void 0 : _o$payments[0];
				const payload = (_p$payload = p === null || p === void 0 ? void 0 : p.payload) !== null && _p$payload !== void 0 ? _p$payload : {};
				return pagamentoLabel(p === null || p === void 0 ? void 0 : p.tipo, {
					modalidade: (_payload$modalidade = payload.modalidade) !== null && _payload$modalidade !== void 0 ? _payload$modalidade : null,
					bandeira: (_p$bandeira = p === null || p === void 0 ? void 0 : p.bandeira) !== null && _p$bandeira !== void 0 ? _p$bandeira : null,
					parcelas: (_payload$parcelas = payload.parcelas) !== null && _payload$parcelas !== void 0 ? _payload$parcelas : 1
				});
			})()
		}));
	}
	async function confirmDelete() {
		if (!toDelete) return;
		setDeleting(true);
		try {
			if (toDelete.status !== "CANCELADO") {
				const { error: cErr } = await supabase.from("orders").update({ status: "CANCELADO" }).eq("id", toDelete.id);
				if (cErr) throw cErr;
			}
			const { error: fErr } = await supabase.from("financial_transactions").delete().eq("order_id", toDelete.id);
			if (fErr) throw fErr;
			const { error: dErr } = await supabase.from("orders").delete().eq("id", toDelete.id);
			if (dErr) throw dErr;
			toast.success("Venda excluída, estoque e financeiro estornados");
			setToDelete(null);
			qc.invalidateQueries({ queryKey: ["pos"] });
			qc.invalidateQueries({ queryKey: ["orders"] });
			qc.invalidateQueries({ queryKey: ["orders-admin"] });
			qc.invalidateQueries({ queryKey: ["products"] });
			qc.invalidateQueries({ queryKey: ["fin-tx"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		} catch (e) {
			var _e$message;
			toast.error((_e$message = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message !== void 0 ? _e$message : "Erro ao excluir venda");
		} finally {
			setDeleting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-lg font-bold",
					children: "Últimos pedidos"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => refetch(),
					className: "h-9 w-9 rounded-lg border flex items-center justify-center",
					style: {
						borderColor: V2.LIGHT_BORDER,
						color: V2.TEAL
					},
					"aria-label": "Atualizar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${isFetching ? "animate-spin" : ""}` })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setPage(0);
					},
					placeholder: "Buscar cliente por nome ou CNPJ",
					className: "w-full h-11 pl-8 pr-3 rounded-lg border text-sm outline-none",
					style: {
						borderColor: V2.LIGHT_BORDER,
						background: "#fff"
					}
				})]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" })
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 rounded-lg text-xs flex gap-2 items-start",
				style: {
					background: "#fef2f2",
					color: "#b91c1c"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Não foi possível carregar os pedidos: ", error === null || error === void 0 ? void 0 : error.message] })]
			}),
			orders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 rounded-lg border flex items-center gap-2",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-semibold truncate",
								children: clientName(o)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px]",
								style: { color: V2.LIGHT_MUTED },
								children: [
									orderCodeHash(o.id, clientName(o)),
									" · ",
									formatDateTime(o.created_at),
									" · ",
									o.status
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-bold text-sm mt-0.5",
								style: { color: V2.TEAL },
								children: brl(Number(o.total))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setToPrint(o),
						className: "h-10 w-10 rounded-lg border flex items-center justify-center shrink-0",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.TEAL
						},
						"aria-label": "Reimprimir",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setToDelete(o),
						className: "h-10 w-10 rounded-lg border flex items-center justify-center shrink-0",
						style: {
							borderColor: "#fecaca",
							color: "#dc2626"
						},
						"aria-label": "Excluir venda",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
					})
				]
			}, o.id)),
			!isLoading && !error && orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center py-10 text-sm",
				style: { color: V2.LIGHT_MUTED },
				children: termo ? "Nenhum pedido para esta busca." : "Nenhum pedido ainda."
			}),
			!isLoading && !error && total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 pt-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setPage((p) => Math.max(0, p - 1)),
						disabled: page === 0,
						className: "h-10 px-3 rounded-lg border flex items-center gap-1 text-sm disabled:opacity-40",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.TEAL
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), " Anterior"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-[11px] text-center",
						style: { color: V2.LIGHT_MUTED },
						children: [
							"Página ",
							page + 1,
							" de ",
							totalPages,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							total,
							" pedido",
							total === 1 ? "" : "s"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setPage((p) => Math.min(totalPages - 1, p + 1)),
						disabled: page >= totalPages - 1,
						className: "h-10 px-3 rounded-lg border flex items-center gap-1 text-sm disabled:opacity-40",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.TEAL
						},
						children: ["Próxima ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!toDelete,
				onOpenChange: (v) => !v && setToDelete(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-[92vw] rounded-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Tem certeza que quer excluir esta venda?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-left",
							children: [toDelete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-medium",
								style: { color: V2.LIGHT_TEXT },
								children: [
									clientName(toDelete),
									" · ",
									brl(Number(toDelete.total))
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 rounded-lg p-3 text-xs leading-relaxed",
								style: {
									background: "#fef2f2",
									border: "1px solid #fecaca",
									color: "#b91c1c"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Atenção: a venda sai da lista, o estoque das peças volta e os lançamentos financeiros (banco, taxas e recebíveis) são estornados. Esta ação não pode ser desfeita." })]
							})]
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "h-11 flex-1",
							onClick: () => setToDelete(null),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "h-11 flex-1 font-semibold",
							style: {
								background: "#dc2626",
								color: "#fff"
							},
							disabled: deleting,
							onClick: confirmDelete,
							children: deleting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Excluir"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!toPrint,
				onOpenChange: (v) => !v && setToPrint(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-[92vw] rounded-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Imprimir este pedido?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							style: { color: V2.LIGHT_TEXT },
							children: toPrint && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								clientName(toPrint),
								" · ",
								brl(Number(toPrint.total))
							] })
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "h-11 flex-1",
							onClick: () => setToPrint(null),
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "h-11 flex-1 font-semibold",
							style: {
								background: V2.TEAL,
								color: "#fff"
							},
							disabled: printing,
							onClick: async () => {
								if (!toPrint) return;
								setPrinting(true);
								try {
									await reprint(toPrint);
									setToPrint(null);
								} catch (e) {
									var _e$message2;
									toast.error((_e$message2 = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message2 !== void 0 ? _e$message2 : "Erro ao imprimir");
								} finally {
									setPrinting(false);
								}
							},
							children: printing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Imprimir"
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { PosPedidos as component };
