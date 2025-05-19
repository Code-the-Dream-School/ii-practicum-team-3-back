# Fitness App — Back-End Repository

Welcome to the **Fitness App Back-End** - a full-stack application designed to help users manage their workouts and fitness goals. It enables users to create and manage fitness profiles with both personalized and pre-built workouts. This Node.js back-end handles API requests, user management, and workout customization, providing a seamless experience for the React front-end.

[Live App](https://fitnessappsadcat.netlify.app/)  
[Back-End Deployment](https://fitnessappsadcat-back.onrender.com/)

---

## Table of Contents

- [Technologies](#technologies)
- [Key Features](#key-features)
- [Setting Up Local Development](#setting-up-local-development)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Authors](#authors)

---

## Technologies

### Core Frameworks
- **Node.js** – JavaScript runtime for building scalable server-side applications.
- **Express.js** – Minimal and flexible web application framework.

### Database & ORM
- **MongoDB** – NoSQL database for storing user profiles, workouts, and exercises.
- **Mongoose** – ODM for MongoDB with schema-based modeling.
- **csv-parser** – Parses CSV files for importing structured data.

### Authentication & Security
- **jsonwebtoken (JWT)** – Token-based user authentication.
- **bcryptjs** – Secure password hashing.
- **helmet** – Secures HTTP headers.
- **cors** – Enables Cross-Origin Resource Sharing.
- **xss-clean** – Prevents cross-site scripting.
- **express-rate-limit** – Prevents brute-force attacks.
- **cookie-parser** – Parses cookies.
- **express-validator** – Validates and sanitizes user input.

### File & Email Services
- **Cloudinary** – Cloud image hosting and optimization.
- **Nodemailer** – Sends transactional emails (e.g., password resets).

### Developer Tools
- **nodemon** – Auto-restarts server on file changes.
- **dotenv** – Loads environment variables.
- **morgan** – Logs HTTP requests.
- **http-status-codes** – Utility for HTTP status codes.

### API Documentation & Testing
- **Postman** – API testing and debugging.
- **Swagger JSDoc** – Generates OpenAPI docs from code comments.
- **Swagger UI Express** – Serves interactive API documentation.

---

## Key Features

### Authentication
- User registration, login, logout.
- Secure password reset & change.
- Passwords hashed with `bcrypt`.

### User Profiles
- Full CRUD support for user data.
- Personalized dashboard with:
  - Personal details
  - Favorite exercises
  - Saved workouts
  - Custom routines

### Exercise Management
- Browse built-in exercise library.
- Add/remove exercises from favorites.
- Filter exercises by:
  - **Equipment** (e.g., dumbbells, bands, bodyweight)
  - **Target area** (e.g., legs, abs, chest, arms)

### Workout Management
- Create, update, and delete custom workouts.
- View workouts with step-by-step instructions.
- Workouts based on:
  - Muscle groups (e.g., full-body, chest, legs)
  - Fitness level (beginner, intermediate, advanced)
  - Personal metrics (age, weight, height, goals)

---

## Setting Up Local Development

1. Create a folder to hold both the front-end and back-end repositories.
2. Clone this repository into that folder.
3. Run `npm install` to install all dependencies.
4. Create a `.env` file (see below).
5. Start the development server with `npm run dev`.
6. The server runs at [http://localhost:3000](http://localhost:3000).
7. Front-end can be accessed at [http://localhost:5173](http://localhost:5173) after setting up separately.

---

## Environment Variables

Create a `.env` file in the root of your back-end project:

```env
PORT=3000
JWT_SECRET=your_SECRET_key
JWT_REFRESH_SECRET=your_REFRESH_key
MONGODB_URI=mongodb://<username>:<password>@localhost:27017/<database_name>
JWT_LIFETIME=15d
CLIENT_URL=http://localhost:5173
ADMIN_USER=<admin_user_id> # Used for generating new workouts
EXERCISE_LIMIT=6
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your_smtp_email>
SMTP_PASS=<your_smtp_app_password>
```

---

### API

This project includes API documentation generated with Swagger. 
You can explore and test the API endpoints at: http://localhost:3000/api-docs  

---

### Authors 

 - [Natalia Sokolova](https://github.com/NataliaSokolova)
 - [Dmitrii Bogorodskii ](https://github.com/DmitriiBogg)