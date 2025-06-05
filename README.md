# SmartPay Frontend

This is the frontend React application for the SmartPay platform. It provides the user interface to interact with the backend services such as user management, wallet, transactions, and authentication.

---

## Table of Contents
- [SmartPay Frontend](#smartpay-frontend)
  - [Table of Contents](#table-of-contents)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Environment Variables](#environment-variables)
  - [Testing](#testing)
---

## Tech Stack

- React 18+
- TypeScript
- Material UI (MUI) for UI components
- Axios for API requests
- React Router for routing
- React Hook Form for form handling
- React Toastify for notifications
- Docker + Docker Compose for containerization

---

## Project Structure
```
app/
├── api/                # Axios instance & API utils
├── components/         # Reusable UI components
├── context/            # React contexts (e.g. AuthContext)
├── features/           # Feature-based folders (wallet, auth, users, transactions)
├── types/              # TypeScript interfaces and types
├── utils/              # Utility functions
└── .env                # Environment config
```

## Prerequisites

- Node.js >= 18
- npm or yarn
- Docker & Docker Compose (for containerized deployment)

---

## Setup

Clone the repo:

```bash
git clone https://github.com/your-org/smartpay-frontend.git
cd smartpay-frontend
```

Install dependencies:
```bash
npm install
```

Create a .env file in the root (if needed) for environment variables:

```bash
VITE_API_URL=http://localhost:8000
```

Running Locally (Development Mode)
Start the React development server:

```bash
npm start
```

This will run the app at http://localhost:3000 with hot-reloading.
Building for Production
Create a production-ready build:

```bash
npm run build
```

This generates optimized static files in the /dist folder.

Docker Deployment Dockerfile<br/>

Your **Dockerfile** builds the React app and serves it with Nginx:

```bash
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

docker-compose.yml (frontend service only)
```
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_BASE_URL=http://backend:8000/api
    depends_on:
      - backend
```

Running with Docker Compose
From your project root:
```
docker-compose up --build
```
Visit http://localhost:3000 to see your frontend.


## Environment Variables
VITE_API_URL
<br/>
VITE_ENV

## Testing
Add your test setup here (e.g., Jest + React Testing Library):

```
npm run test
```

