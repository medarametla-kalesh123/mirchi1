from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date

from database import get_db

from schemas.dailyreport import DailyReportResponse

from services.dailyreport_service import (
    get_daily_report
)

router = APIRouter(
    prefix="/dailyreport",
    tags=["Daily Report"]
)


# ================= DAILY REPORT =================

@router.get(
    "/",
    response_model=DailyReportResponse
)
def daily_report(
    report_date: date,
    db: Session = Depends(get_db)
):

    return get_daily_report(
        db,
        report_date
    )