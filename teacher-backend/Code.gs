const SPREADSHEET_ID='1UCpXSwG-6m1J1mStY4IgdZOXOYZZ0BY7Cc7FFAN9_LQ';
const SUMMARY_SHEET='學習紀錄';
const DETAIL_SHEET='逐題紀錄';
const SYSTEM_SHEET='系統紀錄';
const BACKEND_VERSION='2026-10-04-v2';

function doGet(e){
  try{
    const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
    const action=(e&&e.parameter&&e.parameter.action)||'ping';
    if(action==='ping'){
      logSystem_(ss,'PING','成功','Web App 連線正常');
    }
    return json_({
      ok:true,
      service:'Taiwan Voyage Game tracking backend',
      version:BACKEND_VERSION,
      spreadsheet:ss.getName(),
      message:'Taiwan Voyage Game tracking backend is running.'
    });
  }catch(err){
    return json_({ok:false,version:BACKEND_VERSION,error:String(err)});
  }
}

function doPost(e){
  const lock=LockService.getScriptLock();
  try{
    lock.waitLock(10000);
    const data=JSON.parse((e&&e.postData&&e.postData.contents)||'{}');
    const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
    const now=new Date();

    const summary=getSheet_(ss,SUMMARY_SHEET,[
      '送出時間','Session ID','課程','單元','姓名','班級','座號','模式','作答秒數','得分','滿分','正確率','首次答對','錯題數','裝置','後端版本'
    ]);
    const s=data.student||{},r=data.result||{};
    summary.appendRow([
      now,data.sessionId||'',data.course||'',data.unit||'',s.name||'',s.className||'',s.seatNo||'',data.mode||'',
      data.durationSec||0,r.score??'',r.maxScore??'',r.accuracy||'',r.firstCorrect||'',r.wrongCount||'',data.userAgent||'',BACKEND_VERSION
    ]);

    const detail=getSheet_(ss,DETAIL_SHEET,[
      '送出時間','Session ID','姓名','班級','座號','模式','題目','章節','難度','題型','嘗試次數','使用提示','最後答對','作答秒數','後端版本'
    ]);
    const rows=(data.questions||[]).map(q=>[
      now,data.sessionId||'',s.name||'',s.className||'',s.seatNo||'',data.mode||'',q.title||'',q.chapter||'',q.level||'',q.type||'',
      q.attempts||0,q.hintUsed?'是':'否',q.correct?'是':'否',q.durationSec||0,BACKEND_VERSION
    ]);
    if(rows.length){
      detail.getRange(detail.getLastRow()+1,1,rows.length,rows[0].length).setValues(rows);
    }

    logSystem_(ss,'SUBMIT','成功',`Session=${data.sessionId||''}; 題數=${rows.length}; 姓名=${s.name||''}; 班級=${s.className||''}; 座號=${s.seatNo||''}`);
    return json_({ok:true,version:BACKEND_VERSION,sessionId:data.sessionId||'',questionRows:rows.length});
  }catch(err){
    try{
      const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
      logSystem_(ss,'SUBMIT','失敗',String(err));
    }catch(ignore){}
    return json_({ok:false,version:BACKEND_VERSION,error:String(err)});
  }finally{
    try{lock.releaseLock();}catch(ignore){}
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
  }else if(sh.getLastColumn()<headers.length){
    sh.getRange(1,1,1,headers.length).setValues([headers]);
    sh.setFrozenRows(1);
    sh.getRange(1,1,1,headers.length).setFontWeight('bold');
  }
  return sh;
}

function logSystem_(ss,event,status,message){
  const sh=getSheet_(ss,SYSTEM_SHEET,['時間','事件','狀態','訊息','後端版本']);
  sh.appendRow([new Date(),event,status,message||'',BACKEND_VERSION]);
}

function json_(obj){
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
