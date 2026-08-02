from sqlalchemy.orm import Session

from models.traders_due_report import TradersDueReport

from schemas.traders_due_report import (
    TradersDueReportCreate
)


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


def get_all_traders_due_entries(

    db: Session

):

    return db.query(

        TradersDueReport

    ).order_by(

        TradersDueReport.bill_date.desc()

    ).all()