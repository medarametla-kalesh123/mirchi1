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

// ================= LOAD PRINT DATA =================

const loadPrintData = async (
  traderName,
  pattiDate,
  serialNo,
  bookNo,
  printType
) => {

  try {

    let url = "";

    // ================= CURRENT PATTI =================

    if (printType === "single") {

      url =
        `${API}/traderspatti/print-single` +
        `?trader_name=${encodeURIComponent(traderName)}` +
        `&patti_date=${pattiDate}` +
        `&serial_no=${encodeURIComponent(serialNo)}` +
        `&book_no=${encodeURIComponent(bookNo)}`;

    }

    // ================= ALL PATTIS =================

    else {

      url =
        `${API}/traderspatti/print-all` +
        `?trader_name=${encodeURIComponent(traderName)}` +
        `&patti_date=${pattiDate}`;

    }

    const response = await fetch(url);

    if (!response.ok) {

      const errorText = await response.text();

      console.log("Print API Error:", errorText);

      alert("please save before print");

      return null;

    }

    const result = await response.json();

    return result;

  }

  catch (error) {

    console.log("Print Error:", error);

    alert("please save before print");

    return null;

  }

};


// ================= PRINT =================

const handlePrint = async (
  language,
  printType
) => {

  setShowPrintMenu(false);


  // ================= VALIDATION =================

  if (!formData.trader_name) {

    alert("Please select Trader");

    return;

  }

  if (!formData.patti_date) {

    alert("Please select Patti Date");

    return;

  }


  // Current Patti needs serial + book number

  if (printType === "single") {

    if (!formData.serial_no || !formData.book_no) {

      alert("Serial No and Book No are required");

      return;

    }

  }


  // ================= LOAD PRINT DATA =================

  const result = await loadPrintData(

    formData.trader_name,

    formData.patti_date,

    formData.serial_no,

    formData.book_no,

    printType

  );


  if (!result) {

    return;

  }


  // ================= SET PRINT DATA =================

  setPrintData({

    ...result,

    language

  });


  // ================= PRINT =================

  requestAnimationFrame(() => {

    handleReactPrint();

  });

};

  //================ LOAD DEFAULTS =================

 //================ LOAD DEFAULTS =================

// ================= LOAD DEFAULTS =================

const loadDefaults = async (keepDate = false) => {

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

        patti_date: keepDate
          ? prev.patti_date
          : data.patti_date,

        period_from: keepDate
          ? prev.period_from
          : data.patti_date,

        period_to: keepDate
          ? prev.period_to
          : data.patti_date

      }));

    }

  } catch (error) {

    console.log(error);

  }

};

// ================= GET TODAY DATE =================

const getTodayDate = () => {

  const today = new Date();

  const year = today.getFullYear();

  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
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

 // ================= LOAD TRADER DETAILS =================

const loadTraderDetails = async (traderName) => {

  try {

    if (!traderName) {
      setPendingItems([]);
      setCurrentItemIndex(0);
      setItems([]);
      return;
    }

    const today = getTodayDate();

    const response = await fetch(
      `${API}/katalist1/trader/${encodeURIComponent(
        traderName
      )}?entry_date=${today}`
    );

    if (!response.ok) {
      setPendingItems([]);
      setCurrentItemIndex(0);
      setItems([]);
      return;
    }

    const data = await response.json();

    console.log(
      "TRADER PENDING ITEMS UPTO TODAY:",
      data
    );

    setPendingItems(data);
    setCurrentItemIndex(0);

    if (data.length > 0) {

      const first = data[0];

      setItems([first]);

      setFormData(prev => ({
        ...prev,

        trader_name: traderName,

        patti_date:
          first.entry_date || today,

        period_from:
          first.entry_date || today,

        period_to:
          first.entry_date || today,

        gross_amount:
          Number(first.gross_amount || 0),

        cost_per_bag:
          Number(first.cost_of_bags || 0),

        market_fee:
          Number(first.market_fee || 0),

        net_value:
          Number(first.net_value || 0)
      }));

    } else {

      setItems([]);

      setFormData(prev => ({
        ...prev,

        trader_name: traderName,

        patti_date: today,
        period_from: today,
        period_to: today,

        gross_amount: 0,
        cost_per_bag: 0,
        market_fee: 0,
        net_value: 0
      }));

    }

  } catch (error) {

    console.log(
      "Error loading trader details:",
      error
    );

    setPendingItems([]);
    setCurrentItemIndex(0);
    setItems([]);

  }

};
// ================= SHOW CURRENT PENDING ITEM =================

const showCurrentItem = (index) => {

  if (
    index < 0 ||
    index >= pendingItems.length
  ) {
    return;
  }

  const selectedItem =
    pendingItems[index];

  setCurrentItemIndex(index);

  setItems([
    selectedItem
  ]);

  setFormData(prev => ({

    ...prev,

    // ==================================================
    // IMPORTANT:
    // USE SELECTED ITEM DATE
    // ==================================================

    patti_date:
      selectedItem.entry_date ||
      prev.patti_date,

    period_from:
      selectedItem.entry_date ||
      prev.period_from,

    period_to:
      selectedItem.entry_date ||
      prev.period_to,

    gross_amount:
      Number(
        selectedItem.gross_amount || 0
      ),

    cost_per_bag:
      Number(
        selectedItem.cost_of_bags || 0
      ),

    market_fee:
      Number(
        selectedItem.market_fee || 0
      ),

    net_value:
      Number(
        selectedItem.net_value || 0
      )

  }));

};

// ================= PREVIOUS =================

const handlePrevious = async () => {

  // ==================================================
  // RETRIEVE SAVED PATTI
  // ==================================================

  if (isSavedPatti) {

    if (currentItemIndex === 0) {
      return;
    }

    const index =
      currentItemIndex - 1;

    const current =
      pendingItems[index];

    const response = await fetch(

      `${API}/traderspatti/saved` +
      `?trader_name=${encodeURIComponent(
        formData.trader_name
      )}` +
      `&patti_date=${encodeURIComponent(
        formData.patti_date
      )}` +
      `&serial_no=${encodeURIComponent(
        current.serial_no
      )}` +
      `&book_no=${encodeURIComponent(
        current.book_no
      )}`

    );

    if (!response.ok) {
      return;
    }

    const data =
      await response.json();

    if (data.length === 0) {
      return;
    }

    const first =
      data[0];

    setCurrentItemIndex(index);

    setItems(data);

    setFormData(prev => ({

      ...prev,

      serial_no:
        first.serial_no,

      book_no:
        first.book_no,

      patti_date:
        first.patti_date,

      period_from:
        first.period_from,

      period_to:
        first.period_to,

      gross_amount:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.gross_amount || 0
            ),
          0
        ),

      cost_per_bag:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.cost_of_bags || 0
            ),
          0
        ),

      market_fee:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.market_fee || 0
            ),
          0
        ),

      net_value:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.net_value || 0
            ),
          0
        )

    }));

    return;
  }

  // ==================================================
  // PENDING PATTI
  // ==================================================

  if (currentItemIndex > 0) {

    showCurrentItem(
      currentItemIndex - 1
    );

  }

};
// ================= NEXT =================

const handleNext = async () => {

  // ==================================================
  // RETRIEVE SAVED PATTI
  // ==================================================

  if (isSavedPatti) {

    if (
      currentItemIndex >=
      pendingItems.length - 1
    ) {
      return;
    }

    const index =
      currentItemIndex + 1;

    const current =
      pendingItems[index];

    const response = await fetch(

      `${API}/traderspatti/saved` +
      `?trader_name=${encodeURIComponent(
        formData.trader_name
      )}` +
      `&patti_date=${encodeURIComponent(
        formData.patti_date
      )}` +
      `&serial_no=${encodeURIComponent(
        current.serial_no
      )}` +
      `&book_no=${encodeURIComponent(
        current.book_no
      )}`

    );

    if (!response.ok) {
      return;
    }

    const data =
      await response.json();

    if (data.length === 0) {
      return;
    }

    const first =
      data[0];

    setCurrentItemIndex(index);

    setItems(data);

    setFormData(prev => ({

      ...prev,

      serial_no:
        first.serial_no,

      book_no:
        first.book_no,

      patti_date:
        first.patti_date,

      period_from:
        first.period_from,

      period_to:
        first.period_to,

      gross_amount:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.gross_amount || 0
            ),
          0
        ),

      cost_per_bag:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.cost_of_bags || 0
            ),
          0
        ),

      market_fee:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.market_fee || 0
            ),
          0
        ),

      net_value:
        data.reduce(
          (s, r) =>
            s +
            Number(
              r.net_value || 0
            ),
          0
        )

    }));

    return;
  }

  // ==================================================
  // PENDING PATTI
  // ==================================================

  if (
    currentItemIndex <
    pendingItems.length - 1
  ) {

    showCurrentItem(
      currentItemIndex + 1
    );

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

// ================= KATA TRADER TYPE =================

const handleKataTraderTypeChange = async (e) => {

  const selectedType = e.target.value;

  setKataTraderType(selectedType);

  // ==================================================
  // CLEAR PREVIOUS STATE
  // ==================================================

  setPendingItems([]);
  setCurrentItemIndex(0);
  setItems([]);
  setTraders([]);

  setFormData(prev => ({
    ...prev,

    trader_name: "",
    address: "",
    licence_no: "",

    book_no: "",
    serial_no: "",

    gross_amount: 0,
    cost_per_bag: 0,
    market_fee: 0,
    net_value: 0,

    period_from: "",
    period_to: ""
  }));

  // ==================================================
  // LOAD DEFAULTS
  // ==================================================

  const response = await fetch(
    `${API}/traderspatti/next-defaults`
  );

  const data = await response.json();

  if (!response.ok) {
    return;
  }

  // ==================================================
  // DEFAULT DATE = TODAY
  // ==================================================

  const today = getTodayDate();

  // ==================================================
  // ALL / PEN KATA
  // ==================================================

  if (
    selectedType === "all" ||
    selectedType === "pen"
  ) {

    setIsSavedPatti(false);

    setFormData(prev => ({
      ...prev,

      book_no: data.book_no,
      serial_no: data.serial_no,

      patti_date: today,
      period_from: today,
      period_to: today
    }));

    await loadTraders();
  }

  // ==================================================
  // RETRIEVE SAVED PATTI
  // ==================================================

  else if (
    selectedType === "saved"
  ) {

    setIsSavedPatti(true);

    setFormData(prev => ({
      ...prev,

      // IMPORTANT:
      // Do NOT show new Book / Serial numbers
      book_no: "",
      serial_no: "",

      patti_date: today,
      period_from: today,
      period_to: today
    }));

    await loadSavedTraders(today);
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

// ================= DATE CHANGE =================

const handleDateChange = async (e) => {

  const selectedDate =
    e.target.value;

  // ==================================================
  // RETRIEVE SAVED PATTI
  // ==================================================

  if (isSavedPatti) {

    setFormData(prev => ({

      ...prev,

      patti_date:
        selectedDate,

      period_from:
        selectedDate,

      period_to:
        selectedDate,

      trader_name: "",

      address: "",

      licence_no: "",

      serial_no: "",

      book_no: ""

    }));

    setItems([]);

    setPendingItems([]);

    setCurrentItemIndex(0);

    await loadSavedTraders(
      selectedDate
    );

    return;
  }

  // ==================================================
  // PEN / ALL KATA
  // ==================================================

  const today =
    getTodayDate();

  // Pending items are always loaded
  // up to TODAY.

  setFormData(prev => ({

    ...prev,

    patti_date:
      today,

    period_from:
      today,

    period_to:
      today

  }));

  // No trader selected

  if (!formData.trader_name) {
    return;
  }

  // Reload all pending items
  // up to today.

  await loadTraderDetails(
    formData.trader_name
  );

};
  //================ TRADER CHANGE =================

// ================= TRADER CHANGE =================

const handleTraderChange = async (e) => {

  const traderName =
    e.target.value;

  // Clear previous trader items

  setPendingItems([]);

  setCurrentItemIndex(0);

  setItems([]);

  if (!traderName) {

    setFormData(prev => ({

      ...prev,

      trader_name: "",

      address: "",

      licence_no: ""

    }));

    return;

  }

  setFormData(prev => ({

    ...prev,

    trader_name:
      traderName,

    address: ""

  }));

  // ==================================================
  // LOAD ADDRESS
  // ==================================================

  await loadAccountAddress(
    traderName
  );

  // ==================================================
  // RETRIEVE SAVED PATTI
  // ==================================================

  if (isSavedPatti) {

    await loadSavedPatti(
      traderName,
      formData.patti_date
    );

    return;

  }

  // ==================================================
  // PEN / ALL KATA
  // ==================================================

  // loadTraderDetails itself
  // uses TODAY and displays
  // each item's actual entry_date.

  await loadTraderDetails(
    traderName
  );

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

 // ================= SAVE =================

const handleSave = async () => {

  if (items.length === 0) {

    alert("No items available.");

    return;

  }

  try {

    // ==================================================
    // STORE CURRENT TRADER
    // ==================================================

    const savedTrader =
      formData.trader_name;

    // ==================================================
    // CURRENT PENDING ITEM
    // ==================================================

    const currentItem =
      items[0];

    // ==================================================
    // IMPORTANT:
    // USE CURRENT ITEM'S DATE
    // ==================================================

    const itemDate =
      currentItem.entry_date ||
      formData.patti_date;

    // ==================================================
    // SAVE CURRENT ITEM
    // ==================================================

    const payload = {

      entry_no:
        currentItem.entry_no,

      book_no:
        String(
          formData.book_no
        ),

      serial_no:
        String(
          formData.serial_no
        ),

      // ================================================
      // IMPORTANT:
      // SAVE ITEM'S ACTUAL ENTRY DATE
      // ================================================

      patti_date:
        itemDate,

      trader_name:
        formData.trader_name,

      address:
        formData.address,

      licence_no:
        formData.licence_no,

      item_name:
        currentItem.item_name,

      bags:
        currentItem.bags,

      boras:
        currentItem.boras,

      net_weight:
        currentItem.net_weight,

      rate_per_qtl:
        currentItem.rate_per_qtl,

      actual_price:
        currentItem.actual_price,

      gross_amount:
        currentItem.gross_amount,

      cost_of_bags:
        currentItem.cost_of_bags,

      market_fee:
        currentItem.market_fee,

      net_value:
        currentItem.net_value,

      // ================================================
      // PERIOD ALSO USES ITEM DATE
      // ================================================

      period_from:
        itemDate,

      period_to:
        itemDate

    };

    const response =
      await fetch(

        `${API}/traderspatti/`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json"

          },

          body:
            JSON.stringify(
              payload
            )

        }

      );

    if (!response.ok) {

      const err =
        await response.text();

      console.log(err);

      alert(err);

      return;

    }

    alert(
      "Traders Patti Saved Successfully"
    );

    // ==================================================
    // REMOVE CURRENT ITEM
    // ==================================================

    const remainingItems =
      pendingItems.filter(

        (_, index) =>
          index !==
          currentItemIndex

      );

    setPendingItems(
      remainingItems
    );

    // ==================================================
    // NEXT BOOK / SERIAL
    // ==================================================

    const nextSerial =
      Number(
        formData.serial_no
      ) + 1;

    const nextBook =
      Number(
        formData.book_no
      ) + 1;

    // ==================================================
    // MORE PENDING ITEMS
    // ==================================================

    if (
      remainingItems.length > 0
    ) {

      const nextItem =
        remainingItems[0];

      setCurrentItemIndex(0);

      setItems([
        nextItem
      ]);

      // Get next Book / Serial
      // but KEEP next item's date.

      await loadDefaults(true);

      setFormData(prev => ({

        ...prev,

        book_no:
          String(nextBook),

        serial_no:
          String(nextSerial),

        // ==============================================
        // IMPORTANT:
        // NEXT ITEM'S OWN DATE
        // ==============================================

        patti_date:
          nextItem.entry_date ||
          prev.patti_date,

        period_from:
          nextItem.entry_date ||
          prev.period_from,

        period_to:
          nextItem.entry_date ||
          prev.period_to,

        gross_amount:
          Number(
            nextItem.gross_amount ||
            0
          ),

        cost_per_bag:
          Number(
            nextItem.cost_of_bags ||
            0
          ),

        market_fee:
          Number(
            nextItem.market_fee ||
            0
          ),

        net_value:
          Number(
            nextItem.net_value ||
            0
          )

      }));

    }

    // ==================================================
    // NO MORE PENDING ITEMS
    // ==================================================

    else {

      setTraders(prev =>
        prev.filter(
          name =>
            name !==
            savedTrader
        )
      );

      setItems([]);

      setPendingItems([]);

      setCurrentItemIndex(0);

      // Load next defaults.
      // New farmer/trader starts with
      // today's date.

      await loadDefaults(false);

      setFormData(prev => ({

        ...prev,

        trader_name: "",

        address: "",

        licence_no: "",

        gross_amount: 0,

        cost_per_bag: 0,

        market_fee: 0,

        net_value: 0

      }));

    }

  }

  catch (error) {

    console.log(error);

    alert(
      "Error saving Traders Patti"
    );

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
        ◀ Previous 
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
        Next  ▶
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

 {/* ================= PRINT ================= */}

<div className="print-dropdown">

  <button
    type="button"
    className="print-btn"
    onClick={() =>
      setShowPrintMenu(!showPrintMenu)
    }
  >
    Print ▼
  </button>


  {showPrintMenu && (

    <div className="print-menu">

      {/* ================= CURRENT PATTI ================= */}

      <div className="print-section-title">
        Current Patti
      </div>


      <button
        type="button"
        onClick={() =>
          handlePrint("english", "single")
        }
      >
        English
      </button>


      <button
        type="button"
        onClick={() =>
          handlePrint("telugu", "single")
        }
      >
        తెలుగు
      </button>


      <button
        type="button"
        onClick={() =>
          handlePrint("hindi", "single")
        }
      >
        हिन्दी
      </button>


      <button
        type="button"
        onClick={() =>
          handlePrint("tamil", "single")
        }
      >
        தமிழ்
      </button>


      {/* ================= SEPARATOR ================= */}

      <hr />


      {/* ================= ALL PATTIS ================= */}

      <div className="print-section-title">
        All Pattis
      </div>


      <button
        type="button"
        onClick={() =>
          handlePrint("english", "all")
        }
      >
        English
      </button>


      <button
        type="button"
        onClick={() =>
          handlePrint("telugu", "all")
        }
      >
        తెలుగు
      </button>


      <button
        type="button"
        onClick={() =>
          handlePrint("hindi", "all")
        }
      >
        हिन्दी
      </button>


      <button
        type="button"
        onClick={() =>
          handlePrint("tamil", "all")
        }
      >
        தமிழ்
      </button>

    </div>

  )}


  {/* ================= HIDDEN PRINT COMPONENT ================= */}

 <div style={{ display: "none" }}>
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
