import { r as supabase } from "./client-CtYDXrXg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DTnN_21C.js
function categoriesQueryOptions() {
	return {
		queryKey: ["v3-categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	};
}
function productsQueryOptions() {
	return {
		queryKey: ["v3-products"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*, brands(nome), categories(nome), product_images(image_url, tipo_imagem, ordem)").eq("status", true).order("nome");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	};
}
//#endregion
export { productsQueryOptions as n, categoriesQueryOptions as t };
