import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { B as RefreshCw, Ft as Download, W as Printer, jt as Eye, x as Stethoscope } from "../_libs/lucide-react.mjs";
import { i as printerDiagnostics, r as printHTML, t as POS_PRINT_COLOR } from "./pos-printer-Cb2iJw0o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.teste-CawgR8sA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function buildTestTicket() {
	return `
    <div class="center bold lg">ATACADO PRIME</div>
    <div class="center">TESTE DE IMPRESSAO</div>
    <div class="hr"></div>
    <div class="row"><span>Data</span><span>${(/* @__PURE__ */ new Date()).toLocaleString("pt-BR")}</span></div>
    <div class="row"><span>Versao</span><span>P13</span></div>
    <div class="hr"></div>
    <div>ABCDEFGHIJKLMNOPQRSTUVWXYZ</div>
    <div>0123456789 .,-:/*#%</div>
    <div class="hr"></div>
    <div class="row"><span>1x Produto teste</span><span>R$ 10,00</span></div>
    <div class="row bold"><span>TOTAL</span><span>R$ 10,00</span></div>
    <div class="hr"></div>
    <div class="center">Se voce leu isto no papel,</div>
    <div class="center bold">a impressao esta OK.</div>
  `;
}
function PosTesteImpressao() {
	var _diag$preferencia, _diag$androidBridgeKe;
	const [diag, setDiag] = (0, import_react.useState)(null);
	const [log, setLog] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const refresh = () => setDiag(printerDiagnostics());
	(0, import_react.useEffect)(refresh, []);
	const push = (ok, text) => setLog((l) => [{
		ok,
		text: `${(/* @__PURE__ */ new Date()).toLocaleTimeString("pt-BR")} — ${text}`
	}, ...l].slice(0, 20));
	const ready = !!diag && diag.bridge !== "nenhuma";
	const testarNativa = async () => {
		setBusy(true);
		try {
			await printHTML(buildTestTicket(), { copies: 1 });
			push(true, "Cupom enviado à ponte nativa. Confira o papel.");
		} catch (e) {
			push(false, e instanceof Error ? e.message : "Falha ao imprimir");
		} finally {
			setBusy(false);
			refresh();
		}
	};
	const verPrevia = () => {
		printHTML(buildTestTicket(), {
			copies: 1,
			preview: true
		});
		push(true, "Prévia aberta na tela.");
	};
	const card = {
		background: V2.LIGHT_SURFACE,
		borderColor: V2.LIGHT_BORDER
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-base font-semibold flex items-center gap-2",
					style: { color: V2.LIGHT_TEXT },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {
						className: "h-4 w-4",
						style: { color: V2.TEAL }
					}), "Teste de impressão"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: refresh,
					className: "flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold",
					style: {
						borderColor: V2.LIGHT_BORDER,
						color: V2.LIGHT_MUTED
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3.5 w-3.5" }), " Reverificar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border p-3 space-y-1",
				style: card,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-medium",
							style: { color: V2.LIGHT_MUTED },
							children: "Ponte nativa"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-md px-2 py-0.5 text-[11px] font-bold",
							style: {
								background: ready ? V2.TEAL : "#e5e0d8",
								color: ready ? "#fff" : V2.LIGHT_MUTED
							},
							children: ready ? `CONECTADA (${diag === null || diag === void 0 ? void 0 : diag.bridge})` : "NÃO DETECTADA"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] leading-snug",
						style: { color: V2.LIGHT_MUTED },
						children: ready ? "A maquininha expõe a ponte de impressão. O botão abaixo imprime direto, sem diálogo." : "Nenhuma ponte encontrada neste navegador. Feche o Chrome e abra o aplicativo Prime Q2I v3."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-[10px] font-mono break-all pt-1",
						style: { color: V2.LIGHT_MUTED },
						children: [
							"versão ",
							"P13",
							" · driver ",
							(_diag$preferencia = diag === null || diag === void 0 ? void 0 : diag.preferencia) !== null && _diag$preferencia !== void 0 ? _diag$preferencia : "auto",
							" · chave ",
							(_diag$androidBridgeKe = diag === null || diag === void 0 ? void 0 : diag.androidBridgeKey) !== null && _diag$androidBridgeKe !== void 0 ? _diag$androidBridgeKe : "—"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: busy || !ready,
						onClick: testarNativa,
						className: "w-full h-12 rounded-lg text-sm font-bold text-white disabled:opacity-60 flex items-center justify-center gap-2",
						style: { background: POS_PRINT_COLOR },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-4 w-4" }), busy ? "Enviando..." : `Imprimir cupom de teste · P13`]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: verPrevia,
						className: "h-11 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1",
						style: {
							borderColor: V2.LIGHT_BORDER,
							background: V2.LIGHT_SURFACE,
							color: V2.LIGHT_TEXT
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" }), " Ver prévia"]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pos/diagnostico",
						className: "h-10 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_MUTED
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stethoscope, { className: "h-4 w-4" }), " Diagnóstico avançado"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pos/instalar",
						className: "h-10 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_MUTED
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Instalar ícone na tela inicial"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border p-3 space-y-1",
				style: card,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium",
					style: { color: V2.LIGHT_MUTED },
					children: "Resultado dos testes"
				}), log.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px]",
					style: { color: V2.LIGHT_MUTED },
					children: "Nenhum teste executado ainda."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1",
					children: log.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-[11px] font-mono leading-snug",
						style: { color: l.ok ? V2.TEAL : "#b91c1c" },
						children: [
							l.ok ? "✓" : "✕",
							" ",
							l.text
						]
					}, i))
				})]
			})
		]
	});
}
//#endregion
export { PosTesteImpressao as component };
