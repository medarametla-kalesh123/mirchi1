import React, { useState } from "react";
import "./DailyReport.css";

function DailyReport() {

  // ================= STATE =================

  const [reportDate, setReportDate] = useState("");

  const [reportType, setReportType] = useState("Personal");

  const [category, setCategory] = useState("All");

  const [search, setSearch] = useState("");

  const [farmers, setFarmers] = useState([]);

  const [traders, setTraders] = useState([]);

  const [farmersTotal, setFarmersTotal] = useState(0);

  const [tradersTotal, setTradersTotal] = useState(0);



  // ================= GENERATE REPORT =================

  const handleGenerateReport = async () => {

    if (!reportDate) {

      alert("Please select Report Date.");

      return;

    }

    try {

      const response = await fetch(

        `http://127.0.0.1:8000/dailyreport/?report_date=${reportDate}`

      );

      if (!response.ok) {

        throw new Error("Failed to fetch report.");

      }

      const data = await response.json();

      console.log("Daily Report :", data);

      setFarmers(data.farmers);

      setTraders(data.traders);

      setFarmersTotal(data.farmers_total);

      setTradersTotal(data.traders_total);

    }

    catch (error) {

      console.log(error);

      alert("Unable to load Daily Report.");

    }

  };
  const grandTotal =
  Number(farmersTotal) +
  Number(tradersTotal);
  const handlePrint = () => {

  window.print();

};



  return (

    <div className="daily-container">

      <h2 className="daily-title">

        Daily Stock Report

      </h2>



      {/* ================= FILTERS ================= */}

      <div className="filter-card">

        <div className="filter-grid">


          {/* REPORT DATE */}

          <div className="field">

            <label>

              Report Date

            </label>

            <input

              type="date"

              value={reportDate}

              onChange={(e) =>

                setReportDate(e.target.value)

              }

            />

          </div>



          {/* REPORT TYPE */}

          <div className="field">

            <label>

              Report Type

            </label>

            <select

              value={reportType}

              onChange={(e) =>

                setReportType(e.target.value)

              }

            >

              <option>

                Personal

              </option>

              <option>

                Company

              </option>

            </select>

          </div>



          {/* CATEGORY */}

          <div className="field">

            <label>

              Category

            </label>

            <select

              value={category}

              onChange={(e) =>

                setCategory(e.target.value)

              }

            >

              <option>

                All

              </option>

              <option>

                Farmers

              </option>

              <option>

                Traders

              </option>

            </select>

          </div>



          {/* SEARCH */}

          <div className="field">

            <label>

              Search

            </label>

            <input

              type="text"

              placeholder="Farmer / Trader Name"

              value={search}

              onChange={(e) =>

                setSearch(e.target.value)

              }

            />

          </div>

        </div>

      </div>



      {/* ================= BUTTONS ================= */}

      <div className="action-buttons">

        <button

          className="generate-btn"

          onClick={handleGenerateReport}

        >

          Generate Report

        </button>

       <button
  className="print-btn"
  onClick={handlePrint}
>
  Print
</button>
        <button className="excel-btn">

          Export Excel

        </button>

        <button className="pdf-btn">

          Export PDF

        </button>

      </div>

      {/* ---------- PART 2 STARTS FROM HERE ---------- */}
            {/* ========================================================= */}
      {/*                     FARMERS REPORT                        */}
      {/* ========================================================= */}

      <div className="report-card">

        <h3 className="section-title">
          Farmers Report
        </h3>

        <div className="table-wrapper">

          <table className="daily-table">

            <thead>

              <tr>

                <th>Bill No</th>

                <th>Farmer Name</th>

                <th>Bags</th>

                <th>Gross Amount</th>

                <th>Commission</th>

                <th>Market Fee</th>

                <th>Machu</th>

                <th>Freight</th>

                <th>AC Rent</th>

                <th>Tol / Ex Kata</th>

                <th>Cash Advance</th>

                <th>Loan Amount</th>

              <th>Total Bill</th>

                <th>Bags</th>

                <th>Boras</th>

                <th>NOB</th>

              </tr>

            </thead>

            <tbody>

              {farmers.length === 0 ? (

                <tr>

                  <td
                    colSpan="16"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Farmers Report Found
                  </td>

                </tr>

              ) : (

                farmers.map((farmer, index) => (

                  <tr key={index}>

                    <td>{farmer.bill_no}</td>

                    <td>{farmer.name}</td>

                    <td>{farmer.bags}</td>

                    <td>{farmer.gross_amount}</td>

                    <td>{farmer.commission}</td>

                    <td>{farmer.market_fee}</td>

                    <td>{farmer.machu}</td>

                    <td>{farmer.freight}</td>

                    <td>{farmer.ac_rent}</td>

                    <td>{farmer.tol_ex_kata}</td>

                    <td>{farmer.cash_advance}</td>

                    <td>{farmer.loan_amount}</td>

                   <td>{farmer.total_bill}</td>
                    <td>{farmer.bags}</td>

                    <td>0</td>

                    <td>{farmer.bags}</td>

                  </tr>

                ))

              )}

              <tr className="total-row">

                <td colSpan="12">

                  <strong>
                    Farmers Total
                  </strong>

                </td>

                <td>

                  <strong>

                    ₹ {farmersTotal}

                  </strong>

                </td>

                <td>

                  <strong>

                    {farmers.reduce(
                      (sum, row) => sum + Number(row.bags),
                      0
                    )}

                  </strong>

                </td>

                <td>

                  <strong>0</strong>

                </td>

                <td>

                  <strong>

                    {farmers.reduce(
                      (sum, row) => sum + Number(row.bags),
                      0
                    )}

                  </strong>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>
            {/* ========================================================= */}
      {/*                     TRADERS REPORT                        */}
      {/* ========================================================= */}

      <div className="report-card">

        <h3 className="section-title">
          Traders Report
        </h3>

        <div className="table-wrapper">

          <table className="daily-table">

            <thead>

              <tr>

                <th>Bill No</th>

                <th>Trader Name</th>

                <th>Bags</th>

                <th>Gross Amount</th>

                <th>Commission</th>

                <th>Market Fee</th>

                <th>Machu</th>

                <th>Freight</th>

                <th>AC Rent</th>

                <th>Tol / Ex Kata</th>

                <th>Cash Advance</th>

                <th>Loan Amount</th>

                <th>Total Bill</th>

                <th>Bags</th>

                <th>Boras</th>

                <th>NOB</th>

              </tr>

            </thead>

            <tbody>

              {traders.length === 0 ? (

                <tr>

                  <td
                    colSpan="16"
                    style={{
                      textAlign: "center",
                      padding: "20px"
                    }}
                  >
                    No Traders Report Found
                  </td>

                </tr>

              ) : (

                traders.map((trader, index) => (

                  <tr key={index}>

                    <td>{trader.bill_no}</td>

                    <td>{trader.name}</td>

                    <td>{trader.bags}</td>

                    <td>{trader.gross_amount}</td>

                    <td>{trader.commission}</td>

                    <td>{trader.market_fee}</td>

                    <td>{trader.machu}</td>

                    <td>{trader.freight}</td>

                    <td>{trader.ac_rent}</td>

                    <td>{trader.tol_ex_kata}</td>

                    <td>{trader.cash_advance}</td>

                    <td>{trader.loan_amount}</td>

                    <td>{trader.total_bill}</td>

                    <td>{trader.bags}</td>

                    <td>0</td>

                    <td>{trader.bags}</td>

                  </tr>

                ))

              )}

              <tr className="total-row">

                <td colSpan="12">

                  <strong>
                    Traders Total
                  </strong>

                </td>

                <td>

                  <strong>

                    ₹ {tradersTotal}

                  </strong>

                </td>

                <td>

                  <strong>

                    {traders.reduce(
                      (sum, row) => sum + Number(row.bags),
                      0
                    )}

                  </strong>

                </td>

                <td>

                  <strong>0</strong>

                </td>

                <td>

                  <strong>

                    {traders.reduce(
                      (sum, row) => sum + Number(row.bags),
                      0
                    )}

                  </strong>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>
            {/* ================= Grand Summary ================= */}

      <div className="summary-section">

        <div className="summary-card">

          <h4>
            Farmers Total
          </h4>

          <h2>
            ₹ {farmersTotal}
          </h2>

        </div>

        <div className="summary-card">

          <h4>
            Traders Total
          </h4>

          <h2>
            ₹ {tradersTotal}
          </h2>

        </div>

        <div className="summary-card grand-total">

          <h4>
            Grand Total
          </h4>

         <h2>
  ₹ {grandTotal}
</h2>

        </div>

      </div>

    </div>

  );

}

export default DailyReport;