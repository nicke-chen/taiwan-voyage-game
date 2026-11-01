(function(){
  const learningById={
    // A｜史前時代與舊石器生活
    1:'hero-1-2-source.png',
    2:'hero-1-2-source.png',
    3:'old-stone-coast-life.png',
    4:'old-stone-coast-life.png',
    5:'old-stone-coast-life.png',
    6:'old-stone-correct-daily-life.png',
    7:'old-stone-correct-daily-life.png',
    8:'old-stone-correct-daily-life.png',
    9:'old-stone-correct-daily-life.png',
    10:'old-stone-correct-daily-life.png',
    11:'hero-1-2-source.png',
    12:'old-stone-correct-daily-life.png',
    13:'old-stone-correct-daily-life.png',
    14:'old-stone-coast-life.png',
    15:'hero-1-2-source.png',
    16:'old-stone-correct-daily-life.png',

    // B｜新石器農業與聚落
    17:'new-stone-panorama.png',
    18:'new-stone-rice-taro-village.png',
    19:'new-stone-rice-taro-village.png',
    20:'new-stone-rice-taro-village.png',
    21:'new-stone-rice-taro-village.png',
    22:'new-stone-rice-taro-village.png',
    23:'new-stone-rice-taro-village.png',
    24:'new-stone-rice-taro-village.png',
    25:'new-stone-rice-taro-village.png',
    26:'new-stone-rice-taro-village.png',
    27:'new-stone-rice-taro-village.png',
    28:'new-stone-rice-taro-village.png',
    29:'new-stone-rice-taro-village.png',
    30:'new-stone-rice-taro-village.png',
    31:'new-stone-rice-taro-village.png',
    32:'new-stone-rice-taro-village.png',

    // C｜金屬器與器物交流
    33:'metal-age-forging-harvest.png',
    34:'metal-age-forging-harvest.png',
    35:'metal-age-forging-harvest.png',
    36:'metal-age-forging-harvest.png',
    37:'metal-age-forging-harvest.png',
    38:'metal-age-forging-harvest.png',
    39:'prehistoric-trade-market.png',
    40:'taiwan-jade-trade-map.png',
    41:'taiwan-jade-trade-map.png',
    42:'taiwan-jade-trade-map.png',
    43:'southeast-asia-glass-bead-route.png',
    44:'southeast-asia-glass-bead-route.png',
    45:'prehistoric-three-stage-timeline.png',
    46:'prehistoric-three-stage-timeline.png',
    47:'metal-age-forging-harvest.png',
    48:'prehistoric-three-stage-timeline.png'
  };

  // 正式測驗時避免圖片直接送答案：
  // 所有精準物件題改成較廣泛的章節情境圖。
  const testById={
    // 測驗模式採較中性的章節情境圖，避免圖片直接透露答案。
    1:'old-stone-coast-life.png',2:'old-stone-coast-life.png',3:'old-stone-coast-life.png',
    4:'old-stone-coast-life.png',5:'old-stone-coast-life.png',6:'old-stone-coast-life.png',
    7:'old-stone-coast-life.png',8:'old-stone-coast-life.png',9:'old-stone-coast-life.png',
    10:'old-stone-coast-life.png',11:'old-stone-coast-life.png',12:'old-stone-coast-life.png',
    13:'old-stone-coast-life.png',14:'old-stone-coast-life.png',15:'old-stone-coast-life.png',16:'old-stone-coast-life.png',

    17:'new-stone-panorama.png',18:'new-stone-panorama.png',19:'new-stone-panorama.png',
    20:'new-stone-panorama.png',21:'new-stone-panorama.png',22:'new-stone-panorama.png',
    23:'new-stone-panorama.png',24:'new-stone-panorama.png',25:'new-stone-panorama.png',
    26:'new-stone-panorama.png',27:'new-stone-panorama.png',28:'new-stone-panorama.png',
    29:'new-stone-panorama.png',30:'new-stone-panorama.png',31:'new-stone-panorama.png',32:'new-stone-panorama.png',

    33:'prehistoric-trade-market.png',34:'prehistoric-trade-market.png',35:'prehistoric-trade-market.png',
    36:'prehistoric-trade-market.png',37:'prehistoric-trade-market.png',38:'prehistoric-trade-market.png',
    39:'prehistoric-trade-market.png',40:'prehistoric-trade-market.png',41:'prehistoric-trade-market.png',
    42:'prehistoric-trade-market.png',43:'prehistoric-trade-market.png',44:'prehistoric-trade-market.png',
    45:'hero-1-2-source.png',46:'hero-1-2-source.png',47:'prehistoric-trade-market.png',48:'hero-1-2-source.png'
  };

  const fallbackEmoji=q=>
    q.c.startsWith('A')?'🔥 🪨 🐟':
    q.c.startsWith('B')?'🌾 🏺 🏘️':
    '⚒️ 🌾 💎';

  renderVisual=function(q){
    const box=document.getElementById('visual');
    if(!box)return;
    box.innerHTML='';

    const file=(typeof selectedMode!=='undefined'&&selectedMode==='test')
      ?(testById[q.id]||learningById[q.id])
      :learningById[q.id];

    const img=new Image();
    img.src='images/'+file+'?v=5';
    img.alt='史前生活手繪情境圖';

    img.onload=()=>{
      box.innerHTML='';
      box.appendChild(img);
      const tag=document.createElement('span');
      tag.className='sourceTag';
      tag.textContent=(typeof selectedMode!=='undefined'&&selectedMode==='test')
        ?'測驗模式｜中性情境圖'
        :'手繪記憶圖｜依題意配圖';
      box.appendChild(tag);
    };

    img.onerror=()=>{
      box.innerHTML='<div class="fallback"><span class="emoji">'+fallbackEmoji(q)+'</span>史前生活情境圖<br><span class="small">圖片載入中，不影響作答</span></div>';
    };
  };
})();