from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="Heart Disease Risk API")

# ✅ CORS for React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load trained XGBoost model
model = joblib.load("model/XG_model.pkl")

# ✅ EXACT schema from dataset
class HeartInput(BaseModel):
    age: int
    sex: int
    cp: int
    trestbps: int
    chol: int
    fbs: int
    restecg: int
    thalach: int
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.get("/")
def home():
    return {"message": "Heart Disease Prediction API Running"}

@app.post("/predict")
def predict(data: HeartInput):

    # ✅ EXACT feature order as training
    features = np.array([[
        data.age,
        data.sex,
        data.cp,
        data.trestbps,
        data.chol,
        data.fbs,
        data.restecg,
        data.thalach,
        data.exang,
        data.oldpeak,
        data.slope,
        data.ca,
        data.thal
    ]])

    prediction = int(model.predict(features)[0])
    probability = float(model.predict_proba(features)[0][1])

    return {
        "target": prediction,               # 0 or 1
        "risk": "High" if prediction == 1 else "Low",
        "probability": round(probability * 100, 2)
    }
