# 🧠 Second Brain  
### An AI-Powered Knowledge System

## 📌 Project Overview

Second Brain is a full-stack AI-powered knowledge management system designed as infrastructure for thought.

It enables users to:

- Capture structured knowledge entries
- Organize and retrieve information efficiently
- Automatically generate AI-powered summaries
- Query their knowledge base conversationally
- Expose intelligence through a public API endpoint

This project demonstrates full-stack architecture, secure AI integration, and production-ready deployment.

---

## 🚀 Core Features

### 📝 Knowledge Capture

Users can create knowledge items with:

- Title (required)
- Content (required)
- Type (Note / Link / Insight)
- Tags (optional)
- Source URL (optional)
- Automatic timestamping

All entries are stored in PostgreSQL using Prisma ORM.

---

### 📊 Smart Dashboard

- Search functionality
- Filterable note display
- Grid-based layout
- Individual detail view
- Responsive UI

---

### 🤖 AI Intelligence (Server-Side Only)

All AI processing happens securely on the server.

Features include:

- AI-generated summaries
- Persistent storage of summaries
- Conversational querying of stored notes
- Context-aware responses

---

### 🌐 Public API Endpoint

GET /api/public/brain/query?q=your-question

Example response:

{
  "answer": "AI generated response...",
  "sources": ["Note Title 1", "Note Title 2"]
}

This allows external systems to access structured knowledge intelligence.

---

## 🏗 Architecture Principles

### 🔹 Portable Architecture

The application is structured into separate layers:

- UI Layer – Next.js App Router
- API Layer – Server routes
- AI Layer – Lazy-initialized OpenAI client
- Database Layer – Prisma + PostgreSQL
- Infrastructure Layer – Vercel deployment

Each layer can be modified independently.

---

### 🔹 Principles-Based UX

The interface follows:

- Minimal cognitive load
- Clear visual hierarchy
- Predictable interactions
- AI as augmentation, not replacement
- Structured layout and spacing

---

### 🔹 Agent Thinking

The system improves knowledge over time by:

- Persisting AI-generated summaries
- Structuring contextual retrieval
- Enabling conversational access to stored insights

This foundation supports future expansion into semantic search and knowledge graphs.

---

### 🔹 Infrastructure Mindset

The system is built as infrastructure, not just UI:

- Public API access
- Structured JSON contracts
- Environment-based configuration
- Serverless deployment

---

## 🛠 Tech Stack

- Next.js (App Router)
- Tailwind CSS
- Prisma ORM
- PostgreSQL (Neon)
- OpenAI (server-side)
- Vercel Deployment

---

## ⚙️ Local Setup

1. Clone repository:

git clone https://github.com/kothavitesh/Second-Brain-An-AI-Powered-Knowledge-System.git  
cd Second-Brain-An-AI-Powered-Knowledge-System

2. Install dependencies:

npm install

3. Create `.env` file:

DATABASE_URL="your_postgresql_url"  
OPENAI_API_KEY="your_openai_key"

4. Generate Prisma client:

npx prisma generate

5. Run development server:

npm run dev

---

## 🧪 API Testing

Local:

http://localhost:3000/api/public/brain/query?q=What is React?

Production:

https://second-brain-an-ai-powered-knowledg.vercel.app/api/public/brain/query?q=What is React?

---

## 🔮 Future Improvements

- Vector-based semantic search
- Knowledge graph visualization
- Multi-user authentication
- AI-powered auto-tagging
- File upload support
- Advanced filtering & analytics

---

## 🎯 Assignment Alignment

This project fulfills:

✓ Knowledge Capture  
✓ Smart Dashboard  
✓ AI Processing  
✓ Public Infrastructure  
✓ Portable Architecture  
✓ Principles-Based UX  
✓ Agent Thinking  
✓ Infrastructure Mindset  

---

## 👤 Author

Kotha Vitesh  
Full Stack Developer
