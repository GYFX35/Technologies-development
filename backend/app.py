from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf

app = FastAPI()

# Enable CORS for frontend interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Global Technologies Development AI Backend"}

@app.get("/info")
def get_info():
    return {
        "status": "online",
        "tensorflow_version": tf.__version__,
        "features": ["AI Assistance", "Sustainability Tools", "Global Accessibility"]
    }

@app.post("/predict")
async def predict(data: dict):
    # This is a placeholder for actual AI logic
    return {"prediction": f"AI processed: {data.get('input', 'no input')}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
