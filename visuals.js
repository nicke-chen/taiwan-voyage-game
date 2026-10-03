const visualByQuestion={
1:'images/scenes/world-routes.webp',2:'images/scenes/trade-goods.webp',3:'images/scenes/taiwan-shipping-map.webp',4:'images/scenes/world-routes.webp',5:'images/scenes/taiwan-shipping-map.webp',6:'images/scenes/barter-market.webp',7:'images/scenes/barter-market.webp',8:'images/scenes/settlement-story.webp',9:'images/scenes/settlement-story.webp',10:'images/scenes/settlement-story.webp',11:'images/scenes/dutch-port.webp',12:'images/scenes/timeline.webp',13:'images/scenes/dutch-port.webp',14:'images/scenes/dutch-port.webp',15:'images/scenes/dutch-port.webp',16:'images/scenes/trade-goods.webp',17:'images/scenes/dutch-port.webp',18:'images/scenes/spanish-fort.webp',19:'images/scenes/timeline.webp',20:'images/scenes/spanish-fort.webp',21:'images/scenes/spanish-fort.webp',22:'images/scenes/spanish-fort.webp',23:'images/scenes/timeline.webp',24:'images/scenes/timeline.webp',25:'images/scenes/taiwan-shipping-map.webp',26:'images/cover/hero.webp',27:'images/scenes/dutch-port.webp',28:'images/scenes/trade-goods.webp',29:'images/scenes/spanish-fort.webp',30:'images/scenes/taiwan-shipping-map.webp',31:'images/scenes/timeline.webp',32:'images/scenes/settlement-story.webp',33:'images/scenes/timeline.webp',34:'images/scenes/taiwan-shipping-map.webp',35:'images/scenes/timeline.webp',36:'images/scenes/timeline.webp',37:'images/scenes/timeline.webp',38:'images/scenes/timeline.webp',39:'images/scenes/timeline.webp',40:'images/scenes/timeline.webp',41:'images/scenes/timeline.webp',42:'images/scenes/dutch-port.webp',43:'images/scenes/spanish-fort.webp',44:'images/scenes/timeline.webp',45:'images/scenes/timeline.webp',46:'images/scenes/taiwan-shipping-map.webp',47:'images/cover/hero.webp',48:'images/scenes/timeline.webp'};
const visualLabels={
'world-routes.webp':'新航路與世界航線','trade-goods.webp':'瓷器・絲綢・香料','taiwan-shipping-map.webp':'臺灣航運要道','barter-market.webp':'原住民與漁民交換','settlement-story.webp':'海商與開墾','dutch-port.webp':'荷蘭人在臺灣','spanish-fort.webp':'西班牙人在北臺灣','timeline.webp':'荷西鄭清時間軸','hero.webp':'大航海時代綜合圖'};
renderVisual=function(q){
  const box=document.getElementById('visual');
  box.innerHTML='';
  const src=visualByQuestion[q.id]||'images/cover/hero.webp';
  const img=new Image();
  img.src=src+'?v=6';
  img.alt=q.t;
  img.onload=()=>{
    box.innerHTML='';
    box.appendChild(img);
    const tag=document.createElement('span');
    tag.className='sourceTag';
    const key=src.split('/').pop();
    tag.textContent=visualLabels[key]||'主題圖';
    box.appendChild(tag);
  };
  img.onerror=()=>box.innerHTML=`<div class="fallback"><span class="emoji">🧭</span>${q.t}</div>`;
};

(function setupNewVisuals(){
  const style=document.createElement('style');
  style.textContent=`
  .heroVisual{width:100%;display:block;aspect-ratio:4/3;object-fit:cover;border-radius:20px;margin:16px 0 14px;border:2px solid #cfe3ef;box-shadow:0 8px 24px rgba(25,70,100,.08)}
  .visual img{aspect-ratio:4/3;object-fit:cover;max-height:none}
  .certificate{position:relative;padding:0;border:0;background:none;overflow:hidden;border-radius:18px;aspect-ratio:4/3;box-shadow:0 8px 28px rgba(23,50,74,.14)}
  .certificateBg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
  .certOverlay{position:absolute;inset:0;font-weight:900;color:#5a3218;pointer-events:none}
  .certField{position:absolute;text-align:center;font-size:clamp(12px,2.2vw,22px);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
  #certName{left:25.5%;top:42.5%;width:25%}
  #certClass{left:61.5%;top:42.5%;width:25%}
  #certDate{left:29.5%;top:53.2%;width:22%}
  #certScore{left:62.5%;top:53.2%;width:24%}
  #certMode{left:31%;top:70%;width:38%;font-size:clamp(10px,1.7vw,17px);color:#234f7d}
  @media(max-width:620px){.heroVisual{border-radius:14px}.certificate{border-radius:12px}.certField{font-size:clamp(9px,2.5vw,14px)}}`;
  document.head.appendChild(style);

  const hero=document.querySelector('.hero');
  const identity=hero&&hero.querySelector('.identity');
  if(hero&&identity&&!hero.querySelector('.heroVisual')){
    const img=document.createElement('img');
    img.className='heroVisual';
    img.src='images/cover/hero.webp?v=6';
    img.alt='大航海時代：臺灣任務';
    hero.insertBefore(img,identity);
  }

  const cert=document.querySelector('.certificate');
  if(cert){
    cert.innerHTML=`<img class="certificateBg" src="images/certificate/certificate.webp?v=6" alt="航海學習達人獎狀"><div class="certOverlay"><div id="certName" class="certField"></div><div id="certClass" class="certField"></div><div id="certDate" class="certField"></div><div id="certScore" class="certField"></div><div id="certMode" class="certField"></div></div>`;
  }

  const result=document.getElementById('result');
  if(result){
    const syncCert=()=>{
      if(!result.classList.contains('show'))return;
      const name=document.getElementById('studentName')?.value||'________';
      const cls=document.getElementById('studentClass')?.value||'____班';
      const no=document.getElementById('studentNo')?.value||'__號';
      const n=document.getElementById('certName'),c=document.getElementById('certClass'),d=document.getElementById('certDate'),s=document.getElementById('certScore'),m=document.getElementById('certMode');
      if(n)n.textContent=name;
      if(c)c.textContent=`${cls} ${no}`;
      if(d)d.textContent=new Date().toLocaleDateString('zh-TW');
      if(s)s.textContent=(s.textContent||'').replace(/^成績：/,'');
      if(m&&m.textContent)m.textContent=m.textContent.replace(/^完成「|」$/g,'');
    };
    new MutationObserver(()=>setTimeout(syncCert,0)).observe(result,{attributes:true,attributeFilter:['class']});
  }
})();
