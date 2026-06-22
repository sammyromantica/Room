// copy-index.cjs
const fs = require('fs');
const path = require('path');

console.log('📁 Iniciando copia de index.html...');

const clientDir = path.join(__dirname, 'dist', 'client');
const assetsDir = path.join(clientDir, 'assets');
const templatePath = path.join(__dirname, 'index.template.html');
const indexPath = path.join(clientDir, 'index.html');

// Verificar que la carpeta dist/client existe
if (!fs.existsSync(clientDir)) {
  console.error('❌ La carpeta dist/client no existe');
  process.exit(1);
}

// Verificar que la carpeta assets existe
if (!fs.existsSync(assetsDir)) {
  console.error('❌ La carpeta dist/client/assets no existe');
  process.exit(1);
}

// Listar archivos en assets para depuración
console.log('📂 Archivos en assets:', fs.readdirSync(assetsDir).join(', '));

// Buscar CSS y JS
const files = fs.readdirSync(assetsDir);
const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

if (!cssFile || !jsFile) {
  console.error(`❌ No se encontraron archivos CSS o JS en ${assetsDir}`);
  console.error(`   CSS encontrados: ${files.filter(f => f.endsWith('.css')).join(', ')}`);
  console.error(`   JS encontrados: ${files.filter(f => f.endsWith('.js')).join(', ')}`);
  process.exit(1);
}

console.log(`✅ CSS encontrado: ${cssFile}`);
console.log(`✅ JS encontrado: ${jsFile}`);

// Verificar que la plantilla existe
if (!fs.existsSync(templatePath)) {
  console.error(`❌ No se encontró la plantilla en ${templatePath}`);
  process.exit(1);
}

// Leer y reemplazar placeholders
const template = fs.readFileSync(templatePath, 'utf-8');
const html = template
  .replace(/\{\{CSS\}\}/g, cssFile)
  .replace(/\{\{JS\}\}/g, jsFile);

// Escribir index.html
fs.writeFileSync(indexPath, html);
console.log(`✅ index.html generado en ${indexPath}`);

// Crear 404.html como copia
const notFoundPath = path.join(clientDir, '404.html');
fs.copyFileSync(indexPath, notFoundPath);
console.log(`✅ 404.html generado en ${notFoundPath}`);