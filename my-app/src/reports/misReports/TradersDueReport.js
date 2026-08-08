import React, { useEffect, useState } from "react";
import "./TradersDueReport.css";
import API from "../../api";

function TradersDueReport({ setPage }) {

  const [view, setView] = useState("summary");

  const [reportData, setReportData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(() => {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;

  });

  const [towns, setTowns] = useState([]);


  // =========================================================
  // LOAD DATA
  // =========================================================

  useEffect(() => {

    loadTradersDueReport();
    loadTowns();

  }, []);


  // =========================================================
  // LOAD TRADERS DUE REPORT
  // =========================================================

  const loadTradersDueReport = async () => {

    try {

      const response = await fetch(
        `${API}/traders-due-report/`
      );

      if (!response.ok) {

        throw new Error(
          "Failed to load traders due report"
        );

      }

      const data = await response.json();

      setReportData(data);

    } catch (error) {

      console.error(
        "Error loading traders due report:",
        error
      );

    }

  };


  // =========================================================
  // LOAD TOWNS
  // =========================================================

  const loadTowns = async () => {

    try {

      const response = await fetch(
        `${API}/accounts/group/Traders/towns`
      );

      if (!response.ok) {

        throw new Error(
          "Failed to load towns"
        );

      }

      const data = await response.json();

      setTowns(data);

    } catch (error) {

      console.error(
        "Error loading towns:",
        error
      );

    }

  };


  // =========================================================
  // ACCOUNT LIST
  // =========================================================

  const accountList = [

    ...new Set(

      reportData

        .map(row => row.account_name)

        .filter(Boolean)

    )

  ];


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (dateValue) => {

    if (!dateValue) {
      return "";
    }

    const dateString =
      String(dateValue).split("T")[0];

    const parts =
      dateString.split("-");

    if (parts.length !== 3) {
      return "";
    }

    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);

    const date = new Date(
      year,
      month,
      day
    );

    return date.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "2-digit"
      }
    );

  };


  // =========================================================
  // FORMAT AMOUNT
  // =========================================================

  const formatAmount = (amount) => {

    return Number(
      amount || 0
    ).toLocaleString(
      "en-IN",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }
    );

  };


  // =========================================================
  // GET DUE CLASS
  //
  // NEGATIVE = PAYMENT STILL WITHIN 14 DAYS
  // ZERO     = DUE TODAY
  // POSITIVE = PAYMENT OVERDUE
  // =========================================================

  const getDueClass = (dueDays) => {

    const days = Number(dueDays || 0);

    if (days < 0) {

      return "due-future";

    }

    if (days > 0) {

      return "due-overdue";

    }

    return "due-today";

  };


  // =========================================================
  // FORMAT DUE DAYS
  //
  // -14 → -14
  // -1  → -1
  //  0  → 0
  //  1  → +1
  // 10  → +10
  // =========================================================

  const formatDueDays = (dueDays) => {

    const days =
      Number(dueDays || 0);

    if (days > 0) {

      return `+${days}`;

    }

    return days;

  };


  // =========================================================
  // GROUP DATA BY TRADER
  //
  // SAME ACCOUNT NAME = ONE GROUP
  // =========================================================

  const groupedTraders = [];

  const traderMap = new Map();


  reportData.forEach((row) => {

    const traderName =
      row.account_name ||
      "Unknown Trader";


    if (!traderMap.has(traderName)) {

      const group = {

        account_name: traderName,

        town: row.town || "-",

        rows: [],

        total: 0

      };


      traderMap.set(
        traderName,
        group
      );


      groupedTraders.push(group);

    }


    const group =
      traderMap.get(traderName);


    group.rows.push(row);


    group.total += Number(
      row.bill_amount || 0
    );

  });


  // =========================================================
  // TOTALS
  //
  // Uses BACKEND due_days
  // =========================================================

  const totals = {

    upTo90: 0,

    from91To180: 0,

    from181To270: 0,

    from271To365: 0

  };


  reportData.forEach((row) => {

    const dueDays =
      Number(
        row.due_days || 0
      );


    const amount =
      Number(
        row.bill_amount || 0
      );


    // Only overdue days are considered
    // for ageing totals.

    const ageDays =
      Math.max(
        0,
        dueDays
      );


    if (ageDays <= 90) {

      totals.upTo90 += amount;

    }

    else if (ageDays <= 180) {

      totals.from91To180 += amount;

    }

    else if (ageDays <= 270) {

      totals.from181To270 += amount;

    }

    else if (ageDays <= 365) {

      totals.from271To365 += amount;

    }

  });


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="traders-due-container">


      {/* =====================================================
          TITLE
      ===================================================== */}

      <h2>
        Traders Due Report
      </h2>


      <div className="traders-due-main">


        {/* ===================================================
            REPORT TABLE
        =================================================== */}

        <div className="traders-table-wrapper">

          <table className="traders-table">

            <thead>

              <tr>

                <th className="town-column">
                  Town
                </th>

                <th className="account-column">
                  A/C Name
                </th>

                <th className="date-column">
                  Bill Date
                </th>

                <th className="bill-column">
                  Bill No
                </th>

                <th className="amount-column">
                  Bill Amount
                </th>

                <th className="due-column">
                  Due Days
                </th>

              </tr>

            </thead>


            <tbody>


              {/* =================================================
                  GROUPED TRADERS
              ================================================= */}

              {groupedTraders.map(
                (trader, traderIndex) => (

                  <React.Fragment
                    key={
                      `${trader.account_name}-${traderIndex}`
                    }
                  >


                    {/* =========================================
                        TRADER BILL ROWS
                    ========================================= */}

                    {trader.rows.map(
                      (row, rowIndex) => {

                        const dueDays =
                          Number(
                            row.due_days || 0
                          );


                        const dueClass =
                          getDueClass(
                            dueDays
                          );


                        return (

                          <tr
                            key={
                              row.id ||
                              `${traderIndex}-${rowIndex}`
                            }
                            className="bill-row"
                          >


                            {/* TOWN */}

                            <td className="town-cell">

                              {rowIndex === 0
                                ? trader.town
                                : ""}

                            </td>


                            {/* ACCOUNT NAME */}

                            <td className="account-cell">

                              {rowIndex === 0
                                ? trader.account_name
                                : ""}

                            </td>


                            {/* BILL DATE */}

                            <td className="date-cell">

                              {formatDate(
                                row.bill_date
                              )}

                            </td>


                            {/* BILL NUMBER */}

                            <td className="bill-cell">

                              {row.bill_no || "-"}

                            </td>


                            {/* BILL AMOUNT */}

                            <td className="amount-cell">

                              {formatAmount(
                                row.bill_amount
                              )}

                            </td>


                            {/* DUE DAYS */}

                            <td
                              className={
                                `due-cell ${dueClass}`
                              }
                            >

                              {formatDueDays(
                                dueDays
                              )}

                            </td>

                          </tr>

                        );

                      }
                    )}


                    {/* =========================================
                        TRADER TOTAL ROW
                    ========================================= */}

                    <tr className="trader-total-row">


                      <td></td>

                      <td></td>

                      <td></td>


                      <td className="total-label">

                        Total :

                      </td>


                      <td className="trader-total-amount">

                        {formatAmount(
                          trader.total
                        )}

                      </td>


                      <td className="trader-total-due">

                      </td>


                    </tr>

                  </React.Fragment>

                )
              )}


              {/* =================================================
                  NO RECORDS
              ================================================= */}

              {reportData.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="no-records"
                  >

                    No Traders Due Records Found

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>


        {/* =====================================================
            BOTTOM PANEL
        ===================================================== */}

        <div className="traders-bottom-panel">


          {/* ===================================================
              LEFT PANEL
          =================================================== */}

          <div className="left-panel">


            <div className="panel-box">

              <label>
                Accounts List
              </label>

              <select size="5">

                {accountList.map(
                  (account, index) => (

                    <option
                      key={index}
                    >
                      {account}
                    </option>

                  )
                )}

              </select>

            </div>


            <div className="panel-box">

              <label>
                Towns
              </label>

              <select size="4">

                {towns.map(
                  (town, index) => (

                    <option
                      key={index}
                      value={town}
                    >

                      {town}

                    </option>

                  )
                )}

              </select>

            </div>


          </div>


          {/* ===================================================
              MIDDLE PANEL
          =================================================== */}

          <div className="middle-panel">


            <div className="date-box">

              <label>
                Date
              </label>

              <input
                type="date"
                value={selectedDate}
                onChange={(e) =>
                  setSelectedDate(
                    e.target.value
                  )
                }
              />


              <button>
                Selected Days Only
              </button>

            </div>


            <div className="totals-box">

              <h4>
                Totals
              </h4>


              <p>

                Up to 90 :
                ₹ {formatAmount(
                  totals.upTo90
                )}

              </p>


              <p>

                91 - 180 :
                ₹ {formatAmount(
                  totals.from91To180
                )}

              </p>


              <p>

                181 - 270 :
                ₹ {formatAmount(
                  totals.from181To270
                )}

              </p>


              <p>

                271 - 365 :
                ₹ {formatAmount(
                  totals.from271To365
                )}

              </p>

            </div>


          </div>


          {/* ===================================================
              RIGHT PANEL
          =================================================== */}

          <div className="right-panel">


            <div className="view-options">

              <h4>
                View Option
              </h4>


              <label>

                <input
                  type="radio"
                  checked={
                    view === "summary"
                  }
                  onChange={() =>
                    setView(
                      "summary"
                    )
                  }
                />

                Summary

              </label>


              <label>

                <input
                  type="radio"
                  checked={
                    view === "detailed"
                  }
                  onChange={() =>
                    setView(
                      "detailed"
                    )
                  }
                />

                Detailed

              </label>

            </div>


            <label className="checkbox">

              <input
                type="checkbox"
              />

              Group Wise

            </label>


            <label className="checkbox">

              <input
                type="checkbox"
              />

              Laser Print

            </label>


            <button>
              Periods
            </button>


            <button>
              View
            </button>


            <button
              onClick={() =>
                window.print()
              }
            >
              Print
            </button>


            <button
              onClick={() =>
                setPage
                  ? setPage("dashboard")
                  : window.history.back()
              }
            >
              Close
            </button>


          </div>


        </div>


      </div>

    </div>

  );

}

export default TradersDueReport;