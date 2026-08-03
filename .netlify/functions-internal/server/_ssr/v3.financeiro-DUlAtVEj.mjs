import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { n as orderCodeHash } from "./order-code-C-NI66BU.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { Et as Funnel, G as Plus, Lt as CreditCard, N as Search, U as QrCode, _ as Trash2, _n as ArrowDownRight, dn as ArrowUpRight, g as TrendingDown, gt as Landmark, h as TrendingUp, hn as ArrowLeftRight, ln as Banknote } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { i as useDeleteBankAccount, n as useCreateBankAccount, r as useCreateBankTransfer, t as useBankAccounts } from "./use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DGeprr3K.mjs";
import { t as Badge } from "./badge-CnQ0tQ74.mjs";
import { t as CompanyMoneyCards } from "./CompanyMoneyCards-wEavNTnQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.financeiro-DUlAtVEj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STATUS_COLORS = {
	PAGO: "bg-emerald-100 text-emerald-700 border-emerald-200",
	PENDENTE: "bg-amber-100 text-amber-700 border-amber-200",
	ATRASADO: "bg-rose-100 text-rose-700 border-rose-200",
	PARCIAL: "bg-blue-100 text-blue-700 border-blue-200",
	CANCELADO: "bg-slate-100 text-slate-500 border-slate-200",
	ESTORNADO: "bg-slate-100 text-slate-500 border-slate-200"
};
function brl(v) {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL"
	}).format(v || 0);
}
function fmtData(d) {
	if (!d) return "—";
	const [y, m, day] = d.split("-");
	return `${day}/${m}/${y.slice(2)}`;
}
function periodRange(p) {
	const now = /* @__PURE__ */ new Date();
	const iso = (d) => d.toISOString().slice(0, 10);
	if (p === "hoje") return {
		from: iso(now),
		to: iso(now),
		label: "Hoje"
	};
	if (p === "7d") {
		const f = new Date(now);
		f.setDate(f.getDate() - 6);
		return {
			from: iso(f),
			to: iso(now),
			label: "Últimos 7 dias"
		};
	}
	if (p === "90d") {
		const f = new Date(now);
		f.setDate(f.getDate() - 89);
		return {
			from: iso(f),
			to: iso(now),
			label: "Últimos 90 dias"
		};
	}
	if (p === "mes_ant") {
		const f = new Date(now.getFullYear(), now.getMonth() - 1, 1);
		const t = new Date(now.getFullYear(), now.getMonth(), 0);
		return {
			from: iso(f),
			to: iso(t),
			label: "Mês anterior"
		};
	}
	if (p === "tudo") return {
		from: "0000-01-01",
		to: "9999-12-31",
		label: "Todos os períodos"
	};
	if (p.startsWith("m:")) {
		const [y, m] = p.slice(2).split("-").map(Number);
		const f = new Date(y, m - 1, 1);
		const t = new Date(y, m, 0);
		return {
			from: iso(f),
			to: iso(t),
			label: `${[
				"Jan",
				"Fev",
				"Mar",
				"Abr",
				"Mai",
				"Jun",
				"Jul",
				"Ago",
				"Set",
				"Out",
				"Nov",
				"Dez"
			][m - 1]}/${y}`
		};
	}
	return {
		from: iso(new Date(now.getFullYear(), now.getMonth(), 1)),
		to: iso(now),
		label: "Este mês"
	};
}
function monthOptions() {
	const nomes = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro"
	];
	const now = /* @__PURE__ */ new Date();
	const opts = [];
	for (let i = 2; i < 14; i++) {
		const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
		opts.push({
			value: `m:${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
			label: `${nomes[d.getMonth()]} ${d.getFullYear()}`
		});
	}
	return opts;
}
function FinancePage() {
	var _kpis$a_receber, _kpis$a_receber_venci, _kpis$a_pagar_total, _kpis$a_pagar_total_v, _kpis$contas_pagar, _kpis$custo_pecas_per, _kpis$despesas_viagem;
	const qc = useQueryClient();
	const [period, setPeriod] = (0, import_react.useState)("mes");
	const [accountFilter, setAccountFilter] = (0, import_react.useState)("all");
	const [search, setSearch] = (0, import_react.useState)("");
	const [receiveTx, setReceiveTx] = (0, import_react.useState)(null);
	const [receiveAccount, setReceiveAccount] = (0, import_react.useState)("");
	const [receiveValor, setReceiveValor] = (0, import_react.useState)("");
	const [receiveData, setReceiveData] = (0, import_react.useState)((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
	const [restoVenc, setRestoVenc] = (0, import_react.useState)("");
	const [entry, setEntry] = (0, import_react.useState)({
		descricao: "",
		valor: "",
		tipo: "DESPESA",
		account_id: "",
		agendar: false,
		vencimento: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
	});
	const [entryOpen, setEntryOpen] = (0, import_react.useState)(false);
	const [pecasOpen, setPecasOpen] = (0, import_react.useState)(false);
	const [savedInfo, setSavedInfo] = (0, import_react.useState)(null);
	const [adjustAcc, setAdjustAcc] = (0, import_react.useState)(null);
	const [adjustValue, setAdjustValue] = (0, import_react.useState)("");
	const range = periodRange(period);
	const { data: accounts = [] } = useBankAccounts();
	const { data: txs = [] } = useQuery({
		queryKey: ["fin-tx"],
		queryFn: async () => {
			const { data } = await supabase.from("financial_transactions").select("*, companies(legal_name, trade_name), bank_accounts(nome, cor)").order("created_at", { ascending: false }).limit(1e3);
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: entries = [] } = useQuery({
		queryKey: ["fin-entries"],
		queryFn: async () => {
			const { data } = await supabase.from("financial_entries").select("*, bank_accounts(nome, cor)").order("data", { ascending: false }).limit(1e3);
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: tripExpenses = [] } = useQuery({
		queryKey: ["fin-trip-expenses"],
		queryFn: async () => {
			const { data } = await supabase.from("trip_expenses").select("id, valor, data, categoria, descricao, bank_accounts(nome, cor), trips(cidade, estado, nome)").order("data", { ascending: false }).limit(2e3);
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: orderDetails = [] } = useQuery({
		queryKey: [
			"fin-order-costs",
			range.from,
			range.to
		],
		queryFn: async () => {
			const { data } = await supabase.from("orders").select("id, total, created_at, order_items(quantidade, preco_unitario, custo_unitario, products(sku, nome))").gte("created_at", range.from + "T00:00:00").lte("created_at", range.to + "T23:59:59").neq("status", "CANCELADO").order("created_at", { ascending: false });
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const { data: kpis } = useQuery({
		queryKey: [
			"fin-kpis",
			range.from,
			range.to
		],
		queryFn: async () => {
			var _data$;
			const { data, error } = await supabase.rpc("finance_kpis", {
				_from: range.from,
				_to: range.to
			});
			if (error) throw error;
			return (_data$ = data === null || data === void 0 ? void 0 : data[0]) !== null && _data$ !== void 0 ? _data$ : null;
		}
	});
	const { data: cutoff } = useQuery({
		queryKey: ["extrato-cutoff"],
		queryFn: async () => {
			const { data } = await supabase.from("system_settings").select("valor").eq("chave", "extrato_cutoff_date").maybeSingle();
			const v = data === null || data === void 0 ? void 0 : data.valor;
			if (!v) return "0000-01-01";
			return typeof v === "string" ? v : String(v).replace(/"/g, "");
		}
	});
	const cutoffDate = cutoff !== null && cutoff !== void 0 ? cutoff : "0000-01-01";
	const saldoTotal = accounts.filter((a) => a.incluir_saldo_total === true).reduce((s, a) => s + a.saldo, 0);
	Number((_kpis$a_receber = kpis === null || kpis === void 0 ? void 0 : kpis.a_receber) !== null && _kpis$a_receber !== void 0 ? _kpis$a_receber : 0);
	Number((_kpis$a_receber_venci = kpis === null || kpis === void 0 ? void 0 : kpis.a_receber_vencidas) !== null && _kpis$a_receber_venci !== void 0 ? _kpis$a_receber_venci : 0);
	Number((_kpis$a_pagar_total = kpis === null || kpis === void 0 ? void 0 : kpis.a_pagar_total) !== null && _kpis$a_pagar_total !== void 0 ? _kpis$a_pagar_total : 0);
	Number((_kpis$a_pagar_total_v = kpis === null || kpis === void 0 ? void 0 : kpis.a_pagar_total_vencidas) !== null && _kpis$a_pagar_total_v !== void 0 ? _kpis$a_pagar_total_v : 0);
	const { vendidoPeriodo, vendidoQtd, vendasPorForma, totalTaxas } = (0, import_react.useMemo)(() => {
		const base = txs.filter((t) => t.tipo === "RECEITA" && t.status !== "CANCELADO" && t.status !== "ESTORNADO").filter((t) => {
			const d = t.pagamento || (t.created_at || "").slice(0, 10);
			return d >= range.from && d <= range.to;
		});
		const bruto = (t) => {
			var _ref, _t$valor_bruto;
			return Number((_ref = (_t$valor_bruto = t.valor_bruto) !== null && _t$valor_bruto !== void 0 ? _t$valor_bruto : t.valor) !== null && _ref !== void 0 ? _ref : 0);
		};
		const norm = (f) => String(f || "").toUpperCase();
		const sumBy = (pred) => base.filter((t) => pred(norm(t.forma_pagamento))).reduce((s, t) => s + bruto(t), 0);
		const qtdBy = (pred) => base.filter((t) => pred(norm(t.forma_pagamento))).length;
		return {
			vendidoPeriodo: base.reduce((s, t) => s + bruto(t), 0),
			vendidoQtd: base.length,
			totalTaxas: base.reduce((s, t) => {
				var _t$taxas;
				return s + Number((_t$taxas = t.taxas) !== null && _t$taxas !== void 0 ? _t$taxas : 0);
			}, 0),
			vendasPorForma: {
				dinheiro: sumBy((f) => f === "DINHEIRO"),
				dinheiroQtd: qtdBy((f) => f === "DINHEIRO"),
				pix: sumBy((f) => f === "PIX"),
				pixQtd: qtdBy((f) => f === "PIX"),
				cartao: sumBy((f) => f.startsWith("CART")),
				cartaoQtd: qtdBy((f) => f.startsWith("CART"))
			}
		};
	}, [
		txs,
		range.from,
		range.to
	]);
	const extrato = (0, import_react.useMemo)(() => {
		const rows = [];
		for (const t of txs) {
			var _t$companies, _t$companies2, _t$descricao, _t$bank_accounts, _t$bank_accounts2;
			if (t.status !== "PAGO") continue;
			const data = t.pagamento || (t.created_at || "").slice(0, 10);
			const cliente = ((_t$companies = t.companies) === null || _t$companies === void 0 ? void 0 : _t$companies.trade_name) || ((_t$companies2 = t.companies) === null || _t$companies2 === void 0 ? void 0 : _t$companies2.legal_name) || t.descricao || "Venda";
			rows.push({
				id: `t-${t.id}`,
				data,
				descricao: t.tipo === "RECEITA" ? `Recebimento — ${cliente}` : t.descricao || "Pagamento",
				categoria: t.tipo === "RECEITA" ? "Vendas" : ((_t$descricao = t.descricao) === null || _t$descricao === void 0 ? void 0 : _t$descricao.split(" ")[0]) || "Diversos",
				tipo: t.tipo,
				valor: Number(t.valor),
				origem: "Venda",
				conta: (_t$bank_accounts = t.bank_accounts) === null || _t$bank_accounts === void 0 ? void 0 : _t$bank_accounts.nome,
				contaCor: (_t$bank_accounts2 = t.bank_accounts) === null || _t$bank_accounts2 === void 0 ? void 0 : _t$bank_accounts2.cor,
				doc: t.order_id ? orderCodeHash(String(t.order_id), cliente) : t.forma_pagamento || ""
			});
		}
		for (const e of entries) {
			var _e$bank_accounts, _e$bank_accounts2;
			rows.push({
				id: `e-${e.id}`,
				data: e.data,
				descricao: e.descricao,
				categoria: "Manual",
				tipo: e.tipo,
				valor: Number(e.valor),
				origem: "Manual",
				conta: (_e$bank_accounts = e.bank_accounts) === null || _e$bank_accounts === void 0 ? void 0 : _e$bank_accounts.nome,
				contaCor: (_e$bank_accounts2 = e.bank_accounts) === null || _e$bank_accounts2 === void 0 ? void 0 : _e$bank_accounts2.cor
			});
		}
		const viagemMap = /* @__PURE__ */ new Map();
		for (const v of tripExpenses) {
			var _v$trips, _viagemMap$get, _v$bank_accounts, _v$bank_accounts2, _v$bank_accounts3;
			const t = (_v$trips = v.trips) !== null && _v$trips !== void 0 ? _v$trips : {};
			const tripKey = t.id || t.nome || "sem-viagem";
			const local = t.cidade ? `${t.cidade}${t.estado ? "-" + t.estado : ""}` : t.nome || "Viagem";
			const cur = (_viagemMap$get = viagemMap.get(tripKey)) !== null && _viagemMap$get !== void 0 ? _viagemMap$get : {
				key: tripKey,
				local,
				total: 0,
				ultima: v.data,
				conta: (_v$bank_accounts = v.bank_accounts) === null || _v$bank_accounts === void 0 ? void 0 : _v$bank_accounts.nome,
				contaCor: (_v$bank_accounts2 = v.bank_accounts) === null || _v$bank_accounts2 === void 0 ? void 0 : _v$bank_accounts2.cor
			};
			cur.total += Number(v.valor || 0);
			if ((v.data || "") > (cur.ultima || "")) cur.ultima = v.data;
			if (!cur.conta && ((_v$bank_accounts3 = v.bank_accounts) === null || _v$bank_accounts3 === void 0 ? void 0 : _v$bank_accounts3.nome)) {
				cur.conta = v.bank_accounts.nome;
				cur.contaCor = v.bank_accounts.cor;
			}
			viagemMap.set(tripKey, cur);
		}
		for (const g of viagemMap.values()) rows.push({
			id: `v-${g.key}`,
			data: g.ultima,
			descricao: `Despesa viagem ${g.local}`,
			categoria: "Viagem",
			tipo: "DESPESA",
			valor: g.total,
			origem: "Viagem",
			conta: g.conta,
			contaCor: g.contaCor
		});
		return rows;
	}, [
		txs,
		entries,
		tripExpenses
	]);
	const extratoFiltrado = (0, import_react.useMemo)(() => {
		const q = search.trim().toLowerCase();
		const asc = [...extrato.filter((r) => {
			if (r.data < cutoffDate) return false;
			if (r.data < range.from || r.data > range.to) return false;
			if (accountFilter !== "all") {
				const acc = accounts.find((a) => a.id === accountFilter);
				if (!acc || r.conta !== acc.nome) return false;
			}
			if (q && !`${r.descricao} ${r.categoria} ${r.conta || ""} ${r.doc || ""}`.toLowerCase().includes(q)) return false;
			return true;
		})].sort((a, b) => (a.data || "").localeCompare(b.data || "") || a.id.localeCompare(b.id));
		let acc = 0;
		return asc.map((r) => {
			acc += r.tipo === "RECEITA" ? r.valor : -r.valor;
			return _objectSpread2(_objectSpread2({}, r), {}, { saldo: acc });
		}).reverse();
	}, [
		extrato,
		range.from,
		range.to,
		accountFilter,
		accounts,
		search,
		cutoffDate
	]);
	const totalReceita = extratoFiltrado.reduce((s, r) => s + (r.tipo === "RECEITA" ? r.valor : 0), 0);
	const totalDespesa = extratoFiltrado.reduce((s, r) => s + (r.tipo === "DESPESA" ? r.valor : 0), 0);
	const resultadoPeriodo = totalReceita - totalDespesa;
	const totalContasPagar = Number((_kpis$contas_pagar = kpis === null || kpis === void 0 ? void 0 : kpis.contas_pagar) !== null && _kpis$contas_pagar !== void 0 ? _kpis$contas_pagar : 0);
	const totalCustoPecas = Number((_kpis$custo_pecas_per = kpis === null || kpis === void 0 ? void 0 : kpis.custo_pecas_periodo) !== null && _kpis$custo_pecas_per !== void 0 ? _kpis$custo_pecas_per : 0);
	const despesaViagemPeriodo = Number((_kpis$despesas_viagem = kpis === null || kpis === void 0 ? void 0 : kpis.despesas_viagem_periodo) !== null && _kpis$despesas_viagem !== void 0 ? _kpis$despesas_viagem : 0);
	const despesasPagasPeriodo = (0, import_react.useMemo)(() => {
		return entries.filter((e) => e.tipo === "DESPESA" && (e.data || "") >= range.from && (e.data || "") <= range.to).filter((e) => !String(e.descricao || "").toLowerCase().includes("ajuste de saldo")).reduce((s, e) => s + Number(e.valor || 0), 0);
	}, [
		entries,
		range.from,
		range.to
	]);
	const resultadoLiquido = vendidoPeriodo - totalContasPagar - totalCustoPecas - despesaViagemPeriodo - despesasPagasPeriodo;
	const addEntry = useMutation({
		mutationFn: async () => {
			if (!entry.descricao) throw new Error("Informe a descrição");
			if (!entry.valor || Number(entry.valor) <= 0) throw new Error("Informe o valor");
			if (entry.agendar) {
				const { error } = await supabase.from("financial_transactions").insert({
					descricao: entry.descricao,
					valor: Number(entry.valor),
					tipo: entry.tipo,
					status: "PENDENTE",
					vencimento: entry.vencimento,
					forma_pagamento: "OUTRO"
				});
				if (error) throw error;
			} else {
				if (!entry.account_id) throw new Error("Escolha a conta bancária");
				const { error } = await supabase.from("financial_entries").insert({
					descricao: entry.descricao,
					valor: Number(entry.valor),
					tipo: entry.tipo,
					data: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					account_id: entry.account_id
				});
				if (error) throw error;
			}
		},
		onSuccess: () => {
			var _accounts$find;
			const contaNome = (_accounts$find = accounts.find((a) => a.id === entry.account_id)) === null || _accounts$find === void 0 ? void 0 : _accounts$find.nome;
			setSavedInfo({
				tipo: entry.tipo,
				valor: Number(entry.valor),
				descricao: entry.descricao,
				agendou: entry.agendar,
				conta: contaNome
			});
			toast.success(entry.agendar ? "Conta agendada" : "Lançamento registrado");
			setEntry({
				descricao: "",
				valor: "",
				tipo: "DESPESA",
				account_id: "",
				agendar: false,
				vencimento: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
			});
			setEntryOpen(false);
			qc.invalidateQueries({ queryKey: ["fin-entries"] });
			qc.invalidateQueries({ queryKey: ["fin-tx"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
			qc.invalidateQueries({ queryKey: ["fin-kpis"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const adjustBalance = useMutation({
		mutationFn: async () => {
			if (!adjustAcc) throw new Error("Conta não selecionada");
			const alvo = Number(adjustValue);
			if (Number.isNaN(alvo)) throw new Error("Informe o saldo real (número)");
			const diff = alvo - Number(adjustAcc.saldo || 0);
			if (Math.abs(diff) < .005) return;
			const tipo = diff > 0 ? "RECEITA" : "DESPESA";
			const { error } = await supabase.from("financial_entries").insert({
				descricao: `Ajuste de saldo — ${adjustAcc.nome}`,
				valor: Math.abs(diff),
				tipo,
				data: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				account_id: adjustAcc.id
			});
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Saldo ajustado");
			setAdjustAcc(null);
			setAdjustValue("");
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
			qc.invalidateQueries({ queryKey: ["fin-entries"] });
		},
		onError: (e) => toast.error(e.message)
	});
	const confirmReceive = useMutation({
		mutationFn: async () => {
			var _receiveTx$row$descri, _receiveTx$row, _receiveTx$row2;
			if (!receiveTx || !receiveAccount) throw new Error("Escolha a conta que recebeu");
			const total = Number(receiveTx.valor);
			const recebido = Number(String(receiveValor).replace(",", ".")) || 0;
			if (recebido <= 0) throw new Error("Informe o valor recebido");
			if (recebido > total + .005) throw new Error("Valor recebido maior que o saldo devedor");
			const resto = Math.round((total - recebido) * 100) / 100;
			const parcial = resto > .004;
			if (parcial && !restoVenc) throw new Error("Informe a nova data de vencimento da diferença");
			const { error } = await supabase.from("financial_transactions").update({
				status: "PAGO",
				pagamento: receiveData,
				account_id: receiveAccount,
				valor: recebido,
				descricao: parcial ? `${(_receiveTx$row$descri = (_receiveTx$row = receiveTx.row) === null || _receiveTx$row === void 0 ? void 0 : _receiveTx$row.descricao) !== null && _receiveTx$row$descri !== void 0 ? _receiveTx$row$descri : ""} [Recebimento parcial ${brl(recebido)} de ${brl(total)}]` : (_receiveTx$row2 = receiveTx.row) === null || _receiveTx$row2 === void 0 ? void 0 : _receiveTx$row2.descricao
			}).eq("id", receiveTx.id);
			if (error) throw error;
			if (parcial) {
				var _receiveTx$row3, _r$order_id, _r$company_id, _r$descricao, _r$forma_pagamento;
				const r = (_receiveTx$row3 = receiveTx.row) !== null && _receiveTx$row3 !== void 0 ? _receiveTx$row3 : {};
				const { error: iErr } = await supabase.from("financial_transactions").insert({
					order_id: (_r$order_id = r.order_id) !== null && _r$order_id !== void 0 ? _r$order_id : null,
					company_id: (_r$company_id = r.company_id) !== null && _r$company_id !== void 0 ? _r$company_id : null,
					tipo: "RECEITA",
					status: "PENDENTE",
					valor: resto,
					valor_bruto: resto,
					vencimento: restoVenc,
					pagamento: null,
					descricao: `${(_r$descricao = r.descricao) !== null && _r$descricao !== void 0 ? _r$descricao : "Recebimento"} — saldo restante`,
					forma_pagamento: (_r$forma_pagamento = r.forma_pagamento) !== null && _r$forma_pagamento !== void 0 ? _r$forma_pagamento : "OUTRO",
					parcelas: 1,
					parcela_num: 1,
					parcelas_total: 1,
					account_id: receiveAccount
				});
				if (iErr) throw iErr;
			}
			return {
				parcial,
				resto
			};
		},
		onSuccess: (res) => {
			toast.success((res === null || res === void 0 ? void 0 : res.parcial) ? `Recebimento parcial registrado — restam ${brl(res.resto)}` : "Recebimento confirmado");
			setReceiveTx(null);
			setReceiveAccount("");
			setReceiveValor("");
			setRestoVenc("");
			qc.invalidateQueries({ queryKey: ["fin-tx"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Financeiro",
		eyebrow: "Minha conta",
		description: "Controle bancário, extrato e recebimentos",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Em dinheiro",
						value: brl(vendasPorForma.dinheiro),
						icon: Banknote,
						accent: "#16a34a",
						sub: `${vendasPorForma.dinheiroQtd} venda${vendasPorForma.dinheiroQtd === 1 ? "" : "s"} no período`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Em PIX",
						value: brl(vendasPorForma.pix),
						icon: QrCode,
						accent: "#0ea5e9",
						sub: `${vendasPorForma.pixQtd} venda${vendasPorForma.pixQtd === 1 ? "" : "s"} no período`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Em cartão (bruto)",
						value: brl(vendasPorForma.cartao),
						icon: CreditCard,
						accent: "#8b5cf6",
						sub: `${vendasPorForma.cartaoQtd} venda${vendasPorForma.cartaoQtd === 1 ? "" : "s"} · valor cheio antes da taxa`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: `Vendi — ${range.label.toLowerCase()}`,
						value: brl(vendidoPeriodo),
						icon: TrendingUp,
						accent: "#0d7377",
						sub: `${vendidoQtd} venda${vendidoQtd === 1 ? "" : "s"} · bruto (dinheiro + PIX + cartão)`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "(−) Taxas de cartão",
						value: brl(totalTaxas),
						icon: ArrowDownRight,
						accent: "#f97316",
						sub: "Ton — debitado das parcelas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Contas a pagar",
						value: brl(totalContasPagar),
						icon: ArrowDownRight,
						accent: "#ef4444",
						sub: "Despesas em aberto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: `Despesa de viagem — ${range.label.toLowerCase()}`,
						value: brl(despesaViagemPeriodo),
						icon: TrendingDown,
						accent: "#f59e0b",
						sub: "Gastos das viagens no período"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: "Custo peças",
						value: brl(totalCustoPecas),
						icon: QrCode,
						accent: "#f59e0b",
						sub: "CMV em aberto · clique para detalhes",
						onClick: () => setPecasOpen(true)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
						label: `Despesas pagas — ${range.label.toLowerCase()}`,
						value: brl(despesasPagasPeriodo),
						icon: ArrowDownRight,
						accent: "#dc2626",
						sub: "Lançamentos manuais quitados no período"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
					label: `Resultado — ${range.label.toLowerCase()}`,
					value: brl(resultadoLiquido - totalTaxas),
					icon: TrendingUp,
					accent: resultadoLiquido - totalTaxas >= 0 ? "#16a34a" : "#ef4444",
					sub: "Vendi bruto − taxas − pagar − peças − viagem − despesas pagas"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyMoneyCards, {}),
			accounts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-3 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-2 mb-2 px-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-wider text-slate-500 font-semibold",
						children: "Saldo por conta"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-slate-500 tabular-nums",
						children: ["Total ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `font-bold ${saldoTotal >= 0 ? "text-slate-900" : "text-rose-600"}`,
							children: brl(saldoTotal)
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2",
					children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-slate-200 p-2.5 bg-gradient-to-br from-white to-slate-50/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mb-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "w-2 h-2 rounded-full shrink-0",
										style: { background: a.cor }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] font-semibold text-slate-700 truncate flex-1",
										children: a.nome
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setAdjustAcc(a);
											setAdjustValue(String(a.saldo.toFixed(2)));
										},
										className: "text-[10px] text-teal-700 hover:underline font-semibold shrink-0",
										title: "Ajustar saldo para o valor real do banco",
										children: "Ajustar"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: `text-base font-bold tabular-nums ${a.saldo >= 0 ? "text-slate-900" : "text-rose-600"}`,
								children: brl(a.saldo)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 mt-0.5 text-[10px] tabular-nums",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-emerald-600",
									children: ["↑ ", brl(a.entradas)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-rose-600",
									children: ["↓ ", brl(a.saidas)]
								})]
							})
						]
					}, a.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustoPecasDialog, {
				open: pecasOpen,
				onOpenChange: setPecasOpen,
				orders: orderDetails,
				rangeLabel: range.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "extrato",
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 mb-3 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
							className: "bg-white border border-slate-200 h-9",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "extrato",
									className: "text-xs",
									children: "Extrato"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "pagar",
									className: "text-xs",
									children: "Contas a pagar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "receber",
									className: "text-xs",
									children: "Contas a receber"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "pecas",
									className: "text-xs",
									children: "Custo peças"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "contas",
									className: "text-xs",
									children: "Contas"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: period,
									onValueChange: (v) => setPeriod(v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-9 w-40 text-xs bg-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "hoje",
											children: "Hoje"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "7d",
											children: "Últimos 7 dias"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "mes",
											children: "Este mês"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "mes_ant",
											children: "Mês anterior"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "90d",
											children: "Últimos 90 dias"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "tudo",
											children: "Todos"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "px-2 pt-2 pb-1 text-[10px] uppercase tracking-wider text-slate-400 font-semibold",
											children: "Meses anteriores"
										}),
										monthOptions().map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: m.value,
											children: m.label
										}, m.value))
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
									value: accountFilter,
									onValueChange: setAccountFilter,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
										className: "h-9 w-40 text-xs bg-white",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: "all",
										children: "Todas as contas"
									}), accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
										value: a.id,
										children: a.nome
									}, a.id))] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
									open: entryOpen,
									onOpenChange: setEntryOpen,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											className: "h-9",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5 mr-1" }), " Lançar"]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Novo lançamento" }) }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setEntry(_objectSpread2(_objectSpread2({}, entry), {}, { agendar: false })),
														className: `flex-1 rounded-lg border px-3 py-2 text-xs font-semibold ${!entry.agendar ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`,
														children: "Pago agora"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => setEntry(_objectSpread2(_objectSpread2({}, entry), {}, { agendar: true })),
														className: `flex-1 rounded-lg border px-3 py-2 text-xs font-semibold ${entry.agendar ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-600"}`,
														children: "Agendar (pagar depois)"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
													children: "Descrição"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													placeholder: "Ex.: Aluguel do escritório",
													value: entry.descricao,
													onChange: (e) => setEntry(_objectSpread2(_objectSpread2({}, entry), {}, { descricao: e.target.value })),
													className: "mt-1"
												})] }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid grid-cols-2 gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
														children: "Valor"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														type: "number",
														step: "0.01",
														placeholder: "0,00",
														value: entry.valor,
														onChange: (e) => setEntry(_objectSpread2(_objectSpread2({}, entry), {}, { valor: e.target.value })),
														className: "mt-1 tabular-nums"
													})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
														children: "Tipo"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
														value: entry.tipo,
														onValueChange: (v) => setEntry(_objectSpread2(_objectSpread2({}, entry), {}, { tipo: v })),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															className: "mt-1",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: "RECEITA",
															children: "Receita (entrada)"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
															value: "DESPESA",
															children: "Despesa (saída)"
														})] })]
													})] })]
												}),
												entry.agendar ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
														children: "Vencimento"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														type: "date",
														value: entry.vencimento,
														onChange: (e) => setEntry(_objectSpread2(_objectSpread2({}, entry), {}, { vencimento: e.target.value })),
														className: "mt-1"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-slate-500 mt-1",
														children: [
															"Vai aparecer na aba ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: entry.tipo === "DESPESA" ? "Contas a pagar" : "Contas a receber" }),
															". Você quita clicando em ",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Pagar" }),
															"/",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Receber" }),
															" lá."
														]
													})
												] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
														className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
														children: "Conta bancária"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
														value: entry.account_id,
														onChange: (v) => setEntry(_objectSpread2(_objectSpread2({}, entry), {}, { account_id: v })),
														accounts,
														className: "mt-1"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] text-slate-500 mt-1",
														children: [
															"O saldo desta conta será ",
															entry.tipo === "DESPESA" ? "debitado" : "creditado",
															" imediatamente."
														]
													})
												] })
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "outline",
											onClick: () => setEntryOpen(false),
											children: "Cancelar"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											disabled: addEntry.isPending,
											onClick: () => addEntry.mutate(),
											children: addEntry.isPending ? "Salvando…" : entry.agendar ? "Agendar" : "Registrar"
										})] })
									] })]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "extrato",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExtratoView, {
							rows: extratoFiltrado,
							search,
							onSearch: setSearch,
							totalReceita,
							totalDespesa,
							resultado: resultadoPeriodo,
							periodLabel: range.label
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "pagar",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContasPagarView, {
							txs,
							accounts,
							kind: "DESPESAS"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "receber",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContasReceberView, {
							txs,
							onOpenReceive: (t) => {
								var _t$companies3, _t$companies4;
								setReceiveTx({
									id: t.id,
									valor: Number(t.valor),
									label: ((_t$companies3 = t.companies) === null || _t$companies3 === void 0 ? void 0 : _t$companies3.trade_name) || ((_t$companies4 = t.companies) === null || _t$companies4 === void 0 ? void 0 : _t$companies4.legal_name) || t.descricao || "—",
									row: t
								});
								setReceiveAccount("");
								setReceiveValor(String(Number(t.valor).toFixed(2)));
								setReceiveData((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
								setRestoVenc(new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10));
							}
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "pecas",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContasPagarView, {
							txs,
							accounts,
							kind: "PECAS"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "contas",
						className: "mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankAccountsPanel, { accounts })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!receiveTx,
				onOpenChange: (o) => !o && setReceiveTx(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Confirmar recebimento" }) }),
					receiveTx && (() => {
						const recebido = Number(String(receiveValor).replace(",", ".")) || 0;
						const resto = Math.round((Number(receiveTx.valor) - recebido) * 100) / 100;
						const parcial = resto > .004;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-slate-50 border border-slate-200 p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500",
											children: "Cliente"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: receiveTx.label
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-slate-500 mt-2",
											children: "Saldo devedor"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-bold text-emerald-600 tabular-nums",
											children: brl(receiveTx.valor)
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
										children: "Valor recebido"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.01",
										min: "0",
										value: receiveValor,
										onChange: (e) => setReceiveValor(e.target.value),
										className: "mt-1"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
										children: "Data do recebimento"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: receiveData,
										onChange: (e) => setReceiveData(e.target.value),
										className: "mt-1"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										className: "h-7 text-xs",
										onClick: () => setReceiveValor(String(Number(receiveTx.valor).toFixed(2))),
										children: "Total"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										className: "h-7 text-xs",
										onClick: () => setReceiveValor((Number(receiveTx.valor) / 2).toFixed(2)),
										children: "50%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
									children: "Em qual conta caiu?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
									value: receiveAccount,
									onChange: setReceiveAccount,
									accounts,
									placeholder: "Selecione a conta bancária",
									className: "mt-1"
								})] }),
								parcial && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-amber-200 bg-amber-50 p-3 space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-amber-800",
										children: [
											"Recebimento parcial — resta ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
												className: "tabular-nums",
												children: brl(resto)
											}),
											" em aberto."
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-amber-700",
										children: "Novo vencimento da diferença"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "date",
										value: restoVenc,
										onChange: (e) => setRestoVenc(e.target.value),
										className: "mt-1 bg-white"
									})] })]
								})
							]
						});
					})(),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setReceiveTx(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !receiveAccount || confirmReceive.isPending,
						onClick: () => confirmReceive.mutate(),
						children: "Confirmar"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!savedInfo,
				onOpenChange: (o) => !o && setSavedInfo(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg",
								children: "✓"
							}), "Lançamento salvo"]
						}) }),
						savedInfo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-slate-200 bg-slate-50 p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[11px] uppercase tracking-wider text-slate-500 font-semibold",
										children: [
											savedInfo.tipo === "DESPESA" ? "Despesa" : "Receita",
											" ",
											savedInfo.agendou ? "agendada" : "quitada"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-slate-900 truncate",
										children: savedInfo.descricao
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-xl font-bold tabular-nums ${savedInfo.tipo === "DESPESA" ? "text-rose-600" : "text-emerald-600"}`,
										children: [savedInfo.tipo === "DESPESA" ? "− " : "+ ", brl(savedInfo.valor)]
									}),
									savedInfo.conta && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-slate-600",
										children: ["Conta: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: savedInfo.conta })]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500",
								children: savedInfo.agendou ? "Aparece na aba Contas a pagar/receber." : "Já foi debitado/creditado da conta e aparece no Extrato."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full bg-emerald-600 hover:bg-emerald-700",
							onClick: () => setSavedInfo(null),
							children: "OK"
						}) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!adjustAcc,
				onOpenChange: (o) => {
					if (!o) {
						setAdjustAcc(null);
						setAdjustValue("");
					}
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: ["Ajustar saldo real — ", adjustAcc === null || adjustAcc === void 0 ? void 0 : adjustAcc.nome] }) }),
						adjustAcc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-500",
									children: [
										"Saldo calculado hoje: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
											className: "tabular-nums",
											children: brl(adjustAcc.saldo)
										}),
										". Informe o saldo ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "real" }),
										" que aparece no seu banco — o sistema lança a diferença automaticamente."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
									children: "Saldo real do banco"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: "0.01",
									value: adjustValue,
									onChange: (e) => setAdjustValue(e.target.value),
									className: "mt-1 tabular-nums text-lg"
								})] }),
								adjustValue !== "" && !Number.isNaN(Number(adjustValue)) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs",
									children: [
										"Diferença que será lançada:",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", {
											className: `tabular-nums ${Number(adjustValue) - adjustAcc.saldo >= 0 ? "text-emerald-600" : "text-rose-600"}`,
											children: [Number(adjustValue) - adjustAcc.saldo >= 0 ? "+ " : "− ", brl(Math.abs(Number(adjustValue) - adjustAcc.saldo))]
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => {
								setAdjustAcc(null);
								setAdjustValue("");
							},
							children: "Cancelar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							disabled: adjustBalance.isPending || adjustValue === "",
							onClick: () => adjustBalance.mutate(),
							className: "bg-emerald-600 hover:bg-emerald-700",
							children: adjustBalance.isPending ? "Salvando…" : "Ajustar saldo"
						})] })
					]
				})
			})
		]
	});
}
function KpiCard({ label, value, icon: Icon, sub, accent = "#0d7377", onClick }) {
	const clickable = !!onClick;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: clickable ? "button" : void 0,
		tabIndex: clickable ? 0 : void 0,
		onClick,
		onKeyDown: clickable ? (e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onClick();
			}
		} : void 0,
		className: `rounded-2xl border border-slate-200 bg-white p-4 ${clickable ? "cursor-pointer hover:border-slate-300 transition" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 w-8 rounded-lg grid place-items-center shrink-0",
					style: {
						background: `${accent}22`,
						color: accent
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
						className: "h-4 w-4",
						strokeWidth: 2.4
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] uppercase tracking-wider text-slate-500 font-semibold truncate",
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xl font-bold tabular-nums text-slate-900",
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] mt-0.5 text-slate-500",
				children: sub
			})
		]
	});
}
function ExtratoView({ rows, search, onSearch, totalReceita, totalDespesa, resultado, periodLabel }) {
	const groups = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const r of rows) {
			var _map$get;
			const arr = (_map$get = map.get(r.data)) !== null && _map$get !== void 0 ? _map$get : [];
			arr.push(r);
			map.set(r.data, arr);
		}
		return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
	}, [rows]);
	const fmtDia = (d) => {
		if (!d) return "";
		const dt = /* @__PURE__ */ new Date(d + "T12:00:00");
		return `${[
			"Domingo",
			"Segunda",
			"Terça",
			"Quarta",
			"Quinta",
			"Sexta",
			"Sábado"
		][dt.getDay()]}, ${dt.getDate()} de ${[
			"jan",
			"fev",
			"mar",
			"abr",
			"mai",
			"jun",
			"jul",
			"ago",
			"set",
			"out",
			"nov",
			"dez"
		][dt.getMonth()]}`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-2xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold text-slate-900 tracking-tight",
					children: "Extrato bancário"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-slate-500 mt-0.5",
					children: [periodLabel, " · saldo acumulado do período"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full sm:w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						placeholder: "Buscar descrição, conta, documento…",
						value: search,
						onChange: (e) => onSearch(e.target.value),
						className: "h-9 pl-9 text-xs rounded-lg"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 border-b border-slate-100 bg-gradient-to-b from-slate-50/60 to-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-3.5 px-4 border-r border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-emerald-700 mb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wider font-semibold",
								children: "Entradas"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold text-emerald-600 tabular-nums leading-tight",
							children: brl(totalReceita)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-3.5 px-4 border-r border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-rose-700 mb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wider font-semibold",
								children: "Saídas"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg font-bold text-rose-600 tabular-nums leading-tight",
							children: brl(totalDespesa)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-3.5 px-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 text-slate-700 mb-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-3 h-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wider font-semibold",
								children: "Resultado"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-lg font-bold tabular-nums leading-tight ${resultado >= 0 ? "text-emerald-600" : "text-rose-600"}`,
							children: brl(resultado)
						})]
					})
				]
			}),
			rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-14 h-14 rounded-full bg-slate-50 mx-auto mb-3 grid place-items-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-6 h-6 text-slate-300" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-500 font-medium",
						children: "Nenhum lançamento no período"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-slate-400 mt-1",
						children: "Ajuste o filtro de período ou registre um lançamento"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-h-[640px] overflow-y-auto divide-y divide-slate-100",
				children: groups.map(([dia, itens]) => {
					const diaTotal = itens.reduce((s, r) => s + (r.tipo === "RECEITA" ? r.valor : -r.valor), 0);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 py-2 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between sticky top-0 z-10 backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 h-8 rounded-lg bg-white border border-slate-200 grid place-items-center text-[11px] font-bold text-slate-700 tabular-nums",
								children: dia.slice(8, 10)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-slate-800 leading-tight",
								children: fmtDia(dia)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-slate-500 tabular-nums leading-tight",
								children: [
									itens.length,
									" lançamento",
									itens.length === 1 ? "" : "s"
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: `text-xs font-bold tabular-nums ${diaTotal >= 0 ? "text-emerald-600" : "text-rose-600"}`,
							children: [
								diaTotal >= 0 ? "+" : "−",
								" ",
								brl(Math.abs(diaTotal))
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-slate-100",
						children: itens.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-5 py-3 flex items-center gap-3 hover:bg-slate-50/50 transition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `w-9 h-9 rounded-full grid place-items-center shrink-0 ${r.tipo === "RECEITA" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`,
									children: r.tipo === "RECEITA" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "w-4 h-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 flex-wrap",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-slate-900 truncate",
											children: r.descricao
										}), r.doc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-slate-400 tabular-nums font-mono",
											children: r.doc
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 flex-wrap",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "w-1.5 h-1.5 rounded-full",
													style: { background: r.contaCor || "#94a3b8" }
												}), r.conta || "—"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-0.5 h-0.5 rounded-full bg-slate-300" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium",
												children: r.categoria
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-sm font-bold tabular-nums ${r.tipo === "RECEITA" ? "text-emerald-600" : "text-rose-600"}`,
										children: [
											r.tipo === "RECEITA" ? "+" : "−",
											" ",
											brl(r.valor)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: `text-[10px] tabular-nums mt-0.5 ${r.saldo >= 0 ? "text-slate-400" : "text-rose-400"}`,
										children: ["saldo ", brl(r.saldo)]
									})]
								})
							]
						}, r.id))
					})] }, dia);
				})
			})
		]
	});
}
function ContasReceberView({ txs, onOpenReceive }) {
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("PENDENTE");
	const filtered = txs.filter((t) => t.tipo === "RECEITA" && (statusFilter === "all" ? true : t.status === statusFilter));
	const total = filtered.reduce((s, t) => s + Number(t.valor), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold text-slate-900",
				children: "Contas a receber"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[11px] text-slate-500",
				children: [
					filtered.length,
					" título",
					filtered.length === 1 ? "" : "s"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
						children: "Total em aberto"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-bold text-emerald-600 tabular-nums",
						children: brl(total)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: statusFilter,
					onValueChange: setStatusFilter,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-40 h-8 text-xs",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "all",
							children: "Todos"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "PENDENTE",
							children: "Pendente"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "ATRASADO",
							children: "Atrasado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "PARCIAL",
							children: "Parcial"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "PAGO",
							children: "Pago"
						})
					] })]
				})]
			})]
		}), filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-12 text-sm text-slate-500 text-center",
			children: "Nenhuma conta neste filtro"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "divide-y divide-slate-100 max-h-[600px] overflow-y-auto",
			children: filtered.map((t) => {
				var _t$companies5, _t$companies6, _t$bank_accounts3;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center px-4 py-3 hover:bg-slate-50/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-slate-900 truncate",
							children: ((_t$companies5 = t.companies) === null || _t$companies5 === void 0 ? void 0 : _t$companies5.trade_name) || ((_t$companies6 = t.companies) === null || _t$companies6 === void 0 ? void 0 : _t$companies6.legal_name) || t.descricao || "—"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-slate-500 truncate",
							children: [
								"Venc: ",
								t.vencimento ? fmtData(t.vencimento) : "—",
								" · ",
								t.forma_pagamento || "—",
								((_t$bank_accounts3 = t.bank_accounts) === null || _t$bank_accounts3 === void 0 ? void 0 : _t$bank_accounts3.nome) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1 text-slate-700",
									children: ["• ", t.bank_accounts.nome]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: `${STATUS_COLORS[t.status] || ""} text-[10px] border`,
								children: t.status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold text-slate-900 tabular-nums w-24 text-right",
								children: brl(Number(t.valor))
							}),
							t.status !== "PAGO" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								className: "h-7 text-xs",
								onClick: () => onOpenReceive(t),
								children: "Receber"
							})
						]
					})]
				}, t.id);
			})
		})]
	});
}
function ContasPagarView({ txs, accounts, kind = "DESPESAS" }) {
	const qc = useQueryClient();
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("PENDENTE");
	const [payTx, setPayTx] = (0, import_react.useState)(null);
	const [payAccount, setPayAccount] = (0, import_react.useState)("");
	const isPeca = (d) => /custo.*pe[çc]a/i.test(d || "");
	const filtered = txs.filter((t) => t.tipo === "DESPESA").filter((t) => kind === "PECAS" ? isPeca(t.descricao) : !isPeca(t.descricao)).filter((t) => statusFilter === "all" ? true : t.status === statusFilter);
	const total = filtered.reduce((s, t) => s + Number(t.valor), 0);
	const title = kind === "PECAS" ? "Custo peças" : "Contas a pagar";
	const confirmPay = useMutation({
		mutationFn: async () => {
			if (!payTx || !payAccount) throw new Error("Escolha a conta que pagou");
			const { error } = await supabase.from("financial_transactions").update({
				status: "PAGO",
				pagamento: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				account_id: payAccount
			}).eq("id", payTx.id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Pagamento confirmado");
			setPayTx(null);
			setPayAccount("");
			qc.invalidateQueries({ queryKey: ["fin-tx"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-3 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-slate-900",
					children: title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-slate-500",
					children: [
						filtered.length,
						" título",
						filtered.length === 1 ? "" : "s"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-wider text-slate-500 font-semibold",
							children: "Total em aberto"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xl font-bold tabular-nums ${kind === "PECAS" ? "text-amber-600" : "text-rose-600"}`,
							children: brl(total)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: statusFilter,
						onValueChange: setStatusFilter,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-40 h-8 text-xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "Todos"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "PENDENTE",
								children: "Pendente"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "ATRASADO",
								children: "Atrasado"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "PARCIAL",
								children: "Parcial"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "PAGO",
								children: "Pago"
							})
						] })]
					})]
				})]
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-12 text-sm text-slate-500 text-center",
				children: "Nenhuma conta a pagar neste filtro"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "divide-y divide-slate-100 max-h-[600px] overflow-y-auto",
				children: filtered.map((t) => {
					var _t$companies7, _t$bank_accounts4;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center px-4 py-3 hover:bg-slate-50/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium text-slate-900 truncate",
								children: t.descricao || ((_t$companies7 = t.companies) === null || _t$companies7 === void 0 ? void 0 : _t$companies7.trade_name) || "—"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px] text-slate-500 truncate",
								children: [
									"Venc: ",
									t.vencimento ? fmtData(t.vencimento) : "—",
									" · ",
									t.forma_pagamento || "—",
									((_t$bank_accounts4 = t.bank_accounts) === null || _t$bank_accounts4 === void 0 ? void 0 : _t$bank_accounts4.nome) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-1 text-slate-700",
										children: ["• ", t.bank_accounts.nome]
									})
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 shrink-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: `${STATUS_COLORS[t.status] || ""} text-[10px] border`,
									children: t.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-bold text-rose-600 tabular-nums w-24 text-right",
									children: brl(Number(t.valor))
								}),
								t.status !== "PAGO" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									className: "h-7 text-xs",
									onClick: () => {
										setPayTx({
											id: t.id,
											valor: Number(t.valor),
											label: t.descricao || "—"
										});
										setPayAccount("");
									},
									children: "Pagar"
								})
							]
						})]
					}, t.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!payTx,
				onOpenChange: (o) => !o && setPayTx(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Confirmar pagamento" }) }),
					payTx && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-slate-50 border border-slate-200 p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-500",
									children: "Descrição"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: payTx.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-500 mt-2",
									children: "Valor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-lg font-bold text-rose-600 tabular-nums",
									children: brl(payTx.valor)
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
							children: "De qual conta saiu?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
							value: payAccount,
							onChange: setPayAccount,
							accounts,
							placeholder: "Selecione a conta bancária",
							className: "mt-1"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => setPayTx(null),
						children: "Cancelar"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: !payAccount || confirmPay.isPending,
						onClick: () => confirmPay.mutate(),
						children: "Confirmar"
					})] })
				] })
			})
		]
	});
}
function AccountSelect({ value, onChange, accounts, placeholder, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : "Conta bancária" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
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
		}, a.id)) })]
	});
}
function BankAccountsPanel({ accounts }) {
	const create = useCreateBankAccount();
	const del = useDeleteBankAccount();
	const transfer = useCreateBankTransfer();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [transferOpen, setTransferOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		nome: "",
		banco: "",
		tipo: "CORRENTE",
		cor: "#6366f1",
		saldo_inicial: "0"
	});
	const [tForm, setTForm] = (0, import_react.useState)({
		from_account_id: "",
		to_account_id: "",
		valor: "",
		observacao: ""
	});
	const totalGeral = accounts.reduce((s, a) => s + a.saldo, 0);
	const submitTransfer = () => {
		transfer.mutate({
			from_account_id: tForm.from_account_id,
			to_account_id: tForm.to_account_id,
			valor: Number(tForm.valor),
			observacao: tForm.observacao || null
		}, {
			onSuccess: () => {
				toast.success("Transferência registrada");
				setTForm({
					from_account_id: "",
					to_account_id: "",
					valor: "",
					observacao: ""
				});
				setTransferOpen(false);
			},
			onError: (e) => toast.error(e.message)
		});
	};
	const submit = () => {
		if (!form.nome) {
			toast.error("Informe o nome");
			return;
		}
		create.mutate({
			nome: form.nome,
			banco: form.banco || null,
			tipo: form.tipo,
			cor: form.cor,
			saldo_inicial: Number(form.saldo_inicial)
		}, {
			onSuccess: () => {
				toast.success("Conta cadastrada");
				setForm({
					nome: "",
					banco: "",
					tipo: "CORRENTE",
					cor: "#6366f1",
					saldo_inicial: "0"
				});
				setOpen(false);
			},
			onError: (e) => toast.error(e.message)
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-xl border border-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04)] p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 mb-3 flex-wrap",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 grid place-items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {
						className: "w-4 h-4",
						strokeWidth: 2.4
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-semibold text-slate-900",
					children: "Contas bancárias"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-slate-500",
					children: "Saldo real: entradas − saídas por conta"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right hidden sm:block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-wider text-slate-500",
							children: "Total geral"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-base font-bold tabular-nums ${totalGeral >= 0 ? "text-slate-900" : "text-rose-600"}`,
							children: brl(totalGeral)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open: transferOpen,
						onOpenChange: setTransferOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								className: "h-8",
								disabled: accounts.length < 2,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: "w-3.5 h-3.5 mr-1" }), " Transferir"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Transferência entre contas" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
										children: "De"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
										value: tForm.from_account_id,
										onChange: (v) => setTForm(_objectSpread2(_objectSpread2({}, tForm), {}, { from_account_id: v })),
										accounts,
										placeholder: "Conta de origem",
										className: "mt-1"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
										children: "Para"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountSelect, {
										value: tForm.to_account_id,
										onChange: (v) => setTForm(_objectSpread2(_objectSpread2({}, tForm), {}, { to_account_id: v })),
										accounts: accounts.filter((a) => a.id !== tForm.from_account_id),
										placeholder: "Conta de destino",
										className: "mt-1"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
										children: "Valor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.01",
										placeholder: "0,00",
										value: tForm.valor,
										onChange: (e) => setTForm(_objectSpread2(_objectSpread2({}, tForm), {}, { valor: e.target.value })),
										className: "mt-1 tabular-nums"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
										children: "Observação"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Ex.: acerto do mês",
										value: tForm.observacao,
										onChange: (e) => setTForm(_objectSpread2(_objectSpread2({}, tForm), {}, { observacao: e.target.value })),
										className: "mt-1"
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setTransferOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: submitTransfer,
								disabled: transfer.isPending || !tForm.from_account_id || !tForm.to_account_id || !tForm.valor,
								children: "Transferir"
							})] })
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
						open,
						onOpenChange: setOpen,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								className: "h-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3.5 h-3.5 mr-1" }), " Nova conta"]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Cadastrar conta bancária" }) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
										children: "Nome"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										placeholder: "Ex.: Itaú PJ",
										value: form.nome,
										onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { nome: e.target.value })),
										className: "mt-1"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
											children: "Banco"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											placeholder: "Ex.: Itaú",
											value: form.banco,
											onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { banco: e.target.value })),
											className: "mt-1"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
											children: "Tipo"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: form.tipo,
											onValueChange: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { tipo: v })),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "mt-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "CORRENTE",
													children: "Conta corrente"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "POUPANCA",
													children: "Poupança"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "DINHEIRO",
													children: "Dinheiro (caixa)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "CARTAO",
													children: "Cartão"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
													value: "OUTRO",
													children: "Outro"
												})
											] })]
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
											children: "Saldo inicial"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "number",
											step: "0.01",
											value: form.saldo_inicial,
											onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { saldo_inicial: e.target.value })),
											className: "mt-1 tabular-nums"
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold uppercase tracking-wider text-slate-500",
											children: "Cor"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "color",
											value: form.cor,
											onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { cor: e.target.value })),
											className: "mt-1 h-10 p-1"
										})] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setOpen(false),
								children: "Cancelar"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: submit,
								disabled: create.isPending,
								children: "Cadastrar"
							})] })
						] })]
					})
				]
			})]
		}), accounts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center py-8 border-2 border-dashed border-slate-200 rounded-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Banknote, { className: "w-8 h-8 text-slate-300 mx-auto mb-2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-slate-500",
					children: "Nenhuma conta cadastrada"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-400 mt-1",
					children: "Cadastre pelo menos uma conta para começar a controlar o saldo"
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
			children: accounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative rounded-xl border border-slate-200 p-3 bg-gradient-to-br from-white to-slate-50/50 group",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-8 h-8 rounded-lg grid place-items-center shrink-0",
								style: {
									background: a.cor + "22",
									color: a.cor
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {
									className: "w-4 h-4",
									strokeWidth: 2.4
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-slate-900 truncate",
									children: a.nome
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-slate-500 uppercase tracking-wider",
									children: a.banco || a.tipo
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => confirm(`Desativar a conta ${a.nome}?`) && del.mutate(a.id),
							className: "opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-rose-600",
							"aria-label": "Excluir",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xl font-bold tabular-nums ${a.saldo >= 0 ? "text-slate-900" : "text-rose-600"}`,
						children: brl(a.saldo)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mt-1 text-[11px] text-slate-500 tabular-nums",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-emerald-600",
							children: ["↑ ", brl(a.entradas)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-rose-600",
							children: ["↓ ", brl(a.saidas)]
						})]
					})
				]
			}, a.id))
		})]
	});
}
function CustoPecasDialog({ open, onOpenChange, orders, rangeLabel }) {
	const rows = (0, import_react.useMemo)(() => {
		return orders.map((o) => {
			const items = (o.order_items || []).filter((i) => Number(i.custo_unitario || 0) > 0).map((i) => {
				var _i$products, _i$products2;
				const custo = Number(i.custo_unitario || 0);
				const qtd = Number(i.quantidade || 0);
				return {
					sku: ((_i$products = i.products) === null || _i$products === void 0 ? void 0 : _i$products.sku) || "—",
					nome: ((_i$products2 = i.products) === null || _i$products2 === void 0 ? void 0 : _i$products2.nome) || "—",
					quantidade: qtd,
					custo_unitario: custo,
					total: custo * qtd
				};
			});
			return {
				order: o,
				items,
				custoTotal: items.reduce((s, it) => s + it.total, 0)
			};
		}).filter((r) => r.custoTotal > 0);
	}, [orders]);
	const totalGeral = rows.reduce((s, r) => s + r.custoTotal, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-4xl max-h-[90vh] overflow-hidden flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "text-base",
						children: ["Detalhamento dos custos — ", rangeLabel]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-slate-500",
						children: ["Custo total das peças: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-slate-900",
							children: brl(totalGeral)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 overflow-y-auto pr-1",
					children: rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-12 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "w-8 h-8 text-slate-300 mx-auto mb-2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-slate-500",
							children: "Nenhuma venda com custo de peças no período"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-4",
						children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border border-slate-200 rounded-lg overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-slate-50 px-3 py-2 border-b border-slate-200 flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-semibold text-slate-900",
										children: [
											"Pedido ",
											orderCodeHash(String(r.order.id)),
											" — Venda ",
											brl(Number(r.order.total)),
											" · Custo ",
											brl(r.custoTotal)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] text-slate-500",
										children: fmtData((r.order.created_at || "").slice(0, 10))
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "hidden md:block",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
											className: "text-[10px] uppercase tracking-wider text-slate-500 bg-slate-50/50",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-left font-semibold px-3 py-2 w-24",
													children: "SKU"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-left font-semibold px-3 py-2",
													children: "Peça"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right font-semibold px-3 py-2 w-16",
													children: "Qtd"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right font-semibold px-3 py-2 w-28",
													children: "Custo un."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
													className: "text-right font-semibold px-3 py-2 w-28",
													children: "Total"
												})
											] })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
											className: "divide-y divide-slate-100",
											children: r.items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-xs text-slate-600 tabular-nums",
													children: it.sku
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-slate-900",
													children: it.nome
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-right tabular-nums text-slate-600",
													children: it.quantidade
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-right tabular-nums text-slate-600",
													children: brl(it.custo_unitario)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "px-3 py-2 text-right tabular-nums font-medium text-slate-900",
													children: brl(it.total)
												})
											] }, idx))
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "md:hidden divide-y divide-slate-100",
									children: r.items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-3 py-2 flex items-center justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium text-slate-900 truncate",
												children: it.nome
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[11px] text-slate-500",
												children: [
													it.sku,
													" · ",
													it.quantidade,
													" un. · ",
													brl(it.custo_unitario)
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-semibold tabular-nums text-slate-900",
											children: brl(it.total)
										})]
									}, idx))
								})
							]
						}, r.order.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, {
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => onOpenChange(false),
						children: "Fechar"
					})
				})
			]
		})
	});
}
//#endregion
export { FinancePage as component };
