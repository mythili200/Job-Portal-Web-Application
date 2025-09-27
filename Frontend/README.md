# Job Portal Backend

A Node.js + Express + MongoDB backend for a Job Portal application.
This API handles user authentication (JWT), job postings, and job applications for job seekers and recruiters.

---

## 🚀 Features

- User Authentication (Register/Login with JWT)
- Role-based Access (Job Seeker / Recruiter)
- CRUD Operations for Jobs (create, update, delete, view)
- Apply for Jobs (job seeker)
- Manage Applications (recruiter can view/update applicant status)
- Secure Passwords with bcrypt
- MongoDB with Mongoose for database

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Token)
- **Security**: bcrypt for password hashing
- **Other Tools**: dotenv, nodemon

---

## 📂 Project Structure

```
backend/
│-- Controllers/       # All route logic (User, Job, Application)
│-- Middleware/        # Authentication middleware
│-- Models/            # Mongoose schemas (User, Job, Application)
│-- Routes/            # Express routes
│-- .env               # Environment variables
│-- server.js          # Entry point
│-- package.json
```

---

## ⚙️ Setup Instructions

1. **Clone Repository**

```bash
git clone https://github.com/your-username/job-portal-backend.git
cd Backend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:

```
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
```

4. **Run Server**

```bash
npm run dev   # with nodemon
# OR
npm start
```

---

## 📌 API Endpoints

### User Routes

- `POST /api/users/register` → Register new user
- `POST /api/users/login` → Login & get JWT
- `GET /api/users/profile` → Get logged-in user profile (protected)

### Job Routes

- `POST /api/jobs` → Create job (recruiter only)
- `GET /api/jobs` → Get all jobs
- `GET /api/jobs/:id` → Get job by ID
- `PUT /api/jobs/:id` → Update job
- `DELETE /api/jobs/:id` → Delete job

### Application Routes

- `POST /api/applications` → Apply for a job (job seeker only)
- `GET /api/applications/user` → Get all applications by user
- `GET /api/applications/:jobId` → Get all applications for a job (recruiter only)
- `PUT /api/applications/:applicationId` → Update application status (recruiter only)

---

## 🔒 Authentication

- Register/Login returns a JWT token.
- Add token in headers for protected routes:

```
Authorization: Bearer <token>
```

---

## ✅ Future Improvements

- Add email notifications for applications.
- Upload resumes for job seekers.
- Admin dashboard.

---

## 👨‍💻 Author

**Mythili P** – Fullstack Developer
