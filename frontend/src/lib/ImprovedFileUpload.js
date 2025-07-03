import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  LinearProgress,
  Typography,
  Box,
  CircularProgress,
  Paper,
  makeStyles,
} from "@material-ui/core";
import { CloudUpload, CheckCircle, Error as ErrorIcon } from "@material-ui/icons";
import Axios from "axios";
import { SetPopupContext } from "../App";

const useStyles = makeStyles((theme) => ({
  fileInfoContainer: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
  },
  successIcon: {
    color: theme.palette.success.main,
  },
  errorIcon: {
    color: theme.palette.error.main,
  },
  fileDetails: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  uploadButton: {
    height: "100%",
  },
}));

const ImprovedFileUpload = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;
  const isResume = identifier === "resume";
  const acceptedFileTypes = isResume ? ".pdf" : ".jpg,.jpeg,.png";
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [fileError, setFileError] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Reset success status when file changes
  useEffect(() => {
    if (file) {
      setUploadSuccess(false);
    }
  }, [file]);

  const validateFile = (selectedFile) => {
    if (!selectedFile) {
      setFileError("No file selected");
      return false;
    }

    if (selectedFile.size > maxFileSize) {
      setFileError(`File size exceeds limit (max: 10MB, your file: ${(selectedFile.size / 1024 / 1024).toFixed(2)}MB)`);
      return false;
    }

    const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
    
    if (isResume && fileExtension !== "pdf") {
      setFileError("Only PDF files are allowed for resumes");
      return false;
    } else if (!isResume && !["jpg", "jpeg", "png"].includes(fileExtension)) {
      setFileError("Only JPG and PNG files are allowed for profile photos");
      return false;
    }

    setFileError("");
    return true;
  };

  const handleFileSelect = (event) => {
    setUploadPercentage(0);
    setUploadSuccess(false);
    
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      console.log("Selected file:", selectedFile.name, "Size:", (selectedFile.size / 1024 / 1024).toFixed(2) + "MB");
      
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setFileSize(selectedFile.size);
      } else {
        setFile(null);
        setFileName("");
        setFileSize(0);
        
        // Show popup for error
        setPopup({
          open: true,
          severity: "error",
          message: fileError,
        });
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      setPopup({
        open: true,
        severity: "error",
        message: "Please select a file to upload",
      });
      return;
    }

    if (!validateFile(file)) {
      setPopup({
        open: true,
        severity: "error",
        message: fileError,
      });
      return;
    }

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    console.log(`DEBUG: Starting upload to ${uploadTo}`);
    console.log(`DEBUG: File type: ${file.type}, size: ${formatFileSize(file.size)}`);
    console.log(`DEBUG: Upload headers:`, {
      "Content-Type": "multipart/form-data",
    });
    
    Axios.post(uploadTo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentage = parseInt(
          Math.round((progressEvent.loaded * 100) / progressEvent.total)
        );
        setUploadPercentage(percentage);
        console.log(`Upload progress: ${percentage}%`);
      },
    })
      .then((response) => {
        console.log("DEBUG: Upload success response:", response);
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setUploading(false);
        setUploadSuccess(true);
      })
      .catch((err) => {
        console.error("DEBUG: Upload error details:", { 
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          message: err.message,
          stack: err.stack
        });
        
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || 
                   err.response?.statusText || 
                   "Error uploading file. Please try again.",
        });
        setUploading(false);
        setUploadSuccess(false);
      });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid container item spacing={2} alignItems="stretch">
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            fullWidth
            className={classes.uploadButton}
            disabled={uploading}
          >
            {props.icon || "Select File"}
            <input
              type="file"
              accept={acceptedFileTypes}
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={props.label || (isResume ? "Resume" : "Profile Photo")}
            value={fileName}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
            error={!!fileError}
            helperText={fileError}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            className={classes.uploadButton}
            onClick={handleUpload}
            disabled={!file || uploading || uploadSuccess}
            startIcon={
              uploading ? (
                <CircularProgress size={20} color="inherit" />
              ) : uploadSuccess ? (
                <CheckCircle />
              ) : (
                <CloudUpload />
              )
            }
          >
            {uploading 
              ? "Uploading..." 
              : uploadSuccess 
                ? "Uploaded" 
                : "Upload"}
          </Button>
        </Grid>
      </Grid>

      {file && (
        <Grid item xs={12} className={classes.fileInfoContainer}>
          <div className={classes.fileDetails}>
            {uploadSuccess ? (
              <CheckCircle className={classes.successIcon} />
            ) : fileError ? (
              <ErrorIcon className={classes.errorIcon} />
            ) : null}
            <Typography variant="body2">
              {fileName} ({formatFileSize(fileSize)})
            </Typography>
          </div>
          
          {uploadPercentage > 0 && (
            <Box mt={1}>
              <LinearProgress 
                variant="determinate" 
                value={uploadPercentage} 
                color={uploadSuccess ? "primary" : "secondary"}
              />
              <Typography variant="caption" align="center" display="block">
                {uploadPercentage}% {uploadSuccess ? "Complete" : "Uploaded"}
              </Typography>
            </Box>
          )}
        </Grid>
      )}
    </Grid>
  );
};

export default ImprovedFileUpload; 