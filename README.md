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
- [React + TypeScript + Vite](#react--typescript--vite)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)
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

/src
/api # Axios instance & API utils
/components # Reusable UI components
/context # React contexts (e.g. AuthContext)
/features # Feature-based folders (wallet, auth, users, transactions)
/types # TypeScript interfaces and types
/utils # Utility functions
Dockerfile # Dockerfile for building frontend image
docker-compose.yml # Compose file for frontend + backend services
.env # Environment variables

---

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
# or
yarn install
```

Create a .env file in the root (if needed) for environment variables:

```bash
REACT_APP_API_BASE_URL=http://localhost:8000/api
```

Running Locally (Development Mode)
Start the React development server:

```bash
npm start
# or
yarn start
```

This will run the app at http://localhost:3000 with hot-reloading.
Building for Production
Create a production-ready build:

```bash
npm run build
# or
yarn build
```

This generates optimized static files in the /dist folder.

Docker Deployment
Dockerfile
Your Dockerfile builds the React app and serves it with Nginx:

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
**VITE_API_URL**
**VITE_ENV**

## Testing
Add your test setup here (e.g., Jest + React Testing Library):

```
npm run test
```


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
