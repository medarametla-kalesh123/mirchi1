import React, { useState, useEffect } from "react";
import "./AccountsList.css";

function AccountsList() {

  const emptyForm = {
    account_no: "",
    opening_date: "",
    account_name: "",
    description: "",
    group_name: "",
    opening_balance: 0,
    current_balance: 0,
    tin_no: "",
    credit_limit: 0,
    land_acres: 0,
    interest_pa: 0,
    address: "",
    town: "",
    district: "",
    state: "",
    pincode: "",
    phone_number: "",
    account_name_telugu: "",
    debit_balance: 0,
    credit_balance: 0,
  };

  const [formData, setFormData] = useState(emptyForm);
  const [accountNameError, setAccountNameError] = useState("");
  const [accountSuggestions, setAccountSuggestions] = useState([]);


  // ================= LOAD NEXT ACCOUNT NUMBER =================

  useEffect(() => {

    loadNextAccountNumber();

  }, []);


  const loadNextAccountNumber = async () => {

    try {

      const response = await fetch(
        "https://mirchi1-2.onrender.com/accounts/next-account-number"
      );

      if (response.ok) {

        const data = await response.json();

        setFormData(prev => ({
          ...prev,
          account_no: data.account_no,
          opening_date: data.opening_date
        }));

      }

    } catch (error) {

      console.log(error);

    }

  };


  // ================= LOAD ACCOUNT SUGGESTIONS =================

  const loadAccountSuggestions = async (group) => {

  if (!group) {
    setAccountSuggestions([]);
    return;
  }

  try {

    const response = await fetch(
      `https://mirchi1-2.onrender.com/accounts/group/${encodeURIComponent(group)}/names`
    );

    if (response.ok) {

      const data = await response.json();

      setAccountSuggestions(data);

    } else {

      setAccountSuggestions([]);

    }

  } catch (error) {

    console.log(error);

    setAccountSuggestions([]);

  }

};


  // ================= HANDLE INPUT CHANGE =================

  const handleChange = (e) => {

    const { name, value } = e.target;


    // ================= GROUP CHANGE =================

    if (name === "group_name") {

  // Clear previous group's suggestions
  setAccountSuggestions([]);

  // Clear previous account name
  setFormData(prev => ({
    ...prev,
    group_name: value,
    account_name: "",
  }));

  // Load suggestions only for selected group
  loadAccountSuggestions(value);

  return;
}


    // ================= ACCOUNT NAME CHANGE =================

    if (name === "account_name") {

      setFormData(prev => ({
        ...prev,
        account_name: value,
      }));


      if (value.trim() === "") {

        setAccountNameError(
          "Account Name is required"
        );

        return;

      }


      if (/^\d+$/.test(value.trim())) {

        setAccountNameError(
          "Account Name cannot contain only numbers"
        );

        return;

      }


      setAccountNameError("");


      // Search existing account
      if (formData.group_name) {

        fetchAccount(
          formData.group_name,
          value
        );

      }

      return;

    }


    // ================= OTHER FIELDS =================

    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

  };


  // ================= SEARCH ACCOUNT =================

  const fetchAccount = async (
    groupName,
    accountName
  ) => {

    if (
      !groupName ||
      !accountName.trim()
    ) {

      return;

    }

    try {

      const response = await fetch(
        `https://mirchi1-2.onrender.com/accounts/search?group_name=${encodeURIComponent(
          groupName
        )}&account_name=${encodeURIComponent(
          accountName
        )}`
      );


      if (response.ok) {

        const data = await response.json();

        setFormData(prev => ({
          ...prev,
          ...data,
          opening_date:
            data.opening_date || "",
        }));

      }


      else if (response.status === 404) {

        // New account
        return;

      }


      else {

        const err =
          await response.json();

        alert(err.detail);

      }

    } catch (error) {

      console.log(error);

    }

  };


  // ================= SAVE ACCOUNT =================

  const handleSave = async () => {


    // Required fields validation
    if (
      !formData.account_name.trim() ||
      !formData.group_name
    ) {

      alert(
        "Please fill all the required details"
      );

      return;

    }


    try {

      const response = await fetch(
        "https://mirchi1-2.onrender.com/accounts/",
        {

          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),

        }
      );


      const data =
        await response.json();


      if (response.ok) {


        alert(
          "Account Saved Successfully"
        );


        // Load next account number
        await loadNextAccountNumber();


        // Clear form but keep new number/date
        setFormData(prev => ({

          ...emptyForm,

          account_no:
            prev.account_no,

          opening_date:
            prev.opening_date,

        }));


        setAccountSuggestions([]);

        setAccountNameError("");

      }


      else {

        alert(data.detail);

      }

    } catch (error) {

      console.log(error);

      alert(
        "Backend Server Not Running"
      );

    }

  };


  // ================= UPDATE ACCOUNT =================

  const handleUpdate = async () => {

    try {

      const response = await fetch(
        `https://mirchi1-2.onrender.com/accounts/${formData.account_no}`,
        {

          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),

        }
      );


      const data =
        await response.json();


      if (response.ok) {

        alert(
          "Account Updated Successfully"
        );

      }


      else {

        alert(data.detail);

      }

    } catch (error) {

      console.log(error);

      alert(
        "Backend Server Not Running"
      );

    }

  };


  // ================= DELETE ACCOUNT =================

  const handleDelete = async () => {


    if (
      !window.confirm(
        "Delete this Account?"
      )
    ) {

      return;

    }


    try {

      const response = await fetch(
        `https://mirchi1-2.onrender.com/accounts/${formData.account_no}`,
        {

          method: "DELETE",

        }
      );


      const data =
        await response.json();


      if (response.ok) {


        alert(
          "Account Deleted Successfully"
        );


        await loadNextAccountNumber();


        setFormData(prev => ({

          ...emptyForm,

          account_no:
            prev.account_no,

          opening_date:
            prev.opening_date,

        }));


        setAccountSuggestions([]);

        setAccountNameError("");

      }


      else {

        alert(data.detail);

      }

    } catch (error) {

      console.log(error);

      alert(
        "Backend Server Not Running"
      );

    }

  };


  // ================= CLEAR =================

  const handleClear = async () => {


    await loadNextAccountNumber();


    setFormData(prev => ({

      ...emptyForm,

      account_no:
        prev.account_no,

      opening_date:
        prev.opening_date,

    }));


    setAccountSuggestions([]);

    setAccountNameError("");

  };


  return (

    <div className="accounts-container">


      <h2 className="accounts-title">
        Account Maintenance
      </h2>


      {/* ================= ACCOUNT DETAILS ================= */}

      <div className="account-card">


        <div className="account-grid">


          {/* ACCOUNT NO */}

          <div className="field">

            <label>
              Account No
            </label>

            <input
              type="text"
              name="account_no"
              value={
                formData.account_no
              }
              readOnly
            />

          </div>


          {/* OPENING DATE */}

          <div className="field">

            <label>
              Opening Date
            </label>

            <input
              type="date"
              name="opening_date"
              value={
                formData.opening_date
              }
              readOnly
            />

          </div>


          {/* ACCOUNT NAME */}

          <div className="field">

            <label>
              Account Name
            </label>


           <input
  type="text"
  name="account_name"
  value={formData.account_name}
  onChange={handleChange}
  list="accountNames"
  autoComplete="new-password"
  autoCorrect="off"
  autoCapitalize="off"
  spellCheck="false"
  placeholder="Enter Account Name"
/>


            <datalist id="accountNames">

              {
                accountSuggestions.map(
                  (name, index) => (

                    <option
                      key={index}
                      value={name}
                    />

                  )
                )
              }

            </datalist>


            {
              accountNameError && (

                <div className="error-text">

                  {
                    accountNameError
                  }

                </div>

              )
            }

          </div>


          {/* DESCRIPTION */}

          <div className="field">

            <label>
              Description
            </label>

            <input
              type="text"
              name="description"
              value={
                formData.description
              }
              onChange={
                handleChange
              }
              placeholder="Enter Description"
            />

          </div>


          {/* GROUP NAME */}

          <div className="field">

            <label>
              Group Name
            </label>


            <select
              name="group_name"
              value={
                formData.group_name
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Select Group
              </option>

              <option value="Fixed Assets">
                Fixed Assets
              </option>

              <option value="Gifts">
                Gifts
              </option>

              <option value="Loans & Advances">
                Loans & Advances
              </option>

              <option value="Long Term Liabilities">
                Long Term Liabilities
              </option>

              <option value="Miscellaneous">
                Miscellaneous
              </option>

              <option value="Movable Asset">
                Movable Asset
              </option>

              <option value="Opening Stock Accounts">
                Opening Stock Accounts
              </option>

              <option value="PDFAC">
                PDFAC
              </option>

              <option value="Profit & Loss Accounts">
                Profit & Loss Accounts
              </option>

              <option value="Purchase Accounts">
                Purchase Accounts
              </option>

              <option value="Sales Accounts">
                Sales Accounts
              </option>

              <option value="Shares & Securities">
                Shares & Securities
              </option>

              <option value="Short Term Liabilities">
                Short Term Liabilities
              </option>

              <option value="Source of Funds">
                Source of Funds
              </option>

              <option value="Source of Funds (Bank A/C)">
                Source of Funds (Bank A/C)
              </option>

              <option value="Sundry Creditors (Farmers)">
                Sundry Creditors (Farmers)
              </option>

              <option value="Sundry Debtors">
                Sundry Debtors
              </option>

              <option value="Sundry Debtors (Farmers)">
                Sundry Debtors (Farmers)
              </option>

              <option value="Sundry Expenses">
                Sundry Expenses
              </option>

              <option value="Sundry Income">
                Sundry Income
              </option>

              <option value="Traders">
                Traders
              </option>

              <option value="Trading Expenses">
                Trading Expenses
              </option>

              <option value="Travelling">
                Travelling
              </option>

              <option value="Farmers">
                Farmers
              </option>

            </select>

          </div>


          {/* OPENING BALANCE */}

          <div className="field">

            <label>
              Opening Balance
            </label>

            <input
              type="number"
              name="opening_balance"
              value={
                formData.opening_balance
              }
              onChange={
                handleChange
              }
              placeholder="0.00"
            />

          </div>


          {/* CURRENT BALANCE */}

          <div className="field">

            <label>
              Current Balance
            </label>

            <input
              type="number"
              name="current_balance"
              value={
                formData.current_balance
              }
              onChange={
                handleChange
              }
              placeholder="0.00"
            />

          </div>


          {/* TIN NO */}

          <div className="field">

            <label>
              TIN No
            </label>

            <input
              type="text"
              name="tin_no"
              value={
                formData.tin_no
              }
              onChange={
                handleChange
              }
              placeholder="Enter TIN Number"
            />

          </div>


          {/* CREDIT LIMIT */}

          <div className="field">

            <label>
              Credit Limit
            </label>

            <input
              type="number"
              name="credit_limit"
              value={
                formData.credit_limit
              }
              onChange={
                handleChange
              }
              placeholder="0.00"
            />

          </div>


          {/* LAND ACRES */}

          <div className="field">

            <label>
              Land Acres
            </label>

            <input
              type="number"
              name="land_acres"
              value={
                formData.land_acres
              }
              onChange={
                handleChange
              }
              placeholder="0"
            />

          </div>


          {/* INTEREST */}

          <div className="field">

            <label>
              Interest % P.A.
            </label>

            <input
              type="number"
              name="interest_pa"
              value={
                formData.interest_pa
              }
              onChange={
                handleChange
              }
              placeholder="0"
            />

          </div>


        </div>

      </div>


      {/* ================= ADDRESS DETAILS ================= */}

      <div className="address-card">


        <h3>
          Address Details
        </h3>


        <div className="address-grid">


          {/* ADDRESS */}

          <div className="field address-field">

            <label>
              Address
            </label>

            <textarea
              rows="3"
              name="address"
              value={
                formData.address
              }
              onChange={
                handleChange
              }
              placeholder="Enter Address"
            />


          </div>


          {/* TOWN */}

          <div className="field">

            <label>
              Town
            </label>

            <input
              type="text"
              name="town"
              value={
                formData.town
              }
              onChange={
                handleChange
              }
              placeholder="Enter Town"
            />

          </div>


          {/* DISTRICT */}

          <div className="field">

            <label>
              District
            </label>

            <input
              type="text"
              name="district"
              value={
                formData.district
              }
              onChange={
                handleChange
              }
              placeholder="Enter District"
            />

          </div>


          {/* STATE */}

          <div className="field">

            <label>
              State
            </label>

            <select
              name="state"
              value={
                formData.state
              }
              onChange={
                handleChange
              }
            >

              <option value="">
                Select State
              </option>

              <option value="Andhra Pradesh">
                Andhra Pradesh
              </option>

              <option value="Telangana">
                Telangana
              </option>

              <option value="Karnataka">
                Karnataka
              </option>

              <option value="Tamil Nadu">
                Tamil Nadu
              </option>

            </select>

          </div>


          {/* PINCODE */}

          <div className="field">

            <label>
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={
                formData.pincode
              }
              onChange={
                handleChange
              }
              placeholder="Enter Pincode"
            />

          </div>


          {/* PHONE */}

          <div className="field">

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone_number"
              value={
                formData.phone_number
              }
              onChange={
                handleChange
              }
              placeholder="Enter Phone Number"
            />

          </div>


        </div>

      </div>


      {/* ================= TELUGU ACCOUNT NAME ================= */}

      <div className="telugu-card">


        <h3>
          Account Name (Telugu)
        </h3>


        <div className="field">

          <input
            type="text"
            name="account_name_telugu"
            value={
              formData.account_name_telugu
            }
            onChange={
              handleChange
            }
            placeholder="తెలుగు అకౌంట్ పేరు"
          />

        </div>


      </div>


      {/* ================= BALANCE SUMMARY ================= */}

      <div className="balance-card">


        <h3>
          Balance Summary
        </h3>


        <div className="balance-grid">


          {/* DEBIT */}

          <div className="field">

            <label>
              Debit Balance
            </label>

            <input
              type="number"
              name="debit_balance"
              value={
                formData.debit_balance
              }
              onChange={
                handleChange
              }
            />

          </div>


          {/* CREDIT */}

          <div className="field">

            <label>
              Credit Balance
            </label>

            <input
              type="number"
              name="credit_balance"
              value={
                formData.credit_balance
              }
              onChange={
                handleChange
              }
            />

          </div>


        </div>

      </div>


      {/* ================= ACTION BUTTONS ================= */}

      <div className="action-buttons">


        <button
          className="save-btn"
          onClick={
            handleSave
          }
        >

          Save

        </button>


        <button
          className="update-btn"
          onClick={
            handleUpdate
          }
        >

          Update

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
          className="delete-btn"
          onClick={
            handleDelete
          }
        >

          Delete

        </button>


      </div>


    </div>

  );

}

export default AccountsList;
