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
  // 測驗模式仍保留圖片，但對會直接透露答案的地圖／物件題，
  // 改用「同主題但不直接給答案」的替代圖，避免出現空白。
  const testVisualById={
    2:'images/western-church.webp',
    8:'images/hero.webp',
    9:'images/western-place.webp',
    10:'images/western-place.webp',
    13:'images/han-culture.webp',
    16:'images/zheng-trade.webp',
    17:'images/hero.webp',
    18:'images/hero.webp',
    19:'images/zheng-education.webp',
    20:'images/zheng-education.webp',
    21:'images/zheng-military.webp',
    22:'images/zheng-military.webp',
    23:'images/zheng-military.webp',
    24:'images/han-migration.webp',
    25:'images/han-migration.webp',
    26:'images/han-culture.webp',
    27:'images/han-culture.webp',
    28:'images/han-culture.webp',
    29:'images/han-culture.webp',
    30:'images/han-culture.webp',
    32:'images/hero.webp',
    37:'images/han-culture.webp',
    39:'images/western-place.webp',
    40:'images/zheng-education.webp',
    42:'images/western-church.webp',
    44:'images/han-culture.webp'
  };

  renderVisual=function(q){
    const box=(typeof $==='function')?$('visual'):document.getElementById('visual');
    if(!box)return;
    box.innerHTML='';

    let chosenImage=visualById[q.id]||HERO_IMAGE;
    if(typeof selectedMode!=='undefined' && selectedMode==='test' && testVisualById[q.id]){
      chosenImage=testVisualById[q.id];
    }

    const img=new Image();
    img.src=chosenImage+'?v=20261008-imagefix1';
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
      .heroArt img{width:100%;height:auto;max-height:430px;object-fit:contain;display:block;margin:auto}
      .visual{padding:12px!important;min-height:0!important}
      .visual img{width:min(100%,820px);height:auto;max-height:none;object-fit:contain;display:block;margin:auto;border-radius:16px}
      .testVisualNeutral{min-height:150px;border:2px dashed #b9d9e9;border-radius:16px;background:#f5fbff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#315b70;text-align:center}
      .testVisualNeutral .testVisualIcon{font-size:38px}
      .testVisualNeutral span{font-size:14px;font-weight:700;opacity:.8}
      .certificate{position:relative;min-height:620px;background:url('${CERT_BG}?v=20261008-cert3') center/contain no-repeat!important;border:none!important;overflow:hidden;color:#17324a}
      .certificate>*{display:none}
      .certOverlay{display:flex!important;position:absolute;left:20%;right:20%;top:19%;bottom:15%;flex-direction:column;align-items:center;justify-content:center;gap:9px;background:rgba(255,255,255,.90);border:2px solid rgba(205,167,80,.9);border-radius:24px;padding:28px 34px;text-align:center;box-shadow:0 14px 32px rgba(72,48,20,.13);backdrop-filter:blur(1px)}
      .certTitle{font-size:31px;line-height:1.15;font-weight:950;letter-spacing:.16em;color:#86571a}
      .certSubtitle{font-size:15px;line-height:1.45;font-weight:850;color:#49667a;max-width:520px;margin-bottom:5px}
      .certLead{font-size:14px;font-weight:800;color:#738697;margin-top:3px}
      .certName{width:min(92%,520px);font-size:clamp(25px,3.3vw,36px);font-weight:950;color:#17324a;padding:6px 8px 9px;border-bottom:2px solid #d3b166;line-height:1.35}
      .certDesc{font-size:16px;font-weight:850;color:#36576d;line-height:1.5}
      .certScoreBox{display:flex!important;align-items:center;justify-content:center;gap:10px;margin-top:4px;padding:9px 18px;border-radius:999px;background:#f3f9fd;border:2px solid #bdd8e8}
      .certScoreLabel{font-size:14px;font-weight:900;color:#648095}
      .certScoreValue{font-size:23px;font-weight:950;color:#174e75}
      .certFooter{font-size:13px;font-weight:800;color:#718493;margin-top:3px}
      @media(max-width:700px){
        .heroArt{min-height:0}
        .heroArt img{width:100%;max-height:none}
        .visual{padding:8px!important}
        .visual img{width:100%;max-height:none}
        .certificate{min-height:440px;background-size:contain!important}
        .certOverlay{left:8%;right:8%;top:15%;bottom:10%;padding:18px 16px;gap:7px}
        .certTitle{font-size:23px}
        .certSubtitle{font-size:12px}
        .certName{font-size:24px;width:95%}
        .certDesc{font-size:14px}
        .certScoreValue{font-size:19px}
        .certFooter{font-size:12px}
      }
    `;
    document.head.appendChild(style);
    const art=document.querySelector('.heroArt');
    if(art)art.innerHTML=`<img src="${HERO_IMAGE}?v=20261008-map1" alt="大航海時代：臺灣任務 2-2">`;
    const cert=document.querySelector('.certificate');
    if(cert)cert.innerHTML=`
      <div class="certOverlay">
        <div class="certTitle">學習成就獎狀</div>
        <div class="certSubtitle">大航海時代在臺灣留下哪些影響？</div>
        <div class="certLead">茲頒發給</div>
        <div class="certName" id="certName"></div>
        <div class="certDesc" id="certMode"></div>
        <div class="certScoreBox">
          <span class="certScoreLabel">成績</span>
          <span class="certScoreValue" id="certScore"></span>
        </div>
        <div class="certFooter" id="certDate"></div>
      </div>`;
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyChrome);
  else applyChrome();
})();