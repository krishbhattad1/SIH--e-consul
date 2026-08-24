# e-Consultation Portal

A React and FastAPI application for publishing public consultations, collecting citizen feedback, and reviewing feedback sentiment through an authority dashboard.

## Technology Stack

- Frontend: React, React Router, Vite
- Backend: Python, FastAPI, Uvicorn, Pydantic
- Database: MongoDB
- AI analysis: Google Gemini (`gemini-2.5-flash`)

## Project Structure

```text
frontend/       React/Vite web application
backend/app/    FastAPI application
backend/data/   Sample comment data
backend/.env    Local backend configuration
```

## Prerequisites

Install the following before starting:

- Python 3.10 or later
- Node.js 18 or later and npm
- MongoDB Community Server, running locally or on a reachable server
- A Google Gemini API key

Check the installed tools:

```bash
python --version
node --version
npm --version
```

The backend expects MongoDB at `mongodb://localhost:27017` by default.

## Configuration

Create or update `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017
GEMINI_API_KEY=your_gemini_api_key
```

Do not commit real API keys. If a key has been exposed, revoke it in Google AI Studio and create a replacement.

## Windows Setup

Open PowerShell in the repository root.

### 1. Create and activate the Python environment

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, run PowerShell as your user and enable local scripts once:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then activate the environment again.

### 2. Install backend dependencies

```powershell
python -m pip install --upgrade pip
python -m pip install fastapi uvicorn pymongo python-dotenv google-genai
```

### 3. Install frontend dependencies

```powershell
cd frontend
npm ci
cd ..
```

### 4. Start the backend

In the first terminal:

```powershell
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### 5. Start the frontend

Open a second PowerShell terminal in the repository root:

```powershell
cd frontend
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Linux Setup

Open a terminal in the repository root.

### 1. Create and activate the Python environment

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install backend dependencies

```bash
python -m pip install --upgrade pip
python -m pip install fastapi uvicorn pymongo python-dotenv google-genai
```

### 3. Install frontend dependencies

```bash
cd frontend
npm ci
cd ..
```

### 4. Start the backend

In the first terminal:

```bash
source .venv/bin/activate
cd backend
python -m uvicorn app.main:app --reload --port 8000
```

### 5. Start the frontend

Open a second terminal in the repository root:

```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## Alternative Backend Command

The backend can also be started from the repository root:

```bash
python -m uvicorn app.main:app --reload --port 8000 --app-dir backend
```

On Windows PowerShell, use the same command after activating `.venv`.

The `--app-dir backend` option is important when starting from the repository root. Without it, Python cannot find the `app` package.

## Optional: Seed Sample Comments

With the virtual environment activated, run this from the repository root:

```bash
cd backend
python -m app.seed
```

This clears the MongoDB `econsultation.comments` collection and inserts the records from `backend/data/comments.json`.

## Useful Commands

Frontend commands, run from `frontend/`:

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

Backend API documentation is available while the backend is running:

- Swagger UI: `http://127.0.0.1:8000/docs`
- ReDoc: `http://127.0.0.1:8000/redoc`

## Troubleshooting

### `ModuleNotFoundError: No module named 'app'`

Run Uvicorn from `backend/` or use `--app-dir backend` from the repository root. Also make sure `.venv` is activated.

### `ModuleNotFoundError: No module named 'fastapi'`

Activate the virtual environment and install the backend packages again:

```bash
source .venv/bin/activate       # Linux
python -m pip install fastapi uvicorn pymongo python-dotenv google-genai
```

In PowerShell, activate with `.\.venv\Scripts\Activate.ps1` instead.

### MongoDB connection errors

Confirm that MongoDB is running and that `MONGO_URI` in `backend/.env` points to the correct MongoDB instance.

### Gemini errors

Confirm that `GEMINI_API_KEY` is present in `backend/.env`, valid, and available to the backend process.

## Current Limitation

The frontend currently sends CSV uploads to `POST /analyze-upload`, but that endpoint is not yet implemented in `backend/app/main.py`. Regular feedback submission, module loading, comments, and summary generation use the implemented endpoints.