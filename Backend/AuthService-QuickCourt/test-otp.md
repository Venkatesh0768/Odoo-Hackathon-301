# OTP Testing Guide

## Testing the OTP Authentication Flow

### Prerequisites
1. Ensure the application is running on port 8081
2. Have a MySQL database named `odoo` running
3. Create a test user first using the signup endpoint

### Test Steps

#### Step 1: Create a Test User
```bash
curl -X POST http://localhost:8081/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890",
    "role": "USER"
  }'
```

#### Step 2: Request OTP
```bash
curl -X POST http://localhost:8081/api/v1/auth/otp/send \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "data": "OTP: 123456 (For testing only - remove in production)",
  "timestamp": 1234567890
}
```

**Note:** The OTP is returned in the response for testing purposes. In production, this should be sent via email.

#### Step 3: Verify OTP and Login
```bash
curl -X POST http://localhost:8081/api/v1/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "123456"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "OTP verification successful",
  "data": "User authenticated successfully",
  "timestamp": 1234567890
}
```

**Note:** The response will include a `Set-Cookie` header with the JWT token.

#### Step 4: Test Protected Endpoint
```bash
curl -X GET http://localhost:8081/api/v1/auth/validate \
  -H "Cookie: JwtToken=<JWT_TOKEN_FROM_COOKIE>"
```

### Testing OTP Security Features

#### Test 1: Invalid OTP
```bash
curl -X POST http://localhost:8081/api/v1/auth/otp/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "otp": "000000"
  }'
```

#### Test 2: Expired OTP
1. Request an OTP
2. Wait for 5 minutes (or change OTP_EXPIRY in config)
3. Try to verify the expired OTP

#### Test 3: Max Attempts
1. Try to verify with wrong OTP multiple times
2. After 3 attempts, the OTP should be invalidated

### Testing Regular Login (for comparison)

#### Regular Login
```bash
curl -X POST http://localhost:8081/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Expected Behaviors

1. **OTP Generation**: Should generate a 6-digit numeric code
2. **OTP Storage**: OTP should be stored in memory with expiration
3. **OTP Verification**: Should validate OTP and create JWT session
4. **Security**: Should prevent brute force attacks with max attempts
5. **Expiration**: OTP should expire after configured time
6. **Cleanup**: OTP should be removed after successful verification or expiration

### Troubleshooting

#### Common Issues:
1. **OTP not generated**: Check application logs for errors
2. **OTP verification fails**: Ensure OTP is used within expiration time
3. **JWT not created**: Check if user exists in database
4. **CORS issues**: Verify CORS configuration in SecurityConfig

#### Log Analysis:
Check application logs for:
- OTP generation success/failure
- OTP verification attempts
- User authentication events
- JWT token creation

### Production Considerations

1. **Remove OTP from Response**: Modify OtpService to not return OTP in response
2. **Email Integration**: Implement proper email service for OTP delivery
3. **Storage**: Use Redis or database for OTP storage instead of in-memory
4. **Rate Limiting**: Add rate limiting for OTP requests
5. **Monitoring**: Add metrics for OTP usage and failures
