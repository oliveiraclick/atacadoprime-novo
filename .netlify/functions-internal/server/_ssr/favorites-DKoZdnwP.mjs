import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as AppShell } from "./app-shell-KlJx9hrW.mjs";
import { i as useCanSeePrices } from "./use-catalog-DqziQTPw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/favorites-DKoZdnwP.js
var import_jsx_runtime = require_jsx_runtime();
function FavoritesPage() {
	const { user } = useAuth();
	const { canSeePrices } = useCanSeePrices();
	const { data = [], isLoading } = useQuery({
		queryKey: ["favorites-full", user === null || user === void 0 ? void 0 : user.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("favorites").select("product_id, products(*, brands(nome), product_images(image_url, ordem))").eq("user_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			return (data !== null && data !== void 0 ? data : []).map((f) => f.products).filter(Boolean);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Favoritos",
		description: "Produtos que você salvou.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Carregando…"
		}) : data.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Você ainda não favoritou nenhum produto."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4",
			children: data.map((p) => {
				var _p$product_images, _p$brands$nome, _p$brands;
				if (!p) return null;
				const img = ((_p$product_images = p.product_images) !== null && _p$product_images !== void 0 ? _p$product_images : []).sort((a, b) => a.ordem - b.ordem)[0];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/v3",
					search: { produto: p.id },
					className: "bg-card border border-border rounded-xl overflow-hidden shadow-soft hover:shadow-md transition-shadow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-square bg-muted",
						children: img && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.image_url,
							alt: p.nome,
							className: "w-full h-full object-cover",
							loading: "lazy"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-muted-foreground",
								children: (_p$brands$nome = (_p$brands = p.brands) === null || _p$brands === void 0 ? void 0 : _p$brands.nome) !== null && _p$brands$nome !== void 0 ? _p$brands$nome : "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium text-sm line-clamp-2 mt-0.5",
								children: p.nome
							}),
							canSeePrices && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold mt-2",
								children: brl(p.preco_unitario)
							})
						]
					})]
				}, p.id);
			})
		})
	});
}
//#endregion
export { FavoritesPage as component };
