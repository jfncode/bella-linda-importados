# Bella Linda Importados — Catálogo → WhatsApp

Loja online (catálogo) da **Bella Linda Importados** (Florianópolis/SC). Sem gateway de
pagamento: o cliente monta o pedido e finaliza tudo no **WhatsApp**. Página única,
mobile-first, sem dependências externas (tudo embutido — abre offline e hospeda em qualquer lugar).

## 🔗 Contato da loja
- WhatsApp: **(48) 93500-9375**
- E-mail: **Contato.bellaimportados0@gmail.com**
- Instagram: *(a definir — hoje placeholder `@sualoja`)*

## ✨ O que já tem
- Hero com **slideshow automático** (crossfade + zoom) usando as fotos de moda do Canva
- Catálogo com **filtro por categoria**: Perfumes · Eletrônicos · Cama, Mesa & Banho · Roupas
- **Carrinho** (localStorage) que monta o pedido inteiro numa **mensagem única** no WhatsApp
- **Tema claro/escuro** (paleta própria "Sunset Boutique": coral + neutros quentes)
- Selo de desconto automático, faixa de confiança, "como comprar", rodapé completo
- Fotos: cards de **Roupas** usam fotos reais (Canva); demais categorias usam placeholders (IA)

## 🗂 Estrutura
```
index.html              Site final deployável (com charset — pronto p/ hospedar)
modelo2-carrinho.html   Mesma coisa em formato Artifact (claude.ai)
build/
  template.html         Template com marcadores __IMG_MAP__ e __SLIDES_MAP__
  build.js              Regera index.html embutindo as imagens em base64
img/                    Fotos dos produtos (p01..p12.jpg) — placeholders IA
canva/                  Fotos de moda reais extraídas do Canva (cXX_w.jpg = usadas)
concepts/               Rascunhos iniciais (modelo 1 grid, modelo 3 landing)
```

## 🔧 Como regenerar o site
Depois de trocar qualquer imagem em `img/` ou `canva/`:
```bash
node build/build.js
```
Gera `index.html` e `modelo2-carrinho.html` já com as imagens embutidas.

## 🖥 Rodar local
```bash
python -m http.server 8787 --bind 127.0.0.1
# abre http://127.0.0.1:8787/
```

## ✅ Pendências (próximos passos)
- [ ] Fotos e lista **reais** dos produtos (nomes, preços, categorias)
- [ ] Instagram real da loja (trocar `@sualoja`)
- [ ] Trocar placeholders IA (Perfumes, Eletrônicos, Cama/Mesa/Banho) por fotos reais
- [ ] Deploy definitivo (Netlify / Vercel / GitHub Pages)
- [ ] (Opcional) mais slides no hero — sobraram fotos do Canva em `canva/`

## ⚠️ Notas
- O número/nome/e-mail estão no topo do `build/template.html` (`ZAP`, `LOJA`).
- Não há back-end nem pagamento: 100% estático + link `wa.me`.
