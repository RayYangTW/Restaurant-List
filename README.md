# Restaurant-List

![image](./public/images/screenshot2.png)

## 介紹

一個餐廳清單，可以瀏覽餐廳、新增及刪除並查看詳細資訊並連結到 Google 地圖。

## 功能

- 查看所有餐廳
- 新增、刪除餐廳
- 瀏覽餐廳的詳細資訊
- 連結餐廳的地址到 Google 地圖
- 以餐廳名字或分類搜尋特定餐廳

## 開始使用

1. 請先確認有安裝 node.js 與 npm，版本詳見下方[開發工具](#開發工具)
2. 將專案 clone 到本地
3. 設定 MongoDB
   ```
   MONGODB_URI=mongodb+srv://<你的 MongoDB 帳號>:<你的 MongoDB 密碼>@cluster0.xxxx.xxxx.net/<你的 MongoDB 資料庫名稱><?retryWrites=true&w=majority
   ```
4. 建立種子資料

   ```bash
   npm run seed
   ```

5. 在本地開啟之後，透過終端機進入資料夾，輸入：

   ```bash
   npm install
   ```

6. 安裝完畢後，繼續輸入：

   ```bash
   npm run start
   ```

7. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址

   ```bash
   Restaurant List is listening on http://localhost:3000
   ```

8. 若欲暫停使用

   ```bash
   ctrl + c
   ```

## 開發工具

- Node.js 10.15.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- Bootstrap 5.1.3
- Font-awesome
- MongoDB
- Mongoose: 5.9.7
