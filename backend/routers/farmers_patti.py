from datetime import date

from fastapi import APIRouter, Depends,Query
from sqlalchemy.orm import Session

from database import get_db

from schemas.farmers_patti import (
    FarmersPattiCreate,
    FarmersPattiResponse
)

from services.farmers_patti_service import (
    create_farmers_patti,
    get_all_farmers_patti,
    get_farmers_patti_by_farmer,
    get_farmers_patti_by_date,
    get_next_defaults,
    search_farmers_patti,
    get_saved_farmers,
    get_farmers_patti_print,
    get_single_farmers_patti_print,
    get_saved_patti
)


router = APIRouter(

    prefix="/farmers-patti",

    tags=["Farmers Patti"]

)


# ================= NEXT DEFAULTS =================

@router.get("/next-defaults")
def fetch_next_defaults(

    db: Session = Depends(get_db)

):

    return get_next_defaults(db)


# ================= SAVE =================

@router.post(

    "/",

    response_model=FarmersPattiResponse

)
def save_farmers_patti(

    farmers_patti: FarmersPattiCreate,

    db: Session = Depends(get_db)

):

    return create_farmers_patti(

        db,

        farmers_patti

    )


# ================= GET ALL =================

@router.get(

    "/",

    response_model=list[FarmersPattiResponse]

)
def fetch_all_farmers_patti(

    db: Session = Depends(get_db)

):

    return get_all_farmers_patti(db)

# ================= GET SAVED FARMERS =================

# ================= GET SAVED FARMERS BY DATE =================

# ================= GET SAVED FARMERS =================

@router.get("/farmers")

def fetch_saved_farmers(

    patti_date: date = Query(...),

    db: Session = Depends(get_db)

):

    return get_saved_farmers(

        db,

        patti_date

    )


# ================= SEARCH FARMER =================

@router.get("/search")
def search_farmer(

    farmer_name: str,
    patti_date: date = Query(...),

    db: Session = Depends(get_db)

):

    return search_farmers_patti(

        db,
        farmer_name,
        patti_date

    )
    # ================= GET ONE SAVED PATTI =================

@router.get("/saved")

def fetch_saved_patti(

    farmer_name: str,
    patti_date: date = Query(...),
    serial_no: str = Query(...),
    book_no: str = Query(...),

    db: Session = Depends(get_db)

):

    return get_saved_patti(

        db,
        farmer_name,
        patti_date,
        serial_no,
        book_no

    )


# ================= GET BY FARMER =================

@router.get(

    "/farmer/{farmer_name}",

    response_model=list[FarmersPattiResponse]

)
def fetch_by_farmer(

    farmer_name: str,
    patti_date: date = Query(...),

    db: Session = Depends(get_db)

):

    return get_farmers_patti_by_farmer(

        db,

        farmer_name,
        patti_date

    )

# ================= GET BY DATE =================

@router.get(

    "/date/{patti_date}",

    response_model=list[FarmersPattiResponse]

)
def fetch_by_date(

    patti_date: date,

    db: Session = Depends(get_db)

):

    return get_farmers_patti_by_date(

        db,

        patti_date

    )
# ================= PRINT FARMER PATTI =================

@router.get("/print")
def fetch_farmers_patti_print(

    farmer_name: str,

    patti_date: date = Query(...),

    db: Session = Depends(get_db)

):

    return get_farmers_patti_print(

        db,

        farmer_name,

        patti_date

    )
    # ================= PRINT ONE PATTI =================

@router.get("/print-single")
def print_single_farmers_patti(
    farmer_name: str,
    patti_date: date,
    serial_no: str,
    book_no: str,
    db: Session = Depends(get_db)
):

    return get_single_farmers_patti_print(
        db=db,
        farmer_name=farmer_name,
        patti_date=patti_date,
        serial_no=serial_no,
        book_no=book_no
    )