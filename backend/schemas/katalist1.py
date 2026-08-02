from pydantic import BaseModel
from typing import Optional
from datetime import date


class KataList1Create(BaseModel):

    entry_no: str | None = None

    entry_date: Optional[date] = None

    company: Optional[str] = None

    farmer_patti: Optional[str] = None

    trader_patti: Optional[str] = None

    item_name: Optional[str] = None

    bags: int = 0

    boras: int = 0

    net_weight: float = 0.00

    farmer_price: float = 0.00

    trader_price: float = 0.00

    actual_price: float = 0.00

    f_weight: float = 0.00

    cold_storage: Optional[str] = None

    bond_no: Optional[str] = None


class KataList1Update(KataList1Create):
    pass


class KataList1Response(KataList1Create):

    id: int

    class Config:
        from_attributes = True