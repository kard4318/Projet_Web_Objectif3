# Backend - Guide rapide

## Vue d'ensemble
- `backend/backend/app.py` : API FastAPI de classification alimentaire (port 8000)
- `backend/Modele_rag/app.py` : API Flask RAG medicale avec Groq (port 5000)
- `backend/Nutritionist/Nutrutionist__backend.py` : Chatbot nutritionniste Flask + Groq (port 9000)
- `backend/launcher.py` : lanceur unifie pour demarrer les trois services

## Environnement (un seul venv pour tous les services)
1. Creer un environnement virtuel a la racine du repo (ou dans `backend/`) :
   ```bash
   python -m venv .venv
   # Linux/macOS
   source .venv/bin/activate
   # Windows PowerShell
   .venv\\Scripts\\Activate.ps1
   ```
2. Installer les dependances du dossier `backend/requirments` dans l'ordre :
   ```bash
   pip install -r backend/requirments/requirements.txt
   pip install -r backend/requirments/requirements-base.txt
   pip install -r backend/requirments/requirements-langchain.txt
   pip install -r backend/requirments/requirements-ml.txt
   ```

## Demarrer tous les serveurs
```bash
python backend/launcher.py
```
Choisir l'option "Start ALL services" (ou 4) :
- FastAPI nourriture : http://localhost:8000
- RAG medical : http://localhost:5000
- Chatbot nutrition : http://localhost:9000

## Architecture rapide
```
backend/
├─ backend/                 # API FastAPI (food)
│  └─ app.py
├─ Modele_rag/              # RAG medical Flask
│  └─ app.py
├─ Nutritionist/            # Chatbot nutritionniste Flask
│  └─ Nutrutionist__backend.py
├─ requirments/             # Fichiers de dependances (ordre ci-dessus)
└─ launcher.py              # Lanceur CLI pour demarrer les 3 services
```
