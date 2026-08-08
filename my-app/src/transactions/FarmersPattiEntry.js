import React, { useState, useEffect } from "react";
import "./FarmersPattiEntry.css";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import FarmersPattiPrint from "./FarmersPattiPrint";
import API from "../api";

function FarmersPattiEntry({ setPage } ) {

  const [farmers, setFarmers] = useState([]);
  const [items, setItems] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const [kataFarmerType, setKataFarmerType] = useState("");
  const [isSavedPatti, setIsSavedPatti] = useState(false);
  const [showPrintMenu, setShowPrintMenu] = useState(false);

  const [formData, setFormData] = useState({

    farmer_name: "",
    book_no: "",
    patti_date: "",
    serial_no: "",
    address: "",

    yard_advance: 0,
    advance: 0,
    total_bill: 0,
    rounding_off: 0,

    commission: 0,
    expense: 0,
    yard_charges: 0,
    machu: 0,
    nettu_cooli: 0,
    freight: 0,
    kata_cooli: 0,
    tolakam: 0,
    rasi_cooli: 0,

    cash_advance: 0,
    loan_amount: 0,
    interest: 0,

    net_value: 0

  });
const printRef = useRef(null);

const [printData, setPrintData] = useState({
  farmer_name: "",
  patti_date: "",
  language: "english",
  items: [],
});
const handleReactPrint = useReactToPrint({
  contentRef: printRef,
  documentTitle: "Farmers Patti",
});

  // ================= LOAD FARMERS =================

  const loadFarmers = async () => {

    try {

      const response = await fetch(
        `${API}/katalist1/farmers`
      );

      const data = await response.json();

      setFarmers(data);

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
 // ================= LOAD FARMER DETAILS =================

// ================= LOAD FARMER DETAILS =================

// ================= LOAD FARMER DETAILS =================

// ================= LOAD FARMER DETAILS =================

// ================= LOAD FARMER DETAILS =================

const loadFarmerDetails = async (farmerName) => {

  try {

    if (!farmerName) {

      setPendingItems([]);
      setCurrentItemIndex(0);
      setItems([]);

      return;
    }


    // ==================================================
    // IMPORTANT:
    // Query using TODAY so we get ALL pending items
    // from previous dates up to today.
    // ==================================================

    const today = getTodayDate();


    const response = await fetch(
      `${API}/katalist1/farmer/${encodeURIComponent(
        farmerName
      )}?entry_date=${today}`
    );


    if (!response.ok) {

      const errorData = await response.text();

      console.log(
        "Farmer API Error:",
        response.status,
        errorData
      );

      setPendingItems([]);
      setCurrentItemIndex(0);
      setItems([]);

      return;
    }


    const data = await response.json();


    console.log(
      "ALL Pending Items Upto Today:",
      data
    );


    if (data.length > 0) {

      // ==============================================
      // KEEP ALL ITEMS
      // ==============================================

      setPendingItems(data);

      setCurrentItemIndex(0);


      // ==============================================
      // SHOW FIRST PENDING ITEM
      // ==============================================

      const firstItem = data[0];


      setItems([
        firstItem
      ]);


      // ==============================================
      // IMPORTANT:
      // DATE SHOULD BE FIRST ITEM'S DATE
      // NOT TODAY
      // ==============================================

      setFormData(prev => ({

        ...prev,

        farmer_name: farmerName,

        patti_date:
          firstItem.entry_date || today,

        period_from:
          firstItem.entry_date || today,

        period_to:
          firstItem.entry_date || today

      }));

    }
    else {

      setPendingItems([]);

      setCurrentItemIndex(0);

      setItems([]);


      // No pending items -> today

      setFormData(prev => ({

        ...prev,

        farmer_name: farmerName,

        patti_date: today,

        period_from: today,

        period_to: today

      }));

    }

  }
  catch (error) {

    console.error(
      "Error loading farmer details:",
      error
    );

    setPendingItems([]);

    setCurrentItemIndex(0);

    setItems([]);

  }

};
const showCurrentItem = (index) => {

  if (index < 0 || index >= pendingItems.length) return;


  const selectedItem = pendingItems[index];


  setCurrentItemIndex(index);


  setItems([
    selectedItem
  ]);


  // Only update date based on item
  setFormData(prev => ({

    ...prev,

    patti_date:
      selectedItem.entry_date || prev.patti_date,


    // Keep same S.No and Book No
    serial_no:
      prev.serial_no,


    book_no:
      prev.book_no

  }));

};
const handlePrevious = async () => {

  // ================= RETRIEVE SAVED PATTI =================

  if (isSavedPatti) {

    if (currentItemIndex === 0) return;

    const index = currentItemIndex - 1;

    const patti = pendingItems[index];

    const response = await fetch(

      `${API}/farmers-patti/saved?farmer_name=${encodeURIComponent(
        formData.farmer_name
      )}&patti_date=${formData.patti_date}&serial_no=${patti.serial_no}&book_no=${patti.book_no}`

    );

    if (!response.ok) return;

    const data = await response.json();

    if (data.length === 0) return;

    const header = data[0];

    setCurrentItemIndex(index);

    setItems(data);

    setFormData(prev => ({

      ...prev,

      serial_no: header.serial_no,
      book_no: header.book_no,
      patti_date: header.patti_date,

      yard_advance: header.yard_advance,
      advance: header.advance,
      total_bill: header.total_bill,
      rounding_off: header.rounding_off,

      commission: header.commission,
      expense: header.expense,
      yard_charges: header.yard_charges,
      machu: header.machu,
      nettu_cooli: header.nettu_cooli,
      freight: header.freight,
      kata_cooli: header.kata_cooli,
      tolakam: header.tolakam,
      rasi_cooli: header.rasi_cooli,

      cash_advance: header.cash_advance,
      loan_amount: header.loan_amount,
      interest: header.interest,

      net_value: header.net_value

    }));

    return;

  }

  // ================= PENDING PATTI =================

  if (currentItemIndex > 0) {

    showCurrentItem(currentItemIndex - 1);

  }

};

const handleNext = async () => {

  // ================= RETRIEVE SAVED PATTI =================

  if (isSavedPatti) {

    if (currentItemIndex >= pendingItems.length - 1) return;

    const index = currentItemIndex + 1;

    const patti = pendingItems[index];

    const response = await fetch(

      `${API}/farmers-patti/saved?farmer_name=${encodeURIComponent(
        formData.farmer_name
      )}&patti_date=${formData.patti_date}&serial_no=${patti.serial_no}&book_no=${patti.book_no}`

    );

    if (!response.ok) return;

    const data = await response.json();

    if (data.length === 0) return;

    const header = data[0];

    setCurrentItemIndex(index);

    setItems(data);

    setFormData(prev => ({

      ...prev,

      serial_no: header.serial_no,
      book_no: header.book_no,
      patti_date: header.patti_date,

      yard_advance: header.yard_advance,
      advance: header.advance,
      total_bill: header.total_bill,
      rounding_off: header.rounding_off,

      commission: header.commission,
      expense: header.expense,
      yard_charges: header.yard_charges,
      machu: header.machu,
      nettu_cooli: header.nettu_cooli,
      freight: header.freight,
      kata_cooli: header.kata_cooli,
      tolakam: header.tolakam,
      rasi_cooli: header.rasi_cooli,

      cash_advance: header.cash_advance,
      loan_amount: header.loan_amount,
      interest: header.interest,

      net_value: header.net_value

    }));

    return;

  }

  // ================= PENDING PATTI =================

  if (currentItemIndex < pendingItems.length - 1) {

    showCurrentItem(currentItemIndex + 1);

  }

};
const loadAccountAddress = async (farmerName) => {

  try {

    const response = await fetch(
      `${API}/accounts/address/${encodeURIComponent(farmerName)}`
    );

    const data = await response.json();

    setFormData(prev => ({

      ...prev,

      address: data.address || ""

    }));

  }

  catch (error) {

    console.log(error);

  }

};
const loadSavedFarmers = async (selectedDate) => {

  try {

    if (!selectedDate) {

      setFarmers([]);

      return;

    }

    const response = await fetch(
      `${API}/farmers-patti/farmers?patti_date=${encodeURIComponent(
        selectedDate
      )}`
    );

    if (!response.ok) {

      setFarmers([]);

      return;

    }

    const data = await response.json();

    setFarmers(data);

  } catch (error) {

    console.log(error);

    setFarmers([]);

  }

};
  // ================= LOAD DEFAULTS =================

const loadDefaults = async () => {

  try {

    const response = await fetch(
      `${API}/farmers-patti/next-defaults`
    );

    const data = await response.json();

    if (response.ok) {

      setFormData(prev => ({

        ...prev,

        serial_no: data.serial_no,
        book_no: data.book_no,
        patti_date: data.patti_date

      }));

    }

  } catch (error) {

    console.log(error);

  }

};


  // ================= KATA FARMER TYPE =================

const handleKataFarmerTypeChange = async (e) => {

  const selectedType = e.target.value;

  setKataFarmerType(selectedType);

  // ================= CLEAR PREVIOUS STATE =================

  setPendingItems([]);
  setCurrentItemIndex(0);
  setItems([]);
  setFarmers([]);

  setFormData(prev => ({

    ...prev,

    farmer_name: "",
    address: "",

    book_no: "",
    serial_no: "",

    yard_advance: 0,
    advance: 0,
    total_bill: 0,
    rounding_off: 0,

    commission: 0,
    expense: 0,
    yard_charges: 0,
    machu: 0,
    nettu_cooli: 0,
    freight: 0,
    kata_cooli: 0,
    tolakam: 0,
    rasi_cooli: 0,

    cash_advance: 0,
    loan_amount: 0,
    interest: 0,

    net_value: 0,

    period_from: "",
    period_to: ""

  }));


  // ================= ALL KATA FARMERS =================

  if (selectedType === "all") {

    setIsSavedPatti(false);

    await loadDefaults();

    await loadFarmers();

  }


  // ================= PEN KATA FARMERS =================

  else if (selectedType === "pen") {

    setIsSavedPatti(false);

    await loadDefaults();

    await loadFarmers();

  }


  // ================= RETRIEVE SAVED PATTI =================

  else if (selectedType === "saved") {

    setIsSavedPatti(true);

    // TODAY'S DATE
    const today =
      new Date().toISOString().split("T")[0];

    // Set date to TODAY
    setFormData(prev => ({

      ...prev,

      farmer_name: "",
      address: "",

      patti_date: today,
      period_from: today,
      period_to: today,

      serial_no: "",
      book_no: ""

    }));

    // Clear previous Pen.Kata data
    setPendingItems([]);
    setCurrentItemIndex(0);
    setItems([]);

    // Load ONLY today's saved farmers
    await loadSavedFarmers(today);

  }

};
// ================= DATE CHANGE =================

// ================= DATE CHANGE =================

const handleDateChange = async (e) => {

  const selectedDate = e.target.value;


  // ================= RETRIEVE SAVED PATTI =================

  if (isSavedPatti) {

    setFormData(prev => ({
      ...prev,

      patti_date: selectedDate,

      period_from: selectedDate,

      period_to: selectedDate,

      farmer_name: "",

      address: "",

      serial_no: "",

      book_no: ""
    }));


    setItems([]);

    setPendingItems([]);

    setCurrentItemIndex(0);


    await loadSavedFarmers(
      selectedDate
    );

    return;
  }


  // ================= PEN / ALL KATA =================

  const today = getTodayDate();


  // Always keep today's date

  setFormData(prev => ({
    ...prev,

    patti_date: today,

    period_from: today,

    period_to: today
  }));


  // No farmer selected

  if (!formData.farmer_name) {

    return;
  }


  // Reload ALL pending items up to today

  await loadFarmerDetails(
    formData.farmer_name
  );

};
// ================= FARMER CHANGE =================

// ================= FARMER CHANGE =================

// ================= FARMER CHANGE =================

// ================= FARMER CHANGE =================

// ================= FARMER CHANGE =================

const handleFarmerChange = async (e) => {

  const farmerName = e.target.value;


  // Clear previous farmer's items

  setPendingItems([]);

  setCurrentItemIndex(0);

  setItems([]);


  if (!farmerName) {

    setFormData(prev => ({

      ...prev,

      farmer_name: "",

      address: ""

    }));

    return;
  }


  // ================= RETRIEVE SAVED PATTI =================

  if (isSavedPatti) {

    setFormData(prev => ({

      ...prev,

      farmer_name: farmerName,

      address: ""

    }));


    await loadAccountAddress(
      farmerName
    );


    await loadSavedPatti(
      farmerName,
      formData.patti_date
    );

    return;
  }


  // ================= PEN / ALL KATA =================

  // loadFarmerDetails will:
  // 1. Query using TODAY
  // 2. Get ALL pending items
  // 3. Display first item's actual date

  await loadFarmerDetails(
    farmerName
  );


  // Load address

  await loadAccountAddress(
    farmerName
  );

};
//================ LOAD SAVED PATTI =================

const loadSavedPatti = async (farmerName, selectedDate) => {

  try {

    let address = "";

    // ================= LOAD ADDRESS =================

    const accountResponse = await fetch(
      `${API}/accounts/address/${encodeURIComponent(farmerName)}`
    );

    if (accountResponse.ok) {

      const account = await accountResponse.json();

      address = account.address || "";

    }

    // ================= GET ALL PATTIS =================

    const response = await fetch(
      `${API}/farmers-patti/search?farmer_name=${encodeURIComponent(
        farmerName
      )}&patti_date=${selectedDate}`
    );

    if (!response.ok) {

      alert("No Saved Patti Found");

      setPendingItems([]);
      setItems([]);

      return;

    }

    const pattis = await response.json();

    if (pattis.length === 0) {

      setPendingItems([]);
      setItems([]);

      return;

    }

    // Store all Pattis (used by Previous / Next later)
    setPendingItems(pattis);
    setCurrentItemIndex(0);

    // ================= LOAD FIRST PATTI =================

    const first = pattis[0];

    const savedResponse = await fetch(

      `${API}/farmers-patti/saved?farmer_name=${encodeURIComponent(
        farmerName
      )}&patti_date=${selectedDate}&serial_no=${first.serial_no}&book_no=${first.book_no}`

    );

    if (!savedResponse.ok) {

      alert("Unable to Load Patti");

      return;

    }

    const data = await savedResponse.json();

    if (data.length === 0) {

      setItems([]);

      return;

    }

    const header = data[0];

    setFormData(prev => ({

      ...prev,

      farmer_name: header.farmer_name,
      address: address,
      serial_no: header.serial_no,
      book_no: header.book_no,
      patti_date: header.patti_date,

      yard_advance: header.yard_advance,
      advance: header.advance,
      total_bill: header.total_bill,
      rounding_off: header.rounding_off,

      commission: header.commission,
      expense: header.expense,
      yard_charges: header.yard_charges,
      machu: header.machu,
      nettu_cooli: header.nettu_cooli,
      freight: header.freight,
      kata_cooli: header.kata_cooli,
      tolakam: header.tolakam,
      rasi_cooli: header.rasi_cooli,

      cash_advance: header.cash_advance,
      loan_amount: header.loan_amount,
      interest: header.interest,

      net_value: header.net_value

    }));

    setItems(data);

  }

  catch (error) {

    console.log(error);

    setPendingItems([]);
    setItems([]);

  }

};
  // ================= INPUT CHANGE =================

  const handleInputChange = (
    field,
    value
  ) => {

    setFormData({

      ...formData,

      [field]: value

    });

  };


  // ================= TOTAL BAGS =================

  const totalBags = items.reduce(

    (total, item) => {

      return (

        total +

        Number(
          item.bags || 0
        )

      );

    },

    0

  );


  // ================= TOTAL NET VALUE =================

 const totalNetValue = items.reduce(

  (total, item) => {

    return total + Number(item.net_value || 0);

  },

  0

);

  // ================= COMMISSION TOTAL =================

  const commissionTotal =

    totalNetValue *

    (

      Number(
        formData.commission || 0
      ) / 100

    );


  // ================= BAG CHARGES =================

  const expenseTotal =

    totalBags *

    Number(
      formData.expense || 0
    );


  const yardChargesTotal =

    totalBags *

    Number(
      formData.yard_charges || 0
    );


  const machuTotal =

    totalBags *

    Number(
      formData.machu || 0
    );


  const nettuCooliTotal =

    totalBags *

    Number(
      formData.nettu_cooli || 0
    );


  const freightTotal =

    totalBags *

    Number(
      formData.freight || 0
    );


  const kataCooliTotal =

    totalBags *

    Number(
      formData.kata_cooli || 0
    );


  const tolakamTotal =

    totalBags *

    Number(
      formData.tolakam || 0
    );


  const rasiCooliTotal =

    totalBags *

    Number(
      formData.rasi_cooli || 0
    );


  // ================= TOTAL CHARGES =================

  const totalCharges =

    commissionTotal +

    expenseTotal +

    yardChargesTotal +

    machuTotal +

    nettuCooliTotal +

    freightTotal +

    kataCooliTotal +

    tolakamTotal +

    rasiCooliTotal +

    Number(
      formData.cash_advance || 0
    ) +

    Number(
      formData.loan_amount || 0
    ) +

    Number(
      formData.interest || 0
    );


  // ================= TOTAL BILL =================

  const totalBillCalculation =

    totalNetValue -

    totalCharges;


  // ================= ROUNDING OFF =================

  const roundingOff =

    Math.round(
      totalBillCalculation
    );




 // ================= SAVE =================

const handleSave = async () => {

  try {

    if (items.length === 0) {

      alert("No item details available to save");
      return;

    }


    const savedFarmer = formData.farmer_name;


    const currentItem = items[0];


    const itemBags = Number(currentItem.bags || 0);

    const itemNetValue = Number(currentItem.net_value || 0);



    // ================= ITEM WISE CHARGES =================


    const itemCommission =
      itemNetValue *
      (Number(formData.commission || 0) / 100);


    const itemExpense =
      itemBags *
      Number(formData.expense || 0);


    const itemYardCharges =
      itemBags *
      Number(formData.yard_charges || 0);


    const itemMachu =
      itemBags *
      Number(formData.machu || 0);


    const itemNettuCooli =
      itemBags *
      Number(formData.nettu_cooli || 0);


    const itemFreight =
      itemBags *
      Number(formData.freight || 0);


    const itemKataCooli =
      itemBags *
      Number(formData.kata_cooli || 0);


    const itemTolakam =
      itemBags *
      Number(formData.tolakam || 0);


    const itemRasiCooli =
      itemBags *
      Number(formData.rasi_cooli || 0);



    const itemCashAdvance =
      Number(formData.cash_advance || 0);


    const itemLoanAmount =
      Number(formData.loan_amount || 0);


    const itemInterest =
      Number(formData.interest || 0);



    const itemTotalCharges =

      itemCommission +
      itemExpense +
      itemYardCharges +
      itemMachu +
      itemNettuCooli +
      itemFreight +
      itemKataCooli +
      itemTolakam +
      itemRasiCooli +
      itemCashAdvance +
      itemLoanAmount +
      itemInterest;



    const itemTotalBill =
      itemNetValue - itemTotalCharges;



    const itemRoundingOff =
      Math.round(itemTotalBill);



    // ================= SAVE CURRENT ITEM =================


    const response = await fetch(

      `${API}/farmers-patti/`,

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json",
        },


        body:JSON.stringify({

          entry_no: currentItem.entry_no,


          farmer_name: formData.farmer_name,


          // SAME UNTIL SAVE
          book_no: String(formData.book_no),


          serial_no: String(formData.serial_no),


          // ITEM OWN DATE
          patti_date:
          currentItem.entry_date || formData.patti_date,


          address: formData.address,


          item_name:
          currentItem.item_name || "",


          bags:
          currentItem.bags || 0,


          boras:
          currentItem.boras || 0,


          net_weight:
          currentItem.net_weight || 0,


          rate_per_qtl:
          currentItem.rate_per_qtl || 0,


          gross_amount:
          Number(currentItem.gross_amount || 0),


          cost_of_bags:
          Number(currentItem.cost_of_bags || 0),


          market_fee:
          Number(currentItem.market_fee || 0),


          net_value:
          itemNetValue,


          yard_advance:
          formData.yard_advance,


          advance:
          formData.advance,


          total_bill:
          itemTotalBill,


          rounding_off:
          itemRoundingOff,


          commission:
          formData.commission,


          expense:
          formData.expense,


          yard_charges:
          formData.yard_charges,


          machu:
          formData.machu,


          nettu_cooli:
          formData.nettu_cooli,


          freight:
          formData.freight,


          kata_cooli:
          formData.kata_cooli,


          tolakam:
          formData.tolakam,


          rasi_cooli:
          formData.rasi_cooli,


          cash_advance:
          itemCashAdvance,


          loan_amount:
          itemLoanAmount,


          interest:
          itemInterest,


          total_charges:
          itemTotalCharges


        })

      });



    const data = await response.json();


    if(!response.ok){

      alert(JSON.stringify(data,null,2));

      return;

    }



    // ================= AFTER SAVE =================


    alert("Farmers Patti Saved Successfully");



    const remainingItems =

      pendingItems.filter(

        (_,index)=>
        index !== currentItemIndex

      );



    setPendingItems(remainingItems);



    // ================= INCREMENT ONLY AFTER SAVE =================


    const nextSerial =
      Number(formData.serial_no) + 1;


    const nextBook =
      Number(formData.book_no) + 1;



    if(remainingItems.length > 0){


      setCurrentItemIndex(0);


      const nextItem = remainingItems[0];


      setItems([nextItem]);



      setFormData(prev => ({

        ...prev,


        serial_no:String(nextSerial),


        book_no:String(nextBook),


        // next item's date
        patti_date:
        nextItem.entry_date || prev.patti_date


      }));


    }

    else {


      // Farmer completed


      setFarmers(prev =>

        prev.filter(
          name =>
          name !== savedFarmer
        )

      );


      setPendingItems([]);

      setItems([]);



      setFormData(prev => ({

        ...prev,


        farmer_name:"",

        address:"",


        serial_no:String(nextSerial),


        book_no:String(nextBook),


        yard_advance:0,

        advance:0,

        total_bill:0,

        rounding_off:0,


        commission:0,

        expense:0,

        yard_charges:0,

        machu:0,

        nettu_cooli:0,

        freight:0,

        kata_cooli:0,

        tolakam:0,

        rasi_cooli:0,


        cash_advance:0,

        loan_amount:0,

        interest:0,


        net_value:0

      }));

    }


  }

  catch(error){

    console.error(error);

    alert("Error saving Farmers Patti");

  }

};

 const handleClear = async () => {

  setItems([]);

  setFarmers([]);

  setIsSavedPatti(false);

  setKataFarmerType("");

  setFormData(prev => ({

    ...prev,

    farmer_name: "",

    address: "",

    yard_advance: 0,

    advance: 0,

    total_bill: 0,

    rounding_off: 0,

    commission: 0,

    expense: 0,

    yard_charges: 0,

    machu: 0,

    nettu_cooli: 0,

    freight: 0,

    kata_cooli: 0,

    tolakam: 0,

    rasi_cooli: 0,

    cash_advance: 0,

    loan_amount: 0,

    interest: 0,

    net_value: 0

  }));

  await loadDefaults();

};
// ================= LOAD SINGLE PATTI PRINT DATA =================

// ================= LOAD SINGLE PATTI PRINT DATA =================

const loadSinglePrintData = async (
  farmerName,
  pattiDate,
  serialNo,
  bookNo
) => {

  try {

    const response = await fetch(
      `${API}/farmers-patti/print-single` +
      `?farmer_name=${encodeURIComponent(farmerName)}` +
      `&patti_date=${encodeURIComponent(pattiDate)}` +
      `&serial_no=${encodeURIComponent(serialNo)}` +
      `&book_no=${encodeURIComponent(bookNo)}`
    );

    const result = await response.json();

    if (!response.ok) {

      console.error(
        "Single Print API Error:",
        result
      );

      alert(
        result.detail ||
        "Unable to load current Patti"
      );

      return null;
    }

    return result;

  } catch (error) {

    console.error(
      "Single Print Error:",
      error
    );

    alert("Unable to load current Patti");

    return null;
  }
};


// ================= LOAD ALL PATTI PRINT DATA =================

const loadAllPrintData = async (
  farmerName,
  pattiDate
) => {

  try {

    const response = await fetch(
      `${API}/farmers-patti/print` +
      `?farmer_name=${encodeURIComponent(farmerName)}` +
      `&patti_date=${encodeURIComponent(pattiDate)}`
    );

    const result = await response.json();

    if (!response.ok) {

      console.error(
        "All Print API Error:",
        result
      );

      alert(
        result.detail ||
        "Unable to load all Pattis"
      );

      return null;
    }

    return result;

  } catch (error) {

    console.error(
      "All Print Error:",
      error
    );

    alert("Unable to load all Pattis");

    return null;
  }
};


// ================= HANDLE PRINT =================

const handlePrint = async (
  language,
  printType
) => {

  // Close dropdown
  setShowPrintMenu(false);


  // ================= VALIDATION =================

  if (!formData.farmer_name) {

    alert("Please select a farmer");

    return;
  }

  if (!formData.patti_date) {

    alert("Patti date is missing");

    return;
  }


  let result = null;


  // ==================================================
  // CURRENT / SINGLE PATTI
  // ==================================================

  if (printType === "single") {

    if (!formData.serial_no) {

      alert("Serial number is missing");

      return;
    }

    if (!formData.book_no) {

      alert("Book number is missing");

      return;
    }


    result = await loadSinglePrintData(

      formData.farmer_name,

      formData.patti_date,

      formData.serial_no,

      formData.book_no

    );

  }


  // ==================================================
  // ALL PATTIS
  // ==================================================

  else if (printType === "all") {

    result = await loadAllPrintData(

      formData.farmer_name,

      formData.patti_date

    );

  }


  // ================= CHECK RESULT =================

  if (!result) {

    return;
  }


  // ================= SET PRINT DATA =================

  setPrintData({

    ...result,

    language: language

  });


  // ================= START PRINT =================

  setTimeout(() => {

    handleReactPrint();

  }, 100);

};
  // ================= LOAD ON PAGE OPEN =================

useEffect(() => {



  loadDefaults();

}, []);


  return (

    <div className="farmers-container">


      <h2 className="farmers-title">

        Farmers Patti Entry

      </h2>


      {/* ================= FARMER DETAILS ================= */}

      <div className="farmer-card">

        <div className="farmer-grid">


          {/* KATA TYPE */}

          <div className="field">

            <label>

              Refresh From Kata List

            </label>


           <select
  value={kataFarmerType}
  onChange={handleKataFarmerTypeChange}
>

  <option value="">
    Select Kata Farmer Type
  </option>

  <option value="all">
    All Kata Farmers
  </option>

  <option value="pen">
    Pen.Kata Farmers
  </option>

  <option value="saved">
    Retrieve Saved Patti
  </option>

</select>

          </div>


          {/* FARMER */}

          <div className="field">

            <label>

              Farmer Name

            </label>


            <select

              value={
                formData.farmer_name
              }

              onChange={
                handleFarmerChange
              }

            >

              <option value="">

                Select Farmer

              </option>


              {farmers.map(

                (

                  farmer,

                  index

                ) => (

                  <option

                    key={index}

                    value={farmer}

                  >

                    {farmer}

                  </option>

                )

              )}

            </select>

          </div>


          {/* BOOK NO */}

          <div className="field">

            <label>

              Book No

            </label>


            <input

              type="text"

              value={
                formData.book_no
              }

              readOnly

            />

          </div>


          {/* DATE */}

          <div className="field">

            <label>

              Date

            </label>


            <input

              type="date"

              value={
                formData.patti_date
              }

              onChange={handleDateChange}

            />

          </div>


          {/* SERIAL NO */}

          <div className="field">

            <label>

              S.No

            </label>


            <input

              type="text"

              value={
                formData.serial_no
              }

              readOnly

            />

          </div>


        </div>


        {/* ADDRESS */}

        <div className="field address-field">

          <label>

            Address

          </label>


         <input
  type="text"
  value={formData.address}
  readOnly
/>

        </div>


      </div>


      {/* ================= ITEM TABLE ================= */}

      <div className="table-card">

        <h3>

          Item Details

        </h3>


        <div className="table-wrapper">

          <table className="farmers-table">

            <thead>

              <tr>

                <th>S.No</th>

                <th>Item Name</th>

                <th>Bags</th>

                <th>Boras</th>

                <th>Net Weight</th>

                <th>Rate / Qtl</th>

                <th>Gross Amount</th>

                <th>Cost of Bags</th>

                <th>Market Fee</th>

                <th>Net Value</th>

              </tr>

            </thead>


          <tbody>

  {items.map((item, index) => {

    return (

      <tr
        key={item.id || index}
      >

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

        <td>
          <input
            type="number"
            value={
              item.rate_per_qtl||0
            
              
            }
            readOnly
          />
        </td>

        <td>
          <input
            type="number"
            value={item.gross_amount || 0}
            readOnly
          />
        </td>

        <td>
          <input
            type="number"
            value={item.cost_of_bags || 0}
            readOnly
          />
        </td>

        <td>
          <input
            type="number"
            value={item.market_fee || 0}
            readOnly
          />
        </td>

        <td>
          <input
            type="number"
            value={item.net_value || 0}
            readOnly
          />
        </td>

      </tr>

    );

  })}

</tbody>

          </table>

        </div>

      </div>


      {/* ================= SUMMARY ================= */}

      <div className="summary-card">

        <h3>

          Financial Summary

        </h3>


        <div className="summary-grid">


          <div className="field">

            <label>

              Yard Advance

            </label>


            <input

              type="number"

              value={

                formData.yard_advance

              }

              onChange={(e) =>

                handleInputChange(

                  "yard_advance",

                  e.target.value

                )

              }

            />

          </div>


          <div className="field">

            <label>

              Advance

            </label>


            <input

              type="number"

              value={

                formData.advance

              }

              onChange={(e) =>

                handleInputChange(

                  "advance",

                  e.target.value

                )

              }

            />

          </div>


          <div className="field">

            <label>

              Total Bill

            </label>


            <input

              type="number"

              value={

                totalBillCalculation

              }

              readOnly

            />

          </div>


          <div className="field">

            <label>

              Rounding Off

            </label>


            <input

              type="number"

              value={

                roundingOff

              }

              readOnly

            />

          </div>


        </div>

      </div>


      {/* ================= CHARGES ================= */}

      <div className="charges-card">

        <h3>

          Charges

        </h3>


        <div className="charges-header">

          <div>

            Charge

          </div>


          <div>

            Rate

          </div>


          <div>

            Total

          </div>

        </div>


        {/* COMMISSION */}

        <div className="charge-row">

          <label>

            Commission

          </label>


          <div className="rate-box">

            <input

              type="number"

              value={

                formData.commission

              }

              onChange={(e) =>

                handleInputChange(

                  "commission",

                  e.target.value

                )

              }

            />


            <span>

              %

            </span>

          </div>


          <input

            type="number"

            value={

              commissionTotal

            }

            readOnly

          />

        </div>


        {/* EXPENSE */}

        <div className="charge-row">

          <label>

            Expense

          </label>


          <div className="rate-box">

            <input

              type="number"

              value={

                formData.expense

              }

              onChange={(e) =>

                handleInputChange(

                  "expense",

                  e.target.value

                )

              }

            />


            <span>

              /Bag

            </span>

          </div>


          <input

            type="number"

            value={

              expenseTotal

            }

            readOnly

          />

        </div>


        {/* OTHER CHARGES */}

        {[

          [

            "Yard Charges",

            "yard_charges",

            yardChargesTotal

          ],


          [

            "Machu",

            "machu",

            machuTotal

          ],


          [

            "Nettu Cooli",

            "nettu_cooli",

            nettuCooliTotal

          ],


          [

            "Freight",

            "freight",

            freightTotal

          ],


          [

            "Kata Cooli",

            "kata_cooli",

            kataCooliTotal

          ],


          [

            "Tolakam",

            "tolakam",

            tolakamTotal

          ],


          [

            "Rasi Cooli",

            "rasi_cooli",

            rasiCooliTotal

          ]

        ].map(

          (

            [

              label,

              key,

              total

            ]

          ) => (

            <div

              className="charge-row"

              key={key}

            >

              <label>

                {label}

              </label>


              <div className="rate-box">

                <input

                  type="number"

                  value={

                    formData[key]

                  }

                  onChange={(e) =>

                    handleInputChange(

                      key,

                      e.target.value

                    )

                  }

                />


                <span>

                  /Bag

                </span>

              </div>


              <input

                type="number"

                value={

                  total

                }

                readOnly

              />

            </div>

          )

        )}


        {/* CASH ADVANCE */}

        <div className="amount-row">

          <label>

            Cash Advance

          </label>


          <input

            type="number"

            value={

              formData.cash_advance

            }

            onChange={(e) =>

              handleInputChange(

                "cash_advance",

                e.target.value

              )

            }

          />

        </div>


        {/* LOAN AMOUNT */}

        <div className="amount-row">

          <label>

            Loan Amount

          </label>


          <input

            type="number"

            value={

              formData.loan_amount

            }

            onChange={(e) =>

              handleInputChange(

                "loan_amount",

                e.target.value

              )

            }

          />

        </div>


        {/* INTEREST */}

        <div className="amount-row">

          <label>

            Interest

          </label>


          <input

            type="number"

            value={

              formData.interest

            }

            onChange={(e) =>

              handleInputChange(

                "interest",

                e.target.value

              )

            }

          />

        </div>


        {/* TOTAL CHARGES */}

        <div className="total-charges-row">

          <label>

            Total Charges

          </label>


          <input

            type="number"

            value={

              totalCharges

            }

            readOnly

          />

        </div>

      </div>

  <div className="net-card">

            <label>

              Total Bill

            </label>


            <input

              type="number"

              value={

                totalBillCalculation

              }

              readOnly

            />

          </div>


    {/* ================= BUTTONS ================= */}

<div className="action-buttons">

  {/* Pending Patti */}
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

  {/* Retrieve Saved Patti */}
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

  <button
    className="clear-btn"
    onClick={handleClear}
  >
    Clear
  </button>

  <div className="print-dropdown">

    <button
      className="print-btn"
      onClick={() => setShowPrintMenu(!showPrintMenu)}
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
      onClick={() =>
        handlePrint("english", "single")
      }
    >
      English
    </button>

    <button
      onClick={() =>
        handlePrint("telugu", "single")
      }
    >
      తెలుగు
    </button>

    <button
      onClick={() =>
        handlePrint("hindi", "single")
      }
    >
      हिन्दी
    </button>

    <button
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
      onClick={() =>
        handlePrint("english", "all")
      }
    >
      English
    </button>

    <button
      onClick={() =>
        handlePrint("telugu", "all")
      }
    >
      తెలుగు
    </button>

    <button
      onClick={() =>
        handlePrint("hindi", "all")
      }
    >
      हिन्दी
    </button>

    <button
      onClick={() =>
        handlePrint("tamil", "all")
      }
    >
      தமிழ்
    </button>

  </div>

)}
      
  </div>

  {/* Hidden Printable Component */}

  <div
    style={{
      position: "absolute",
      left: "-10000px",
      top: 0,
    }}
  >
    <FarmersPattiPrint
      ref={printRef}
      printData={printData}
      setPage={setPage}
    />
  </div>

</div>
    </div>

  );

}

export default FarmersPattiEntry;