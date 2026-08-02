from pydantic import BaseModel
from typing import Optional
from datetime import date


class TradersPattiCreate(BaseModel):
    entry_no: str

    book_no: Optional[str] = None

    serial_no: Optional[str] = None

    patti_date: Optional[date] = None

    trader_name: Optional[str] = None

    address: Optional[str] = None

    licence_no: Optional[str] = None

    item_name: Optional[str] = None

    bags: int = 0

    boras: int = 0

    net_weight: float = 0.00

    rate_per_qtl: float = 0.00

    actual_price: float = 0.00

    gross_amount: float = 0.00

    cost_of_bags: float = 0.00

    market_fee: float = 0.00

    net_value: float = 0.00

    period_from: Optional[date] = None

    period_to: Optional[date] = None


class TradersPattiUpdate(TradersPattiCreate):
    pass


class TradersPattiResponse(TradersPattiCreate):

    id: int

    class Config:
        from_attributes = True