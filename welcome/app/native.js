const TEAM_MEMBERS=[{"id":"tolstikov","name":"Толстиков Николай","shortName":"Николай Т.","role":"ЭКОНОМИКА","slogan":"Идеи • Планы • Результат. Экономический расчёт и ресурсы команды.","badgeIcon":"📈","img":"../assets/tolstikov.webp"},{"id":"reutskaya","name":"Реутская Екатерина","shortName":"Екатерина Р.","role":"УПРАВЛЕНИЕ","slogan":"Команда • Люди • Управление. Координация штаба и лидерство.","badgeIcon":"👑","img":"../assets/reutskaya.webp"},{"id":"smolyaninov","name":"Смольянинов Артем","shortName":"Артем С.","role":"Безопасность","slogan":"Надёжность, уверенность и защита интересов команды.","badgeIcon":"🛡️","img":"../assets/smolyaninov.webp"},{"id":"varvarin","name":"Варварин Никита","shortName":"Никита В.","role":"Спорт","slogan":"Спортивный драйв, энергия движения и воля к победе.","badgeIcon":"🏆","img":"../assets/varvarin.webp"},{"id":"kozhenkov","name":"Коженков Арсений","shortName":"Арсений К.","role":"ПАТРИОТ","slogan":"Честь, дисциплина, выдержка и верность традициям.","badgeIcon":"🇷🇺","img":"../assets/kozhenkov.webp"},{"id":"goncharova","name":"Гончарова Елизавета","shortName":"Елизавета Г.","role":"Медиа","slogan":"Стиль, кадры и главный медиа-голос «Суммы Личностей».","badgeIcon":"🎬","img":"../assets/goncharova.webp"},{"id":"morozova","name":"Морозова Ульяна","shortName":"Ульяна М.","role":"Культура","slogan":"Творчество, эстетика и культурный код фестиваля.","badgeIcon":"🎭","img":"../assets/morozova.webp"},{"id":"otyutskiy","name":"Отюцкий Евгений","shortName":"Евгений О.","role":"ПОЛИТИК","slogan":"Сила в команде! Большие цели начинаются с людей.","badgeIcon":"🤝","img":"../assets/otyutskiy.webp"},{"id":"zverev","name":"Зверев Никита","shortName":"Никита З.","role":"ПРОЕКТИРОВЩИК","slogan":"Превращаем смелые идеи в работающие проекты.","badgeIcon":"📐","img":"../assets/zverev.webp"},{"id":"znamenshikova","name":"Знаменщикова Кристина","shortName":"Кристина З.","role":"Журналист","slogan":"Острые репортажи, смыслы и летопись наших побед.","badgeIcon":"🎤","img":"../assets/znamenshikova.webp"}];const NATIVE_PHOTO_BASE=typeof document!=='undefined'&&document.currentScript?.src?new URL('../assets/',document.currentScript.src).href:'./assets/';TEAM_MEMBERS.forEach(m=>m.img=NATIVE_PHOTO_BASE+m.id+'.webp');const FACE_PHOTOS=Object.fromEntries(TEAM_MEMBERS.map(m=>[m.id,m.img]));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const c2={ch:Object.fromEntries(TEAM_MEMBERS.map(m=>[m.id,1])),sk:{},x:false};
const CC_GIRLS=new Set(['reutskaya','goncharova','morozova','znamenshikova']);
const CC_SVG={
 hat:'<svg viewBox="0 0 100 62"><path d="M12 48 C18 22 40 5 66 5 C81 5 91 13 93 26 C85 21 76 21 70 26 C65 33 63 41 63 48 Z" fill="#d7263d"/><path d="M42 11 C51 7 60 7 66 9 C58 16 52 29 50 48 L40 48 Z" fill="#a91b2e" opacity=".55"/><circle cx="93" cy="28" r="7.5" fill="#fff"/><rect x="6" y="43" width="66" height="16" rx="8" fill="#fff"/><path d="M10 51 h58" stroke="#e1ebf3" stroke-width="2" stroke-dasharray="3 4"/></svg>',
 beard:'<svg viewBox="0 0 100 92"><path d="M5 12 C3 42 18 76 50 90 C82 76 97 42 95 12 C86 24 74 28 64 23 C59 31 41 31 36 23 C26 28 14 24 5 12 Z" fill="#fff"/><path d="M22 36 C30 60 40 74 50 80 C60 74 70 60 78 36" fill="none" stroke="#e3ebf2" stroke-width="2"/><path d="M17 19 C27 6 44 8 50 16 C56 8 73 6 83 19 C73 27 58 25 50 21 C42 25 27 27 17 19 Z" fill="#fff" stroke="#dbe5ee" stroke-width="1.5"/><ellipse cx="50" cy="28" rx="7" ry="3.5" fill="#c97b84" opacity=".55"/></svg>',
 kok:'<svg viewBox="0 0 100 52"><path d="M6 50 C8 22 28 4 50 4 C72 4 92 22 94 50 Z" fill="#7cc4ff"/><path d="M14 50 C16 28 32 13 50 13 C68 13 84 28 86 50" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="2 5" stroke-linecap="round"/><path d="M50 14 l4 9 10 1 -8 6 3 10 -9 -6 -9 6 3 -10 -8 -6 10 -1z" fill="#fff"/><circle cx="22" cy="40" r="3" fill="#fff"/><circle cx="78" cy="40" r="3" fill="#fff"/></svg>',
 web:'<svg viewBox="0 0 100 100"><g fill="none" stroke="#fff" stroke-width="1.2" opacity=".85"><path d="M0 0 L100 100 M0 0 L100 40 M0 0 L40 100 M0 0 L100 0 M0 0 L0 100"/><path d="M0 22 Q10 18 18 14 Q22 8 22 0"/><path d="M0 44 Q20 38 34 30 Q42 18 44 0"/><path d="M0 66 Q30 58 50 46 Q62 28 66 0"/><path d="M0 88 Q40 78 66 62 Q82 38 88 0"/></g></svg>',
 witch:'<svg viewBox="0 0 100 70"><path d="M8 58 Q50 46 92 58 Q50 70 8 58Z" fill="#2b123d"/><path d="M30 54 L52 4 Q58 0 60 8 L70 54 Z" fill="#3b1854"/><rect x="31" y="46" width="39" height="7" fill="#ff8a1f"/></svg>'};
const ccMem=id=>TEAM_MEMBERS.find(m=>m.id===id)||TEAM_MEMBERS[0];
const ccPhoto=m=>FACE_PHOTOS[m.id]||m.img;
const ccFirst=m=>{const p=String(m.name).trim().split(/\s+/);return p.length>1?p.slice(1).join(' '):p[0]};
const C2_SKINS=[
 {id:'neon',n:'Неон',r:'r'},{id:'retro',n:'Ретро',r:'r'},{id:'comic',n:'Комикс',r:'r'},
 {id:'hallo',n:'Хэллоуин',r:'e'},{id:'space',n:'Космонавт',r:'e'},{id:'cyber',n:'Киберпанк',r:'e'},
 {id:'gold',n:'Золото',r:'m'},{id:'holo',n:'Голограмма',r:'m'},{id:'fire',n:'Пламя',r:'m'},
 {id:'frost',n:'Дед Мороз',r:'l'},{id:'royal',n:'Король',r:'l'},{id:'hero',n:'Супергерой',r:'l'}];
const C2_R={r:{n:'Редкий',w:55,dup:250},e:{n:'Эпический',w:28,dup:600},m:{n:'Мифический',w:13,dup:1800},l:{n:'Легендарный',w:4,dup:6000}};
const C2_SVG={
 crown:'<svg viewBox="0 0 100 62"><path d="M6 58 L12 16 L32 38 L50 6 L68 38 L88 16 L94 58 Z" fill="#f2c94c" stroke="#8a5a12" stroke-width="2.5" stroke-linejoin="round"/><rect x="6" y="50" width="88" height="10" rx="3" fill="#e0a92e" stroke="#8a5a12" stroke-width="2"/><circle cx="50" cy="40" r="6" fill="#e11d48"/><circle cx="28" cy="46" r="4" fill="#38bdf8"/><circle cx="72" cy="46" r="4" fill="#22c55e"/><circle cx="12" cy="16" r="4" fill="#fff3c4"/><circle cx="50" cy="6" r="4.5" fill="#fff3c4"/><circle cx="88" cy="16" r="4" fill="#fff3c4"/></svg>',
 tiara:'<svg viewBox="0 0 100 44"><path d="M8 40 Q50 8 92 40 Q50 26 8 40Z" fill="#e6edf5" stroke="#9fb3c8" stroke-width="2"/><path d="M50 4 L56 20 L50 30 L44 20Z" fill="#7dd3fc" stroke="#fff" stroke-width="1.5"/><circle cx="30" cy="27" r="3.5" fill="#f9a8d4"/><circle cx="70" cy="27" r="3.5" fill="#f9a8d4"/><circle cx="18" cy="34" r="2.5" fill="#fff"/><circle cx="82" cy="34" r="2.5" fill="#fff"/></svg>',
 ermine:'<svg viewBox="0 0 100 34"><path d="M0 10 Q50 -6 100 10 L100 34 L0 34Z" fill="#fbfbfb"/><g fill="#111"><path d="M14 16 l2 7 -4 0z"/><path d="M34 12 l2 7 -4 0z"/><path d="M54 11 l2 7 -4 0z"/><path d="M74 13 l2 7 -4 0z"/><path d="M90 18 l2 7 -4 0z"/><path d="M24 26 l2 7 -4 0z"/><path d="M44 24 l2 7 -4 0z"/><path d="M64 24 l2 7 -4 0z"/><path d="M84 28 l2 6 -4 0z"/></g></svg>',
 shield:'<svg viewBox="0 0 60 64"><path d="M30 2 L58 12 L54 40 Q48 56 30 62 Q12 56 6 40 L2 12 Z" fill="#e11d48" stroke="#facc15" stroke-width="4" stroke-linejoin="round"/><text x="30" y="45" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="34" fill="#facc15">Σ</text></svg>',
 witch:'<svg viewBox="0 0 100 70"><path d="M6 58 Q50 44 94 58 Q50 72 6 58Z" fill="#5b21b6" stroke="#c4b5fd" stroke-width="2"/><path d="M30 54 L54 4 Q60 0 62 8 L70 54 Z" fill="#6d28d9" stroke="#c4b5fd" stroke-width="2" stroke-linejoin="round"/><rect x="31" y="45" width="39" height="8" fill="#ff8a1f"/><rect x="46" y="44" width="9" height="10" fill="none" stroke="#fde68a" stroke-width="2"/></svg>',
 burst:'<svg viewBox="0 0 100 100"><path d="M50 2 L58 30 L86 14 L70 40 L98 50 L70 60 L86 86 L58 70 L50 98 L42 70 L14 86 L30 60 L2 50 L30 40 L14 14 L42 30 Z" fill="#fff200" stroke="#111" stroke-width="3" stroke-linejoin="round"/><text x="50" y="58" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="20" fill="#e11d48">ВАУ!</text></svg>'};
const c2N=(o,k)=>Math.max(0,Math.floor(+(o||{})[k]||0));
const c2HasCh=m=>c2N(c2.ch,m)>0;
const c2HasSk=(m,s)=>c2N(c2.sk,m+':'+s)>0;
const c2Sk=id=>C2_SKINS.find(s=>s.id===id);
function c2Title(m,s){const f=ccFirst(m),g=CC_GIRLS.has(m.id);
 if(s==='frost')return(g?'Снегурочка ':'Дед Мороз ')+f;if(s==='royal')return(g?'Королева ':'Король ')+f;if(s==='hero')return(g?'Супергероиня ':'Супергерой ')+f;if(s==='hallo')return f+' 🎃';if(s==='space')return(g?'Космонавтка ':'Космонавт ')+f;return f}
function c2Card(mid,sid,o){o=o||{};const m=ccMem(mid),base=sid==='base',s=base?null:c2Sk(sid),r=base?'c':s.r,lock=!!o.lock,src=ccPhoto(m);let deco='';
 if(!base){const id=s.id,g=CC_GIRLS.has(m.id);
  if(id==='frost'){deco+=g?`<div class="cc-deco" style="left:18cqw;width:64cqw;top:3cqw">${CC_SVG.kok}</div>`:`<div class="cc-deco" style="left:6cqw;width:84cqw;top:-14cqw;transform:rotate(-8deg)">${CC_SVG.hat}</div><div class="cc-deco" style="left:28cqw;width:44cqw;top:62cqw">${CC_SVG.beard}</div>`;deco+='<div class="cc-snow"></div>'}
  if(id==='hallo')deco+=`<div class="cc-deco" style="left:14cqw;width:72cqw;top:-10cqw;transform:rotate(-6deg)">${C2_SVG.witch}</div><div class="cc-deco" style="left:-6cqw;top:-6cqw;width:40cqw;opacity:.6">${CC_SVG.web}</div><div class="cc-deco" style="right:4cqw;top:30cqw;font-size:12cqw">🦇</div><div class="cc-deco" style="left:4cqw;bottom:28cqw;font-size:15cqw">🎃</div><div class="cc-deco" style="right:5cqw;bottom:30cqw;font-size:11cqw">🎃</div>`;
  if(id==='space')deco+=`<div class="cc-deco" style="right:3cqw;top:66cqw;font-size:15cqw">🪐</div><div class="cc-deco" style="left:5cqw;top:70cqw;font-size:10cqw">☄️</div>`;
  if(id==='cyber')deco+=`<img class="cc-gl a" src="${src}" alt=""><img class="cc-gl b" src="${src}" alt=""><div class="cc-hud"></div>`;
  if(id==='gold'||id==='holo')deco+=`<span class="cc-twk" style="left:10cqw;top:24cqw">✨</span><span class="cc-twk" style="right:12cqw;top:44cqw;animation-delay:.8s">✨</span><span class="cc-twk" style="left:40cqw;top:12cqw;animation-delay:1.6s">✨</span>`;
  if(id==='fire')deco+=`<div class="cc-flame"></div>${[12,30,50,68,84].map((x,i)=>`<span class="cc-ember" style="left:${x}cqw;bottom:${10+i%2*8}cqw;animation-delay:${(i*.5).toFixed(1)}s"></span>`).join('')}`;
  if(id==='comic')deco+=`<div class="cc-deco" style="right:-3cqw;top:2cqw;width:40cqw;transform:rotate(12deg)">${C2_SVG.burst}</div>`;
  if(id==='royal')deco+=(g?`<div class="cc-deco" style="left:32cqw;width:36cqw;top:14cqw">${C2_SVG.tiara}</div>`:`<div class="cc-deco" style="left:33cqw;width:34cqw;top:7cqw">${C2_SVG.crown}</div>`)+`<div class="cc-deco" style="left:14cqw;width:72cqw;top:79cqw">${C2_SVG.ermine}</div>`;
  if(id==='hero')deco+=`<div class="cc-deco" style="right:4cqw;width:20cqw;top:17cqw;transform:rotate(8deg)">${C2_SVG.shield}</div><div class="cc-deco" style="left:4cqw;top:30cqw;font-size:12cqw">⚡</div><div class="cc-deco" style="right:4cqw;top:46cqw;font-size:12cqw">⚡</div>`}
 const sub=base?(m.badgeIcon+' '+m.role):s.n,rar=base?'Персонаж':C2_R[r].n,title=base?ccFirst(m):c2Title(m,s.id),cnt=base?c2N(c2.ch,m.id):c2N(c2.sk,m.id+':'+s.id);
 return`<div class="cc cc-r-${r} cc-s-${base?'classic':s.id}${lock?' lock':''}${o.fill?' fill':''}" ${o.attrs||''}><div class="cc-in"><div class="cc-bg"></div><div class="cc-ph"><img src="${src}" alt="" loading="lazy" draggable="false"></div>${deco}<div class="cc-sh"></div>${base?'':'<div class="cc-holo"></div>'}
  <div class="cc-top"><span class="cc-rar">${rar}</span><span class="cc-ic">${m.badgeIcon}</span></div>
  ${lock&&o.note?`<div class="cc-lock-note">${o.note}</div>`:''}
  <div class="cc-name"><small>${esc(sub)}</small><b>${esc(title)}</b></div>${!lock&&cnt>1&&o.count?`<span class="cc-cnt">×${cnt}</span>`:''}</div></div>`}
C2_SKINS.forEach(s=>{s.name=s.n;TEAM_MEMBERS.forEach(m=>c2.sk[m.id+':'+s.id]=1)});

const xText=s=>esc(s).replace(/#([\p{L}\d_]+)/gu,(m,t)=>`<span class="x-tag" data-tag="${t}">${m}</span>`);
const fmt=n=>n>=1000?(n/1000).toFixed(n>=10000?0:1).replace('.0','').replace('.',',')+' тыс.':String(n);
const IC={reply:'<svg viewBox="0 0 24 24"><path d="M21 11.5a8.4 8.4 0 0 1-12.2 7.5L3 20.5l1.6-5.3A8.5 8.5 0 1 1 21 11.5Z"/></svg>',rt:'<svg viewBox="0 0 24 24"><path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4m14-1v2a3 3 0 0 1-3 3H3"/></svg>',like:'<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.7 4.5c2 0 3.6 1 5.3 3 1.7-2 3.3-3 5.3-3 3.700 0 5.800 3.800 4.300 7.300C19.500 16.400 12 21 12 21Z"/></svg>',views:'<svg viewBox="0 0 24 24"><path d="M5 20V10m7 10V4m7 16v-7"/></svg>',share:'<svg viewBox="0 0 24 24"><path d="M12 15V3m0 0L7 8m5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>'};
const HANDLES={tolstikov:'tolstikov_eco',reutskaya:'ekaterina_upr',smolyaninov:'artem_safe',varvarin:'nikita_sport',kozhenkov:'arseniy_patriot',goncharova:'liza_media',morozova:'ulyana_culture',otyutskiy:'evgeniy_politik',zverev:'nikita_project',znamenshikova:'kristina_press'};
function mediaHTML(p){const imgs=p.customImage?[p.customImage]:(p.media||[]).map(id=>{const m=TEAM_MEMBERS.find(x=>x.id===id);return m?getMemberRealPhotoSrc(m):null}).filter(Boolean);if(!imgs.length)return'';const n=Math.min(imgs.length,3);return`<div class="x-media m${n}">${imgs.slice(0,3).map(s=>`<div><img src="${s}" loading="lazy"></div>`).join('')}</div>`}
function pollHTML(p){if(!p.poll)return'';const o=p.poll.options,tot=o.reduce((a,b)=>a+b.v,0)||1;return`<div class="x-poll">${o.map((x,i)=>{const pc=Math.round(x.v/tot*100);return`<div class="x-opt" onclick="votePoll('${p.id}',${i},event)">${p.poll.voted?`<i style="width:${pc}%"></i>`:''}<span>${esc(x.t)}${p.poll.choice===i?' ✓':''}</span>${p.poll.voted?`<span>${pc}%</span>`:''}</div>`}).join('')}<small style="color:rgba(186,222,255,.6);font-size:12px">${tot} голосов</small></div>`}
function renderNewsFeed(){
 const c=document.getElementById('newsFeedContainer');if(!c)return;c.className='';
 let list=state.posts.slice();
 if(feedTag)list=list.filter(p=>((p.title||'')+' '+(p.body||'')).toLowerCase().includes('#'+feedTag.toLowerCase()));
 if(feedTab==='top')list.sort((a,b)=>b.likes-a.likes);
 if(feedTab==='media')list=list.filter(p=>p.customImage||(p.media&&p.media.length));
 const chip=document.getElementById('xTagChip');if(chip){chip.style.display=feedTag?'block':'none';chip.textContent='✕ #'+feedTag}
 const anim=xAnim;xAnim=false;
 c.innerHTML=list.map((p,i)=>{const a=TEAM_MEMBERS.find(m=>m.id===p.authorId)||TEAM_MEMBERS[0];const name=p.authorCustomName||a.name;const rep=(p.replies||0)+(p.comments||[]).length;
  const rts=(p.reposts||Math.round(p.likes/5))+(p.reposted?1:0),views=p.views||p.likes*37+120;
  const rb=p.repostBy?TEAM_MEMBERS.find(m=>m.id===p.repostBy):null;
  return`<article class="xpost ${anim?'x-enter':''}" style="--i:${i}" onclick="openFullPostModal('${p.id}')"><div class="x-av"><img src="${avatarSrc(a)}"></div><div class="x-main">
  ${rb?`<div class="x-rt">🔁 ${esc(rb.shortName)} репостнул(а)</div>`:''}
  <div class="x-head"><b>${esc(name)}</b><svg width="16" height="16" viewBox="0 0 24 24" style="flex-shrink:0"><circle cx="12" cy="12" r="11" fill="#e07aa8"/><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span>@${HANDLES[p.authorId]||'summa'} · ${esc(p.timestamp)}</span></div>
  <div class="x-text">${p.title&&!p.poll&&p.id.startsWith('post_')?`<b>${xText(p.title)}</b>\n`:''}${xText(p.body)}</div>
  ${mediaHTML(p)}${pollHTML(p)}
  <div class="x-acts"><button class="x-act reply">${IC.reply}${rep}</button><button class="x-act rt ${p.reposted?'on':''} ${lastRt===p.id?'rt-spin':''}" onclick="toggleRepost('${p.id}',event)">${IC.rt}${fmt(rts)}</button><button class="x-act like ${p.likedByMe?'on':''} ${lastLiked===p.id&&p.likedByMe?'heart-pop':''}" onclick="togglePostLike('${p.id}',event)">${IC.like}${fmt(p.likes)}</button><button class="x-act">${IC.views}${fmt(views)}</button><button class="x-act" onclick="sharePost('${p.id}',event)">${IC.share}</button></div></div></article>`}).join('')||'<div style="padding:30px;text-align:center;color:#9cc">Пока здесь пусто</div>';
 lastLiked=null;lastRt=null}
function setFeedTab(t){feedTab=t;const i=['foryou','top','media'].indexOf(t);document.getElementById('xInk').style.transform=`translateX(${i*100}%)`;document.querySelectorAll('#xTabs button').forEach(b=>b.classList.toggle('on',b.dataset.t===t));xAnim=true;renderNewsFeed()}
function toggleRepost(id,e){e.stopPropagation();const p=state.posts.find(x=>x.id===id);if(!p)return;p.reposted=!p.reposted;lastRt=id;saveState();renderNewsFeed();toast(p.reposted?'🔁 Репост сделан':'Репост отменён')}
function votePoll(id,i,e){e.stopPropagation();const p=state.posts.find(x=>x.id===id);if(!p||!p.poll||p.poll.voted)return;p.poll.options[i].v++;p.poll.voted=true;p.poll.choice=i;saveState();renderNewsFeed()}
function togglePostLike(postId, event) {
            if (event) event.stopPropagation();
            const post = state.posts.find(p => p.id === postId);
            if (!post) return;
            post.likedByMe = !post.likedByMe;
            post.likes += post.likedByMe ? 1 : -1;
            saveState();
            renderNewsFeed();
            if (state.activePostModalId === postId) renderFullPostModalContent(post);
        }
function openFullPostModal(postId) {
            const post = state.posts.find(p => p.id === postId);
            if (!post) return;
            state.activePostModalId = postId;
            renderFullPostModalContent(post);
            const modal = document.getElementById('fullPostModal');
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            updateAuthUI();
        }
function renderFullPostModalContent(post) {
            const author = TEAM_MEMBERS.find(m => m.id === post.authorId) || TEAM_MEMBERS[0];
            const posterMember = post.memberPosterId ? (TEAM_MEMBERS.find(m => m.id === post.memberPosterId) || author) : author;
            const imgSrc = post.customImage || getMemberRealPhotoSrc(posterMember);
            const fallbackAvatar = getRouletteDetailedAvatarURI(posterMember);
            const displayAuthorName = post.authorCustomName || author.name;
            const comments = post.comments || [];

            document.getElementById('fullPostAuthorHeader').innerHTML = `
                <div class="w-9 h-9 rounded-xl overflow-hidden border border-neon-pink bg-dc-900 shrink-0">
                    <img src="${getMemberRealPhotoSrc(author)}" alt="${displayAuthorName}"
                         style="object-fit: cover; object-position: ${author.cropFocus || 'center 14%'}; transform: scale(1.15);"
                         class="w-full h-full"
                         onerror="this.onerror=null; this.src='${getRouletteDetailedAvatarURI(author)}';">
                </div>
                <div class="min-w-0">
                    <div class="font-display font-bold text-xs text-white truncate">${displayAuthorName}</div>
                    <div class="text-[10px] text-neon-light">${author.badgeIcon} ${author.role} • ${post.timestamp}</div>
                </div>
            `;

            document.getElementById('fullPostScrollBody').innerHTML = `
                <h2 class="font-display font-black text-base sm:text-lg text-white leading-snug">${post.title}</h2>
                <p class="text-xs sm:text-sm text-sky-100/95 leading-relaxed whitespace-pre-line">${post.body}</p>

                <div class="rounded-2xl overflow-hidden border border-white/20 bg-dc-950">
                    <img src="${imgSrc}" alt="${post.title}" class="w-full max-h-80 object-contain mx-auto"
                         onerror="this.onerror=null; this.src='${fallbackAvatar}';">
                </div>

                <div class="flex items-center justify-between py-2 border-y border-white/15">
                    <button onclick="togglePostLike('${post.id}', event)"
                            class="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-display font-bold text-xs ${
                                post.likedByMe ? 'bg-neon-pink text-white' : 'bg-white/10 text-sky-100'
                            }">
                        <span>${post.likedByMe ? '💖 Нравится' : '🤍 Лайк'} (${post.likes})</span>
                    </button>
                    <span class="text-xs font-display font-bold text-sky-200">💬 Комментарии (${comments.length})</span>
                </div>

                <div class="space-y-2">
                    ${comments.length === 0 ? `
                        <div class="p-3 rounded-xl bg-white/5 text-center text-xs text-sky-200/70">Напишите первый комментарий!</div>
                    ` : comments.map(c => `
                        <div class="p-2.5 rounded-xl bg-dc-900/90 border border-white/15 space-y-0.5">
                            <div class="flex items-center justify-between text-[10px]">
                                <span class="font-display font-bold text-neon-light">${c.author}</span>
                                <span class="text-sky-200/60">${c.time}</span>
                            </div>
                            <p class="text-xs text-white">${c.text}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        }
function closeFullPostModal() {
            state.activePostModalId = null;
            const modal = document.getElementById('fullPostModal');
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
function handleAddComment(event) {
            event.preventDefault();
            const input = document.getElementById('commentInputText');
            const text = input.value.trim();
            if (!text || !state.activePostModalId) return;

            const post = state.posts.find(p => p.id === state.activePostModalId);
            if (!post) return;
            if (!post.comments) post.comments = [];

            const now = new Date();
            const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const authorLabel = state.registeredUser
                ? `${state.registeredUser.name} (${state.registeredUser.role})`
                : 'Гость ДЦ-2026';

            post.comments.push({ id: 'c_' + Date.now(), author: authorLabel, text, time: timeStr });
            state.synergyPoints += 50;
            input.value = '';
            saveState();
            updateAllCountersUI();
            renderFullPostModalContent(post);
            renderNewsFeed();

            const scrollBody = document.getElementById('fullPostScrollBody');
            scrollBody.scrollTop = scrollBody.scrollHeight;
        }
const c2Count=()=>({ch:TEAM_MEMBERS.filter(m=>c2HasCh(m.id)).length,sk:Object.keys(c2.sk).filter(k=>c2N(c2.sk,k)>0).length});
function ccOpenAlbum(){const old=$('ccAlb');if(old)old.remove();const ov=document.createElement('div');ov.className='sx-ov';ov.id='ccAlb';ov.innerHTML=`<div class="pe-box" id="ccAlbBox">${ccAlbHTML()}</div>`;
 ov.addEventListener('click',e=>{if(e.target===ov)sxCloseOv(ov)});document.body.appendChild(ov);document.body.style.overflow='hidden'}
function ccAlbRender(){const b=$('ccAlbBox'),ov=$('ccAlb');if(!b)return;const y=ov.scrollTop;b.innerHTML=ccAlbHTML();ov.scrollTop=y}
function c2View(mid,sid){const base=sid==='base';if(base?!c2HasCh(mid):!c2HasSk(mid,sid))return;const m=ccMem(mid),s=base?null:c2Sk(sid),n=base?c2N(c2.ch,mid):c2N(c2.sk,mid+':'+sid);
 const ov=document.createElement('div');ov.className='cc-view';ov.innerHTML=`${c2Card(mid,sid)}<p><b style="color:#fff">${esc(base?m.name:c2Title(m,sid))}</b> · ${base?'персонаж':C2_R[s.r].n+' скин «'+s.n+'»'}<br>В альбоме: ${n}${n>1?` · повторку можно разобрать за ${shFmt(base?C2_CH_DUP:C2_R[s.r].dup)} Σ`:''}</p><button class="pe-btn" style="width:min(100%,300px)">Закрыть</button>`;
 const card=ov.querySelector('.cc');if(!sxStill()){ov.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(800px) rotateY(${x*18}deg) rotateX(${-y*18}deg) scale(1.02)`});ov.addEventListener('pointerleave',()=>card.style.transform='')}
 ov.addEventListener('click',e=>{if(!e.target.closest('.cc'))ov.remove()});document.body.appendChild(ov)}
const C2_TOTAL=TEAM_MEMBERS.length*(1+C2_SKINS.length);
const C2_CH_DUP=500;
let ccAlbHTML=function(){const n=c2Count(),have=n.ch+n.sk;let dupSum=0,dupN=0;
 Object.keys(c2.ch).forEach(m=>{const k=c2N(c2.ch,m);if(k>1){dupN+=k-1;dupSum+=(k-1)*C2_CH_DUP}});
 Object.keys(c2.sk).forEach(key=>{const k=c2N(c2.sk,key),s=c2Sk(key.split(':')[1]);if(k>1&&s){dupN+=k-1;dupSum+=(k-1)*C2_R[s.r].dup}});
 const F=ccAlbF,ok=(m,s)=>{const own=s==='base'?c2HasCh(m):c2HasSk(m,s);if(F==='all')return true;if(F==='have')return own;if(F==='miss')return!own;if(s==='base')return F==='ch';return c2Sk(s).r===F};
 const mems=TEAM_MEMBERS.map(m=>{const cells=['base',...C2_SKINS.map(s=>s.id)].filter(s=>ok(m.id,s));if(!cells.length)return'';const hasCh=c2HasCh(m.id),got=C2_SKINS.filter(s=>c2HasSk(m.id,s.id)).length;
  return`<div class="cc-mem"><div><span>${m.badgeIcon} ${esc(m.name)}</span><small>${hasCh?'✓':'—'} · скины ${got}/${C2_SKINS.length}</small></div><div class="cc-grid">${cells.map(s=>{const own=s==='base'?hasCh:c2HasSk(m.id,s);
   return c2Card(m.id,s,{lock:!own,count:true,note:!own&&s!=='base'&&!hasCh?'нужен персонаж':'',attrs:own?`onclick="c2View('${m.id}','${s}')"`:''})}).join('')}</div></div>`}).join('');
 const FL=[['all','Все'],['have','Есть'],['miss','Нет'],['ch','🧑 Персонажи'],['l','👑 Легенд.'],['m','💖 Миф.'],['e','💜 Эпич.'],['r','💙 Редкие']];
 return`<div class="sx-head"><h3>📒 Альбом карточек</h3><button class="sx-x" onclick="sxCloseOv($('ccAlb'))" aria-label="Закрыть">✕</button></div>
 <div class="cc-stat"><div><b>${n.ch}/${TEAM_MEMBERS.length}</b><small>персонажей</small></div><div><b>${n.sk}/${TEAM_MEMBERS.length*C2_SKINS.length}</b><small>скинов</small></div></div>
 <div class="cc-bar"><i style="width:${Math.round(have/C2_TOTAL*100)}%"></i></div>
 <div class="cc-odds">${['l','m','e','r'].map(k=>`<span>${C2_R[k].n} скин — ${C2_R[k].w}%</span>`).join('')}</div>
 ${dupN?`<button class="pe-btn" onclick="ccSellDups()">♻️ Разобрать повторки (${dupN}) · +${shFmt(dupSum)} Σ</button>`:''}
 <div class="cc-seg">${FL.map(([k,t])=>`<button class="${F===k?'on':''}" onclick="ccAlbF='${k}';ccAlbRender()">${t}</button>`).join('')}</div>${mems||'<p class="sx-note" style="text-align:center">Здесь пока пусто</p>'}`};
function pfCardKeys63(coll){const seen=new Set();return(Array.isArray(coll?.best)?coll.best:[]).slice(0,130).filter(k=>{if(typeof k!=='string'||seen.has(k))return false;const [m,s]=k.split(':');if(k!==m+':'+s||!TEAM_MEMBERS.some(x=>x.id===m)||!(s==='base'||c2Sk(s)))return false;seen.add(k);return true})}
function pfTab63(tab){const ov=$('spPfOv');if(!ov?.classList.contains('pf63'))return;ov.querySelectorAll('[data-pf-panel]').forEach(p=>p.hidden=p.dataset.pfPanel!==tab);ov.querySelectorAll('.pc-nav button').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.tab===tab)))}
function pfBigCard63(key){const ov=$('spPfOv');if(!ov?.cardKeys63?.includes(key))return;const [m,s]=key.split(':');const member=TEAM_MEMBERS.find(x=>x.id===m);caDialog61(s==='base'?'Карточка персонажа':c2Sk(s).name,`<div class="pf63-card-large">${c2Card(m,s,{fill:true})}</div><p class="ca-dialog-note">${esc(member.name)}</p>`)}
function pfMoreCards63(){const ov=$('spPfOv'),grid=ov?.querySelector('.pf63-gallery');if(!grid)return;const start=ov.cardPage63||0,keys=ov.cardKeys63.slice(start,start+12);grid.insertAdjacentHTML('beforeend',keys.map(k=>{const [m,s]=k.split(':');const member=TEAM_MEMBERS.find(x=>x.id===m);return `<button class="pf63-card" onclick="pfBigCard63('${k}')" aria-label="Открыть карточку ${esc(member.name)}">${c2Card(m,s,{fill:true})}<span class="pf63-cardlabel">${esc(s==='base'?member.name:c2Sk(s).name)}</span></button>`}).join(''));ov.cardPage63=start+keys.length;const more=ov.querySelector('#pfMore63');if(more)more.hidden=ov.cardPage63>=ov.cardKeys63.length}
let spOpenProfile=async function(w){if(!caReleased61())return pfLegacy63(w);if(!w)return;$('spPfOv')?.remove();const ov=document.createElement('div');ov.id='spPfOv';ov.className='sx-ov pf63';ov.setAttribute('role','dialog');ov.setAttribute('aria-modal','true');ov.setAttribute('aria-label','Профиль');ov.innerHTML='<div class="pe-box"><div class="sx-head"><h3>Профиль</h3><button class="sx-x" onclick="sxCloseOv($(\'spPfOv\'))" aria-label="Закрыть">×</button></div><div class="pf63-loading">Открываем профиль…</div></div>';document.body.appendChild(ov);document.body.style.overflow='hidden';ov.onclick=e=>{if(e.target===ov)sxCloseOv(ov)};const team=w.k==='m'?TEAM_MEMBERS.find(m=>m.id===w.id):null,me=w.k==='u'&&w.id===SXC.uid;let pl=null,loadFailed=false;
 if(w.k==='m'&&!team){sxCloseOv(ov);return}if(me){const u=state.registeredUser||{};pl={name:u.name,role:u.role,photo:u.photo,jackpots:state.jackpotsWon,spins:state.totalSpins,look:spLook(),coll:c3Coll()}}else if(w.k==='u'){pl=(typeof sxLB!=='undefined'?sxLB:[]).find(p=>p.id===w.id)||null;if(window.SXF)try{const s=await SXF.F.getDoc(txRef('players',w.id));if(s.exists())pl={id:w.id,...s.data()}}catch(e){loadFailed=true}}
 if(!ov.isConnected)return;const name=team?.name||pl?.name||w.name||'Игрок',role=team?`${team.badgeIcon||''} ${team.role} · Сумма Личностей`:pl?.role||w.role||'',look=spLookClean(pl?.look||w.look)||{};let photo=team?avatarSrc(team):pl?.photo||w.photo||sxAvaURI(name);if(!team&&!SP_IMG_RE.test(String(photo)))photo=sxAvaURI(name);const badge=look.b?spFind('b',look.b):null;let title='';if(me)title=pcSelected61();else if(Object.prototype.hasOwnProperty.call(look,'t'))title=look.t;else if(pl?.jackpots>=100)title='jackpot:'+Math.floor(pl.jackpots/100)*100;
 const coll=team?null:pl?.coll,posts=spPostsOf(w),likes=posts.reduce((n,p)=>n+(+p.likes||0),0),count=coll?Math.max(0,+coll.ch||0)+Math.max(0,+coll.sk||0):null,keys=team?[team.id+':base']:pfCardKeys63(coll);ov.cardKeys63=keys;ov.cardPage63=0;
 const postHTML=posts.length?posts.slice(0,30).map(p=>{const photo=spPostThumb(p);return `<button class="pf63-post" onclick="sxCloseOv($('spPfOv'));setTimeout(()=>openFullPostModal('${String(p.id).replace(/[^\w-]/g,'')}'),250)">${photo?`<img src="${esc(photo)}" alt="">`:''}<div><b>${esc(String(p.title||p.body||'Пост').slice(0,150))}</b><small>${esc(p.timestamp||'')} · ${shFmt(+p.likes||0)} лайков · ${(p.comments||[]).length} комментариев</small></div></button>`}).join(''):'<p class="pf63-note">Постов пока нет.</p>';
 const stats=[[posts.length,'постов'],[likes,'лайков'],[pl?shFmt(pl.jackpots||0):'—','джекпотов'],[pl?shFmt(pl.spins||0):'—','круток']];
 ov.querySelector('.pe-box').innerHTML=`<div class="sx-head"><h3>${me?'Мой профиль':'Профиль'}</h3><button class="sx-x" onclick="sxCloseOv($('spPfOv'))" aria-label="Закрыть">×</button></div><div class="pf63-hero"><div class="pf63-avatar ${look.f?'sp-f-'+look.f:''}"><img src="${esc(photo)}" alt=""></div><div class="pf63-identity"><div class="pf63-name"><b class="${look.c?'sp-c-'+look.c:''}">${esc(name)}</b>${badge?`<span class="pf63-badge" title="${esc(badge.name)}">${badge.ic}</span>`:''}</div><p class="pf63-role">${esc(role)}</p><div class="pf63-title">${pcBadge61(title)||(!team?'<span class="pf63-note">Без титула</span>':'')}</div></div></div><div class="pc-nav" role="tablist" aria-label="Разделы профиля">${[['about','Профиль'],['cards','Карточки'],['posts','Посты']].map(([id,t])=>`<button data-tab="${id}" role="tab" aria-selected="${id==='about'}" onclick="pfTab63('${id}')">${t}</button>`).join('')}</div><div class="pf63-panel" data-pf-panel="about"><div class="pf63-stats">${stats.map(([n,t])=>`<div><b>${n}</b><small>${t}</small></div>`).join('')}</div>${team?.slogan?`<div class="pf63-quote">${esc(team.slogan)}</div>`:''}<div class="pf63-section"><h4>${team?'Карточка участника':'Коллекция'}</h4><p class="pf63-note">${team?'Профиль участника команды. Его карточку можно получить в игре.':coll?`${Math.max(0,+coll.ch||0)} персонажей · ${Math.max(0,+coll.sk||0)} скинов${coll.x?' · особая карта X':''}`:loadFailed?'Не удалось загрузить коллекцию. Попробуйте открыть профиль позже.':'Игрок ещё не поделился коллекцией в новом обновлении.'}</p><button class="pe-btn" style="margin-top:13px" onclick="pfTab63('cards')">Посмотреть карточки${count!==null?' · '+count:''}</button></div><div class="pf63-actions">${team?`<button class="pe-btn main" onclick="sxCloseOv($('spPfOv'));setTimeout(()=>openStory(${TEAM_MEMBERS.indexOf(team)}),250)">Открыть историю</button>`:me?'<button class="pe-btn main" onclick="sxCloseOv($(\'spPfOv\'));setTimeout(openSettings,250)">Редактировать профиль</button>':w.k==='u'?`<button class="pe-btn main" onclick="sxCloseOv($('spPfOv'));setTimeout(()=>txOpen('${String(w.id).replace(/[^A-Za-z0-9_-]/g,'')}'),250)">Обмен и перевод Σ</button>`:''}</div>${team?'<p class="pf63-note">Титулы и игровая коллекция показываются в профиле аккаунта игрока.</p>':''}</div><div class="pf63-panel" data-pf-panel="cards" hidden><div class="pf63-section"><h4>${team?'Карточка участника':`Карточки${count!==null?' · '+count:''}`}</h4><p class="pf63-note" style="margin-bottom:15px">${team?'Это карточка персонажа команды, а не список личных покупок участника.':keys.length?'Нажми на карточку, чтобы рассмотреть её.':coll?'В коллекции пока нет карточек.':'Коллекция станет видна, когда игрок зайдёт в обновлённую версию.'}</p>${coll?.x?`<div style="max-width:150px;margin:0 auto 16px">${c3XCard(name,{fill:true})}</div>`:''}<div class="pf63-gallery"></div><button class="pe-btn" id="pfMore63" style="margin-top:14px" onclick="pfMoreCards63()">Показать ещё</button></div></div><div class="pf63-panel" data-pf-panel="posts" hidden><div class="pf63-section"><h4>Посты · ${posts.length}</h4><div class="pf63-posts">${postHTML}</div></div></div>`;pfMoreCards63()};
function pcBadge61(id){const t=pcTitle61(id);return t?`<span class="ca-title ${t.tone||''}">${t.icon} ${esc(t.name)}</span>`:''}
function profileShell69(ov){const box=ov?.querySelector('.pe-box');if(!box)return;let head=[...box.children].find(el=>el.classList.contains('sx-head'));if(!head)return;let body=[...box.children].find(el=>el.classList.contains('profile-scroll69'));if(!body){body=document.createElement('div');body.className='profile-scroll69';body.setAttribute('role','region');body.setAttribute('aria-label','Содержимое профиля');body.tabIndex=0}head.classList.add('profile-bar69');box.classList.add('profile-shell69');for(const el of [...box.children])if(el!==head&&el!==body)body.appendChild(el);box.insertBefore(head,box.firstChild);if(body.parentElement!==box)box.appendChild(body);ov.scrollTop=0}
