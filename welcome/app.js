(function(){
  'use strict';
  const TEAM=[{"id":"tolstikov","name":"Толстиков Николай","shortName":"Николай Т.","role":"ЭКОНОМИКА","slogan":"Идеи • Планы • Результат. Экономический расчёт и ресурсы команды."},{"id":"reutskaya","name":"Реутская Екатерина","shortName":"Екатерина Р.","role":"УПРАВЛЕНИЕ","slogan":"Команда • Люди • Управление. Координация штаба и лидерство."},{"id":"smolyaninov","name":"Смольянинов Артем","shortName":"Артем С.","role":"Безопасность","slogan":"Надёжность, уверенность и защита интересов команды."},{"id":"varvarin","name":"Варварин Никита","shortName":"Никита В.","role":"Спорт","slogan":"Спортивный драйв, энергия движения и воля к победе."},{"id":"kozhenkov","name":"Коженков Арсений","shortName":"Арсений К.","role":"ПАТРИОТ","slogan":"Честь, дисциплина, выдержка и верность традициям."},{"id":"goncharova","name":"Гончарова Елизавета","shortName":"Елизавета Г.","role":"Медиа","slogan":"Стиль, кадры и главный медиа-голос «Суммы Личностей»."},{"id":"morozova","name":"Морозова Ульяна","shortName":"Ульяна М.","role":"Культура","slogan":"Творчество, эстетика и культурный код фестиваля."},{"id":"otyutskiy","name":"Отюцкий Евгений","shortName":"Евгений О.","role":"ПОЛИТИК","slogan":"Сила в команде! Большие цели начинаются с людей."},{"id":"zverev","name":"Зверев Никита","shortName":"Никита З.","role":"ПРОЕКТИРОВЩИК","slogan":"Превращаем смелые идеи в работающие проекты."},{"id":"znamenshikova","name":"Знаменщикова Кристина","shortName":"Кристина З.","role":"Журналист","slogan":"Острые репортажи, смыслы и летопись наших побед."}];
  const mainSite='https://tolstikovn739-dotcom.github.io/summa-lichnostey/';
  const $=(selector,root)=>(root||document).querySelector(selector);
  const $$=(selector,root)=>Array.from((root||document).querySelectorAll(selector));
  const motion=window.SummaMotion;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=window.matchMedia('(max-width: 900px)');
  const header=$('#site-header'),menu=$('#mobile-menu'),menuToggle=$('#menu-toggle');
  const frame=$('#native-app'),device=$('#app-device'),viewport=$('#device-viewport'),scene=$('#scene-pin'),track=$('#top');
  const featureTabs=$$('#feature-tabs [role=tab]');
  let activeScreen='feed',manualScreen=false,playing=false,appReady=false;
  frame.tabIndex=-1;
  const scenes={
    feed:{title:'БУДЬ В ЦЕНТРЕ<br>СОБЫТИЙ.',description:'Листай посты, ставь лайки, голосуй и оставляй комментарии. Так же, как в приложении.'},
    cards:{title:'ТВОИ ЛЮДИ.<br>ТВОЯ КОЛЛЕКЦИЯ.',description:'Настоящий альбом команды: персонажи, образы, фильтры и просмотр карточек. Нажми «Попробовать» и рассмотри их поближе.'},
    profile:{title:'У КАЖДОГО<br>СВОЙ ХАРАКТЕР.',description:'Титул, золотое имя, значок и коллекция — в настоящем профиле приложения. Переключай вкладки и смотри карточки и посты.'}
  };
  function setMenu(open){menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');header.classList.toggle('menu-open',open);}
  menuToggle.addEventListener('click',()=>setMenu(menu.hidden));
  $$('a',menu).forEach(link=>link.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!menu.hidden){setMenu(false);menuToggle.focus();}if(event.key==='Escape'&&playing)setPlaying(false);});
  document.addEventListener('click',event=>{if(!header.contains(event.target)&&!menu.hidden)setMenu(false);});
  function sendScreen(){if(appReady)frame.contentWindow?.postMessage({type:'summa:show',screen:activeScreen},location.origin);}
  function selectScreen(screen,manual,fromFrame){
    if(!scenes[screen])return;
    if(manual)manualScreen=true;
    const changed=activeScreen!==screen;
    activeScreen=screen;
    featureTabs.forEach(tab=>{const active=tab.dataset.screen===screen;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
    if(changed){$('#scene-heading').innerHTML=scenes[screen].title;$('#scene-description').textContent=scenes[screen].description;
      if(!reduceMotion.matches&&$('#scene-heading').animate)$('#scene-heading').animate([{opacity:.2,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:550,easing:'cubic-bezier(.22,1,.36,1)'});
    }
    if(!fromFrame&&(changed||manual))sendScreen();
  }
  featureTabs.forEach((tab,index)=>{
    tab.setAttribute('aria-controls','native-app');
    tab.addEventListener('click',()=>selectScreen(tab.dataset.screen,true));
    tab.addEventListener('keydown',event=>{
      let next=index;
      if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%3;
      else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(index+2)%3;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=2;
      else return;
      event.preventDefault();selectScreen(featureTabs[next].dataset.screen,true);featureTabs[next].focus();
    });
  });
  function setPlaying(active){frame.tabIndex=active?0:-1;playing=active;device.classList.toggle('is-playing',active);$('#stop-app').hidden=!active;manualScreen=active;if(!active)requestScrollFrame();}
  $('#try-app').addEventListener('click',()=>setPlaying(true));
  $('#stop-app').addEventListener('click',()=>{setPlaying(false);$('#try-app').focus({preventScroll:true});});
  frame.addEventListener('load',()=>{if(!appReady){appReady=true;sendScreen();}});
  window.addEventListener('message',event=>{
    if(event.source!==frame.contentWindow||event.origin!==location.origin)return;
    if(event.data?.type==='summa:ready'){appReady=true;sendScreen();}
    if(event.data?.type==='summa:screen'&&scenes[event.data.screen])selectScreen(event.data.screen,event.data.user===true,true);
  });

  const fan=$('#card-fan');
  $$('.skin-selector button[data-skin]').forEach(function(button){
    button.addEventListener('click',function(){
      $$('.skin-selector button').forEach(function(item){const on=item===button;item.classList.toggle('active',on);item.setAttribute('aria-pressed',String(on));});
      fan.dataset.style=button.dataset.skin;
      $$('.collectible',fan).forEach(function(card){card.dataset.skin=button.dataset.skin;card.innerHTML=window.SummaCards.render(card.dataset.member,button.dataset.skin,{fill:true});});
    });
  });

  function safe(value){return String(value).replace(/[&<>"']/g,function(char){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char];});}
  function cardMarkup(member,skin){return '<div class="collectible native-card">'+window.SummaCards.render(member.id,skin||'classic',{fill:true})+'</div>';}
  const dialog=$('#detail-dialog');
  function closeDetail(){dialog.close();}
  function openDetail(memberId,kind,skin){
    const member=TEAM.find(function(person){return person.id===memberId;});
    if(!member)return;
    manualScreen=true;
    const isCard=kind==='card';
    $('#detail-title').textContent=isCard?'Карточка команды':'Личность в Сумме';
    const skinName={classic:'Классика',neon:'Неон',gold:'Золото'}[skin]||'Классика';
    const content=isCard?'<div class="modal-card-view">'+cardMarkup(member,skin||'classic')+'</div><p class="modal-description"><b>'+safe(member.name)+'</b><br>Образ «'+safe(skinName)+'»</p>':'<div class="modal-profile"><img class="modal-portrait" src="./assets/'+safe(member.id)+'.webp" width="170" height="230" alt="'+safe(member.name)+'"><div><p class="modal-member-role">'+safe(member.role)+'</p><h3 class="modal-member-name">'+safe(member.name)+'</h3><p class="modal-member-slogan">'+safe(member.slogan)+'</p></div></div>';
    $('#detail-content').innerHTML=content+'<div class="modal-action"><a class="button button-primary" href="'+mainSite+'">'+(isCard?'Открыть коллекцию на сайте':'Познакомиться с командой')+'</a></div>';
    dialog.showModal();
    document.body.classList.add('modal-open');
    $('#close-detail').focus({preventScroll:true});
  }
  document.addEventListener('click',function(event){
    const card=event.target.closest('button[data-member]');
    if(card)openDetail(card.dataset.member,card.dataset.kind,card.dataset.skin||'classic');
  });
  $('#close-detail').addEventListener('click',closeDetail);
  dialog.addEventListener('close',function(){document.body.classList.remove('modal-open');});
  dialog.addEventListener('click',function(event){
    if(event.target!==dialog)return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDetail();
  });

  const trade=$('#trade-demo');
  const tradeYou=$('#trade-place-you');
  const tradeThem=$('#trade-place-them');
  const originalYou=tradeYou.firstElementChild;
  const originalThem=tradeThem.firstElementChild;
  const confirmButtons=$$('[data-confirm]');
  const tradeStatus=$('#trade-status');
  let exchange=motion.initialExchange();
  let exchanging=false;
  function paintExchange(){
    confirmButtons.forEach(function(button){
      const active=exchange[button.dataset.confirm];
      button.setAttribute('aria-pressed',String(active));
      $('span',button).textContent=active?'Готово':button.dataset.confirm==='you'?'Подтвердить':'Другой игрок';
      button.disabled=exchange.complete;
    });
  }
  async function showExchange(){
    exchanging=true;
    tradeStatus.textContent='Оба согласны. Карточки переходят новым владельцам…';
    const beforeYou=originalYou.getBoundingClientRect();
    const beforeThem=originalThem.getBoundingClientRect();
    tradeYou.replaceChildren(originalThem);
    tradeThem.replaceChildren(originalYou);
    const afterYou=originalYou.getBoundingClientRect();
    const afterThem=originalThem.getBoundingClientRect();
    if(!reduceMotion.matches&&originalYou.animate){
      function fly(card,before,after,angle){
        const x=before.left-after.left,y=before.top-after.top;
        return card.animate([{transform:'translate('+x+'px,'+y+'px) rotate(0deg)'},{transform:'translate('+(x*.5)+'px,'+(y-20)+'px) rotate('+angle+'deg)',offset:.48},{transform:'translate(0,0) rotate(0deg)'}],{duration:950,easing:'cubic-bezier(.45,0,.15,1)',fill:'none'}).finished;
      }
      await Promise.allSettled([fly(originalYou,beforeYou,afterYou,7),fly(originalThem,beforeThem,afterThem,-7)]);
    }
    trade.classList.add('is-complete');
    $$('.trade-person',trade)[0].textContent='Теперь у тебя';
    $$('.trade-person',trade)[1].textContent='У другого игрока';
    tradeStatus.textContent='Обмен согласован. Оба получили свою карточку.';
    $('#reset-trade').hidden=false;
    exchanging=false;
  }
  confirmButtons.forEach(function(button){
    button.addEventListener('click',function(){
      if(exchanging||exchange.complete)return;
      exchange=motion.confirmExchange(exchange,button.dataset.confirm);
      paintExchange();
      if(exchange.complete)showExchange();
      else if(exchange.you)tradeStatus.textContent='Ты подтвердил. Нужно согласие другого игрока.';
      else if(exchange.them)tradeStatus.textContent='Другой игрок согласен. Теперь твоя очередь.';
      else tradeStatus.textContent='Попробуй подтвердить с обеих сторон.';
    });
  });
  $('#reset-trade').addEventListener('click',function(){
    if(exchanging)return;
    exchange=motion.initialExchange();
    tradeYou.replaceChildren(originalYou);
    tradeThem.replaceChildren(originalThem);
    trade.classList.remove('is-complete');
    $$('.trade-person',trade)[0].textContent='Ты отдаёшь';
    $$('.trade-person',trade)[1].textContent='Ты получаешь';
    tradeStatus.textContent='Попробуй подтвердить с обеих сторон.';
    $('#reset-trade').hidden=true;
    paintExchange();
    confirmButtons[0].focus({preventScroll:true});
  });

  const people=$('#people-strip');
  function updateCarousel(){
    if(!people.clientWidth)return;
    $('#people-prev').disabled=people.scrollLeft<=2;
    $('#people-next').disabled=people.scrollLeft+people.clientWidth>=people.scrollWidth-2;
  }
  function scrollPeople(direction){people.scrollBy({left:direction*(people.clientWidth*.7),behavior:reduceMotion.matches?'instant':'smooth'});}
  $('#people-prev').addEventListener('click',function(){scrollPeople(-1);});
  $('#people-next').addEventListener('click',function(){scrollPeople(1);});
  people.addEventListener('scroll',updateCarousel,{passive:true});
  window.addEventListener('resize',updateCarousel,{passive:true});
  requestAnimationFrame(updateCarousel);




  let framePending=false;
  function fitApp(){
    const width=viewport.clientWidth,height=viewport.clientHeight;
    if(!width||!height)return;
    const scale=width/390;
    frame.style.width='390px';frame.style.height=Math.ceil(height/scale)+'px';
    frame.style.setProperty('--app-scale',scale.toFixed(5));
  }
  function updateScroll(){
    framePending=false;
    header.classList.toggle('is-scrolled',window.scrollY>16);
    if(document.hidden)return;
    const height=scene.clientHeight||window.innerHeight;
    const width=window.innerWidth;
    const rect=track.getBoundingClientRect();
    const progress=motion.clamp(-rect.top/Math.max(1,rect.height-height),0,1);
    if(rect.bottom<0||rect.top>height){if(!playing)manualScreen=false;return;}
    const pose=motion.scenePose(progress,reduceMotion.matches);
    const headerBottom=header.getBoundingClientRect().bottom;
    const targetTop=headerBottom+(mobile.matches?12:18);
    const travel=Math.max(0,height-48-targetTop);
    scene.style.setProperty('--scene-progress',progress.toFixed(4));
    scene.style.setProperty('--title-opacity',pose.title.toFixed(4));
    scene.style.setProperty('--title-lift',(pose.enter*66).toFixed(2)+'px');
    scene.style.setProperty('--title-scale',reduceMotion.matches?'1':(1-pose.enter*.06).toFixed(4));
    scene.style.setProperty('--detail-opacity',pose.detail.toFixed(4));
    scene.style.setProperty('--device-lift',(-travel*pose.enter).toFixed(2)+'px');
    scene.style.setProperty('--device-tilt',pose.tilt.toFixed(2)+'deg');
    scene.style.setProperty('--device-roll',pose.roll.toFixed(2)+'deg');
    scene.style.setProperty('--device-scale',pose.scale.toFixed(4));
    scene.style.setProperty('--device-drift',(mobile.matches?0:Math.min(width*.17,270)*pose.enter).toFixed(2)+'px');
    scene.classList.toggle('is-revealed',pose.detail>.85);device.inert=pose.detail<=.85;
    if((progress<.02||progress>.99)&&!playing)manualScreen=false;
    if(!manualScreen&&!playing)selectScreen(motion.screenForScene(progress),false);
    // Freeze focus in an active demo; the page never captures wheel/touch scrolling.
  }
  function requestScrollFrame(){if(!framePending){framePending=true;requestAnimationFrame(updateScroll);}}
  function resizeScene(){if(!mobile.matches)setMenu(false);fitApp();requestScrollFrame();}
  window.addEventListener('scroll',requestScrollFrame,{passive:true});
  window.addEventListener('resize',resizeScene,{passive:true});
  document.addEventListener('visibilitychange',requestScrollFrame);
  mobile.addEventListener('change',resizeScene);
  reduceMotion.addEventListener('change',requestScrollFrame);
  if('ResizeObserver'in window){const observer=new ResizeObserver(fitApp);observer.observe(viewport);}
  if('IntersectionObserver'in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -16px 0px'});
    $$('.reveal').forEach(element=>observer.observe(element));document.documentElement.classList.add('js');
  }
  resizeScene();
})();
