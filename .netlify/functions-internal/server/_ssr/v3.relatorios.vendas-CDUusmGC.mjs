import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { E as ShoppingCart, It as DollarSign, W as Printer, Z as Package, fn as ArrowUpDown, gn as ArrowDown, h as TrendingUp, mn as ArrowLeft, un as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.relatorios.vendas-CDUusmGC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function isoDay(d) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return x.toISOString().slice(0, 10);
}
function rangeFor(p, from, to) {
	const today = /* @__PURE__ */ new Date(/* @__PURE__ */ new Date());
	today.setHours(0, 0, 0, 0);
	const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const startPrev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
	const endPrev = new Date(today.getFullYear(), today.getMonth(), 0);
	const yest = new Date(today);
	yest.setDate(yest.getDate() - 1);
	const d7 = new Date(today);
	d7.setDate(d7.getDate() - 6);
	const d30 = new Date(today);
	d30.setDate(d30.getDate() - 29);
	switch (p) {
		case "hoje": return {
			from: isoDay(today),
			to: isoDay(today)
		};
		case "ontem": return {
			from: isoDay(yest),
			to: isoDay(yest)
		};
		case "7d": return {
			from: isoDay(d7),
			to: isoDay(today)
		};
		case "30d": return {
			from: isoDay(d30),
			to: isoDay(today)
		};
		case "mes": return {
			from: isoDay(startMonth),
			to: isoDay(endMonth)
		};
		case "mes_ant": return {
			from: isoDay(startPrev),
			to: isoDay(endPrev)
		};
		case "custom": return {
			from,
			to
		};
	}
}
function SalesReportPage() {
	const [periodo, setPeriodo] = (0, import_react.useState)("mes");
	const today = isoDay(/* @__PURE__ */ new Date());
	const [from, setFrom] = (0, import_react.useState)(today);
	const [to, setTo] = (0, import_react.useState)(today);
	const [incluirCancelados, setIncluirCancelados] = (0, import_react.useState)(false);
	const range = (0, import_react.useMemo)(() => rangeFor(periodo, from, to), [
		periodo,
		from,
		to
	]);
	const { data: orders = [], isLoading } = useQuery({
		queryKey: [
			"sales-report",
			range.from,
			range.to,
			incluirCancelados
		],
		queryFn: async () => {
			const startISO = (/* @__PURE__ */ new Date(range.from + "T00:00:00")).toISOString();
			const endISO = (/* @__PURE__ */ new Date(range.to + "T23:59:59.999")).toISOString();
			let q = supabase.from("orders").select("id,created_at,status,total,origem,company_id,companies(legal_name,trade_name,cidade,estado),order_items(quantidade),payments(tipo,status)").gte("created_at", startISO).lte("created_at", endISO).order("created_at", { ascending: false });
			if (!incluirCancelados) q = q.neq("status", "CANCELADO");
			const { data, error } = await q;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const totals = (0, import_react.useMemo)(() => {
		const receita = orders.reduce((s, o) => s + Number(o.total || 0), 0);
		const qtdItens = orders.reduce((s, o) => s + (o.order_items || []).reduce((a, i) => a + Number(i.quantidade || 0), 0), 0);
		const pedidos = orders.length;
		return {
			receita,
			qtdItens,
			pedidos,
			receitaPaga: orders.filter((o) => [
				"PAGO",
				"EM_SEPARACAO",
				"ENVIADO",
				"ENTREGUE"
			].includes(o.status)).reduce((s, o) => s + Number(o.total || 0), 0),
			pendentes: orders.filter((o) => ["PENDENTE", "AGUARDANDO_PAGAMENTO"].includes(o.status)).length,
			cancelados: orders.filter((o) => o.status === "CANCELADO").length,
			ticket: pedidos > 0 ? receita / pedidos : 0
		};
	}, [orders]);
	const porDia = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const o of orders) {
			const d = o.created_at.slice(0, 10);
			const cur = map.get(d) || {
				data: d,
				pedidos: 0,
				receita: 0
			};
			cur.pedidos += 1;
			cur.receita += Number(o.total || 0);
			map.set(d, cur);
		}
		return Array.from(map.values()).sort((a, b) => b.data.localeCompare(a.data));
	}, [orders]);
	const porPagamento = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const o of orders) {
			var _o$payments;
			const tipo = ((_o$payments = o.payments) === null || _o$payments === void 0 || (_o$payments = _o$payments[0]) === null || _o$payments === void 0 ? void 0 : _o$payments.tipo) || "—";
			const cur = map.get(tipo) || {
				tipo,
				pedidos: 0,
				receita: 0
			};
			cur.pedidos += 1;
			cur.receita += Number(o.total || 0);
			map.set(tipo, cur);
		}
		return Array.from(map.values()).sort((a, b) => b.receita - a.receita);
	}, [orders]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Relatório de vendas",
		eyebrow: "Relatórios",
		description: "Filtre por período e analise pedidos, receita, ticket médio e formas de pagamento.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-end gap-3 print:hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/v3/relatorios",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-1" }), " Voltar"]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-[180px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs mb-1 block",
							style: { color: V2.MUTED },
							children: "Período"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: periodo,
							onValueChange: (v) => setPeriodo(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "hoje",
									children: "Hoje"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "ontem",
									children: "Ontem"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "7d",
									children: "Últimos 7 dias"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "30d",
									children: "Últimos 30 dias"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "mes",
									children: "Mês atual"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "mes_ant",
									children: "Mês anterior"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "custom",
									children: "Personalizado"
								})
							] })]
						})]
					}),
					periodo === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs mb-1 block",
						style: { color: V2.MUTED },
						children: "De"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: from,
						onChange: (e) => setFrom(e.target.value)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs mb-1 block",
						style: { color: V2.MUTED },
						children: "Até"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value)
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm",
						style: { color: V2.TEXT },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: incluirCancelados,
							onChange: (e) => setIncluirCancelados(e.target.checked)
						}), "Incluir cancelados"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => window.print(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4 mr-1" }), " Imprimir"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 text-sm",
				style: { color: V2.MUTED },
				children: [
					formatDate(range.from),
					" — ",
					formatDate(range.to)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Receita",
						value: brl(totals.receita),
						hint: `${totals.pedidos} pedidos`,
						color: V2.TEAL,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "h-5 w-5" }),
						highlight: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Ticket médio",
						value: brl(totals.ticket),
						hint: `${totals.qtdItens} itens vendidos`,
						color: "#6366F1",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Receita paga",
						value: brl(totals.receitaPaga),
						hint: `Pendentes: ${totals.pendentes}`,
						color: "#059669",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: "Cancelados",
						value: String(totals.cancelados),
						hint: incluirCancelados ? "Incluídos no total" : "Excluídos",
						color: "#EF4444",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-5 w-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: `Vendas por dia (${porDia.length})`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
											className: "p-3 text-right",
											children: "Pedidos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-right",
											children: "Receita"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [porDia.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 3,
								className: "p-6 text-center",
								style: { color: V2.MUTED },
								children: "Sem vendas no período."
							}) }), porDia.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t",
								style: { borderColor: V2.GRAPHITE },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: formatDate(d.data)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right",
										children: d.pedidos
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right font-medium",
										children: brl(d.receita)
									})
								]
							}, d.data))] })]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: `Formas de pagamento (${porPagamento.length})`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
											children: "Forma"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-right",
											children: "Pedidos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-right",
											children: "Receita"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "p-3 text-right",
											children: "%"
										})
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [porPagamento.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 4,
								className: "p-6 text-center",
								style: { color: V2.MUTED },
								children: "—"
							}) }), porPagamento.map((p) => {
								const pct = totals.receita > 0 ? p.receita / totals.receita * 100 : 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-t",
									style: { borderColor: V2.GRAPHITE },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3",
											children: p.tipo
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-right",
											children: p.pedidos
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-3 text-right font-medium",
											children: brl(p.receita)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "p-3 text-right",
											style: { color: V2.MUTED },
											children: [pct.toFixed(1), "%"]
										})
									]
								}, p.tipo);
							})] })]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersTable, {
				orders,
				isLoading,
				totals
			})
		]
	});
}
function OrdersTable({ orders, isLoading, totals }) {
	const [sortKey, setSortKey] = (0, import_react.useState)("data");
	const [sortDir, setSortDir] = (0, import_react.useState)("desc");
	function toggle(k) {
		if (k === sortKey) setSortDir((d) => d === "asc" ? "desc" : "asc");
		else {
			setSortKey(k);
			setSortDir(k === "data" || k === "itens" || k === "total" ? "desc" : "asc");
		}
	}
	const sorted = (0, import_react.useMemo)(() => {
		const arr = [...orders];
		const dir = sortDir === "asc" ? 1 : -1;
		const val = (o) => {
			switch (sortKey) {
				case "data": return new Date(o.created_at).getTime();
				case "pedido":
					var _o$companies, _o$companies2;
					return orderCodeHash(o.id, ((_o$companies = o.companies) === null || _o$companies === void 0 ? void 0 : _o$companies.trade_name) || ((_o$companies2 = o.companies) === null || _o$companies2 === void 0 ? void 0 : _o$companies2.legal_name));
				case "cliente":
					var _o$companies3, _o$companies4;
					return (((_o$companies3 = o.companies) === null || _o$companies3 === void 0 ? void 0 : _o$companies3.trade_name) || ((_o$companies4 = o.companies) === null || _o$companies4 === void 0 ? void 0 : _o$companies4.legal_name) || "").toLowerCase();
				case "cidade":
					var _o$companies$cidade, _o$companies5, _o$companies$estado, _o$companies6;
					return `${(_o$companies$cidade = (_o$companies5 = o.companies) === null || _o$companies5 === void 0 ? void 0 : _o$companies5.cidade) !== null && _o$companies$cidade !== void 0 ? _o$companies$cidade : ""}-${(_o$companies$estado = (_o$companies6 = o.companies) === null || _o$companies6 === void 0 ? void 0 : _o$companies6.estado) !== null && _o$companies$estado !== void 0 ? _o$companies$estado : ""}`.toLowerCase();
				case "status": return o.status;
				case "pagamento":
					var _o$payments2;
					return ((_o$payments2 = o.payments) === null || _o$payments2 === void 0 || (_o$payments2 = _o$payments2[0]) === null || _o$payments2 === void 0 ? void 0 : _o$payments2.tipo) || "";
				case "itens": return (o.order_items || []).reduce((a, i) => a + Number(i.quantidade || 0), 0);
				case "total": return Number(o.total || 0);
			}
		};
		arr.sort((a, b) => {
			const va = val(a);
			const vb = val(b);
			if (typeof va === "number" && typeof vb === "number") return (va - vb) * dir;
			return String(va).localeCompare(String(vb), "pt-BR", { numeric: true }) * dir;
		});
		return arr;
	}, [
		orders,
		sortKey,
		sortDir
	]);
	const Th = ({ k, label, align }) => {
		const active = sortKey === k;
		const Icon = active ? sortDir === "asc" ? ArrowUp : ArrowDown : ArrowUpDown;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
			className: `p-3 ${align === "right" ? "text-right" : "text-left"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => toggle(k),
				className: `inline-flex items-center gap-1 hover:opacity-80 ${align === "right" ? "flex-row-reverse" : ""}`,
				style: {
					color: active ? V2.TEXT : V2.MUTED,
					fontWeight: active ? 600 : 500
				},
				children: [
					label,
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" })
				]
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		title: `Pedidos (${orders.length})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						style: { background: `${V2.MUTED}11` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "data",
								label: "Data"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "pedido",
								label: "Pedido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "cliente",
								label: "Cliente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "cidade",
								label: "Cidade"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "status",
								label: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "pagamento",
								label: "Pagamento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "itens",
								label: "Itens",
								align: "right"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
								k: "total",
								label: "Total",
								align: "right"
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
						isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "p-6 text-center",
							style: { color: V2.MUTED },
							children: "Carregando…"
						}) }),
						!isLoading && sorted.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 8,
							className: "p-6 text-center",
							style: { color: V2.MUTED },
							children: "Nenhum pedido no período."
						}) }),
						sorted.map((o) => {
							var _o$companies7, _o$companies8, _o$companies9, _o$payments3;
							const cliente = ((_o$companies7 = o.companies) === null || _o$companies7 === void 0 ? void 0 : _o$companies7.trade_name) || ((_o$companies8 = o.companies) === null || _o$companies8 === void 0 ? void 0 : _o$companies8.legal_name) || "—";
							const cidade = ((_o$companies9 = o.companies) === null || _o$companies9 === void 0 ? void 0 : _o$companies9.cidade) ? `${o.companies.cidade}${o.companies.estado ? " - " + o.companies.estado : ""}` : "—";
							const itens = (o.order_items || []).reduce((a, i) => a + Number(i.quantidade || 0), 0);
							const pag = ((_o$payments3 = o.payments) === null || _o$payments3 === void 0 || (_o$payments3 = _o$payments3[0]) === null || _o$payments3 === void 0 ? void 0 : _o$payments3.tipo) || "—";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t",
								style: { borderColor: V2.GRAPHITE },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: formatDate(o.created_at)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 font-mono text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/orders/$id",
											params: { id: o.id },
											search: { edit: false },
											className: "underline",
											children: orderCodeHash(o.id, cliente)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3",
										children: cliente
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-xs",
										children: cidade
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-xs",
										children: o.status
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-xs",
										children: pag
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right",
										children: itens
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "p-3 text-right font-medium",
										children: brl(Number(o.total))
									})
								]
							}, o.id);
						})
					] }),
					sorted.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t font-semibold",
						style: {
							borderColor: V2.GRAPHITE,
							background: `${V2.MUTED}11`
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3",
								colSpan: 6,
								style: { color: V2.TEXT },
								children: "Total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-right",
								children: totals.qtdItens
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "p-3 text-right",
								children: brl(totals.receita)
							})
						]
					}) })
				]
			})
		})
	});
}
function Card({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border overflow-hidden",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3 border-b font-semibold",
			style: {
				borderColor: V2.GRAPHITE,
				color: V2.TEXT
			},
			children: title
		}), children]
	});
}
function Kpi({ label, value, hint, color, icon, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-4",
		style: {
			borderColor: highlight ? color : V2.GRAPHITE,
			background: highlight ? `${color}11` : V2.SURFACE
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs uppercase tracking-wider",
				style: { color: V2.MUTED },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { color },
					children: icon
				}), label]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-2xl font-bold",
				style: { color: V2.TEXT },
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs",
				style: { color: V2.MUTED },
				children: hint
			})
		]
	});
}
//#endregion
export { SalesReportPage as component };
