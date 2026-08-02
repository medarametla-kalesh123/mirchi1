from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from database import get_db

from schemas.farmers_due_report import (
    FarmersDueReportCreate,
    FarmersDueReportResponse
)

from services.farmers_due_report import (
    create_farmers_due_entry,
    get_all_farmers_due_entries
)


# =====================================================
# ROUTER
# =====================================================

router = APIRouter(
    prefix="/farmers-due-report",
    tags=["Farmers Due Report"]
)


# =====================================================
# CREATE
# POST /farmers-due-report/
# =====================================================

@router.post(
    "/",
    response_model=FarmersDueReportResponse
)
def create_entry(

    entry: FarmersDueReportCreate,

    db: Session = Depends(get_db)

):

    return create_farmers_due_entry(
        db,
        entry
    )


# =====================================================
# GET ALL
# GET /farmers-due-report/
# =====================================================

@router.get(
    "/",
    response_model=list[FarmersDueReportResponse]
)
def get_entries(

    db: Session = Depends(get_db)

):

    return get_all_farmers_due_entries(
        db
    )