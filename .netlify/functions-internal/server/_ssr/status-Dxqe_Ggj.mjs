//#region node_modules/.nitro/vite/services/ssr/assets/status-Dxqe_Ggj.js
var NEXT_STATUS = {
	AGUARDANDO_PAGAMENTO: "PAGO",
	PAGO: "EM_SEPARACAO",
	EM_SEPARACAO: "ENVIADO",
	ENVIADO: "ENTREGUE"
};
var PAID_STATES = new Set([
	"PAGO",
	"EM_SEPARACAO",
	"ENVIADO",
	"ENTREGUE"
]);
var TERMINAL_STATES = new Set(["CANCELADO", "ENTREGUE"]);
var nextStatus = (s) => NEXT_STATUS[s];
var isPaidStatus = (s) => PAID_STATES.has(s);
var canCancel = (s) => !TERMINAL_STATES.has(s);
var isPendingPayment = (s) => s === "AGUARDANDO_PAGAMENTO" || s === "PENDENTE";
//#endregion
export { nextStatus as i, isPaidStatus as n, isPendingPayment as r, canCancel as t };
