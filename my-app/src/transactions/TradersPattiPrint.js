import React, { forwardRef } from "react";
import "./TradersPattiPrint.css";

const TradersPattiPrint = forwardRef(
  ({ printData, setPage }, ref) => {

    if (!printData) return null;

    return (

      <div
        ref={ref}
        className="print-container"
      >

        {/* ================= TITLE ================= */}

        <h1 className="title">

          TRADERS PATTI

        </h1>

        {/* ================= HEADER ================= */}

        <div className="header">

          <div className="header-left">

            <p>

              <strong>Trader :</strong>{" "}

              {printData.trader_name}

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

              <th>Gross Amount</th>

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

                <td>

                  ₹ {Number(item.rate).toFixed(2)}

                </td>

                <td>

                  ₹ {Number(item.gross_amount).toFixed(2)}

                </td>

                <td>

                  ₹ {Number(item.net_value).toFixed(2)}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        {/* ================= SUMMARY ================= */}

        <div className="summary-box">

          <div className="summary-row">

            <span>

              Gross Amount

            </span>

            <span>

              ₹ {Number(printData.gross_amount).toFixed(2)}

            </span>

          </div>

          <div className="summary-row">

            <span>

              Cost of Bags

            </span>

            <span>

              ₹ {Number(printData.cost_of_bags).toFixed(2)}
              {" "}
              ({printData.cost_per_bag}/Bag)

            </span>

          </div>

          <div className="summary-row">

            <span>

              Market Fee

            </span>

            <span>

              ₹ {Number(printData.market_fee).toFixed(2)}

            </span>

          </div>

        </div>

        {/* ================= TOTAL NET VALUE ================= */}

        <div className="net-value">

          <span>

            Total Net Value

          </span>

          <span>

            ₹ {Number(printData.total_net_value).toFixed(2)}

          </span>

        </div>

        {/* ================= SIGNATURES ================= */}

        <div className="signatures">

          <div>

            ______________________

            <br />

            Trader Signature

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
            setPage("traderspattientry")
          }

        >

          Back

        </button>

      </div>

    );

  }

);

export default TradersPattiPrint;