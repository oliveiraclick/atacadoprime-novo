import { o as __toESM } from "../_runtime.mjs";
import { _ as string, a as createTanStackListToolsHandler, f as _enum, h as number, i as createTanStackInvokeToolHandler, m as boolean, n as defineMcp, o as createTanStackMcpHandler, r as defineTool, s as createTanStackOAuthProtectedResourceMetadataHandler, t as auth } from "../_libs/@lovable.dev/mcp-js.mjs";
import { t as QueryClient } from "../_libs/@tanstack/query-core.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { M as redirect, _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "../_._lovable.oauth.consent-C4TjBOHP.mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { r as signedOrderPdfPath, t as Route$130 } from "./pdf-CsVsL9dt.mjs";
import { t as orderCode } from "./order-code-C-NI66BU.mjs";
import { t as Route$131 } from "../_id-CLQlsMny.mjs";
import { i as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { E as ShoppingCart, a as WifiOff } from "../_libs/lucide-react.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { n as processPendingMutations } from "./offline-mutations-BlLFZEVf.mjs";
import { t as Route$132 } from "./auth-vtiT1QDN.mjs";
import { n as useOnlineStatus, t as syncOfflineSales } from "./offline-sync-DZ35t7yP.mjs";
import { n as productsQueryOptions, t as categoriesQueryOptions } from "./routes-DTnN_21C.mjs";
import { t as Route$133 } from "./v3.vendas.nova-R0G9laJx.mjs";
import { t as persistQueryClient } from "../_libs/@tanstack/query-persist-client-core+[...].mjs";
import { t as createSyncStoragePersister } from "../_libs/@tanstack/query-sync-storage-persister+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-B7ykZuvi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DSoNDaxv.css";
function reportLovableError(error, context = {}) {
	var _window$__lovableEven, _window$__lovableEven2;
	if (typeof window === "undefined") return;
	(_window$__lovableEven = window.__lovableEvents) === null || _window$__lovableEven === void 0 || (_window$__lovableEven2 = _window$__lovableEven.captureException) === null || _window$__lovableEven2 === void 0 || _window$__lovableEven2.call(_window$__lovableEven, error, _objectSpread2({
		source: "react_error_boundary",
		route: window.location.pathname
	}, context), {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function _objectDestructuringEmpty(t) {
	if (null == t) throw new TypeError("Cannot destructure " + t);
}
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var Toaster$1 = (_ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, _objectSpread2({
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} }
	}, _extends({}, (_objectDestructuringEmpty(_ref), _ref))));
};
function OfflineBanner() {
	if (useOnlineStatus()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		"aria-live": "polite",
		className: "fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 rounded-full bg-slate-900 text-white px-4 py-2 shadow-lg text-sm font-medium",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "h-4 w-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Offline — dados em cache" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "/vendas-offline",
				className: "flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1 text-xs font-semibold transition",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-3 w-3" }), " Vender"]
			})
		]
	});
}
function registerPWA() {
	if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;
	navigator.serviceWorker.getRegistrations().then((registrations) => {
		registrations.forEach((registration) => {
			var _ref, _registration$active$, _registration$active, _registration$waiting;
			if (((_ref = (_registration$active$ = (_registration$active = registration.active) === null || _registration$active === void 0 ? void 0 : _registration$active.scriptURL) !== null && _registration$active$ !== void 0 ? _registration$active$ : (_registration$waiting = registration.waiting) === null || _registration$waiting === void 0 ? void 0 : _registration$waiting.scriptURL) !== null && _ref !== void 0 ? _ref : "").endsWith("/sw.js")) registration.unregister();
		});
	});
}
function setupQueryPersistence(queryClient) {
	if (typeof window === "undefined") return;
	persistQueryClient({
		queryClient,
		persister: createSyncStoragePersister({
			storage: window.localStorage,
			key: "atacado-prime-query-cache-v1",
			throttleTime: 1e3
		}),
		maxAge: 1e3 * 60 * 60 * 24 * 7,
		buster: "v1",
		dehydrateOptions: { shouldDehydrateQuery: (q) => {
			if (q.state.status !== "success") return false;
			const key = q.queryKey[0];
			if (typeof key !== "string") return false;
			if ([
				"profile",
				"roles",
				"my-company"
			].includes(key)) return false;
			return true;
		} }
	});
}
/**
* Log de erros do frontend para tabela central `error_logs`.
* Usar em catch blocks e ErrorBoundary.
*/
async function logError(params) {
	try {
		var _session$session$user, _session$session, _params$nivel, _params$stack, _params$contexto;
		const { data: session } = await supabase.auth.getSession();
		await supabase.from("error_logs").insert({
			user_id: (_session$session$user = (_session$session = session.session) === null || _session$session === void 0 ? void 0 : _session$session.user.id) !== null && _session$session$user !== void 0 ? _session$session$user : null,
			origem: "FRONTEND",
			nivel: (_params$nivel = params.nivel) !== null && _params$nivel !== void 0 ? _params$nivel : "ERROR",
			mensagem: params.mensagem.slice(0, 2e3),
			stack: (_params$stack = params.stack) === null || _params$stack === void 0 ? void 0 : _params$stack.slice(0, 8e3),
			contexto: (_params$contexto = params.contexto) !== null && _params$contexto !== void 0 ? _params$contexto : null,
			url: typeof window !== "undefined" ? window.location.href : null,
			user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null
		});
	} catch (_unused) {}
}
/**
* Instala captura global de erros e promise rejections não tratadas.
*/
function installGlobalErrorCapture() {
	if (typeof window === "undefined") return;
	window.addEventListener("error", (e) => {
		var _e$error;
		logError({
			mensagem: e.message,
			stack: (_e$error = e.error) === null || _e$error === void 0 ? void 0 : _e$error.stack,
			nivel: "ERROR"
		});
	});
	window.addEventListener("unhandledrejection", (e) => {
		var _reason$message;
		const reason = e.reason;
		logError({
			mensagem: (_reason$message = reason === null || reason === void 0 ? void 0 : reason.message) !== null && _reason$message !== void 0 ? _reason$message : String(reason),
			stack: reason === null || reason === void 0 ? void 0 : reason.stack,
			nivel: "ERROR",
			contexto: { type: "unhandledrejection" }
		});
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$129 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "Atacado Prime — Portal B2B" },
			{
				name: "description",
				content: "Atacado Prime — plataforma de gestão atacadista com CRM, pedidos, BI e operações de campo."
			},
			{
				name: "theme-color",
				content: "#faf8f5"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "default"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Atacado Prime"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				property: "og:site_name",
				content: "Atacado Prime"
			},
			{
				property: "og:title",
				content: "Atacado Prime — Portal B2B"
			},
			{
				property: "og:description",
				content: "Atacado Prime — plataforma de gestão atacadista com CRM, pedidos, BI e operações de campo."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:title",
				content: "Atacado Prime — Portal B2B"
			},
			{
				name: "twitter:description",
				content: "Atacado Prime — plataforma de gestão atacadista com CRM, pedidos, BI e operações de campo."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bfda9f81-3bf4-4092-94c8-c8df6ef6dd70/id-preview-e8789d90--f6fdd83d-738f-496c-8445-a3838d9aa7cf.lovable.app-1781793668643.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bfda9f81-3bf4-4092-94c8-c8df6ef6dd70/id-preview-e8789d90--f6fdd83d-738f-496c-8445-a3838d9aa7cf.lovable.app-1781793668643.png"
			},
			{
				property: "og:url",
				content: "https://primeautomotive.app/"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest?v=4"
			},
			{
				rel: "icon",
				href: "/favicon.ico?v=5"
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png?v=5"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png?v=5"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "Atacado Prime",
				url: "https://primeautomotive.app/",
				logo: "https://primeautomotive.app/apple-touch-icon.png",
				contactPoint: {
					"@type": "ContactPoint",
					telephone: "+55-34-99865-1112",
					contactType: "sales",
					email: "contato@primeautomotive.app",
					areaServed: "BR",
					availableLanguage: ["Portuguese"]
				},
				address: {
					"@type": "PostalAddress",
					addressLocality: "Uberlândia",
					addressRegion: "MG",
					addressCountry: "BR"
				}
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
var BOOT_WATCHDOG = `
(function(){
  if (typeof globalThis === "undefined") { (function() { if (typeof self !== "undefined") { self.globalThis = self; } else if (typeof window !== "undefined") { window.globalThis = window; } })(); }
  // Watchdog somente na maquininha POS (rotas /pos). Em desktop/preview nao exibe nada.
  if (!/^\\/pos(\\/|$)/.test(location.pathname)) return;
  var err = null;
  window.addEventListener('error', function(e){ err = (e && (e.message || (e.error && e.error.message))) || 'erro de script'; }, true);

  window.addEventListener('unhandledrejection', function(e){ err = 'promise: ' + ((e && e.reason && (e.reason.message || e.reason)) || '?'); });
  setTimeout(function(){
  if (typeof globalThis === "undefined") { (function() { if (typeof self !== "undefined") { self.globalThis = self; } else if (typeof window !== "undefined") { window.globalThis = window; } })(); }
    if (window.__APP_BOOTED) return;
    var d = document.createElement('div');
    d.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#faf8f5;color:#1c1917;font:13px/1.5 system-ui,sans-serif;padding:16px;overflow:auto');
    d.innerHTML = '<div style="font-weight:800;font-size:15px;margin-bottom:8px">O app nao iniciou nesta maquina</div>'
      + '<div style="margin-bottom:8px">Motivo: <b>' + (err ? String(err).slice(0,200) : 'carregamento travado / sem resposta') + '</b></div>'
      + '<div style="margin-bottom:12px;word-break:break-all;color:#78716c">' + navigator.userAgent + '</div>'
      + '<button id="bw-r" style="width:100%;min-height:46px;border:0;border-radius:10px;background:#0d7377;color:#fff;font-weight:700">Tentar de novo</button>'
      + '<button id="bw-c" style="margin-top:8px;width:100%;min-height:46px;border:1px solid #e7e5e4;border-radius:10px;background:#fff;font-weight:700">Limpar cache e recarregar</button>';
    document.body.appendChild(d);
    document.getElementById('bw-r').onclick = function(){ location.reload(); };
    document.getElementById('bw-c').onclick = function(){
      try {
        if (navigator.serviceWorker) navigator.serviceWorker.getRegistrations().then(function(rs){ rs.forEach(function(r){ r.unregister(); }); });
        if (window.caches) caches.keys().then(function(ks){ ks.forEach(function(k){ caches.delete(k); }); });
      } catch (_) {}
      setTimeout(function(){
  if (typeof globalThis === "undefined") { (function() { if (typeof self !== "undefined") { self.globalThis = self; } else if (typeof window !== "undefined") { window.globalThis = window; } })(); } location.replace(location.pathname + '?nocache=' + Date.now()); }, 600);
    };
  }, 12000);
})();
`;
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "pt-BR",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", { dangerouslySetInnerHTML: { __html: BOOT_WATCHDOG } })
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$129.useRouteContext();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || typeof navigator === "undefined") return;
		const isOfflineSafeRoute = (path) => path === "/pos" || path.startsWith("/pos/") || path === "/vendas-offline" || path === "/field/venda-offline" || path === "/offline-pendentes" || path === "/offline-route";
		const redirectToOfflineMode = () => {
			if (navigator.onLine || isOfflineSafeRoute(window.location.pathname)) return;
			navigate({
				to: "/vendas-offline",
				replace: true
			});
		};
		redirectToOfflineMode();
		window.addEventListener("offline", redirectToOfflineMode);
		return () => window.removeEventListener("offline", redirectToOfflineMode);
	}, [navigate, useRouterState({ select: (s) => s.location.pathname })]);
	(0, import_react.useEffect)(() => {
		window.__APP_BOOTED = true;
		setupQueryPersistence(queryClient);
		registerPWA();
		installGlobalErrorCapture();
		const runSync = async () => {
			try {
				var _data$user;
				await processPendingMutations();
				const { data } = await supabase.auth.getUser();
				if ((_data$user = data.user) === null || _data$user === void 0 ? void 0 : _data$user.id) await syncOfflineSales(data.user.id);
			} catch (_unused) {}
		};
		const warmOfflineCatalog = async () => {
			if (typeof navigator !== "undefined" && !navigator.onLine) return;
			try {
				const { loadCachedCatalog, syncCatalogFromServer } = await import("./offline-store-Ddf--0UV.mjs").then((n) => n.i).then((n) => n.i);
				const cached = await loadCachedCatalog();
				if (!(!cached.syncedAt || Date.now() - cached.syncedAt > 6 * 3600 * 1e3) && cached.products.length > 0) return;
				await syncCatalogFromServer();
			} catch (_unused2) {}
		};
		const onOnline = () => void runSync();
		const onOnlineWarm = () => void warmOfflineCatalog();
		window.addEventListener("online", onOnline);
		window.addEventListener("online", onOnlineWarm);
		if (typeof navigator === "undefined" || navigator.onLine) runSync();
		if (typeof navigator === "undefined" || navigator.onLine) warmOfflineCatalog();
		return () => {
			window.removeEventListener("online", onOnline);
			window.removeEventListener("online", onOnlineWarm);
		};
	}, [queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineBanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				position: "top-right",
				offset: {
					top: "calc(16px + var(--app-safe-top))",
					right: 16
				},
				mobileOffset: {
					top: "calc(12px + var(--app-safe-top))",
					right: 12,
					left: 12
				}
			})
		]
	});
}
var $$splitNotFoundComponentImporter$2 = () => import("./routes-Cx4wl_dX.mjs");
var $$splitErrorComponentImporter$3 = () => import("./routes-WTbgf9ll.mjs");
var $$splitComponentImporter$71 = () => import("./routes-BIst0wBT.mjs");
var Route$128 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Atacado Prime — Chaves, capas e controles automotivos no atacado" },
			{
				name: "description",
				content: "Chaves, capas e controles Pósitron, Olimpus, Sistec, Hinor, Bravo e mais — preço de atacado para revendedores em todo o Brasil."
			},
			{
				property: "og:title",
				content: "Atacado Prime — Chaves, capas e controles automotivos no atacado"
			},
			{
				property: "og:description",
				content: "Chaves, capas e controles Pósitron, Olimpus, Sistec, Hinor, Bravo e mais — preço de atacado para revendedores."
			},
			{
				property: "og:url",
				content: "https://primeautomotive.app/"
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://primeautomotive.app/"
		}]
	}),
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(categoriesQueryOptions());
		await context.queryClient.ensureQueryData(productsQueryOptions());
	},
	component: lazyRouteComponent($$splitComponentImporter$71, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$3, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$2, "notFoundComponent")
});
var $$splitComponentImporter$70 = () => import("./route-CflZRHcy.mjs");
var Route$127 = createFileRoute("/_authenticated")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$70, "component")
});
var Route$126 = createFileRoute("/catalog")({ beforeLoad: ({ search }) => {
	throw redirect({
		to: "/v3",
		search
	});
} });
/** Cliente Supabase agindo como o usuário autenticado via OAuth (RLS aplicada). */
function supabaseForUser(ctx) {
	return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, {
		global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
		auth: {
			persistSession: false,
			autoRefreshToken: false
		}
	});
}
function textResult(text, structured) {
	return structured ? {
		content: [{
			type: "text",
			text
		}],
		structuredContent: structured
	} : { content: [{
		type: "text",
		text
	}] };
}
function errorResult(message) {
	return {
		content: [{
			type: "text",
			text: message
		}],
		isError: true
	};
}
var brl = (v) => new Intl.NumberFormat("pt-BR", {
	style: "currency",
	currency: "BRL"
}).format(v || 0);
function iso(d) {
	return d.toISOString().slice(0, 10);
}
/** Converte um período nomeado (ou datas explícitas) em intervalo [de, ate] inclusivo. */
function resolvePeriodo(periodo, de, ate) {
	if (periodo === "personalizado") {
		if (!de || !ate) throw new Error("Para periodo 'personalizado' informe de e ate (YYYY-MM-DD).");
		return {
			de,
			ate,
			label: `${de} a ${ate}`
		};
	}
	const hoje = /* @__PURE__ */ new Date();
	hoje.setHours(0, 0, 0, 0);
	const y = hoje.getFullYear();
	const m = hoje.getMonth();
	switch (periodo) {
		case "hoje": return {
			de: iso(hoje),
			ate: iso(hoje),
			label: "hoje"
		};
		case "ontem": {
			const o = new Date(hoje);
			o.setDate(o.getDate() - 1);
			return {
				de: iso(o),
				ate: iso(o),
				label: "ontem"
			};
		}
		case "semana": {
			const ini = new Date(hoje);
			ini.setDate(ini.getDate() - ini.getDay());
			return {
				de: iso(ini),
				ate: iso(hoje),
				label: "esta semana"
			};
		}
		case "mes": return {
			de: iso(new Date(y, m, 1)),
			ate: iso(new Date(y, m + 1, 0)),
			label: "este mês"
		};
		case "mes_passado": return {
			de: iso(new Date(y, m - 1, 1)),
			ate: iso(new Date(y, m, 0)),
			label: "mês passado"
		};
	}
}
/** Offset fixo de Brasília — evita que o Postgres (UTC) puxe vendas do dia anterior. */
var BR_OFFSET = "-03:00";
/** Fim do dia (horário de Brasília) em ISO para comparar com colunas timestamptz. */
function endOfDayIso(date) {
	return `${date}T23:59:59.999${BR_OFFSET}`;
}
function startOfDayIso(date) {
	return `${date}T00:00:00.000${BR_OFFSET}`;
}
var vendas_resumo_default = defineTool({
	name: "vendas_resumo",
	title: "Resumo de vendas",
	description: "Resumo de vendas (todos os pedidos exceto cancelados) em um período: quantidade de pedidos, faturamento total, ticket médio, divisão por forma de pagamento e divisão por cidade do cliente.",
	inputSchema: {
		periodo: _enum([
			"hoje",
			"ontem",
			"semana",
			"mes",
			"mes_passado",
			"personalizado"
		]).describe("Período das vendas."),
		de: string().nullable().optional().describe("Data inicial YYYY-MM-DD (só para periodo=personalizado)."),
		ate: string().nullable().optional().describe("Data final YYYY-MM-DD (só para periodo=personalizado).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ periodo, de, ate }, ctx) => {
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		try {
			const range = resolvePeriodo(periodo, de, ate);
			const { data, error } = await supabaseForUser(ctx).from("orders").select("id,total,created_at,companies(trade_name,legal_name,cidade),payments(tipo,valor)").neq("status", "CANCELADO").gte("created_at", startOfDayIso(range.de)).lte("created_at", endOfDayIso(range.ate)).order("created_at", { ascending: false });
			if (error) return errorResult(error.message);
			const rows = data !== null && data !== void 0 ? data : [];
			const total = rows.reduce((s, r) => {
				var _r$total;
				return s + Number((_r$total = r.total) !== null && _r$total !== void 0 ? _r$total : 0);
			}, 0);
			const porPagamento = {};
			const porCidade = {};
			for (const r of rows) {
				var _r$payments, _comp$cidade, _porCidade$cidade, _r$total2;
				for (const p of (_r$payments = r.payments) !== null && _r$payments !== void 0 ? _r$payments : []) {
					var _p$tipo, _porPagamento$k, _p$valor;
					const k = (_p$tipo = p.tipo) !== null && _p$tipo !== void 0 ? _p$tipo : "OUTRO";
					porPagamento[k] = ((_porPagamento$k = porPagamento[k]) !== null && _porPagamento$k !== void 0 ? _porPagamento$k : 0) + Number((_p$valor = p.valor) !== null && _p$valor !== void 0 ? _p$valor : 0);
				}
				const comp = r.companies;
				const cidade = (comp === null || comp === void 0 || (_comp$cidade = comp.cidade) === null || _comp$cidade === void 0 ? void 0 : _comp$cidade.trim()) || "Sem cidade";
				const acc = (_porCidade$cidade = porCidade[cidade]) !== null && _porCidade$cidade !== void 0 ? _porCidade$cidade : {
					pedidos: 0,
					total: 0
				};
				acc.pedidos += 1;
				acc.total += Number((_r$total2 = r.total) !== null && _r$total2 !== void 0 ? _r$total2 : 0);
				porCidade[cidade] = acc;
			}
			const ticket = rows.length ? total / rows.length : 0;
			const cidadesOrdenadas = Object.entries(porCidade).sort((a, b) => b[1].total - a[1].total);
			const linhas = [
				`Vendas (${range.label} — ${range.de} a ${range.ate})`,
				`Pedidos: ${rows.length}`,
				`Faturamento: ${brl(total)}`,
				`Ticket médio: ${brl(ticket)}`,
				`Cidades atendidas: ${cidadesOrdenadas.length}`,
				"",
				"Por forma de pagamento:",
				...Object.entries(porPagamento).map(([k, v]) => `- ${k}: ${brl(v)}`)
			];
			if (!Object.keys(porPagamento).length) linhas.push("- (sem pagamentos registrados)");
			linhas.push("", "Por cidade:");
			if (cidadesOrdenadas.length) linhas.push(...cidadesOrdenadas.map(([c, v]) => `- ${c}: ${v.pedidos} pedido(s) · ${brl(v.total)}`));
			else linhas.push("- (sem pedidos no período)");
			return textResult(linhas.join("\n"), {
				periodo: range,
				pedidos: rows.length,
				faturamento: total,
				ticket_medio: ticket,
				por_pagamento: porPagamento,
				cidades_atendidas: cidadesOrdenadas.length,
				por_cidade: Object.fromEntries(cidadesOrdenadas)
			});
		} catch (e) {
			return errorResult(e instanceof Error ? e.message : String(e));
		}
	}
});
var clientes_inativos_default = defineTool({
	name: "clientes_inativos",
	title: "Clientes sem comprar",
	description: "Lista clientes aprovados que estão há mais de N dias sem comprar, ordenados do mais tempo parado para o menos. Pode filtrar por cidade.",
	inputSchema: {
		dias: number().int().describe("Mínimo de dias sem compra (ex.: 30)."),
		cidade: string().nullable().optional().describe("Filtra por cidade do cliente."),
		limite: number().int().nullable().optional().describe("Máximo de clientes retornados (padrão 20).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ dias, cidade, limite }, ctx) => {
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		const supabase = supabaseForUser(ctx);
		let q = supabase.from("companies").select("id,trade_name,legal_name,cidade,estado,phone").eq("status", "approved");
		if (cidade) q = q.ilike("cidade", `%${cidade}%`);
		const { data: companies, error } = await q.limit(500);
		if (error) return errorResult(error.message);
		const { data: orders, error: oErr } = await supabase.from("orders").select("company_id,created_at,total").eq("status", "PAGO").order("created_at", { ascending: false }).limit(2e3);
		if (oErr) return errorResult(oErr.message);
		const ultima = /* @__PURE__ */ new Map();
		for (const o of orders !== null && orders !== void 0 ? orders : []) if (o.company_id && !ultima.has(o.company_id)) ultima.set(o.company_id, o.created_at);
		const agora = Date.now();
		const lista = (companies !== null && companies !== void 0 ? companies : []).map((c) => {
			var _c$cidade, _c$estado, _c$phone;
			const last = ultima.get(c.id);
			const d = last ? Math.floor((agora - new Date(last).getTime()) / 864e5) : 9999;
			return {
				nome: c.trade_name || c.legal_name,
				cidade: (_c$cidade = c.cidade) !== null && _c$cidade !== void 0 ? _c$cidade : "—",
				estado: (_c$estado = c.estado) !== null && _c$estado !== void 0 ? _c$estado : "—",
				telefone: (_c$phone = c.phone) !== null && _c$phone !== void 0 ? _c$phone : null,
				dias_sem_compra: d,
				ultima_compra: last !== null && last !== void 0 ? last : null
			};
		}).filter((c) => c.dias_sem_compra >= dias).sort((a, b) => b.dias_sem_compra - a.dias_sem_compra).slice(0, limite !== null && limite !== void 0 ? limite : 20);
		if (!lista.length) return textResult(`Nenhum cliente com ${dias}+ dias sem comprar.`, { clientes: [] });
		return textResult([`${lista.length} cliente(s) há ${dias}+ dias sem comprar${cidade ? ` em ${cidade}` : ""}:`, ...lista.map((c) => `- ${c.nome} (${c.cidade}/${c.estado}) — ${c.dias_sem_compra === 9999 ? "nunca comprou" : `${c.dias_sem_compra} dias`}${c.telefone ? ` · ${c.telefone}` : ""}`)].join("\n"), { clientes: lista });
	}
});
var estoque_critico_default = defineTool({
	name: "estoque_critico",
	title: "Estoque crítico",
	description: "Lista produtos ativos com estoque igual ou abaixo do estoque mínimo, com preço de venda, custo e margem.",
	inputSchema: {
		limite: number().int().nullable().optional().describe("Máximo de produtos retornados (padrão 30)."),
		busca: string().nullable().optional().describe("Filtra por nome ou SKU do produto.")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ limite, busca }, ctx) => {
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		let q = supabaseForUser(ctx).from("products").select("nome,sku,estoque,estoque_minimo,preco_unitario,preco_custo,localizacao").eq("status", true);
		if (busca) q = q.or(`nome.ilike.%${busca}%,sku.ilike.%${busca}%`);
		const { data, error } = await q.order("estoque", { ascending: true }).limit(500);
		if (error) return errorResult(error.message);
		const lista = (data !== null && data !== void 0 ? data : []).filter((p) => {
			var _p$estoque, _p$estoque_minimo;
			return Number((_p$estoque = p.estoque) !== null && _p$estoque !== void 0 ? _p$estoque : 0) <= Number((_p$estoque_minimo = p.estoque_minimo) !== null && _p$estoque_minimo !== void 0 ? _p$estoque_minimo : 0);
		}).slice(0, limite !== null && limite !== void 0 ? limite : 30).map((p) => {
			var _p$preco_unitario, _p$preco_custo, _p$estoque2, _p$estoque_minimo2;
			const venda = Number((_p$preco_unitario = p.preco_unitario) !== null && _p$preco_unitario !== void 0 ? _p$preco_unitario : 0);
			const custo = Number((_p$preco_custo = p.preco_custo) !== null && _p$preco_custo !== void 0 ? _p$preco_custo : 0);
			const margem = venda > 0 ? (venda - custo) / venda * 100 : 0;
			return {
				nome: p.nome,
				sku: p.sku,
				estoque: Number((_p$estoque2 = p.estoque) !== null && _p$estoque2 !== void 0 ? _p$estoque2 : 0),
				estoque_minimo: Number((_p$estoque_minimo2 = p.estoque_minimo) !== null && _p$estoque_minimo2 !== void 0 ? _p$estoque_minimo2 : 0),
				preco_unitario: venda,
				preco_custo: custo,
				margem_percentual: Number(margem.toFixed(1))
			};
		});
		if (!lista.length) return textResult("Nenhum produto abaixo do estoque mínimo.", { produtos: [] });
		return textResult([`${lista.length} produto(s) em estoque crítico:`, ...lista.map((p) => {
			var _p$sku;
			return `- ${p.nome} (${(_p$sku = p.sku) !== null && _p$sku !== void 0 ? _p$sku : "s/ SKU"}) — ${p.estoque}/${p.estoque_minimo} un · venda ${brl(p.preco_unitario)} · custo ${brl(p.preco_custo)} · margem ${p.margem_percentual}%`;
		})].join("\n"), { produtos: lista });
	}
});
var resultado_periodo_default = defineTool({
	name: "resultado_periodo",
	title: "Resultado do período",
	description: "Demonstrativo do período: faturamento, custo das peças vendidas, taxas de cartão, despesas de viagem e lucro líquido com margem.",
	inputSchema: {
		periodo: _enum([
			"hoje",
			"ontem",
			"semana",
			"mes",
			"mes_passado",
			"personalizado"
		]).describe("Período do resultado."),
		de: string().nullable().optional().describe("Data inicial YYYY-MM-DD (só para periodo=personalizado)."),
		ate: string().nullable().optional().describe("Data final YYYY-MM-DD (só para periodo=personalizado).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ periodo, de, ate }, ctx) => {
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		try {
			var _ordersRes$data, _taxasRes$data, _despesasRes$data;
			const range = resolvePeriodo(periodo, de, ate);
			const supabase = supabaseForUser(ctx);
			const inicio = startOfDayIso(range.de);
			const fim = endOfDayIso(range.ate);
			const [ordersRes, taxasRes, despesasRes] = await Promise.all([
				supabase.from("orders").select("id,total,order_items(quantidade,custo_unitario)").neq("status", "CANCELADO").gte("created_at", inicio).lte("created_at", fim),
				supabase.from("financial_transactions").select("taxas").gte("created_at", inicio).lte("created_at", fim),
				supabase.from("trip_expenses").select("valor").gte("data", range.de).lte("data", range.ate)
			]);
			if (ordersRes.error) return errorResult(ordersRes.error.message);
			const pedidos = (_ordersRes$data = ordersRes.data) !== null && _ordersRes$data !== void 0 ? _ordersRes$data : [];
			const faturamento = pedidos.reduce((s, o) => {
				var _o$total;
				return s + Number((_o$total = o.total) !== null && _o$total !== void 0 ? _o$total : 0);
			}, 0);
			const custo = pedidos.reduce((s, o) => {
				var _o$order_items;
				return s + ((_o$order_items = o.order_items) !== null && _o$order_items !== void 0 ? _o$order_items : []).reduce((si, i) => {
					var _i$custo_unitario, _i$quantidade;
					return si + Number((_i$custo_unitario = i.custo_unitario) !== null && _i$custo_unitario !== void 0 ? _i$custo_unitario : 0) * Number((_i$quantidade = i.quantidade) !== null && _i$quantidade !== void 0 ? _i$quantidade : 0);
				}, 0);
			}, 0);
			const taxas = ((_taxasRes$data = taxasRes.data) !== null && _taxasRes$data !== void 0 ? _taxasRes$data : []).reduce((s, t) => {
				var _t$taxas;
				return s + Number((_t$taxas = t.taxas) !== null && _t$taxas !== void 0 ? _t$taxas : 0);
			}, 0);
			const despesas = ((_despesasRes$data = despesasRes.data) !== null && _despesasRes$data !== void 0 ? _despesasRes$data : []).reduce((s, d) => {
				var _d$valor;
				return s + Number((_d$valor = d.valor) !== null && _d$valor !== void 0 ? _d$valor : 0);
			}, 0);
			const lucro = faturamento - custo - taxas - despesas;
			const margem = faturamento > 0 ? lucro / faturamento * 100 : 0;
			return textResult([
				`Resultado (${range.label} — ${range.de} a ${range.ate})`,
				`Pedidos: ${pedidos.length}`,
				`(+) Faturamento: ${brl(faturamento)}`,
				`(−) Custo das peças: ${brl(custo)}`,
				`(−) Taxas de cartão: ${brl(taxas)}`,
				`(−) Despesas de viagem: ${brl(despesas)}`,
				`(=) Lucro líquido: ${brl(lucro)} (${margem.toFixed(1)}%)`
			].join("\n"), {
				periodo: range,
				pedidos: pedidos.length,
				faturamento,
				custo,
				taxas,
				despesas,
				lucro,
				margem_percentual: Number(margem.toFixed(1))
			});
		} catch (e) {
			return errorResult(e instanceof Error ? e.message : String(e));
		}
	}
});
var buscar_pedido_default = defineTool({
	name: "buscar_pedido",
	title: "Buscar pedido",
	description: "Busca pedidos pelo código curto (ex.: #JP1234) ou pelo nome do cliente, retornando itens, total, status e forma de pagamento.",
	inputSchema: {
		busca: string().describe("Código do pedido (#JP1234) ou nome do cliente."),
		limite: number().int().nullable().optional().describe("Máximo de pedidos retornados (padrão 5).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ busca, limite }, ctx) => {
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		const supabase = supabaseForUser(ctx);
		const termo = busca.trim().replace(/^#/, "");
		const max = limite !== null && limite !== void 0 ? limite : 5;
		const { data, error } = await supabase.from("orders").select("id,total,status,created_at,companies(trade_name,legal_name,cidade),order_items(quantidade,preco_final,products(nome,sku)),payments(tipo,valor,bandeira)").order("created_at", { ascending: false }).limit(400);
		if (error) return errorResult(error.message);
		const rows = (data !== null && data !== void 0 ? data : []).map((o) => {
			var _c$cidade;
			const c = o.companies;
			const nome = (c === null || c === void 0 ? void 0 : c.trade_name) || (c === null || c === void 0 ? void 0 : c.legal_name) || "Cliente";
			return _objectSpread2(_objectSpread2({}, o), {}, {
				nome,
				cidade: (_c$cidade = c === null || c === void 0 ? void 0 : c.cidade) !== null && _c$cidade !== void 0 ? _c$cidade : "—",
				codigo: orderCode(o.id, nome)
			});
		});
		const alvo = termo.toUpperCase();
		const encontrados = rows.filter((o) => o.codigo.toUpperCase() === alvo || o.nome.toUpperCase().includes(alvo)).slice(0, max);
		if (!encontrados.length) return textResult(`Nenhum pedido encontrado para "${busca}".`, { pedidos: [] });
		return textResult(encontrados.map((o) => {
			var _o$order_items, _o$payments, _o$total;
			const itens = ((_o$order_items = o.order_items) !== null && _o$order_items !== void 0 ? _o$order_items : []).map((i) => {
				var _i$products$nome, _i$products, _i$preco_final;
				return `   · ${i.quantidade}x ${(_i$products$nome = (_i$products = i.products) === null || _i$products === void 0 ? void 0 : _i$products.nome) !== null && _i$products$nome !== void 0 ? _i$products$nome : "item"} — ${brl(Number((_i$preco_final = i.preco_final) !== null && _i$preco_final !== void 0 ? _i$preco_final : 0))}`;
			}).join("\n");
			const pgto = ((_o$payments = o.payments) !== null && _o$payments !== void 0 ? _o$payments : []).map((p) => {
				var _p$valor;
				return `${p.tipo}${p.bandeira ? ` (${p.bandeira})` : ""} ${brl(Number((_p$valor = p.valor) !== null && _p$valor !== void 0 ? _p$valor : 0))}`;
			}).join(", ");
			return [
				`#${o.codigo} — ${o.nome} (${o.cidade})`,
				`   Status: ${o.status} · Total: ${brl(Number((_o$total = o.total) !== null && _o$total !== void 0 ? _o$total : 0))} · ${new Date(o.created_at).toLocaleDateString("pt-BR")}`,
				pgto ? `   Pagamento: ${pgto}` : "   Pagamento: —",
				itens || "   (sem itens)"
			].join("\n");
		}).join("\n\n"), { pedidos: encontrados.map((o) => {
			var _o$total2;
			return {
				codigo: o.codigo,
				id: o.id,
				cliente: o.nome,
				total: Number((_o$total2 = o.total) !== null && _o$total2 !== void 0 ? _o$total2 : 0),
				status: o.status
			};
		}) });
	}
});
var contexto_despesa_default = defineTool({
	name: "contexto_despesa",
	title: "Opções para lançar despesa",
	description: "Lista as viagens abertas, as contas bancárias ativas e as categorias financeiras disponíveis. Use antes de `lancar_despesa` quando não souber em qual viagem ou conta lançar.",
	inputSchema: {},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async (_input, ctx) => {
		var _ref, _trips$error, _trips$data, _accounts$data, _cats$data;
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		const supabase = supabaseForUser(ctx);
		const [trips, accounts, cats] = await Promise.all([
			supabase.from("trips").select("id,nome,cidade,estado,status,opened_at").eq("status", "open").order("opened_at", { ascending: false }).limit(20),
			supabase.from("bank_accounts").select("id,nome,banco").eq("ativo", true).order("nome"),
			supabase.from("financial_categories").select("id,nome,tipo").order("nome")
		]);
		const err = (_ref = (_trips$error = trips.error) !== null && _trips$error !== void 0 ? _trips$error : accounts.error) !== null && _ref !== void 0 ? _ref : cats.error;
		if (err) return errorResult(err.message);
		const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
		const viagens = ((_trips$data = trips.data) !== null && _trips$data !== void 0 ? _trips$data : []).filter((t) => {
			var _t$nome;
			return !norm((_t$nome = t.nome) !== null && _t$nome !== void 0 ? _t$nome : "").startsWith("sobras");
		}).map((t) => ({
			id: t.id,
			nome: t.nome,
			cidade: [t.cidade, t.estado].filter(Boolean).join("-") || null,
			status: t.status
		}));
		const contas = ((_accounts$data = accounts.data) !== null && _accounts$data !== void 0 ? _accounts$data : []).map((a) => ({
			id: a.id,
			nome: a.nome,
			banco: a.banco
		}));
		const categorias = ((_cats$data = cats.data) !== null && _cats$data !== void 0 ? _cats$data : []).filter((c) => {
			var _c$tipo;
			return ((_c$tipo = c.tipo) !== null && _c$tipo !== void 0 ? _c$tipo : "").toUpperCase().includes("DESPESA") || !c.tipo;
		}).map((c) => ({
			id: c.id,
			nome: c.nome
		}));
		return textResult([
			"Tipos de despesa: `viagem` (vinculada a uma viagem), `empresa` (despesa operacional, sai de uma conta) ou `particular` (financeiro pessoal do usuário). Sempre pergunte qual dos três.",
			"",
			viagens.length ? `Viagens abertas:\n${viagens.map((v) => `- ${v.nome}${v.cidade ? ` (${v.cidade})` : ""} — id ${v.id}`).join("\n")}` : "Nenhuma viagem aberta válida — viagens de 'Sobras' são só controle de estoque e não aceitam despesas.",
			"",
			contas.length ? `Contas ativas:\n${contas.map((c) => `- ${c.nome}${c.banco ? ` (${c.banco})` : ""} — id ${c.id}`).join("\n")}` : "Nenhuma conta bancária ativa.",
			"",
			categorias.length ? `Categorias de despesa da empresa:\n${categorias.map((c) => `- ${c.nome} — id ${c.id}`).join("\n")}` : "",
			"",
			"Categorias de viagem: COMBUSTIVEL, HOSPEDAGEM, ALIMENTACAO, PEDAGIO, MANUTENCAO, OUTROS."
		].filter(Boolean).join("\n"), {
			viagens,
			contas,
			categorias
		});
	}
});
var UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
var CAT_VIAGEM$1 = {
	combustivel: "COMBUSTIVEL",
	gasolina: "COMBUSTIVEL",
	etanol: "COMBUSTIVEL",
	diesel: "COMBUSTIVEL",
	hospedagem: "HOSPEDAGEM",
	hotel: "HOSPEDAGEM",
	alimentacao: "ALIMENTACAO",
	comida: "ALIMENTACAO",
	refeicao: "ALIMENTACAO",
	almoco: "ALIMENTACAO",
	jantar: "ALIMENTACAO",
	pedagio: "PEDAGIO",
	manutencao: "MANUTENCAO",
	oficina: "MANUTENCAO"
};
var FORMA$1 = {
	pix: "PIX",
	dinheiro: "DINHEIRO",
	especie: "DINHEIRO",
	cartao: "CARTAO",
	credito: "CARTAO",
	debito: "CARTAO"
};
var norm$1 = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
var lancar_despesa_default = defineTool({
	name: "lancar_despesa",
	title: "Lançar despesa",
	description: "Registra uma despesa no sistema. Existem TRÊS tipos: `viagem` (vinculada a uma viagem aberta), `empresa` (despesa operacional, debitada de uma conta bancária) e `particular` (financeiro pessoal do usuário). SEMPRE pergunte ao usuário se a despesa é de VIAGEM, EMPRESA ou PARTICULAR quando ele não deixar claro. IMPORTANTE: `valor` é SEMPRE dinheiro em reais (R$) — nunca litros, quantidade ou peso. Se o usuário JÁ informou tudo na mesma mensagem (tipo, valor em R$, descrição/categoria e — quando for viagem/empresa — viagem ou conta), pode chamar direto com `confirmado: true` e apenas relatar o que foi gravado. Se faltar qualquer informação, chame primeiro com `confirmado: false` para receber o resumo, pergunte o que falta e só então grave. Em `particular` a conta padrão é DENYS - C6BANK quando o usuário não disser outra. Use `contexto_despesa` para listar viagens, contas e categorias.",
	inputSchema: {
		tipo: _enum([
			"viagem",
			"empresa",
			"particular"
		]).describe("viagem = despesa de viagem; empresa = despesa operacional; particular = financeiro pessoal."),
		valor: number().describe("Valor em REAIS (R$), positivo. Nunca litros ou quantidade."),
		descricao: string().describe("Descrição curta da despesa."),
		confirmado: boolean().describe("false = apenas simular e devolver o resumo para confirmação. true = gravar de verdade (só após o usuário confirmar)."),
		data: string().nullable().optional().describe("Data YYYY-MM-DD. Padrão: hoje."),
		categoria: string().nullable().optional().describe("Viagem: combustível, hospedagem, alimentação, pedágio, manutenção ou outros. Empresa: nome ou id da categoria financeira."),
		viagem: string().nullable().optional().describe("Somente tipo=viagem: id ou nome/cidade da viagem."),
		conta: string().nullable().optional().describe("Conta bancária (id ou nome). Obrigatória em tipo=empresa; opcional em tipo=viagem."),
		forma_pagamento: string().nullable().optional().describe("pix, dinheiro ou cartão.")
	},
	annotations: {
		readOnlyHint: false,
		destructiveHint: false,
		idempotentHint: false,
		openWorldHint: false
	},
	handler: async (input, ctx) => {
		var _FORMA$norm;
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		const supabase = supabaseForUser(ctx);
		const valor = Number(input.valor);
		if (!valor || valor <= 0) return errorResult("Informe um valor em reais maior que zero.");
		const data = input.data || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
		if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) return errorResult("Data inválida. Use YYYY-MM-DD.");
		const confirmado = input.confirmado === true;
		const { data: accounts, error: accErr } = await supabase.from("bank_accounts").select("id,nome,banco").eq("ativo", true).order("nome");
		if (accErr) return errorResult(accErr.message);
		const contas = accounts !== null && accounts !== void 0 ? accounts : [];
		const listaContas = contas.map((a) => `- ${a.nome}`).join("\n");
		const resolveConta = (ref) => {
			if (!ref) return void 0;
			const r = norm$1(ref);
			return contas.find((a) => {
				var _a$banco;
				return a.id.toLowerCase() === r || norm$1(`${a.nome} ${(_a$banco = a.banco) !== null && _a$banco !== void 0 ? _a$banco : ""}`).includes(r);
			});
		};
		const forma = input.forma_pagamento ? (_FORMA$norm = FORMA$1[norm$1(input.forma_pagamento)]) !== null && _FORMA$norm !== void 0 ? _FORMA$norm : "OUTRO" : null;
		if (input.tipo === "particular") {
			var _ref, _resolveConta, _contaPessoal$nome;
			const contaPessoal = (_ref = (_resolveConta = resolveConta(input.conta)) !== null && _resolveConta !== void 0 ? _resolveConta : contas.find((a) => {
				var _a$banco2;
				return norm$1(`${a.nome} ${(_a$banco2 = a.banco) !== null && _a$banco2 !== void 0 ? _a$banco2 : ""}`).includes("c6");
			})) !== null && _ref !== void 0 ? _ref : null;
			if (input.conta && !resolveConta(input.conta)) return textResult(`Não encontrei a conta "${input.conta}". Contas ativas:\n${listaContas}`);
			const obs = [contaPessoal ? `Conta: ${contaPessoal.nome}` : null, forma ? `Pagamento: ${forma}` : null].filter(Boolean).join(" · ");
			if (!confirmado) {
				var _input$categoria;
				return textResult([
					"CONFIRME COM O USUÁRIO ANTES DE GRAVAR — nada foi salvo ainda.",
					"Tipo: despesa PARTICULAR (financeiro pessoal)",
					`Valor: ${brl(valor)} (em reais)`,
					`Descrição: ${input.descricao}`,
					`Categoria: ${(_input$categoria = input.categoria) !== null && _input$categoria !== void 0 ? _input$categoria : "— não informada"}`,
					`Conta: ${contaPessoal ? contaPessoal.nome : "— não informada"}`,
					`Forma de pagamento: ${forma !== null && forma !== void 0 ? forma : "— não informada"}`,
					`Data: ${data}`,
					"\nDepois da confirmação, chame lancar_despesa novamente com confirmado: true."
				].join("\n"), {
					preview: true,
					tipo: "particular",
					valor,
					data
				});
			}
			const { data: row, error } = await supabase.from("personal_entries").insert({
				user_id: ctx.getUserId(),
				tipo: "DESPESA",
				descricao: input.descricao,
				valor,
				vencimento: data,
				pagamento: data,
				status: "PAGO",
				categoria: input.categoria || null,
				observacao: obs || null,
				origem: "MANUAL"
			}).select("id").single();
			if (error) return errorResult(error.message);
			return textResult(`Despesa particular lançada: ${brl(valor)} — ${input.descricao} em ${data}${contaPessoal ? ` (conta ${contaPessoal.nome})` : ""}. Para corrigir ou apagar use ajustar_despesa com id ${row === null || row === void 0 ? void 0 : row.id} e tipo "particular".`, {
				id: row === null || row === void 0 ? void 0 : row.id,
				tipo: "particular",
				valor,
				data,
				conta: (_contaPessoal$nome = contaPessoal === null || contaPessoal === void 0 ? void 0 : contaPessoal.nome) !== null && _contaPessoal$nome !== void 0 ? _contaPessoal$nome : null
			});
		}
		if (input.tipo === "viagem") {
			var _CAT_VIAGEM$catKey, _conta$id;
			const { data: trips, error: tripErr } = await supabase.from("trips").select("id,nome,cidade,estado,status").eq("status", "open").order("opened_at", { ascending: false }).limit(20);
			if (tripErr) return errorResult(tripErr.message);
			const abertas = (trips !== null && trips !== void 0 ? trips : []).filter((t) => {
				var _t$nome;
				return !norm$1((_t$nome = t.nome) !== null && _t$nome !== void 0 ? _t$nome : "").startsWith("sobras");
			});
			if (!abertas.length) return errorResult("Não há viagem aberta válida para despesas (viagens de 'Sobras' são apenas controle de estoque). Abra uma viagem no sistema ou lance como despesa de empresa ou particular.");
			let trip = abertas.length === 1 ? abertas[0] : void 0;
			const ref = input.viagem ? norm$1(input.viagem) : "";
			if (ref) {
				const found = abertas.find((t) => {
					var _t$cidade, _t$estado;
					return t.id.toLowerCase() === ref || norm$1(`${t.nome} ${(_t$cidade = t.cidade) !== null && _t$cidade !== void 0 ? _t$cidade : ""} ${(_t$estado = t.estado) !== null && _t$estado !== void 0 ? _t$estado : ""}`).includes(ref);
				});
				if (!found) return textResult(`Não encontrei a viagem "${input.viagem}". Viagens abertas:\n` + abertas.map((t) => `- ${t.nome}${t.cidade ? ` (${t.cidade})` : ""}`).join("\n"));
				trip = found;
			}
			if (!trip) return textResult("Há mais de uma viagem aberta. Pergunte ao usuário em qual lançar:\n" + abertas.map((t) => `- ${t.nome}${t.cidade ? ` (${t.cidade})` : ""}`).join("\n"));
			const catKey = input.categoria ? norm$1(input.categoria) : "";
			const categoria = input.categoria ? (_CAT_VIAGEM$catKey = CAT_VIAGEM$1[catKey]) !== null && _CAT_VIAGEM$catKey !== void 0 ? _CAT_VIAGEM$catKey : "OUTROS" : null;
			const conta = resolveConta(input.conta);
			if (input.conta && !conta) return textResult(`Não encontrei a conta "${input.conta}". Contas ativas:\n${listaContas}`);
			const faltando = [];
			if (!categoria) faltando.push("categoria (combustível, pedágio, hospedagem, alimentação, manutenção, outros)");
			if (!forma) faltando.push("forma de pagamento (pix, dinheiro ou cartão)");
			if (!conta) faltando.push(`conta de onde saiu o dinheiro (opcional):\n${listaContas}`);
			if (!confirmado) return textResult([
				"CONFIRME COM O USUÁRIO ANTES DE GRAVAR — nada foi salvo ainda.",
				`Tipo: despesa de VIAGEM — "${trip.nome}"${trip.cidade ? ` (${trip.cidade})` : ""}`,
				`Valor: ${brl(valor)} (em reais)`,
				`Descrição: ${input.descricao}`,
				`Categoria: ${categoria !== null && categoria !== void 0 ? categoria : "— não informada"}`,
				`Forma de pagamento: ${forma !== null && forma !== void 0 ? forma : "— não informada"}`,
				`Conta: ${conta ? conta.nome : "— não informada"}`,
				`Data: ${data}`,
				faltando.length ? `\nPergunte ao usuário: ${faltando.join("; ")}.` : "",
				"\nDepois da confirmação, chame lancar_despesa novamente com confirmado: true."
			].filter(Boolean).join("\n"), {
				preview: true,
				tipo: "viagem",
				trip_id: trip.id,
				valor,
				categoria,
				forma,
				data
			});
			const { data: row, error } = await supabase.from("trip_expenses").insert({
				trip_id: trip.id,
				categoria: categoria !== null && categoria !== void 0 ? categoria : "OUTROS",
				descricao: input.descricao || null,
				valor,
				data,
				forma_pagamento: forma,
				account_id: (_conta$id = conta === null || conta === void 0 ? void 0 : conta.id) !== null && _conta$id !== void 0 ? _conta$id : null,
				created_by: ctx.getUserId()
			}).select("id").single();
			if (error) return errorResult(error.message);
			return textResult(`Despesa de viagem lançada: ${brl(valor)} — ${input.descricao} (${categoria !== null && categoria !== void 0 ? categoria : "OUTROS"}${forma ? `, ${forma}` : ""}) em ${data}, viagem "${trip.nome}". Para corrigir ou apagar use ajustar_despesa com id ${row === null || row === void 0 ? void 0 : row.id}.`, {
				id: row === null || row === void 0 ? void 0 : row.id,
				tipo: "viagem",
				trip_id: trip.id,
				valor,
				categoria,
				forma,
				data
			});
		}
		if (!contas.length) return errorResult("Nenhuma conta bancária ativa cadastrada.");
		const conta = resolveConta(input.conta);
		if (input.conta && !conta) return textResult(`Não encontrei a conta "${input.conta}". Contas ativas:\n${listaContas}`);
		let categoriaId = null;
		let categoriaNome = null;
		if (input.categoria) if (UUID.test(input.categoria)) {
			categoriaId = input.categoria;
			categoriaNome = input.categoria;
		} else {
			var _hit$id, _hit$nome;
			const { data: cats } = await supabase.from("financial_categories").select("id,nome");
			const alvo = norm$1(input.categoria);
			const hit = (cats !== null && cats !== void 0 ? cats : []).find((c) => norm$1(c.nome).includes(alvo));
			categoriaId = (_hit$id = hit === null || hit === void 0 ? void 0 : hit.id) !== null && _hit$id !== void 0 ? _hit$id : null;
			categoriaNome = (_hit$nome = hit === null || hit === void 0 ? void 0 : hit.nome) !== null && _hit$nome !== void 0 ? _hit$nome : null;
		}
		if (!confirmado || !conta) {
			var _categoriaNome;
			const faltando = [];
			if (!conta) faltando.push(`de qual conta sai a despesa:\n${listaContas}`);
			if (!categoriaId) faltando.push("categoria financeira");
			return textResult([
				"CONFIRME COM O USUÁRIO ANTES DE GRAVAR — nada foi salvo ainda.",
				"Tipo: despesa de EMPRESA",
				`Valor: ${brl(valor)} (em reais)`,
				`Descrição: ${input.descricao}`,
				`Categoria: ${(_categoriaNome = categoriaNome) !== null && _categoriaNome !== void 0 ? _categoriaNome : "— não informada"}`,
				`Conta: ${conta ? conta.nome : "— não informada"}`,
				`Data: ${data}`,
				faltando.length ? `\nPergunte ao usuário: ${faltando.join("; ")}.` : "",
				"\nDepois da confirmação, chame lancar_despesa novamente com confirmado: true."
			].filter(Boolean).join("\n"), {
				preview: true,
				tipo: "empresa",
				valor,
				data
			});
		}
		const { data: row, error } = await supabase.from("financial_entries").insert({
			descricao: input.descricao,
			valor,
			tipo: "DESPESA",
			data,
			account_id: conta.id,
			categoria_id: categoriaId
		}).select("id").single();
		if (error) return errorResult(error.message);
		return textResult(`Despesa da empresa lançada: ${brl(valor)} — ${input.descricao} em ${data}, conta "${conta.nome}". Para corrigir ou apagar use ajustar_despesa com id ${row === null || row === void 0 ? void 0 : row.id}.`, {
			id: row === null || row === void 0 ? void 0 : row.id,
			tipo: "empresa",
			account_id: conta.id,
			valor,
			data
		});
	}
});
var CAT_VIAGEM = {
	combustivel: "COMBUSTIVEL",
	gasolina: "COMBUSTIVEL",
	etanol: "COMBUSTIVEL",
	diesel: "COMBUSTIVEL",
	hospedagem: "HOSPEDAGEM",
	hotel: "HOSPEDAGEM",
	alimentacao: "ALIMENTACAO",
	refeicao: "ALIMENTACAO",
	almoco: "ALIMENTACAO",
	jantar: "ALIMENTACAO",
	pedagio: "PEDAGIO",
	manutencao: "MANUTENCAO",
	oficina: "MANUTENCAO"
};
var FORMA = {
	pix: "PIX",
	dinheiro: "DINHEIRO",
	especie: "DINHEIRO",
	cartao: "CARTAO",
	credito: "CARTAO",
	debito: "CARTAO"
};
var norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
var ajustar_despesa_default = defineTool({
	name: "ajustar_despesa",
	title: "Corrigir ou apagar despesa",
	description: "Corrige (valor, descrição, categoria, forma de pagamento, conta, data) ou apaga uma despesa já lançada. Informe o `id` devolvido por `lancar_despesa` e o `tipo` (viagem, empresa ou particular). Use `acao: 'excluir'` para apagar. Confirme com o usuário antes de excluir.",
	inputSchema: {
		id: string().describe("Id da despesa (retornado por lancar_despesa)."),
		tipo: _enum([
			"viagem",
			"empresa",
			"particular"
		]).describe("Onde a despesa foi lançada."),
		acao: _enum(["atualizar", "excluir"]).describe("atualizar = alterar campos; excluir = apagar o lançamento."),
		valor: number().nullable().optional().describe("Novo valor em REAIS."),
		descricao: string().nullable().optional().describe("Nova descrição."),
		categoria: string().nullable().optional().describe("Nova categoria."),
		forma_pagamento: string().nullable().optional().describe("pix, dinheiro ou cartão (somente viagem)."),
		conta: string().nullable().optional().describe("Nome ou id da conta bancária."),
		data: string().nullable().optional().describe("Nova data YYYY-MM-DD.")
	},
	annotations: {
		readOnlyHint: false,
		destructiveHint: true,
		idempotentHint: false,
		openWorldHint: false
	},
	handler: async (input, ctx) => {
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		const supabase = supabaseForUser(ctx);
		const table = input.tipo === "viagem" ? "trip_expenses" : input.tipo === "particular" ? "personal_entries" : "financial_entries";
		if (input.acao === "excluir") {
			const { error } = await supabase.from(table).delete().eq("id", input.id);
			if (error) return errorResult(error.message);
			return textResult(`Despesa ${input.id} excluída.`, {
				id: input.id,
				excluida: true
			});
		}
		const patch = {};
		if (input.valor != null) {
			if (Number(input.valor) <= 0) return errorResult("Valor deve ser maior que zero.");
			patch.valor = Number(input.valor);
		}
		if (input.descricao) patch.descricao = input.descricao;
		if (input.data) {
			if (!/^\d{4}-\d{2}-\d{2}$/.test(input.data)) return errorResult("Data inválida. Use YYYY-MM-DD.");
			if (input.tipo === "particular") {
				patch.vencimento = input.data;
				patch.pagamento = input.data;
			} else patch.data = input.data;
		}
		if (input.conta && input.tipo !== "particular") {
			const { data: contas } = await supabase.from("bank_accounts").select("id,nome,banco").eq("ativo", true);
			const r = norm(input.conta);
			const conta = (contas !== null && contas !== void 0 ? contas : []).find((a) => {
				var _a$banco;
				return a.id.toLowerCase() === r || norm(`${a.nome} ${(_a$banco = a.banco) !== null && _a$banco !== void 0 ? _a$banco : ""}`).includes(r);
			});
			if (!conta) return textResult(`Não encontrei a conta "${input.conta}". Contas ativas:\n` + (contas !== null && contas !== void 0 ? contas : []).map((a) => `- ${a.nome}`).join("\n"));
			patch.account_id = conta.id;
		}
		if (input.tipo === "viagem") {
			var _CAT_VIAGEM$norm, _FORMA$norm;
			if (input.categoria) patch.categoria = (_CAT_VIAGEM$norm = CAT_VIAGEM[norm(input.categoria)]) !== null && _CAT_VIAGEM$norm !== void 0 ? _CAT_VIAGEM$norm : "OUTROS";
			if (input.forma_pagamento) patch.forma_pagamento = (_FORMA$norm = FORMA[norm(input.forma_pagamento)]) !== null && _FORMA$norm !== void 0 ? _FORMA$norm : "OUTRO";
		} else if (input.tipo === "particular") {
			if (input.categoria) patch.categoria = input.categoria;
		} else if (input.categoria) {
			const { data: cats } = await supabase.from("financial_categories").select("id,nome");
			const alvo = norm(input.categoria);
			const hit = (cats !== null && cats !== void 0 ? cats : []).find((c) => norm(c.nome).includes(alvo));
			if (!hit) return errorResult(`Categoria "${input.categoria}" não encontrada.`);
			patch.categoria_id = hit.id;
		}
		if (!Object.keys(patch).length) return errorResult("Nada para alterar. Informe ao menos um campo.");
		const { error } = input.tipo === "viagem" ? await supabase.from("trip_expenses").update(patch).eq("id", input.id) : input.tipo === "particular" ? await supabase.from("personal_entries").update(patch).eq("id", input.id) : await supabase.from("financial_entries").update(patch).eq("id", input.id);
		if (error) return errorResult(error.message);
		const resumo = Object.entries(patch).map(([k, v]) => `${k}: ${k === "valor" ? brl(Number(v)) : String(v)}`).join(", ");
		return textResult(`Despesa ${input.id} atualizada (${resumo}).`, _objectSpread2({ id: input.id }, patch));
	}
});
var ETAPAS = [
	"NOVO_LEAD",
	"CONTATO_FEITO",
	"NEGOCIACAO",
	"AGUARDANDO_RETORNO",
	"CLIENTE",
	"PERDIDO",
	"PEDIDO"
];
var LABEL = {
	NOVO_LEAD: "Novo lead",
	CONTATO_FEITO: "Contato feito",
	NEGOCIACAO: "Negociação",
	AGUARDANDO_RETORNO: "Aguardando retorno",
	CLIENTE: "Cliente",
	PERDIDO: "Perdido",
	PEDIDO: "Pedido"
};
function digits(v) {
	return (v !== null && v !== void 0 ? v : "").replace(/\D/g, "");
}
var crm_leads_default = defineTool({
	name: "crm_leads",
	title: "Leads do CRM",
	description: "Consulta os chaveiros/leads do funil do CRM. Permite filtrar por etapa do kanban (ex.: NOVO_LEAD = coluna 'Novo lead'), por cidade/estado e mostrar apenas quem tem WhatsApp válido. Retorna a contagem total, o resumo por etapa e a lista com nome, cidade, WhatsApp e telefone.",
	inputSchema: {
		etapa: _enum(ETAPAS).nullable().optional().describe("Coluna do kanban. Ex.: NOVO_LEAD para 'Novo lead'. Vazio = todas as etapas."),
		cidade: string().nullable().optional().describe("Filtra por cidade (ex.: Brasília)."),
		estado: string().nullable().optional().describe("Filtra por UF (ex.: DF)."),
		somente_com_whatsapp: boolean().nullable().optional().describe("true = retorna apenas leads com WhatsApp preenchido e válido."),
		limite: number().int().nullable().optional().describe("Máximo de leads listados (padrão 50).")
	},
	annotations: {
		readOnlyHint: true,
		idempotentHint: true,
		openWorldHint: false
	},
	handler: async ({ etapa, cidade, estado, somente_com_whatsapp, limite }, ctx) => {
		var _porEtapa$get;
		if (!ctx.isAuthenticated()) return errorResult("Não autenticado.");
		let q = supabaseForUser(ctx).from("leads").select("id,empresa,contato,whatsapp,telefone,cidade,estado,status,score,ultimo_contato").order("position", { ascending: true });
		if (etapa) q = q.eq("status", etapa);
		if (cidade) q = q.ilike("cidade", `%${cidade}%`);
		if (estado) q = q.ilike("estado", `%${estado}%`);
		const { data, error } = await q.limit(1e3);
		if (error) return errorResult(error.message);
		const todos = (data !== null && data !== void 0 ? data : []).map((l) => {
			var _l$contato, _l$cidade, _l$estado, _LABEL, _l$status, _l$telefone, _l$score;
			const wa = digits(l.whatsapp) || digits(l.telefone);
			return {
				nome: l.empresa || l.contato || "Sem nome",
				contato: (_l$contato = l.contato) !== null && _l$contato !== void 0 ? _l$contato : null,
				cidade: (_l$cidade = l.cidade) !== null && _l$cidade !== void 0 ? _l$cidade : "—",
				estado: (_l$estado = l.estado) !== null && _l$estado !== void 0 ? _l$estado : "—",
				etapa: (_LABEL = LABEL[(_l$status = l.status) !== null && _l$status !== void 0 ? _l$status : "NOVO_LEAD"]) !== null && _LABEL !== void 0 ? _LABEL : l.status,
				whatsapp: wa.length >= 10 ? l.whatsapp || l.telefone : null,
				telefone: (_l$telefone = l.telefone) !== null && _l$telefone !== void 0 ? _l$telefone : null,
				score: (_l$score = l.score) !== null && _l$score !== void 0 ? _l$score : null
			};
		});
		const lista = (somente_com_whatsapp ? todos.filter((l) => l.whatsapp) : todos).slice(0, limite !== null && limite !== void 0 ? limite : 50);
		const comWa = todos.filter((l) => l.whatsapp).length;
		const porEtapa = /* @__PURE__ */ new Map();
		for (const l of todos) porEtapa.set(l.etapa, ((_porEtapa$get = porEtapa.get(l.etapa)) !== null && _porEtapa$get !== void 0 ? _porEtapa$get : 0) + 1);
		const filtro = [
			etapa ? `etapa ${LABEL[etapa]}` : null,
			cidade ? `cidade ${cidade}` : null,
			estado ? `UF ${estado}` : null
		].filter(Boolean).join(", ");
		if (!todos.length) return textResult(`Nenhum lead encontrado${filtro ? ` (${filtro})` : ""}.`, {
			total: 0,
			leads: []
		});
		return textResult([
			`${todos.length} lead(s)${filtro ? ` — ${filtro}` : ""}.`,
			`Com WhatsApp: ${comWa} · Sem WhatsApp: ${todos.length - comWa}`,
			!etapa ? `Por etapa: ${[...porEtapa.entries()].map(([k, v]) => `${k} ${v}`).join(" · ")}` : null,
			"",
			...lista.map((l) => `- ${l.nome} (${l.cidade}/${l.estado})${etapa ? "" : ` · ${l.etapa}`}${l.whatsapp ? ` · WhatsApp ${l.whatsapp}` : " · sem WhatsApp"}`),
			lista.length < todos.length ? `… mostrando ${lista.length} de ${todos.length}.` : null
		].filter((l) => l !== null).join("\n"), {
			total: todos.length,
			com_whatsapp: comWa,
			sem_whatsapp: todos.length - comWa,
			por_etapa: Object.fromEntries(porEtapa),
			leads: lista
		});
	}
});
var _jnrizhegzxogigjeaukm;
var projectRef = (_jnrizhegzxogigjeaukm = "jnrizhegzxogigjeaukm") !== null && _jnrizhegzxogigjeaukm !== void 0 ? _jnrizhegzxogigjeaukm : "project-ref-unset";
var mcp_default = defineMcp({
	name: "atacado-prime-mcp",
	title: "Atacado Prime",
	version: "0.1.0",
	instructions: "Ferramentas do ERP Atacado Prime (distribuidora de chaves, controles e alarmes automotivos). Consulta: `vendas_resumo` (faturamento por período), `resultado_periodo` (lucro líquido), `clientes_inativos`, `estoque_critico`, `buscar_pedido` e `crm_leads` (funil do CRM: contar/listar chaveiros por etapa do kanban, cidade e se têm WhatsApp). Lançamento: `lancar_despesa` registra despesas e `ajustar_despesa` corrige ou apaga um lançamento. Valores informados pelo usuário são SEMPRE em reais (R$), nunca litros ou quantidade. Existem TRÊS tipos e eles nunca se misturam — `viagem` (gasto de rua vinculado a uma viagem aberta: combustível, pedágio, hospedagem, alimentação), `empresa` (gasto operacional debitado de uma conta bancária) e `particular` (financeiro pessoal do usuário, fora da empresa; conta padrão DENYS - C6BANK). Se a mensagem do usuário já trouxer tipo + valor + descrição (e viagem/conta quando necessário), grave direto com `confirmado: true` e só informe o resultado. Se faltar algo (tipo, viagem, conta, categoria), chame com `confirmado: false`, mostre o resumo e pergunte o que falta antes de gravar. Viagens cujo nome começa com 'Sobras' são apenas controle de estoque e NÃO aceitam despesas. Use `contexto_despesa` para listar viagens abertas, contas e categorias. Valores sempre em reais (BRL) e datas no formato YYYY-MM-DD.",
	auth: auth.oauth.issuer({
		issuer: `https://${projectRef}.supabase.co/auth/v1`,
		acceptedAudiences: "authenticated"
	}),
	tools: [
		vendas_resumo_default,
		resultado_periodo_default,
		clientes_inativos_default,
		estoque_critico_default,
		buscar_pedido_default,
		contexto_despesa_default,
		lancar_despesa_default,
		ajustar_despesa_default,
		crm_leads_default
	]
});
var Route$125 = createFileRoute("/mcp")({ server: { handlers: { ANY: createTanStackMcpHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$69 = () => import("./offline-route-DWOQ1PLp.mjs");
var Route$124 = createFileRoute("/offline-route")({
	ssr: false,
	component: lazyRouteComponent($$splitComponentImporter$69, "component")
});
var $$splitComponentImporter$68 = () => import("./reset-password-bmzFGM8g.mjs");
var Route$123 = createFileRoute("/reset-password")({
	head: () => ({ meta: [{ title: "Redefinir senha" }] }),
	component: lazyRouteComponent($$splitComponentImporter$68, "component")
});
var BASE_URL = "https://primeautomotive.app";
var Route$122 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = [
		`<?xml version="1.0" encoding="UTF-8"?>`,
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
		...[
			{
				path: "/",
				changefreq: "weekly",
				priority: "1.0"
			},
			{
				path: "/v3",
				changefreq: "weekly",
				priority: "0.9"
			},
			{
				path: "/auth",
				changefreq: "monthly",
				priority: "0.3"
			}
		].map((e) => [
			`  <url>`,
			`    <loc>${BASE_URL}${e.path}</loc>`,
			e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
			e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
			e.priority ? `    <priority>${e.priority}</priority>` : null,
			`  </url>`
		].filter(Boolean).join("\n")),
		`</urlset>`
	].join("\n");
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$67 = () => import("./vendas-offline-BkoPNvjk.mjs");
var Route$121 = createFileRoute("/vendas-offline")({
	head: () => ({ meta: [{ title: "Venda Offline — Atacado Prime" }, {
		name: "description",
		content: "Sistema separado para registrar vendas offline e sincronizar automaticamente quando a internet voltar."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$67, "component")
});
var Route$120 = createFileRoute("/.mcp/list-tools")({ server: { handlers: { ANY: createTanStackListToolsHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$119 = createFileRoute("/.well-known/oauth-protected-resource")({ server: { handlers: { ANY: createTanStackOAuthProtectedResourceMetadataHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var $$splitComponentImporter$66 = () => import("./addresses-a0mHQelb.mjs");
var Route$118 = createFileRoute("/_authenticated/addresses")({
	head: () => ({ meta: [{ title: "Endereços — Atacado" }] }),
	component: lazyRouteComponent($$splitComponentImporter$66, "component")
});
var $$splitComponentImporter$65 = () => import("./cart-MAjsN05X.mjs");
var Route$117 = createFileRoute("/_authenticated/cart")({
	head: () => ({ meta: [{ title: "Meu Carrinho — Atacado Prime B2B" }] }),
	component: lazyRouteComponent($$splitComponentImporter$65, "component")
});
var $$splitComponentImporter$64 = () => import("./checkout-DQP4Pfcx.mjs");
var Route$116 = createFileRoute("/_authenticated/checkout")({
	head: () => ({ meta: [{ title: "Checkout — Atacado" }] }),
	component: lazyRouteComponent($$splitComponentImporter$64, "component")
});
var Route$115 = createFileRoute("/_authenticated/companies")({ beforeLoad: () => {
	throw redirect({ to: "/v3/empresas" });
} });
var $$splitComponentImporter$63 = () => import("./contact-CgvDyLqw.mjs");
var Route$114 = createFileRoute("/_authenticated/contact")({
	head: () => ({ meta: [{ title: "Fale conosco — Atacado" }] }),
	component: lazyRouteComponent($$splitComponentImporter$63, "component")
});
var Route$113 = createFileRoute("/_authenticated/dashboard")({ beforeLoad: () => {
	throw redirect({ to: "/v3/hoje" });
} });
var $$splitComponentImporter$62 = () => import("./favorites-DKoZdnwP.mjs");
var Route$112 = createFileRoute("/_authenticated/favorites")({
	head: () => ({ meta: [{ title: "Favoritos — Atacado" }] }),
	component: lazyRouteComponent($$splitComponentImporter$62, "component")
});
var $$splitComponentImporter$61 = () => import("./offline-pendentes-CenhJknn.mjs");
var Route$111 = createFileRoute("/_authenticated/offline-pendentes")({
	component: lazyRouteComponent($$splitComponentImporter$61, "component"),
	head: () => ({ meta: [{ title: "Pendentes de sincronização — Atacado Prime" }, {
		name: "description",
		content: "Registros criados offline aguardando envio ao servidor."
	}] })
});
var $$splitComponentImporter$60 = () => import("./pos-CydUosb-.mjs");
var Route$110 = createFileRoute("/_authenticated/pos")({
	head: () => ({
		meta: [
			{ title: "POS Prime — Terminal de venda" },
			{
				name: "description",
				content: "Terminal de venda otimizado para POS Android com impressão térmica."
			},
			{
				property: "og:title",
				content: "POS Prime — Terminal de venda"
			},
			{
				property: "og:description",
				content: "Terminal de venda otimizado para POS Android com impressão térmica."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "viewport",
				content: "width=360,initial-scale=1,maximum-scale=1,viewport-fit=cover,user-scalable=no"
			},
			{
				name: "theme-color",
				content: "#0d7377"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "POS Prime"
			},
			{
				httpEquiv: "Cache-Control",
				content: "no-store, no-cache, must-revalidate, max-age=0"
			},
			{
				httpEquiv: "Pragma",
				content: "no-cache"
			},
			{
				httpEquiv: "Expires",
				content: "0"
			}
		],
		links: [{
			rel: "manifest",
			href: "/manifest-pos.webmanifest?v=3"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$60, "component")
});
var $$splitComponentImporter$59 = () => import("./settings-CdS-_UNF.mjs");
var Route$109 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [{ title: "Configurações — Atacado" }] }),
	component: lazyRouteComponent($$splitComponentImporter$59, "component")
});
var $$splitComponentImporter$58 = () => import("./cart._token-D83pnAUK.mjs");
var Route$108 = createFileRoute("/cart/$token")({ component: lazyRouteComponent($$splitComponentImporter$58, "component") });
var Route$107 = createFileRoute("/catalog/$id")({ beforeLoad: () => {
	throw redirect({ to: "/v3" });
} });
var Route$106 = createFileRoute("/v2/")({ beforeLoad: () => {
	throw redirect({
		to: "/",
		replace: true
	});
} });
var Route$105 = createFileRoute("/v2/$")({ beforeLoad: () => {
	throw redirect({
		to: "/",
		replace: true
	});
} });
var Route$104 = createFileRoute("/v3/")({ beforeLoad: () => {
	throw redirect({
		to: "/",
		replace: true
	});
} });
var $$splitComponentImporter$57 = () => import("./v3.descontos-3z8m6k8Y.mjs");
var Route$103 = createFileRoute("/v3/descontos")({
	head: () => ({ meta: [
		{ title: "Como funcionam nossos descontos — Atacado Prime" },
		{
			name: "description",
			content: "Entenda de um jeito simples as três tabelas de desconto do Atacado Prime. Quanto mais você compra, mais barato fica cada peça."
		},
		{
			property: "og:title",
			content: "Como funcionam nossos descontos — Atacado Prime"
		},
		{
			property: "og:description",
			content: "Três tabelas de desconto pensadas para o lojista. Veja exemplos reais com capa, chave e controle."
		},
		{
			property: "og:type",
			content: "website"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$57, "component")
});
var Route$102 = createFileRoute("/.mcp/invoke-tool/$tool")({ server: { handlers: { ANY: createTanStackInvokeToolHandler(mcp_default, {
	resourcePath: "/mcp",
	metadataPath: "/.well-known/oauth-protected-resource",
	trustForwardedHost: true
}) } } });
var Route$101 = createFileRoute("/_authenticated/admin/abandoned-carts")({ beforeLoad: () => {
	throw redirect({ to: "/v3/admin/carrinhos" });
} });
var Route$100 = createFileRoute("/_authenticated/admin/banners")({ beforeLoad: () => {
	throw redirect({ to: "/v3/admin/banners" });
} });
var $$splitComponentImporter$56 = () => import("./catalog-DqXeLKMj.mjs");
var Route$99 = createFileRoute("/_authenticated/admin/catalog")({
	head: () => ({ meta: [{ title: "Catálogo (admin) — Atacado" }] }),
	component: lazyRouteComponent($$splitComponentImporter$56, "component")
});
var Route$98 = createFileRoute("/_authenticated/admin/companies")({ beforeLoad: () => {
	throw redirect({ to: "/v3/empresas" });
} });
var Route$97 = createFileRoute("/_authenticated/admin/fees")({ beforeLoad: () => {
	throw redirect({ to: "/v3/configuracoes" });
} });
var Route$96 = createFileRoute("/_authenticated/admin/labels")({ beforeLoad: () => {
	throw redirect({ to: "/v3/configuracoes" });
} });
var Route$95 = createFileRoute("/_authenticated/admin/observability")({ beforeLoad: () => {
	throw redirect({ to: "/v3/configuracoes" });
} });
var Route$94 = createFileRoute("/_authenticated/admin/orders")({ beforeLoad: () => {
	throw redirect({ to: "/v3/pedidos" });
} });
var Route$93 = createFileRoute("/_authenticated/admin/promotions")({ beforeLoad: () => {
	throw redirect({ to: "/v3/admin/promocoes" });
} });
var Route$92 = createFileRoute("/_authenticated/admin/push")({ beforeLoad: () => {
	throw redirect({ to: "/v3/admin/push" });
} });
var Route$91 = createFileRoute("/_authenticated/admin/sales-targets")({ beforeLoad: () => {
	throw redirect({ to: "/v3/admin/metas" });
} });
var Route$90 = createFileRoute("/_authenticated/admin/system")({ beforeLoad: () => {
	throw redirect({ to: "/v3/configuracoes" });
} });
var Route$89 = createFileRoute("/_authenticated/admin/users")({ beforeLoad: () => {
	throw redirect({ to: "/v3/admin/usuarios" });
} });
var Route$88 = createFileRoute("/_authenticated/ai/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/ia" });
} });
var Route$87 = createFileRoute("/_authenticated/automation/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/automacao" });
} });
var Route$86 = createFileRoute("/_authenticated/bi/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/bi" });
} });
var Route$85 = createFileRoute("/_authenticated/campaigns/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/campanhas" });
} });
var Route$84 = createFileRoute("/_authenticated/campaigns/$id")({ beforeLoad: () => {
	throw redirect({ to: "/v3/campanhas" });
} });
var Route$83 = createFileRoute("/_authenticated/crm/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/crm" });
} });
var Route$82 = createFileRoute("/_authenticated/crm/$id")({ beforeLoad: () => {
	throw redirect({ to: "/v3/crm" });
} });
var Route$81 = createFileRoute("/_authenticated/crm/agenda")({ beforeLoad: () => {
	throw redirect({ to: "/v3/crm/agenda" });
} });
var Route$80 = createFileRoute("/_authenticated/crm/prospeccao")({ beforeLoad: () => {
	throw redirect({ to: "/v3/prospeccao" });
} });
var Route$79 = createFileRoute("/_authenticated/field/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/campo" });
} });
var Route$78 = createFileRoute("/_authenticated/field/agenda")({ beforeLoad: () => {
	throw redirect({ to: "/v3/campo" });
} });
var Route$77 = createFileRoute("/_authenticated/field/venda-offline")({ beforeLoad: () => {
	throw redirect({ to: "/v3/vendas/nova" });
} });
var Route$76 = createFileRoute("/_authenticated/finance/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/financeiro" });
} });
var Route$75 = createFileRoute("/_authenticated/finance/reconciliation")({ beforeLoad: () => {
	throw redirect({ to: "/v3/financeiro/conciliacao" });
} });
var Route$74 = createFileRoute("/_authenticated/inventory/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/estoque" });
} });
var Route$73 = createFileRoute("/_authenticated/inventory/alerts")({ beforeLoad: () => {
	throw redirect({ to: "/v3/estoque/alertas" });
} });
var Route$72 = createFileRoute("/_authenticated/inventory/counts")({ beforeLoad: () => {
	throw redirect({ to: "/v3/estoque/contagens" });
} });
var $$splitComponentImporter$55 = () => import("./orders-CxqzWVDf.mjs");
var Route$71 = createFileRoute("/_authenticated/orders/")({
	head: () => ({ meta: [{ title: "Meus pedidos — Atacado" }] }),
	component: lazyRouteComponent($$splitComponentImporter$55, "component")
});
var Route$70 = createFileRoute("/_authenticated/portal/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/portal" });
} });
var Route$69 = createFileRoute("/_authenticated/pos/")({ beforeLoad: () => {
	throw redirect({ to: "/pos/vender" });
} });
var $$splitComponentImporter$54 = () => import("./pos.caixa-c2ur0D6D.mjs");
var Route$68 = createFileRoute("/_authenticated/pos/caixa")({
	head: () => ({ meta: [{ title: "Caixa — POS Prime" }] }),
	component: lazyRouteComponent($$splitComponentImporter$54, "component")
});
var $$splitComponentImporter$53 = () => import("./pos.clientes-DIJbKp4f.mjs");
var Route$67 = createFileRoute("/_authenticated/pos/clientes")({
	head: () => ({ meta: [{ title: "Clientes — POS Prime" }] }),
	component: lazyRouteComponent($$splitComponentImporter$53, "component")
});
var $$splitComponentImporter$52 = () => import("./pos.diagnostico-Cl61SK7x.mjs");
var Route$66 = createFileRoute("/_authenticated/pos/diagnostico")({
	component: lazyRouteComponent($$splitComponentImporter$52, "component"),
	head: () => ({ meta: [
		{ title: "Diagnóstico da impressora | Atacado Prime POS" },
		{
			name: "description",
			content: "Identifique o modelo da maquininha e as pontes de impressão disponíveis no terminal POS."
		},
		{
			property: "og:title",
			content: "Diagnóstico da impressora | Atacado Prime POS"
		},
		{
			property: "og:description",
			content: "Identifique o modelo da maquininha e as pontes de impressão disponíveis no terminal POS."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$51 = () => import("./pos.instalar-CCXF7eS2.mjs");
var Route$65 = createFileRoute("/_authenticated/pos/instalar")({
	component: lazyRouteComponent($$splitComponentImporter$51, "component"),
	head: () => ({ meta: [
		{ title: "Instalar o POS na maquininha | Atacado Prime" },
		{
			name: "description",
			content: "Link direto e QR Code para instalar o atalho do POS Prime na tela inicial da maquininha pelo Firefox ou Chrome."
		},
		{
			property: "og:title",
			content: "Instalar o POS na maquininha | Atacado Prime"
		},
		{
			property: "og:description",
			content: "Link direto e QR Code para instalar o atalho do POS Prime na tela inicial da maquininha pelo Firefox ou Chrome."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$50 = () => import("./pos.pedidos-Cpen_S74.mjs");
var Route$64 = createFileRoute("/_authenticated/pos/pedidos")({
	head: () => ({ meta: [{ title: "Pedidos — POS Prime" }] }),
	component: lazyRouteComponent($$splitComponentImporter$50, "component")
});
var $$splitComponentImporter$49 = () => import("./pos.produtos-DKZTbKR9.mjs");
var Route$63 = createFileRoute("/_authenticated/pos/produtos")({
	head: () => ({ meta: [{ title: "Produtos — POS Prime" }] }),
	component: lazyRouteComponent($$splitComponentImporter$49, "component")
});
var $$splitComponentImporter$48 = () => import("./pos.teste-CawgR8sA.mjs");
var Route$62 = createFileRoute("/_authenticated/pos/teste")({
	component: lazyRouteComponent($$splitComponentImporter$48, "component"),
	head: () => ({ meta: [
		{ title: "Teste de impressão | Atacado Prime POS" },
		{
			name: "description",
			content: "Valide a conexão com a ponte nativa da maquininha e imprima um cupom de teste sem precisar registrar uma venda."
		},
		{
			property: "og:title",
			content: "Teste de impressão | Atacado Prime POS"
		},
		{
			property: "og:description",
			content: "Valide a conexão com a ponte nativa da maquininha e imprima um cupom de teste sem precisar registrar uma venda."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] })
});
var $$splitComponentImporter$47 = () => import("./pos.vender-47Q54dil.mjs");
var Route$61 = createFileRoute("/_authenticated/pos/vender")({
	head: () => ({ meta: [{ title: "Vender — POS Prime" }] }),
	component: lazyRouteComponent($$splitComponentImporter$47, "component")
});
var Route$60 = createFileRoute("/_authenticated/routes/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/rotas" });
} });
var $$splitComponentImporter$46 = () => import("./v3.aprovacoes-CAP71zvN.mjs");
var Route$59 = createFileRoute("/_authenticated/v3/aprovacoes")({
	head: () => ({ meta: [{ title: "Aprovações — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$46, "component")
});
var $$splitComponentImporter$45 = () => import("./v3.automacao-BPktYhz_.mjs");
var Route$58 = createFileRoute("/_authenticated/v3/automacao")({
	head: () => ({ meta: [{ title: "Automação — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$45, "component")
});
var $$splitComponentImporter$44 = () => import("./v3.bi-D9oYPYlz.mjs");
var Route$57 = createFileRoute("/_authenticated/v3/bi")({
	head: () => ({ meta: [{ title: "BI — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$44, "component")
});
var $$splitComponentImporter$43 = () => import("./v3.campanhas-ChTDVHkm.mjs");
var Route$56 = createFileRoute("/_authenticated/v3/campanhas")({
	head: () => ({ meta: [{ title: "Campanhas — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$43, "component")
});
var $$splitComponentImporter$42 = () => import("./v3.campo-CpXHT7cG.mjs");
var Route$55 = createFileRoute("/_authenticated/v3/campo")({
	head: () => ({ meta: [{ title: "Campo — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$42, "component")
});
var Route$54 = createFileRoute("/_authenticated/v3/catalogo-admin")({ beforeLoad: () => {
	throw redirect({ to: "/admin/catalog" });
} });
var $$splitComponentImporter$41 = () => import("./v3.compras-D0jKXVev.mjs");
var Route$53 = createFileRoute("/_authenticated/v3/compras")({
	head: () => ({ meta: [{ title: "Compra de material — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$41, "component")
});
var $$splitComponentImporter$40 = () => import("./v3.configuracoes-BnKWbQaJ.mjs");
var Route$52 = createFileRoute("/_authenticated/v3/configuracoes")({
	head: () => ({ meta: [{ title: "Configurações — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$40, "component")
});
var $$splitNotFoundComponentImporter$1 = () => import("./v3.dashboard-BngiYsgq.mjs");
var $$splitErrorComponentImporter$2 = () => import("./v3.dashboard-K4cKa-Av.mjs");
var $$splitComponentImporter$39 = () => import("./v3.dashboard-qjTU_kOS.mjs");
var Route$51 = createFileRoute("/_authenticated/v3/dashboard")({
	head: () => ({ meta: [{ title: "Cockpit — Prime Automotive" }, {
		name: "description",
		content: "Dashboard interno v3 dark/orange com dados reais do sistema."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$39, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$2, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter$1, "notFoundComponent")
});
var $$splitComponentImporter$38 = () => import("./v3.demandas-dFWCZEpR.mjs");
var Route$50 = createFileRoute("/_authenticated/v3/demandas")({
	head: () => ({ meta: [
		{ title: "Demanda de produtos — Prime Automotive" },
		{
			name: "description",
			content: "Registre peças que os clientes pedem e você ainda não tem, e monte a lista de compras."
		},
		{
			property: "og:title",
			content: "Demanda de produtos — Prime Automotive"
		},
		{
			property: "og:description",
			content: "Lista de produtos a comprar a partir do que os clientes procuram."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$38, "component")
});
var $$splitComponentImporter$37 = () => import("./v3.despesa-empresa-BzmQki9v.mjs");
var Route$49 = createFileRoute("/_authenticated/v3/despesa-empresa")({
	head: () => ({ meta: [{ title: "Despesa da empresa — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./v3.despesas-xpix0xiI.mjs");
var Route$48 = createFileRoute("/_authenticated/v3/despesas")({
	head: () => ({ meta: [{ title: "Despesas — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./v3.empresas-C0jpb7df.mjs");
var Route$47 = createFileRoute("/_authenticated/v3/empresas")({
	head: () => ({ meta: [{ title: "Clientes & empresas — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitErrorComponentImporter$1 = () => import("./v3.fechamento-D5Emhj3T.mjs");
var $$splitComponentImporter$34 = () => import("./v3.fechamento-CIbBHou-.mjs");
var Route$46 = createFileRoute("/_authenticated/v3/fechamento")({
	head: () => ({ meta: [{ title: "Fechamento — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter$1, "errorComponent")
});
var $$splitComponentImporter$33 = () => import("./v3.financeiro-DUlAtVEj.mjs");
var Route$45 = createFileRoute("/_authenticated/v3/financeiro")({ component: lazyRouteComponent($$splitComponentImporter$33, "component") });
var $$splitNotFoundComponentImporter = () => import("./v3.hoje-C6zJEKtR.mjs");
var $$splitErrorComponentImporter = () => import("./v3.hoje-B5NF5do-.mjs");
var $$splitComponentImporter$32 = () => import("./v3.hoje-BQ7RZu2q.mjs");
var Route$44 = createFileRoute("/_authenticated/v3/hoje")({
	head: () => ({ meta: [{ title: "Hoje — Prime Automotive" }, {
		name: "description",
		content: "Painel comercial do dia com métricas reais, comparativos e ações pendentes."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component"),
	errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
var $$splitComponentImporter$31 = () => import("./v3.ia-BHS3BdGy.mjs");
var Route$43 = createFileRoute("/_authenticated/v3/ia")({
	head: () => ({ meta: [{ title: "IA — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./v3.particular-CcYnMFMp.mjs");
var Route$42 = createFileRoute("/_authenticated/v3/particular")({
	head: () => ({ meta: [{ title: "Meu financeiro particular — Prime" }] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./v3.pdv-7zyc-S7u.mjs");
var Route$41 = createFileRoute("/_authenticated/v3/pdv")({
	head: () => ({ meta: [{ title: "PDV — Venda rápida" }] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./v3.pedidos-DNWdx4in.mjs");
var Route$40 = createFileRoute("/_authenticated/v3/pedidos")({
	head: () => ({ meta: [{ title: "Pedidos — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./v3.portal-CTR96DtH.mjs");
var Route$39 = createFileRoute("/_authenticated/v3/portal")({
	head: () => ({ meta: [{ title: "Portal do cliente — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./v3.prospeccao-CgFQbRff.mjs");
var Route$38 = createFileRoute("/_authenticated/v3/prospeccao")({ component: lazyRouteComponent($$splitComponentImporter$26, "component") });
var $$splitComponentImporter$25 = () => import("./v3.rotas-bjYIsHgf.mjs");
var Route$37 = createFileRoute("/_authenticated/v3/rotas")({
	head: () => ({ meta: [{ title: "Rotas — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./v3.viagens-fFDADuka.mjs");
var Route$36 = createFileRoute("/_authenticated/v3/viagens")({
	head: () => ({ meta: [{ title: "Viagens — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var Route$35 = createFileRoute("/_authenticated/vendas/nova")({ beforeLoad: () => {
	throw redirect({ to: "/v3/vendas/nova" });
} });
var Route$34 = createFileRoute("/_authenticated/vendas/viagens")({ beforeLoad: () => {
	throw redirect({ to: "/v3/viagens" });
} });
var Route$33 = createFileRoute("/_authenticated/whatsapp/")({ beforeLoad: () => {
	throw redirect({ to: "/v3/whatsapp" });
} });
var Route$32 = createFileRoute("/_authenticated/whatsapp/campaigns")({ beforeLoad: () => {
	throw redirect({ to: "/v3/whatsapp/campanhas" });
} });
var Route$31 = createFileRoute("/_authenticated/whatsapp/pos-venda")({ beforeLoad: () => {
	throw redirect({ to: "/v3/whatsapp/pos-venda" });
} });
var Route$30 = createFileRoute("/_authenticated/whatsapp/templates")({ beforeLoad: () => {
	throw redirect({ to: "/v3/whatsapp/templates" });
} });
var $$splitComponentImporter$23 = () => import("./v3.admin.banners-B8hjo2ol.mjs");
var Route$29 = createFileRoute("/_authenticated/v3/admin/banners")({
	head: () => ({ meta: [{ title: "Banners — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./v3.admin.carrinhos-AVReY3Gs.mjs");
var Route$28 = createFileRoute("/_authenticated/v3/admin/carrinhos")({
	head: () => ({ meta: [{ title: "Carrinhos abandonados — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./v3.admin.metas-DDXMG-aI.mjs");
var Route$27 = createFileRoute("/_authenticated/v3/admin/metas")({
	head: () => ({ meta: [{ title: "Metas de vendas — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./v3.admin.promocoes-ugqj50KI.mjs");
var Route$26 = createFileRoute("/_authenticated/v3/admin/promocoes")({
	head: () => ({ meta: [{ title: "Promoções — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./v3.admin.push-BwbHwXjl.mjs");
var Route$25 = createFileRoute("/_authenticated/v3/admin/push")({
	head: () => ({ meta: [{ title: "Push — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./v3.admin.usuarios-DX_vP9SN.mjs");
var Route$24 = createFileRoute("/_authenticated/v3/admin/usuarios")({
	head: () => ({ meta: [{ title: "Usuários — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./v3.crm.index-B9CAFmeq.mjs");
var Route$23 = createFileRoute("/_authenticated/v3/crm/")({
	head: () => ({ meta: [{ title: "CRM — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./v3.crm.agenda-C6AR7T8D.mjs");
var Route$22 = createFileRoute("/_authenticated/v3/crm/agenda")({
	head: () => ({ meta: [{ title: "Agenda CRM — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./v3.estoque.index-BMQqpNde.mjs");
var Route$21 = createFileRoute("/_authenticated/v3/estoque/")({
	head: () => ({ meta: [{ title: "Estoque — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./v3.estoque.alertas-DOso268m.mjs");
var Route$20 = createFileRoute("/_authenticated/v3/estoque/alertas")({
	head: () => ({ meta: [{ title: "Alertas de estoque — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./v3.estoque.contagens-CFzA2KDu.mjs");
var Route$19 = createFileRoute("/_authenticated/v3/estoque/contagens")({
	head: () => ({ meta: [{ title: "Contagens de estoque — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./v3.financeiro.conciliacao-BnMXgnNl.mjs");
var Route$18 = createFileRoute("/_authenticated/v3/financeiro/conciliacao")({
	head: () => ({ meta: [{ title: "Conciliação bancária — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./v3.relatorios.index-BblIQCK-.mjs");
var Route$17 = createFileRoute("/_authenticated/v3/relatorios/")({
	head: () => ({ meta: [{ title: "Relatórios — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./v3.relatorios.abc-DQY8Vjj0.mjs");
var Route$16 = createFileRoute("/_authenticated/v3/relatorios/abc")({
	head: () => ({ meta: [{ title: "Curva ABC — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./v3.relatorios.abc-clientes-BEthvDPZ.mjs");
var Route$15 = createFileRoute("/_authenticated/v3/relatorios/abc-clientes")({
	head: () => ({ meta: [{ title: "Curva ABC de clientes — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./v3.relatorios.giro-hkbYAiKH.mjs");
var Route$14 = createFileRoute("/_authenticated/v3/relatorios/giro")({
	head: () => ({ meta: [{ title: "Giro de estoque — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./v3.relatorios.projecao-B2ppN9R2.mjs");
var Route$13 = createFileRoute("/_authenticated/v3/relatorios/projecao")({
	head: () => ({ meta: [{ title: "Projeção de ganho — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./v3.relatorios.resultado-Cr3w5nzK.mjs");
var Route$12 = createFileRoute("/_authenticated/v3/relatorios/resultado")({
	head: () => ({ meta: [{ title: "Resultado do período — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./v3.relatorios.vendas-CDUusmGC.mjs");
var Route$11 = createFileRoute("/_authenticated/v3/relatorios/vendas")({
	head: () => ({ meta: [{ title: "Relatório de vendas — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./v3.relatorios.viagem-B3RUl7Jl.mjs");
var Route$10 = createFileRoute("/_authenticated/v3/relatorios/viagem")({
	head: () => ({ meta: [{ title: "Relatório de viagem — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./v3.whatsapp.index-C7QO6pSq.mjs");
var Route$9 = createFileRoute("/_authenticated/v3/whatsapp/")({
	head: () => ({ meta: [{ title: "Inbox WhatsApp — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./v3.whatsapp.campanhas-Cv2BFkfv.mjs");
var Route$8 = createFileRoute("/_authenticated/v3/whatsapp/campanhas")({
	head: () => ({ meta: [{ title: "WhatsApp — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./v3.whatsapp.pos-venda-CpazubVI.mjs");
var Route$7 = createFileRoute("/_authenticated/v3/whatsapp/pos-venda")({
	head: () => ({ meta: [{ title: "Pós-venda WhatsApp — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./v3.whatsapp.templates-CuXpzBTk.mjs");
var Route$6 = createFileRoute("/_authenticated/v3/whatsapp/templates")({
	head: () => ({ meta: [{ title: "Templates WhatsApp — Prime Automotive" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var Route$5 = createFileRoute("/api/public/hooks/abandoned-carts-notify")({ server: { handlers: { POST: async ({ request }) => {
	var _process$env$CRON_SEC, _request$headers$get, _carts$length;
	const cronSecret = (_process$env$CRON_SEC = process.env.CRON_SECRET) !== null && _process$env$CRON_SEC !== void 0 ? _process$env$CRON_SEC : "";
	const provided = (_request$headers$get = request.headers.get("x-cron-secret")) !== null && _request$headers$get !== void 0 ? _request$headers$get : "";
	if (!cronSecret || provided !== cronSecret) return new Response("Unauthorized", { status: 401 });
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const now = Date.now();
	const oneHour = (/* @__PURE__ */ new Date(now - 3600 * 1e3)).toISOString();
	const fortyEight = (/* @__PURE__ */ new Date(now - 2880 * 60 * 1e3)).toISOString();
	const { data: carts, error } = await supabaseAdmin.from("abandoned_carts").select("id, total, company_id, companies(nome_fantasia, razao_social, telefone)").is("notified_at", null).is("recovered_at", null).lte("last_activity", oneHour).gte("last_activity", fortyEight).limit(50);
	if (error) return new Response(error.message, { status: 500 });
	let sent = 0;
	let skipped = 0;
	const errors = [];
	const instance = process.env.Z_API_INSTANCE_ID;
	const token = process.env.Z_API_TOKEN;
	const clientToken = process.env.Z_API_CLIENT_TOKEN;
	const zapiReady = !!(instance && token);
	for (const c of carts !== null && carts !== void 0 ? carts : []) {
		var _rel$telefone;
		const rel = c.companies;
		const phone = ((_rel$telefone = rel === null || rel === void 0 ? void 0 : rel.telefone) !== null && _rel$telefone !== void 0 ? _rel$telefone : "").replace(/\D/g, "");
		const nome = (rel === null || rel === void 0 ? void 0 : rel.nome_fantasia) || (rel === null || rel === void 0 ? void 0 : rel.razao_social) || "cliente";
		if (!phone || phone.length < 10) {
			skipped++;
			continue;
		}
		const message = `Olá, ${nome}! 👋\n\nNotamos que você deixou itens no seu carrinho na Prime Automotive (${Number(c.total).toLocaleString("pt-BR", {
			style: "currency",
			currency: "BRL"
		})}).\n\nPosso ajudar a finalizar seu pedido? Estamos com estoque e pronta entrega. 🚗🔑`;
		if (!zapiReady) {
			await supabaseAdmin.from("abandoned_carts").update({ notified_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", c.id);
			skipped++;
			continue;
		}
		try {
			const headers = { "Content-Type": "application/json" };
			if (clientToken) headers["Client-Token"] = clientToken;
			const res = await fetch(`https://api.z-api.io/instances/${instance}/token/${token}/send-text`, {
				method: "POST",
				headers,
				body: JSON.stringify({
					phone,
					message
				})
			});
			if (!res.ok) {
				errors.push(`cart ${c.id}: ${res.status}`);
				continue;
			}
			await supabaseAdmin.from("abandoned_carts").update({ notified_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", c.id);
			sent++;
		} catch (e) {
			errors.push(`cart ${c.id}: ${e.message}`);
		}
	}
	return new Response(JSON.stringify({
		ok: true,
		scanned: (_carts$length = carts === null || carts === void 0 ? void 0 : carts.length) !== null && _carts$length !== void 0 ? _carts$length : 0,
		sent,
		skipped,
		errors
	}), { headers: { "Content-Type": "application/json" } });
} } } });
var ZAPI_BASE$1 = "https://api.z-api.io";
var DEFAULT_BATCH_SIZE = 10;
var DEFAULT_MESSAGE_INTERVAL_SECONDS = 2;
var DEFAULT_BATCH_PAUSE_MINUTES = 0;
function zApiUrl$1(instanceId, token, path) {
	return `${ZAPI_BASE$1}/instances/${instanceId}/token/${token}${path}`;
}
function normalizePhone$1(p) {
	return p.replace(/\D/g, "");
}
function sleep$1(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
var Route$4 = createFileRoute("/api/public/hooks/process-campaigns")({ server: { handlers: { POST: async ({ request }) => {
	var _process$env$CRON_SEC, _request$headers$get, _campaigns$length;
	const cronSecret = (_process$env$CRON_SEC = process.env.CRON_SECRET) !== null && _process$env$CRON_SEC !== void 0 ? _process$env$CRON_SEC : "";
	const provided = (_request$headers$get = request.headers.get("x-cron-secret")) !== null && _request$headers$get !== void 0 ? _request$headers$get : "";
	if (!cronSecret || provided !== cronSecret) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const instanceId = process.env.Z_API_INSTANCE_ID;
	const token = process.env.Z_API_TOKEN;
	if (!instanceId || !token) return new Response(JSON.stringify({ error: "Z-API not configured" }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
	const now = /* @__PURE__ */ new Date();
	const nowIso = now.toISOString();
	const { data: campaigns, error: cErr } = await supabase.from("whatsapp_campaigns").select("*").or("status.eq.SCHEDULED,status.eq.SENDING").lte("scheduled_at", nowIso);
	if (cErr) return new Response(JSON.stringify({ error: cErr.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const results = [];
	for (const campaign of campaigns !== null && campaigns !== void 0 ? campaigns : []) {
		const c = campaign;
		const batchSize = Math.max(1, Number(c.batch_size) || DEFAULT_BATCH_SIZE);
		const pauseMinutes = Math.max(0, Number(c.batch_pause_minutes) || DEFAULT_BATCH_PAUSE_MINUTES);
		const intervalSeconds = Math.max(0, Number(c.message_interval_seconds) || DEFAULT_MESSAGE_INTERVAL_SECONDS);
		const sendLimit = c.send_limit ? Math.max(0, Number(c.send_limit)) : null;
		if (pauseMinutes > 0 && c.last_batch_at) {
			const nextAllowed = new Date(new Date(c.last_batch_at).getTime() + pauseMinutes * 6e4);
			if (nextAllowed > now) {
				results.push({
					campaignId: c.id,
					sent: 0,
					failed: 0,
					remaining: -1,
					skipped: `pausa até ${nextAllowed.toISOString()}`
				});
				continue;
			}
		}
		if (c.status === "SCHEDULED") await supabase.from("whatsapp_campaigns").update({ status: "SENDING" }).eq("id", c.id);
		let allowedThisRun = batchSize;
		if (sendLimit && sendLimit > 0) {
			const { count: sentCount } = await supabase.from("whatsapp_campaign_recipients").select("*", {
				count: "exact",
				head: true
			}).eq("campaign_id", c.id).eq("status", "SENT");
			const restante = sendLimit - (sentCount !== null && sentCount !== void 0 ? sentCount : 0);
			allowedThisRun = Math.max(0, Math.min(batchSize, restante));
			if (allowedThisRun === 0) {
				await supabase.from("whatsapp_campaigns").update({
					status: "DONE",
					sent_at: nowIso
				}).eq("id", c.id);
				results.push({
					campaignId: c.id,
					sent: 0,
					failed: 0,
					remaining: 0,
					skipped: "send_limit atingido"
				});
				continue;
			}
		}
		const { data: recipients, error: rErr } = await supabase.from("whatsapp_campaign_recipients").select("*").eq("campaign_id", c.id).eq("status", "PENDING").limit(allowedThisRun);
		if (rErr) {
			results.push({
				campaignId: c.id,
				sent: 0,
				failed: 0,
				remaining: 0
			});
			continue;
		}
		const leadIds = (recipients !== null && recipients !== void 0 ? recipients : []).map((r) => r.lead_id).filter(Boolean);
		const { data: leads } = await supabase.from("leads").select("id, contato, empresa").in("id", leadIds);
		const leadById = new Map((leads !== null && leads !== void 0 ? leads : []).map((l) => [l.id, l]));
		let ok = 0;
		let fail = 0;
		const hasImage = !!c.image_url;
		const endpoint = hasImage ? "/send-image" : "/send-text";
		for (const r of recipients !== null && recipients !== void 0 ? recipients : []) {
			try {
				var _lead$contato, _lead$empresa;
				const phone = normalizePhone$1(r.phone);
				const lead = r.lead_id ? leadById.get(r.lead_id) : void 0;
				const personalizedMessage = c.mensagem.replace(/\{\{nome\}\}/gi, (_lead$contato = lead === null || lead === void 0 ? void 0 : lead.contato) !== null && _lead$contato !== void 0 ? _lead$contato : "").replace(/\{\{empresa\}\}/gi, (_lead$empresa = lead === null || lead === void 0 ? void 0 : lead.empresa) !== null && _lead$empresa !== void 0 ? _lead$empresa : "");
				const payload = hasImage ? {
					phone,
					image: c.image_url,
					caption: personalizedMessage
				} : {
					phone,
					message: personalizedMessage
				};
				const res = await fetch(zApiUrl$1(instanceId, token, endpoint), {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(payload)
				});
				const body = await res.json().catch(() => ({}));
				if (!res.ok) throw new Error(JSON.stringify(body));
				await supabase.from("whatsapp_campaign_recipients").update({
					status: "SENT",
					sent_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("id", r.id);
				ok++;
			} catch (e) {
				await supabase.from("whatsapp_campaign_recipients").update({
					status: "FAILED",
					error: String(e)
				}).eq("id", r.id);
				fail++;
			}
			if (intervalSeconds > 0) await sleep$1(intervalSeconds * 1e3);
		}
		await supabase.from("whatsapp_campaigns").update({ last_batch_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", c.id);
		const { count: remaining } = await supabase.from("whatsapp_campaign_recipients").select("*", {
			count: "exact",
			head: true
		}).eq("campaign_id", c.id).eq("status", "PENDING");
		let finished = (remaining !== null && remaining !== void 0 ? remaining : 0) === 0;
		if (!finished && sendLimit && sendLimit > 0) {
			const { count: sentCount } = await supabase.from("whatsapp_campaign_recipients").select("*", {
				count: "exact",
				head: true
			}).eq("campaign_id", c.id).eq("status", "SENT");
			if ((sentCount !== null && sentCount !== void 0 ? sentCount : 0) >= sendLimit) finished = true;
		}
		if (finished) await supabase.from("whatsapp_campaigns").update({
			status: "DONE",
			sent_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", c.id);
		results.push({
			campaignId: c.id,
			sent: ok,
			failed: fail,
			remaining: remaining !== null && remaining !== void 0 ? remaining : 0
		});
	}
	return Response.json({
		processed: (_campaigns$length = campaigns === null || campaigns === void 0 ? void 0 : campaigns.length) !== null && _campaigns$length !== void 0 ? _campaigns$length : 0,
		results
	});
} } } });
var ZAPI_BASE = "https://api.z-api.io";
var BATCH_SIZE = 20;
var DELAY_MS = 1500;
var DEFAULT_MESSAGE = `Olá {{nome}}, tudo bem?

Aqui é da *Prime Automotive* 🚗🔑

Passando para agradecer pela sua compra! Foi um prazer atender você{{empresa_sufixo}}.

Se precisar de qualquer coisa — dúvidas, novas peças ou sugestões — nossos canais estão à disposição:

🌐 Site: www.primeautomotive.app
📧 E-mail: contato@primeautomotive.app
💬 WhatsApp: este mesmo número

Conte com a gente sempre! 🙌`;
function zApiUrl(instanceId, token, path) {
	return `${ZAPI_BASE}/instances/${instanceId}/token/${token}${path}`;
}
function normalizePhone(p) {
	const digits = p.replace(/\D/g, "");
	if (!digits) return "";
	return digits.startsWith("55") ? digits : `55${digits}`;
}
function sleep(ms) {
	return new Promise((r) => setTimeout(r, ms));
}
function renderMessage(template, vars) {
	var _vars$nome, _vars$empresa;
	const nome = ((_vars$nome = vars.nome) === null || _vars$nome === void 0 ? void 0 : _vars$nome.trim()) || "tudo certo";
	const empresa = ((_vars$empresa = vars.empresa) === null || _vars$empresa === void 0 ? void 0 : _vars$empresa.trim()) || "";
	return template.replace(/\{\{\s*nome\s*\}\}/gi, nome).replace(/\{\{\s*empresa\s*\}\}/gi, empresa).replace(/\{\{\s*empresa_sufixo\s*\}\}/gi, empresa ? ` — ${empresa}` : "");
}
var Route$3 = createFileRoute("/api/public/hooks/process-post-sale")({ server: { handlers: { POST: async ({ request }) => {
	var _process$env$CRON_SEC, _request$headers$get, _pending$length;
	const cronSecret = (_process$env$CRON_SEC = process.env.CRON_SECRET) !== null && _process$env$CRON_SEC !== void 0 ? _process$env$CRON_SEC : "";
	const provided = (_request$headers$get = request.headers.get("x-cron-secret")) !== null && _request$headers$get !== void 0 ? _request$headers$get : "";
	if (!cronSecret || provided !== cronSecret) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	const instanceId = process.env.Z_API_INSTANCE_ID;
	const token = process.env.Z_API_TOKEN;
	if (!instanceId || !token) return new Response(JSON.stringify({ error: "Z-API not configured" }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	const clientToken = process.env.Z_API_CLIENT_TOKEN;
	const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: {
		persistSession: false,
		autoRefreshToken: false
	} });
	const now = (/* @__PURE__ */ new Date()).toISOString();
	let templateDefault = DEFAULT_MESSAGE;
	try {
		const { data: setting } = await supabase.from("system_settings").select("valor").eq("categoria", "whatsapp").eq("chave", "post_sale_template").maybeSingle();
		const v = setting === null || setting === void 0 ? void 0 : setting.valor;
		if ((v === null || v === void 0 ? void 0 : v.template) && typeof v.template === "string" && v.template.trim()) templateDefault = v.template;
	} catch (_unused) {}
	const { data: pending, error } = await supabase.from("post_sale_messages").select("*").eq("status", "PENDING").lte("send_at", now).limit(BATCH_SIZE);
	if (error) return new Response(JSON.stringify({ error: error.message }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
	let ok = 0;
	let fail = 0;
	for (const row of pending !== null && pending !== void 0 ? pending : []) {
		try {
			const phone = normalizePhone(row.phone || "");
			if (!phone || phone.length < 8) throw new Error("Telefone inválido");
			const headers = { "Content-Type": "application/json" };
			if (clientToken) headers["Client-Token"] = clientToken;
			let nome = null;
			let empresa = null;
			const waDebug = [];
			const pickName = (o) => {
				if (!o || typeof o !== "object") return null;
				return o.name || o.short || o.notify || o.pushname || o.contactName || o.senderName || o.chatName || null;
			};
			const isPhoneLike = (s) => /^\+?\d[\d\s\-()]{5,}$/.test(s.trim());
			for (const path of [
				`/chats/${phone}`,
				`/contacts/${phone}`,
				`/contact-metadata/${phone}`
			]) try {
				const r = await fetch(zApiUrl(instanceId, token, path), { headers });
				const j = await r.json().catch(() => ({}));
				waDebug.push({
					path,
					status: r.status,
					body: j
				});
				if (r.ok) {
					const n = pickName(j) || pickName(j === null || j === void 0 ? void 0 : j.contact) || pickName(j === null || j === void 0 ? void 0 : j.chat);
					if (n && typeof n === "string" && !isPhoneLike(n)) {
						nome = n.trim().split(/\s+/)[0] || n.trim();
						break;
					}
				}
			} catch (e) {
				waDebug.push({
					path,
					error: String(e)
				});
			}
			if (!nome && row.lead_id) {
				var _l$contato, _l$empresa;
				const { data: l } = await supabase.from("leads").select("contato, empresa").eq("id", row.lead_id).maybeSingle();
				nome = (_l$contato = l === null || l === void 0 ? void 0 : l.contato) !== null && _l$contato !== void 0 ? _l$contato : null;
				empresa = (_l$empresa = l === null || l === void 0 ? void 0 : l.empresa) !== null && _l$empresa !== void 0 ? _l$empresa : null;
			}
			if (!nome && row.company_id) {
				var _ref, _c$trade_name, _ref2, _ref3, _empresa;
				const { data: c } = await supabase.from("companies").select("trade_name, legal_name").eq("id", row.company_id).maybeSingle();
				nome = (_ref = (_c$trade_name = c === null || c === void 0 ? void 0 : c.trade_name) !== null && _c$trade_name !== void 0 ? _c$trade_name : c === null || c === void 0 ? void 0 : c.legal_name) !== null && _ref !== void 0 ? _ref : null;
				empresa = (_ref2 = (_ref3 = (_empresa = empresa) !== null && _empresa !== void 0 ? _empresa : c === null || c === void 0 ? void 0 : c.trade_name) !== null && _ref3 !== void 0 ? _ref3 : c === null || c === void 0 ? void 0 : c.legal_name) !== null && _ref2 !== void 0 ? _ref2 : null;
			}
			const message = renderMessage(row.message || templateDefault, {
				nome,
				empresa
			});
			const res = await fetch(zApiUrl(instanceId, token, "/send-text"), {
				method: "POST",
				headers,
				body: JSON.stringify({
					phone,
					message
				})
			});
			const body = await res.json().catch(() => ({}));
			if (!res.ok) throw new Error(`Z-API ${res.status}: ${JSON.stringify(body)}`);
			let pdfResult = null;
			try {
				const pdfUrl = new URL(request.url).origin + signedOrderPdfPath(row.order_id, process.env.SUPABASE_SERVICE_ROLE_KEY);
				const docRes = await fetch(zApiUrl(instanceId, token, "/send-document/pdf"), {
					method: "POST",
					headers,
					body: JSON.stringify({
						phone,
						document: pdfUrl,
						fileName: `pedido-${row.order_id.slice(0, 8)}.pdf`,
						caption: "Segue o comprovante da sua compra."
					})
				});
				pdfResult = await docRes.json().catch(() => ({}));
				if (!docRes.ok) pdfResult = {
					error: `Z-API ${docRes.status}`,
					body: pdfResult
				};
			} catch (docErr) {
				pdfResult = { error: String(docErr) };
			}
			await supabase.from("post_sale_messages").update({
				status: "SENT",
				sent_at: (/* @__PURE__ */ new Date()).toISOString(),
				metadata: {
					text: body,
					pdf: pdfResult,
					wa: waDebug,
					nome,
					empresa
				},
				message
			}).eq("id", row.id);
			ok++;
		} catch (e) {
			await supabase.from("post_sale_messages").update({
				status: "FAILED",
				error: String(e)
			}).eq("id", row.id);
			fail++;
		}
		await sleep(DELAY_MS);
	}
	return Response.json({
		processed: (_pending$length = pending === null || pending === void 0 ? void 0 : pending.length) !== null && _pending$length !== void 0 ? _pending$length : 0,
		sent: ok,
		failed: fail
	});
} } } });
var Route$2 = createFileRoute("/api/public/push/click")({ server: { handlers: { POST: async ({ request }) => {
	try {
		const { deliveryId } = await request.json();
		if (!deliveryId || typeof deliveryId !== "string") return new Response("bad", { status: 400 });
		await createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLISHABLE_KEY, { auth: {
			storage: void 0,
			persistSession: false,
			autoRefreshToken: false
		} }).from("push_deliveries").update({ clicked_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", deliveryId);
		return new Response("ok");
	} catch (_unused) {
		return new Response("ok");
	}
} } } });
var Route$1 = createFileRoute("/api/public/whatsapp/webhook")({ server: { handlers: {
	POST: async ({ request }) => {
		var _process$env$ZAPI_WEB, _ref, _url$searchParams$get, _payload$type, _payload$phone, _ref4, _payload$messageId;
		const expected = (_process$env$ZAPI_WEB = process.env.ZAPI_WEBHOOK_TOKEN) !== null && _process$env$ZAPI_WEB !== void 0 ? _process$env$ZAPI_WEB : "";
		if (!expected) return new Response("Webhook token not configured", { status: 503 });
		if (((_ref = (_url$searchParams$get = new URL(request.url).searchParams.get("t")) !== null && _url$searchParams$get !== void 0 ? _url$searchParams$get : request.headers.get("x-webhook-token")) !== null && _ref !== void 0 ? _ref : "") !== expected) return new Response("Unauthorized", { status: 401 });
		const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
		let payload;
		try {
			payload = await request.json();
		} catch (_unused) {
			return new Response("invalid json", { status: 400 });
		}
		if (((_payload$type = payload === null || payload === void 0 ? void 0 : payload.type) !== null && _payload$type !== void 0 ? _payload$type : "") === "MessageStatusCallback" || (payload === null || payload === void 0 ? void 0 : payload.status)) {
			var _ref2, _payload$ids$, _payload$ids;
			const externalId = (_ref2 = (_payload$ids$ = payload === null || payload === void 0 || (_payload$ids = payload.ids) === null || _payload$ids === void 0 ? void 0 : _payload$ids[0]) !== null && _payload$ids$ !== void 0 ? _payload$ids$ : payload === null || payload === void 0 ? void 0 : payload.messageId) !== null && _ref2 !== void 0 ? _ref2 : payload === null || payload === void 0 ? void 0 : payload.id;
			const newStatus = mapZapiStatus(payload === null || payload === void 0 ? void 0 : payload.status);
			if (externalId && newStatus) await supabaseAdmin.from("whatsapp_messages").update({ status: newStatus }).eq("external_id", externalId);
			return new Response("ok");
		}
		const phoneRaw = (_payload$phone = payload === null || payload === void 0 ? void 0 : payload.phone) !== null && _payload$phone !== void 0 ? _payload$phone : payload === null || payload === void 0 ? void 0 : payload.from;
		if (!phoneRaw || (payload === null || payload === void 0 ? void 0 : payload.fromMe)) return new Response("ignored");
		const phone = String(phoneRaw).replace(/\D/g, "");
		let convId;
		const { data: existing } = await supabaseAdmin.from("whatsapp_conversations").select("id").eq("phone", phone).maybeSingle();
		if (existing) convId = existing.id;
		else {
			var _ref3, _payload$senderName, _lead$id;
			const { data: lead } = await supabaseAdmin.from("leads").select("id").ilike("whatsapp", `%${phone.slice(-8)}%`).limit(1).maybeSingle();
			const { data: created, error } = await supabaseAdmin.from("whatsapp_conversations").insert({
				phone,
				contact_name: (_ref3 = (_payload$senderName = payload === null || payload === void 0 ? void 0 : payload.senderName) !== null && _payload$senderName !== void 0 ? _payload$senderName : payload === null || payload === void 0 ? void 0 : payload.chatName) !== null && _ref3 !== void 0 ? _ref3 : null,
				lead_id: (_lead$id = lead === null || lead === void 0 ? void 0 : lead.id) !== null && _lead$id !== void 0 ? _lead$id : null
			}).select("id").single();
			if (error) return new Response(error.message, { status: 500 });
			convId = created.id;
		}
		const { type: msgType, content, fileUrl } = extractContent(payload);
		await supabaseAdmin.from("whatsapp_messages").insert({
			conversation_id: convId,
			direction: "IN",
			message_type: msgType,
			content,
			file_url: fileUrl,
			external_id: (_ref4 = (_payload$messageId = payload === null || payload === void 0 ? void 0 : payload.messageId) !== null && _payload$messageId !== void 0 ? _payload$messageId : payload === null || payload === void 0 ? void 0 : payload.id) !== null && _ref4 !== void 0 ? _ref4 : null,
			status: "RECEIVED",
			metadata: payload
		});
		return new Response("ok");
	},
	GET: async () => new Response("Z-API webhook ready", { status: 200 })
} } });
function mapZapiStatus(s) {
	if (!s) return null;
	const v = String(s).toUpperCase();
	if (v.includes("READ")) return "READ";
	if (v.includes("DELIVER") || v === "RECEIVED") return "DELIVERED";
	if (v.includes("SENT")) return "SENT";
	if (v.includes("FAIL") || v.includes("ERROR")) return "FAILED";
	return null;
}
function extractContent(p) {
	var _p$text, _p$image, _p$image$caption, _p$audio, _p$video, _p$video$caption, _p$document, _p$document$fileName, _p$contact$displayNam, _ref5, _p$body;
	if (p === null || p === void 0 || (_p$text = p.text) === null || _p$text === void 0 ? void 0 : _p$text.message) return {
		type: "TEXT",
		content: p.text.message,
		fileUrl: null
	};
	if (p === null || p === void 0 || (_p$image = p.image) === null || _p$image === void 0 ? void 0 : _p$image.imageUrl) return {
		type: "IMAGE",
		content: (_p$image$caption = p.image.caption) !== null && _p$image$caption !== void 0 ? _p$image$caption : null,
		fileUrl: p.image.imageUrl
	};
	if (p === null || p === void 0 || (_p$audio = p.audio) === null || _p$audio === void 0 ? void 0 : _p$audio.audioUrl) return {
		type: "AUDIO",
		content: null,
		fileUrl: p.audio.audioUrl
	};
	if (p === null || p === void 0 || (_p$video = p.video) === null || _p$video === void 0 ? void 0 : _p$video.videoUrl) return {
		type: "VIDEO",
		content: (_p$video$caption = p.video.caption) !== null && _p$video$caption !== void 0 ? _p$video$caption : null,
		fileUrl: p.video.videoUrl
	};
	if (p === null || p === void 0 || (_p$document = p.document) === null || _p$document === void 0 ? void 0 : _p$document.documentUrl) return {
		type: "DOCUMENT",
		content: (_p$document$fileName = p.document.fileName) !== null && _p$document$fileName !== void 0 ? _p$document$fileName : null,
		fileUrl: p.document.documentUrl
	};
	if (p === null || p === void 0 ? void 0 : p.location) return {
		type: "LOCATION",
		content: `${p.location.latitude},${p.location.longitude}`,
		fileUrl: null
	};
	if (p === null || p === void 0 ? void 0 : p.contact) return {
		type: "CONTACT",
		content: (_p$contact$displayNam = p.contact.displayName) !== null && _p$contact$displayNam !== void 0 ? _p$contact$displayNam : null,
		fileUrl: null
	};
	return {
		type: "TEXT",
		content: (_ref5 = (_p$body = p === null || p === void 0 ? void 0 : p.body) !== null && _p$body !== void 0 ? _p$body : p === null || p === void 0 ? void 0 : p.message) !== null && _ref5 !== void 0 ? _ref5 : null,
		fileUrl: null
	};
}
var IndexRoute = Route$128.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$129
});
var AuthenticatedRouteRoute = Route$127.update({
	id: "/_authenticated",
	getParentRoute: () => Route$129
});
var AuthRoute = Route$132.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$129
});
var CatalogRoute = Route$126.update({
	id: "/catalog",
	path: "/catalog",
	getParentRoute: () => Route$129
});
var McpRoute = Route$125.update({
	id: "/mcp",
	path: "/mcp",
	getParentRoute: () => Route$129
});
var OfflineRouteRoute = Route$124.update({
	id: "/offline-route",
	path: "/offline-route",
	getParentRoute: () => Route$129
});
var ResetPasswordRoute = Route$123.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$129
});
var SitemapDotxmlRoute = Route$122.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$129
});
var VendasOfflineRoute = Route$121.update({
	id: "/vendas-offline",
	path: "/vendas-offline",
	getParentRoute: () => Route$129
});
var Char91DotmcpChar93ListToolsRoute = Route$120.update({
	id: "/.mcp/list-tools",
	path: "/.mcp/list-tools",
	getParentRoute: () => Route$129
});
var Char91DotwellKnownChar93OauthProtectedResourceRoute = Route$119.update({
	id: "/.well-known/oauth-protected-resource",
	path: "/.well-known/oauth-protected-resource",
	getParentRoute: () => Route$129
});
var AuthenticatedAddressesRoute = Route$118.update({
	id: "/addresses",
	path: "/addresses",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCartRoute = Route$117.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCheckoutRoute = Route$116.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCompaniesRoute = Route$115.update({
	id: "/companies",
	path: "/companies",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedContactRoute = Route$114.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$113.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFavoritesRoute = Route$112.update({
	id: "/favorites",
	path: "/favorites",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOfflinePendentesRoute = Route$111.update({
	id: "/offline-pendentes",
	path: "/offline-pendentes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPosRoute = Route$110.update({
	id: "/pos",
	path: "/pos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSettingsRoute = Route$109.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var CartTokenRoute = Route$108.update({
	id: "/cart/$token",
	path: "/cart/$token",
	getParentRoute: () => Route$129
});
var CatalogIdRoute = Route$107.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => CatalogRoute
});
var V2IndexRoute = Route$106.update({
	id: "/v2/",
	path: "/v2/",
	getParentRoute: () => Route$129
});
var V2SplatRoute = Route$105.update({
	id: "/v2/$",
	path: "/v2/$",
	getParentRoute: () => Route$129
});
var V3IndexRoute = Route$104.update({
	id: "/v3/",
	path: "/v3/",
	getParentRoute: () => Route$129
});
var V3DescontosRoute = Route$103.update({
	id: "/v3/descontos",
	path: "/v3/descontos",
	getParentRoute: () => Route$129
});
var DotlovableOauthConsentRoute = Route.update({
	id: "/.lovable/oauth/consent",
	path: "/.lovable/oauth/consent",
	getParentRoute: () => Route$129
});
var Char91DotmcpChar93InvokeToolToolRoute = Route$102.update({
	id: "/.mcp/invoke-tool/$tool",
	path: "/.mcp/invoke-tool/$tool",
	getParentRoute: () => Route$129
});
var AuthenticatedAdminAbandonedCartsRoute = Route$101.update({
	id: "/admin/abandoned-carts",
	path: "/admin/abandoned-carts",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminBannersRoute = Route$100.update({
	id: "/admin/banners",
	path: "/admin/banners",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCatalogRoute = Route$99.update({
	id: "/admin/catalog",
	path: "/admin/catalog",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCompaniesRoute = Route$98.update({
	id: "/admin/companies",
	path: "/admin/companies",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminFeesRoute = Route$97.update({
	id: "/admin/fees",
	path: "/admin/fees",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminLabelsRoute = Route$96.update({
	id: "/admin/labels",
	path: "/admin/labels",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminObservabilityRoute = Route$95.update({
	id: "/admin/observability",
	path: "/admin/observability",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminOrdersRoute = Route$94.update({
	id: "/admin/orders",
	path: "/admin/orders",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPromotionsRoute = Route$93.update({
	id: "/admin/promotions",
	path: "/admin/promotions",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPushRoute = Route$92.update({
	id: "/admin/push",
	path: "/admin/push",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminSalesTargetsRoute = Route$91.update({
	id: "/admin/sales-targets",
	path: "/admin/sales-targets",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminSystemRoute = Route$90.update({
	id: "/admin/system",
	path: "/admin/system",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminUsersRoute = Route$89.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAiIndexRoute = Route$88.update({
	id: "/ai/",
	path: "/ai/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAutomationIndexRoute = Route$87.update({
	id: "/automation/",
	path: "/automation/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBiIndexRoute = Route$86.update({
	id: "/bi/",
	path: "/bi/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCampaignsIndexRoute = Route$85.update({
	id: "/campaigns/",
	path: "/campaigns/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCampaignsIdRoute = Route$84.update({
	id: "/campaigns/$id",
	path: "/campaigns/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCrmIndexRoute = Route$83.update({
	id: "/crm/",
	path: "/crm/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCrmIdRoute = Route$82.update({
	id: "/crm/$id",
	path: "/crm/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCrmAgendaRoute = Route$81.update({
	id: "/crm/agenda",
	path: "/crm/agenda",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedCrmProspeccaoRoute = Route$80.update({
	id: "/crm/prospeccao",
	path: "/crm/prospeccao",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFieldIndexRoute = Route$79.update({
	id: "/field/",
	path: "/field/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFieldAgendaRoute = Route$78.update({
	id: "/field/agenda",
	path: "/field/agenda",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFieldVendaOfflineRoute = Route$77.update({
	id: "/field/venda-offline",
	path: "/field/venda-offline",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFinanceIndexRoute = Route$76.update({
	id: "/finance/",
	path: "/finance/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFinanceReconciliationRoute = Route$75.update({
	id: "/finance/reconciliation",
	path: "/finance/reconciliation",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryIndexRoute = Route$74.update({
	id: "/inventory/",
	path: "/inventory/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryAlertsRoute = Route$73.update({
	id: "/inventory/alerts",
	path: "/inventory/alerts",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedInventoryCountsRoute = Route$72.update({
	id: "/inventory/counts",
	path: "/inventory/counts",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOrdersIndexRoute = Route$71.update({
	id: "/orders/",
	path: "/orders/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedOrdersIdRoute = Route$131.update({
	id: "/orders/$id",
	path: "/orders/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPortalIndexRoute = Route$70.update({
	id: "/portal/",
	path: "/portal/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPosIndexRoute = Route$69.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosCaixaRoute = Route$68.update({
	id: "/caixa",
	path: "/caixa",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosClientesRoute = Route$67.update({
	id: "/clientes",
	path: "/clientes",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosDiagnosticoRoute = Route$66.update({
	id: "/diagnostico",
	path: "/diagnostico",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosInstalarRoute = Route$65.update({
	id: "/instalar",
	path: "/instalar",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosPedidosRoute = Route$64.update({
	id: "/pedidos",
	path: "/pedidos",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosProdutosRoute = Route$63.update({
	id: "/produtos",
	path: "/produtos",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosTesteRoute = Route$62.update({
	id: "/teste",
	path: "/teste",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedPosVenderRoute = Route$61.update({
	id: "/vender",
	path: "/vender",
	getParentRoute: () => AuthenticatedPosRoute
});
var AuthenticatedRoutesIndexRoute = Route$60.update({
	id: "/routes/",
	path: "/routes/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AprovacoesRoute = Route$59.update({
	id: "/v3/aprovacoes",
	path: "/v3/aprovacoes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AutomacaoRoute = Route$58.update({
	id: "/v3/automacao",
	path: "/v3/automacao",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3BiRoute = Route$57.update({
	id: "/v3/bi",
	path: "/v3/bi",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3CampanhasRoute = Route$56.update({
	id: "/v3/campanhas",
	path: "/v3/campanhas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3CampoRoute = Route$55.update({
	id: "/v3/campo",
	path: "/v3/campo",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3CatalogoAdminRoute = Route$54.update({
	id: "/v3/catalogo-admin",
	path: "/v3/catalogo-admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3ComprasRoute = Route$53.update({
	id: "/v3/compras",
	path: "/v3/compras",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3ConfiguracoesRoute = Route$52.update({
	id: "/v3/configuracoes",
	path: "/v3/configuracoes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3DashboardRoute = Route$51.update({
	id: "/v3/dashboard",
	path: "/v3/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3DemandasRoute = Route$50.update({
	id: "/v3/demandas",
	path: "/v3/demandas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3DespesaEmpresaRoute = Route$49.update({
	id: "/v3/despesa-empresa",
	path: "/v3/despesa-empresa",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3DespesasRoute = Route$48.update({
	id: "/v3/despesas",
	path: "/v3/despesas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3EmpresasRoute = Route$47.update({
	id: "/v3/empresas",
	path: "/v3/empresas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3FechamentoRoute = Route$46.update({
	id: "/v3/fechamento",
	path: "/v3/fechamento",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3FinanceiroRoute = Route$45.update({
	id: "/v3/financeiro",
	path: "/v3/financeiro",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3HojeRoute = Route$44.update({
	id: "/v3/hoje",
	path: "/v3/hoje",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3IaRoute = Route$43.update({
	id: "/v3/ia",
	path: "/v3/ia",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3ParticularRoute = Route$42.update({
	id: "/v3/particular",
	path: "/v3/particular",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3PdvRoute = Route$41.update({
	id: "/v3/pdv",
	path: "/v3/pdv",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3PedidosRoute = Route$40.update({
	id: "/v3/pedidos",
	path: "/v3/pedidos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3PortalRoute = Route$39.update({
	id: "/v3/portal",
	path: "/v3/portal",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3ProspeccaoRoute = Route$38.update({
	id: "/v3/prospeccao",
	path: "/v3/prospeccao",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RotasRoute = Route$37.update({
	id: "/v3/rotas",
	path: "/v3/rotas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3ViagensRoute = Route$36.update({
	id: "/v3/viagens",
	path: "/v3/viagens",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedVendasNovaRoute = Route$35.update({
	id: "/vendas/nova",
	path: "/vendas/nova",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedVendasViagensRoute = Route$34.update({
	id: "/vendas/viagens",
	path: "/vendas/viagens",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedWhatsappIndexRoute = Route$33.update({
	id: "/whatsapp/",
	path: "/whatsapp/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedWhatsappCampaignsRoute = Route$32.update({
	id: "/whatsapp/campaigns",
	path: "/whatsapp/campaigns",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedWhatsappPosVendaRoute = Route$31.update({
	id: "/whatsapp/pos-venda",
	path: "/whatsapp/pos-venda",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedWhatsappTemplatesRoute = Route$30.update({
	id: "/whatsapp/templates",
	path: "/whatsapp/templates",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AdminBannersRoute = Route$29.update({
	id: "/v3/admin/banners",
	path: "/v3/admin/banners",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AdminCarrinhosRoute = Route$28.update({
	id: "/v3/admin/carrinhos",
	path: "/v3/admin/carrinhos",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AdminMetasRoute = Route$27.update({
	id: "/v3/admin/metas",
	path: "/v3/admin/metas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AdminPromocoesRoute = Route$26.update({
	id: "/v3/admin/promocoes",
	path: "/v3/admin/promocoes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AdminPushRoute = Route$25.update({
	id: "/v3/admin/push",
	path: "/v3/admin/push",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3AdminUsuariosRoute = Route$24.update({
	id: "/v3/admin/usuarios",
	path: "/v3/admin/usuarios",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3CrmIndexRoute = Route$23.update({
	id: "/v3/crm/",
	path: "/v3/crm/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3CrmAgendaRoute = Route$22.update({
	id: "/v3/crm/agenda",
	path: "/v3/crm/agenda",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3EstoqueIndexRoute = Route$21.update({
	id: "/v3/estoque/",
	path: "/v3/estoque/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3EstoqueAlertasRoute = Route$20.update({
	id: "/v3/estoque/alertas",
	path: "/v3/estoque/alertas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3EstoqueContagensRoute = Route$19.update({
	id: "/v3/estoque/contagens",
	path: "/v3/estoque/contagens",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3FinanceiroConciliacaoRoute = Route$18.update({
	id: "/conciliacao",
	path: "/conciliacao",
	getParentRoute: () => AuthenticatedV3FinanceiroRoute
});
var AuthenticatedV3RelatoriosIndexRoute = Route$17.update({
	id: "/v3/relatorios/",
	path: "/v3/relatorios/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RelatoriosAbcRoute = Route$16.update({
	id: "/v3/relatorios/abc",
	path: "/v3/relatorios/abc",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RelatoriosAbcClientesRoute = Route$15.update({
	id: "/v3/relatorios/abc-clientes",
	path: "/v3/relatorios/abc-clientes",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RelatoriosGiroRoute = Route$14.update({
	id: "/v3/relatorios/giro",
	path: "/v3/relatorios/giro",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RelatoriosProjecaoRoute = Route$13.update({
	id: "/v3/relatorios/projecao",
	path: "/v3/relatorios/projecao",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RelatoriosResultadoRoute = Route$12.update({
	id: "/v3/relatorios/resultado",
	path: "/v3/relatorios/resultado",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RelatoriosVendasRoute = Route$11.update({
	id: "/v3/relatorios/vendas",
	path: "/v3/relatorios/vendas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3RelatoriosViagemRoute = Route$10.update({
	id: "/v3/relatorios/viagem",
	path: "/v3/relatorios/viagem",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3VendasNovaRoute = Route$133.update({
	id: "/v3/vendas/nova",
	path: "/v3/vendas/nova",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3WhatsappIndexRoute = Route$9.update({
	id: "/v3/whatsapp/",
	path: "/v3/whatsapp/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3WhatsappCampanhasRoute = Route$8.update({
	id: "/v3/whatsapp/campanhas",
	path: "/v3/whatsapp/campanhas",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3WhatsappPosVendaRoute = Route$7.update({
	id: "/v3/whatsapp/pos-venda",
	path: "/v3/whatsapp/pos-venda",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedV3WhatsappTemplatesRoute = Route$6.update({
	id: "/v3/whatsapp/templates",
	path: "/v3/whatsapp/templates",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ApiPublicHooksAbandonedCartsNotifyRoute = Route$5.update({
	id: "/api/public/hooks/abandoned-carts-notify",
	path: "/api/public/hooks/abandoned-carts-notify",
	getParentRoute: () => Route$129
});
var ApiPublicHooksProcessCampaignsRoute = Route$4.update({
	id: "/api/public/hooks/process-campaigns",
	path: "/api/public/hooks/process-campaigns",
	getParentRoute: () => Route$129
});
var ApiPublicHooksProcessPostSaleRoute = Route$3.update({
	id: "/api/public/hooks/process-post-sale",
	path: "/api/public/hooks/process-post-sale",
	getParentRoute: () => Route$129
});
var ApiPublicOrdersPdfRoute = Route$130.update({
	id: "/api/public/orders/pdf",
	path: "/api/public/orders/pdf",
	getParentRoute: () => Route$129
});
var ApiPublicPushClickRoute = Route$2.update({
	id: "/api/public/push/click",
	path: "/api/public/push/click",
	getParentRoute: () => Route$129
});
var ApiPublicWhatsappWebhookRoute = Route$1.update({
	id: "/api/public/whatsapp/webhook",
	path: "/api/public/whatsapp/webhook",
	getParentRoute: () => Route$129
});
var AuthenticatedPosRouteChildren = {
	AuthenticatedPosCaixaRoute,
	AuthenticatedPosClientesRoute,
	AuthenticatedPosDiagnosticoRoute,
	AuthenticatedPosInstalarRoute,
	AuthenticatedPosPedidosRoute,
	AuthenticatedPosProdutosRoute,
	AuthenticatedPosTesteRoute,
	AuthenticatedPosVenderRoute,
	AuthenticatedPosIndexRoute
};
var AuthenticatedPosRouteWithChildren = AuthenticatedPosRoute._addFileChildren(AuthenticatedPosRouteChildren);
var AuthenticatedV3FinanceiroRouteChildren = { AuthenticatedV3FinanceiroConciliacaoRoute };
var AuthenticatedRouteRouteChildren = {
	AuthenticatedAddressesRoute,
	AuthenticatedCartRoute,
	AuthenticatedCheckoutRoute,
	AuthenticatedCompaniesRoute,
	AuthenticatedContactRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedFavoritesRoute,
	AuthenticatedOfflinePendentesRoute,
	AuthenticatedPosRoute: AuthenticatedPosRouteWithChildren,
	AuthenticatedSettingsRoute,
	AuthenticatedAdminAbandonedCartsRoute,
	AuthenticatedAdminBannersRoute,
	AuthenticatedAdminCatalogRoute,
	AuthenticatedAdminCompaniesRoute,
	AuthenticatedAdminFeesRoute,
	AuthenticatedAdminLabelsRoute,
	AuthenticatedAdminObservabilityRoute,
	AuthenticatedAdminOrdersRoute,
	AuthenticatedAdminPromotionsRoute,
	AuthenticatedAdminPushRoute,
	AuthenticatedAdminSalesTargetsRoute,
	AuthenticatedAdminSystemRoute,
	AuthenticatedAdminUsersRoute,
	AuthenticatedCampaignsIdRoute,
	AuthenticatedCrmIdRoute,
	AuthenticatedCrmAgendaRoute,
	AuthenticatedCrmProspeccaoRoute,
	AuthenticatedFieldAgendaRoute,
	AuthenticatedFieldVendaOfflineRoute,
	AuthenticatedFinanceReconciliationRoute,
	AuthenticatedInventoryAlertsRoute,
	AuthenticatedInventoryCountsRoute,
	AuthenticatedOrdersIdRoute,
	AuthenticatedV3AprovacoesRoute,
	AuthenticatedV3AutomacaoRoute,
	AuthenticatedV3BiRoute,
	AuthenticatedV3CampanhasRoute,
	AuthenticatedV3CampoRoute,
	AuthenticatedV3CatalogoAdminRoute,
	AuthenticatedV3ComprasRoute,
	AuthenticatedV3ConfiguracoesRoute,
	AuthenticatedV3DashboardRoute,
	AuthenticatedV3DemandasRoute,
	AuthenticatedV3DespesaEmpresaRoute,
	AuthenticatedV3DespesasRoute,
	AuthenticatedV3EmpresasRoute,
	AuthenticatedV3FechamentoRoute,
	AuthenticatedV3FinanceiroRoute: AuthenticatedV3FinanceiroRoute._addFileChildren(AuthenticatedV3FinanceiroRouteChildren),
	AuthenticatedV3HojeRoute,
	AuthenticatedV3IaRoute,
	AuthenticatedV3ParticularRoute,
	AuthenticatedV3PdvRoute,
	AuthenticatedV3PedidosRoute,
	AuthenticatedV3PortalRoute,
	AuthenticatedV3ProspeccaoRoute,
	AuthenticatedV3RotasRoute,
	AuthenticatedV3ViagensRoute,
	AuthenticatedVendasNovaRoute,
	AuthenticatedVendasViagensRoute,
	AuthenticatedWhatsappCampaignsRoute,
	AuthenticatedWhatsappPosVendaRoute,
	AuthenticatedWhatsappTemplatesRoute,
	AuthenticatedAiIndexRoute,
	AuthenticatedAutomationIndexRoute,
	AuthenticatedBiIndexRoute,
	AuthenticatedCampaignsIndexRoute,
	AuthenticatedCrmIndexRoute,
	AuthenticatedFieldIndexRoute,
	AuthenticatedFinanceIndexRoute,
	AuthenticatedInventoryIndexRoute,
	AuthenticatedOrdersIndexRoute,
	AuthenticatedPortalIndexRoute,
	AuthenticatedRoutesIndexRoute,
	AuthenticatedWhatsappIndexRoute,
	AuthenticatedV3AdminBannersRoute,
	AuthenticatedV3AdminCarrinhosRoute,
	AuthenticatedV3AdminMetasRoute,
	AuthenticatedV3AdminPromocoesRoute,
	AuthenticatedV3AdminPushRoute,
	AuthenticatedV3AdminUsuariosRoute,
	AuthenticatedV3CrmAgendaRoute,
	AuthenticatedV3EstoqueAlertasRoute,
	AuthenticatedV3EstoqueContagensRoute,
	AuthenticatedV3RelatoriosAbcRoute,
	AuthenticatedV3RelatoriosAbcClientesRoute,
	AuthenticatedV3RelatoriosGiroRoute,
	AuthenticatedV3RelatoriosProjecaoRoute,
	AuthenticatedV3RelatoriosResultadoRoute,
	AuthenticatedV3RelatoriosVendasRoute,
	AuthenticatedV3RelatoriosViagemRoute,
	AuthenticatedV3VendasNovaRoute,
	AuthenticatedV3WhatsappCampanhasRoute,
	AuthenticatedV3WhatsappPosVendaRoute,
	AuthenticatedV3WhatsappTemplatesRoute,
	AuthenticatedV3CrmIndexRoute,
	AuthenticatedV3EstoqueIndexRoute,
	AuthenticatedV3RelatoriosIndexRoute,
	AuthenticatedV3WhatsappIndexRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var CatalogRouteChildren = { CatalogIdRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AuthRoute,
	CatalogRoute: CatalogRoute._addFileChildren(CatalogRouteChildren),
	McpRoute,
	OfflineRouteRoute,
	ResetPasswordRoute,
	SitemapDotxmlRoute,
	VendasOfflineRoute,
	Char91DotmcpChar93ListToolsRoute,
	Char91DotwellKnownChar93OauthProtectedResourceRoute,
	CartTokenRoute,
	V2SplatRoute,
	V3DescontosRoute,
	V2IndexRoute,
	V3IndexRoute,
	DotlovableOauthConsentRoute,
	Char91DotmcpChar93InvokeToolToolRoute,
	ApiPublicHooksAbandonedCartsNotifyRoute,
	ApiPublicHooksProcessCampaignsRoute,
	ApiPublicHooksProcessPostSaleRoute,
	ApiPublicOrdersPdfRoute,
	ApiPublicPushClickRoute,
	ApiPublicWhatsappWebhookRoute
};
var routeTree = Route$129._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient({ defaultOptions: { queries: {
			gcTime: 1e3 * 60 * 60 * 24 * 7,
			staleTime: 1e3 * 30,
			retry: 1
		} } }) },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
