import { r as supabase } from "./client-CtYDXrXg.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-bank-accounts-t3Tu7bOS.js
function useBankAccounts() {
	return useQuery({
		queryKey: ["bank-accounts-balances"],
		queryFn: async () => {
			const [{ data: accounts }, { data: txs }, { data: entries }, { data: trips }, { data: transfers }] = await Promise.all([
				supabase.from("bank_accounts").select("*").eq("ativo", true).order("nome"),
				supabase.from("financial_transactions").select("account_id, tipo, valor, status").eq("status", "PAGO"),
				supabase.from("financial_entries").select("account_id, tipo, valor"),
				supabase.from("trip_expenses").select("account_id, valor"),
				supabase.from("bank_transfers").select("from_account_id, to_account_id, valor")
			]);
			return (accounts !== null && accounts !== void 0 ? accounts : []).map((a) => {
				const acc = a;
				let entradas = Number(acc.saldo_inicial || 0);
				let saidas = 0;
				for (const t of txs !== null && txs !== void 0 ? txs : []) {
					if (t.account_id !== acc.id) continue;
					if (t.tipo === "RECEITA") entradas += Number(t.valor);
					else if (t.tipo === "DESPESA") saidas += Number(t.valor);
				}
				for (const e of entries !== null && entries !== void 0 ? entries : []) {
					if (e.account_id !== acc.id) continue;
					if (e.tipo === "RECEITA") entradas += Number(e.valor);
					else saidas += Number(e.valor);
				}
				for (const te of trips !== null && trips !== void 0 ? trips : []) if (te.account_id === acc.id) saidas += Number(te.valor);
				for (const tr of transfers !== null && transfers !== void 0 ? transfers : []) {
					if (tr.from_account_id === acc.id) saidas += Number(tr.valor);
					if (tr.to_account_id === acc.id) entradas += Number(tr.valor);
				}
				return _objectSpread2(_objectSpread2({}, acc), {}, {
					entradas,
					saidas,
					saldo: entradas - saidas
				});
			});
		}
	});
}
function useCreateBankTransfer() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			var _input$data, _input$observacao, _user$id;
			if (input.from_account_id === input.to_account_id) throw new Error("Conta origem e destino devem ser diferentes");
			if (!input.valor || input.valor <= 0) throw new Error("Informe um valor válido");
			const { data: { user } } = await supabase.auth.getUser();
			const { error } = await supabase.from("bank_transfers").insert({
				from_account_id: input.from_account_id,
				to_account_id: input.to_account_id,
				valor: input.valor,
				data: (_input$data = input.data) !== null && _input$data !== void 0 ? _input$data : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
				observacao: (_input$observacao = input.observacao) !== null && _input$observacao !== void 0 ? _input$observacao : null,
				created_by: (_user$id = user === null || user === void 0 ? void 0 : user.id) !== null && _user$id !== void 0 ? _user$id : null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
			qc.invalidateQueries({ queryKey: ["bank-transfers"] });
		}
	});
}
function useCreateBankAccount() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			var _input$banco, _input$tipo, _input$cor, _input$saldo_inicial, _input$observacao2, _user$id2;
			const { data: { user } } = await supabase.auth.getUser();
			const { error } = await supabase.from("bank_accounts").insert({
				nome: input.nome,
				banco: (_input$banco = input.banco) !== null && _input$banco !== void 0 ? _input$banco : null,
				tipo: (_input$tipo = input.tipo) !== null && _input$tipo !== void 0 ? _input$tipo : "CORRENTE",
				cor: (_input$cor = input.cor) !== null && _input$cor !== void 0 ? _input$cor : "#6366f1",
				saldo_inicial: Number((_input$saldo_inicial = input.saldo_inicial) !== null && _input$saldo_inicial !== void 0 ? _input$saldo_inicial : 0),
				observacao: (_input$observacao2 = input.observacao) !== null && _input$observacao2 !== void 0 ? _input$observacao2 : null,
				created_by: (_user$id2 = user === null || user === void 0 ? void 0 : user.id) !== null && _user$id2 !== void 0 ? _user$id2 : null
			});
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] })
	});
}
function useDeleteBankAccount() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("bank_accounts").update({ ativo: false }).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] })
	});
}
//#endregion
export { useDeleteBankAccount as i, useCreateBankAccount as n, useCreateBankTransfer as r, useBankAccounts as t };
