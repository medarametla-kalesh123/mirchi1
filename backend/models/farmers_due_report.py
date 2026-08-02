from sqlalchemy import Column, Integer, String, Date, Numeric

from database import Base


class FarmersDueReport(Base):

    __tablename__ = "farmers_due_report"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    town = Column(
        String(100),
        nullable=True
    )

    account_name = Column(
        String(150),
        nullable=False
    )

    bill_date = Column(
        Date,
        nullable=False
    )

    bill_no = Column(
        String(50),
        nullable=False
    )

    bill_amount = Column(
        Numeric(15, 2),
        default=0
    )