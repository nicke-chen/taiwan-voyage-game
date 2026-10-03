const SUMMARY_SHEET='學習紀錄';
const DETAIL_SHEET='逐題紀錄';

function doGet(){
  return ContentService.createTextOutput('Taiwan Voyage Game tracking backend is running.');
}

function doPost(e){
  try{
    const data=JSON.parse((e.postData&&e.postData.contents)||'{}');
    const ss=SpreadsheetApp.getActiveSpreadsheet();
    const summary=getSheet_(ss,SUMMARY_SHEET,[
      '送出時間','Session ID','課程','單元','姓名','班級','座號','模式','作答秒數','得分','滿分','正確率','首次答對','錯題數','裝置'
    ]);
    const s=data.student||{},r=data.result||{};
    summary.appendRow([
      new Date(),data.sessionId||'',data.course||'',data.unit||'',s.name||'',s.className||'',s.seatNo||'',data.mode||'',
      data.durationSec||0,r.score??'',r.maxScore??'',r.accuracy||'',r.firstCorrect||'',r.wrongCount||'',data.userAgent||''
    ]);

    const detail=getSheet_(ss,DETAIL_SHEET,[
      '送出時間','Session ID','姓名','班級','座號','模式','題目','章節','難度','題型','嘗試次數','使用提示','最後答對','作答秒數'
    ]);
    (data.questions||[]).forEach(q=>detail.appendRow([
      new Date(),data.sessionId||'',s.name||'',s.className||'',s.seatNo||'',data.mode||'',q.title||'',q.chapter||'',q.level||'',q.type||'',
      q.attempts||0,q.hintUsed?'是':'否',q.correct?'是':'否',q.durationSec||0
    ]));

    return json_({ok:true});
  }catch(err){
    return json_({ok:false,error:String(err)});
  }
}

function getSheet_(ss,name,headers){
  let sh=ss.getSheetByName(name);
  if(!sh)sh=ss.insertSheet(name);
  if(sh.getLastRow()===0){
    sh.appendRow(headers);
    sh.setFrozenRows(1);
    sh.getRange(1,1,1,headers.length).setFontWeight('bold');
    sh.autoResizeColumns(1,headers.length);
  }
  return sh;
}

function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
