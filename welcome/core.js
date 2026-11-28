(function(root){
  'use strict';
  function clamp(value,min,max){return Math.min(max,Math.max(min,value));}
  function screenForProgress(progress){return ['feed','cards','profile'][Math.min(2,Math.floor(clamp(progress,0,1)*3))];}
  function screenForScene(progress){return progress<.61?'feed':progress<.83?'cards':'profile';}
  function scenePose(progress,reduced){
    const x=clamp((progress-.015)/.32,0,1),enter=x*x*(3-2*x);
    return {enter,title:1-clamp(progress/.23,0,1),detail:clamp((progress-.26)/.09,0,1),tilt:reduced?0:(1-enter)*15,roll:reduced?0:(1-enter)*-4,scale:reduced?1:.86+enter*.14};
  }
  function initialExchange(){return {you:false,them:false,complete:false};}
  function confirmExchange(state,side){
    if(state.complete||!['you','them'].includes(side))return state;
    const next={you:state.you,them:state.them,complete:false};
    next[side]=!next[side];
    next.complete=next.you&&next.them;
    return next;
  }
  const api={clamp,screenForProgress,screenForScene,scenePose,initialExchange,confirmExchange};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.SummaMotion=api;
})(typeof window!=='undefined'?window:globalThis);
