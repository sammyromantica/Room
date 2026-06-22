// copy-index.cjs
const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'dist', 'client', 'assets');
const clientDir = path.join(__dirname, 'dist', 'client');

// Buscar archivos CSS y JS
let cssFile = '';
let jsFile = '';

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
}

if (!cssFile || !jsFile) {
  console.error('❌ No se encontraron archivos CSS o JS');
  process.exit(1);
}

// Leer plantilla
const templatePath = path.join(__dirname, 'index.template.html');
const template = fs.readFileSync(templatePath, 'utf-8');
const html = template
  .replace(/\{\{CSS\}\}/g, cssFile)
  .replace(/\{\{JS\}\}/g, jsFile);

// Guardar index.html
const indexPath = path.join(clientDir, 'index.html');
fs.writeFileSync(indexPath, html);
console.log(`✅ index.html generado con CSS: ${cssFile} y JS: ${jsFile}`);

// Copiar como 404.html
const notFoundPath = path.join(clientDir, '404.html');
fs.copyFileSync(indexPath, notFoundPath);
console.log(`✅ 404.html generado`);