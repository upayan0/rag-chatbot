<img width="1918" height="1027" alt="response" src="https://github.com/user-attachments/assets/bb17c013-1f28-47dd-8acd-e444adc4c46d" />
---

# 🚀 **RAG Chatbot — AI Document Question Answering System**

An intelligent **Retrieval-Augmented Generation (RAG) chatbot** that allows users to upload documents and ask questions based on their content.
The system retrieves relevant context using vector search and generates accurate answers using an LLM.

This project demonstrates **LLM integration, vector databases, semantic search, and full-stack AI deployment**.

---

# 📌 **Project Overview**

This system allows users to:

✅ Upload PDF or text documents
✅ Automatically index documents using embeddings
✅ Perform semantic search using FAISS vector database
✅ Generate context-aware answers using LLM
✅ Chat with documents in real time
✅ Store chat history in browser
✅ Modern ChatGPT-style frontend UI

---

# 🏗️ **Architecture**

```
User → Frontend UI → FastAPI Backend → FAISS Vector Search → LLM Response
```

### Workflow:

1. User uploads documents
2. Documents are split into chunks
3. Text converted to embeddings
4. Stored in FAISS vector database
5. User asks question
6. Relevant chunks retrieved
7. LLM generates answer from context

---

# 🖼️ **Screenshots**

## 📊 System Overview
<img width="1910" height="1031" alt="overview" src="https://github.com/user-attachments/assets/1418d113-5583-4a91-a05e-5ad7c4446e8c" />

<img src="overview.png" width="900">

---

## 💬 Chatbot Response Interface
<img width="1918" height="1027" alt="response" src="https://github.com/user-attachments/assets/e6d369e6-fdf4-4cc7-ab4d-25051eb498f5" />


<img src="response.png" width="900">

---

# ⚡ **Features**

* 📄 PDF & TXT document upload
* 🔍 Semantic search using FAISS
* 🤖 LLM-powered answers (Groq LLaMA model)
* 💾 Persistent vector storage
* 🧠 Sentence transformer embeddings
* 🎨 ChatGPT-like frontend
* 📂 Drag & drop file upload
* 🎙️ Voice input support (frontend)
* 💬 Streaming typing effect
* 📜 Chat history stored in browser

---

# 🧰 **Tech Stack**

## Backend

* FastAPI
* LangChain
* FAISS Vector Store
* Sentence Transformers
* Groq LLM API
* Python

## Frontend

* HTML
* CSS
* JavaScript
* Markdown rendering

## AI / ML

* all-MiniLM-L6-v2 Embedding Model
* Retrieval Augmented Generation (RAG)

---

# 📁 **Project Structure**

```
chatbot/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── faiss_store/
│   ├── index.faiss
│   └── metadata.pkl
│
├── uploads/
│
├── app.py
├── data_loader.py
├── embedding.py
├── search.py
├── vectorstore.py
├── requirements.txt
└── README.md
```

---

# ⚙️ **Installation & Setup**

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/rag-chatbot.git
cd rag-chatbot
```

---

## 2️⃣ Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

---

## 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4️⃣ Setup Environment Variables

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

---

## 5️⃣ Run Backend Server

```bash
uvicorn app:app --reload
```

Server runs at:

```
http://localhost:8000
```

---

## 6️⃣ Open Frontend

Open:

```
frontend/index.html
```

---

# 🧠 **How RAG Works in This Project**

### Step 1 — Document Processing

* Load PDF/TXT files
* Split into chunks

### Step 2 — Embedding Generation

* Convert text → vector embeddings

### Step 3 — Vector Storage

* Store embeddings in FAISS index

### Step 4 — Query Processing

* Convert query → embedding
* Retrieve top matching chunks

### Step 5 — LLM Response

* Context passed to LLM
* Generates final answer

---

# 🔐 **Environment Variables**

| Variable     | Description          |
| ------------ | -------------------- |
| GROQ_API_KEY | API key for Groq LLM |

---

# 📈 **Future Improvements**

* Authentication system
* Multi-user chat sessions
* Streaming backend responses
* Docker deployment
* Cloud storage for vectors
* Better source citation
* Model switching support

---

# 👨‍💻 **Author**

**Upayan Chatterjee**

* AI Engineer & Full Stack Developer
* Interested in LLMs, AI systems, and real-world applications

---

# ⭐ **If You Like This Project**

Give it a ⭐ on GitHub — it helps!

---

If you want, I can next help you make this even more **industry-level portfolio ready**, like:

✅ animated README with badges
✅ GitHub shields (build, license, python version etc.)
✅ architecture diagram image
✅ deployment section
✅ demo video section
✅ professional project description for placements

Just tell me 👍
