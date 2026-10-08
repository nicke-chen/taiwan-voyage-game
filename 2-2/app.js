const $=id=>document.getElementById(id);let selectedMode='learn',queue=[],pos=0,baseCount=0,score=0,first=0,wrongIds=new Set(),retryIds=[],testAnswers={},tapPayload=null;const modeNames={learn:'學習模式',practice:'練習模式',test:'測驗模式',full:'48題全題庫'};
function shuffled(a){
  const out=[...a];
  for(let i=out.length-1;i>0;i--){
    const j=Math.floor(Math.random()*(i+1));
    [out[i],out[j]]=[out[j],out[i]];
  }
  return out;
}
function randomizeQuestion(src){
  const q={...src};
  if((q.type==='single'||q.type==='multi')&&Array.isArray(src.o)){
    const entries=shuffled(src.o.map((opt,oldIndex)=>({opt,oldIndex})));
    q.o=entries.map(x=>x.opt);
    if(q.type==='single'){
      q.a=entries.findIndex(x=>x.oldIndex===src.a);
    }else{
      const correct=new Set(src.a);
      q.a=entries.map((x,newIndex)=>correct.has(x.oldIndex)?newIndex:null).filter(x=>x!==null);
    }
  }
  if(q.type==='match'&&Array.isArray(src.pairs)){
    q.pairs=shuffled(src.pairs.map(p=>[...p]));
    q.opts=[...(src.opts||[])];
  }
  if(q.type==='sequence'&&Array.isArray(src.items)){
    q.items=src.items.map(x=>[...x]);
    q.order=[...src.order];
  }
  return q;
}
function buildQueue(){
  if(selectedMode==='full')return shuffled(bank).map(randomizeQuestion);
  if(selectedMode==='learn'){
    const b=shuffled(bank.filter(x=>x.l==='基礎')).slice(0,14);
    const a=shuffled(bank.filter(x=>x.l==='進階')).slice(0,7);
    const boss=shuffled(bank.filter(x=>x.l==='Boss')).slice(0,3);
    return shuffled([...b,...a,...boss]).map(randomizeQuestion);
  }
  return shuffled(bank).slice(0,24).map(randomizeQuestion);
}
function shownType(q){if(q.type==='match')return'拖曳配對題';if(q.type==='sequence')return'拖曳排序題';if(q.type==='multi')return'複選題';return'單選題'}
function sceneFor(q){if(q.c.startsWith('A'))return['⛪ 🐂 🔤','西方文化與足跡','宗教、語言、動植物與地名'];if(q.c.startsWith('B'))return['🌾 ⛵ 🏫','鄭氏政權的改變','農業、海上貿易、教育與軍隊地名'];if(q.c.startsWith('C'))return['👨‍👩‍👧‍👦 🏮 🛕','漢人習俗與信仰','人口移入、習俗、信仰與漢人社會發展'];return['🧭 🗺️ ⚓','大航海時代影響總整合','把人物、制度、文化與地名串起來']}
document.querySelectorAll('.mode').forEach(b=>b.onclick=()=>{document.querySelectorAll('.mode').forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedMode=b.dataset.mode});
$('startBtn').onclick=()=>{queue=buildQueue();baseCount=queue.length;pos=score=first=0;wrongIds=new Set();retryIds=[];testAnswers={};$('modePanel').classList.add('hidden');$('game').classList.remove('hidden');$('result').classList.remove('show');render()};
function renderVisual(q){let [em,title,desc]=sceneFor(q);$('visual').innerHTML=`<div><div class="sceneEmoji">${em}</div><h3>${title}</h3><p>${desc}</p></div>`}
function render(){if(pos>=queue.length){if(selectedMode!=='test'&&retryIds.length){let ids=[...new Set(retryIds)];retryIds=[];let retry=ids.map(id=>({...randomizeQuestion(bank.find(x=>x.id===id)),_retry:true}));if(retry.length){queue.push(...retry);render();return}}finish();return}let q=queue[pos];$('chapter').textContent=q.c;$('qtitle').textContent=`第 ${pos+1} 題｜${q.t}${q._retry?'（錯題再練）':''}`;$('qtext').textContent=q.q;$('levelPill').textContent=q._retry?'錯題複習':q.l;$('levelPill').className='pill '+(q.l==='進階'?'advanced':q.l==='Boss'?'boss':'');$('typePill').textContent=shownType(q);$('stageStat').textContent=`${pos+1}/${queue.length}`;$('scoreStat').textContent=score;$('firstStat').textContent=first;$('bar').style.width=`${Math.min(100,pos/queue.length*100)}%`;$('feedback').textContent='';$('hintbox').textContent=q.h;$('hintbox').classList.remove('show');$('hintBtn').disabled=false;$('hintBtn').classList.toggle('hidden',selectedMode==='test');$('nextBtn').classList.add('hidden');$('nextBtn').textContent=pos===queue.length-1?'查看結果 →':'下一題 →';renderVisual(q);renderAnswer(q)}
function renderAnswer(q){let a=$('answerArea');a.innerHTML='';({single:renderSingle,multi:renderMulti,match:renderDragMatch,sequence:renderDragSequence}[q.type]||renderSingle)(q,a)}
function markResult(q,correct,tries=1){if(selectedMode==='test'){$('nextBtn').classList.remove('hidden');return}if(correct){if(q._retry){$('feedback').textContent=`✅ 已重新答對：${q.ok}`;}else{let pts=tries===1?5:3;score+=pts;if(tries===1)first++;$('feedback').textContent=`✅ ${q.ok}（+${pts}分）`}$('nextBtn').classList.remove('hidden');$('hintBtn').disabled=true}else{wrongIds.add(q.id);if(!q._retry)retryIds.push(q.id);$('feedback').textContent='❌ 再想一下；可以使用提示後再試。'}$('scoreStat').textContent=score;$('firstStat').textContent=first}
function renderSingle(q,a){let box=document.createElement('div');box.className='choices';let tries=0;q.o.forEach((opt,idx)=>{let b=document.createElement('button');b.className='choice';b.innerHTML=`<span class="letter">${String.fromCharCode(65+idx)}</span>${opt}`;b.onclick=()=>{tries++;if(selectedMode==='test'){testAnswers[q.id]=idx;box.querySelectorAll('button').forEach(x=>x.disabled=true);markResult(q,true);return}if(idx===q.a){b.classList.add('correct');box.querySelectorAll('button').forEach(x=>x.disabled=true);markResult(q,true,tries)}else{b.classList.add('wrong');markResult(q,false,tries);setTimeout(()=>b.classList.remove('wrong'),600)}};box.appendChild(b)});a.appendChild(box)}
function renderMulti(q,a){let list=document.createElement('div');list.className='multiList';q.o.forEach((opt,idx)=>{let lab=document.createElement('label');lab.className='multiItem';lab.innerHTML=`<input type="checkbox" value="${idx}"><span>${String.fromCharCode(65+idx)}. ${opt}</span>`;list.appendChild(lab)});let btn=document.createElement('button');btn.className='btn primary';btn.textContent='確認答案';let tries=0;btn.onclick=()=>{tries++;let picked=[...list.querySelectorAll('input:checked')].map(x=>+x.value).sort((a,b)=>a-b);if(selectedMode==='test'){testAnswers[q.id]=picked;list.querySelectorAll('input').forEach(x=>x.disabled=true);btn.disabled=true;markResult(q,true);return}let ans=[...q.a].sort((a,b)=>a-b);if(JSON.stringify(picked)===JSON.stringify(ans)){list.querySelectorAll('input').forEach(x=>x.disabled=true);btn.disabled=true;markResult(q,true,tries)}else markResult(q,false,tries)};a.append(list,btn)}
function enableDrag(el,payload){el.draggable=true;el.dataset.payload=payload;el.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',payload));el.addEventListener('click',()=>{tapPayload=payload;document.querySelectorAll('.dragChip').forEach(x=>x.classList.remove('tapSelected'));el.classList.add('tapSelected')})}
function enableDrop(zone,onDrop){zone.addEventListener('dragover',e=>e.preventDefault());zone.addEventListener('drop',e=>{e.preventDefault();onDrop(e.dataTransfer.getData('text/plain'))});zone.addEventListener('click',()=>{if(tapPayload!==null){onDrop(tapPayload);tapPayload=null;document.querySelectorAll('.dragChip').forEach(x=>x.classList.remove('tapSelected'))}})}
function renderDragMatch(q,a){let wrap=document.createElement('div'),pool=document.createElement('div'),board=document.createElement('div');pool.className='dragPool';board.className='dragBoard';let assignments=Array(q.pairs.length).fill('');shuffled(q.opts).forEach(opt=>{let chip=document.createElement('button');chip.type='button';chip.className='dragChip';chip.textContent=opt;enableDrag(chip,opt);pool.appendChild(chip)});q.pairs.forEach((p,idx)=>{let row=document.createElement('div');row.className='dragRow';let prompt=document.createElement('div');prompt.className='dragPrompt';prompt.textContent=p[0];let z=document.createElement('div');z.className='dropZone';z.textContent='拖到這裡';enableDrop(z,val=>{assignments=assignments.map(x=>x===val?'':x);assignments[idx]=val;board.querySelectorAll('.dropZone').forEach((zz,j)=>{zz.textContent=assignments[j]||'拖到這裡';zz.classList.toggle('filled',!!assignments[j])});pool.querySelectorAll('.dragChip').forEach(c=>c.classList.toggle('used',assignments.includes(c.dataset.payload)))});row.append(prompt,z);board.appendChild(row)});let note=document.createElement('div');note.className='interactionNote';note.textContent='電腦可拖曳；手機可先點答案，再點目標位置。';let btn=document.createElement('button');btn.className='btn primary';btn.textContent='確認配對';let tries=0;btn.onclick=()=>{tries++;if(selectedMode==='test'){testAnswers[q.id]=[...assignments];btn.disabled=true;markResult(q,true);return}let ok=assignments.every((v,i)=>v===q.pairs[i][1]);if(ok){btn.disabled=true;wrap.querySelectorAll('button').forEach(x=>x.disabled=true);markResult(q,true,tries)}else markResult(q,false,tries)};wrap.append(pool,note,board,btn);a.appendChild(wrap)}
function renderDragSequence(q,a){let wrap=document.createElement('div'),pool=document.createElement('div'),slots=document.createElement('div');pool.className='dragPool';slots.className='sequenceSlots';let assignments=Array(q.order.length).fill('');shuffled(q.items).forEach(item=>{let chip=document.createElement('button');chip.type='button';chip.className='dragChip';chip.textContent=item[0];enableDrag(chip,item[1]);pool.appendChild(chip)});q.order.forEach((_,idx)=>{let z=document.createElement('div');z.className='sequenceSlot';z.innerHTML=`<span class="slotNo">${idx+1}</span><span class="slotText">拖到這裡</span>`;enableDrop(z,val=>{assignments=assignments.map(x=>x===val?'':x);assignments[idx]=val;slots.querySelectorAll('.sequenceSlot').forEach((zz,j)=>{let item=q.items.find(x=>x[1]===assignments[j]);zz.querySelector('.slotText').textContent=item?item[0]:'拖到這裡';zz.classList.toggle('filled',!!item)});pool.querySelectorAll('.dragChip').forEach(c=>c.classList.toggle('used',assignments.includes(c.dataset.payload)))});slots.appendChild(z)});let note=document.createElement('div');note.className='interactionNote';note.textContent='把事件排成正確順序；手機可用「點卡片 → 點位置」。';let btn=document.createElement('button');btn.className='btn primary';btn.textContent='確認排序';let tries=0;btn.onclick=()=>{tries++;if(assignments.some(x=>!x)){$('feedback').textContent='請先把所有事件排完。';return}if(selectedMode==='test'){testAnswers[q.id]=[...assignments];btn.disabled=true;markResult(q,true);return}if(assignments.join('|')===q.order.join('|')){btn.disabled=true;wrap.querySelectorAll('button').forEach(x=>x.disabled=true);markResult(q,true,tries)}else markResult(q,false,tries)};wrap.append(pool,note,slots,btn);a.appendChild(wrap)}
$('hintBtn').onclick=()=>$('hintbox').classList.add('show');$('nextBtn').onclick=()=>{pos++;render();window.scrollTo({top:0,behavior:'smooth'})};
function evaluateTest(q){let ans=testAnswers[q.id];if(q.type==='single')return ans===q.a;if(q.type==='multi')return JSON.stringify((ans||[]).slice().sort())===JSON.stringify(q.a.slice().sort());if(q.type==='match')return Array.isArray(ans)&&ans.every((v,i)=>v===q.pairs[i][1]);if(q.type==='sequence')return Array.isArray(ans)&&ans.join('|')===q.order.join('|');return false}
function finish(){if(selectedMode==='test'){score=first=0;wrongIds=new Set();queue.slice(0,baseCount).forEach(q=>{if(evaluateTest(q)){score+=5;first++}else wrongIds.add(q.id)})}$('game').classList.add('hidden');$('result').classList.add('show');$('bar').style.width='100%';$('stageStat').textContent=`${baseCount}/${baseCount}`;let max=baseCount*5,pct=Math.round(score/max*100),grade=pct>=90?'🌟 影響探索大師':pct>=75?'⛵ 歷史航海高手':pct>=60?'🧭 文化探索小尖兵':'🗺️ 建議再練一次';$('grade').textContent=grade;$('summary').textContent=`${modeNames[selectedMode]}｜總分 ${score}/${max}`;$('accuracy').textContent=pct+'%';$('firstReport').textContent=first;$('wrongReport').textContent=wrongIds.size;$('badges').innerHTML='<span class="badge">48題題庫</span><span class="badge">單選＋複選＋拖曳配對＋排序</span><span class="badge">基礎＋進階＋Boss</span>';$('certName').textContent=`${$('studentClass').value||'____班'} ${$('studentNo').value||'__號'} ${$('studentName').value||'________'} 同學`;
$('certMode').textContent=`完成「${modeNames[selectedMode]}」`;
$('certScore').textContent=`${score}/${max}（${pct}%）`;
const today=new Date();
const y=today.getFullYear(),m=String(today.getMonth()+1).padStart(2,'0'),d=String(today.getDate()).padStart(2,'0');
const certDate=$('certDate');if(certDate)certDate.textContent=`頒發日期：${y}-${m}-${d}`;let r=$('review');r.innerHTML='';if(!wrongIds.size)r.innerHTML='<div class="reviewItem">🎉 沒有錯題，完整掌握！</div>';else[...wrongIds].forEach(id=>{let q=bank.find(x=>x.id===id),d=document.createElement('div');d.className='reviewItem';d.innerHTML=`<b>題庫 ${q.id}｜${q.t}</b><br>${q.ok}`;r.appendChild(d)});window.scrollTo({top:0,behavior:'smooth'})}
$('restartBtn').onclick=()=>location.reload();