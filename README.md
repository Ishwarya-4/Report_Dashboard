# 📊 Report Dashboard

A modern, interactive reporting dashboard built with React, TypeScript, and Vite. Visualize and analyze data through clean, responsive charts and tables — all in a polished UI powered by shadcn/ui and Tailwind CSS.

🔗 **Live Demo**: [https://ishwarya-4.github.io/Report_Dashboard](https://ishwarya-4.github.io/Report_Dashboard)

---

## ✨ Features

- 📈 Interactive charts and graphs (Chart.js + Recharts)
- 📋 Data tables with filtering and export to Excel (xlsx)
- 🎨 Clean, responsive UI with shadcn/ui components
- 🌙 Light/Dark mode support via `next-themes`
- 🗂️ Multi-page navigation with React Router
- 📅 Date range filtering with React Day Picker
- 🔔 Toast notifications via Sonner
- ⚡ Fast builds with Vite + SWC

---

## 🛠️ Tech Stack

| Category       | Technology                        |
|----------------|-----------------------------------|
| Framework      | React 18 + TypeScript             |
| Build Tool     | Vite 5                            |
| Styling        | Tailwind CSS + tailwindcss-animate|
| UI Components  | shadcn/ui + Radix UI              |
| Charts         | Chart.js, react-chartjs-2, Recharts |
| Routing        | React Router DOM v6               |
| Forms          | React Hook Form + Zod             |
| Data Fetching  | TanStack React Query              |
| Export         | xlsx                              |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Ishwarya-4/Report_Dashboard.git

# 2. Navigate into the project
cd Report_Dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command           | Description                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Start the local development server   |
| `npm run build`   | Build for production (outputs `/dist`)|
| `npm run preview` | Preview the production build locally |
| `npm run lint`    | Run ESLint                           |

---

## 📁 Project Structure

```
Report_Dashboard/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components / routes
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   └── main.tsx        # App entry point
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---


