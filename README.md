# FinFlow - Modern Banking Solution 🏦

<div align="center">
  <img src="./screenshots/logo-transparent.png" alt="FinFlow Logo" width="200"/>

  [Live Demo](https://finflow-bank.vercel.app)

  ![GitHub last commit](https://img.shields.io/github/last-commit/cdn-lgn/finFlow_private)
  ![License](https://img.shields.io/badge/license-MIT-blue)
</div>

## ✨ Key Features

- **Secure Authentication**
  - Face detection for profile verification
  - Email & Mobile OTP verification
  - Location tracking for login security
  - PAN card validation system
  - Employee verification process

- **Banking Features**
  - Real-time balance tracking
  - Instant money transfers
  - Request money feature
  - Card deposits
  - Transaction history
  - Account management
  - Transaction status tracking
  - Location-based security

- **Employee Dashboard**
  - User verification system
  - Account management
  - User profile viewing
  - Account status control
  - Transaction monitoring

- **Admin Controls**
  - Full system oversight
  - Employee management
  - Transaction monitoring
  - Account status management
  - System statistics

## 🛠️ Technology Stack

### Frontend
- React + Vite
- Redux Toolkit for state management
- TailwindCSS for styling
- Framer Motion for animations
- Face-api.js for facial detection
- Axios for API requests
- Day.js for date handling

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT Authentication
- ImageKit for image storage
- Location tracking system
- Security middlewares

### Development Tools
- VS Code
- Git & GitHub
- Postman for API testing
- Chrome DevTools
- npm package manager

## 📱 Screenshots

[Add your application screenshots here]

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/finflow.git
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
npm install
```

4. Set up environment variables
```bash
# Backend .env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET_KEY=your_jwt_secret
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url

# Frontend .env
VITE_API_URL=http://localhost:5000
```

5. Start the development servers
```bash
# Backend
npm run dev

# Frontend
npm run dev
```

## 📄 License
MIT License - feel free to use this project for learning purposes!

---
<div align="center">
  Made with ❤️ by Logan
</div>
