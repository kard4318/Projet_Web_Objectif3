# FamilyHealth - Plateforme de Santé Familiale

##  Table des matières
- [Choix du Framework](#choix-du-framework)
- [Fonctionnalités Développées](#fonctionnalités-développées)
- [Étapes de Lancement du Projet](#étapes-de-lancement-du-projet)
- [Architecture Technique](#architecture-technique)

---

##  Choix du Framework

### Frontend : Next.js 16 (React)
**Raisons du choix :**
- **Performance optimale** : Turbopack pour des temps de compilation ultra-rapides
- **Server-Side Rendering (SSR)** : Améliore le SEO et le temps de chargement initial
- **App Router** : Organisation modulaire avec layouts partagés et routes groupées
- **TypeScript** : Typage fort pour réduire les erreurs et améliorer la maintenabilité
- **Écosystème riche** : Radix UI pour des composants accessibles, TailwindCSS pour le styling

### Backend : Architecture Microservices
**3 services indépendants :**

1. **FastAPI (Port 8000)** - Classification d'aliments
   - Performance exceptionnelle avec Python async
   - Documentation automatique avec Swagger/OpenAPI
   - Validation des données avec Pydantic
   - Idéal pour le machine learning (TensorFlow/Keras)

2. **Flask (Port 5000)** - RAG Médical avec LangChain
   - Simplicité et flexibilité
   - Intégration facile avec LangChain et FAISS
   - Support du streaming pour les réponses LLM
   - Base vectorielle pour la recherche sémantique

3. **Flask (Port 9000)** - Chatbot Nutritionniste
   - Service léger et dédié
   - Intégration avec l'API Groq (Llama 3.1)
   - Isolation des fonctionnalités nutritionnelles

**Avantages de l'architecture :**
- Scalabilité indépendante de chaque service
- Maintenance facilitée
- Possibilité de déployer les services séparément
- Résilience : une panne n'affecte pas les autres services

---

##  Fonctionnalités Développées

### 1.  Analyse Nutritionnelle
- **Classification d'images alimentaires**
  - Upload et reconnaissance automatique de 101 catégories d'aliments
  - Calcul nutritionnel détaillé (calories, protéines, glucides, lipides)
  - Estimation de portions personnalisables
  - Modèle ML basé sur EfficientNetB0

- **Chatbot Nutritionniste IA**
  - Conseils personnalisés basés sur l'alimentation
  - Génération de plans de repas équilibrés
  - Recommandations adaptées aux enfants
  - Historique des conversations

### 2. 🧠 Santé Mentale
- **Chatbot Médical RAG**
  - Réponses contextuelles basées sur une base de connaissances médicales
  - Recherche sémantique dans les documents médicaux (FAISS + HuggingFace)
  - Modèle Llama 3.1 via Groq pour des réponses précises
  - Support multilingue (français)
  - Historique et suivi des conversations

### 3. 👨‍👩‍👧 Interface Utilisateur
- **Authentification**
  - Pages de connexion et inscription
  - Gestion des sessions utilisateur
  - Contexte d'authentification global

- **Dashboard Intuitif**
  - Vue d'ensemble de la santé familiale
  - Navigation par catégories (Nutrition, Santé Mentale, Rapports)
  - Responsive design pour mobile et desktop
  - Thème moderne avec Radix UI

- **Interface Admin**
  - Gestion des patients
  - Analyse des messages
  - Statistiques et analytics
  - Configuration des paramètres

### 4. 📊 Rapports et Suivi
- Génération de rapports de santé
- Historique des consultations
- Suivi de l'évolution nutritionnelle

---

## 🚀 Étapes de Lancement du Projet

### Prérequis
- **Python 3.11+** (testé avec Python 3.13)
- **Node.js 18+** et npm
- **Git** pour le clonage du repository

### Installation Complète

#### 1. Cloner le Projet
```bash
git clone https://github.com/kard4318/Projet_Web_Objectif3
cd embs/v0-mother-health-app-main
```

#### 2. Configuration du Backend

##### 2.1 Créer l'Environnement Virtuel Python
```bash
# Windows PowerShell
python -m venv .venv
.venv\Scripts\Activate.ps1

# Linux/macOS
python -m venv .venv
source .venv/bin/activate
```

##### 2.2 Installer les Dépendances Backend
```bash
pip install -r backend/requirments/requirements.txt
pip install -r backend/requirments/requirements-base.txt
pip install -r backend/requirments/requirements-langchain.txt
pip install -r backend/requirments/requirements-ml.txt
```

##### 2.3 Configuration des Variables d'Environnement
Les fichiers `.env` sont déjà configurés :
- `backend/Modele_rag/ATT58074.env` : Contient `GROQ_API_KEY`
- `backend/Nutritionist/.env` : Contient `MEFTEH` (clé Groq)

**Note :** Si vous déployez en production, remplacez les clés API par vos propres clés Groq.

#### 3. Configuration du Frontend

##### 3.1 Installer les Dépendances Node.js
```bash
npm install
```

#### 4. Lancement de l'Application

##### 4.1 Démarrer le Backend (Terminal 1)
```bash
# S'assurer que le venv est activé
.venv\Scripts\Activate.ps1  # Windows
# source .venv/bin/activate  # Linux/macOS

# Lancer tous les services backend
python backend/launcher.py
```

**Menu du launcher :**
- Choisir l'option **4** pour démarrer tous les services
- Les 3 APIs seront lancées simultanément :
  - FastAPI (Food Classifier) : http://localhost:8000
  - Flask (Medical RAG) : http://localhost:5000
  - Flask (Nutritionist) : http://localhost:9000

##### 4.2 Démarrer le Frontend (Terminal 2)
```bash
npm run dev
```

Le frontend sera accessible sur : **http://localhost:3000**

#### 5. Accéder à l'Application

Ouvrir votre navigateur et accéder à :
```
http://localhost:3000
```

**Parcours utilisateur :**
1. Page de connexion (redirection automatique)
2. Créer un compte ou se connecter
3. Accéder au dashboard
4. Explorer les fonctionnalités :
   - `/nutrition` - Analyse nutritionnelle
   - `/mental-health` - Chatbot médical
   - `/reports` - Rapports de santé

---

##  Architecture Technique

### Structure du Projet
```
v0-mother-health-app-main/
├── app/                          # Frontend Next.js
│   ├── (auth)/                   # Routes d'authentification
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Routes utilisateur
│   │   ├── home/
│   │   ├── nutrition/
│   │   ├── mental-health/
│   │   ├── messaging/
│   │   └── reports/
│   ├── (admin)/                  # Routes admin
│   │   ├── analytics/
│   │   ├── patients/
│   │   ├── messages/
│   │   └── settings/
│   └── api/                      # API Routes Next.js (proxies)
│       ├── nutrition/recipes/
│       ├── mental-health/chat/
│       └── health/
├── backend/
│   ├── backend/                  # FastAPI - Classification alimentaire
│   │   ├── app.py
│   │   ├── models/              # Modèles ML (EfficientNet)
│   │   ├── routers/             # Endpoints API
│   │   └── data/                # Labels et mappings
│   ├── Modele_rag/              # Flask - RAG Médical
│   │   ├── app.py
│   │   ├── vectorstore/         # Base FAISS
│   │   └── data/                # Documents médicaux
│   ├── Nutritionist/            # Flask - Chatbot Nutritionniste
│   │   └── Nutrutionist__backend.py
│   ├── requirments/             # Dépendances Python
│   └── launcher.py              # Script de lancement unifié
├── components/                   # Composants React réutilisables
│   ├── layout/
│   ├── mental-health/
│   ├── nutrition/
│   └── ui/                      # Composants Radix UI
├── lib/                         # Utilitaires et contextes
└── public/                      # Assets statiques
```

### Technologies Utilisées

**Frontend :**
- Next.js 16 (React 19)
- TypeScript
- TailwindCSS
- Radix UI (composants accessibles)
- Recharts (visualisations)

**Backend :**
- FastAPI (Python) + Uvicorn
- Flask (Python) + Werkzeug
- TensorFlow/Keras (ML)
- LangChain + FAISS (RAG)
- Groq API (Llama 3.1)
- HuggingFace Embeddings



---

##  Notes Importantes

### Sécurité
- Les clés API sont dans des fichiers `.env` (exclus de Git via `.gitignore`)
- Ne jamais commiter les fichiers `.env` sur un repository public
- En production, utiliser des variables d'environnement sécurisées

### Performance
- Le premier démarrage du backend peut prendre 1-2 minutes (chargement des modèles ML)
- FAISS charge la base vectorielle au démarrage
- Next.js utilise Turbopack pour un hot-reload ultra-rapide

### Développement
- Hot-reload activé sur tous les services
- Les modifications sont automatiquement détectées
- Logs détaillés dans les terminaux

---

##  Dépannage

**Problème : Modules Python manquants**
```bash
# Réinstaller toutes les dépendances
pip install -r backend/requirments/requirements.txt
pip install -r backend/requirments/requirements-base.txt
pip install -r backend/requirments/requirements-langchain.txt
pip install -r backend/requirments/requirements-ml.txt
```

**Problème : Port déjà utilisé**
```bash
# Windows : tuer le processus sur le port
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:3000 | xargs kill -9
```

**Problème : Erreur GROQ_API_KEY**
- Vérifier que les fichiers `.env` existent dans `backend/Nutritionist/` et `backend/Modele_rag/`
- S'assurer que la clé API Groq est valide

