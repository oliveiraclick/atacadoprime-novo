import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { D as ShoppingBag, N as Search, dt as LoaderCircle, in as Building2, mn as ArrowLeft, q as Phone, st as MapPin, u as UserPlus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pos.clientes-DIJbKp4f.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PosClientes() {
	const [q, setQ] = (0, import_react.useState)("");
	const [novo, setNovo] = (0, import_react.useState)(false);
	const qc = useQueryClient();
	const navigate = useNavigate();
	const setCustomer = useSellerSession((s) => s.setCustomer);
	const { data: rows = [], isLoading } = useQuery({
		queryKey: ["pos-clientes", q],
		queryFn: async () => {
			let query = supabase.from("companies").select("id, legal_name, trade_name, tax_id, phone, cidade, estado").eq("status", "approved").order("legal_name").limit(80);
			if (q.trim().length >= 2) {
				const term = `%${q.trim()}%`;
				query = query.or(`legal_name.ilike.${term},trade_name.ilike.${term},tax_id.ilike.${term},cidade.ilike.${term}`);
			}
			const { data, error } = await query;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	function venderPara(c) {
		var _c$trade_name;
		setCustomer(c);
		toast.success(`Cliente: ${(_c$trade_name = c.trade_name) !== null && _c$trade_name !== void 0 ? _c$trade_name : c.legal_name}`);
		navigate({ to: "/pos/vender" });
	}
	if (novo) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "flex items-center gap-1 text-sm mb-3",
			style: { color: V2.LIGHT_MUTED },
			onClick: () => setNovo(false),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " Voltar à lista"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NovoClienteForm, {
			onCancel: () => setNovo(false),
			onCreated: (c) => {
				qc.invalidateQueries({ queryKey: ["pos-clientes"] });
				qc.invalidateQueries({ queryKey: ["pos-customers"] });
				setNovo(false);
				venderPara(c);
			}
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3 space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => setQ(e.target.value),
					placeholder: "Buscar nome, CNPJ ou cidade",
					className: "pl-8 h-12 text-base"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "w-full h-12 font-semibold",
				style: {
					background: V2.TEAL,
					color: "#fff"
				},
				onClick: () => setNovo(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 mr-2" }), " Cadastrar novo cliente"]
			}),
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-sm py-6 justify-center",
				style: { color: V2.LIGHT_MUTED },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Carregando..."]
			}),
			!isLoading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-center py-6",
				style: { color: V2.LIGHT_MUTED },
				children: "Nenhum cliente encontrado."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: rows.map((c) => {
					var _c$trade_name2;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3 rounded-lg border",
						style: {
							background: V2.LIGHT_SURFACE,
							borderColor: V2.LIGHT_BORDER
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, {
									className: "h-4 w-4 mt-0.5 shrink-0",
									style: { color: V2.TEAL }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-medium text-sm truncate",
										children: (_c$trade_name2 = c.trade_name) !== null && _c$trade_name2 !== void 0 ? _c$trade_name2 : c.legal_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-[11px] flex flex-wrap gap-x-3",
										style: { color: V2.LIGHT_MUTED },
										children: [(c.cidade || c.estado) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3 w-3" }),
												" ",
												c.cidade,
												c.estado ? `/${c.estado}` : ""
											]
										}), c.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
											href: `tel:${c.phone}`,
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3 w-3" }),
												" ",
												c.phone
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "h-9 shrink-0 font-semibold",
									style: {
										background: V2.TEAL,
										color: "#fff"
									},
									onClick: () => venderPara(c),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "h-4 w-4 mr-1" }), " Vender"]
								})
							]
						})
					}, c.id);
				})
			})
		]
	});
}
function NovoClienteForm({ onCancel, onCreated }) {
	const { user } = useAuth();
	const [nome, setNome] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [taxId, setTaxId] = (0, import_react.useState)("");
	const [cidade, setCidade] = (0, import_react.useState)("");
	const [estado, setEstado] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function salvar() {
		if (!user || !nome.trim()) {
			toast.error("Nome é obrigatório");
			return;
		}
		setSaving(true);
		const name = nome.trim();
		const { data, error } = await supabase.from("companies").insert({
			legal_name: name,
			trade_name: name,
			tax_id: taxId.trim() || null,
			phone: phone.trim(),
			cidade: cidade.trim() || null,
			estado: estado.trim().toUpperCase() || null,
			status: "approved",
			owner_id: user.id
		}).select("id, legal_name, trade_name, tax_id").single();
		setSaving(false);
		if (error || !data) {
			var _error$message;
			toast.error((_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : "Erro ao cadastrar");
			return;
		}
		toast.success("Cliente cadastrado");
		onCreated(data);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nome do cliente *",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: nome,
					onChange: (e) => setNome(e.target.value),
					className: "h-12 text-base"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Telefone / WhatsApp",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: phone,
					onChange: (e) => setPhone(e.target.value),
					inputMode: "tel",
					className: "h-12 text-base"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "CNPJ / CPF",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: taxId,
					onChange: (e) => setTaxId(e.target.value),
					inputMode: "numeric",
					className: "h-12 text-base"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-[1fr_80px] gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Cidade",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: cidade,
						onChange: (e) => setCidade(e.target.value),
						className: "h-12 text-base"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "UF",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: estado,
						onChange: (e) => setEstado(e.target.value),
						maxLength: 2,
						className: "h-12 text-base uppercase"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pt-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "h-12 flex-1",
					onClick: onCancel,
					disabled: saving,
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "h-12 flex-1 font-semibold",
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					onClick: salvar,
					disabled: saving,
					children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Salvar e vender"
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-xs mb-1",
		style: { color: V2.LIGHT_MUTED },
		children: label
	}), children] });
}
//#endregion
export { PosClientes as component };
