# 彭立勛博士 互動設計平台

Dr. Lihsun PENG’s Interactive Design Platform

公開網址：https://lihsunpeng.github.io/lihsun-studio/?v=2

這是包在三個既有專案外面的總入口。點卡片會用新分頁打開原本的網址，那三個專案的連結、倉庫都不會被改動。

## 三個既有專案（原網址不變）

- 台北建築島 https://lihsunpeng.github.io/taipei-arch-island/?v=50
- 3D 辦公室 https://lihsunpeng.github.io/lixun-office-3d/index.html?v=20261122c
- 希臘三柱式 3D https://lihsunpeng.github.io/greek-orders-3d/?v=4

## 如何新增一個專案

編輯 `projects.json`，在 `projects` 陣列加一筆，並把縮圖放到 `thumbs/`。欄位說明見 SOP。把「即將推出」佔位卡改成正式資料，或另加一筆都可以。改完後把 `index.html`、`styles.css`、`app.js` 裡的 `?v=` 與 `app.js` 的 `VERSION` 加一號，再發布。
