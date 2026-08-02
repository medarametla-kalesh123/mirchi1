import React, { useState } from "react";

function ReportsMenu({ changePage }) {

  const [reportsOpen, setReportsOpen] = useState(false);
  const [financialReportsOpen, setFinancialReportsOpen] = useState(false);
  const [stockReportsOpen, setStockReportsOpen] = useState(false);
  const [misReportsOpen, setMisReportsOpen] = useState(false);
  const [deptReportsOpen, setDeptReportsOpen] = useState(false);

  const handleChangePage = (page) => {
    changePage(page);

    setReportsOpen(false);
    setFinancialReportsOpen(false);
    setStockReportsOpen(false);
    setMisReportsOpen(false);
    setDeptReportsOpen(false);
  };

  return (

    <div
      className="nav-item"
      onMouseEnter={() => setReportsOpen(true)}
      onMouseLeave={() => {
        setReportsOpen(false);
        setFinancialReportsOpen(false);
        setStockReportsOpen(false);
        setMisReportsOpen(false);
        setDeptReportsOpen(false);
      }}
    >

      <button
        className="menu-btn"
        onClick={() => handleChangePage("reports")}
      >
        Reports
      </button>

      {reportsOpen && (

        <div className="dropdown">

          {/* ================= Financial Reports ================= */}

          <div
            className="submenu-item"
            onMouseEnter={() => {
  setFinancialReportsOpen(true);
  setStockReportsOpen(false);
  setMisReportsOpen(false);
  setDeptReportsOpen(false);
}}
          >

            <div className="dropdown-item">
              Financial Reports
            </div>

            {financialReportsOpen && (

              <div
                className="submenu"
                onMouseLeave={() => setFinancialReportsOpen(false)}
              >

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("twocolumndaybook")}
                >
                  Two Column Day Book
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("fourcolumndaybookreport")}
                >
                  Four Column Day Book
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("ledgeraccount")}
                >
                  Ledger Account
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("trialbalance")}
                >
                  Trial Balance
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("balancesheet")}
                >
                  Balance Sheet
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("cashflow")}
                >
                  Cash Flow
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("profitlossaccount")}
                >
                  Profit &amp; Loss Account
                </div>

              </div>

            )}

          </div>

          {/* ================= Stock Reports ================= */}

          <div
            className="submenu-item"
            onMouseEnter={() => {
  setStockReportsOpen(true);
  setFinancialReportsOpen(false);
  setMisReportsOpen(false);
  setDeptReportsOpen(false);
}}
          >

            <div className="dropdown-item">
              Stock Reports
            </div>

            {stockReportsOpen && (

              <div
                className="submenu"
                onMouseLeave={() => setStockReportsOpen(false)}
              >

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("stockreport")}
                >
                  Report
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("itemslist")}
                >
                  Items List
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("pricediffreport")}
                >
                  Price Diff Report
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("farmerstockreport")}
                >
                  Farmer Stock Report (Cold Storage)
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("farmerstockstatement")}
                >
                  Farmer Stock Statement
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("townwisereport")}
                >
                  Town Wise Report
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("dailyreport")}
                >
                  Daily Report
                </div>

              </div>

            )}

          </div>
                    {/* ================= MIS Reports ================= */}

          <div
            className="submenu-item"
            onMouseEnter={() => {
  setMisReportsOpen(true);
  setFinancialReportsOpen(false);
  setStockReportsOpen(false);
  setDeptReportsOpen(false);
}}
          >

            <div className="dropdown-item">
              MIS Reports
            </div>

            {misReportsOpen && (

              <div
                className="submenu"
                onMouseLeave={() => setMisReportsOpen(false)}
              >

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("productanalysis")}
                >
                  Product Analysis
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("groupsettings")}
                >
                  Group Settings
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("monsummary")}
                >
                  Mon Summary Farmers & Traders
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("monthlyexpensesummary")}
                >
                  Monthly Expenditure Summary
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("monthlyincomesummary")}
                >
                  Monthly Income Summary
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("tradersduereport")}
                >
                  Traders Due Report
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("farmersduereport")}
                >
                  Farmers Due Report
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("coldstoragereport")}
                >
                  Cold Storage Report
                </div>

              </div>

            )}

          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("summaryreports")}
          >
            Summary Reports
          </div>

          {/* ================= Dept Reports ================= */}

          <div
            className="submenu-item"
            onMouseEnter={() => {
  setDeptReportsOpen(true);
  setFinancialReportsOpen(false);
  setStockReportsOpen(false);
  setMisReportsOpen(false);
}}
          >

            <div className="dropdown-item">
              Dept Reports
            </div>

            {deptReportsOpen && (

              <div
                className="submenu"
                onMouseLeave={() => setDeptReportsOpen(false)}
              >

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("traderamcreport")}
                >
                  Trader AMC Report
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("farmeramcreport")}
                >
                  Farmer AMC Report
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("exporterschillies")}
                >
                  Exporters Chillies
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("farmerschillies")}
                >
                  Farmers Chillies
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("tradersitreport")}
                >
                  Traders IT Report
                </div>

              </div>

            )}

          </div>

        </div>

      )}

    </div>

  );

}

export default ReportsMenu;