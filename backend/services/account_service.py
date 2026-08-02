from datetime import date

from sqlalchemy import func
from sqlalchemy.orm import Session

from models.account import Account
from schemas.account import AccountCreate
from fastapi import HTTPException


# ================= Next Account Number =================

def get_next_account_number(db: Session):

    last_id = db.query(
        func.max(Account.id)
    ).scalar()

    if last_id is None:

        next_account_no = "10000001"

    else:

        next_account_no = str(
            10000001 + last_id
        ).zfill(8)

    return {
        "account_no": next_account_no,
        "opening_date": date.today()
    }



# ================= Create =================

def create_account(
    db: Session,
    account: AccountCreate
):

    existing = (
        db.query(Account)
        .filter(
            func.lower(Account.account_name) == account.account_name.lower(),
            Account.group_name == account.group_name
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Account name already exists in this group"
        )

    next_data = get_next_account_number(db)

    db_account = Account(

        account_no=next_data["account_no"],
        opening_date=next_data["opening_date"],

        account_name=account.account_name,
        description=account.description,

        group_name=account.group_name,

        opening_balance=account.opening_balance,
        current_balance=account.current_balance,

        tin_no=account.tin_no,
        credit_limit=account.credit_limit,

        land_acres=account.land_acres,
        interest_pa=account.interest_pa,

        address=account.address,
        town=account.town,
        district=account.district,
        state=account.state,
        pincode=account.pincode,

        phone_number=account.phone_number,

        account_name_telugu=account.account_name_telugu,

        debit_balance=account.debit_balance,
        credit_balance=account.credit_balance

    )

    db.add(db_account)
    db.commit()
    db.refresh(db_account)

    return db_account

# ================= Get All =================

def get_accounts(db: Session):

    return db.query(Account).all()


# ================= Get One =================

def get_account(
    db: Session,
    account_no: str
):

    return (
        db.query(Account)
        .filter(Account.account_no == account_no)
        .first()
    )


# ================= Search By Group & Account Name =================

def search_account(
    db: Session,
    group_name: str,
    account_name: str
):

    return (
        db.query(Account)
        .filter(
            Account.group_name == group_name,
            Account.account_name == account_name
        )
        .first()
    )


# ================= Update =================

def update_account(
    db: Session,
    account_no: str,
    account: AccountCreate
):

    db_account = (
        db.query(Account)
        .filter(Account.account_no == account_no)
        .first()
    )

    if db_account is None:
        return None

    update_data = account.model_dump(
        exclude={
            "account_no",
            "opening_date"
        }
    )

    for key, value in update_data.items():
        setattr(db_account, key, value)

    db.commit()
    db.refresh(db_account)

    return db_account


# ================= Delete =================

def delete_account(
    db: Session,
    account_no: str
):

    db_account = (
        db.query(Account)
        .filter(Account.account_no == account_no)
        .first()
    )

    if db_account is None:
        return None

    db.delete(db_account)
    db.commit()

    return {
        "message": "Account deleted successfully"
    }


# ================= Get Accounts By Group =================

def get_accounts_by_group(
    db: Session,
    group_name: str
):

    return (
        db.query(Account)
        .filter(Account.group_name == group_name)
        .all()
    )


# ================= Account Name Suggestions =================

def get_account_names_by_group(
    db: Session,
    group_name: str
):

    accounts = (
        db.query(Account.account_name)
        .filter(Account.group_name == group_name)
        .order_by(Account.account_name)
        .all()
    )

    return [
        account.account_name
        for account in accounts
    ]
    
    # ================= Get Account By Name =================

def get_account_by_name(
    db: Session,
    account_name: str
):

    return (
        db.query(Account)
        .filter(
            func.lower(Account.account_name) == account_name.lower()
        )
        .first()
    )
    


def get_towns_by_group(
    db: Session,
    group_name: str
):
    towns = (
        db.query(Account.town)
        .filter(
            Account.group_name == group_name,
            Account.town != None,
            Account.town != ""
        )
        .distinct()
        .order_by(Account.town)
        .all()
    )

    return [town[0] for town in towns]    