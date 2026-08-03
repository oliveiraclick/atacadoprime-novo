import { o as __toESM } from "../_runtime.mjs";
import { a as useDraggable, c as useSensors, i as closestCenter, n as PointerSensor, o as useDroppable, r as TouchSensor, s as useSensor, t as DndContext } from "../_libs/@dnd-kit/core.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as _objectWithoutProperties } from "./objectWithoutProperties-BB9sSIVa.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { $t as Check, G as Plus, J as Percent, L as Route, N as Search, Qt as ChevronDown, St as Handshake, Ut as ClipboardList, c as Users, dt as LoaderCircle, et as Navigation, h as TrendingUp, q as Phone, rt as MessageCircle, st as MapPin, u as UserPlus } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, s as DialogTrigger, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BVkvqzl6.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as runOrQueue } from "./offline-mutations-BlLFZEVf.mjs";
import { t as parseLeadAddress } from "./lead-address-NMtqYJJZ.mjs";
import { t as Textarea } from "./textarea-DerICSB1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.crm.index-B9CAFmeq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LEAD_STAGES = [
	{
		id: "NOVO_LEAD",
		label: "Novo Lead",
		tone: "bg-blue-500/10 text-blue-600 border-blue-500/30"
	},
	{
		id: "CONTATO_FEITO",
		label: "Contato Feito",
		tone: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30"
	},
	{
		id: "NEGOCIACAO",
		label: "Negociação",
		tone: "bg-amber-500/10 text-amber-600 border-amber-500/30"
	},
	{
		id: "AGUARDANDO_RETORNO",
		label: "Aguardando Retorno",
		tone: "bg-purple-500/10 text-purple-600 border-purple-500/30"
	},
	{
		id: "CLIENTE",
		label: "Cliente",
		tone: "bg-success/15 text-success border-success/40"
	},
	{
		id: "PEDIDO",
		label: "Pedido",
		tone: "bg-primary/15 text-primary border-primary/40"
	}
];
var SEGMENTOS = [
	{
		id: "CHAVEIRO",
		label: "Chaveiro"
	},
	{
		id: "AUTO_ELETRICA",
		label: "Auto Elétrica"
	},
	{
		id: "CENTRO_AUTOMOTIVO",
		label: "Centro Automotivo"
	},
	{
		id: "LOJA_DE_SOM",
		label: "Loja de Som"
	},
	{
		id: "AUTO_PECAS",
		label: "Auto Peças"
	},
	{
		id: "INSTALADOR_DE_ALARMES",
		label: "Instalador de Alarmes"
	},
	{
		id: "OUTRO",
		label: "Outro"
	}
];
function useLeads(search) {
	return useQuery({
		queryKey: [
			"crm",
			"leads",
			search !== null && search !== void 0 ? search : ""
		],
		queryFn: async () => {
			let q = supabase.from("leads").select("*").order("position", { ascending: true });
			if (search && search.trim()) {
				const s = `%${search.trim()}%`;
				q = q.or(`empresa.ilike.${s},contato.ilike.${s},whatsapp.ilike.${s},cidade.ilike.${s},email.ilike.${s}`);
			}
			const { data, error } = await q;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
}
function useCreateLead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (input) => {
			var _res$data;
			const res = await runOrQueue("lead_insert", input, async () => {
				var _userData$user;
				const { data: userData } = await supabase.auth.getUser();
				const { data, error } = await supabase.from("leads").insert(_objectSpread2(_objectSpread2({}, input), {}, { created_by: (_userData$user = userData.user) === null || _userData$user === void 0 ? void 0 : _userData$user.id })).select().single();
				if (error) throw error;
				return data;
			}, `Lead: ${input.empresa}`);
			return (_res$data = res.data) !== null && _res$data !== void 0 ? _res$data : _objectSpread2({ id: res.id }, input);
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["crm"] })
	});
}
function useUpdateLead() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async ({ id, patch }) => {
			var _res$data2;
			return (_res$data2 = (await runOrQueue("lead_update", {
				id,
				patch
			}, async () => {
				const { data, error } = await supabase.from("leads").update(patch).eq("id", id).select().single();
				if (error) throw error;
				return data;
			}, `Lead #${id.slice(0, 8)}`)).data) !== null && _res$data2 !== void 0 ? _res$data2 : _objectSpread2({ id }, patch);
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["crm"] })
	});
}
function useConvertToClient() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (lead) => {
			await runOrQueue("lead_convert", { lead }, async () => {
				let companyId = lead.company_id;
				if (!companyId) {
					var _u$user4;
					const { data: u } = await supabase.auth.getUser();
					const ownerId = (_u$user4 = u.user) === null || _u$user4 === void 0 ? void 0 : _u$user4.id;
					if (!ownerId) throw new Error("Sessão expirada. Faça login novamente.");
					const { data: comp, error: ce } = await supabase.from("companies").insert({
						legal_name: lead.empresa,
						trade_name: lead.empresa,
						owner_id: ownerId,
						phone: lead.whatsapp || lead.telefone || "",
						email: lead.email,
						cidade: lead.cidade,
						estado: lead.estado,
						latitude: lead.latitude,
						longitude: lead.longitude,
						status: "approved"
					}).select().single();
					if (ce) throw ce;
					companyId = comp.id;
					const parsedAddress = parseLeadAddress(lead.observacoes, lead.cidade, lead.estado);
					if (parsedAddress) {
						const { error: addressError } = await supabase.from("addresses").insert(_objectSpread2(_objectSpread2({}, parsedAddress), {}, {
							company_id: companyId,
							kind: "both",
							country: "BR",
							is_default: true
						}));
						if (addressError) throw addressError;
					}
				}
				const { error } = await supabase.from("leads").update({
					status: "CLIENTE",
					company_id: companyId
				}).eq("id", lead.id);
				if (error) throw error;
				return companyId;
			}, `Converter: ${lead.empresa}`);
		},
		onSuccess: () => qc.invalidateQueries({ queryKey: ["crm"] })
	});
}
function useCrmStats() {
	return useQuery({
		queryKey: ["crm", "stats"],
		queryFn: async () => {
			const { data: leads } = await supabase.from("leads").select("status,created_at");
			const { data: tasks } = await supabase.from("lead_tasks").select("status,data");
			const arr = leads !== null && leads !== void 0 ? leads : [];
			const monthStart = /* @__PURE__ */ new Date();
			monthStart.setDate(1);
			monthStart.setHours(0, 0, 0, 0);
			const novos = arr.filter((l) => l.status === "NOVO_LEAD").length;
			const negociando = arr.filter((l) => l.status === "NEGOCIACAO").length;
			const clientes = arr.filter((l) => l.status === "CLIENTE").length;
			const conversoesMes = arr.filter((l) => l.status === "CLIENTE" && new Date(l.created_at) >= monthStart).length;
			const total = arr.length || 1;
			return {
				novos,
				negociando,
				clientes,
				conversoesMes,
				taxa: Math.round(clientes / total * 100),
				pendentes: (tasks !== null && tasks !== void 0 ? tasks : []).filter((t) => t.status === "PENDENTE").length
			};
		}
	});
}
var _excluded = ["className"];
var Checkbox = import_react.forwardRef((_ref, ref) => {
	let { className } = _ref, props = _objectWithoutProperties(_ref, _excluded);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, _objectSpread2(_objectSpread2({
		ref,
		className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className)
	}, props), {}, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	}) }));
});
Checkbox.displayName = Checkbox$1.displayName;
function haversine(a, b) {
	const R = 6371;
	const dLat = (b.lat - a.lat) * Math.PI / 180;
	const dLng = (b.lng - a.lng) * Math.PI / 180;
	const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}
function nearestNeighbor(start, stops) {
	const remaining = [...stops];
	const ordered = [];
	let cur = start;
	while (remaining.length) {
		let best = 0;
		let bestD = Infinity;
		for (let i = 0; i < remaining.length; i++) {
			const d = haversine(cur, {
				lat: remaining[i]._lat,
				lng: remaining[i]._lng
			});
			if (d < bestD) {
				bestD = d;
				best = i;
			}
		}
		cur = {
			lat: remaining[best]._lat,
			lng: remaining[best]._lng
		};
		ordered.push(remaining.splice(best, 1)[0]);
	}
	return ordered;
}
function NearMeRouteDialog({ leads, cidade }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [origin, setOrigin] = (0, import_react.useState)(null);
	const [loadingGeo, setLoadingGeo] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [userTouched, setUserTouched] = (0, import_react.useState)(false);
	const [nearbyOnly, setNearbyOnly] = (0, import_react.useState)(true);
	const [radiusKm, setRadiusKm] = (0, import_react.useState)(30);
	const [navIndex, setNavIndex] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (!open || origin) return;
		if (!navigator.geolocation) {
			toast.error("Geolocalização não suportada neste dispositivo");
			return;
		}
		setLoadingGeo(true);
		navigator.geolocation.getCurrentPosition((p) => {
			setOrigin({
				lat: p.coords.latitude,
				lng: p.coords.longitude
			});
			setLoadingGeo(false);
		}, (err) => {
			setLoadingGeo(false);
			toast.error("Não foi possível obter sua localização: " + err.message);
		}, {
			enableHighAccuracy: true,
			timeout: 1e4
		});
	}, [open, origin]);
	const scoped = (0, import_react.useMemo)(() => cidade && cidade !== "__all__" ? leads.filter((l) => l.cidade === cidade) : leads, [leads, cidade]);
	const withCoords = (0, import_react.useMemo)(() => scoped.filter((l) => l.latitude != null && l.longitude != null).map((l) => _objectSpread2(_objectSpread2({}, l), {}, {
		_lat: Number(l.latitude),
		_lng: Number(l.longitude)
	})), [scoped]);
	const missingCoords = scoped.length - withCoords.length;
	const sorted = (0, import_react.useMemo)(() => {
		if (!origin) return [];
		const all = withCoords.map((l) => _objectSpread2(_objectSpread2({}, l), {}, { _d: haversine(origin, {
			lat: l._lat,
			lng: l._lng
		}) })).sort((a, b) => a._d - b._d);
		return nearbyOnly ? all.filter((l) => l._d <= radiusKm) : all;
	}, [
		withCoords,
		origin,
		nearbyOnly,
		radiusKm
	]);
	const filteredOutByRadius = nearbyOnly && origin ? withCoords.length - sorted.length : 0;
	(0, import_react.useEffect)(() => {
		if (open && origin && !userTouched && sorted.length > 0) setSelected(new Set(sorted.slice(0, Math.min(10, sorted.length)).map((l) => l.id)));
	}, [
		open,
		origin,
		sorted,
		userTouched
	]);
	(0, import_react.useEffect)(() => {
		setNavIndex(0);
	}, [selected]);
	const chosen = sorted.filter((l) => selected.has(l.id));
	const orderedRoute = (0, import_react.useMemo)(() => {
		if (!origin || chosen.length === 0) return [];
		return nearestNeighbor(origin, chosen);
	}, [origin, chosen]);
	function toggle(id) {
		setUserTouched(true);
		setSelected((prev) => {
			const n = new Set(prev);
			n.has(id) ? n.delete(id) : n.add(id);
			return n;
		});
	}
	function selectAll() {
		setUserTouched(true);
		setSelected(new Set(sorted.map((l) => l.id)));
	}
	function deselectAll() {
		setUserTouched(true);
		setSelected(/* @__PURE__ */ new Set());
	}
	function openInMaps() {
		if (!origin || orderedRoute.length === 0) return;
		const limited = orderedRoute.slice(0, 10);
		const destination = limited[limited.length - 1];
		const waypoints = limited.slice(0, -1);
		const params = new URLSearchParams({
			api: "1",
			travelmode: "driving",
			dir_action: "navigate",
			origin: `${origin.lat},${origin.lng}`,
			destination: `${destination._lat},${destination._lng}`
		});
		if (waypoints.length) params.set("waypoints", waypoints.map((w) => `${w._lat},${w._lng}`).join("|"));
		window.open(`https://www.google.com/maps/dir/?${params.toString()}`, "_blank");
		if (orderedRoute.length > 10) toast.info(`Rota aberta com os 10 primeiros. Faltam ${orderedRoute.length - 10} paradas — refaça depois.`);
	}
	function openWaze(l) {
		window.open(`https://waze.com/ul?ll=${l._lat},${l._lng}&navigate=yes`, "_blank");
	}
	function openMapsOne(l) {
		if (origin) window.open(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=${origin.lat},${origin.lng}&destination=${l._lat},${l._lng}`, "_blank");
		else window.open(`https://www.google.com/maps/search/?api=1&query=${l._lat},${l._lng}`, "_blank");
	}
	function openPoint(index) {
		if (!origin || orderedRoute.length === 0) return;
		const target = orderedRoute[index];
		if (!target) return;
		setNavIndex(index);
		window.open(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&origin=${origin.lat},${origin.lng}&destination=${target._lat},${target._lng}`, "_blank");
	}
	function startPointByPoint() {
		openPoint(0);
	}
	function nextPoint() {
		openPoint(navIndex + 1);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: (v) => {
			setOpen(v);
			if (!v) {
				setSelected(/* @__PURE__ */ new Set());
				setUserTouched(false);
			}
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				style: { borderColor: V2.LIGHT_BORDER },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-4 h-4 mr-1" }), " Rota perto de mim"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { className: "w-4 h-4" }), " Clientes mais próximos"]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							style: { color: V2.LIGHT_MUTED },
							children: [cidade && cidade !== "__all__" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								"Filtrando na cidade ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: cidade }),
								". "
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: "Todas as cidades. " }), "Selecione os clientes; a ordem será otimizada do mais perto ao mais longe."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2 rounded-md border p-2",
							style: { borderColor: V2.LIGHT_BORDER },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs cursor-pointer",
								style: { color: V2.LIGHT_TEXT },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: nearbyOnly,
									onCheckedChange: (v) => {
										setNearbyOnly(!!v);
										setSelected(/* @__PURE__ */ new Set());
									}
								}), "Somente clientes próximos (mesma região)"]
							}), nearbyOnly && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1 ml-auto text-xs",
								style: { color: V2.LIGHT_MUTED },
								children: ["Raio:", [
									10,
									30,
									50,
									100
								].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									variant: radiusKm === r ? "default" : "outline",
									className: "h-6 px-2 text-[11px]",
									onClick: () => {
										setRadiusKm(r);
										setSelected(/* @__PURE__ */ new Set());
									},
									style: radiusKm === r ? {
										background: V2.TEAL,
										color: "#fff"
									} : { borderColor: V2.LIGHT_BORDER },
									children: [r, " km"]
								}, r))]
							})]
						}),
						loadingGeo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-sm",
							style: { color: V2.LIGHT_MUTED },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin" }), " Obtendo sua localização..."]
						}),
						!loadingGeo && !origin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "outline",
							onClick: () => {
								setOrigin(null);
								setOpen(false);
								setTimeout(() => setOpen(true), 50);
							},
							children: "Tentar novamente"
						}),
						origin && sorted.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm p-4 rounded-md border",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_MUTED
							},
							children: [
								"Nenhum lead com coordenadas nesta seleção. Use o mapa em ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Prospecção" }),
								" ou geocode os endereços para habilitar a rota."
							]
						}),
						origin && sorted.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs",
									style: { color: V2.LIGHT_MUTED },
									children: [sorted.length, " cliente(s) próximo(s)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-7 px-2 text-[11px]",
										onClick: selectAll,
										style: { borderColor: V2.LIGHT_BORDER },
										children: "Marcar todos"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-7 px-2 text-[11px]",
										onClick: deselectAll,
										style: { borderColor: V2.LIGHT_BORDER },
										children: "Desmarcar todos"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "max-h-[40vh] overflow-y-auto rounded-md border divide-y",
								style: { borderColor: V2.LIGHT_BORDER },
								children: sorted.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 p-2.5 cursor-pointer hover:bg-black/[0.03]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											checked: selected.has(l.id),
											onCheckedChange: () => toggle(l.id),
											className: "mt-0.5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold shrink-0",
											style: {
												background: V2.TEAL_LIGHT,
												color: V2.TEAL_DARK
											},
											children: i + 1
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium truncate",
												style: { color: V2.LIGHT_TEXT },
												children: l.empresa
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs flex items-center gap-1",
												style: { color: V2.LIGHT_MUTED },
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
													l.cidade,
													l.estado ? ` / ${l.estado}` : "",
													" · ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [l._d.toFixed(1), " km"] })
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "ghost",
												className: "h-7 px-2 text-xs",
												onClick: (e) => {
													e.preventDefault();
													openWaze(l);
												},
												title: "Abrir no Waze",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-3.5 h-3.5 mr-1" }), " Waze"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												size: "sm",
												variant: "ghost",
												className: "h-7 px-2 text-xs",
												onClick: (e) => {
													e.preventDefault();
													openMapsOne(l);
												},
												title: "Abrir no Google Maps",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5 mr-1" }), " Maps"]
											})]
										})
									]
								}, l.id))
							}),
							filteredOutByRadius > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px]",
								style: { color: V2.LIGHT_MUTED },
								children: [
									filteredOutByRadius,
									" cliente(s) fora do raio de ",
									radiusKm,
									" km foram ocultados."
								]
							}),
							missingCoords > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[11px]",
								style: { color: V2.LIGHT_MUTED },
								children: [missingCoords, " cliente(s) desta seleção sem coordenadas foram ignorados."]
							})
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs",
							style: { color: V2.LIGHT_MUTED },
							children: [
								chosen.length,
								" selecionado(s)",
								chosen.length > 10 ? " · Google Maps abre apenas os 10 primeiros" : "",
								orderedRoute.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1",
									children: [
										"· Ponto ",
										Math.min(navIndex + 1, orderedRoute.length),
										" de ",
										orderedRoute.length
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setOpen(false),
									children: "Fechar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: startPointByPoint,
									disabled: !origin || orderedRoute.length === 0,
									variant: "outline",
									style: {
										borderColor: V2.TEAL,
										color: V2.TEAL
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-4 h-4 mr-1" }), " Navegar ponto a ponto"]
								}),
								navIndex < orderedRoute.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: nextPoint,
									disabled: !origin || orderedRoute.length === 0,
									variant: "outline",
									style: {
										borderColor: V2.TEAL,
										color: V2.TEAL
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-4 h-4 mr-1" }), " Próximo ponto"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: openInMaps,
									disabled: !origin || chosen.length === 0,
									style: {
										background: V2.TEAL,
										color: "#fff"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-4 h-4 mr-1" }), " Rota completa no Maps"]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] w-full",
						style: { color: V2.LIGHT_MUTED },
						children: [
							"Dica: use ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "“Navegar ponto a ponto”" }),
							" para o GPS falar virar a direita/esquerda. A rota completa abre a visão geral do mapa."
						]
					})]
				})
			]
		})]
	});
}
function V2CrmKanbanPage() {
	var _stats$novos, _stats$negociando, _stats$clientes, _stats$conversoesMes, _stats$taxa, _stats$pendentes;
	const [search, setSearch] = (0, import_react.useState)("");
	const [cidade, setCidade] = (0, import_react.useState)("__all__");
	const { data: leads = [] } = useLeads(search);
	const { data: stats } = useCrmStats();
	const updateLead = useUpdateLead();
	const convertToClient = useConvertToClient();
	const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), useSensor(TouchSensor, { activationConstraint: {
		delay: 150,
		tolerance: 5
	} }));
	const cidades = (0, import_react.useMemo)(() => {
		const set = /* @__PURE__ */ new Set();
		leads.forEach((l) => {
			if (l.cidade) set.add(l.cidade);
		});
		return Array.from(set).sort((a, b) => a.localeCompare(b, "pt-BR"));
	}, [leads]);
	const filtered = (0, import_react.useMemo)(() => cidade === "__all__" ? leads : leads.filter((l) => l.cidade === cidade), [leads, cidade]);
	const grouped = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		LEAD_STAGES.forEach((s) => map.set(s.id, []));
		filtered.forEach((l) => {
			var _map$get;
			return (_map$get = map.get(l.status)) === null || _map$get === void 0 ? void 0 : _map$get.push(l);
		});
		return map;
	}, [filtered]);
	function onDragEnd(e) {
		var _e$over;
		const leadId = String(e.active.id);
		const newStatus = (_e$over = e.over) === null || _e$over === void 0 ? void 0 : _e$over.id;
		if (!newStatus) return;
		const lead = leads.find((l) => l.id === leadId);
		if (!lead) return;
		if (newStatus === "CLIENTE") {
			if (lead.status === "CLIENTE" && lead.company_id) return;
			convertToClient.mutate(lead, {
				onSuccess: () => toast.success(`${lead.empresa} cadastrado como cliente`),
				onError: (err) => toast.error((err === null || err === void 0 ? void 0 : err.message) || "Erro ao converter em cliente")
			});
			return;
		}
		if (lead.status === newStatus) return;
		updateLead.mutate({
			id: leadId,
			patch: { status: newStatus }
		}, { onSuccess: () => {
			var _LEAD_STAGES$find;
			return toast.success(`Movido para ${(_LEAD_STAGES$find = LEAD_STAGES.find((s) => s.id === newStatus)) === null || _LEAD_STAGES$find === void 0 ? void 0 : _LEAD_STAGES$find.label}`);
		} });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		eyebrow: "CRM",
		title: "Funil comercial",
		description: "Arraste os leads entre as etapas para atualizar o status em tempo real.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					style: { borderColor: V2.LIGHT_BORDER },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/v3/crm/agenda",
						children: "Agenda"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NearMeRouteDialog, {
					leads: filtered,
					cidade
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewLeadDialog, {})
			]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2Stat, {
							label: "Novos",
							value: (_stats$novos = stats === null || stats === void 0 ? void 0 : stats.novos) !== null && _stats$novos !== void 0 ? _stats$novos : 0,
							icon: UserPlus
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2Stat, {
							label: "Negociação",
							value: (_stats$negociando = stats === null || stats === void 0 ? void 0 : stats.negociando) !== null && _stats$negociando !== void 0 ? _stats$negociando : 0,
							icon: Handshake
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2Stat, {
							label: "Clientes",
							value: (_stats$clientes = stats === null || stats === void 0 ? void 0 : stats.clientes) !== null && _stats$clientes !== void 0 ? _stats$clientes : 0,
							icon: Users
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2Stat, {
							label: "Convers. mês",
							value: (_stats$conversoesMes = stats === null || stats === void 0 ? void 0 : stats.conversoesMes) !== null && _stats$conversoesMes !== void 0 ? _stats$conversoesMes : 0,
							icon: TrendingUp
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2Stat, {
							label: "Taxa conv.",
							value: `${(_stats$taxa = stats === null || stats === void 0 ? void 0 : stats.taxa) !== null && _stats$taxa !== void 0 ? _stats$taxa : 0}%`,
							icon: Percent
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2Stat, {
							label: "Tarefas",
							value: (_stats$pendentes = stats === null || stats === void 0 ? void 0 : stats.pendentes) !== null && _stats$pendentes !== void 0 ? _stats$pendentes : 0,
							icon: ClipboardList
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-3 items-stretch sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
							className: "w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2",
							style: { color: V2.LIGHT_MUTED }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "Buscar empresa, contato, WhatsApp, cidade...",
							value: search,
							onChange: (e) => setSearch(e.target.value),
							className: "pl-9",
							style: {
								background: V2.LIGHT_SURFACE,
								borderColor: V2.LIGHT_BORDER
							}
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: cidade,
						onValueChange: setCidade,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger, {
							className: "w-full sm:w-56",
							style: {
								background: V2.LIGHT_SURFACE,
								borderColor: V2.LIGHT_BORDER
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
								className: "w-4 h-4 mr-1",
								style: { color: V2.LIGHT_MUTED }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Cidade" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "__all__",
							children: "Todas as cidades"
						}), cidades.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: c,
							children: c
						}, c))] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
					sensors,
					collisionDetection: closestCenter,
					onDragEnd,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 pb-4",
						children: LEAD_STAGES.map((stage) => {
							var _grouped$get;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Column, {
								stage,
								leads: (_grouped$get = grouped.get(stage.id)) !== null && _grouped$get !== void 0 ? _grouped$get : []
							}, stage.id);
						})
					})
				})
			]
		})
	});
}
function V2Stat({ label, value, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border p-4",
		style: {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] uppercase tracking-widest font-semibold",
				style: { color: V2.LIGHT_MUTED },
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: "w-4 h-4",
				style: { color: V2.TEAL }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-2xl font-semibold",
			style: { color: V2.LIGHT_TEXT },
			children: value
		})]
	});
}
function Column({ stage, leads }) {
	const { setNodeRef, isOver } = useDroppable({ id: stage.id });
	const [limit, setLimit] = (0, import_react.useState)(10);
	const visible = leads.slice(0, limit);
	const remaining = leads.length - visible.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: setNodeRef,
		className: "min-w-0 w-full rounded-2xl border flex flex-col transition",
		style: {
			background: V2.LIGHT_SURFACE_2,
			borderColor: isOver ? V2.TEAL : V2.LIGHT_BORDER,
			boxShadow: isOver ? `0 0 0 2px ${V2.TEAL}33` : void 0
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-3 border-b flex items-center justify-between",
			style: { borderColor: V2.LIGHT_BORDER },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold uppercase tracking-wide truncate",
					style: { color: V2.LIGHT_TEXT },
					children: stage.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[11px] px-1.5 rounded-full",
					style: {
						background: V2.TEAL_LIGHT,
						color: V2.TEAL_DARK
					},
					children: leads.length
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-2 space-y-2 flex-1 min-h-32",
			children: [
				visible.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LeadCard, { lead: l }, l.id)),
				leads.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-center py-6",
					style: { color: V2.LIGHT_MUTED },
					children: "Vazio"
				}),
				remaining > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "w-full text-xs",
					onClick: () => setLimit((n) => n + 10),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "w-3.5 h-3.5 mr-1" }),
						" Ver mais (",
						remaining,
						")"
					]
				}),
				limit > 10 && remaining === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					className: "w-full text-xs",
					onClick: () => setLimit(10),
					children: "Ver menos"
				})
			]
		})]
	});
}
function LeadCard({ lead }) {
	const router = useRouter();
	const updateLead = useUpdateLead();
	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: lead.id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", _objectSpread2(_objectSpread2(_objectSpread2({
		ref: setNodeRef,
		style: _objectSpread2(_objectSpread2({}, transform ? {
			transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
			opacity: isDragging ? .5 : 1
		} : void 0), {}, {
			background: V2.LIGHT_SURFACE,
			borderColor: V2.LIGHT_BORDER
		})
	}, attributes), listeners), {}, {
		onClick: () => router.navigate({
			to: "/crm/$id",
			params: { id: lead.id }
		}),
		className: "p-3 rounded-xl border cursor-grab active:cursor-grabbing hover:shadow-sm transition",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium text-sm truncate",
					style: { color: V2.LIGHT_TEXT },
					children: lead.empresa
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 shrink-0",
					children: [lead.company_id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] px-1.5 py-0.5 rounded-full font-semibold",
						style: {
							background: V2.TEAL_LIGHT,
							color: V2.TEAL_DARK
						},
						children: "CLIENTE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] px-1.5 py-0.5 rounded-full border",
						style: {
							borderColor: V2.LIGHT_BORDER,
							color: V2.LIGHT_MUTED
						},
						children: lead.score
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs mt-0.5 truncate",
				style: { color: V2.LIGHT_MUTED },
				children: lead.contato
			}),
			(lead.cidade || lead.estado) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs flex items-center gap-1 mt-1",
				style: { color: V2.LIGHT_MUTED },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3 h-3" }),
					lead.cidade,
					lead.estado ? ` / ${lead.estado}` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 mt-2",
				onClick: (e) => e.stopPropagation(),
				onPointerDown: (e) => e.stopPropagation(),
				children: [lead.whatsapp && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`,
					target: "_blank",
					rel: "noreferrer",
					className: "p-1.5 rounded-md",
					style: {
						background: V2.TEAL_LIGHT,
						color: V2.TEAL_DARK
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "w-3.5 h-3.5" })
				}), lead.telefone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `tel:${lead.telefone}`,
					className: "p-1.5 rounded-md",
					style: {
						background: V2.TEAL_LIGHT,
						color: V2.TEAL_DARK
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "w-3.5 h-3.5" })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				onClick: (e) => e.stopPropagation(),
				onPointerDown: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: lead.status,
					onValueChange: (v) => updateLead.mutate({
						id: lead.id,
						patch: { status: v }
					}, { onSuccess: () => {
						var _LEAD_STAGES$find2;
						return toast.success(`Movido para ${(_LEAD_STAGES$find2 = LEAD_STAGES.find((s) => s.id === v)) === null || _LEAD_STAGES$find2 === void 0 ? void 0 : _LEAD_STAGES$find2.label}`);
					} }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "h-7 text-xs",
						style: {
							background: V2.LIGHT_SURFACE_2,
							borderColor: V2.LIGHT_BORDER
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Mover para..." })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: LEAD_STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: s.id,
						className: "text-xs",
						children: s.label
					}, s.id)) })]
				})
			})
		]
	}));
}
function NewLeadDialog() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)({
		empresa: "",
		contato: "",
		whatsapp: "",
		telefone: "",
		email: "",
		cidade: "",
		estado: "",
		segmento: "OUTRO",
		observacoes: ""
	});
	const create = useCreateLead();
	function submit() {
		if (!form.empresa || !form.contato) {
			toast.error("Empresa e contato são obrigatórios");
			return;
		}
		create.mutate(form, {
			onSuccess: () => {
				toast.success("Lead criado");
				setOpen(false);
				setForm({
					empresa: "",
					contato: "",
					whatsapp: "",
					telefone: "",
					email: "",
					cidade: "",
					estado: "",
					segmento: "OUTRO",
					observacoes: ""
				});
			},
			onError: (e) => toast.error(e.message)
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: setOpen,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				style: {
					background: V2.TEAL,
					color: "#fff"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 mr-1" }), " Novo lead"]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Novo lead" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Empresa *",
							className: "col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.empresa,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { empresa: e.target.value }))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Contato *",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.contato,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { contato: e.target.value }))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "WhatsApp",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.whatsapp,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { whatsapp: e.target.value }))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Telefone",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.telefone,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { telefone: e.target.value }))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: form.email,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { email: e.target.value }))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Cidade",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								className: "uppercase",
								value: form.cidade,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { cidade: e.target.value.toUpperCase() }))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Estado",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								maxLength: 2,
								value: form.estado,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { estado: e.target.value.toUpperCase() }))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Segmento",
							className: "col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.segmento,
								onValueChange: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { segmento: v })),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: SEGMENTOS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s.id,
									children: s.label
								}, s.id)) })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Observações",
							className: "col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: form.observacoes,
								onChange: (e) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { observacoes: e.target.value }))
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => setOpen(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: submit,
					disabled: create.isPending,
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: create.isPending ? "Criando..." : "Criar lead"
				})] })
			]
		})]
	});
}
function Field({ label, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs mb-1 block",
			style: { color: V2.LIGHT_MUTED },
			children: label
		}), children]
	});
}
//#endregion
export { V2CrmKanbanPage as component };
