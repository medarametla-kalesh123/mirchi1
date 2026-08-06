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
        rate_per_qtl=farmers_patti.rate_per_qtl,

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

# ================= SEARCH FARMER =================

def search_farmers_patti(
    db: Session,
    farmer_name: str,
    patti_date
):

    pattis = (

        db.query(

            FarmersPatti.serial_no,
            FarmersPatti.book_no,
            FarmersPatti.patti_date

        )

        .filter(

            FarmersPatti.farmer_name == farmer_name,
            FarmersPatti.patti_date == patti_date

        )

        .distinct()

        .order_by(

            FarmersPatti.serial_no

        )

        .all()

    )

    if not pattis:

        raise HTTPException(
            status_code=404,
            detail="Farmer Patti Not Found"
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
    farmer_name: str,
    patti_date,
    serial_no,
    book_no
):

    records = (

        db.query(FarmersPatti)

        .filter(

            FarmersPatti.farmer_name == farmer_name,
            FarmersPatti.patti_date == patti_date,
            FarmersPatti.serial_no == serial_no,
            FarmersPatti.book_no == book_no

        )

        .order_by(FarmersPatti.id)

        .all()

    )

    if not records:

        raise HTTPException(
            status_code=404,
            detail="Patti Not Found"
        )

    return records
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
    # ================= PRINT FARMER PATTI =================




# ================= PRINT FARMER PATTI =================

def get_farmers_patti_print(
    db: Session,
    farmer_name: str,
    patti_date
):

    records = (
        db.query(FarmersPatti)
        .filter(
            FarmersPatti.farmer_name == farmer_name,
            FarmersPatti.patti_date == patti_date
        )
        .order_by(FarmersPatti.id)
        .all()
    )

    if not records:
        raise HTTPException(
            status_code=404,
            detail="Farmer Patti Not Found"
        )

    first = records[0]

    items = []

    gross_amount = 0
    cost_of_bags = 0
    total_net_value = 0
    total_bags = 0

    commission = 0
    expense = 0
    yard_charges = 0
    machu = 0
    nettu_cooli = 0
    freight = 0
    kata_cooli = 0
    tolakam = 0
    rasi_cooli = 0
    cash_advance = 0
    loan_amount = 0
    interest = 0

    for record in records:

        items.append({
            "item_name": record.item_name,
            "boras": record.boras,
            "bags": record.bags,
            "net_weight": record.net_weight,
            "rate": record.rate_per_qtl,
            "gross_amount": record.gross_amount,
            "net_value": record.net_value
        })

        gross_amount += float(record.gross_amount or 0)
        cost_of_bags += float(record.cost_of_bags or 0)
        total_net_value += float(record.net_value or 0)
        total_bags += int(record.bags or 0)

        commission += float(record.net_value or 0) * float(record.commission or 0) / 100

        expense += float(record.bags or 0) * float(record.expense or 0)

        yard_charges += float(record.bags or 0) * float(record.yard_charges or 0)

        machu += float(record.bags or 0) * float(record.machu or 0)

        nettu_cooli += float(record.bags or 0) * float(record.nettu_cooli or 0)

        freight += float(record.bags or 0) * float(record.freight or 0)

        kata_cooli += float(record.bags or 0) * float(record.kata_cooli or 0)

        tolakam += float(record.bags or 0) * float(record.tolakam or 0)

        rasi_cooli += float(record.bags or 0) * float(record.rasi_cooli or 0)

        cash_advance += float(record.cash_advance or 0)

        loan_amount += float(record.loan_amount or 0)

        interest += float(record.interest or 0)

    cost_per_bag = (
        cost_of_bags / total_bags
        if total_bags > 0 else 0
    )

    total_charges = (
        commission
        + expense
        + yard_charges
        + machu
        + nettu_cooli
        + freight
        + kata_cooli
        + tolakam
        + rasi_cooli
        + cash_advance
        + loan_amount
        + interest
    )

    amount_payable = total_net_value - total_charges

    return {

        "farmer_name": first.farmer_name,
        "address": first.address,
        "bill_no": f"{first.serial_no}/{first.book_no}",
        "date": first.patti_date,

        "items": items,

        "gross_amount": round(gross_amount, 2),
        "cost_of_bags": round(cost_of_bags, 2),
        "cost_per_bag": round(cost_per_bag, 2),
        "total_net_value": round(total_net_value, 2),

        "commission": round(commission, 2),
        "expense": round(expense, 2),
        "yard_charges": round(yard_charges, 2),
        "machu": round(machu, 2),
        "nettu_cooli": round(nettu_cooli, 2),
        "freight": round(freight, 2),
        "kata_cooli": round(kata_cooli, 2),
        "tolakam": round(tolakam, 2),
        "rasi_cooli": round(rasi_cooli, 2),
        "cash_advance": round(cash_advance, 2),
        "loan_amount": round(loan_amount, 2),
        "interest": round(interest, 2),

        "total_charges": round(total_charges, 2),

        "total_bill": round(amount_payable, 2),
        "rounding_off": round(amount_payable)
    }