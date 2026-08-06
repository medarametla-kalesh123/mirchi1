from datetime import date
from sqlalchemy.orm import Session
from sqlalchemy import func
from sqlalchemy import select

from models.katalist1 import KataList1
from schemas.katalist1 import KataList1Create
from sqlalchemy import select
from models.farmers_patti import FarmersPatti
from models.traderspatti import TradersPatti


# ================= CREATE =================

def create_katalist1(db: Session, kata: KataList1Create):

    last_entry = (
        db.query(KataList1)
        .order_by(KataList1.id.desc())
        .first()
    )

    if last_entry:
        entry_no = str(int(last_entry.entry_no) + 1)
    else:
        entry_no = "1"

    if last_entry and last_entry.bond_no:
        bond_no = str(int(last_entry.bond_no) + 1)
    else:
        bond_no = "100"

    db_kata = KataList1(
    entry_no=entry_no,
    entry_date=date.today(),
    company=kata.company,
    farmer_patti=kata.farmer_patti,
    trader_patti=kata.trader_patti,
    item_name=kata.item_name,
    bags=kata.bags,
    boras=kata.boras,
    net_weight=kata.net_weight,
    farmer_price=kata.farmer_price,
    trader_price=kata.trader_price,
    actual_price=kata.actual_price,
    f_weight=kata.f_weight,
    cold_storage=kata.cold_storage,
    bond_no=bond_no,

    
)

    db.add(db_kata)
    db.commit()
    db.refresh(db_kata)

    return db_kata


# ================= GET ALL =================

def get_katalist1(db: Session):

    return db.query(KataList1).all()


# ================= GET BY ENTRY NO =================

def get_katalist1_by_entry_no(db: Session, entry_no: str):

    return (
        db.query(KataList1)
        .filter(KataList1.entry_no == entry_no)
        .first()
    )


# ================= UPDATE =================

def update_katalist1(
    db: Session,
    entry_no: str,
    kata: KataList1Create
):

    db_kata = (
        db.query(KataList1)
        .filter(KataList1.entry_no == entry_no)
        .first()
    )

    if not db_kata:
        return None

    for key, value in kata.model_dump().items():
        setattr(db_kata, key, value)

    db.commit()
    db.refresh(db_kata)

    return db_kata


# ================= DELETE =================

def delete_katalist1(
    db: Session,
    entry_no: str
):

    db_kata = (
        db.query(KataList1)
        .filter(KataList1.entry_no == entry_no)
        .first()
    )

    if not db_kata:
        return None

    db.delete(db_kata)
    db.commit()

    return {
        "message": "Kata List Entry deleted successfully"
    }


# ================= NEXT ENTRY NUMBER =================

def get_next_entry_no(
    db: Session,
    entry_date
):

    last_entry = (
        db.query(func.max(KataList1.entry_no))
        .filter(KataList1.entry_date == entry_date)
        .scalar()
    )

    if last_entry is None:
        return 1

    return last_entry + 1


# ================= GET UNIQUE TRADERS =================




def get_traders(db: Session):

    # All entry numbers that are already saved in TradersPatti
    saved_entries = (

        db.query(
            TradersPatti.entry_no
        )

        .subquery()

    )

    # Get traders having at least one unsaved KataList1 entry
    traders = (

        db.query(
            KataList1.trader_patti
        )

        .filter(

            KataList1.trader_patti.isnot(None),

            ~KataList1.entry_no.in_(saved_entries)

        )

        .distinct()

        .order_by(
            KataList1.trader_patti
        )

        .all()

    )

    return [

        trader[0]

        for trader in traders

        if trader[0]

    ]

# ================= GET UNIQUE FARMERS =================



def get_farmers(db: Session):

    saved_entries = (

        db.query(
            FarmersPatti.entry_no
        )

        .subquery()

    )

    farmers = (

        db.query(
            KataList1.farmer_patti
        )

        .filter(

            KataList1.farmer_patti.isnot(None),

            ~KataList1.entry_no.in_(saved_entries)

        )

        .distinct()

        .order_by(
            KataList1.farmer_patti
        )

        .all()

    )

    return [

        farmer[0]

        for farmer in farmers

        if farmer[0]

    ]

# ================= GET TRADER DETAILS =================

def get_trader_details(
    db: Session,
    trader_name: str,
    entry_date
):

    # Entry numbers already saved in TradersPatti
    saved_entries = (

        db.query(
            TradersPatti.entry_no
        )

        .subquery()

    )

    # Get only unsaved KataList1 entries
    records = (

        db.query(KataList1)

        .filter(

            KataList1.trader_patti == trader_name,

            KataList1.entry_date == entry_date,

            ~KataList1.entry_no.in_(saved_entries)

        )

        .order_by(
            KataList1.id
        )

        .all()

    )

    BAG_RATE = 40

    result = []

    for row in records:

        gross_amount = (

            float(row.net_weight or 0) / 100

        ) * float(row.trader_price or 0)

        cost_of_bags = (

            float(row.bags or 0) * BAG_RATE

        )

        market_fee = 0

        net_value = (

            gross_amount +

            cost_of_bags -

            market_fee

        )

        result.append({

            "id": row.id,

            "entry_no": row.entry_no,

            "entry_date": row.entry_date,

            "item_name": row.item_name,

            "bags": row.bags,

            "boras": row.boras,

            "net_weight": row.net_weight,

            "rate_per_qtl": row.trader_price,

            "trader_price": row.trader_price,

            "actual_price": row.actual_price,

            "gross_amount": gross_amount,

            "cost_of_bags": cost_of_bags,

            "market_fee": market_fee,

            "net_value": net_value,

            "bond_no": row.bond_no,

        })

    return result

# ================= GET FARMER DETAILS =================
def get_farmer_details(
    db: Session,
    farmer_name: str,
    entry_date
):

    saved_entries = (

        db.query(
            FarmersPatti.entry_no
        )

        .subquery()

    )

    records = (

        db.query(KataList1)

        .filter(

            KataList1.farmer_patti == farmer_name,

            KataList1.entry_date == entry_date,

            ~KataList1.entry_no.in_(saved_entries)

        )

        .order_by(KataList1.id)

        .all()

    )

    BAG_RATE = 40

    result = []

    for row in records:

        gross_amount = (
            float(row.net_weight or 0) / 100
        ) * float(row.farmer_price or 0)

        cost_of_bags = float(row.bags or 0) * BAG_RATE

        net_value = gross_amount + cost_of_bags

        result.append({
            "id": row.id,
            "entry_no": row.entry_no,
            "entry_date": row.entry_date,
            "item_name": row.item_name,
            "bags": row.bags,
            "boras": row.boras,
            "net_weight": row.net_weight,
            "rate_per_qtl": row.farmer_price,
            "farmer_price": row.farmer_price,
            "gross_amount": gross_amount,
            "cost_of_bags": cost_of_bags,
            "market_fee": 0,
            "net_value": net_value,
            "bond_no": row.bond_no,
        })

    return result

# ================= NEXT NUMBERS =================

def get_next_numbers(db: Session):

    last = (
        db.query(KataList1)
        .order_by(KataList1.id.desc())
        .first()
    )

    if last:
        entry_no = str(int(last.entry_no) + 1)
        bond_no = str(int(last.bond_no) + 1)
    else:
        entry_no = "1"
        bond_no = "100"

    return {
        "entry_no": entry_no,
        "bond_no": bond_no
    }


# ================= RECENT ENTRIES =================

def get_recent_entries(db: Session):

    return (
        db.query(KataList1)
        .order_by(KataList1.id.desc())
        .limit(30)
        .all()
    )
    
    