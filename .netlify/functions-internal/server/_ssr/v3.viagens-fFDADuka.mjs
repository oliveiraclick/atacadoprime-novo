import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { E as ShoppingCart, G as Plus, V as Receipt, Wt as CircleX, _ as Trash2, mn as ArrowLeft, n as X, p as Truck, st as MapPin } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DGeprr3K.mjs";
import { t as Textarea } from "./textarea-DerICSB1.mjs";
import { t as CityAutocomplete } from "./CityAutocomplete-_IxwmlbC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.viagens-fFDADuka.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TripsPage() {
	const [selectedId, setSelectedId] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Viagens",
		eyebrow: "Operação externa",
		description: "Cadastre viagens, carregue peças, registre despesas e vendas em rota.",
		children: selectedId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripDetail, {
			tripId: selectedId,
			onBack: () => setSelectedId(null)
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripsList, { onOpen: setSelectedId })
	});
}
function TripsList({ onOpen }) {
	const [tab, setTab] = (0, import_react.useState)("open");
	const [createOpen, setCreateOpen] = (0, import_react.useState)(false);
	const { data: trips = [], isLoading } = useQuery({
		queryKey: ["trips-list"],
		queryFn: async () => {
			const { data, error } = await supabase.from("trips").select("id,nome,status,cidade,estado,opened_at,closed_at,created_at,observacao,destinos").order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const filtered = trips.filter((t) => tab === "open" ? t.status === "open" : t.status === "closed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					value: tab,
					onValueChange: (v) => setTab(v),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "open",
						children: [
							"Abertas (",
							trips.filter((t) => t.status === "open").length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "closed",
						children: [
							"Encerradas (",
							trips.filter((t) => t.status === "closed").length,
							")"
						]
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setCreateOpen(true),
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Nova viagem"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border shadow-sm overflow-hidden",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8 text-center text-sm",
					style: { color: V2.LIGHT_MUTED },
					children: "Carregando…"
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-10 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
						className: "h-10 w-10 mx-auto mb-2",
						style: { color: V2.LIGHT_MUTED }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						style: { color: V2.LIGHT_MUTED },
						children: tab === "open" ? "Nenhuma viagem aberta. Clique em “Nova viagem”." : "Nenhuma viagem encerrada."
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "divide-y",
					style: { borderColor: V2.LIGHT_BORDER },
					children: filtered.map((t) => {
						var _t$destinos, _t$opened_at;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onOpen(t.id),
							className: "w-full text-left p-4 hover:bg-black/[0.03] grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 md:items-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold truncate",
										style: { color: V2.LIGHT_TEXT },
										children: t.nome
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs mt-0.5 truncate",
										style: { color: V2.LIGHT_MUTED },
										children: [[t.cidade, t.estado].filter(Boolean).join("-"), ...((_t$destinos = t.destinos) !== null && _t$destinos !== void 0 ? _t$destinos : []).map((d) => [d.cidade, d.estado].filter(Boolean).join("-"))].filter(Boolean).join("  →  ") || "Sem local"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border justify-self-start md:justify-self-end",
									style: {
										color: t.status === "open" ? V2.TEAL : V2.LIGHT_MUTED,
										borderColor: t.status === "open" ? V2.TEAL : V2.LIGHT_BORDER,
										background: t.status === "open" ? V2.TEAL_LIGHT : "transparent"
									},
									children: t.status === "open" ? "Aberta" : "Encerrada"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-right",
									style: { color: V2.LIGHT_MUTED },
									children: formatDate((_t$opened_at = t.opened_at) !== null && _t$opened_at !== void 0 ? _t$opened_at : t.created_at)
								})
							]
						}, t.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateTripDialog, {
				open: createOpen,
				onOpenChange: setCreateOpen,
				onCreated: onOpen
			})
		]
	});
}
function CreateTripDialog({ open, onOpenChange, onCreated }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [nome, setNome] = (0, import_react.useState)("");
	const [cidade, setCidade] = (0, import_react.useState)("");
	const [estado, setEstado] = (0, import_react.useState)("");
	const [observacao, setObservacao] = (0, import_react.useState)("");
	const mut = useMutation({
		mutationFn: async () => {
			if (!user) throw new Error("Não autenticado");
			if (!nome.trim()) throw new Error("Informe o nome da viagem");
			const { data, error } = await supabase.from("trips").insert({
				nome: nome.trim(),
				cidade: cidade.trim() || null,
				estado: estado.trim().toUpperCase() || null,
				observacao: observacao.trim() || null,
				vendedor_id: user.id,
				created_by: user.id,
				status: "open"
			}).select("id").single();
			if (error) throw error;
			return data.id;
		},
		onSuccess: (id) => {
			toast.success("Viagem criada");
			qc.invalidateQueries({ queryKey: ["trips-list"] });
			onOpenChange(false);
			setNome("");
			setCidade("");
			setEstado("");
			setObservacao("");
			onCreated(id);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova viagem" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: nome,
							onChange: (e) => setNome(e.target.value),
							placeholder: "Ex.: Uberaba - semana 30",
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cidade,
									onChange: (e) => setCidade(e.target.value),
									className: "mt-1"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "UF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: estado,
								onChange: (e) => setEstado(e.target.value.toUpperCase()),
								maxLength: 2,
								className: "mt-1"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Observação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: observacao,
							onChange: (e) => setObservacao(e.target.value),
							className: "mt-1",
							rows: 2
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => mut.mutate(),
					disabled: mut.isPending,
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: mut.isPending ? "Criando…" : "Criar viagem"
				})] })
			]
		})
	});
}
function TripDetail({ tripId, onBack }) {
	const qc = useQueryClient();
	const navigate = useNavigate();
	const setTripId = useSellerSession((s) => s.setTripId);
	const { data: trip } = useQuery({
		queryKey: ["trip", tripId],
		queryFn: async () => {
			const { data, error } = await supabase.from("trips").select("*").eq("id", tripId).single();
			if (error) throw error;
			return data;
		}
	});
	const { data: items = [] } = useQuery({
		queryKey: ["trip-sold-items", tripId],
		queryFn: async () => {
			const { data, error } = await supabase.from("order_items").select("id,quantidade,product:products(id,nome,sku),order:orders!inner(id,trip_id,status)").eq("order.trip_id", tripId).neq("order.status", "CANCELADO");
			if (error) throw error;
			const map = /* @__PURE__ */ new Map();
			for (const row of data !== null && data !== void 0 ? data : []) {
				var _row$product$id, _row$product, _map$get;
				const pid = (_row$product$id = (_row$product = row.product) === null || _row$product === void 0 ? void 0 : _row$product.id) !== null && _row$product$id !== void 0 ? _row$product$id : row.id;
				const cur = (_map$get = map.get(pid)) !== null && _map$get !== void 0 ? _map$get : {
					id: pid,
					qtd_vendida: 0,
					product: row.product
				};
				cur.qtd_vendida += Number(row.quantidade || 0);
				map.set(pid, cur);
			}
			return Array.from(map.values()).sort((a, b) => b.qtd_vendida - a.qtd_vendida);
		}
	});
	const { data: expenses = [] } = useQuery({
		queryKey: ["trip-expenses", tripId],
		queryFn: async () => {
			const { data, error } = await supabase.from("trip_expenses").select("*").eq("trip_id", tripId).order("data", { ascending: false });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: orders = [] } = useQuery({
		queryKey: ["trip-orders", tripId],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("id,status,total,created_at,companies(legal_name,trade_name)").eq("trip_id", tripId).order("created_at", { ascending: false });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const totals = (0, import_react.useMemo)(() => {
		const despesas = expenses.reduce((s, e) => s + Number(e.valor || 0), 0);
		const vendas = orders.filter((o) => o.status !== "CANCELADO").reduce((s, o) => s + Number(o.total || 0), 0);
		return {
			despesas,
			vendas,
			carregado: items.reduce((s, i) => s + Number(i.qtd_carregada || 0), 0),
			vendido: items.reduce((s, i) => s + Number(i.qtd_vendida || 0), 0),
			saldo: vendas - despesas
		};
	}, [
		expenses,
		orders,
		items
	]);
	const [expenseOpen, setExpenseOpen] = (0, import_react.useState)(false);
	const closeMut = useMutation({
		mutationFn: async (returnStock) => {
			const { error } = await supabase.rpc("trip_close_v2", {
				_trip_id: tripId,
				_return_stock: returnStock
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Viagem encerrada");
			qc.invalidateQueries({ queryKey: ["trip", tripId] });
			qc.invalidateQueries({ queryKey: ["trips-list"] });
		},
		onError: (e) => toast.error(e.message)
	});
	if (!trip) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-8 text-center text-sm",
		style: { color: V2.LIGHT_MUTED },
		children: "Carregando…"
	});
	const isOpen = trip.status === "open";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: onBack,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Voltar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => setExpenseOpen(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4 mr-1" }), " Lançar despesa"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => {
								setTripId(tripId);
								navigate({ to: "/v3/vendas/nova" });
							},
							style: {
								background: V2.TEAL,
								color: "#fff"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-4 w-4 mr-1" }), " Vender nesta viagem"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "destructive",
							onClick: () => {
								if (confirm("Encerrar esta viagem? O estoque é único da loja, nada será movimentado.")) closeMut.mutate(true);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-4 w-4 mr-1" }), " Encerrar"]
						})
					] })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl p-5 border shadow-sm",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3 flex-wrap",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: trip.nome
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs mt-1",
							style: { color: V2.LIGHT_MUTED },
							children: [
								"Aberta em ",
								formatDate(trip.opened_at),
								trip.closed_at && ` · Encerrada em ${formatDate(trip.closed_at)}`
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border",
						style: {
							color: isOpen ? V2.TEAL : V2.LIGHT_MUTED,
							borderColor: isOpen ? V2.TEAL : V2.LIGHT_BORDER,
							background: isOpen ? V2.TEAL_LIGHT : "transparent"
						},
						children: isOpen ? "Aberta" : "Encerrada"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DestinosManager, {
					trip,
					canEdit: isOpen
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-3",
				children: [
					{
						label: "Peças vendidas",
						value: String(totals.vendido)
					},
					{
						label: "Total em vendas",
						value: brl(totals.vendas)
					},
					{
						label: "Despesas",
						value: brl(totals.despesas)
					},
					{
						label: "Resultado",
						value: brl(totals.saldo)
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl p-4 border shadow-sm",
					style: {
						background: V2.LIGHT_SURFACE,
						borderColor: V2.LIGHT_BORDER
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
						style: { color: V2.LIGHT_MUTED },
						children: s.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-lg font-semibold",
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "items",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "items",
							children: [
								"Peças vendidas (",
								items.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "expenses",
							children: [
								"Despesas (",
								expenses.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "orders",
							children: [
								"Vendas (",
								orders.length,
								")"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "items",
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
							empty: "Nenhuma peça vendida nesta viagem ainda.",
							children: items.map((it) => {
								var _it$product$nome, _it$product, _it$product2;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold truncate",
											children: (_it$product$nome = (_it$product = it.product) === null || _it$product === void 0 ? void 0 : _it$product.nome) !== null && _it$product$nome !== void 0 ? _it$product$nome : "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs",
											style: { color: V2.LIGHT_MUTED },
											children: ["SKU ", (_it$product2 = it.product) === null || _it$product2 === void 0 ? void 0 : _it$product2.sku]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, {
										label: "Vendida",
										value: it.qtd_vendida
									})]
								}, it.id);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "expenses",
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
							empty: "Nenhuma despesa registrada.",
							children: expenses.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 md:items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold truncate",
											children: [e.categoria, e.descricao ? ` — ${e.descricao}` : ""]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs",
											style: { color: V2.LIGHT_MUTED },
											children: [
												formatDate(e.data),
												" ",
												e.forma_pagamento ? `· ${e.forma_pagamento}` : ""
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-right",
										children: brl(Number(e.valor))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: async () => {
											if (!confirm("Excluir despesa?")) return;
											const { error } = await supabase.from("trip_expenses").delete().eq("id", e.id);
											if (error) return toast.error(error.message);
											qc.invalidateQueries({ queryKey: ["trip-expenses", tripId] });
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
									})
								]
							}, e.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "orders",
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListCard, {
							empty: "Nenhuma venda vinculada a esta viagem.",
							children: orders.map((o) => {
								var _o$companies$trade_na, _o$companies, _o$companies2, _ref, _o$companies$trade_na2, _o$companies3, _o$companies4;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3 md:items-center",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "font-semibold truncate",
												children: [
													orderCodeHash(o.id, (_o$companies$trade_na = (_o$companies = o.companies) === null || _o$companies === void 0 ? void 0 : _o$companies.trade_name) !== null && _o$companies$trade_na !== void 0 ? _o$companies$trade_na : (_o$companies2 = o.companies) === null || _o$companies2 === void 0 ? void 0 : _o$companies2.legal_name),
													" · ",
													(_ref = (_o$companies$trade_na2 = (_o$companies3 = o.companies) === null || _o$companies3 === void 0 ? void 0 : _o$companies3.trade_name) !== null && _o$companies$trade_na2 !== void 0 ? _o$companies$trade_na2 : (_o$companies4 = o.companies) === null || _o$companies4 === void 0 ? void 0 : _o$companies4.legal_name) !== null && _ref !== void 0 ? _ref : "Cliente"
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs",
												style: { color: V2.LIGHT_MUTED },
												children: [
													formatDate(o.created_at),
													" · ",
													o.status
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold text-right",
											children: brl(Number(o.total))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => navigate({
												to: "/orders/$id",
												params: { id: o.id },
												search: { edit: false }
											}),
											children: "Abrir"
										})
									]
								}, o.id);
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExpenseDialog, {
				open: expenseOpen,
				onOpenChange: setExpenseOpen,
				tripId
			})
		]
	});
}
function Cell({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider",
			style: { color: V2.LIGHT_MUTED },
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-semibold",
			style: { color: highlight ? "#c1121f" : V2.LIGHT_TEXT },
			children: value
		})]
	});
}
function ListCard({ children, empty }) {
	const arr = Array.isArray(children) ? children : [children];
	const hasContent = arr.length > 0 && arr.some(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl border shadow-sm overflow-hidden",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: hasContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y",
			style: { borderColor: V2.LIGHT_BORDER },
			children
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-8 text-center text-sm",
			style: { color: V2.LIGHT_MUTED },
			children: empty
		})
	});
}
var EXPENSE_CATEGORIES = [
	"Combustível",
	"Hospedagem",
	"Alimentação",
	"Pedágio",
	"Manutenção",
	"Estacionamento",
	"Outros"
];
function ExpenseDialog({ open, onOpenChange, tripId }) {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [categoria, setCategoria] = (0, import_react.useState)("Combustível");
	const [descricao, setDescricao] = (0, import_react.useState)("");
	const [valor, setValor] = (0, import_react.useState)("");
	const [data, setData] = (0, import_react.useState)(() => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [forma, setForma] = (0, import_react.useState)("");
	const mut = useMutation({
		mutationFn: async () => {
			var _formaDB$forma$toLowe, _categoriaDB$categori;
			if (!user) throw new Error("Não autenticado");
			const v = Number(valor.replace(",", "."));
			if (!v || v <= 0) throw new Error("Informe um valor válido");
			const categoriaDB = {
				"Combustível": "COMBUSTIVEL",
				"Hospedagem": "HOSPEDAGEM",
				"Alimentação": "ALIMENTACAO",
				"Pedágio": "PEDAGIO",
				"Manutenção": "MANUTENCAO",
				"Estacionamento": "OUTROS",
				"Outros": "OUTROS"
			};
			const normalizedForma = forma ? (_formaDB$forma$toLowe = {
				"pix": "PIX",
				"cartão": "CARTAO",
				"cartao": "CARTAO",
				"dinheiro": "DINHEIRO",
				"débito": "OUTRO",
				"debito": "OUTRO",
				"crédito": "OUTRO",
				"credito": "OUTRO",
				"boleto": "OUTRO",
				"transferência": "OUTRO",
				"transferencia": "OUTRO",
				"outro": "OUTRO"
			}[forma.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")]) !== null && _formaDB$forma$toLowe !== void 0 ? _formaDB$forma$toLowe : "OUTRO" : null;
			const { error } = await supabase.from("trip_expenses").insert({
				trip_id: tripId,
				categoria: (_categoriaDB$categori = categoriaDB[categoria]) !== null && _categoriaDB$categori !== void 0 ? _categoriaDB$categori : "OUTROS",
				descricao: descricao || null,
				valor: v,
				data,
				forma_pagamento: normalizedForma,
				created_by: user.id
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Despesa lançada");
			qc.invalidateQueries({ queryKey: ["trip-expenses", tripId] });
			setDescricao("");
			setValor("");
			setForma("");
			onOpenChange(false);
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Nova despesa" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Categoria *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: categoria,
							onValueChange: setCategoria,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: EXPENSE_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c,
								children: c
							}, c)) })]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Valor *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: valor,
								onChange: (e) => setValor(e.target.value),
								placeholder: "0,00",
								className: "mt-1"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Data *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: data,
								onChange: (e) => setData(e.target.value),
								className: "mt-1"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Forma de pagamento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: forma,
							onChange: (e) => setForma(e.target.value),
							placeholder: "Pix, cartão, dinheiro…",
							className: "mt-1"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Descrição" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: descricao,
							onChange: (e) => setDescricao(e.target.value),
							rows: 2,
							className: "mt-1"
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => mut.mutate(),
					disabled: mut.isPending,
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: mut.isPending ? "Salvando…" : "Lançar despesa"
				})] })
			]
		})
	});
}
function DestinosManager({ trip, canEdit }) {
	var _trip$estado;
	const qc = useQueryClient();
	const [adding, setAdding] = (0, import_react.useState)(false);
	const [cidade, setCidade] = (0, import_react.useState)("");
	const [estado, setEstado] = (0, import_react.useState)("");
	const primary = trip.cidade ? {
		cidade: trip.cidade,
		estado: (_trip$estado = trip.estado) !== null && _trip$estado !== void 0 ? _trip$estado : null
	} : null;
	const extras = Array.isArray(trip.destinos) ? trip.destinos : [];
	const all = [...primary ? [primary] : [], ...extras];
	const save = useMutation({
		mutationFn: async (novos) => {
			const patch = { destinos: novos };
			if (!primary && novos.length > 0) {
				patch.cidade = novos[0].cidade;
				patch.estado = novos[0].estado;
				patch.destinos = novos.slice(1);
			}
			const { error } = await supabase.from("trips").update(patch).eq("id", trip.id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["trip", trip.id] });
			qc.invalidateQueries({ queryKey: ["trips-list"] });
		},
		onError: (e) => toast.error(e.message)
	});
	function handleAdd() {
		const c = cidade.trim();
		if (!c) return;
		const novo = {
			cidade: c.toUpperCase(),
			estado: estado.trim().toUpperCase() || null
		};
		save.mutate([...extras, novo], { onSuccess: () => {
			setCidade("");
			setEstado("");
			setAdding(false);
			toast.success("Destino adicionado");
		} });
	}
	function handleRemove(idx) {
		if (idx === 0 && primary) {
			var _extras$, _next$cidade, _next$estado;
			const next = (_extras$ = extras[0]) !== null && _extras$ !== void 0 ? _extras$ : null;
			supabase.from("trips").update({
				cidade: (_next$cidade = next === null || next === void 0 ? void 0 : next.cidade) !== null && _next$cidade !== void 0 ? _next$cidade : null,
				estado: (_next$estado = next === null || next === void 0 ? void 0 : next.estado) !== null && _next$estado !== void 0 ? _next$estado : null,
				destinos: extras.slice(1)
			}).eq("id", trip.id).then(({ error }) => {
				if (error) toast.error(error.message);
				else {
					qc.invalidateQueries({ queryKey: ["trip", trip.id] });
					qc.invalidateQueries({ queryKey: ["trips-list"] });
				}
			});
			return;
		}
		const extraIdx = primary ? idx - 1 : idx;
		const novos = extras.filter((_, i) => i !== extraIdx);
		save.mutate(novos, { onSuccess: () => toast.success("Destino removido") });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
				className: "h-4 w-4",
				style: { color: V2.LIGHT_MUTED }
			}),
			all.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs",
				style: { color: V2.LIGHT_MUTED },
				children: "Sem destinos cadastrados"
			}),
			all.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
				style: {
					borderColor: i === 0 ? V2.TEAL : V2.TEAL,
					background: i === 0 ? V2.TEAL : "V2.TEAL_LIGHT",
					color: i === 0 ? "#fff" : V2.LIGHT_TEXT
				},
				children: [
					i === 0 ? "★ " : "",
					d.cidade,
					d.estado ? `-${d.estado}` : "",
					canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => handleRemove(i),
						className: "hover:opacity-70",
						"aria-label": "Remover destino",
						style: { color: i === 0 ? "#fff" : V2.LIGHT_TEXT },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-3 w-3" })
					})
				]
			}, `${d.cidade}-${i}`)),
			canEdit && !adding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setAdding(true),
				className: "text-xs font-medium px-2.5 py-1 rounded-full border inline-flex items-center gap-1",
				style: {
					borderColor: V2.TEAL,
					color: V2.TEAL,
					background: "transparent"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-3 w-3" }), " Adicionar destino"]
			}),
			canEdit && adding && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityAutocomplete, {
						value: cidade,
						onChange: (c, uf) => {
							setCidade(c);
							if (uf) setEstado(uf);
						},
						placeholder: "Cidade",
						className: "w-40",
						inputClassName: "h-8 text-xs",
						autoFocus: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: estado,
						onChange: (e) => setEstado(e.target.value.toUpperCase()),
						maxLength: 2,
						placeholder: "UF",
						className: "h-8 w-14 text-xs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "h-8",
						onClick: handleAdd,
						disabled: save.isPending,
						style: {
							background: V2.TEAL,
							color: "#fff"
						},
						children: "OK"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						className: "h-8",
						onClick: () => {
							setAdding(false);
							setCidade("");
							setEstado("");
						},
						children: "Cancelar"
					})
				]
			})
		]
	});
}
//#endregion
export { TripsPage as component };
