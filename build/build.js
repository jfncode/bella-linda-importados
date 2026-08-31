/**
 * build.js — regenera o site da Bella Linda a partir do template + imagens.
 *
 * Uso:  node build/build.js
 * Saída: ../index.html  (standalone, com <!doctype> + charset, pronto p/ deploy)
 *        ../modelo2-carrinho.html (formato Artifact, sem <head>, p/ publicar no claude.ai)
 *
 * Para trocar fotos: substitua os arquivos em img/ (produtos p01..p12) e
 * canva/ (fotos de moda cXX_w.jpg) e rode de novo.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const IMGDIR = path.join(ROOT, "img");
const CANVA = path.join(ROOT, "canva");

const b64 = f => "data:image/jpeg;base64," + fs.readFileSync(f).toString("base64");

// --- mapa de imagens dos produtos (id -> foto) ---
const img = {};
for (let i = 1; i <= 12; i++) {
  img[i] = b64(path.join(IMGDIR, "p" + String(i).padStart(2, "0") + ".jpg"));
}
// categoria "Roupas" usa as fotos reais de moda (Canva)
img[10] = b64(path.join(CANVA, "c06_w.jpg")); // conjunto floral
img[11] = b64(path.join(CANVA, "c03_w.jpg")); // cropped + jeans
img[12] = b64(path.join(CANVA, "c05_w.jpg")); // jaqueta de couro

// --- slideshow do hero (4 looks do Canva) ---
const slides = [
  { img: b64(path.join(CANVA, "c04_w.jpg")), tag: "Moda",       title: "Looks que combinam com você" },
  { img: b64(path.join(CANVA, "c02_w.jpg")), tag: "Estilo",     title: "Do casual ao sofisticado" },
  { img: b64(path.join(CANVA, "c09_w.jpg")), tag: "Coleção",    title: "Novidades toda semana" },
  { img: b64(path.join(CANVA, "c08_w.jpg")), tag: "Tendências", title: "Seu estilo, do seu jeito" },
];

// --- injeta no template ---
const tpl = fs.readFileSync(path.join(__dirname, "template.html"), "utf8");
const artifact = tpl
  .replace("__IMG_MAP__", JSON.stringify(img))
  .replace("__SLIDES_MAP__", JSON.stringify(slides));

// versão Artifact (sem doctype/head — a plataforma claude.ai injeta)
fs.writeFileSync(path.join(ROOT, "modelo2-carrinho.html"), artifact, "utf8");

// versão standalone deployável (com charset — evita mojibake em servidor cru)
const standalone = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${artifact}
</body>
</html>`;
fs.writeFileSync(path.join(ROOT, "index.html"), standalone, "utf8");

const rest = (artifact.match(/__[A-Z_]+__/g) || []).length;
console.log("OK — index.html:", (standalone.length / 1024 | 0), "KB | placeholders restantes:", rest);
