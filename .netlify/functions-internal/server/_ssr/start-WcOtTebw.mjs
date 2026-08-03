import { r as supabase } from "./client-CtYDXrXg.mjs";
import { n as createStart, t as createMiddleware } from "./createStart-ZMLkT8B7.mjs";
import { t as renderErrorPage } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/start-WcOtTebw.js
var attachSupabaseAuth = createMiddleware({ type: "function" }).client(async ({ next }) => {
	var _data$session;
	const { data } = await supabase.auth.getSession();
	const token = (_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.access_token;
	return next({ headers: token ? { Authorization: `Bearer ${token}` } : {} });
});
var errorMiddleware = createMiddleware().server(async ({ next }) => {
	try {
		return await next();
	} catch (error) {
		if (error != null && typeof error === "object" && "statusCode" in error) throw error;
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
});
var startInstance = createStart(() => ({
	functionMiddleware: [attachSupabaseAuth],
	requestMiddleware: [errorMiddleware]
}));
//#endregion
export { startInstance };
