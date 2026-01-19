# Installation Guide - Wood Inventory Management System

Complete step-by-step installation instructions for Windows, macOS, and Linux.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **MySQL** (v8.0 or higher)
   - Windows: https://dev.mysql.com/downloads/installer/
   - macOS: `brew install mysql`
   - Linux: `sudo apt-get install mysql-server`
   - Verify: `mysql --version`

3. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

4. **Code Editor** (recommended)
   - VS Code: https://code.visualstudio.com/

---

## 🗄️ Step 1: Database Setup

### 1.1 Start MySQL Service

**Windows:**
```bash
# Services → MySQL → Start
net start MySQL80
```

**macOS:**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 1.2 Create Database and User

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE wood_inventory_db;

# Create user (optional but recommended)
CREATE USER 'wood_admin'@'localhost' IDENTIFIED BY 'strong_password_here';

# Grant privileges
GRANT ALL PRIVILEGES ON wood_inventory_db.* TO 'wood_admin'@'localhost';

# Flush privileges
FLUSH PRIVILEGES;

# Exit MySQL
EXIT;
```

### 1.3 Import Database Schema

```bash
# Navigate to the project folder
cd /path/to/project

# Import the schema
mysql -u wood_admin -p wood_inventory_db < database_schema.sql
```

**Or manually import:**
```bash
mysql -u wood_admin -p
USE wood_inventory_db;
SOURCE /path/to/database_schema.sql;
```

---

## 🔧 Step 2: Backend Setup

### 2.1 Create Backend Directory

```bash
# Create project structure
mkdir wood-inventory-system
cd wood-inventory-system
mkdir backend
cd backend
```

### 2.2 Initialize Node.js Project

```bash
# Initialize npm
npm init -y
```

### 2.3 Install Dependencies

```bash
# Install all required packages
npm install express mysql2 bcrypt jsonwebtoken cors multer dotenv

# Install development dependencies
npm install --save-dev nodemon
```

### 2.4 Create Project Files

Create the following files in the `backend` directory:

**File structure:**
```
backend/
├── server.js
├── package.json
├── .env
├── .gitignore
└── uploads/
    └── .gitkeep
```

**Copy the content from these artifacts:**
1. `server.js` → Copy from "Backend API (Node.js + Express)"
2. `package.json` → Copy from "package.json - Backend Dependencies"
3. `.env` → Copy from ".env - Environment Variables"
4. `.gitignore` → Copy from ".gitignore - Git Ignore File"

### 2.5 Create Uploads Directory

```bash
mkdir uploads
touch uploads/.gitkeep
```

### 2.6 Configure Environment Variables

Edit the `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_USER=wood_admin
DB_PASSWORD=your_actual_password
DB_NAME=wood_inventory_db
JWT_SECRET=your_super_secret_32_character_key_change_this_in_production
```

### 2.7 Test Backend

```bash
# Start the server
npm start

# Or use nodemon for development
npm run dev
```

**Expected output:**
```
Wood Inventory API Server running on port 3000
http://localhost:3000
```

**Test the API:**
```bash
# In a new terminal
curl http://localhost:3000/api/inventory
```

---

## ⚛️ Step 3: Frontend Setup

### 3.1 Create React App

```bash
# Navigate back to main project folder
cd ..

# Create React app
npx create-react-app frontend

# Navigate to frontend
cd frontend
```

### 3.2 Install Dependencies

```bash
# Install required packages
npm install lucide-react axios

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer

# Initialize Tailwind
npx tailwindcss init -p
```

### 3.3 Configure Tailwind CSS

**Edit `tailwind.config.js`:**

Copy content from "tailwind.config.js - Tailwind Configuration" artifact

**Edit `postcss.config.js`:**

Copy content from "postcss.config.js - PostCSS Configuration" artifact

### 3.4 Update CSS Files

**Replace `src/index.css`:**

Copy content from "index.css - Main Styles" artifact

### 3.5 Create Project Structure

```bash
# Create additional directories
mkdir -p src/components
mkdir -p src/services
mkdir -p src/pages
mkdir -p src/utils
```

**File structure:**
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── services/
│   │   └── api.js
│   ├── pages/
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
└── postcss.config.js
```

### 3.6 Add Files

**Create `src/services/api.js`:**

Copy content from "api.js - API Service Helper" artifact

**Replace `src/App.js`:**

Copy content from "Wood Inventory Management System" artifact

### 3.7 Configure API URL

Create `.env` file in frontend directory:

```bash
# Create .env file
touch .env
```

Add the following:
```env
REACT_APP_API_URL=http://localhost:3000/api
```

### 3.8 Start Frontend

```bash
npm start
```

**Expected output:**
```
Compiled successfully!

You can now view wood-inventory-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

---

## 🎯 Step 4: Testing the System

### 4.1 Create First User

**Using API (Postman or cURL):**

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "full_name": "System Admin",
    "email": "admin@woodinventory.com",
    "phone": "+94771234567",
    "role": "admin"
  }'
```

**Or directly in MySQL:**

```sql
USE wood_inventory_db;

INSERT INTO users (username, password_hash, full_name, email, phone, role) 
VALUES (
  'admin', 
  '$2b$10$YourHashedPasswordHere',
  'System Admin',
  'admin@woodinventory.com',
  '+94771234567',
  'admin'
);
```

### 4.2 Login to System

1. Open browser: `http://localhost:3000`
2. Login with:
   - Username: `admin`
   - Password: `admin123`

### 4.3 Test Features

1. **Dashboard** - View statistics
2. **Add Wood** - Create a new wood inventory item
3. **Add Supplier** - Create a new supplier
4. **Stock In** - Record incoming stock
5. **Stock Out** - Record outgoing stock

---

## 🚀 Step 5: Production Deployment

### 5.1 Backend Deployment

**Build for production:**

```bash
cd backend

# Set environment to production
# Edit .env
NODE_ENV=production
```

**Using PM2 (Process Manager):**

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start server.js --name wood-inventory-api

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### 5.2 Frontend Deployment

**Build for production:**

```bash
cd frontend

# Create production build
npm run build
```

**Deploy to:**
- **Netlify**: Drag & drop `build` folder
- **Vercel**: `vercel deploy`
- **Traditional Server**: Copy `build` folder to web server

### 5.3 Database Backup

```bash
# Create backup
mysqldump -u wood_admin -p wood_inventory_db > backup_$(date +%Y%m%d).sql

# Restore from backup
mysql -u wood_admin -p wood_inventory_db < backup_20260117.sql
```

---

## 🔒 Step 6: Security Checklist

- [ ] Change default passwords
- [ ] Update JWT_SECRET to a strong random string
- [ ] Enable HTTPS in production
- [ ] Set up firewall rules
- [ ] Regular database backups
- [ ] Update dependencies regularly
- [ ] Enable CORS only for trusted domains
- [ ] Implement rate limiting
- [ ] Use environment variables for all secrets
- [ ] Set up monitoring and logging

---

## 🛠️ Troubleshooting

### Database Connection Issues

**Error: "Access denied for user"**
```bash
# Reset MySQL password
mysql -u root -p
ALTER USER 'wood_admin'@'localhost' IDENTIFIED BY 'new_password';
FLUSH PRIVILEGES;
```

**Error: "Can't connect to MySQL server"**
```bash
# Check if MySQL is running
sudo systemctl status mysql  # Linux
brew services list  # macOS
```

### Port Already in Use

**Error: "Port 3000 already in use"**
```bash
# Find process using port
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Node Modules Issues

**Error: "Module not found"**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### React Build Fails

```bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

---

## 📞 Support

If you encounter any issues:

1. Check the error logs
2. Verify all dependencies are installed
3. Ensure environment variables are correct
4. Check MySQL service is running
5. Review the troubleshooting section

---

## ✅ Installation Complete!

Your Wood Inventory Management System should now be running:

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3000/api
- **Database**: MySQL on localhost:3306

Default login:
- Username: `admin`
- Password: `admin123`

**Remember to change the default password after first login!**
