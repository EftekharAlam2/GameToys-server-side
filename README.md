# GameToys Server 🎮🧸

This repository contains the server-side code for the **GameToys** application. It is built using **Express.js** and **MongoDB** and provides a RESTful API to manage toy data. The server handles operations like adding, updating, deleting, and fetching toy information.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Base URL](#base-url)
  - [Toy Management](#toy-management)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [License](#license)

---

## Features
- **CRUD Operations**: Create, Read, Update, and Delete toy data.
- **Pagination & Search**: Fetch toys with pagination and search by toy name.
- **Authentication**: Secured endpoints for user-specific toy management.
- **Sorting**: Sort toys based on price.
- **Environment Variables**: Uses environment variables for sensitive information.

---

## Technologies Used
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the server.
- **MongoDB**: NoSQL database for storing toy data.
- **dotenv**: Loads environment variables from a `.env` file.
- **Cors**: Enables Cross-Origin Resource Sharing.

---

## Environment Variables
To run this project, you will need to add the following environment variables to your `.env` file:

```env
PORT=5000
DB_USER=your_db_username
DB_PASSWORD=your_db_password
