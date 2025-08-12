# Email Setup Guide for OTP Service

## 🔧 **Current Status**

The OTP service is currently set up to log OTPs to the console for testing purposes. To enable actual email delivery, you need to configure your Gmail account.

## 📧 **Gmail App Password Setup**

### **Step 1: Enable 2-Factor Authentication**
1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled

### **Step 2: Generate App Password**
1. Go to Security → 2-Step Verification
2. Scroll down to "App passwords"
3. Select "Mail" and "Other (Custom name)"
4. Enter "QuickCourt OTP Service" as the name
5. Click "Generate"
6. **Copy the 16-character password** (e.g., `abcd efgh ijkl mnop`)

### **Step 3: Update Application Configuration**

Update your `application.yml` or set environment variables:

```yaml
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: your-email@gmail.com  # Your Gmail address
    password: your-16-char-app-password  # The app password from Step 2
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
```

## 🚀 **Enable Email Functionality**

### **Option 1: Quick Test (Current Setup)**

The current setup logs OTPs to the console. When you request an OTP, check your application logs for:

```
=== OTP GENERATED FOR TESTING ===
Email: user@example.com
OTP: 123456
Expires: 2024-01-01T12:00:00
================================
```

### **Option 2: Enable Real Email Sending**

1. **Uncomment the email code** in `OtpService.java`:

```java
// TODO: Implement actual email sending here
SimpleMailMessage message = new SimpleMailMessage();
message.setTo(email);
message.setSubject("QuickCourt - OTP Verification");
message.setText("Your OTP is: " + otp);
mailSender.send(message);
```

2. **Add the mail dependency** (already in build.gradle)
3. **Configure your Gmail credentials**

## 🧪 **Testing the OTP Flow**

### **1. Start the Application**
```bash
gradlew bootRun
```

### **2. Request OTP via Postman**
```http
POST http://localhost:8081/api/v1/auth/otp/send
Content-Type: application/json

{
  "email": "rapoluvenky7@gmail.com"
}
```

### **3. Check the Response**
- **Current Setup**: OTP will be logged in console
- **Email Setup**: OTP will be sent to the email address

### **4. Verify OTP**
```http
POST http://localhost:8081/api/v1/auth/otp/verify
Content-Type: application/json

{
  "email": "rapoluvenky7@gmail.com",
  "otp": "123456"  // Use the OTP from console/email
}
```

## 🔍 **Troubleshooting Email Issues**

### **Common Problems:**

1. **"Authentication failed"**
   - Use App Password, not your regular Gmail password
   - Ensure 2FA is enabled

2. **"Connection refused"**
   - Check if port 587 is blocked by firewall
   - Try port 465 with SSL

3. **"Username not accepted"**
   - Use your full Gmail address
   - Check for typos

4. **"Invalid credentials"**
   - Regenerate App Password
   - Ensure no extra spaces

### **Alternative Email Services:**

If Gmail doesn't work, you can use:

- **Outlook/Hotmail**: `smtp-mail.outlook.com:587`
- **Yahoo**: `smtp.mail.yahoo.com:587`
- **Custom SMTP**: Your organization's email server

## 📋 **Environment Variables for Production**

```bash
# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# OTP Configuration
OTP_EXPIRY=300000
OTP_LENGTH=6
OTP_MAX_ATTEMPTS=3
```

## 🎯 **Next Steps**

1. **For Testing**: Use the current console logging setup
2. **For Production**: Set up Gmail App Password and enable email sending
3. **For Security**: Consider using environment variables instead of hardcoded values

## 📞 **Need Help?**

If you're still having issues:
1. Check the application logs for detailed error messages
2. Verify your Gmail App Password is correct
3. Ensure your network allows SMTP connections
4. Test with a simple email client first
