import React, {
  useState,
  useEffect,
  useRef
} from "react";

import "./TradersPattiEntry.css";
import API from "../api";

import { useReactToPrint } from "react-to-print";

import TradersPattiPrint from "./TradersPattiPrint";

function TradersPattiEntry({setpage}) {

  const [traders, setTraders] = useState([]);
  const [items, setItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
const [currentItemIndex, setCurrentItemIndex] =useState(0);
  const [kataTraderType, setKataTraderType] = useState("");
  const [isSavedPatti, setIsSavedPatti] = useState(false);


  const [formData, setFormData] = useState({

    trader_name: "",
    address: "",
    licence_no: "",

    book_no: "",
    patti_date: "",
    serial_no: "",

    item_name: "",

    bags: 0,
    boras: 0,
    net_weight: 0,

    rate_per_qtl: 0,
    actual_price: 0,

    gross_amount: 0,
    cost_per_bag: 0,
    market_fee: 0,
    net_value: 0,

    period_from: "",
    period_to: ""

  });
const printRef = useRef(null);

const [showPrintMenu, setShowPrintMenu] = useState(false);

const [printData, setPrintData] = useState({
  trader_name: "",
  patti_date: "",
  language: "english",
  items: [],
});

const handleReactPrint = useReactToPrint({
  contentRef: printRef,
  documentTitle: "Traders Patti",
});

const loadPrintData = async (traderName, pattiDate) => {

  const response = await fetch(

    `${API}/traderspatti/print?trader_name=${encodeURIComponent(
      traderName
    )}&patti_date=${pattiDate}`

  );

  const result = await response.json();

  return result;

};

const handlePrint = async (language) => {

  setShowPrintMenu(false);

  const result = await loadPrintData(

    formData.trader_name,
    formData.patti_date

  );

  if (!result) {

    alert("Unable to load print data");

    return;

  }

  setPrintData({

    ...result,

    language

  });

  requestAnimationFrame(() => {

    handleReactPrint();

  });

};

  //================ LOAD DEFAULTS =================

  const loadDefaults = async () => {

    try {

      const response = await fetch(
        `${API}/traderspatti/next-defaults`
      );

      const data = await response.json();

      if (response.ok) {

       setFormData(prev => ({

  ...prev,

  book_no: data.book_no,
  serial_no: data.serial_no,
  patti_date: data.patti_date,

  period_from: data.patti_date,
  period_to: data.patti_date

}));
      }

    }

    catch (error) {

      console.log(error);

    }

  };
  //================ LOAD SAVED TRADERS =================

const loadSavedTraders = async (selectedDate) => {

  try {

    const response = await fetch(
      `${API}/traderspatti/saved-traders?patti_date=${selectedDate}`
    );

    const data = await response.json();

    setTraders(data);

  }

  catch (error) {

    console.log(error);

    setTraders([]);

  }

};


  //================ LOAD TRADERS =================

  const loadTraders = async () => {

    try {

      const response = await fetch(
        `${API}/katalist1/traders`
      );

      const data = await response.json();

      setTraders(data);

    }

    catch (error) {

      console.log(error);

    }

  };


  //================ LOAD TRADER DETAILS =================

  const loadTraderDetails = async (traderName, selectedDate) => {

  try {

    const response = await fetch(
      `${API}/katalist1/trader/${encodeURIComponent(
        traderName
      )}?entry_date=${selectedDate}`
    );

    const data = await response.json();

    setPendingItems(data);

    setCurrentItemIndex(0);

    if (data.length > 0) {

      setItems([data[0]]);

    } else {

      setItems([]);

    }

  }

  catch (error) {

    console.log(error);

    setItems([]);

  }

};

const showCurrentItem = (index) => {

  if (index < 0 || index >= pendingItems.length)
    return;

  setCurrentItemIndex(index);

  setItems([pendingItems[index]]);

};

const handlePrevious = async () => {

  if (isSavedPatti) {

    if (currentItemIndex === 0)
        return;

    const index = currentItemIndex - 1;

    const current = pendingItems[index];

    const response = await fetch(

`${API}/traderspatti/saved?trader_name=${encodeURIComponent(
formData.trader_name
)}&patti_date=${formData.patti_date}&serial_no=${current.serial_no}&book_no=${current.book_no}`

    );

    if (!response.ok)
        return;

    const data = await response.json();

    if (data.length === 0)
        return;

    const first = data[0];

    setCurrentItemIndex(index);

    setItems(data);

    setFormData(prev => ({

        ...prev,

        serial_no:first.serial_no,
        book_no:first.book_no,

        gross_amount:data.reduce((s,r)=>s+Number(r.gross_amount||0),0),

        cost_per_bag:data.reduce((s,r)=>s+Number(r.cost_of_bags||0),0),

        market_fee:data.reduce((s,r)=>s+Number(r.market_fee||0),0),

        net_value:data.reduce((s,r)=>s+Number(r.net_value||0),0)

    }));

    return;

}

  if (currentItemIndex > 0)
      showCurrentItem(currentItemIndex-1);

};

const handleNext = async () => {

  if (isSavedPatti) {

    if (currentItemIndex >= pendingItems.length - 1)
        return;

    const index = currentItemIndex + 1;

    const current = pendingItems[index];

    const response = await fetch(

`${API}/traderspatti/saved?trader_name=${encodeURIComponent(
formData.trader_name
)}&patti_date=${formData.patti_date}&serial_no=${current.serial_no}&book_no=${current.book_no}`

    );

    if (!response.ok)
        return;

    const data = await response.json();

    if (data.length === 0)
        return;

    const first = data[0];

    setCurrentItemIndex(index);

    setItems(data);

    setFormData(prev => ({

        ...prev,

        serial_no:first.serial_no,
        book_no:first.book_no,

        gross_amount:data.reduce((s,r)=>s+Number(r.gross_amount||0),0),

        cost_per_bag:data.reduce((s,r)=>s+Number(r.cost_of_bags||0),0),

        market_fee:data.reduce((s,r)=>s+Number(r.market_fee||0),0),

        net_value:data.reduce((s,r)=>s+Number(r.net_value||0),0)

    }));

    return;

}

  if(currentItemIndex<pendingItems.length-1)
      showCurrentItem(currentItemIndex+1);

};
 const loadAccountAddress = async (traderName) => {

  try {

    const response = await fetch(
      `${API}/accounts/address/${encodeURIComponent(traderName)}`
    );

    const data = await response.json();

    console.log("Account API Response:", data);

    setFormData(prev => {

      console.log("Address Setting:", data.address);

      return {

        ...prev,

        address: data.address || ""

      };

    });

  }

  catch (error) {

    console.log(error);

  }

};
  //================ KATA TYPE =================

const handleKataTraderTypeChange = async (e) => {

  const selectedType = e.target.value;

  setKataTraderType(selectedType);

  // Clear previous data
  setItems([]);

  setFormData(prev => ({
    ...prev,
    trader_name: "",
    address: "",
    licence_no: "",
    gross_amount: 0,
    cost_per_bag: 0,
    market_fee: 0,
    net_value: 0,
    period_from: "",
    period_to: ""
  }));

  if (selectedType === "all") {

    setIsSavedPatti(false);
    await loadDefaults();  
    loadTraders();

  }

  else if (selectedType === "pen") {

    setIsSavedPatti(false);
    await loadDefaults();  
    loadTraders();

  }

 else if (selectedType === "saved") {

    setIsSavedPatti(true);

    setFormData(prev => ({
        ...prev,
        trader_name: "",
        address: "",
        book_no: "",
        serial_no: ""
    }));

    setItems([]);

    loadSavedTraders(formData.patti_date);

}

  else {

    setTraders([]);

  }

};
//================ LOAD SAVED PATTI =================

const loadSavedPatti = async (traderName, selectedDate) => {

  try {

    // Address
    const accountResponse = await fetch(
      `${API}/accounts/address/${encodeURIComponent(traderName)}`
    );

    let address = "";

    if (accountResponse.ok) {
      const account = await accountResponse.json();
      address = account.address || "";
    }

    // Get available pattis
    const searchResponse = await fetch(

      `${API}/traderspatti/search?trader_name=${encodeURIComponent(
        traderName
      )}&patti_date=${selectedDate}`

    );

    if (!searchResponse.ok) {

      setPendingItems([]);
      setItems([]);
      alert("No Saved Patti Found");
      return;

    }

    const pattis = await searchResponse.json();

    setPendingItems(pattis);
    setCurrentItemIndex(0);

    if (pattis.length === 0) {

      setItems([]);
      return;

    }

    const firstPatti = pattis[0];

    // Load first patti
    const response = await fetch(

      `${API}/traderspatti/saved?trader_name=${encodeURIComponent(
        traderName
      )}&patti_date=${selectedDate}&serial_no=${firstPatti.serial_no}&book_no=${firstPatti.book_no}`

    );

    const data = await response.json();

    if (data.length === 0) return;

    const first = data[0];

    setItems(data);

    setFormData(prev => ({

      ...prev,

      trader_name: first.trader_name,
      address,
      licence_no: first.licence_no,

      serial_no: first.serial_no,
      book_no: first.book_no,
      patti_date: first.patti_date,

      period_from: first.period_from,
      period_to: first.period_to,

      gross_amount: data.reduce(
        (s, r) => s + Number(r.gross_amount || 0), 0
      ),

      cost_per_bag: data.reduce(
        (s, r) => s + Number(r.cost_of_bags || 0), 0
      ),

      market_fee: data.reduce(
        (s, r) => s + Number(r.market_fee || 0), 0
      ),

      net_value: data.reduce(
        (s, r) => s + Number(r.net_value || 0), 0
      )

    }));

  }

  catch (error) {

    console.log(error);

  }

};
//================ DATE CHANGE =================

//================ DATE CHANGE =================

const handleDateChange = async (e) => {

  const selectedDate = e.target.value;

  setFormData(prev => ({

    ...prev,

    patti_date: selectedDate,
    period_from: selectedDate,
    period_to: selectedDate

  }));


  // If Retrieve Saved Patti is selected,
  // reload only traders saved on this date

  if (isSavedPatti) {

    await loadSavedTraders(selectedDate);

    // Clear currently selected trader

    setFormData(prev => ({

      ...prev,

      trader_name: "",
      address: "",
      licence_no: "",
      serial_no: "",
      book_no: ""

    }));

    setItems([]);

    return;

  }


  if (!formData.trader_name) return;

  await loadTraderDetails(

    formData.trader_name,
    selectedDate

  );

};
  //================ TRADER CHANGE =================

const handleTraderChange = async (e) => {

  const traderName = e.target.value;

  setFormData(prev => ({

    ...prev,

    trader_name: traderName,
    address: ""

  }));

  if (!traderName) return;

  await loadAccountAddress(traderName);

  if (isSavedPatti) {

    await loadSavedPatti(
      traderName,
      formData.patti_date
    );

  }

  else {

    await loadTraderDetails(
      traderName,
      formData.patti_date
    );

  }

};
  //================ CLEAR =================

  const handleClear = async () => {

   setTraders([]);
setItems([]);
setKataTraderType("");
setIsSavedPatti(false);
    setFormData({

      trader_name: "",
      address: "",
      licence_no: "",

      book_no: "",
      patti_date: "",
      serial_no: "",

      item_name: "",

      bags: 0,
      boras: 0,
      net_weight: 0,

      rate_per_qtl: 0,
      actual_price: 0,

      gross_amount: 0,
      cost_per_bag: 0,
      market_fee: 0,
      net_value: 0,

      period_from: "",
      period_to: ""

    });

    await loadDefaults();

  };


  //================ SAVE =================

 const handleSave = async () => {

  if (items.length === 0) {

    alert("No items available.");
    return;

  }

  try {

    // Store trader before clearing
    const savedTrader = formData.trader_name;

    // Save all items using current Book No / Serial No
    for (const item of items) {

      const payload = {

        entry_no: item.entry_no,

        book_no: String(formData.book_no),
        serial_no: String(formData.serial_no),
        patti_date: formData.patti_date,

        trader_name: formData.trader_name,
        address: formData.address,
        licence_no: formData.licence_no,

        item_name: item.item_name,

        bags: item.bags,
        boras: item.boras,
        net_weight: item.net_weight,

        rate_per_qtl: item.rate_per_qtl,
        actual_price: item.actual_price,

        gross_amount: item.gross_amount,
        cost_of_bags: item.cost_of_bags,
        market_fee: item.market_fee,
        net_value: item.net_value,

        period_from: formData.patti_date,
        period_to: formData.patti_date

      };

      const response = await fetch(
        `${API}/traderspatti/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {

        const err = await response.text();

        console.log(err);

        alert(err);

        return;

      }

    }

    alert("Saved Successfully");

    // Remove saved trader from pending list
    const remainingItems = pendingItems.filter(
      (_, index) => index !== currentItemIndex
    );

    setPendingItems(remainingItems);

    if (remainingItems.length > 0) {

      // ******** IMPORTANT ********
      // Load next Book No and Serial No
      await loadDefaults();

      const nextIndex =
        currentItemIndex >= remainingItems.length
          ? remainingItems.length - 1
          : currentItemIndex;

      setCurrentItemIndex(nextIndex);

      setItems([remainingItems[nextIndex]]);

    } else {

      // Remove trader from dropdown
      setTraders(prev =>
        prev.filter(name => name !== savedTrader)
      );

      setItems([]);

      setFormData(prev => ({

        ...prev,

        trader_name: "",
        address: "",
        licence_no: "",

        gross_amount: 0,
        cost_of_bags: 0,
        market_fee: 0,
        net_value: 0,

        period_from: "",
        period_to: ""

      }));

      // Load next Book No / Serial No
      await loadDefaults();

    }

  }

  catch (error) {

    console.log(error);

    alert("Error saving Traders Patti");

  }

};
  useEffect(() => {

    loadDefaults();

  }, []);

  return (

    <div className="traders-container">

      <h2 className="traders-title">
        Traders Patti Entry
      </h2>


      {/* ================= Trader Details ================= */}

      <div className="trader-card">

        <div className="trader-grid">


          {/* ================= KATA TRADER TYPE ================= */}

          <div className="field">

            <label>
              Refresh From Kata List
            </label>


            <select
              value={kataTraderType}
              onChange={handleKataTraderTypeChange}
            >

              <option value="">
                Select Kata Trader Type
              </option>


              <option value="all">
                All Kata Traders
              </option>


              <option value="pen">
  Pen.Kata Traders
</option>

<option value="saved">
  Retrieve Saved Patti
</option>

            </select>

          </div>


          {/* ================= TRADER NAME ================= */}

          <div className="field">

            <label>
              Trader Name
            </label>


            <select
              name="trader_name"
              value={formData.trader_name}
              onChange={handleTraderChange}
            >

              <option value="">
                Select Trader
              </option>


              {traders.map((trader, index) => (

                <option
                  key={index}
                  value={trader}
                >

                  {trader}

                </option>

              ))}


            </select>

          </div>


          {/* ================= BOOK NO ================= */}

          <div className="field">

            <label>
              Book No
            </label>


        <input
  type="text"
  value={formData.book_no}
  readOnly
/>

          </div>


         {/* ================= DATE ================= */}

<div className="field">

  <label>
    Date
  </label>

 <input
  type="date"
  value={formData.patti_date}
  onChange={handleDateChange}
/>
</div>
          


          {/* ================= SERIAL NUMBER ================= */}

          <div className="field">

            <label>
              S.No
            </label>


           <input
  type="text"
  value={formData.serial_no}
  readOnly
/>

          </div>


        </div>


        {/* ================= SECOND ROW ================= */}

        <div className="trader-grid second-row">


          <div className="field address-field">

            <label>
              Address
            </label>


            <input
              type="text"
              placeholder="Enter Trader Address"
              value={formData.address}
              readOnly
            />

          </div>


          <div className="field">

            <label>
              Licence No
            </label>


            <input
              type="text"
              placeholder="Enter Licence Number"
              value={formData.licence_no}
              readOnly
            />

          </div>


        </div>


      </div>


      {/* ================= ITEM DETAILS ================= */}

      <div className="table-card">

        <h3>
          Item Details
        </h3>


        <div className="table-wrapper">

          <table className="traders-table">


            <thead>

              <tr>

                <th>
                  S.No
                </th>

                <th>
                  Item Name
                </th>

                <th>
                  Bags
                </th>

                <th>
                  Boras
                </th>

                <th>
                  Net Weight
                </th>

                <th>
                  Rate / Qtl
                </th>

                <th>
                  Actual Price
                </th>

                <th>
                  Gross Amount
                </th>

                <th>
                  Cost of Bags
                </th>

                <th>
                  Market Fee
                </th>

                <th>
                  Net Value
                </th>

              </tr>

            </thead>


            <tbody>

  {items.map((item, index) => (

    <tr key={item.id || index}>

      <td>

        {index + 1}

      </td>

      <td>

        <input
          type="text"
          value={item.item_name || ""}
          readOnly
        />

      </td>

      <td>

        <input
          type="number"
          value={item.bags || 0}
          readOnly
        />

      </td>

      <td>

        <input
          type="number"
          value={item.boras || 0}
          readOnly
        />

      </td>

      <td>

        <input
          type="number"
          value={item.net_weight || 0}
          readOnly
        />

      </td>

      {/* Rate / Qtl */}

      <td>

        <input
          type="number"
          value={item.rate_per_qtl || 0}
          readOnly
        />

      </td>

      {/* Actual Price */}

      <td>

        <input
          type="number"
          value={item.actual_price || 0}
          readOnly
        />

      </td>

      {/* Gross Amount */}

      <td>

        <input
          type="number"
          value={item.gross_amount || 0}
          readOnly
        />

      </td>

      {/* Cost of Bags */}

      <td>

        <input
          type="number"
          value={item.cost_of_bags || 0}
          readOnly
        />

      </td>

      {/* Market Fee */}

      <td>

        <input
          type="number"
          value={item.market_fee || 0}
          readOnly
        />

      </td>

      {/* Net Value */}

      <td>

        <input
          type="number"
          value={item.net_value || 0}
          readOnly
        />

      </td>

    </tr>

  ))}

</tbody>
          </table>

        </div>

      </div>


          {/* ================= Bottom Section ================= */}

      <div className="bottom-section">

        {/* ================= FINANCIAL SUMMARY ================= */}

        <div className="summary-card">

          <h3>
            Financial Summary
          </h3>

          <div className="summary-grid">

            <div className="field">

              <label>
                Cost of Bags
              </label>

              <input
                type="number"
                value={formData.cost_per_bag}
                readOnly
              />

            </div>

            <div className="field">

              <label>
                Market Fee
              </label>

              <input
                type="number"
                value={formData.market_fee}
                readOnly
              />

            </div>

            <div className="field">

              <label>
                Gross Amount
              </label>

              <input
                type="number"
                value={formData.gross_amount}
                readOnly
              />

            </div>

            <div className="field">

              <label>
                Net Value
              </label>

              <input
                type="number"
                value={formData.net_value}
                readOnly
              />

            </div>

          </div>

        </div>


        {/* ================= PERIOD ================= */}

        <div className="period-card">

          <h3>
            Period
          </h3>

          <div className="field">

            <label>
              From
            </label>

            <input
              type="date"
              value={formData.period_from}
              readOnly
            />

          </div>

          <div className="field">

            <label>
              To
            </label>

            <input
              type="date"
              value={formData.period_to}
              readOnly
            />

          </div>

        </div>

      </div>


      {/* ================= ACTION BUTTONS ================= */}

<div className="action-buttons">

  {/* ================= Pending Patti ================= */}

  {!isSavedPatti && (
    <>

      <button
        type="button"
        className="prev-btn"
        onClick={handlePrevious}
        disabled={currentItemIndex === 0}
      >
        ◀ Previous
      </button>

      <span className="item-count">
        {pendingItems.length > 0
          ? `${currentItemIndex + 1} / ${pendingItems.length}`
          : "0 / 0"}
      </span>

      <button
        type="button"
        className="next-btn"
        onClick={handleNext}
        disabled={currentItemIndex >= pendingItems.length - 1}
      >
        Next ▶
      </button>

      <button
        className="save-btn"
        onClick={handleSave}
      >
        Save
      </button>

    </>
  )}

  {/* ================= Retrieve Saved Patti ================= */}

  {isSavedPatti && (
    <>

      <button
        type="button"
        className="prev-btn"
        onClick={handlePrevious}
        disabled={currentItemIndex === 0}
      >
        ◀ Previous Patti
      </button>

      <span className="item-count">
        {pendingItems.length > 0
          ? `Patti ${currentItemIndex + 1} / ${pendingItems.length}`
          : "Patti 0 / 0"}
      </span>

      <button
        type="button"
        className="next-btn"
        onClick={handleNext}
        disabled={currentItemIndex >= pendingItems.length - 1}
      >
        Next Patti ▶
      </button>

    </>
  )}

  {/* ================= Clear ================= */}

  <button
    className="clear-btn"
    onClick={handleClear}
  >
    Clear
  </button>

  {/* ================= Print ================= */}

 <div className="print-dropdown">

  <button
    className="print-btn"
    onClick={() =>
      setShowPrintMenu(!showPrintMenu)
    }
  >
    Print ▼
  </button>

  {showPrintMenu && (

    <div className="print-menu">

      <button
        onClick={() => handlePrint("english")}
      >
        English
      </button>

      <button
        onClick={() => handlePrint("telugu")}
      >
        తెలుగు
      </button>

      <button
        onClick={() => handlePrint("hindi")}
      >
        हिन्दी
      </button>

      <button
        onClick={() => handlePrint("tamil")}
      >
        தமிழ்
      </button>

    </div>

  )}
  <div
  style={{
    position: "absolute",
    left: "-10000px",
    top: 0,
  }}
>

  <TradersPattiPrint
    ref={printRef}
    printData={printData}
  />

</div>

</div>

</div>

    </div>

  );

}

export default TradersPattiEntry;
