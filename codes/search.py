import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from vectorstore import FaissVectorStore

load_dotenv()


class RAGSearch:
    def __init__(self):
        self.vectorstore = FaissVectorStore()
        self.vectorstore.load()

        # ✅ fixed indentation here
        self.llm = ChatGroq(
            temperature=0,
            model="llama-3.1-8b-instant",
            groq_api_key=os.getenv("GROQ_API_KEY")
        )

    def build_index(self, documents):
        self.vectorstore.build_from_documents(documents)

    def search_and_answer(self, query):
        chunks = self.vectorstore.search(query)

        context = "\n\n".join(chunks)

        prompt = f"""
You are a helpful assistant.
Answer based only on the context below.

Context:
{context}

Question:
{query}

Answer:
"""

        response = self.llm.invoke(prompt)
        return response.content, chunks