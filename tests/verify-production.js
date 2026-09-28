'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');

const html=read('index.html');
const app=read('app.js');
const css=read('styles.css');
const sw=read('sw.js');
const manifest=JSON.parse(read('manifest.webmanifest'));
const server=read('server.js');
const workflow=read('.github/workflows/deploy-pages.yml');

assert.match(html,/Kawan Hawe Chorwa/i);
assert.match(html,/manifest\.webmanifest/);
assert.ok(html.indexOf('game-core.js') < html.indexOf('app.js'),'core must load before app');
assert.match(html,/Content-Security-Policy/);

const bank=app.slice(app.indexOf('const WORD_BANK'),app.indexOf('const AVATARS'));
assert.equal((bank.match(/\['[^']+','[^']+'\]/g)||[]).length,156,'word bank must contain 156 pairs');
['Bihar Special','Gen-Z Lite','Anime Energy','School & College'].forEach(pack=>assert.ok(bank.includes(pack),`missing ${pack}`));

const avatarBlock=app.slice(app.indexOf('const AVATARS'),app.indexOf('const RAVI_SPRITES'));
assert.equal((avatarBlock.match(/group:'Hero(?:ine)?'/g)||[]).length,16,'must have 16 anime choices');
['naruto','itachi','luffy','zoro','goku','light','gojo','levi','tsunade','hinata','boa','yoruichi','faye','revy','mikasa','makima'].forEach(id=>assert.ok(avatarBlock.includes(`id:'${id}'`),`missing ${id}`));

const localAssets=[...(app.matchAll(/(?:url:|'|\")((?:assets\/)[^'\"]+\.jpg)/g))].map(match=>match[1]);
for(const asset of new Set(localAssets)){
  const stat=fs.statSync(path.join(root,asset));
  assert.ok(stat.size>1000,`${asset} is empty or placeholder`);
  const magic=fs.readFileSync(path.join(root,asset)).subarray(0,2);
  assert.deepEqual([...magic],[0xff,0xd8],`${asset} is not a valid JPEG`);
}
assert.ok(fs.statSync(path.join(root,'assets/icon-48.png')).size>1000,'logo asset is missing');
assert.equal((app.match(/assets\/ravi\//g)||[]).length,3,'must have three Ravi sprites');
assert.equal((app.match(/https:\/\/cdn\.myanimelist/g)||[]).length,0,'runtime must not hotlink anime CDN');

['pointerdown','pointerup','pointercancel','lostpointercapture'].forEach(event=>assert.ok(app.includes(event),`reveal missing ${event}`));
assert.match(app,/state\.hasPeeked=true/);
assert.match(app,/next\.disabled=false/);
assert.match(app,/\[60,90,120,180\]/);
assert.match(app,/Math\.floor\(Math\.random\(\)\*playerCount\)/,'starter must be randomly selected from the current players');
assert.match(app,/Kam se kam 3 khiladi chahi/);
assert.match(app,/id="add-player"/);
assert.match(app,/state\.players\.length-1/);
assert.match(app,/showStats/);
assert.match(app,/renderFinalStats/);
assert.match(app,/localStorage\.setItem\(STORAGE_KEY/);
assert.match(app,/Auto-save ON/);
assert.match(app,/window\.scrollTo\(\{top:0/,'screen changes must reset mobile scroll');
assert.match(app,/id="session-goal"/);
assert.match(app,/state\.recentPairs/);
assert.match(app,/id="random-avatar"/);
assert.match(app,/id="toggle-gallery"/);
assert.match(app,/showTutorial/);
assert.match(app,/id="same-team"/);
assert.match(app,/shareResults/);
assert.match(app,/confirmEndSession/);
assert.match(app,/aria-hidden="true"/,'hidden secret must be absent from the accessibility tree');
assert.match(app,/beforeinstallprompt/);
assert.match(app,/award-card/);
assert.match(app,/toggle-sound/);
assert.match(app,/toggle-haptics/);

assert.ok(css.length>15000,'production stylesheet unexpectedly small');
assert.match(css,/@media\(max-width:760px\)/);
assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
assert.match(css,/avatar-sticky-actions/);
assert.match(css,/min-width:44px;min-height:44px/);
assert.equal(manifest.display,'standalone');
assert.equal(manifest.orientation,'portrait-primary');
assert.match(server,/PUBLIC_FILES/);
assert.match(server,/!requested\.startsWith\('assets\/'\)/);
assert.match(server,/\['GET','HEAD'\]/);
assert.match(workflow,/actions\/configure-pages@v5/);
assert.match(workflow,/actions\/upload-pages-artifact@v4/);
assert.match(workflow,/actions\/deploy-pages@v4/);
assert.match(workflow,/npm run build/);

const cached=[...sw.matchAll(/'\.\/([^']+)'/g)].map(match=>match[1]);
cached.forEach(file=>assert.ok(fs.existsSync(path.join(root,file)),`service worker references missing ${file}`));

console.log(`production verification: ${new Set(localAssets).size} local assets, 156 word pairs, PWA shell and interaction gates passed`);
