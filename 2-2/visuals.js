const visualByQuestion={};
[1,2,3,4,5,6,7,8,9,10,11,12,31,39,41,42].forEach(id=>visualByQuestion[id]='images/western.svg');
[13,14,15,16,17,18,19,20,21,22,23,32,34,38,40,43].forEach(id=>visualByQuestion[id]='images/zheng.svg');
[24,25,26,27,28,29,30,37,44].forEach(id=>visualByQuestion[id]='images/han.svg');
[33,35,36,45,46,47,48].forEach(id=>visualByQuestion[id]='images/integration.svg');
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
  .visual img{width:100%;max-height:360px;object-fit:cover;display:block}
  .certificate{position:relative;min-height:430px;background:url('images/certificate.svg') center/cover no-repeat!important;border:none!important;overflow:hidden;color:#17324a}
  .certificate>*{display:none}
  .certOverlay{display:block!important;position:absolute;left:23%;right:23%;top:39%;background:rgba(255,255,255,.88);border:2px solid #d6b260;border-radius:18px;padding:14px;text-align:center;box-shadow:0 8px 20px rgba(80,50,20,.08)}
  .certOverlay p{display:block!important;margin:7px 0;font-weight:800}
  @media(max-width:700px){.heroArt{min-height:190px}.certificate{min-height:330px}.certOverlay{left:10%;right:10%;top:41%;font-size:14px}}
  `;
  document.head.appendChild(style);
  const art=document.querySelector('.heroArt'); if(art) art.innerHTML='<img src="images/integration.svg" alt="大航海時代在臺灣留下的影響">';
  const cert=document.querySelector('.certificate'); if(cert) cert.innerHTML='<div class="certOverlay"><p id="certName"></p><p id="certMode"></p><p><b id="certScore"></b></p></div>';
})();