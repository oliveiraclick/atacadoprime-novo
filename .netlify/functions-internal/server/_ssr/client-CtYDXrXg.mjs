import { r as __exportAll$1 } from "../_runtime.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CtYDXrXg.js
var client_CtYDXrXg_exports = /* @__PURE__ */ __exportAll$1({
	n: () => supabase,
	r: () => __exportAll,
	t: () => client_exports
});
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var client_exports = /* @__PURE__ */ __exportAll({ supabase: () => supabase });
function createSupabaseClient() {
	return createClient("https://jnrizhegzxogigjeaukm.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impucml6aGVnenhvZ2lnamVhdWttIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU3NjQxOTAsImV4cCI6MjEwMTM0MDE5MH0.fiL2k7yQqlOXR95Q6LXM3BPquY19CpzWVsWcI38AQD0", { auth: {
		storage: typeof window !== "undefined" ? localStorage : void 0,
		persistSession: true,
		autoRefreshToken: true
	} });
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
//#endregion
export { client_CtYDXrXg_exports as n, supabase as r, __exportAll as t };
