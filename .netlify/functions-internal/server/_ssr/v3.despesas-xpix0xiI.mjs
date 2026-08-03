import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { N as Search, V as Receipt, p as Truck, pn as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.despesas-xpix0xiI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"COMBUSTIVEL",
	"ALIMENTACAO",
	"HOSPEDAGEM",
	"PEDAGIO",
	"MANUTENCAO",
	"MATERIAL",
	"OUTRO"
];
var categoryLabel = (c) => {
	if (!c) return "—";
	return {
		COMBUSTIVEL: "Combustível",
		ALIMENTACAO: "Alimentação",
		HOSPEDAGEM: "Hospedagem",
		PEDAGIO: "Pedágio",
		MANUTENCAO: "Manutenção",
		MATERIAL: "Material",
		OUTRO: "Outro"
	}[c] || c;
};
function ExpensesPage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [period, setPeriod] = (0, import_react.useState)("all");
	const [tripFilter, setTripFilter] = (0, import_react.useState)("all");
	const { data: expenses = [], isLoading } = useQuery({
		queryKey: ["all-trip-expenses"],
		queryFn: async () => {
			const { data, error } = await supabase.from("trip_expenses").select("id,trip_id,categoria,descricao,valor,data,forma_pagamento,created_at,trips(nome,cidade,estado)").order("data", { ascending: false }).limit(1e3);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const months = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		expenses.forEach((e) => {
			if (e.data) set.add(e.data.slice(0, 7));
		});
		return Array.from(set).sort((a, b) => b.localeCompare(a));
	}, [expenses]);
	const tripOptions = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		expenses.forEach((e) => {
			var _e$trips, _e$trips2, _e$trips$nome, _e$trips3, _map$get;
			if (!e.trip_id) return;
			const label = ((_e$trips = e.trips) === null || _e$trips === void 0 ? void 0 : _e$trips.cidade) ? `${e.trips.cidade}${e.trips.estado ? `/${e.trips.estado}` : ""}${((_e$trips2 = e.trips) === null || _e$trips2 === void 0 ? void 0 : _e$trips2.nome) ? ` — ${e.trips.nome}` : ""}` : (_e$trips$nome = (_e$trips3 = e.trips) === null || _e$trips3 === void 0 ? void 0 : _e$trips3.nome) !== null && _e$trips$nome !== void 0 ? _e$trips$nome : "Viagem sem nome";
			const cur = (_map$get = map.get(e.trip_id)) !== null && _map$get !== void 0 ? _map$get : {
				id: e.trip_id,
				label,
				total: 0
			};
			cur.total += Number(e.valor || 0);
			map.set(e.trip_id, cur);
		});
		return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
	}, [expenses]);
	const filtered = (0, import_react.useMemo)(() => {
		const s = search.trim().toLowerCase();
		return expenses.filter((e) => {
			var _e$descricao, _e$trips$nome2, _e$trips4, _e$trips$cidade, _e$trips5;
			const matchesSearch = !s || categoryLabel(e.categoria).toLowerCase().includes(s) || ((_e$descricao = e.descricao) !== null && _e$descricao !== void 0 ? _e$descricao : "").toLowerCase().includes(s) || ((_e$trips$nome2 = (_e$trips4 = e.trips) === null || _e$trips4 === void 0 ? void 0 : _e$trips4.nome) !== null && _e$trips$nome2 !== void 0 ? _e$trips$nome2 : "").toLowerCase().includes(s) || ((_e$trips$cidade = (_e$trips5 = e.trips) === null || _e$trips5 === void 0 ? void 0 : _e$trips5.cidade) !== null && _e$trips$cidade !== void 0 ? _e$trips$cidade : "").toLowerCase().includes(s);
			const matchesCategory = category === "all" || e.categoria === category;
			const matchesPeriod = period === "all" || e.data && e.data.startsWith(period);
			const matchesTrip = tripFilter === "all" || e.trip_id === tripFilter;
			return matchesSearch && matchesCategory && matchesPeriod && matchesTrip;
		}).sort((a, b) => Number(b.valor || 0) - Number(a.valor || 0));
	}, [
		expenses,
		search,
		category,
		period,
		tripFilter
	]);
	const total = (0, import_react.useMemo)(() => filtered.reduce((sum, e) => sum + Number(e.valor || 0), 0), [filtered]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Despesas",
		eyebrow: "Controle de gastos",
		description: "Todas as despesas lançadas nas viagens, com filtros por categoria e período.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/v3/viagens",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				style: {
					background: V2.TEAL,
					color: "#fff"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { className: "h-4 w-4 mr-1" }), " Lançar nova"]
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4",
								style: { color: V2.MUTED }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Buscar despesa...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "pl-9",
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE,
									color: V2.TEXT
								}
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: tripFilter,
							onValueChange: setTripFilter,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE,
									color: V2.TEXT
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Viagem" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Todas as viagens"
								}), tripOptions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: t.id,
									children: t.label
								}, t.id))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: category,
							onValueChange: setCategory,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE,
									color: V2.TEXT
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Categoria" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								style: {
									background: V2.SURFACE,
									borderColor: V2.GRAPHITE
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "Todas as categorias"
								}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									children: categoryLabel(c)
								}, c))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: period,
							onValueChange: setPeriod,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								style: {
									background: V2.SURFACE,
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border p-4 flex flex-col justify-center",
							style: {
								background: V2.SURFACE,
								borderColor: V2.GRAPHITE
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
								style: { color: V2.MUTED },
								children: "Total filtrado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-semibold mt-0.5",
								children: brl(total)
							})]
						})
					]
				}),
				tripFilter === "all" && tripOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border p-4",
					style: {
						background: V2.SURFACE,
						borderColor: V2.GRAPHITE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
							style: { color: V2.MUTED },
							children: "Totais por viagem"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs",
							style: { color: V2.MUTED },
							children: "Clique para filtrar"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2",
						children: tripOptions.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setTripFilter(t.id),
							className: "text-left rounded-lg border p-3 hover:bg-white/[0.03] transition flex items-center justify-between gap-3",
							style: { borderColor: V2.GRAPHITE },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
									className: "h-4 w-4 shrink-0",
									style: { color: V2.MUTED }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm truncate",
									style: { color: V2.TEXT },
									children: t.label
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold shrink-0",
								style: { color: V2.TEXT },
								children: brl(t.total)
							})]
						}, t.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border shadow-sm overflow-hidden",
					style: {
						background: V2.SURFACE,
						borderColor: V2.GRAPHITE
					},
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-sm",
						style: { color: V2.MUTED },
						children: "Carregando…"
					}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-10 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, {
							className: "h-10 w-10 mx-auto mb-2",
							style: { color: V2.MUTED }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							style: { color: V2.MUTED },
							children: "Nenhuma despesa encontrada."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						style: { borderColor: V2.GRAPHITE },
						children: filtered.map((e) => {
							var _e$trips$nome3, _e$trips6, _e$trips7;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/v3/viagens",
								className: "w-full text-left p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-3 md:items-center hover:bg-white/[0.03] transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold truncate",
											style: { color: V2.TEXT },
											children: [categoryLabel(e.categoria), e.descricao ? ` — ${e.descricao}` : ""]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs mt-0.5",
											style: { color: V2.MUTED },
											children: [
												formatDate(e.data),
												" ",
												e.forma_pagamento ? `· ${e.forma_pagamento}` : ""
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex items-center gap-2",
										style: { color: V2.MUTED },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm truncate",
											children: [(_e$trips$nome3 = (_e$trips6 = e.trips) === null || _e$trips6 === void 0 ? void 0 : _e$trips6.nome) !== null && _e$trips$nome3 !== void 0 ? _e$trips$nome3 : "Viagem", ((_e$trips7 = e.trips) === null || _e$trips7 === void 0 ? void 0 : _e$trips7.cidade) ? ` — ${e.trips.cidade}${e.trips.estado ? `/${e.trips.estado}` : ""}` : ""]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-right md:text-left",
										style: { color: V2.TEXT },
										children: brl(Number(e.valor))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "hidden md:flex justify-end",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
											className: "h-4 w-4",
											style: { color: V2.MUTED }
										})
									})
								]
							}, e.id);
						})
					})
				})
			]
		})
	});
}
//#endregion
export { ExpensesPage as component };
