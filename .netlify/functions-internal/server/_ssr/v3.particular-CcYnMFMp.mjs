import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { G as Plus, K as PiggyBank, Mt as EyeOff, _ as Trash2, _n as ArrowDownRight, dn as ArrowUpRight, g as TrendingDown, h as TrendingUp, jt as Eye, qt as CircleCheck, s as Wallet } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DGeprr3K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.particular-CcYnMFMp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function rangeFor(p, ini, fim) {
	const now = /* @__PURE__ */ new Date();
	const iso = (d) => d.toISOString().slice(0, 10);
	const monthStart = (y, m) => iso(new Date(y, m, 1));
	const monthEnd = (y, m) => iso(new Date(y, m + 1, 0));
	switch (p) {
		case "MES_ATUAL": return {
			start: monthStart(now.getFullYear(), now.getMonth()),
			end: monthEnd(now.getFullYear(), now.getMonth()),
			label: "Este mês"
		};
		case "PROX_MES": {
			const d = new Date(now.getFullYear(), now.getMonth() + 1, 1);
			return {
				start: monthStart(d.getFullYear(), d.getMonth()),
				end: monthEnd(d.getFullYear(), d.getMonth()),
				label: "Próximo mês"
			};
		}
		case "MES_ANTERIOR": {
			const d = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			return {
				start: monthStart(d.getFullYear(), d.getMonth()),
				end: monthEnd(d.getFullYear(), d.getMonth()),
				label: "Mês anterior"
			};
		}
		case "ULT_30": {
			const s = new Date(now);
			s.setDate(s.getDate() - 29);
			return {
				start: iso(s),
				end: iso(now),
				label: "Últimos 30 dias"
			};
		}
		case "ULT_90": {
			const s = new Date(now);
			s.setDate(s.getDate() - 89);
			return {
				start: iso(s),
				end: iso(now),
				label: "Últimos 90 dias"
			};
		}
		case "ANO": return {
			start: `${now.getFullYear()}-01-01`,
			end: `${now.getFullYear()}-12-31`,
			label: "Este ano"
		};
		case "TUDO": return {
			start: "0000-01-01",
			end: "9999-12-31",
			label: "Tudo"
		};
		case "CUSTOM": return {
			start: ini || iso(now),
			end: fim || iso(now),
			label: "Personalizado"
		};
	}
}
function PersonalPage() {
	const qc = useQueryClient();
	const [tab, setTab] = (0, import_react.useState)("resumo");
	const [openNew, setOpenNew] = (0, import_react.useState)(null);
	const [hideValues, setHideValues] = (0, import_react.useState)(false);
	const [periodo, setPeriodo] = (0, import_react.useState)("MES_ATUAL");
	const [customIni, setCustomIni] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [customFim, setCustomFim] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		try {
			if (window.localStorage.getItem("prime:hide-card-values") === "1") setHideValues(true);
		} catch (_unused) {}
	}, []);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		try {
			window.localStorage.setItem("prime:hide-card-values", hideValues ? "1" : "0");
		} catch (_unused2) {}
	}, [hideValues]);
	const range = (0, import_react.useMemo)(() => rangeFor("MES_ATUAL"), []);
	const rangeList = (0, import_react.useMemo)(() => rangeFor(periodo, customIni, customFim), [
		periodo,
		customIni,
		customFim
	]);
	const { data: entries = [], isLoading } = useQuery({
		queryKey: ["personal-entries"],
		queryFn: async () => {
			const { data, error } = await supabase.from("personal_entries").select("*").order("vencimento", { ascending: false }).limit(1e3);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const totals = (0, import_react.useMemo)(() => {
		let receitaPaga = 0, despesaPaga = 0, aReceber = 0, aPagar = 0, aPagarVencidas = 0;
		const hoje = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		for (const e of entries) if (e.status === "PAGO") {
			var _e$pagamento;
			const ref = (_e$pagamento = e.pagamento) !== null && _e$pagamento !== void 0 ? _e$pagamento : e.vencimento;
			if (ref >= range.start && ref <= range.end) if (e.tipo === "RECEITA") receitaPaga += Number(e.valor);
			else despesaPaga += Number(e.valor);
		} else if (e.vencimento >= range.start && e.vencimento <= range.end) if (e.tipo === "RECEITA") aReceber += Number(e.valor);
		else {
			aPagar += Number(e.valor);
			if (e.vencimento < hoje) aPagarVencidas += Number(e.valor);
		}
		return {
			receitaPaga,
			despesaPaga,
			saldo: receitaPaga - despesaPaga,
			aReceber,
			aPagar,
			aPagarVencidas
		};
	}, [entries, range]);
	const setPago = useMutation({
		mutationFn: async ({ id, pago }) => {
			const { error } = await supabase.from("personal_entries").update({
				status: pago ? "PAGO" : "PENDENTE",
				pagamento: pago ? (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) : null
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["personal-entries"] });
			toast.success("Atualizado");
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("personal_entries").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["personal-entries"] });
			toast.success("Removido");
		},
		onError: (e) => toast.error(e.message || "Não foi possível remover")
	});
	const byVencAsc = (a, b) => a.vencimento.localeCompare(b.vencimento);
	const inRangeList = (date) => date >= rangeList.start && date <= rangeList.end;
	const aReceberList = entries.filter((e) => e.tipo === "RECEITA" && e.status === "PENDENTE" && inRangeList(e.vencimento)).sort(byVencAsc);
	const aPagarList = entries.filter((e) => e.tipo === "DESPESA" && e.status === "PENDENTE" && inRangeList(e.vencimento)).sort(byVencAsc);
	const extrato = entries.filter((e) => {
		var _e$pagamento2;
		return e.status === "PAGO" && inRangeList((_e$pagamento2 = e.pagamento) !== null && _e$pagamento2 !== void 0 ? _e$pagamento2 : e.vencimento);
	}).slice(0, 200);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Meu financeiro particular",
		eyebrow: "Só seu, isolado da empresa",
		description: "Controle de contas a pagar e receber pessoais. Nada aqui afeta o financeiro da empresa.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				onClick: () => setOpenNew("DESPESA"),
				className: "gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-4 w-4" }), " Nova despesa"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpenNew("RECEITA"),
				className: "gap-2",
				style: {
					background: V2.SUCCESS,
					color: "#fff"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" }), " Nova receita"]
			})]
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex items-center justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setHideValues((v) => !v),
					className: "flex items-center gap-1.5 text-xs font-medium hover:opacity-80 transition-opacity",
					style: { color: V2.MUTED },
					"aria-label": hideValues ? "Mostrar valores" : "Ocultar valores",
					children: [hideValues ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }), hideValues ? "Mostrar valores" : "Ocultar valores"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: `Saldo · ${range.label}`,
						value: brl(totals.saldo),
						hidden: hideValues,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PiggyBank, { className: "h-4 w-4" }),
						color: totals.saldo >= 0 ? V2.SUCCESS : "#dc2626"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: `Recebido · ${range.label}`,
						value: brl(totals.receitaPaga),
						hidden: hideValues,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4" }),
						color: V2.SUCCESS
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: `Pago · ${range.label}`,
						value: brl(totals.despesaPaga),
						hidden: hideValues,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingDown, { className: "h-4 w-4" }),
						color: "#dc2626"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						label: `A pagar · ${range.label}`,
						value: brl(totals.aPagar),
						hidden: hideValues,
						sub: totals.aPagarVencidas > 0 ? `${brl(totals.aPagarVencidas)} vencidas` : "em dia",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "h-4 w-4" }),
						color: totals.aPagarVencidas > 0 ? "#dc2626" : V2.TEXT
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				value: tab,
				onValueChange: setTab,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "resumo",
							children: "Resumo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "pagar",
							children: [
								"Contas a pagar (",
								aPagarList.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "receber",
							children: [
								"A receber (",
								aReceberList.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "extrato",
							children: "Extrato"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									style: { color: V2.MUTED },
									children: "Período da lista"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: periodo,
									onValueChange: (v) => setPeriodo(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "w-44 text-xs",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Período" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "MES_ATUAL",
											children: "Este mês"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "PROX_MES",
											children: "Próximo mês"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "MES_ANTERIOR",
											children: "Mês anterior"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "ULT_30",
											children: "Últimos 30 dias"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "ULT_90",
											children: "Últimos 90 dias"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "ANO",
											children: "Este ano"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "TUDO",
											children: "Tudo"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "CUSTOM",
											children: "Personalizado"
										})
									] })]
								})]
							}),
							periodo === "CUSTOM" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: customIni,
										onChange: (e) => setCustomIni(e.target.value),
										className: "w-32 text-xs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs",
										style: { color: V2.MUTED },
										children: "até"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: customFim,
										onChange: (e) => setCustomFim(e.target.value),
										className: "w-32 text-xs"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs",
								style: { color: V2.MUTED },
								children: rangeList.label
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "resumo",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid lg:grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								title: "Próximas contas a pagar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryList, {
									entries: aPagarList.slice(0, 6),
									onPago: (id) => setPago.mutate({
										id,
										pago: true
									}),
									onDelete: (id) => del.mutate(id)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
								title: "A receber",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryList, {
									entries: aReceberList.slice(0, 6),
									onPago: (id) => setPago.mutate({
										id,
										pago: true
									}),
									onDelete: (id) => del.mutate(id)
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "pagar",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Contas a pagar",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryList, {
								entries: aPagarList,
								onPago: (id) => setPago.mutate({
									id,
									pago: true
								}),
								onDelete: (id) => del.mutate(id)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "receber",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "A receber",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntryList, {
								entries: aReceberList,
								onPago: (id) => setPago.mutate({
									id,
									pago: true
								}),
								onDelete: (id) => del.mutate(id)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "extrato",
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
							title: "Extrato — pagos",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								style: { color: V2.MUTED },
								children: "Carregando…"
							}) : extrato.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								style: { color: V2.MUTED },
								children: "Nenhum lançamento pago ainda."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y",
								style: { borderColor: V2.GRAPHITE },
								children: extrato.map((e) => {
									var _e$pagamento3;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-2.5 flex items-center gap-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-8 w-8 rounded-full grid place-items-center shrink-0",
												style: {
													background: e.tipo === "RECEITA" ? V2.SUCCESS_LIGHT : "rgba(220,38,38,0.1)",
													color: e.tipo === "RECEITA" ? V2.SUCCESS_DARK : "#dc2626"
												},
												children: e.tipo === "RECEITA" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-4 w-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1 min-w-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium truncate",
													style: { color: V2.TEXT },
													children: e.descricao
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "text-[11px]",
													style: { color: V2.MUTED },
													children: [
														formatDate((_e$pagamento3 = e.pagamento) !== null && _e$pagamento3 !== void 0 ? _e$pagamento3 : e.vencimento),
														e.categoria && ` · ${e.categoria}`,
														e.origem === "FECHAMENTO" && " · Retirada de fechamento"
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-semibold whitespace-nowrap",
												style: { color: e.tipo === "RECEITA" ? V2.SUCCESS_DARK : "#dc2626" },
												children: [
													e.tipo === "RECEITA" ? "+" : "−",
													" ",
													brl(Number(e.valor))
												]
											}),
											e.origem === "MANUAL" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												className: "h-7 w-7",
												onClick: () => del.mutate(e.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})
										]
									}, e.id);
								})
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewEntryDialog, {
				open: !!openNew,
				tipo: openNew !== null && openNew !== void 0 ? openNew : "DESPESA",
				onClose: () => setOpenNew(null),
				onSaved: () => qc.invalidateQueries({ queryKey: ["personal-entries"] })
			})
		]
	});
}
function Kpi({ label, value, sub, hidden, icon, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-4",
		style: {
			background: V2.SURFACE,
			border: `1px solid ${V2.GRAPHITE}`
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[11px] uppercase tracking-wider font-semibold",
				style: { color: V2.MUTED },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color },
						children: icon
					}),
					" ",
					label
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-2xl font-bold tabular-nums tracking-widest",
				style: { color },
				children: hidden ? "••••" : value
			}),
			sub && !hidden && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] mt-0.5",
				style: { color: V2.MUTED },
				children: sub
			})
		]
	});
}
function Section({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-4",
		style: {
			background: V2.SURFACE,
			border: `1px solid ${V2.GRAPHITE}`
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-semibold mb-3",
			style: { color: V2.TEXT },
			children: title
		}), children]
	});
}
function EntryList({ entries, onPago, onDelete }) {
	const hoje = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	if (entries.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm",
		style: { color: V2.MUTED },
		children: "Nada por aqui."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "divide-y",
		style: { borderColor: V2.GRAPHITE },
		children: entries.map((e) => {
			const vencida = e.vencimento < hoje;
			const isRec = e.tipo === "RECEITA";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-2.5 flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-full grid place-items-center shrink-0",
						style: {
							background: isRec ? V2.SUCCESS_LIGHT : "rgba(220,38,38,0.1)",
							color: isRec ? V2.SUCCESS_DARK : "#dc2626"
						},
						children: isRec ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "h-4 w-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium truncate",
							style: { color: V2.TEXT },
							children: e.descricao
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px]",
							style: { color: vencida ? "#dc2626" : V2.MUTED },
							children: [
								"Vence ",
								formatDate(e.vencimento),
								vencida && " · vencida",
								e.categoria && ` · ${e.categoria}`
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold whitespace-nowrap",
						style: { color: isRec ? V2.SUCCESS_DARK : "#dc2626" },
						children: brl(Number(e.valor))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						className: "gap-1",
						onClick: () => onPago(e.id),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }),
							" ",
							isRec ? "Recebi" : "Paguei"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "h-7 w-7",
						onClick: () => onDelete(e.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
					})
				]
			}, e.id);
		})
	});
}
function NewEntryDialog({ open, tipo, onClose, onSaved }) {
	const [descricao, setDescricao] = (0, import_react.useState)("");
	const [valor, setValor] = (0, import_react.useState)("");
	const [vencimento, setVencimento] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [categoria, setCategoria] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("PENDENTE");
	const [obs, setObs] = (0, import_react.useState)("");
	const [parcelas, setParcelas] = (0, import_react.useState)("1");
	function reset() {
		setDescricao("");
		setValor("");
		setVencimento((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
		setCategoria("");
		setStatus("PENDENTE");
		setObs("");
		setParcelas("1");
	}
	const nParcelas = Math.max(1, Math.min(48, Math.floor(Number(parcelas) || 1)));
	const valorNum = Number(valor) || 0;
	const totalPreview = valorNum * nParcelas;
	const save = useMutation({
		mutationFn: async () => {
			if (!descricao) throw new Error("Informe a descrição");
			const v = Number(valor);
			if (!v || v <= 0) throw new Error("Informe um valor válido");
			const n = nParcelas;
			const { data: { user } } = await supabase.auth.getUser();
			if (!user) throw new Error("Sessão expirada");
			const valorParcela = v;
			const [by, bm, bd] = vencimento.split("-").map(Number);
			const rows = Array.from({ length: n }, (_, i) => {
				const d = new Date(by, bm - 1 + i, bd);
				const venc = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
				return {
					user_id: user.id,
					tipo,
					descricao: n > 1 ? `${descricao} (${i + 1}/${n})` : descricao,
					valor: valorParcela,
					vencimento: venc,
					pagamento: status === "PAGO" ? venc : null,
					status,
					categoria: categoria || null,
					observacao: obs || null,
					origem: "MANUAL"
				};
			});
			const { error } = await supabase.from("personal_entries").insert(rows);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success(tipo === "RECEITA" ? "Receita registrada" : "Despesa registrada");
			reset();
			onSaved();
			onClose();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => {
			if (!o) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: tipo === "RECEITA" ? "Nova receita pessoal" : "Nova despesa pessoal" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium",
						style: { color: V2.MUTED },
						children: "Descrição"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: descricao,
						onChange: (e) => setDescricao(e.target.value),
						placeholder: tipo === "RECEITA" ? "Ex: Salário, freelas" : "Ex: Aluguel, luz, mercado"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium",
							style: { color: V2.MUTED },
							children: "Valor"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.01",
							value: valor,
							onChange: (e) => setValor(e.target.value),
							placeholder: "0,00"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium",
							style: { color: V2.MUTED },
							children: status === "PAGO" ? "Data do pagamento" : "Vencimento"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: vencimento,
							onChange: (e) => setVencimento(e.target.value)
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium",
							style: { color: V2.MUTED },
							children: "Categoria (opcional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: categoria,
							onChange: (e) => setCategoria(e.target.value),
							placeholder: "Casa, saúde, lazer…"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium",
							style: { color: V2.MUTED },
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: status,
							onValueChange: (v) => setStatus(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "PENDENTE",
								children: tipo === "RECEITA" ? "A receber" : "A pagar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "PAGO",
								children: tipo === "RECEITA" ? "Já recebido" : "Já pago"
							})] })]
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-medium",
							style: { color: V2.MUTED },
							children: "Parcelas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: "1",
							max: "48",
							value: parcelas,
							onChange: (e) => setParcelas(e.target.value)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px]",
								style: { color: V2.MUTED },
								children: nParcelas === 1 ? "Lançamento único" : `Cria ${nParcelas} lançamentos mensais`
							})
						})]
					}),
					nParcelas > 1 && valorNum > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs",
						style: { color: V2.MUTED },
						children: [
							nParcelas,
							"x de ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { color: V2.TEXT },
								children: brl(valorNum)
							}),
							" · total ",
							brl(totalPreview),
							" · 1ª em ",
							formatDate(vencimento)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium",
						style: { color: V2.MUTED },
						children: "Observação (opcional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: obs,
						onChange: (e) => setObs(e.target.value),
						placeholder: "Notas rápidas"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-end gap-2 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: onClose,
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => save.mutate(),
							disabled: save.isPending,
							style: {
								background: tipo === "RECEITA" ? V2.SUCCESS : V2.TEAL_DARK,
								color: "#fff"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Salvar"]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { PersonalPage as component };
