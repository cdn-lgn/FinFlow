
---

## **Updated Project Details: Banking App with OTP Verification & Roles (Admin, Employee, User)**

### **1. Core Features of the App**

#### **User Registration & Account Types**:
- **User Registration**:
  - Bank users can **register** using **email or mobile number**.
  - Users will **upload a face image** during registration via **face detection** (for profile photo capture only).
  - Users will set a **6-digit PIN** for login and transactions.

- **Account Types**:
  - **Admin**: The only user who can see all the data, including charts, reports, user details, and bank-wide activities.
  - **Bank Employee**: Employees manage the **user registration** process, verify **user documents** (such as the **PAN card**), and approve or reject new accounts.
  - **Bank User**: Regular users who can perform transactions and manage their profiles.

- **Employee Verification**:
  - Once a user registers, **bank employees** verify the details (e.g., **PAN card** for identity verification).
  - Employees approve the account, which then allows the user to proceed with banking services.

---

### **2. Frontend (User Interface)**

#### **Libraries and Frameworks**:

1. **React**:
   - Main framework for building the **frontend UI** with a component-based structure.

2. **Material UI (MUI)**:
   - For **UI components** like buttons, cards, and forms, which makes the UI responsive and clean.

3. **Framer Motion**:
   - Adds smooth animations for transitions and interactions on the frontend.

4. **face-api.js**:
   - Used for **face detection** during user registration, allowing users to capture their photo.

5. **Axios**:
   - Handles **HTTP requests** to the backend API (for registration, OTP verification, login).

6. **React Router**:
   - Manages **navigation** and routing between different pages like registration, login, and dashboard.

7. **Formik/React Hook Form**:
   - For handling form validation and managing form states during registration and login.

8. **Chart.js / Recharts**:
   - Used in the **Admin dashboard** to display data visualizations and charts for reports.

---

### **3. OTP and Verification Services**

You will use the following **OTP services**:

1. **SMS OTP**:
- **TextLink SMS**:
  - Send SMS using your own **Android device** with their app.
  - Requires setup via [TextLink Dashboard](https://textlinksms.com/dashboard/your-devices/step-by-step).
  - No official daily free limit, but **unlimited messages** can be sent via your own device.
  - Great for **India-based users** who want to avoid paid APIs and use their own phone for OTP delivery.
  - Note: Requires **Google Play Services** & the TextLink app installed on your Android device.


2. **Email OTP**:
   - **SendGrid**:
     - **100 emails per day**, with **daily refill**.
     - Ideal for **email OTP-based verification** and small-scale use cases.

These services will be used for:
- **OTP-based registration**: To verify user identity during account creation.
- **OTP-based login**: For secure user login.
- **OTP for sensitive actions**: For transaction-related activities or password resets.

---

### **4. Backend (Server-Side)**

#### **Libraries and Frameworks**:

1. **Node.js**:
   - **Runtime environment** for backend development, efficient for I/O-heavy applications like banking apps.

2. **Express.js**:
   - A **web framework** for creating and managing backend routes and API requests.

3. **MongoDB**:
   - A **NoSQL database** for storing user data such as profiles, transaction history, PINs, and OTP tokens.

4. **Mongoose**:
   - **ODM (Object Data Modeling)** library for interacting with MongoDB, providing schema definition and querying features.

5. **JWT (JSON Web Token)**:
   - For **user authentication**. A JWT token is issued during login and used for secure access to the app.

6. **bcrypt**:
   - Used for **password hashing** and **PIN encryption** to securely store user credentials.

7. **cors**:
   - Middleware for **Cross-Origin Resource Sharing**, allowing frontend and backend to communicate securely.

8. **dotenv**:
   - Used to manage **environment variables** such as API keys, database connections, and secret keys.

9. **multer**:
   - A middleware for handling **file uploads** (e.g., profile photos or ID documents like PAN card).

---

### **5. Microservices and Architecture**

#### **Microservices Breakdown**:

1. **User Authentication Service**:
   - Manages **user registration** (email, mobile number, profile photo).
   - Handles **PIN validation** and **JWT token generation** for secure login.

2. **OTP Service**:
   - Manages the **generation, sending, and verification** of OTP codes using **SMS** (via Textlocal/Twilio) and **email** (via SendGrid).

3. **Employee Verification Service**:
   - Bank employees can **verify user details**, including **PAN card** and other personal information.
   - This service also handles account approval/rejection after employee validation.

4. **Profile Management Service**:
   - Manages user **profile creation**, updating profile details, and handling the **photo upload** for identity verification.

5. **Transaction Service**:
   - Handles **bank transactions** (deposit, withdrawal, transfers).
   - **Transaction PIN validation** is required to complete sensitive actions.

6. **Admin Dashboard Service**:
   - Allows **admins** to manage the bank’s data, view reports, and access user profiles.
   - Provides access to **charts**, **user statistics**, and **bank performance metrics**.

---

### **6. APIs and Integrations**

#### **APIs**:

1. **Face-API.js API**:
   - Used for **face detection** during **user registration** for photo capture (used only for profile image).

2. **Twilio API** (SMS OTP) / **Textlocal API** (SMS OTP):
   - Used for **SMS OTP verification** during registration, login, and other sensitive actions.

3. **SendGrid API** (Email OTP):
   - Used for sending **email OTPs** to verify user identity and secure actions.

4. **Custom Backend APIs**:
   - **User Registration API**: Handles account creation and PIN setup, stores user data.
   - **Login API**: Authenticates users with email/mobile and PIN, and issues **JWT tokens**.
   - **OTP Generation API**: Generates OTP and sends it to users via **SMS or Email**.
   - **Verification API**: Allows employees to verify user documents (like **PAN card**) and approve/reject accounts.
   - **Transaction API**: Manages user transactions with **PIN verification** for sensitive actions.
   - **Admin Dashboard API**: Provides **admin access** to view reports, charts, and manage user data.

---

### **7. Resources to Use**

1. **Cloud Hosting**:
   - **Heroku** (Free Tier) or **Vercel** for deploying the **frontend** (React app).
   - **AWS EC2** or **DigitalOcean** for backend hosting.

2. **Database Hosting**:
   - **MongoDB Atlas** (Free Tier) for **cloud-hosted** database management.

3. **Third-Party Services**:
   - **Textlocal** and **Twilio** for **SMS OTP**.
   - **SendGrid** for **email OTP**.

---

### **8. Encryption & Security**

1. **PIN Encryption**:
   - Use **bcrypt** for hashing the **6-digit PIN** before storing it in the database.

2. **JWT Authentication**:
   - **JWT tokens** will be used for user authentication, allowing users to securely access their accounts.

3. **Secure Connections**:
   - Use **HTTPS** to secure the communication between the frontend and backend.

4. **Environment Variables**:
   - Store **sensitive information** like API keys and database credentials in **environment variables** using **dotenv**.

---

### **Conclusion**

This **banking app project** incorporates a secure, **role-based user system** with **Admin**, **Employee**, and **User** roles. Key features include:

- **OTP-based registration and login** via **SMS and Email** (with services like **Textlocal**, **Twilio**, and **SendGrid**).
- **Employee verification** of users, including document validation (such as **PAN card**).
- **Secure banking transactions** using **6-digit PINs** and **JWT-based authentication**.
- A responsive and modern frontend built with **React**, **Material UI**, and **Framer Motion**.
- **Admin dashboard** with **charts** and **reports** for viewing user activities and performance.
