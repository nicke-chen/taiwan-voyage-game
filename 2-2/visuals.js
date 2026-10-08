(function(){
  const HERO_IMAGE='images/hero.webp';
  const CERT_BG='images/certificate.webp';

  // 48 題逐題指定圖片；不再使用關鍵字猜測。
  const visualById={
    1:'images/hero.webp',
    2:'images/north-taiwan-western-map.webp',
    3:'images/western-church.webp',
    4:'images/western-school.webp',
    5:'images/western-school.webp',
    6:'images/western-language.webp',
    7:'images/western-language.webp',
    8:'images/western-crops.webp',
    9:'images/north-taiwan-western-map.webp',
    10:'images/north-taiwan-western-map.webp',
    11:'images/hero.webp',
    12:'images/hero.webp',

    13:'images/han-migration-culture-map.webp',
    14:'images/zheng-farm.webp',
    15:'images/zheng-farm.webp',
    16:'images/zheng-development-map.webp',
    17:'images/zheng-trade.webp',
    18:'images/zheng-trade.webp',
    19:'images/zheng-development-map.webp',
    20:'images/zheng-development-map.webp',
    21:'images/zheng-military-places-map.webp',
    22:'images/zheng-military-places-map.webp',
    23:'images/zheng-military-places-map.webp',

    24:'images/han-migration-culture-map.webp',
    25:'images/han-migration-culture-map.webp',
    26:'images/han-migration-culture-map.webp',
    27:'images/han-migration-culture-map.webp',
    28:'images/han-faith.webp',
    29:'images/han-faith.webp',
    30:'images/han-migration-culture-map.webp',

    31:'images/hero.webp',
    32:'images/zheng-development-map.webp',
    33:'images/hero.webp',
    34:'images/zheng-trade.webp',
    35:'images/hero.webp',
    36:'images/hero.webp',
    37:'images/han-migration-culture-map.webp',
    38:'images/zheng-farm.webp',
    39:'images/north-taiwan-western-map.webp',
    40:'images/zheng-development-map.webp',

    41:'images/western-language.webp',
    42:'images/north-taiwan-western-map.webp',
    43:'images/hero.webp',
    44:'images/han-migration-culture-map.webp',
    45:'images/hero.webp',
    46:'images/hero.webp',
    47:'images/hero.webp',
    48:'images/hero.webp'
  };

  const originalRenderVisual=(typeof renderVisual==='function')?renderVisual:null;
  const testHideIds=new Set([8,17,18,28,29]);
  const mapImages=new Set([
    'images/north-taiwan-western-map.webp',
    'images/zheng-development-map.webp',
    'images/zheng-military-places-map.webp',
    'images/han-migration-culture-map.webp'
  ]);

  renderVisual=function(q){
    const box=(typeof $==='function')?$('visual'):document.getElementById('visual');
    if(!box)return;
    box.innerHTML='';

    // 評量模式：會直接透露答案的題目改用中性提示，不顯示線索圖。
    const chosenImage=visualById[q.id]||HERO_IMAGE;
    if(typeof selectedMode!=='undefined' && selectedMode==='test' && (testHideIds.has(q.id)||mapImages.has(chosenImage))){
      box.innerHTML='<div class="testVisualNeutral"><div class="testVisualIcon">🧭</div><b>評量模式</b><span>請依題目內容作答</span></div>';
      return;
    }

    const img=new Image();
    img.src=chosenImage+'?v=20261008-map1';
    img.alt=q?.t||q?.title||'題目插圖';
    img.onload=()=>{
      box.innerHTML='';
      box.appendChild(img);
      const tag=document.createElement('span');
      tag.className='sourceTag';
      tag.textContent=q?.c||q?.chapter||'主題圖';
      box.appendChild(tag);
    };
    img.onerror=()=>{if(originalRenderVisual)originalRenderVisual(q)};
  };

  function applyChrome(){
    const style=document.createElement('style');
    style.textContent=`
      .heroArt{background:#eef9ff!important;border-radius:22px;overflow:hidden;min-height:270px;display:grid;place-items:center}
      .heroArt img{width:100%;height:100%;object-fit:cover;display:block}
      .visual img{width:100%;max-height:360px;object-fit:cover;display:block;border-radius:16px}
      .testVisualNeutral{min-height:150px;border:2px dashed #b9d9e9;border-radius:16px;background:#f5fbff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#315b70;text-align:center}
      .testVisualNeutral .testVisualIcon{font-size:38px}
      .testVisualNeutral span{font-size:14px;font-weight:700;opacity:.8}
      .certificate{position:relative;min-height:430px;background:url('${CERT_BG}?v=20261008-map1') center/cover no-repeat!important;border:none!important;overflow:hidden;color:#17324a}
      .certificate>*{display:none}
      .certOverlay{display:block!important;position:absolute;left:23%;right:23%;top:39%;background:rgba(255,255,255,.88);border:2px solid #d6b260;border-radius:18px;padding:14px;text-align:center;box-shadow:0 8px 20px rgba(80,50,20,.08)}
      .certOverlay p{display:block!important;margin:7px 0;font-weight:800}
      @media(max-width:700px){.heroArt{min-height:190px}.certificate{min-height:330px}.certOverlay{left:10%;right:10%;top:41%;font-size:14px}}
    `;
    document.head.appendChild(style);
    const art=document.querySelector('.heroArt');
    if(art)art.innerHTML=`<img src="${HERO_IMAGE}?v=20261008-map1" alt="大航海時代：臺灣任務 2-2">`;
    const cert=document.querySelector('.certificate');
    if(cert)cert.innerHTML='<div class="certOverlay"><p id="certName"></p><p id="certMode"></p><p><b id="certScore"></b></p></div>';
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyChrome);
  else applyChrome();
})();