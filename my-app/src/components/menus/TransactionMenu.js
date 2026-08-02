import React, { useState } from "react";

function TransactionMenu({ changePage }) {

  const [transactionOpen, setTransactionOpen] = useState(false);

  const handleChangePage = (page) => {
    setTransactionOpen(false);
    changePage(page);
  };

  return (

    <div
      className="nav-item"
      onMouseEnter={() => setTransactionOpen(true)}
      onMouseLeave={() => setTransactionOpen(false)}
    >

      <button
        className="menu-btn"
        onClick={() => handleChangePage("transaction")}
      >
        Transactions
      </button>

      {transactionOpen && (

        <div className="dropdown">

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("fourcolumndaybook")}
          >
            Four Column Day Book
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("farmerspattientry")}
          >
            Farmers Patti Entry
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("traderspattientry")}
          >
            Traders Patti Entry
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("katalist1entry")}
          >
            Kata List - 1 Entry
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("katalist2entry")}
          >
            Kata List - 2 Entry
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("farmerdc")}
          >
            Farmer DC
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("farmerdcout")}
          >
            Farmer DCOUT
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("voucherprinting")}
          >
            Voucher Printing (Payment Voucher)
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("accountmerging")}
          >
            Account Merging
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("coldstoragebonds")}
          >
            Cold Storage Bonds
          </div>

        </div>

      )}

    </div>

  );

}

export default TransactionMenu;