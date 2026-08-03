import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { r as useProfile, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { dt as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell } from "./app-shell-KlJx9hrW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CdS-_UNF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	var _user$email;
	const { user } = useAuth();
	const { data: profile } = useProfile(user);
	const qc = useQueryClient();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [pwd, setPwd] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (profile) {
			var _profile$full_name, _profile$phone;
			setFullName((_profile$full_name = profile.full_name) !== null && _profile$full_name !== void 0 ? _profile$full_name : "");
			setPhone((_profile$phone = profile.phone) !== null && _profile$phone !== void 0 ? _profile$phone : "");
		}
	}, [profile]);
	async function saveProfile(e) {
		e.preventDefault();
		if (!user) return;
		setSaving(true);
		const { error } = await supabase.from("profiles").update({
			full_name: fullName,
			phone
		}).eq("id", user.id);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Perfil atualizado");
		qc.invalidateQueries({ queryKey: ["profile", user.id] });
	}
	async function changePassword(e) {
		e.preventDefault();
		const { error } = await supabase.auth.updateUser({ password: pwd });
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Senha atualizada");
		setPwd("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Configurações",
		description: "Atualize seus dados pessoais e segurança.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: saveProfile,
				className: "bg-card border border-border rounded-xl p-6 shadow-soft space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Perfil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							value: (_user$email = user === null || user === void 0 ? void 0 : user.email) !== null && _user$email !== void 0 ? _user$email : "",
							disabled: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "full_name",
							children: "Nome completo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "full_name",
							value: fullName,
							onChange: (e) => setFullName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "phone",
							children: "Telefone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							value: phone,
							onChange: (e) => setPhone(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: saving,
							children: [saving && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }), " Salvar"]
						})
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: changePassword,
				className: "bg-card border border-border rounded-xl p-6 shadow-soft space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Senha"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "new_pwd",
							children: "Nova senha"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "new_pwd",
							type: "password",
							minLength: 8,
							value: pwd,
							onChange: (e) => setPwd(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Atualizar senha"
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { SettingsPage as component };
