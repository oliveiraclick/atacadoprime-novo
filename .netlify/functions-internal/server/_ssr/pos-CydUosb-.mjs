import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { f as Outlet, g as Link, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { B as RefreshCw, D as ShoppingBag, W as Printer, c as Users, ft as ListChecks, lt as LogOut } from "../_libs/lucide-react.mjs";
import { i as printerDiagnostics, n as getPrinterPref } from "./pos-printer-Cb2iJw0o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos-CydUosb-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "pos-density-v1";
/** Fator de zoom aplicado ao shell do POS conforme o tamanho real da tela. */
function computeScale(mode) {
	if (typeof window === "undefined") return 1;
	if (window.navigator.userAgent.includes("PrimeQ2I/")) return 1;
	if (mode === "normal") return 1;
	if (mode === "compact") return .8;
	const w = window.innerWidth;
	const h = window.innerHeight;
	if (w <= 340 || h <= 480) return .72;
	if (w <= 400 || h <= 620) return .82;
	if (w <= 480) return .9;
	return 1;
}
function usePosDensity() {
	const [mode, setMode] = (0, import_react.useState)("auto");
	const [scale, setScale] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		const saved = window.localStorage.getItem(KEY);
		const initial = saved === "compact" || saved === "normal" || saved === "auto" ? saved : "auto";
		setMode(initial);
		setScale(computeScale(initial));
	}, []);
	(0, import_react.useEffect)(() => {
		const onResize = () => setScale(computeScale(mode));
		window.addEventListener("resize", onResize);
		window.addEventListener("orientationchange", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
			window.removeEventListener("orientationchange", onResize);
		};
	}, [mode]);
	const cycle = () => {
		const next = mode === "auto" ? "compact" : mode === "compact" ? "normal" : "auto";
		setMode(next);
		setScale(computeScale(next));
		try {
			window.localStorage.setItem(KEY, next);
		} catch (_unused) {}
	};
	return {
		mode,
		scale,
		cycle
	};
}
/**
* Anti-cache / cache-busting helpers para o terminal POS.
*
* Contrato:
* - A assinatura de build é derivada dos nomes (hasheados) dos assets JS
*   servidos no HTML de /pos. Cada deploy gera hashes novos.
* - Se a assinatura remota diferir da assinatura carregada, a página é
*   recarregada com cache-busting.
* - Recargas são limitadas a 1 a cada RELOAD_COOLDOWN_MS para nunca entrar
*   em loop na maquininha.
*/
var SIGNATURE_KEY = "pos:build-signature";
var RELOAD_AT_KEY = "pos:last-hard-reload";
var RELOAD_COOLDOWN_MS = 6e4;
var ASSET_RE = /\/(?:_build\/)?assets\/[A-Za-z0-9._@-]+\.(?:js|css)/g;
function readStore(key) {
	try {
		return window.sessionStorage.getItem(key);
	} catch (_unused) {
		return null;
	}
}
function writeStore(key, value) {
	try {
		window.sessionStorage.setItem(key, value);
	} catch (_unused2) {}
}
/** Assinatura dos assets já carregados nesta página. */
function getLocalBuildSignature() {
	if (typeof document === "undefined") return "";
	const urls = Array.from(document.querySelectorAll("script[src],link[rel=stylesheet][href]")).map((el) => "src" in el ? el.src : el.href).map((url) => url.replace(window.location.origin, "")).filter((url) => ASSET_RE.test(`${url}`));
	ASSET_RE.lastIndex = 0;
	return Array.from(new Set(urls)).sort().join("|");
}
/** Assinatura publicada agora no servidor (sempre no-store). */
async function fetchRemoteBuildSignature(path = "/pos") {
	try {
		const res = await fetch(`${path}?_cachebust=${Date.now()}`, {
			cache: "no-store",
			credentials: "same-origin",
			headers: {
				"Cache-Control": "no-cache",
				Pragma: "no-cache"
			}
		});
		if (!res.ok) return null;
		const found = (await res.text()).match(ASSET_RE);
		if (!(found === null || found === void 0 ? void 0 : found.length)) return null;
		return Array.from(new Set(found)).sort().join("|");
	} catch (_unused3) {
		return null;
	}
}
/** Remove service workers e caches antigos que travam a versão na maquininha. */
async function purgeBrowserCaches() {
	if (typeof window === "undefined") return;
	try {
		if ("serviceWorker" in navigator) {
			const regs = await navigator.serviceWorker.getRegistrations();
			await Promise.all(regs.map((reg) => reg.unregister().catch(() => false)));
		}
	} catch (_unused4) {}
	try {
		if ("caches" in window) {
			const keys = await caches.keys();
			await Promise.all(keys.map((key) => caches.delete(key).catch(() => false)));
		}
	} catch (_unused5) {}
}
function canHardReload() {
	var _readStore;
	const last = Number((_readStore = readStore(RELOAD_AT_KEY)) !== null && _readStore !== void 0 ? _readStore : 0);
	return !Number.isFinite(last) || Date.now() - last > RELOAD_COOLDOWN_MS;
}
/** Recarrega descartando cache, com trava anti-loop. */
async function hardReload() {
	if (!canHardReload()) return;
	writeStore(RELOAD_AT_KEY, String(Date.now()));
	await purgeBrowserCaches();
	const url = new URL(window.location.href);
	url.searchParams.set("_v", String(Date.now()));
	window.location.replace(url.toString());
}
/**
* Compara a build local com a publicada e recarrega se houver versão nova.
* Retorna true quando disparou a recarga.
*/
async function checkForNewBuild() {
	if (typeof window === "undefined") return false;
	const local = getLocalBuildSignature() || readStore(SIGNATURE_KEY) || "";
	const remote = await fetchRemoteBuildSignature();
	if (!remote) return false;
	if (!local) {
		writeStore(SIGNATURE_KEY, remote);
		return false;
	}
	if (local === remote) {
		writeStore(SIGNATURE_KEY, remote);
		return false;
	}
	writeStore(SIGNATURE_KEY, remote);
	if (!canHardReload()) return false;
	await hardReload();
	return true;
}
var POS_CACHE_POLL_MS = 12e4;
/**
* Mantém o terminal POS sempre na última versão publicada:
* - remove service workers/caches herdados no primeiro carregamento;
* - verifica nova build ao montar, ao voltar o foco e a cada 2 min;
* - oferece botão manual de atualização forçada.
*/
function PosCacheGuard({ className }) {
	const [refreshing, setRefreshing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		purgeBrowserCaches().then(() => {
			if (!cancelled) checkForNewBuild();
		});
		const onFocus = () => {
			if (document.visibilityState === "visible") checkForNewBuild();
		};
		const timer = window.setInterval(() => void checkForNewBuild(), POS_CACHE_POLL_MS);
		document.addEventListener("visibilitychange", onFocus);
		window.addEventListener("online", onFocus);
		return () => {
			cancelled = true;
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", onFocus);
			window.removeEventListener("online", onFocus);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		type: "button",
		variant: "ghost",
		size: "sm",
		onClick: (0, import_react.useCallback)(async () => {
			setRefreshing(true);
			await hardReload();
			setRefreshing(false);
		}, []),
		disabled: refreshing,
		"aria-label": "Atualizar versão do sistema",
		className: cn("h-8 gap-1.5 px-2 text-xs font-medium text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
			className: cn("h-3.5 w-3.5", refreshing && "animate-spin"),
			"aria-hidden": "true"
		}), "Atualizar"]
	});
}
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v);
var TABS = [
	{
		to: "/pos/vender",
		label: "Vender",
		icon: ShoppingBag
	},
	{
		to: "/pos/clientes",
		label: "Clientes",
		icon: Users
	},
	{
		to: "/pos/pedidos",
		label: "Pedidos",
		icon: ListChecks
	}
];
function useDaySales() {
	return useQuery({
		queryKey: ["pos", "day-sales"],
		queryFn: async () => {
			const today = /* @__PURE__ */ new Date();
			today.setHours(0, 0, 0, 0);
			const { data, error } = await supabase.from("orders").select("total").eq("status", "PAGO").gte("created_at", today.toISOString());
			if (error) throw error;
			const rows = data !== null && data !== void 0 ? data : [];
			return {
				count: rows.length,
				total: rows.reduce((s, r) => {
					var _r$total;
					return s + Number((_r$total = r.total) !== null && _r$total !== void 0 ? _r$total : 0);
				}, 0)
			};
		}
	});
}
function PosShell({ children }) {
	var _daySales$count, _daySales$total, _user$email;
	const { user } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { data: daySales } = useDaySales();
	const showSummary = pathname.startsWith("/pos/vender") || pathname === "/pos";
	const { mode, scale, cycle } = usePosDensity();
	const printerReady = printerDiagnostics().bridge !== "nenhuma";
	(0, import_react.useEffect)(() => {
		getPrinterPref();
	}, []);
	(0, import_react.useEffect)(() => {
		const links = Array.from(document.querySelectorAll("link[rel=\"manifest\"]"));
		const previous = links.map((l) => l.getAttribute("href"));
		links.forEach((l, i) => {
			if (i === 0) l.setAttribute("href", "/manifest-pos.webmanifest?v=3");
			else l.remove();
		});
		return () => {
			const current = document.querySelector("link[rel=\"manifest\"]");
			if (current && previous[0]) current.setAttribute("href", previous[0]);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pos-root min-h-screen flex flex-col",
		style: {
			background: V2.LIGHT_BG,
			color: V2.LIGHT_TEXT,
			zoom: scale
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-12 px-3 flex items-center justify-between border-b",
				style: {
					borderColor: V2.LIGHT_BORDER,
					background: V2.LIGHT_SURFACE
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/pos/vender",
					className: "flex items-center gap-2 font-bold text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: V2.TEAL },
						children: "●"
					}), " POS Prime"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs",
					children: [
						showSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden sm:flex items-center gap-2 px-2 py-1 rounded-md text-[10px] font-semibold",
							style: { background: V2.LIGHT_BG },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								style: { color: V2.LIGHT_MUTED },
								children: [(_daySales$count = daySales === null || daySales === void 0 ? void 0 : daySales.count) !== null && _daySales$count !== void 0 ? _daySales$count : 0, " vendas"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: V2.TEAL },
								children: brl((_daySales$total = daySales === null || daySales === void 0 ? void 0 : daySales.total) !== null && _daySales$total !== void 0 ? _daySales$total : 0)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate max-w-[140px] hidden sm:inline",
							style: { color: V2.LIGHT_MUTED },
							children: (_user$email = user === null || user === void 0 ? void 0 : user.email) !== null && _user$email !== void 0 ? _user$email : "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: cycle,
							className: "px-1.5 py-1 rounded text-[10px] font-bold border",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_MUTED
							},
							"aria-label": "Alternar tamanho da tela",
							title: `Densidade: ${mode} (${Math.round(scale * 100)}%)`,
							children: mode === "auto" ? "A" : mode === "compact" ? "S" : "M"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/pos/teste",
							onContextMenu: (e) => {
								e.preventDefault();
								alert(JSON.stringify(printerDiagnostics(), null, 2));
							},
							className: "flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-bold border",
							style: {
								borderColor: V2.LIGHT_BORDER,
								color: printerReady ? V2.TEAL : V2.LIGHT_MUTED
							},
							"aria-label": "Testar impressora interna",
							title: printerReady ? "Impressora interna conectada — abrir teste" : "Abrir teste de impressão",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, { className: "h-3.5 w-3.5" }), printerReady ? "Q2I OK" : "SEM APP"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosCacheGuard, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => supabase.auth.signOut(),
							className: "p-1.5 rounded hover:bg-black/5",
							"aria-label": "Sair",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {
								className: "h-4 w-4",
								style: { color: V2.LIGHT_MUTED }
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 overflow-y-auto pb-[68px]",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed bottom-0 left-0 right-0 h-[64px] border-t grid grid-cols-3",
				style: {
					background: V2.LIGHT_SURFACE,
					borderColor: V2.LIGHT_BORDER
				},
				children: TABS.map((t) => {
					const Icon = t.icon;
					const active = pathname.startsWith(t.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: t.to,
						className: cn("flex flex-col items-center justify-center gap-1 text-[11px] font-medium"),
						style: { color: active ? V2.TEAL : V2.LIGHT_MUTED },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" }), t.label]
					}, t.to);
				})
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
//#endregion
export { SplitComponent as component };
