from sqlalchemy import Column, Integer, String, Date, Numeric
from database import Base


class FourColumnDayBook(Base):

    __tablename__ = "four_column_daybook"

    id = Column(Integer, primary_key=True, index=True)

    transaction_no = Column(String(50), nullable=False)

    voucher_no = Column(String(50), nullable=False)

    date = Column(Date, nullable=False)

    voucher_type = Column(String(50), nullable=False)

    income = Column(Numeric(15, 2), default=0)

    credit = Column(Numeric(15, 2), default=0)

    account_name = Column(String(150), nullable=False)

    pb_no = Column(String(50), nullable=True)

    expenditure = Column(Numeric(15, 2), default=0)

    narration = Column(String(500), nullable=True)

    bill_no = Column(String(50), nullable=True)

    amount = Column(Numeric(15, 2), default=0)

    running_total = Column(Numeric(15, 2), default=0)
    group_name = Column(String(100), nullable=False)