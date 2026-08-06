from datetime import date

from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from models.traderspatti import TradersPatti
from schemas.traderspatti import TradersPattiCreate



# ================= NEXT DEFAULT VALUES =================

from datetime import date

def get_next_defaults(db: Session):

    last_record = (
        db.query(TradersPatti)
        .order_by(TradersPatti.id.desc())
        .first()
    )

    if last_record is None:

        next_serial = "1001"
        next_book = "1"

    else:

        next_serial = str(int(last_record.serial_no) + 1)
        next_book = str(int(last_record.book_no) + 1)

    return {
        "serial_no": next_serial,
        "book_no": next_book,
        "patti_date": date.today()
    }

# ================= CREATE =================

def create_traders_patti(
    db: Session,
    trader: TradersPattiCreate
):

    db_trader = TradersPatti(
        
        entry_no=trader.entry_no,
        

        book_no=str(trader.book_no),
        serial_no=str(trader.serial_no),
        patti_date=trader.patti_date,

        trader_name=trader.trader_name,
        address=trader.address,
        licence_no=trader.licence_no,

        item_name=trader.item_name,

        bags=trader.bags,
        boras=trader.boras,
        net_weight=trader.net_weight,

        rate_per_qtl=trader.rate_per_qtl,
        actual_price=trader.actual_price,

        gross_amount=trader.gross_amount,
        cost_of_bags=trader.cost_of_bags,
        market_fee=trader.market_fee,
        net_value=trader.net_value,

        period_from=trader.period_from,
        period_to=trader.period_to

    )

    db.add(db_trader)
    db.commit()
    db.refresh(db_trader)

    return db_trader


# ================= SEARCH TRADER =================

def search_traders_patti(
    db: Session,
    trader_name: str,
    patti_date
):

    pattis = (

        db.query(

            TradersPatti.serial_no,
            TradersPatti.book_no,
            TradersPatti.patti_date

        )

        .filter(

            TradersPatti.trader_name == trader_name,
            TradersPatti.patti_date == patti_date

        )

        .distinct()

        .order_by(

            TradersPatti.serial_no

        )

        .all()

    )

    if not pattis:

        raise HTTPException(
            status_code=404,
            detail="Trader Patti Not Found"
        )

    return [

        {

            "serial_no": row.serial_no,
            "book_no": row.book_no,
            "patti_date": row.patti_date

        }

        for row in pattis

    ]
    # ================= GET ONE SAVED PATTI =================

def get_saved_patti(
    db: Session,
    trader_name: str,
    patti_date,
    serial_no,
    book_no
):

    records = (

        db.query(TradersPatti)

        .filter(

            TradersPatti.trader_name == trader_name,
            TradersPatti.patti_date == patti_date,
            TradersPatti.serial_no == serial_no,
            TradersPatti.book_no == book_no

        )

        .order_by(

            TradersPatti.id

        )

        .all()

    )

    if not records:

        raise HTTPException(
            status_code=404,
            detail="Trader Patti Not Found"
        )

    return records


# ================= GET ALL =================

def get_traders_patti(
    db: Session
):

    return (

        db.query(TradersPatti)

        .all()

    )


# ================= GET BY BOOK NO =================

def get_traders_patti_by_book_no(
    db: Session,
    book_no: str
):

    return (

        db.query(TradersPatti)

        .filter(
            TradersPatti.book_no == book_no
        )

        .all()

    )


def get_traders_patti_by_trader(
    db: Session,
    trader_name: str,
    patti_date
):

    return (

        db.query(TradersPatti)

        .filter(

            TradersPatti.trader_name == trader_name,
            TradersPatti.patti_date == patti_date

        )

        .all()

    )


# ================= GET BY DATE =================

def get_traders_patti_by_date(
    db: Session,
    patti_date
):

    return (

        db.query(TradersPatti)

        .filter(
            TradersPatti.patti_date == patti_date
        )

        .all()

    )


# ================= GET SAVED TRADERS =================

def get_saved_traders(
    db: Session,
    patti_date
):

    traders = (

        db.query(
            TradersPatti.trader_name
        )

        .filter(
            TradersPatti.patti_date == patti_date
        )

        .distinct()

        .order_by(
            TradersPatti.trader_name
        )

        .all()

    )

    return [

        trader[0]

        for trader in traders

        if trader[0]

    ]
# ================= UPDATE =================

def update_traders_patti(
    db: Session,
    id: int,
    trader: TradersPattiCreate
):

    db_trader = (

        db.query(TradersPatti)

        .filter(
            TradersPatti.id == id
        )

        .first()

    )

    if not db_trader:

        return None

    db_trader.book_no = str(trader.book_no)
    db_trader.serial_no = str(trader.serial_no)
    db_trader.patti_date = trader.patti_date

    db_trader.trader_name = trader.trader_name
    db_trader.address = trader.address
    db_trader.licence_no = trader.licence_no

    db_trader.item_name = trader.item_name

    db_trader.bags = trader.bags
    db_trader.boras = trader.boras
    db_trader.net_weight = trader.net_weight

    db_trader.rate_per_qtl = trader.rate_per_qtl
    db_trader.actual_price = trader.actual_price

    db_trader.gross_amount = trader.gross_amount
    db_trader.cost_of_bags = trader.cost_of_bags
    db_trader.market_fee = trader.market_fee
    db_trader.net_value = trader.net_value

    db_trader.period_from = trader.period_from
    db_trader.period_to = trader.period_to

    db.commit()
    db.refresh(db_trader)

    return db_trader


# ================= DELETE =================

def delete_traders_patti(
    db: Session,
    id: int
):

    db_trader = (

        db.query(TradersPatti)

        .filter(
            TradersPatti.id == id
        )

        .first()

    )

    if not db_trader:

        return None

    db.delete(db_trader)
    db.commit()

    return {

        "message": "Trader Patti Deleted Successfully"

    }