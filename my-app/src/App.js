import { useState } from "react";

import Navbar from "./components/Navbar";

import Exit from "./pages/Exit";




import AccountsList from "./setup/accounts/AccountsList";
import StandardNarrations from "./setup/accounts/StandardNarrations";
import NameVerification from "./setup/accounts/NameVerification";

import States from "./setup/States";
import Towns from "./setup/Towns";
import EditAddresses from "./setup/EditAddresses";
import StandardAccounts from "./setup/StandardAccounts";
import GroupCreation from "./setup/GroupCreation";


import FourColumnDayBook from "./transactions/FourColumnDayBook";
import FarmersPattiEntry from "./transactions/FarmersPattiEntry";
import TradersPattiEntry from "./transactions/TradersPattiEntry";
import KataList1Entry from "./transactions/KataList1Entry";
import KataList2Entry from "./transactions/KataList2Entry";
import FarmerDC from "./transactions/FarmerDC";
import FarmerDCOUT from "./transactions/FarmerDCOUT";
import VoucherPrinting from "./transactions/VoucherPrinting";
import AccountMerging from "./transactions/AccountMerging";
import ColdStorageBonds from "./transactions/ColdStorageBonds";



import TwoColumnDayBook from "./reports/financialReports/TwoColumnDayBook";
import FourColumnDayBookReport from "./reports/financialReports/FourColumnDayBookReport";
import LedgerAccount from "./reports/financialReports/LedgerAccount";
import TrialBalance from "./reports/financialReports/TrialBalance";
import BalanceSheet from "./reports/financialReports/BalanceSheet";
import CashFlow from "./reports/financialReports/CashFlow";
import ProfitLossAccount from "./reports/financialReports/ProfitLossAccount";

import Report from "./reports/stockReports/Report";
import ItemsList from "./reports/stockReports/ItemsList";
import PriceDiffReport from "./reports/stockReports/PriceDiffReport";
import FarmerStockReport from "./reports/stockReports/FarmerStockReport";
import FarmerStockStatement from "./reports/stockReports/FarmerStockStatement";
import TownWiseReport from "./reports/stockReports/TownWiseReport";
import DailyReport from "./reports/stockReports/DailyReport";

import ProductAnalysis from "./reports/misReports/ProductAnalysis";
import GroupSettings from "./reports/misReports/GroupSettings";
import MonthlySummaryFarmersTraders from "./reports/misReports/MonthlySummaryFarmersTraders";
import MonthlyExpenditureSummary from "./reports/misReports/MonthlyExpenditureSummary";
import MonthlyIncomeSummary from "./reports/misReports/MonthlyIncomeSummary";
import TradersDueReport from "./reports/misReports/TradersDueReport";
import FarmersDueReport from "./reports/misReports/FarmersDueReport";
import ColdStorageReport from "./reports/misReports/ColdStorageReport";




import TraderAMCReport from "./reports/deptReports/TraderAMCReport";
import FarmerAMCReport from "./reports/deptReports/FarmerAMCReport";
import ExportersChillies from "./reports/deptReports/ExportersChillies";
import FarmersChillies from "./reports/deptReports/FarmersChillies";
import TradersITReport from "./reports/deptReports/TradersITReport";


import EngToTel from "./tools/EngToTel";
import Calculator from "./tools/Calculator";
import Calendar from "./tools/Calendar";
import InterestCalculator from "./tools/InterestCalculator";
import PrinterSetup from "./tools/PrinterSetup";
import ChangeCompany from "./tools/ChangeCompany";
import BackupRestore from "./tools/BackupRestore";
import AuditReport from "./tools/AuditReport";
import Passwords from "./tools/Passwords";
import RepostingLedger from "./tools/RepostingLedger";
import ToolStandardNarrations from "./tools/StandardNarrations";
import ReportViewer from "./tools/ReportViewer";
import DatabaseVerification from "./tools/DatabaseVerification";

import FarmersPattiPrint from "./transactions/FarmersPattiPrint";


function App() {

  const [page, setPage] = useState("dashboard");

  const [printData, setPrintData] = useState({
  farmer_name: "",
  patti_date: "",
  language: "english"
});

  return (
    <>
      <Navbar setPage={setPage} />

      
      {page === "exit" && <Exit />}

      {page === "accountslist" && <AccountsList />}
      {page === "standardnarrations" && <StandardNarrations />}
      {page === "nameverification" && <NameVerification />}

      {page === "states" && <States />}
      {page === "towns" && <Towns />}
      {page === "editaddresses" && <EditAddresses />}
      {page === "standardaccounts" && <StandardAccounts />}
      {page === "groupcreation" && <GroupCreation />}

      {page==="fourcolumndaybook"&& <FourColumnDayBook/>}
      {page === "farmerspattientry" && (
  <FarmersPattiEntry
    setPage={setPage}
    setPrintData={setPrintData}
  />
)}
{page === "farmerspattiprint" && (
  <FarmersPattiPrint
    printData={printData}
    setPage={setPage}
  />
)}
      {page === "traderspattientry" && <TradersPattiEntry />}
      {page === "katalist1entry" && <KataList1Entry />}
      {page === "katalist2entry" && <KataList2Entry />}
      {page === "farmerdc" && <FarmerDC />}
      {page === "farmerdcout" && <FarmerDCOUT />}
      {page === "voucherprinting" && <VoucherPrinting />}
      {page === "accountmerging" && <AccountMerging />}
      {page === "coldstoragebonds" && <ColdStorageBonds />}


      {page === "twocolumndaybook" && <TwoColumnDayBook />}
      {page === "fourcolumndaybookreport" && <FourColumnDayBookReport />}
      {page === "ledgeraccount" && <LedgerAccount />}
      {page === "trialbalance" && (
  <TrialBalance setPage={setPage} />
)}

     {page === "balancesheet" && (
  <BalanceSheet setPage={setPage} />
)}

      {page === "cashflow" && <CashFlow />}
     {page === "profitlossaccount" && (
  <ProfitLossAccount setPage={setPage} />
)}

      {page === "traderamcreport" && <TraderAMCReport />}
      {page === "farmeramcreport" && <FarmerAMCReport />}
      {page === "exporterschillies" && <ExportersChillies />}
      {page === "farmerschillies" && <FarmersChillies />}
      {page === "tradersitreport" && <TradersITReport />}



      {page === "stockreport" && <Report />}
{page === "itemslist" && <ItemsList />}
{page === "pricediffreport" && <PriceDiffReport />}
{page === "farmerstockreport" && <FarmerStockReport />}
{page === "farmerstockstmt" && <FarmerStockStatement />}
{page === "townwisereport" && <TownWiseReport />}
{page === "dailyreport" && <DailyReport />}

{page === "productanalysis" && <ProductAnalysis />}
{page === "groupsettings" && <GroupSettings />}
{page === "monsummary" && <MonthlySummaryFarmersTraders />}
{page === "monthlyexpensesummary" && <MonthlyExpenditureSummary />}
{page === "monthlyincomesummary" && <MonthlyIncomeSummary />}
{page === "tradersduereport" && <TradersDueReport />}
{page === "farmersduereport" && <FarmersDueReport />}
{page === "coldstoragereport" && <ColdStorageReport />}



      {page === "engtotel" && <EngToTel />}
{page === "calculator" && <Calculator />}
{page === "calendar" && <Calendar />}
{page === "interestcalculator" && <InterestCalculator />}
{page === "printersetup" && <PrinterSetup />}
{page === "changecompany" && <ChangeCompany />}
{page === "backuprestore" && <BackupRestore />}
{page === "auditreport" && <AuditReport />}
{page === "password" && <Passwords />}
{page === "repostingledger" && <RepostingLedger />}
{page === "toolstandardnarrations" && <ToolStandardNarrations />}
{page === "reportviewer" && <ReportViewer />}
{page === "databaseverification" && <DatabaseVerification />}
      
    </>
  );
}

export default App;