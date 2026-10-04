import {readFileSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
const groups = [['01_lift_cup','Lift Cup'],['02_cover_ducks','Cover Ducks'],['03_route_recall','Route Recall'],['04_put_back_cup','Put Back Cup']];
const sections = groups.map(([folder,title]) => {
  const files = readdirSync(join('assets/videos',folder)).filter(f=>f.endsWith('.mp4')).sort();
  const cards = files.map((file,i)=>{
    const robot = file.startsWith('agilex')?'AgileX COBOT':'Franka';
    const view = file.includes('wrist')?'Wrist camera':'External view';
    const demo = file.match(/_(\d+)\.mp4$/)?.[1] || '01';
    const path=`assets/videos/${folder}/${file}`;
    return `<article class="video-card"><video controls playsinline preload="none" poster="${path.replace('.mp4','.jpg')}" src="${path}" aria-label="${title}, ${robot}, ${view}, demo ${demo}"></video><div class="video-meta"><div><h3>${robot}</h3><span>${view} · Demo ${Number(demo)}</span></div><a class="text-link" href="${path}">Open video</a></div></article>`;
  }).join('\n');
  return `<section class="section wrap" id="${folder}"><div class="section-heading"><h2>${title}</h2><p>${files.length} recordings</p></div><div class="video-grid">${cards}</div></section>`;
}).join('\n');
const home=readFileSync('index.html','utf8');
const head=home.slice(0,home.indexOf('<body>')).replace(/<title>.*?<\/title>/,'<title>All robot demos · EvoMem-VLA</title>').replace('  <script defer src="app.js"></script>','');
writeFileSync('video-index.html',`${head}<body><header class="site-header"><nav class="nav wrap" aria-label="Navigation"><a class="wordmark" href="index.html">Δ EvoMem-VLA</a><a href="index.html#demos">Back to project page</a></nav></header><main><section class="hero wrap"><p class="eyebrow">Real-world demonstrations</p><h1>All 20 recordings</h1><p class="hero-description">Representative successful rollouts on the Franka single-arm robot and AgileX COBOT dual-arm platform. Each video has its own playback controls.</p><p class="demo-note">The recordings illustrate task execution; they are not the full evaluation set and should not be used to recompute success rates. Different camera recordings are not assumed to be synchronized. Human pointing in Route Recall provides the task instruction, not corrective assistance.</p></section>${sections}</main><footer class="footer wrap"><a href="index.html">EvoMem-VLA project page</a></footer></body></html>\n`);
console.log('Generated video-index.html with 20 recordings.');
