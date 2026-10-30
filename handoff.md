# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（L3）。

## ⏯️ 目前做到哪
客戶代號 **YU**（保單號碼：`000038776551318`，安達人壽富貴大贏家）專屬基金觀察總儀表板與 4 檔基金獨立研究專頁建置完成，並已成功發布至 GitHub Pages 線上公開網頁（HTTP 200 正常運行）。

## 🚦 目前狀態
- **線上發布網址**：[https://garfiwang.github.io/fund-management-yu-xizheng/](https://garfiwang.github.io/fund-management-yu-xizheng/)
- **GitHub 儲存庫**：[garfiwang/fund-management-yu-xizheng](https://github.com/garfiwang/fund-management-yu-xizheng)（Public）
- **頁面清單**：
  - `index.html`：基金觀察總儀表板（簡單、明亮、專業金融風格，4 大 KPI 卡片、雙互動圖表、持倉總表、交易流水篩選）
  - `tctpl003_tw50_research.html`：台灣股市50精選(3) 獨立研究專頁
  - `bgtal009_allianz_research.html`：安聯收益成長多重資產基金 獨立研究專頁
  - `bgtab005_alliancebernstein_research.html`：聯博多元資產收益組合基金 獨立研究專頁
  - `bgtft004_franklin_research.html`：富蘭克林華美多重資產收益基金 獨立研究專頁
- **數據與資產概況**：
  - 目前帳戶總價值：**NT$ 2,003,461**（原始躉繳 NT$ 2,000,000，帳面增值 +NT$ 3,461）
  - 投資部位未實現損益：**+NT$ 3,820**（**+0.191%**，台股50精選率先上漲至 62.8107，獲利 +1.92%）
  - 預估每月配息現金流：約 **NT$ 10,500 ~ 12,000**（全數約定「配現金」至指定銀行帳戶）
  - 壽險身故保障：**NT$ 2,800,000**（保障倍數 140%）

## ➡️ 下一步（下次開工重點）
1. **【重要待辦】加入保單扣繳費用金額**：
   - 待保單產生次月保單管理費、保單行政費或行政相關扣繳時，記錄實際扣繳金額。
   - 依保單約定之扣費順位：**順位 1 台灣股市50精選(3)** 優先扣除相應單位數，保護順位 2~4 之三大高息多重資產標的單位數。
   - 同步更新 `data/accounts.json`、`data/transactions.json`，並在儀表板「保單支出費用」指標卡與交易流水明細中動態呈現。
2. **追蹤首期配息入帳**：追蹤 11 月份首期月配息入帳明細，核對 3 檔配息基金實際發放金額與除息淨值。
3. **淨值動態更新**：持續追蹤 4 檔基金最新官方公告淨值，動態刷新帳戶總市值與未實現損益。

## ⚠️ 注意事項
- 遵循數據計算與權威驗證鐵律：嚴禁靜態估算，所有計算必須基於官方真實數據。
- 扣費順位順序嚴格固定：1. 台股50 (10%) ➔ 2. 安聯 (30%) ➔ 3. 聯博 (30%) ➔ 4. 富蘭克林 (30%)。
- 配息方式為「配現金」（匯出指定帳戶），與舊案 Lee（自動再投入滾入單位數）不同，帳戶總價值主要由淨值波動與費用扣除決定。

## 🕐 最後更新
- 時間：2026-10-30 22:33
- 更新者：Antigravity @ Mac
- Git push：✅ 已推送到 GitHub [garfiwang/fund-management-yu-xizheng](https://github.com/garfiwang/fund-management-yu-xizheng)
- Pages：✅ 已啟用（[https://garfiwang.github.io/fund-management-yu-xizheng/](https://garfiwang.github.io/fund-management-yu-xizheng/)）
