//#region node_modules/.nitro/vite/services/ssr/assets/order-code-C-NI66BU.js
var STOP_WORDS = new Set([
	"CHAVEIRO",
	"CHAVEIROS",
	"CHAVE",
	"CHAVES",
	"CHAV3IRO",
	"DE",
	"DA",
	"DO",
	"DAS",
	"DOS",
	"E",
	"&",
	"LTDA",
	"ME",
	"EIRELI",
	"EPP",
	"SA",
	"S/A",
	"COMERCIO",
	"COMÉRCIO",
	"AUTOMOTIVO",
	"AUTOMOTIVA"
]);
function normalize(txt) {
	return txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
}
function initialsFromName(name) {
	if (!name) return "";
	const norm = normalize(name);
	const words = norm.split(/[^A-Z0-9]+/).filter((w) => w && !STOP_WORDS.has(w));
	if (words.length >= 2) return (words[0][0] + words[1][0]).slice(0, 2);
	if (words.length === 1) return words[0].slice(0, 2).padEnd(2, "X");
	return (norm.replace(/[^A-Z0-9]/g, "").slice(0, 2) || "XX").padEnd(2, "X");
}
function digitsFromId(id) {
	const hex = (id || "").replace(/-/g, "").slice(0, 8) || "0";
	const n = Number.parseInt(hex, 16);
	const mod = Number.isFinite(n) ? Math.abs(n) % 1e4 : 0;
	return String(mod).padStart(4, "0");
}
/** Retorna o código sem o "#", ex.: "JP1234". */
function orderCode(id, clientName) {
	return `${initialsFromName(clientName)}${digitsFromId(id)}`;
}
/** Retorna o código com "#", ex.: "#JP1234". */
function orderCodeHash(id, clientName) {
	return `#${orderCode(id, clientName)}`;
}
//#endregion
export { orderCodeHash as n, orderCode as t };
