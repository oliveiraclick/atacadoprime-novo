import { _ as string, g as object } from "../_libs/@lovable.dev/mcp-js.mjs";
import { l as createServerFn } from "./esm-BG-5H9y6.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-bu9wKdsd.mjs";
import { t as createServerRpc } from "./createServerRpc-DRPbm2FP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/purchase.functions-Baiy4Lba.js
var deleteSchema = object({ purchaseOrderId: string().uuid() });
var deletePurchaseOrder_createServerFn_handler = createServerRpc({
	id: "8e752f335adf8bdf0273c4f4a47d906ab023ffd55b8ec2e0641a34545e3b61ad",
	name: "deletePurchaseOrder",
	filename: "src/lib/purchase.functions.ts"
}, (opts) => deletePurchaseOrder.__executeServer(opts));
var deletePurchaseOrder = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((d) => deleteSchema.parse(d)).handler(deletePurchaseOrder_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data: items, error: itemsError } = await supabaseAdmin.from("purchase_order_items").select("id, product_id, quantidade").eq("purchase_order_id", data.purchaseOrderId);
	if (itemsError) throw itemsError;
	for (const item of items !== null && items !== void 0 ? items : []) {
		if (!item.product_id) continue;
		const { error: stockError } = await supabaseAdmin.rpc("stock_apply_delta", {
			_product_id: item.product_id,
			_delta: Number(item.quantidade) * -1,
			_tipo: "SAIDA",
			_motivo: `Estorno exclusão compra ${data.purchaseOrderId.slice(0, 8)}`,
			_ref: data.purchaseOrderId,
			_allow_negative: true
		});
		if (stockError) throw stockError;
	}
	const { error: finError } = await supabaseAdmin.from("financial_transactions").delete().eq("purchase_order_id", data.purchaseOrderId);
	if (finError) throw finError;
	const { error: deleteItemsError } = await supabaseAdmin.from("purchase_order_items").delete().eq("purchase_order_id", data.purchaseOrderId);
	if (deleteItemsError) throw deleteItemsError;
	const { error: deletePoError } = await supabaseAdmin.from("purchase_orders").delete().eq("id", data.purchaseOrderId);
	if (deletePoError) throw deletePoError;
	return { ok: true };
});
//#endregion
export { deletePurchaseOrder_createServerFn_handler };
