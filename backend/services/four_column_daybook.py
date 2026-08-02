from sqlalchemy.orm import Session
from datetime import date

from models.four_column_daybook import FourColumnDayBook
from schemas.four_column_daybook import FourColumnDayBookCreate

from models.account import Account

from models.traders_due_report import TradersDueReport
from models.farmers_due_report import FarmersDueReport



# =====================================================
# CREATE
# =====================================================

def create_daybook_entry(
    db: Session,
    entry: FourColumnDayBookCreate
):

    # ==========================================
    # SAVE IN FOUR COLUMN DAY BOOK
    # ==========================================

    new_entry = FourColumnDayBook(

        transaction_no=entry.transaction_no,

        voucher_no=entry.voucher_no,

        date=entry.date,

        voucher_type=entry.voucher_type,

        group_name=entry.group_name,

        income=entry.income,

        credit=entry.credit,

        account_name=entry.account_name,

        pb_no=entry.pb_no,

        expenditure=entry.expenditure,

        narration=entry.narration,

        bill_no=entry.bill_no,

        amount=entry.amount,

        running_total=entry.running_total

    )


    db.add(new_entry)

    db.commit()

    db.refresh(new_entry)



    # ==========================================
    # IF TRADERS, SAVE IN TRADERS DUE REPORT
    # ==========================================

    if entry.group_name == "Traders":

        trader_account = db.query(
            Account
        ).filter(

            Account.account_name == entry.account_name,

            Account.group_name == "Traders"

        ).first()


        town = ""

        if trader_account:

            town = trader_account.town



        traders_due = TradersDueReport(

            town=town,

            account_name=entry.account_name,

            bill_date=entry.date,

            bill_no=entry.bill_no,

            bill_amount=entry.amount

        )


        db.add(traders_due)

        db.commit()



    # ==========================================
    # IF FARMERS, SAVE IN FARMERS DUE REPORT
    # ==========================================

    if entry.group_name == "Farmers":

        farmer_account = db.query(
            Account
        ).filter(

            Account.account_name == entry.account_name,

            Account.group_name == "Farmers"

        ).first()


        town = ""

        if farmer_account:

            town = farmer_account.town



        farmers_due = FarmersDueReport(

            town=town,

            account_name=entry.account_name,

            bill_date=entry.date,

            bill_no=entry.bill_no,

            bill_amount=entry.amount

        )


        db.add(farmers_due)

        db.commit()



    return new_entry





# =====================================================
# GET ALL
# =====================================================

def get_all_daybook_entries(
    db: Session
):

    return db.query(

        FourColumnDayBook

    ).order_by(

        FourColumnDayBook.id.desc()

    ).all()





# =====================================================
# GET BY ID
# =====================================================

def get_daybook_entry(

    db: Session,

    entry_id: int

):

    return db.query(

        FourColumnDayBook

    ).filter(

        FourColumnDayBook.id == entry_id

    ).first()





# =====================================================
# UPDATE
# =====================================================

def update_daybook_entry(

    db: Session,

    entry_id: int,

    entry: FourColumnDayBookCreate

):

    existing_entry = db.query(

        FourColumnDayBook

    ).filter(

        FourColumnDayBook.id == entry_id

    ).first()



    if not existing_entry:

        return None



    existing_entry.transaction_no = entry.transaction_no

    existing_entry.voucher_no = entry.voucher_no

    existing_entry.date = entry.date

    existing_entry.voucher_type = entry.voucher_type

    existing_entry.group_name = entry.group_name

    existing_entry.income = entry.income

    existing_entry.credit = entry.credit

    existing_entry.account_name = entry.account_name

    existing_entry.pb_no = entry.pb_no

    existing_entry.expenditure = entry.expenditure

    existing_entry.narration = entry.narration

    existing_entry.bill_no = entry.bill_no

    existing_entry.amount = entry.amount

    existing_entry.running_total = entry.running_total



    db.commit()

    db.refresh(existing_entry)

    return existing_entry





# =====================================================
# VOUCHER TYPE BASE NUMBERS
# =====================================================

VOUCHER_START_NUMBERS = {

    "Cash Payment": 1,

    "Cash Receipt": 100,

    "Bank Payment": 200,

    "Bank Receipt": 300,

    "Contra": 400,

    "Journal": 500

}





# =====================================================
# NEXT BILL NUMBER
# =====================================================

def get_next_bill_no(

    db: Session

):

    last_bill = db.query(

        FourColumnDayBook

    ).order_by(

        FourColumnDayBook.bill_no.desc()

    ).first()



    if not last_bill:

        return 1000



    return int(last_bill.bill_no) + 1





# =====================================================
# NEXT TRANSACTION NUMBER
# =====================================================

def get_next_transaction_no(

    db: Session

):

    last_transaction = db.query(

        FourColumnDayBook

    ).order_by(

        FourColumnDayBook.transaction_no.desc()

    ).first()



    if not last_transaction:

        return 1000



    return int(last_transaction.transaction_no) + 1





# =====================================================
# NEXT VOUCHER NUMBER
# =====================================================

def get_next_voucher_no(

    db: Session,

    voucher_type: str

):

    return VOUCHER_START_NUMBERS.get(

        voucher_type,

        1

    )





# =====================================================
# NEW ENTRY DEFAULTS
# =====================================================

def get_new_daybook_defaults(

    db: Session,

    voucher_type: str

):

    return {

        "transaction_no": get_next_transaction_no(db),

        "voucher_no": get_next_voucher_no(db, voucher_type),

        "date": date.today(),

        "voucher_type": voucher_type,

        "bill_no": get_next_bill_no(db)

    }





# =====================================================
# DELETE
# =====================================================

def delete_daybook_entry(

    db: Session,

    entry_id: int

):

    existing_entry = db.query(

        FourColumnDayBook

    ).filter(

        FourColumnDayBook.id == entry_id

    ).first()



    if not existing_entry:

        return None



    # ==========================================
    # DELETE FARMERS DUE REPORT
    # ==========================================

    if existing_entry.group_name == "Farmers":

        db.query(

            FarmersDueReport

        ).filter(

            FarmersDueReport.account_name == existing_entry.account_name,

            FarmersDueReport.bill_no == existing_entry.bill_no

        ).delete()



    # ==========================================
    # DELETE TRADERS DUE REPORT
    # ==========================================

    if existing_entry.group_name == "Traders":

        db.query(

            TradersDueReport

        ).filter(

            TradersDueReport.account_name == existing_entry.account_name,

            TradersDueReport.bill_no == existing_entry.bill_no

        ).delete()



    # ==========================================
    # DELETE FOUR COLUMN DAY BOOK
    # ==========================================

    db.delete(existing_entry)

    db.commit()


    return existing_entry