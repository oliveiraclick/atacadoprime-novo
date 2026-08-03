import { m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.vendas.nova-R0G9laJx.js
var $$splitComponentImporter = () => import("./v3.vendas.nova-BQI4IDnz.mjs");
var Route = createFileRoute("/_authenticated/v3/vendas/nova")({
	head: () => ({ meta: [{ title: "Nova venda em visita — Prime Automotive" }] }),
	validateSearch: (s) => ({
		cidade: typeof s.cidade === "string" ? s.cidade : void 0,
		estado: typeof s.estado === "string" ? s.estado : void 0,
		trip: typeof s.trip === "string" ? s.trip : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
