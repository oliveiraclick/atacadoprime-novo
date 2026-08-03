import { o as __toESM } from "../_runtime.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
import { t as require_JsBarcode } from "../_libs/jsbarcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-templates-kUAheyLO.js
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var import_JsBarcode = /* @__PURE__ */ __toESM(require_JsBarcode());
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
function esc(s) {
	return s.replace(/[&<>]/g, (c) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;"
	})[c]);
}
function barcodeSVG(code, opts) {
	if (!code) return "";
	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	try {
		var _opts$width, _opts$height, _opts$fontSize;
		(0, import_JsBarcode.default)(svg, code, {
			format: code.length === 13 ? "EAN13" : "CODE128",
			width: (_opts$width = opts === null || opts === void 0 ? void 0 : opts.width) !== null && _opts$width !== void 0 ? _opts$width : 1.6,
			height: (_opts$height = opts === null || opts === void 0 ? void 0 : opts.height) !== null && _opts$height !== void 0 ? _opts$height : 40,
			fontSize: (_opts$fontSize = opts === null || opts === void 0 ? void 0 : opts.fontSize) !== null && _opts$fontSize !== void 0 ? _opts$fontSize : 12,
			margin: 0,
			displayValue: true
		});
		return new XMLSerializer().serializeToString(svg);
	} catch (_unused) {
		return `<div class="center">${esc(code)}</div>`;
	}
}
var SITE_URL = "https://www.primeautomotive.app";
/** QR code em SVG inline (geração síncrona via callback do lib qrcode). */
function qrSVG(text, size = 108) {
	let out = "";
	try {
		import_lib.toString(text, {
			type: "svg",
			margin: 0,
			width: size,
			errorCorrectionLevel: "M"
		}, (err, svg) => {
			if (!err && svg) out = svg;
		});
	} catch (_unused2) {
		out = "";
	}
	if (!out) return `<div class="center">${esc(text)}</div>`;
	return out.replace("<svg", `<svg width="${size}" height="${size}"`);
}
/** Converte tipo/modalidade/parcelas em texto legível no cupom. */
function pagamentoLabel(tipo, opts) {
	const t = (tipo !== null && tipo !== void 0 ? tipo : "").toUpperCase();
	return `${t === "PIX" ? "PIX" : t === "DINHEIRO" ? "Dinheiro" : t === "CARTAO" || t === "CREDITO" || t === "DEBITO" ? (() => {
		var _opts$modalidade;
		const mod = ((_opts$modalidade = opts === null || opts === void 0 ? void 0 : opts.modalidade) !== null && _opts$modalidade !== void 0 ? _opts$modalidade : t === "DEBITO" ? "DEBITO" : t === "CREDITO" ? "CREDITO" : "").toUpperCase();
		if (mod === "DEBITO") return "Cartão de débito";
		if (mod === "CREDITO") return "Cartão de crédito";
		return "Cartão";
	})() : t === "BOLETO" ? "Boleto" : t === "FATURADO" ? "Faturado" : t === "PRAZO" ? "A prazo" : tipo ? tipo : "—"}${(opts === null || opts === void 0 ? void 0 : opts.parcelas) && opts.parcelas > 1 ? ` ${opts.parcelas}x` : ""}${(opts === null || opts === void 0 ? void 0 : opts.bandeira) ? ` (${opts.bandeira})` : ""}`;
}
function renderTicket(o) {
	var _o$loja;
	const loja = (_o$loja = o.loja) !== null && _o$loja !== void 0 ? _o$loja : {
		nome: "Atacado Prime",
		telefone: "(34) 99865-1112",
		endereco: "Uberlândia-MG"
	};
	const itensHtml = o.itens.map((i) => `
    <div>${esc(i.nome)}</div>
    <div class="row"><span>${i.qtd} x ${brl(i.unit)}</span><span>${brl(i.total)}</span></div>
  `).join("");
	return `
    <div class="center bold lg">${esc(loja.nome)}</div>
    ${loja.telefone ? `<div class="center">${esc(loja.telefone)}</div>` : ""}
    ${loja.endereco ? `<div class="center">${esc(loja.endereco)}</div>` : ""}
    <div class="hr"></div>
    <div class="row"><span>Pedido</span><span class="bold">${esc(o.codigo)}</span></div>
    <div class="row"><span>Data</span><span>${esc(o.data)}</span></div>
    ${o.cliente ? `<div class="row"><span>Cliente</span><span>${esc(o.cliente)}</span></div>` : ""}
    ${o.vendedor ? `<div class="row"><span>Vendedor</span><span>${esc(o.vendedor)}</span></div>` : ""}
    <div class="hr"></div>
    ${itensHtml}
    <div class="hr"></div>
    <div class="row"><span>Subtotal</span><span>${brl(o.subtotal)}</span></div>
    ${o.desconto ? `<div class="row"><span>Desconto</span><span>-${brl(o.desconto)}</span></div>` : ""}
    ${o.frete ? `<div class="row"><span>Frete</span><span>${brl(o.frete)}</span></div>` : ""}
    <div class="row bold xl"><span>TOTAL</span><span>${brl(o.total)}</span></div>
    <div class="row"><span>Pagamento</span><span>${esc(o.pagamento)}</span></div>
    ${o.observacao ? `<div class="hr"></div><div>${esc(o.observacao)}</div>` : ""}
    <div class="hr"></div>
    <div class="center">Obrigado por sua compra.</div>
    <div class="center" data-qr="${SITE_URL}" style="margin-top:4px">${qrSVG(SITE_URL, 108)}</div>
    <div class="center" style="font-size:10px">www.primeautomotive.app</div>
  `;
}
function renderLabel(p) {
	return `
    <div class="center bold">${esc(p.nome.slice(0, 32))}</div>
    ${p.sku ? `<div class="center" style="font-size:9px">SKU: ${esc(p.sku)}</div>` : ""}
    <div class="center bold xl">${brl(p.preco)}</div>
    <div class="center">${barcodeSVG(p.codigo)}</div>
  `;
}
//#endregion
export { renderLabel as n, renderTicket as r, pagamentoLabel as t };
