import React, { forwardRef } from "react";
import "./TradersPattiPrint.css";


const labels = {
  english: {
    title: "TRADER BILL",

    trader: "Trader",
    address: "Address",
    billNo: "Bill No",
    date: "Date",

    sno: "S.No",
    item: "Item",
    boras: "Boras",
    bags: "Bags",
    netWeight: "Net Weight",
    rate: "Rate / Qtl",
    grossAmount: "Gross Amount",
    netValue: "Net Value",

    costOfBags: "Cost of Bags",
    marketFee: "Market Fee",
    totalNetValue: "Total Net Value",

    traderSignature: "Trader Signature",
    authorizedSignature: "Authorized Signature",
  },

  telugu: {
    title: "వ్యాపారి బిల్లు",

    trader: "వ్యాపారి",
    address: "చిరునామా",
    billNo: "బిల్లు నెం",
    date: "తేదీ",

    sno: "క్ర.సం",
    item: "వస్తువు",
    boras: "బోరాలు",
    bags: "బస్తాలు",
    netWeight: "నికర బరువు",
    rate: "క్వింటాల్ ధర",
    grossAmount: "మొత్తం విలువ",
    netValue: "నికర విలువ",

    costOfBags: "బస్తాల ఖర్చు",
    marketFee: "మార్కెట్ ఫీజు",
    totalNetValue: "మొత్తం నికర విలువ",

    traderSignature: "వ్యాపారి సంతకం",
    authorizedSignature: "అధికార సంతకం",
  },

  hindi: {
    title: "व्यापारी बिल",

    trader: "व्यापारी",
    address: "पता",
    billNo: "बिल नं",
    date: "दिनांक",

    sno: "क्र.",
    item: "वस्तु",
    boras: "बोरे",
    bags: "बैग",
    netWeight: "शुद्ध वजन",
    rate: "दर / क्विंटल",
    grossAmount: "कुल राशि",
    netValue: "शुद्ध मूल्य",

    costOfBags: "बोरों का खर्च",
    marketFee: "मार्केट शुल्क",
    totalNetValue: "कुल शुद्ध मूल्य",

    traderSignature: "व्यापारी हस्ताक्षर",
    authorizedSignature: "अधिकृत हस्ताक्षर",
  },

  tamil: {
    title:  "வியாபாரி பில்",

    trader: "வியாபாரி",
    address: "முகவரி",
    billNo: "பில் எண்",
    date: "தேதி",

    sno: "எண்",
    item: "பொருள்",
    boras: "போர்கள்",
    bags: "மூட்டைகள்",
    netWeight: "நிகர எடை",
    rate: "விலை / குவிண்டால்",
    grossAmount: "மொத்த தொகை",
    netValue: "நிகர மதிப்பு",

    costOfBags: "மூட்டை செலவு",
    marketFee: "மார்க்கெட் கட்டணம்",
    totalNetValue: "மொத்த நிகர மதிப்பு",

    traderSignature: "வியாபாரி கையொப்பம்",
    authorizedSignature: "அங்கீகரிக்கப்பட்ட கையொப்பம்",
  },
};

const TradersPattiPrint = forwardRef(({ printData }, ref) => {

  if (!printData) {
    return null;
  }

  const t = labels[printData.language] || labels.english;

  return (
    <div
      ref={ref}
      className="traders-print-container"
    >

      {/* =====================================================
          TITLE
      ===================================================== */}

      <h1 className="traders-print-title">
        {t.title}
      </h1>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="traders-print-header">

        {/* LEFT */}

        <div className="traders-print-header-left">

          <div>
            <strong>{t.trader} :</strong>{" "}
            {printData.trader_name || ""}
          </div>

          <div>
            <strong>{t.address} :</strong>{" "}
            {printData.address || ""}
          </div>

        </div>


        {/* RIGHT */}

        <div className="traders-print-header-right">

          <div>
            <strong>{t.billNo} :</strong>{" "}
            {printData.bill_no || ""}
          </div>

          <div>
            <strong>{t.date}:</strong>{" "}
            {printData.date || ""}
          </div>

        </div>

      </div>


      {/* =====================================================
          ITEMS TABLE
      ===================================================== */}

      <table className="traders-print-items-table">

        <thead>

          <tr>

            <th>{t.sno}</th>
<th>{t.item}</th>
<th>{t.boras}</th>
<th>{t.bags}</th>
<th>{t.netWeight}</th>
<th>{t.rate}</th>
<th>{t.grossAmount}</th>
<th>{t.netValue}</th>
          </tr>

        </thead>


        <tbody>

          {(printData.items || []).map((item, index) => (

            <tr key={index}>

              <td>
                {index + 1}
              </td>

              <td className="item-name">
                {item.item_name || ""}
              </td>

              <td>
                {item.boras || 0}
              </td>

              <td>
                {item.bags || 0}
              </td>

              <td>
                {item.net_weight || 0}
              </td>

              <td>
                ₹{" "}
                {Number(item.rate || 0).toFixed(2)}
              </td>

              <td>
                ₹{" "}
                {Number(
                  item.gross_amount || 0
                ).toFixed(2)}
              </td>

              <td>
                ₹{" "}
                {Number(
                  item.net_value || 0
                ).toFixed(2)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>


      {/* =====================================================
          SUMMARY
      ===================================================== */}

      <div className="traders-print-summary">

        {/* Gross Amount */}

        <div className="traders-print-summary-row">

          <span>
           {t.grossAmount}
          </span>

          <span>
            ₹{" "}
            {Number(
              printData.gross_amount || 0
            ).toFixed(2)}
          </span>

        </div>


        {/* Cost of Bags */}

        <div className="traders-print-summary-row">

          <span>
           {t.costOfBags}
          </span>

          <span>

            ₹{" "}
            {Number(
              printData.cost_of_bags || 0
            ).toFixed(2)}

            {" "}

            (
            {Number(
              printData.cost_per_bag || 0
            ).toFixed(2)}
            /{t.bags})

          </span>

        </div>


        {/* Market Fee */}

        <div className="traders-print-summary-row">

          <span>
           {t.marketFee}
          </span>

          <span>
            ₹{" "}
            {Number(
              printData.market_fee || 0
            ).toFixed(2)}
          </span>

        </div>

      </div>


      {/* =====================================================
          TOTAL NET VALUE
      ===================================================== */}

      <div className="traders-print-net-value">

        <span>
          {t.totalNetValue}
        </span>

        <span>
          ₹{" "}
          {Number(
            printData.total_net_value || 0
          ).toFixed(2)}
        </span>

      </div>


      {/* =====================================================
          SIGNATURES
      ===================================================== */}

      <div className="traders-print-signatures">

        <div className="traders-print-signature">

          <div className="traders-print-signature-line">
          </div>

          <div>
           {t.traderSignature}
          </div>

        </div>


        <div className="traders-print-signature">

          <div className="traders-print-signature-line">
          </div>

          <div>
           {t.authorizedSignature}
          </div>

        </div>

      </div>

    </div>
  );
});

export default TradersPattiPrint;