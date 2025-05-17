

### 🏋️‍♀️ Fitness App — Back-End Repository

Welcome to the back-end repository of the Fitness App — a full-stack application designed to help users manage their workouts and fitness goals.
It enables users to create and manage fitness profiles with both personalized and pre-built workouts. This Node.js back-end handles API requests, user management, and workout customization, providing a seamless experience for the React front-end.

[Live app](https://fitnessappsadcat.netlify.app/)

This repository hosts the Node.js and Express.js back-end application.
[Back End deployment](https://fitnessappsadcat-back.onrender.com/)

Table of Contents
Technologies 
Key Features
Quick Start
Environment Variables
API Documentation
Authors

### Technologies 

Core Frameworks:
Node.js – JavaScript runtime for building fast, scalable server applications.
Express.js – Minimal and flexible framework.

Database & ORM:
MongoDB – NoSQL database for storing users, workouts, and exercises.
Mongoose – ODM for MongoDB with schema-based modeling.
csv-parser – Parses CSV files for importing structured data.

Authentication:
jsonwebtoken (JWT) – Secure user authentication via tokens.
bcryptjs – Secure password hashing.

Cloud Storage:
Cloudinary – hosting and optimization service.

Email Functionality:
Nodemailer – Sending transactional emails (e.g., password resets).

Development Tools:
nodemon – Automatically restarts your server during development.
dotenv – Loads environment variables from a .env file.
morgan – HTTP request logger for debugging requests.
http-status-codes – Easy access to HTTP response status codes.

Middleware and Security
helmet – Secures HTTP headers to protect against common vulnerabilities.
cors – Enables Cross-Origin Resource Sharing.
xss-clean – Sanitizes user input to prevent cross-site scripting (XSS).
express-rate-limit – Limits repeated requests to prevent brute-force attacks.
cookie-parser – Parses cookies in incoming requests.
express-validator – Validates and sanitizes user input.

API Documentatio and testing:
Postman – API testing and debugging.
Swagger JSDoc - A library for generating OpenAPI documentation from JSDoc comments in the codebase.
Swagger UI Express - A tool to serve interactive API documentation.

### Key Features

Users can create an account, reset, or change their passwords.
Full CRUD operations for updating user profiles.
Passwords are securely hashed and stored.
Each user has a profile page that displays:
- Personal information
- Saved exercises
- Saved workouts
- Custom workouts

Exercise and workout management

Users can explore a library of exercises.
Users can add or remove exercises from their favorites.
Users can search for exercises using predefined filters:
- Equipment availability (dumbbells, resistance bands, bodyweight, etc.).
- Body focus (butt & leg, Abs, Full body, arm, shoulders, back, chest)
View and follow exercises with step-by-step guidance.
Full CRUD for workouts (create, read, update, delete)
Display workouts with detailed instructions and demonstrations.
Workout based on focus areas (e.g., specific muscle groups like legs, chest, or full-body), 
Custom workouts are tailored to weight, age, height, goals, and fitness level (beginner, intermediate, advanced). 


### Setting up local development environment

1. Create a folder to contain both the front-end and back-end repos 
2. Clone this repository to that folder
3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Open http://localhost:3000/ to test the back end
6. Your back-end server is now running. You can now run the front-end app on http://localhost:5173/ 

### Environment Variables

To properly run this application, you need to set up environment variables. This is done by creating a .env file in the root directory of the backend folder
.env

PORT=3000
JWT_SECRET=your_SECRET_key
JWT_REFRESH_SECRET=your_REFRESH_key
MONGODB_URI=mongodb://<username>:<password>@localhost:27017/<database_name>
JWT_LIFETIME=15d
CLIENT_URL=http://localhost:5173
ADMIN_USER=<admin_user_id> /// Used only for generating new workouts
EXERCISE_LIMIT=6
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=<your_smtp_email>
SMTP_PASS=<your_smtp_app_password>

### API

This project includes API documentation generated with Swagger. 
You can explore and test the API endpoints at: http://localhost:3000/api-docs  


### Authors 

 - [Natalia Sokolova](https://github.com/NataliaSokolova)
 - [Dmitrii Bogorodskii ](https://github.com/DmitriiBogg)
