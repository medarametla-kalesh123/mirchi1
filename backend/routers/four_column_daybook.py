from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db

from schemas.four_column_daybook import (
    FourColumnDayBookCreate,
    FourColumnDayBookResponse
)

from services.four_column_daybook import (
    create_daybook_entry,
    get_all_daybook_entries,
    get_daybook_entry,
    update_daybook_entry,
    delete_daybook_entry,
    get_new_daybook_defaults
)


# =====================================================
# ROUTER
# =====================================================

router = APIRouter(

    prefix="/four-column-daybook",

    tags=["Four Column Day Book"]

)


# =====================================================
# CREATE DAY BOOK ENTRY
# =====================================================

@router.post(
    "/",
    response_model=FourColumnDayBookResponse
)
def create_entry(

    entry: FourColumnDayBookCreate,

    db: Session = Depends(get_db)

):

    return create_daybook_entry(

        db,

        entry

    )


# =====================================================
# GET ALL DAY BOOK ENTRIES
# =====================================================

@router.get(
    "/",
    response_model=list[FourColumnDayBookResponse]
)
def get_entries(

    db: Session = Depends(get_db)

):

    return get_all_daybook_entries(

        db

    )


# =====================================================
# GET NEW ENTRY DEFAULTS
# =====================================================

@router.get(
    "/new/defaults"
)
def get_new_entry_defaults(

    voucher_type: str,

    db: Session = Depends(get_db)

):

    return get_new_daybook_defaults(

        db,

        voucher_type

    )


# =====================================================
# GET SINGLE DAY BOOK ENTRY
# =====================================================

@router.get(
    "/{entry_id}",
    response_model=FourColumnDayBookResponse
)
def get_entry(

    entry_id: int,

    db: Session = Depends(get_db)

):

    entry = get_daybook_entry(

        db,

        entry_id

    )


    if not entry:

        raise HTTPException(

            status_code=404,

            detail="Day book entry not found"

        )


    return entry


# =====================================================
# UPDATE DAY BOOK ENTRY
# =====================================================

@router.put(
    "/{entry_id}",
    response_model=FourColumnDayBookResponse
)
def update_entry(

    entry_id: int,

    entry: FourColumnDayBookCreate,

    db: Session = Depends(get_db)

):

    updated_entry = update_daybook_entry(

        db,

        entry_id,

        entry

    )


    if not updated_entry:

        raise HTTPException(

            status_code=404,

            detail="Day book entry not found"

        )


    return updated_entry


# =====================================================
# DELETE DAY BOOK ENTRY
# =====================================================

@router.delete(
    "/{entry_id}"
)
def delete_entry(

    entry_id: int,

    db: Session = Depends(get_db)

):

    deleted_entry = delete_daybook_entry(

        db,

        entry_id

    )


    if not deleted_entry:

        raise HTTPException(

            status_code=404,

            detail="Day book entry not found"

        )


    return {

        "message":
        "Day book entry deleted successfully"

    }