from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DECIMAL,
    TIMESTAMP,
    
)

from sqlalchemy.sql import func

from database import Base


class TradersPatti(Base):

    __tablename__ = "traderspatti"

    id = Column(Integer, primary_key=True, index=True)
    entry_no = Column(String(20), nullable=False)

    book_no = Column(String(30))

    serial_no = Column(String(30))

    patti_date = Column(Date)

    trader_name = Column(String(150))

    address = Column(String(300))

    licence_no = Column(String(100))

    item_name = Column(String(150))

    bags = Column(Integer, default=0)

    boras = Column(Integer, default=0)

    net_weight = Column(DECIMAL(12,2), default=0)

    rate_per_qtl = Column(DECIMAL(12,2), default=0)

    actual_price = Column(DECIMAL(12,2), default=0)

    gross_amount = Column(DECIMAL(12,2), default=0)

    cost_of_bags = Column(DECIMAL(12,2), default=0)

    market_fee = Column(DECIMAL(12,2), default=0)

    net_value = Column(DECIMAL(12,2), default=0)

    period_from = Column(Date)

    period_to = Column(Date)
  

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )