//#region node_modules/.nitro/vite/services/ssr/assets/lead-address-NMtqYJJZ.js
function cleanPart(value) {
	return (value !== null && value !== void 0 ? value : "").replace(/\s+/g, " ").trim();
}
function normalizeZip(value) {
	const digits = value.replace(/\D/g, "").slice(0, 8);
	return digits.length === 8 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}
function extractAddressLine(notes) {
	var _match$;
	const match = (notes !== null && notes !== void 0 ? notes : "").match(/(?:^|\n)\s*Endere[cç]o:\s*(.+?)(?:\n|$)/i);
	return cleanPart((_match$ = match === null || match === void 0 ? void 0 : match[1]) !== null && _match$ !== void 0 ? _match$ : null).replace(/,?\s*Brasil\.?$/i, "").replace(/[.;]+$/g, "").trim();
}
function splitStreetAndNumber(value) {
	var _parts$pop;
	const parts = value.split(",").map(cleanPart).filter(Boolean);
	if (parts.length < 2) return {
		street: cleanPart(value),
		number: ""
	};
	const number = (_parts$pop = parts.pop()) !== null && _parts$pop !== void 0 ? _parts$pop : "";
	return {
		street: parts.join(", "),
		number
	};
}
function splitDistrictAndCity(value, fallbackCity) {
	const commaParts = value.split(",").map(cleanPart).filter(Boolean);
	if (commaParts.length >= 2) {
		var _commaParts$at;
		return {
			district: commaParts.slice(0, -1).join(", "),
			city: (_commaParts$at = commaParts.at(-1)) !== null && _commaParts$at !== void 0 ? _commaParts$at : ""
		};
	}
	const city = cleanPart(fallbackCity);
	return value.toLocaleLowerCase("pt-BR") === city.toLocaleLowerCase("pt-BR") ? {
		district: "",
		city
	} : {
		district: cleanPart(value),
		city
	};
}
function parseLeadAddress(notes, fallbackCity, fallbackState) {
	var _ref, _stateMatch$, _hyphenParts$shift;
	const addressLine = extractAddressLine(notes);
	if (!addressLine) return null;
	const zipMatch = addressLine.match(/(?:CEP:\s*)?(\d{5}-?\d{3})\b/i);
	const zip = zipMatch ? normalizeZip(zipMatch[1]) : "";
	if (!zip) return null;
	const withoutZip = cleanPart(addressLine.replace(/(?:,?\s*)?CEP:\s*\d{5}-?\d{3}\b/i, "").replace(/,?\s*\d{5}-?\d{3}\b/i, "")).replace(/[,-]+$/g, "").trim();
	const stateMatch = withoutZip.match(/(?:,|\s+-\s+)\s*([A-Z]{2})$/i);
	const state = ((_ref = (_stateMatch$ = stateMatch === null || stateMatch === void 0 ? void 0 : stateMatch[1]) !== null && _stateMatch$ !== void 0 ? _stateMatch$ : fallbackState) !== null && _ref !== void 0 ? _ref : "").toUpperCase();
	const hyphenParts = cleanPart(stateMatch ? withoutZip.slice(0, stateMatch.index).trim() : withoutZip).split(/\s+-\s+/).map(cleanPart).filter(Boolean);
	const { street, number } = splitStreetAndNumber((_hyphenParts$shift = hyphenParts.shift()) !== null && _hyphenParts$shift !== void 0 ? _hyphenParts$shift : "");
	if (!street || !state) return null;
	let district = "";
	let city = cleanPart(fallbackCity);
	if (hyphenParts.length > 0) {
		var _hyphenParts$pop;
		const parsed = splitDistrictAndCity((_hyphenParts$pop = hyphenParts.pop()) !== null && _hyphenParts$pop !== void 0 ? _hyphenParts$pop : "", fallbackCity);
		district = [...hyphenParts, parsed.district].map(cleanPart).filter(Boolean).join(" - ");
		city = parsed.city || city;
	}
	if (!city) return null;
	return {
		label: "Principal",
		street,
		number,
		complement: "",
		district,
		city,
		state,
		zip
	};
}
//#endregion
export { parseLeadAddress as t };
