'use strict';
const tasks = {
  lift: {name:'Lift Cup', folder:'01_lift_cup', sr:'85.0%', instruction:'Lift the cup the number of times shown on the card, then put it back.', memory:'The cup returns to a similar pose after each lift. The robot must remember how many repetitions are complete.', files:{agilex:['agilex_external_demo_01','agilex_external_demo_02'],franka:['franka_external_demo_01','franka_external_demo_02'],wrist:['franka_wrist_demo_01','franka_wrist_demo_02']}},
  ducks: {name:'Cover Ducks', folder:'02_cover_ducks', sr:'90.0%', instruction:'Cover the ducks with cups from left to right, then uncover the pink, green, and blue ducks in that order.', memory:'Positions and color order vary. The robot must remember which duck is hidden beneath each cup.', files:{agilex:['agilex_external_demo_01','agilex_external_demo_02'],franka:['franka_external_demo_01','franka_external_demo_02'],wrist:['franka_wrist_demo_01','franka_wrist_demo_02']}},
  route: {name:'Route Recall', folder:'03_route_recall', sr:'75.0%', instruction:'Watch the demonstrated order of blue boxes, then place the cup into the boxes in the same order.', memory:'A human points to a sequence of 3–6 boxes, which can include repeats. The robot must reproduce the full sequence without human correction.', files:{agilex:['agilex_external_demo'],franka:['franka_external_demo'],wrist:['agilex_head_demo']}, robotView:'AgileX COBOT · Head camera'},
  return: {name:'Put Back Cup', folder:'04_put_back_cup', sr:'85.0%', instruction:'Move the cup to the center, return the arm home, then place the cup back in its original box.', memory:'The initial box varies. Once the cup has moved to the center, the current scene no longer identifies where it came from.', files:{agilex:['agilex_external_demo_01','agilex_external_demo_02'],franka:['franka_external_demo_01','franka_external_demo_02'],wrist:['franka_wrist_demo']}}
};
let currentTask = 'lift';
const tabs = [...document.querySelectorAll('[data-task]')];
const views = ['agilex','franka','wrist'];
const viewNames = {agilex:'AgileX COBOT, external view',franka:'Franka, external view',wrist:'Franka, wrist-camera view'};
function setVideo(view, index){
  const task = tasks[currentTask];
  const video = document.getElementById(`video-${view}`);
  const path = `assets/videos/${task.folder}/${task.files[view][index]}`;
  video.pause();
  video.poster = `${path}.jpg`;
  video.src = `${path}.mp4`;
  const description = view === 'wrist' && task.robotView ? task.robotView : viewNames[view];
  video.setAttribute('aria-label',`${task.name} on ${description}, demo ${index + 1}`);
  video.load();
}
function switchTask(key){
  currentTask = key;
  const task = tasks[key];
  tabs.forEach(tab => {const active=tab.dataset.task===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
  document.getElementById('demo-panel').setAttribute('aria-labelledby',`tab-${key}`);
  document.getElementById('task-title').textContent=task.name;
  document.getElementById('task-instruction').textContent=task.instruction;
  document.getElementById('task-memory').textContent=task.memory;
  document.getElementById('task-sr').textContent=task.sr;
  document.getElementById('robot-view-description').textContent=task.robotView || 'Franka · Wrist camera';
  views.forEach(view => {
    const select=document.getElementById(`select-${view}`);
    select.replaceChildren(...task.files[view].map((_,i)=>new Option(`Demo ${i+1}`,String(i))));
    select.disabled=task.files[view].length===1;
    setVideo(view,0);
  });
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>switchTask(tab.dataset.task));
  tab.addEventListener('keydown',event=>{
    let next;
    if(event.key==='ArrowRight')next=(i+1)%tabs.length;
    if(event.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;
    if(event.key==='Home')next=0;
    if(event.key==='End')next=tabs.length-1;
    if(next!==undefined){event.preventDefault();tabs[next].focus();switchTask(tabs[next].dataset.task);}
  });
});
views.forEach(view=>document.getElementById(`select-${view}`).addEventListener('change',event=>setVideo(view,Number(event.target.value))));
document.querySelectorAll('video').forEach(video=>video.addEventListener('play',()=>document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();})));
document.getElementById('checkpoint-button').addEventListener('click',()=>{
  document.getElementById('release-status').textContent='Coming Soon';
});
document.getElementById('copy-citation').addEventListener('click',async()=>{
  const status=document.getElementById('copy-status');
  try{await navigator.clipboard.writeText(document.getElementById('bibtex').textContent);status.textContent='Citation copied.';}catch{status.textContent='Please select and copy the citation above.';}
});
