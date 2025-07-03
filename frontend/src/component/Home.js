import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Container,
  Box,
  Divider,
  Card,
  CardContent,
  Avatar,
  Badge,
  Fade,
  Zoom,
  useTheme,
  CircularProgress,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import BusinessIcon from "@material-ui/icons/Business";
import WorkIcon from "@material-ui/icons/Work";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import TimerIcon from "@material-ui/icons/Timer";
import EventIcon from "@material-ui/icons/Event";
import PersonIcon from "@material-ui/icons/Person";
import CloseIcon from "@material-ui/icons/Close";
import SchoolIcon from "@material-ui/icons/School";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundColor: theme.palette.background.default,
    minHeight: "93vh",
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  header: {
    marginBottom: theme.spacing(4),
    "& h2": {
      fontWeight: 600,
      position: "relative",
      display: "inline-block",
      marginBottom: theme.spacing(1),
      "&:after": {
        content: '""',
        position: "absolute",
        bottom: -8,
        left: 0,
        width: 40,
        height: 4,
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
  searchBox: {
    marginBottom: theme.spacing(4),
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  },
  searchInput: {
    [theme.breakpoints.up('md')]: {
      width: "500px",
    },
    [theme.breakpoints.down('sm')]: {
      width: "100%",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 50,
      backgroundColor: theme.palette.background.default,
      "& fieldset": {
        borderColor: theme.palette.divider,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.light,
      },
    },
  },
  filterButton: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.secondary,
    borderRadius: 50,
    padding: theme.spacing(1),
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
    },
  },
  jobTileOuter: {
    marginBottom: theme.spacing(3),
    boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
    borderRadius: theme.shape.borderRadius,
    transition: "transform 0.3s, box-shadow 0.3s",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    },
  },
  jobContent: {
    padding: theme.spacing(3),
  },
  jobTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
  },
  jobInfoItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
      fontSize: 20,
    },
  },
  salaryBadge: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
    fontWeight: 600,
    padding: theme.spacing(0.75, 2),
    borderRadius: 20,
    display: "inline-flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(0.5),
      fontSize: 16,
    },
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(2),
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  chip: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    borderRadius: 50,
    fontWeight: 500,
  },
  applyButton: {
    borderRadius: 50,
    padding: theme.spacing(1, 3),
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    transition: "all 0.3s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    },
  },
  companyAvatar: {
    width: 60,
    height: 60,
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    fontSize: 24,
    fontWeight: 600,
  },
  popupDialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(2),
  },
  popup: {
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    outline: "none",
    maxWidth: 600,
    width: "100%",
    position: "relative",
  },
  popupTitle: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  filterSection: {
    marginBottom: theme.spacing(3),
    "&:not(:last-child)": {
      borderBottom: `1px solid ${theme.palette.divider}`,
      paddingBottom: theme.spacing(3),
    },
  },
  filterTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(2),
  },
  noJobs: {
    textAlign: "center",
    padding: theme.spacing(8, 0),
    color: theme.palette.text.secondary,
    "& h5": {
      marginBottom: theme.spacing(2),
    },
  },
  noJobsIcon: {
    fontSize: 60,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.disabled,
  },
  pagination: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
  eligibilityChip: {
    marginLeft: theme.spacing(1),
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  },
}));

const JobTile = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { job } = props;
  const setPopup = useContext(SetPopupContext);
  
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");
  const [loading, setLoading] = useState(false);
  const [userCGPA, setUserCGPA] = useState(0);
  const [cgpaLoaded, setCgpaLoaded] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] = useState(true);
  
  // Fetch user's CGPA and check application status when component mounts
  useEffect(() => {
    if (userType() === "applicant") {
      // Fetch user's CGPA
      axios
        .get(apiList.user, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUserCGPA(response.data.cgpa || 0);
          setCgpaLoaded(true);
        })
        .catch((err) => {
          console.log(err.response);
          setCgpaLoaded(true);
          setPopup({
            open: true,
            severity: "error",
            message: "Error fetching user details",
          });
        });
      
      // Check if user has already applied to this job
      axios
        .get(apiList.applications, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const applications = response.data;
          const alreadyApplied = applications.some(
            (application) => application.jobId._id === job._id
          );
          setHasApplied(alreadyApplied);
          setCheckingApplication(false);
        })
        .catch((error) => {
          console.log(error.response);
          setCheckingApplication(false);
          setPopup({
            open: true,
            severity: "error",
            message: "Error checking application status",
          });
        });
    } else {
      setCgpaLoaded(true);
      setCheckingApplication(false);
    }
  }, [job._id, setPopup]);
  
  const handleClose = () => {
    setOpen(false);
    setSop("");
  };
  
  const handleApply = () => {
    if (hasApplied) {
      setPopup({
        open: true,
        severity: "error",
        message: "You have already applied for this job",
      });
      handleClose();
      return;
    }
    
    if (!sop.trim()) {
      setPopup({
        open: true,
        severity: "error",
        message: "Please write a Statement of Purpose",
      });
      return;
    }
    
    setLoading(true);
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop.trim(),
        },
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
        setHasApplied(true);
        handleClose();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message || "Error applying for the job",
        });
        handleClose();
        setLoading(false);
      });
  };

  const deadline = new Date(job.deadline).toLocaleDateString();
  const companyFirstLetter = job.recruiter.name.charAt(0).toUpperCase();

  return (
    <Zoom in timeout={500}>
      <Paper className={classes.jobTileOuter} elevation={0}>
        <div className={classes.jobContent}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={9}>
              <Typography variant="h5" className={classes.jobTitle}>
                {job.title}
              </Typography>
              
              <Box display="flex" alignItems="center" mb={1}>
                <Rating 
                  value={job.rating !== -1 ? job.rating : null} 
                  readOnly 
                  size="small"
                  style={{ marginRight: theme.spacing(1) }}
                />
                <Typography variant="body2" color="textSecondary">
                  {job.rating !== -1 ? `${job.rating.toFixed(1)} rating` : "Not rated yet"}
                </Typography>
              </Box>
              
              <div className={classes.jobInfoItem}>
                <WorkIcon />
                <Typography variant="body1">{job.jobType}</Typography>
              </div>
              
              <div className={classes.jobInfoItem}>
                <MonetizationOnIcon />
                <Box component="span" className={classes.salaryBadge}>
                  ₹{job.salary.toLocaleString()} per month
                </Box>
              </div>
              
              <div className={classes.jobInfoItem}>
                <TimerIcon />
                <Typography variant="body1">
                  {job.duration !== 0 ? `${job.duration} month${job.duration > 1 ? 's' : ''}` : `Flexible`}
                </Typography>
              </div>
              
              <div className={classes.jobInfoItem}>
                <SchoolIcon />
                <Typography variant="body1">
                  Min. CGPA: <strong style={{color: theme.palette.secondary.main}}>{job.minimumCGPA > 0 ? job.minimumCGPA.toFixed(1) : 'Not Required'}</strong>
                  {userType() === "applicant" && cgpaLoaded && job.minimumCGPA > 0 && (
                    <Chip
                      size="small"
                      label={userCGPA >= job.minimumCGPA ? "You qualify" : "You don't qualify"}
                      className={classes.eligibilityChip}
                      style={{
                        marginLeft: theme.spacing(1),
                        backgroundColor: userCGPA >= job.minimumCGPA 
                          ? theme.palette.success.light 
                          : theme.palette.error.light,
                        color: userCGPA >= job.minimumCGPA 
                          ? theme.palette.success.contrastText 
                          : theme.palette.error.contrastText
                      }}
                    />
                  )}
                </Typography>
              </div>
              
              <div className={classes.jobInfoItem}>
                <PersonIcon />
                <Typography variant="body1">{job.recruiter.name}</Typography>
              </div>
              
              <div className={classes.jobInfoItem}>
                <EventIcon />
                <Typography variant="body1">
                  Deadline: <strong>{deadline}</strong>
                </Typography>
              </div>
              
              <div className={classes.chipContainer}>
                {job.skillsets.map((skill, index) => (
                  <Chip 
                    key={index}
                    label={skill} 
                    className={classes.chip}
                    size="small" 
                  />
                ))}
              </div>
            </Grid>
            
            <Grid item xs={12} sm={3} container direction="column" alignItems="center" justify="space-between">
              <Avatar className={classes.companyAvatar}>
                {companyFirstLetter}
              </Avatar>
              
              <Button
                variant="contained"
                color="primary"
                className={classes.applyButton}
                onClick={() => {
                  if (hasApplied) {
                    setPopup({
                      open: true,
                      severity: "info",
                      message: "You have already applied for this job",
                    });
                    return;
                  }
                  
                  if (job.minimumCGPA > 0 && userCGPA < job.minimumCGPA) {
                    setPopup({
                      open: true,
                      severity: "error",
                      message: `Your CGPA (${userCGPA.toFixed(1)}) does not meet the minimum requirement (${job.minimumCGPA.toFixed(1)}) for this job.`,
                    });
                    return;
                  }
                  
                  setOpen(true);
                }}
                disabled={userType() === "recruiter" || !cgpaLoaded || checkingApplication || hasApplied}
                fullWidth
              >
                {hasApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </Grid>
          </Grid>
        </div>
        
        <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
          <Fade in={open}>
            <Paper className={classes.popup}>
              <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
              </IconButton>
              
              <Typography variant="h5" className={classes.popupTitle}>
                Statement of Purpose
              </Typography>
              
              <TextField
                label="Write SOP (upto 250 words)"
                multiline
                rows={8}
                fullWidth
                variant="outlined"
                value={sop}
                onChange={(event) => {
                  if (
                    event.target.value.split(" ").filter(function (n) {
                      return n != "";
                    }).length <= 250
                  ) {
                    setSop(event.target.value);
                  }
                }}
              />
              
              <Box mt={3} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.applyButton}
                  onClick={handleApply}
                  disabled={loading || hasApplied}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Application"}
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Modal>
      </Paper>
    </Zoom>
  );
};

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
      <Fade in={open}>
        <Paper className={classes.popup}>
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          
          <Typography variant="h5" className={classes.popupTitle}>
            Filter Jobs
          </Typography>
          
          <div className={classes.filterSection}>
            <Typography variant="subtitle1" className={classes.filterTitle}>
              Job Type
            </Typography>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    name="fullTime"
                    checked={searchOptions.jobType.fullTime}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                    color="primary"
                  />
                }
                label="Full Time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="partTime"
                    checked={searchOptions.jobType.partTime}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                    color="primary"
                  />
                }
                label="Part Time"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="wfh"
                    checked={searchOptions.jobType.wfh}
                    onChange={(event) => {
                      setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      });
                    }}
                    color="primary"
                  />
                }
                label="Work From Home"
              />
            </FormGroup>
          </div>
          
          <div className={classes.filterSection}>
            <Typography variant="subtitle1" className={classes.filterTitle}>
              Salary Range (₹ 1000)
            </Typography>
            <Slider
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => {
                return value * 1000;
              }}
              min={0}
              max={100}
              value={searchOptions.salary}
              onChange={(event, newValue) => {
                setSearchOptions({
                  ...searchOptions,
                  salary: newValue,
                });
              }}
            />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="body2" color="textSecondary">
                ₹{searchOptions.salary[0] * 1000}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ₹{searchOptions.salary[1] * 1000}
              </Typography>
            </Box>
          </div>
          
          <div className={classes.filterSection}>
            <Typography variant="subtitle1" className={classes.filterTitle}>
              Duration
            </Typography>
            <TextField
              select
              label="Duration"
              variant="outlined"
              fullWidth
              value={searchOptions.duration}
              onChange={(event) => {
                setSearchOptions({
                  ...searchOptions,
                  duration: event.target.value,
                });
              }}
            >
              <MenuItem value="0">All</MenuItem>
              <MenuItem value="1">1 Month</MenuItem>
              <MenuItem value="2">2 Months</MenuItem>
              <MenuItem value="3">3 Months</MenuItem>
              <MenuItem value="4">4 Months</MenuItem>
              <MenuItem value="5">5 Months</MenuItem>
              <MenuItem value="6">6 Months</MenuItem>
              <MenuItem value="7">7 Months</MenuItem>
            </TextField>
          </div>
          
          <div className={classes.filterSection}>
            <Typography variant="subtitle1" className={classes.filterTitle}>
              Sort By
            </Typography>
            
            <FormGroup>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Checkbox
                    name="salary"
                    checked={searchOptions.sort.salary.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    color="primary"
                  />
                </Grid>
                <Grid item>
                  <Typography>Salary</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.salary.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          salary: {
                            ...searchOptions.sort.salary,
                            desc: !searchOptions.sort.salary.desc,
                          },
                        },
                      });
                    }}
                    size="small"
                  >
                    {searchOptions.sort.salary.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Checkbox
                    name="duration"
                    checked={searchOptions.sort.duration.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    color="primary"
                  />
                </Grid>
                <Grid item>
                  <Typography>Duration</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.duration.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          duration: {
                            ...searchOptions.sort.duration,
                            desc: !searchOptions.sort.duration.desc,
                          },
                        },
                      });
                    }}
                    size="small"
                  >
                    {searchOptions.sort.duration.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Checkbox
                    name="rating"
                    checked={searchOptions.sort.rating.status}
                    onChange={(event) =>
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            status: event.target.checked,
                          },
                        },
                      })
                    }
                    color="primary"
                  />
                </Grid>
                <Grid item>
                  <Typography>Rating</Typography>
                </Grid>
                <Grid item>
                  <IconButton
                    disabled={!searchOptions.sort.rating.status}
                    onClick={() => {
                      setSearchOptions({
                        ...searchOptions,
                        sort: {
                          ...searchOptions.sort,
                          rating: {
                            ...searchOptions.sort.rating,
                            desc: !searchOptions.sort.rating.desc,
                          },
                        },
                      });
                    }}
                    size="small"
                  >
                    {searchOptions.sort.rating.desc ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
            </FormGroup>
          </div>
          
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              className={classes.applyButton}
              onClick={() => getData()}
            >
              Apply Filters
            </Button>
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );
};

const Home = (props) => {
  const classes = useStyles();
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const jobsPerPage = 5;
  
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  const setPopup = useContext(SetPopupContext);
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    let searchParams = [];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] != 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] != 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration != "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // Log each job to check if minimumCGPA field is present
        console.log("Jobs received from API:", response.data);
        if (response.data.length > 0) {
          console.log("First job data:", response.data[0]);
          console.log("First job minimumCGPA:", response.data[0].minimumCGPA);
        }
        
        setJobs(
          response.data.filter((obj) => {
            const today = new Date();
            const deadline = new Date(obj.deadline);
            return deadline > today;
          })
        );
        setPage(1);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching jobs",
        });
        setLoading(false);
      });
  };

  // Calculate pagination
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <div className={classes.body}>
      <Container>
        <div className={classes.header}>
          <Typography variant="h2">Browse Jobs</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Find your dream job from our listings
          </Typography>
        </div>
        
        <Paper className={classes.searchBox} elevation={0}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={9}>
              <TextField
                label="Search Jobs"
                placeholder="Job title, skills, or keywords"
                value={searchOptions.query}
                onChange={(event) =>
                  setSearchOptions({
                    ...searchOptions,
                    query: event.target.value,
                  })
                }
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    getData();
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                className={classes.searchInput}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3} container justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => getData()}
                className={classes.applyButton}
                style={{ marginRight: 8 }}
              >
                Search
              </Button>
              <IconButton 
                className={classes.filterButton} 
                onClick={() => setFilterOpen(true)}
                aria-label="Filter Jobs"
              >
                <FilterListIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" my={8}>
            <CircularProgress />
          </Box>
        ) : jobs.length > 0 ? (
          <>
            {currentJobs.map((job, index) => (
              <JobTile key={job._id} job={job} />
            ))}
            
            {totalPages > 1 && (
              <div className={classes.pagination}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </div>
            )}
          </>
        ) : (
          <Paper className={classes.noJobs} elevation={0}>
            <WorkIcon className={classes.noJobsIcon} />
            <Typography variant="h5">No Jobs Found</Typography>
            <Typography variant="body1" color="textSecondary">
              Try adjusting your search or filter criteria
            </Typography>
          </Paper>
        )}
      </Container>
      
      <FilterPopup
        open={filterOpen}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        handleClose={() => setFilterOpen(false)}
        getData={() => {
          getData();
          setFilterOpen(false);
        }}
      />
    </div>
  );
};

export default Home;
