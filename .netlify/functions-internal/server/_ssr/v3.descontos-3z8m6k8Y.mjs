import { N as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $t as Check, f as Trophy, h as TrendingUp, mn as ArrowLeft, w as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/v3.descontos-3z8m6k8Y.js
var import_jsx_runtime = require_jsx_runtime();
var BG = "#faf8f5";
var SURFACE = "#ffffff";
var SURFACE_2 = "#f5f0e8";
var BORDER = "#e8e2d8";
var ORANGE = "#c9a96e";
var TEXT = "#3d2b1f";
var MUTED = "#8b7355";
var TIERS = [
	{
		key: "t1",
		nome: "Tabela de Desconto 1",
		faixa: "Compras até R$ 499",
		descricao: "Ideal para começar. Preço já pensado para o revendedor.",
		cor: "#8b7355",
		icone: Sparkles,
		capa: 4.5,
		chave: 45,
		controle: 35
	},
	{
		key: "t2",
		nome: "Tabela de Desconto 2",
		faixa: "Compras de R$ 500 a R$ 999",
		descricao: "Passou de R$ 500 no carrinho? Todas as peças ficam mais baratas.",
		cor: "#a67c52",
		icone: TrendingUp,
		capa: 4.3,
		chave: 43,
		controle: 33
	},
	{
		key: "t3",
		nome: "Tabela de Desconto 3",
		faixa: "Compras a partir de R$ 1.000",
		descricao: "O melhor preço da casa. É o preço que também vale nos pacotes fechados.",
		cor: "#c9a96e",
		icone: Trophy,
		capa: 4,
		chave: 40,
		controle: 30
	}
];
function money(n) {
	return n.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL"
	});
}
function DescontosPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: BG,
			color: TEXT,
			minHeight: "100vh"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b backdrop-blur",
				style: {
					background: "rgba(255,255,255,0.85)",
					borderColor: BORDER
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-5xl mx-auto h-14 px-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/v3",
						className: "flex items-center gap-2",
						"aria-label": "Voltar para a home",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand-logo.png",
							alt: "Prime Automotive",
							className: "h-10 w-10 object-contain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							style: { color: TEXT },
							children: "Atacado Prime"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/v3",
						className: "inline-flex items-center gap-1.5 text-xs font-semibold px-3 h-9 rounded-full border",
						style: {
							borderColor: BORDER,
							color: TEXT
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Voltar"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-5xl mx-auto px-4 pt-10 pb-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "inline-block text-[11px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full mb-4",
						style: {
							background: ORANGE,
							color: "#fff"
						},
						children: "Como você economiza"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-3xl sm:text-5xl font-black leading-[1.05] mb-4",
						style: {
							color: TEXT,
							letterSpacing: "-0.02em"
						},
						children: ["Quanto mais você leva, ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							style: { color: ORANGE },
							children: "mais barato fica."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-base sm:text-lg max-w-2xl mx-auto",
						style: { color: MUTED },
						children: "Nosso preço muda automaticamente conforme o valor total do seu pedido. Sem cupom, sem cadastro especial, sem letrinha miúda."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "max-w-5xl mx-auto px-4 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-3xl p-6 sm:p-8 grid gap-4 sm:grid-cols-3",
					style: {
						background: SURFACE,
						border: `1px solid ${BORDER}`
					},
					children: [
						{
							n: 1,
							t: "Você monta seu pedido",
							d: "Escolhe as peças que quer levar."
						},
						{
							n: 2,
							t: "O sistema soma tudo",
							d: "Somamos o valor total do carrinho pra você."
						},
						{
							n: 3,
							t: "O preço cai sozinho",
							d: "Cada peça passa para a tabela correspondente."
						}
					].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-10 w-10 flex-shrink-0 grid place-items-center rounded-full font-black",
							style: {
								background: SURFACE_2,
								color: ORANGE
							},
							children: p.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold text-sm",
							children: p.t
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs mt-0.5",
							style: { color: MUTED },
							children: p.d
						})] })]
					}, p.n))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-5xl mx-auto px-4 py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl sm:text-2xl font-black mb-1",
						children: "As três tabelas de desconto"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm mb-6",
						style: { color: MUTED },
						children: [
							"Exemplo real com uma ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "capa" }),
							", uma ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "chave" }),
							" e um ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "controle" }),
							":"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: TIERS.map((t) => {
							const Icon = t.icone;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-3xl p-6 flex flex-col",
								style: {
									background: SURFACE,
									border: `2px solid ${t.key === "t3" ? ORANGE : BORDER}`,
									boxShadow: t.key === "t3" ? "0 20px 40px -20px rgba(201,169,110,0.4)" : void 0
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-10 w-10 grid place-items-center rounded-xl",
											style: {
												background: `${t.cor}20`,
												color: t.cor
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
										}), t.key === "t3" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full",
											style: {
												background: ORANGE,
												color: "#fff"
											},
											children: "Melhor preço"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-lg font-black",
										children: t.nome
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs font-semibold mt-1",
										style: { color: t.cor },
										children: t.faixa
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs mt-2 mb-5",
										style: { color: MUTED },
										children: t.descricao
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-2xl p-4 space-y-3 mt-auto",
										style: { background: SURFACE_2 },
										children: [
											{
												label: "Capa",
												v: t.capa
											},
											{
												label: "Chave",
												v: t.chave
											},
											{
												label: "Controle",
												v: t.controle
											}
										].map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-semibold",
												style: { color: MUTED },
												children: row.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-base font-black",
												style: { color: TEXT },
												children: money(row.v)
											})]
										}, row.label))
									})
								]
							}, t.key);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "max-w-5xl mx-auto px-4 pb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl p-6 sm:p-8",
					style: {
						background: SURFACE,
						border: `1px solid ${BORDER}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl sm:text-2xl font-black mb-2",
							children: "Um exemplo pra ficar fácil"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm mb-5",
							style: { color: MUTED },
							children: [
								"Digamos que você monte um pedido com ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "10 chaves" }),
								":"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExampleBox, {
									titulo: "Só 10 chaves",
									subtitulo: "Total do pedido: R$ 450",
									tabela: "Tabela 1",
									preco: "R$ 45,00 cada",
									destaque: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExampleBox, {
									titulo: "Adicionou mais 2 chaves",
									subtitulo: "Total do pedido: R$ 516",
									tabela: "Tabela 2",
									preco: "R$ 43,00 cada",
									destaque: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExampleBox, {
									titulo: "Fechou 25 chaves",
									subtitulo: "Total do pedido: R$ 1.000",
									tabela: "Tabela 3",
									preco: "R$ 40,00 cada",
									destaque: true
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-2xl p-4 flex gap-3 items-start",
							style: { background: SURFACE_2 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								className: "h-5 w-5 flex-shrink-0 mt-0.5",
								style: { color: ORANGE }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								style: { color: TEXT },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Não precisa recalcular nada." }), " Enquanto você monta o carrinho, o próprio sistema troca o preço de todas as peças assim que o total do pedido chega em uma nova tabela."]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "max-w-5xl mx-auto px-4 pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl p-6 sm:p-8",
					style: {
						background: SURFACE_2,
						border: `1px solid ${BORDER}`
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
								className: "h-5 w-5",
								style: { color: ORANGE }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg sm:text-xl font-black",
								children: "E os pacotes fechados?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm mb-4",
							style: { color: TEXT },
							children: [
								"Toda peça vendida em ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "pacote fechado" }),
								" já sai direto no preço da",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Tabela de Desconto 3" }),
								" — o melhor preço da casa. É a forma mais rápida de garantir o menor valor por peça."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid sm:grid-cols-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl p-4",
									style: {
										background: SURFACE,
										border: `1px solid ${BORDER}`
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-wider font-bold",
											style: { color: MUTED },
											children: "Capas"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black mt-1",
											style: { color: ORANGE },
											children: "Pacote com 10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs mt-1",
											style: { color: MUTED },
											children: "do mesmo modelo"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl p-4",
									style: {
										background: SURFACE,
										border: `1px solid ${BORDER}`
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-wider font-bold",
											style: { color: MUTED },
											children: "Controles"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black mt-1",
											style: { color: ORANGE },
											children: "Pacote com 10"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs mt-1",
											style: { color: MUTED },
											children: "do mesmo modelo"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl p-4",
									style: {
										background: SURFACE,
										border: `1px solid ${BORDER}`
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs uppercase tracking-wider font-bold",
											style: { color: MUTED },
											children: "Chaves"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-2xl font-black mt-1",
											style: { color: ORANGE },
											children: "Pacote com 5"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs mt-1",
											style: { color: MUTED },
											children: "do mesmo modelo"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs mt-4",
							style: { color: MUTED },
							children: [
								"* Pacotes são sempre do ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "mesmo modelo" }),
								" — não é possível misturar modelos diferentes dentro de um mesmo pacote."
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "max-w-5xl mx-auto px-4 pb-16 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/v3",
					className: "inline-flex items-center gap-2 h-12 px-8 rounded-full text-sm font-black",
					style: {
						background: ORANGE,
						color: "#fff"
					},
					children: "Montar meu pedido agora"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs",
					style: { color: MUTED },
					children: "Dúvidas? Fale com a gente: (34) 99865-1112"
				})]
			})
		]
	});
}
function ExampleBox({ titulo, subtitulo, tabela, preco, destaque }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-4",
		style: {
			background: destaque ? "#fff" : SURFACE_2,
			border: `1px solid ${destaque ? ORANGE : BORDER}`
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm font-bold",
				children: titulo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs mt-1",
				style: { color: MUTED },
				children: subtitulo
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-block mt-3 text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full",
				style: {
					background: destaque ? ORANGE : BORDER,
					color: destaque ? "#fff" : TEXT
				},
				children: tabela
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-lg font-black mt-2",
				style: { color: TEXT },
				children: preco
			})
		]
	});
}
//#endregion
export { DescontosPage as component };
