# FitFat Gym - Modern Fitness Website

A complete gym management system with a modern, responsive frontend, robust backend API, and comprehensive admin dashboard. Built to match the FitFat gym template design with full functionality.

## 🚀 Features

### Frontend (React + Tailwind CSS)

- **Modern Design**: Beautiful, responsive design matching the FitFat template
- **Homepage**: Hero section, features, about, stats, testimonials, and CTA sections
- **About Page**: Gym story, mission, vision, values, and team information
- **Trainers Page**: Professional trainer profiles with filtering and detailed information
- **Contact Page**: Contact form with validation and FAQ section
- **Authentication**: Login and signup pages with form validation
- **Responsive**: Mobile-first design that works on all devices
- **Animations**: Smooth animations using Framer Motion

### Backend (Node.js + Express + MongoDB)

- **RESTful API**: Complete API with user, trainer, and contact management
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Validation**: Input validation using express-validator
- **Security**: Helmet, CORS, rate limiting, and other security measures
- **Database**: MongoDB with Mongoose ODM
- **Error Handling**: Comprehensive error handling and logging

### Admin Dashboard (React + Tailwind CSS)

- **Dashboard**: Overview with statistics, charts, and recent activities
- **User Management**: View, edit, activate/deactivate users
- **Trainer Management**: Manage trainer profiles and information
- **Contact Management**: Handle customer inquiries and messages
- **Responsive Design**: Works on desktop and mobile devices

## 🛠️ Technology Stack

### Frontend

- React 19.1.1
- React Router DOM 7.9.4
- Tailwind CSS 3.4.0
- Framer Motion 10.16.4
- Lucide React (Icons)
- React Hook Form 7.45.4

### Backend

- Node.js
- Express.js 5.1.0
- MongoDB with Mongoose 8.19.1
- JWT Authentication
- bcryptjs for password hashing
- Express Validator for input validation
- Helmet for security
- CORS for cross-origin requests

### Admin Dashboard

- React 19.1.1
- Tailwind CSS 3.4.0
- Recharts for data visualization
- Lucide React (Icons)
- React Hook Form 7.45.4

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd modern-gym
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:

```env
SERVER_PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/fitfat-gym
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Admin Dashboard Setup

```bash
cd adminDashboard
npm install
```

Start the admin dashboard:

```bash
npm run dev
```

## 🌐 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: https://modern-gym-backend.onrender.com
- **Admin Dashboard**: http://localhost:5174 (or next available port)

## 🔐 Default Admin Credentials

For the admin dashboard:

- **Email**: admin@fitfatgym.com
- **Password**: admin123

## 📱 Pages & Features

### Frontend Pages

1. **Homepage** (`/`)

   - Hero section with call-to-action
   - Features section highlighting gym benefits
   - About section with gym story
   - Statistics showcase
   - Customer testimonials
   - Final call-to-action

2. **About Page** (`/about`)

   - Gym story and mission
   - Vision and values
   - Leadership team
   - Why choose us section
   - Statistics and achievements

3. **Trainers Page** (`/trainers`)

   - Filterable trainer profiles
   - Detailed trainer information
   - Specializations and certifications
   - Contact information and social links
   - Book session functionality

4. **Contact Page** (`/contact`)

   - Contact form with validation
   - Gym location and hours
   - FAQ section
   - Social media links

5. **Authentication**
   - Login page (`/login`)
   - Signup page (`/signup`)
   - Form validation and error handling

### Admin Dashboard Features

1. **Dashboard**

   - Overview statistics
   - Member growth charts
   - Membership distribution
   - Recent activities
   - Quick actions

2. **User Management**

   - View all users
   - Filter by role and membership
   - Activate/deactivate accounts
   - Edit user information
   - Delete users

3. **Trainer Management**

   - Manage trainer profiles
   - Add new trainers
   - Edit trainer information
   - View trainer statistics

4. **Contact Management**
   - View all contact messages
   - Filter by status
   - Mark messages as read/replied
   - Reply to messages
   - Delete messages

## 🗄️ Database Models

### User Model

- Personal information (name, email, phone, date of birth)
- Authentication (password, role)
- Membership information
- Account status and timestamps

### Trainer Model

- Personal information and specialization
- Image and social links
- Activity status
- Certifications and experience

### Contact Model

- Contact information
- Message details
- Status tracking (new, read, replied)
- Timestamps

## 🔌 API Endpoints

### Authentication

- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)

### Users (Admin)

- `GET /api/users` - Get all users
- `PUT /api/users/:id/status` - Update user status
- `DELETE /api/users/:id` - Delete user

### Trainers

- `GET /api/trainers` - Get all trainers
- `GET /api/trainers/:id` - Get trainer by ID
- `POST /api/trainers` - Create trainer (admin)
- `PUT /api/trainers/:id` - Update trainer (admin)
- `DELETE /api/trainers/:id` - Delete trainer (admin)

### Contacts

- `POST /api/contacts` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)
- `PUT /api/contacts/:id/status` - Update contact status (admin)
- `DELETE /api/contacts/:id` - Delete contact (admin)

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design inspired by the FitFat template
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user experience
- **Consistent Branding**: Purple gradient theme throughout
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Performance**: Optimized images and code splitting

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/DigitalOcean)

1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is correct
3. Deploy using your preferred platform

### Frontend Deployment (Vercel/Netlify)

1. Build the frontend: `npm run build`
2. Deploy the build folder to your hosting platform
3. Update API endpoints to production URLs

### Admin Dashboard Deployment

1. Build the admin dashboard: `npm run build`
2. Deploy to a separate subdomain or path
3. Ensure proper authentication is in place

## 🔧 Customization

### Colors and Branding

Update the Tailwind configuration files to match your brand colors:

- `frontend/tailwind.config.js`
- `adminDashboard/tailwind.config.js`

### Content

- Update gym information in the About page
- Replace placeholder images with actual gym photos
- Modify trainer information and photos
- Update contact information and hours

### Features

- Add payment integration for memberships
- Implement booking system for trainer sessions
- Add blog or news section
- Integrate with fitness tracking apps

## 📞 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation for common issues

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**Built with ❤️ for the fitness community by Olyad Boka**
