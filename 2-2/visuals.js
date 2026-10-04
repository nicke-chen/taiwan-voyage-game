const visualByQuestion={};
[1,11,12,31,36,41,45,46,47,48].forEach(id=>visualByQuestion[id]='images/integration.svg');
[2,3].forEach(id=>visualByQuestion[id]='images/spanish.svg');
[4,5,6,7].forEach(id=>visualByQuestion[id]='images/dutch.svg');
[8,42].forEach(id=>visualByQuestion[id]='images/species.svg');
[9,10,21,22,23,35,39].forEach(id=>visualByQuestion[id]='images/place-names.svg');
[13,14,15,16,17,18,34,38,43].forEach(id=>visualByQuestion[id]='images/zheng-agri-trade.svg');
[19,20,32,40].forEach(id=>visualByQuestion[id]='images/zheng-education.svg');
[24,25,26,27,30,37].forEach(id=>visualByQuestion[id]='images/han-culture.svg');
[28,29,44].forEach(id=>visualByQuestion[id]='images/han-beliefs.svg');
[33].forEach(id=>visualByQuestion[id]='images/integration.svg');
const originalRenderVisual=renderVisual;
renderVisual=function(q){
  const box=$('visual'); box.innerHTML='';
  const img=new Image(); img.src=visualByQuestion[q.id]||'images/integration.svg'; img.alt=q.t;
  img.onload=()=>{box.innerHTML='';box.appendChild(img);const tag=document.createElement('span');tag.className='sourceTag';tag.textContent=q.c;box.appendChild(tag)};
  img.onerror=()=>originalRenderVisual(q);
};
(function(){
  const style=document.createElement('style');
  style.textContent=`
  .heroArt{background:#eef9ff!important;border-radius:22px;overflow:hidden;min-height:270px;display:grid;place-items:center}
  .heroArt img{width:100%;height:100%;object-fit:cover;display:block}
  .visual img{width:100%;height:100%;max-height:360px;object-fit:cover;display:block}
  .certificate{position:relative;min-height:430px;background:url('images/certificate.svg') center/cover no-repeat!important;border:none!important;overflow:hidden;color:#17324a}
  .certificate>*{display:none}
  .certOverlay{display:block!important;position:absolute;left:23%;right:23%;top:39%;background:rgba(255,255,255,.90);border:2px solid #d6b260;border-radius:18px;padding:14px;text-align:center;box-shadow:0 8px 20px rgba(80,50,20,.08)}
  .certOverlay p{display:block!important;margin:7px 0;font-weight:800}
  @media(max-width:700px){.heroArt{min-height:190px}.certificate{min-height:330px}.certOverlay{left:10%;right:10%;top:41%;font-size:14px}}
  `;
  document.head.appendChild(style);
  const art=document.querySelector('.heroArt'); if(art) art.innerHTML='<img src="images/integration.svg" alt="大航海時代在臺灣留下的影響">';
  const cert=document.querySelector('.certificate'); if(cert) cert.innerHTML='<div class="certOverlay"><p id="certName"></p><p id="certMode"></p><p><b id="certScore"></b></p></div>';
})();