import React from "react";
import "./ProfitLossAccount.css";

function ProfitLossAccount({ setPage }) {

  const profitLossData = [

    {
      debitAccount: "Cooli A/C",
      debitAmount: "25,585.50",
      creditAccount: "Commission A/C",
      creditAmount: "23,35,961.76",
    },

    {
      debitAccount: "Donation A/C",
      debitAmount: "1,11,600.00",
      creditAccount: "Interest Received A/C",
      creditAmount: "91,160.00",
    },

    {
      debitAccount: "Freight A/C",
      debitAmount: "2,95,506.65",
      creditAccount: "Interest Received A/C (F)",
      creditAmount: "80,405.00",
    },

    {
      debitAccount: "Import Cooli A/C",
      debitAmount: "7,86,233.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Interest Charges A/C (F)",
      debitAmount: "55,60,455.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Interest Charges A/C (T)",
      debitAmount: "3,33,617.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Kata Cooli A/C",
      debitAmount: "2,265.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Machu A/C",
      debitAmount: "59,865.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Office Rent A/C",
      debitAmount: "29,740.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Office Sadar",
      debitAmount: "38,840.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Price Difference A/C",
      debitAmount: "3,40,315.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Puririkossa A/C",
      debitAmount: "73,860.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Rasi Koli A/C",
      debitAmount: "7,615.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Retention Commission",
      debitAmount: "16,000.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Salary A/C",
      debitAmount: "4,60,000.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Stationery A/C",
      debitAmount: "45,955.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Tolakam A/C",
      debitAmount: "11,652.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Vehicle Maintenance A/C",
      debitAmount: "82,353.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Yard Sadar A/C",
      debitAmount: "7,07,704.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Yard Current Bill",
      debitAmount: "3,800.00",
      creditAccount: "",
      creditAmount: "",
    },

    {
      debitAccount: "Yard Discount A/C",
      debitAmount: "12,31,628.00",
      creditAccount: "",
      creditAmount: "",
    },

  ];

  return (

    <div className="profitloss-container">

      <h2 className="profitloss-title">
        Profit &amp; Loss Account
      </h2>

      <div className="filter-card">

        <div className="filter-grid">

          <div className="field">
            <label>Financial Year</label>
            <select>
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>
          </div>

          <div className="field">
            <label>From Date</label>
            <input type="date" />
          </div>

          <div className="field">
            <label>To Date</label>
            <input type="date" />
          </div>

          <div className="field">

            <label>&nbsp;</label>

            <button className="generate-btn">
              Generate Report
            </button>

          </div>

        </div>

      </div>

      {/* ================= Report Table ================= */}

      <div className="table-card">

        <div className="table-wrapper">

          <table className="profitloss-table">

            <thead>

              <tr>

                <th>Debit Account</th>

                <th>Debit Amount</th>

                <th>Credit Account</th>

                <th>Credit Amount</th>

              </tr>

            </thead>

            <tbody>

              {profitLossData.map((row, index) => (

                <tr key={index}>

                  <td>{row.debitAccount}</td>

                  <td className="amount">
                    {row.debitAmount}
                  </td>

                  <td>{row.creditAccount}</td>

                  <td className="amount">
                    {row.creditAmount}
                  </td>

                </tr>

              ))}
                          </tbody>

          </table>

        </div>

      </div>

      {/* ================= Summary ================= */}

      <div className="summary-section">

        <div className="summary-card">

          <div className="summary-row">
            <span>Total Debit</span>
            <strong>1,20,89,295.61</strong>
          </div>

          <div className="summary-row">
            <span>Total Credit</span>
            <strong>23,35,961.76</strong>
          </div>

          <div className="summary-row net-profit">
            <span>Net Profit</span>
            <strong>97,53,333.85</strong>
          </div>

        </div>

      </div>

      {/* ================= Buttons ================= */}

      <div className="report-buttons">

        <button
          className="secondary-btn"
          onClick={() => alert("Account Wise Report")}
        >
          Account Wise
        </button>

        <button
          className="secondary-btn"
          onClick={() => alert("Group Wise Report")}
        >
          Group Wise
        </button>

        <button
          className="secondary-btn"
          onClick={() => alert("Group / Account Report")}
        >
          Group / Account
        </button>

        <button
          className="info-btn"
          onClick={() => setPage("trialbalance")}
        >
          Trial Balance
        </button>

        <button
          className="primary-btn"
          onClick={() => setPage("balancesheet")}
        >
          Balance Sheet
        </button>

        <button
          className="success-btn"
          onClick={() => window.print()}
        >
          Print
        </button>

        <button
          className="danger-btn"
          onClick={() => setPage("dashboard")}
        >
          Close
        </button>

      </div>

    </div>

  );

}

export default ProfitLossAccount;