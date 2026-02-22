import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from data_loader import load_all_documents
from search import RAGSearch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

rag = RAGSearch()

@app.get("/")
def home():
    return {"message": "RAG Chatbot Backend Running 🚀"}

@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    
    upload_dir = "../uploads"

    # Create uploads folder if it doesn't exist
    os.makedirs(upload_dir, exist_ok=True)

    upload_path = f"{upload_dir}/{file.filename}"

    with open(upload_path, "wb") as f:
        f.write(await file.read())

    docs = load_all_documents(upload_dir)
    rag.build_index(docs)

    return {"message": "Documents indexed successfully"}

@app.post("/ask/")
async def ask_question(question: str):
    answer, sources = rag.search_and_answer(question)
    return {"answer": answer, "sources": sources}

if __name__ == "__main__":
    print("App started successfully!")