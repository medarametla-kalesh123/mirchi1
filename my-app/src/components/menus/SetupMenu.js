import React, { useState } from "react";

function SetupMenu({ changePage }) {

  const [setupOpen, setSetupOpen] = useState(false);
  const [accountsOpen, setAccountsOpen] = useState(false);

  const handleChangePage = (page) => {
    setSetupOpen(false);
    setAccountsOpen(false);

    changePage(page);
  };

  return (

    <div
      className="nav-item"
      onMouseEnter={() => setSetupOpen(true)}
      onMouseLeave={() => {
        setSetupOpen(false);
        setAccountsOpen(false);
      }}
    >

      <button
        className="menu-btn"
        onClick={() => handleChangePage("setup")}
      >
        Setup
      </button>

      {setupOpen && (

        <div className="dropdown">

          <div
            className="submenu-item"
            onMouseEnter={() => setAccountsOpen(true)}
            onMouseLeave={() => setAccountsOpen(false)}
          >

            <div className="dropdown-item">
              Accounts
            </div>

            {accountsOpen && (

              <div className="submenu">

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("accountslist")}
                >
                  Accounts List
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("standardnarrations")}
                >
                  Standard Narrations
                </div>

                <div
                  className="dropdown-item"
                  onClick={() => handleChangePage("nameverification")}
                >
                  Name Verification
                </div>

              </div>

            )}

          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("states")}
          >
            States
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("towns")}
          >
            Towns
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("editaddresses")}
          >
            Edit Addresses
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("standardaccounts")}
          >
            Standard Accounts
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("groupcreation")}
          >
            Group Creation
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("classicmenu")}
          >
            Classic Menu
          </div>

        </div>

      )}

    </div>

  );

}

export default SetupMenu;