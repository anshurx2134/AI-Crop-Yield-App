from fastapi import FastAPI
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
  "http://localhost:3000",
  "http://localhost:5173"
]

app.add_middleware( 
  CORSMiddleware,
  allow_origins= origins,
  allow_credentials = True,
  allow_methods= ["*"],
  allow_headers= ["*"],
)

def load_model():
  print("Loading model...")
  model = joblib.load("crop-yield-model.pkl")
  print("The model loaded successfully!")
  return model


def predict_model(model, features):
  yield_prediction = model.predict(features)
  return yield_prediction

@app.get("/predict/")
def predict_crop_yield(rainfall:float, fertilizer:float, temperature:float, nitrogen:float, phosphorus:float, potassium:float):
  model = load_model()

  features = [[rainfall, fertilizer, temperature, nitrogen, phosphorus, potassium]]

  print("The features inputted are: ", features)

  yield_prediction = predict_model(model, features)

  print("The final yield predicted by model:", yield_prediction)

  return {"Predicted yield = ": str(yield_prediction)}
