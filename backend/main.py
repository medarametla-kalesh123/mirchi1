from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import engine


# ================= Models =================

from models.account import Account

from models.katalist1 import KataList1

from models.traderspatti import TradersPatti

from models.farmers_patti import FarmersPatti

from models.four_column_daybook import FourColumnDayBook
from models.traders_due_report import TradersDueReport


# ================= Routers =================

from routers.account import router as account_router

from routers.katalist1 import router as katalist1_router

from routers.traderspatti import router as traderspatti_router

from routers.farmers_patti import router as farmers_patti_router

from routers.dailyreport import router as dailyreport_router

from routers import farmers_due_report



from routers.four_column_daybook import (
    router as four_column_daybook_router
)
from routers.traders_due_report import (

    router as traders_due_report_router

)


# ================= Create Tables =================

Account.metadata.create_all(
    bind=engine
)


KataList1.metadata.create_all(
    bind=engine
)


TradersPatti.metadata.create_all(
    bind=engine
)


FarmersPatti.metadata.create_all(
    bind=engine
)


FourColumnDayBook.metadata.create_all(
    bind=engine
)


TradersDueReport.metadata.create_all(

    bind=engine

)


# ================= FastAPI App =================

app = FastAPI(

    title="Mirchi Trading API",

    version="1.0.0"

)


# ================= CORS =================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://mirchi1.netlify.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# ================= Home API =================

@app.get("/")
def home():

    return {

        "message":
        "Mirchi Trading Backend Running Successfully"

    }


# ================= Account APIs =================

app.include_router(
    account_router
)


# ================= Kata List 1 APIs =================

app.include_router(
    katalist1_router
)


# ================= Traders Patti APIs =================

app.include_router(
    traderspatti_router
)


# ================= Farmers Patti APIs =================

app.include_router(
    farmers_patti_router
)


# ================= Daily Report APIs =================

app.include_router(
    dailyreport_router
)


# ================= Four Column Day Book APIs =================

app.include_router(
    four_column_daybook_router
)


app.include_router(

    traders_due_report_router

)

app.include_router(
    farmers_due_report.router
)
