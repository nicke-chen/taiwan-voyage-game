# 教師端 Google Sheet 學習紀錄設定

網站已具備學習紀錄功能；完成以下一次性設定後，學生每次完成測驗就會自動送到 Google Sheet。

## 1. 建立 Google 試算表
建立一份空白 Google Sheet，例如：`115社會5上2-1 學習紀錄`。

## 2. 開啟 Apps Script
在試算表中選：`擴充功能 → Apps Script`。

## 3. 貼上後端程式
刪除原本內容，把本資料夾的 `Code.gs` 全部貼上並儲存。

## 4. 部署成 Web App
Apps Script 右上角：`部署 → 新增部署作業 → 類型：網頁應用程式`。

設定：
- 執行身分：我
- 誰可以存取：任何人

按「部署」並完成 Google 授權。

## 5. 複製 Web App URL
部署成功後會得到類似：
`https://script.google.com/macros/s/XXXXXXXXXXXX/exec`

## 6. 回到 GitHub 修改 tracking-config.js
把：
```js
endpoint:''
```
改成：
```js
endpoint:'https://script.google.com/macros/s/XXXXXXXXXXXX/exec'
```

提交後 GitHub Pages 重新部署，教師端紀錄即正式啟用。

## 會產生兩張工作表
### 學習紀錄
每位學生每次完成一列：姓名、班級、座號、模式、作答時間、得分、正確率、首次答對、錯題數、裝置。

### 逐題紀錄
每題一列：題目、章節、難度、題型、嘗試次數、是否使用提示、最後是否答對、作答秒數。

## 教學建議
只收集教學需要的欄位；學生姓名若不需要，可改為只填班級與座號。
