import { o as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./client-CtYDXrXg.mjs";
import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { i as require_react } from "../_libs/dnd-kit__accessibility+react.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Bsporrlm.mjs";
import { t as Input } from "./input-DeD3Xbgy.mjs";
import { t as Label } from "./label-OjExnIog.mjs";
import { Mt as EyeOff, dt as LoaderCircle, h as TrendingUp, jt as Eye, k as ShieldCheck, t as Zap } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-TZjTs9D2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./auth-vtiT1QDN.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-DGeprr3K.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-B8VSikeH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Caminho relativo de mesma origem preservado no ?redirect= (usado no consentimento OAuth). */
function safeRedirect() {
	if (typeof window === "undefined") return null;
	const raw = new URLSearchParams(window.location.search).get("redirect");
	if (!raw || !raw.startsWith("/") || raw.startsWith("//")) return null;
	return raw;
}
/** Vai para o destino preservado ou para o painel padrão. */
function goAfterAuth(navigate) {
	const target = safeRedirect();
	if (target) {
		window.location.href = target;
		return;
	}
	navigate({ to: "/dashboard" });
}
function AuthPage() {
	const navigate = useNavigate();
	const { mode, redirect } = Route.useSearch();
	const isPosAccess = redirect === "/pos" || (redirect === null || redirect === void 0 ? void 0 : redirect.startsWith("/pos/")) === true;
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) goAfterAuth(navigate);
		});
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: isPosAccess ? "min-h-[100dvh] w-full overflow-x-hidden flex items-start justify-center px-3 py-4" : "min-h-[100dvh] w-full overflow-x-hidden grid lg:grid-cols-12",
		style: {
			background: "#faf8f5",
			color: "#3d2b1f"
		},
		children: [!isPosAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "hidden lg:flex lg:col-span-5 relative overflow-hidden flex-col justify-between p-12",
			style: { background: "radial-gradient(1000px 500px at 0% 0%, rgba(201,169,110,0.18) 0%, transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(201,169,110,0.08) 0%, transparent 60%), linear-gradient(160deg, #ffffff 0%, #faf8f5 100%)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full blur-3xl",
					style: { background: "rgba(201,169,110,0.15)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute -bottom-40 -right-24 w-[460px] h-[460px] rounded-full blur-3xl",
					style: { background: "rgba(201,169,110,0.10)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute inset-0 opacity-[0.06]",
					style: {
						backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
						backgroundSize: "48px 48px",
						maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "relative flex items-center gap-3 font-semibold z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-11 h-11 rounded-full grid place-items-center overflow-hidden border shadow-sm",
						style: {
							background: "#ffffff",
							borderColor: "#e8e2d8"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand-logo.png",
							alt: "Prime",
							className: "w-7 h-7 object-contain rounded-full"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "leading-tight",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uppercase tracking-[0.25em] text-[10px] text-[#8b7355]",
							children: "B2B Platform"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "uppercase tracking-widest text-sm font-bold",
							children: "Atacado Prime"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] uppercase tracking-widest font-bold mb-5 border",
							style: {
								background: "rgba(201,169,110,0.12)",
								color: "#c9a96e",
								borderColor: "rgba(201,169,110,0.35)"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-1.5 h-1.5 rounded-full animate-pulse",
								style: { background: "#c9a96e" }
							}), "Plataforma online"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-l-4 pl-5",
							style: { borderColor: "#c9a96e" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-4xl xl:text-5xl font-extrabold uppercase tracking-tight leading-[0.95]",
								children: [
									"Acesso à",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { color: "#c9a96e" },
										children: "central Prime"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-[#8b7355] max-w-md text-sm leading-relaxed",
								children: "Plataforma B2B de inteligência comercial. Catálogo, pedidos, CRM e radar de oportunidades em um só painel."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "w-4 h-4" }),
									label: "Seguro",
									value: "100%"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "w-4 h-4" }),
									label: "Tempo real",
									value: "LIVE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "w-4 h-4" }),
									label: "Operação",
									value: "24/7"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "relative z-10 text-[10px] text-[#8b7355]/60 uppercase tracking-widest",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Atacado Prime · Todos os direitos reservados"
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: isPosAccess ? "w-full max-w-[340px]" : "lg:col-span-7 flex items-start sm:items-center justify-center px-4 py-6 sm:p-6 lg:p-12 relative overflow-hidden",
			children: [!isPosAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl",
				style: { background: "rgba(201,169,110,0.08)" }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: isPosAccess ? "w-full" : "w-full max-w-md relative",
				children: [
					isPosAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex items-center justify-center gap-2 border-b pb-4",
						style: { borderColor: "#e8e2d8" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand-logo.png",
							alt: "Prime Automotive",
							className: "h-10 w-10 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: "POS Prime"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px]",
							style: { color: "#8b7355" },
							children: "Acesso ao terminal de vendas"
						})] })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "inline-flex items-center gap-2 mb-4 sm:mb-6 text-xs uppercase tracking-widest font-semibold hover:opacity-70 transition-opacity",
						style: { color: "#8b7355" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							"aria-hidden": true,
							children: "←"
						}), " Voltar ao site"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: isPosAccess ? "mb-4" : "border-l-4 pl-4 sm:pl-5 mb-5 sm:mb-8",
						style: { borderColor: "#c9a96e" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: isPosAccess ? "text-lg font-semibold" : "text-xl sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-tight leading-none",
							style: { color: "#3d2b1f" },
							children: isPosAccess ? "Entrar" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["Entrar na ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: { color: "#c9a96e" },
								children: "Plataforma"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium mt-1.5",
							style: { color: "#8b7355" },
							children: isPosAccess ? "Use seu email e senha para abrir o POS." : "Acesso restrito a revendedores e operadores cadastrados."
						})]
					}),
					isPosAccess ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: mode,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid grid-cols-2 w-full p-1 h-11",
								style: {
									background: "#ffffff",
									border: "1px solid #e8e2d8"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "login",
									className: "data-[state=active]:bg-[#c9a96e] data-[state=active]:text-[#3d2b1f] data-[state=active]:shadow-md uppercase text-xs tracking-wider font-bold transition-all",
									style: { color: "#3d2b1f" },
									children: "Entrar"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									className: "data-[state=active]:bg-[#c9a96e] data-[state=active]:text-[#3d2b1f] data-[state=active]:shadow-md uppercase text-xs tracking-wider font-bold transition-all",
									style: { color: "#3d2b1f" },
									children: "Cadastrar"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "login",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signup",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupForm, {})
							})
						]
					})
				]
			})]
		})]
	});
}
function MiniStat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative rounded-xl p-3 border",
		style: {
			background: "#ffffff",
			borderColor: "#e8e2d8"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2",
				style: { color: "#c9a96e" },
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-lg font-extrabold tracking-tight",
				style: { color: "#3d2b1f" },
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] uppercase tracking-widest font-semibold",
				style: { color: "#8b7355" },
				children: label
			})
		]
	});
}
function LoginForm() {
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [forgotOpen, setForgotOpen] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		setLoading(false);
		if (error) {
			var _error$code, _error$message$toLowe, _error$message;
			const code = (_error$code = error.code) !== null && _error$code !== void 0 ? _error$code : "";
			const msg = (_error$message$toLowe = (_error$message = error.message) === null || _error$message === void 0 ? void 0 : _error$message.toLowerCase()) !== null && _error$message$toLowe !== void 0 ? _error$message$toLowe : "";
			let friendly = "Não conseguimos entrar. Tente novamente.";
			if (code === "invalid_credentials" || msg.includes("invalid login")) friendly = "Senha incorreta ou email não cadastrado. Verifique os dados ou clique em \"Esqueci minha senha\".";
			else if (code === "email_not_confirmed" || msg.includes("not confirmed")) friendly = "Email ainda não confirmado. Verifique sua caixa de entrada.";
			else if (msg.includes("rate limit") || code === "over_request_rate_limit") friendly = "Muitas tentativas. Aguarde alguns minutos e tente de novo.";
			else if (code === "user_banned") friendly = "Esta conta está bloqueada. Fale com o suporte.";
			toast.error(friendly, { duration: 6e3 });
			return;
		}
		goAfterAuth(navigate);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4 mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "login-email",
				label: "Email",
				type: "email",
				value: email,
				onChange: setEmail,
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "login-password",
				label: "Senha",
				type: "password",
				value: password,
				onChange: setPassword,
				required: true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-end -mt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setForgotOpen(true),
					className: "text-xs font-semibold uppercase tracking-wider text-[#c9a96e] hover:underline",
					children: "Esqueci minha senha"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "w-full bg-[#c9a96e] hover:bg-[#b5935a] uppercase tracking-wider font-bold",
				disabled: loading,
				children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }), " Entrar"]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPasswordDialog, {
		open: forgotOpen,
		onOpenChange: setForgotOpen,
		defaultEmail: email
	})] });
}
function ForgotPasswordDialog({ open, onOpenChange, defaultEmail }) {
	const [email, setEmail] = (0, import_react.useState)(defaultEmail);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (open) setEmail(defaultEmail);
	}, [open, defaultEmail]);
	async function onSubmit(e) {
		e.preventDefault();
		setLoading(true);
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/reset-password" });
		setLoading(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Enviamos um link de recuperação para seu email.");
		onOpenChange(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Recuperar senha" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Informe o email da sua conta. Enviaremos um link para você criar uma nova senha." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				id: "forgot-email",
				label: "Email",
				type: "email",
				value: email,
				onChange: setEmail,
				required: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				onClick: () => onOpenChange(false),
				children: "Cancelar"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "bg-[#c9a96e] hover:bg-[#b5935a]",
				disabled: loading,
				children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }), " Enviar link"]
			})] })]
		})] })
	});
}
function SignupForm() {
	const navigate = useNavigate();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [legalName, setLegalName] = (0, import_react.useState)("");
	const [tradeName, setTradeName] = (0, import_react.useState)("");
	const [taxId, setTaxId] = (0, import_react.useState)("");
	const [zip, setZip] = (0, import_react.useState)("");
	const [street, setStreet] = (0, import_react.useState)("");
	const [number, setNumber] = (0, import_react.useState)("");
	const [complement, setComplement] = (0, import_react.useState)("");
	const [district, setDistrict] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [state, setState] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		var _safeRedirect, _signUpData$user;
		e.preventDefault();
		const phoneDigits = phone.replace(/\D/g, "");
		const taxDigits = taxId.replace(/\D/g, "");
		if (phoneDigits.length > 0 && (phoneDigits.length < 10 || phoneDigits.length > 13)) {
			toast.error("Telefone inválido. Use DDD + número (ex.: 34998651112).");
			return;
		}
		if (taxDigits.length !== 11 && taxDigits.length !== 14) {
			toast.error("Documento inválido. CPF deve ter 11 dígitos e CNPJ 14.");
			return;
		}
		setLoading(true);
		const { data: signUpData, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: window.location.origin + ((_safeRedirect = safeRedirect()) !== null && _safeRedirect !== void 0 ? _safeRedirect : "/dashboard"),
				data: { full_name: fullName }
			}
		});
		if (error) {
			setLoading(false);
			toast.error(error.message);
			return;
		}
		const userId = (_signUpData$user = signUpData.user) === null || _signUpData$user === void 0 ? void 0 : _signUpData$user.id;
		if (userId) {
			const { data: company, error: companyError } = await supabase.from("companies").insert({
				owner_id: userId,
				legal_name: legalName,
				trade_name: tradeName || null,
				tax_id: taxDigits,
				email,
				phone: phoneDigits,
				status: "pending"
			}).select("id").single();
			if (companyError) toast.error("Conta criada, mas falhou ao salvar empresa: " + companyError.message);
			else if (company) {
				const { error: addrError } = await supabase.from("addresses").insert({
					company_id: company.id,
					kind: "both",
					label: "Principal",
					street,
					number: number || null,
					complement: complement || null,
					district: district || null,
					city,
					state,
					zip,
					country: "BR",
					is_default: true
				});
				if (addrError) toast.error("Falhou ao salvar endereço: " + addrError.message);
			}
		}
		setLoading(false);
		toast.success("Cadastro enviado! Aguarde aprovação para liberar as compras.");
		goAfterAuth(navigate);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4 mt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md border-l-4 border-[#c9a96e] bg-[#ffffff] p-3 text-xs text-[#8b7355]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold uppercase tracking-wider text-[#3d2b1f]",
					children: "Cadastro de Revendedor."
				}), " Contas administrativas são criadas internamente pelo time."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Acesso" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-name",
						label: "Nome completo",
						value: fullName,
						onChange: setFullName,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-email",
						label: "Email",
						type: "email",
						value: email,
						onChange: setEmail,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-password",
						label: "Senha",
						type: "password",
						value: password,
						onChange: setPassword,
						required: true,
						minLength: 8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-phone",
						label: "Telefone / WhatsApp (opcional)",
						value: phone,
						onChange: setPhone
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Empresa" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-legal",
						label: "Razão social / Nome completo",
						value: legalName,
						onChange: setLegalName,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-trade",
						label: "Nome fantasia (opcional)",
						value: tradeName,
						onChange: setTradeName
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-tax",
						label: "CPF (11 dígitos) ou CNPJ (14 dígitos)",
						value: taxId,
						onChange: setTaxId,
						required: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionLabel, { children: "Endereço" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "signup-zip",
							label: "CEP",
							value: zip,
							onChange: setZip,
							required: true
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "signup-state",
							label: "UF",
							value: state,
							onChange: setState,
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-street",
						label: "Rua / Logradouro",
						value: street,
						onChange: setStreet,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "signup-number",
							label: "Número",
							value: number,
							onChange: setNumber
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							id: "signup-complement",
							label: "Complemento",
							value: complement,
							onChange: setComplement
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-district",
						label: "Bairro",
						value: district,
						onChange: setDistrict
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						id: "signup-city",
						label: "Cidade",
						value: city,
						onChange: setCity,
						required: true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				type: "submit",
				className: "w-full bg-[#c9a96e] hover:bg-[#b5935a] uppercase tracking-wider font-bold",
				disabled: loading,
				children: [loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "w-4 h-4 animate-spin mr-2" }), " Criar conta"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-[#8b7355] text-center",
				children: "Acesso ao catálogo e preços liberado após aprovação manual da empresa."
			})
		]
	});
}
function SectionLabel({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[10px] font-bold uppercase tracking-widest text-[#c9a96e] border-l-2 border-[#c9a96e] pl-2",
		children
	});
}
function Field({ id, label, value, onChange, type = "text", required, minLength }) {
	const [show, setShow] = (0, import_react.useState)(false);
	const isPassword = type === "password";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			className: "text-xs uppercase tracking-wider font-semibold text-[#3d2b1f]/80",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id,
				type: isPassword && show ? "text" : type,
				value,
				onChange: (e) => onChange(e.target.value),
				required,
				minLength,
				className: `bg-[#ffffff] border-[#e8e2d8] text-[#3d2b1f] placeholder:text-[#8b7355]/60 focus-visible:ring-[#c9a96e] ${isPassword ? "pr-10" : ""}`
			}), isPassword && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setShow((s) => !s),
				className: "absolute right-2 top-1/2 -translate-y-1/2 text-[#3d2b1f]/50 hover:text-[#3d2b1f]",
				"aria-label": show ? "Ocultar senha" : "Mostrar senha",
				tabIndex: -1,
				children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-4 h-4" })
			})]
		})]
	});
}
//#endregion
export { AuthPage as component };
