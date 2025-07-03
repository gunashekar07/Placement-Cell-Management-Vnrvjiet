import { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
  CircularProgress,
  Divider,
  Box,
  Container,
  Avatar,
  Card,
  CardContent,
  Fade,
  IconButton,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import {
  Person as PersonIcon,
  Save as SaveIcon,
  AccountCircle as AccountCircleIcon,
  Work as WorkIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Refresh as RefreshIcon,
  Security as SecurityIcon,
} from "@material-ui/icons";

import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import isAuth from "../../lib/isAuth";
import { userType } from "../../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  container: {
    marginTop: theme.spacing(4),
  },
  pageHeader: {
    marginBottom: theme.spacing(3),
    "& h4": {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    "& p": {
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(0.5),
    },
  },
  headerIcon: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    color: "#fff",
  },
  profileCard: {
    padding: theme.spacing(3),
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    borderRadius: 16,
    transition: "transform 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-5px)",
    },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  section: {
    marginBottom: theme.spacing(3),
    "& h6": {
      marginBottom: theme.spacing(2),
      fontWeight: 600,
    },
  },
  button: {
    borderRadius: theme.spacing(3),
    padding: theme.spacing(1, 3),
    fontWeight: 600,
    textTransform: "none",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  roleLabel: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
    padding: theme.spacing(0.5, 1.5),
    borderRadius: 20,
    display: "inline-block",
    fontWeight: 500,
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  inputContainer: {
    position: "relative",
  },
  saveButton: {
    marginTop: theme.spacing(2),
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
  },
  errorMessage: {
    textAlign: "center",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
    marginBottom: theme.spacing(3),
  },
  profileCardHeader: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}dd 30%, ${theme.palette.secondary.main}dd 90%)`,
    padding: theme.spacing(3),
    color: "#fff",
    position: "relative",
  },
  titleIcon: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#fff",
    padding: theme.spacing(1),
    borderRadius: "12px",
    marginRight: theme.spacing(2),
  },
  profileCardContent: {
    padding: theme.spacing(4),
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    "& .icon": {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.main + "20",
      padding: theme.spacing(1),
      borderRadius: "8px",
    },
  },
  formControl: {
    position: "relative",
    marginBottom: theme.spacing(3),
  },
  fieldIcon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  refreshButton: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
  profileAvatar: {
    width: 120,
    height: 120,
    margin: "0 auto",
    border: "5px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  securityCard: {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
    height: "100%",
  },
  securityCardHeader: {
    background: `linear-gradient(45deg, ${theme.palette.secondary.main}dd 30%, ${theme.palette.secondary.dark}dd 90%)`,
    padding: theme.spacing(2),
    color: "#fff",
  },
  securityCardContent: {
    padding: theme.spacing(3),
  },
}));

const Profile = () => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    email: "",
    contactNumber: "",
  });
  const [editing, setEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    role: "",
    contactNumber: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    setError(null);
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setProfileData({
          name: response.data.name,
          role: response.data.role || "System Administrator",
          email: response.data.email,
          contactNumber: response.data.contactNumber,
        });
        setUserData({
          name: response.data.name,
          role: response.data.role || "System Administrator",
          contactNumber: response.data.contactNumber,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        if (err.response && err.response.status === 404) {
          setError("Your admin profile was not found. Please contact system support.");
        } else {
          setError("Error fetching profile data. Please try again later.");
        }
      });
  };

  const handleUpdate = () => {
    setLoading(true);
    axios
      .put(
        apiList.user,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
        setEditing(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message
            ? err.response.data.message
            : "Error updating profile",
        });
        setLoading(false);
      });
  };

  const getInitials = (name) => {
    if (!name) return "A";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (userType() !== "admin") {
    return <Redirect to="/admin" />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.pageHeader}>
          <Avatar className={classes.headerIcon}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h4">Profile</Typography>
          <Typography>Manage your personal information and account</Typography>
        </Box>

        {loading ? (
          <Box className={classes.loadingContainer}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Paper className={classes.errorMessage}>
            <Typography variant="body1">{error}</Typography>
          </Paper>
        ) : (
          <Fade in={true} timeout={500}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper className={classes.profileCard}>
                  <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                    <Avatar className={classes.avatar}>
                      {profileData.name ? profileData.name.charAt(0).toUpperCase() : "A"}
                    </Avatar>
                    <Typography variant="h6">{profileData.name}</Typography>
                    <Typography variant="body2" color="textSecondary">{profileData.email}</Typography>
                    <Box className={classes.roleLabel}>
                      <Typography variant="body2">{profileData.role}</Typography>
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={8}>
                <Paper className={classes.profileCard}>
                  <Box className={classes.section}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">Personal Information</Typography>
                      {!editing ? (
                        <Tooltip title="Edit Profile">
                          <IconButton 
                            color="primary" 
                            onClick={() => setEditing(true)}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Save Changes">
                          <IconButton 
                            color="primary" 
                            onClick={handleUpdate}
                          >
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.formField}
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          value={userData.name}
                          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <AccountCircleIcon className={classes.fieldIcon} />,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.formField}
                          label="Role"
                          variant="outlined"
                          fullWidth
                          value={userData.role}
                          onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                          disabled={!editing}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.formField}
                          label="Contact Number"
                          variant="outlined"
                          fullWidth
                          value={userData.contactNumber}
                          onChange={(e) => setUserData({ ...userData, contactNumber: e.target.value })}
                          disabled={!editing}
                          InputProps={{
                            startAdornment: <PhoneIcon className={classes.fieldIcon} />,
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          className={classes.formField}
                          label="Email Address"
                          variant="outlined"
                          fullWidth
                          value={profileData.email}
                          disabled
                        />
                      </Grid>
                    </Grid>

                    {editing && (
                      <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button 
                          variant="outlined" 
                          color="secondary" 
                          className={classes.button}
                          onClick={() => {
                            setUserData({
                              name: profileData.name,
                              role: profileData.role,
                              contactNumber: profileData.contactNumber
                            });
                            setEditing(false);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          className={classes.button}
                          onClick={handleUpdate}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} /> : "Save Changes"}
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        )}
      </Container>
    </div>
  );
};

export default Profile; 