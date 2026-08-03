import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { a as scanBridgeCandidates, i as printerDiagnostics, o as tryBridgePrint } from "./pos-printer-Cb2iJw0o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.diagnostico-Cl61SK7x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TEST_TEXT = "ATACADO PRIME\nTESTE DE IMPRESSAO\n--------------------------------\nSe voce leu isto no papel,\na ponte funciona.\n\n\n";
function PosDiagnostico() {
	const [txt, setTxt] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [candidates, setCandidates] = (0, import_react.useState)([]);
	const [log, setLog] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const list = scanBridgeCandidates();
		setCandidates(list);
		setTxt(JSON.stringify(_objectSpread2(_objectSpread2({}, printerDiagnostics()), {}, { candidatos: list }), null, 2));
	}, []);
	const run = (path, method) => {
		const r = tryBridgePrint(path, method, TEST_TEXT);
		setLog((l) => [`${r.ok ? "OK" : "FALHOU"} — ${path}.${method}() → ${r.detail}`, ...l].slice(0, 30));
	};
	const runAll = () => {
		candidates.forEach((c) => c.methods.forEach((m) => run(c.path, m)));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-base font-semibold text-foreground",
				children: "Diagnóstico da impressora"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "O teste interno da máquina funciona, então o hardware está OK. Aqui procuramos qual ponte o navegador da maquininha expõe. Toque em testar e veja qual delas sai no papel."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-border bg-card p-2 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-medium text-foreground",
							children: ["Pontes encontradas: ", candidates.length]
						}), candidates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: runAll,
							className: "rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground",
							children: "Testar todas"
						})]
					}),
					candidates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Nenhuma ponte de impressão exposta ao navegador. Nesse caso só um aplicativo nativo (APK) consegue usar a impressora interna."
					}),
					candidates.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded border border-border p-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-foreground break-all",
							children: c.path
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 flex flex-wrap gap-1",
							children: c.methods.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => run(c.path, m),
								className: "rounded border border-border bg-background px-2 py-1 font-mono text-[11px] text-foreground",
								children: [m, "()"]
							}, m))
						})]
					}, c.path))
				]
			}),
			log.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border border-border bg-card p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs font-medium text-foreground",
					children: "Resultados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1 font-mono text-[11px] text-muted-foreground",
					children: log.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "break-all",
						children: l
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "w-full rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground",
				onClick: async () => {
					try {
						await navigator.clipboard.writeText(`${txt}\n\nLOG:\n${log.join("\n")}`);
						setCopied(true);
					} catch (_unused) {
						setCopied(false);
					}
				},
				children: copied ? "Copiado!" : "Copiar diagnóstico"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
				readOnly: true,
				value: txt,
				className: "w-full h-[45vh] rounded-md border border-border bg-card p-2 font-mono text-[11px] leading-tight text-foreground"
			})
		]
	});
}
//#endregion
export { PosDiagnostico as component };
