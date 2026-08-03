import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-cart-D1K0BW4t.js
var TIER_3_MIN = 1e3;
function tierFor(listSubtotal) {
	if (listSubtotal >= 1e3) return 3;
	if (listSubtotal >= 500) return 2;
	return 1;
}
/** Preço unitário efetivo conforme a faixa (só afeta venda UNITÁRIA). */
function effectiveUnitPrice(i, tier) {
	var _i$preco_pacote, _i$preco_nivel_, _i$preco_nivel_2, _i$preco_nivel_3;
	if (i.tipo_compra === "PACOTE") return Number((_i$preco_pacote = i.preco_pacote) !== null && _i$preco_pacote !== void 0 ? _i$preco_pacote : 0);
	const n1 = Number((_i$preco_nivel_ = i.preco_nivel_1) !== null && _i$preco_nivel_ !== void 0 ? _i$preco_nivel_ : i.preco_unitario);
	const n2 = Number((_i$preco_nivel_2 = i.preco_nivel_2) !== null && _i$preco_nivel_2 !== void 0 ? _i$preco_nivel_2 : n1);
	const n3 = Number((_i$preco_nivel_3 = i.preco_nivel_3) !== null && _i$preco_nivel_3 !== void 0 ? _i$preco_nivel_3 : n2);
	return tier === 3 ? n3 : tier === 2 ? n2 : n1;
}
/** Subtotal usando a lista (nível 1) — usado para decidir a faixa vigente. */
function cartListSubtotal(items) {
	return items.reduce((s, i) => {
		var _i$preco_pacote2, _i$preco_nivel_4, _i$desconto_pct;
		const p = i.tipo_compra === "PACOTE" ? Number((_i$preco_pacote2 = i.preco_pacote) !== null && _i$preco_pacote2 !== void 0 ? _i$preco_pacote2 : 0) : Number((_i$preco_nivel_4 = i.preco_nivel_1) !== null && _i$preco_nivel_4 !== void 0 ? _i$preco_nivel_4 : i.preco_unitario);
		const desc = (_i$desconto_pct = i.desconto_pct) !== null && _i$desconto_pct !== void 0 ? _i$desconto_pct : 0;
		return s + p * i.quantidade * (1 - desc / 100);
	}, 0);
}
/** Subtotal efetivo aplicando a faixa. */
function cartEffectiveSubtotal(items) {
	const tier = tierFor(cartListSubtotal(items));
	return {
		subtotal: items.reduce((s, i) => {
			var _i$desconto_pct2;
			const unit = effectiveUnitPrice(i, tier);
			const desc = (_i$desconto_pct2 = i.desconto_pct) !== null && _i$desconto_pct2 !== void 0 ? _i$desconto_pct2 : 0;
			return s + unit * i.quantidade * (1 - desc / 100);
		}, 0),
		tier
	};
}
var useCart = create()(persist((set) => ({
	items: [],
	add: (item) => set((s) => {
		var _item$quantidade2;
		const idx = s.items.findIndex((i) => i.product_id === item.product_id && i.tipo_compra === item.tipo_compra);
		if (idx >= 0) {
			var _item$quantidade;
			const next = [...s.items];
			next[idx] = _objectSpread2(_objectSpread2({}, next[idx]), {}, { quantidade: next[idx].quantidade + ((_item$quantidade = item.quantidade) !== null && _item$quantidade !== void 0 ? _item$quantidade : 1) });
			return { items: next };
		}
		return { items: [...s.items, _objectSpread2(_objectSpread2({}, item), {}, { quantidade: (_item$quantidade2 = item.quantidade) !== null && _item$quantidade2 !== void 0 ? _item$quantidade2 : 1 })] };
	}),
	remove: (product_id, tipo) => set((s) => ({ items: s.items.filter((i) => !(i.product_id === product_id && i.tipo_compra === tipo)) })),
	setQty: (product_id, tipo, qty) => set((s) => ({ items: s.items.map((i) => i.product_id === product_id && i.tipo_compra === tipo ? _objectSpread2(_objectSpread2({}, i), {}, { quantidade: Math.max(1, qty) }) : i) })),
	setDesconto: (product_id, tipo, pct) => set((s) => ({ items: s.items.map((i) => i.product_id === product_id && i.tipo_compra === tipo ? _objectSpread2(_objectSpread2({}, i), {}, { desconto_pct: Math.min(100, Math.max(0, pct)) }) : i) })),
	setPreco: (product_id, tipo, preco) => set((s) => ({ items: s.items.map((i) => {
		if (i.product_id !== product_id || i.tipo_compra !== tipo) return i;
		const v = Math.max(0, Number.isFinite(preco) ? preco : 0);
		if (tipo === "PACOTE") return _objectSpread2(_objectSpread2({}, i), {}, { preco_pacote: v });
		return _objectSpread2(_objectSpread2({}, i), {}, {
			preco_unitario: v,
			preco_nivel_1: v,
			preco_nivel_2: v,
			preco_nivel_3: v
		});
	}) })),
	setTipo: (product_id, from, to) => set((s) => {
		const it = s.items.find((i) => i.product_id === product_id && i.tipo_compra === from);
		if (!it) return s;
		let qty = it.quantidade;
		if (from === "UNITARIO" && to === "PACOTE") qty = Math.max(1, Math.floor(it.quantidade / it.quantidade_pacote));
		if (from === "PACOTE" && to === "UNITARIO") qty = it.quantidade * it.quantidade_pacote;
		const others = s.items.filter((i) => !(i.product_id === product_id && i.tipo_compra === from));
		if (others.find((i) => i.product_id === product_id && i.tipo_compra === to)) return { items: others.map((i) => i.product_id === product_id && i.tipo_compra === to ? _objectSpread2(_objectSpread2({}, i), {}, { quantidade: i.quantidade + qty }) : i) };
		return { items: [...others, _objectSpread2(_objectSpread2({}, it), {}, {
			tipo_compra: to,
			quantidade: qty
		})] };
	}),
	clear: () => set({ items: [] })
}), { name: "cart-v1" }));
if (typeof window !== "undefined") window.addEventListener("storage", (e) => {
	if (e.key === "cart-v1") useCart.persist.rehydrate();
});
function itemLineTotal(i) {
	var _i$desconto_pct3;
	const unit = i.tipo_compra === "PACOTE" && i.preco_pacote ? Number(i.preco_pacote) : Number(i.preco_unitario);
	const desc = (_i$desconto_pct3 = i.desconto_pct) !== null && _i$desconto_pct3 !== void 0 ? _i$desconto_pct3 : 0;
	return unit * i.quantidade * (1 - desc / 100);
}
function cartSubtotal(items) {
	return items.reduce((s, i) => s + itemLineTotal(i), 0);
}
function cartUnitCount(items) {
	return items.reduce((s, i) => s + i.quantidade * (i.tipo_compra === "PACOTE" ? i.quantidade_pacote : 1), 0);
}
//#endregion
export { effectiveUnitPrice as a, cartUnitCount as i, cartEffectiveSubtotal as n, itemLineTotal as o, cartSubtotal as r, useCart as s, TIER_3_MIN as t };
