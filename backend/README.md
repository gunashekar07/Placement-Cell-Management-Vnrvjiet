# Job Portal Backend

This is the backend API for the Job Portal application, which now includes admin functionality.

## User Types

The application supports three types of users:
1. **Applicants** - Job seekers who can view and apply for jobs
2. **Recruiters** - Companies/employers who can post jobs and manage applications
3. **Admins** - System administrators who can view all details of students and companies

## Admin Setup

To create an admin account, run:

```bash
npm run create-admin
```

This will create an admin account with the following credentials:
- Email: admin@jobportal.com
- Password: admin123

**Important**: Change the password after the first login for security reasons.

## Admin API Endpoints

Admins have access to the following endpoints:

- **GET /api/admin/applicants** - View all job applicants in the system
- **GET /api/admin/recruiters** - View all recruiters in the system
- **GET /api/admin/jobs** - View all jobs in the system 
- **GET /api/admin/applications** - View all applications in the system
- **GET /api/admin/statistics** - Get system statistics (user counts, job counts, etc.)

All admin endpoints require authentication with an admin account.

## Security

Admin accounts have elevated privileges and should be created and managed carefully. Only authorize trusted individuals to have admin access. 