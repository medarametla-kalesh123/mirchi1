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

                <td>{index + 1}</td>

                <td>{item.item_name}</td>

                <td>{item.boras}</td>

                <td>{item.bags}</td>

                <td>{item.net_weight}</td>

                <td>{item.rate}</td>

                <td>

                  ₹ {Number(item.net_value).toFixed(2)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* ================= ITEM SUMMARY ================= */}

        <table className="summary-table">

          <tbody>

            <tr>

              <td>

                <strong>Gross Amount</strong>

              </td>

              <td>

                ₹ {Number(printData.gross_amount).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>

                <strong>Cost of Bags</strong>

              </td>

              <td>

                ₹ {Number(printData.cost_of_bags).toFixed(2)}
                {" "}
                ({Number(printData.cost_per_bag).toFixed(2)}/Bag)

              </td>

            </tr>

            <tr>

              <td>

                <strong>Total Net Value</strong>

              </td>

              <td>

                ₹ {Number(printData.total_net_value).toFixed(2)}

              </td>

            </tr>

          </tbody>

        </table>

        {/* ================= CHARGES ================= */}

        <h2 className="charges-title">

          Charges

        </h2>

        <table className="charges-table">

          <tbody>

            <tr>

              <td>Commission</td>

              <td>

                ₹ {Number(printData.commission).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Expense</td>

              <td>

                ₹ {Number(printData.expense).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Yard Charges</td>

              <td>

                ₹ {Number(printData.yard_charges).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Machu</td>

              <td>

                ₹ {Number(printData.machu).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Nettu Cooli</td>

              <td>

                ₹ {Number(printData.nettu_cooli).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Freight</td>

              <td>

                ₹ {Number(printData.freight).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Kata Cooli</td>

              <td>

                ₹ {Number(printData.kata_cooli).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Tolakam</td>

              <td>

                ₹ {Number(printData.tolakam).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>Rasi Cooli</td>

              <td>

                ₹ {Number(printData.rasi_cooli).toFixed(2)}

              </td>

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
          onClick={() => setPage("farmerspattientry")}
        >

          Back

        </button>

      </div>

    );

  }

);

export default FarmersPattiPrint;