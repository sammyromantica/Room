const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'dist', 'client', 'assets');
const templatePath = path.join(__dirname, 'index.template.html');
const indexPath = path.join(__dirname, 'dist', 'client', 'index.html');

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

// Escribir index.html
fs.writeFileSync(indexPath, html);
console.log(`✅ index.html generado con CSS: ${cssFile} y JS: ${jsFile}`);