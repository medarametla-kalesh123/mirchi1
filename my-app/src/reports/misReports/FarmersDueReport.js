import React, { useEffect, useState } from "react";
import "./FarmersDueReport.css";
import API from "../../api";

function FarmersDueReport({ setPage }) {

  // ================= STATES =================

  const [view, setView] = useState("summary");

  const [reportData, setReportData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // ================= LOAD REPORT =================

  useEffect(() => {

    loadFarmersDueReport();

  }, []);

  const loadFarmersDueReport = async () => {

    try {

      const response = await fetch(

        `${API}/farmers-due-report/`

      );

      if (!response.ok) {

        throw new Error(

          "Failed to load Farmers Due Report"

        );

      }

      const data = await response.json();

      setReportData(data);

    }

    catch (error) {

      console.error(

        "Error loading Farmers Due Report:",

        error

      );

    }

  };

  // ================= ACCOUNT LIST =================

  const accountList = [

    ...new Set(

      reportData

        .map(row => row.account_name)

        .filter(Boolean)

    )

  ];

  // ================= TOWN LIST =================

  const townList = [

    ...new Set(

      reportData

        .map(row => row.town)

        .filter(Boolean)

    )

  ];

  // ================= DUE DAYS =================

  const calculateDueDays = (billDate) => {

    const billDateObject = new Date(

      billDate

    );

    const selectedDateObject = new Date(

      selectedDate

    );

    const difference =

      selectedDateObject -

      billDateObject;

    return Math.max(

      0,

      Math.floor(

        difference /

        (1000 * 60 * 60 * 24)

      )

    );

  };

  // ================= FORMAT DATE =================

  const formatDate = (dateValue) => {

    if (!dateValue) {

      return "";

    }

    const date = new Date(

      dateValue

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

  // ================= FORMAT AMOUNT =================

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

  // ================= TOTALS =================

  const totals = {

    upTo90: 0,

    from91To180: 0,

    from181To270: 0,

    from271To365: 0

  };

  reportData.forEach(row => {

    const dueDays = calculateDueDays(

      row.bill_date

    );

    const amount = Number(

      row.bill_amount || 0

    );

    if (dueDays <= 90) {

      totals.upTo90 += amount;

    }

    else if (dueDays <= 180) {

      totals.from91To180 += amount;

    }

    else if (dueDays <= 270) {

      totals.from181To270 += amount;

    }

    else if (dueDays <= 365) {

      totals.from271To365 += amount;

    }

  });

  return (

    <div className="farmers-due-container">

      <h2>

        Farmers Due Report

      </h2>

      <div className="farmers-due-main">

        <table className="farmers-table">

          <thead>

            <tr>

              <th>Town</th>

              <th>A/C Name</th>

              <th>Bill Date</th>

              <th>Bill No</th>

              <th>Bill Amount</th>

              <th>Due Days</th>

            </tr>

          </thead>

          <tbody>

            {reportData.map((row, index) => {

              const dueDays = calculateDueDays(

                row.bill_date

              );

              return (

                <tr

                  key={row.id || index}

                >

                  <td>

                    {row.town || "-"}

                  </td>

                  <td>

                    {row.account_name}

                  </td>

                  <td>

                    {formatDate(

                      row.bill_date

                    )}

                  </td>

                  <td>

                    {row.bill_no}

                  </td>

                  <td>

                    {formatAmount(

                      row.bill_amount

                    )}

                  </td>

                  <td>

                    {dueDays}

                  </td>

                </tr>

              );

            })}

            {reportData.length === 0 && (

              <tr>

                <td

                  colSpan="6"

                  style={{

                    textAlign: "center"

                  }}

                >

                  No Farmers Due Records Found

                </td>

              </tr>

            )}
                      </tbody>

        </table>

        {/* ================= BOTTOM PANEL ================= */}

        <div className="farmers-bottom-panel">

          {/* ================= LEFT PANEL ================= */}

          <div className="left-panel">

            <div className="panel-box">

              <label>

                Accounts List

              </label>

              <select size="5">

                {accountList.map((account, index) => (

                  <option key={index}>

                    {account}

                  </option>

                ))}

              </select>

            </div>

            <div className="panel-box">

              <label>

                Towns

              </label>

              <select size="4">

                {townList.map((town, index) => (

                  <option key={index}>

                    {town}

                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* ================= MIDDLE PANEL ================= */}

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

                Up to 90 : ₹

                {formatAmount(

                  totals.upTo90

                )}

              </p>

              <p>

                91 - 180 : ₹

                {formatAmount(

                  totals.from91To180

                )}

              </p>

              <p>

                181 - 270 : ₹

                {formatAmount(

                  totals.from181To270

                )}

              </p>

              <p>

                271 - 365 : ₹

                {formatAmount(

                  totals.from271To365

                )}

              </p>

            </div>

          </div>

          {/* ================= RIGHT PANEL ================= */}

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

                  ? setPage(

                      "dashboard"

                    )

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

export default FarmersDueReport;
