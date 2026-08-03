import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as loadSalesQueue, s as updateOfflineSale } from "./offline-store-Ddf--0UV.mjs";
import { r as cartSubtotal } from "./use-cart-D1K0BW4t.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offline-sync-DZ35t7yP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useOnlineStatus() {
	const [online, setOnline] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined") return;
		setOnline(navigator.onLine);
		const up = () => setOnline(true);
		const down = () => setOnline(false);
		window.addEventListener("online", up);
		window.addEventListener("offline", down);
		return () => {
			window.removeEventListener("online", up);
			window.removeEventListener("offline", down);
		};
	}, []);
	return online;
}
var running = false;
async function ensureCompanyId(sale, userId) {
	if (sale.company_id) return sale.company_id;
	if (sale.lead_id) {
		const { data: lead } = await supabase.from("leads").select("company_id,empresa,contato,telefone,cidade,estado").eq("id", sale.lead_id).maybeSingle();
		if (lead === null || lead === void 0 ? void 0 : lead.company_id) return lead.company_id;
		if (lead) {
			var _lead$contato, _lead$telefone, _lead$cidade, _lead$estado;
			const { data: created, error } = await supabase.from("companies").insert({
				owner_id: userId,
				legal_name: lead.empresa,
				trade_name: (_lead$contato = lead.contato) !== null && _lead$contato !== void 0 ? _lead$contato : null,
				phone: (_lead$telefone = lead.telefone) !== null && _lead$telefone !== void 0 ? _lead$telefone : "não informado",
				cidade: (_lead$cidade = lead.cidade) !== null && _lead$cidade !== void 0 ? _lead$cidade : null,
				estado: (_lead$estado = lead.estado) !== null && _lead$estado !== void 0 ? _lead$estado : null
			}).select("id").single();
			if (error) throw error;
			await supabase.from("leads").update({ company_id: created.id }).eq("id", sale.lead_id);
			return created.id;
		}
	}
	if (sale.new_client) {
		var _sale$new_client$cida, _sale$new_client$esta;
		const { data: created, error } = await supabase.from("companies").insert({
			owner_id: userId,
			legal_name: sale.new_client.legal_name,
			phone: sale.new_client.phone || "não informado",
			cidade: (_sale$new_client$cida = sale.new_client.cidade) !== null && _sale$new_client$cida !== void 0 ? _sale$new_client$cida : null,
			estado: (_sale$new_client$esta = sale.new_client.estado) !== null && _sale$new_client$esta !== void 0 ? _sale$new_client$esta : null
		}).select("id").single();
		if (error) throw error;
		return created.id;
	}
	throw new Error("Venda offline sem cliente vinculado");
}
async function submitOne(sale, userId) {
	var _sale$frete, _sale$desconto, _sale$acrescimo, _sale$origem, _sale$frete2, _sale$desconto2, _sale$observacao;
	const company_id = await ensureCompanyId(sale, userId);
	const subtotal = cartSubtotal(sale.items);
	const total = subtotal + ((_sale$frete = sale.frete) !== null && _sale$frete !== void 0 ? _sale$frete : 0) - ((_sale$desconto = sale.desconto) !== null && _sale$desconto !== void 0 ? _sale$desconto : 0) + ((_sale$acrescimo = sale.acrescimo) !== null && _sale$acrescimo !== void 0 ? _sale$acrescimo : 0);
	const { data: order, error } = await supabase.from("orders").insert({
		company_id,
		address_id: null,
		origem: (_sale$origem = sale.origem) !== null && _sale$origem !== void 0 ? _sale$origem : "VISITA",
		status: "AGUARDANDO_PAGAMENTO",
		subtotal,
		frete: (_sale$frete2 = sale.frete) !== null && _sale$frete2 !== void 0 ? _sale$frete2 : 0,
		desconto: (_sale$desconto2 = sale.desconto) !== null && _sale$desconto2 !== void 0 ? _sale$desconto2 : 0,
		total,
		observacao: (_sale$observacao = sale.observacao) !== null && _sale$observacao !== void 0 ? _sale$observacao : null,
		created_by: userId
	}).select("id").single();
	if (error) throw error;
	const items = sale.items.map((i) => {
		var _i$desconto_pct;
		const preco_com_desc = (i.tipo_compra === "PACOTE" && i.preco_pacote ? Number(i.preco_pacote) : Number(i.preco_unitario)) * (1 - ((_i$desconto_pct = i.desconto_pct) !== null && _i$desconto_pct !== void 0 ? _i$desconto_pct : 0) / 100);
		return {
			order_id: order.id,
			product_id: i.product_id,
			tipo_compra: i.tipo_compra,
			quantidade: i.quantidade,
			preco_unitario: i.preco_unitario,
			preco_final: preco_com_desc,
			subtotal: preco_com_desc * i.quantidade
		};
	});
	const { error: itErr } = await supabase.from("order_items").insert(items);
	if (itErr) throw itErr;
	const { error: payErr } = await supabase.from("payments").insert({
		order_id: order.id,
		tipo: sale.pagamento,
		valor: total,
		status: "PENDENTE"
	});
	if (payErr) throw payErr;
	return order.id;
}
async function syncOfflineSales(userId) {
	if (!userId) return {
		sent: 0,
		failed: 0
	};
	if (running) return {
		sent: 0,
		failed: 0
	};
	if (typeof navigator !== "undefined" && !navigator.onLine) return {
		sent: 0,
		failed: 0
	};
	running = true;
	let sent = 0;
	let failed = 0;
	try {
		const pending = (await loadSalesQueue()).filter((s) => s.status === "pending" || s.status === "error");
		for (const sale of pending) {
			await updateOfflineSale(sale.local_id, {
				status: "sending",
				error: null
			});
			try {
				const remote_order_id = await submitOne(sale, userId);
				await updateOfflineSale(sale.local_id, {
					status: "sent",
					remote_order_id,
					error: null
				});
				sent++;
			} catch (e) {
				var _e$message;
				await updateOfflineSale(sale.local_id, {
					status: "error",
					error: (_e$message = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message !== void 0 ? _e$message : "Falha desconhecida"
				});
				failed++;
			}
		}
	} finally {
		running = false;
	}
	return {
		sent,
		failed
	};
}
//#endregion
export { useOnlineStatus as n, syncOfflineSales as t };
