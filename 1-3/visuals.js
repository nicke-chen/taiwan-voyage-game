(function(){
  const primaryById={
    // A｜前 16 題：改成真正的題意記憶圖
    1:'culture-overview-new.webp',
    2:'festival-culture-new.webp',
    3:'shao-white-deer-settlement.webp',
    4:'shao-white-deer-journey.webp',
    5:'shao-white-deer-settlement.webp',
    6:'tao-flying-fish-life.webp',
    7:'tao-flying-fish-life.webp',
    8:'tao-flying-fish-dream.webp',
    9:'tao-flying-fish-dream.webp',
    10:'tao-flying-fish-life.webp',
    11:'tao-flying-fish-life.webp',
    12:'tao-flying-fish-life.webp',
    13:'culture-overview-new.webp',
    14:'culture-overview-new.webp',
    15:'tao-flying-fish-dream.webp',
    16:'festival-culture-new.webp',

    // B｜部落生活與生態智慧
    17:'05-tribal-meeting.png',
    18:'05-tribal-meeting.png',
    19:'05-tribal-meeting.png',
    20:'05-tribal-meeting.png',
    21:'06-forest-hunting-wisdom.png',
    22:'forest-knowledge-elder.png',
    23:'06-forest-hunting-wisdom.png',
    24:'05-tribal-meeting.png',
    25:'05-tribal-meeting.png',
    26:'forest-knowledge-elder.png',
    27:'forest-knowledge-elder.png',
    28:'hero-1-3-main.png',
    29:'06-forest-hunting-wisdom.png',
    30:'05-tribal-meeting.png',
    31:'05-tribal-meeting.png',
    32:'forest-knowledge-elder.png',

    // C｜泰雅族順應自然環境生活
    33:'07-atayal-natural-living.png',
    34:'atayal-three-uses.png',
    35:'atayal-bamboo-water.png',
    36:'07-atayal-natural-living.png',
    37:'09-communal-labor-house.png',
    38:'08-communal-food-sharing.png',
    39:'atayal-sharing-cooperation.png',
    40:'09-communal-labor-house.png',
    41:'atayal-three-uses.png',
    42:'atayal-sharing-cooperation.png',
    43:'atayal-three-uses.png',
    44:'08-communal-food-sharing.png',
    45:'09-communal-labor-house.png',
    46:'culture-environment-summary.png',
    47:'atayal-sharing-cooperation.png',
    48:'culture-environment-summary.png'
  };

  // 新圖尚未上傳時的安全備援；每題仍維持不同概念，不再前 16 題同圖。
  const fallbackById={
    1:'indigenous-culture-overview.png',
    2:'hero-1-3-main.png',
    3:'culture-environment-summary.png',
    4:'02-shao-white-deer.png',
    5:'shao-white-deer-neutral.png',
    6:'03-tao-flying-fish-myth.png',
    7:'03-tao-flying-fish-myth.png',
    8:'03-tao-flying-fish-myth.png',
    9:'04-flying-fish-ecology.png',
    10:'04-flying-fish-ecology.png',
    11:'04-flying-fish-ecology.png',
    12:'04-flying-fish-ecology.png',
    13:'hero-1-3-main.png',
    14:'culture-environment-summary.png',
    15:'03-tao-flying-fish-myth.png',
    16:'indigenous-culture-overview.png'
  };

  // 測驗模式也要有圖像記憶差異，只避免最直接的答案提示。
  const testById={
    1:'culture-overview-new.webp',
    2:'festival-culture-new.webp',
    3:'culture-overview-new.webp',
    4:'shao-white-deer-settlement.webp',
    5:'shao-white-deer-journey.webp',
    6:'tao-flying-fish-life.webp',
    7:'tao-flying-fish-dream.webp',
    8:'tao-flying-fish-life.webp',
    9:'tao-flying-fish-life.webp',
    10:'tao-flying-fish-dream.webp',
    11:'tao-flying-fish-dream.webp',
    12:'culture-overview-new.webp',
    13:'culture-overview-new.webp',
    14:'festival-culture-new.webp',
    15:'tao-flying-fish-life.webp',
    16:'culture-overview-new.webp',

    17:'05-tribal-meeting.png',
    18:'hero-1-3-main.png',
    19:'05-tribal-meeting.png',
    20:'hero-1-3-main.png',
    21:'forest-knowledge-elder.png',
    22:'06-forest-hunting-wisdom.png',
    23:'forest-knowledge-elder.png',
    24:'05-tribal-meeting.png',
    25:'hero-1-3-main.png',
    26:'06-forest-hunting-wisdom.png',
    27:'forest-knowledge-elder.png',
    28:'hero-1-3-main.png',
    29:'06-forest-hunting-wisdom.png',
    30:'05-tribal-meeting.png',
    31:'hero-1-3-main.png',
    32:'forest-knowledge-elder.png',

    33:'07-atayal-natural-living.png',
    34:'culture-environment-summary.png',
    35:'atayal-three-uses.png',
    36:'atayal-bamboo-water.png',
    37:'atayal-three-uses.png',
    38:'atayal-sharing-cooperation.png',
    39:'08-communal-food-sharing.png',
    40:'atayal-sharing-cooperation.png',
    41:'culture-environment-summary.png',
    42:'atayal-three-uses.png',
    43:'07-atayal-natural-living.png',
    44:'atayal-sharing-cooperation.png',
    45:'08-communal-food-sharing.png',
    46:'culture-environment-summary.png',
    47:'atayal-three-uses.png',
    48:'culture-environment-summary.png'
  };

  const fallbackEmoji=q=>q.c.startsWith('A')?'🌿 🦌 🐟':q.c.startsWith('B')?'🏘️ 🌲 🤝':'🎋 🏠 🍲';

  renderVisual=function(q){
    const box=document.getElementById('visual');
    if(!box)return;
    box.innerHTML='';

    const isTest=(typeof selectedMode!=='undefined' && selectedMode==='test');
    const primary=isTest?(testById[q.id]||primaryById[q.id]):primaryById[q.id];
    const fallback=fallbackById[q.id] || primaryById[q.id];

    const img=new Image();
    let triedFallback=false;

    img.onload=()=>{
      box.innerHTML='';
      box.appendChild(img);
      const tag=document.createElement('span');
      tag.className='sourceTag';
      tag.textContent=isTest?'測驗模式｜題意中性圖':'圖像記憶模式｜題意專屬圖';
      box.appendChild(tag);
    };

    img.onerror=()=>{
      if(!triedFallback && fallback && fallback!==primary){
        triedFallback=true;
        img.src='images/'+fallback+'?v=6';
        return;
      }
      box.innerHTML='<div class="fallback"><span class="emoji">'+fallbackEmoji(q)+'</span>原住民族文化與環境情境圖<br><span class="small">圖片載入中，不影響作答</span></div>';
    };

    img.src='images/'+primary+'?v=6';
  };
})();