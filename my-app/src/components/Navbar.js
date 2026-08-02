import React from "react";
import "./Navbar.css";

import SetupMenu from "./menus/SetupMenu";
import TransactionMenu from "./menus/TransactionMenu";
import ReportsMenu from "./menus/ReportsMenu";
import ToolsMenu from "./menus/ToolsMenu";

function Navbar({ setPage }) {

  const changePage = (pageName) => {
    setPage(pageName);
  };

  return (

    <nav className="navbar">

      <SetupMenu changePage={changePage} />

      <button
        className="menu-btn"
        onClick={() => changePage("items")}
      >
        Items
      </button>

      <TransactionMenu changePage={changePage} />

      <ReportsMenu changePage={changePage} />

      <ToolsMenu changePage={changePage} />

    </nav>

  );
}

export default Navbar;