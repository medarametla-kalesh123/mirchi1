from datetime import date

from sqlalchemy.orm import Session

from models.farmers_patti import FarmersPatti
from models.traderspatti import TradersPatti

from schemas.dailyreport import (
    DailyReportRow,
    DailyReportResponse
)


# ================= FARMERS REPORT =================

def get_farmers_report(
    db: Session,
    report_date: date
):

    farmers = (

        db.query(FarmersPatti)

        .filter(
            FarmersPatti.patti_date == report_date
        )

        .all()

    )

    report = []

    for row in farmers:

        report.append(

            DailyReportRow(

                bill_no=row.book_no,

                name=row.farmer_name,

                bags=row.bags or 0,

                gross_amount=row.gross_amount or 0,

                commission=row.commission or 0,

                market_fee=row.market_fee or 0,

                machu=row.machu or 0,

                freight=row.freight or 0,

                ac_rent=0,

                tol_ex_kata=row.tolakam or 0,

                cash_advance=row.cash_advance or 0,

                loan_amount=row.loan_amount or 0,

                total_bill=row.total_bill or 0

            )

        )

    return report


# ================= TRADERS REPORT =================

def get_traders_report(
    db: Session,
    report_date: date
):

    traders = (

        db.query(TradersPatti)

        .filter(
            TradersPatti.patti_date == report_date
        )

        .all()

    )

    report = []

    for row in traders:

        report.append(

            DailyReportRow(

                bill_no=row.book_no,

                name=row.trader_name,

                bags=row.bags or 0,

                gross_amount=float(
                    row.gross_amount or 0
                ),

                commission=0,

                market_fee=float(
                    row.market_fee or 0
                ),

                machu=0,

                freight=0,

                ac_rent=0,

                tol_ex_kata=0,

                cash_advance=0,

                loan_amount=0,

                total_bill=float(
                    row.net_value or 0
                )

            )

        )

    return report


# ================= COMPLETE DAILY REPORT =================

def get_daily_report(
    db: Session,
    report_date: date
):

    farmers = get_farmers_report(
        db,
        report_date
    )

    traders = get_traders_report(
        db,
        report_date
    )


    farmers_total = sum(

        row.total_bill

        for row in farmers

    )


    traders_total = sum(

        row.total_bill

        for row in traders

    )


    return DailyReportResponse(

        farmers=farmers,

        traders=traders,

        farmers_total=farmers_total,

        traders_total=traders_total

    )