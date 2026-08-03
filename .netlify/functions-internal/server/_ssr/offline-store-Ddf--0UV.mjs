import { r as __exportAll } from "../_runtime.mjs";
import { r as supabase, t as __exportAll$1 } from "./client-CtYDXrXg.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { n as set, t as get } from "../_libs/idb-keyval.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offline-store-Ddf--0UV.js
var offline_store_Ddf__0UV_exports = /* @__PURE__ */ __exportAll({
	a: () => removeOfflineSale,
	i: () => offline_store_exports,
	n: () => loadCachedCatalog,
	o: () => syncCatalogFromServer,
	r: () => loadSalesQueue,
	s: () => updateOfflineSale,
	t: () => enqueueOfflineSale
});
var offline_store_exports = /* @__PURE__ */ __exportAll$1({
	enqueueOfflineSale: () => enqueueOfflineSale,
	loadCachedCatalog: () => loadCachedCatalog,
	loadSalesQueue: () => loadSalesQueue,
	removeOfflineSale: () => removeOfflineSale,
	saveSalesQueue: () => saveSalesQueue,
	syncCatalogFromServer: () => syncCatalogFromServer,
	updateOfflineSale: () => updateOfflineSale
});
var K = {
	products: "offline:catalog:products",
	categories: "offline:catalog:categories",
	brands: "offline:catalog:brands",
	companies: "offline:catalog:companies",
	leads: "offline:catalog:leads",
	syncedAt: "offline:catalog:syncedAt",
	imagesPrewarmed: "offline:catalog:imagesPrewarmed",
	salesQueue: "offline:sales:queue"
};
async function loadCachedCatalog() {
	const [products, categories, brands, companies, leads, syncedAt] = await Promise.all([
		get(K.products),
		get(K.categories),
		get(K.brands),
		get(K.companies),
		get(K.leads),
		get(K.syncedAt)
	]);
	return {
		products: products !== null && products !== void 0 ? products : [],
		categories: categories !== null && categories !== void 0 ? categories : [],
		brands: brands !== null && brands !== void 0 ? brands : [],
		companies: companies !== null && companies !== void 0 ? companies : [],
		leads: leads !== null && leads !== void 0 ? leads : [],
		syncedAt: syncedAt !== null && syncedAt !== void 0 ? syncedAt : null
	};
}
async function syncCatalogFromServer() {
	var _prod$data, _cat$data, _br$data, _comp$data, _lds$data;
	const [prod, cat, br, comp, lds] = await Promise.all([
		supabase.from("products").select("id,nome,sku,preco_unitario,preco_pacote,quantidade_pacote,estoque,tipo,categoria_id,marca_id,brands(nome),categories(nome),product_images(image_url,ordem)").eq("status", true).order("nome"),
		supabase.from("categories").select("id,nome").order("nome"),
		supabase.from("brands").select("id,nome").order("nome"),
		supabase.from("companies").select("id,legal_name,trade_name,phone,cidade,estado").order("legal_name"),
		supabase.from("leads").select("id,empresa,contato,telefone,cidade,estado,company_id").order("empresa")
	]);
	if (prod.error) throw prod.error;
	const products = ((_prod$data = prod.data) !== null && _prod$data !== void 0 ? _prod$data : []).map((p) => {
		var _p$product_images, _p$sku, _ref, _p$preco_unitario, _p$tipo, _p$categoria_id, _p$marca_id, _p$categories$nome, _p$categories, _p$brands$nome, _p$brands, _imgs$0$image_url, _imgs$;
		const imgs = ((_p$product_images = p.product_images) !== null && _p$product_images !== void 0 ? _p$product_images : []).slice().sort((a, b) => {
			var _a$ordem, _b$ordem;
			return ((_a$ordem = a.ordem) !== null && _a$ordem !== void 0 ? _a$ordem : 0) - ((_b$ordem = b.ordem) !== null && _b$ordem !== void 0 ? _b$ordem : 0);
		});
		return {
			id: p.id,
			nome: p.nome,
			sku: (_p$sku = p.sku) !== null && _p$sku !== void 0 ? _p$sku : null,
			preco: Number((_ref = (_p$preco_unitario = p.preco_unitario) !== null && _p$preco_unitario !== void 0 ? _p$preco_unitario : p.preco) !== null && _ref !== void 0 ? _ref : 0),
			preco_pacote: p.preco_pacote != null ? Number(p.preco_pacote) : null,
			quantidade_pacote: p.quantidade_pacote != null ? Number(p.quantidade_pacote) : null,
			estoque: p.estoque != null ? Number(p.estoque) : null,
			tipo: (_p$tipo = p.tipo) !== null && _p$tipo !== void 0 ? _p$tipo : null,
			categoria_id: (_p$categoria_id = p.categoria_id) !== null && _p$categoria_id !== void 0 ? _p$categoria_id : null,
			marca_id: (_p$marca_id = p.marca_id) !== null && _p$marca_id !== void 0 ? _p$marca_id : null,
			categoria_nome: (_p$categories$nome = (_p$categories = p.categories) === null || _p$categories === void 0 ? void 0 : _p$categories.nome) !== null && _p$categories$nome !== void 0 ? _p$categories$nome : null,
			marca_nome: (_p$brands$nome = (_p$brands = p.brands) === null || _p$brands === void 0 ? void 0 : _p$brands.nome) !== null && _p$brands$nome !== void 0 ? _p$brands$nome : null,
			imagem_url: (_imgs$0$image_url = (_imgs$ = imgs[0]) === null || _imgs$ === void 0 ? void 0 : _imgs$.image_url) !== null && _imgs$0$image_url !== void 0 ? _imgs$0$image_url : null
		};
	});
	await Promise.all([
		set(K.products, products),
		set(K.categories, (_cat$data = cat.data) !== null && _cat$data !== void 0 ? _cat$data : []),
		set(K.brands, (_br$data = br.data) !== null && _br$data !== void 0 ? _br$data : []),
		set(K.companies, (_comp$data = comp.data) !== null && _comp$data !== void 0 ? _comp$data : []),
		set(K.leads, (_lds$data = lds.data) !== null && _lds$data !== void 0 ? _lds$data : []),
		set(K.syncedAt, Date.now())
	]);
	prewarmImages(products.map((p) => p.imagem_url).filter(Boolean));
	return { count: products.length };
}
async function prewarmImages(urls) {
	if (typeof window === "undefined") return;
	const already = await get(K.imagesPrewarmed).catch(() => void 0);
	const done = new Set(Object.keys(already !== null && already !== void 0 ? already : {}));
	const todo = urls.filter((u) => !done.has(u));
	const batchSize = 6;
	for (let i = 0; i < todo.length; i += batchSize) {
		const batch = todo.slice(i, i + batchSize);
		await Promise.allSettled(batch.map(async (u) => {
			try {
				await fetch(u, {
					mode: "no-cors",
					cache: "force-cache"
				});
				done.add(u);
			} catch (_unused) {}
		}));
	}
	const map = {};
	for (const u of done) map[u] = true;
	await set(K.imagesPrewarmed, map).catch(() => {});
}
async function loadSalesQueue() {
	var _await$get;
	return (_await$get = await get(K.salesQueue)) !== null && _await$get !== void 0 ? _await$get : [];
}
async function saveSalesQueue(list) {
	await set(K.salesQueue, list);
}
async function enqueueOfflineSale(sale) {
	const list = await loadSalesQueue();
	list.push(sale);
	await saveSalesQueue(list);
}
async function removeOfflineSale(local_id) {
	await saveSalesQueue((await loadSalesQueue()).filter((s) => s.local_id !== local_id));
}
async function updateOfflineSale(local_id, patch) {
	await saveSalesQueue((await loadSalesQueue()).map((s) => s.local_id === local_id ? _objectSpread2(_objectSpread2({}, s), patch) : s));
}
//#endregion
export { removeOfflineSale as a, offline_store_Ddf__0UV_exports as i, loadCachedCatalog as n, syncCatalogFromServer as o, loadSalesQueue as r, updateOfflineSale as s, enqueueOfflineSale as t };
