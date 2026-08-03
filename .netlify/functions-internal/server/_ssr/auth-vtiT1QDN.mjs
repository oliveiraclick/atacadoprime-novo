import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-vtiT1QDN.js
var $$splitComponentImporter = () => import("./auth-B8VSikeH.mjs");
var Route = createFileRoute("/auth")({
	ssr: false,
	head: () => ({ meta: [{ title: "Entrar — Atacado Prime" }] }),
	validateSearch: (s) => ({
		mode: s.mode === "signup" ? "signup" : "login",
		redirect: typeof s.redirect === "string" ? s.redirect : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
