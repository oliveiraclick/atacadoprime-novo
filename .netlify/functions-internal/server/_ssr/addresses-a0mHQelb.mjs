import { o as __toESM } from "../_runtime.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as _objectSpread2 } from "./objectSpread2-Dy4Ru7eO.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { n as useMyCompany, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { G as Plus, _ as Trash2, st as MapPin } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as AppShell } from "./app-shell-KlJx9hrW.mjs";
import { n as useCreateAddress, r as useDeleteAddress, t as useAddresses } from "./use-addresses-C_eHrBQe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/addresses-a0mHQelb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyForm = {
	label: "",
	street: "",
	number: "",
	complement: "",
	district: "",
	city: "",
	state: "",
	zip: ""
};
function AddressesPage() {
	const { user } = useAuth();
	const { data: company } = useMyCompany(user);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(emptyForm);
	const { data: addresses = [] } = useAddresses(company === null || company === void 0 ? void 0 : company.id);
	const createAddress = useCreateAddress(company === null || company === void 0 ? void 0 : company.id);
	const deleteAddress = useDeleteAddress(company === null || company === void 0 ? void 0 : company.id);
	async function add(e) {
		e.preventDefault();
		if (!company) return;
		try {
			await createAddress.mutateAsync(form);
			toast.success("Endereço adicionado");
			setForm(emptyForm);
			setOpen(false);
		} catch (err) {
			toast.error(err.message);
		}
	}
	async function remove(id) {
		try {
			await deleteAddress.mutateAsync(id);
			toast.success("Endereço removido");
		} catch (err) {
			toast.error(err.message);
		}
	}
	if (!company) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Endereços",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card border border-border rounded-xl p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground",
				children: "Cadastre sua empresa primeiro para gerenciar endereços."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/companies",
					children: "Cadastrar empresa"
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Endereços",
		description: "Endereços de cobrança e entrega da empresa.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setOpen((s) => !s),
					variant: open ? "outline" : "default",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "w-4 h-4 mr-1" }),
						" ",
						open ? "Cancelar" : "Adicionar endereço"
					]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: add,
				className: "bg-card border border-border rounded-xl p-6 shadow-soft mb-6 grid sm:grid-cols-2 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "label",
						label: "Apelido (ex: Matriz)",
						value: form.label,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { label: v }))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "zip",
						label: "CEP *",
						value: form.zip,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { zip: v })),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "street",
						label: "Rua *",
						value: form.street,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { street: v })),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "number",
						label: "Número",
						value: form.number,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { number: v }))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "complement",
						label: "Complemento",
						value: form.complement,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { complement: v }))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "district",
						label: "Bairro",
						value: form.district,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { district: v }))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "city",
						label: "Cidade *",
						value: form.city,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { city: v })),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(F, {
						id: "state",
						label: "UF *",
						value: form.state,
						set: (v) => setForm(_objectSpread2(_objectSpread2({}, form), {}, { state: v })),
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sm:col-span-2 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Salvar endereço"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-2 gap-4",
				children: addresses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground col-span-full text-center py-12",
					children: "Nenhum endereço cadastrado."
				}) : addresses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-card border border-border rounded-xl p-5 shadow-soft",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-9 h-9 rounded-md bg-primary/10 text-primary grid place-items-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "w-4 h-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: a.label || "Endereço"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											a.street,
											", ",
											a.number,
											" ",
											a.complement && `- ${a.complement}`
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											a.district && `${a.district} · `,
											a.city,
											"/",
											a.state,
											" · ",
											a.zip
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => remove(a.id),
								"aria-label": "Remover",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 text-destructive" })
							})
						]
					})
				}, a.id))
			})
		]
	});
}
function F({ id, label, value, set, required }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id,
			value,
			onChange: (e) => set(e.target.value),
			required
		})]
	});
}
//#endregion
export { AddressesPage as component };
