# HireMeAI 🤖

**An AI-powered candidate chatbot that helps recruiters learn about a candidate through natural-language questions about their resume.**

HireMeAI uses a FastAPI backend, a React frontend, and Groq's LLM API to extract structured information from a resume and generate answers grounded in that information.

## ✨ Features

- **Resume Parsing:** Extracts candidate information from a PDF resume, including skills, education, projects, certifications, and experience.
- **AI-Powered Q&A:** Answers recruiter questions using the parsed resume information.
- **Startup Optimization:** Reads and parses the resume once when the backend starts, then reuses the parsed data for subsequent questions.
- **Input Validation:** Validates questions, rejects empty or whitespace-only input, and limits questions to 1,000 characters.
- **Interactive Chat Interface:** React-based interface for asking questions and viewing responses.
- **Markdown Responses:** Displays AI responses with Markdown formatting.
- **Error Handling in the UI:** Includes loading indicators, error messages, retry functionality, and the option to start a new conversation.
- **Responsive Design:** Provides a responsive interface for desktop and mobile screen sizes.

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React.js, Vite, CSS |
| Backend | Python, FastAPI, Uvicorn |
| AI / LLM | Groq API, `openai/gpt-oss-120b` |
| Resume Processing | pypdf |
| Data Validation | Pydantic |
| Environment Configuration | python-dotenv |
| API Documentation | Swagger UI |
| Version Control | Git, GitHub |

## 📁 Project Structure

```text
HireMeAI/
├── backend/
│   └── main.py
├── frontend/
│   └── ui/
│       ├── public/
│       ├── src/
│       │   ├── assets/
│       │   ├── App.jsx
│       │   ├── App.css
│       │   ├── index.css
│       │   └── main.jsx
│       ├── package.json
│       └── vite.config.js
├── src/
│   └── hiremeai/
│       └── __init__.py
├── .gitignore
├── .python-version
├── pyproject.toml
├── uv.lock
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Python
- [uv](https://docs.astral.sh/uv/) for Python environment and dependency management
- Node.js and npm
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/RiyaGirdhar30/HireMeAI.git
cd HireMeAI
```

### 2. Set up the backend

Install the Python dependencies from the project configuration:

```bash
uv sync
```

Create a `.env` file inside the `backend/` directory and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key_here
```

Replace the placeholder with your own API key. Never commit your actual `.env` file or API key to GitHub.

Make sure your PDF resume is available at the path expected by the backend:

```text
backend/RIYA_GIRDHAR-RESUME..pdf
```

The resume PDF is excluded from version control, so provide your own resume file before running the application.

### 3. Start the backend

From the project root, run:

```bash
uv run --directory backend python -m uvicorn main:app --reload
```

The backend will be available at:

- API: http://127.0.0.1:8000
- Interactive API documentation: http://127.0.0.1:8000/docs

### 4. Set up the frontend

Open a second terminal and navigate to the frontend application:

```bash
cd frontend/ui
npm install
npm run dev
```

Open the local URL displayed by Vite, typically:

http://localhost:5173

## 🔄 How It Works

1. The FastAPI application starts and reads the candidate's PDF resume.
2. The Groq API extracts structured resume information according to a Pydantic schema.
3. The parsed information is stored in the FastAPI application's state.
4. A recruiter submits a question through the React chat interface.
5. The backend sends the question and parsed resume information to the language model.
6. The generated answer is returned to the frontend and displayed in the chat.

**Optimization:** Resume extraction and parsing are performed at backend startup rather than repeated for every chat request. The language model still generates a new answer for each question.

## 🔌 API Endpoint

### `POST /chat`

Accepts a recruiter question and returns an answer based on the parsed resume.

**Request:**

```json
{
  "question": "What skills does the candidate have?"
}
```

**Example response:**

```json
{
  "answer": "The candidate possesses skills in C++, JavaScript, SQL, React.js, Node.js, and MongoDB."
}
```

The answer above is illustrative; actual responses depend on the supplied resume.

## 🔐 Security and Configuration

- Store API keys in environment variables.
- Keep `.env` files and personal resume PDFs out of version control.
- Validate incoming chat questions before processing.
- Do not expose API keys in frontend code or public repositories.

## 🚀 Future Improvements

- Automated backend tests
- Improved backend error handling and logging
- More robust resume parsing and validation
- Support for uploading resumes through the interface
- Deployment of the frontend and backend
- Enhanced security and rate limiting

## 👩‍💻 Author

**Riya Girdhar**

- GitHub: [RiyaGirdhar30](https://github.com/RiyaGirdhar30)
- LinkedIn: [Riya Girdhar](https://www.linkedin.com/in/riya-girdhar-a6074124a/)

---

Built as a project exploring Python, full-stack development, and AI-powered applications.
