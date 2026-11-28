(function(){
  'use strict';
  const TEAM=[{"id":"tolstikov","name":"Толстиков Николай","shortName":"Николай Т.","role":"ЭКОНОМИКА","slogan":"Идеи • Планы • Результат. Экономический расчёт и ресурсы команды."},{"id":"reutskaya","name":"Реутская Екатерина","shortName":"Екатерина Р.","role":"УПРАВЛЕНИЕ","slogan":"Команда • Люди • Управление. Координация штаба и лидерство."},{"id":"smolyaninov","name":"Смольянинов Артем","shortName":"Артем С.","role":"Безопасность","slogan":"Надёжность, уверенность и защита интересов команды."},{"id":"varvarin","name":"Варварин Никита","shortName":"Никита В.","role":"Спорт","slogan":"Спортивный драйв, энергия движения и воля к победе."},{"id":"kozhenkov","name":"Коженков Арсений","shortName":"Арсений К.","role":"ПАТРИОТ","slogan":"Честь, дисциплина, выдержка и верность традициям."},{"id":"goncharova","name":"Гончарова Елизавета","shortName":"Елизавета Г.","role":"Медиа","slogan":"Стиль, кадры и главный медиа-голос «Суммы Личностей»."},{"id":"morozova","name":"Морозова Ульяна","shortName":"Ульяна М.","role":"Культура","slogan":"Творчество, эстетика и культурный код фестиваля."},{"id":"otyutskiy","name":"Отюцкий Евгений","shortName":"Евгений О.","role":"ПОЛИТИК","slogan":"Сила в команде! Большие цели начинаются с людей."},{"id":"zverev","name":"Зверев Никита","shortName":"Никита З.","role":"ПРОЕКТИРОВЩИК","slogan":"Превращаем смелые идеи в работающие проекты."},{"id":"znamenshikova","name":"Знаменщикова Кристина","shortName":"Кристина З.","role":"Журналист","slogan":"Острые репортажи, смыслы и летопись наших побед."}];
  const mainSite='https://tolstikovn739-dotcom.github.io/summa-lichnostey/';
  const $=function(selector,root){return (root||document).querySelector(selector);};
  const $$=function(selector,root){return Array.from((root||document).querySelectorAll(selector));};
  const motion=window.SummaMotion;
  const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobile=window.matchMedia('(max-width: 900px)');
  const finePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
  const header=$('#site-header');
  const menu=$('#mobile-menu');
  const menuToggle=$('#menu-toggle');

  function setMenu(open){
    menu.hidden=!open;
    menuToggle.setAttribute('aria-expanded',String(open));
    menuToggle.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');
    header.classList.toggle('menu-open',open);
  }
  menuToggle.addEventListener('click',function(){setMenu(menu.hidden);});
  $$('a',menu).forEach(function(link){link.addEventListener('click',function(){setMenu(false);});});
  document.addEventListener('keydown',function(event){
    if(event.key==='Escape'&&!menu.hidden){setMenu(false);menuToggle.focus();}
  });
  document.addEventListener('click',function(event){if(!header.contains(event.target)&&!menu.hidden)setMenu(false);});

  const featureTabs=$$('#feature-tabs [role=tab]');
  const panels=$$('.demo-panel');
  let activeScreen='feed';
  let manualScreen=false;
  const captions={feed:'Всё, что важно для твоего круга',cards:'Личности, которые всегда рядом',profile:'Твой профиль. Твой характер.'};
  $('.demo-area').addEventListener('focusin',function(){manualScreen=true;});
  function selectScreen(screen,manual){
    if(!captions[screen])return;
    if(manual)manualScreen=true;
    if(activeScreen===screen)return;
    activeScreen=screen;
    featureTabs.forEach(function(tab){
      const active=tab.dataset.screen===screen;
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex=active?0:-1;
    });
    panels.forEach(function(panel){
      const active=panel.id==='panel-'+screen;
      panel.classList.toggle('is-active',active);
      panel.setAttribute('aria-hidden',String(!active));
      panel.inert=!active;
    });
    $('#screen-caption').textContent=captions[screen];
  }
  featureTabs.forEach(function(tab,index){
    tab.addEventListener('click',function(){selectScreen(tab.dataset.screen,true);});
    tab.addEventListener('keydown',function(event){
      let next=index;
      if(['ArrowRight','ArrowDown'].includes(event.key))next=(index+1)%featureTabs.length;
      else if(['ArrowLeft','ArrowUp'].includes(event.key))next=(index+featureTabs.length-1)%featureTabs.length;
      else if(event.key==='Home')next=0;
      else if(event.key==='End')next=featureTabs.length-1;
      else return;
      event.preventDefault();
      selectScreen(featureTabs[next].dataset.screen,true);
      featureTabs[next].focus();
    });
  });
  function setTabOrientation(){
    $('#feature-tabs').setAttribute('aria-orientation',mobile.matches?'horizontal':'vertical');
    if(!mobile.matches)setMenu(false);
    requestScrollFrame();
  }
  mobile.addEventListener('change',setTabOrientation);

  const like=$('.like-button');
  like.addEventListener('click',function(){
    const active=like.getAttribute('aria-pressed')!=='true';
    like.setAttribute('aria-pressed',String(active));
    $('.like-count',like).textContent=active?'25':'24';
    manualScreen=true;
  });
  $$('[data-feed-filter]').forEach(function(button){
    button.addEventListener('click',function(){
      $$('[data-feed-filter]').forEach(function(filter){const on=filter===button;filter.classList.toggle('active',on);filter.setAttribute('aria-pressed',String(on));});
      $('#text-post').hidden=button.dataset.feedFilter==='photos';
      manualScreen=true;
    });
  });
  $('#gold-toggle').addEventListener('click',function(event){
    const button=event.currentTarget;
    const active=button.getAttribute('aria-pressed')!=='true';
    button.setAttribute('aria-pressed',String(active));
    $('#demo-profile-name').classList.toggle('gold-name',active);
    manualScreen=true;
  });
  $('#title-toggle').addEventListener('click',function(event){
    const button=event.currentTarget;
    const active=button.getAttribute('aria-pressed')!=='true';
    button.setAttribute('aria-pressed',String(active));
    $('#demo-title').hidden=!active;
    $('#demo-no-title').hidden=active;
    button.textContent=active?'Снять':'Надеть';
    manualScreen=true;
  });

  const fan=$('#card-fan');
  $$('.skin-selector button[data-skin]').forEach(function(button){
    button.addEventListener('click',function(){
      $$('.skin-selector button').forEach(function(item){const on=item===button;item.classList.toggle('active',on);item.setAttribute('aria-pressed',String(on));});
      fan.dataset.style=button.dataset.skin;
      $$('.collectible',fan).forEach(function(card){card.dataset.skin=button.dataset.skin;});
    });
  });

  function safe(value){return String(value).replace(/[&<>"']/g,function(char){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char];});}
  function cardMarkup(member,skin){
    const firstName=member.name.split(' ').slice(1).join(' ');
    return '<div class="collectible" data-skin="'+safe(skin)+'"><img src="./assets/'+safe(member.id)+'.webp" width="300" height="410" alt="'+safe(member.name)+'"><span class="card-sigma">Σ</span><span class="card-star">✦</span><span class="card-content"><b>'+safe(firstName)+'</b><small>'+safe(member.role)+'</small></span></div>';
  }
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
  const heroStage=$('#hero-stage');
  const inside=$('#inside');
  let pointerX=0;
  function updateScroll(){
    framePending=false;
    header.classList.toggle('is-scrolled',window.scrollY>16);
    if(document.hidden||reduceMotion.matches)return;
    const height=window.innerHeight;
    const heroRect=heroStage.getBoundingClientRect();
    if(heroRect.bottom>0&&heroRect.top<height){
      heroStage.style.setProperty('--hero-p',motion.clamp((height-heroRect.top)/(height+heroRect.height),0,1).toFixed(3));
      heroStage.style.setProperty('--pointer-x',pointerX.toFixed(3));
    }
    if(!mobile.matches&&height>760){
      const rect=inside.getBoundingClientRect();
      const progress=motion.clamp((82-rect.top)/Math.max(1,rect.height-height+82),0,1);
      if(progress===0||progress===1)manualScreen=false;
      if(!manualScreen&&rect.top<height&&rect.bottom>82)selectScreen(motion.screenForProgress(progress),false);
    }
  }
  function requestScrollFrame(){if(!framePending){framePending=true;requestAnimationFrame(updateScroll);}}
  window.addEventListener('scroll',requestScrollFrame,{passive:true});
  window.addEventListener('resize',requestScrollFrame,{passive:true});
  document.addEventListener('visibilitychange',requestScrollFrame);
  reduceMotion.addEventListener('change',requestScrollFrame);
  heroStage.addEventListener('pointermove',function(event){
    if(!finePointer.matches||reduceMotion.matches)return;
    const rect=heroStage.getBoundingClientRect();
    pointerX=motion.clamp((event.clientX-rect.left)/rect.width*2-1,-1,1);
    requestScrollFrame();
  },{passive:true});
  heroStage.addEventListener('pointerleave',function(){pointerX=0;requestScrollFrame();});

  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:.08,rootMargin:'0px 0px -16px 0px'});
    $$('.reveal').forEach(function(element){observer.observe(element);});
    document.documentElement.classList.add('js');
    const marqueeObserver=new IntersectionObserver(function(entries){$('.running-track').style.animationPlayState=entries[0].isIntersecting?'running':'paused';});
    marqueeObserver.observe($('.running-line'));
  }
  setTabOrientation();
  requestScrollFrame();
})();
