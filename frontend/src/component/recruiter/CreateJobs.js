import { useContext, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
  Container,
  Box,
  Divider,
  Card,
  CardContent,
  Tooltip,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  CircularProgress,
} from "@material-ui/core";
import {
  WorkOutline as JobIcon,
  AttachMoney as SalaryIcon,
  Timer as DurationIcon,
  DateRange as DeadlineIcon,
  Group as ApplicantsIcon,
  Create as SkillsIcon,
  School as EducationIcon,
  Info as InfoIcon,
  Add as AddIcon,
} from "@material-ui/icons";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "93vh",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  header: {
    marginBottom: theme.spacing(4),
    textAlign: "center",
    "& h2": {
      fontWeight: 600,
      position: "relative",
      display: "inline-block",
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
  formCard: {
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    borderRadius: theme.shape.borderRadius * 2,
    padding: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.primary.main,
    },
  },
  formSection: {
    marginBottom: theme.spacing(4),
  },
  formField: {
    marginBottom: theme.spacing(3),
  },
  chipInput: {
    marginBottom: theme.spacing(3),
    "& .MuiOutlinedInput-root": {
      paddingTop: 12,
    },
  },
  submitButton: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5, 6),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius * 5,
    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
    transition: "all 0.2s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
  },
  helperCard: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(2),
  },
  stepperContainer: {
    marginBottom: theme.spacing(5),
  },
  infoIcon: {
    fontSize: 18,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(1),
  },
  fieldInfoTooltip: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[3],
    fontSize: 14,
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.divider}`,
    maxWidth: 300,
  },
}));

// Helper tooltips for form fields
const fieldTooltips = {
  title: "Enter a clear and concise job title that accurately reflects the position",
  skills: "Add key skills required for the position (e.g., JavaScript, Project Management, Communication)",
  jobType: "Select the employment type for this position",
  duration: "Specify how long the position is expected to last",
  salary: "Enter the annual salary or monthly stipend amount",
  deadline: "Set the last date and time for receiving applications",
  maxApplicants: "Set a limit on how many applications you want to receive",
  maxPositions: "Enter the number of employees you need to hire for this role",
  minimumCGPA: "Set minimum academic performance requirement (scale of 10) or 0 for no requirement",
};

const CreateJobs = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [loading, setLoading] = useState(false);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    maxApplicants: 100,
    maxPositions: 30,
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    duration: 0,
    salary: 0,
    minimumCGPA: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    if (!jobDetails.title) {
      setPopup({
        open: true,
        severity: "error",
        message: "Job title cannot be empty",
      });
      return;
    }

    setLoading(true);
    console.log("Sending job details to server:", jobDetails);
    axios
      .post(apiList.jobs, jobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        setJobDetails({
          title: "",
          maxApplicants: 100,
          maxPositions: 30,
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          duration: 0,
          salary: 0,
          minimumCGPA: 0,
        });
      })
      .catch((err) => {
        setLoading(false);
        setPopup({
          open: true,
          severity: "error",
          message: err.response?.data?.message || "Something went wrong",
        });
        console.log(err.response);
      });
  };

  // Custom tooltip for field info
  const FieldInfoTooltip = ({ title }) => (
    <Tooltip
      title={title}
      arrow
      placement="top"
      classes={{ tooltip: classes.fieldInfoTooltip }}
    >
      <IconButton size="small" className={classes.infoIcon}>
        <InfoIcon fontSize="inherit" />
      </IconButton>
    </Tooltip>
  );

  return (
    <div className={classes.root}>
      <Container maxWidth="md">
        <div className={classes.header}>
          <Typography variant="h2">Post a New Job</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Create a job listing to find the perfect candidate
          </Typography>
        </div>

        <Paper elevation={0} className={classes.formCard}>
          <Box className={classes.stepperContainer}>
            <Stepper activeStep={0} alternativeLabel>
              <Step>
                <StepLabel>Create Job</StepLabel>
              </Step>
              <Step>
                <StepLabel>Review Applications</StepLabel>
              </Step>
              <Step>
                <StepLabel>Select Candidates</StepLabel>
              </Step>
            </Stepper>
          </Box>

          <div className={classes.formSection}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <JobIcon /> Basic Job Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  value={jobDetails.title}
                  onChange={(event) => handleInput("title", event.target.value)}
                  variant="outlined"
                  fullWidth
                  placeholder="e.g. Frontend Developer, Project Manager, etc."
                  required
                  InputProps={{
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.title} />,
                  }}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Job Type"
                  variant="outlined"
                  value={jobDetails.jobType}
                  onChange={(event) => {
                    handleInput("jobType", event.target.value);
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <JobIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.jobType} />,
                  }}
                  className={classes.formField}
                >
                  <MenuItem value="Full Time">Full Time</MenuItem>
                  <MenuItem value="Part Time">Part Time</MenuItem>
                  <MenuItem value="Work From Home">Work From Home</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  label="Duration"
                  variant="outlined"
                  value={jobDetails.duration}
                  onChange={(event) => {
                    handleInput("duration", event.target.value);
                  }}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DurationIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.duration} />,
                  }}
                  className={classes.formField}
                >
                  <MenuItem value={0}>Flexible</MenuItem>
                  <MenuItem value={1}>1 Month</MenuItem>
                  <MenuItem value={2}>2 Months</MenuItem>
                  <MenuItem value={3}>3 Months</MenuItem>
                  <MenuItem value={4}>4 Months</MenuItem>
                  <MenuItem value={5}>5 Months</MenuItem>
                  <MenuItem value={6}>6 Months</MenuItem>
                  <MenuItem value={12}>1 Year</MenuItem>
                  <MenuItem value={24}>2 Years</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </div>

          <Divider />

          <div className={classes.formSection}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <SkillsIcon /> Requirements & Qualifications
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ChipInput
                  className={classes.chipInput}
                  label="Required Skills"
                  variant="outlined"
                  helperText="Press enter after each skill"
                  placeholder="Add skills like 'JavaScript', 'Project Management', etc."
                  value={jobDetails.skillsets}
                  onAdd={(chip) =>
                    setJobDetails({
                      ...jobDetails,
                      skillsets: [...jobDetails.skillsets, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                    let skillsets = jobDetails.skillsets;
                    skillsets.splice(index, 1);
                    setJobDetails({
                      ...jobDetails,
                      skillsets: skillsets,
                    });
                  }}
                  fullWidth
                  InputProps={{
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.skills} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Minimum CGPA Required"
                  type="number"
                  variant="outlined"
                  value={jobDetails.minimumCGPA}
                  onChange={(event) => {
                    handleInput("minimumCGPA", parseFloat(event.target.value) || 0);
                  }}
                  InputProps={{
                    inputProps: {
                      min: 0,
                      max: 10,
                      step: 0.1,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EducationIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.minimumCGPA} />,
                  }}
                  helperText="On a scale of 10. Set 0 for no CGPA requirement"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Salary"
                  type="number"
                  variant="outlined"
                  value={jobDetails.salary}
                  onChange={(event) => {
                    handleInput("salary", event.target.value);
                  }}
                  InputProps={{
                    inputProps: { min: 0 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <SalaryIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.salary} />,
                  }}
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
            </Grid>
          </div>

          <Divider />

          <div className={classes.formSection}>
            <Typography variant="h6" className={classes.sectionTitle}>
              <DeadlineIcon /> Application Settings
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Application Deadline"
                  type="datetime-local"
                  value={jobDetails.deadline}
                  onChange={(event) => {
                    handleInput("deadline", event.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.deadline} />,
                  }}
                  variant="outlined"
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Maximum Number Of Applicants"
                  type="number"
                  variant="outlined"
                  value={jobDetails.maxApplicants}
                  onChange={(event) => {
                    handleInput("maxApplicants", event.target.value);
                  }}
                  InputProps={{
                    inputProps: { min: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <ApplicantsIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.maxApplicants} />,
                  }}
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Positions Available"
                  type="number"
                  variant="outlined"
                  value={jobDetails.maxPositions}
                  onChange={(event) => {
                    handleInput("maxPositions", event.target.value);
                  }}
                  InputProps={{
                    inputProps: { min: 1 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <ApplicantsIcon color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: <FieldInfoTooltip title={fieldTooltips.maxPositions} />,
                  }}
                  fullWidth
                  className={classes.formField}
                />
              </Grid>
            </Grid>
          </div>

          <Card variant="outlined" className={classes.helperCard}>
            <CardContent>
              <Typography variant="subtitle2" color="textSecondary">
                <InfoIcon fontSize="small" style={{ verticalAlign: 'middle', marginRight: 8 }} />
                Tip: Clear job descriptions attract more qualified candidates. Be specific about requirements and responsibilities.
              </Typography>
            </CardContent>
          </Card>

          <Box display="flex" justifyContent="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              className={classes.submitButton}
              onClick={handleUpdate}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
              size="large"
            >
              {loading ? "Creating Job..." : "Post Job"}
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default CreateJobs;
