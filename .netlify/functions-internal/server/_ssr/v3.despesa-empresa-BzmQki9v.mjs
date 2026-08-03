import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { G as Plus, N as Search, V as Receipt, _ as Trash2, in as Building2, tn as Calendar, tt as Minus } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { t as useBankAccounts } from "./use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.despesa-empresa-BzmQki9v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CompanyExpensePage() {
	const qc = useQueryClient();
	const { data: accounts = [] } = useBankAccounts();
	const [search, setSearch] = (0, import_react.useState)("");
	const [period, setPeriod] = (0, import_react.useState)("all");
	const [form, setForm] = (0, import_react.useState)({
		descricao: "",
		categoria_id: "",
		valor: "",
		data: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
		account_id: ""
	});
	const { data: categories = [] } = useQuery({
		queryKey: ["fin-categories-despesa"],
		queryFn: async () => {
			const { data, error } = await supabase.from("financial_categories").select("id,nome,tipo").eq("tipo", "DESPESA").order("nome");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: entries = [], isLoading } = useQuery({
		queryKey: ["company-expenses"],
		queryFn: async () => {
			const { data, error } = await supabase.from("financial_entries").select("id,descricao,valor,data,tipo,account_id,categoria_id,financial_categories(nome),bank_accounts(nome,cor)").eq("tipo", "DESPESA").is("trip_expense_id", null).order("data", { ascending: false }).limit(500);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const addExpense = useMutation({
		mutationFn: async () => {
			if (!form.descricao) throw new Error("Informe a descrição");
			if (!form.valor || Number(form.valor) <= 0) throw new Error("Informe um valor válido");
			if (!form.account_id) throw new Error("Escolha a conta");
			const { error } = await supabase.from("financial_entries").insert({
				descricao: form.descricao,
				valor: Number(form.valor),
				tipo: "DESPESA",
				data: form.data,
				account_id: form.account_id,
				categoria_id: form.categoria_id || null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Despesa da empresa registrada");
			setForm({
				descricao: "",
				categoria_id: "",
				valor: "",
				data: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				account_id: ""
			});
			qc.invalidateQueries({ queryKey: ["company-expenses"] });
			qc.invalidateQueries({ queryKey: ["fin-entries"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const removeExpense = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("financial_entries").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Despesa removida");
			qc.invalidateQueries({ queryKey: ["company-expenses"] });
			qc.invalidateQueries({ queryKey: ["fin-entries"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const months = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		entries.forEach((e) => set.add(e.data.slice(0, 7)));
		return Array.from(set).sort((a, b) => b.localeCompare(a));
	}, [entries]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		return entries.filter((e) => {
			var _e$financial_categori, _e$financial_categori2, _e$bank_accounts$nome, _e$bank_accounts;
			const matchesSearch = !q || `${e.descricao} ${(_e$financial_categori = (_e$financial_categori2 = e.financial_categories) === null || _e$financial_categori2 === void 0 ? void 0 : _e$financial_categori2.nome) !== null && _e$financial_categori !== void 0 ? _e$financial_categori : ""} ${(_e$bank_accounts$nome = (_e$bank_accounts = e.bank_accounts) === null || _e$bank_accounts === void 0 ? void 0 : _e$bank_accounts.nome) !== null && _e$bank_accounts$nome !== void 0 ? _e$bank_accounts$nome : ""}`.toLowerCase().includes(q);
			const matchesPeriod = period === "all" || e.data.startsWith(period);
			return matchesSearch && matchesPeriod;
		});
	}, [
		entries,
		search,
		period
	]);
	const total = (0, import_react.useMemo)(() => filtered.reduce((s, e) => s + Number(e.valor || 0), 0), [filtered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Despesa da empresa",
		eyebrow: "Fora de viagem",
		description: "Lance contas operacionais: aluguel, energia, internet, marketing, impostos, material de escritório etc.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/v3/financeiro",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				style: {
					borderColor: V2.GRAPHITE,
					color: V2.TEXT
				},
				children: "Ver extrato completo"
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
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-8 w-8 rounded-lg grid place-items-center",
						style: {
							background: V2.TEAL_LIGHT,
							color: V2.TEAL
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-4 w-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold",
						style: { color: V2.TEXT },
						children: "Novo lançamento operacional"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] uppercase tracking-wider font-semibold",
								style: { color: V2.MUTED },
								children: "Descrição"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Ex.: Aluguel do escritório",
								value: form.descricao,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { descricao: e.target.value })),
								className: "mt-1",
								style: {
									background: V2.BG,
									borderColor: V2.GRAPHITE,
									color: V2.TEXT
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] uppercase tracking-wider font-semibold",
							style: { color: V2.MUTED },
							children: "Categoria"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: form.categoria_id,
							onValueChange: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { categoria_id: v })),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1",
								style: {
									background: V2.BG,
									borderColor: V2.GRAPHITE,
									color: V2.TEXT
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecionar" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: " ",
									children: "Sem categoria"
								}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c.id,
									children: c.nome
								}, c.id))]
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] uppercase tracking-wider font-semibold",
							style: { color: V2.MUTED },
							children: "Valor (R$)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							step: "0.01",
							placeholder: "0,00",
							value: form.valor,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { valor: e.target.value })),
							className: "mt-1 tabular-nums",
							style: {
								background: V2.BG,
								borderColor: V2.GRAPHITE,
								color: V2.TEXT
							}
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-[10px] uppercase tracking-wider font-semibold",
							style: { color: V2.MUTED },
							children: "Data"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: form.data,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { data: e.target.value })),
							className: "mt-1",
							style: {
								background: V2.BG,
								borderColor: V2.GRAPHITE,
								color: V2.TEXT
							}
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "sm:col-span-2 lg:col-span-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[10px] uppercase tracking-wider font-semibold",
								style: { color: V2.MUTED },
								children: "Conta"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.account_id,
								onValueChange: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { account_id: v })),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1",
									style: {
										background: V2.BG,
										borderColor: V2.GRAPHITE,
										color: V2.TEXT
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Conta que pagou" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, {
									style: {
										background: V2.SURFACE,
										borderColor: V2.GRAPHITE
									},
									children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: a.id,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-2 h-2 rounded-full",
													style: { background: a.cor }
												}),
												a.nome,
												" ",
												a.banco ? `· ${a.banco}` : ""
											]
										})
									}, a.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => addExpense.mutate(),
								disabled: !form.descricao || !form.valor || !form.account_id || addExpense.isPending,
								className: "w-full",
								style: {
									background: V2.SUCCESS,
									color: "#fff"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 mr-1" }), " Registrar despesa"]
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border p-4",
				style: {
					background: V2.SURFACE,
					borderColor: V2.GRAPHITE
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
							className: "h-4 w-4",
							style: { color: V2.TEAL }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold",
							style: { color: V2.TEXT },
							children: "Histórico de despesas"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
								style: { color: V2.MUTED }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Buscar...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "pl-9",
								style: {
									background: V2.BG,
									borderColor: V2.GRAPHITE,
									color: V2.TEXT
								}
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: period,
							onValueChange: setPeriod,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-40",
								style: {
									background: V2.BG,
									borderColor: V2.GRAPHITE,
									color: V2.TEXT
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Período" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Todos os períodos"
								}), months.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: m,
									children: [
										m.slice(5, 7),
										"/",
										m.slice(0, 4)
									]
								}, m))]
							})]
						})]
					})]
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm py-8 text-center",
					style: { color: V2.MUTED },
					children: "Carregando..."
				}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-10 border-2 border-dashed rounded-xl",
					style: { borderColor: V2.GRAPHITE },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
						className: "h-8 w-8 mx-auto mb-2",
						style: { color: V2.MUTED }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm",
						style: { color: V2.MUTED },
						children: "Nenhuma despesa operacional encontrada"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [filtered.map((e) => {
						var _e$financial_categori3, _e$bank_accounts$nome2, _e$bank_accounts2;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 p-3 rounded-xl border",
							style: {
								background: V2.BG,
								borderColor: V2.GRAPHITE
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 flex-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-semibold truncate",
										style: { color: V2.TEXT },
										children: e.descricao
									}), ((_e$financial_categori3 = e.financial_categories) === null || _e$financial_categori3 === void 0 ? void 0 : _e$financial_categori3.nome) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] px-2 py-0.5 rounded-full border",
										style: {
											borderColor: V2.GRAPHITE,
											color: V2.MUTED
										},
										children: e.financial_categories.nome
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 mt-1 text-[11px]",
									style: { color: V2.MUTED },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
										formatDate(e.data),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-1 h-1 rounded-full",
											style: { background: V2.MUTED }
										}),
										(_e$bank_accounts$nome2 = (_e$bank_accounts2 = e.bank_accounts) === null || _e$bank_accounts2 === void 0 ? void 0 : _e$bank_accounts2.nome) !== null && _e$bank_accounts$nome2 !== void 0 ? _e$bank_accounts$nome2 : "—"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold tabular-nums",
									style: { color: "#dc2626" },
									children: brl(e.valor)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => removeExpense.mutate(e.id),
									className: "p-2 rounded-lg transition hover:opacity-80",
									style: {
										color: "#dc2626",
										background: "#dc262612"
									},
									"aria-label": "Remover",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
								})]
							})]
						}, e.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pt-3 border-t",
						style: { borderColor: V2.GRAPHITE },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] uppercase tracking-wider font-semibold",
							style: { color: V2.MUTED },
							children: "Total filtrado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-semibold tabular-nums",
							style: { color: V2.TEXT },
							children: brl(total)
						})]
					})]
				})]
			})]
		})
	});
}
//#endregion
export { CompanyExpensePage as component };
