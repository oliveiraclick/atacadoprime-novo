import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { a as useQueryClient, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { i as useRoles, t as useAuth } from "./use-auth-DI-712Mw.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { t as V2 } from "./theme-COQzdogg.mjs";
import { N as Search, _ as Trash2, d as UserCheck, dt as LoaderCircle, in as Building2, pn as ArrowRight, u as UserPlus } from "../_libs/lucide-react.mjs";
import { t as V2InternalShell } from "./InternalShell-Dh7pQCf3.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as useCart } from "./use-cart-D1K0BW4t.mjs";
import { t as useSellerSession } from "./use-seller-session-CNcylkaR.mjs";
import { t as Route } from "./v3.vendas.nova-R0G9laJx.mjs";
import { t as CityAutocomplete } from "./CityAutocomplete-_IxwmlbC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.vendas.nova-BQI4IDnz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function NovaVendaV2Page() {
	var _activeCustomer$trade;
	const { user } = useAuth();
	const { data: roles = [] } = useRoles(user);
	const isStaff = roles.some((r) => r === "admin" || r === "vendedor" || r === "gerente");
	const isAdmin = roles.includes("admin");
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { cidade, estado, trip } = Route.useSearch();
	const setCustomer = useSellerSession((s) => s.setCustomer);
	const setTripId = useSellerSession((s) => s.setTripId);
	const activeCustomer = useSellerSession((s) => s.customer);
	const clearCart = useCart((s) => s.clear);
	const [q, setQ] = (0, import_react.useState)("");
	const [cityFilter, setCityFilter] = (0, import_react.useState)(cidade !== null && cidade !== void 0 ? cidade : "");
	const [newOpen, setNewOpen] = (0, import_react.useState)(false);
	const { data: companies = [], isLoading } = useQuery({
		queryKey: [
			"sales-customers-v2",
			q,
			cityFilter,
			estado
		],
		enabled: isStaff,
		queryFn: async () => {
			let query = supabase.from("companies").select("id, legal_name, trade_name, tax_id, status, cidade, estado").eq("status", "approved").order("legal_name", { ascending: true }).limit(100);
			if (cityFilter.trim().length >= 2) query = query.ilike("cidade", `%${cityFilter.trim()}%`);
			if (estado) query = query.eq("estado", estado.toUpperCase());
			if (q.trim().length >= 2) {
				const term = `%${q.trim()}%`;
				query = query.or(`legal_name.ilike.${term},trade_name.ilike.${term},tax_id.ilike.${term}`);
			}
			const { data, error } = await query;
			if (error) throw error;
			return data !== null && data !== void 0 ? data : [];
		}
	});
	const list = (0, import_react.useMemo)(() => companies, [companies]);
	function selecionar(c) {
		var _c$trade_name;
		setCustomer(c);
		setTripId(trip !== null && trip !== void 0 ? trip : null);
		clearCart();
		toast.success(`Venda iniciada para ${(_c$trade_name = c.trade_name) !== null && _c$trade_name !== void 0 ? _c$trade_name : c.legal_name}${trip ? " (viagem em andamento)" : ""}`);
		navigate({ to: "/v3/pdv" });
	}
	if (!isStaff) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(V2InternalShell, {
		title: "Nova venda em visita",
		eyebrow: "Atendimento em campo",
		description: "Área exclusiva da equipe de vendas.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-2xl border p-6 text-sm",
			style: {
				background: V2.LIGHT_SURFACE,
				borderColor: V2.LIGHT_BORDER,
				color: V2.LIGHT_TEXT
			},
			children: "Esta área é exclusiva da equipe de vendas."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(V2InternalShell, {
		title: "Nova venda em visita",
		eyebrow: "Atendimento em campo",
		description: cidade ? `Mostrando clientes em ${cidade}${estado ? `/${estado}` : ""}. Selecione ou cadastre um novo.` : "Escolha o cliente que está sendo atendido presencialmente.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/v3/hoje",
			className: "h-11 px-5 rounded-full font-medium text-sm grid place-items-center",
			style: {
				background: V2.TEAL,
				color: "#fff"
			},
			children: "Voltar ao Hoje"
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6",
			children: [
				activeCustomer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border p-4 flex items-center gap-3",
					style: {
						background: V2.TEAL_LIGHT,
						borderColor: V2.TEAL,
						color: V2.LIGHT_TEXT
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {
							className: "h-5 w-5 shrink-0",
							style: { color: V2.TEAL }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-[0.2em] font-semibold",
								style: { color: V2.TEAL },
								children: "Venda em andamento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold truncate",
								children: (_activeCustomer$trade = activeCustomer.trade_name) !== null && _activeCustomer$trade !== void 0 ? _activeCustomer$trade : activeCustomer.legal_name
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/v3/pdv",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									style: {
										background: V2.TEAL,
										color: "#fff"
									},
									children: ["Continuar venda ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 ml-1" })]
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 sm:grid-cols-[1fr_260px_auto] gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4",
								style: { color: V2.LIGHT_MUTED }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Buscar por nome, fantasia ou CNPJ…",
								className: "pl-10 h-12 rounded-full border shadow-sm",
								style: {
									background: V2.LIGHT_SURFACE,
									borderColor: V2.LIGHT_BORDER,
									color: V2.LIGHT_TEXT
								},
								autoFocus: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityAutocomplete, {
							value: cityFilter,
							onChange: (c) => setCityFilter(c),
							placeholder: "Filtrar por cidade",
							withIcon: true,
							inputClassName: "h-12 rounded-full border shadow-sm",
							style: {
								background: V2.LIGHT_SURFACE,
								borderColor: V2.LIGHT_BORDER,
								color: V2.LIGHT_TEXT
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setNewOpen(true),
							className: "h-12 px-6 rounded-full font-semibold",
							style: {
								background: V2.TEAL,
								color: "#fff"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 mr-2" }), " Novo cliente"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border shadow-sm overflow-hidden",
					style: {
						background: V2.LIGHT_SURFACE,
						borderColor: V2.LIGHT_BORDER
					},
					children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-8 text-center text-sm",
						style: { color: V2.LIGHT_MUTED },
						children: "Carregando clientes…"
					}) : list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-8 text-center text-sm space-y-3",
						style: { color: V2.LIGHT_MUTED },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Nenhum cliente encontrado",
							cityFilter ? ` em "${cityFilter}"` : "",
							"."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							onClick: () => setNewOpen(true),
							style: {
								background: V2.TEAL,
								color: "#fff"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 mr-1" }), " Cadastrar cliente agora"]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y",
						style: { borderColor: V2.LIGHT_BORDER },
						children: list.map((c) => {
							var _c$trade_name2, _c$tax_id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: cn("w-full flex items-center gap-4 p-5 transition-colors hover:bg-black/[0.02]"),
								style: (activeCustomer === null || activeCustomer === void 0 ? void 0 : activeCustomer.id) === c.id ? { background: V2.TEAL_LIGHT } : void 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => selecionar({
										id: c.id,
										legal_name: c.legal_name,
										trade_name: c.trade_name,
										tax_id: c.tax_id
									}),
									className: "flex-1 flex items-center gap-4 min-w-0 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-11 w-11 rounded-xl grid place-items-center shrink-0",
											style: {
												background: V2.TEAL_LIGHT,
												color: V2.TEAL
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-semibold truncate",
												style: { color: V2.LIGHT_TEXT },
												children: (_c$trade_name2 = c.trade_name) !== null && _c$trade_name2 !== void 0 ? _c$trade_name2 : c.legal_name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs truncate mt-0.5",
												style: { color: V2.LIGHT_MUTED },
												children: [
													c.legal_name,
													" · CNPJ ",
													(_c$tax_id = c.tax_id) !== null && _c$tax_id !== void 0 ? _c$tax_id : "—",
													c.cidade && ` · ${c.cidade}${c.estado ? `/${c.estado}` : ""}`
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full",
											style: {
												background: V2.TEAL,
												color: "#fff"
											},
											children: ["Iniciar venda ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3 w-3" })]
										})
									]
								}), isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-9 w-9 p-0 shrink-0",
									title: "Excluir cliente",
									onClick: async (e) => {
										var _c$trade_name3;
										e.stopPropagation();
										if (!confirm(`Excluir cliente "${(_c$trade_name3 = c.trade_name) !== null && _c$trade_name3 !== void 0 ? _c$trade_name3 : c.legal_name}"?\n\nSó funciona se o cliente não tiver pedidos vinculados.`)) return;
										const { error } = await supabase.from("companies").delete().eq("id", c.id);
										if (error) {
											toast.error(error.message.includes("foreign key") || error.code === "23503" ? "Cliente possui pedidos vinculados. Exclua os pedidos primeiro." : error.message);
											return;
										}
										toast.success("Cliente excluído");
										qc.invalidateQueries({ queryKey: ["sales-customers-v2"] });
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										className: "h-4 w-4",
										style: { color: V2.LIGHT_MUTED }
									})
								})]
							}, c.id);
						})
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewClientDialog, {
			open: newOpen,
			onOpenChange: setNewOpen,
			defaultCidade: cityFilter,
			defaultEstado: estado !== null && estado !== void 0 ? estado : "",
			onCreated: (c) => {
				qc.invalidateQueries({ queryKey: ["sales-customers-v2"] });
				setNewOpen(false);
				selecionar(c);
			}
		})]
	});
}
function NewClientDialog({ open, onOpenChange, defaultCidade, defaultEstado, onCreated }) {
	const { user } = useAuth();
	const [tradeName, setTradeName] = (0, import_react.useState)("");
	const [taxId, setTaxId] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [cidade, setCidade] = (0, import_react.useState)(defaultCidade);
	const [estado, setEstado] = (0, import_react.useState)(defaultEstado);
	const [street, setStreet] = (0, import_react.useState)("");
	const [number, setNumber] = (0, import_react.useState)("");
	const [complement, setComplement] = (0, import_react.useState)("");
	const [district, setDistrict] = (0, import_react.useState)("");
	const [zip, setZip] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	async function salvar() {
		if (!user || !tradeName.trim()) {
			toast.error("Nome fantasia é obrigatório");
			return;
		}
		setSaving(true);
		const name = tradeName.trim();
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
		if (error || !data) {
			var _error$message;
			setSaving(false);
			toast.error((_error$message = error === null || error === void 0 ? void 0 : error.message) !== null && _error$message !== void 0 ? _error$message : "Erro ao cadastrar");
			return;
		}
		const zipDigits = zip.replace(/\D/g, "").slice(0, 8);
		if (street.trim() && zipDigits.length === 8 && cidade.trim() && estado.trim()) {
			const { error: addrErr } = await supabase.from("addresses").insert({
				company_id: data.id,
				label: "Principal",
				street: street.trim(),
				number: number.trim() || "S/N",
				complement: complement.trim() || null,
				district: district.trim() || null,
				city: cidade.trim(),
				state: estado.trim().toUpperCase(),
				zip: `${zipDigits.slice(0, 5)}-${zipDigits.slice(5)}`,
				country: "BR",
				kind: "both",
				is_default: true
			});
			if (addrErr) toast.warning("Cliente salvo, mas endereço não pôde ser salvo: " + addrErr.message);
		}
		setSaving(false);
		toast.success("Cliente cadastrado");
		onCreated(data);
		setTradeName("");
		setTaxId("");
		setPhone("");
		setStreet("");
		setNumber("");
		setComplement("");
		setDistrict("");
		setZip("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-h-[85dvh] overflow-y-auto top-4 translate-y-0 sm:top-1/2 sm:-translate-y-1/2",
			style: { WebkitOverflowScrolling: "touch" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Novo cliente" }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 pb-[40vh]",
					onFocusCapture: (e) => {
						const el = e.target;
						if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") setTimeout(() => el.scrollIntoView({
							block: "center",
							behavior: "smooth"
						}), 300);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Nome fantasia *" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							className: "uppercase",
							value: tradeName,
							onChange: (e) => setTradeName(e.target.value.toUpperCase())
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CNPJ" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: taxId,
								onChange: (e) => setTaxId(e.target.value)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Telefone" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: phone,
								onChange: (e) => setPhone(e.target.value)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-2 border-t border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2",
									children: "Endereço de entrega"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[1fr_100px] gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Rua" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "uppercase",
										value: street,
										onChange: (e) => setStreet(e.target.value.toUpperCase())
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Número" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: number,
										onChange: (e) => setNumber(e.target.value)
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Complemento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "uppercase",
										value: complement,
										onChange: (e) => setComplement(e.target.value.toUpperCase())
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bairro" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "uppercase",
										value: district,
										onChange: (e) => setDistrict(e.target.value.toUpperCase())
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-[1fr_80px_120px] gap-2 mt-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Cidade" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CityAutocomplete, {
											value: cidade,
											onChange: (c, uf) => {
												setCidade(c);
												if (uf) setEstado(uf);
											}
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "UF" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											maxLength: 2,
											value: estado,
											onChange: (e) => setEstado(e.target.value.toUpperCase())
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "CEP" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: zip,
											onChange: (e) => setZip(e.target.value),
											placeholder: "00000-000"
										})] })
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancelar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: salvar,
					disabled: saving,
					style: {
						background: V2.TEAL,
						color: "#fff"
					},
					children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin mr-1" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 mr-1" }), "Cadastrar e iniciar venda"]
				})] })
			]
		})
	});
}
//#endregion
export { NovaVendaV2Page as component };
