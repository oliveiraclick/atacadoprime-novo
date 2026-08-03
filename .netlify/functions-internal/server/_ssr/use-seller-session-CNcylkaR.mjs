import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-seller-session-CNcylkaR.js
var useSellerSession = create()(persist((set) => ({
	customer: null,
	tripId: null,
	setCustomer: (c) => set({ customer: c }),
	setTripId: (id) => set({ tripId: id }),
	endSale: () => set({
		customer: null,
		tripId: null
	})
}), {
	name: "seller-session-v1",
	partialize: (state) => ({ tripId: state.tripId })
}));
if (typeof window !== "undefined") window.addEventListener("storage", (e) => {
	if (e.key === "seller-session-v1") useSellerSession.persist.rehydrate();
});
//#endregion
export { useSellerSession as t };
