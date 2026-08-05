from datetime import date

from pydantic import BaseModel


class FarmersPattiCreate(BaseModel):

    # ================= FARMER DETAILS =================
    entry_no:str
    farmer_name: str
    book_no: str
    patti_date: date
    serial_no: str
    address: str

    # ================= ITEM DETAILS =================

    item_name: str

    bags: float
    boras: float
    net_weight: float
    rate_per_qtl: float

    gross_amount: float
    cost_of_bags: float
    market_fee: float
    net_value: float

    # ================= FINANCIAL SUMMARY =================

    yard_advance: float
    advance: float
    total_bill: float
    rounding_off: float

    # ================= CHARGES =================

    commission: float
    expense: float
    yard_charges: float
    machu: float
    nettu_cooli: float
    freight: float
    kata_cooli: float
    tolakam: float
    rasi_cooli: float

    # ================= ADVANCES =================

    cash_advance: float
    loan_amount: float
    interest: float

    # ================= TOTAL =================

    total_charges: float


class FarmersPattiResponse(FarmersPattiCreate):

    id: int

    class Config:

        from_attributes = True