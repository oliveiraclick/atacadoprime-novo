import { o as __toESM } from "../_runtime.mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-printer-Cb2iJw0o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var POS_PRINT_COLOR = "#0d7377";
var PREF_KEY = "pos_printer_driver";
var PREVIEW_ID = "pos-print-preview-overlay";
/** Nomes de método usados pelas WebViews de maquininhas para imprimir texto. */
var PRINT_METHODS = [
	"printText",
	"print",
	"printString",
	"printStr",
	"printLine",
	"writeText",
	"write",
	"sendData",
	"printerPrintText",
	"posPrintText",
	"imprimir",
	"imprimirTexto"
];
var BRIDGE_HINT = /print|impress|sunmi|gertec|elgin|pax|pos|android|bridge|terminal|native|jsinterface|o100/i;
function bridgeMethod(o) {
	if (!o) return null;
	for (const m of PRINT_METHODS) {
		const fn = o[m];
		if (typeof fn === "function") return (t) => fn.call(o, t);
	}
	return null;
}
/** Varre TODAS as globais da WebView procurando qualquer ponte de impressão. */
function findAndroidBridge() {
	if (typeof window === "undefined") return null;
	const w = window;
	let keys = [];
	try {
		keys = Object.getOwnPropertyNames(w);
	} catch (_unused) {
		keys = Object.keys(w);
	}
	const ordered = [...keys.filter((k) => BRIDGE_HINT.test(k)), ...keys.filter((k) => !BRIDGE_HINT.test(k))];
	for (const k of ordered) {
		if (k === "window" || k === "self" || k === "top" || k === "parent" || k === "frames") continue;
		let obj;
		try {
			obj = w[k];
		} catch (_unused2) {
			continue;
		}
		if (!obj || typeof obj !== "object") continue;
		const fn = bridgeMethod(obj);
		if (fn) return {
			key: k,
			print: fn
		};
	}
	return null;
}
function nativeBridge() {
	var _window$PrimePrinter, _window$PrimePrinter$, _window$PrimePrinter2, _window$sunmiPrinter;
	if (typeof window === "undefined") return null;
	if (((_window$PrimePrinter = window.PrimePrinter) === null || _window$PrimePrinter === void 0 ? void 0 : _window$PrimePrinter.printText) && ((_window$PrimePrinter$ = (_window$PrimePrinter2 = window.PrimePrinter).isReady) === null || _window$PrimePrinter$ === void 0 ? void 0 : _window$PrimePrinter$.call(_window$PrimePrinter2)) !== false) return "prime";
	if ((_window$sunmiPrinter = window.sunmiPrinter) === null || _window$sunmiPrinter === void 0 ? void 0 : _window$sunmiPrinter.printText) return "sunmi";
	return findAndroidBridge() ? "android" : null;
}
function isNativePrinterReady() {
	return nativeBridge() !== null;
}
/**
* A ponte nativa é injetada pelo WebView e pode aparecer depois do primeiro
* render. Este hook reavalia até encontrá-la, evitando botão travado em cinza.
*/
function useNativePrinterReady() {
	const [ready, setReady] = (0, import_react.useState)(() => isNativePrinterReady());
	(0, import_react.useEffect)(() => {
		if (ready) return;
		const id = window.setInterval(() => {
			if (isNativePrinterReady()) {
				setReady(true);
				window.clearInterval(id);
			}
		}, 400);
		return () => window.clearInterval(id);
	}, [ready]);
	return ready;
}
/** Lista o que existe nesta maquininha — usado no diagnóstico da tela. */
function printerDiagnostics() {
	var _nativeBridge, _findAndroidBridge$ke, _findAndroidBridge;
	const found = Object.keys(typeof window !== "undefined" ? window : {}).filter((k) => /print|sunmi|gertec|elgin|pax|pos|android|bridge/i.test(k));
	return {
		ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
		bridge: (_nativeBridge = nativeBridge()) !== null && _nativeBridge !== void 0 ? _nativeBridge : "nenhuma",
		androidBridgeKey: (_findAndroidBridge$ke = (_findAndroidBridge = findAndroidBridge()) === null || _findAndroidBridge === void 0 ? void 0 : _findAndroidBridge.key) !== null && _findAndroidBridge$ke !== void 0 ? _findAndroidBridge$ke : null,
		globaisEncontradas: found.slice(0, 40),
		preferencia: getPrinterPref()
	};
}
/** Varredura profunda (2 níveis) de objetos injetados na WebView com métodos de impressão. */
function scanBridgeCandidates() {
	if (typeof window === "undefined") return [];
	const w = window;
	const out = [];
	const skip = new Set([
		"window",
		"self",
		"top",
		"parent",
		"frames",
		"document",
		"location",
		"navigator"
	]);
	let keys = [];
	try {
		keys = Object.getOwnPropertyNames(w);
	} catch (_unused3) {
		keys = Object.keys(w);
	}
	const inspect = (obj, path, depth) => {
		if (!obj || typeof obj !== "object" && typeof obj !== "function" || depth > 2) return;
		let props = [];
		try {
			props = [...Object.getOwnPropertyNames(obj), ...Object.keys(obj)];
		} catch (_unused4) {
			return;
		}
		const methods = [...new Set(props)].filter((p) => {
			if (!/print|imprim|write|send|ticket|cupom|receipt|papel|paper/i.test(p)) return false;
			try {
				return typeof obj[p] === "function";
			} catch (_unused5) {
				return false;
			}
		});
		if (methods.length) out.push({
			path,
			methods: methods.slice(0, 12)
		});
		if (depth < 2) for (const p of [...new Set(props)].slice(0, 60)) {
			if (skip.has(p)) continue;
			let child;
			try {
				child = obj[p];
			} catch (_unused6) {
				continue;
			}
			if (child && typeof child === "object" && child !== obj) inspect(child, `${path}.${p}`, depth + 1);
		}
	};
	for (const k of keys) {
		if (skip.has(k)) continue;
		let obj;
		try {
			obj = w[k];
		} catch (_unused7) {
			continue;
		}
		if (obj && (typeof obj === "object" || typeof obj === "function")) inspect(obj, k, 1);
	}
	const seen = /* @__PURE__ */ new Set();
	return out.filter((c) => seen.has(c.path) ? false : (seen.add(c.path), true)).slice(0, 60);
}
function resolvePath(path) {
	if (typeof window === "undefined") return null;
	let cur = window;
	for (const part of path.split(".")) {
		if (!cur || typeof cur !== "object") return null;
		cur = cur[part];
	}
	if (!cur || typeof cur !== "object") return null;
	return {
		holder: cur,
		obj: cur
	};
}
/** Tenta imprimir um texto por um caminho/método específico e devolve o resultado. */
function tryBridgePrint(path, method, text) {
	const target = resolvePath(path);
	const obj = target === null || target === void 0 ? void 0 : target.obj;
	const fn = obj === null || obj === void 0 ? void 0 : obj[method];
	if (typeof fn !== "function") return {
		ok: false,
		detail: "método indisponível"
	};
	const call = fn;
	const attempts = [
		[text],
		[text, 1],
		[
			text,
			0,
			0
		],
		[]
	];
	for (const args of attempts) try {
		const r = call.apply(obj, args);
		return {
			ok: true,
			detail: `chamado com ${args.length} argumento(s) → ${String(r)}`
		};
	} catch (e) {
		if (args === attempts[attempts.length - 1]) return {
			ok: false,
			detail: String(e)
		};
	}
	return {
		ok: false,
		detail: "nenhuma assinatura aceita"
	};
}
/** Preferência salva pelo operador ("auto" = detecção automática). */
function getPrinterPref() {
	if (typeof localStorage === "undefined") return "auto";
	const v = localStorage.getItem(PREF_KEY);
	if (v === "native") return "native";
	if (v !== null) try {
		localStorage.removeItem(PREF_KEY);
	} catch (_unused8) {}
	return "auto";
}
var DOC_STYLES = `
  @page { size: auto; margin: 0; }
  html, body { width: 100%; background: #fff; }
  body { font-family: 'Courier New', monospace; font-size: 12pt; line-height: 1.25; margin: 0; padding: 2mm; color: #000; box-sizing: border-box; }
  .pos-ticket { width: 100%; max-width: 100%; margin: 0 auto; box-sizing: border-box; word-break: break-word; }
  .center { text-align: center; }
  .right { text-align: right; }
  .row { display: flex; justify-content: space-between; gap: 4px; }
  .hr { border-top: 1px dashed #000; margin: 4px 0; }
  .bold { font-weight: 700; }
  .lg { font-size: 14pt; }
  .xl { font-size: 17pt; }
  img, svg { display: block; margin: 0 auto; max-width: 100%; height: auto; }
`;
function buildDocument(html, copies) {
	return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cupom</title><style>${DOC_STYLES}</style></head><body>${Array.from({ length: copies }).map((_, i) => `${i > 0 ? "<div style=\"page-break-before:always\"></div>" : ""}<div class="pos-ticket">${html}</div>`).join("")}</body></html>`;
}
/** Mostra o cupom para conferência com botão de envio direto ao RawBT. */
function openPrintPreview(html, copies = 1) {
	var _document$getElementB;
	(_document$getElementB = document.getElementById(PREVIEW_ID)) === null || _document$getElementB === void 0 || _document$getElementB.remove();
	const doc = buildDocument(html, copies);
	const overlay = document.createElement("div");
	overlay.id = PREVIEW_ID;
	overlay.style.cssText = "position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.55);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;";
	const card = document.createElement("div");
	card.style.cssText = "background:#fff;border-radius:14px;overflow:hidden;width:100%;max-width:380px;max-height:88vh;display:flex;flex-direction:column;box-shadow:0 12px 40px rgba(0,0,0,.3);";
	const frame = document.createElement("iframe");
	frame.style.cssText = "border:0;width:100%;flex:1;min-height:55vh;background:#fff;";
	frame.srcdoc = doc;
	const bar = document.createElement("div");
	bar.style.cssText = "display:flex;gap:8px;padding:12px;border-top:1px solid #e5e0d8;background:#faf8f5;";
	const close = document.createElement("button");
	close.textContent = "Fechar";
	close.style.cssText = "flex:1;height:44px;border-radius:10px;border:1px solid #d8d2c7;background:#fff;font-weight:600;font-size:15px;";
	close.onclick = () => overlay.remove();
	const hasBridge = !!nativeBridge();
	const print = document.createElement("button");
	print.textContent = hasBridge ? "Imprimir" : "Sem app Prime Q2I";
	print.disabled = !hasBridge;
	print.style.cssText = `flex:1;height:44px;border-radius:10px;border:0;background:${hasBridge ? POS_PRINT_COLOR : "#9ca3af"};color:#fff;font-weight:700;font-size:15px;`;
	print.onclick = async () => {
		print.disabled = true;
		print.textContent = "Enviando...";
		try {
			await printHTML(html, { copies });
			print.textContent = "Enviado à impressora";
			window.setTimeout(() => overlay.remove(), 600);
		} catch (error) {
			print.disabled = false;
			print.textContent = error instanceof Error ? error.message : "Impressora indisponível";
		}
	};
	bar.append(close, print);
	card.append(frame, bar);
	overlay.append(card);
	overlay.onclick = (e) => {
		if (e.target === overlay) overlay.remove();
	};
	document.body.appendChild(overlay);
}
/** Largura da bobina de 58mm na fonte padrão da impressora interna. */
var COLS = 32;
function wrap(text, width = COLS) {
	const words = text.split(/\s+/).filter(Boolean);
	if (!words.length) return [];
	const lines = [];
	let cur = "";
	for (const w of words) {
		if (!cur.length) cur = w;
		else if (cur.length + 1 + w.length <= width) cur += " " + w;
		else {
			lines.push(cur);
			cur = w;
		}
		while (cur.length > width) {
			lines.push(cur.slice(0, width));
			cur = cur.slice(width);
		}
	}
	if (cur) lines.push(cur);
	return lines;
}
var centerLine = (s) => s.length >= COLS ? s : " ".repeat(Math.floor((COLS - s.length) / 2)) + s;
/** Label à esquerda e valor à direita, preenchendo a largura da bobina. */
function rowLines(label, value) {
	var _out$pop;
	if (!value) return wrap(label);
	if (label.length + 1 + value.length <= COLS) return [label + " ".repeat(COLS - label.length - value.length) + value];
	const out = wrap(label);
	const last = (_out$pop = out.pop()) !== null && _out$pop !== void 0 ? _out$pop : "";
	if (last.length + 1 + value.length <= COLS) out.push(last + " ".repeat(COLS - last.length - value.length) + value);
	else out.push(last, " ".repeat(Math.max(0, COLS - value.length)) + value);
	return out;
}
/**
* Converte o HTML do cupom em texto monoespaçado de 32 colunas.
* Usa a estrutura semântica (.row/.center/.hr) em vez de innerText, que
* colava rótulo e valor ("SubtotalR$ 4,50") e estourava a largura do papel.
*/
function htmlToText(html) {
	const root = document.createElement("div");
	root.innerHTML = html;
	const lines = [];
	const walk = (el, inheritedCenter = false) => {
		for (const node of Array.from(el.children)) {
			var _node$className$toStr, _node$className, _node$className$toStr2, _node$getAttribute, _node$textContent, _node$textContent2;
			const cls = (_node$className$toStr = (_node$className = node.className) === null || _node$className === void 0 || (_node$className$toStr2 = _node$className.toString) === null || _node$className$toStr2 === void 0 ? void 0 : _node$className$toStr2.call(_node$className)) !== null && _node$className$toStr !== void 0 ? _node$className$toStr : "";
			const centered = inheritedCenter || cls.includes("center");
			if (node.tagName.toLowerCase() === "svg") continue;
			if ((_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "data-qr")) continue;
			if (cls.includes("hr")) {
				lines.push("-".repeat(COLS));
				continue;
			}
			const spans = Array.from(node.children).filter((c) => c.tagName.toLowerCase() === "span");
			if (cls.includes("row") && spans.length >= 2) {
				var _spans$0$textContent, _spans$textContent;
				const label = ((_spans$0$textContent = spans[0].textContent) !== null && _spans$0$textContent !== void 0 ? _spans$0$textContent : "").trim();
				const value = ((_spans$textContent = spans[spans.length - 1].textContent) !== null && _spans$textContent !== void 0 ? _spans$textContent : "").trim();
				lines.push(...rowLines(label, value));
				continue;
			}
			if (node.children.length && !((_node$textContent = node.textContent) === null || _node$textContent === void 0 ? void 0 : _node$textContent.trim())) {
				walk(node, centered);
				continue;
			}
			const txt = ((_node$textContent2 = node.textContent) !== null && _node$textContent2 !== void 0 ? _node$textContent2 : "").replace(/\s+/g, " ").trim();
			if (!txt) {
				if (node.children.length) walk(node, centered);
				continue;
			}
			const wrapped = wrap(txt);
			lines.push(...centered ? wrapped.map(centerLine) : wrapped);
		}
	};
	walk(root);
	while (lines.length && !lines[0].trim()) lines.shift();
	while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
	return lines.join("\n").replace(/\n{3,}/g, "\n\n");
}
/** Lê o conteúdo do QR marcado no cupom (data-qr). */
function extractQr(html) {
	var _root$querySelector;
	const root = document.createElement("div");
	root.innerHTML = html;
	return ((_root$querySelector = root.querySelector("[data-qr]")) === null || _root$querySelector === void 0 ? void 0 : _root$querySelector.getAttribute("data-qr")) || null;
}
var QR_METHODS = [
	"printQr",
	"printQRCode",
	"printQrCode",
	"printQrcode",
	"printQRcode"
];
/** Tenta imprimir o QR como gráfico pela ponte nativa. Retorna true se enviou. */
function printQrNative(content) {
	if (typeof window === "undefined" || !content) return false;
	const targets = [];
	if (window.PrimePrinter) targets.push(window.PrimePrinter);
	if (window.sunmiPrinter) targets.push(window.sunmiPrinter);
	const found = findAndroidBridge();
	if (found) {
		const w = window;
		if (w[found.key]) targets.push(w[found.key]);
	}
	for (const t of targets) for (const m of QR_METHODS) {
		const fn = t[m];
		if (typeof fn !== "function") continue;
		const call = fn;
		for (const args of [
			[content, 6],
			[content],
			[
				content,
				6,
				2
			]
		]) try {
			if (call.apply(t, args) === false) continue;
			return true;
		} catch (_unused10) {}
	}
	return false;
}
/** Imprime um HTML já renderizado (cupom ou etiqueta) usando o driver disponível. */
async function printHTML(html, opts) {
	var _opts$copies;
	const copies = (_opts$copies = opts === null || opts === void 0 ? void 0 : opts.copies) !== null && _opts$copies !== void 0 ? _opts$copies : 1;
	if (opts === null || opts === void 0 ? void 0 : opts.preview) {
		openPrintPreview(html, copies);
		return;
	}
	const qr = extractQr(html);
	const text = htmlToText(html);
	const bridge = nativeBridge();
	if (bridge) {
		const prime = window.PrimePrinter;
		for (let i = 0; i < copies; i++) {
			var _window$PrimePrinter3, _window$PrimePrinter4, _window$PrimePrinter5, _findAndroidBridge3;
			if (bridge === "prime" && typeof (prime === null || prime === void 0 ? void 0 : prime.printReceipt) === "function") {
				if (prime.printReceipt(text + "\n", qr || "", "") === false) throw new Error("A impressora interna recusou o cupom");
				continue;
			}
			if (bridge === "prime" && ((_window$PrimePrinter3 = window.PrimePrinter) === null || _window$PrimePrinter3 === void 0 ? void 0 : _window$PrimePrinter3.printText)) {
				if (window.PrimePrinter.printText(text + "\n") === false) throw new Error("A impressora interna recusou o cupom");
			} else if (bridge === "sunmi" && window.sunmiPrinter) {
				var _window$sunmiPrinter$, _window$sunmiPrinter2, _window$sunmiPrinter$2, _window$sunmiPrinter3;
				(_window$sunmiPrinter$ = (_window$sunmiPrinter2 = window.sunmiPrinter).printerInit) === null || _window$sunmiPrinter$ === void 0 || _window$sunmiPrinter$.call(_window$sunmiPrinter2);
				(_window$sunmiPrinter$2 = (_window$sunmiPrinter3 = window.sunmiPrinter).printText) === null || _window$sunmiPrinter$2 === void 0 || _window$sunmiPrinter$2.call(_window$sunmiPrinter3, text + "\n");
			} else {
				var _findAndroidBridge2;
				(_findAndroidBridge2 = findAndroidBridge()) === null || _findAndroidBridge2 === void 0 || _findAndroidBridge2.print(text + "\n");
			}
			if (qr) printQrNative(qr);
			const rodape = "\n\n";
			if (bridge === "prime") (_window$PrimePrinter4 = window.PrimePrinter) === null || _window$PrimePrinter4 === void 0 || (_window$PrimePrinter5 = _window$PrimePrinter4.printText) === null || _window$PrimePrinter5 === void 0 || _window$PrimePrinter5.call(_window$PrimePrinter4, rodape);
			else if (bridge === "sunmi" && window.sunmiPrinter) {
				var _window$sunmiPrinter$3, _window$sunmiPrinter4, _window$sunmiPrinter$4, _window$sunmiPrinter5, _window$sunmiPrinter$5, _window$sunmiPrinter6;
				(_window$sunmiPrinter$3 = (_window$sunmiPrinter4 = window.sunmiPrinter).printText) === null || _window$sunmiPrinter$3 === void 0 || _window$sunmiPrinter$3.call(_window$sunmiPrinter4, rodape);
				(_window$sunmiPrinter$4 = (_window$sunmiPrinter5 = window.sunmiPrinter).lineWrap) === null || _window$sunmiPrinter$4 === void 0 || _window$sunmiPrinter$4.call(_window$sunmiPrinter5, 3);
				(_window$sunmiPrinter$5 = (_window$sunmiPrinter6 = window.sunmiPrinter).cutPaper) === null || _window$sunmiPrinter$5 === void 0 || _window$sunmiPrinter$5.call(_window$sunmiPrinter6);
			} else (_findAndroidBridge3 = findAndroidBridge()) === null || _findAndroidBridge3 === void 0 || _findAndroidBridge3.print(rodape);
		}
		return;
	}
	throw new Error("Abra o aplicativo PRIME Q2I v3 — o Chrome não imprime direto");
}
//#endregion
export { scanBridgeCandidates as a, printerDiagnostics as i, getPrinterPref as n, tryBridgePrint as o, printHTML as r, useNativePrinterReady as s, POS_PRINT_COLOR as t };
