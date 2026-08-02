from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import date


# ================= Create / Update =================

class AccountCreate(BaseModel):

    account_no: Optional[str] = None
    account_name: str
    description: Optional[str] = None

    group_name: Optional[str] = None

    opening_date: Optional[date] = None

    opening_balance: float = 0.00
    current_balance: float = 0.00

    tin_no: Optional[str] = None
    credit_limit: float = 0.00

    land_acres: float = 0.00
    interest_pa: float = 0.00

    address: Optional[str] = None
    town: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None

    phone_number: Optional[str] = None

    account_name_telugu: Optional[str] = None

    debit_balance: float = 0.00
    credit_balance: float = 0.00

    @field_validator("account_name")
    @classmethod
    def validate_account_name(cls, value):

        value = value.strip()

        if value == "":
            raise ValueError("Account Name is required")

        if value.isdigit():
            raise ValueError("Account Name cannot contain only numbers")

        return value


# ================= Update =================

class AccountUpdate(AccountCreate):
    pass


# ================= Response =================

class AccountResponse(AccountCreate):
    id: int

    class Config:
        from_attributes = True


# ================= Search =================

class AccountSearch(BaseModel):

    group_name: str
    account_name: str