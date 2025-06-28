# 🛠️ Product Management CRUD Application

This project is a full-stack CRUD application built with:

- **Backend**: Spring Boot + Java + JPA/Hibernate
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL
- **DevOps**: Docker Compose
- **Testing**: Vitest, React Testing Library, MSW

## Prerequisites

- Java 17 or higher
- Node.js 18 or higher
- Docker 20.10 or higher
- Docker Compose 2.0 or higher
- PostgreSQL 12 or higher (optional, Docker version preferred)

## 📁 Project Structure

```text
project-root/
├── backend/               # Spring Boot application
│   ├── src/main/
│   ├── Dockerfile
│   └── pom.xml
├── frontend/             # React application
│   ├── src/
│   ├── Dockerfile
│   └── vite.config.ts
├── devops/               # DevOps resources
│   ├── docker-compose.yml   # PostgreSQL Database setup in a Docker container
└── README.md
```

## Quick Start :

1. Clone the repository:
   ```bash
   git clone https://github.com/zykarim/products_management.git
   cd products_management

2. Start PostgreSQL with Docker

   ```bash
   cd devops
   docker-compose up -d
   
--> The application uses PostgreSQL with the following default configuration:

	Database: product_management_db
	Username: hahn
	Password: hahn123
	Port: 5431

These can be modified in:

	backend/src/main/resources/application.yml for local development
	devops/docker-compose.yml for Docker deployment

3. Backend Setup (Spring Boot)

Navigate to the backend directory:

	```bash
	cd backend

Build and run:

	```bash
	./mvnw spring-boot:run

The API will be available at http://localhost:8082/api
```text
API Endpoints
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/{id}	Get product by ID
POST	/api/products	Create new product
PUT	/api/products/{id}	Update existing product
DELETE	/api/products/{id}	Delete product
```

4. Frontend Setaup (React + Vite)

Navigate to the frontend directory:

	```bash
	cd frontend

Install dependencies:

	```bash
	npm install

Run the development server:

	```bash
	npm run dev

The app will be available at http://localhost:5173



