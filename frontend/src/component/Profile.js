import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  Container,
  Box,
  Divider,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardHeader,
  Fade,
  Chip,
  CircularProgress,
  Tooltip,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import ImprovedFileUpload from "../lib/ImprovedFileUpload";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import SchoolIcon from "@material-ui/icons/School";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CodeIcon from "@material-ui/icons/Code";
import PersonIcon from "@material-ui/icons/Person";

import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "93vh",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  header: {
    marginBottom: theme.spacing(6),
    textAlign: "center",
    "& h2": {
      fontWeight: 600,
      position: "relative",
      display: "inline-block",
      marginBottom: theme.spacing(1),
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: -8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 80,
        height: 4,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  profileSection: {
    marginBottom: theme.spacing(4),
  },
  profileCard: {
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    borderRadius: theme.shape.borderRadius * 2,
    overflow: "hidden",
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
      transform: "translateY(-4px)",
    },
  },
  profileHeader: {
    display: "flex",
    paddingBottom: theme.spacing(2),
    "& .MuiCardHeader-title": {
      fontWeight: 600,
    },
    backgroundColor: theme.palette.primary.main + "10", // Light shade of primary color
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  avatar: {
    width: 130,
    height: 130,
    margin: theme.spacing(2, "auto"),
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    border: `4px solid ${theme.palette.background.paper}`,
  },
  avatarSmall: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  profileInfo: {
    padding: theme.spacing(4),
  },
  sectionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  },
  inputBox: {
    marginBottom: theme.spacing(3),
  },
  skillChip: {
    margin: theme.spacing(0.5),
    backgroundColor: theme.palette.primary.light + "40",
    color: theme.palette.primary.dark,
    borderRadius: 50,
    fontWeight: 500,
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      transform: "translateY(-2px)",
    },
  },
  educationCard: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3),
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    borderRadius: theme.shape.borderRadius,
    position: "relative",
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transform: "translateY(-3px)",
    },
  },
  educationActions: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    "& > *": {
      marginLeft: theme.spacing(0.5),
    },
  },
  addButton: {
    marginTop: theme.spacing(2),
    borderRadius: 50,
    fontWeight: 500,
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: theme.spacing(1, 3),
    "& svg": {
      marginRight: theme.spacing(0.5),
    },
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    },
  },
  updateButton: {
    marginTop: theme.spacing(4),
    borderRadius: 50,
    padding: theme.spacing(1.2, 4),
    fontWeight: 600,
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    "& svg": {
      marginRight: theme.spacing(1),
    },
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-3px)",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
    },
  },
  resumePreview: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    border: `1px dashed ${theme.palette.primary.light}`,
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transform: "translateY(-2px)",
    },
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  },
  fileInputContainer: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginBottom: theme.spacing(1),
    },
  },
  popupDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  personalInfoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
  },
  skillsContainer: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius * 2,
    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
    height: "100%",
  },
  profileName: {
    fontWeight: 600,
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  sectionIcon: {
    backgroundColor: theme.palette.primary.main + "20",
    padding: theme.spacing(1),
    borderRadius: "50%",
    marginRight: theme.spacing(1.5),
    color: theme.palette.primary.main,
  },
  chipWrapper: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(1),
  },
  viewResumeBtn: {
    marginLeft: "auto",
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light + "20",
    "&:hover": {
      backgroundColor: theme.palette.primary.light + "40",
    },
  },
  noData: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    backgroundColor: "#f5f5f5",
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.text.secondary,
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { education, setEducation } = props;

  const handleRemoveEducation = (index) => {
    const newEducation = [...education];
    newEducation.splice(index, 1);
    setEducation(newEducation);
  };

  return (
    <>
      {education.map((edu, index) => (
        <Fade in timeout={300 + index * 100} key={index}>
          <Paper className={classes.educationCard} elevation={0}>
            <div className={classes.educationActions}>
              <Tooltip title="Remove">
                <IconButton 
                  size="small" 
                  color="secondary" 
                  onClick={() => handleRemoveEducation(index)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            
            <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 600 }}>
              Education #{index + 1}
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
            <TextField
                  label="Institution Name"
                  value={education[index].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                    newEdu[index].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
                  placeholder="Enter your school/college name"
            />
          </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
              label="Start Year"
                  value={edu.startYear}
              variant="outlined"
              type="number"
                  placeholder="YYYY"
                  fullWidth
              onChange={(event) => {
                const newEdu = [...education];
                    newEdu[index].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
              <Grid item xs={12} sm={6}>
            <TextField
              label="End Year"
                  value={edu.endYear}
              variant="outlined"
              type="number"
                  placeholder="YYYY or leave blank if current"
                  fullWidth
              onChange={(event) => {
                const newEdu = [...education];
                    newEdu[index].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
          </Paper>
        </Fade>
      ))}
      
        <Button
        variant="outlined"
        color="primary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
        className={classes.addButton}
        startIcon={<AddIcon />}
        >
        Add Education
        </Button>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
    cgpa: 0,
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Profile data received:", response.data);
        setProfileDetails(response.data);
        if (response.data.education && response.data.education.length > 0) {
          setEducation(
            response.data.education.map((edu) => ({
              institutionName: edu.institutionName ? edu.institutionName : "",
              startYear: edu.startYear ? edu.startYear : "",
              endYear: edu.endYear ? edu.endYear : "",
            }))
          );
        } else {
          setEducation([{
            institutionName: "",
            startYear: "",
            endYear: "",
          }]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Failed to fetch profile data",
        });
        setLoading(false);
      });
  };

  const handleUpdate = () => {
    setUpdating(true);

    let updatedDetails = {
      ...profileDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
        setUpdating(false);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data.message || "Failed to update profile",
        });
        setUpdating(false);
      });
  };

  const profilePicUrl = profileDetails.profile 
    ? `${apiList.host}${profileDetails.profile}` 
    : null;
    
  const resumeUrl = profileDetails.resume
    ? `${apiList.host}${profileDetails.resume}`
    : null;

  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <div className={classes.header}>
          <Typography variant="h2">Your Profile</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Manage your personal information, education, skills and documents
          </Typography>
        </div>
        
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" my={8}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : (
          <Fade in timeout={500}>
            <div>
              <Grid container spacing={4}>
                {/* Personal Information Section */}
                <Grid item xs={12} md={4}>
                  <Card className={classes.profileCard} elevation={0}>
                    <CardHeader
                      className={classes.profileHeader}
                      title="Personal Information"
                      avatar={
                        <Avatar className={classes.avatarSmall}>
                          <PersonIcon />
                        </Avatar>
                      }
                    />
                    <CardContent>
                      <Box className={classes.personalInfoContainer}>
                        <Avatar 
                          src={profilePicUrl} 
                          className={classes.avatar}
                          alt={profileDetails.name}
                        >
                          {!profilePicUrl && profileDetails.name ? profileDetails.name.charAt(0).toUpperCase() : <FaceIcon fontSize="large" />}
                        </Avatar>
                        
                        <Typography variant="h6" className={classes.profileName}>
                          {profileDetails.name || "Add Your Name"}
                        </Typography>
                        
                        <Box mt={4} width="100%">
                <TextField
                            label="Full Name"
                  value={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  variant="outlined"
                  fullWidth
                            placeholder="Enter your full name"
                            className={classes.inputBox}
                          />
                          
                          <Box mt={2} className={classes.fileInputContainer}>
                            <ImprovedFileUpload
                              label="Profile Photo (.jpg/.png)"
                              icon={<FaceIcon />}
                              uploadTo={apiList.uploadProfileImage}
                              handleInput={handleInput}
                              identifier="profile"
                            />
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
              </Grid>
                
                {/* Skills Section */}
                <Grid item xs={12} md={8}>
                  <Card className={classes.profileCard} elevation={0}>
                    <CardHeader
                      className={classes.profileHeader}
                      title="Skills"
                      avatar={
                        <Avatar className={classes.avatarSmall}>
                          <CodeIcon />
                        </Avatar>
                      }
                    />
                    <CardContent>
                      <Box className={classes.skillsContainer}>
                        <Typography variant="subtitle1" gutterBottom>
                          Add your technical and professional skills to showcase your expertise
                        </Typography>
                        
                <ChipInput
                  label="Skills"
                  variant="outlined"
                          placeholder="Add skills and press Enter"
                          helperText="Press enter to add each skill"
                          fullWidth
                  value={profileDetails.skills}
                  onAdd={(chip) =>
                    setProfileDetails({
                      ...profileDetails,
                      skills: [...profileDetails.skills, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                            let skills = [...profileDetails.skills];
                    skills.splice(index, 1);
                    setProfileDetails({
                      ...profileDetails,
                      skills: skills,
                    });
                  }}
                          chipRenderer={({ value, handleDelete }, key) => (
                            <Chip
                              key={key}
                              label={value}
                              className={classes.skillChip}
                              onDelete={handleDelete}
                            />
                          )}
                        />
                        
                        {profileDetails.skills && profileDetails.skills.length === 0 && (
                          <Box mt={3} className={classes.noData}>
                            <Typography variant="body2">
                              No skills added yet. Add skills to increase your visibility to recruiters.
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
              </Grid>
                
                {/* Resume Section */}
                <Grid item xs={12}>
                  <Card className={classes.profileCard} elevation={0}>
                    <CardHeader
                      className={classes.profileHeader}
                      title="Resume / CV"
                      avatar={
                        <Avatar className={classes.avatarSmall}>
                          <DescriptionIcon />
                        </Avatar>
                      }
                    />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="subtitle1" gutterBottom>
                            Upload your resume to share with employers
                          </Typography>
                          
                <ImprovedFileUpload
                  label="Resume (.pdf)"
                  icon={<DescriptionIcon />}
                  uploadTo={apiList.uploadResume}
                  handleInput={handleInput}
                  identifier="resume"
                />
              </Grid>
                        
                        <Grid item xs={12} md={6}>
                          {resumeUrl ? (
                            <Fade in timeout={500}>
                              <Box className={classes.resumePreview}>
                                <DescriptionIcon />
                                <Typography variant="body1">
                                  Resume uploaded successfully
                                </Typography>
                                <Tooltip title="View Resume">
                                  <IconButton 
                                    size="small" 
                                    className={classes.viewResumeBtn}
                                    onClick={() => window.open(resumeUrl, "_blank")}
                                  >
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Fade>
                          ) : (
                            <Box className={classes.noData}>
                              <Typography variant="body2">
                                No resume uploaded yet. Upload your resume to apply for jobs.
                              </Typography>
                            </Box>
                          )}
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                
                {/* Education Section */}
                <Grid item xs={12}>
                  <Card className={classes.profileCard} elevation={0}>
                    <CardHeader
                      className={classes.profileHeader}
                      title="Education"
                      avatar={
                        <Avatar className={classes.avatarSmall}>
                          <SchoolIcon />
                        </Avatar>
                      }
                    />
                    <CardContent>
                      <Typography variant="subtitle1" gutterBottom>
                        Add your educational background to showcase your qualifications
                      </Typography>
                      
                      <Box mt={3}>
                        <MultifieldInput
                          education={education}
                          setEducation={setEducation}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card className={classes.profileCard}>
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <SchoolIcon className={classes.sectionIcon} />
                        <Typography variant="h6" className={classes.sectionTitle}>Academic Details</Typography>
                      </Box>
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            label="CGPA (scale of 10)"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={profileDetails.cgpa}
                            onChange={(e) => handleInput("cgpa", parseFloat(e.target.value) || 0)}
                            inputProps={{
                              min: 0,
                              max: 10,
                              step: 0.1
                            }}
                            helperText="Your CGPA will be considered for job eligibility"
                            className={classes.formField}
                />
              </Grid>
            </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              
              {/* Update Button */}
              <Box display="flex" justifyContent="center" mt={6}>
            <Button
              variant="contained"
              color="primary"
                  className={classes.updateButton}
                  onClick={handleUpdate}
                  disabled={updating}
                  startIcon={updating ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  size="large"
                >
                  {updating ? "Saving Profile..." : "Save Profile"}
            </Button>
              </Box>
            </div>
          </Fade>
        )}
      </Container>
    </div>
  );
};

export default Profile;
