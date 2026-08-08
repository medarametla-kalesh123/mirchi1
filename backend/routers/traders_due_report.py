from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import get_db

from schemas.traders_due_report import (
    TradersDueReportCreate,
    TradersDueReportResponse
)

from services.traders_due_report import (
    create_traders_due_entry,
    get_all_traders_due_entries
)


# =====================================================
# ROUTER
# =====================================================

router = APIRouter(

    prefix="/traders-due-report",

    tags=["Traders Due Report"]

)


# =====================================================
# CREATE TRADERS DUE ENTRY
# =====================================================

@router.post(
    "/",
    response_model=TradersDueReportResponse
)
def create_entry(

    entry: TradersDueReportCreate,

    db: Session = Depends(get_db)

):

    return create_traders_due_entry(

        db,

        entry

    )


# =====================================================
# GET ALL TRADERS DUE ENTRIES
# =====================================================

@router.get(
    "/",
    response_model=list[TradersDueReportResponse]
)
def get_entries(

    db: Session = Depends(get_db)

):

    return get_all_traders_due_entries(

        db

    )