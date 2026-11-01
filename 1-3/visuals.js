(function(){
  // 1-3 圖像記憶版：同一張圖只服務同一個知識概念，降低跨題共用。
  const learningById={
    // A｜文化傳承與神話故事
    1:'01-tribes-overview.png',                 // 十六族
    2:'indigenous-culture-overview.png',        // 神話、歌謠、祭典傳承
    3:'culture-environment-summary.png',        // 神話與自然共存
    4:'02-shao-white-deer.png',                 // 白鹿傳說辨識
    5:'shao-white-deer-neutral.png',            // 遷徙、定居
    6:'03-tao-flying-fish-myth.png',            // 達悟族飛魚神話
    7:'03-tao-flying-fish-myth.png',            // 吃飛魚後奇癢
    8:'03-tao-flying-fish-myth.png',            // 飛魚之神託夢
    9:'04-flying-fish-ecology.png',             // 食用方法與禮儀
    10:'04-flying-fish-ecology.png',            // 珍惜海洋資源
    11:'04-flying-fish-ecology.png',            // 捕魚季節
    12:'04-flying-fish-ecology.png',            // 生態平衡
    13:'hero-1-3-main.png',                     // 白鹿 vs 飛魚配對
    14:'culture-environment-summary.png',        // 神話與自然環境關聯
    15:'03-tao-flying-fish-myth.png',            // 飛魚文化順序
    16:'indigenous-culture-overview.png',        // 文化傳承總整合

    // B｜部落生活與生態智慧
    17:'05-tribal-meeting.png',                  // 部落生活中心
    18:'05-tribal-meeting.png',                  // 祭典、狩獵、禁忌
    19:'05-tribal-meeting.png',                  // 頭目/祭司/會議
    20:'05-tribal-meeting.png',                  // 共同承擔
    21:'06-forest-hunting-wisdom.png',           // 山林狩獵禁忌
    22:'forest-knowledge-elder.png',             // 祖先知識來源
    23:'06-forest-hunting-wisdom.png',           // 狩獵與生態
    24:'05-tribal-meeting.png',                  // 祭典規範
    25:'05-tribal-meeting.png',                  // 決策與責任
    26:'forest-knowledge-elder.png',             // 祖先經驗與環境
    27:'forest-knowledge-elder.png',             // 生態智慧
    28:'hero-1-3-main.png',                     // 部落規範配對
    29:'06-forest-hunting-wisdom.png',           // 狩獵知識配對
    30:'05-tribal-meeting.png',                  // 為何共同遵守
    31:'05-tribal-meeting.png',                  // 部落決策順序
    32:'forest-knowledge-elder.png',             // 生態智慧總整合

    // C｜泰雅族順應自然環境生活
    33:'07-atayal-natural-living.png',           // 泰雅族順應自然
    34:'atayal-three-uses.png',                  // 竹子與木頭
    35:'atayal-bamboo-water.png',                // 取水引水
    36:'07-atayal-natural-living.png',           // 製作食器
    37:'09-communal-labor-house.png',            // 建造家屋
    38:'08-communal-food-sharing.png',           // 共食分享獵物
    39:'atayal-sharing-cooperation.png',         // 共勞互助
    40:'09-communal-labor-house.png',            // 共勞建屋
    41:'atayal-three-uses.png',                  // 水/吃/住三用途配對
    42:'atayal-sharing-cooperation.png',         // 共食與共勞配對
    43:'atayal-three-uses.png',                  // 善用在地材料
    44:'08-communal-food-sharing.png',           // 飲食共享
    45:'09-communal-labor-house.png',            // 勞動合作
    46:'culture-environment-summary.png',        // 順應環境整合
    47:'atayal-sharing-cooperation.png',         // 自然材料→合作生活
    48:'culture-environment-summary.png'         // 全章總整合
  };

  // 測驗模式仍保持中性，不讓圖片直接送出答案。
  const testById={
    1:'hero-1-3-banner.png',2:'hero-1-3-banner.png',3:'hero-1-3-banner.png',
    4:'hero-1-3-banner.png',5:'hero-1-3-banner.png',6:'hero-1-3-banner.png',
    7:'hero-1-3-banner.png',8:'hero-1-3-banner.png',9:'hero-1-3-banner.png',
    10:'hero-1-3-banner.png',11:'hero-1-3-banner.png',12:'hero-1-3-banner.png',
    13:'hero-1-3-banner.png',14:'hero-1-3-banner.png',15:'hero-1-3-banner.png',16:'hero-1-3-banner.png',

    17:'culture-environment-summary.png',18:'culture-environment-summary.png',19:'culture-environment-summary.png',20:'culture-environment-summary.png',
    21:'culture-environment-summary.png',22:'culture-environment-summary.png',23:'culture-environment-summary.png',24:'culture-environment-summary.png',
    25:'culture-environment-summary.png',26:'culture-environment-summary.png',27:'culture-environment-summary.png',28:'culture-environment-summary.png',
    29:'culture-environment-summary.png',30:'culture-environment-summary.png',31:'culture-environment-summary.png',32:'culture-environment-summary.png',

    33:'culture-environment-summary.png',34:'culture-environment-summary.png',35:'culture-environment-summary.png',36:'culture-environment-summary.png',
    37:'culture-environment-summary.png',38:'culture-environment-summary.png',39:'culture-environment-summary.png',40:'culture-environment-summary.png',
    41:'culture-environment-summary.png',42:'culture-environment-summary.png',43:'culture-environment-summary.png',44:'culture-environment-summary.png',
    45:'culture-environment-summary.png',46:'culture-environment-summary.png',47:'culture-environment-summary.png',48:'culture-environment-summary.png'
  };

  const fallbackEmoji=q=>q.c.startsWith('A')?'🌿 🦌 🐟':q.c.startsWith('B')?'🏘️ 🌲 🤝':'🎋 🏠 🍲';

  renderVisual=function(q){
    const box=document.getElementById('visual');
    if(!box)return;
    box.innerHTML='';
    const file=(typeof selectedMode!=='undefined' && selectedMode==='test')
      ?(testById[q.id]||learningById[q.id])
      :learningById[q.id];

    const img=new Image();
    img.src='images/'+file+'?v=5';
    img.alt='原住民族文化與環境圖像記憶插圖';
    img.onload=()=>{
      box.innerHTML='';
      box.appendChild(img);
      const tag=document.createElement('span');
      tag.className='sourceTag';
      tag.textContent=(typeof selectedMode!=='undefined' && selectedMode==='test')
        ?'測驗模式｜中性情境圖'
        :'圖像記憶模式｜概念專屬圖';
      box.appendChild(tag);
    };
    img.onerror=()=>{
      box.innerHTML='<div class="fallback"><span class="emoji">'+fallbackEmoji(q)+'</span>原住民族文化與環境情境圖<br><span class="small">圖片載入中，不影響作答</span></div>';
    };
  };
})();