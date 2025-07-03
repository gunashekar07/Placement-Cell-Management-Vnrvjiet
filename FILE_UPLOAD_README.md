# File Upload Documentation

## Overview

This document explains how file uploads work in the job portal application, focusing on resume (PDF) and profile image (JPG/PNG) uploads.

## Technical Implementation

### Backend

The file upload system uses:
- **Multer**: For handling multipart/form-data
- **Stream Pipeline**: For efficient file processing
- **UUID**: For generating unique filenames

Files are stored in:
- Resume PDFs: `backend/public/resume/`
- Profile images: `backend/public/profile/`

#### File Upload Routes

Located in `backend/routes/uploadRoutes.js`, the API provides two endpoints:
- `/api/upload/resume` - For resume PDF uploads
- `/api/upload/profile` - For profile image uploads

### Frontend

The file upload UI is implemented with two components:
1. `FileUploadInput.js` - Basic implementation 
2. `ImprovedFileUpload.js` - Enhanced implementation with better validation and feedback

## Configuration

### File Size Limits

- Maximum file size: 10MB
- This is configured in both frontend and backend validation

### Allowed File Types

- **Resume**: PDF files only (.pdf)
- **Profile Images**: JPG/PNG files only (.jpg, .jpeg, .png)

## Error Handling

The system implements several error handling mechanisms:

1. **Frontend Validation**:
   - File type checking
   - File size validation
   - Visual feedback during upload
   - Clear error messages

2. **Backend Validation**:
   - File type verification
   - File size limits
   - Proper HTTP status codes for different error scenarios

## Troubleshooting

Common issues and solutions:

### "Error uploading file" message

Possible causes:
- File too large (over 10MB)
- Invalid file format
- Network issues during upload
- Server storage issues

Solutions:
- Check browser console for detailed error messages
- Ensure file meets size and format requirements
- Try a different file if the problem persists

### File permissions issues

If uploads fail due to permissions:
1. Check the directory permissions:
   ```
   ls -la backend/public/resume
   ls -la backend/public/profile
   ```
2. Ensure both directories are writable by the application

### Debugging uploads

To troubleshoot upload issues:
1. Check browser console network tab
2. Check server logs
3. Run the test-uploads.js script to verify directory permissions

## Best Practices

1. Always validate files on both client and server
2. Use the ImprovedFileUpload component for better user experience
3. Keep uploaded files under 5MB when possible
4. Always provide clear feedback to users during the upload process

## Security Considerations

1. File types are strictly validated to prevent malicious uploads
2. Unique filenames prevent path traversal attacks
3. Files are streamed to prevent memory overflow
4. Error messages are sanitized in production 