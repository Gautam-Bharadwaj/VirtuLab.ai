# VirtuLab.ai — The Intelligent Science Metaverse

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini 2.0](https://img.shields.io/badge/Gemini%202.0%20Flash-8E75E9?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Bridging the practical education divide through immersive, intelligent, and offline-first science simulations.**

VirtuLab.ai is a state-of-the-art virtual laboratory platform designed to bring high-quality science education to every student, everywhere. By combining physically accurate computational engines with a **Socratic AI Mentor**, we provide a "Lab Instructor in your Pocket" that works even without an active internet connection.

---

## Key Features

### Immersive Simulation Suite
Conduct complex experiments across Physics, Chemistry, and Biology with real-time mathematical precision:
- **Physics**: Ohm's Law & Resistance, Projectile Motion, Optics Bench, Logic Gates.
- **Chemistry**: Acid-Base Titration, Flame Test, Periodic Table Trends, Reaction Rates.
- **Biology**: Mitosis visualization and Enzyme Kinetics.

### Intelligent Socratic Mentoring
Powered by **Google Gemini 2.0 Flash**, our AI tutor observes your experimental state and guides you through mistakes using Socratic questioning—asking the right questions rather than just giving the answers.

### Professional Analytics
- **Student Skill Radar**: Multi-dimensional visualization of performance across conceptual understanding, procedural accuracy, and time management.
- **Teacher Analytics Dashboard**: Real-time misconception heatmaps and session monitoring for classroom-level insights.

### Offline-First Resilience
Built as a **Progressive Web App (PWA)**, VirtuLab caches core simulation engines and Socratic decision trees locally. Learn and experiment in "Airplane Mode," with data syncing automatically when you're back online.

---

## Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, Tailwind CSS, Framer Motion, Zustand, Recharts |
| **Backend** | FastAPI (Python), Uvicorn |
| **AI/ML** | Google Gemini 2.0 Flash (Agentic Orchestration) |
| **Database** | Supabase (PostgreSQL), Firebase (Auth/Client) |
| **Architecture** | Hybrid Offline-First, PWA, Socratic Mentoring Logic |

---

## Project Structure

```text
.
├── .github/                # CI/CD and Issue Templates
├── virtu-lab-backend/      # High-Performance FastAPI Backend
│   ├── agent.py            # Gemini 2.0 Agentic Orchestration
│   ├── main.py             # API Entry Point & Roadmap TODOs
│   ├── models.py           # Pydantic Schema Validation
│   ├── db.py               # Database Layer (Supabase + In-Memory Fallback)
│   └── config.py           # Environment Configuration
├── virtu-lab-frontend/     # Modern React Frontend
│   ├── src/
│   │   ├── components/     # UI, Landing, and Simulation Components
│   │   ├── hooks/          # Custom AI & Simulation Hooks
│   │   ├── store/          # Zustand State Orchestration
│   │   ├── pages/          # Home, Lab, and Teacher Dashboard
│   │   └── data/           # Static Simulation Metadata
│   ├── public/             # Optimized Visual Assets
│   └── index.css           # Global Design System
└── README.md               # You are here
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- [Gemini API Key](https://ai.google.dev/)
- [Supabase Account](https://supabase.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Gautam-Bharadwaj/VirtuLab.ai.git
   cd VirtuLab
   ```

2. **Backend Setup**
   ```bash
   cd virtu-lab-backend
   pip install -r requirements.txt
   # Configure .env with GEMINI_API_KEY, SUPABASE_URL, SUPABASE_KEY
   python main.py
   ```

3. **Frontend Setup**
   ```bash
   cd virtu-lab-frontend
   npm install
   # Configure .env with VITE_FIREBASE_API_KEY, etc.
   npm run dev
   ```

---

## Roadmap

- [ ] **Vision-to-Sim**: Capture textbook diagrams to generate interactive digital labs.
- [ ] **Collaborative Labs**: Real-time multi-user experimental sessions using WebSockets.
- [ ] **Mobile AR**: Lightweight AR integration for enhanced physical-digital intuition.
- [ ] **Curriculum Expansion**: Support for Engineering-level thermodynamics and fluid dynamics.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Acknowledgements

*   [Google Gemini API](https://ai.google.dev/) for intelligent Socratic guidance.
*   [Supabase](https://supabase.com/) for resilient data synchronization.
*   [Tailwind CSS](https://tailwindcss.com/) for the modern glassmorphic design system.

---
**VirtuLab.ai** — *Empowering the next generation of scientists, one simulation at a time.*
