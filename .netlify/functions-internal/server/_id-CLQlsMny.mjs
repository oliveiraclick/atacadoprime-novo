import { m as createFileRoute, p as lazyRouteComponent } from "./_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_id-CLQlsMny.js
var $$splitComponentImporter = () => import("./_id-C5oIHWCD.mjs");
var Route = createFileRoute("/_authenticated/orders/$id")({
	head: ({ params }) => ({ meta: [{ title: `Pedido ${params.id.slice(0, 8)} — Atacado` }] }),
	validateSearch: (search) => ({ edit: search.edit === true || search.edit === "true" }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
