## 進銷存系統 POS System

- 入庫：從物業收貨時，紀錄商品入庫資訊：
  - 品項、細目
  - 數量、金額
  - 即期日、折扣
- 結帳：客戶購買商品時，紀錄銷售資訊
  - 當前庫存數量
  - 要區分不同即期日之商品
- 查詢：
  - 當前庫存數量
  - 當日結帳清單、營收，可切換日期區間

<br>

## Tech Stack

- 使用 React Ant Design UI 建置庫存管理、進貨等功能。
- 使用 Express.js, Google Sheet 做為資料庫。
  <div >
    <img src="./src/static/sheet2.png" width="350">
  </div >
- 前後端分離，後端另外部署至 heroku。
- 在切換頁面時，使用 AbortController 取消撈取 API。

<br>

## Available Scripts

`npm run deploy`：react-scripts build and deploy to github.
