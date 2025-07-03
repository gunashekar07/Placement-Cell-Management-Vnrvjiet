# VNRVJIET Job Portal

A modern, full-stack job portal application for connecting students, recruiters, and administrators with a sleek, user-friendly interface.

## Features

- **Three User Types:** Applicants (students), Recruiters, and Administrators with role-specific interfaces
- **Job Management:** Post, search, filter, and apply for jobs
- **Profile Management:** Create and update detailed profiles with education, skills, and documents
- **Application Tracking:** Track status of applications for both applicants and recruiters
- **Admin Dashboard:** Comprehensive admin panel to manage all aspects of the portal
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **React.js** - Frontend framework
- **Material-UI** - Component library with custom theming
- **Axios** - HTTP client for API requests
- **React Router** - Navigation and routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication mechanism

## UI Design System

The application features a modern, cohesive design system with the following components:

### 1. Colors

The color palette consists of:
- **Primary**: Blue shades (#1976d2 → #115293)
- **Secondary**: Teal shades (#26a69a → #00766c)
- **Background**: Light gray gradients and white
- **Success**: Green (#4caf50)
- **Error**: Red (#f44336)
- **Warning**: Amber (#ff9800)

### 2. Typography

- **Headers**: Roboto with various weights
- **Body**: Roboto Regular
- **Sizes** ranging from 0.75rem to 3.75rem following a consistent scale

### 3. Components

#### Cards
- Subtle shadows (0 4px 20px rgba(0,0,0,0.08))
- Rounded corners (8px border-radius)
- Consistent padding (24px)
- Hover animations when interactive

#### Buttons
- Primary gradient buttons for main actions
- Outlined buttons for secondary actions
- Border-radius of 50px for a modern look
- Hover animations (scale and shadow)
- Loading states with CircularProgress

#### Forms
- Outlined inputs with consistent styling
- Icons on the left of inputs
- Proper error validation and messaging
- Consistent spacing and layout

#### Navigation
- Slide-hide effects on scroll
- Active item highlighting
- Responsive mobile menu

### 4. Animations

- Fade and slide transitions between screens
- Zoom effects for list items
- Hover effects on cards and buttons
- Loading skeletons instead of spinners when appropriate

## Pages and Components

### Main Pages:
- **Welcome** - Landing page with hero section and portal highlights
- **Login/Signup** - Authentication pages with clean forms
- **Home** - Job search and listing with filtering
- **Profile** - User profile management
- **Jobs** - Job posting and management for recruiters
- **Applications** - Application tracking for both parties
- **Admin Dashboard** - Portal statistics and management

## Installation and Setup

1. Clone the repository
```
git clone https://github.com/username/job-portal.git
cd job-portal
```

2. Install dependencies for both backend and frontend
```
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables
Create a .env file in the backend directory with the following variables:
```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the development servers
```
# Start backend server
cd backend
npm start

# Start frontend server in a new terminal
cd frontend
npm start
```

5. Access the application
Open your browser and navigate to `http://localhost:3000`

## Admin Access

To access the admin panel, create an admin account or use the default admin credentials:
- Email: admin@example.com
- Password: admin123

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- VNRVJIET for the opportunity to develop this platform
- All contributors and testers who helped improve the application
