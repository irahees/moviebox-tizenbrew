(function(){
  'use strict';
  const $=id=>document.getElementById(id);
  const demo=[
    {title:'The Golden Horizon',type:'movie',year:2025,description:'A sample title used to preview the library interface. Replace the demo catalogue with your own authorized media source.'},
    {title:'Midnight City',type:'movie',year:2024,description:'A sample movie entry. Add your own poster and playback URL in your catalogue JSON.'},
    {title:'Beyond the Coast',type:'series',year:2025,description:'A sample series entry for testing navigation and details.'},
    {title:'The Last Signal',type:'movie',year:2023,description:'A sample title. No copyrighted movie files or streams are included.'},
    {title:'Hidden Kingdom',type:'series',year:2024,description:'A sample series entry. Connect a service you are authorized to use.'},
    {title:'Blue Planet',type:'movie',year:2022,description:'A sample catalogue card for layout testing.'},
    {title:'After Tomorrow',type:'series',year:2025,description:'A sample series entry for the TV interface.'},
    {title:'Open Road',type:'movie',year:2021,description:'A sample movie card.'}
  ];
  let items=demo.slice(),tab='home',filter='all',query='',focusables=[];
  function toast(s){const t=$('toast');t.textContent=s;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2400)}
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
  function filtered(){return items.filter(x=>(tab==='movies'?x.type==='movie':tab==='series'?x.type==='series':tab==='mylist'?x.favorite===true:true)&&(filter==='all'||x.type===filter)&&(!query||String(x.title||'').toLowerCase().includes(query)||String(x.description||'').toLowerCase().includes(query)))}
  function render(){const list=filtered();$('sectionTitle').textContent=tab==='movies'?'Movies':tab==='series'?'Series':tab==='mylist'?'My List':query?'Search results':'Featured titles';$('count').textContent=list.length+' titles';$('grid').innerHTML=list.length?list.map(x=>`<article class="tile" tabindex="0" role="button" data-index="${items.indexOf(x)}"><div class="poster">${x.poster?`<img src="${esc(x.poster)}" alt="">`:`<span class="poster-letter">${esc((x.title||'M').slice(0,1).toUpperCase())}</span>`}<span class="type">${esc(x.type||'movie')}</span></div><div class="tile-info"><h3>${esc(x.title||'Untitled')}</h3><p>${esc(x.year||'')}${x.genre?' · '+esc(x.genre):''}</p></div></article>`).join(''):'<p class="muted">No titles found. Connect your catalogue to load your library.</p>';focusables=Array.from(document.querySelectorAll('button,.tile,input')).filter(e=>!e.disabled&&!e.classList.contains('hidden'))}
  function setTab(v){tab=v;document.querySelectorAll('.tab').forEach(b=>b.classList.toggle('active',b.dataset.tab===v));render()}
  function openDetails(i){const x=items[i];if(!x)return;$('detailBody').innerHTML=`${x.poster?`<img class="detail-poster" src="${esc(x.poster)}" alt="">`:''}<div class="detail-copy"><p class="eyebrow">${esc((x.type||'movie').toUpperCase())}</p><h2>${esc(x.title||'Untitled')}</h2><p class="detail-meta">${esc(x.year||'')} ${x.genre?' · '+esc(x.genre):''}</p><p>${esc(x.description||'No description available.')}</p><div class="dialog-actions"><button class="primary" id="playItem" ${x.url?'':'disabled'}>▶ Play</button><button class="secondary" id="favItem">${x.favorite?'Remove from My List':'Add to My List'}</button></div></div>`;$('details').showModal();$('playItem').onclick=()=>{if(!x.url)return;const w=window.open(x.url,'_blank');if(!w)toast('Playback could not be opened by this TV browser.')};$('favItem').onclick=()=>{x.favorite=!x.favorite;$('favItem').textContent=x.favorite?'Remove from My List':'Add to My List';render()}}
  function showSettings(){$('settingsStatus').textContent='';$('settings').showModal()}
  async function loadCatalogue(){const url=$('catalogUrl').value.trim();if(!/^https:\/\//i.test(url)){$('settingsStatus').textContent='Enter a valid HTTPS catalogue URL.';return}try{$('settingsStatus').textContent='Loading…';const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);const data=await r.json();if(!Array.isArray(data))throw new Error('The JSON root must be an array.');items=data.filter(x=>x&&typeof x.title==='string').map(x=>({...x,type:x.type==='series'?'series':'movie'}));$('settings').close();setTab('home');toast('Catalogue loaded: '+items.length+' titles')}catch(e){$('settingsStatus').textContent='Could not load catalogue: '+e.message}}
  $('tabs').addEventListener('click',e=>{const b=e.target.closest('[data-tab]');if(b)setTab(b.dataset.tab)});
  $('filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(!b)return;filter=b.dataset.filter;document.querySelectorAll('.filter').forEach(x=>x.classList.toggle('active',x===b));render()});
  $('grid').addEventListener('click',e=>{const t=e.target.closest('.tile');if(t)openDetails(Number(t.dataset.index))});
  $('grid').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const t=e.target.closest('.tile');if(t){e.preventDefault();openDetails(Number(t.dataset.index))}}});
  $('searchToggle').onclick=()=>{$('searchPanel').classList.toggle('hidden');if(!$('searchPanel').classList.contains('hidden'))$('searchInput').focus()};
  $('searchInput').oninput=e=>{query=e.target.value.toLowerCase().trim();render()};$('clearSearch').onclick=()=>{$('searchInput').value='';query='';render()};
  $('setupBtn').onclick=$('connectBottom').onclick=showSettings;$('heroBrowse').onclick=()=>{setTab('movies');$('grid').scrollIntoView({behavior:'smooth'})};
  $('loadCatalog').onclick=loadCatalogue;$('useDemo').onclick=()=>{items=demo.slice();$('settings').close();setTab('home');toast('Demo library loaded')};
  $('closeDetails').onclick=()=>$('details').close();$('closeSettings').onclick=()=>$('settings').close();
  document.addEventListener('keydown',e=>{if(e.key==='Escape'||e.key==='Backspace'){if($('details').open){$('details').close();e.preventDefault()}else if($('settings').open){$('settings').close();e.preventDefault()}return}if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)&&!$('details').open&&!$('settings').open){const active=document.activeElement;const arr=focusables;let i=arr.indexOf(active);if(i<0)i=0;let next=i+(e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:e.key==='ArrowDown'?5:-5);next=Math.max(0,Math.min(arr.length-1,next));arr[next]&&arr[next].focus();e.preventDefault()}});
  render();
})();