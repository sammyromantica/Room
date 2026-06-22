// copy-index.cjs
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'dist', 'client', 'assets');
const templatePath = path.join(__dirname, 'index.template.html');
const clientDir = path.join(__dirname, 'dist', 'client');

// Buscar archivos CSS y JS principales
let cssFile = '';
let jsFile = '';

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
}

if (!cssFile || !jsFile) {
  console.error('❌ No se encontraron archivos CSS o JS en dist/client/assets/');
  process.exit(1);
}

// Leer plantilla y reemplazar placeholders
const template = fs.readFileSync(templatePath, 'utf-8');
const html = template
  .replace(/\{\{CSS\}\}/g, cssFile)
  .replace(/\{\{JS\}\}/g, jsFile);

// Asegurar que la carpeta dist/client existe
if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir, { recursive: true });
}

// Escribir index.html
const indexPath = path.join(clientDir, 'index.html');
fs.writeFileSync(indexPath, html);
console.log(`✅ index.html generado con CSS: ${cssFile} y JS: ${jsFile}`);

// --- NUEVO: Crear 404.html como copia de index.html ---
const notFoundPath = path.join(clientDir, '404.html');
fs.copyFileSync(indexPath, notFoundPath);
console.log(`✅ 404.html generado como copia de index.html`);