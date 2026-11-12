/**
 * YU · 基金觀察與保單資產總儀表板 - 前端驅動核心
 * 具備本地 file:// 離線保底與 http:// 動態 fetch 雙軌容錯機制
 */

// 官方真實數據（離線與直接開啟 file:// 之安全保底）
const DEFAULT_ACCOUNT_DATA = {
  client: {
    code: "YU",
    policyNumber: "000038776551318",
    productName: "安達人壽富貴大贏家變額萬能壽險戊型",
    status: "有效",
    currency: "TWD",
    currencySymbol: "NT$",
    effectiveDate: "2026/10/01",
    underwritingDate: "2026/10/13",
    firstInvestmentDate: "2026/10/27",
    lastEvaluationDate: "2026/11/12"
  },
  financials: {
    basicSumAssured: 2800000,
    lifeDeathBenefit: 2791307,
    singlePremium: 2000000,
    accumulatedPremiumPaid: 2000000,
    currentAccountValue: 1926349,
    netInvestmentCost: 1999641,
    totalFeesPaid: 9449,
    insuranceFeesDeducted: 8449,
    subscriptionFeesPaid: 1000,
    totalUnrealizedGain: -73292,
    totalRoi: -3.665,
    accountNetGrowth: -73651,
    accountNetGrowthRate: -3.683,
    totalClientEquity: 1935042,
    totalReturnWithCash: -64958,
    totalReturnRateWithCash: -3.248,
    accumulatedDividendsCash: 8693,
    estimatedMonthlyDividendMin: 8500,
    estimatedMonthlyDividendMax: 11000,
    loanPrincipal: 0,
    loanInterest: 0,
    loanRate: 4.3,
    loanRatio: 0.0
  },
  managerRisk: {
    managerTitle: "YU 專屬基金經理人",
    experienceSince: 1978,
    coreCreed: "行情不可預測，但應變必須預先鎖死。事前把所有可能情境的觸發點、數字、門檻與轉換標的全部編制成作戰手冊。",
    currentSignal: "YELLOW",
    currentSignalName: "一級警戒 / 戰術減震模式",
    moatWaterLevel: {
      currentValue: 192635,
      actualFeesDeducted: 8449,
      estimatedSurvivalMonths: 963
    }
  },
  holdings: [
    {
      code: "TCTPL003",
      name: "台灣股市50精選(3)",
      shortName: "台股50精選",
      priority: 1,
      allocationRatio: 0.10,
      units: 3121.6172,
      buyNav: 61.6280,
      buyAmount: 199065,
      fee: 1000,
      insuranceFeeDeducted: 8449,
      latestNav: 61.7100,
      navDate: "2026/11/12",
      currentValue: 192635,
      unrealizedGain: -6430,
      roi: -3.230,
      dividendType: "成長累積型",
      dividendMethod: "不配息（資本增值）",
      researchPage: "tctpl003_tw50_research.html",
      category: "台股龍頭股票型",
      color: "#2563eb"
    },
    {
      code: "BGTAL009",
      name: "安聯收益成長多重資產基金-B類型(月配息)-新臺幣",
      shortName: "安聯收益成長",
      priority: 2,
      allocationRatio: 0.30,
      units: 73373.105134,
      buyNav: 8.1800,
      buyAmount: 600192,
      fee: 0,
      cashDividendPaid: 3200,
      latestNav: 7.8762,
      navDate: "2026/11/12",
      currentValue: 577905,
      unrealizedGain: -22287,
      roi: -3.713,
      dividendType: "月配息",
      dividendMethod: "配現金 (匯出銀行)",
      researchPage: "bgtal009_allianz_research.html",
      category: "跨國多重資產型",
      color: "#059669"
    },
    {
      code: "BGTAB005",
      name: "聯博收益傘型基金之聯博多元資產收益組合基金-AI類型(新台幣)",
      shortName: "聯博多元資產",
      priority: 3,
      allocationRatio: 0.30,
      units: 94221.664050,
      buyNav: 6.3700,
      buyAmount: 600192,
      fee: 0,
      cashDividendPaid: 2800,
      latestNav: 6.1335,
      navDate: "2026/11/12",
      currentValue: 577905,
      unrealizedGain: -22287,
      roi: -3.713,
      dividendType: "月配息",
      dividendMethod: "配現金 (匯出銀行)",
      researchPage: "bgtab005_alliancebernstein_research.html",
      category: "全球多重資產組合型",
      color: "#0284c7"
    },
    {
      code: "BGTFT004",
      name: "富蘭克林華美多重資產收益基金-新台幣(分配型)",
      shortName: "富蘭克林華美多重資產",
      priority: 4,
      allocationRatio: 0.30,
      units: 70944.680851,
      buyNav: 8.4600,
      buyAmount: 600192,
      fee: 0,
      cashDividendPaid: 2693,
      latestNav: 8.1458,
      navDate: "2026/11/12",
      currentValue: 577904,
      unrealizedGain: -22288,
      roi: -3.713,
      dividendType: "月配息",
      dividendMethod: "配現金 (匯出銀行)",
      researchPage: "bgtft004_franklin_research.html",
      category: "多重資產收益型",
      color: "#7c3aed"
    }
  ]
};

const DEFAULT_TRANSACTIONS = [
  {
    id: "TX-20261013-001",
    date: "2026/10/13",
    type: "躉繳入帳",
    category: "premium",
    targetCode: "-",
    targetName: "安達人壽富貴大贏家變額萬能壽險戊型",
    amount: 2000000,
    fee: 0,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "第1年第1期 (躉繳保費)",
    status: "正常繳清"
  },
  {
    id: "TX-20261027-001",
    date: "2026/10/27",
    type: "標的申購",
    category: "buy",
    targetCode: "TCTPL003",
    targetName: "台灣股市50精選(3)",
    amount: 199065,
    fee: 1000,
    units: 3230.104392,
    price: 61.6280,
    exchangeRate: 1,
    summary: "首期投資配置 10%（扣費順位 1）",
    status: "已成交"
  },
  {
    id: "TX-20261027-002",
    date: "2026/10/27",
    type: "標的申購",
    category: "buy",
    targetCode: "BGTAL009",
    targetName: "安聯收益成長多重資產基金-B類型(月配息)-新臺幣 - (配現金)",
    amount: 600192,
    fee: 0,
    units: 73373.105134,
    price: 8.1800,
    exchangeRate: 1,
    summary: "首期投資配置 30%（扣費順位 2，配現金）",
    status: "已成交"
  },
  {
    id: "TX-20261027-003",
    date: "2026/10/27",
    type: "標的申購",
    category: "buy",
    targetCode: "BGTAB005",
    targetName: "聯博收益傘型基金之聯博多元資產收益組合基金-AI類型(新台幣) - (配現金)",
    amount: 600192,
    fee: 0,
    units: 94221.664050,
    price: 6.3700,
    exchangeRate: 1,
    summary: "首期投資配置 30%（扣費順位 3，配現金）",
    status: "已成交"
  },
  {
    id: "TX-20261027-004",
    date: "2026/10/27",
    type: "標的申購",
    category: "buy",
    targetCode: "BGTFT004",
    targetName: "富蘭克林華美多重資產收益基金-新台幣(分配型) - (配現金)",
    amount: 600192,
    fee: 0,
    units: 70944.680851,
    price: 8.4600,
    exchangeRate: 1,
    summary: "首期投資配置 30%（扣費順位 4，配現金）",
    status: "已成交"
  },
  {
    id: "TX-20261030-FEE1",
    date: "2026/10/30",
    type: "保費/費用扣除",
    category: "fee",
    targetCode: "TCTPL003",
    targetName: "台灣股市50精選(3) (扣費順位 1 扣除)",
    amount: 100,
    fee: 100,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "保單管理費/保單管理費之行政管理費",
    status: "已扣款完成"
  },
  {
    id: "TX-20261030-FEE2",
    date: "2026/10/30",
    type: "保費/費用扣除",
    category: "fee",
    targetCode: "TCTPL003",
    targetName: "台灣股市50精選(3) (扣費順位 1 扣除)",
    amount: 4000,
    fee: 4000,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "標的維護費/保單管理費/保單管理費之帳戶管理費",
    status: "已扣款完成"
  },
  {
    id: "TX-20261030-FEE3",
    date: "2026/10/30",
    type: "保費/費用扣除",
    category: "fee",
    targetCode: "TCTPL003",
    targetName: "台灣股市50精選(3) (扣費順位 1 扣除)",
    amount: 161,
    fee: 161,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "保險成本",
    status: "已扣款完成"
  },
  {
    id: "TX-20261103-FEE1",
    date: "2026/11/03",
    type: "保費/費用扣除",
    category: "fee",
    targetCode: "TCTPL003",
    targetName: "台灣股市50精選(3) (扣費順位 1 扣除)",
    amount: 100,
    fee: 100,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "保單管理費/保單管理費之行政管理費",
    status: "已扣款完成"
  },
  {
    id: "TX-20261103-FEE2",
    date: "2026/11/03",
    type: "保費/費用扣除",
    category: "fee",
    targetCode: "TCTPL003",
    targetName: "台灣股市50精選(3) (扣費順位 1 扣除)",
    amount: 3919,
    fee: 3919,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "標的維護費/保單管理費/保單管理費之帳戶管理費",
    status: "已扣款完成"
  },
  {
    id: "TX-20261103-FEE3",
    date: "2026/11/03",
    type: "保費/費用扣除",
    category: "fee",
    targetCode: "TCTPL003",
    targetName: "台灣股市50精選(3) (扣費順位 1 扣除)",
    amount: 169,
    fee: 169,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "保險成本",
    status: "已扣款完成"
  },
  {
    id: "TX-20261106-DIV01",
    date: "2026/11/06",
    type: "現金配息",
    category: "dividend",
    targetCode: "ALL3",
    targetName: "三大旗艦多重資產基金 (安聯+聯博+富蘭克林華美)",
    amount: 8693,
    fee: 0,
    units: 0,
    price: 0,
    exchangeRate: 1,
    summary: "首期收益分配提減撥回(現金)款項",
    status: "已匯入客戶銀行帳戶"
  }
];

let globalAccountData = DEFAULT_ACCOUNT_DATA;
let globalTransactions = DEFAULT_TRANSACTIONS;
let allocationChartInstance = null;
let performanceChartInstance = null;

// 工具函數：金額格式化
function formatCurrency(num) {
  if (num === null || num === undefined) return "NT$ 0";
  return "NT$ " + Math.round(num).toLocaleString('en-US');
}

function formatNumber(num, decimals = 4) {
  if (num === null || num === undefined) return "0";
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

// 初始化應用程式
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const accRes = await fetch("data/accounts.json");
    if (accRes.ok) {
      globalAccountData = await accRes.json();
    }
  } catch (e) {
    console.warn("使用本地保底 accounts 數據 (CORS / 離線環境相容)");
  }

  try {
    const txRes = await fetch("data/transactions.json");
    if (txRes.ok) {
      const txData = await txRes.json();
      globalTransactions = txData.transactions || DEFAULT_TRANSACTIONS;
    }
  } catch (e) {
    console.warn("使用本地保底 transactions 數據");
  }

  renderKPIs();
  renderHoldingsTable();
  renderTransactionsTable("all");
  renderCharts();
  renderManagerRadar();
  renderWarRoom();
});

// 渲染經理人全天候風控雷達 (index.html 首頁)
function renderManagerRadar() {
  const f = globalAccountData.financials;
  if (!f) return;

  const currentNav = f.currentAccountValue || 1926349;
  const yellowBuffer = currentNav - 1940000;
  const orangeBuffer = currentNav - 1880000;
  const redBuffer = currentNav - 1800000;

  const tw50 = (globalAccountData.holdings || []).find(h => h.code === "TCTPL003");
  const tw50Val = tw50 ? tw50.currentValue : 192635;

  const radarSignalPill = document.getElementById("radarSignalPill");
  if (radarSignalPill) {
    if (currentNav < 1940000 && currentNav >= 1880000) {
      radarSignalPill.className = "radar-signal-pill pill-yellow";
      radarSignalPill.innerHTML = `<span class="radar-pulse-dot" style="background: #d97706; box-shadow: 0 0 0 2px rgba(217, 119, 6, 0.25);"></span><span>🟡 黃燈 · 一級警戒 / 戰術減震模式</span>`;
    } else if (currentNav < 1880000 && currentNav >= 1800000) {
      radarSignalPill.className = "radar-signal-pill pill-orange";
      radarSignalPill.innerHTML = `<span class="radar-pulse-dot" style="background: #ea580c; box-shadow: 0 0 0 2px rgba(234, 88, 12, 0.25);"></span><span>🟠 橘燈 · 二級防禦 / 減震鎖本模式</span>`;
    } else if (currentNav < 1800000) {
      radarSignalPill.className = "radar-signal-pill pill-red";
      radarSignalPill.innerHTML = `<span class="radar-pulse-dot" style="background: #dc2626; box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.25);"></span><span>🔴 紅燈 · 三級極限 / 防空洞模式</span>`;
    } else {
      radarSignalPill.className = "radar-signal-pill";
      radarSignalPill.innerHTML = `<span class="radar-pulse-dot"></span><span>🟢 綠燈 · 常態巡航模式 (健康運作中)</span>`;
    }
  }

  const radarYellowEl = document.getElementById("radarYellowBuffer");
  if (radarYellowEl) {
    if (yellowBuffer < 0) {
      radarYellowEl.innerHTML = `<span style="color: #d97706;">已觸發一級警戒 (${formatCurrency(yellowBuffer)})</span>`;
    } else {
      radarYellowEl.textContent = `+${formatCurrency(yellowBuffer)} (+${((yellowBuffer / currentNav) * 100).toFixed(2)}%)`;
    }
  }

  const radarRedEl = document.getElementById("radarRedBuffer");
  if (radarRedEl) {
    radarRedEl.textContent = `+${formatCurrency(redBuffer)} (+${((redBuffer / currentNav) * 100).toFixed(2)}%)`;
  }

  const radarMoatEl = document.getElementById("radarMoatLevel");
  if (radarMoatEl) {
    radarMoatEl.textContent = `${formatCurrency(tw50Val)} (已扣繳 NT$ 8,449 費用)`;
  }

  const radarDirective = document.getElementById("radarDirective");
  if (radarDirective) {
    if (currentNav < 1940000) {
      radarDirective.innerHTML = `<span style="color: #fbbf24;">高頻防禦監控 · 保護高息本金</span>`;
    }
  }
}

// 渲染經理人作戰室 (manager_war_room.html)
function renderWarRoom() {
  const f = globalAccountData.financials;
  if (!f) return;

  const currentNav = f.currentAccountValue || 1926349;
  const yellowBuffer = currentNav - 1940000;
  const orangeBuffer = currentNav - 1880000;
  const redBuffer = currentNav - 1800000;

  const tw50 = (globalAccountData.holdings || []).find(h => h.code === "TCTPL003");
  const tw50Val = tw50 ? tw50.currentValue : 192635;
  const tw50Units = tw50 ? tw50.units : 3121.6172;

  const warroomTotalEl = document.getElementById("warroomTotalValuation");
  if (warroomTotalEl) warroomTotalEl.textContent = formatCurrency(currentNav);

  const warroomYellowEl = document.getElementById("warroomYellowBuffer");
  if (warroomYellowEl) {
    if (yellowBuffer < 0) {
      warroomYellowEl.textContent = `已觸發一級警戒 (${formatCurrency(yellowBuffer)})`;
    } else {
      warroomYellowEl.textContent = `+${formatCurrency(yellowBuffer)} (+${((yellowBuffer / currentNav) * 100).toFixed(2)}%)`;
    }
  }

  const warroomOrangeEl = document.getElementById("warroomOrangeBuffer");
  if (warroomOrangeEl) warroomOrangeEl.textContent = `+${formatCurrency(orangeBuffer)} (+${((orangeBuffer / currentNav) * 100).toFixed(2)}%)`;

  const warroomRedEl = document.getElementById("warroomRedBuffer");
  if (warroomRedEl) warroomRedEl.textContent = `+${formatCurrency(redBuffer)} (+${((redBuffer / currentNav) * 100).toFixed(2)}%)`;

  const warroomMoatValEl = document.getElementById("warroomMoatVal");
  if (warroomMoatValEl) warroomMoatValEl.textContent = formatCurrency(tw50Val);

  const warroomMoatUnitsEl = document.getElementById("warroomMoatUnits");
  if (warroomMoatUnitsEl) warroomMoatUnitsEl.textContent = `${formatNumber(tw50Units, 4)} 單位 (已扣除 NT$ 8,449 費用)`;
}

// 渲染 KPI 指標卡片
function renderKPIs() {
  const f = globalAccountData.financials;
  if (!f) return;
  
  // 1. 保單帳戶總價值
  const totalValEl = document.getElementById("totalValuation");
  if (totalValEl) totalValEl.textContent = formatCurrency(f.currentAccountValue);

  const totalCostEl = document.getElementById("totalCost");
  if (totalCostEl) {
    const sign = f.accountNetGrowth >= 0 ? "+" : "";
    totalCostEl.textContent = `原始躉繳: ${formatCurrency(f.singlePremium)} (帳面變動 ${sign}${formatCurrency(f.accountNetGrowth)})`;
  }

  // 2. 累計已領現金配息
  const totalDividendsEl = document.getElementById("totalDividends");
  if (totalDividendsEl) {
    totalDividendsEl.textContent = formatCurrency(f.accumulatedDividendsCash);
  }

  const dividendDescEl = document.getElementById("dividendDesc");
  if (dividendDescEl) {
    dividendDescEl.innerHTML = `<i class="fa-solid fa-check"></i> 首期配息已入帳 · 年化約 7~8% 現金流`;
  }

  // 3. 保單支出費用總額
  const totalDeductionsEl = document.getElementById("totalDeductions");
  if (totalDeductionsEl) {
    totalDeductionsEl.textContent = formatCurrency(f.insuranceFeesDeducted || 8449);
  }

  const deductionDescEl = document.getElementById("deductionDesc");
  if (deductionDescEl) {
    deductionDescEl.textContent = `累計 6 筆扣款 · 順位 1 台股50優先支應`;
  }

  // 4. 含息實質總權益
  const clientEquityEl = document.getElementById("clientEquity");
  if (clientEquityEl) {
    clientEquityEl.textContent = formatCurrency(f.totalClientEquity || 1935042);
  }

  const equityDescEl = document.getElementById("equityDesc");
  if (equityDescEl) {
    const retSign = (f.totalReturnWithCash || -64958) >= 0 ? "+" : "";
    equityDescEl.textContent = `含息損益: ${retSign}${formatCurrency(f.totalReturnWithCash)} (${retSign}${f.totalReturnRateWithCash.toFixed(2)}%)`;
  }

  // 5. 壽險身故保障總額
  const deathBenefitEl = document.getElementById("deathBenefit");
  if (deathBenefitEl) {
    deathBenefitEl.textContent = formatCurrency(f.lifeDeathBenefit || 2791307);
  }

  const deathBenefitDescEl = document.getElementById("deathBenefitDesc");
  if (deathBenefitDescEl) {
    deathBenefitDescEl.textContent = `基本保額 280 萬 - 已領現金 NT$ 8,693`;
  }
}

// 渲染持倉總表
function renderHoldingsTable() {
  const tbody = document.getElementById("holdingsTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  globalAccountData.holdings.forEach(h => {
    const tr = document.createElement("tr");

    const gainSign = h.unrealizedGain > 0 ? "+" : "";
    const gainColorClass = h.unrealizedGain > 0 ? "text-emerald" : (h.unrealizedGain < 0 ? "text-rose" : "text-secondary");

    const badgeClass = h.priority === 1 ? "badge-primary" : "badge-emerald";

    tr.innerHTML = `
      <td><span class="badge ${badgeClass}">順位 ${h.priority}</span></td>
      <td><strong>${h.code}</strong></td>
      <td>
        <div style="font-weight: 700; color: var(--text-primary);">${h.name}</div>
        <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
          ${h.category} · <span style="color: var(--color-primary); font-weight: 600;">${h.dividendMethod}</span>
        </div>
      </td>
      <td style="font-weight: 700;">${(h.allocationRatio * 100).toFixed(0)}%</td>
      <td>${formatNumber(h.units, 4)}</td>
      <td>NT$ ${h.buyNav.toFixed(4)}</td>
      <td>
        <div style="font-weight: 700;">NT$ ${h.latestNav.toFixed(4)}</div>
        <div style="font-size: 11px; color: var(--text-muted);">${h.navDate}</div>
      </td>
      <td style="font-weight: 800; font-size: 14.5px;">${formatCurrency(h.currentValue)}</td>
      <td class="${gainColorClass}" style="font-weight: 700;">
        ${gainSign}${formatCurrency(h.unrealizedGain)}
        <div style="font-size: 11px;">(${gainSign}${h.roi.toFixed(2)}%)</div>
      </td>
      <td>
        <a href="${h.researchPage}" class="table-link-btn">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> 深度研究
        </a>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// 渲染交易流水明細
function renderTransactionsTable(filter = "all") {
  const tbody = document.getElementById("transactionsTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const filtered = globalTransactions.filter(tx => {
    if (filter === "all") return true;
    if (filter === "buy") return tx.category === "buy";
    if (filter === "premium") return tx.category === "premium";
    if (filter === "fee") return tx.category === "fee";
    if (filter === "dividend") return tx.category === "dividend";
    return true;
  });

  filtered.forEach(tx => {
    const tr = document.createElement("tr");

    let badgeClass = "badge-primary";
    if (tx.category === "premium") badgeClass = "badge-gold";
    if (tx.category === "buy") badgeClass = "badge-cyan";
    if (tx.category === "fee") badgeClass = "badge-rose";
    if (tx.category === "dividend") badgeClass = "badge-emerald";

    tr.innerHTML = `
      <td><span style="font-size: 12px; color: var(--text-muted); font-family: monospace;">${tx.id}</span></td>
      <td><strong>${tx.date}</strong></td>
      <td><span class="badge ${badgeClass}">${tx.type}</span></td>
      <td>
        <div style="font-weight: 600;">${tx.targetName}</div>
        <div style="font-size: 11px; color: var(--text-muted); font-family: monospace;">${tx.targetCode} · ${tx.summary}</div>
      </td>
      <td style="font-weight: 800;">${formatCurrency(tx.amount)}</td>
      <td>${tx.units > 0 ? formatNumber(tx.units, 4) : "-"}</td>
      <td>${tx.price > 0 ? "NT$ " + tx.price.toFixed(4) : "-"}</td>
      <td>${tx.fee > 0 ? formatCurrency(tx.fee) : "NT$ 0"}</td>
      <td><span class="badge badge-emerald"><i class="fa-solid fa-check"></i> ${tx.status}</span></td>
    `;
    tbody.appendChild(tr);
  });

  const countEl = document.getElementById("transactionsCount");
  if (countEl) countEl.textContent = `共 ${filtered.length} 筆明細`;
}

// 交易流水篩選器
function filterTransactions(category, btnElement) {
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
  if (btnElement) btnElement.classList.add("active");
  renderTransactionsTable(category);
}

// 圖表繪製核心
function renderCharts() {
  renderAllocationChart();
  renderPerformanceChart();
}

// 圖表 1：資產配置環狀圖 (Doughnut)
function renderAllocationChart() {
  const ctx = document.getElementById("allocationChart");
  if (!ctx) return;

  if (allocationChartInstance) allocationChartInstance.destroy();

  const labels = globalAccountData.holdings.map(h => `${h.shortName} (${(h.allocationRatio * 100).toFixed(0)}%)`);
  const values = globalAccountData.holdings.map(h => h.currentValue);
  const colors = globalAccountData.holdings.map(h => h.color);

  allocationChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: colors,
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 14,
            padding: 14,
            font: { family: "'Plus Jakarta Sans', 'Noto Sans TC'", size: 12, weight: '600' },
            color: '#334155'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.raw || 0;
              const pct = ((val / globalAccountData.financials.currentAccountValue) * 100).toFixed(1);
              return ` ${context.label}: NT$ ${val.toLocaleString()} (${pct}%)`;
            }
          }
        }
      },
      cutout: '68%'
    }
  });
}

// 圖表 2：各標的現值與損益長條圖 (Bar Chart)
function renderPerformanceChart() {
  const ctx = document.getElementById("performanceChart");
  if (!ctx) return;

  if (performanceChartInstance) performanceChartInstance.destroy();

  const labels = globalAccountData.holdings.map(h => h.shortName);
  const costs = globalAccountData.holdings.map(h => h.buyAmount);
  const currentValues = globalAccountData.holdings.map(h => h.currentValue);

  performanceChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '申購成本 (NT$)',
          data: costs,
          backgroundColor: '#94a3b8',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        },
        {
          label: '目前帳戶現值 (NT$)',
          data: currentValues,
          backgroundColor: '#2563eb',
          borderRadius: 6,
          barPercentage: 0.6,
          categoryPercentage: 0.7
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#f1f5f9' },
          ticks: {
            callback: function(val) {
              return 'NT$ ' + (val / 10000).toFixed(0) + '萬';
            },
            font: { family: "'Plus Jakarta Sans'", size: 11 },
            color: '#64748b'
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            font: { family: "'Plus Jakarta Sans', 'Noto Sans TC'", size: 12, weight: '600' },
            color: '#334155'
          }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            boxWidth: 12,
            font: { family: "'Plus Jakarta Sans', 'Noto Sans TC'", size: 12, weight: '600' },
            color: '#334155'
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return ` ${context.dataset.label}: NT$ ${context.raw.toLocaleString()}`;
            }
          }
        }
      }
    }
  });
}
