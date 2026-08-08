from datetime import date, timedelta

from sqlalchemy.orm import Session

from models.traders_due_report import TradersDueReport

from schemas.traders_due_report import (
    TradersDueReportCreate
)


# =====================================================
# CREATE TRADERS DUE ENTRY
# =====================================================

def create_traders_due_entry(
    db: Session,
    entry: TradersDueReportCreate
):

    new_entry = TradersDueReport(

        town=entry.town,

        account_name=entry.account_name,

        bill_date=entry.bill_date,

        bill_no=entry.bill_no,

        bill_amount=entry.bill_amount

    )

    db.add(new_entry)

    db.commit()

    db.refresh(new_entry)

    return new_entry


# =====================================================
# GET ALL TRADERS DUE ENTRIES
# =====================================================

def get_all_traders_due_entries(
    db: Session
):

    entries = db.query(

        TradersDueReport

    ).order_by(

        TradersDueReport.bill_date.desc()

    ).all()


    # =================================================
    # ADD 14-DAY DUE INFORMATION
    # =================================================

    result = []


    today = date.today()


    for entry in entries:

        # ---------------------------------------------
        # BILL DATE
        # ---------------------------------------------

        bill_date = entry.bill_date


        # ---------------------------------------------
        # DUE DATE = BILL DATE + 14 DAYS
        # ---------------------------------------------

        due_date = bill_date + timedelta(days=14)


        # ---------------------------------------------
        # DUE DAYS
        #
        # Negative = days remaining
        # Positive = days passed
        # Zero     = due today
        # ---------------------------------------------

        if today < due_date:

            due_days = -(
                (due_date - today).days
            )

        elif today > due_date:

            due_days = (
                today - due_date
            ).days

        else:

            due_days = 0


        result.append({

            "id": entry.id,

            "town": entry.town,

            "account_name": entry.account_name,

            "bill_date": entry.bill_date,

            "bill_no": entry.bill_no,

            "bill_amount": entry.bill_amount,

            "due_date": due_date,

            "due_days": due_days

        })


    return result