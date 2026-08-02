import React, { useState } from "react";
import "./TrialBalance.css";

function TrialBalance({ setPage }) {

  const [tbType, setTbType] = useState("Account Wise");
  const [balanceType, setBalanceType] = useState("Current Balances");
  const [date, setDate] = useState("");
  const [balanceOnly, setBalanceOnly] = useState(false);
  const [laserPrint, setLaserPrint] = useState(false);
  const [groupWise, setGroupWise] = useState(false);
  const [continuousPrint, setContinuousPrint] = useState(false);

  const trialBalanceData = [
    {
      sno: 1,
      account: "AACHI SPECIAL FOODS (P) LTD",
      debit: "11,85,178.00",
      credit: "0.00",
    },
    {
      sno: 2,
      account: "AGRO HAAT RETAIL (P) LTD",
      debit: "2,86,862.50",
      credit: "0.00",
    },
    {
      sno: 3,
      account: "AGROCROPS SPICE INDIA (P) LTD",
      debit: "3,83,367.50",
      credit: "0.00",
    },
    {
      sno: 4,
      account: "AMBE EXPORTS",
      debit: "1,17,720.00",
      credit: "0.00",
    },
    {
      sno: 5,
      account: "AMMAN TRADERS",
      debit: "1,75,260.00",
      credit: "0.00",
    },
    {
      sno: 6,
      account: "ANITHA CHILLIES",
      debit: "1,35,265.00",
      credit: "0.00",
    },
    {
      sno: 7,
      account: "ABIGELA VENKATARAMAIAH",
      debit: "0.00",
      credit: "90,000.00",
    },
    {
      sno: 8,
      account: "AVINTHI COLD STORAGES",
      debit: "480.00",
      credit: "0.00",
    },
    {
      sno: 9,
      account: "BANKA SPICES INTERNATIONAL",
      debit: "27,11,707.52",
      credit: "0.00",
    },
    {
      sno: 10,
      account: "BATHULA SATHISH",
      debit: "0.00",
      credit: "1,10,000.00",
    },
  ];

  return (

    <div className="trialbalance-container">

      <h2 className="trialbalance-title">
        Trial Balance
      </h2>

      {/* ================= Main Layout ================= */}

      <div className="trialbalance-layout">

        {/* ================= Left Side ================= */}

        <div className="table-card">

          <div className="table-wrapper">

            <table className="trialbalance-table">

              <thead>

                <tr>
                  <th>S.No</th>
                  <th>Account Name</th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>

              </thead>

              <tbody>

                {trialBalanceData.map((row) => (

                  <tr key={row.sno}>

                    <td>{row.sno}</td>

                    <td>{row.account}</td>

                    <td className="amount">
                      {row.debit}
                    </td>

                    <td className="amount">
                      {row.credit}
                    </td>

                  </tr>

                ))}

                <tr className="total-row">

                  <td colSpan="2">
                    <strong>Totals</strong>
                  </td>

                  <td className="amount">
                    <strong>18,20,33,299.89</strong>
                  </td>

                  <td className="amount">
                    <strong>18,15,96,878.80</strong>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          <div className="difference-box">

            <span className="difference-text">
              Debit is More :
            </span>

            <strong>
              ₹ 4,36,421.09
            </strong>

          </div>

        </div>

        {/* ================= Right Side ================= */}

        <div className="control-panel">

          <div className="panel-card">

            <h3>TB Type</h3>

            <button
              className={
                tbType === "Account Wise"
                  ? "panel-btn active"
                  : "panel-btn"
              }
              onClick={() => setTbType("Account Wise")}
            >
              Account Wise
            </button>

            <button
              className={
                tbType === "Group Wise"
                  ? "panel-btn active"
                  : "panel-btn"
              }
              onClick={() => setTbType("Group Wise")}
            >
              Group Wise
            </button>

          </div>

          <div className="panel-card">

            <h3>Balances</h3>

            <button
              className={
                balanceType === "Current Balances"
                  ? "panel-btn active"
                  : "panel-btn"
              }
              onClick={() =>
                setBalanceType("Current Balances")
              }
            >
              Current Balances
            </button>

            <button
              className={
                balanceType === "Opening Balances"
                  ? "panel-btn active"
                  : "panel-btn"
              }
              onClick={() =>
                setBalanceType("Opening Balances")
              }
            >
              Opening Balances
            </button>

          </div>
                    {/* ================= Filters ================= */}

          <div className="panel-card">

            <div className="checkbox-row">

              <label>
                <input
                  type="checkbox"
                  checked={balanceOnly}
                  onChange={(e) =>
                    setBalanceOnly(e.target.checked)
                  }
                />
                A/Cs With Balance Only
              </label>

            </div>

            <div className="field">

              <label>T.B. As On</label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

            </div>

            <div className="checkbox-row">

              <label>
                <input
                  type="checkbox"
                  checked={laserPrint}
                  onChange={(e) =>
                    setLaserPrint(e.target.checked)
                  }
                />
                Laser Print
              </label>

            </div>

            <div className="checkbox-row">

              <label>
                <input
                  type="checkbox"
                  checked={groupWise}
                  onChange={(e) =>
                    setGroupWise(e.target.checked)
                  }
                />
                Group Wise
              </label>

            </div>

            <div className="checkbox-row">

              <label>
                <input
                  type="checkbox"
                  checked={continuousPrint}
                  onChange={(e) =>
                    setContinuousPrint(e.target.checked)
                  }
                />
                Continuous Printing
              </label>

            </div>

          </div>

          {/* ================= Action Buttons ================= */}

          <div className="action-card">

            <button
              className="process-btn"
              onClick={() => alert("Processing Trial Balance...")}
            >
              Process
            </button>

            <button
              className="balance-btn"
              onClick={() => setPage("balancesheet")}
            >
              Balance Sheet
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
              className="refresh-btn"
              onClick={() => window.location.reload()}
            >
              Refresh
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

    </div>

  );

}

export default TrialBalance;