import React, { forwardRef } from "react";
import "./FarmersPattiPrint.css";

const FarmersPattiPrint = forwardRef(({ printData, setPage }, ref) => {

  if (!printData) {
    return null;
  }

  return (

    <div ref={ref} className="print-container">

      {/* ================= TITLE ================= */}

      <h1 className="title">
        FARMER PATTI
      </h1>

      {/* ================= HEADER ================= */}

      <div className="top-row">

        <div>

          <p><strong>Farmer :</strong> {printData.farmer_name}</p>

          <p><strong>Address :</strong> {printData.address}</p>

        </div>

        <div>

          <p><strong>Bill No :</strong> {printData.bill_no}</p>

          <p><strong>Date :</strong> {printData.date}</p>

        </div>

      </div>

      {/* ================= ITEMS ================= */}

      <table className="items-table">

        <thead>

          <tr>

            <th>S.No</th>
            <th>Item</th>
            <th>Boras</th>
            <th>Bags</th>
            <th>Net Weight</th>
            <th>Rate / Qtl</th>
            <th>Net Value</th>

          </tr>

        </thead>

        <tbody>

          {printData.items.map((item, index) => (

            <tr key={index}>

              <td>{index + 1}</td>
              <td>{item.item_name}</td>
              <td>{item.boras}</td>
              <td>{item.bags}</td>
              <td>{item.net_weight}</td>
              <td>{item.rate}</td>
              <td>{item.net_value}</td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* ================= SUMMARY ================= */}

      <div className="bottom-section">

        <div className="summary-box">

          <table className="summary-table">

            <tbody>

              <tr>

                <td><strong>Total Net Value</strong></td>

                <td>₹ {printData.total_net_value}</td>

              </tr>

              <tr>

                <td><strong>Total Charges</strong></td>

                <td>₹ {printData.total_charges}</td>

              </tr>

              <tr className="payable-row">

                <td><strong>Amount Payable</strong></td>

                <td><strong>₹ {printData.rounding_off}</strong></td>

              </tr>

            </tbody>

          </table>

        </div>

        <div className="charges-box">

          <h3>Total Charges</h3>

          <table className="charges-table">

            <tbody>

              <tr><td>Commission</td><td>{printData.commission}</td></tr>

              <tr><td>Expense</td><td>{printData.expense}</td></tr>

              <tr><td>Yard Charges</td><td>{printData.yard_charges}</td></tr>

              <tr><td>Machu</td><td>{printData.machu}</td></tr>

              <tr><td>Nettu Cooli</td><td>{printData.nettu_cooli}</td></tr>

              <tr><td>Freight</td><td>{printData.freight}</td></tr>

              <tr><td>Kata Cooli</td><td>{printData.kata_cooli}</td></tr>

              <tr><td>Tolakam</td><td>{printData.tolakam}</td></tr>

              <tr><td>Rasi Cooli</td><td>{printData.rasi_cooli}</td></tr>

              <tr><td>Cash Advance</td><td>{printData.cash_advance}</td></tr>

              <tr><td>Loan Amount</td><td>{printData.loan_amount}</td></tr>

              <tr><td>Interest</td><td>{printData.interest}</td></tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* ================= SIGNATURES ================= */}

      <div className="signatures">

        <div>

          ______________________

          <br />

          Farmer Signature

        </div>

        <div>

          ______________________

          <br />

          Authorized Signature

        </div>

      </div>

      <button
        className="back-btn"
        onClick={() => setPage("farmerspattientry")}
      >
        Back
      </button>

    </div>

  );

});

export default FarmersPattiPrint;