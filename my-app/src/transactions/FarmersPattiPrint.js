import React, { forwardRef } from "react";
import "./FarmersPattiPrint.css";

const FarmersPattiPrint = forwardRef(
  ({ printData, setPage }, ref) => {

    if (!printData) return null;

    return (

      <div
        ref={ref}
        className="print-container"
      >

        {/* ================= TITLE ================= */}

        <h1 className="title">
          FARMERS PATTI
        </h1>

        {/* ================= HEADER ================= */}

        <div className="header">

          <div className="header-left">

            <p>

              <strong>Farmer :</strong>{" "}

              {printData.farmer_name}

            </p>

            <p>

              <strong>Address :</strong>{" "}

              {printData.address}

            </p>

          </div>

          <div className="header-right">

            <p>

              <strong>Bill No :</strong>{" "}

              {printData.bill_no}

            </p>

            <p>

              <strong>Date :</strong>{" "}

              {printData.date}

            </p>

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

                <td>

                  {index + 1}

                </td>

                <td>

                  {item.item_name}

                </td>

                <td>

                  {item.boras}

                </td>

                <td>

                  {item.bags}

                </td>

                <td>

                  {item.net_weight}

                </td>

                <td>

                  {item.rate}

                </td>

                <td>

                  ₹ {Number(item.net_value).toFixed(2)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* ================= TOTAL NET VALUE ================= */}

        <div className="net-value">

          <span>

            Total Net Value

          </span>

          <span>

            ₹ {Number(printData.total_net_value).toFixed(2)}

          </span>

        </div>

        {/* ================= CHARGES ================= */}

        <h2 className="charges-title">

          Charges

        </h2>

        <table className="charges-table">

          <tbody>

            <tr>

              <td>Commission</td>

              <td>{printData.commission}</td>

            </tr>

            <tr>

              <td>Expense</td>

              <td>{printData.expense}</td>

            </tr>

            <tr>

              <td>Yard Charges</td>

              <td>{printData.yard_charges}</td>

            </tr>

            <tr>

              <td>Machu</td>

              <td>{printData.machu}</td>

            </tr>

            <tr>

              <td>Nettu Cooli</td>

              <td>{printData.nettu_cooli}</td>

            </tr>

            <tr>

              <td>Freight</td>

              <td>{printData.freight}</td>

            </tr>

            <tr>

              <td>Kata Cooli</td>

              <td>{printData.kata_cooli}</td>

            </tr>

            <tr>

              <td>Tolakam</td>

              <td>{printData.tolakam}</td>

            </tr>

            <tr>

              <td>Rasi Cooli</td>

              <td>{printData.rasi_cooli}</td>

            </tr>

            <tr>

              <td>Cash Advance</td>

              <td>

                ₹ {Number(printData.cash_advance).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Loan Amount</td>

              <td>

                ₹ {Number(printData.loan_amount).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Interest</td>

              <td>

                ₹ {Number(printData.interest).toFixed(2)}

              </td>

            </tr>

            <tr className="charges-total">

              <td>

                <strong>Total Charges</strong>

              </td>

              <td>

                <strong>

                  ₹ {Number(printData.total_charges).toFixed(2)}

                </strong>

              </td>

            </tr>

          </tbody>

        </table>

        {/* ================= PAYABLE ================= */}

        <div className="amount-payable">

          <span>

            Amount Payable

          </span>

          <span>

            ₹ {Number(printData.rounding_off).toFixed(2)}

          </span>

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

        {/* ================= BACK ================= */}

        <button

          className="back-btn"

          onClick={() =>
            setPage("farmerspattientry")
          }

        >

          Back

        </button>

      </div>

    );

  }

);

export default FarmersPattiPrint;