import React, { useState, useEffect } from "react";
import "./TradersPattiEntry.css";
import API from "../api";

function TradersPattiEntry() {

  const [traders, setTraders] = useState([]);
  const [items, setItems] = useState([]);
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

      if (data.length > 0) {

        setItems(data);

        setFormData(prev => ({

          ...prev,

          gross_amount: data.reduce(
            (sum, row) => sum + Number(row.gross_amount || 0),
            0
          ),

          cost_per_bag: data.reduce(
            (sum, row) => sum + Number(row.cost_of_bags || 0),
            0
          ),

          market_fee: data.reduce(
            (sum, row) => sum + Number(row.market_fee || 0),
            0
          ),

          net_value: data.reduce(
            (sum, row) => sum + Number(row.net_value || 0),
            0
          )

        }));

      }

      else {

        setItems([]);

        setFormData(prev => ({

          ...prev,

          gross_amount: 0,
          cost_per_bag: 0,
          market_fee: 0,
          net_value: 0

        }));

      }

    }

    catch (error) {

      console.log(error);

    }

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

    let address = "";

    // Get Address
    const accountResponse = await fetch(
      `${API}/accounts/address/${encodeURIComponent(traderName)}`
    );

    if (accountResponse.ok) {

      const account = await accountResponse.json();

      address = account.address || "";

    }

    // Get Saved Patti by Trader + Date
    const response = await fetch(
    `${API}/traderspatti/trader/${encodeURIComponent(
        traderName
      )}?patti_date=${selectedDate}`
    );

    const data = await response.json();

    if (data.length > 0) {

      const first = data[0];

      setItems(data);

      setFormData(prev => ({

        ...prev,

        trader_name: first.trader_name,
        address: address,
        licence_no: first.licence_no,

        book_no: first.book_no,
        serial_no: first.serial_no,
        patti_date: first.patti_date,

        period_from: first.period_from,
        period_to: first.period_to,

        gross_amount: data.reduce(
          (s, r) => s + Number(r.gross_amount || 0),
          0
        ),

        cost_per_bag: data.reduce(
          (s, r) => s + Number(r.cost_of_bags || 0),
          0
        ),

        market_fee: data.reduce(
          (s, r) => s + Number(r.market_fee || 0),
          0
        ),

        net_value: data.reduce(
          (s, r) => s + Number(r.net_value || 0),
          0
        )

      }));

    }

    else {

      setItems([]);

      alert("No Saved Patti Found For Selected Date");

    }

  }

  catch (error) {

    console.log(error);

  }

};

//================ DATE CHANGE =================

const handleDateChange = async (e) => {

  const selectedDate = e.target.value;

  setFormData(prev => ({

    ...prev,

    patti_date: selectedDate,
    period_from: selectedDate,
    period_to: selectedDate

  }));

  // ================= RETRIEVE SAVED PATTI =================

  if (isSavedPatti) {

    await loadSavedTraders(selectedDate);

    setFormData(prev => ({

      ...prev,

      trader_name: "",
      address: "",
      licence_no: ""

    }));

    setItems([]);

    return;

  }

  // ================= NEW PATTI =================

  if (formData.trader_name) {

    await loadTraderDetails(

      formData.trader_name,

      selectedDate

    );

  }

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

    // Store trader name before clearing
    const savedTrader = formData.trader_name;

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

    // Remove trader from dropdown
    setTraders(prev =>
      prev.filter(name => name !== savedTrader)
    );

    // Clear item table
    setItems([]);

    // Clear form except defaults
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

    // Load next Book No, S.No and Date
    await loadDefaults();

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

       {!isSavedPatti && (

<button
className="save-btn"
onClick={handleSave}
>
Save
</button>

)}

        <button
          className="clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>

        <button
          className="print-btn"
        >
          Print
        </button>

      </div>

    </div>

  );

}

export default TradersPattiEntry;
