import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-pill-nUgOhmrP.js
var import_jsx_runtime = require_jsx_runtime();
var MAP = {
	PENDENTE: "bg-muted text-muted-foreground border-border",
	AGUARDANDO_PAGAMENTO: "bg-warning/15 text-warning border-warning/40",
	PAGO: "bg-success/15 text-success border-success/40",
	EM_SEPARACAO: "bg-primary/15 text-primary border-primary/40",
	ENVIADO: "bg-primary/15 text-primary border-primary/40",
	ENTREGUE: "bg-success/15 text-success border-success/40",
	CANCELADO: "bg-destructive/15 text-destructive border-destructive/40"
};
function StatusPill({ status }) {
	var _MAP$status;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border uppercase tracking-wider", (_MAP$status = MAP[status]) !== null && _MAP$status !== void 0 ? _MAP$status : MAP.PENDENTE),
		children: status.replace(/_/g, " ")
	});
}
//#endregion
export { StatusPill as t };
