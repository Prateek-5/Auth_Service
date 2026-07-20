# Auth Service

Handles user identity for the flight-booking system — registration, sign-in, JWT issuance,
token verification, and role-based access control. Every request to the Booking Service is
validated through this service by the API Gateway before being forwarded.

Part of a 5-service system: [API Gateway](https://github.com/Prateek-5/APIGateway) · **Auth Service** · [Booking Service](https://github.com/Prateek-5/AirTicketBookingService) · [Flight & Search Service](https://github.com/Prateek-5/FlightAndSearchService) · [Reminder Service](https://github.com/Prateek-5/ReminderService)

---

## What it does

```
POST /api/v1/user/signup     Register (email + password → bcrypt hash stored)
POST /api/v1/user/signin     Sign in  (bcrypt compare → JWT issued, 1-day expiry)
GET  /api/v1/isauthenticated Verify   (JWT decode → returns user id; used by API Gateway)
GET  /api/v1/isadmin         Role check (RBAC — is this user id an admin?)
DELETE /api/v1/user/:id      Remove user
```

---

## Data model

```
User                        Role
─────────────────           ──────────────
id           PK             id     PK
email        unique         name
password     bcrypt hash
             │
             └─── User_Roles (join table) ───── Role
                  userId FK
                  roleId FK
```

`User` and `Role` are many-to-many via `User_Roles`. Admin check (`isAdmin`) queries this join
table — the gateway uses this before allowing privileged operations.

---

## Key design decisions

**Password hashing happens in the model, not the service.**
A Sequelize `beforeCreate` hook hashes the password with bcrypt before the row is ever written.
The plaintext password never touches the database layer, even through a coding error upstream.

**JWT signed with a server secret, 1-day expiry.**
Token payload carries `{ email, id }`. The `/isAuthenticated` endpoint verifies the signature
and returns the user id — the API Gateway can then identify who made the request without
storing sessions.

**Why a separate Auth Service instead of middleware in each service?**
Token verification logic lives in one place. The API Gateway calls this service; every other
service trusts the gateway. If the JWT algorithm or secret rotates, one service changes, not five.

---

## Stack

| Concern | Library |
|---|---|
| HTTP server | Express 4 |
| ORM | Sequelize + Sequelize CLI |
| Database | MySQL |
| Password hashing | bcrypt |
| JWT | jsonwebtoken |

---

## Setup

```bash
npm install
npx sequelize-cli db:migrate   # creates users, roles, user_roles tables
```

Create `.env`:
```
PORT=3001
DB_NAME=auth_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
JWT_KEY=your_jwt_secret
SALT=8
```

```bash
node src/index.js
```
