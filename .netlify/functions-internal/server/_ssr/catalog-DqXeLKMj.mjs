import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { i as brl } from "./pdf-CsVsL9dt.mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { Dt as FolderTree, G as Plus, J as Percent, N as Search, Wt as CircleX, X as Pen, Z as Package, _ as Trash2, b as Tag, fn as ArrowUpDown, gn as ArrowDown, kt as FileText, m as TriangleAlert, un as ArrowUp } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DGeprr3K.mjs";
import { t as StatCard } from "./data-cards-BhN-APdV.mjs";
import { a as useCatalogStats, n as useAllProductsAdmin, o as useCategories, r as useBrands, s as useInstallmentPlans } from "./use-catalog-DqziQTPw.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DqXeLKMj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var BRAND_LOGO_DATA_URL = "data:image/png;base64,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";
async function loadImage(url) {
	try {
		const res = await fetch(url, { mode: "cors" });
		if (!res.ok) return null;
		const blob = await res.blob();
		const dataUrl = await new Promise((resolve, reject) => {
			const r = new FileReader();
			r.onload = () => resolve(r.result);
			r.onerror = reject;
			r.readAsDataURL(blob);
		});
		const dims = await new Promise((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve({
				w: img.naturalWidth,
				h: img.naturalHeight
			});
			img.onerror = reject;
			img.src = dataUrl;
		});
		return {
			data: dataUrl,
			format: /image\/png/i.test(blob.type) ? "PNG" : "JPEG",
			w: dims.w,
			h: dims.h
		};
	} catch (_unused) {
		return null;
	}
}
var C = {
	ink: [
		11,
		18,
		32
	],
	inkSoft: [
		26,
		36,
		54
	],
	paper: [
		253,
		252,
		249
	],
	paperAlt: [
		246,
		244,
		239
	],
	line: [
		222,
		217,
		208
	],
	hair: [
		232,
		228,
		220
	],
	fg: [
		17,
		24,
		39
	],
	sub: [
		96,
		105,
		122
	],
	muted: [
		140,
		148,
		165
	],
	gold: [
		176,
		141,
		62
	],
	goldSoft: [
		242,
		232,
		208
	],
	accent: [
		37,
		99,
		235
	],
	red: [
		178,
		34,
		52
	],
	redSoft: [
		250,
		234,
		236
	],
	green: [
		21,
		87,
		68
	],
	greenSoft: [
		232,
		244,
		238
	],
	white: [
		255,
		255,
		255
	]
};
var set = (doc, kind, rgb) => {
	const [r, g, b] = rgb;
	if (kind === "fill") doc.setFillColor(r, g, b);
	else if (kind === "draw") doc.setDrawColor(r, g, b);
	else doc.setTextColor(r, g, b);
};
var TIPO_LABEL = {
	carcaca: "Capas",
	controle: "Controles",
	chave: "Chaves",
	transponder: "Transponders",
	lamina: "Lâminas",
	bateria: "Baterias",
	alarme: "Alarmes",
	modulo: "Módulos",
	acessorio: "Acessórios"
};
var TIPO_ORDER = [
	"carcaca",
	"controle",
	"chave",
	"transponder",
	"lamina",
	"bateria",
	"alarme",
	"modulo",
	"acessorio"
];
function tipoKey(t) {
	const k = (t !== null && t !== void 0 ? t : "").toLowerCase().trim();
	return TIPO_ORDER.includes(k) ? k : "_outros";
}
function tipoLabel(k) {
	var _TIPO_LABEL$k;
	return (_TIPO_LABEL$k = TIPO_LABEL[k]) !== null && _TIPO_LABEL$k !== void 0 ? _TIPO_LABEL$k : "Outros";
}
function tipoRank(k) {
	const i = TIPO_ORDER.indexOf(k);
	return i === -1 ? 999 : i;
}
async function generateCatalogPdf(items, opts = {}) {
	const { brandName = "Atacado Prime", brandTagline = "Catálogo Oficial", contact, phone = "(34) 99865-1112", website = "primeautomotive.app" } = opts;
	const doc = new import_jspdf_node_min.default({
		unit: "mm",
		format: "a4"
	});
	const pageW = doc.internal.pageSize.getWidth();
	const pageH = doc.internal.pageSize.getHeight();
	const margin = 14;
	const year = (/* @__PURE__ */ new Date()).getFullYear();
	(/* @__PURE__ */ new Date()).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric"
	});
	const fillPage = (rgb) => {
		set(doc, "fill", rgb);
		doc.rect(0, 0, pageW, pageH, "F");
	};
	const hairline = (x1, y1, x2, y2, rgb = C.line) => {
		set(doc, "draw", rgb);
		doc.setLineWidth(.2);
		doc.line(x1, y1, x2, y2);
	};
	const centerText = (text, y, opts = {}) => {
		const { size = 10, style = "normal", color = C.fg, charSpace = 0 } = opts;
		doc.setFont("helvetica", style);
		doc.setFontSize(size);
		set(doc, "text", color);
		doc.setCharSpace(charSpace);
		const baseWidth = doc.getTextWidth(text);
		const extra = charSpace * Math.max(0, text.length - 1);
		const x = (pageW - baseWidth - extra) / 2;
		doc.text(text, x, y);
		doc.setCharSpace(0);
	};
	fillPage(C.ink);
	const cx = pageW / 2;
	const safeTop = 20;
	const safeBottom = pageH - margin - 6;
	set(doc, "draw", C.gold);
	doc.setLineWidth(.6);
	doc.rect(margin - 4, margin - 4, pageW - (margin - 4) * 2, pageH - (margin - 4) * 2);
	doc.setLineWidth(.2);
	doc.rect(margin - 2, margin - 2, pageW - (margin - 2) * 2, pageH - (margin - 2) * 2);
	const logoSize = 30;
	const logoY = safeTop - 1;
	const cardPad = 4;
	set(doc, "fill", C.paper);
	doc.roundedRect(cx - logoSize / 2 - cardPad, logoY - cardPad, 38, 38, 4, 4, "F");
	try {
		doc.addImage(BRAND_LOGO_DATA_URL, "PNG", cx - logoSize / 2, logoY, logoSize, logoSize, void 0, "FAST");
	} catch (_unused2) {}
	centerText("EDIÇÃO OFICIAL", 52, {
		size: 8,
		color: [
			200,
			194,
			178
		],
		charSpace: 3
	});
	set(doc, "fill", C.gold);
	doc.rect(cx - 12, 55, 24, .5, "F");
	const coverMidY = pageH / 2 - 6;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(46);
	set(doc, "text", C.white);
	doc.text(brandName.toUpperCase(), cx, coverMidY - 8, { align: "center" });
	centerText(brandTagline.toUpperCase(), coverMidY + 2, {
		size: 11,
		color: C.gold,
		charSpace: 2
	});
	const yearY = coverMidY + 22;
	hairline(cx - 38, yearY, cx - 12, yearY, [
		110,
		92,
		52
	]);
	hairline(cx + 12, yearY, cx + 38, yearY, [
		110,
		92,
		52
	]);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(24);
	set(doc, "text", C.gold);
	doc.text(String(year), cx, yearY + 3, { align: "center" });
	const footTop = safeBottom - 34;
	hairline(cx - 60, footTop, cx + 60, footTop, [
		110,
		92,
		52
	]);
	centerText("VENDAS DIRETAS", footTop + 7, {
		size: 8,
		color: C.gold,
		charSpace: 2.4
	});
	doc.setFont("helvetica", "bold");
	doc.setFontSize(18);
	set(doc, "text", C.white);
	doc.text(phone, cx, footTop + 18, { align: "center" });
	centerText(website.toUpperCase(), footTop + 26, {
		size: 8.5,
		color: [
			200,
			194,
			178
		],
		charSpace: 1.6
	});
	const urls = Array.from(new Set(items.map((i) => i.imagem).filter(Boolean)));
	const cache = /* @__PURE__ */ new Map();
	const CONC = 6;
	for (let i = 0; i < urls.length; i += CONC) {
		const batch = urls.slice(i, i + CONC);
		const loaded = await Promise.all(batch.map((u) => loadImage(u)));
		batch.forEach((u, idx) => cache.set(u, loaded[idx]));
	}
	const grouped = /* @__PURE__ */ new Map();
	for (const it of items) {
		const k = tipoKey(it.tipo);
		if (!grouped.has(k)) grouped.set(k, []);
		grouped.get(k).push(it);
	}
	const secoes = Array.from(grouped.keys()).sort((a, b) => tipoRank(a) - tipoRank(b));
	for (const k of secoes) grouped.get(k).sort((a, b) => {
		var _a$marca, _b$marca;
		const ma = ((_a$marca = a.marca) !== null && _a$marca !== void 0 ? _a$marca : "").localeCompare((_b$marca = b.marca) !== null && _b$marca !== void 0 ? _b$marca : "", "pt-BR");
		if (ma !== 0) return ma;
		return a.nome.localeCompare(b.nome, "pt-BR");
	});
	const cols = 1;
	const rows = 3;
	const gap = 7;
	const headerH = 22;
	const footerH = 24;
	const gridW = pageW - margin * 2;
	const gridH = pageH - margin - headerH - footerH;
	const cardW = (gridW - gap * (cols - 1)) / cols;
	const cardH = (gridH - gap * (rows - 1)) / rows;
	const perPage = cols * rows;
	doc.addPage();
	fillPage(C.paper);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(8.5);
	doc.setCharSpace(2);
	set(doc, "text", C.gold);
	doc.text("SUMÁRIO", margin, 24);
	doc.setCharSpace(0);
	hairline(margin, 27, 42, 27, C.gold);
	doc.setFont("helvetica", "bold");
	doc.setFontSize(44);
	set(doc, "text", C.fg);
	doc.text("Índice", margin, 54);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(10.5);
	set(doc, "text", C.sub);
	doc.text("Um guia rápido para navegar por toda a coleção deste volume.", margin, 62);
	let cursorY = 84;
	let pageCursor = 3;
	const rowH = 12;
	doc.setFontSize(11);
	for (const k of secoes) {
		const list = grouped.get(k);
		const pagesForSection = Math.max(1, Math.ceil(list.length / perPage)) + 1;
		const divisor = pageCursor;
		set(doc, "text", C.fg);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(12.5);
		doc.text(tipoLabel(k), margin, cursorY);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(9.5);
		set(doc, "text", C.muted);
		doc.text(`${list.length} ${list.length === 1 ? "peça" : "peças"}`, 74, cursorY);
		const dotsStart = 104;
		const dotsEnd = pageW - margin - 18;
		set(doc, "draw", C.line);
		doc.setLineWidth(.15);
		doc.setLineDashPattern([.6, 1.6], 0);
		doc.line(dotsStart, cursorY - 1.5, dotsEnd, cursorY - 1.5);
		doc.setLineDashPattern([], 0);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(11);
		set(doc, "text", C.gold);
		doc.text(String(divisor).padStart(2, "0"), pageW - margin, cursorY, { align: "right" });
		cursorY += rowH;
		pageCursor += pagesForSection;
		if (cursorY > pageH - margin - 30) break;
	}
	hairline(margin, pageH - margin - 10, pageW - margin, pageH - margin - 10);
	doc.setFont("helvetica", "normal");
	doc.setFontSize(8);
	set(doc, "text", C.muted);
	doc.text(brandName, margin, pageH - margin - 4);
	doc.text("02", pageW - margin, pageH - margin - 4, { align: "right" });
	function drawSectionDivider(secKey, index, total, pageNo) {
		doc.addPage();
		fillPage(C.ink);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(9);
		doc.setCharSpace(2.2);
		set(doc, "text", C.gold);
		doc.text(`SEÇÃO ${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`, margin, 34);
		doc.setCharSpace(0);
		hairline(margin, 38, 42, 38, C.gold);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(96);
		set(doc, "text", C.white);
		const label = tipoLabel(secKey);
		doc.text(label, margin, pageH / 2 + 6);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(13);
		set(doc, "text", [
			210,
			200,
			178
		]);
		const count = grouped.get(secKey).length;
		doc.text(`${count} ${count === 1 ? "peça catalogada" : "peças catalogadas"}`, margin, pageH / 2 + 20);
		set(doc, "fill", C.gold);
		doc.rect(margin, pageH / 2 + 30, 40, .6, "F");
		hairline(margin, pageH - margin - 12, pageW - margin, pageH - margin - 12, [
			80,
			70,
			46
		]);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8);
		doc.setCharSpace(1.4);
		set(doc, "text", [
			200,
			194,
			178
		]);
		doc.text(brandName.toUpperCase(), margin, pageH - margin - 5);
		doc.text(String(pageNo).padStart(2, "0"), pageW - margin, pageH - margin - 5, { align: "right" });
		doc.setCharSpace(0);
	}
	function drawGridHeader(secLabel, page, total, pageNo) {
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8);
		doc.setCharSpace(1.8);
		set(doc, "text", C.gold);
		doc.text(secLabel.toUpperCase(), margin, 20);
		doc.setCharSpace(0);
		doc.setFont("helvetica", "bold");
		doc.setFontSize(16);
		set(doc, "text", C.fg);
		doc.text(secLabel, margin, 28);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(8.5);
		set(doc, "text", C.muted);
		doc.text(`${page} / ${total}`, pageW - margin, 20, { align: "right" });
		doc.setFont("helvetica", "bold");
		doc.setFontSize(9);
		set(doc, "text", C.fg);
		doc.text(String(pageNo).padStart(2, "0"), pageW - margin, 28, { align: "right" });
		hairline(margin, 32, pageW - margin, 32);
	}
	function drawGridFooter(pageNo) {
		hairline(margin, pageH - margin - 8, pageW - margin, pageH - margin - 8);
		doc.setFont("helvetica", "normal");
		doc.setFontSize(7.5);
		set(doc, "text", C.muted);
		doc.text(brandName, margin, pageH - margin - 3);
		if (contact) doc.text(contact, pageW / 2, pageH - margin - 3, { align: "center" });
		doc.text(String(pageNo).padStart(2, "0"), pageW - margin, pageH - margin - 3, { align: "right" });
	}
	function drawCard(p, x, y) {
		var _p$marca;
		set(doc, "fill", [
			235,
			231,
			222
		]);
		doc.roundedRect(x + .8, y + 1.2, cardW, cardH, 3, 3, "F");
		set(doc, "fill", C.white);
		set(doc, "draw", C.hair);
		doc.setLineWidth(.25);
		doc.roundedRect(x, y, cardW, cardH, 3, 3, "FD");
		const imgColW = cardW * .34;
		hairline(x + imgColW, y + 6, x + imgColW, y + cardH - 6, C.hair);
		const img = p.imagem ? cache.get(p.imagem) : null;
		if (img) {
			const boxW = imgColW - 10;
			const boxH = cardH - 12;
			const ratio = img.w / img.h;
			let w = boxW, h = w / ratio;
			if (h > boxH) {
				h = boxH;
				w = h * ratio;
			}
			const ix = x + (imgColW - w) / 2;
			const iy = y + (cardH - h) / 2;
			try {
				doc.addImage(img.data, img.format, ix, iy, w, h, void 0, "FAST");
			} catch (_unused3) {}
		} else {
			doc.setFont("helvetica", "normal");
			doc.setFontSize(9);
			set(doc, "text", C.muted);
			doc.text("sem imagem", x + imgColW / 2, y + cardH / 2, { align: "center" });
		}
		const padX = 8;
		const textX = x + imgColW + padX;
		const textW = cardW - imgColW - padX * 2;
		const pzY = y + cardH - 22 - 6;
		const textTop = y + 9;
		const textBottom = pzY - 5;
		let cy = textTop;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(8);
		doc.setCharSpace(1.4);
		set(doc, "text", C.gold);
		doc.text(((_p$marca = p.marca) !== null && _p$marca !== void 0 ? _p$marca : "SEM MARCA").toUpperCase(), textX, cy);
		doc.setCharSpace(0);
		cy += 5;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(14);
		set(doc, "text", C.fg);
		const nomeLH = 5.6;
		const availLines = Math.max(1, Math.floor((textBottom - cy - 5) / nomeLH));
		const maxLines = Math.min(3, availLines);
		const nomeAll = doc.splitTextToSize(p.nome, textW);
		const nome = nomeAll.slice(0, maxLines);
		if (nomeAll.length > maxLines && nome.length > 0) {
			const last = String(nome[nome.length - 1]).replace(/[\s.]+$/, "");
			nome[nome.length - 1] = last + "…";
		}
		doc.text(nome, textX, cy);
		cy += nome.length * nomeLH;
		const meta = [];
		if (p.sku) meta.push(`SKU ${p.sku}`);
		if (p.categoria) meta.push(p.categoria);
		if (meta.length && cy + 4 <= textBottom) {
			doc.setFont("helvetica", "normal");
			doc.setFontSize(8.5);
			set(doc, "text", C.muted);
			doc.text(meta.join("  ·  "), textX, cy + 1);
		}
		hairline(textX, pzY - 3, textX + textW, pzY - 3, C.hair);
		const preco = p.preco_unitario != null ? Number(p.preco_unitario) : null;
		if (p.preco_pacote != null && Number(p.preco_pacote) > 0) {
			const colW = (textW - 6) / 2;
			doc.setFont("helvetica", "normal");
			doc.setFontSize(7.5);
			doc.setCharSpace(1.2);
			set(doc, "text", C.sub);
			doc.text("UNITÁRIO", textX, pzY + 3);
			doc.setCharSpace(0);
			doc.setFont("helvetica", "bold");
			doc.setFontSize(17);
			set(doc, "text", C.fg);
			doc.text(preco != null ? brl(preco) : "—", textX, pzY + 13);
			doc.setFont("helvetica", "normal");
			doc.setFontSize(7.5);
			set(doc, "text", C.muted);
			doc.text("preço à vista", textX, pzY + 19);
			set(doc, "draw", C.hair);
			doc.setLineWidth(.2);
			doc.line(textX + colW + 3, pzY + 1, textX + colW + 3, pzY + 21);
			const px = textX + colW + 8;
			doc.setFont("helvetica", "bold");
			doc.setFontSize(7.5);
			doc.setCharSpace(1.2);
			set(doc, "text", C.red);
			doc.text(`PACOTE${p.quantidade_pacote ? ` · ${p.quantidade_pacote}UN` : ""}`, px, pzY + 3);
			doc.setCharSpace(0);
			doc.setFont("helvetica", "bold");
			doc.setFontSize(17);
			set(doc, "text", C.red);
			doc.text(brl(Number(p.preco_pacote)), px, pzY + 13);
			if (p.quantidade_pacote && Number(p.preco_pacote) > 0) {
				const un = Number(p.preco_pacote) / p.quantidade_pacote;
				doc.setFont("helvetica", "normal");
				doc.setFontSize(7.5);
				set(doc, "text", C.muted);
				doc.text(`${brl(un)} /un`, px, pzY + 19);
			}
		} else {
			doc.setFont("helvetica", "normal");
			doc.setFontSize(7.5);
			doc.setCharSpace(1.2);
			set(doc, "text", C.sub);
			doc.text("PREÇO À VISTA", textX, pzY + 3);
			doc.setCharSpace(0);
			doc.setFont("helvetica", "bold");
			doc.setFontSize(22);
			set(doc, "text", C.fg);
			doc.text(preco != null ? brl(preco) : "sob consulta", textX, pzY + 14);
			doc.setFont("helvetica", "normal");
			doc.setFontSize(8);
			set(doc, "text", C.muted);
			doc.text("valores em real (BRL)", textX, pzY + 20);
		}
	}
	let pageNo = 3;
	const totalSecoes = secoes.length;
	for (let s = 0; s < secoes.length; s++) {
		const key = secoes[s];
		const list = grouped.get(key);
		const label = tipoLabel(key);
		drawSectionDivider(key, s + 1, totalSecoes, pageNo);
		pageNo += 1;
		const totalPages = Math.max(1, Math.ceil(list.length / perPage));
		for (let page = 0; page < totalPages; page++) {
			doc.addPage();
			fillPage(C.paper);
			drawGridHeader(label, page + 1, totalPages, pageNo);
			list.slice(page * perPage, (page + 1) * perPage).forEach((p, i) => {
				const c = i % cols;
				const r = Math.floor(i / cols);
				drawCard(p, margin + c * (cardW + gap), 36 + r * (cardH + gap));
			});
			drawGridFooter(pageNo);
			pageNo += 1;
		}
	}
	doc.addPage();
	fillPage(C.ink);
	const bcx = pageW / 2;
	set(doc, "draw", C.gold);
	doc.setLineWidth(.6);
	doc.rect(margin - 4, margin - 4, pageW - (margin - 4) * 2, pageH - (margin - 4) * 2);
	doc.setLineWidth(.2);
	doc.rect(margin - 2, margin - 2, pageW - (margin - 2) * 2, pageH - (margin - 2) * 2);
	centerText("OBRIGADO PELA PREFERÊNCIA", 30, {
		size: 8,
		color: [
			200,
			194,
			178
		],
		charSpace: 2.6
	});
	set(doc, "fill", C.gold);
	doc.rect(bcx - 12, 34, 24, .5, "F");
	doc.setFont("helvetica", "bold");
	doc.setFontSize(22);
	set(doc, "text", C.white);
	doc.text("FALE COM A EQUIPE", bcx, 62, { align: "center" });
	doc.text("DE VENDAS", bcx, 72, { align: "center" });
	const phoneBoxW = 130;
	const phoneBoxH = 36;
	const phoneX = (pageW - phoneBoxW) / 2;
	const phoneY = 82;
	set(doc, "draw", C.gold);
	doc.setLineWidth(.5);
	doc.rect(phoneX, phoneY, phoneBoxW, phoneBoxH);
	centerText("TELEFONE · WHATSAPP", 90, {
		size: 7.5,
		color: C.gold,
		charSpace: 2.4
	});
	doc.setFont("helvetica", "bold");
	doc.setFontSize(20);
	set(doc, "text", C.white);
	doc.text(phone, bcx, 104, { align: "center" });
	centerText("ATENDIMENTO SEGUNDA A SÁBADO", 112, {
		size: 7.5,
		color: [
			200,
			194,
			178
		],
		charSpace: 1.2
	});
	centerText(website.toUpperCase(), 128, {
		size: 10,
		style: "bold",
		color: C.gold,
		charSpace: 1.6
	});
	const digits = phone.replace(/\D/g, "");
	const waUrl = `https://wa.me/${digits.startsWith("55") ? digits : `55${digits}`}?text=${encodeURIComponent("Olá! Vi o catálogo da Atacado Prime e gostaria de fazer um pedido.")}`;
	try {
		const qrDataUrl = await import_lib.toDataURL(waUrl, {
			errorCorrectionLevel: "M",
			margin: 1,
			scale: 8,
			color: {
				dark: "#0b1220",
				light: "#ffffff"
			}
		});
		const qrSize = 34;
		const qrX = (pageW - qrSize) / 2;
		const qrY = 138;
		set(doc, "fill", C.white);
		doc.roundedRect(qrX - 4, qrY - 4, 42, 42, 2, 2, "F");
		set(doc, "draw", C.gold);
		doc.setLineWidth(.4);
		doc.roundedRect(qrX - 4, qrY - 4, 42, 42, 2, 2);
		doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
		doc.link(qrX - 4, qrY - 4, 42, 42, { url: waUrl });
		centerText("APONTE A CÂMERA", 181, {
			size: 8,
			style: "bold",
			color: C.gold,
			charSpace: 2
		});
		doc.setFont("helvetica", "normal");
		doc.setFontSize(7.5);
		set(doc, "text", [
			200,
			194,
			178
		]);
		doc.text("Atendimento imediato pelo WhatsApp", bcx, 186, { align: "center" });
	} catch (_unused4) {}
	const brandY = safeBottom - 26;
	set(doc, "fill", C.gold);
	doc.rect(bcx - 10, brandY - 6, 20, .5, "F");
	doc.setFont("helvetica", "bold");
	doc.setFontSize(15);
	set(doc, "text", C.white);
	doc.text(brandName, bcx, brandY, { align: "center" });
	doc.setFont("helvetica", "normal");
	doc.setFontSize(8);
	set(doc, "text", [
		200,
		194,
		178
	]);
	doc.text("Peças e acessórios automotivos · atacado especializado", bcx, brandY + 5, { align: "center" });
	hairline(bcx - 60, safeBottom - 8, bcx + 60, safeBottom - 8, [
		110,
		92,
		52
	]);
	centerText(`© ${year} ${brandName.toUpperCase()} · TODOS OS DIREITOS RESERVADOS`, safeBottom - 3, {
		size: 7,
		color: [
			160,
			154,
			138
		],
		charSpace: 1.4
	});
	doc.save(`catalogo-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.pdf`);
}
function AdminCatalog() {
	var _stats$total, _stats$ativos, _stats$baixo, _stats$sem, _stats$marcas, _stats$cats;
	const { data: stats } = useCatalogStats();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Produtos",
		eyebrow: "Estoque",
		description: "Gerencie produtos, marcas e categorias.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Total",
					value: (_stats$total = stats === null || stats === void 0 ? void 0 : stats.total) !== null && _stats$total !== void 0 ? _stats$total : 0,
					icon: Package,
					tone: "blue"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Ativos",
					value: (_stats$ativos = stats === null || stats === void 0 ? void 0 : stats.ativos) !== null && _stats$ativos !== void 0 ? _stats$ativos : 0,
					icon: Package,
					tone: "green"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Baixo estoque",
					value: (_stats$baixo = stats === null || stats === void 0 ? void 0 : stats.baixo) !== null && _stats$baixo !== void 0 ? _stats$baixo : 0,
					icon: TriangleAlert,
					tone: "orange"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Sem estoque",
					value: (_stats$sem = stats === null || stats === void 0 ? void 0 : stats.sem) !== null && _stats$sem !== void 0 ? _stats$sem : 0,
					icon: CircleX,
					tone: "red"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Marcas",
					value: (_stats$marcas = stats === null || stats === void 0 ? void 0 : stats.marcas) !== null && _stats$marcas !== void 0 ? _stats$marcas : 0,
					icon: Tag,
					tone: "purple"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
					label: "Categorias",
					value: (_stats$cats = stats === null || stats === void 0 ? void 0 : stats.cats) !== null && _stats$cats !== void 0 ? _stats$cats : 0,
					icon: FolderTree,
					tone: "indigo"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "produtos",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "produtos",
						children: "Produtos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "marcas",
						children: "Marcas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "categorias",
						children: "Categorias"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
						value: "parcelamento",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Percent, { className: "w-3.5 h-3.5 mr-1" }), "Parcelamento"]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "produtos",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductsTab, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "marcas",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandsTab, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "categorias",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoriesTab, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "parcelamento",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallmentsTab, {})
				})
			]
		})]
	});
}
function ProductsTab() {
	const { data: products = [], isLoading } = useAllProductsAdmin();
	const [pdfLoading, setPdfLoading] = (0, import_react.useState)(false);
	const { data: brands = [] } = useBrands();
	const { data: cats = [] } = useCategories();
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [creating, setCreating] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [sortKey, setSortKey] = (0, import_react.useState)("nome");
	const [sortDir, setSortDir] = (0, import_react.useState)("asc");
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("products").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["products-admin"] });
			qc.invalidateQueries({ queryKey: ["catalog-stats"] });
			toast.success("Produto removido");
		},
		onError: (e) => toast.error(e.message)
	});
	const norm = (s) => String(s !== null && s !== void 0 ? s : "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/-/g, "");
	const filteredSorted = (0, import_react.useMemo)(() => {
		const q = norm(query.trim());
		const base = q ? products.filter((p) => {
			var _p$brands, _p$categories;
			return [
				p.nome,
				p.sku,
				p.codigo_fabricante,
				p.modelo,
				(_p$brands = p.brands) === null || _p$brands === void 0 ? void 0 : _p$brands.nome,
				(_p$categories = p.categories) === null || _p$categories === void 0 ? void 0 : _p$categories.nome
			].map(norm).join(" ").includes(q);
		}) : products;
		const getVal = (p) => {
			switch (sortKey) {
				case "sku": {
					var _p$sku;
					const n = Number(String((_p$sku = p.sku) !== null && _p$sku !== void 0 ? _p$sku : "").replace(/\D/g, ""));
					return Number.isFinite(n) ? n : 0;
				}
				case "marca":
					var _p$brands2;
					return norm((_p$brands2 = p.brands) === null || _p$brands2 === void 0 ? void 0 : _p$brands2.nome);
				case "preco_custo":
					var _p$preco_custo;
					return Number((_p$preco_custo = p.preco_custo) !== null && _p$preco_custo !== void 0 ? _p$preco_custo : 0);
				case "preco_unitario":
					var _p$preco_unitario;
					return Number((_p$preco_unitario = p.preco_unitario) !== null && _p$preco_unitario !== void 0 ? _p$preco_unitario : 0);
				case "preco_pacote":
					var _p$preco_pacote;
					return Number((_p$preco_pacote = p.preco_pacote) !== null && _p$preco_pacote !== void 0 ? _p$preco_pacote : 0);
				case "estoque":
					var _p$estoque;
					return Number((_p$estoque = p.estoque) !== null && _p$estoque !== void 0 ? _p$estoque : 0);
				default: return norm(p.nome);
			}
		};
		return [...base].sort((a, b) => {
			const va = getVal(a);
			const vb = getVal(b);
			if (va < vb) return sortDir === "asc" ? -1 : 1;
			if (va > vb) return sortDir === "asc" ? 1 : -1;
			return 0;
		});
	}, [
		products,
		query,
		sortKey,
		sortDir
	]);
	const toggleSort = (k) => {
		if (sortKey === k) setSortDir(sortDir === "asc" ? "desc" : "asc");
		else {
			setSortKey(k);
			setSortDir("asc");
		}
	};
	const SortIcon = ({ k }) => {
		if (sortKey !== k) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "w-3 h-3 inline ml-1 opacity-40" });
		return sortDir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "w-3 h-3 inline ml-1 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "w-3 h-3 inline ml-1 text-primary" });
	};
	const Th = ({ k, label, align = "left" }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("th", {
		className: `px-4 py-2 ${align === "right" ? "text-right" : "text-left"} cursor-pointer select-none hover:text-foreground`,
		onClick: () => toggleSort(k),
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, { k })]
	});
	if (editing || creating) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductForm, {
		id: editing,
		brands,
		cats,
		onClose: () => {
			setEditing(null);
			setCreating(false);
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative w-full sm:max-w-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Buscar nome, SKU, código, marca…",
					className: "pl-9"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [query ? `${filteredSorted.length} de ${products.length}` : `${products.length}`, " produto(s)"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						variant: "outline",
						disabled: pdfLoading,
						onClick: async () => {
							setPdfLoading(true);
							try {
								await generateCatalogPdf(filteredSorted.map((p) => {
									var _p$product_images, _ref, _imgs$find$image_url, _imgs$find, _imgs$, _p$categories$nome, _p$categories2, _p$brands$nome, _p$brands3, _ref2, _p$descricao_curta, _p$quantidade_pacote;
									const imgs = (_p$product_images = p.product_images) !== null && _p$product_images !== void 0 ? _p$product_images : [];
									const imagem = (_ref = (_imgs$find$image_url = (_imgs$find = imgs.find((i) => i.tipo_imagem === "principal")) === null || _imgs$find === void 0 ? void 0 : _imgs$find.image_url) !== null && _imgs$find$image_url !== void 0 ? _imgs$find$image_url : (_imgs$ = imgs[0]) === null || _imgs$ === void 0 ? void 0 : _imgs$.image_url) !== null && _ref !== void 0 ? _ref : null;
									return {
										nome: p.nome,
										sku: p.sku,
										tipo: p.tipo,
										categoria: (_p$categories$nome = (_p$categories2 = p.categories) === null || _p$categories2 === void 0 ? void 0 : _p$categories2.nome) !== null && _p$categories$nome !== void 0 ? _p$categories$nome : null,
										marca: (_p$brands$nome = (_p$brands3 = p.brands) === null || _p$brands3 === void 0 ? void 0 : _p$brands3.nome) !== null && _p$brands$nome !== void 0 ? _p$brands$nome : null,
										descricao_curta: (_ref2 = (_p$descricao_curta = p.descricao_curta) !== null && _p$descricao_curta !== void 0 ? _p$descricao_curta : p.descricao_completa) !== null && _ref2 !== void 0 ? _ref2 : null,
										preco_unitario: p.preco_unitario,
										preco_pacote: p.preco_pacote,
										quantidade_pacote: (_p$quantidade_pacote = p.quantidade_pacote) !== null && _p$quantidade_pacote !== void 0 ? _p$quantidade_pacote : null,
										imagem
									};
								}), { brandName: "Atacado Prime" });
							} catch (_unused) {
								toast.error("Não foi possível gerar o catálogo em PDF.");
							} finally {
								setPdfLoading(false);
							}
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "w-4 h-4 mr-1" }),
							" ",
							pdfLoading ? "Gerando…" : "Catálogo PDF (com fotos)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setCreating(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 mr-1" }), " Novo produto"]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-card border border-border rounded-xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2 w-14" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							k: "nome",
							label: "Nome"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							k: "sku",
							label: "SKU"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							k: "marca",
							label: "Marca"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							k: "preco_custo",
							label: "Preço custo",
							align: "right"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							k: "preco_unitario",
							label: "Preço venda",
							align: "right"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							k: "preco_pacote",
							label: "Preço pacote",
							align: "right"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Th, {
							k: "estoque",
							label: "Estoque",
							align: "right"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
					isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 9,
						className: "px-4 py-4 text-muted-foreground",
						children: "Carregando…"
					}) }),
					!isLoading && filteredSorted.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 9,
						className: "px-4 py-4 text-muted-foreground",
						children: query ? "Nenhum produto encontrado para a busca." : "Nenhum produto."
					}) }),
					filteredSorted.map((p) => {
						var _p$product_images2, _imgs$find$image_url2, _imgs$find2, _imgs$2, _p$brands$nome2, _p$brands4;
						const imgs = (_p$product_images2 = p.product_images) !== null && _p$product_images2 !== void 0 ? _p$product_images2 : [];
						const thumb = (_imgs$find$image_url2 = (_imgs$find2 = imgs.find((i) => i.tipo_imagem === "principal")) === null || _imgs$find2 === void 0 ? void 0 : _imgs$find2.image_url) !== null && _imgs$find$image_url2 !== void 0 ? _imgs$find$image_url2 : (_imgs$2 = imgs[0]) === null || _imgs$2 === void 0 ? void 0 : _imgs$2.image_url;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-2 py-2",
									children: thumb ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: thumb,
										alt: p.nome,
										className: "w-10 h-10 rounded object-cover border border-border"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded border border-dashed border-destructive/50 bg-destructive/5 grid place-items-center",
										title: "Sem foto",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "w-4 h-4 text-destructive/70" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 font-medium",
									children: p.nome
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 text-muted-foreground",
									children: p.sku
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2",
									children: (_p$brands$nome2 = (_p$brands4 = p.brands) === null || _p$brands4 === void 0 ? void 0 : _p$brands4.nome) !== null && _p$brands$nome2 !== void 0 ? _p$brands$nome2 : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 text-right text-muted-foreground",
									children: p.preco_custo ? brl(p.preco_custo) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 text-right",
									children: brl(p.preco_unitario)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 text-right",
									children: p.preco_pacote ? brl(p.preco_pacote) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 text-right",
									children: p.estoque
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-2 text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => setEditing(p.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-3.5 h-3.5" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										onClick: () => {
											if (confirm(`Remover ${p.nome}?`)) del.mutate(p.id);
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
									})]
								})
							]
						}, p.id);
					})
				] })]
			})
		})]
	});
}
function ProductForm({ id, brands, cats, onClose }) {
	var _form$sku2;
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		nome: "",
		sku: "",
		codigo_fabricante: "",
		modelo: "",
		categoria_id: "",
		marca_id: "",
		tipo: "",
		descricao_curta: "",
		descricao_completa: "",
		frequencia: "",
		quantidade_botoes: 0,
		estoque: 0,
		estoque_minimo: 0,
		localizacao: "",
		preco_custo: 0,
		preco_unitario: 0,
		quantidade_pacote: 1,
		preco_pacote: 0,
		status: true
	});
	const [loaded, setLoaded] = (0, import_react.useState)(!id);
	const [compats, setCompats] = (0, import_react.useState)([]);
	const [novaCompat, setNovaCompat] = (0, import_react.useState)("");
	const [imgFile, setImgFile] = (0, import_react.useState)(null);
	const [existingImages, setExistingImages] = (0, import_react.useState)([]);
	const [margemInput, setMargemInput] = (0, import_react.useState)("");
	const [editingMargem, setEditingMargem] = (0, import_react.useState)(false);
	const margemCalculada = form.preco_custo > 0 && form.preco_unitario > 0 ? ((form.preco_unitario - form.preco_custo) / form.preco_custo * 100).toFixed(2).replace(".", ",") : "";
	(0, import_react.useEffect)(() => {
		if (!id) return;
		(async () => {
			const { data } = await supabase.from("products").select("*, compatibilities(*), product_images(*)").eq("id", id).maybeSingle();
			if (data) {
				var _data$codigo_fabrican, _data$modelo, _data$categoria_id, _data$marca_id, _data$tipo, _data$descricao_curta, _data$descricao_compl, _data$frequencia, _data$quantidade_boto, _data$localizacao, _data$preco_custo, _data$preco_pacote, _data$compatibilities, _data$product_images;
				setForm({
					nome: data.nome,
					sku: data.sku,
					codigo_fabricante: (_data$codigo_fabrican = data.codigo_fabricante) !== null && _data$codigo_fabrican !== void 0 ? _data$codigo_fabrican : "",
					modelo: (_data$modelo = data.modelo) !== null && _data$modelo !== void 0 ? _data$modelo : "",
					categoria_id: (_data$categoria_id = data.categoria_id) !== null && _data$categoria_id !== void 0 ? _data$categoria_id : "",
					marca_id: (_data$marca_id = data.marca_id) !== null && _data$marca_id !== void 0 ? _data$marca_id : "",
					tipo: (_data$tipo = data.tipo) !== null && _data$tipo !== void 0 ? _data$tipo : "",
					descricao_curta: (_data$descricao_curta = data.descricao_curta) !== null && _data$descricao_curta !== void 0 ? _data$descricao_curta : "",
					descricao_completa: (_data$descricao_compl = data.descricao_completa) !== null && _data$descricao_compl !== void 0 ? _data$descricao_compl : "",
					frequencia: (_data$frequencia = data.frequencia) !== null && _data$frequencia !== void 0 ? _data$frequencia : "",
					quantidade_botoes: (_data$quantidade_boto = data.quantidade_botoes) !== null && _data$quantidade_boto !== void 0 ? _data$quantidade_boto : 0,
					estoque: data.estoque,
					estoque_minimo: data.estoque_minimo,
					localizacao: (_data$localizacao = data.localizacao) !== null && _data$localizacao !== void 0 ? _data$localizacao : "",
					preco_custo: Number((_data$preco_custo = data.preco_custo) !== null && _data$preco_custo !== void 0 ? _data$preco_custo : 0),
					preco_unitario: Number(data.preco_unitario),
					quantidade_pacote: data.quantidade_pacote,
					preco_pacote: Number((_data$preco_pacote = data.preco_pacote) !== null && _data$preco_pacote !== void 0 ? _data$preco_pacote : 0),
					status: data.status
				});
				setCompats(((_data$compatibilities = data.compatibilities) !== null && _data$compatibilities !== void 0 ? _data$compatibilities : []).map((c) => c.descricao));
				setExistingImages((_data$product_images = data.product_images) !== null && _data$product_images !== void 0 ? _data$product_images : []);
			}
			setLoaded(true);
		})();
	}, [id]);
	const save = useMutation({
		mutationFn: async () => {
			var _form$sku;
			const payload = _objectSpread2(_objectSpread2({}, form), {}, {
				sku: ((_form$sku = form.sku) === null || _form$sku === void 0 ? void 0 : _form$sku.trim()) ? form.sku.trim() : null,
				categoria_id: form.categoria_id || null,
				marca_id: form.marca_id || null,
				tipo: form.tipo || null,
				preco_custo: form.preco_custo || null,
				preco_pacote: form.preco_pacote || null
			});
			let pid = id;
			if (id) {
				const { error } = await supabase.from("products").update(payload).eq("id", id);
				if (error) throw error;
			} else {
				const { data, error } = await supabase.from("products").insert(payload).select("id").single();
				if (error) throw error;
				pid = data.id;
			}
			await supabase.from("compatibilities").delete().eq("product_id", pid);
			if (compats.length > 0) await supabase.from("compatibilities").insert(compats.map((d) => ({
				product_id: pid,
				descricao: d
			})));
			if (imgFile && pid) {
				const path = `${pid}/${Date.now()}-${imgFile.name}`;
				const { error: upErr } = await supabase.storage.from("product-images").upload(path, imgFile, { upsert: false });
				if (upErr) throw upErr;
				const { data: signed } = await supabase.storage.from("product-images").createSignedUrl(path, 3600 * 24 * 365 * 5);
				const url = signed === null || signed === void 0 ? void 0 : signed.signedUrl;
				if (url) await supabase.from("product_images").insert({
					product_id: pid,
					image_url: url,
					tipo_imagem: existingImages.length === 0 ? "principal" : "secundaria",
					ordem: existingImages.length
				});
			}
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["products-admin"] });
			qc.invalidateQueries({ queryKey: ["products"] });
			qc.invalidateQueries({ queryKey: ["catalog-stats"] });
			toast.success("Produto salvo");
			onClose();
		},
		onError: (e) => toast.error(e.message)
	});
	if (!loaded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Carregando…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: (e) => {
			e.preventDefault();
			save.mutate();
		},
		className: "space-y-5 bg-card border border-border rounded-xl p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-semibold text-lg",
					children: id ? "Editar produto" : "Novo produto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: onClose,
					children: "Cancelar"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nome",
						required: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.nome,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { nome: e.target.value })),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "SKU (auto se vazio)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: (_form$sku2 = form.sku) !== null && _form$sku2 !== void 0 ? _form$sku2 : "",
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { sku: e.target.value })),
							placeholder: "Gerado automaticamente"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Código Fabricante",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.codigo_fabricante,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { codigo_fabricante: e.target.value }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Modelo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.modelo,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { modelo: e.target.value }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Categoria",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-9 px-2 rounded-md border border-border bg-background text-sm w-full",
							value: form.categoria_id,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { categoria_id: e.target.value })),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "—"
							}), cats.filter((c) => !c.parent_id).flatMap((parent) => {
								const subs = cats.filter((c) => c.parent_id === parent.id);
								return [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: parent.id,
									children: parent.nome
								}, parent.id), ...subs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s.id,
									children: `\u00A0\u00A0\u00A0\u00A0${parent.nome} › ${s.nome}`
								}, s.id))];
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Marca",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-9 px-2 rounded-md border border-border bg-background text-sm w-full",
							value: form.marca_id,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { marca_id: e.target.value })),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "—"
							}), brands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: b.id,
								children: b.nome
							}, b.id))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tipo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-9 px-2 rounded-md border border-border bg-background text-sm w-full",
							value: form.tipo,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { tipo: e.target.value })),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "—"
							}), [
								"controle",
								"carcaca",
								"alarme",
								"modulo",
								"transponder",
								"lamina",
								"bateria",
								"acessorio"
							].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: t,
								children: t
							}, t))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Frequência",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.frequencia,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { frequencia: e.target.value })),
							placeholder: "433MHz"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Qtd Botões",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: form.quantidade_botoes,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { quantidade_botoes: Number(e.target.value) }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Localização",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.localizacao,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { localizacao: e.target.value })),
							placeholder: "Prateleira A3"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Estoque",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: form.estoque,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { estoque: Number(e.target.value) }))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Estoque mínimo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: form.estoque_minimo,
							onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { estoque_minimo: Number(e.target.value) }))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border border-border bg-muted/30 p-4 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider text-muted-foreground font-medium",
						children: "Precificação"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preço de custo (compra)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: "0.01",
									value: form.preco_custo,
									onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { preco_custo: Number(e.target.value) }))
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Margem de lucro (%)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "text",
									inputMode: "decimal",
									value: editingMargem ? margemInput : margemCalculada,
									onFocus: () => {
										setEditingMargem(true);
										setMargemInput(margemCalculada);
									},
									onChange: (e) => {
										const raw = e.target.value.replace(/%/g, "");
										setMargemInput(raw);
										const num = Number(raw.replace(",", "."));
										if (raw.trim() === "" || Number.isNaN(num)) return;
										if (form.preco_custo > 0) {
											const venda = form.preco_custo * (1 + num / 100);
											setForm((f) => _objectSpread2(_objectSpread2({}, f), {}, { preco_unitario: Number(venda.toFixed(2)) }));
										}
									},
									onBlur: () => {
										setEditingMargem(false);
										setMargemInput("");
									},
									disabled: form.preco_custo <= 0,
									placeholder: form.preco_custo <= 0 ? "Informe o custo" : "Ex.: 70"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preço de venda (unitário)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: "0.01",
									value: form.preco_unitario,
									onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { preco_unitario: Number(e.target.value) }))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-3 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Qtd no pacote",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									value: form.quantidade_pacote,
									onChange: (e) => {
										const qtd = Number(e.target.value);
										const bruto = form.preco_unitario * qtd;
										const desc = bruto > 0 && form.preco_pacote > 0 ? (1 - form.preco_pacote / bruto) * 100 : 0;
										setForm(_objectSpread2(_objectSpread2({}, form), {}, {
											quantidade_pacote: qtd,
											preco_pacote: bruto * (1 - desc / 100)
										}));
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Desconto no pacote (%)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: "0.01",
									value: form.preco_unitario > 0 && form.quantidade_pacote > 0 && form.preco_pacote > 0 ? Number(((form.preco_unitario * form.quantidade_pacote - form.preco_pacote) / (form.preco_unitario * form.quantidade_pacote) * 100).toFixed(2)) : 0,
									onChange: (e) => {
										const desc = Number(e.target.value);
										const bruto = form.preco_unitario * form.quantidade_pacote;
										setForm(_objectSpread2(_objectSpread2({}, form), {}, { preco_pacote: Number((bruto * (1 - desc / 100)).toFixed(2)) }));
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Preço do pacote",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "number",
									step: "0.01",
									value: form.preco_pacote,
									onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { preco_pacote: Number(e.target.value) }))
								})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Descrição curta",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: form.descricao_curta,
					onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { descricao_curta: e.target.value }))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Descrição completa",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					className: "min-h-24 w-full rounded-md border border-border bg-background p-2 text-sm",
					value: form.descricao_completa,
					onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { descricao_completa: e.target.value }))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Compatibilidades" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: novaCompat,
						onChange: (e) => setNovaCompat(e.target.value),
						placeholder: "Ex.: Positron PX80"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => {
							if (novaCompat.trim()) {
								setCompats([...compats, novaCompat.trim()]);
								setNovaCompat("");
							}
						},
						children: "Add"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5 mt-2",
					children: compats.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs px-2 py-1 rounded-md bg-muted border border-border inline-flex items-center gap-1",
						children: [c, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCompats(compats.filter((_, j) => j !== i)),
							children: "×"
						})]
					}, i))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Adicionar imagem" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "file",
					accept: "image/*",
					onChange: (e) => {
						var _e$target$files$, _e$target$files;
						return setImgFile((_e$target$files$ = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0]) !== null && _e$target$files$ !== void 0 ? _e$target$files$ : null);
					},
					className: "mt-1"
				}),
				existingImages.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-6 gap-2 mt-3",
					children: existingImages.map((img) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative group aspect-square bg-muted rounded-md overflow-hidden border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: img.image_url,
							alt: img.tipo_imagem,
							className: "w-full h-full object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: async () => {
								if (!confirm("Excluir esta imagem?")) return;
								const { error } = await supabase.from("product_images").delete().eq("id", img.id);
								if (error) {
									toast.error("Erro ao excluir imagem");
									return;
								}
								try {
									const u = new URL(img.image_url);
									const idx = u.pathname.indexOf("/product-images/");
									if (idx >= 0) {
										const key = decodeURIComponent(u.pathname.slice(idx + 16).split("?")[0]);
										await supabase.storage.from("product-images").remove([key]);
									}
								} catch (_unused2) {}
								setExistingImages((prev) => prev.filter((x) => x.id !== img.id));
								toast.success("Imagem excluída");
							},
							className: "absolute top-1 right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground text-xs grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity shadow",
							"aria-label": "Excluir imagem",
							children: "×"
						})]
					}, img.id))
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: form.status,
					onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { status: e.target.checked }))
				}), " Ativo"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: onClose,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: save.isPending,
					children: save.isPending ? "Salvando…" : "Salvar"
				})]
			})
		]
	});
}
function Field({ label, required, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-destructive ml-0.5",
			children: "*"
		})] }), children]
	});
}
function BrandsTab() {
	const { data: brands = [], isLoading } = useBrands();
	const qc = useQueryClient();
	const [nome, setNome] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: async () => {
			const { error } = await supabase.from("brands").insert({ nome: nome.trim() });
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["brands"] });
			setNome("");
			toast.success("Marca criada");
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("brands").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["brands"] });
			toast.success("Removida");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				if (nome.trim()) add.mutate();
			},
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: nome,
				onChange: (e) => setNome(e.target.value),
				placeholder: "Nova marca"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Carregando…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-2",
			children: brands.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card border border-border rounded-lg p-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-medium text-sm",
					children: b.nome
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => {
						if (confirm(`Remover ${b.nome}?`)) del.mutate(b.id);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
				})]
			}, b.id))
		})]
	});
}
function slugify(s) {
	return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
async function uniqueCategorySlug(nome, ignoreId) {
	const base = slugify(nome) || "categoria";
	let q = supabase.from("categories").select("slug").like("slug", `${base}%`);
	if (ignoreId) q = q.neq("id", ignoreId);
	const { data } = await q;
	const taken = new Set((data !== null && data !== void 0 ? data : []).map((r) => r.slug));
	if (!taken.has(base)) return base;
	let i = 2;
	while (taken.has(`${base}-${i}`)) i++;
	return `${base}-${i}`;
}
function CategoriesTab() {
	const { data: cats = [], isLoading } = useCategories();
	const qc = useQueryClient();
	const [nome, setNome] = (0, import_react.useState)("");
	const [parent, setParent] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: async () => {
			const slug = await uniqueCategorySlug(nome);
			const { error } = await supabase.from("categories").insert({
				nome: nome.trim(),
				slug,
				parent_id: parent || null
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["categories"] });
			setNome("");
			setParent("");
			toast.success("Categoria criada");
		},
		onError: (e) => toast.error(e.message)
	});
	const del = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("categories").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Removida");
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				if (nome.trim()) add.mutate();
			},
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: nome,
					onChange: (e) => setNome(e.target.value),
					placeholder: "Nova categoria",
					className: "flex-1 min-w-48"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					className: "h-9 px-2 rounded-md border border-border bg-background text-sm",
					value: parent,
					onChange: (e) => setParent(e.target.value),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: "",
						children: "Sem categoria pai"
					}), cats.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: c.id,
						children: c.nome
					}, c.id))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4" })
				})
			]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Carregando…"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-card border border-border rounded-xl overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-4 py-2 w-1/3",
							children: "Menu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-left px-4 py-2",
							children: "Submenu"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2 w-32" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [cats.filter((c) => !c.parent_id).flatMap((parent) => {
					const subs = cats.filter((c) => c.parent_id === parent.id);
					return [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border bg-muted/20",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2 font-semibold",
								children: parent.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2 text-muted-foreground italic",
								children: "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryRowActions, {
									cat: parent,
									allCats: cats,
									onDelete: () => {
										if (confirm(`Remover ${parent.nome}?`)) del.mutate(parent.id);
									}
								})
							})
						]
					}, parent.id), ...subs.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-4 py-2 text-muted-foreground pl-8",
								children: ["↳ ", parent.nome]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: s.nome
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-4 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryRowActions, {
									cat: s,
									allCats: cats,
									onDelete: () => {
										if (confirm(`Remover ${s.nome}?`)) del.mutate(s.id);
									}
								})
							})
						]
					}, s.id))];
				}), cats.filter((c) => c.parent_id && !cats.some((p) => p.id === c.parent_id)).map((orphan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2 text-muted-foreground italic",
							children: "(órfã)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2",
							children: orphan.nome
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "px-4 py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryRowActions, {
								cat: orphan,
								allCats: cats,
								onDelete: () => {
									if (confirm(`Remover ${orphan.nome}?`)) del.mutate(orphan.id);
								}
							})
						})
					]
				}, orphan.id))] })]
			})
		})]
	});
}
function CategoryRowActions({ cat, allCats, onDelete }) {
	var _cat$parent_id;
	const qc = useQueryClient();
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [nome, setNome] = (0, import_react.useState)(cat.nome);
	const [parentId, setParentId] = (0, import_react.useState)((_cat$parent_id = cat.parent_id) !== null && _cat$parent_id !== void 0 ? _cat$parent_id : "");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function saveEdit() {
		if (!nome.trim()) {
			toast.error("Nome obrigatório");
			return;
		}
		setSaving(true);
		const slug = await uniqueCategorySlug(nome, cat.id);
		const { error } = await supabase.from("categories").update({
			nome: nome.trim(),
			slug,
			parent_id: parentId || null
		}).eq("id", cat.id);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		qc.invalidateQueries({ queryKey: ["categories"] });
		setEditing(false);
		toast.success("Atualizada");
	}
	async function handleFile(e) {
		var _e$target$files2;
		const file = (_e$target$files2 = e.target.files) === null || _e$target$files2 === void 0 ? void 0 : _e$target$files2[0];
		if (!file) return;
		setUploading(true);
		try {
			var _file$name$split$pop;
			const ext = ((_file$name$split$pop = file.name.split(".").pop()) === null || _file$name$split$pop === void 0 ? void 0 : _file$name$split$pop.toLowerCase()) || "jpg";
			const path = `${cat.id}/${Date.now()}.${ext}`;
			const { error: upErr } = await supabase.storage.from("category-images").upload(path, file, {
				upsert: true,
				contentType: file.type
			});
			if (upErr) throw upErr;
			const { data: signed, error: signErr } = await supabase.storage.from("category-images").createSignedUrl(path, 3600 * 24 * 365 * 10);
			if (signErr) throw signErr;
			const { error: dbErr } = await supabase.from("categories").update({ image_url: signed.signedUrl }).eq("id", cat.id);
			if (dbErr) throw dbErr;
			qc.invalidateQueries({ queryKey: ["categories"] });
			toast.success("Imagem atualizada");
		} catch (err) {
			toast.error(err.message);
		} finally {
			setUploading(false);
			e.target.value = "";
		}
	}
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value: nome,
				onChange: (e) => setNome(e.target.value),
				className: "h-7 text-xs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				className: "h-7 px-2 rounded-md border border-border bg-background text-xs",
				value: parentId,
				onChange: (e) => setParentId(e.target.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "Sem pai"
				}), allCats.filter((o) => o.id !== cat.id).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: o.id,
					children: o.nome
				}, o.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "h-6 text-[11px] px-2",
					onClick: saveEdit,
					disabled: saving,
					children: saving ? "…" : "OK"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-6 text-[11px] px-2",
					onClick: () => {
						var _cat$parent_id2;
						setEditing(false);
						setNome(cat.nome);
						setParentId((_cat$parent_id2 = cat.parent_id) !== null && _cat$parent_id2 !== void 0 ? _cat$parent_id2 : "");
					},
					children: "X"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1 justify-end",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setEditing(true),
				className: "text-[11px] text-primary hover:underline px-1",
				children: "Editar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "text-[11px] text-primary hover:underline cursor-pointer px-1",
				children: [uploading ? "…" : cat.image_url ? "Trocar" : "Foto", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: handleFile,
					disabled: uploading
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "icon",
				className: "h-7 w-7",
				onClick: onDelete,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-3.5 h-3.5 text-destructive" })
			})
		]
	});
}
function InstallmentsTab() {
	const { data: plans = [], isLoading } = useInstallmentPlans();
	const qc = useQueryClient();
	const [edits, setEdits] = (0, import_react.useState)({});
	const save = useMutation({
		mutationFn: async (row) => {
			const { error } = await supabase.from("installment_plans").update({
				multiplicador: row.multiplicador,
				ativo: row.ativo
			}).eq("id", row.id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["installment-plans"] });
			toast.success("Atualizado");
		},
		onError: (e) => toast.error(e.message)
	});
	const upsertN = useMutation({
		mutationFn: async (parcelas) => {
			const { error } = await supabase.from("installment_plans").insert({
				parcelas,
				multiplicador: 1
			});
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["installment-plans"] });
			toast.success("Plano criado");
		},
		onError: (e) => toast.error(e.message)
	});
	const missing = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12
	].filter((n) => !plans.some((p) => p.parcelas === n));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: [
					"Configure o multiplicador aplicado ao preço para cada quantidade de parcelas. Ex.: 1.05 = +5%. O cliente vê ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\"Nx de R$ Y\"" }),
					" na vitrine."
				]
			}),
			missing.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-muted-foreground",
					children: "Adicionar:"
				}), missing.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "outline",
					onClick: () => upsertN.mutate(n),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-3 h-3 mr-1" }),
						n,
						"x"
					]
				}, n))]
			}),
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Carregando…"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-card border border-border rounded-xl overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-2",
								children: "Parcelas"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-2",
								children: "Multiplicador"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "text-left px-4 py-2",
								children: "Ativo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "px-4 py-2" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: plans.map((p) => {
						var _edits$p$id;
						const e = (_edits$p$id = edits[p.id]) !== null && _edits$p$id !== void 0 ? _edits$p$id : {
							multiplicador: Number(p.multiplicador),
							ativo: p.ativo
						};
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-2 font-semibold",
									children: [p.parcelas, "x"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										step: "0.0001",
										value: e.multiplicador,
										onChange: (ev) => setEdits(_objectSpread2(_objectSpread2({}, edits), {}, { [p.id]: _objectSpread2(_objectSpread2({}, e), {}, { multiplicador: Number(ev.target.value) }) })),
										className: "h-8 w-32"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										checked: e.ativo,
										onChange: (ev) => setEdits(_objectSpread2(_objectSpread2({}, edits), {}, { [p.id]: _objectSpread2(_objectSpread2({}, e), {}, { ativo: ev.target.checked }) }))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-2 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => save.mutate(_objectSpread2({ id: p.id }, e)),
										children: "Salvar"
									})
								})
							]
						}, p.id);
					}) })]
				})
			})
		]
	});
}
//#endregion
export { AdminCatalog as component };
