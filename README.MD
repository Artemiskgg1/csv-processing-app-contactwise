# CSV Upload & Processing with Bull Queue and Redis

## Overview

This project processes user data from a CSV file by adding jobs to a Bull queue and handling them asynchronously. The backend is built with Node.js (Express) and TypeScript, and Redis is used as a queue store via Docker.

## Features

- Upload a CSV file with `name` and `email` fields.
- Process user data asynchronously using Bull queue.
- Store jobs in Redis (running via Docker).
- Mock API call for user creation using JSONPlaceholder.
- Frontend built with Next.js for file uploads.
- Docker Compose setup for easy containerization.

## Tech Stack

- **Backend:** Node.js (Express, TypeScript)
- **Queue:** Bull (Redis-based job queue)
- **Database (Mocked):** JSONPlaceholder
- **Frontend:** Next.js (React)
- **Containerization:** Docker & Docker Compose

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Docker & Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

### Clone the Repository

```sh
git clone https://github.com/Artemiskgg1/csv-processing-app-contactwise.git
cd csv-processing-app-contactwise
```

### Running Locally (Without Docker)

#### Backend

```sh
cd server
npm install
npm run dev
```

- The Express server will run on `http://localhost:7000`

#### Frontend

```sh
cd client
npm install
npm run dev
```

- The Next.js app will run on `http://localhost:3000`

#### Redis (Without Docker)

Ensure Redis is installed and running locally:

```sh
redis-server
```

### Running with Docker

To run the entire setup using Docker:

```sh
docker-compose up --build
```

- The backend will be available at `http://localhost:7000`
- The frontend will be available at `http://localhost:3000`
- Redis will run as a container

To stop the containers:

```sh
docker-compose down
```

## API Endpoints

### Upload CSV File

**POST** `/upload`

- Uploads a CSV file containing user data.

### Get Job Status

**GET** `/jobs/:id`

- Fetches the status of a job using its ID.

## Environment Variables

Create a `.env` file in the `server` directory:

```
PORT=7000
REDIS_HOST=redis
REDIS_PORT=6379
```

## License

This project is open-source and available under the [MIT License](LICENSE).
