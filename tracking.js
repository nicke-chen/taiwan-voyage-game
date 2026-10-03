(()=>{
const cfg=window.TAIWAN_GAME_TRACKING||{};if(cfg.enabled===false)return;
const $=id=>document.getElementById(id),now=()=>Date.now();
let session=null,current=null,logs=[],startedAt=0,lastFeedback='';
function uid(){return 'S-'+new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,14)+'-'+Math.random().toString(36).slice(2,8)}
function mode(){const b=document.querySelector('.mode.active');return b?b.dataset.mode:'unknown'}
function student(){return{name:($('studentName')?.value||'').trim(),className:($('studentClass')?.value||'').trim(),seatNo:($('studentNo')?.value||'').trim()}}
function start(){session=uid();startedAt=now();logs=[];current=null;lastFeedback='';}
function snapshotQuestion(){const title=$('qtitle')?.textContent?.trim()||'';if(!title)return null;return{title,chapter:$('chapter')?.textContent?.trim()||'',type:$('typePill')?.textContent?.trim()||'',level:$('levelPill')?.textContent?.trim()||'',attempts:0,hintUsed:false,correct:false,startedAt:now()}}
function ensureCurrent(){const s=snapshotQuestion();if(!s)return; if(!current||current.title!==s.title){if(current)finishCurrent();current=s;lastFeedback='';}}
function finishCurrent(){if(!current)return;current.durationSec=Math.max(0,Math.round((now()-current.startedAt)/1000));logs.push(current);current=null;}
function parseResult(){const summary=$('summary')?.textContent||'';const nums=summary.match(/總分\s*(\d+)\/(\d+)/);return{score:nums?+nums[1]:null,maxScore:nums?+nums[2]:null,accuracy:$('accuracy')?.textContent||'',firstCorrect:$('firstReport')?.textContent||'',wrongCount:$('wrongReport')?.textContent||''}}
async function submit(){finishCurrent();const payload={version:1,sessionId:session||uid(),submittedAt:new Date().toISOString(),course:cfg.course||'',unit:cfg.unit||'',mode:mode(),student:student(),durationSec:startedAt?Math.round((now()-startedAt)/1000):0,result:parseResult(),questions:logs,userAgent:navigator.userAgent};
localStorage.setItem('taiwan-voyage-last-result',JSON.stringify(payload));
const status=document.getElementById('trackingStatus')||(()=>{const d=document.createElement('div');d.id='trackingStatus';d.className='reviewItem';d.style.marginTop='12px';const result=document.getElementById('result');result?.appendChild(d);return d})();
if(!cfg.endpoint){if(status)status.innerHTML='📌 學習紀錄已暫存在這台裝置。教師端尚未設定 Google Sheet 接收網址。';return;}
try{await fetch(cfg.endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),keepalive:true});if(status)status.innerHTML='✅ 學習紀錄已送出至教師端 Google Sheet。';}catch(e){if(status)status.innerHTML='⚠️ 目前無法送出，紀錄已暫存在本機；恢復網路後可再測試。';}
}
document.addEventListener('click',e=>{if(e.target.closest('#startBtn'))setTimeout(start,0);if(e.target.closest('#hintBtn')){ensureCurrent();if(current)current.hintUsed=true;}const ans=e.target.closest('.choice,.seqBtn,.dragItem,.dropZone,.mapPoint,.mapChoice,.btn.primary');if(ans&&document.getElementById('game')&&!document.getElementById('game').classList.contains('hidden')){ensureCurrent();if(current)current.attempts=Math.max(1,current.attempts+1);}});
const qObs=new MutationObserver(()=>ensureCurrent());const qt=$('qtitle');if(qt)qObs.observe(qt,{childList:true,subtree:true,characterData:true});
const fObs=new MutationObserver(()=>{ensureCurrent();const txt=$('feedback')?.textContent?.trim()||'';if(!txt||txt===lastFeedback)return;lastFeedback=txt;if(current){if(txt.startsWith('❌'))current.correct=false;if(txt.startsWith('✅')||txt.startsWith('🏆'))current.correct=true;}});const fb=$('feedback');if(fb)fObs.observe(fb,{childList:true,subtree:true,characterData:true});
const rObs=new MutationObserver(()=>{const r=$('result');if(r&&r.classList.contains('show'))setTimeout(submit,150);});const r=$('result');if(r)rObs.observe(r,{attributes:true,attributeFilter:['class']});
})();
