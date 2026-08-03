import { r as supabase } from "./client-CtYDXrXg.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as useMyCompany, t as useAuth } from "./use-auth-DI-712Mw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-orders-CBi7bZ2w.js
function useCreateOrder() {
	const { user } = useAuth();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			var _input$acrescimo, _input$observacao, _input$trip_id;
			const payload = {
				company_id: input.company_id,
				address_id: input.address_id,
				origem: input.origem,
				frete: input.frete,
				desconto: input.desconto,
				acrescimo: (_input$acrescimo = input.acrescimo) !== null && _input$acrescimo !== void 0 ? _input$acrescimo : 0,
				observacao: (_input$observacao = input.observacao) !== null && _input$observacao !== void 0 ? _input$observacao : null,
				pagamento: input.pagamento,
				trip_id: (_input$trip_id = input.trip_id) !== null && _input$trip_id !== void 0 ? _input$trip_id : null,
				items: input.items.map((i) => {
					var _i$preco_pacote;
					return {
						product_id: i.product_id,
						tipo_compra: i.tipo_compra,
						quantidade: i.quantidade,
						preco_unitario: i.preco_unitario,
						preco_pacote: (_i$preco_pacote = i.preco_pacote) !== null && _i$preco_pacote !== void 0 ? _i$preco_pacote : null
					};
				})
			};
			const { data: orderId, error } = await supabase.rpc("order_create_atomic", { _payload: payload });
			if (error) throw error;
			const { data: { user: currentUser } } = await supabase.auth.getUser();
			if (currentUser) await supabase.from("leads").update({ status: "PEDIDO" }).eq("company_id", input.company_id).neq("status", "PEDIDO").or(`responsavel_id.eq.${currentUser.id},created_by.eq.${currentUser.id}`);
			return orderId;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["orders"] });
			qc.invalidateQueries({ queryKey: ["orders-admin"] });
			qc.invalidateQueries({ queryKey: ["order-stats"] });
			qc.invalidateQueries({ queryKey: ["crm"] });
		}
	});
}
function useMyOrders() {
	const { user } = useAuth();
	const { data: company } = useMyCompany(user);
	return useQuery({
		queryKey: ["orders", company === null || company === void 0 ? void 0 : company.id],
		enabled: !!company,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, companies(legal_name, trade_name), order_items(quantidade), payments(tipo, status, payment_link)").eq("company_id", company.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function useOrder(id) {
	return useQuery({
		queryKey: ["order", id],
		enabled: !!id,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, companies(legal_name, trade_name), addresses(*), order_items(*, products(nome, sku)), payments(*), order_history(*)").eq("id", id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
function useUpdateOrderStatus() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, status }) => {
			const { error } = await supabase.from("orders").update({ status }).eq("id", id);
			if (error) throw error;
			if (status === "PAGO") await supabase.from("payments").update({ status: "APROVADO" }).eq("order_id", id);
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["orders"] });
			qc.invalidateQueries({ queryKey: ["orders-admin"] });
			qc.invalidateQueries({ queryKey: ["order"] });
		}
	});
}
function useDeleteOrder() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			await supabase.from("payments").delete().eq("order_id", id);
			await supabase.from("order_items").delete().eq("order_id", id);
			await supabase.from("order_history").delete().eq("order_id", id);
			await supabase.from("financial_transactions").delete().eq("order_id", id);
			const { error } = await supabase.from("orders").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["orders"] });
			qc.invalidateQueries({ queryKey: ["orders-admin"] });
			qc.invalidateQueries({ queryKey: ["order"] });
			qc.invalidateQueries({ queryKey: ["fin-tx"] });
		}
	});
}
function useConfirmPayment() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			var _input$modalidade, _input$bandeira, _input$account_id, _input$parcelas, _input$prazos, _input$observacao2;
			const isCartao = input.tipo === "CARTAO";
			const modalidade = isCartao ? (_input$modalidade = input.modalidade) !== null && _input$modalidade !== void 0 ? _input$modalidade : "CREDITO" : null;
			const bandeira = isCartao ? (_input$bandeira = input.bandeira) !== null && _input$bandeira !== void 0 ? _input$bandeira : null : null;
			const antecipado = isCartao && modalidade === "CREDITO" ? !!input.antecipado : false;
			if (input.replace) {
				const { error: dErr } = await supabase.from("financial_transactions").delete().eq("order_id", input.order_id);
				if (dErr) throw dErr;
				const { error: sErr } = await supabase.from("orders").update({ status: "AGUARDANDO_PAGAMENTO" }).eq("id", input.order_id);
				if (sErr) throw sErr;
			}
			const { error: pErr } = await supabase.from("payments").update({
				status: input.tipo === "FATURADO" ? "PENDENTE" : "APROVADO",
				tipo: input.tipo,
				valor: input.total,
				account_id: (_input$account_id = input.account_id) !== null && _input$account_id !== void 0 ? _input$account_id : null,
				bandeira,
				antecipado,
				payload: {
					conta: input.conta,
					parcelas: (_input$parcelas = input.parcelas) !== null && _input$parcelas !== void 0 ? _input$parcelas : 1,
					prazos: input.tipo === "FATURADO" ? (_input$prazos = input.prazos) !== null && _input$prazos !== void 0 ? _input$prazos : [30] : null,
					observacao: (_input$observacao2 = input.observacao) !== null && _input$observacao2 !== void 0 ? _input$observacao2 : null,
					modalidade,
					bandeira,
					antecipado
				}
			}).eq("order_id", input.order_id);
			if (pErr) throw pErr;
			const { error: oErr } = await supabase.from("orders").update({ status: "PAGO" }).eq("id", input.order_id);
			if (oErr) throw oErr;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["order"] });
			qc.invalidateQueries({ queryKey: ["orders"] });
			qc.invalidateQueries({ queryKey: ["orders-admin"] });
			qc.invalidateQueries({ queryKey: ["bank-accounts-balances"] });
			qc.invalidateQueries({ queryKey: ["fin-tx"] });
		}
	});
}
function useUpdatePaymentLink() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ order_id, payment_link }) => {
			const { error } = await supabase.from("payments").update({ payment_link }).eq("order_id", order_id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["order"] });
		}
	});
}
function useUpdateOrderItems() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ order_id, items, frete, desconto }) => {
			for (const it of items) {
				const subtotal = Number(it.preco_final) * Number(it.quantidade);
				const { error } = await supabase.from("order_items").update({
					quantidade: it.quantidade,
					preco_final: it.preco_final,
					subtotal
				}).eq("id", it.id);
				if (error) throw error;
			}
			const subtotal = items.reduce((s, i) => s + Number(i.preco_final) * Number(i.quantidade), 0);
			const total = subtotal + Number(frete) - Number(desconto);
			const { error: oErr } = await supabase.from("orders").update({
				subtotal,
				frete,
				desconto,
				total
			}).eq("id", order_id);
			if (oErr) throw oErr;
			await supabase.from("payments").update({ valor: total }).eq("order_id", order_id);
			return {
				order_id,
				total
			};
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["order"] });
			qc.invalidateQueries({ queryKey: ["orders"] });
			qc.invalidateQueries({ queryKey: ["orders-admin"] });
		}
	});
}
//#endregion
export { useOrder as a, useUpdatePaymentLink as c, useMyOrders as i, useCreateOrder as n, useUpdateOrderItems as o, useDeleteOrder as r, useUpdateOrderStatus as s, useConfirmPayment as t };
