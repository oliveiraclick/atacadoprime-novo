import { r as supabase } from "./client-CtYDXrXg.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { n as set, t as get } from "../_libs/idb-keyval.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offline-mutations-BlLFZEVf.js
var QUEUE_KEY = "offline:mutations:queue";
var MAP_KEY = "offline:mutations:local-map";
async function loadPendingMutations() {
	var _await$get;
	return (_await$get = await get(QUEUE_KEY)) !== null && _await$get !== void 0 ? _await$get : [];
}
async function saveQueue(list) {
	await set(QUEUE_KEY, list);
}
async function loadMap() {
	var _await$get2;
	return (_await$get2 = await get(MAP_KEY)) !== null && _await$get2 !== void 0 ? _await$get2 : {};
}
async function saveMap(m) {
	await set(MAP_KEY, m);
}
async function updatePendingMutation(local_id, patch) {
	await saveQueue((await loadPendingMutations()).map((m) => m.local_id === local_id ? _objectSpread2(_objectSpread2({}, m), patch) : m));
	notify();
}
async function removePendingMutation(local_id) {
	await saveQueue((await loadPendingMutations()).filter((m) => m.local_id !== local_id));
	notify();
}
var listeners = /* @__PURE__ */ new Set();
function subscribePendingMutations(cb) {
	listeners.add(cb);
	return () => listeners.delete(cb);
}
function notify() {
	for (const l of listeners) try {
		l();
	} catch (_unused) {}
}
function isOnline() {
	return typeof navigator === "undefined" ? true : navigator.onLine;
}
function newLocalId() {
	const rand = Math.random().toString(36).slice(2, 10);
	return `local:${Date.now().toString(36)}:${rand}`;
}
function resolveLocalRefs(payload, map) {
	var _map$payload;
	if (payload == null) return payload;
	if (typeof payload === "string") return (_map$payload = map[payload]) !== null && _map$payload !== void 0 ? _map$payload : payload;
	if (Array.isArray(payload)) return payload.map((v) => resolveLocalRefs(v, map));
	if (typeof payload === "object") {
		const out = {};
		for (const [k, v] of Object.entries(payload)) out[k] = resolveLocalRefs(v, map);
		return out;
	}
	return payload;
}
/**
* Executa a mutação online quando possível; caso contrário, enfileira.
* @param kind identificador da operação (usado no dispatch de sync).
* @param payload dados serializáveis; pode conter ids `local:*` a resolver depois.
* @param onlineFn implementação que roda quando há rede — deve devolver o id
*                 do registro criado (para operações de insert).
* @param label texto curto para exibir na fila de pendentes.
*/
async function runOrQueue(kind, payload, onlineFn, label) {
	if (isOnline()) try {
		var _anyData$id;
		const data = await onlineFn();
		const anyData = data;
		return {
			id: typeof anyData === "string" ? anyData : (_anyData$id = anyData === null || anyData === void 0 ? void 0 : anyData.id) !== null && _anyData$id !== void 0 ? _anyData$id : newLocalId(),
			offline: false,
			data
		};
	} catch (e) {
		var _e$message;
		const msg = String((_e$message = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message !== void 0 ? _e$message : "");
		if (!/fetch|network|Failed to fetch|NetworkError|timeout/i.test(msg)) throw e;
	}
	const local_id = newLocalId();
	const item = {
		local_id,
		kind,
		payload,
		created_at: Date.now(),
		status: "pending",
		attempts: 0,
		label
	};
	const list = await loadPendingMutations();
	list.push(item);
	await saveQueue(list);
	notify();
	return {
		id: local_id,
		offline: true
	};
}
async function getUserId() {
	var _data$user;
	const { data } = await supabase.auth.getUser();
	const uid = (_data$user = data.user) === null || _data$user === void 0 ? void 0 : _data$user.id;
	if (!uid) throw new Error("Sessão expirada. Faça login para sincronizar.");
	return uid;
}
async function handleLeadInsert(payload) {
	const uid = await getUserId();
	const { data, error } = await supabase.from("leads").insert(_objectSpread2(_objectSpread2({}, payload), {}, { created_by: uid })).select("id").single();
	if (error) throw error;
	return data.id;
}
async function handleLeadUpdate(payload) {
	const { id, patch } = payload;
	const { error } = await supabase.from("leads").update(patch).eq("id", id);
	if (error) throw error;
	return id;
}
async function handleLeadNote(payload) {
	const uid = await getUserId();
	const { leadId, texto } = payload;
	const { error } = await supabase.from("lead_notes").insert({
		lead_id: leadId,
		texto,
		created_by: uid
	});
	if (error) throw error;
	await supabase.from("lead_activities").insert({
		lead_id: leadId,
		tipo: "OBSERVACAO",
		descricao: texto,
		created_by: uid
	});
	return leadId;
}
async function handleLeadTaskInsert(payload) {
	const uid = await getUserId();
	const { data, error } = await supabase.from("lead_tasks").insert(_objectSpread2(_objectSpread2({}, payload), {}, { created_by: uid })).select("id").single();
	if (error) throw error;
	return data.id;
}
async function handleLeadTaskToggle(payload) {
	const { id, status } = payload;
	const { error } = await supabase.from("lead_tasks").update({ status }).eq("id", id);
	if (error) throw error;
	return id;
}
async function handleCompanyInsert(payload) {
	var _payload$owner_id;
	const uid = await getUserId();
	const { data, error } = await supabase.from("companies").insert(_objectSpread2(_objectSpread2({}, payload), {}, { owner_id: (_payload$owner_id = payload.owner_id) !== null && _payload$owner_id !== void 0 ? _payload$owner_id : uid })).select("id").single();
	if (error) throw error;
	return data.id;
}
async function handleLeadConvert(payload) {
	var _ref, _payload$company_id;
	const uid = await getUserId();
	const lead = payload.lead;
	let companyId = (_ref = (_payload$company_id = payload.company_id) !== null && _payload$company_id !== void 0 ? _payload$company_id : lead.company_id) !== null && _ref !== void 0 ? _ref : null;
	if (!companyId) {
		const { data: comp, error: ce } = await supabase.from("companies").insert({
			legal_name: lead.empresa,
			trade_name: lead.empresa,
			owner_id: uid,
			phone: lead.whatsapp || lead.telefone || "",
			email: lead.email,
			cidade: lead.cidade,
			estado: lead.estado,
			latitude: lead.latitude,
			longitude: lead.longitude,
			status: "approved"
		}).select("id").single();
		if (ce) throw ce;
		companyId = comp.id;
	}
	const { error } = await supabase.from("leads").update({
		status: "CLIENTE",
		company_id: companyId
	}).eq("id", lead.id);
	if (error) throw error;
	return companyId;
}
async function handleVisitCheckin(payload) {
	const { data, error } = await supabase.from("visits").insert(payload).select("id").single();
	if (error) throw error;
	if (payload.route_item_id) await supabase.from("route_items").update({
		visit_id: data.id,
		visitado: true
	}).eq("id", payload.route_item_id);
	return data.id;
}
async function handleVisitCheckout(payload) {
	const { visit_id, patch } = payload;
	const { error } = await supabase.from("visits").update(patch).eq("id", visit_id);
	if (error) throw error;
	return visit_id;
}
async function handleGenericInsert(payload) {
	const { table, values } = payload;
	const { data, error } = await supabase.from(table).insert(values).select("id").single();
	if (error) throw error;
	return data.id;
}
async function handleGenericUpdate(payload) {
	const { table, id, patch } = payload;
	const { error } = await supabase.from(table).update(patch).eq("id", id);
	if (error) throw error;
	return id;
}
var HANDLERS = {
	lead_insert: handleLeadInsert,
	lead_update: handleLeadUpdate,
	lead_note: handleLeadNote,
	lead_task_insert: handleLeadTaskInsert,
	lead_task_toggle: handleLeadTaskToggle,
	lead_convert: handleLeadConvert,
	company_insert: handleCompanyInsert,
	visit_checkin: handleVisitCheckin,
	visit_checkout: handleVisitCheckout,
	generic_insert: handleGenericInsert,
	generic_update: handleGenericUpdate
};
var syncing = false;
async function processPendingMutations() {
	if (syncing) return {
		sent: 0,
		failed: 0
	};
	if (!isOnline()) return {
		sent: 0,
		failed: 0
	};
	syncing = true;
	let sent = 0;
	let failed = 0;
	try {
		const pending = (await loadPendingMutations()).filter((m) => m.status === "pending" || m.status === "error");
		const map = await loadMap();
		for (const m of pending) {
			await updatePendingMutation(m.local_id, {
				status: "sending",
				error: null,
				attempts: m.attempts + 1
			});
			try {
				const resolved = resolveLocalRefs(m.payload, map);
				const handler = HANDLERS[m.kind];
				if (!handler) throw new Error(`Sem handler para ${m.kind}`);
				const realId = await handler(resolved);
				map[m.local_id] = realId;
				await updatePendingMutation(m.local_id, {
					status: "sent",
					result_id: realId,
					error: null
				});
				sent++;
			} catch (e) {
				var _e$message2;
				await updatePendingMutation(m.local_id, {
					status: "error",
					error: (_e$message2 = e === null || e === void 0 ? void 0 : e.message) !== null && _e$message2 !== void 0 ? _e$message2 : "Falha desconhecida"
				});
				failed++;
			}
		}
		await saveMap(map);
	} finally {
		syncing = false;
	}
	return {
		sent,
		failed
	};
}
//#endregion
export { subscribePendingMutations as a, runOrQueue as i, processPendingMutations as n, updatePendingMutation as o, removePendingMutation as r, loadPendingMutations as t };
