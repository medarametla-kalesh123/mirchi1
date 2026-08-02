from datetime import date

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import get_db

from schemas.katalist1 import (
    KataList1Create,
    KataList1Response
)

from services.katalist1_service import (
    create_katalist1,
    get_katalist1,
    get_katalist1_by_entry_no,
    update_katalist1,
    delete_katalist1,
    get_next_entry_no,
    get_next_numbers,
    get_traders,
    get_farmers,
    get_trader_details,
    get_farmer_details,
    get_recent_entries   
)
router = APIRouter(
    prefix="/katalist1",
    tags=["Kata List 1"]
)

# ================= CREATE =================

@router.post(
    "/",
    response_model=KataList1Response
)
def create_entry(
    kata: KataList1Create,
    db: Session = Depends(get_db)
):

    return create_katalist1(db, kata)


# ================= GET ALL =================

@router.get(
    "/",
    response_model=list[KataList1Response]
)
def get_all_entries(
    db: Session = Depends(get_db)
):

    return get_katalist1(db)


# ================= NEXT ENTRY NUMBER =================

@router.get("/next-entry/{entry_date}")
def fetch_next_entry_number(
    entry_date: date,
    db: Session = Depends(get_db)
):

    next_no = get_next_entry_no(
        db,
        entry_date
    )

    return {
        "entry_no": next_no
    }
    
@router.get("/next")
def fetch_next_numbers(
    db: Session = Depends(get_db)
):

    return get_next_numbers(db)    


# ================= GET TRADERS =================

@router.get("/traders")
def fetch_traders(
    db: Session = Depends(get_db)
):

    return get_traders(db)

# ================= GET FARMERS =================

@router.get("/farmers")
def fetch_farmers(
    db: Session = Depends(get_db)
):

    return get_farmers(db)


# ================= GET TRADER DETAILS =================

# ================= GET TRADER DETAILS =================

@router.get("/trader/{trader_name}")
def fetch_trader_details(
    trader_name: str,
    entry_date: date = Query(...),
    db: Session = Depends(get_db)
):

    return get_trader_details(
        db,
        trader_name,
        entry_date
    )
    
    # ================= GET FARMER DETAILS =================

@router.get("/farmer/{farmer_name}")
def fetch_farmer_details(
    farmer_name: str,
    entry_date: date = Query(...),
    db: Session = Depends(get_db)
):

    return get_farmer_details(
        db,
        farmer_name,
        entry_date
    )
    
    # ================= RECENT ENTRIES =================

@router.get(
    "/recent",
    response_model=list[KataList1Response]
)
def fetch_recent_entries(
    db: Session = Depends(get_db)
):

    return get_recent_entries(db)


# ================= GET BY ENTRY NO =================

@router.get(
    "/{entry_no}",
    response_model=KataList1Response
)
def get_entry(
    entry_no: str,
    db: Session = Depends(get_db)
):

    kata = get_katalist1_by_entry_no(
        db,
        entry_no
    )

    if not kata:

        raise HTTPException(
            status_code=404,
            detail="Entry Not Found"
        )

    return kata


# ================= UPDATE =================

@router.put(
    "/{entry_no}",
    response_model=KataList1Response
)
def update_entry(
    entry_no: str,
    kata: KataList1Create,
    db: Session = Depends(get_db)
):

    updated = update_katalist1(
        db,
        entry_no,
        kata
    )

    if not updated:

        raise HTTPException(
            status_code=404,
            detail="Entry Not Found"
        )

    return updated


# ================= DELETE =================

@router.delete("/{entry_no}")
def delete_entry(
    entry_no: str,
    db: Session = Depends(get_db)
):

    deleted = delete_katalist1(
        db,
        entry_no
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Entry Not Found"
        )

    return deleted