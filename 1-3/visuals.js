(function(){
  const learningById={
    // A｜文化傳承與神話故事
    1:'01-tribes-overview.png',
    2:'01-tribes-overview.png',
    3:'02-shao-white-deer.png',
    4:'02-shao-white-deer.png',
    5:'02-shao-white-deer.png',
    6:'03-tao-flying-fish-myth.png',
    7:'03-tao-flying-fish-myth.png',
    8:'03-tao-flying-fish-myth.png',
    9:'03-tao-flying-fish-myth.png',
    10:'04-flying-fish-ecology.png',
    11:'04-flying-fish-ecology.png',
    12:'04-flying-fish-ecology.png',
    13:'hero-1-3-main.png',
    14:'hero-1-3-main.png',
    15:'04-flying-fish-ecology.png',
    16:'hero-1-3-main.png',

    // B｜部落生活與生態智慧
    17:'05-tribal-meeting.png',
    18:'05-tribal-meeting.png',
    19:'05-tribal-meeting.png',
    20:'05-tribal-meeting.png',
    21:'06-forest-hunting-wisdom.png',
    22:'06-forest-hunting-wisdom.png',
    23:'06-forest-hunting-wisdom.png',
    24:'05-tribal-meeting.png',
    25:'05-tribal-meeting.png',
    26:'06-forest-hunting-wisdom.png',
    27:'06-forest-hunting-wisdom.png',
    28:'05-tribal-meeting.png',
    29:'06-forest-hunting-wisdom.png',
    30:'05-tribal-meeting.png',
    31:'05-tribal-meeting.png',
    32:'06-forest-hunting-wisdom.png',

    // C｜泰雅族順應自然環境生活
    33:'07-atayal-natural-living.png',
    34:'07-atayal-natural-living.png',
    35:'07-atayal-natural-living.png',
    36:'07-atayal-natural-living.png',
    37:'09-communal-labor-house.png',
    38:'08-communal-food-sharing.png',
    39:'09-communal-labor-house.png',
    40:'09-communal-labor-house.png',
    41:'07-atayal-natural-living.png',
    42:'hero-1-3-main.png',
    43:'07-atayal-natural-living.png',
    44:'08-communal-food-sharing.png',
    45:'09-communal-labor-house.png',
    46:'hero-1-3-main.png',
    47:'hero-1-3-main.png',
    48:'hero-1-3-main.png'
  };

  const testById={
    // 測驗模式採中性圖，避免圖片直接把答案送出來
    1:'hero-1-3-banner.png',2:'hero-1-3-banner.png',3:'hero-1-3-banner.png',
    4:'hero-1-3-banner.png',5:'hero-1-3-banner.png',6:'hero-1-3-banner.png',
    7:'04-flying-fish-ecology.png',8:'04-flying-fish-ecology.png',9:'04-flying-fish-ecology.png',
    10:'03-tao-flying-fish-myth.png',11:'03-tao-flying-fish-myth.png',12:'03-tao-flying-fish-myth.png',
    13:'hero-1-3-banner.png',14:'hero-1-3-banner.png',15:'hero-1-3-banner.png',16:'hero-1-3-banner.png',

    17:'05-tribal-meeting.png',18:'05-tribal-meeting.png',19:'05-tribal-meeting.png',20:'05-tribal-meeting.png',
    21:'hero-1-3-banner.png',22:'hero-1-3-banner.png',23:'hero-1-3-banner.png',24:'05-tribal-meeting.png',
    25:'05-tribal-meeting.png',26:'hero-1-3-banner.png',27:'hero-1-3-banner.png',28:'05-tribal-meeting.png',
    29:'hero-1-3-banner.png',30:'05-tribal-meeting.png',31:'05-tribal-meeting.png',32:'hero-1-3-banner.png',

    33:'hero-1-3-banner.png',34:'hero-1-3-banner.png',35:'hero-1-3-banner.png',36:'hero-1-3-banner.png',
    37:'hero-1-3-banner.png',38:'hero-1-3-banner.png',39:'hero-1-3-banner.png',40:'hero-1-3-banner.png',
    41:'hero-1-3-banner.png',42:'hero-1-3-banner.png',43:'hero-1-3-banner.png',44:'hero-1-3-banner.png',
    45:'hero-1-3-banner.png',46:'hero-1-3-banner.png',47:'hero-1-3-banner.png',48:'hero-1-3-banner.png'
  };

  const fallbackEmoji=q=>
    q.c.startsWith('A')?'🌿 🦌 🐟':
    q.c.startsWith('B')?'🏘️ 🌲 🤝':
    '🎋 🏠 🍲';

  renderVisual=function(q){
    const box=document.getElementById('visual');
    if(!box)return;
    box.innerHTML='';

    const file=(typeof selectedMode!=='undefined' && selectedMode==='test')
      ?(testById[q.id]||learningById[q.id])
      :learningById[q.id];

    const img=new Image();
    img.src='images/'+file+'?v=2';
    img.alt='原住民族文化與環境手繪情境圖';

    img.onload=()=>{
      box.innerHTML='';
      box.appendChild(img);
      const tag=document.createElement('span');
      tag.className='sourceTag';
      tag.textContent=(typeof selectedMode!=='undefined' && selectedMode==='test')
        ?'測驗模式｜中性情境圖'
        :'手繪記憶圖｜依題意配圖';
      box.appendChild(tag);
    };

    img.onerror=()=>{
      box.innerHTML='<div class="fallback"><span class="emoji">'+fallbackEmoji(q)+'</span>原住民族文化與環境情境圖<br><span class="small">圖片載入中，不影響作答</span></div>';
    };
  };
})();