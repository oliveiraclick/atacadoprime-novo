//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-yIvXMhjL.js
var manifest = {
	"306c6b936bc54eca00b64647030e557cdd789cc2bc9534b50732fcfa4a7cbb6d": {
		functionName: "prospectSearch_createServerFn_handler",
		importer: () => import("./_ssr/prospecting.functions-Daql_cux.mjs")
	},
	"71c81ba1192ae4ab2d910d5c5b11fc68b9b1e27920658c12696428255685c1d8": {
		functionName: "getOrderShare_createServerFn_handler",
		importer: () => import("./_ssr/order-share.functions-BGVZNTWw.mjs")
	},
	"87fa976c53e2ed770ba0a10b119bddda639806f28586797d6826bfe67748b182": {
		functionName: "calculateShipping_createServerFn_handler",
		importer: () => import("./_ssr/shipping.functions-CVStPDE7.mjs")
	},
	"8e752f335adf8bdf0273c4f4a47d906ab023ffd55b8ec2e0641a34545e3b61ad": {
		functionName: "deletePurchaseOrder_createServerFn_handler",
		importer: () => import("./_ssr/purchase.functions-Baiy4Lba.mjs")
	},
	"b70f218ece30bc43e3e00f895d603317ce2fb3e2bc46bd7a6124a7a975fb8c7d": {
		functionName: "importProspectAsLead_createServerFn_handler",
		importer: () => import("./_ssr/prospecting.functions-Daql_cux.mjs")
	}
};
async function getServerFnById(id, access) {
	var _serverFnInfo$module;
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = (_serverFnInfo$module = serverFnInfo.module) !== null && _serverFnInfo$module !== void 0 ? _serverFnInfo$module : await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
