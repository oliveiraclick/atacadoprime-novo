import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { st as MapPin } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CityAutocomplete-_IxwmlbC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Fetches distinct city/UF pairs already used in the system (companies + trips + trip destinations).
* Used to power city autocomplete so users don't retype/misspell cities.
*/
function useCitySuggestions() {
	return useQuery({
		queryKey: ["city-suggestions"],
		staleTime: 5 * 6e4,
		queryFn: async () => {
			var _companiesRes$data, _tripsRes$data;
			const [companiesRes, tripsRes] = await Promise.all([supabase.from("companies").select("cidade, estado").not("cidade", "is", null).limit(2e3), supabase.from("trips").select("cidade, estado, destinos").not("cidade", "is", null).limit(500)]);
			const map = /* @__PURE__ */ new Map();
			const push = (cidade, estado) => {
				if (typeof cidade !== "string") return;
				const c = cidade.trim().toUpperCase();
				if (!c) return;
				const uf = typeof estado === "string" ? estado.trim().toUpperCase() || null : null;
				const key = `${c}|${uf !== null && uf !== void 0 ? uf : ""}`;
				if (!map.has(key)) map.set(key, {
					cidade: c,
					estado: uf
				});
			};
			((_companiesRes$data = companiesRes.data) !== null && _companiesRes$data !== void 0 ? _companiesRes$data : []).forEach((r) => push(r.cidade, r.estado));
			((_tripsRes$data = tripsRes.data) !== null && _tripsRes$data !== void 0 ? _tripsRes$data : []).forEach((r) => {
				push(r.cidade, r.estado);
				if (Array.isArray(r.destinos)) r.destinos.forEach((d) => push(d === null || d === void 0 ? void 0 : d.cidade, d === null || d === void 0 ? void 0 : d.estado));
			});
			return Array.from(map.values()).sort((a, b) => a.cidade.localeCompare(b.cidade, "pt-BR"));
		}
	});
}
/** City input that suggests previously-used cities and auto-fills UF on select. */
function CityAutocomplete({ value, onChange, placeholder = "Cidade", className = "", inputClassName = "", style, withIcon = false, autoFocus }) {
	const { data: options = [] } = useCitySuggestions();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [focused, setFocused] = (0, import_react.useState)(false);
	const wrapRef = (0, import_react.useRef)(null);
	const q = value.trim().toUpperCase();
	const filtered = (0, import_react.useMemo)(() => {
		if (!q) return options.slice(0, 8);
		return options.filter((o) => o.cidade.includes(q)).slice(0, 8);
	}, [options, q]);
	(0, import_react.useEffect)(() => {
		function onClick(e) {
			var _wrapRef$current;
			if (!((_wrapRef$current = wrapRef.current) === null || _wrapRef$current === void 0 ? void 0 : _wrapRef$current.contains(e.target))) setOpen(false);
		}
		document.addEventListener("mousedown", onClick);
		return () => document.removeEventListener("mousedown", onClick);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: `relative ${className}`,
		children: [
			withIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
				className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none",
				style: { color: V2.LIGHT_MUTED }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				value,
				onChange: (e) => {
					onChange(e.target.value.toUpperCase());
					setOpen(true);
				},
				onFocus: () => {
					setFocused(true);
					setOpen(true);
				},
				onBlur: () => setFocused(false),
				placeholder,
				className: `uppercase ${withIcon ? "pl-10" : ""} ${inputClassName}`,
				style,
				autoFocus,
				autoComplete: "off"
			}),
			open && focused && filtered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute z-50 mt-1 w-full rounded-lg border shadow-lg max-h-60 overflow-auto",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: filtered.map((o) => {
					var _o$estado;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onMouseDown: (e) => {
							e.preventDefault();
							onChange(o.cidade, o.estado);
							setOpen(false);
						},
						className: "w-full text-left px-3 py-2 text-sm hover:opacity-80 flex items-center justify-between",
						style: { color: V2.LIGHT_TEXT },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: o.cidade }), o.estado && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs opacity-60",
							children: o.estado
						})]
					}, `${o.cidade}-${(_o$estado = o.estado) !== null && _o$estado !== void 0 ? _o$estado : ""}`);
				})
			})
		]
	});
}
//#endregion
export { CityAutocomplete as t };
