import React, { useEffect, useState } from "react";
import "./FarmersPattiPrint.css";

function FarmersPattiPrint({ printData, setPage }) {

  const [data, setData] = useState(null);

  useEffect(() => {

    fetch(

      `http://127.0.0.1:8000/farmers-patti/print?farmer_name=${encodeURIComponent(
        printData.farmer_name
      )}&patti_date=${printData.patti_date}`

    )

      .then((res) => res.json())

      .then((result) => {

        setData(result);

        setTimeout(() => {

          window.print();

        }, 500);

      })

      .catch((err) => {

        console.log(err);

      });

  }, [printData]);

  if (!data) {

    return <h2>Loading...</h2>;

  }

  return (

    <div className="print-container">

      <h2 className="title">FARMER PATTI</h2>

      <div className="top-row">

        <div>

          <p><b>Farmer :</b> {data.farmer_name}</p>

          <p><b>Address :</b> {data.address}</p>

        </div>

        <div>

          <p><b>Bill No :</b> {data.bill_no}</p>

          <p><b>Date :</b> {data.date}</p>

        </div>

      </div>

      <table className="items-table">

        <thead>

          <tr>

            <th>Net Value</th>

            <th>Item</th>

            <th>Boras</th>

            <th>Bags</th>

            <th>Net Weight</th>

            <th>Rate</th>

          </tr>

        </thead>

        <tbody>

          {data.items.map((item, index) => (

            <tr key={index}>

              <td>{item.net_value}</td>

              <td>{item.item_name}</td>

              <td>{item.boras}</td>

              <td>{item.bags}</td>

              <td>{item.net_weight}</td>

              <td>{item.rate}</td>

            </tr>

          ))}

        </tbody>

      </table>

      <h3>Total Net Value : ₹ {data.total_net_value}</h3>

      <div className="bottom-section">

        <div>

          <h3>

            Amount Payable :

            ₹ {data.rounding_off}

          </h3>

        </div>

        <div>

          <h3>Total Charges</h3>

          <p>Commission : {data.commission}</p>

          <p>Expense : {data.expense}</p>

          <p>Yard Charges : {data.yard_charges}</p>

          <p>Machu : {data.machu}</p>

          <p>Nettu Cooli : {data.nettu_cooli}</p>

          <p>Freight : {data.freight}</p>

          <p>Kata Cooli : {data.kata_cooli}</p>

          <p>Tolakam : {data.tolakam}</p>

          <p>Rasi Cooli : {data.rasi_cooli}</p>

          <p>Cash Advance : {data.cash_advance}</p>

          <p>Loan Amount : {data.loan_amount}</p>

          <p>Interest : {data.interest}</p>

          <hr />

          <h4>Total Charges : {data.total_charges}</h4>

        </div>

      </div>

      <div className="signatures">

        <span>Farmer Signature</span>

        <span>Authorized Signature</span>

      </div>

      <br />

      <button
        className="back-btn"
        onClick={() => setPage("farmerspattientry")}
      >
        Back
      </button>

    </div>

  );

}

export default FarmersPattiPrint;