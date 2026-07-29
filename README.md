# InsightIQ — Enterprise Business Intelligence Analytics Platform

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://insight-iq-9fm7.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SATYAJIT002-ALT/insight-IQ)

![InsightIQ Banner](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=400&fit=crop)

🚀 **Live Production Vercel Application**: [https://insight-iq-9fm7.vercel.app](https://insight-iq-9fm7.vercel.app)

**InsightIQ** is a full-stack, enterprise-grade Business Intelligence & Predictive Analytics Platform designed with an Apple + Stripe + Vercel inspired futuristic dark UI, interactive 3D visualizations (Three.js WebGL), real FastAPI backend, PostgreSQL database schema, automated data cleaning (Pandas/NumPy), Natural Language SQL Studio, Scikit-Learn time series forecasting, and multi-format PDF/Excel/CSV exports.

---

## 🌟 Key Platform Features

- 🎨 **Futuristic Enterprise UI**: Dark mode by default, glassmorphic panels, aurora ambient glows, gradient borders, smooth Framer Motion transitions.
- 🌐 **Interactive 3D Graphics**: Three.js WebGL rotating 3D Earth Globe with data nodes and interactive 3D Data Cube.
- 📊 **Executive Dashboard & Real-Time KPIs**: 8 animated KPI cards (Total Revenue, Net Profit Margin, AOV, Conversion Rate, Active Accounts, etc.) with trend badges, multi-dimensional filters, and Recharts charts.
- 📥 **Automated Data Ingestion Engine**: Drag-and-drop file uploader supporting CSV, Excel (.xlsx), and JSON with dynamic column type inspection and schema previews.
- 🧹 **Pandas Data Quality & Cleaning Module**: Automated duplicate row removal, missing value imputation (median/mode), Z-score outlier detection (>3.0 std dev), date normalization, and data health scoring.
- 💬 **Natural Language to SQL Studio**: AI engine translating natural language prompts into optimized SQL, safe query execution against PostgreSQL, and formatted tabular outputs.
- 🤖 **Scikit-Learn ML Forecasting**: Ensemble models (Linear Regression + Random Forest Regressor) predicting multi-quarter revenue, margin, demand, and confidence bands, plus automated AI business recommendations.
- 📑 **Report Builder & Exporter**: One-click generation of styled ReportLab PDF summaries, formatted OpenPyXL Excel workbooks, and raw CSV files.
- 🔔 **Smart Alert Center**: Real-time metric threshold monitoring (Revenue drops, inventory risk, churn) with WebSocket live broadcast integration.
- 🔐 **Enterprise RBAC & Security Audit**: Pre-configured user access tiers (**ADMIN**, **MANAGER**, **ANALYST**, **VIEWER**) with full security audit logging.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, Glassmorphism, Aurora Gradients
- **Animations & 3D**: Framer Motion, Three.js WebGL
- **Data Visualizations**: Recharts
- **State Management**: Zustand
- **Icons**: Lucide Icons

### Backend & ML Engine
- **API Framework**: Python FastAPI
- **Database & ORM**: PostgreSQL, SQLAlchemy, Prisma Schema
- **Data Processing**: Pandas, NumPy
- **Machine Learning**: Scikit-Learn (LinearRegression, RandomForestRegressor)
- **Exports**: ReportLab (PDF), OpenPyXL (Excel), CSV
- **Real-Time**: WebSockets

### DevOps & Infrastructure
- **Cloud Deployment**: Vercel
- **Containers**: Docker, Docker Compose
- **Proxy**: Nginx
- **CI/CD**: GitHub Actions

---

## 📁 Repository Structure

```
InsightIQ/
├── backend/
│   ├── app/
│   │   ├── core/           # Security, JWT tokens, application settings
│   │   ├── db/             # SQLAlchemy engine, models, seeder
│   │   ├── services/       # Data cleaner, ingestion, sql runner, ML engine, exporter
│   │   ├── routers/        # Auth, Analytics, Upload, Clean, SQL, ML, Reports, Alerts, Admin
│   │   └── main.py         # FastAPI application entrypoint
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js App Router pages (Dashboard, Upload, Clean, SQL, ML, etc.)
│   │   ├── components/     # 3D Canvases, Recharts Visualizations, Layouts, Cards
│   │   ├── lib/            # API Client & fallbacks
│   │   ├── store/          # Zustand state store
│   │   └── types/          # TypeScript interfaces
│   ├── package.json
│   ├── tailwind.config.ts
│   └── Dockerfile
├── prisma/
│   └── schema.prisma       # PostgreSQL Prisma schema definition
├── nginx/
│   └── nginx.conf          # Nginx reverse proxy routing
├── docker-compose.yml
└── README.md
```

---

## 🌐 Live Production Deployment

Access the live Vercel application here:
- **Vercel Production App**: [https://insight-iq-9fm7.vercel.app](https://insight-iq-9fm7.vercel.app)

---

## 🚀 Quick Start (Local Setup)

### Option 1: Standalone Direct Launch

#### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
python app/main.py
```
*The FastAPI backend will start at `http://localhost:8000` and automatically create & seed the database with 1,000+ realistic transaction records!*

#### 2. Frontend Setup
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```
*Open `http://localhost:3000` in your browser to launch InsightIQ.*

---

### Option 2: Docker Compose (Production Deployment)

Run the entire platform including PostgreSQL, FastAPI, Next.js, and Nginx with a single command:

```bash
docker-compose up --build -d
```

Access services at:
- **Web Application**: `http://localhost`
- **FastAPI API Documentation**: `http://localhost:8000/docs`
- **PostgreSQL Database**: `localhost:5432`

---

## 🔑 Demo Credentials (Role-Based Access)

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@insightiq.ai` | `password123` | Full Administrative & Security Access |
| **Manager** | `manager@insightiq.ai` | `password123` | Executive Reports, Alerts & Approvals |
| **Analyst** | `analyst@insightiq.ai` | `password123` | Data Ingestion, Data Cleaning & SQL Studio |
| **Viewer** | `viewer@insightiq.ai` | `password123` | Read-Only Dashboard & Charts |

---

## 🛰️ REST API Endpoints

- `POST /api/v1/auth/login` - Authenticate user & get JWT token
- `GET /api/v1/analytics/kpis` - Retrieve aggregated executive KPIs
- `GET /api/v1/analytics/charts` - Fetch chart data (monthly trends, categories, regions, geo map)
- `POST /api/v1/upload/file` - Upload dataset file (CSV/Excel/JSON)
- `POST /api/v1/clean/process` - Run Pandas data cleaning pipeline
- `POST /api/v1/sql/execute` - Execute SQL queries safely
- `POST /api/v1/sql/nl-to-sql` - Convert natural language to SQL
- `GET /api/v1/ml/forecast` - Multi-quarter time series sales predictions
- `GET /api/v1/ml/insights` - Automated AI business recommendations
- `POST /api/v1/reports/export` - Export reports in PDF, Excel, or CSV format
- `GET /api/v1/alerts/list` - Fetch system alert notifications

---

## 🛡️ License

Built for enterprise commercial deployment. Distributed under the MIT License.
