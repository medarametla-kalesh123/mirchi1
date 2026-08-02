from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from typing import Optional


class FourColumnDayBookCreate(BaseModel):

    transaction_no: str

    voucher_no: str

    date: date

    voucher_type: str
    
    group_name: str

    income: Decimal = 0

    credit: Decimal = 0

    account_name: str

    pb_no: Optional[str] = None

    expenditure: Decimal = 0

    narration: Optional[str] = None

    bill_no: Optional[str] = None

    amount: Decimal = 0

    running_total: Decimal = 0


class FourColumnDayBookResponse(BaseModel):

    id: int

    transaction_no: str

    voucher_no: str

    date: date

    voucher_type: str
    
    group_name: str

    income: Decimal

    credit: Decimal

    account_name: str

    pb_no: Optional[str]

    expenditure: Decimal

    narration: Optional[str]

    bill_no: Optional[str]

    amount: Decimal

    running_total: Decimal
    

    class Config:
        from_attributes = True