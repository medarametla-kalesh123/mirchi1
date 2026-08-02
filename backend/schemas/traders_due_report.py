from datetime import date

from pydantic import BaseModel


class TradersDueReportCreate(BaseModel):

    town: str | None = None

    account_name: str

    bill_date: date

    bill_no: str

    bill_amount: float


class TradersDueReportResponse(BaseModel):

    id: int

    town: str | None = None

    account_name: str

    bill_date: date

    bill_no: str

    bill_amount: float


    class Config:

        from_attributes = True