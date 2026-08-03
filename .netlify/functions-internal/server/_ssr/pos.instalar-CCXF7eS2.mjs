import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { $t as Check, A as Share2, Ft as Download, Rt as Copy } from "../_libs/lucide-react.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.instalar-CCXF7eS2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var INSTALL_URL = "https://primeautomotive.app/pos/vender";
var APK_URL = "https://primeautomotive.app/prime-q2i.apk?v=10";
function PosInstalar() {
	const [qr, setQr] = (0, import_react.useState)("");
	const [apkQr, setApkQr] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [apkCopied, setApkCopied] = (0, import_react.useState)(false);
	const [prompt, setPrompt] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		import_lib.toDataURL(INSTALL_URL, {
			width: 320,
			margin: 1
		}).then(setQr).catch(() => setQr(""));
		import_lib.toDataURL(APK_URL, {
			width: 320,
			margin: 1
		}).then(setApkQr).catch(() => setApkQr(""));
		const onPrompt = (e) => {
			e.preventDefault();
			setPrompt(e);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	const copy = async () => {
		try {
			await navigator.clipboard.writeText(INSTALL_URL);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1800);
		} catch (_unused) {
			setStatus("Copie manualmente o endereço acima.");
		}
	};
	const copyApk = async () => {
		try {
			await navigator.clipboard.writeText(APK_URL);
			setApkCopied(true);
			window.setTimeout(() => setApkCopied(false), 1800);
		} catch (_unused2) {
			setStatus("Copie manualmente o endereço do APK.");
		}
	};
	const share = async () => {
		if (navigator.share) try {
			await navigator.share({
				title: "POS Prime",
				url: INSTALL_URL
			});
		} catch (_unused3) {}
		else copy();
	};
	const install = async () => {
		if (!prompt) return;
		await prompt.prompt();
		const { outcome } = await prompt.userChoice;
		setStatus(outcome === "accepted" ? "Atalho instalado na tela inicial." : "Instalação cancelada.");
		setPrompt(null);
	};
	const card = {
		background: V2.LIGHT_SURFACE,
		borderColor: V2.LIGHT_BORDER
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-base font-semibold flex items-center gap-2",
				style: { color: V2.LIGHT_TEXT },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
					className: "h-4 w-4",
					style: { color: V2.TEAL }
				}), "Instalar o POS na maquininha"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border p-3 space-y-3",
				style: card,
				children: [
					qr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: qr,
						alt: "QR Code com o link de instalação do POS Prime",
						className: "mx-auto w-40 h-40 rounded-md border",
						style: { borderColor: V2.LIGHT_BORDER }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-[12px] font-mono break-all",
						style: { color: V2.LIGHT_TEXT },
						children: INSTALL_URL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: copy,
							className: "h-11 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_TEXT
							},
							children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), copied ? "Copiado" : "Copiar link"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: share,
							className: "h-11 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_TEXT
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "h-4 w-4" }), " Compartilhar"]
						})]
					}),
					prompt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: install,
						className: "w-full h-12 rounded-lg text-sm font-bold text-white",
						style: { background: V2.TEAL },
						children: "Instalar agora (adicionar ícone)"
					}),
					status && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-center",
						style: { color: V2.LIGHT_MUTED },
						children: status
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border p-3 space-y-3",
				style: card,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						style: { color: V2.LIGHT_TEXT },
						children: "Aplicativo Prime Q2I v10 (impressão nativa + layout POS)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] leading-snug",
						style: { color: V2.LIGHT_MUTED },
						children: "Desinstale a versão anterior, baixe esta v10 direto na maquininha e instale novamente. Ela usa o contrato AIDL completo do fabricante, detecta o serviço de impressão e mostra uma barra no rodapé: verde = conectada, vermelha = não conectada (toque na barra para ver o diagnóstico e imprimir um teste)."
					}),
					apkQr && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: apkQr,
						alt: "QR Code para baixar o aplicativo Prime Q2I",
						className: "mx-auto w-40 h-40 rounded-md border",
						style: { borderColor: V2.LIGHT_BORDER }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center text-[12px] font-mono break-all",
						style: { color: V2.LIGHT_TEXT },
						children: APK_URL
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: APK_URL,
						download: true,
						className: "w-full h-12 rounded-lg text-sm font-bold text-white flex items-center justify-center gap-2",
						style: { background: V2.TEAL },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4" }), " Baixar APK agora"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: copyApk,
						className: "w-full h-11 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_TEXT
						},
						children: [apkCopied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), apkCopied ? "Copiado" : "Copiar link do APK"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border p-3 space-y-2 text-[12px] leading-snug",
				style: card,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold",
						style: { color: V2.LIGHT_TEXT },
						children: "Firefox (Android / maquininha)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "list-decimal pl-4 space-y-1",
						style: { color: V2.LIGHT_MUTED },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Abra o link acima no Firefox." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Toque no menu ⋮ (canto superior direito)." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Escolha “Instalar” ou “Adicionar à tela inicial”." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Confirme o nome “POS Prime” — o ícone aparece na tela inicial." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold pt-1",
						style: { color: V2.LIGHT_TEXT },
						children: "Chrome (Android)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "list-decimal pl-4 space-y-1",
						style: { color: V2.LIGHT_MUTED },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Menu ⋮ → “Instalar app” / “Adicionar à tela inicial”." })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-1",
						style: { color: V2.LIGHT_MUTED },
						children: "O atalho abre em tela cheia, sem barra do navegador, direto na tela de venda. Não é um arquivo APK: é o próprio sistema instalado como aplicativo pelo navegador."
					})
				]
			})
		]
	});
}
//#endregion
export { PosInstalar as component };
