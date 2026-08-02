import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./FarmersPattiPrint.css";

function FarmersPattiPrint() {

  const { farmerName } = useParams();

  const [header, setHeader] = useState({});
  const [items, setItems] = useState([]);

  // ================= LOAD HEADER =================

  const loadHeader = async () => {

    try {

      const response = await fetch(

        `http://127.0.0.1:8000/farmers-patti/search?farmer_name=${encodeURIComponent(
          farmerName
        )}`

      );

      const data = await response.json();

      setHeader(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  // ================= LOAD ITEMS =================

  const loadItems = async () => {

    try {

      const response = await fetch(

        `http://127.0.0.1:8000/farmers-patti/farmer/${encodeURIComponent(
          farmerName
        )}`

      );

      const data = await response.json();

      setItems(data);

    }

    catch (error) {

      console.log(error);

    }

  };

  // ================= LOAD =================

  useEffect(() => {

    loadHeader();

    loadItems();

  }, [farmerName]);

  // ================= TOTALS =================

  const totalGrossAmount = items.reduce(

    (sum, item) =>

      sum + Number(item.gross_amount || 0),

    0

  );

  const totalCostOfBags = items.reduce(

    (sum, item) =>

      sum + Number(item.cost_of_bags || 0),

    0

  );

  const totalNetValue = items.reduce(

    (sum, item) =>

      sum + Number(item.net_value || 0),

    0

  );

  const totalBags = items.reduce(

    (sum, item) =>

      sum + Number(item.bags || 0),

    0

  );

  const totalWeight = items.reduce(

    (sum, item) =>

      sum + Number(item.net_weight || 0),

    0

  );

  // ================= CHARGES =================

  const commissionAmount =

    totalNetValue *

    (Number(header.commission || 0) / 100);

  const expenseAmount =
    totalBags * Number(header.expense || 0);

  const yardChargesAmount =
    totalBags * Number(header.yard_charges || 0);

  const machuAmount =
    totalBags * Number(header.machu || 0);

  const nettuCooliAmount =
    totalBags * Number(header.nettu_cooli || 0);

  const freightAmount =
    totalBags * Number(header.freight || 0);

  const kataCooliAmount =
    totalBags * Number(header.kata_cooli || 0);

  const tolakamAmount =
    totalBags * Number(header.tolakam || 0);

  const rasiCooliAmount =
    totalBags * Number(header.rasi_cooli || 0);

  const totalCharges =

    commissionAmount +

    expenseAmount +

    yardChargesAmount +

    machuAmount +

    nettuCooliAmount +

    freightAmount +

    kataCooliAmount +

    tolakamAmount +

    rasiCooliAmount +

    Number(header.cash_advance || 0) +

    Number(header.loan_amount || 0) +

    Number(header.interest || 0);

  const totalBill =

    totalNetValue -

    totalCharges;

  const roundedBill =

    Math.round(totalBill);

  const roundOff =

    roundedBill - totalBill;
      return (

    <div className="patti-print">

      {/* ================= HEADER ================= */}

      <div className="print-header">

        <div className="left">

          <h3>{header.farmer_name}</h3>

          <div>{header.address}</div>

        </div>

        <div className="right">

          <table>

            <tbody>

              <tr>

                <td>Book No</td>

                <td>{header.book_no}</td>

              </tr>

              <tr>

                <td>Date</td>

                <td>{header.patti_date}</td>

              </tr>

              <tr>

                <td>Serial</td>

                <td>{header.serial_no}</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      <hr />

      {/* ================= ITEM SUMMARY ================= */}

      <table className="summary-table">

        <thead>

          <tr>

            <th>Gross</th>

            <th>Bags</th>

            <th>Weight</th>

            <th>Rate</th>

            <th>Bag Cost</th>

          </tr>

        </thead>

        <tbody>

          <tr>

            <td>{totalGrossAmount.toFixed(2)}</td>

            <td>{totalBags}</td>

            <td>{totalWeight.toFixed(2)}</td>

            <td>

              {items.length > 0
                ? items[0].rate_per_quintal
                : 0}

            </td>

            <td>{totalCostOfBags.toFixed(2)}</td>

          </tr>

        </tbody>

      </table>

      <hr />

      {/* ================= TOTALS ================= */}

      <div className="totals-section">

        <div className="left-totals">

          <table>

            <tbody>

              <tr>

                <td>Gross Amount</td>

                <td>{totalGrossAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Bag Cost</td>

                <td>{totalCostOfBags.toFixed(2)}</td>

              </tr>

              <tr>

                <td><b>Net Value</b></td>

                <td>

                  <b>{totalNetValue.toFixed(2)}</b>

                </td>

              </tr>

              <tr>

                <td>Total Charges</td>

                <td>{totalCharges.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Total Bill</td>

                <td>{totalBill.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Round Off</td>

                <td>{roundOff.toFixed(2)}</td>

              </tr>

              <tr>

                <td>

                  <b>Final Amount</b>

                </td>

                <td>

                  <b>{roundedBill.toFixed(2)}</b>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

        <div className="right-totals">

          <table>

            <tbody>

              <tr>

                <td>Commission</td>

                <td>{commissionAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Expense</td>

                <td>{expenseAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Yard Charges</td>

                <td>{yardChargesAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Machu</td>

                <td>{machuAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Nettu Cooli</td>

                <td>{nettuCooliAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Freight</td>

                <td>{freightAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Kata Cooli</td>

                <td>{kataCooliAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Tolakam</td>

                <td>{tolakamAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Rasi Cooli</td>

                <td>{rasiCooliAmount.toFixed(2)}</td>

              </tr>

              <tr>

                <td>Cash Advance</td>

                <td>{Number(header.cash_advance).toFixed(2)}</td>

              </tr>

              <tr>

                <td>Loan</td>

                <td>{Number(header.loan_amount).toFixed(2)}</td>

              </tr>

              <tr>

                <td>Interest</td>

                <td>{Number(header.interest).toFixed(2)}</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default FarmersPattiPrint;