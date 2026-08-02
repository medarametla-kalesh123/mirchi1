from sqlalchemy import Column, Integer, String, Date, DECIMAL, Text, TIMESTAMP
from sqlalchemy.sql import func

from database import Base


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)

    account_no = Column(String(20), unique=True, nullable=False)
    account_name = Column(String(150), nullable=False)
    description = Column(String(255))

    group_name = Column(String(100))

    opening_date = Column(Date)

    opening_balance = Column(DECIMAL(15, 2), default=0.00)
    current_balance = Column(DECIMAL(15, 2), default=0.00)

    tin_no = Column(String(30))
    credit_limit = Column(DECIMAL(15, 2), default=0.00)

    land_acres = Column(DECIMAL(10, 2), default=0.00)
    interest_pa = Column(DECIMAL(5, 2), default=0.00)

    address = Column(Text)
    town = Column(String(100))
    district = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))

    phone_number = Column(String(15))

    account_name_telugu = Column(String(150))

    debit_balance = Column(DECIMAL(15, 2), default=0.00)
    credit_balance = Column(DECIMAL(15, 2), default=0.00)

    created_at = Column(TIMESTAMP, server_default=func.now())
    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )