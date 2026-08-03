import { _ as string, g as object, h as number, p as array } from "../_libs/@lovable.dev/mcp-js.mjs";
import { l as createServerFn } from "./esm-BG-5H9y6.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-bu9wKdsd.mjs";
import { t as createServerRpc } from "./createServerRpc-DRPbm2FP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shipping.functions-CVStPDE7.js
var CartItemSchema = object({
	product_id: string(),
	quantidade: number().int().positive(),
	preco_unitario: number()
});
var InputSchema = object({
	cepDestino: string().min(8),
	items: array(CartItemSchema).min(1)
});
var FROM_CEP = "38400454";
var SERVICES = "1,2,3";
var calculateShipping_createServerFn_handler = createServerRpc({
	id: "87fa976c53e2ed770ba0a10b119bddda639806f28586797d6826bfe67748b182",
	name: "calculateShipping",
	filename: "src/lib/shipping.functions.ts"
}, (opts) => calculateShipping.__executeServer(opts));
var calculateShipping = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((data) => InputSchema.parse(data)).handler(calculateShipping_createServerFn_handler, async ({ data }) => {
	const token = process.env.MELHOR_ENVIO_TOKEN;
	if (!token) throw new Error("MELHOR_ENVIO_TOKEN não configurado.");
	const cep = data.cepDestino.replace(/\D/g, "");
	if (cep.length !== 8) throw new Error("CEP inválido.");
	const products = data.items.map((i) => ({
		id: i.product_id,
		width: 16,
		height: 11,
		length: 11,
		weight: .3,
		insurance_value: Number(i.preco_unitario) || 0,
		quantity: i.quantidade
	}));
	const res = await fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
			"User-Agent": "AtacadoPrime (suporte@atacadoprime.com.br)"
		},
		body: JSON.stringify({
			from: { postal_code: FROM_CEP },
			to: { postal_code: cep },
			products,
			services: SERVICES,
			options: {
				receipt: false,
				own_hand: false,
				insurance_value: 0
			}
		})
	});
	if (!res.ok) {
		const txt = await res.text();
		console.error("Melhor Envio error:", res.status, txt);
		throw new Error(`Falha ao calcular frete (${res.status}).`);
	}
	return (await res.json()).map((s) => {
		var _s$company$name, _s$company, _s$price, _s$delivery_time;
		return {
			id: s.id,
			name: s.name,
			company: (_s$company$name = (_s$company = s.company) === null || _s$company === void 0 ? void 0 : _s$company.name) !== null && _s$company$name !== void 0 ? _s$company$name : "",
			price: Number((_s$price = s.price) !== null && _s$price !== void 0 ? _s$price : 0),
			delivery_days: Number((_s$delivery_time = s.delivery_time) !== null && _s$delivery_time !== void 0 ? _s$delivery_time : 0),
			error: s.error
		};
	});
});
//#endregion
export { calculateShipping_createServerFn_handler };
