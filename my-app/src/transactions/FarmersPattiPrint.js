import React, { forwardRef } from "react";
import "./FarmersPattiPrint.css";

const labels = {

  english: {

    title: "FARMER BILL",

    farmer: "Farmer",
    address: "Address",
    billNo: "Bill No",
    date: "Date",

    sno: "S.No",
    item: "Item",
    boras: "Boras",
    bags: "Bags",
    netWeight: "Net Weight",
    rate: "Rate / Qtl",
    netValue: "Net Value",

    grossAmount: "Gross Amount",
    costOfBags: "Cost of Bags",
    totalNetValue: "Total Net Value",

    charges: "Charges",
    commission: "Commission",
    expense: "Expense",
    yardCharges: "Yard Charges",
    machu: "Machu",
    nettuCooli: "Nettu Cooli",
    freight: "Freight",
    kataCooli: "Kata Cooli",
    tolakam: "Tolakam",
    rasiCooli: "Rasi Cooli",
    cashAdvance: "Cash Advance",
    loanAmount: "Loan Amount",
    interest: "Interest",
    totalCharges: "Total Charges",

    amountPayable: "Amount Payable",

    farmerSignature: "Farmer Signature",
    authorizedSignature: "Authorized Signature",

    
  },

  telugu: {

    title: "రైతు బిల్లు",

    farmer: "రైతు",
    address: "చిరునామా",
    billNo: "బిల్లు నెం",
    date: "తేదీ",

    sno: "క్ర.సం",
    item: "వస్తువు",
    boras: "బోరాలు",
    bags: "బస్తాలు",
    netWeight: "నికర బరువు",
    rate: "క్వింటాల్ ధర",
    netValue: "నికర విలువ",

    grossAmount: "మొత్తం విలువ",
    costOfBags: "బస్తాల ఖర్చు",
    totalNetValue: "మొత్తం నికర విలువ",

    charges: "ఖర్చులు",
    commission: "కమిషన్",
    expense: "ఖర్చు",
    yardCharges: "యార్డ్ ఛార్జీలు",
    machu: "మచ్చు",
    nettuCooli: "నెత్తు కూలి",
    freight: "రవాణా",
    kataCooli: "కాటా కూలి",
    tolakam: "తూకం",
    rasiCooli: "రాశి కూలి",
    cashAdvance: "నగదు అడ్వాన్స్",
    loanAmount: "రుణం",
    interest: "వడ్డీ",
    totalCharges: "మొత్తం ఖర్చులు",

    amountPayable: "చెల్లించవలసిన మొత్తం",

    farmerSignature: "రైతు సంతకం",
    authorizedSignature: "అధికార సంతకం",

    
  },

  hindi: {

    title: "किसान बिल",

    farmer: "किसान",
    address: "पता",
    billNo: "बिल नं",
    date: "दिनांक",

    sno: "क्र.",
    item: "वस्तु",
    boras: "बोरे",
    bags: "बैग",
    netWeight: "शुद्ध वजन",
    rate: "दर / क्विंटल",
    netValue: "शुद्ध मूल्य",

    grossAmount: "कुल राशि",
    costOfBags: "बोरों का खर्च",
    totalNetValue: "कुल शुद्ध मूल्य",

    charges: "कटौतियाँ",
    commission: "कमीशन",
    expense: "खर्च",
    yardCharges: "यार्ड शुल्क",
    machu: "माचू",
    nettuCooli: "नेट्टू कूली",
    freight: "भाड़ा",
    kataCooli: "काटा कूली",
    tolakam: "तौल",
    rasiCooli: "रासी कूली",
    cashAdvance: "नकद अग्रिम",
    loanAmount: "ऋण",
    interest: "ब्याज",
    totalCharges: "कुल कटौती",

    amountPayable: "देय राशि",

    farmerSignature: "किसान हस्ताक्षर",
    authorizedSignature: "अधिकृत हस्ताक्षर",

    
  },

  tamil: {

    title: "விவசாயி பில்",

    farmer: "விவசாயி",
    address: "முகவரி",
    billNo: "பில் எண்",
    date: "தேதி",

    sno: "எண்",
    item: "பொருள்",
    boras: "போர்கள்",
    bags: "மூட்டைகள்",
    netWeight: "நிகர எடை",
    rate: "விலை / குவிண்டால்",
    netValue: "நிகர மதிப்பு",

    grossAmount: "மொத்த தொகை",
    costOfBags: "மூட்டை செலவு",
    totalNetValue: "மொத்த நிகர மதிப்பு",

    charges: "கழிவுகள்",
    commission: "கமிஷன்",
    expense: "செலவு",
    yardCharges: "யார்டு கட்டணம்",
    machu: "மச்சு",
    nettuCooli: "நெட்டு கூலி",
    freight: "சரக்கு கட்டணம்",
    kataCooli: "கட்டா கூலி",
    tolakam: "தூக்கம்",
    rasiCooli: "ராசி கூலி",
    cashAdvance: "பண முன்பணம்",
    loanAmount: "கடன்",
    interest: "வட்டி",
    totalCharges: "மொத்த கழிவுகள்",

    amountPayable: "செலுத்த வேண்டிய தொகை",

    farmerSignature: "விவசாயி கையொப்பம்",
    authorizedSignature: "அங்கீகரிக்கப்பட்ட கையொப்பம்",

  
  }

};

const FarmersPattiPrint = forwardRef(
  ({ printData, setPage }, ref) => {

    if (!printData) return null;
    const t = labels[printData.language] || labels.english;

    return (

      <div
        ref={ref}
        className="print-container"
      >

        {/* ================= TITLE ================= */}
<h1 className="title">
  {t.title}
</h1>

        {/* ================= HEADER ================= */}

        <div className="header">

          <div className="header-left">

            <p>

             <strong>{t.farmer} :</strong>{" "}
              {printData.farmer_name}

            </p>

            <p>

              <strong>{t.address} :</strong>{" "}
              {printData.address}

            </p>

          </div>

          <div className="header-right">

            <p>

              <strong>{t.billNo} :</strong>{" "}
              {printData.bill_no}

            </p>

            <p>

              <strong>{t.date} :</strong>{" "}
              {printData.date}

            </p>

          </div>

        </div>

        {/* ================= ITEMS ================= */}

        <table className="items-table">

          <thead>

            <tr>

             <th>{t.sno}</th>
<th>{t.item}</th>
<th>{t.boras}</th>
<th>{t.bags}</th>
<th>{t.netWeight}</th>
<th>{t.rate}</th>
<th>{t.netValue}</th>
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

                <strong>{t.grossAmount}</strong>
              </td>

              <td>

                ₹ {Number(printData.gross_amount).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>

                <strong>{t.costOfBags}</strong>

              </td>

              <td>

                ₹ {Number(printData.cost_of_bags).toFixed(2)}
                {" "}
               ({Number(printData.cost_per_bag).toFixed(2)}/{t.bags})

              </td>

            </tr>

            <tr>

              <td>

               <strong>{t.totalNetValue}</strong>

              </td>

              <td>

                ₹ {Number(printData.total_net_value).toFixed(2)}

              </td>

            </tr>

          </tbody>

        </table>

        {/* ================= CHARGES ================= */}

        <h2 className="charges-title">

          {t.charges}

        </h2>

        <table className="charges-table">

          <tbody>

            <tr>

             <td>{t.commission}</td>

              <td>

                ₹ {Number(printData.commission).toFixed(2)}

              </td>

            </tr>

            <tr>

             <td>{t.expense}</td>

              <td>

                ₹ {Number(printData.expense).toFixed(2)}

              </td>

            </tr>

            <tr>

             <td>{t.yardCharges}</td>

              <td>

                ₹ {Number(printData.yard_charges).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>{t.machu}</td>

              <td>

                ₹ {Number(printData.machu).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>{t.nettuCooli}</td>
              <td>

                ₹ {Number(printData.nettu_cooli).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>{t.freight}</td>
              <td>

                ₹ {Number(printData.freight).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>{t.kataCooli}</td>
              <td>

                ₹ {Number(printData.kata_cooli).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>{t.tolakam}</td>

              <td>

                ₹ {Number(printData.tolakam).toFixed(2)}

              </td>

            </tr>

            <tr>

             <td>{t.rasiCooli}</td>

              <td>

                ₹ {Number(printData.rasi_cooli).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>{t.cashAdvance}</td>

              <td>

                ₹ {Number(printData.cash_advance).toFixed(2)}

              </td>

            </tr>

            <tr>

              <td>{t.loanAmount}</td>
              <td>

                ₹ {Number(printData.loan_amount).toFixed(2)}

              </td>

            </tr>

            <tr>

             <td>{t.interest}</td>

              <td>

                ₹ {Number(printData.interest).toFixed(2)}

              </td>

            </tr>

            <tr className="charges-total">

              <td>

                <strong>{t.totalCharges}</strong>
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

           {t.amountPayable}

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

           {t.farmerSignature}

          </div>

          <div>

            ______________________

            <br />

           {t.authorizedSignature}
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