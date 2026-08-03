import { o as __toESM } from "../_runtime.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { m as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jspdf_node_min } from "../_libs/jspdf.mjs";
import { t as autoTable } from "../_libs/jspdf-autotable.mjs";
import { createHmac, timingSafeEqual } from "crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/format-Day7oGN4.js
var brl = (n) => (n !== null && n !== void 0 ? n : 0).toLocaleString("pt-BR", {
	style: "currency",
	currency: "BRL"
});
var parseDate = (d) => {
	if (d instanceof Date) return d;
	const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(d);
	if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
	return new Date(d);
};
var formatDate = (d) => d ? parseDate(d).toLocaleDateString("pt-BR") : "—";
var formatDateTime = (d) => d ? parseDate(d).toLocaleString("pt-BR") : "—";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/pdf-CsVsL9dt.js
var import_jspdf_node_min = /* @__PURE__ */ __toESM(require_jspdf_node_min());
function buildOrderPdf(o) {
	var _o$brandName, _o$company, _ref, _c$legal_name, _o$address$street, _o$address$district, _o$address$city, _o$address$state, _o$address$zip, _o$desconto;
	const doc = new import_jspdf_node_min.default({
		unit: "mm",
		format: "a4"
	});
	const pageW = doc.internal.pageSize.getWidth();
	const margin = 14;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(20);
	doc.setTextColor(20, 20, 20);
	doc.text((_o$brandName = o.brandName) !== null && _o$brandName !== void 0 ? _o$brandName : "Atacado Prime", margin, 18);
	if (o.brandTagline) {
		doc.setFont("helvetica", "normal");
		doc.setFontSize(9);
		doc.setTextColor(120);
		doc.text(o.brandTagline, margin, 23);
	}
	doc.setFont("helvetica", "bold");
	doc.setFontSize(13);
	doc.setTextColor(20);
	doc.text("RESUMO DO PEDIDO", pageW - margin, 18, { align: "right" });
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9);
	doc.setTextColor(90);
	doc.text(`Nº #${o.id.slice(0, 8).toUpperCase()}`, pageW - margin, 23, { align: "right" });
	doc.text(`Data: ${new Date(o.created_at).toLocaleString("pt-BR")}`, pageW - margin, 28, { align: "right" });
	doc.setDrawColor(220);
	doc.line(margin, 32, pageW - margin, 32);
	let y = 40;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(10);
	doc.setTextColor(20);
	doc.text("DADOS DO CLIENTE", margin, y);
	y += 5;
	doc.setFont("helvetica", "normal");
	doc.setFontSize(9);
	doc.setTextColor(60);
	const c = (_o$company = o.company) !== null && _o$company !== void 0 ? _o$company : {};
	const lines = [
		`Nome: ${(_ref = (_c$legal_name = c.legal_name) !== null && _c$legal_name !== void 0 ? _c$legal_name : c.trade_name) !== null && _ref !== void 0 ? _ref : "—"}`,
		c.tax_id ? `CNPJ: ${c.tax_id}` : null,
		c.phone ? `Telefone: ${c.phone}` : null,
		c.email ? `Email: ${c.email}` : null,
		o.address ? `Endereço: ${(_o$address$street = o.address.street) !== null && _o$address$street !== void 0 ? _o$address$street : ""}${o.address.number ? ", " + o.address.number : ""} — ${(_o$address$district = o.address.district) !== null && _o$address$district !== void 0 ? _o$address$district : ""}, ${(_o$address$city = o.address.city) !== null && _o$address$city !== void 0 ? _o$address$city : ""}/${(_o$address$state = o.address.state) !== null && _o$address$state !== void 0 ? _o$address$state : ""} · CEP ${(_o$address$zip = o.address.zip) !== null && _o$address$zip !== void 0 ? _o$address$zip : ""}` : null
	].filter(Boolean);
	for (const l of lines) {
		const wrapped = doc.splitTextToSize(l, pageW - margin * 2);
		doc.text(wrapped, margin, y);
		y += wrapped.length * 4.2;
	}
	y += 4;
	autoTable(doc, {
		startY: y,
		head: [[
			"Produto",
			"SKU",
			"Qtd",
			"Preço un.",
			"Subtotal"
		]],
		body: o.items.map((it) => {
			var _it$sku;
			return [
				it.nome,
				(_it$sku = it.sku) !== null && _it$sku !== void 0 ? _it$sku : "—",
				String(it.quantidade) + (it.tipo_compra === "PACOTE" ? " (pacote)" : ""),
				brl(Number(it.preco_final)),
				brl(Number(it.subtotal))
			];
		}),
		styles: {
			fontSize: 9,
			cellPadding: 2.5
		},
		headStyles: {
			fillColor: [
				30,
				41,
				59
			],
			textColor: 255,
			fontStyle: "bold"
		},
		columnStyles: {
			2: { halign: "center" },
			3: { halign: "right" },
			4: { halign: "right" }
		},
		margin: {
			left: margin,
			right: margin
		}
	});
	y = doc.lastAutoTable.finalY + 6;
	const totalsX = pageW - margin;
	const labelX = pageW - margin - 50;
	doc.setFontSize(10);
	doc.setFont("helvetica", "normal");
	doc.setTextColor(60);
	doc.text("Subtotal", labelX, y);
	doc.text(brl(Number(o.subtotal)), totalsX, y, { align: "right" });
	y += 5;
	doc.text("Frete", labelX, y);
	doc.text(brl(Number(o.frete)), totalsX, y, { align: "right" });
	if (Number((_o$desconto = o.desconto) !== null && _o$desconto !== void 0 ? _o$desconto : 0) > 0) {
		y += 5;
		doc.text("Desconto", labelX, y);
		doc.text("- " + brl(Number(o.desconto)), totalsX, y, { align: "right" });
	}
	y += 2;
	doc.setDrawColor(180);
	doc.line(labelX, y, totalsX, y);
	y += 5;
	doc.setFont("helvetica", "bold");
	doc.setFontSize(12);
	doc.setTextColor(20);
	doc.text("TOTAL GERAL", labelX, y);
	doc.text(brl(Number(o.total)), totalsX, y, { align: "right" });
	if (o.payment) {
		var _o$payment$tipo, _o$payment$status;
		y += 10;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.text("FORMA DE PAGAMENTO", margin, y);
		y += 5;
		doc.setFont("helvetica", "normal");
		doc.setFontSize(9);
		doc.setTextColor(60);
		doc.text(`${(_o$payment$tipo = o.payment.tipo) !== null && _o$payment$tipo !== void 0 ? _o$payment$tipo : "—"} · ${(_o$payment$status = o.payment.status) !== null && _o$payment$status !== void 0 ? _o$payment$status : "—"}`, margin, y);
		if (o.payment.payment_link) {
			y += 5;
			doc.setTextColor(30, 64, 175);
			const link = doc.splitTextToSize(`Link: ${o.payment.payment_link}`, pageW - margin * 2);
			doc.textWithLink(link[0], margin, y, { url: o.payment.payment_link });
			for (let i = 1; i < link.length; i++) {
				y += 4;
				doc.text(link[i], margin, y);
			}
		}
	}
	if (o.observacao) {
		y += 10;
		doc.setFont("helvetica", "bold");
		doc.setFontSize(10);
		doc.setTextColor(20);
		doc.text("OBSERVAÇÃO", margin, y);
		y += 5;
		doc.setFont("helvetica", "normal");
		doc.setFontSize(9);
		doc.setTextColor(60);
		const obs = doc.splitTextToSize(o.observacao, pageW - margin * 2);
		doc.text(obs, margin, y);
	}
	const footY = doc.internal.pageSize.getHeight() - 10;
	doc.setFontSize(8);
	doc.setTextColor(140);
	doc.text("Documento gerado automaticamente · Confirme o pedido com nosso atendimento.", pageW / 2, footY, { align: "center" });
	return doc;
}
function generateOrderPdf(o) {
	buildOrderPdf(o).save(`pedido-${o.id.slice(0, 8)}.pdf`);
}
function sign(orderId, secret) {
	return createHmac("sha256", secret).update(orderId).digest("hex");
}
function signedOrderPdfPath(orderId, secret) {
	return `/api/public/orders/pdf?orderId=${encodeURIComponent(orderId)}&sig=${sign(orderId, secret)}`;
}
var Route = createFileRoute("/api/public/orders/pdf")({ server: { handlers: { GET: async ({ request }) => {
	const url = new URL(request.url);
	const orderId = url.searchParams.get("orderId") || "";
	const sig = url.searchParams.get("sig") || "";
	const secret = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
	if (!orderId || !sig || !secret) return new Response("Bad request", { status: 400 });
	try {
		const expected = sign(orderId, secret);
		const a = Buffer.from(sig, "hex");
		const b = Buffer.from(expected, "hex");
		if (a.length !== b.length || !timingSafeEqual(a, b)) return new Response("Forbidden", { status: 403 });
	} catch (_unused) {
		return new Response("Forbidden", { status: 403 });
	}
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
	const { data: order, error: orderErr } = await supabase.from("orders").select("*").eq("id", orderId).maybeSingle();
	if (orderErr || !order) return new Response("Not found", { status: 404 });
	const { data: items } = await supabase.from("order_items").select("quantidade, tipo_compra, preco_final, subtotal, product:products(nome, sku)").eq("order_id", orderId);
	const { data: company } = order.company_id ? await supabase.from("companies").select("legal_name, trade_name, tax_id, phone, email").eq("id", order.company_id).maybeSingle() : { data: null };
	const { data: address } = order.address_id ? await supabase.from("addresses").select("street, number, district, city, state, zip").eq("id", order.address_id).maybeSingle() : { data: null };
	const { data: payment } = await supabase.from("payments").select("tipo, status, payment_link").eq("order_id", orderId).order("created_at", { ascending: false }).limit(1).maybeSingle();
	const bytes = buildOrderPdf({
		id: order.id,
		created_at: order.created_at,
		subtotal: Number(order.subtotal || 0),
		frete: Number(order.frete || 0),
		desconto: Number(order.desconto || 0),
		total: Number(order.total || 0),
		observacao: order.observacao,
		status: order.status,
		company: company !== null && company !== void 0 ? company : void 0,
		address: address !== null && address !== void 0 ? address : void 0,
		items: (items !== null && items !== void 0 ? items : []).map((it) => {
			var _it$product$nome, _it$product, _it$product$sku, _it$product2, _it$tipo_compra;
			return {
				nome: (_it$product$nome = (_it$product = it.product) === null || _it$product === void 0 ? void 0 : _it$product.nome) !== null && _it$product$nome !== void 0 ? _it$product$nome : "Produto",
				sku: (_it$product$sku = (_it$product2 = it.product) === null || _it$product2 === void 0 ? void 0 : _it$product2.sku) !== null && _it$product$sku !== void 0 ? _it$product$sku : null,
				tipo_compra: (_it$tipo_compra = it.tipo_compra) !== null && _it$tipo_compra !== void 0 ? _it$tipo_compra : "UNIDADE",
				quantidade: Number(it.quantidade || 0),
				preco_final: Number(it.preco_final || 0),
				subtotal: Number(it.subtotal || 0)
			};
		}),
		payment: payment !== null && payment !== void 0 ? payment : void 0,
		brandName: "Prime Automotive",
		brandTagline: "Pedido / Nota de venda"
	}).output("arraybuffer");
	return new Response(bytes, {
		status: 200,
		headers: {
			"Content-Type": "application/pdf",
			"Content-Disposition": `inline; filename="pedido-${order.id.slice(0, 8)}.pdf"`,
			"Cache-Control": "private, max-age=300"
		}
	});
} } } });
//#endregion
export { formatDate as a, brl as i, generateOrderPdf as n, formatDateTime as o, signedOrderPdfPath as r, Route as t };
