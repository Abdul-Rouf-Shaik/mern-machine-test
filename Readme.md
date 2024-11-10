# MERN Project

This project is a MERN (MongoDB, Express, React, Node.js) application with separate frontend and backend folders. Follow the instructions below to set up and run the project.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)

---

## Project Structure
# Project Structure

- `mern-chat-app/`
  - `frontend/` - React Vite app for the frontend
    - `public/` - Public assets
    - `src/` - Source files for React components and logic
    - `.env` - Environment variables for frontend
  - `backend/` - Contains the backend logic (Node.js, Express)
    - `src/` - Source files for backend (routes, controllers, models, etc.)
    - `.env` - Environment variables for backend

---

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. **Install dependencies for both frontend and backend**:

    - Navigate to the `frontend` folder and install dependencies:

      ```bash
      cd frontend
      npm install
      ```

    - Navigate to the `backend` folder and install dependencies:

      ```bash
      cd ../backend
      npm install
      ```

---

## Environment Variables

You need to set up `.env` files for both the frontend and backend with the required variables.


- **Backend**: Create a `.env` file in the `backend` folder with variables such as the database connection string and API keys.

    ```plaintext
    PORT=your_port_number
    MONGODB_URI=your_database_uri
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=your_expiry_secret
    NODE_ENV=production

    CLOUDINARY_CLOUD_NAME=your_cloudname
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

---

## Running the Application

After setting up the environment variables and installing dependencies:

1. **Start the frontend**:

    - Navigate to the `frontend` folder and run:

      ```bash
      npm run dev
      ```

2. **Start the backend**:

    - Navigate to the `backend` folder and run:

      ```bash
      npm run dev
      ```

---

## Scripts

- **`npm run dev`**: Starts the development server for both frontend and backend.
- **`npm install`**: Installs all dependencies.

---


## Contact

For questions or further assistance, please contact [Shaik Abdul Rouf](mailto:abdulroufshaik123@gmail.com).

