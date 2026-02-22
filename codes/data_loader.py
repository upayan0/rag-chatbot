import os
from langchain_community.document_loaders import PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
#from langchain.text_splitter import RecursiveCharacterTextSplitter


def load_all_documents(folder_path: str):
    documents = []

    for file in os.listdir(folder_path):
        path = os.path.join(folder_path, file)

        if file.endswith(".pdf"):
            loader = PyPDFLoader(path)
            documents.extend(loader.load())

        elif file.endswith(".txt"):
            loader = TextLoader(path)
            documents.extend(loader.load())

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    return splitter.split_documents(documents)