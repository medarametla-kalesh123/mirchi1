import React, { useEffect, useState } from "react";
import "./TradersDueReport.css";

function TradersDueReport({ setPage }) {

  const [view, setView] = useState("summary");

  const [reportData, setReportData] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [towns, setTowns] = useState([]);


  // ================= LOAD TRADERS DUE REPORT =================

  useEffect(() => {

    loadTradersDueReport();
    loadTowns();

  }, []);


  const loadTradersDueReport = async () => {

    try {

      const response = await fetch(

        "https://mirchi1-2.onrender.com/traders-due-report/"

      );


      if (!response.ok) {

        throw new Error(

          "Failed to load traders due report"

        );

      }


      const data = await response.json();


      setReportData(data);

    }

    catch (error) {

      console.error(

        "Error loading traders due report:",

        error

      );

    }

  };
  const loadTowns = async () => {
  const res = await fetch(
    "https://mirchi1-2.onrender.com/accounts/group/Traders/towns"
  );

  const data = await res.json();
  setTowns(data);
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


  return (

    <div className="traders-due-container">


      <h2>

        Traders Due Report

      </h2>


      <div className="traders-due-main">


        {/* ================= REPORT TABLE ================= */}


        <table className="traders-table">


          <thead>


            <tr>


              <th>

                Town

              </th>


              <th>

                A/C Name

              </th>


              <th>

                Bill Date

              </th>


              <th>

                Bill No

              </th>


              <th>

                Bill Amount

              </th>


              <th>

                Due Days

              </th>


            </tr>


          </thead>


          <tbody>


            {reportData.map(

              (row, index) => {


                const dueDays =

                  calculateDueDays(

                    row.bill_date

                  );


                return (

                  <tr

                    key={

                      row.id ||

                      index

                    }

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

              }

            )}


            {reportData.length === 0 && (

              <tr>


                <td

                  colSpan="6"

                  style={{

                    textAlign: "center"

                  }}

                >

                  No Traders Due Records Found

                </td>


              </tr>

            )}


          </tbody>


        </table>


        {/* ================= BOTTOM PANEL ================= */}


        <div className="traders-bottom-panel">


          {/* ================= LEFT PANEL ================= */}


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

  {towns.map((town, index) => (

    <option
      key={index}
      value={town}
    >
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

                onChange={e =>

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


export default TradersDueReport;
