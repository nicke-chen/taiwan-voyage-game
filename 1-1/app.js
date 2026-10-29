const $=id=>document.getElementById(id);
let selectedChapter='1',selectedMode='learn',queue=[],pos=0,correct=0,wrongIds=new Set(),testAnswers={};

function shuffled(a){const out=[...a];for(let i=out.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[out[i],out[j]]=[out[j],out[i]]}return out}
function randomizeQuestion(src){
  const q={...src};
  if((q.type==='single'||q.type==='multi')&&Array.isArray(src.o)){
    const e=shuffled(src.o.map((opt,oldIndex)=>({opt,oldIndex})));
    q.o=e.map(x=>x.opt);
    if(q.type==='single')q.a=e.findIndex(x=>x.oldIndex===src.a);
    else{const s=new Set(src.a);q.a=e.map((x,i)=>s.has(x.oldIndex)?i:null).filter(x=>x!==null)}
  }
  if(q.type==='match'){q.pairs=shuffled(src.pairs.map(x=>[...x]));q.opts=[...src.opts]}
  if(q.type==='sequence'){q.items=shuffled(src.items.map(x=>[...x]));q.order=[...src.order]}
  return q;
}
function chapterName(ch){return ch==1?'第一章｜世界與臺灣的位置':ch==2?'第二章｜季風與生活':ch==3?'第三章｜海洋生物遷徙':'三章總挑戰'}
document.querySelectorAll('.chapterBtn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.chapterBtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedChapter=b.dataset.chapter});
document.querySelectorAll('.modeBtn').forEach(b=>b.onclick=()=>{document.querySelectorAll('.modeBtn').forEach(x=>x.classList.remove('active'));b.classList.add('active');selectedMode=b.dataset.mode});

$('startBtn').onclick=()=>{
  let src=selectedChapter==='all'?bank:bank.filter(q=>String(q.ch)===selectedChapter);
  if(selectedMode==='learn')src=shuffled(src).slice(0,Math.min(10,src.length));
  else if(selectedMode==='practice')src=shuffled(src).slice(0,Math.min(selectedChapter==='all'?18:12,src.length));
  else src=shuffled(src).slice(0,Math.min(selectedChapter==='all'?18:12,src.length));
  queue=src.map(randomizeQuestion);pos=0;correct=0;wrongIds=new Set();testAnswers={};
  $('setup').classList.add('hidden');$('game').classList.remove('hidden');$('result').classList.add('hidden');render();
};

function shownType(q){return q.type==='multi'?'複選題':q.type==='match'?'配對題':q.type==='sequence'?'排序題':'單選題'}
function render(){
  if(pos>=queue.length){finish();return}
  const q=queue[pos];$('chapterLabel').textContent=chapterName(q.ch);$('progressLabel').textContent=`${pos+1}/${queue.length}`;$('progressBar').style.width=`${(pos/queue.length)*100}%`;
  $('qTitle').textContent=`第 ${pos+1} 題｜${q.t}`;$('level').textContent=q.l;$('type').textContent=shownType(q);
  $('memoryCard').innerHTML=`<div class="icon">${q.v[0]}</div><b>${q.v[1]}</b><p>${q.v[2]}</p>`;$('question').textContent=q.q;$('feedback').textContent='';$('hint').textContent=q.h;$('hint').classList.remove('show');$('hintBtn').classList.toggle('hidden',selectedMode==='test');$('nextBtn').classList.add('hidden');renderAnswer(q);
}
function renderAnswer(q){const a=$('answerArea');a.innerHTML='';if(q.type==='single')renderSingle(q,a);else if(q.type==='multi')renderMulti(q,a);else if(q.type==='match')renderMatch(q,a);else renderSequence(q,a)}
function revealNext(){$('nextBtn').classList.remove('hidden')}
function record(q,ok){
  if(selectedMode==='test'){revealNext();return}
  if(ok){correct++;$('feedback').textContent='✅ '+q.ok;revealNext();$('hintBtn').disabled=true}
  else{wrongIds.add(q.id);$('feedback').textContent='❌ 再想一下，可以看看提示。'}
}
function renderSingle(q,a){
  const box=document.createElement('div');box.className='choices';
  q.o.forEach((opt,idx)=>{const b=document.createElement('button');b.className='choice';b.innerHTML=`<span class="letter">${String.fromCharCode(65+idx)}</span>${opt}`;b.onclick=()=>{if(selectedMode==='test'){testAnswers[q.id]=idx;box.querySelectorAll('button').forEach(x=>x.disabled=true);record(q,true);return}if(idx===q.a){b.classList.add('correct');box.querySelectorAll('button').forEach(x=>x.disabled=true);record(q,true)}else{b.classList.add('wrong');record(q,false);setTimeout(()=>b.classList.remove('wrong'),500)}};box.appendChild(b)});a.appendChild(box)
}
function renderMulti(q,a){
  const list=document.createElement('div');list.className='multiList';q.o.forEach((opt,idx)=>{const lab=document.createElement('label');lab.className='multiItem';lab.innerHTML=`<input type="checkbox" value="${idx}"><span>${String.fromCharCode(65+idx)}. ${opt}</span>`;list.appendChild(lab)});
  const btn=document.createElement('button');btn.className='primary';btn.textContent='確認答案';btn.style.cssText='border:0;border-radius:13px;padding:11px 15px;font-weight:900;margin-top:10px;cursor:pointer';
  btn.onclick=()=>{const picked=[...list.querySelectorAll('input:checked')].map(x=>+x.value).sort((a,b)=>a-b);if(selectedMode==='test'){testAnswers[q.id]=picked;list.querySelectorAll('input').forEach(x=>x.disabled=true);btn.disabled=true;record(q,true);return}const ans=[...q.a].sort((a,b)=>a-b);if(JSON.stringify(picked)===JSON.stringify(ans)){list.querySelectorAll('input').forEach(x=>x.disabled=true);btn.disabled=true;record(q,true)}else record(q,false)};a.append(list,btn)
}
function renderMatch(q,a){
  const wrap=document.createElement('div');wrap.className='matchWrap';q.pairs.forEach((p,i)=>{const row=document.createElement('div');row.className='matchRow';row.innerHTML=`<div class="matchPrompt">${p[0]}</div><div class="selectBox"><select data-i="${i}"><option value="">請選擇</option>${shuffled(q.opts).map(x=>`<option>${x}</option>`).join('')}</select></div>`;wrap.appendChild(row)});
  const btn=document.createElement('button');btn.className='primary';btn.textContent='確認配對';btn.style.cssText='border:0;border-radius:13px;padding:11px 15px;font-weight:900;cursor:pointer';
  btn.onclick=()=>{const vals=[...wrap.querySelectorAll('select')].map(x=>x.value);if(selectedMode==='test'){testAnswers[q.id]=vals;btn.disabled=true;record(q,true);return}const ok=vals.every((v,i)=>v===q.pairs[i][1]);record(q,ok);if(ok){btn.disabled=true;wrap.querySelectorAll('select').forEach(x=>x.disabled=true)}};a.append(wrap,btn)
}
function renderSequence(q,a){
  const wrap=document.createElement('div');wrap.className='sequenceWrap';const opts=q.items.map(x=>x[0]);
  q.order.forEach((_,i)=>{const row=document.createElement('div');row.className='seqRow';row.innerHTML=`<span class="seqNo">${i+1}</span><select><option value="">請選擇事件</option>${opts.map(x=>`<option>${x}</option>`).join('')}</select>`;wrap.appendChild(row)});
  const btn=document.createElement('button');btn.className='primary';btn.textContent='確認排序';btn.style.cssText='border:0;border-radius:13px;padding:11px 15px;font-weight:900;cursor:pointer';
  btn.onclick=()=>{const vals=[...wrap.querySelectorAll('select')].map(x=>x.value);const ids=vals.map(v=>q.items.find(x=>x[0]===v)?.[1]||'');if(selectedMode==='test'){testAnswers[q.id]=ids;btn.disabled=true;record(q,true);return}const ok=ids.join('|')===q.order.join('|');record(q,ok);if(ok){btn.disabled=true;wrap.querySelectorAll('select').forEach(x=>x.disabled=true)}};a.append(wrap,btn)
}
$('hintBtn').onclick=()=>$('hint').classList.add('show');$('nextBtn').onclick=()=>{pos++;$('hintBtn').disabled=false;render();window.scrollTo({top:0,behavior:'smooth'})};
function evaluate(q){const ans=testAnswers[q.id];if(q.type==='single')return ans===q.a;if(q.type==='multi')return JSON.stringify((ans||[]).slice().sort())===JSON.stringify(q.a.slice().sort());if(q.type==='match')return Array.isArray(ans)&&ans.every((v,i)=>v===q.pairs[i][1]);if(q.type==='sequence')return Array.isArray(ans)&&ans.join('|')===q.order.join('|');return false}
function finish(){
  if(selectedMode==='test'){correct=0;wrongIds=new Set();queue.forEach(q=>{if(evaluate(q))correct++;else wrongIds.add(q.id)})}
  const pct=Math.round(correct/queue.length*100);$('game').classList.add('hidden');$('result').classList.remove('hidden');$('progressBar').style.width='100%';$('resultTitle').textContent=pct>=90?'🌟 地圖探索大師':pct>=75?'🧭 臺灣位置高手':pct>=60?'🌊 環境探索小尖兵':'📘 再複習一次會更穩';$('resultSummary').textContent=`${chapterName(selectedChapter)}｜${selectedMode==='test'?'測驗':'練習'}完成`;$('accuracy').textContent=pct+'%';$('correctCount').textContent=`${correct}/${queue.length}`;$('wrongCount').textContent=wrongIds.size;
  const r=$('review');r.innerHTML='';if(!wrongIds.size)r.innerHTML='<div class="reviewItem">🎉 沒有錯題！</div>';else[...wrongIds].forEach(id=>{const q=bank.find(x=>x.id===id),d=document.createElement('div');d.className='reviewItem';d.innerHTML=`<b>題庫 Q${q.id}｜${q.t}</b><br>${q.ok}`;r.appendChild(d)});window.scrollTo({top:0,behavior:'smooth'})
}
$('restartBtn').onclick=()=>location.reload();