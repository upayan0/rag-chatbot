import os
import faiss
import pickle
import numpy as np
from embedding import EmbeddingModel


class FaissVectorStore:
    def __init__(self, store_path="faiss_store"):
        self.store_path = store_path
        self.index_file = os.path.join(store_path, "index.faiss")
        self.meta_file = os.path.join(store_path, "metadata.pkl")
        self.embedding = EmbeddingModel()
        self.index = None
        self.metadata = []

    def build_from_documents(self, documents):
        texts = [doc.page_content for doc in documents]
        embeddings = self.embedding.embed_documents(texts)

        dim = embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dim)
        self.index.add(np.array(embeddings))

        self.metadata = texts

        os.makedirs(self.store_path, exist_ok=True)
        faiss.write_index(self.index, self.index_file)

        with open(self.meta_file, "wb") as f:
            pickle.dump(self.metadata, f)

    def load(self):
        if os.path.exists(self.index_file):
            self.index = faiss.read_index(self.index_file)
            with open(self.meta_file, "rb") as f:
                self.metadata = pickle.load(f)

    def search(self, query, top_k=3):
        query_vector = self.embedding.embed_query(query)
        D, I = self.index.search(np.array([query_vector]), top_k)
        return [self.metadata[i] for i in I[0]]