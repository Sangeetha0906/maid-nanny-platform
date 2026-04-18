# API Documentation v1.0
Base URL: `http://localhost:5000/api`

## Authentication (`/api/auth`)

### `POST /register`
Creates a new User or Helper.
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "household" // or "helper"
}
```
**Response:** `201 Created` | `{ "token": "jwt_string", "user": { ... } }`

### `POST /login`
Authenticates existing profiles.
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:** `200 OK` | `{ "token": "jwt_string", "user": { ... } }`

---

## Helpers (`/api/helpers`)

### `GET /`
Fetch verified helpers, accepts query parameters for filtering.
**Query Params:** `?type=Maid&experience=5`
**Response:** `200 OK` | `[ { id, name, type, rating, plans, avatar... } ]`

### `GET /:id`
Fetch detailed profile.
**Response:** `200 OK` | `{ helper }`

---

## Bookings (`/api/bookings`)

### `POST /`
Submit a booking request. Needs Auth Header.
**Request Body:**
```json
{
  "helperId": "65b...",
  "plan": "Hourly",
  "startDate": "2026-04-15",
  "hours": 4
}
```
**Response:** `201 Created` | `{ "bookingId": "...", "status": "Pending" }`

### `GET /`
Fetch active/historical bookings for the logged-in User/Helper.
**Response:** `200 OK` | `[ { id, status, amount, plan... } ]`
