from pydantic import BaseModel
from typing import List


# ================= ROW =================

class DailyReportRow(BaseModel):

    bill_no: str | None = None

    name: str | None = None

    bags: float = 0

    gross_amount: float = 0

    commission: float = 0

    market_fee: float = 0

    machu: float = 0

    freight: float = 0

    ac_rent: float = 0

    tol_ex_kata: float = 0

    cash_advance: float = 0

    loan_amount: float = 0

    total_bill: float = 0


# ================= RESPONSE =================

class DailyReportResponse(BaseModel):

    farmers: List[DailyReportRow]

    traders: List[DailyReportRow]

    farmers_total: float

    traders_total: float