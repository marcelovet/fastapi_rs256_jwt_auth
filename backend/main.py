from app.auth.routes import router as auth_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FastAPI RS256 JWT Auth")

# Configuração CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL for Vue.js
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir routers
app.include_router(auth_router)


@app.get("/")
async def root():
    return {"message": "FastAPI JWT Auth with RS256"}
