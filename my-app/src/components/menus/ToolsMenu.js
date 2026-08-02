import React, { useState } from "react";

function ToolsMenu({ changePage }) {

  const [toolsOpen, setToolsOpen] = useState(false);

  const handleChangePage = (page) => {
    setToolsOpen(false);
    changePage(page);
  };

  return (

    <div
      className="nav-item"
      onMouseEnter={() => setToolsOpen(true)}
      onMouseLeave={() => setToolsOpen(false)}
    >

      <button
        className="menu-btn"
        onClick={() => handleChangePage("tools")}
      >
        Tools
      </button>

      {toolsOpen && (

        <div className="dropdown">

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("engtotel")}
          >
            Eng to Tel
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("calculator")}
          >
            Calculator
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("calendar")}
          >
            Calendar
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("interestcalculator")}
          >
            Interest Calculator
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("printersetup")}
          >
            Printer Setup
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("changecompany")}
          >
            Change Company
          </div>

          <hr />

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("backuprestore")}
          >
            Backup Restore
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("auditreport")}
          >
            Audit Report
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("password")}
          >
            Passwords
          </div>

          <hr />

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("repostingledger")}
          >
            Reposting Ledger
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("toolstandardnarrations")}
          >
            Standard Narrations
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("reportviewer")}
          >
            Report Viewer
          </div>

          <div
            className="dropdown-item"
            onClick={() => handleChangePage("databaseverification")}
          >
            Database Verification
          </div>

        </div>

      )}

    </div>

  );

}

export default ToolsMenu;