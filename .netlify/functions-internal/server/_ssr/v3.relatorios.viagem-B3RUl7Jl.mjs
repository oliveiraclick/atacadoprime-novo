import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { V as Receipt, W as Printer, Z as Package, g as TrendingDown, h as TrendingUp, mn as ArrowLeft, p as Truck } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.viagem-B3RUl7Jl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TripReportPage() {
	const [tripId, setTripId] = (0, import_react.useState)("");
	const { data: trips = [] } = useQuery({
		queryKey: ["trip-report-list"],
		queryFn: async () => {
			const { data, error } = await supabase.from("trips").select("id,nome,cidade,estado,status,opened_at,closed_at").order("created_at", { ascending: false }).limit(200);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const trip = trips.find((t) => t.id === tripId) || null;
	const { data: itemsRaw = [], isLoading: loadingItems } = useQuery({
		queryKey: ["trip-report-items", tripId],
		enabled: !!tripId,
		queryFn: async () => {
			const { data, error } = await supabase.from("order_items").select("product_id, quantidade, preco_final, custo_unitario, orders!inner(trip_id,status), products(nome,sku)").eq("orders.trip_id", tripId).neq("orders.status", "CANCELADO");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: ordersTotals = [], isLoading: loadingOrders } = useQuery({
		queryKey: ["trip-report-orders", tripId],
		enabled: !!tripId,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("id,total,status").eq("trip_id", tripId).neq("status", "CANCELADO");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: expenses = [], isLoading: loadingExpenses } = useQuery({
		queryKey: ["trip-report-expenses", tripId],
		enabled: !!tripId,
		queryFn: async () => {
			const { data, error } = await supabase.from("trip_expenses").select("id,categoria,descricao,valor,data").eq("trip_id", tripId).order("valor", { ascending: false });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const items = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const it of itemsRaw) {
			var _it$products, _it$products2;
			const pid = it.product_id;
			const qtd = Number(it.quantidade) || 0;
			const preco = Number(it.preco_final) || 0;
			const custo = Number(it.custo_unitario) || 0;
			const cur = map.get(pid) || {
				product_id: pid,
				nome: ((_it$products = it.products) === null || _it$products === void 0 ? void 0 : _it$products.nome) || "—",
				sku: ((_it$products2 = it.products) === null || _it$products2 === void 0 ? void 0 : _it$products2.sku) || null,
				quantidade: 0,
				preco_final: preco,
				custo_unitario: custo,
				receita: 0,
				custo: 0,
				margem: 0,
				margemPct: 0
			};
			cur.quantidade += qtd;
			cur.receita += qtd * preco;
			cur.custo += qtd * custo;
			map.set(pid, cur);
		}
		const arr = Array.from(map.values()).map((r) => {
			r.margem = r.receita - r.custo;
			r.margemPct = r.receita > 0 ? r.margem / r.receita * 100 : 0;
			return r;
		});
		arr.sort((a, b) => b.receita - a.receita);
		return arr;
	}, [itemsRaw]);
	const totals = (0, import_react.useMemo)(() => {
		const receita = ordersTotals.reduce((s, o) => s + Number(o.total || 0), 0);
		const custo = items.reduce((s, i) => s + i.custo, 0);
		const margem = receita - custo;
		const despesas = expenses.reduce((s, e) => s + Number(e.valor || 0), 0);
		const liquido = margem - despesas;
		return {
			receita,
			custo,
			margem,
			despesas,
			liquido,
			margemPct: receita > 0 ? margem / receita * 100 : 0,
			despesasPct: receita > 0 ? despesas / receita * 100 : 0,
			liquidoPct: receita > 0 ? liquido / receita * 100 : 0,
			qtdVendida: items.reduce((s, i) => s + i.quantidade, 0)
		};
	}, [
		items,
		expenses,
		ordersTotals
	]);
	const isLoading = loadingItems || loadingExpenses || loadingOrders;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Relatório de viagem",
		eyebrow: "Relatórios",
		description: "Selecione uma viagem para ver produtos, custos, despesas e resultado líquido.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/v3/relatorios",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Voltar"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-[260px] flex-1 max-w-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: tripId,
							onValueChange: setTripId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Escolha a viagem…" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: trips.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: t.id,
								children: [
									t.nome,
									" ",
									t.cidade ? `— ${t.cidade}${t.estado ? "/" + t.estado : ""}` : "",
									" ",
									t.status === "open" ? "· ABERTA" : "· ENCERRADA"
								]
							}, t.id)) })]
						})
					}),
					tripId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-1" }), " Imprimir"]
					})
				]
			}),
			!tripId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border p-8 text-center",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE,
					color: V2.MUTED
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "mx-auto h-10 w-10 mb-2 opacity-40" }), "Escolha uma viagem no seletor acima para gerar o relatório."]
			}),
			tripId && trip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border p-4",
						style: {
							borderColor: V2.GRAPHITE,
							background: V2.SURFACE
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs uppercase tracking-wider",
									style: { color: V2.MUTED },
									children: "Viagem"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-semibold",
									style: { color: V2.TEXT },
									children: trip.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									style: { color: V2.MUTED },
									children: [
										trip.cidade ? `${trip.cidade}${trip.estado ? "/" + trip.estado : ""} · ` : "",
										"Aberta ",
										formatDate(trip.opened_at),
										trip.closed_at ? ` · Encerrada ${formatDate(trip.closed_at)}` : " · em andamento"
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold px-3 py-1 rounded-full",
								style: {
									background: trip.status === "open" ? "#10B98122" : "#6B728022",
									color: trip.status === "open" ? "#059669" : "#4B5563"
								},
								children: trip.status === "open" ? "ABERTA" : "ENCERRADA"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Receita (vendas)",
								value: brl(totals.receita),
								hint: `${totals.qtdVendida} un vendidas`,
								color: V2.TEAL,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Custo das peças",
								value: brl(totals.custo),
								hint: `Margem bruta ${brl(totals.margem)} (${totals.margemPct.toFixed(1)}%)`,
								color: "#6366F1",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: "Despesas da viagem",
								value: brl(totals.despesas),
								hint: `${totals.despesasPct.toFixed(1)}% da receita`,
								color: "#EF4444",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
								label: totals.liquido >= 0 ? "Lucro líquido" : "Prejuízo",
								value: brl(totals.liquido),
								hint: `${totals.liquidoPct.toFixed(1)}% da receita`,
								color: totals.liquido >= 0 ? "#10B981" : "#EF4444",
								icon: totals.liquido >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-5 w-5" }),
								highlight: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border p-4",
						style: {
							borderColor: totals.liquido >= 0 ? "#10B98155" : "#EF444455",
							background: totals.liquido >= 0 ? "#10B98111" : "#EF444411"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							style: { color: V2.TEXT },
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Resultado:" }),
								" ",
								isLoading ? "Calculando…" : totals.receita === 0 ? "Nenhuma venda registrada nesta viagem ainda." : totals.liquido >= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Viagem ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#059669" },
										children: "LUCRATIVA"
									}),
									". Você faturou",
									" ",
									brl(totals.receita),
									", gastou ",
									brl(totals.custo),
									" em peças e ",
									brl(totals.despesas),
									" em despesas, sobrando ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(totals.liquido) }),
									" (",
									totals.liquidoPct.toFixed(1),
									"%)."
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Viagem com ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#DC2626" },
										children: "PREJUÍZO"
									}),
									" de",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(Math.abs(totals.liquido)) }),
									". As despesas (",
									brl(totals.despesas),
									") superaram a margem bruta (",
									brl(totals.margem),
									")."
								] })
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border overflow-hidden",
						style: {
							borderColor: V2.GRAPHITE,
							background: V2.SURFACE
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 border-b",
							style: { borderColor: V2.GRAPHITE },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold",
								style: { color: V2.TEXT },
								children: [
									"Produtos vendidos (",
									items.length,
									")"
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										style: { background: `${V2.MUTED}11` },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "text-left",
											style: { color: V2.MUTED },
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3",
													children: "Produto"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 text-right",
													children: "Qtd"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 text-right",
													children: "Custo un."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 text-right",
													children: "Venda un."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 text-right",
													children: "Receita"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 text-right",
													children: "Custo tot."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 text-right",
													children: "Margem"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "p-3 text-right",
													children: "%"
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
										isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 8,
											className: "p-6 text-center",
											style: { color: V2.MUTED },
											children: "Carregando…"
										}) }),
										!isLoading && items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 8,
											className: "p-6 text-center",
											style: { color: V2.MUTED },
											children: "Nenhuma venda nesta viagem."
										}) }),
										items.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "border-t",
											style: { borderColor: V2.GRAPHITE },
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: { color: V2.TEXT },
														children: r.nome
													}), r.sku && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs",
														style: { color: V2.MUTED },
														children: r.sku
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right",
													children: r.quantidade
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right",
													children: brl(r.custo_unitario)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right",
													children: brl(r.preco_final)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right",
													children: brl(r.receita)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right",
													children: brl(r.custo)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3 text-right font-medium",
													style: { color: r.margem >= 0 ? "#059669" : "#DC2626" },
													children: brl(r.margem)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3 text-right",
													style: { color: r.margemPct >= 0 ? "#059669" : "#DC2626" },
													children: [r.margemPct.toFixed(1), "%"]
												})
											]
										}, r.product_id))
									] }),
									items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t font-semibold",
										style: {
											borderColor: V2.GRAPHITE,
											background: `${V2.MUTED}11`
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												style: { color: V2.TEXT },
												children: "Total"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 text-right",
												children: totals.qtdVendida
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-3" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { className: "p-3" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 text-right",
												children: brl(totals.receita)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 text-right",
												children: brl(totals.custo)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 text-right",
												style: { color: totals.margem >= 0 ? "#059669" : "#DC2626" },
												children: brl(totals.margem)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3 text-right",
												style: { color: totals.margemPct >= 0 ? "#059669" : "#DC2626" },
												children: [totals.margemPct.toFixed(1), "%"]
											})
										]
									}) })
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border overflow-hidden",
						style: {
							borderColor: V2.GRAPHITE,
							background: V2.SURFACE
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 border-b flex items-center justify-between",
							style: { borderColor: V2.GRAPHITE },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold",
								style: { color: V2.TEXT },
								children: [
									"Despesas da viagem (",
									expenses.length,
									")"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								style: { color: V2.MUTED },
								children: ["Total: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { color: V2.TEXT },
									children: brl(totals.despesas)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									style: { background: `${V2.MUTED}11` },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "text-left",
										style: { color: V2.MUTED },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Data"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Categoria"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3",
												children: "Descrição"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 text-right",
												children: "Valor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 text-right",
												children: "% receita"
											})
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [expenses.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 5,
									className: "p-6 text-center",
									style: { color: V2.MUTED },
									children: "Nenhuma despesa lançada."
								}) }), expenses.map((e) => {
									const pct = totals.receita > 0 ? Number(e.valor) / totals.receita * 100 : 0;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-t",
										style: { borderColor: V2.GRAPHITE },
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: formatDate(e.data)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												children: e.categoria
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3",
												style: { color: V2.MUTED },
												children: e.descricao || "—"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "p-3 text-right font-medium",
												children: brl(Number(e.valor))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "p-3 text-right",
												style: { color: V2.MUTED },
												children: [pct.toFixed(1), "%"]
											})
										]
									}, e.id);
								})] })]
							})
						})]
					})
				]
			})
		]
	});
}
function Kpi({ label, value, hint, color, icon, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-4",
		style: {
			borderColor: highlight ? color : V2.GRAPHITE,
			background: highlight ? `${color}11` : V2.SURFACE,
			borderWidth: highlight ? 2 : 1
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs uppercase tracking-wider",
					style: { color: V2.MUTED },
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { color },
					children: icon
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-2xl font-bold",
				style: { color: V2.TEXT },
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs mt-1",
				style: { color: V2.MUTED },
				children: hint
			})
		]
	});
}
//#endregion
export { TripReportPage as component };
