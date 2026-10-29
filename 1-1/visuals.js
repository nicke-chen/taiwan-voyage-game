(function(){
  const safeById={
    1:'world-map-hd.webp',2:'world-map-hd.webp',3:'world-map-hd.webp',4:'world-map-hd.webp',5:'world-map-hd.webp',6:'world-map-hd.webp',
    7:'taiwan-ocean-hd.webp',8:'taiwan-ocean-hd.webp',9:'taiwan-ocean-hd.webp',10:'taiwan-ocean-hd.webp',11:'taiwan-ocean-hd.webp',
    12:'taiwan-ocean-hd.webp',13:'taiwan-ocean-hd.webp',14:'world-map-hd.webp',15:'world-map-hd.webp',16:'taiwan-ocean-hd.webp',
    17:'climate-life-hd.webp',18:'climate-life-hd.webp',19:'climate-life-hd.webp',20:'climate-life-hd.webp',21:'climate-life-hd.webp',
    22:'climate-life-hd.webp',23:'climate-life-hd.webp',24:'climate-life-hd.webp',25:'climate-life-hd.webp',26:'climate-life-hd.webp',
    27:'climate-life-hd.webp',28:'climate-life-hd.webp',29:'climate-life-hd.webp',30:'climate-life-hd.webp',31:'climate-life-hd.webp',32:'climate-life-hd.webp',
    33:'taiwan-ocean-hd.webp',34:'taiwan-ocean-hd.webp',35:'taiwan-ocean-hd.webp',36:'taiwan-ocean-hd.webp',37:'taiwan-ocean-hd.webp',
    38:'taiwan-ocean-hd.webp',39:'taiwan-ocean-hd.webp',40:'taiwan-ocean-hd.webp',41:'climate-life-hd.webp',42:'climate-life-hd.webp',
    43:'climate-life-hd.webp',44:'climate-life-hd.webp',45:'migration-ecology-hd.webp',46:'migration-ecology-hd.webp',47:'migration-ecology-hd.webp',48:'migration-ecology-hd.webp'
  };
  const fallbackEmoji=q=>q.c.startsWith('A')?'🌏 🧭 🚢':q.c.startsWith('B')?'🌬️ 🌧️ 🏡':'🌊 🐟 🦢';
  renderVisual=function(q){
    const box=document.getElementById('visual');if(!box)return;box.innerHTML='';
    const img=new Image();
    const file=safeById[q.id]||q.img;
    img.src='images/'+file+'?v=3';
    img.alt='主題情境圖';
    img.onload=()=>{box.innerHTML='';box.appendChild(img);const tag=document.createElement('span');tag.className='sourceTag';tag.textContent='情境記憶圖｜不含答案文字';box.appendChild(tag)};
    img.onerror=()=>{box.innerHTML='<div class="fallback"><span class="emoji">'+fallbackEmoji(q)+'</span>主題情境圖載入中<br><span class="small">圖片不含答案文字，不影響作答</span></div>'};
  };
})();