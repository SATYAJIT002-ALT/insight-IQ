from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from app.db.database import get_db
from app.db.models import User, RoleEnum
from app.core.security import verify_password, get_password_hash, create_access_token, decode_access_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/auth", tags=["Authentication"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    role: str = "ANALYST"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    payload = decode_access_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired access token."
        )
    user = db.query(User).filter(User.id == payload["sub"]).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")
    return user

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password."
        )
    
    token = create_access_token(subject=user.id, role=user.role.value if hasattr(user.role, 'value') else str(user.role))
    
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role.value if hasattr(user.role, 'value') else str(user.role),
            "avatar": user.avatar
        }
    }

@router.post("/register", response_model=TokenResponse)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User email already registered.")

    role_val = RoleEnum.ANALYST
    try:
        role_val = RoleEnum[req.role.upper()]
    except Exception:
        pass

    user = User(
        email=req.email,
        name=req.name,
        password=get_password_hash(req.password),
        role=role_val,
        avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    token = create_access_token(subject=user.id, role=user.role.value if hasattr(user.role, 'value') else str(user.role))

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "name": user.name,
            "role": user.role.value if hasattr(user.role, 'value') else str(user.role),
            "avatar": user.avatar
        }
    }

@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "name": current_user.name,
        "role": current_user.role.value if hasattr(current_user.role, 'value') else str(current_user.role),
        "avatar": current_user.avatar
    }
