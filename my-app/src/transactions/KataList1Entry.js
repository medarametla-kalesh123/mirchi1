import React, { useState, useEffect } from "react";
import "./KataList1Entry.css";

function KataList1Entry() {

  const emptyForm = {

    entry_no: "",
    entry_date: "",

    company: "",
    farmer_patti: "",
    trader_patti: "",
    item_name: "",

    bags: 0,
    boras: 0,
    net_weight: 0,

    farmer_price: 0,
    trader_price: 0,
    actual_price: 0,
    f_weight: 0,

    cold_storage: "",
    bond_no: ""

  };

  const [formData, setFormData] = useState(emptyForm);

  const [farmers, setFarmers] = useState([]);
  const [traders, setTraders] = useState([]);
  const [recentEntries, setRecentEntries] = useState([]);

  const loadRecentEntries = async () => {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/katalist1/recent"
    );

    const data = await response.json();

    setRecentEntries(data);

  } catch (error) {

    console.log(error);

  }

};

  // ================= Handle Change =================

const handleChange = (e) => {

  const { name, value } = e.target;

  // ================= Net Weight =================

  if (name === "net_weight") {

    setFormData(prev => ({

      ...prev,

      net_weight: value,
      f_weight: value

    }));

    return;

  }

  // ================= Farmer Price =================

  if (name === "farmer_price") {

    setFormData(prev => ({

      ...prev,

      farmer_price: value,
      trader_price: value,
      actual_price: value

    }));

    return;

  }

  // ================= Other Fields =================

  setFormData(prev => ({

    ...prev,

    [name]: value

  }));

};



  // ================= Load Farmers =================

  const loadFarmers = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/accounts/group/Farmers"
      );

      const data = await response.json();

      setFarmers(data);

    } catch (error) {

      console.log(error);

    }

  };

  // ================= Load Traders =================

  const loadTraders = async () => {

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/accounts/group/Traders"
      );

      const data = await response.json();

      setTraders(data);

    } catch (error) {

      console.log(error);

    }

  };
  // ================= Load Default Values =================

const loadDefaults = async () => {

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/katalist1/next"
    );

    const data = await response.json();

    const today = new Date();

    const formattedDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    setFormData(prev => ({
      ...prev,
      entry_no: data.entry_no,
      bond_no: data.bond_no,
      entry_date: formattedDate
    }));

  } catch (error) {

    console.log(error);

  }

};

  // ================= Load on Page Open =================

  useEffect(() => {

    loadFarmers();
    loadTraders();
     loadDefaults();
      loadRecentEntries();

  }, []);

  

 
  // ================= Save =================

 const handleSave = async () => {

  // ================= Validation =================

  if (!formData.farmer_patti) {
    alert("Please select Farmer Name");
    return;
  }

  if (!formData.trader_patti) {
    alert("Please select Trader Name");
    return;
  }
  if (!formData.item_name) {
  alert("Please select Item Name");
  return;
}

if (Number(formData.bags) <= 0) {
  alert("Please enter No.of Bags");
  return;
}

  if (Number(formData.net_weight) <= 0) {
    alert("Please enter Net Weight");
    return;
  }

  if (Number(formData.farmer_price) <= 0) {
    alert("Please enter Farmer Price");
    return;
  }

  if (Number(formData.trader_price) <= 0) {
    alert("Please enter Trader Price");
    return;
  }

  if (Number(formData.actual_price) <= 0) {
    alert("Please enter Actual Price");
    return;
  }

  if (Number(formData.f_weight) <= 0) {
    alert("Please enter F.Weight");
    return;
  }

  // ================= Save =================

  try {

    const response = await fetch(
      "http://127.0.0.1:8000/katalist1/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

    const data = await response.json();

    if (response.ok) {

      alert("Entry Saved Successfully");

      loadRecentEntries();

      const today = new Date();

const formattedDate =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

setFormData({
  ...emptyForm,
  entry_date: formattedDate
});
      loadDefaults();

    } else {

      alert(data.detail);

    }

  } catch (error) {

    console.log(error);
    alert("Backend Server Not Running");

  }

};
  // ================= Update =================

  const handleUpdate = async () => {

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/katalist1/${formData.entry_no}`,
        {

          method: "PUT",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify(formData)

        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Entry Updated Successfully");

      }
      else {

        alert(data.detail);

      }

    }
    catch (error) {

      console.log(error);

      alert("Backend Server Not Running");

    }

  };

  // ================= Delete =================

  const handleDelete = async () => {

    if (!window.confirm("Delete this Entry?")) return;

    try {

      const response = await fetch(
        `http://127.0.0.1:8000/katalist1/${formData.entry_no}`,
        {

          method: "DELETE"

        }
      );

      const data = await response.json();

      if (response.ok) {

        alert("Entry Deleted Successfully");

        setFormData(emptyForm);

      }
      else {

        alert(data.detail);

      }

    }
    catch (error) {

      console.log(error);

      alert("Backend Server Not Running");

    }

  };

  // ================= Clear =================

 const handleClear = () => {

  const today = new Date();

const formattedDate =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");

setFormData({
  ...emptyForm,
  entry_date: formattedDate
});

  loadDefaults();

};
    return (

    <div className="kata1-container">

      <h2 className="kata1-title">
        Kata List - 1 Entry
      </h2>

      {/* ================= Header ================= */}

      <div className="kata1-header">

        <div className="header-field">

          <label>Entry No</label>

          <input
            type="text"
            name="entry_no"
            value={formData.entry_no}
            readOnly
          />

        </div>

        <div className="header-field">

          <label>Date</label>

          <input
  type="date"
  name="entry_date"
  value={formData.entry_date}
  readOnly
/>

        </div>

      </div>

      {/* ================= Table ================= */}

      <div className="table-container">

        <table className="kata1-table">

          <thead>

            <tr>

              <th>S.No</th>
              <th>Company</th>
              <th>Farmer Patti</th>
              <th>Trader Patti</th>
              <th>Item Name</th>
              <th>Bags</th>
              <th>Boras</th>
              <th>Net Weight</th>
              <th>Farmer Price</th>
              <th>Trader Price</th>
              <th>Actual Price</th>
              <th>F.Weight</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>1</td>

              <td>

                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                >

                  <option value="">Select</option>
                  <option value="Company 1">Company 1</option>
                  <option value="Company 2">Company 2</option>

                </select>

              </td>

              {/* ================= Farmers ================= */}

              <td>

                <select
                  name="farmer_patti"
                  value={formData.farmer_patti}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Farmer
                  </option>

                  {farmers.map((farmer) => (

                    <option
                      key={farmer.id}
                      value={farmer.account_name}
                    >

                      {farmer.account_name}

                    </option>

                  ))}

                </select>

              </td>

              {/* ================= Traders ================= */}

              <td>

                <select
                  name="trader_patti"
                  value={formData.trader_patti}
                  onChange={handleChange}
                >

                  <option value="">
                    Select Trader
                  </option>

                  {traders.map((trader) => (

                    <option
                      key={trader.id}
                      value={trader.account_name}
                    >

                      {trader.account_name}

                    </option>

                  ))}

                </select>

              </td>

              <td>

                <select
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleChange}
                >

                  <option value="">
                    Select
                  </option>

                  <option value="Red Chilli">
                    Red Chilli
                  </option>

                  <option value="AC White Chilli">
                    AC White Chilli
                  </option>

                  <option value="AC Red Chilli">
                    AC Red Chilli</option>

                   <option value="White Chilli">White Chilli</option> 

                </select>

              </td>

              <td>

                <input
                  type="number"
                  name="bags"
                  value={formData.bags}
                  onChange={handleChange}
                />

              </td>

              <td>

                <input
                  type="number"
                  name="boras"
                  value={formData.boras}
                  onChange={handleChange}
                />

              </td>

              <td>

                <input
                  type="number"
                  name="net_weight"
                  value={formData.net_weight}
                  onChange={handleChange}
                />

              </td>

              <td>

                <input
                  type="number"
                  name="farmer_price"
                  value={formData.farmer_price}
                  onChange={handleChange}
                />

              </td>

              <td>

                <input
                  type="number"
                  name="trader_price"
                  value={formData.trader_price}
                  onChange={handleChange}
                />

              </td>

              <td>

                <input
                  type="number"
                  name="actual_price"
                  value={formData.actual_price}
                  onChange={handleChange}
                />

              </td>

              <td>

                <input
                  type="number"
                  name="f_weight"
                  value={formData.f_weight}
                  onChange={handleChange}
                />

              </td>

            </tr>

          </tbody>

        </table>

      </div>
            {/* ================= Bottom Fields ================= */}

      <div className="kata-bottom">

        <div className="bottom-field">

          <label>Cold Storage Name</label>

          <select
            name="cold_storage"
            value={formData.cold_storage}
            onChange={handleChange}
          >

            <option value="">
              Select Cold Storage
            </option>

            <option value="Cold Storage 1">
              Cold Storage 1
            </option>

            <option value="Cold Storage 2">
              Cold Storage 2
            </option>

          </select>

        </div>

        <div className="bottom-field">

          <label>Bond No</label>

          <input
            type="text"
            name="bond_no"
            value={formData.bond_no}
           readOnly
          />

        </div>

      </div>

      {/* ================= Action Buttons ================= */}

      <div className="action-buttons">

        <button
          className="save-btn"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="update-btn"
          onClick={handleUpdate}
        >
          Update
        </button>

        <button
          className="clear-btn"
          onClick={handleClear}
        >
          Clear
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Delete
        </button>

      </div>
      {/* ================= RECENT ENTRIES ================= */}

<div className="recent-section">

  <div className="recent-title">
    RECENT ENTRIES
  </div>

  <div className="recent-table-container">

    <table className="recent-table">

      <thead>

        <tr>

          <th>Entry No</th>
          <th>Date</th>
          <th>Farmer</th>
          <th>Trader</th>
          <th>Item</th>
          <th>Bags</th>
          <th>Boras</th>
          <th>Net Wt</th>
          <th>Farmer Price</th>
          <th>Trader Price</th>
          <th>Actual Price</th>
          <th>F.Weight</th>
          <th>Bond No</th>

        </tr>

      </thead>

      <tbody>

        {recentEntries.length === 0 ? (

          <tr>

            <td colSpan="13" style={{ textAlign: "center" }}>
              No Records Found
            </td>

          </tr>

        ) : (

          recentEntries.map((entry) => (

            <tr key={entry.id}>

              <td>{entry.entry_no}</td>

              <td>
                {new Date(entry.entry_date).toLocaleDateString("en-GB")}
              </td>

              <td>{entry.farmer_patti}</td>

              <td>{entry.trader_patti}</td>

              <td>{entry.item_name}</td>

              <td>{entry.bags}</td>

              <td>{entry.boras}</td>

              <td>{Number(entry.net_weight).toFixed(2)}</td>

              <td>{Number(entry.farmer_price).toFixed(2)}</td>

              <td>{Number(entry.trader_price).toFixed(2)}</td>

              <td>{Number(entry.actual_price).toFixed(2)}</td>

              <td>{Number(entry.f_weight).toFixed(2)}</td>

              <td>{entry.bond_no}</td>

            </tr>

          ))

        )}

      </tbody>

    </table>

  </div>

</div>

    </div>

  );

}

export default KataList1Entry;