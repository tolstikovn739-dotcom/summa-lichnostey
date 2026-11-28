(function(root){
  'use strict';
  function clamp(value,min,max){return Math.min(max,Math.max(min,value));}
  function screenForProgress(progress){return ['feed','cards','profile'][Math.min(2,Math.floor(clamp(progress,0,1)*3))];}
  function initialExchange(){return {you:false,them:false,complete:false};}
  function confirmExchange(state,side){
    if(state.complete||!['you','them'].includes(side))return state;
    const next={you:state.you,them:state.them,complete:false};
    next[side]=!next[side];
    next.complete=next.you&&next.them;
    return next;
  }
  const api={clamp,screenForProgress,initialExchange,confirmExchange};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else root.SummaMotion=api;
})(typeof window!=='undefined'?window:globalThis);
