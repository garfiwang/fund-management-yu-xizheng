# YU - 基金觀察與保單資產管理（專案藍圖）

> 本檔為跨 Agent 通用的專案藍圖（AGENTS.md 開放標準）。任何 Agent 的每個 session 都應先讀本檔＋`handoff.md`。

## 專案簡介
客戶代號「YU」專屬基金理財保單與資產觀察專案（保單號碼：`000038776551318`，安達人壽富貴大贏家變額萬能壽險戊型）。負責追蹤「10% 台灣股市50精選 ＋ 90% 跨國三大旗艦多重資產」之攻守配置、記錄 12 筆完整初始躉繳、申購、兩期保單扣費與首期現金月配息交易流水明細、動態計算最新帳戶總價值（NT$ 1,926,349）、首期實領現金配息（NT$ 8,693）、實質總權益價值（NT$ 1,935,042）、壽險身故保障（NT$ 2,791,307，依約扣減撥回現金）、累計扣除保險相關費用（NT$ 8,449），並維護高質感「簡單、明亮、專業」視覺化總儀表板、4 檔基金獨立研究專頁與專屬基金經理人作戰室。

## 客戶簡介與保單策略目標
- **客戶代號**：YU（去識別化保護）
- **保單號碼**：`000038776551318`
- **幣別**：新臺幣 (TWD)
- **初始投資金額**：NT$ 2,000,000（2026/10/13 躉繳入帳，2026/10/27 首期投入配置，淨投資成本 NT$ 1,999,641，手續費 NT$ 1,000）
- **核心投資組合（4 檔）**：
  1. `TCTPL003` 台灣股市50精選(3)（扣費順位 1，配置 10%，積極成長累積型）
  2. `BGTAL009` 安聯收益成長多重資產基金-B類型(月配息)-新臺幣（扣費順位 2，配置 30%，月配現金）
  3. `BGTAB005` 聯博多元資產收益組合基金-AI類型(新台幣)（扣費順位 3，配置 30%，月配現金）
  4. `BGTFT004` 富蘭克林華美多重資產收益基金-新台幣(分配型)（扣費順位 4，配置 30%，月配現金）
- **管理模式**：三大高息標的全數約定 **「配現金」**（每月收益直接匯入客戶指定銀行帳戶）。
- **扣費策略**：階梯式扣費，優先由順位 1（台股50）扣除，保護三檔高息標的單位數。
- **身故保障**：基本保額 NT$ 2,800,000（已隨首期提減撥回現金調整為 NT$ 2,791,307）。

## 目標與路線圖
- [x] 階段一：讀取 8 張原始截圖，提取官方真實數據，並出具「線圖草稿（Wireframe Draft）」
- [x] 階段二：獲得客戶確認（視覺風格：簡單明亮專業；同步建置 4 檔子頁面）
- [x] 階段三：建置結構化真實資料庫（`data/accounts.json`、`data/fund_details.json`、`data/transactions.json`）
- [x] 階段四：開發 YU 專屬基金觀察總儀表板（`index.html`、`styles.css`、`app.js`）
- [x] 階段五：完成 4 檔基金獨立專屬深度研究子分頁（`tctpl003_tw50_research.html`、`bgtal009_allianz_research.html`、`bgtab005_alliancebernstein_research.html`、`bgtft004_franklin_research.html`）
- [x] 階段六：發布至 GitHub Pages 線上公開網頁（https://garfiwang.github.io/fund-management-yu-xizheng/）
- [x] 階段七：【專屬操盤】建立 YU 專屬基金經理人作戰室與極端情境作戰手冊（`manager_war_room.html`、`accounts/yu_manager_playbook.md`，歷經 1978 迄今實戰經驗鎖死五級警戒與標的轉換防禦機制）
- [x] 階段八：【保單費用扣繳】納入 2026/10/30 與 2026/11/03 兩筆保單扣款費用（小計 NT$ 8,449），由順位 1 台股50精選扣除單位數，保護順位 2~4 高息標的 100% 完整。
- [x] 階段九：【首期月配息入帳】納入 11 月份首期實質現金配息（NT$ 8,693），身故保額依約連動調整為 NT$ 2,791,307，五級風控雷達自動切換為「🟡 黃燈戰術減震模式」。
- [ ] 階段十：持續追蹤 12 月份第二期月配息與台股50水庫水位（黃燈防線緩衝 NT$ 46,349）。

## 資料夾結構
```
[Project] 基金管理-于席正/
├── .gitignore
├── .nojekyll
├── AGENTS.md
├── handoff.md
├── index.html                                    # 基金觀察總儀表板 (含經理人全天候量化風控雷達)
├── manager_war_room.html                         # YU 專屬基金經理人作戰室 (五級警戒燈號與四大極端劇本)
├── styles.css                                    # 專屬明亮專業金融樣式
├── app.js                                        # 雙軌容錯 (file:// 離線 + fetch) 驅動核心
├── tctpl003_tw50_research.html                   # 台灣股市50精選 (TCTPL003) 獨立研究子頁面
├── bgtal009_allianz_research.html                # 安聯收益成長 (BGTAL009) 獨立研究子頁面
├── bgtab005_alliancebernstein_research.html      # 聯博多元資產 (BGTAB005) 獨立研究子頁面
├── bgtft004_franklin_research.html               # 富蘭克林華美 (BGTFT004) 獨立研究子頁面
├── 截圖 2026-11-12 08.58.26.png                   # 保險相關費用查詢 (10/30 & 11/03 扣繳 NT$ 8,449)
├── 截圖 2026-11-12 09.03.12.png                   # 保單帳戶價值總額 (NT$ 1,926,349) 與身故保額截圖
├── accounts/
│   ├── yu_portfolio.md                           # 客戶 YU 檔案與投資組合深度說明
│   └── yu_manager_playbook.md                    # YU 專屬基金經理人極端情境作戰手冊 (1978 迄今實戰)
└── data/
    ├── accounts.json                             # 帳戶總覽、持倉數據與經理人五級風控量化參數
    ├── fund_details.json                         # 4 檔基金詳細資料與走勢歷史
    └── transactions.json                         # 交易流水明細（12 筆真實紀錄）
```

## 同步層級（本專案初始化至第 3 層級）

| 層級 | 平台 | 位置 | 讀取時機 |
|------|------|------|---------|
| L1 | 本地（GDrive） | `AGENTS.md`＋`handoff.md` | 每個 session |
| L2 | GitHub | [garfiwang/fund-management-yu-xizheng](https://github.com/garfiwang/fund-management-yu-xizheng)（[線上發布 Pages](https://garfiwang.github.io/fund-management-yu-xizheng/)） | 指定時 |
| L3 | Obsidian | `/Users/garfiwang/Documents/Obsidian/[Project] 基金管理-于席正/專案工作流程.md` | 有需要時 |


## 工作約定與數據驗證鐵律
- 任何 Agent、任何電腦：**開工先讀 `handoff.md`，收工必更新 `handoff.md`**
- **數據計算與權威驗證鐵律（強制遵守）**：
  1. **嚴禁使用任何靜態預估值、擬合數值或硬編碼估算**！
  2. 所有數值、指標、淨值、配息率、單位數、資產總值與 ROI 必須**基於官方權威資料來源公布之真實數據進行動態精確計算**。
  3. 跨頁面、跨卡片、跨組件的數據必須保持 100% 絕對數學加總對齊（例如：總匯總額 NT$ 2,003,461 等於四檔標的之和）。
