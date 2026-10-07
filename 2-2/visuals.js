(function(){
  const HERO_IMAGE = 'images/hero.webp';
  const CERT_BG = 'images/certificate.webp';

  function textOf(q){
    return [q?.t,q?.title,q?.q,q?.question,q?.c,q?.h,q?.hint,q?.chapter,q?.type]
      .filter(Boolean).join(' ');
  }

  function chooseVisual(q){
    const text = textOf(q);
    const rules = [
      [/和平島|天主教|西班牙|教堂/, 'images/western-church.webp'],
      [/羅馬字母|原住民語言|字母|拼音|語言/, 'images/western-language.webp'],
      [/黃牛|荷蘭豆|土芒果|動植物|引進/, 'images/western-crops.webp'],
      [/三貂角|聖地牙哥|地名由來|地名/, 'images/western-place.webp'],
      [/基督教|設立教堂|設立學校|學校/, 'images/western-school.webp'],
      [/蔗糖|鹿皮|海上貿易|對外貿易|出口|進口|商船|貿易/, 'images/zheng-trade.webp'],
      [/軍隊|軍事屯墾|農業|稻米|糧食需求|開墾農地/, 'images/zheng-farm.webp'],
      [/孔廟|全臺首學|學堂|教育建設|選拔人才/, 'images/zheng-education.webp'],
      [/新營|左營|林鳳營|前鎮|茄萣|軍隊駐守/, 'images/zheng-military.webp'],
      [/招募漢人|漢人來臺|移民來臺|移民增加|開墾/, 'images/han-migration.webp'],
      [/媽祖|玄天上帝|信仰|習俗信仰/, 'images/han-faith.webp'],
      [/漢人文化|故鄉習俗|社會發展|文化基礎|聚落/, 'images/han-culture.webp']
    ];
    for (const [rx, src] of rules) if (rx.test(text)) return src;
    return 'images/hero.webp';
  }

  const originalRenderVisual = (typeof renderVisual === 'function') ? renderVisual : null;
  renderVisual = function(q){
    const box = (typeof $ === 'function') ? $('visual') : document.getElementById('visual');
    if(!box) return;
    box.innerHTML = '';
    const img = new Image();
    img.src = chooseVisual(q) + '?v=fix2';
    img.alt = q?.t || q?.title || '題目插圖';
    img.onload = ()=>{
      box.innerHTML='';
      box.appendChild(img);
      const tag = document.createElement('span');
      tag.className='sourceTag';
      tag.textContent = q?.c || q?.chapter || '主題圖';
      box.appendChild(tag);
    };
    img.onerror = ()=>{ if (originalRenderVisual) originalRenderVisual(q); };
  };

  function applyChrome(){
    const style = document.createElement('style');
    style.textContent = `
      .heroArt{background:#eef9ff!important;border-radius:22px;overflow:hidden;min-height:270px;display:grid;place-items:center}
      .heroArt img{width:100%;height:100%;object-fit:cover;display:block}
      .visual img{width:100%;max-height:360px;object-fit:cover;display:block;border-radius:16px}
      .certificate{position:relative;min-height:430px;background:url('${CERT_BG}?v=fix2') center/cover no-repeat!important;border:none!important;overflow:hidden;color:#17324a}
      .certificate>*{display:none}
      .certOverlay{display:block!important;position:absolute;left:23%;right:23%;top:39%;background:rgba(255,255,255,.88);border:2px solid #d6b260;border-radius:18px;padding:14px;text-align:center;box-shadow:0 8px 20px rgba(80,50,20,.08)}
      .certOverlay p{display:block!important;margin:7px 0;font-weight:800}
      @media(max-width:700px){.heroArt{min-height:190px}.certificate{min-height:330px}.certOverlay{left:10%;right:10%;top:41%;font-size:14px}}
    `;
    document.head.appendChild(style);
    const art = document.querySelector('.heroArt');
    if(art) art.innerHTML = `<img src="${HERO_IMAGE}?v=fix2" alt="大航海時代：臺灣任務 2-2">`;
    const cert = document.querySelector('.certificate');
    if(cert) cert.innerHTML = '<div class="certOverlay"><p id="certName"></p><p id="certMode"></p><p><b id="certScore"></b></p></div>';
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', applyChrome);
  } else {
    applyChrome();
  }
})();
