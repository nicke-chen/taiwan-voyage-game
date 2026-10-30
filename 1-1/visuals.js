(function(){
  const safeById = {
    // A｜世界與臺灣的位置
    1:'world-cute.webp',
    2:'world-cute.webp',
    3:'voyage-island-cute.webp',
    4:'voyage-island-cute.webp',
    5:'voyage-island-cute.webp',
    6:'voyage-island-cute.webp',
    7:'taiwan-ocean-cute.webp',
    8:'taiwan-ocean-cute.webp',
    9:'taiwan-summary-cute.webp',
    10:'taiwan-summary-cute.webp',
    11:'taiwan-summary-cute.webp',
    12:'taiwan-ocean-cute.webp',
    13:'taiwan-ocean-cute.webp',
    14:'world-cute.webp',
    15:'voyage-island-cute.webp',
    16:'taiwan-summary-cute.webp',

    // B｜人們適應氣候的生活方式
    17:'taiwan-summary-cute.webp',
    18:'winter-rain-cute.webp',
    19:'winter-rain-cute.webp',
    20:'winter-rain-cute.webp',
    21:'winter-rain-cute.webp',
    22:'summer-weather-cute.webp',
    23:'summer-weather-cute.webp',
    24:'summer-weather-cute.webp',
    25:'local-life-cute.webp',
    26:'local-life-cute.webp',
    27:'local-life-cute.webp',
    28:'local-life-cute.webp',
    29:'local-life-cute.webp',
    30:'local-life-cute.webp',
    31:'taiwan-summary-cute.webp',
    32:'taiwan-summary-cute.webp',

    // C｜生物遷徙的中繼站與發展
    33:'ocean-current-cute.webp',
    34:'ocean-current-cute.webp',
    35:'ocean-current-cute.webp',
    36:'ocean-current-cute.webp',
    37:'fish-market-cute.webp',
    38:'ocean-current-cute.webp',
    39:'ocean-current-cute.webp',
    40:'fish-market-cute.webp',
    41:'wetland-birds-cute.webp',
    42:'wetland-birds-cute.webp',
    43:'wetland-birds-cute.webp',
    44:'wetland-birds-cute.webp',
    45:'taiwan-summary-cute.webp',
    46:'taiwan-summary-cute.webp',
    47:'wetland-birds-cute.webp',
    48:'taiwan-summary-cute.webp'
  };

  const fallbackEmoji = q =>
    q.c.startsWith('A') ? '🌏 🧭 🚢' :
    q.c.startsWith('B') ? '🌬️ 🌧️ 🏡' :
    '🌊 🐟 🦢';

  renderVisual = function(q){
    const box = document.getElementById('visual');
    if(!box) return;
    box.innerHTML = '';

    const img = new Image();
    const file = safeById[q.id] || q.img;
    img.src = 'images/' + file + '?v=5';
    img.alt = '手繪主題情境圖';

    img.onload = () => {
      box.innerHTML = '';
      box.appendChild(img);
      const tag = document.createElement('span');
      tag.className = 'sourceTag';
      tag.textContent = '手繪情境圖｜符合題意｜不含答案文字';
      box.appendChild(tag);
    };

    img.onerror = () => {
      box.innerHTML =
        '<div class="fallback"><span class="emoji">' + fallbackEmoji(q) +
        '</span>主題情境圖載入中<br><span class="small">圖片不含答案文字，不影響作答</span></div>';
    };
  };
})();