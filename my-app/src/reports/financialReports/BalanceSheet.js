import React, { useState } from "react";
import "./BalanceSheet.css";

function BalanceSheet({ setPage }) {

  const [viewType, setViewType] = useState("Account Wise");
  const [laserPrint, setLaserPrint] = useState(false);

  const liabilities = [
    {
      account: "Capital Account",
      amount: "2,50,00,000.00",
    },
    {
      account: "Loans",
      amount: "45,75,000.00",
    },
    {
      account: "Creditors",
      amount: "38,25,400.00",
    },
    {
      account: "Outstanding Expenses",
      amount: "7,10,250.00",
    },
    {
      account: "Current Liabilities",
      amount: "23,16,500.00",
    },
  ];

  const assets = [
    {
      account: "Cash In Hand",
      amount: "22,35,040.05",
    },
    {
      account: "Bank Balance",
      amount: "1,08,45,000.00",
    },
    {
      account: "Debtors",
      amount: "1,20,56,000.00",
    },
    {
      account: "Cold Storage Stock",
      amount: "54,20,500.00",
    },
    {
      account: "Fixed Assets",
      amount: "58,70,609.95",
    },
  ];

  return (

    <div className="balancesheet-container">

      <h2 className="balancesheet-title">
        Balance Sheet
      </h2>

      <p className="financial-year">
        For Financial Year 2025-2026
      </p>

      <div className="balancesheet-card">

        <div className="table-wrapper">

          <table className="balancesheet-table">

            <thead>

              <tr>

                <th>Liabilities</th>
                <th>Amount (₹)</th>
                <th>Assets</th>
                <th>Amount (₹)</th>

              </tr>

            </thead>

            <tbody>

              {Array.from({
                length: Math.max(
                  liabilities.length,
                  assets.length
                ),
              }).map((_, index) => (

                <tr key={index}>

                  <td>
                    {liabilities[index]?.account || ""}
                  </td>

                  <td className="amount">
                    {liabilities[index]?.amount || ""}
                  </td>

                  <td>
                    {assets[index]?.account || ""}
                  </td>

                  <td className="amount">
                    {assets[index]?.amount || ""}
                  </td>

                </tr>

              ))}

              <tr className="total-row">

                <td>
                  <strong>Total</strong>
                </td>

                <td className="amount">
                  <strong>3,64,91,277.14</strong>
                </td>

                <td>
                  <strong>Total</strong>
                </td>

                <td className="amount">
                  <strong>3,69,26,888.23</strong>
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* ===== Bottom Section Starts in Part 2 ===== */}
            {/* ================= Bottom Controls ================= */}

      <div className="bottom-section">

        {/* Left Side */}

        <div className="view-buttons">

          <button
            className={
              viewType === "Account Wise"
                ? "view-btn active"
                : "view-btn"
            }
            onClick={() => setViewType("Account Wise")}
          >
            Account Wise
          </button>

          <button
            className={
              viewType === "Group Wise"
                ? "view-btn active"
                : "view-btn"
            }
            onClick={() => setViewType("Group Wise")}
          >
            Group Wise
          </button>

          <button
            className={
              viewType === "Group/Account"
                ? "view-btn active"
                : "view-btn"
            }
            onClick={() => setViewType("Group/Account")}
          >
            Group / Account
          </button>

        </div>

        {/* Right Side */}

        <div className="action-section">

          <label className="laser-print">

            <input
              type="checkbox"
              checked={laserPrint}
              onChange={(e) =>
                setLaserPrint(e.target.checked)
              }
            />

            Laser Print

          </label>

          <button
            className="trial-btn"
            onClick={() => setPage("trialbalance")}
          >
            Trial Balance
          </button>

          <button
            className="profit-btn"
            onClick={() => setPage("profitlossaccount")}
          >
            Profit &amp; Loss A/C
          </button>

          <button
            className="print-btn"
            onClick={() => window.print()}
          >
            Print
          </button>

          <button
            className="close-btn"
            onClick={() => setPage("dashboard")}
          >
            Close
          </button>

        </div>

      </div>

    </div>

  );

}

export default BalanceSheet;