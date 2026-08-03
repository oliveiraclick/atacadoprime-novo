import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { t as brand_logo_png_asset_default } from "./brand-logo.png.asset-9qqK49Y7.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { f as Outlet, l as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { dt as LoaderCircle, ut as LogIn } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CflZRHcy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var COOKIE_NAME = "pa_pos_terminal";
var STORAGE_KEY = "pa_pos_terminal_token";
var ONE_YEAR = 3600 * 24 * 365;
function readCookie(name) {
	if (typeof document === "undefined") return null;
	const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
	return match ? decodeURIComponent(match.slice(name.length + 1)) : null;
}
function writeCookie(name, value, maxAge) {
	if (typeof document === "undefined") return;
	const secure = window.location.protocol === "https:" ? "; Secure" : "";
	document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}
/** Saves the refresh token so the terminal never asks for login again. */
function rememberTerminal(refreshToken) {
	if (!refreshToken) return;
	writeCookie(COOKIE_NAME, refreshToken, ONE_YEAR);
	try {
		localStorage.setItem(STORAGE_KEY, refreshToken);
	} catch (_unused) {}
}
function forgetTerminal() {
	writeCookie(COOKIE_NAME, "", 0);
	try {
		localStorage.removeItem(STORAGE_KEY);
	} catch (_unused2) {}
}
function storedToken() {
	var _readCookie;
	let local = null;
	try {
		local = localStorage.getItem(STORAGE_KEY);
	} catch (_unused3) {
		local = null;
	}
	return (_readCookie = readCookie(COOKIE_NAME)) !== null && _readCookie !== void 0 ? _readCookie : local;
}
function hasTerminalToken() {
	return !!storedToken();
}
/** Restores the paired terminal session silently. Returns true on success. */
async function restoreTerminalSession() {
	const refresh_token = storedToken();
	if (!refresh_token) return false;
	const { data, error } = await supabase.auth.refreshSession({ refresh_token });
	if (error || !data.session) {
		forgetTerminal();
		return false;
	}
	rememberTerminal(data.session.refresh_token);
	return true;
}
function PosLogin() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		var _data$session;
		event.preventDefault();
		if (loading) return;
		setLoading(true);
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) {
			toast.error("Email ou senha incorretos.");
			return;
		}
		rememberTerminal((_data$session = data.session) === null || _data$session === void 0 ? void 0 : _data$session.refresh_token);
		toast.success("Terminal liberado. Não vai pedir login novamente.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-screen bg-background px-3 py-4 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-[340px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-5 flex items-center justify-center gap-2 border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: brand_logo_png_asset_default.url,
					alt: "Prime Automotive",
					className: "h-10 w-10 object-contain"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-sm font-semibold",
					children: "POS Prime"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted-foreground",
					children: "Terminal de vendas"
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				"aria-labelledby": "pos-login-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						id: "pos-login-title",
						className: "text-lg font-semibold",
						children: "Entrar"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Use seu email e senha para abrir o POS."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleSubmit,
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "pos-email",
									children: "Email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "pos-email",
									type: "email",
									inputMode: "email",
									autoComplete: "username",
									value: email,
									onChange: (event) => setEmail(event.target.value),
									className: "h-12 text-base",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "pos-password",
									children: "Senha"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "pos-password",
									type: "password",
									autoComplete: "current-password",
									value: password,
									onChange: (event) => setPassword(event.target.value),
									className: "h-12 text-base",
									required: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "submit",
								className: "h-12 w-full font-semibold",
								disabled: loading,
								children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4" }), "Entrar no POS"]
							})
						]
					})
				]
			})]
		})
	});
}
function AuthenticatedLayout() {
	const { user, loading } = useAuth();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const posAccess = pathname === "/pos" || pathname.startsWith("/pos/");
	const offlineVenda = pathname === "/field/venda-offline" && typeof navigator !== "undefined" && !navigator.onLine;
	const [restoring, setRestoring] = (0, import_react.useState)(() => posAccess && hasTerminalToken());
	(0, import_react.useEffect)(() => {
		if (!posAccess || loading || user) return;
		if (!hasTerminalToken()) {
			setRestoring(false);
			return;
		}
		let active = true;
		setRestoring(true);
		restoreTerminalSession().finally(() => {
			if (active) setRestoring(false);
		});
		return () => {
			active = false;
		};
	}, [
		posAccess,
		loading,
		user
	]);
	(0, import_react.useEffect)(() => {
		if (!loading && !user && !offlineVenda && !posAccess) {
			const back = window.location.pathname + window.location.search;
			const qs = back && back !== "/" ? `?redirect=${encodeURIComponent(back)}` : "";
			window.location.replace(`/auth${qs}`);
		}
	}, [
		loading,
		user,
		offlineVenda,
		posAccess
	]);
	if (offlineVenda) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	if (!loading && !user && posAccess && !restoring) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PosLogin, {});
	if (loading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background text-muted-foreground grid place-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Carregando…"]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
}
//#endregion
export { AuthenticatedLayout as component };
