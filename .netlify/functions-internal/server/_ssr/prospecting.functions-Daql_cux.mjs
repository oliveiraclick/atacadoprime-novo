import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { l as createServerFn } from "./esm-BG-5H9y6.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-bu9wKdsd.mjs";
import { t as createServerRpc } from "./createServerRpc-DRPbm2FP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/prospecting.functions-Daql_cux.js
var GMAPS_GATEWAY = "https://connector-gateway.lovable.dev/google_maps";
var CHAVEIROS_NET_BASE = "https://www.chaveiros.net";
function slugify(s) {
	return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function onlyDigits(s) {
	return (s !== null && s !== void 0 ? s : "").replace(/\D/g, "");
}
function stripHtml(s) {
	return s.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&amp;/gi, "&").replace(/&quot;/gi, "\"").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
}
function absoluteChaveirosNetUrl(href) {
	if (href.startsWith("http")) return href;
	return `${CHAVEIROS_NET_BASE}${href.startsWith("/") ? href : `/${href}`}`;
}
async function fetchChaveirosNetHtml(url) {
	const res = await fetch(url, { headers: {
		Accept: "text/html,application/xhtml+xml",
		"User-Agent": "Mozilla/5.0 (compatible; AtacadoPrimeProspector/1.0)"
	} });
	if (!res.ok) throw new Error(`Chaveiros.net retornou HTTP ${res.status}`);
	return res.text();
}
async function findChaveirosNetCityUrl(cidade, estado) {
	const uf = estado.toLowerCase();
	const cidadeSlug = slugify(cidade);
	const ufHtml = await fetchChaveirosNetHtml(`${CHAVEIROS_NET_BASE}/uf/${uf}`);
	const cityLinkRegex = /<a\b[^>]*href=["']([^"']*(?:\/)?cidade\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
	let match;
	while (match = cityLinkRegex.exec(ufHtml)) {
		const href = absoluteChaveirosNetUrl(match[1]);
		const labelSlug = slugify(stripHtml(match[2]));
		if (href.includes(`/cidade/chaveiro-em-${cidadeSlug}-${uf}`) || labelSlug === `chaveiros-em-${cidadeSlug}`) return href;
	}
	return `${CHAVEIROS_NET_BASE}/cidade/chaveiro-em-${cidadeSlug}-${uf}`;
}
function parseChaveirosNetHtml(html, pageUrl, cidade, estado) {
	const blocks = html.split(/<div class=["']divlistaempresas["'][^>]*>/i).slice(1);
	const parsed = [];
	blocks.forEach((block, index) => {
		var _block$match, _phoneMatch$;
		const nameMatch = block.match(/<h3>\s*<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>\s*<\/h3>/i);
		if (!nameMatch) return;
		const empresa = stripHtml(nameMatch[2]);
		if (!empresa) return;
		const phoneMatch = (_block$match = block.match(/href=["']tel:([^"']+)["'][^>]*>\s*([^<]+)\s*<\/a>/i)) !== null && _block$match !== void 0 ? _block$match : block.match(/<div[^>]*class=["'][^"']*estabfone[^"']*["'][^>]*>[\s\S]*?<p[^>]*>\s*([^<]+)\s*<\/p>/i);
		const phone = phoneMatch ? ((_phoneMatch$ = phoneMatch[2]) !== null && _phoneMatch$ !== void 0 ? _phoneMatch$ : phoneMatch[1]).trim() : null;
		const addressMatch = block.match(/<span class=["']endereco["']>([\s\S]*?)<\/span>/i);
		const websiteMatch = block.match(/<a\b[^>]*title=["']acessar site["'][^>]*href=["']([^"']+)["']/i);
		const ratingMatch = block.match(/title=["']Nota\s*([\d.,]+)/i);
		const profileUrl = nameMatch[1] ? absoluteChaveirosNetUrl(nameMatch[1]) : pageUrl;
		parsed.push({
			source: "chaveiros_net",
			external_id: `${slugify(empresa)}-${onlyDigits(phone) || index}`,
			empresa,
			contato: null,
			telefone: phone,
			whatsapp: phone,
			endereco: addressMatch ? stripHtml(addressMatch[1]).replace(/Endereço copiado!?/gi, "").trim() : null,
			cidade,
			estado: estado.toUpperCase(),
			latitude: null,
			longitude: null,
			rating: ratingMatch ? Number(ratingMatch[1].replace(",", ".")) : null,
			website: websiteMatch ? websiteMatch[1] : null,
			url: profileUrl
		});
	});
	return parsed;
}
function extractChaveirosNetPaginationUrls(html, cityUrl) {
	const urls = /* @__PURE__ */ new Set();
	const paginationRegex = /href=["']([^"']*\/cidade\/[^"']*\/pagina\d+)["']/gi;
	let match;
	while (match = paginationRegex.exec(html)) {
		const url = absoluteChaveirosNetUrl(match[1]);
		if (url.startsWith(cityUrl)) urls.add(url);
	}
	return Array.from(urls);
}
async function searchGoogleMaps(cidade, estado) {
	const lovableKey = process.env.LOVABLE_API_KEY;
	const gmapsKey = process.env.GOOGLE_MAPS_API_KEY;
	if (!lovableKey || !gmapsKey) return [];
	const queries = [
		`chaveiros em ${cidade}, ${estado}, Brasil`,
		`chaveiro 24 horas em ${cidade}, ${estado}`,
		`chaveiro automotivo em ${cidade}, ${estado}`,
		`chaveiro residencial em ${cidade}, ${estado}`
	];
	const all = [];
	for (const textQuery of queries) {
		let pageToken = void 0;
		for (let page = 0; page < 3; page++) {
			var _json$places;
			const body = {
				textQuery,
				languageCode: "pt-BR",
				regionCode: "BR",
				pageSize: 20
			};
			if (pageToken) body.pageToken = pageToken;
			const res = await fetch(`${GMAPS_GATEWAY}/places/v1/places:searchText`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${lovableKey}`,
					"X-Connection-Api-Key": gmapsKey,
					"Content-Type": "application/json",
					"X-Goog-FieldMask": "nextPageToken,places.id,places.displayName,places.formattedAddress,places.location,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.rating,places.googleMapsUri"
				},
				body: JSON.stringify(body)
			});
			if (!res.ok) break;
			const json = await res.json();
			const places = (_json$places = json === null || json === void 0 ? void 0 : json.places) !== null && _json$places !== void 0 ? _json$places : [];
			for (const p of places) {
				var _ref, _p$nationalPhoneNumbe, _p$displayName$text, _p$displayName, _p$formattedAddress, _p$location$latitude, _p$location, _p$location$longitude, _p$location2, _p$rating, _p$websiteUri, _p$googleMapsUri;
				const phone = (_ref = (_p$nationalPhoneNumbe = p.nationalPhoneNumber) !== null && _p$nationalPhoneNumbe !== void 0 ? _p$nationalPhoneNumbe : p.internationalPhoneNumber) !== null && _ref !== void 0 ? _ref : null;
				all.push({
					source: "google_maps",
					external_id: p.id,
					empresa: (_p$displayName$text = (_p$displayName = p.displayName) === null || _p$displayName === void 0 ? void 0 : _p$displayName.text) !== null && _p$displayName$text !== void 0 ? _p$displayName$text : "Sem nome",
					contato: null,
					telefone: phone,
					whatsapp: phone,
					endereco: (_p$formattedAddress = p.formattedAddress) !== null && _p$formattedAddress !== void 0 ? _p$formattedAddress : null,
					cidade,
					estado: estado.toUpperCase(),
					latitude: (_p$location$latitude = (_p$location = p.location) === null || _p$location === void 0 ? void 0 : _p$location.latitude) !== null && _p$location$latitude !== void 0 ? _p$location$latitude : null,
					longitude: (_p$location$longitude = (_p$location2 = p.location) === null || _p$location2 === void 0 ? void 0 : _p$location2.longitude) !== null && _p$location$longitude !== void 0 ? _p$location$longitude : null,
					rating: (_p$rating = p.rating) !== null && _p$rating !== void 0 ? _p$rating : null,
					website: (_p$websiteUri = p.websiteUri) !== null && _p$websiteUri !== void 0 ? _p$websiteUri : null,
					url: (_p$googleMapsUri = p.googleMapsUri) !== null && _p$googleMapsUri !== void 0 ? _p$googleMapsUri : null
				});
			}
			pageToken = json === null || json === void 0 ? void 0 : json.nextPageToken;
			if (!pageToken) break;
			await new Promise((r) => setTimeout(r, 2e3));
		}
	}
	return all;
}
async function searchChaveirosNet(cidade, estado) {
	const cidadeSlug = slugify(cidade);
	const directResults = [];
	try {
		const cityUrl = await findChaveirosNetCityUrl(cidade, estado);
		const queue = [cityUrl];
		const visited = /* @__PURE__ */ new Set();
		while (queue.length && visited.size < 12) {
			const pageUrl = queue.shift();
			if (!pageUrl || visited.has(pageUrl)) continue;
			visited.add(pageUrl);
			const html = await fetchChaveirosNetHtml(pageUrl);
			directResults.push(...parseChaveirosNetHtml(html, pageUrl, cidade, estado));
			for (const nextUrl of extractChaveirosNetPaginationUrls(html, cityUrl)) if (!visited.has(nextUrl) && !queue.includes(nextUrl)) queue.push(nextUrl);
		}
		if (directResults.length) return dedupe(directResults);
	} catch (e) {
		console.error("chaveiros.net direct scrape failed", e);
	}
	const apiKey = process.env.FIRECRAWL_API_KEY;
	if (!apiKey) return [];
	const schema = {
		type: "object",
		properties: { chaveiros: {
			type: "array",
			items: {
				type: "object",
				properties: {
					nome: { type: "string" },
					telefone: { type: "string" },
					whatsapp: { type: "string" },
					endereco: { type: "string" }
				},
				required: ["nome"]
			}
		} },
		required: ["chaveiros"]
	};
	try {
		const { default: Firecrawl } = await import("../_libs/@mendable/firecrawl-js.mjs").then((n) => n.t);
		const fc = new Firecrawl({ apiKey });
		const collected = [];
		let usedUrl = null;
		for (const url of [`${CHAVEIROS_NET_BASE}/uf/${estado.toLowerCase()}`, `${CHAVEIROS_NET_BASE}/cidade/chaveiro-em-${cidadeSlug}-${estado.toLowerCase()}`]) try {
			var _ref2, _result$json$chaveiro, _result$json, _result$data;
			const result = await fc.scrape(url, {
				formats: [{
					type: "json",
					schema,
					prompt: "Extraia TODOS os chaveiros listados na página, com nome (obrigatório), telefone, whatsapp e endereço completo. Se houver paginação, extraia apenas desta página."
				}],
				onlyMainContent: true
			});
			const items = (_ref2 = (_result$json$chaveiro = result === null || result === void 0 || (_result$json = result.json) === null || _result$json === void 0 ? void 0 : _result$json.chaveiros) !== null && _result$json$chaveiro !== void 0 ? _result$json$chaveiro : result === null || result === void 0 || (_result$data = result.data) === null || _result$data === void 0 || (_result$data = _result$data.json) === null || _result$data === void 0 ? void 0 : _result$data.chaveiros) !== null && _ref2 !== void 0 ? _ref2 : [];
			if (items.length) {
				collected.push(...items);
				usedUrl = url;
				break;
			}
		} catch (_unused) {}
		if (!collected.length) try {
			var _ref3, _search$web;
			const search = await fc.search(`chaveiros ${cidade} ${estado} site:chaveiros.net`, {
				limit: 20,
				scrapeOptions: { formats: [{
					type: "json",
					schema,
					prompt: "Liste todos os chaveiros (nome, telefone, whatsapp, endereço) presentes na página."
				}] }
			});
			const webResults = (_ref3 = (_search$web = search === null || search === void 0 ? void 0 : search.web) !== null && _search$web !== void 0 ? _search$web : search === null || search === void 0 ? void 0 : search.data) !== null && _ref3 !== void 0 ? _ref3 : [];
			for (const w of webResults) {
				var _w$json$chaveiros, _w$json;
				const items = (_w$json$chaveiros = w === null || w === void 0 || (_w$json = w.json) === null || _w$json === void 0 ? void 0 : _w$json.chaveiros) !== null && _w$json$chaveiros !== void 0 ? _w$json$chaveiros : [];
				if (items.length) {
					var _ref4, _usedUrl;
					collected.push(...items);
					usedUrl = (_ref4 = (_usedUrl = usedUrl) !== null && _usedUrl !== void 0 ? _usedUrl : w === null || w === void 0 ? void 0 : w.url) !== null && _ref4 !== void 0 ? _ref4 : null;
				}
			}
		} catch (e) {
			console.error("chaveiros.net search fallback failed", e);
		}
		return collected.map((it, i) => {
			var _ref5, _it$telefone, _it$nome, _it$nome2, _it$whatsapp, _it$endereco;
			const phone = (_ref5 = (_it$telefone = it.telefone) !== null && _it$telefone !== void 0 ? _it$telefone : it.whatsapp) !== null && _ref5 !== void 0 ? _ref5 : null;
			return {
				source: "chaveiros_net",
				external_id: `${cidadeSlug}-${i}-${onlyDigits(phone) || slugify((_it$nome = it.nome) !== null && _it$nome !== void 0 ? _it$nome : "")}`,
				empresa: (_it$nome2 = it.nome) !== null && _it$nome2 !== void 0 ? _it$nome2 : "Sem nome",
				contato: null,
				telefone: phone,
				whatsapp: (_it$whatsapp = it.whatsapp) !== null && _it$whatsapp !== void 0 ? _it$whatsapp : phone,
				endereco: (_it$endereco = it.endereco) !== null && _it$endereco !== void 0 ? _it$endereco : null,
				cidade,
				estado: estado.toUpperCase(),
				latitude: null,
				longitude: null,
				rating: null,
				website: null,
				url: usedUrl
			};
		});
	} catch (e) {
		console.error("chaveiros.net scrape failed", e);
		return [];
	}
}
function dedupe(results) {
	const seen = /* @__PURE__ */ new Map();
	for (const r of results) {
		var _r$cidade;
		const key = onlyDigits(r.telefone) || `${slugify(r.empresa)}|${slugify((_r$cidade = r.cidade) !== null && _r$cidade !== void 0 ? _r$cidade : "")}`;
		const prev = seen.get(key);
		if (!prev || prev.source === "chaveiros_net" && r.source === "google_maps") seen.set(key, r);
	}
	return Array.from(seen.values());
}
var prospectSearch_createServerFn_handler = createServerRpc({
	id: "306c6b936bc54eca00b64647030e557cdd789cc2bc9534b50732fcfa4a7cbb6d",
	name: "prospectSearch",
	filename: "src/lib/prospecting.functions.ts"
}, (opts) => prospectSearch.__executeServer(opts));
var prospectSearch = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	var _input$cidade, _input$estado, _input$sources;
	if (!(input === null || input === void 0 || (_input$cidade = input.cidade) === null || _input$cidade === void 0 ? void 0 : _input$cidade.trim())) throw new Error("Cidade obrigatória");
	if (!(input === null || input === void 0 || (_input$estado = input.estado) === null || _input$estado === void 0 ? void 0 : _input$estado.trim()) || input.estado.length !== 2) throw new Error("Estado (UF) obrigatório, 2 letras");
	return {
		cidade: input.cidade.trim().slice(0, 100),
		estado: input.estado.trim().toUpperCase().slice(0, 2),
		sources: ((_input$sources = input.sources) === null || _input$sources === void 0 ? void 0 : _input$sources.length) ? input.sources : ["google_maps", "chaveiros_net"]
	};
}).handler(prospectSearch_createServerFn_handler, async ({ data, context }) => {
	var _leadsRes$data, _compsRes$data;
	const tasks = [];
	if (data.sources.includes("google_maps")) tasks.push(searchGoogleMaps(data.cidade, data.estado));
	if (data.sources.includes("chaveiros_net")) tasks.push(searchChaveirosNet(data.cidade, data.estado));
	const results = dedupe((await Promise.all(tasks)).flat());
	const [leadsRes, compsRes] = await Promise.all([context.supabase.from("leads").select("id,empresa,telefone,whatsapp,cidade").ilike("cidade", `%${data.cidade}%`), context.supabase.from("companies").select("id,legal_name,trade_name,phone,cidade").ilike("cidade", `%${data.cidade}%`)]);
	const leadByPhone = /* @__PURE__ */ new Map();
	const leadByName = /* @__PURE__ */ new Map();
	((_leadsRes$data = leadsRes.data) !== null && _leadsRes$data !== void 0 ? _leadsRes$data : []).forEach((l) => {
		var _l$empresa, _l$cidade;
		const p = onlyDigits(l.telefone) || onlyDigits(l.whatsapp);
		if (p) leadByPhone.set(p, l.id);
		leadByName.set(`${slugify((_l$empresa = l.empresa) !== null && _l$empresa !== void 0 ? _l$empresa : "")}|${slugify((_l$cidade = l.cidade) !== null && _l$cidade !== void 0 ? _l$cidade : "")}`, l.id);
	});
	const compByPhone = /* @__PURE__ */ new Map();
	const compByName = /* @__PURE__ */ new Map();
	((_compsRes$data = compsRes.data) !== null && _compsRes$data !== void 0 ? _compsRes$data : []).forEach((c) => {
		var _ref6, _c$trade_name, _c$cidade;
		const p = onlyDigits(c.phone);
		if (p) compByPhone.set(p, c.id);
		compByName.set(`${slugify((_ref6 = (_c$trade_name = c.trade_name) !== null && _c$trade_name !== void 0 ? _c$trade_name : c.legal_name) !== null && _ref6 !== void 0 ? _ref6 : "")}|${slugify((_c$cidade = c.cidade) !== null && _c$cidade !== void 0 ? _c$cidade : "")}`, c.id);
	});
	return { results: results.map((r) => {
		var _r$cidade2;
		const phone = onlyDigits(r.telefone) || onlyDigits(r.whatsapp);
		const nameKey = `${slugify(r.empresa)}|${slugify((_r$cidade2 = r.cidade) !== null && _r$cidade2 !== void 0 ? _r$cidade2 : "")}`;
		const compId = phone && compByPhone.get(phone) || compByName.get(nameKey);
		if (compId) return _objectSpread2(_objectSpread2({}, r), {}, {
			match: "client",
			existing_id: compId
		});
		const leadId = phone && leadByPhone.get(phone) || leadByName.get(nameKey);
		if (leadId) return _objectSpread2(_objectSpread2({}, r), {}, {
			match: "lead",
			existing_id: leadId
		});
		return _objectSpread2(_objectSpread2({}, r), {}, {
			match: "new",
			existing_id: null
		});
	}) };
});
var importProspectAsLead_createServerFn_handler = createServerRpc({
	id: "b70f218ece30bc43e3e00f895d603317ce2fb3e2bc46bd7a6124a7a975fb8c7d",
	name: "importProspectAsLead",
	filename: "src/lib/prospecting.functions.ts"
}, (opts) => importProspectAsLead.__executeServer(opts));
var importProspectAsLead = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => {
	var _input$prospect;
	if (!(input === null || input === void 0 || (_input$prospect = input.prospect) === null || _input$prospect === void 0 ? void 0 : _input$prospect.empresa)) throw new Error("Prospect inválido");
	return input;
}).handler(importProspectAsLead_createServerFn_handler, async ({ data, context }) => {
	var _p$contato;
	const p = data.prospect;
	const observacoes = [
		`Origem: ${p.source === "google_maps" ? "Google Maps" : "Chaveiros.net"}`,
		p.endereco ? `Endereço: ${p.endereco}` : null,
		p.website ? `Site: ${p.website}` : null,
		p.url ? `URL: ${p.url}` : null,
		p.rating != null ? `Rating: ${p.rating}` : null
	].filter(Boolean).join("\n");
	const { data: row, error } = await context.supabase.from("leads").insert({
		empresa: p.empresa,
		contato: (_p$contato = p.contato) !== null && _p$contato !== void 0 ? _p$contato : p.empresa,
		telefone: p.telefone,
		whatsapp: p.whatsapp,
		cidade: p.cidade,
		estado: p.estado,
		latitude: p.latitude,
		longitude: p.longitude,
		segmento: "CHAVEIRO",
		status: "NOVO_LEAD",
		score: 0,
		position: 0,
		observacoes,
		created_by: context.userId
	}).select("id").single();
	if (error) throw error;
	return { id: row.id };
});
//#endregion
export { importProspectAsLead_createServerFn_handler, prospectSearch_createServerFn_handler };
