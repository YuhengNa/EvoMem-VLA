import assert from 'node:assert/strict';
import {readFileSync, existsSync, readdirSync, statSync} from 'node:fs';
import {join} from 'node:path';
let count=0;
for(const file of ['index.html','video-index.html']){
  const html=readFileSync(file,'utf8');
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${file}: duplicate IDs`);
  for(const [,url] of html.matchAll(/\b(?:src|href|poster)="([^"]+)"/g)){
    if(url.startsWith('#'))assert(ids.includes(url.slice(1)),`Missing anchor ${url}`);
    else if(!/^(https?:|data:)/.test(url))assert(existsSync(url.split('#')[0]),`Missing local asset ${url}`);
  }
}
for(const folder of readdirSync('assets/videos')){
  for(const name of readdirSync(join('assets/videos',folder)).filter(f=>f.endsWith('.mp4'))){
    const path=join('assets/videos',folder,name);
    assert(existsSync(path.replace('.mp4','.jpg')),`Missing poster: ${path}`);
    assert(statSync(path).size<100*1024*1024,`Oversize video: ${path}`);
    count++;
  }
}
assert.equal(count,20);
const page=readFileSync('index.html','utf8');
assert(!/TODO|YOUR_|placeholder/i.test(page),'Unresolved placeholder');
assert(page.includes('href="https://github.com/YuhengNa/EvoMem-VLA-Code"'),'Missing code repository link');
assert(/<button[^>]*disabled[^>]*>Paper<\/button>/.test(page),'Paper must remain unlinked');
assert(page.includes('id="checkpoint-button"') && page.includes('id="release-status"'),'Missing checkpoint status controls');
const app=readFileSync('app.js','utf8');
assert(app.includes("wrist:['agilex_head_demo']"),'Route Recall must use the corrected head-camera video');
assert(!existsSync('assets/videos/03_route_recall/franka_wrist_demo.mp4'),'Incorrect Route Recall clip remains');
console.log('PASS: local links, anchors, unique IDs, 20 videos + posters, resource controls, corrected Route Recall clip.');
