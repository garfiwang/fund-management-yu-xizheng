# 交接檔（handoff.md）

> 任何 Agent、任何電腦接手前**必讀**；收工時**必更新**。本檔只放交接必需的精簡資訊，詳細脈絡放 Obsidian（L3）。

## ⏯️ 目前做到哪
客戶代號 **YU**（保單號碼：`000038776551318`，安達人壽富貴大贏家）專屬基金觀察總儀表板建置完畢！
已依據資料夾內 8 張原始官方截圖完成真實數據提取、數學對齊驗證，並依客戶指定之「簡單、明亮、專業」風格開發完成總儀表板與 4 檔基金獨立研究子分頁。

## 🚦 目前狀態
- **前端視覺與計算核心**：
  - `index.html`：總儀表板就緒，具備 4 大 KPI 卡、雙互動圖表（攻守配置環狀圖＋各標的現值長條圖）、持倉總表與交易流水篩選。
  - `styles.css`：簡單明亮專業金融風格（Slate/Navy + Gold + Emerald）。
  - `app.js`：雙軌容錯驅動（支援直接雙擊開啟 `file://` 與 `http://` 伺服器動態 fetch）。
  - `tctpl003_tw50_research.html`：台灣股市50精選(3) 獨立研究子分頁。
  - `bgtal009_allianz_research.html`：安聯收益成長多重資產基金 獨立研究子分頁。
  - `bgtab005_alliancebernstein_research.html`：聯博多元資產收益組合基金 獨立研究子分頁。
  - `bgtft004_franklin_research.html`：富蘭克林華美多重資產收益基金 獨立研究子分頁。
- **資料庫**：
  - `data/accounts.json`、`data/fund_details.json`、`data/transactions.json`、`accounts/yu_portfolio.md` 皆已建置完成。
- **數據驗證結果**：
  - 保單帳戶價值：NT$ 2,003,461（未實現損益 +NT$ 3,820 / +0.191%）。
  - 投入本金：躉繳 NT$ 2,000,000（申購額 NT$ 1,999,641 ＋ 手續費 NT$ 1,000）。
  - 壽險保障：NT$ 2,800,000。
  - 配息模式：3 檔核心多重資產標的全數約定「配現金」至指定銀行帳戶。

## ➡️ 下一步
1. 追蹤 11 月份首期月配息入帳情況（預估每月約 NT$ 10,500 ~ 12,000），並將配息交易記錄寫入 `data/transactions.json`。
2. 同步追蹤各檔標的最新公告淨值（台股50精選已率先漲至 62.8107）。
3. GitHub Pages 線上發布已完成：[https://garfiwang.github.io/fund-management-yu-xizheng/](https://garfiwang.github.io/fund-management-yu-xizheng/)。

## ⚠️ 注意事項
- 遵循數據計算與權威驗證鐵律：嚴禁靜態估算，所有計算必須基於官方真實數據。
- 3 檔配息基金均為「配現金」，與舊案 Lee（配息再投入）之架構完全不同，切勿混淆。

## 🕐 最後更新
- 時間：2026-10-30 11:03
- 更新者：Antigravity @ Mac
- Git push：✅ 已推送到 GitHub [garfiwang/fund-management-yu-xizheng](https://github.com/garfiwang/fund-management-yu-xizheng)（公開倉庫）
- Pages：✅ 已啟用（[https://garfiwang.github.io/fund-management-yu-xizheng/](https://garfiwang.github.io/fund-management-yu-xizheng/)）

