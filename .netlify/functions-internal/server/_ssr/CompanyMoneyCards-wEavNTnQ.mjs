import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { a as formatDate, i as brl } from "./pdf-CsVsL9dt.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { K as PiggyBank, in as Building2 } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-TZjTs9D2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CompanyMoneyCards-wEavNTnQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var dayOf = (v) => v ? String(v).slice(0, 10) : "";
/**
* Dinheiro que pertence à EMPRESA por já ter sido provisionado num acerto:
* - `aTransferir`: parcelas de vendas já acertadas que CAÍRAM em caixa depois do acerto.
* - `jaReservado`: parcelas de vendas já acertadas que ainda estão a vencer.
*/
function useCompanyMoney() {
	return useQuery({
		queryKey: ["company-money"],
		queryFn: async () => {
			var _fechRes$data, _txRes$data;
			const [fechRes, txRes] = await Promise.all([supabase.from("fechamentos").select("id,created_at,periodo_to").order("created_at", { ascending: false }).limit(200), supabase.from("financial_transactions").select("id,order_id,valor,status,vencimento,pagamento,descricao,parcela_num,parcelas_total,orders!inner(id,fechamento_id,companies(trade_name,legal_name))").eq("tipo", "RECEITA").not("orders.fechamento_id", "is", null).limit(2e3)]);
			if (fechRes.error) throw fechRes.error;
			if (txRes.error) throw txRes.error;
			const acertoPorId = /* @__PURE__ */ new Map();
			for (const f of (_fechRes$data = fechRes.data) !== null && _fechRes$data !== void 0 ? _fechRes$data : []) acertoPorId.set(f.id, dayOf(f.created_at));
			const aTransferir = [];
			const jaReservado = [];
			for (const raw of (_txRes$data = txRes.data) !== null && _txRes$data !== void 0 ? _txRes$data : []) {
				var _acertoPorId$get, _ord$companies, _ord$companies2;
				const ord = raw.orders;
				if (!(ord === null || ord === void 0 ? void 0 : ord.fechamento_id)) continue;
				const acertoEm = (_acertoPorId$get = acertoPorId.get(ord.fechamento_id)) !== null && _acertoPorId$get !== void 0 ? _acertoPorId$get : null;
				const cliente = ((_ord$companies = ord.companies) === null || _ord$companies === void 0 ? void 0 : _ord$companies.trade_name) || ((_ord$companies2 = ord.companies) === null || _ord$companies2 === void 0 ? void 0 : _ord$companies2.legal_name) || "Cliente";
				const row = {
					id: raw.id,
					order_id: raw.order_id,
					valor: Number(raw.valor || 0),
					status: raw.status,
					vencimento: raw.vencimento,
					pagamento: raw.pagamento,
					descricao: raw.descricao,
					parcela_num: raw.parcela_num,
					parcelas_total: raw.parcelas_total,
					cliente,
					codigo: orderCodeHash(ord.id, cliente),
					acerto_em: acertoEm
				};
				if (row.status === "ESTORNADO" || row.status === "CANCELADO") continue;
				if (row.status === "PAGO") {
					if (acertoEm && dayOf(row.pagamento) > acertoEm) aTransferir.push(row);
				} else jaReservado.push(row);
			}
			const byDate = (a, b) => {
				var _a$vencimento, _b$vencimento;
				return String((_a$vencimento = a.vencimento) !== null && _a$vencimento !== void 0 ? _a$vencimento : "").localeCompare(String((_b$vencimento = b.vencimento) !== null && _b$vencimento !== void 0 ? _b$vencimento : ""));
			};
			aTransferir.sort(byDate);
			jaReservado.sort(byDate);
			const sum = (arr) => arr.reduce((s, r) => s + r.valor, 0);
			return {
				rowsTransferir: aTransferir,
				rowsReservado: jaReservado,
				totalTransferir: sum(aTransferir),
				totalReservado: sum(jaReservado)
			};
		}
	});
}
function MoneyCard({ label, value, sub, icon: Icon, accent, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: "rounded-2xl border p-4 text-left transition hover:shadow-sm w-full",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs",
						style: { color: V2.MUTED },
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xl font-semibold mt-1",
						style: { color: accent },
						children: value
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] mt-1",
						style: { color: V2.MUTED },
						children: sub
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-xl p-2 shrink-0",
				style: {
					background: `${accent}1a`,
					color: accent
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			})]
		})
	});
}
function RowsDialog({ open, onOpenChange, title, rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: title }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[60vh] overflow-auto -mx-2 px-2",
				children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-sm py-8 text-center",
					style: { color: V2.MUTED },
					children: "Nenhuma parcela nesta situação."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border p-3 flex items-center justify-between gap-3",
						style: { borderColor: V2.GRAPHITE },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm font-medium truncate",
								style: { color: V2.TEXT },
								children: [
									r.codigo,
									" · ",
									r.cliente
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px]",
								style: { color: V2.MUTED },
								children: [
									r.parcela_num && r.parcelas_total ? `Parcela ${r.parcela_num}/${r.parcelas_total} · ` : "",
									r.status === "PAGO" ? `Recebido em ${formatDate(r.pagamento)}` : `Vence em ${formatDate(r.vencimento)}`,
									r.acerto_em ? ` · acerto de ${formatDate(r.acerto_em)}` : ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold shrink-0",
							style: { color: V2.TEXT },
							children: brl(r.valor)
						})]
					}, r.id))
				})
			})]
		})
	});
}
/** Cards do dinheiro da empresa vindo de parcelas de vendas já acertadas. */
function CompanyMoneyCards({ compact = false }) {
	var _data$rowsTransferir, _data$rowsReservado, _data$totalTransferir, _data$totalReservado;
	const { data } = useCompanyMoney();
	const [openTransferir, setOpenTransferir] = (0, import_react.useState)(false);
	const [openReservado, setOpenReservado] = (0, import_react.useState)(false);
	const rowsTransferir = (_data$rowsTransferir = data === null || data === void 0 ? void 0 : data.rowsTransferir) !== null && _data$rowsTransferir !== void 0 ? _data$rowsTransferir : [];
	const rowsReservado = (_data$rowsReservado = data === null || data === void 0 ? void 0 : data.rowsReservado) !== null && _data$rowsReservado !== void 0 ? _data$rowsReservado : [];
	const totalTransferir = (_data$totalTransferir = data === null || data === void 0 ? void 0 : data.totalTransferir) !== null && _data$totalTransferir !== void 0 ? _data$totalTransferir : 0;
	const totalReservado = (_data$totalReservado = data === null || data === void 0 ? void 0 : data.totalReservado) !== null && _data$totalReservado !== void 0 ? _data$totalReservado : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: compact ? "" : "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyCard, {
					label: "A transferir para a conta da empresa",
					value: brl(totalTransferir),
					sub: `${rowsTransferir.length} parcela(s) já recebida(s) após o acerto · clique para ver`,
					icon: Building2,
					accent: "#0ea5e9",
					onClick: () => setOpenTransferir(true)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoneyCard, {
					label: "Já reservado (a vencer)",
					value: brl(totalReservado),
					sub: `${rowsReservado.length} parcela(s) de vendas já acertadas · clique para ver`,
					icon: PiggyBank,
					accent: "#f59e0b",
					onClick: () => setOpenReservado(true)
				})]
			}),
			!compact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] mt-2 px-1",
				style: { color: V2.MUTED },
				children: "Esses valores já tiveram o lucro retirado em acertos anteriores — quando entrarem, pertencem 100% à empresa (custo das peças + reserva de reinvestimento)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsDialog, {
				open: openTransferir,
				onOpenChange: setOpenTransferir,
				title: `A transferir para a empresa — ${brl(totalTransferir)}`,
				rows: rowsTransferir
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RowsDialog, {
				open: openReservado,
				onOpenChange: setOpenReservado,
				title: `Já reservado (a vencer) — ${brl(totalReservado)}`,
				rows: rowsReservado
			})
		]
	});
}
//#endregion
export { CompanyMoneyCards as t };
