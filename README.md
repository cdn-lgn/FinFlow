# FinFlow - Modern Banking Solution 🏦

<div align="center">
  <img src="./screenshots/logo.png" alt="FinFlow Logo" width="200"/>

  [Live Demo](https://finflow-bank.vercel.app) | [API Documentation](https://api.finflow.dev)

  ![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/finflow)
  ![License](https://img.shields.io/badge/license-MIT-blue)
</div>

## 🚀 Features

- **Secure Authentication**
  - Face detection for profile verification
  - OTP verification (Email & SMS)
  - Location tracking for security
  - JWT-based authentication

- **Multi-Role System**
  - User: Banking operations
  - Employee: Account verification
  - Admin: System management

- **Banking Operations**
  - Instant money transfers
  - Request money feature
  - Transaction PIN security
  - Real-time balance updates

- **Security Measures**
  - PAN card verification
  - Employee verification system
  - Transaction PIN encryption
  - Location tracking for transactions

## 🛠️ Tech Stack

### Frontend
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" width="40" height="40"/>
</p>

- React.js (Frontend framework)
- TailwindCSS (Styling)
- Redux Toolkit (State management)
- Framer Motion (Animations)
- Axios (API calls)

### Backend
<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" width="40" height="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" height="40"/>
</p>

- Node.js & Express.js (Server)
- MongoDB (Database)
- JWT (Authentication)
- Bcrypt (Encryption)

### External Services
- Face-api.js (Face detection)
- SendGrid (Email service)
- TextLink SMS (SMS service)

## 📸 Screenshots

<div align="center">
  <img src="./screenshots/login.png" alt="Login Page" width="400"/>
  <img src="./screenshots/dashboard.png" alt="Dashboard" width="400"/>
  <img src="./screenshots/transfer.png" alt="Transfer Money" width="400"/>
  <img src="./screenshots/verification.png" alt="Verification" width="400"/>
</div>

## 🔧 Core Features Implementation

```javascript
// User Authentication with Face Detection
const handleFaceVerification = async (image) => {
  const detections = await faceapi.detectAllFaces(image);
  return detections.length === 1;
};

// Secure Transaction System
const handleMoneyTransfer = async (amount, recipient, pin) => {
  const location = await getLocation();
  return await api.post('/transfer', {
    amount,
    recipient,
    pin,
    location
  });
};

// Employee Verification System
const verifyUserAccount = async (userId, panDetails) => {
  const verification = await automaticPanVerification(panDetails);
  if (!verification.success) {
    return manualEmployeeVerification(userId);
  }
  return verification;
};
```

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/finflow.git
```

2. Install dependencies
```bash
cd finflow
npm install  # Install backend dependencies
cd frontend
npm install  # Install frontend dependencies
```

3. Set up environment variables
```bash
# Backend .env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
SENDGRID_API_KEY=your_sendgrid_key

# Frontend .env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Run the application
```bash
# Backend
npm run dev

# Frontend
cd frontend
npm start
```

## 📱 Mobile View
<div align="center">
  <img src="./screenshots/mobile-login.png" width="200"/>
  <img src="./screenshots/mobile-dashboard.png" width="200"/>
</div>

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<div align="center">
  Made with ❤️ by [Your Name]
</div>
