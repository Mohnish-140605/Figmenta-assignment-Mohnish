# 🔖 Bookmark Manager (Figmenta Edition)

> **"Unleash Your Imagination. Future Proof Your Digital Assets."**

A retro-futuristic bookmark manager that combines the raw energy of 8-bit arcade aesthetics with modern, scalable React architecture. Designed with the Figmenta brand voice in mind—Classy, Sophisticated, and Brave.

## ✨ Features

### 🎮 Immersive "Retro-Verse" UI
-   **Contra-Inspired Theme**: A bold Red/Orange/Slate palette with pixel-perfect typography (`Press Start 2P`).
-   **Authentic Effects**: Scanline overlays, CRT flicker animation, and retro borders.
-   **Gamified Interactions**: Hover effects, "Press Start" loaders, and arcade-style buttons.
-   **Custom Cursor**: A unique crosshair cursor (`RetroCursor`) for deep immersion.

### ⚡ Power User Functionality
-   **Smart Tagging**: Automatically suggests tags based on URL keywords (e.g., `youtube` → `#video`, `github` → `#code`).
-   **Instant Preview**: Watch videos or preview metadata directly in a "Netflix-style" modal without leaving the app.
-   **Type Filters**: One-click filtering for "Video", "Site", or "All" content.
-   **Real-time Search**: Client-side fuzzy search for titles and URLs.

### 🔐 Auth Simulation
-   **Figmenta Access**: A themed login screen ("Player Login") with a simulated authentication flow.
-   **Seamless Transition**: Integration of the `RetroLoader` animation upon successful login.

---

## 🛠️ Tech Stack

### Frontend
-   **React (Vite)**: Fast, modern bundler and component architecture.
-   **Tailwind CSS**: Utility-first styling for rapid UI development.
-   **Framer Motion**: Smooth, complex animations (enter/exit transitions, modal scaling).
-   **Lucide React**: Clean, modern iconography.

### Backend
-   **Node.js + Express**: Lightweight REST API.
-   **In-Memory Store**: Data resets on server restart (for simplicity).
-   **Axios**: Promise-based HTTP client.

---

## 🚀 Setup Instructions

### Prerequisites
-   Node.js (v14+ recommended)
-   npm or yarn

### Installation

1.  **Clone the Repository**
    ```bash
    git clone <repository-url>
    cd bookmark-manager
    ```

2.  **Install Dependencies**
    We use `concurrently` to run both servers from the root.
    ```bash
    # Install Root Dependencies
    npm install

    # Install Server Dependencies
    cd server
    npm install

    # Install Client Dependencies
    cd ../client-app
    npm install
    ```

### Running the Application

FROM THE ROOT DIRECTORY (`/bookmark-manager`), run:

```bash
npm run dev
```

This command will concurrently start:
-   **Backend Server**: http://localhost:5000
-   **Frontend App**: http://localhost:5173

---

## 🎨 Design Choices & Architecture

### 1. Brand Voice Integration
We adopted Figmenta's core values:
*   **"Imaginary"**: The retro theme transports users to a digital arcade dimension.
*   **"Future Proof"**: The underlying code is modular and scalable.
*   **"Classy"**: Despite the pixel art, the layout remains clean, usable, and responsive.

### 2. Modularity (Phase 11 Refactor)
To ensure the codebase scales like a production app:
*   **`src/services/api.js`**: All HTTP logic is centralized here. Components don't know about `axios`.
*   **`src/hooks/useBookmarks.js`**: Custom hook that encapsulates state, fetching, CRUD operations, and error handling. The `Dashboard` component is purely presentational.

### 3. User Experience (UX)
*   **Feedback Loops**: Every action (add, delete, edit) provides immediate visual feedback via animations.
*   **Empty States**: "No Signal Input" screens for empty states maintain the theme even when there's no data.
*   **Keyboard Accessibility**: All forms support `Enter` to submit.

---

## 🤖 AI Tools Used

*   **Google Gemini (Antigravity)**: Served as the primary pair programmer for:
    *   Generating boilerplate code (Express/React).
    *   Debugging Vercel deployment issues (Zero Config pattern).
    *   Refactoring for modularity (Hooks/Service layer).
    *   Writing documentation and commit messages.

## ⏱️ Time Spent

*   **Total Duration**: ~1.5hours
    *   **Core Development**: 1.5 Hours
    *   **UI/UX Polish (Retro Theme)**: 45 Minutes
    *   **Deployment Configuration & Debugging**: 45 Minutes

## 🧐 Assumptions Made

1.  **Persistence**: Data is stored in-memory for this assignment. A real-world app would use a database (PostgreSQL/MongoDB).
2.  **Authentication**: Simple mock authentication is sufficient to demonstrate the protected route flow.
3.  **Deployment**: Vercel is the target platform, necessitating the specific `vercel.json` and build scripts.
4.  **Browser Support**: Modern browsers (Chrome/Edge/Firefox) with support for CSS Grid and Flexbox.

---

## 🧪 Running Tests

The backend includes Jest tests for the API endpoints.

```bash
cd server
npm test
```

---
<img width="2270" height="1790" alt="image" src="https://github.com/user-attachments/assets/0f284981-26f8-4ef2-9bd1-8079b1d5988d" />
<img width="1946" height="1725" alt="image" src="https://github.com/user-attachments/assets/f6d74236-c694-4af2-b272-8977d1c492ba" />
<img width="2875" height="1617" alt="image" src="https://github.com/user-attachments/assets/3546cfc4-21f7-4eba-af2d-5d086a721c06" />
<img width="2433" height="1826" alt="image" src="https://github.com/user-attachments/assets/bf3bca48-7e8c-4435-9bd5-c912d1dcd864" />
<img width="2564" height="1614" alt="image" src="https://github.com/user-attachments/assets/33ef33cd-3e90-4abe-9406-daa83be2ebc0" />
<img width="2189" height="1535" alt="image" src="https://github.com/user-attachments/assets/f72cf3b5-7069-4777-9f64-6484fa620a04" />




*Built for the [Figmenta Technical Assignment](https://figmenta.com/).*
