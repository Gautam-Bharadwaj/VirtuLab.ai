# VirtuLab Frontend

A high-fidelity Virtual Science Laboratory PWA built with React, TypeScript, and Tailwind CSS.

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    Create a `.env` file with the following:
    ```env
    VITE_BACKEND_URL=http://localhost:8000
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

3.  **Run Dev Server**:
    ```bash
    npm run dev
    ```

## 🏗️ Project Structure

-   `src/components/ui`: Core layout and shared UI elements (LabShell, AITutorPanel, etc.)
-   `src/components/simulations`: Laboratory experiment R3F engines
-   `src/store`: Global state management with Zustand
-   `src/hooks`: Custom React hooks for API and hardware integration
-   `src/pages`: Main application routes (Standard Lab vs Teacher Dashboard)

## ✨ Technologies

-   **Frontend**: React 18, Vite, TypeScript
-   **Styling**: Tailwind CSS v3, Framer Motion
-   **Charts**: Recharts
-   **State**: Zustand
-   **Icons**: Lucide React
