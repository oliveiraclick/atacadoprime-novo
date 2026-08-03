import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { B as RefreshCw, Ht as Clock, R as RotateCcw, _ as Trash2, m as TriangleAlert, qt as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as subscribePendingMutations, n as processPendingMutations, o as updatePendingMutation, r as removePendingMutation, t as loadPendingMutations } from "./offline-mutations-BlLFZEVf.mjs";
import { t as AppShell } from "./app-shell-KlJx9hrW.mjs";
import { n as useOnlineStatus, t as syncOfflineSales } from "./offline-sync-DZ35t7yP.mjs";
import { t as useOfflineSales } from "./use-offline-sales-DfbnYiqb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offline-pendentes-CenhJknn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useOfflinePending() {
	const online = useOnlineStatus();
	const { user } = useAuth();
	const [list, setList] = (0, import_react.useState)([]);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const reload = (0, import_react.useCallback)(async () => {
		setList(await loadPendingMutations());
	}, []);
	(0, import_react.useEffect)(() => {
		reload();
		const un = subscribePendingMutations(() => void reload());
		return () => {
			un();
		};
	}, [reload]);
	const sync = (0, import_react.useCallback)(async () => {
		setSyncing(true);
		try {
			const [muts, sales] = await Promise.all([processPendingMutations(), user ? syncOfflineSales(user.id) : Promise.resolve({
				sent: 0,
				failed: 0
			})]);
			await reload();
			return {
				sent: muts.sent + sales.sent,
				failed: muts.failed + sales.failed
			};
		} finally {
			setSyncing(false);
		}
	}, [reload, user]);
	(0, import_react.useEffect)(() => {
		if (!online || !user) return;
		sync();
	}, [online, user === null || user === void 0 ? void 0 : user.id]);
	const retry = (0, import_react.useCallback)(async (local_id) => {
		await updatePendingMutation(local_id, {
			status: "pending",
			error: null
		});
		sync();
	}, [sync]);
	const remove = (0, import_react.useCallback)(async (local_id) => {
		await removePendingMutation(local_id);
	}, []);
	return {
		list,
		pending: list.filter((m) => m.status !== "sent"),
		errors: list.filter((m) => m.status === "error"),
		syncing,
		sync,
		retry,
		remove,
		online
	};
}
var KIND_LABEL = {
	lead_insert: "Novo lead",
	lead_update: "Atualização de lead",
	lead_note: "Anotação de lead",
	lead_task_insert: "Nova tarefa",
	lead_task_toggle: "Atualização de tarefa",
	lead_convert: "Conversão em cliente",
	company_insert: "Novo cliente",
	visit_checkin: "Check-in de visita",
	visit_checkout: "Check-out de visita",
	generic_insert: "Inserção",
	generic_update: "Atualização"
};
function statusPill(status) {
	if (status === "sent") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-xs font-semibold text-success",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), "Enviado"]
	});
	if (status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-xs font-semibold text-destructive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-3.5 w-3.5" }), "Erro"]
	});
	if (status === "sending") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-xs font-semibold text-primary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5 animate-spin" }), "Enviando…"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1 text-xs font-semibold text-amber-600",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-3.5 w-3.5" }), "Pendente"]
	});
}
function OfflinePendentesPage() {
	const { list, syncing, sync, retry, remove, online } = useOfflinePending();
	const sales = useOfflineSales();
	const totalPend = list.filter((m) => m.status !== "sent").length + sales.pending.length;
	const handleSync = async () => {
		if (!online) {
			toast.error("Você está offline. Conecte-se para sincronizar.");
			return;
		}
		const r = await sync();
		if (r.sent) toast.success(`${r.sent} registro(s) enviado(s)`);
		if (r.failed) toast.error(`${r.failed} falha(s) — abra o item para ver detalhes`);
		if (!r.sent && !r.failed) toast.info("Nada para enviar");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Pendentes de sincronização",
		description: "Cadastros e ações realizadas offline aguardando envio ao servidor.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-foreground",
							children: totalPend === 0 ? "Nada pendente" : `${totalPend} registro(s) pendente(s)`
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: online ? "Conectado — sincronização automática ativa." : "Sem internet — os dados serão enviados assim que voltar."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: handleSync,
						disabled: !online || syncing,
						className: "gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-4 w-4 ${syncing ? "animate-spin" : ""}` }), "Sincronizar agora"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "px-4 py-3 border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-foreground",
							children: "Vendas offline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Pedidos criados sem internet."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border",
						children: [sales.queue.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-4 py-6 text-sm text-muted-foreground",
							children: "Nenhuma venda na fila."
						}), sales.queue.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 py-3 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-medium text-foreground truncate",
										children: [
											"Pedido ",
											s.items.length,
											" item(ns) · R$ ",
											s.total.toFixed(2)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground truncate",
										children: [new Date(s.created_at).toLocaleString("pt-BR"), s.error && ` · ${s.error}`]
									})]
								}),
								statusPill(s.status),
								s.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => sales.update(s.local_id, {
										status: "pending",
										error: null
									}).then(() => sales.sync()),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5 mr-1" }), "Reenviar"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => sales.remove(s.local_id),
									className: "text-destructive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})] }),
								s.status === "sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									onClick: () => sales.remove(s.local_id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
								})
							]
						}, s.local_id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "px-4 py-3 border-b border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-semibold text-foreground",
							children: "Cadastros e ações"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Clientes, leads, visitas e anotações feitas offline."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border",
						children: [list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "px-4 py-6 text-sm text-muted-foreground",
							children: "Nenhum item na fila."
						}), list.map((m) => {
							var _KIND_LABEL$m$kind;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-3 flex flex-wrap items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-medium text-foreground truncate",
											children: [(_KIND_LABEL$m$kind = KIND_LABEL[m.kind]) !== null && _KIND_LABEL$m$kind !== void 0 ? _KIND_LABEL$m$kind : m.kind, m.label && ` · ${m.label}`]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs text-muted-foreground truncate",
											children: [new Date(m.created_at).toLocaleString("pt-BR"), m.error && ` · ${m.error}`]
										})]
									}),
									statusPill(m.status),
									m.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => retry(m.local_id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5 mr-1" }), "Tentar novamente"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => remove(m.local_id),
										className: "text-destructive",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})] }),
									m.status === "sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => remove(m.local_id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
									})
								]
							}, m.local_id);
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { OfflinePendentesPage as component };
