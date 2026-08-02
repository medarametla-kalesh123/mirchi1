from sqlalchemy.orm import Session

from models.farmers_due_report import FarmersDueReport

from schemas.farmers_due_report import (
    FarmersDueReportCreate
)


# =====================================================
# CREATE
# =====================================================

def create_farmers_due_entry(

    db: Session,

    entry: FarmersDueReportCreate

):

    new_entry = FarmersDueReport(

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
# GET ALL
# =====================================================

def get_all_farmers_due_entries(

    db: Session

):

    return db.query(

        FarmersDueReport

    ).order_by(

        FarmersDueReport.bill_date.desc()

    ).all()