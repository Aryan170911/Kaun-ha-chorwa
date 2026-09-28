'use strict';
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
const publicFiles = ['index.html','styles.css','game-core.js','app.js','manifest.webmanifest','sw.js'];

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
publicFiles.forEach(file => fs.copyFileSync(path.join(root,file),path.join(output,file)));
fs.cpSync(path.join(root,'assets'),path.join(output,'assets'),{recursive:true});
fs.writeFileSync(path.join(output,'.nojekyll'),'');
console.log(`GitHub Pages artifact ready: ${output}`);
