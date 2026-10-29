(function(){
  const safeById={
    1:'world-map-scene.webp',2:'world-map-scene.webp',3:'voyage-map-scene.webp',4:'voyage-map-scene.webp',5:'voyage-map-scene.webp',6:'voyage-map-scene.webp',
    7:'taiwan-coast-scene.webp',8:'taiwan-coast-scene.webp',9:'taiwan-coast-scene.webp',10:'taiwan-coast-scene.webp',11:'taiwan-coast-scene.webp',
    12:'taiwan-coast-scene.webp',13:'taiwan-coast-scene.webp',14:'world-map-scene.webp',15:'voyage-map-scene.webp',16:'taiwan-coast-scene.webp',
    17:'winter-rain-scene.webp',18:'winter-rain-scene.webp',19:'winter-rain-scene.webp',20:'winter-rain-scene.webp',21:'winter-rain-scene.webp',
    22:'summer-coast-scene.webp',23:'summer-coast-scene.webp',24:'summer-coast-scene.webp',25:'climate-building-scene.webp',26:'climate-building-scene.webp',
    27:'climate-building-scene.webp',28:'climate-building-scene.webp',29:'climate-building-scene.webp',30:'climate-building-scene.webp',31:'summer-coast-scene.webp',32:'climate-building-scene.webp',
    33:'ocean-current-scene.webp',34:'ocean-current-scene.webp',35:'ocean-current-scene.webp',36:'ocean-current-scene.webp',37:'ocean-current-scene.webp',
    38:'ocean-current-scene.webp',39:'ocean-current-scene.webp',40:'ocean-industry-scene.webp',41:'wetland-birds-scene.webp',42:'wetland-birds-scene.webp',
    43:'wetland-birds-scene.webp',44:'wetland-birds-scene.webp',45:'ocean-current-scene.webp',46:'ocean-current-scene.webp',47:'wetland-birds-scene.webp',48:'ocean-current-scene.webp'
  };
  const fallbackEmoji=q=>q.c.startsWith('A')?'🌏 🧭 🚢':q.c.startsWith('B')?'🌬️ 🌧️ 🏡':'🌊 🐟 🦢';
  renderVisual=function(q){
    const box=document.getElementById('visual');if(!box)return;box.innerHTML='';
    const img=new Image();
    const file=safeById[q.id]||q.img;
    img.src='images/'+file+'?v=1';
    img.alt='主題情境圖';
    img.onload=()=>{box.innerHTML='';box.appendChild(img);const tag=document.createElement('span');tag.className='sourceTag';tag.textContent='情境記憶圖｜不含答案文字';box.appendChild(tag)};
    img.onerror=()=>{box.innerHTML='<div class="fallback"><span class="emoji">'+fallbackEmoji(q)+'</span>主題情境圖載入中<br><span class="small">圖片不含答案文字，不影響作答</span></div>'};
  };
})();