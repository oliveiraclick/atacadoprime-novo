import { _ as string, g as object } from "../_libs/@lovable.dev/mcp-js.mjs";
import { l as createServerFn } from "./esm-BG-5H9y6.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-bu9wKdsd.mjs";
import { r as signedOrderPdfPath } from "./pdf-CsVsL9dt.mjs";
import { t as createServerRpc } from "./createServerRpc-DRPbm2FP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/order-share.functions-BGVZNTWw.js
var schema = object({ orderId: string().uuid() });
var getOrderShare_createServerFn_handler = createServerRpc({
	id: "71c81ba1192ae4ab2d910d5c5b11fc68b9b1e27920658c12696428255685c1d8",
	name: "getOrderShare",
	filename: "src/lib/order-share.functions.ts"
}, (opts) => getOrderShare.__executeServer(opts));
var getOrderShare = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => schema.parse(d)).handler(getOrderShare_createServerFn_handler, async ({ data, context }) => {
	var _company$phone, _ref, _company$trade_name, _order$total;
	const { supabase } = context;
	const { data: order, error } = await supabase.from("orders").select("id, total, companies(trade_name, legal_name, phone)").eq("id", data.orderId).maybeSingle();
	if (error) throw error;
	if (!order) throw new Error("Pedido não encontrado");
	const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
	if (!secret) throw new Error("Servidor sem chave para assinar o PDF");
	const path = signedOrderPdfPath(order.id, secret);
	const company = order.companies;
	return {
		path,
		phone: (_company$phone = company === null || company === void 0 ? void 0 : company.phone) !== null && _company$phone !== void 0 ? _company$phone : null,
		name: (_ref = (_company$trade_name = company === null || company === void 0 ? void 0 : company.trade_name) !== null && _company$trade_name !== void 0 ? _company$trade_name : company === null || company === void 0 ? void 0 : company.legal_name) !== null && _ref !== void 0 ? _ref : null,
		total: Number((_order$total = order.total) !== null && _order$total !== void 0 ? _order$total : 0)
	};
});
//#endregion
export { getOrderShare_createServerFn_handler };
