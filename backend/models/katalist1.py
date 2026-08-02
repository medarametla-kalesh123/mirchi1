from sqlalchemy import (
    Column,
    Integer,
    String,
    Date,
    DECIMAL,
    TIMESTAMP,
    
)
from sqlalchemy.sql import func
from sqlalchemy import Boolean

from database import Base


class KataList1(Base):
    __tablename__ = "katalist1"

    id = Column(Integer, primary_key=True, index=True)

    entry_no = Column(String(20), unique=True, nullable=False)

    entry_date = Column(Date)

    company = Column(String(150))

    farmer_patti = Column(String(150))

    trader_patti = Column(String(150))

    item_name = Column(String(150))

    bags = Column(Integer, default=0)

    boras = Column(Integer, default=0)

    net_weight = Column(DECIMAL(12, 2), default=0.00)

    farmer_price = Column(DECIMAL(12, 2), default=0.00)

    trader_price = Column(DECIMAL(12, 2), default=0.00)

    actual_price = Column(DECIMAL(12, 2), default=0.00)

    f_weight = Column(DECIMAL(12, 2), default=0.00)

    cold_storage = Column(String(150))

    bond_no = Column(String(50))
    
    

    created_at = Column(
        TIMESTAMP,
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP,
        server_default=func.now(),
        onupdate=func.now()
    )