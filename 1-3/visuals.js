(function(){
  const learningById={
    // A｜文化傳承與神話故事
    1:'indigenous-culture-overview.png',
    2:'indigenous-culture-overview.png',
    3:'shao-white-deer-neutral.png',
    4:'shao-white-deer-neutral.png',
    5:'shao-white-deer-neutral.png',
    6:'03-tao-flying-fish-myth.png',
    7:'03-tao-flying-fish-myth.png',
    8:'03-tao-flying-fish-myth.png',
    9:'03-tao-flying-fish-myth.png',
    10:'04-flying-fish-ecology.png',
    11:'04-flying-fish-ecology.png',
    12:'04-flying-fish-ecology.png',
    13:'culture-environment-summary.png',
    14:'04-flying-fish-ecology.png',
    15:'03-tao-flying-fish-myth.png',
    16:'culture-environment-summary.png',

    // B｜部落生活與生態智慧
    17:'05-tribal-meeting.png',
    18:'05-tribal-meeting.png',
    19:'05-tribal-meeting.png',
    20:'05-tribal-meeting.png',
    21:'forest-knowledge-elder.png',
    22:'forest-knowledge-elder.png',
    23:'forest-knowledge-elder.png',
    24:'05-tribal-meeting.png',
    25:'05-tribal-meeting.png',
    26:'forest-knowledge-elder.png',
    27:'forest-knowledge-elder.png',
    28:'05-tribal-meeting.png',
    29:'forest-knowledge-elder.png',
    30:'05-tribal-meeting.png',
    31:'05-tribal-meeting.png',
    32:'forest-knowledge-elder.png',

    // C｜泰雅族順應自然環境生活
    33:'atayal-three-uses.png',
    34:'atayal-three-uses.png',
    35:'atayal-bamboo-water.png',
    36:'atayal-three-uses.png',
    37:'atayal-three-uses.png',
    38:'atayal-sharing-cooperation.png',
    39:'atayal-sharing-cooperation.png',
    40:'atayal-sharing-cooperation.png',
    41:'atayal-three-uses.png',
    42:'atayal-sharing-cooperation.png',
    43:'atayal-three-uses.png',
    44:'atayal-sharing-cooperation.png',
    45:'atayal-sharing-cooperation.png',
    46:'culture-environment-summary.png',
    47:'atayal-sharing-cooperation.png',
    48:'culture-environment-summary.png'
  };

  const testById={
    // 測驗模式使用較中性的高解析圖，避免直接透露答案。
    1:'culture-environment-summary.png',2:'culture-environment-summary.png',3:'culture-environment-summary.png',
    4:'culture-environment-summary.png',5:'culture-environment-summary.png',6:'culture-environment-summary.png',
    7:'culture-environment-summary.png',8:'culture-environment-summary.png',9:'culture-environment-summary.png',
    10:'culture-environment-summary.png',11:'culture-environment-summary.png',12:'culture-environment-summary.png',
    13:'culture-environment-summary.png',14:'culture-environment-summary.png',15:'culture-environment-summary.png',16:'culture-environment-summary.png',
    17:'culture-environment-summary.png',18:'culture-environment-summary.png',19:'culture-environment-summary.png',20:'culture-environment-summary.png',
    21:'culture-environment-summary.png',22:'culture-environment-summary.png',23:'culture-environment-summary.png',24:'culture-environment-summary.png',
    25:'culture-environment-summary.png',26:'culture-environment-summary.png',27:'culture-environment-summary.png',28:'culture-environment-summary.png',
    29:'culture-environment-summary.png',30:'culture-environment-summary.png',31:'culture-environment-summary.png',32:'culture-environment-summary.png',
    33:'culture-environment-summary.png',34:'culture-environment-summary.png',35:'culture-environment-summary.png',36:'culture-environment-summary.png',
    37:'culture-environment-summary.png',38:'culture-environment-summary.png',39:'culture-environment-summary.png',40:'culture-environment-summary.png',
    41:'culture-environment-summary.png',42:'culture-environment-summary.png',43:'culture-environment-summary.png',44:'culture-environment-summary.png',
    45:'culture-environment-summary.png',46:'culture-environment-summary.png',47:'culture-environment-summary.png',48:'culture-environment-summary.png'
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
    img.src='images/'+file+'?v=4';
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