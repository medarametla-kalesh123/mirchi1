from sqlalchemy import Column, Integer, String, Float, Date

from database import Base


class FarmersPatti(Base):

    __tablename__ = "farmers_patti"

    id = Column(Integer, primary_key=True, index=True)

    # ================= FARMER DETAILS =================
    entry_no=Column(String(20),nullable=False)

    farmer_name = Column(String(255))
    book_no = Column(String(100))
    patti_date = Column(Date)
    serial_no = Column(String(100))
    address = Column(String(500))

    # ================= ITEM DETAILS =================

    item_name = Column(String(255))
    bags = Column(Float)
    boras = Column(Float)
    net_weight = Column(Float)

    gross_amount = Column(Float)
    cost_of_bags = Column(Float)
    market_fee = Column(Float)
    net_value = Column(Float)

    # ================= FINANCIAL SUMMARY =================

    yard_advance = Column(Float)
    advance = Column(Float)
    total_bill = Column(Float)
    rounding_off = Column(Float)

    # ================= CHARGES =================

    commission = Column(Float)
    expense = Column(Float)
    yard_charges = Column(Float)
    machu = Column(Float)
    nettu_cooli = Column(Float)
    freight = Column(Float)
    kata_cooli = Column(Float)
    tolakam = Column(Float)
    rasi_cooli = Column(Float)

    # ================= ADVANCES =================

    cash_advance = Column(Float)
    loan_amount = Column(Float)
    interest = Column(Float)

    # ================= TOTAL =================

    total_charges = Column(Float)