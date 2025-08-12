# AuthService-QuickCourt

A secure authentication microservice for the QuickCourt system with JWT-based authentication and OTP verification.

## 🚀 Features

- **JWT Authentication**: Secure token-based authentication
- **OTP Service**: Email-based OTP verification for enhanced security
- **User Management**: User registration, login, and management
- **Role-Based Access Control**: Support for different user roles
- **Secure Password Handling**: BCrypt password encryption
- **CORS Support**: Cross-origin resource sharing configuration
- **Comprehensive Logging**: Detailed logging for debugging and monitoring

## 🛠️ Technology Stack

- **Framework**: Spring Boot 3.5.4
- **Language**: Java 21
- **Database**: MySQL with JPA/Hibernate
- **Security**: Spring Security 6 with JWT
- **Build Tool**: Gradle
- **Dependencies**: 
  - Spring Boot Web, Security, Data JPA
  - JWT library (jjwt 0.12.x)
  - Lombok for boilerplate reduction

## 📋 Prerequisites

- Java 21 or higher
- MySQL 8.0 or higher
- Gradle 8.0 or higher

## 🔧 Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```bash
# Database Configuration
DATABASE_URL=jdbc:mysql://localhost:3306/odoo
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_database_password

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_at_least_64_characters_long
JWT_EXPIRY=86400000

# OTP Configuration
OTP_EXPIRY=300000
OTP_LENGTH=6
OTP_MAX_ATTEMPTS=3

# Cookie Configuration
COOKIE_EXPIRY=3600

# Server Configuration
SERVER_PORT=8081
SHOW_SQL=false
DDL_AUTO=update

# Admin User Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Email Configuration (for production OTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

### 2. Database Setup

1. Create a MySQL database named `odoo`
2. The application will automatically create tables using JPA auto-generation

### 3. Build and Run

```bash
# Clean and build the project
./gradlew clean build

# Run the application
./gradlew bootRun
```

The application will start on port 8081 (or the port specified in your environment variables).

## 📚 API Documentation

### Base URL
```
http://localhost:8081/api/v1/auth
```

### Authentication Endpoints

#### 1. User Registration
```http
POST /signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phoneNumber": "+1234567890",
  "role": "USER"
}
```

#### 2. User Login
```http
POST /login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### 3. OTP Login Flow

**Step 1: Request OTP**
```http
POST /otp/send
Content-Type: application/json

{
  "email": "john.doe@example.com"
}
```

**Step 2: Verify OTP**
```http
POST /otp/verify
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

#### 4. Token Validation
```http
GET /validate
Authorization: Bearer <JWT_TOKEN>
```

#### 5. Get All Users
```http
GET /users
Authorization: Bearer <JWT_TOKEN>
```

### Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "timestamp": 1234567890
}
```

## 🔐 Security Features

### JWT Token Security
- HTTP-only cookies for token storage
- Configurable token expiration
- Secure token signing with HMAC-SHA256

### OTP Security
- 6-digit numeric OTP codes
- Configurable expiration time (default: 5 minutes)
- Maximum attempt limits (default: 3 attempts)
- Secure random generation using SecureRandom

### Password Security
- BCrypt password hashing
- Minimum password length validation (8 characters)
- Strong password requirements

### CORS Configuration
- Configured for frontend integration
- Support for multiple origins
- Credentials support enabled

## 🚨 Security Considerations

### Production Deployment
1. **Change Default Secrets**: Update JWT_SECRET and other sensitive values
2. **Enable HTTPS**: Set `secure=true` in cookie configuration
3. **Email Service**: Configure proper SMTP settings for OTP delivery
4. **Database Security**: Use strong database passwords and restrict access
5. **Environment Variables**: Never commit sensitive data to version control

### OTP Implementation Notes
- Current implementation returns OTP in response for testing
- Remove OTP from response in production
- Implement proper email service for OTP delivery
- Consider using Redis for OTP storage in production

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify MySQL is running
   - Check database credentials
   - Ensure database `odoo` exists

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration settings
   - Ensure cookies are enabled in browser

3. **OTP Not Working**
   - Check OTP configuration values
   - Verify email service configuration
   - Check application logs for errors

### Logging

The application uses SLF4J with comprehensive logging:
- Authentication attempts
- OTP generation and verification
- User registration and login
- Security events

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is part of the QuickCourt system.

## 🆘 Support

For support and questions:
- Check the application logs
- Review the API documentation
- Contact the development team
