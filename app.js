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
    lastEvaluationDate: "2026/10/30"
  },
  financials: {
    basicSumAssured: 2800000,
    lifeDeathBenefit: 2800000,
    singlePremium: 2000000,
    accumulatedPremiumPaid: 2000000,
    currentAccountValue: 2003461,
    netInvestmentCost: 1999641,
    totalFeesPaid: 1000,
    totalUnrealizedGain: 3820,
    totalRoi: 0.191,
    accountNetGrowth: 3461,
    accountNetGrowthRate: 0.173,
    accumulatedDividendsCash: 0,
    estimatedMonthlyDividendMin: 10500,
    estimatedMonthlyDividendMax: 12000,
    loanPrincipal: 0,
    loanInterest: 0,
    loanRate: 4.3,
    loanRatio: 0.0
  },
  holdings: [
    {
      code: "TCTPL003",
      name: "台灣股市50精選(3)",
      shortName: "台股50精選",
      priority: 1,
      allocationRatio: 0.10,
      units: 3230.104392,
      buyNav: 61.6280,
      buyAmount: 199065,
      fee: 1000,
      latestNav: 62.8107,
      navDate: "2026/10/28",
      currentValue: 202885,
      unrealizedGain: 3820,
      roi: 1.919,
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
      latestNav: 8.1800,
      navDate: "2026/10/27",
      currentValue: 600192,
      unrealizedGain: 0,
      roi: 0.000,
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
      latestNav: 6.3700,
      navDate: "2026/10/27",
      currentValue: 600192,
      unrealizedGain: 0,
      roi: 0.000,
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
      latestNav: 8.4600,
      navDate: "2026/10/27",
      currentValue: 600192,
      unrealizedGain: 0,
      roi: 0.000,
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
});

// 渲染 KPI 指標卡片
function renderKPIs() {
  const f = globalAccountData.financials;
  
  // 保單帳戶總價值
  const totalValEl = document.getElementById("totalValuation");
  if (totalValEl) totalValEl.textContent = formatCurrency(f.currentAccountValue);

  const totalCostEl = document.getElementById("totalCost");
  if (totalCostEl) {
    totalCostEl.textContent = `原始躉繳: ${formatCurrency(f.singlePremium)} (帳面增值 +${formatCurrency(f.accountNetGrowth)})`;
  }

  // 投資部位未實現損益
  const unrealizedGainEl = document.getElementById("unrealizedGain");
  if (unrealizedGainEl) {
    const sign = f.totalUnrealizedGain >= 0 ? "+" : "";
    unrealizedGainEl.textContent = `${sign}${formatCurrency(f.totalUnrealizedGain)} (${sign}${f.totalRoi.toFixed(2)}%)`;
  }

  const gainDescEl = document.getElementById("gainDesc");
  if (gainDescEl) {
    gainDescEl.textContent = `淨投資: ${formatCurrency(f.netInvestmentCost)} · 台股領漲 +1.92%`;
  }

  // 預估月配息現金流
  const estDividendEl = document.getElementById("estimatedDividend");
  if (estDividendEl) {
    estDividendEl.textContent = `約 NT$ ${f.estimatedMonthlyDividendMin.toLocaleString()} ~ ${f.estimatedMonthlyDividendMax.toLocaleString()}`;
  }

  // 身故保障總額
  const deathBenefitEl = document.getElementById("deathBenefit");
  if (deathBenefitEl) {
    deathBenefitEl.textContent = formatCurrency(f.lifeDeathBenefit);
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
    const gainColorClass = h.unrealizedGain > 0 ? "text-emerald" : "text-secondary";

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
    return true;
  });

  filtered.forEach(tx => {
    const tr = document.createElement("tr");

    let badgeClass = "badge-primary";
    if (tx.category === "premium") badgeClass = "badge-gold";
    if (tx.category === "buy") badgeClass = "badge-cyan";

    tr.innerHTML = `
      <td><span style="font-size: 12px; color: var(--text-muted); font-family: monospace;">${tx.id}</span></td>
      <td><strong>${tx.date}</strong></td>
      <td><span class="badge ${badgeClass}">${tx.type}</span></td>
      <td>
        <div style="font-weight: 600;">${tx.targetName}</div>
        <div style="font-size: 11px; color: var(--text-muted); font-family: monospace;">${tx.targetCode}</div>
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
