import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { a as removeOfflineSale, r as loadSalesQueue, s as updateOfflineSale, t as enqueueOfflineSale } from "./offline-store-Ddf--0UV.mjs";
import { n as useOnlineStatus, t as syncOfflineSales } from "./offline-sync-DZ35t7yP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-offline-sales-DfbnYiqb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useOfflineSales() {
	const { user } = useAuth();
	const online = useOnlineStatus();
	const [queue, setQueue] = (0, import_react.useState)([]);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const reload = (0, import_react.useCallback)(async () => {
		setQueue(await loadSalesQueue());
	}, []);
	(0, import_react.useEffect)(() => {
		reload();
		const on = () => void reload();
		window.addEventListener("focus", on);
		return () => window.removeEventListener("focus", on);
	}, [reload]);
	const sync = (0, import_react.useCallback)(async () => {
		if (!user) return {
			sent: 0,
			failed: 0
		};
		setSyncing(true);
		try {
			const res = await syncOfflineSales(user.id);
			await reload();
			return res;
		} finally {
			setSyncing(false);
		}
	}, [user, reload]);
	(0, import_react.useEffect)(() => {
		if (!online || !user) return;
		sync();
	}, [online, user === null || user === void 0 ? void 0 : user.id]);
	const enqueueSale = (0, import_react.useCallback)(async (sale) => {
		await enqueueOfflineSale(sale);
		await reload();
		if (online && user) sync();
	}, [
		online,
		user,
		sync,
		reload
	]);
	const remove = (0, import_react.useCallback)(async (local_id) => {
		await removeOfflineSale(local_id);
		await reload();
	}, [reload]);
	const update = (0, import_react.useCallback)(async (local_id, patch) => {
		await updateOfflineSale(local_id, patch);
		await reload();
	}, [reload]);
	return {
		queue,
		pending: queue.filter((s) => s.status === "pending" || s.status === "sending" || s.status === "error"),
		sent: queue.filter((s) => s.status === "sent"),
		syncing,
		sync,
		enqueueSale,
		remove,
		update,
		online
	};
}
//#endregion
export { useOfflineSales as t };
