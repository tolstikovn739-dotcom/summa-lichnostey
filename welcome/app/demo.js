// Local data adapter for the real app renderers in native.js.
// No account storage, backend connections, purchasing or game actions.
const $=id=>document.getElementById(id);
const uid='showcase-local';
const SXC={uid,live:false};
const state={registeredUser:{name:'Гость Суммы',role:'Участник команды',photo:'../assets/brand.svg'},synergyPoints:0,jackpotsWon:0,totalSpins:0,activePostModalId:null,posts:[
 {id:'post_showcase_welcome',authorId:'znamenshikova',title:'Добро пожаловать в «Сумму Личностей»',body:'Люди, идеи и истории нашей команды. Знакомься с участниками, оставляй комментарии и собирай свою коллекцию.\n\n#СуммаЛичностей',timestamp:'Пример поста',likes:24,comments:[],media:['znamenshikova','reutskaya']},
 {id:'post_showcase_poll',authorId:'zverev',title:'Что посмотрим первым?',body:'Выбирай, что тебе интересно в приложении.',timestamp:'Пример опроса',likes:12,comments:[],poll:{options:[{t:'Карточки команды',v:8},{t:'Истории участников',v:5},{t:'Оформление профиля',v:4}]}}
]};
let feedTab='foryou',feedTag=null,xAnim=false,lastLiked=null,lastRt=null,ccAlbF='all';
const allKeys=TEAM_MEMBERS.flatMap(m=>[m.id+':base',...C2_SKINS.map(s=>m.id+':'+s.id)]);
const getMemberRealPhotoSrc=m=>m.img;
const avatarSrc=getMemberRealPhotoSrc;
const getRouletteDetailedAvatarURI=()=> '../assets/brand.svg';
const shFmt=n=>(+n||0).toLocaleString('ru-RU');
const sxStill=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const spLook=()=>({c:'gold',f:'gold',b:'gem',t:'rich'});
const spLookClean=look=>look||{};
const spFind=(kind,id)=>kind==='b'?{ic:'💎',name:'Алмаз'}:{name:id};
const spPostsOf=who=>who.k==='m'?state.posts.filter(p=>p.authorId===who.id):state.posts;
const spPostThumb=p=>p.customImage||(p.media?.[0]?getMemberRealPhotoSrc(TEAM_MEMBERS.find(m=>m.id===p.media[0])):null);
const SP_IMG_RE=/^(?:\.\.\/assets\/|data:image\/)/;
const sxAvaURI=()=> '../assets/brand.svg';
const c3Coll=()=>({ch:10,sk:120,x:false,best:allKeys});
const caReleased61=()=>true;
const pcSelected61=()=> 'rich';
const pcTitle61=id=>id==='rich'?{name:'Богач',icon:'💰',tone:'gold'}:null;
const updateAuthUI=()=>{};
const updateAllCountersUI=()=>{};
const saveState=()=>{};
function toast(message){const box=$('native-toast');box.textContent=message;box.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>box.hidden=true,2200);}
function sxCloseOv(ov){const id=ov?.id;if(ov)ov.remove();document.body.style.overflow='';if(['ccAlb','spPfOv'].includes(id)&&$('native-feed').hidden&&!$('ccAlb')&&!$('spPfOv'))demoShow('feed');}
function caDialog61(title,html){$('caDialog61')?.remove();const ov=document.createElement('div');ov.id='caDialog61';ov.className='ca-dialog';ov.innerHTML='<div class="ca-dialog-box"><div class="ca-dialog-head"><h3>'+esc(title)+'</h3><button class="sx-x" onclick="sxCloseOv($(\'caDialog61\'))" aria-label="Закрыть">×</button></div>'+html+'</div>';document.body.appendChild(ov);ov.addEventListener('click',e=>{if(e.target===ov)sxCloseOv(ov)});return ov;}
function sharePost(id,event){event?.stopPropagation();toast('Это демонстрационный пост. Общая лента не изменяется.');}
function openStory(index){const member=TEAM_MEMBERS[index];if(member)caDialog61(member.name,'<img class="native-story-photo" src="'+esc(member.img)+'" alt=""><p class="ca-dialog-note">'+esc(member.slogan)+'</p>');}

// Apply the same escaping used by the current app's post wrapper.
const sourcePostRenderer=renderFullPostModalContent;
renderFullPostModalContent=function(post){sourcePostRenderer({...post,title:esc(post.title),body:esc(post.body),comments:(post.comments||[]).map(c=>({...c,author:esc(c.author),text:esc(c.text),time:esc(c.time)}))});};
const sourceAlbum=ccAlbHTML;
ccAlbHTML=function(){const box=document.createElement('div');box.innerHTML=sourceAlbum();box.querySelector('.cc-odds')?.remove();box.querySelectorAll('[onclick*="ccSellDups"],[onclick*="c2Buy"],[onclick*="ccBuy"]').forEach(b=>b.remove());return box.innerHTML;};
function cleanProfile(){const ov=$('spPfOv');if(!ov)return;ov.querySelectorAll('.pf63-stats>div:nth-child(n+3),.pf63-actions').forEach(el=>el.remove());profileShell69(ov);}
const sourceProfile=spOpenProfile;
spOpenProfile=async function(w){await sourceProfile(w);cleanProfile();};
const sourceFeed=renderNewsFeed;
renderNewsFeed=function(){sourceFeed();document.querySelectorAll('#newsFeedContainer .xpost').forEach((article,index)=>{const post=state.posts[index];if(post)article.dataset.id=post.id;});};
document.addEventListener('click',event=>{const avatar=event.target.closest('.x-av,.x-head>b');if(!avatar)return;const article=avatar.closest('.xpost');const id=/openFullPostModal\('([^']+)'\)/.exec(article?.getAttribute('onclick')||'')?.[1];const post=state.posts.find(p=>p.id===id);if(post){event.preventDefault();event.stopPropagation();spOpenProfile({k:'m',id:post.authorId});} },true);

let activeNativeScreen='feed',screenRequest=0;
let cardObserver=null;
function watchVisibleCards(){
  cardObserver?.disconnect();
  const cards=[...document.querySelectorAll('#ccAlb .cc,.pf63-gallery .cc')];
  cards.forEach(card=>card.classList.add('native-asleep'));
  if('IntersectionObserver'in window&&!sxStill()){
    cardObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('native-asleep',!entry.isIntersecting)),{rootMargin:'60px',threshold:0});
    cards.forEach(card=>cardObserver.observe(card));
  }
}
const sourceAlbumRender=ccAlbRender;
ccAlbRender=function(){sourceAlbumRender();watchVisibleCards();};
async function demoShow(screen,fromParent=false){
  if(!['feed','cards','profile'].includes(screen))return;
  const request=++screenRequest;
  activeNativeScreen=screen;
  ['ccAlb','spPfOv','caDialog61'].forEach(id=>$(id)?.remove());
  document.querySelectorAll('.cc-view').forEach(el=>el.remove());
  closeFullPostModal();
  document.body.style.overflow='';
  $('native-feed').hidden=screen!=='feed';
  document.querySelectorAll('[data-native-screen]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.nativeScreen===screen)));
  if(screen==='feed')renderNewsFeed();
  if(screen==='cards')ccOpenAlbum();
  if(screen==='profile'){await spOpenProfile({k:'u',id:uid});if(request!==screenRequest)return;}
  watchVisibleCards();
  parent.postMessage({type:'summa:screen',screen,user:!fromParent},'*');
}
document.querySelectorAll('[data-native-screen]').forEach(button=>button.addEventListener('click',()=>demoShow(button.dataset.nativeScreen)));
window.addEventListener('message',event=>{if(event.source!==parent||event.data?.type!=='summa:show')return;if(['feed','cards','profile'].includes(event.data.screen))demoShow(event.data.screen,true);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){['caDialog61','spPfOv','ccAlb'].some(id=>{const ov=$(id);if(ov){sxCloseOv(ov);return true;}return false;});}});
demoShow('feed',true);
parent.postMessage({type:'summa:ready'},'*');
