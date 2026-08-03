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
import { Ct as HandCoins, Jt as CircleAlert, K as PiggyBank, in as Building2, mn as ArrowLeft, qt as CircleCheck, s as Wallet } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { t as useBankAccounts } from "./use-bank-accounts-t3Tu7bOS.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Textarea } from "./textarea-DerICSB1.mjs";
import { t as CompanyMoneyCards } from "./CompanyMoneyCards-wEavNTnQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.fechamento-CIbBHou-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function asArray(v) {
	return Array.isArray(v) ? v : [];
}
function brDate(v) {
	if (!v || typeof v !== "string") return "—";
	const parts = v.slice(0, 10).split("-");
	return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : v;
}
function isoDay(d) {
	const x = new Date(d);
	x.setHours(0, 0, 0, 0);
	return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
}
var startOfDayIso = (d) => `${d}T00:00:00-03:00`;
var endOfDayIso = (d) => `${d}T23:59:59.999-03:00`;
function rangeFor(p, from, to) {
	const today = /* @__PURE__ */ new Date(/* @__PURE__ */ new Date());
	today.setHours(0, 0, 0, 0);
	const startMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	const endMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
	const startPrev = new Date(today.getFullYear(), today.getMonth() - 1, 1);
	const endPrev = new Date(today.getFullYear(), today.getMonth(), 0);
	const startWeek = new Date(today);
	startWeek.setDate(startWeek.getDate() - startWeek.getDay());
	const endWeek = new Date(startWeek);
	endWeek.setDate(endWeek.getDate() + 6);
	switch (p) {
		case "semana": return {
			from: isoDay(startWeek),
			to: isoDay(endWeek)
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
			from: from || isoDay(startMonth),
			to: to || isoDay(endMonth)
		};
		default: return {
			from: isoDay(startMonth),
			to: isoDay(endMonth)
		};
	}
}
function FechamentoPage() {
	const qc = useQueryClient();
	const today = isoDay(/* @__PURE__ */ new Date());
	const [periodo, setPeriodo] = (0, import_react.useState)("semana");
	const [from, setFrom] = (0, import_react.useState)(today);
	const [to, setTo] = (0, import_react.useState)(today);
	const range = (0, import_react.useMemo)(() => rangeFor(periodo, from, to), [
		periodo,
		from,
		to
	]);
	const { data: bankAccountsRaw } = useBankAccounts();
	const bankAccounts = (0, import_react.useMemo)(() => asArray(bankAccountsRaw), [bankAccountsRaw]);
	const [accountId, setAccountId] = (0, import_react.useState)("");
	const [accountIdPessoal, setAccountIdPessoal] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!accountId && bankAccounts.length > 0) setAccountId(bankAccounts[0].id);
		if (!accountIdPessoal && bankAccounts.length > 1) setAccountIdPessoal(bankAccounts[1].id);
		else if (!accountIdPessoal && bankAccounts.length > 0) setAccountIdPessoal(bankAccounts[0].id);
	}, [
		bankAccounts,
		accountId,
		accountIdPessoal
	]);
	const { data: reinvestSetting } = useQuery({
		queryKey: ["setting", "reinvest_pct_receita"],
		queryFn: async () => {
			var _data$valor;
			const { data, error } = await supabase.from("system_settings").select("valor").eq("chave", "reinvest_pct_receita").maybeSingle();
			if (error) throw error;
			const v = data === null || data === void 0 || (_data$valor = data.valor) === null || _data$valor === void 0 ? void 0 : _data$valor.pct;
			return typeof v === "number" ? v : 0;
		}
	});
	const savedPct = reinvestSetting !== null && reinvestSetting !== void 0 ? reinvestSetting : 0;
	const [pctInput, setPctInput] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (reinvestSetting !== void 0) setPctInput(String(reinvestSetting));
	}, [reinvestSetting]);
	const savePct = useMutation({
		mutationFn: async (pct) => {
			const { error } = await supabase.from("system_settings").upsert({
				chave: "reinvest_pct_receita",
				categoria: "fechamento",
				valor: { pct },
				descricao: "% da receita reservada como reinvestimento da empresa no fechamento"
			}, { onConflict: "categoria,chave" });
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["setting", "reinvest_pct_receita"] });
			toast.success("Percentual salvo");
		},
		onError: (e) => toast.error(e.message || "Falha ao salvar")
	});
	const { data: ordersRaw, isLoading: loadingOrders } = useQuery({
		queryKey: [
			"fechamento-orders",
			range.from,
			range.to
		],
		queryFn: async () => {
			const startISO = startOfDayIso(range.from);
			const endISO = endOfDayIso(range.to);
			const { data, error } = await supabase.from("orders").select("id,created_at,total,fechamento_id,order_items(quantidade,custo_unitario)").gte("created_at", startISO).lte("created_at", endISO).neq("status", "CANCELADO");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const orders = (0, import_react.useMemo)(() => asArray(ordersRaw), [ordersRaw]);
	const orderIds = (0, import_react.useMemo)(() => orders.map((o) => o.id), [orders]);
	const { data: finRowsRaw } = useQuery({
		queryKey: ["fechamento-fin-orders", orderIds.join(",")],
		enabled: orderIds.length > 0,
		queryFn: async () => {
			const { data, error } = await supabase.from("financial_transactions").select("id,order_id,valor,status,vencimento,pagamento,descricao,bandeira,parcela_num,parcelas_total").eq("tipo", "RECEITA").in("order_id", orderIds);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const finRows = (0, import_react.useMemo)(() => asArray(finRowsRaw), [finRowsRaw]);
	const { data: cardFeeRowsRaw } = useQuery({
		queryKey: ["fechamento-taxas", orderIds.join(",")],
		enabled: orderIds.length > 0,
		queryFn: async () => {
			const { data, error } = await supabase.from("financial_transactions").select("valor,descricao,order_id").eq("tipo", "DESPESA").in("order_id", orderIds);
			if (error) throw error;
			return (data !== null && data !== void 0 ? data : []).filter((r) => {
				var _r$descricao;
				return /taxa.*cart[ãa]o/i.test((_r$descricao = r.descricao) !== null && _r$descricao !== void 0 ? _r$descricao : "");
			});
		}
	});
	const cardFeeRows = (0, import_react.useMemo)(() => asArray(cardFeeRowsRaw), [cardFeeRowsRaw]);
	const { data: outrasReceberRaw } = useQuery({
		queryKey: ["fechamento-receber-antigos", orderIds.join(",")],
		queryFn: async () => {
			const { data, error } = await supabase.from("financial_transactions").select("id,order_id,valor,status,vencimento,pagamento,descricao,bandeira,parcela_num,parcelas_total").eq("tipo", "RECEITA").in("status", [
				"PENDENTE",
				"PARCIAL",
				"ATRASADO"
			]);
			if (error) throw error;
			const atuais = new Set(orderIds);
			return (data !== null && data !== void 0 ? data : []).filter((r) => !r.order_id || !atuais.has(r.order_id));
		}
	});
	const outrasReceberRows = (0, import_react.useMemo)(() => asArray(outrasReceberRaw), [outrasReceberRaw]);
	const aReceberRows = (0, import_react.useMemo)(() => finRows.filter((r) => r.status === "PENDENTE" || r.status === "PARCIAL" || r.status === "ATRASADO"), [finRows]);
	const outrasReceberTotal = (0, import_react.useMemo)(() => outrasReceberRows.reduce((s, r) => s + Number(r.valor || 0), 0), [outrasReceberRows]);
	const receberTodos = (0, import_react.useMemo)(() => [...aReceberRows.map((r) => _objectSpread2(_objectSpread2({}, r), {}, { anterior: false })), ...outrasReceberRows.map((r) => _objectSpread2(_objectSpread2({}, r), {}, { anterior: true }))].sort((a, b) => {
		var _a$vencimento, _b$vencimento;
		return String((_a$vencimento = a.vencimento) !== null && _a$vencimento !== void 0 ? _a$vencimento : "").localeCompare(String((_b$vencimento = b.vencimento) !== null && _b$vencimento !== void 0 ? _b$vencimento : ""));
	}), [aReceberRows, outrasReceberRows]);
	const { data: expensesSplit = {
		trip: 0,
		company: 0,
		total: 0,
		tripRows: [],
		companyRows: []
	} } = useQuery({
		queryKey: [
			"fechamento-expenses",
			range.from,
			range.to
		],
		queryFn: async () => {
			var _trip$data, _fin$data;
			const startISO = startOfDayIso(range.from);
			const endISO = endOfDayIso(range.to);
			const [trip, fin] = await Promise.all([supabase.from("trip_expenses").select("valor,data").gte("data", range.from).lte("data", range.to), supabase.from("financial_transactions").select("valor,descricao,created_at,vencimento,pagamento,purchase_order_id").eq("tipo", "DESPESA").gte("created_at", startISO).lte("created_at", endISO)]);
			if (trip.error) throw trip.error;
			if (fin.error) throw fin.error;
			const tripRows = ((_trip$data = trip.data) !== null && _trip$data !== void 0 ? _trip$data : []).map((r) => {
				var _r$data;
				return {
					data: String((_r$data = r.data) !== null && _r$data !== void 0 ? _r$data : "").slice(0, 10),
					valor: Number(r.valor || 0)
				};
			});
			const tripSum = tripRows.reduce((s, r) => s + r.valor, 0);
			const companyRows = ((_fin$data = fin.data) !== null && _fin$data !== void 0 ? _fin$data : []).filter((r) => {
				var _r$descricao2;
				return !/custo.*pe[çc]a/i.test((_r$descricao2 = r.descricao) !== null && _r$descricao2 !== void 0 ? _r$descricao2 : "");
			}).filter((r) => {
				var _r$descricao3;
				return !/taxa.*cart[ãa]o/i.test((_r$descricao3 = r.descricao) !== null && _r$descricao3 !== void 0 ? _r$descricao3 : "");
			}).filter((r) => {
				var _r$descricao4;
				return !/compra de (mercadoria|material)/i.test((_r$descricao4 = r.descricao) !== null && _r$descricao4 !== void 0 ? _r$descricao4 : "");
			}).filter((r) => !r.purchase_order_id).map((r) => {
				var _r$created_at;
				return {
					data: String((_r$created_at = r.created_at) !== null && _r$created_at !== void 0 ? _r$created_at : "").slice(0, 10),
					valor: Number(r.valor || 0)
				};
			});
			const finCompanySum = companyRows.reduce((s, r) => s + r.valor, 0);
			return {
				trip: tripSum,
				company: finCompanySum,
				total: tripSum + finCompanySum,
				tripRows,
				companyRows
			};
		}
	});
	const { data: fechamentosSobrepostosRaw } = useQuery({
		queryKey: [
			"fechamentos-sobrepostos",
			range.from,
			range.to
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("fechamentos").select("*").lte("periodo_from", range.to).gte("periodo_to", range.from).order("created_at", { ascending: false });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const fechamentosSobrepostos = (0, import_react.useMemo)(() => asArray(fechamentosSobrepostosRaw), [fechamentosSobrepostosRaw]);
	const { data: reservaAbertaRaw } = useQuery({
		queryKey: ["fechamentos-reserva-pendente"],
		queryFn: async () => {
			const { data, error } = await supabase.from("fechamentos").select("id,valor_empresa_pendente,periodo_to").gt("valor_empresa_pendente", 0);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const reservaAberta = (0, import_react.useMemo)(() => asArray(reservaAbertaRaw), [reservaAbertaRaw]);
	const compromissoAnterior = (0, import_react.useMemo)(() => reservaAberta.reduce((s, r) => s + Number(r.valor_empresa_pendente || 0), 0), [reservaAberta]);
	const { data: historicoRaw } = useQuery({
		queryKey: ["fechamentos-historico"],
		queryFn: async () => {
			const { data, error } = await supabase.from("fechamentos").select("*").order("created_at", { ascending: false }).limit(50);
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const historico = (0, import_react.useMemo)(() => asArray(historicoRaw), [historicoRaw]);
	const calc = (0, import_react.useMemo)(() => {
		var _ref, _ultimoFechamento$cre, _expensesSplit$tripRo, _expensesSplit$compan;
		const list = orders;
		const abertos = list.filter((o) => !o.fechamento_id);
		const abertoIds = new Set(abertos.map((o) => o.id));
		const sumTotal = (arr) => arr.reduce((s, o) => s + Number(o.total || 0), 0);
		const sumCusto = (arr) => arr.reduce((s, o) => s + (o.order_items || []).reduce((a, i) => a + Number(i.quantidade || 0) * Number(i.custo_unitario || 0), 0), 0);
		const sumTaxas = (ids) => cardFeeRows.filter((r) => {
			var _r$order_id;
			return !ids || ids.has(String((_r$order_id = r.order_id) !== null && _r$order_id !== void 0 ? _r$order_id : ""));
		}).reduce((s, r) => s + Number(r.valor || 0), 0);
		const sumRealizado = (ids) => finRows.filter((r) => r.status === "PAGO").filter((r) => {
			var _r$order_id2;
			return !ids || ids.has(String((_r$order_id2 = r.order_id) !== null && _r$order_id2 !== void 0 ? _r$order_id2 : ""));
		}).reduce((s, r) => s + Number(r.valor || 0), 0);
		const despesasViagem = Number(expensesSplit.trip || 0);
		const despesasEmpresa = Number(expensesSplit.company || 0);
		const despesas = despesasViagem + despesasEmpresa;
		const vendasBruto = sumTotal(list);
		const custo = sumCusto(list);
		const taxas = sumTaxas();
		const realizado = sumRealizado();
		const aReceber = Math.max(vendasBruto - realizado, 0);
		const reserva = vendasBruto * (savedPct / 100);
		const lucroLiquido = vendasBruto - taxas - custo - despesas - reserva;
		const caixaLivre = Math.max(realizado - despesas - taxas, 0);
		const vendasBrutoAberto = sumTotal(abertos);
		const custoAberto = sumCusto(abertos);
		const taxasAberto = sumTaxas(abertoIds);
		const realizadoAberto = sumRealizado(abertoIds);
		const despesasAberto = despesas;
		const despesasViagemAberto = despesasViagem;
		const despesasEmpresaAberto = despesasEmpresa;
		const reservaAberto = vendasBrutoAberto * (savedPct / 100);
		const lucroAberto = vendasBrutoAberto - taxasAberto - custoAberto - despesasAberto - reservaAberto;
		const caixaLivreAberto = Math.max(realizadoAberto - despesasAberto - taxasAberto, 0);
		const empresaPeriodo = custoAberto + reservaAberto;
		const totalIdealEmpresa = empresaPeriodo + compromissoAnterior;
		const lucroIdeal = Math.max(lucroAberto, 0);
		const retiradaIdeal = Math.min(lucroIdeal, caixaLivreAberto);
		const retiradaAguardando = Math.max(lucroIdeal - retiradaIdeal, 0);
		const empresaCaixaAgora = Math.max(Math.min(totalIdealEmpresa, caixaLivreAberto - retiradaIdeal), 0);
		const empresaAguardando = Math.max(totalIdealEmpresa - empresaCaixaAgora, 0);
		const ultimoFechamento = fechamentosSobrepostos[0];
		const temUltimoFechamento = !!ultimoFechamento;
		const cutoff = temUltimoFechamento ? String((_ref = (_ultimoFechamento$cre = ultimoFechamento.created_at) !== null && _ultimoFechamento$cre !== void 0 ? _ultimoFechamento$cre : ultimoFechamento.periodo_to) !== null && _ref !== void 0 ? _ref : "").slice(0, 10) : "";
		const sumUpTo = (rows) => rows.filter((r) => !cutoff || r.data && r.data <= cutoff).reduce((s, r) => s + Number(r.valor || 0), 0);
		const pick = (stored, fallback) => {
			const v = Number(stored || 0);
			return v > 0 ? v : fallback;
		};
		const acertadosIds = new Set(list.filter((o) => o.fechamento_id).map((o) => o.id));
		const acertadosList = list.filter((o) => o.fechamento_id);
		const acertadoVendas = temUltimoFechamento ? pick(ultimoFechamento.vendas_periodo, sumTotal(acertadosList)) : sumTotal(acertadosList);
		const acertadoCusto = temUltimoFechamento ? pick(ultimoFechamento.custo_pecas_periodo, sumCusto(acertadosList)) : sumCusto(acertadosList);
		const acertadoTaxas = temUltimoFechamento ? pick(ultimoFechamento.taxas_periodo, sumTaxas(acertadosIds)) : sumTaxas(acertadosIds);
		const acertadoReserva = temUltimoFechamento ? pick(ultimoFechamento.valor_reserva, sumTotal(acertadosList) * (savedPct / 100)) : sumTotal(acertadosList) * (savedPct / 100);
		const acertadoLucro = temUltimoFechamento ? pick(ultimoFechamento.lucro_liquido, lucroLiquido - lucroAberto) : lucroLiquido - lucroAberto;
		const jaDespesaViagem = temUltimoFechamento ? pick(ultimoFechamento.despesa_viagem_periodo, sumUpTo((_expensesSplit$tripRo = expensesSplit.tripRows) !== null && _expensesSplit$tripRo !== void 0 ? _expensesSplit$tripRo : [])) : fechamentosSobrepostos.reduce((s, f) => s + Number(f.despesa_viagem_periodo || 0), 0);
		const jaDespesaEmpresa = temUltimoFechamento ? pick(ultimoFechamento.despesa_empresa_periodo, sumUpTo((_expensesSplit$compan = expensesSplit.companyRows) !== null && _expensesSplit$compan !== void 0 ? _expensesSplit$compan : [])) : fechamentosSobrepostos.reduce((s, f) => s + Number(f.despesa_empresa_periodo || 0), 0);
		const jaTaxas = acertadoTaxas;
		const jaReserva = acertadoReserva;
		const temAcerto = temUltimoFechamento || list.some((o) => o.fechamento_id);
		return {
			vendas: realizado,
			vendasBruto,
			aReceber,
			taxas,
			custo,
			despesas,
			despesasViagem,
			despesasEmpresa,
			reserva,
			caixaLivre,
			lucroLiquido,
			realizadoAberto,
			aReceberAberto: Math.max(vendasBrutoAberto - realizadoAberto, 0),
			taxasAberto,
			pedidosAbertos: abertos.length,
			vendasBrutoAberto,
			custoAberto,
			despesasAberto,
			despesasViagemAberto,
			despesasEmpresaAberto,
			reservaAberto,
			lucroAberto,
			caixaLivreAberto,
			retiradaIdeal,
			totalIdealEmpresa,
			lucroIdeal,
			retiradaAguardando,
			empresaCaixaAgora,
			empresaAguardando,
			empresaPeriodo,
			compromissoAnterior,
			jaEmpresa: temUltimoFechamento ? Number(ultimoFechamento.valor_transferido || 0) : fechamentosSobrepostos.reduce((s, f) => s + Number(f.valor_transferido || 0), 0),
			jaRetirada: temUltimoFechamento ? Number(ultimoFechamento.valor_retirada || 0) : fechamentosSobrepostos.reduce((s, f) => s + Number(f.valor_retirada || 0), 0),
			jaTaxas,
			jaReserva,
			jaDespesaViagem,
			jaDespesaEmpresa,
			temAcerto,
			acertadoVendas,
			acertadoCusto,
			acertadoReserva,
			acertadoLucro,
			pendenteEmpresa: empresaCaixaAgora,
			pendenteRetirada: retiradaIdeal,
			pedidos: list.length
		};
	}, [
		orders,
		expensesSplit,
		savedPct,
		fechamentosSobrepostos,
		finRows,
		cardFeeRows,
		compromissoAnterior
	]);
	const receberTotalCard = calc.aReceberAberto + outrasReceberTotal;
	/**
	* Quando o período selecionado já tem acerto(s) confirmado(s), mostra abaixo do
	* valor cheio quanto já foi acertado e quanto ainda falta. Sem acerto no período,
	* o card fica limpo (só o valor total).
	*/
	const acertoBreakdown = (total, jaAcertado) => {
		if (!calc.temAcerto || jaAcertado <= 0) return void 0;
		const restante = Math.max(total - jaAcertado, 0);
		return [{
			label: "Já acertado",
			value: brl(jaAcertado),
			accent: "#94a3b8"
		}, {
			label: "Restante",
			value: brl(restante),
			accent: restante > 0 ? "#16a34a" : "#94a3b8"
		}];
	};
	const [obs, setObs] = (0, import_react.useState)("");
	const [openReceber, setOpenReceber] = (0, import_react.useState)(false);
	const confirmar = useMutation({
		mutationFn: async () => {
			var _user$id;
			if (!accountId) throw new Error("Selecione a conta da empresa");
			if (calc.pendenteRetirada > 0 && !accountIdPessoal) throw new Error("Selecione a conta pessoal para a retirada");
			if (calc.pendenteEmpresa <= 0 && calc.pendenteRetirada <= 0) throw new Error("Não há valor pendente para transferir");
			if (calc.lucroAberto <= 0) throw new Error("As vendas ainda não acertadas não geram lucro — não há retirada a fazer");
			if (calc.retiradaIdeal <= 0) throw new Error("Após a reserva da empresa não sobra retirada pessoal — ajuste a % ou o período");
			const { data: { user } } = await supabase.auth.getUser();
			const { data: inserted, error } = await supabase.from("fechamentos").insert({
				periodo_from: range.from,
				periodo_to: range.to,
				vendas_periodo: calc.vendasBrutoAberto,
				custo_pecas_periodo: calc.custoAberto,
				taxas_periodo: calc.taxasAberto,
				despesas_periodo: calc.despesasAberto,
				despesa_viagem_periodo: calc.despesasViagemAberto,
				despesa_empresa_periodo: calc.despesasEmpresaAberto,
				lucro_liquido: calc.lucroAberto,
				pct_reserva: savedPct,
				valor_reserva: calc.reservaAberto,
				valor_transferido: calc.pendenteEmpresa,
				valor_retirada: calc.pendenteRetirada,
				valor_empresa_pendente: calc.empresaAguardando,
				account_id: accountId,
				account_id_pessoal: calc.pendenteRetirada > 0 ? accountIdPessoal : null,
				observacao: obs || null,
				created_by: (_user$id = user === null || user === void 0 ? void 0 : user.id) !== null && _user$id !== void 0 ? _user$id : null
			}).select("id").single();
			if (error) throw error;
			const idsReserva = reservaAberta.map((r) => r.id);
			if (idsReserva.length > 0) {
				const { error: resErr } = await supabase.from("fechamentos").update({ valor_empresa_pendente: 0 }).in("id", idsReserva);
				if (resErr) throw resErr;
			}
			const ids = (orders !== null && orders !== void 0 ? orders : []).filter((o) => !o.fechamento_id).map((o) => o.id);
			if (ids.length > 0) {
				const { error: upErr } = await supabase.from("orders").update({ fechamento_id: inserted.id }).in("id", ids);
				if (upErr) throw upErr;
			}
		},
		onSuccess: () => {
			toast.success("Fechamento registrado. Empresa e retirada pessoal transferidas.");
			setObs("");
			qc.invalidateQueries({ queryKey: ["fechamento-orders"] });
			qc.invalidateQueries({ queryKey: ["fechamentos-sobrepostos"] });
			qc.invalidateQueries({ queryKey: ["fechamentos-historico"] });
			qc.invalidateQueries({ queryKey: ["fechamentos-reserva-pendente"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => toast.error(e.message || "Falha ao registrar fechamento")
	});
	const remover = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("fechamentos").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			toast.success("Fechamento removido");
			qc.invalidateQueries({ queryKey: ["fechamento-orders"] });
			qc.invalidateQueries({ queryKey: ["fechamentos-sobrepostos"] });
			qc.invalidateQueries({ queryKey: ["fechamentos-historico"] });
			qc.invalidateQueries({ queryKey: ["fechamentos-reserva-pendente"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
		},
		onError: (e) => toast.error(e.message || "Falha ao remover")
	});
	const rangeLabel = `${range.from.split("-").reverse().join("/")} → ${range.to.split("-").reverse().join("/")}`;
	const accountNameById = (id) => {
		var _bankAccounts$find$no, _bankAccounts$find;
		return (_bankAccounts$find$no = (_bankAccounts$find = bankAccounts.find((a) => a.id === id)) === null || _bankAccounts$find === void 0 ? void 0 : _bankAccounts$find.nome) !== null && _bankAccounts$find$no !== void 0 ? _bankAccounts$find$no : "—";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Fechamento",
		eyebrow: "Acerto de viagem/período",
		description: "Confirme o acerto do período e transfira o valor de custos + reserva para o caixa da empresa.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/v3/relatorios",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4 mr-2" }), " Voltar"]
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border p-4 mb-4 flex flex-wrap items-end gap-3",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.MUTED },
						children: "Período"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: periodo,
						onValueChange: (v) => setPeriodo(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "w-44",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "semana",
								children: "Esta semana (dom → sáb)"
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
								value: "custom",
								children: "Personalizado"
							})
						] })]
					})] }),
					periodo === "custom" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.MUTED },
						children: "De"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: from,
						onChange: (e) => setFrom(e.target.value),
						className: "w-40"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs mb-1",
						style: { color: V2.MUTED },
						children: "Até"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: to,
						onChange: (e) => setTo(e.target.value),
						className: "w-40"
					})] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ml-auto max-w-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs mb-1",
								style: { color: V2.MUTED },
								children: "% de investimento sobre a venda total"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									inputMode: "decimal",
									step: "0.1",
									min: "0",
									max: "100",
									value: pctInput,
									onChange: (e) => setPctInput(e.target.value),
									className: "w-24",
									placeholder: "0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => {
										const n = Number(pctInput);
										if (!Number.isFinite(n) || n < 0 || n > 100) {
											toast.error("Informe 0 a 100");
											return;
										}
										savePct.mutate(n);
									},
									disabled: savePct.isPending || Number(pctInput) === savedPct,
									children: savePct.isPending ? "Salvando..." : "Salvar %"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[11px] mt-1",
								style: { color: V2.MUTED },
								children: [
									"Aplicada: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										style: { color: V2.TEXT },
										children: [savedPct, "%"]
									}),
									". Isso apenas grava o percentual; para efetivar o acerto, use ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Confirmar fechamento" }),
									" abaixo."
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-xs mb-3 px-1",
				style: { color: V2.MUTED },
				children: [
					rangeLabel,
					" · ",
					calc.pedidos,
					" pedidos"
				]
			}),
			loadingOrders ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-2xl border p-8 text-center",
				style: {
					borderColor: V2.GRAPHITE,
					background: V2.SURFACE,
					color: V2.MUTED
				},
				children: "Carregando..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBlock, {
					title: "1. Demonstrativo do período",
					hint: `${rangeLabel} · ${calc.pedidos} pedidos · valores acumulados de todo o período selecionado`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosingStatement, { rows: [
						{
							label: "Total de venda",
							total: calc.vendasBruto,
							jaAcertado: calc.acertadoVendas,
							accent: "#0d7377",
							bg: "#f0fdfa",
							prefix: ""
						},
						{
							label: "Taxas de cartão",
							total: calc.taxas,
							jaAcertado: calc.jaTaxas,
							accent: "#0ea5e9",
							bg: "#e0f2fe",
							prefix: "(−) "
						},
						{
							label: "Custo de peças vendidas",
							total: calc.custo,
							jaAcertado: calc.acertadoCusto,
							accent: "#16a34a",
							bg: "#dcfce7",
							prefix: "(−) "
						},
						{
							label: "Despesa de viagem",
							total: calc.despesasViagem,
							jaAcertado: calc.jaDespesaViagem,
							accent: "#a855f7",
							bg: "#f3e8ff",
							prefix: "(−) "
						},
						{
							label: "Despesa da empresa",
							total: calc.despesasEmpresa,
							jaAcertado: calc.jaDespesaEmpresa,
							accent: "#64748b",
							bg: "#f8fafc",
							prefix: "(−) "
						},
						{
							label: `Investimento (${savedPct}%)`,
							total: calc.reserva,
							jaAcertado: calc.jaReserva,
							accent: "#0d7377",
							bg: "#f0fdfa",
							prefix: "(−) "
						},
						{
							label: "Lucro líquido",
							total: calc.lucroLiquido,
							jaAcertado: calc.acertadoLucro,
							accent: "#f97316",
							bg: "#ffedd5",
							prefix: "= ",
							bold: true
						}
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBlock, {
					title: "1.1 Resumo dos cards",
					hint: "Mesmos números do demonstrativo acima, em formato compacto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "Vendas brutas",
								value: brl(calc.vendasBruto),
								sub: `${calc.pedidos} pedidos`,
								icon: Wallet,
								accent: "#0d7377",
								breakdown: acertoBreakdown(calc.vendasBruto, calc.acertadoVendas)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "(−) Taxas de cartão",
								value: brl(calc.taxas),
								sub: "Despesa financeira",
								icon: CircleAlert,
								accent: "#0ea5e9"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "(−) Custo das peças",
								value: brl(calc.custo),
								sub: "CMV — reposição do estoque",
								icon: Building2,
								accent: "#16a34a",
								breakdown: acertoBreakdown(calc.custo, calc.acertadoCusto)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "(−) Despesa de viagem",
								value: brl(calc.despesasViagem),
								sub: "Combustível, hospedagem, alimentação",
								icon: CircleAlert,
								accent: "#a855f7"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "(−) Despesa da empresa",
								value: brl(calc.despesasEmpresa),
								sub: "Operacionais fora de viagem",
								icon: CircleAlert,
								accent: "#64748b"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: `(−) Reserva (${savedPct}%)`,
								value: brl(calc.reserva),
								sub: "Investimento sobre a venda total",
								icon: PiggyBank,
								accent: "#0d7377",
								breakdown: acertoBreakdown(calc.reserva, calc.acertadoReserva)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "= Lucro líquido",
								value: brl(calc.lucroLiquido),
								sub: "Resultado do período inteiro",
								icon: Wallet,
								accent: calc.lucroLiquido > 0 ? "#f97316" : "#94a3b8",
								breakdown: calc.temAcerto ? [
									{
										label: "Lucro contábil das vendas já acertadas (só cálculo)",
										value: brl(calc.acertadoLucro),
										accent: "#94a3b8"
									},
									{
										label: "✓ Retirada que você realmente recebeu nesses acertos",
										value: brl(calc.jaRetirada),
										accent: "#0d7377"
									},
									{
										label: "Ficou na empresa (não sobrou caixa no dia do acerto)",
										value: brl(Math.max(calc.acertadoLucro - calc.jaRetirada, 0)),
										accent: "#f59e0b"
									},
									{
										label: "Restante a retirar (vendas em aberto)",
										value: brl(calc.lucroAberto),
										accent: calc.lucroAberto > 0 ? "#16a34a" : "#94a3b8"
									}
								] : void 0
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBlock, {
					title: "2. Situação do caixa",
					hint: "Mesma base do lucro líquido: somente as vendas ainda não acertadas",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "Já recebido",
								value: brl(calc.realizadoAberto),
								sub: "PIX/Débito/Dinheiro + parcelas pagas (não acertadas)",
								icon: Wallet,
								accent: V2.TEAL
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "A receber",
								value: brl(receberTotalCard),
								sub: `${receberTodos.length} parcela(s) · clique para ver`,
								icon: Building2,
								accent: "#0ea5e9",
								onClick: () => setOpenReceber(true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
								label: "Caixa livre hoje",
								value: brl(calc.caixaLivreAberto),
								sub: "Recebido − despesas − taxas",
								icon: HandCoins,
								accent: calc.caixaLivreAberto > 0 ? "#16a34a" : "#94a3b8"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionBlock, {
					title: "2.1 Dinheiro da empresa (vendas já acertadas)",
					hint: "Parcelas de vendas cujo lucro você já retirou: o que entrar aqui é da empresa.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanyMoneyCards, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionBlock, {
					title: "3. Este acerto (o que sai da conta hoje)",
					hint: `Limitado ao caixa livre de ${brl(calc.caixaLivreAberto)}. Sua retirada primeiro; o que sobra vai para a empresa (custo + reserva) e o restante fica com a empresa nas parcelas a receber.`,
					highlight: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettlementCard, {
								label: "Sua retirada agora",
								value: brl(calc.pendenteRetirada),
								icon: HandCoins,
								accent: calc.pendenteRetirada > 0 ? "#16a34a" : "#94a3b8",
								lines: [
									`Lucro líquido das ${calc.pedidosAbertos} venda(s) não acertada(s): ${brl(calc.lucroIdeal)}`,
									`Fica para depois (aguardando parcelas): ${brl(calc.retiradaAguardando)}`,
									`Já retirado em acertos anteriores: ${brl(calc.jaRetirada)} (não entra aqui)`
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettlementCard, {
								label: "Empresa agora",
								value: brl(calc.pendenteEmpresa),
								icon: Building2,
								accent: calc.pendenteEmpresa > 0 ? "#16a34a" : "#94a3b8",
								lines: [
									`Custo das peças ${brl(calc.custoAberto)} + reserva ${brl(calc.reservaAberto)} = ${brl(calc.empresaPeriodo)}`,
									`Reservado de acertos anteriores: ${brl(calc.compromissoAnterior)}`,
									`Alvo total da empresa: ${brl(calc.totalIdealEmpresa)}`,
									`Fica reservado p/ as próximas parcelas: ${brl(calc.empresaAguardando)}`
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 text-xs",
							style: { color: V2.MUTED },
							children: [
								"Total deste acerto: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(calc.pendenteEmpresa + calc.pendenteRetirada) }),
								" — nunca maior que o caixa livre (",
								brl(calc.caixaLivreAberto),
								")."
							]
						}),
						calc.empresaAguardando > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-xl px-4 py-3 text-sm",
							style: {
								background: "#fff7ed",
								border: "1px solid #fed7aa",
								color: "#9a3412"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["Reservado para a empresa: ", brl(calc.empresaAguardando)] }), " — esse valor fica comprometido no sistema e será coberto automaticamente pelas parcelas que entrarem. Ele já entra somado no próximo acerto, antes de qualquer nova retirada extra."]
						})
					]
				}),
				fechamentosSobrepostos.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border p-4 mb-4 flex items-start gap-3",
					style: {
						borderColor: "#f59e0b",
						background: "#fef3c7"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, {
						className: "h-5 w-5 mt-0.5 shrink-0",
						style: { color: "#b45309" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm flex-1",
						style: { color: "#78350f" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold mb-1",
								children: [
									"Este período já teve ",
									fechamentosSobrepostos.length,
									" fechamento(s):"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: fechamentosSobrepostos.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
									"• ",
									new Date(f.created_at).toLocaleDateString("pt-BR"),
									" — empresa ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(f.valor_transferido) }),
									" (",
									accountNameById(f.account_id),
									") + retirada ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: brl(Number(f.valor_retirada || 0)) }),
									" (",
									accountNameById(f.account_id_pessoal),
									")",
									" ",
									"(",
									brDate(f.periodo_from),
									" → ",
									brDate(f.periodo_to),
									")"
								] }, f.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2",
								children: [
									"Este acerto considera apenas as ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [calc.pedidosAbertos, " venda(s) ainda não acertada(s)"] }),
									": empresa ",
									brl(calc.pendenteEmpresa),
									" + retirada ",
									brl(calc.pendenteRetirada),
									"."
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border p-5 mb-6",
					style: {
						borderColor: V2.GRAPHITE,
						background: V2.SURFACE
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold mb-1",
							style: { color: V2.TEXT },
							children: "Confirmar fechamento"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs mb-3",
							style: { color: V2.MUTED },
							children: [
								"Este passo efetiva o acerto: credita ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "custo + reserva" }),
								" na conta da empresa e a sua ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "retirada" }),
								" (lucro líquido − reserva) na conta pessoal."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 md:grid-cols-2 mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs mb-1",
								style: { color: V2.MUTED },
								children: "Conta da empresa (custo + reserva)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: accountId,
								onValueChange: setAccountId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione a conta" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: bankAccounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: a.id,
									children: [
										a.nome,
										" — saldo atual ",
										brl(a.saldo)
									]
								}, a.id)) })]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs mb-1",
								style: { color: V2.MUTED },
								children: "Conta pessoal (sua retirada)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: accountIdPessoal,
								onValueChange: setAccountIdPessoal,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecione a conta pessoal" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: bankAccounts.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
									value: a.id,
									children: [
										a.nome,
										" — saldo atual ",
										brl(a.saldo)
									]
								}, a.id)) })]
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs mb-1",
								style: { color: V2.MUTED },
								children: "Observação (opcional)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								value: obs,
								onChange: (e) => setObs(e.target.value),
								placeholder: "Ex: Viagem Uberlândia → Barretos"
							})]
						}),
						calc.lucroAberto <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border p-3 mb-3 text-sm",
							style: {
								borderColor: "#ef4444",
								background: "#fee2e2",
								color: "#991b1b"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Sem retirada pessoal:" }),
								" as vendas ainda não acertadas fecharam com lucro ",
								brl(calc.lucroAberto),
								". Não há como registrar retirada até que o resultado seja positivo."
							]
						}),
						calc.lucroAberto > 0 && calc.retiradaIdeal <= 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border p-3 mb-3 text-sm",
							style: {
								borderColor: "#f59e0b",
								background: "#fef3c7",
								color: "#78350f"
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Reserva consome todo o lucro:" }),
								" com ",
								savedPct,
								"% sobre a venda, a reserva (",
								brl(calc.reserva),
								") é maior ou igual ao lucro das vendas não acertadas (",
								brl(calc.lucroAberto),
								"). Diminua a % para liberar retirada."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 pt-3 border-t",
							style: { borderColor: V2.GRAPHITE },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm space-y-0.5",
								style: { color: V2.MUTED },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Empresa: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { color: V2.TEXT },
									children: brl(calc.pendenteEmpresa)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Retirada: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									style: { color: V2.TEXT },
									children: brl(calc.pendenteRetirada)
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								onClick: () => confirmar.mutate(),
								disabled: confirmar.isPending || !accountId || calc.lucroAberto <= 0 || calc.retiradaIdeal <= 0 || calc.pendenteEmpresa <= 0 && calc.pendenteRetirada <= 0,
								style: {
									background: V2.SUCCESS,
									color: "#fff"
								},
								className: "shadow-lg hover:shadow-xl transition-all hover:brightness-105",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-5 w-5 mr-2" }), confirmar.isPending ? "Registrando..." : "Confirmar fechamento"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border overflow-hidden",
					style: {
						borderColor: V2.GRAPHITE,
						background: V2.SURFACE
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-4 py-3 border-b font-semibold flex items-center justify-between",
						style: {
							borderColor: V2.GRAPHITE,
							color: V2.TEXT
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Histórico de fechamentos" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-normal",
							style: { color: V2.MUTED },
							children: [historico.length, " registro(s)"]
						})]
					}), historico.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-sm",
						style: { color: V2.MUTED },
						children: "Nenhum fechamento registrado ainda."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left border-b",
								style: {
									borderColor: V2.GRAPHITE,
									color: V2.MUTED
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2",
										children: "Registrado em"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2",
										children: "Período"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 text-right",
										children: "Vendas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 text-right",
										children: "Custo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 text-right",
										children: "Reserva"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 text-right",
										children: "Empresa"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2 text-right",
										children: "Retirada"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-2",
										children: "Contas"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2" })
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: historico.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b",
								style: { borderColor: V2.GRAPHITE },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2",
										style: { color: V2.TEXT },
										children: new Date(f.created_at).toLocaleDateString("pt-BR")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-2",
										style: { color: V2.TEXT },
										children: [
											brDate(f.periodo_from),
											" → ",
											brDate(f.periodo_to)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2 text-right",
										style: { color: V2.TEXT },
										children: brl(Number(f.vendas_periodo))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2 text-right",
										style: { color: V2.MUTED },
										children: brl(Number(f.custo_pecas_periodo))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-2 text-right",
										style: { color: V2.MUTED },
										children: [
											brl(Number(f.valor_reserva)),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-xs",
												children: [
													"(",
													Number(f.pct_reserva),
													"%)"
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2 text-right font-semibold",
										style: { color: "#16a34a" },
										children: brl(Number(f.valor_transferido))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2 text-right font-semibold",
										style: { color: "#16a34a" },
										children: brl(Number(f.valor_retirada || 0))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-2 text-xs",
										style: { color: V2.TEXT },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Emp: ", accountNameById(f.account_id)] }), f.account_id_pessoal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Pes: ", accountNameById(f.account_id_pessoal)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-2 text-right",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "sm",
											onClick: () => {
												if (confirm("Remover este fechamento? Os valores serão estornados dos saldos.")) remover.mutate(f.id);
											},
											className: "text-xs",
											children: "Remover"
										})
									})
								]
							}, f.id)) })]
						})
					})]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: openReceber,
				onOpenChange: setOpenReceber,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
						"A receber — ",
						brl(calc.aReceber + outrasReceberTotal),
						" · ",
						receberTodos.length,
						" parcela(s)"
					] }) }), receberTodos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 text-center text-sm",
						style: { color: V2.MUTED },
						children: "Nenhuma parcela pendente."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "max-h-[60vh] overflow-y-auto divide-y",
						style: { borderColor: V2.GRAPHITE },
						children: receberTodos.map((r) => {
							var _r$descricao5;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 py-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-sm font-medium truncate",
										style: { color: V2.TEXT },
										children: (_r$descricao5 = r.descricao) !== null && _r$descricao5 !== void 0 ? _r$descricao5 : "Recebível"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs mt-0.5",
										style: { color: V2.MUTED },
										children: [
											"Vence em ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
												style: { color: V2.TEXT },
												children: formatDate(r.vencimento)
											}),
											r.parcelas_total && r.parcelas_total > 1 ? ` · parcela ${r.parcela_num}/${r.parcelas_total}` : "",
											r.bandeira ? ` · ${r.bandeira}` : "",
											r.anterior ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ml-1 px-1.5 py-0.5 rounded",
												style: {
													background: "#f59e0b22",
													color: "#b45309"
												},
												children: "acerto anterior"
											}) : null
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-semibold shrink-0",
									style: { color: V2.TEXT },
									children: brl(Number(r.valor || 0))
								})]
							}, r.id);
						})
					})]
				})
			})
		]
	});
}
function ClosingStatement({ rows }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
		children: rows.map((r) => {
			const restante = Math.max(r.total - r.jaAcertado, 0);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border p-4",
				style: {
					borderColor: V2.GRAPHITE,
					background: r.bg
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm",
							style: {
								color: V2.TEXT,
								fontWeight: r.bold ? 700 : 500
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "#64748b" },
								children: r.prefix
							}), r.label]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-7 w-7 rounded-full grid place-items-center shrink-0",
							style: {
								background: `${r.accent}22`,
								color: r.accent
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2.5 w-2.5 rounded-full",
								style: { background: r.accent }
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-2xl font-semibold tabular-nums mb-3",
						style: { color: V2.TEXT },
						children: brl(r.total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3 pt-3 border-t",
						style: { borderColor: `${r.accent}30` },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] mb-0.5",
							style: { color: "#94a3b8" },
							children: "Já acertado"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold tabular-nums text-sm",
							style: { color: r.accent },
							children: brl(r.jaAcertado)
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] mb-0.5",
							style: { color: "#94a3b8" },
							children: "Restante"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold tabular-nums text-sm",
							style: { color: restante > 0 ? "#16a34a" : "#94a3b8" },
							children: brl(restante)
						})] })]
					})
				]
			}, r.label);
		})
	});
}
function KpiCard({ label, value, sub, icon: Icon, accent, onClick, breakdown }) {
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
		className: `rounded-2xl border p-4 ${clickable ? "cursor-pointer hover:brightness-105 transition" : ""}`,
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 w-8 rounded-lg grid place-items-center",
					style: {
						background: `${accent}22`,
						color: accent
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs",
					style: { color: V2.MUTED },
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xl font-bold",
				style: { color: V2.TEXT },
				children: value
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs mt-0.5",
				style: { color: V2.MUTED },
				children: sub
			}),
			breakdown && breakdown.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 pt-2 space-y-1 border-t",
				style: { borderColor: V2.GRAPHITE },
				children: breakdown.map((b) => {
					var _b$accent;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2 text-[11px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: V2.MUTED },
							children: b.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							style: { color: (_b$accent = b.accent) !== null && _b$accent !== void 0 ? _b$accent : V2.TEXT },
							children: b.value
						})]
					}, b.label);
				})
			})
		]
	});
}
function SectionBlock({ title, hint, highlight, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-4 mb-4",
		style: {
			borderColor: highlight ? V2.SUCCESS : V2.GRAPHITE,
			background: highlight ? "#f0fdf4" : "transparent"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-semibold",
				style: { color: V2.TEXT },
				children: title
			}), hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[11px] mt-0.5",
				style: { color: V2.MUTED },
				children: hint
			})]
		}), children]
	});
}
function SettlementCard({ label, value, lines, icon: Icon, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-5",
		style: {
			borderColor: V2.GRAPHITE,
			background: V2.SURFACE
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-8 w-8 rounded-lg grid place-items-center",
					style: {
						background: `${accent}22`,
						color: accent
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs",
					style: { color: V2.MUTED },
					children: label
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-3xl font-bold leading-tight",
				style: { color: accent },
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 space-y-0.5",
				children: lines.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px]",
					style: { color: V2.MUTED },
					children: l
				}, l))
			})
		]
	});
}
//#endregion
export { FechamentoPage as component };
