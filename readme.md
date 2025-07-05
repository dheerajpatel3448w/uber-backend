# API Endpoint Documentation

## /api/v1/user/register

### Description
This endpoint registers a new user into the system. It validates the incoming data, checks for existing users, creates the user, and generates both an access token and a refresh token.

### Request

**Method:** POST  
**Endpoint:** `/api/v1/user/register`

#### Request Body
The data must be sent in JSON format. Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

- **fullname.firstname:** String, required; minimum 3 characters.
- **fullname.lastname:** String, required; minimum 3 characters.
- **email:** String, required; must be a valid email address.
- **password:** String, required; minimum 6 characters.

### Response

#### Success (HTTP 200)
On successful registration, the response will include the created user details along with access and refresh tokens:

```json
{
  "user": { /* user details */ },
  "token": {
    "accesstoken": "<access token>",
    "refreshtoken": "<refresh token>"
  },
  "message": "User registered successfully",
  "success": true
}
```

#### Error Responses

- **HTTP 400 Bad Request:**  
  - Returned when validation fails (e.g., invalid fields or missing data).  
  - Also returned if the email already exists:
    ```json
    {
      "message": "User already exists"
    }
    ```

- **HTTP 500 Internal Server Error:**  
  Returned when an unexpected error occurs during processing.

### Example cURL Command

```bash
curl -X POST http://localhost:<PORT>/api/v1/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

> **Note:** Replace `<PORT>` with your running server's port.

---

## /api/v1/user/login

### Description
This endpoint logs in an existing user. It validates the credentials provided in the request body, checks the user existence, compares passwords, and upon successful authentication, it returns access and refresh tokens along with the user details. Tokens are set as HTTP-only cookies for added security.

### Request

**Method:** POST  
**Endpoint:** `/api/v1/user/login`

#### Request Body
The data must be sent in JSON format. Example:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123"
}
```

- **email:** String, required; must be a valid email address.
- **password:** String, required; minimum 6 characters.

### Response

#### Success (HTTP 200)
On successful login, the response will include the user details along with access and refresh tokens. Tokens are also set as HTTP-only cookies.

```json
{
  "message": "Login successful",
  "user": {
    "user": { /* user details */ },
    "accesstoken": "<access token>",
    "refreshtoken": "<refresh token>"
  },
  "success": true
}
```

#### Error Responses

- **HTTP 400 Bad Request:**  
  - Returned when the required fields are missing or validation fails.
  - Returned if the user does not exist or if the password does not match.
    ```json
    {
      "message": "user does not exist"
    }
    ```
    or
    ```json
    {
      "message": "username and password are not match"
    }
    ```

- **HTTP 500 Internal Server Error:**  
  Returned when an unexpected error occurs during processing.

### Example cURL Command

```bash
curl -X POST http://localhost:<PORT>/api/v1/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

> **Note:** Replace `<PORT>` with your running server's port.

---

## /api/v1/user/profile

### Description
This endpoint retrieves the profile of the currently authenticated user. It requires a valid JWT token to be sent either via HTTP-only cookie or in the Authorization header.

### Request

**Method:** GET  
**Endpoint:** `/api/v1/user/profile`

#### Headers
- **Authorization:** Bearer &lt;access token&gt; (optional if token is provided via cookie)
- **Cookie:** accessToken (if not provided in header)

### Response

#### Success (HTTP 200)
Returns the user profile details.

```json
{
  "user": { /* user details returned by the server */ },
  "success": true
}
```

#### Error Responses

- **HTTP 400 Bad Request:**  
  - Returned when no token is provided or token validation fails.
  ```json
  {
    "message": "user token not exist" 
  }
  ```
- **HTTP 401 Unauthorized:**  
  - Returned when the token is blacklisted or invalid.
  ```json
  {
    "message": "unauthorize"
  }
  ```

### Example cURL Command

```bash
curl -X GET http://localhost:<PORT>/api/v1/user/profile \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

---

## /api/v1/user/logout

### Description
This endpoint logs out the current user by blacklisting the active access token and clearing both the `accessToken` and `refreshToken` cookies from the client.

### Request

**Method:** GET  
**Endpoint:** `/api/v1/user/logout`

#### Headers
- **Authorization:** Bearer &lt;access token&gt; (optional if token is provided via cookie)
- **Cookie:** accessToken, refreshToken (if not provided in header)

### Response

#### Success (HTTP 200)
On successful logout, the response confirms the user's session termination, and the authentication cookies are cleared.

```json
{
  "message": "Logout successful",
  "success": true
}
```

#### Error Responses

- **HTTP 400 Bad Request:**  
  - Returned when the token is not provided or validation fails.
  
- **HTTP 401 Unauthorized:**  
  - Returned when the token is already blacklisted or invalid.

### Example cURL Command

```bash
curl -X GET http://localhost:<PORT>/api/v1/user/logout \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

> **Note:** Replace `<PORT>` with your running server's port and `<access_token>` with a valid JWT token.

---

## Captain Endpoints

### /api/v1/captain/register

#### Description
This endpoint registers a new captain into the system. It validates the incoming data, checks if the captain already exists, creates the captain account, and stores required vehicle information.

#### Request

**Method:** POST  
**Endpoint:** `/api/v1/captain/register`

##### Request Body
The data must be sent in JSON format. Example:

```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "securePassword123",
  "vehicle": {
    "color": "Red",
    "platenumber": "XYZ1234",
    "capacity": 4,
    "vehicletype": "car"
  }
}
```

- **fullname.firstname:** String, required; minimum 3 characters.
- **fullname.lastname:** String, required; minimum 3 characters.
- **email:** String, required; must be a valid email address.
- **password:** String, required; minimum 6 characters.
- **vehicle.color:** String, required; minimum 3 characters.
- **vehicle.platenumber:** String, required; minimum 3 characters; must be unique.
- **vehicle.capacity:** Number, required.
- **vehicle.vehicletype:** String, required; must be one of `car`, `bike`, or `auto`.

#### Response

##### Success (HTTP 201)
On successful registration, the response returns the created captain details.

```json
{
  "message": "Captain registered successfully",
  "captain": { /* captain details */ }
}
```

##### Error Responses

- **HTTP 400 Bad Request:**  
  Returned if validation fails or if the captain already exists.
  
- **HTTP 500 Internal Server Error:**  
  Returned when an unexpected error occurs during processing.

##### Example cURL Command

```bash
curl -X POST http://localhost:<PORT>/api/v1/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "Jane", "lastname": "Doe" },
    "email": "jane.doe@example.com",
    "password": "securePassword123",
    "vehicle": {
      "color": "Red",
      "platenumber": "XYZ1234",
      "capacity": 4,
      "vehicletype": "car"
    }
  }'
```

---

### /api/v1/captain/login

#### Description
This endpoint authenticates an existing captain using their email and password. Upon successful authentication, an HTTP-only cookie containing an access token is issued.

#### Request

**Method:** POST  
**Endpoint:** `/api/v1/captain/login`

##### Request Body
Example request:

```json
{
  "email": "jane.doe@example.com",
  "password": "securePassword123"
}
```

- **email:** String, required; must be a valid email address.
- **password:** String, required; minimum 6 characters.

#### Response

##### Success (HTTP 200)
On successful login, the response returns the captain's details and an access token set as an HTTP-only cookie.

```json
{
  "message": "Login successful",
  "captain": { /* captain details */ },
  "assesstoken": "<access token>"
}
```

##### Error Responses

- **HTTP 400 Bad Request:**  
  Returned when required fields are missing.
  
- **HTTP 401 Unauthorized:**  
  Returned when the email or password is invalid.

##### Example cURL Command

```bash
curl -X POST http://localhost:<PORT>/api/v1/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "securePassword123"
  }'
```

---

### /api/v1/captain/profile

#### Description
This endpoint retrieves the profile of the currently authenticated captain. A valid JWT token must be provided in the HTTP-only cookie or in the Authorization header.

#### Request

**Method:** GET  
**Endpoint:** `/api/v1/captain/profile`

##### Headers
- **Authorization:** Bearer &lt;access token&gt; (optional if cookie is present)
- **Cookie:** assesstoken (if not provided in header)

#### Response

##### Success (HTTP 200)
Returns the captain profile details.

```json
{
  "message": "Captain profile",
  "captain": { /* captain details */ }
}
```

##### Error Responses

- **HTTP 400/401 Unauthorized:**  
  Returned when no token is provided or if token verification fails.
  
- **HTTP 404 Not Found:**  
  Returned if the captain is not found.

##### Example cURL Command

```bash
curl -X GET http://localhost:<PORT>/api/v1/captain/profile \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

---

### /api/v1/captain/logout

#### Description
This endpoint logs out the current captain by blacklisting the active access token and clearing the `assesstoken` HTTP-only cookie.

#### Request

**Method:** GET  
**Endpoint:** `/api/v1/captain/logout`

##### Headers
- **Authorization:** Bearer &lt;access token&gt; (optional if cookie is present)
- **Cookie:** assesstoken (if not provided in header)

#### Response

##### Success (HTTP 200)
On successful logout, the response confirms the termination of the session.

```json
{
  "message": "Logout successful"
}
```

##### Error Responses

- **HTTP 400/401 Unauthorized:**  
  Returned when the token is missing or invalid.

##### Example cURL Command

```bash
curl -X GET http://localhost:<PORT>/api/v1/captain/logout \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json"
```

> **Note:** Replace `<PORT>` with your running server's port and `<access_token>` with a valid

## Ride Endpoints

### /api/v1/ride/createride

**POST** `/api/v1/ride/createride`

Creates a new ride.

**Request Body:**
```json
{
  "pickup": "Pickup Address",
  "destination": "Destination Address",
  "vehicletype": "car" // or "bike", "auto"
}
```

**Success Response (201):**
```json
{
  "message": "ride created successfully",
  "ride": { /* ride details */ },
  "success": true
}
```

---

### /api/v1/ride/getfare

**GET** `/api/v1/ride/getfare?pickup=<pickup>&destination=<destination>`

Returns fare estimates for bike, auto, and car.

**Success Response (200):**
```json
{
  "message": "fare found successfully",
  "data": {
    "fare": {
      "bike": 40,
      "auto": 60,
      "car": 100
    },
    "distance": 5000,
    "duration": 900
  },
  "success": true
}
```

---

## Map Endpoints

### /api/v1/map/get-coordinate

**GET** `/api/v1/map/get-coordinate?address=<address>`

Returns latitude and longitude for a given address.

**Success Response (200):**
```json
{
  "lat": 23.12345,
  "lng": 72.12345
}
```

---

### /api/v1/map/get-distance-time

**GET** `/api/v1/map/get-distance-time?origin=<origin>&destination=<destination>`

Returns distance and duration between two locations.

**Success Response (200):**
```json
{
  "distance": { "text": "5 km", "value": 5000 },
  "duration": { "text": "10 mins", "value": 600 }
}
```

---

### /api/v1/map/get-suggestions

**GET** `/api/v1/map/get-suggestions?input=<input>`

Returns address/place suggestions for autocomplete.

**Success Response (200):**
```json
[
  { "description": "Place 1", ... },
  { "description": "Place 2", ... }
]
```

---

> **Note:** All protected routes require a valid JWT token via HTTP-only cookie or `Authorization` header