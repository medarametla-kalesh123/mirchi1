from datetime import date

from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from models.farmers_patti import FarmersPatti
from schemas.farmers_patti import FarmersPattiCreate


# ================= NEXT DEFAULT VALUES =================




def get_next_defaults(db: Session):

    last_record = (
        db.query(FarmersPatti)
        .order_by(FarmersPatti.id.desc())
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

def create_farmers_patti(
    db: Session,
    farmers_patti: FarmersPattiCreate
):

    db_farmers_patti = FarmersPatti(

        # ================= FARMER DETAILS =================
        entry_no=farmers_patti.entry_no,

        farmer_name=farmers_patti.farmer_name,

        book_no=farmers_patti.book_no,

        patti_date=farmers_patti.patti_date,

        serial_no=farmers_patti.serial_no,

        address=farmers_patti.address,

        # ================= ITEM DETAILS =================

        item_name=farmers_patti.item_name,
        bags=farmers_patti.bags,
        boras=farmers_patti.boras,
        net_weight=farmers_patti.net_weight,

        gross_amount=farmers_patti.gross_amount,
        cost_of_bags=farmers_patti.cost_of_bags,
        market_fee=farmers_patti.market_fee,
        net_value=farmers_patti.net_value,

        # ================= FINANCIAL SUMMARY =================

        yard_advance=farmers_patti.yard_advance,
        advance=farmers_patti.advance,
        total_bill=farmers_patti.total_bill,
        rounding_off=farmers_patti.rounding_off,

        # ================= CHARGES =================

        commission=farmers_patti.commission,
        expense=farmers_patti.expense,
        yard_charges=farmers_patti.yard_charges,
        machu=farmers_patti.machu,
        nettu_cooli=farmers_patti.nettu_cooli,
        freight=farmers_patti.freight,
        kata_cooli=farmers_patti.kata_cooli,
        tolakam=farmers_patti.tolakam,
        rasi_cooli=farmers_patti.rasi_cooli,

        # ================= ADVANCES =================

        cash_advance=farmers_patti.cash_advance,
        loan_amount=farmers_patti.loan_amount,
        interest=farmers_patti.interest,

        # ================= TOTAL =================

        total_charges=farmers_patti.total_charges

    )

    db.add(db_farmers_patti)

    db.commit()

    db.refresh(db_farmers_patti)

    return db_farmers_patti


# ================= SEARCH FARMER =================

def search_farmers_patti(
    db: Session,
    farmer_name: str,
    patti_date
):

    farmer = (

        db.query(FarmersPatti)

        .filter(

            FarmersPatti.farmer_name == farmer_name,
            FarmersPatti.patti_date == patti_date

        )

        .first()

    )

    if not farmer:

        raise HTTPException(
            status_code=404,
            detail="Farmer Patti Not Found"
        )

    return farmer
# ================= GET ALL =================

def get_all_farmers_patti(
    db: Session
):

    return db.query(FarmersPatti).all()


# ================= GET BY FARMER =================

def get_farmers_patti_by_farmer(
    db: Session,
    farmer_name: str,
    patti_date
):

    return (

        db.query(FarmersPatti)

        .filter(

            FarmersPatti.farmer_name == farmer_name,
            FarmersPatti.patti_date == patti_date

        )

        .all()

    )

# ================= GET BY DATE =================

def get_farmers_patti_by_date(
    db: Session,
    patti_date
):

    return (

        db.query(FarmersPatti)

        .filter(
            FarmersPatti.patti_date == patti_date
        )

        .all()

    )


# ================= GET SAVED FARMERS BY DATE =================

def get_saved_farmers(
    db: Session,
    patti_date
):

    farmers = (

        db.query(FarmersPatti.farmer_name)

        .filter(

            FarmersPatti.patti_date == patti_date

        )

        .distinct()

        .order_by(

            FarmersPatti.farmer_name

        )

        .all()

    )

    return [

        farmer[0]

        for farmer in farmers

        if farmer[0]

    ]