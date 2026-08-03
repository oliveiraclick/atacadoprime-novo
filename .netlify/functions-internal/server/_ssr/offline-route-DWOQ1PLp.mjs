import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { L as Route, a as WifiOff, et as Navigation, mn as ArrowLeft, st as MapPin } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-D3HaXZP2.mjs";
import { t as Badge } from "./badge-CnQ0tQ74.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offline-route-DWOQ1PLp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var OFFLINE_KEY = "prime:last-route-view";
function getLatLng(s) {
	var _s$latitude, _s$longitude;
	const lat = (_s$latitude = s.latitude) !== null && _s$latitude !== void 0 ? _s$latitude : s.lat;
	const lng = (_s$longitude = s.longitude) !== null && _s$longitude !== void 0 ? _s$longitude : s.lng;
	if (lat == null || lng == null) return null;
	return {
		lat: Number(lat),
		lng: Number(lng)
	};
}
function openGoogleMaps(stops, origin) {
	const coords = stops.map(getLatLng).filter(Boolean);
	if (coords.length === 0) return;
	const destination = coords[coords.length - 1];
	const waypoints = coords.slice(0, -1).slice(0, 9);
	const params = new URLSearchParams({
		api: "1",
		travelmode: "driving",
		destination: `${destination.lat},${destination.lng}`
	});
	if (origin) params.set("origin", `${origin.lat},${origin.lng}`);
	if (waypoints.length) params.set("waypoints", waypoints.map((w) => `${w.lat},${w.lng}`).join("|"));
	window.open(`https://www.google.com/maps/dir/?${params.toString()}`, "_blank");
}
function openWaze(stop) {
	const c = getLatLng(stop);
	if (!c) return;
	window.open(`https://waze.com/ul?ll=${c.lat},${c.lng}&navigate=yes`, "_blank");
}
function OfflineRoutePage() {
	var _saved$stops, _saved$planName;
	const [saved, setSaved] = (0, import_react.useState)(null);
	const [origin, setOrigin] = (0, import_react.useState)(null);
	const [online, setOnline] = (0, import_react.useState)(typeof navigator !== "undefined" ? navigator.onLine : true);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(OFFLINE_KEY);
			if (raw) setSaved(JSON.parse(raw));
		} catch (_unused) {}
		if (typeof navigator !== "undefined" && navigator.geolocation) navigator.geolocation.getCurrentPosition((p) => setOrigin({
			lat: p.coords.latitude,
			lng: p.coords.longitude
		}), () => setOrigin(null), {
			enableHighAccuracy: true,
			timeout: 6e3
		});
		const up = () => setOnline(true);
		const down = () => setOnline(false);
		window.addEventListener("online", up);
		window.addEventListener("offline", down);
		return () => {
			window.removeEventListener("online", up);
			window.removeEventListener("offline", down);
		};
	}, []);
	const stops = (_saved$stops = saved === null || saved === void 0 ? void 0 : saved.stops) !== null && _saved$stops !== void 0 ? _saved$stops : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border bg-card/50 backdrop-blur px-4 py-3 flex items-center gap-3 sticky top-0 z-40",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "ghost",
					className: "h-9 w-9 p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "w-4 h-4" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground flex items-center gap-1",
						children: [!online && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "w-3 h-3" }), " Modo offline"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-base font-semibold truncate",
						children: (_saved$planName = saved === null || saved === void 0 ? void 0 : saved.planName) !== null && _saved$planName !== void 0 ? _saved$planName : "Rota salva"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: [stops.length, " paradas"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "max-w-2xl mx-auto p-4 space-y-4",
			children: stops.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-6 text-center space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Route, { className: "w-8 h-8 mx-auto text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: "Nenhuma rota salva neste dispositivo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Abra uma rota online em ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: "Rotas → Ver no mapa"
							}),
							" uma vez com internet. Depois ela ficará disponível aqui offline."
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4 space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Navegar todas as paradas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Abre o Google Maps com a sequência já otimizada (até 10 pontos).", origin ? " Origem: sua localização atual." : " Ative o GPS para usar sua posição como origem."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							className: "w-full gap-2",
							onClick: () => openGoogleMaps(stops, origin),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-4 h-4" }), " Abrir no Google Maps"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: stops.map((s, i) => {
						var _s$name, _s$id;
						const c = getLatLng(s);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "p-3 flex items-start gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0",
									children: i + 1
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium truncate",
											children: (_s$name = s.name) !== null && _s$name !== void 0 ? _s$name : "Parada"
										}),
										(s.address || s.cidade) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground truncate",
											children: s.address || [s.cidade, s.estado].filter(Boolean).join(" · ")
										}),
										c && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[11px] text-muted-foreground font-mono mt-0.5",
											children: [
												c.lat.toFixed(5),
												", ",
												c.lng.toFixed(5)
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col gap-1 shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "outline",
										className: "h-8 gap-1",
										onClick: () => openWaze(s),
										disabled: !c,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "w-3.5 h-3.5" }), " Waze"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										size: "sm",
										variant: "ghost",
										className: "h-8 gap-1",
										onClick: () => c && window.open(`https://www.google.com/maps/dir/?api=1&destination=${c.lat},${c.lng}&travelmode=driving`, "_blank"),
										disabled: !c,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-3.5 h-3.5" }), " Mapa"]
									})]
								})
							]
						}, (_s$id = s.id) !== null && _s$id !== void 0 ? _s$id : i);
					})
				}),
				(saved === null || saved === void 0 ? void 0 : saved.savedAt) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] text-muted-foreground text-center",
					children: ["Salvo em ", new Date(saved.savedAt).toLocaleString("pt-BR")]
				})
			] })
		})]
	});
}
//#endregion
export { OfflineRoutePage as component };
