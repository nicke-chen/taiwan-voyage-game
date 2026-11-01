
(function(){
  const imageMap = {
    1:'images/01-tribes-overview.png',
    2:'images/01-tribes-overview.png',
    3:'images/02-shao-white-deer.png',
    4:'images/02-shao-white-deer.png',
    5:'images/02-shao-white-deer.png',
    6:'images/03-tao-flying-fish-myth.png',
    7:'images/03-tao-flying-fish-myth.png',
    8:'images/03-tao-flying-fish-myth.png',
    9:'images/03-tao-flying-fish-myth.png',
    10:'images/04-flying-fish-ecology.png',
    11:'images/04-flying-fish-ecology.png',
    12:'images/04-flying-fish-ecology.png',
    13:'images/02-shao-white-deer.png',
    14:'images/04-flying-fish-ecology.png',
    15:'images/03-tao-flying-fish-myth.png',
    16:'images/hero-1-3-banner.png',

    17:'images/05-tribal-meeting.png',
    18:'images/05-tribal-meeting.png',
    19:'images/05-tribal-meeting.png',
    20:'images/05-tribal-meeting.png',
    21:'images/06-forest-hunting-wisdom.png',
    22:'images/06-forest-hunting-wisdom.png',
    23:'images/06-forest-hunting-wisdom.png',
    24:'images/05-tribal-meeting.png',
    25:'images/05-tribal-meeting.png',
    26:'images/06-forest-hunting-wisdom.png',
    27:'images/06-forest-hunting-wisdom.png',
    28:'images/05-tribal-meeting.png',
    29:'images/06-forest-hunting-wisdom.png',
    30:'images/05-tribal-meeting.png',
    31:'images/05-tribal-meeting.png',
    32:'images/06-forest-hunting-wisdom.png',

    33:'images/07-atayal-natural-living.png',
    34:'images/07-atayal-natural-living.png',
    35:'images/07-atayal-natural-living.png',
    36:'images/07-atayal-natural-living.png',
    37:'images/07-atayal-natural-living.png',
    38:'images/08-communal-food-sharing.png',
    39:'images/09-communal-labor-house.png',
    40:'images/09-communal-labor-house.png',
    41:'images/07-atayal-natural-living.png',
    42:'images/09-communal-labor-house.png',
    43:'images/07-atayal-natural-living.png',
    44:'images/08-communal-food-sharing.png',
    45:'images/09-communal-labor-house.png',
    46:'images/07-atayal-natural-living.png',
    47:'images/09-communal-labor-house.png',
    48:'images/hero-1-3-banner.png'
  };

  const fallbackIcons = {
    A:'🌿 🦌 🐟',
    B:'🏘️ 🌲 🤝',
    C:'🎋 🏠 🍲'
  };

  const styleId = 'visuals-1-3-style';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .visual-card{background:#fffdf6;border:2px solid #d7e3dc;border-radius:24px;padding:14px;box-shadow:0 8px 18px rgba(0,0,0,.05)}
      .question-visual{display:block;width:100%;max-width:780px;max-height:420px;object-fit:contain;margin:0 auto;border-radius:18px;background:#fff}
      .visual-caption{text-align:center;margin-top:10px;font-weight:700;color:#385046}
      .visual-fallback{min-height:220px;display:flex;align-items:center;justify-content:center;flex-direction:column;background:#fffdf6;border:2px dashed #cdd9d2;border-radius:20px;color:#496255;padding:20px;text-align:center}
      .visual-fallback .emoji{font-size:40px;display:block;margin-bottom:12px}
    `;
    document.head.appendChild(style);
  }

  window.renderVisual = function(q){
    const box = document.getElementById('visual');
    if(!box) return;
    const src = imageMap[q.id] || 'images/hero-1-3-banner.png';
    const group = (q.c || '').trim().charAt(0) || 'A';
    const emoji = fallbackIcons[group] || '🌿 🦌 🐟';
    const alt = `第${q.id}題插圖：${q.t || ''}`;
    box.innerHTML = `
      <div class="visual-card">
        <img class="question-visual" src="${src}" alt="${alt}" loading="eager"
             onerror="this.outerHTML='<div class=\'visual-fallback\'><span class=\'emoji\'>${emoji}</span>圖片尚未載入<br>請確認 1-3/images 檔案是否已上傳完成。</div>'">
        <div class="visual-caption">${q.c || ''}${q.t ? '｜' + q.t : ''}</div>
      </div>`;
  };
})();
