import { useState, useContext } from "react";
import { Grid, Button, TextField, LinearProgress } from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import Axios from "axios";

import { SetPopupContext } from "../App";

const FileUploadInput = (props) => {
  const setPopup = useContext(SetPopupContext);

  const { uploadTo, identifier, handleInput } = props;
  const acceptedFileTypes = props.identifier === "resume" ? ".pdf" : ".jpg,.jpeg,.png";

  const [file, setFile] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    if (!file) {
      setPopup({
        open: true,
        severity: "error",
        message: "Please select a file to upload",
      });
      return;
    }
    
    // Validate file type
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (identifier === "resume" && fileExtension !== "pdf") {
      setPopup({
        open: true,
        severity: "error",
        message: "Only PDF files are allowed for resume uploads",
      });
      return;
    } else if (identifier === "profile" && !["jpg", "jpeg", "png"].includes(fileExtension)) {
      setPopup({
        open: true,
        severity: "error",
        message: "Only JPG and PNG files are allowed for profile photos",
      });
      return;
    }
    
    console.log("Uploading file:", file.name, "Size:", (file.size / 1024 / 1024).toFixed(2) + "MB");
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    
    Axios.post(uploadTo, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        setUploadPercentage(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    })
      .then((response) => {
        console.log("Upload response:", response.data);
        handleInput(identifier, response.data.url);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setUploading(false);
      })
      .catch((err) => {
        console.log("Upload error:", err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || err.response?.statusText || "Error uploading file",
        });
        setUploading(false);
      });
  };

  return (
    <Grid container item xs={12} direction="column" className={props.className}>
      <Grid container item xs={12} spacing={0}>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="primary"
            component="label"
            style={{ width: "100%", height: "100%" }}
            disabled={uploading}
          >
            {props.icon}
            <input
              type="file"
              accept={acceptedFileTypes}
              style={{ display: "none" }}
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  console.log("Selected file:", event.target.files[0]);
                  setUploadPercentage(0);
                  setFile(event.target.files[0]);
                }
              }}
            />
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField
            label={props.label}
            value={file ? file.name || "" : ""}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            color="secondary"
            style={{ width: "100%", height: "100%" }}
            onClick={() => handleUpload()}
            disabled={!file || uploading}
          >
            {uploading ? "Uploading..." : <CloudUpload />}
          </Button>
        </Grid>
      </Grid>
      {uploadPercentage !== 0 ? (
        <Grid item xs={12} style={{ marginTop: "10px" }}>
          <LinearProgress variant="determinate" value={uploadPercentage} />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FileUploadInput;
