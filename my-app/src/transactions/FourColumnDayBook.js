import React, { useEffect, useState } from "react";
import "./FourColumnDayBook.css";
import API from "../api";

function FourColumnDayBook() {

  const voucherTypes = [
    "Cash Payment",
    "Cash Receipt",
    "Bank Payment",
    "Bank Receipt",
    "Contra",
    "Journal"
  ];

  const createEmptyRows = () => {

    return Array.from(
      { length: 15 },
      () => ({

        income: "",
        credit: "",
        account_name: "",
        pb_no: "",
        expenditure: "",
        narration: ""

      })
    );

  };


  const [transactionNo, setTransactionNo] =
    useState("");

  const [voucherNo, setVoucherNo] =
    useState("");

  const [date, setDate] =
    useState("");

  const [billNo, setBillNo] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [runningTotal, setRunningTotal] =
    useState("0.00");


  const [selectedVoucherType, setSelectedVoucherType] =
    useState("Cash Payment");


  const [rows, setRows] =
    useState(createEmptyRows());
    const [selectedGroup, setSelectedGroup] = useState("All Accs");

const [accounts, setAccounts] = useState([]);


  // =====================================================
  // LOAD DEFAULTS
  // =====================================================

  useEffect(() => {

    loadDefaults(selectedVoucherType);

  }, [selectedVoucherType]);

  useEffect(() => {

  loadAccounts(selectedGroup);

}, [selectedGroup]);


  const loadDefaults = async (voucherType) => {

    try {

      const response = await fetch(

        `${API}/four-column-daybook/new/defaults?voucher_type=${encodeURIComponent(
          voucherType
        )}`

      );


      if (!response.ok) {

        throw new Error(
          "Failed to load defaults"
        );

      }


      const data =
        await response.json();


      setTransactionNo(
        data.transaction_no
      );


      setVoucherNo(
        data.voucher_no
      );


      setDate(
        data.date
      );


      setBillNo(
        data.bill_no
      );


    }

    catch (error) {

      console.error(
        "Error loading defaults:",
        error
      );

    }

  };

  const loadAccounts = async (group) => {

  try {

    let url =
      `${API}/accounts`;

    if (group !== "All Accs") {

      url =
       `${API}/accounts/group/${group}`;

    }

    const response =
      await fetch(url);

    const data =
      await response.json();

    setAccounts(data);

  }

  catch (error) {

    console.error(error);

  }

};


  // =====================================================
  // CHANGE ROW DATA
  // =====================================================

  const handleRowChange = (

    index,
    field,
    value

  ) => {


    const updatedRows =
      [...rows];


    updatedRows[index] = {

      ...updatedRows[index],

      [field]: value

    };


    setRows(
      updatedRows
    );

  };


  // =====================================================
  // CALCULATE TOTAL
  // =====================================================

  const handleCalculate = () => {


    let total = 0;


    rows.forEach((row) => {


      total +=
        parseFloat(row.income) || 0;


      total +=
        parseFloat(row.credit) || 0;


      total +=
        parseFloat(row.expenditure) || 0;


    });


    total +=
      parseFloat(amount) || 0;


    setRunningTotal(
      total.toFixed(2)
    );

  };


  // =====================================================
  // SAVE ONLY ENTERED ROWS
  // =====================================================

  const handleSave = async () => {


    /*
      ONLY ROWS WITH DATA WILL BE SAVED.

      EMPTY ROWS WILL NOT BE SENT
      TO THE BACKEND.
    */


    const enteredRows =
      rows.filter((row) => {


        return (

          row.income !== "" ||

          row.credit !== "" ||

          row.account_name.trim() !== "" ||

          row.pb_no.trim() !== "" ||

          row.expenditure !== "" ||

          row.narration.trim() !== ""

        );

      });


    // ================================================
    // NO DATA CHECK
    // ================================================

    if (
      enteredRows.length === 0
    ) {

      alert(
        "Please enter at least one transaction row"
      );

      return;

    }


    // ================================================
    // ACCOUNT NAME CHECK
    // ================================================

    const invalidRow =
      enteredRows.find(

        (row) =>
          row.account_name.trim() === ""

      );


    if (invalidRow) {

      alert(
        "Please enter Account Name for every entered row"
      );

      return;

    }


    try {


      /*
        SAVE EACH ENTERED ROW

        Example:

        15 rows displayed

        User enters data in:

        Row 1
        Row 2
        Row 5

        Only 3 records are sent
        to the database.
      */


      for (
        const row
        of enteredRows
      ) {


        const response =
          await fetch(

            `${API}/four-column-daybook/`,

            {

              method: "POST",

              headers: {

                "Content-Type":
                  "application/json"

              },


              body: JSON.stringify({

                transaction_no:
                  String(transactionNo),


                voucher_no:
                  String(voucherNo),


                date:
                  date,


                voucher_type:
                  selectedVoucherType,

                    group_name: selectedGroup,  


                income:
                  Number(row.income) || 0,


                credit:
                  Number(row.credit) || 0,


                account_name:
                  row.account_name.trim(),


                pb_no:
                  row.pb_no.trim() || null,


                expenditure:
                  Number(row.expenditure) || 0,


                narration:
                  row.narration.trim() || null,


                bill_no:
                  String(billNo),


                amount:
                  Number(amount) || 0,


                running_total:
                  Number(runningTotal) || 0

              })

            }

          );


        if (
          !response.ok
        ) {


          const errorData =
            await response.json();


          console.error(
            "Backend error:",
            errorData
          );


          throw new Error(
            JSON.stringify(errorData)
          );

        }

      }


      // ================================================
      // SUCCESS
      // ================================================

      alert(
        "Day book entry saved successfully"
      );


      // ================================================
      // CLEAR ROWS
      // ================================================

      setRows(
        createEmptyRows()
      );


      setAmount(
        ""
      );


      setRunningTotal(
        "0.00"
      );


      // ================================================
      // LOAD NEXT NUMBERS
      // ================================================

      loadDefaults(
        selectedVoucherType
      );


    }

    catch (error) {


      console.error(
        "Error saving daybook entry:",
        error
      );


      alert(
        "Error saving daybook entry. Check console."
      );

    }

  };


  // =====================================================
  // CLEAR
  // =====================================================

  const handleClear = () => {


    setRows(
      createEmptyRows()
    );


    setAmount(
      ""
    );


    setRunningTotal(
      "0.00"
    );

  };


  return (

    <div className="daybook-container">


      <h2 className="daybook-title">

        Four Column Day Book Entry

      </h2>


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="header-card">


        <div className="header-grid">


          <div className="field">

            <label>
              Transaction No
            </label>


            <input

              type="text"

              value={
                transactionNo
              }

              readOnly

            />

          </div>


          <div className="field">

            <label>
              Voucher No
            </label>


            <input

              type="text"

              value={
                voucherNo
              }

              readOnly

            />

          </div>


          <div className="field">

            <label>
              Date
            </label>


            <input

              type="date"

              value={
                date
              }

              readOnly

            />

            <div className="field">

  <label>All Accs</label>

  <select

    value={selectedGroup}

    onChange={(e) =>
      setSelectedGroup(e.target.value)
    }

  >

    <option>All Accs</option>
    <option>Traders</option>
    <option>Farmers</option>
    
    

  </select>

</div>

          </div>


        </div>


      </div>


      {/* =====================================================
          VOUCHER TABS
      ===================================================== */}

      <div className="voucher-tabs">


        {voucherTypes.map(

          (voucherType) => (


            <button

              key={
                voucherType
              }

              className={

                selectedVoucherType ===
                voucherType

                  ? "active-tab"

                  : ""

              }


              onClick={() =>

                setSelectedVoucherType(
                  voucherType
                )

              }

            >

              {
                voucherType
              }

            </button>

          )

        )}


      </div>


      {/* =====================================================
          TRANSACTION TABLE
      ===================================================== */}

      <div className="table-card">


        <div className="table-wrapper">


          <table className="daybook-table">


            <thead>


              <tr>

                <th>
                  Income
                </th>

                <th>
                  Credit
                </th>

                <th>
                  Account Name
                </th>

                <th>
                  P.B No
                </th>

                <th>
                  Expenditure
                </th>

                <th>
                  Narration
                </th>

              </tr>


            </thead>


            <tbody>


              {rows.map(

                (row, index) => (


                  <tr
                    key={index}
                  >


                    <td>

                      <input

                        type="number"

                        placeholder="0.00"

                        value={
                          row.income
                        }


                        onChange={(e) =>

                          handleRowChange(

                            index,

                            "income",

                            e.target.value

                          )

                        }

                      />

                    </td>


                    <td>

                      <input

                        type="number"

                        placeholder="0.00"

                        value={
                          row.credit
                        }


                        onChange={(e) =>

                          handleRowChange(

                            index,

                            "credit",

                            e.target.value

                          )

                        }

                      />

                    </td>


                    <td>

                     <select

  value={row.account_name}

  onChange={(e) =>

    handleRowChange(

      index,

      "account_name",

      e.target.value

    )

  }

>

  <option value="">
    Select Account
  </option>

  {accounts.map((account) => (

    <option

      key={account.id}

      value={account.account_name}

    >

      {account.account_name}

    </option>

  ))}

</select>

                    </td>


                    <td>

                      <input

                        type="text"

                        placeholder="P.B No"

                        value={
                          row.pb_no
                        }


                        onChange={(e) =>

                          handleRowChange(

                            index,

                            "pb_no",

                            e.target.value

                          )

                        }

                      />

                    </td>


                    <td>

                      <input

                        type="number"

                        placeholder="0.00"

                        value={
                          row.expenditure
                        }


                        onChange={(e) =>

                          handleRowChange(

                            index,

                            "expenditure",

                            e.target.value

                          )

                        }

                      />

                    </td>


                    <td>

                      <input

                        type="text"

                        placeholder="Narration"

                        value={
                          row.narration
                        }


                        onChange={(e) =>

                          handleRowChange(

                            index,

                            "narration",

                            e.target.value

                          )

                        }

                      />

                    </td>


                  </tr>

                )

              )}


            </tbody>


          </table>


        </div>


      </div>


      {/* =====================================================
          BOTTOM SECTION
      ===================================================== */}

      <div className="bottom-section">


        <div className="details-card">


          <h3>
            Transaction Details
          </h3>


          <div className="details-grid">


            <div className="field">


              <label>
                Bill No
              </label>


              <input

                type="text"

                value={
                  billNo
                }

                readOnly

              />


            </div>


            <div className="field">


              <label>
                Amount
              </label>


              <input

                type="number"

                placeholder="Amount"

                value={
                  amount
                }


                onChange={(e) =>

                  setAmount(
                    e.target.value
                  )

                }

              />


            </div>


          </div>


        </div>


        <div className="total-card">


          <h3>
            Running Total
          </h3>


          <input

            type="text"

            value={
              runningTotal
            }

            readOnly

            className="running-total"

          />


        </div>


      </div>


      {/* =====================================================
          CONTROLS
      ===================================================== */}

      <div className="controls-section">


        <button

          className="save-small-btn"

          onClick={
            handleSave
          }

        >

          Save

        </button>


        <button

          className="cheque-btn"

        >

          Cheque / DD Info

        </button>


      </div>


      {/* =====================================================
          ACTION BUTTONS
      ===================================================== */}

      <div className="action-buttons">


        <button

          className="calculate-btn"

          onClick={
            handleCalculate
          }

        >

          Calculate

        </button>


        <button

          className="save-btn"

          onClick={
            handleSave
          }

        >

          Save

        </button>


        <button

          className="clear-btn"

          onClick={
            handleClear
          }

        >

          Clear

        </button>


        <button

          className="print-btn"

          onClick={() =>
            window.print()
          }

        >

          Print

        </button>


      </div>


    </div>

  );

}


export default FourColumnDayBook;
