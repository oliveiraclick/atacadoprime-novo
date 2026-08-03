import { r as supabase } from "./_ssr/client-CtYDXrXg.mjs";
import { n as oauth } from "./_._lovable.oauth.consent-DTClbIDf.mjs";
import { M as redirect, m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-C4TjBOHP.js
var $$splitErrorComponentImporter = () => import("./_._lovable.oauth.consent-CIDauz32.mjs");
var $$splitComponentImporter = () => import("./_._lovable.oauth.consent-B2g_Setr.mjs");
var Route = createFileRoute("/.lovable/oauth/consent")({
	ssr: false,
	validateSearch: (s) => ({ authorization_id: typeof s.authorization_id === "string" ? s.authorization_id : "" }),
	beforeLoad: async ({ search, location }) => {
		if (!search.authorization_id) throw new Error("Requisição de autorização inválida (authorization_id ausente).");
		const { data } = await supabase.auth.getSession();
		if (!data.session) throw redirect({
			to: "/auth",
			search: {
				mode: "login",
				redirect: location.pathname + location.searchStr
			}
		});
	},
	loader: async ({ location }) => {
		var _data$redirect_url;
		const authorizationId = new URLSearchParams(location.search).get("authorization_id");
		const { data, error } = await oauth().getAuthorizationDetails(authorizationId);
		if (error) throw error;
		const immediate = (_data$redirect_url = data === null || data === void 0 ? void 0 : data.redirect_url) !== null && _data$redirect_url !== void 0 ? _data$redirect_url : data === null || data === void 0 ? void 0 : data.redirect_to;
		if (immediate && !(data === null || data === void 0 ? void 0 : data.client)) throw redirect({ href: immediate });
		return data;
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
//#endregion
export { Route as t };
