import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-auth-DI-712Mw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useAuth() {
	var _session$user;
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
			setSession(s);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => setSession(data.session)).catch(() => setSession(null)).finally(() => setLoading(false));
		return () => sub.subscription.unsubscribe();
	}, []);
	return {
		session,
		user: (_session$user = session === null || session === void 0 ? void 0 : session.user) !== null && _session$user !== void 0 ? _session$user : null,
		loading
	};
}
function useRoles(user) {
	return useQuery({
		queryKey: ["roles", user === null || user === void 0 ? void 0 : user.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
			if (error) throw error;
			return (data !== null && data !== void 0 ? data : []).map((r) => r.role);
		}
	});
}
function useProfile(user) {
	return useQuery({
		queryKey: ["profile", user === null || user === void 0 ? void 0 : user.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
function useMyCompany(user) {
	return useQuery({
		queryKey: ["my-company", user === null || user === void 0 ? void 0 : user.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("companies").select("*").eq("owner_id", user.id).order("created_at", { ascending: true }).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
}
//#endregion
export { useRoles as i, useMyCompany as n, useProfile as r, useAuth as t };
