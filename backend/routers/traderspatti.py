from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from fastapi import Query

from database import get_db

from schemas.traderspatti import (
    TradersPattiCreate,
    TradersPattiResponse
)

from services.traderspatti_service import (
    create_traders_patti,
    get_traders_patti,
    get_traders_patti_by_book_no,
    get_traders_patti_by_trader,
    get_saved_traders,
    search_traders_patti,
    get_next_defaults,
    update_traders_patti,
    delete_traders_patti
)

router = APIRouter(
    prefix="/traderspatti",
    tags=["Traders Patti"]
)


# ================= CREATE =================

@router.post(
    "/",
    response_model=TradersPattiResponse
)
def create_trader_patti(
    trader: TradersPattiCreate,
    db: Session = Depends(get_db)
):

    return create_traders_patti(
        db,
        trader
    )


# ================= GET ALL =================

@router.get(
    "/",
    response_model=list[TradersPattiResponse]
)
def get_all_traders_patti(
    db: Session = Depends(get_db)
):

    return get_traders_patti(db)


# ================= SEARCH TRADER =================

@router.get(
    "/search",
    response_model=TradersPattiResponse
)
def search_trader(
    trader_name: str,
    db: Session = Depends(get_db)
):

    return search_traders_patti(
        db,
        trader_name
    )


# ================= GET SAVED TRADERS =================

@router.get("/saved-traders")
def saved_traders(
    patti_date: date = Query(...),
    db: Session = Depends(get_db)
):

    return get_saved_traders(
        db,
        patti_date
    )

# ================= GET BY TRADER =================

@router.get(
    "/trader/{trader_name}",
    response_model=list[TradersPattiResponse]
)
def get_trader(
    trader_name: str,
    patti_date: date = Query(...),
    db: Session = Depends(get_db)
):

    return get_traders_patti_by_trader(
        db,
        trader_name,
        patti_date
    )


# ================= GET BY BOOK NO =================

@router.get(
    "/book/{book_no}",
    response_model=list[TradersPattiResponse]
)
def get_book(
    book_no: str,
    db: Session = Depends(get_db)
):

    return get_traders_patti_by_book_no(
        db,
        book_no
    )


# ================= NEXT DEFAULTS =================

@router.get("/next-defaults")
def next_defaults(
    db: Session = Depends(get_db)
):

    return get_next_defaults(db)


# ================= UPDATE =================

@router.put(
    "/{id}",
    response_model=TradersPattiResponse
)
def update_trader(
    id: int,
    trader: TradersPattiCreate,
    db: Session = Depends(get_db)
):

    updated = update_traders_patti(
        db,
        id,
        trader
    )

    if not updated:

        raise HTTPException(
            status_code=404,
            detail="Trader Patti Not Found"
        )

    return updated


# ================= DELETE =================

@router.delete("/{id}")
def delete_trader(
    id: int,
    db: Session = Depends(get_db)
):

    deleted = delete_traders_patti(
        db,
        id
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Trader Patti Not Found"
        )

    return deleted