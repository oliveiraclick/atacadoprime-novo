import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { o as formatDateTime } from "./pdf-CsVsL9dt.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { It as DollarSign } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.caixa-c2ur0D6D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "pos.caixa.v1";
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
function load() {
	if (typeof window === "undefined") return blank();
	try {
		const raw = localStorage.getItem(KEY);
		if (raw) return JSON.parse(raw);
	} catch (_unused) {}
	return blank();
}
function blank() {
	return {
		aberto: false,
		operador: "",
		valorInicial: 0,
		abertoEm: null,
		fechadoEm: null,
		valorFinal: null
	};
}
function PosCaixa() {
	var _state$valorFinal, _summary$vendas, _summary$total, _summary$dinheiro, _summary$cartao, _summary$pix;
	const [state, setState] = (0, import_react.useState)(blank());
	const [operador, setOperador] = (0, import_react.useState)("");
	const [inicial, setInicial] = (0, import_react.useState)("");
	const [final, setFinal] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => setState(load()), []);
	function save(next) {
		localStorage.setItem(KEY, JSON.stringify(next));
		setState(next);
	}
	function abrir() {
		if (!operador.trim()) {
			toast.error("Informe o operador");
			return;
		}
		save({
			aberto: true,
			operador: operador.trim(),
			valorInicial: Number(inicial) || 0,
			abertoEm: (/* @__PURE__ */ new Date()).toISOString(),
			fechadoEm: null,
			valorFinal: null
		});
		toast.success("Caixa aberto");
	}
	function fechar() {
		const valorFinal = Number(final) || 0;
		save(_objectSpread2(_objectSpread2({}, state), {}, {
			aberto: false,
			fechadoEm: (/* @__PURE__ */ new Date()).toISOString(),
			valorFinal
		}));
		toast.success("Caixa fechado");
	}
	const { data: summary } = useQuery({
		queryKey: ["pos", "caixa-summary"],
		queryFn: async () => {
			const today = /* @__PURE__ */ new Date();
			today.setHours(0, 0, 0, 0);
			const { data, error } = await supabase.from("orders").select("total, pagamento:payments(tipo)").eq("status", "PAGO").gte("created_at", today.toISOString());
			if (error) throw error;
			const rows = data !== null && data !== void 0 ? data : [];
			const total = rows.reduce((s, r) => {
				var _r$total;
				return s + Number((_r$total = r.total) !== null && _r$total !== void 0 ? _r$total : 0);
			}, 0);
			const dinheiro = rows.filter((r) => {
				var _r$pagamento;
				return ((_r$pagamento = r.pagamento) === null || _r$pagamento === void 0 || (_r$pagamento = _r$pagamento[0]) === null || _r$pagamento === void 0 ? void 0 : _r$pagamento.tipo) === "DINHEIRO";
			}).reduce((s, r) => {
				var _r$total2;
				return s + Number((_r$total2 = r.total) !== null && _r$total2 !== void 0 ? _r$total2 : 0);
			}, 0);
			const cartao = rows.filter((r) => {
				var _r$pagamento2;
				return ((_r$pagamento2 = r.pagamento) === null || _r$pagamento2 === void 0 || (_r$pagamento2 = _r$pagamento2[0]) === null || _r$pagamento2 === void 0 ? void 0 : _r$pagamento2.tipo) === "CARTAO";
			}).reduce((s, r) => {
				var _r$total3;
				return s + Number((_r$total3 = r.total) !== null && _r$total3 !== void 0 ? _r$total3 : 0);
			}, 0);
			const pix = rows.filter((r) => {
				var _r$pagamento3;
				return ((_r$pagamento3 = r.pagamento) === null || _r$pagamento3 === void 0 || (_r$pagamento3 = _r$pagamento3[0]) === null || _r$pagamento3 === void 0 ? void 0 : _r$pagamento3.tipo) === "PIX";
			}).reduce((s, r) => {
				var _r$total4;
				return s + Number((_r$total4 = r.total) !== null && _r$total4 !== void 0 ? _r$total4 : 0);
			}, 0);
			return {
				vendas: rows.length,
				total,
				dinheiro,
				cartao,
				pix
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-lg font-bold",
			children: "Caixa"
		}), !state.aberto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border p-4 space-y-3",
			style: {
				background: V2.LIGHT_SURFACE,
				borderColor: V2.LIGHT_BORDER
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm font-semibold",
					children: "Abrir caixa"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Operador",
					value: operador,
					onChange: (e) => setOperador(e.target.value),
					className: "h-11"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					placeholder: "Valor inicial (troco)",
					type: "number",
					inputMode: "decimal",
					value: inicial,
					onChange: (e) => setInicial(e.target.value),
					className: "h-11"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: abrir,
					className: "w-full h-12 font-semibold",
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: "Abrir caixa"
				}),
				state.fechadoEm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-xs",
					style: { color: V2.LIGHT_MUTED },
					children: [
						"Último fechamento: ",
						formatDateTime(state.fechadoEm),
						" · ",
						brl((_state$valorFinal = state.valorFinal) !== null && _state$valorFinal !== void 0 ? _state$valorFinal : 0)
					]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border p-4",
					style: {
						background: V2.LIGHT_SURFACE,
						borderColor: V2.LIGHT_BORDER
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs",
							style: { color: V2.LIGHT_MUTED },
							children: "Operador"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: state.operador
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs mt-2",
							style: { color: V2.LIGHT_MUTED },
							children: "Aberto em"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm",
							children: state.abertoEm && formatDateTime(state.abertoEm)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs mt-2",
							style: { color: V2.LIGHT_MUTED },
							children: "Valor inicial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-lg font-bold",
							style: { color: V2.TEAL },
							children: brl(state.valorInicial)
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border p-4 space-y-3",
					style: {
						background: V2.LIGHT_SURFACE,
						borderColor: V2.LIGHT_BORDER
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm font-semibold flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								className: "h-4 w-4",
								style: { color: V2.TEAL }
							}), " Vendas de hoje"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg p-3",
								style: { background: V2.LIGHT_BG },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs",
									style: { color: V2.LIGHT_MUTED },
									children: "Vendas"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-bold",
									style: { color: V2.LIGHT_TEXT },
									children: (_summary$vendas = summary === null || summary === void 0 ? void 0 : summary.vendas) !== null && _summary$vendas !== void 0 ? _summary$vendas : 0
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg p-3",
								style: { background: V2.LIGHT_BG },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs",
									style: { color: V2.LIGHT_MUTED },
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-bold",
									style: { color: V2.TEAL },
									children: brl((_summary$total = summary === null || summary === void 0 ? void 0 : summary.total) !== null && _summary$total !== void 0 ? _summary$total : 0)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: V2.LIGHT_MUTED },
										children: "Dinheiro"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										style: { color: V2.LIGHT_TEXT },
										children: brl((_summary$dinheiro = summary === null || summary === void 0 ? void 0 : summary.dinheiro) !== null && _summary$dinheiro !== void 0 ? _summary$dinheiro : 0)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: V2.LIGHT_MUTED },
										children: "Cartão"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										style: { color: V2.LIGHT_TEXT },
										children: brl((_summary$cartao = summary === null || summary === void 0 ? void 0 : summary.cartao) !== null && _summary$cartao !== void 0 ? _summary$cartao : 0)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: V2.LIGHT_MUTED },
										children: "PIX"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										style: { color: V2.LIGHT_TEXT },
										children: brl((_summary$pix = summary === null || summary === void 0 ? void 0 : summary.pix) !== null && _summary$pix !== void 0 ? _summary$pix : 0)
									})]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border p-4 space-y-3",
					style: {
						background: V2.LIGHT_SURFACE,
						borderColor: V2.LIGHT_BORDER
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold",
							children: "Fechar caixa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Valor contado em dinheiro",
							type: "number",
							inputMode: "decimal",
							value: final,
							onChange: (e) => setFinal(e.target.value),
							className: "h-11"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: fechar,
							className: "w-full h-12 font-semibold",
							style: {
								background: V2.TEAL,
								color: "#fff"
							},
							children: "Fechar caixa"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { PosCaixa as component };
