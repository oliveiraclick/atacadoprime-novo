import { r as supabase } from "./client-CtYDXrXg.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useRoles, n as useMyCompany, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-catalog-DqziQTPw.js
function useCanSeePrices() {
	const { user } = useAuth();
	const { data: company } = useMyCompany(user);
	const { data: roles = [] } = useRoles(user);
	useSellerSession((s) => s.customer);
	const isStaff = roles.some((r) => r === "admin" || r === "vendedor" || r === "gerente");
	return {
		canSeePrices: !!user && (isStaff || (company === null || company === void 0 ? void 0 : company.status) === "approved"),
		isAuthenticated: !!user
	};
}
function useCategories() {
	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: true });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function useBrands() {
	return useQuery({
		queryKey: ["brands"],
		queryFn: async () => {
			const { data, error } = await supabase.from("brands").select("*").order("nome");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function useInstallmentPlans() {
	return useQuery({
		queryKey: ["installment-plans"],
		queryFn: async () => {
			const { data, error } = await supabase.from("installment_plans").select("*").eq("ativo", true).order("parcelas");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function usePaymentFees() {
	return useQuery({
		queryKey: ["payment-fees"],
		queryFn: async () => {
			const { data, error } = await supabase.from("payment_fees").select("*").eq("ativo", true).order("ordem");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function usePaymentSettings() {
	return useQuery({
		queryKey: ["payment-settings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("payment_settings").select("*");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
/** Generates plans 1..12. For N <= parcelasSemJuros, taxa is zeroed (merchant absorbs). */
function buildPlansFromFees(fees, parcelasSemJuros = 0, antecipacaoMensal = 0) {
	if (fees.length === 0) return [{
		id: "1",
		parcelas: 1,
		multiplicador: 1,
		ativo: true
	}];
	const avg = (k) => fees.reduce((s, f) => {
		var _f$k;
		return s + Number((_f$k = f[k]) !== null && _f$k !== void 0 ? _f$k : 0);
	}, 0) / fees.length;
	const avista = avg("credito_avista");
	const m26 = avg("credito_2_6");
	const m712 = avg("credito_7_12");
	const antec = antecipacaoMensal;
	const taxaFor = (n) => n === 1 ? avista : n <= 6 ? m26 : m712;
	return Array.from({ length: 12 }, (_, i) => {
		const n = i + 1;
		if (n === 1 || n <= parcelasSemJuros) return {
			id: String(n),
			parcelas: n,
			multiplicador: 1,
			ativo: true
		};
		const taxa = taxaFor(n);
		if (taxa >= 100) return {
			id: String(n),
			parcelas: n,
			multiplicador: 1,
			ativo: true
		};
		const A = 1 - taxa / 100;
		const iRate = antec / 100;
		let S = 0;
		for (let k = 1; k <= n; k++) S += 1 / Math.pow(1 + iRate, k);
		const mult = n / (A * S);
		return {
			id: String(n),
			parcelas: n,
			multiplicador: Number(mult.toFixed(6)),
			ativo: true
		};
	});
}
function useAllProductsAdmin() {
	return useQuery({
		queryKey: ["products-admin"],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*, brands(nome), categories(nome), product_images(image_url, tipo_imagem, ordem)").order("created_at", { ascending: false });
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function useCatalogStats() {
	return useQuery({
		queryKey: ["catalog-stats"],
		queryFn: async () => {
			var _low$data, _total$count, _ativos$count, _sem$count, _marcas$count, _cats$count;
			const [total, ativos, sem, marcas, cats, low] = await Promise.all([
				supabase.from("products").select("*", {
					count: "exact",
					head: true
				}),
				supabase.from("products").select("*", {
					count: "exact",
					head: true
				}).eq("status", true),
				supabase.from("products").select("*", {
					count: "exact",
					head: true
				}).lte("estoque", 0),
				supabase.from("brands").select("*", {
					count: "exact",
					head: true
				}),
				supabase.from("categories").select("*", {
					count: "exact",
					head: true
				}),
				supabase.from("products").select("id, estoque, estoque_minimo")
			]);
			const lowCount = ((_low$data = low.data) !== null && _low$data !== void 0 ? _low$data : []).filter((p) => p.estoque > 0 && p.estoque <= p.estoque_minimo).length;
			return {
				total: (_total$count = total.count) !== null && _total$count !== void 0 ? _total$count : 0,
				ativos: (_ativos$count = ativos.count) !== null && _ativos$count !== void 0 ? _ativos$count : 0,
				baixo: lowCount,
				sem: (_sem$count = sem.count) !== null && _sem$count !== void 0 ? _sem$count : 0,
				marcas: (_marcas$count = marcas.count) !== null && _marcas$count !== void 0 ? _marcas$count : 0,
				cats: (_cats$count = cats.count) !== null && _cats$count !== void 0 ? _cats$count : 0
			};
		}
	});
}
//#endregion
export { useCatalogStats as a, usePaymentFees as c, useCanSeePrices as i, usePaymentSettings as l, useAllProductsAdmin as n, useCategories as o, useBrands as r, useInstallmentPlans as s, buildPlansFromFees as t };
