import { r as supabase } from "./client-CtYDXrXg.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-addresses-C_eHrBQe.js
var key = (companyId) => ["addresses", companyId];
function useAddresses(companyId) {
	return useQuery({
		queryKey: key(companyId),
		enabled: !!companyId,
		queryFn: async () => {
			const { data, error } = await supabase.from("addresses").select("*").eq("company_id", companyId).order("created_at");
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function useCreateAddress(companyId) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (form) => {
			if (!companyId) throw new Error("Sem empresa selecionada");
			const { error } = await supabase.from("addresses").insert(_objectSpread2(_objectSpread2({}, form), {}, { company_id: companyId }));
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: key(companyId) })
	});
}
function useDeleteAddress(companyId) {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("addresses").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: key(companyId) })
	});
}
//#endregion
export { useCreateAddress as n, useDeleteAddress as r, useAddresses as t };
