from datetime import date

from pydantic import BaseModel


# =====================================================
# CREATE
# =====================================================

class TradersDueReportCreate(BaseModel):

    town: str | None = None

    account_name: str

    bill_date: date

    bill_no: str

    bill_amount: float


# =====================================================
# RESPONSE
# =====================================================

class TradersDueReportResponse(BaseModel):

    id: int

    town: str | None = None

    account_name: str

    bill_date: date

    bill_no: str

    bill_amount: float

    # ================================================
    # 14-DAY DUE INFORMATION
    # ================================================

    due_date: date

    due_days: int


    class Config:

        from_attributes = True