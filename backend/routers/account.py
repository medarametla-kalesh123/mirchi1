from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from schemas.account import AccountCreate
from services.account_service import (
    create_account,
    get_accounts,
    get_account,
    update_account,
    delete_account,
    get_accounts_by_group,
    get_next_account_number,
    get_account_names_by_group,
    search_account,
    get_account_by_name,
    get_towns_by_group as service_get_towns_by_group
    
    
)

router = APIRouter(
    prefix="/accounts",
    tags=["Accounts"]
)


# ================= Next Account Number =================

@router.get("/next-account-number")
def fetch_next_account_number(
    db: Session = Depends(get_db)
):

    return get_next_account_number(db)


# ================= Account Name Suggestions =================

@router.get("/group/{group_name}/names")
def fetch_account_names(
    group_name: str,
    db: Session = Depends(get_db)
):

    return get_account_names_by_group(db, group_name)


# ================= Search Account =================

@router.get("/search")
def search_existing_account(
    group_name: str,
    account_name: str,
    db: Session = Depends(get_db)
):

    account = search_account(
        db,
        group_name,
        account_name
    )

    if account is None:
        raise HTTPException(
            status_code=404,
            detail="Account Not Found"
        )

    return account


# ================= Get Address By Account Name =================

@router.get("/address/{account_name}")
def fetch_account_address(
    account_name: str,
    db: Session = Depends(get_db)
):

    account = get_account_by_name(
        db,
        account_name
    )

    if account is None:

        raise HTTPException(
            status_code=404,
            detail="Account Not Found"
        )

    return {

        "address": account.address

    }


# ================= Create Account =================

@router.post("/")
def save_account(
    account: AccountCreate,
    db: Session = Depends(get_db)
):

    return create_account(db, account)


# ================= Get All Accounts =================

@router.get("/")
def get_all_accounts(
    db: Session = Depends(get_db)
):

    return get_accounts(db)


# ================= Get Accounts By Group =================

@router.get("/group/{group_name}")
def fetch_accounts_by_group(
    group_name: str,
    db: Session = Depends(get_db)
):

    return get_accounts_by_group(db, group_name)


# ================= Get Single Account =================

@router.get("/{account_no}")
def fetch_account(
    account_no: str,
    db: Session = Depends(get_db)
):

    account = get_account(db, account_no)

    if account is None:

        raise HTTPException(
            status_code=404,
            detail="Account Not Found"
        )

    return account

@router.get("/group/{group_name}/towns")
def get_towns_by_group(
    group_name: str,
    db: Session = Depends(get_db)
):
    return service_get_towns_by_group(db, group_name)


# ================= Update Account =================

@router.put("/{account_no}")
def edit_account(
    account_no: str,
    account: AccountCreate,
    db: Session = Depends(get_db)
):

    updated_account = update_account(
        db,
        account_no,
        account
    )

    if updated_account is None:

        raise HTTPException(
            status_code=404,
            detail="Account Not Found"
        )

    return updated_account


# ================= Delete Account =================

@router.delete("/{account_no}")
def remove_account(
    account_no: str,
    db: Session = Depends(get_db)
):

    deleted = delete_account(
        db,
        account_no
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="Account Not Found"
        )

    return deleted