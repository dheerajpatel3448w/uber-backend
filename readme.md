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