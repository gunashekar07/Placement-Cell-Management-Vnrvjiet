import React, { useState, useRef } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Box, 
  Card, 
  CardContent, 
  CircularProgress,
  LinearProgress,
  TextField,
  makeStyles,
  Divider
} from '@material-ui/core';
import axios from 'axios';
import apiList from '../lib/apiList';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    maxWidth: 800,
    margin: '0 auto'
  },
  card: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: theme.spacing(4),
    fontWeight: 600,
    textAlign: 'center'
  },
  successText: {
    color: theme.palette.success.main
  },
  errorText: {
    color: theme.palette.error.main
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: '0.9rem',
    whiteSpace: 'pre-wrap',
    background: '#f5f5f5',
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    maxHeight: 200,
    overflow: 'auto'
  }
}));

const UploadTester = () => {
  const classes = useStyles();
  const fileInputRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [logs, setLogs] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState({
    success: null,
    response: null,
    error: null
  });
  
  const logMessage = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };
  
  const clearLogs = () => {
    setLogs([]);
  };
  
  const resetAll = () => {
    setFile(null);
    clearLogs();
    setUploading(false);
    setProgress(0);
    setResults({
      success: null,
      response: null,
      error: null
    });
  };
  
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      logMessage(`File selected: ${selectedFile.name} (${selectedFile.type}, ${selectedFile.size} bytes)`);
    }
  };
  
  const testResumeUpload = () => {
    if (!file) {
      logMessage('No file selected');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    setResults({
      success: null,
      response: null,
      error: null
    });
    
    const data = new FormData();
    data.append('file', file);
    
    logMessage(`Starting upload to ${apiList.uploadResume}`);
    logMessage(`File: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
    
    axios.post(apiList.uploadResume, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        setProgress(percentage);
        logMessage(`Upload progress: ${percentage}%`);
      }
    })
    .then(response => {
      logMessage('Upload succeeded');
      logMessage(`Response: ${JSON.stringify(response.data, null, 2)}`);
      setResults({
        success: true,
        response: response.data,
        error: null
      });
      setUploading(false);
    })
    .catch(error => {
      logMessage('Upload failed');
      logMessage(`Error: ${error.message}`);
      
      if (error.response) {
        logMessage(`Status: ${error.response.status}`);
        logMessage(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      
      setResults({
        success: false,
        response: null,
        error: {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data
          } : null
        }
      });
      setUploading(false);
    });
  };
  
  const testProfileUpload = () => {
    if (!file) {
      logMessage('No file selected');
      return;
    }
    
    setUploading(true);
    setProgress(0);
    setResults({
      success: null,
      response: null,
      error: null
    });
    
    const data = new FormData();
    data.append('file', file);
    
    logMessage(`Starting upload to ${apiList.uploadProfileImage}`);
    logMessage(`File: ${file.name}, Type: ${file.type}, Size: ${file.size} bytes`);
    
    axios.post(apiList.uploadProfileImage, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const percentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        setProgress(percentage);
        logMessage(`Upload progress: ${percentage}%`);
      }
    })
    .then(response => {
      logMessage('Upload succeeded');
      logMessage(`Response: ${JSON.stringify(response.data, null, 2)}`);
      setResults({
        success: true,
        response: response.data,
        error: null
      });
      setUploading(false);
    })
    .catch(error => {
      logMessage('Upload failed');
      logMessage(`Error: ${error.message}`);
      
      if (error.response) {
        logMessage(`Status: ${error.response.status}`);
        logMessage(`Data: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      
      setResults({
        success: false,
        response: null,
        error: {
          message: error.message,
          response: error.response ? {
            status: error.response.status,
            data: error.response.data
          } : null
        }
      });
      setUploading(false);
    });
  };
  
  return (
    <Container className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        File Upload Diagnostic Tool
      </Typography>
      
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            1. Select a file to test upload
          </Typography>
          
          <Box my={2}>
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <Button 
              variant="outlined" 
              color="primary" 
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
            >
              Select File
            </Button>
            
            {file && (
              <Box mt={1}>
                <Typography variant="body2">
                  Selected: {file.name} ({file.type}, {Math.round(file.size / 1024)} KB)
                </Typography>
              </Box>
            )}
          </Box>
          
          <Divider />
          
          <Box my={2}>
            <Typography variant="h6" gutterBottom>
              2. Test upload
            </Typography>
            
            <Box display="flex" mt={2}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={testResumeUpload}
                disabled={!file || uploading}
                style={{ marginRight: 16 }}
              >
                {uploading ? 'Uploading...' : 'Test Resume Upload'}
              </Button>
              
              <Button 
                variant="contained"
                color="secondary"
                onClick={testProfileUpload}
                disabled={!file || uploading}
              >
                {uploading ? 'Uploading...' : 'Test Profile Image Upload'}
              </Button>
            </Box>
            
            {uploading && (
              <Box my={2}>
                <LinearProgress variant="determinate" value={progress} />
                <Typography variant="caption" align="center" display="block">
                  {progress}% Uploaded
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
      
      <Card className={classes.card}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              Logs
            </Typography>
            <Button size="small" onClick={clearLogs}>Clear Logs</Button>
          </Box>
          
          <div className={classes.logText}>
            {logs.length > 0 ? logs.join('\n') : 'No logs yet.'}
          </div>
        </CardContent>
      </Card>
      
      {(results.success !== null) && (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Results
            </Typography>
            
            {results.success ? (
              <>
                <Typography variant="body1" className={classes.successText} gutterBottom>
                  Upload Successful ✓
                </Typography>
                
                {results.response && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">Response:</Typography>
                    <div className={classes.logText}>
                      {JSON.stringify(results.response, null, 2)}
                    </div>
                  </Box>
                )}
              </>
            ) : (
              <>
                <Typography variant="body1" className={classes.errorText} gutterBottom>
                  Upload Failed ✗
                </Typography>
                
                {results.error && (
                  <Box mt={2}>
                    <Typography variant="subtitle2">Error Details:</Typography>
                    <div className={classes.logText}>
                      {JSON.stringify(results.error, null, 2)}
                    </div>
                  </Box>
                )}
              </>
            )}
            
            <Box mt={2}>
              <Button variant="outlined" onClick={resetAll}>
                Reset
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default UploadTester; 