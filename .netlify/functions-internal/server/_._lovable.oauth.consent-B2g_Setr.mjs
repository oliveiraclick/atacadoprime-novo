import { o as __toESM } from "./_runtime.mjs";
import { N as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as oauth, t as Shell } from "./_._lovable.oauth.consent-DTClbIDf.mjs";
import { i as require_react } from "./_libs/dnd-kit__accessibility+react.mjs";
import { t as Route } from "./_._lovable.oauth.consent-C4TjBOHP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_._lovable.oauth.consent-B2g_Setr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Consent() {
	var _details$client$name, _details$client, _ref, _details$client$redir, _details$client2, _details$scope;
	const details = Route.useLoaderData();
	const { authorization_id } = Route.useSearch();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const clientName = (_details$client$name = details === null || details === void 0 || (_details$client = details.client) === null || _details$client === void 0 ? void 0 : _details$client.name) !== null && _details$client$name !== void 0 ? _details$client$name : "Aplicativo externo";
	const redirectUri = (_ref = (_details$client$redir = details === null || details === void 0 || (_details$client2 = details.client) === null || _details$client2 === void 0 ? void 0 : _details$client2.redirect_uri) !== null && _details$client$redir !== void 0 ? _details$client$redir : details === null || details === void 0 ? void 0 : details.redirect_uri) !== null && _ref !== void 0 ? _ref : null;
	const scopes = String((_details$scope = details === null || details === void 0 ? void 0 : details.scope) !== null && _details$scope !== void 0 ? _details$scope : "").split(/\s+/).filter(Boolean);
	async function decide(approve) {
		var _data$redirect_url;
		setBusy(true);
		setError(null);
		const { data, error: err } = approve ? await oauth().approveAuthorization(authorization_id) : await oauth().denyAuthorization(authorization_id);
		if (err) {
			setBusy(false);
			setError(err.message);
			return;
		}
		const target = (_data$redirect_url = data === null || data === void 0 ? void 0 : data.redirect_url) !== null && _data$redirect_url !== void 0 ? _data$redirect_url : data === null || data === void 0 ? void 0 : data.redirect_to;
		if (!target) {
			setBusy(false);
			setError("O servidor de autorização não retornou um destino de redirecionamento.");
			return;
		}
		window.location.href = target;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Shell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-lg font-bold leading-snug",
				children: [
					"Conectar ",
					clientName,
					" à sua conta"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm",
				style: { color: "#8b7355" },
				children: [
					"Isso permite que ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: clientName }),
					" use as ferramentas do Atacado Prime como você — consultando vendas, resultado, clientes, estoque e pedidos."
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border p-3 text-xs space-y-1",
			style: {
				borderColor: "#e8e2d8",
				background: "#faf8f5"
			},
			children: [
				redirectUri && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "#8b7355" },
						children: "Redireciona para:"
					}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "break-all",
						children: redirectUri
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: "#8b7355" },
						children: "Permissões:"
					}),
					" ",
					scopes.length ? scopes.join(", ") : "perfil básico e e-mail"
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { color: "#8b7355" },
					children: "As regras de acesso do sistema continuam valendo — você só vê o que já tem permissão de ver."
				})
			]
		}),
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			role: "alert",
			className: "text-sm",
			style: { color: "#b91c1c" },
			children: error
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: busy,
				onClick: () => decide(true),
				className: "flex-1 h-11 rounded-xl font-semibold text-sm disabled:opacity-60",
				style: {
					background: "#c9a96e",
					color: "#ffffff"
				},
				children: busy ? "Processando…" : "Aprovar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				disabled: busy,
				onClick: () => decide(false),
				className: "flex-1 h-11 rounded-xl font-semibold text-sm border disabled:opacity-60",
				style: {
					borderColor: "#e8e2d8",
					color: "#3d2b1f"
				},
				children: "Cancelar"
			})]
		})
	] });
}
//#endregion
export { Consent as component };
