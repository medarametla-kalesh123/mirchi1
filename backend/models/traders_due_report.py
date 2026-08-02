from sqlalchemy import Column, Integer, String, Date, Float

from database import Base


class TradersDueReport(Base):

    __tablename__ = "traders_due_report"


    id = Column(

        Integer,

        primary_key=True,

        index=True

    )


    town = Column(

        String(100),

        nullable=True

    )


    account_name = Column(

        String(200),

        nullable=False

    )


    bill_date = Column(

        Date,

        nullable=False

    )


    bill_no = Column(

        String(50),

        nullable=False

    )


    bill_amount = Column(

        Float,

        nullable=False,

        default=0

    )