import { useState, useEffect, useContext } from "react";
import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Divider,
  Chip,
  Box,
  Container,
  Avatar,
  CircularProgress,
  Fade,
  Grow,
  TextField,
  InputAdornment,
  Card,
  CardContent,
  Tooltip,
  useTheme,
  IconButton,
  Button,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  WorkOutline as WorkIcon,
  Business as BusinessIcon,
  Schedule as ScheduleIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  AttachMoney as AttachMoneyIcon,
  FilterList as FilterListIcon,
  Event as EventIcon,
  LocalAtm as LocalAtmIcon,
  EventAvailable as EventAvailableIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";

import { SetPopupContext } from "../../App";
import apiList from "../../lib/apiList";
import isAuth from "../../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "90vh",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  container: {
    marginTop: theme.spacing(4),
  },
  pageHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    position: "relative",
    "& h3": {
      fontWeight: 700,
      fontSize: "2.2rem",
      marginLeft: theme.spacing(2),
    },
  },
  headerIcon: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    color: "#fff",
  },
  tableContainer: {
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
    borderRadius: "16px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main + "15",
    "& .MuiTableCell-head": {
      color: theme.palette.primary.dark,
      fontWeight: 600,
      fontSize: "0.95rem",
    },
  },
  tableRow: {
    transition: "background-color 0.2s",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  skillChip: {
    margin: theme.spacing(0.5),
    borderRadius: "16px",
    fontWeight: 500,
    backgroundColor: theme.palette.primary.light + "40",
    color: theme.palette.primary.dark,
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      transform: "translateY(-2px)",
    },
  },
  searchBox: {
    marginBottom: theme.spacing(3),
  },
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  actionButton: {
    borderRadius: "30px",
    padding: theme.spacing(1, 2),
    textTransform: "none",
    fontWeight: 500,
    boxShadow: "0 3px 10px rgba(0, 0, 0, 0.08)",
    "& .MuiButton-startIcon": {
      marginRight: theme.spacing(1),
    },
  },
  noResults: {
    textAlign: "center",
    padding: theme.spacing(10, 2),
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
  },
  noResultsIcon: {
    fontSize: "4rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    opacity: 0.6,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(10),
    width: "100%",
  },
  refreshButton: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  jobTypeChip: {
    borderRadius: "20px",
    fontWeight: 500,
    color: "#fff",
  },
  salaryChip: {
    borderRadius: "20px",
    fontWeight: 500,
    backgroundColor: theme.palette.grey[100],
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(0.5),
      fontSize: "1rem",
    },
  },
  actionIcon: {
    backgroundColor: theme.palette.primary.light + "30",
    padding: theme.spacing(1),
    borderRadius: "8px",
  },
  statCards: {
    marginBottom: theme.spacing(4),
  },
  statCard: {
    height: "100%",
    borderRadius: "16px",
    padding: theme.spacing(3),
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.3s, box-shadow 0.3s",
    background: "#fff",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 30px rgba(0, 0, 0, 0.1)",
    },
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 700,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
  statLabel: {
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    fontWeight: 500,
  },
  filtersContainer: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },
  jobTitleContainer: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: theme.palette.primary.main,
      marginRight: theme.spacing(1),
    },
  },
  dateInfo: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    "& svg": {
      fontSize: "1rem",
      marginRight: theme.spacing(0.5),
      color: theme.palette.text.secondary,
    },
  },
  jobCompany: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      fontSize: "1rem",
      marginRight: theme.spacing(0.5),
      color: theme.palette.text.secondary,
    },
  },
}));

const Jobs = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("all");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchTerm, jobTypeFilter, jobs]);

  const filterJobs = () => {
    let filtered = [...jobs];
    
    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.recruiter?.name && job.recruiter.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (job.skillsets && job.skillsets.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())))
      );
    }
    
    // Apply job type filter
    if (jobTypeFilter !== "all") {
      filtered = filtered.filter(job => job.jobType === jobTypeFilter);
    }
    
    setFilteredJobs(filtered);
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(apiList.adminJobs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching jobs",
        });
        setLoading(false);
      });
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const getJobTypeColor = (jobType) => {
    switch (jobType) {
      case "Full Time":
        return "#4caf50";
      case "Part Time":
        return "#2196f3";
      case "Work From Home":
        return "#ff9800";
      default:
        return "#f44336";
    }
  };

  // Stats calculations
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter(job => new Date(job.deadline) >= new Date()).length;
  const fullTimeJobs = jobs.filter(job => job.jobType === "Full Time").length;
  const partTimeJobs = jobs.filter(job => job.jobType === "Part Time").length;

  return isAuth() ? (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.pageHeader}>
          <Avatar className={classes.headerIcon}>
            <WorkIcon />
          </Avatar>
          <Typography variant="h3">Jobs Management</Typography>
          <Tooltip title="Refresh Data">
            <IconButton className={classes.refreshButton} onClick={getData} color="primary">
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {loading ? (
          <Fade in={loading}>
            <Box className={classes.loadingContainer}>
              <CircularProgress size={60} thickness={4} />
              <Typography variant="h6" style={{ marginTop: 16 }}>
                Loading jobs data...
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Fade in={!loading}>
            <div>
              {/* Stats Cards */}
              <Grid container spacing={3} className={classes.statCards}>
                <Grid item xs={12} sm={6} md={3}>
                  <Grow in={!loading} timeout={300}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `${theme.palette.primary.main}20`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <WorkIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {totalJobs}
                      </Typography>
                      <Typography className={classes.statLabel}>Total Jobs</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Grow in={!loading} timeout={400}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `${theme.palette.secondary.main}20`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: theme.palette.secondary.main }}>
                          <EventAvailableIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {activeJobs}
                      </Typography>
                      <Typography className={classes.statLabel}>Active Jobs</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Grow in={!loading} timeout={500}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `#4caf5020`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: "#4caf50" }}>
                          <BusinessIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {fullTimeJobs}
                      </Typography>
                      <Typography className={classes.statLabel}>Full-Time Jobs</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Grow in={!loading} timeout={600}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `#2196f320`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: "#2196f3" }}>
                          <ScheduleIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {partTimeJobs}
                      </Typography>
                      <Typography className={classes.statLabel}>Part-Time Jobs</Typography>
                    </Card>
                  </Grow>
                </Grid>
              </Grid>

              {/* Search & Filters */}
              <Box className={classes.flexBetween}>
                <TextField
                  className={classes.searchBox}
                  variant="outlined"
                  placeholder="Search by job title, company or skills"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box className={classes.filtersContainer}>
                <Typography variant="body1" style={{ fontWeight: 500 }}>
                  Filter by Job Type:
                </Typography>
                <Chip
                  label="All Jobs"
                  onClick={() => setJobTypeFilter("all")}
                  color={jobTypeFilter === "all" ? "primary" : "default"}
                  variant={jobTypeFilter === "all" ? "default" : "outlined"}
                  className={classes.filterChip}
                />
                <Chip
                  label="Full Time"
                  onClick={() => setJobTypeFilter("Full Time")}
                  style={{
                    backgroundColor: jobTypeFilter === "Full Time" ? "#4caf50" : "transparent",
                    color: jobTypeFilter === "Full Time" ? "white" : "inherit",
                    border: jobTypeFilter === "Full Time" ? "none" : "1px solid #e0e0e0"
                  }}
                  className={classes.filterChip}
                />
                <Chip
                  label="Part Time"
                  onClick={() => setJobTypeFilter("Part Time")}
                  style={{
                    backgroundColor: jobTypeFilter === "Part Time" ? "#2196f3" : "transparent",
                    color: jobTypeFilter === "Part Time" ? "white" : "inherit",
                    border: jobTypeFilter === "Part Time" ? "none" : "1px solid #e0e0e0"
                  }}
                  className={classes.filterChip}
                />
                <Chip
                  label="Work From Home"
                  onClick={() => setJobTypeFilter("Work From Home")}
                  style={{
                    backgroundColor: jobTypeFilter === "Work From Home" ? "#ff9800" : "transparent",
                    color: jobTypeFilter === "Work From Home" ? "white" : "inherit",
                    border: jobTypeFilter === "Work From Home" ? "none" : "1px solid #e0e0e0"
                  }}
                  className={classes.filterChip}
                />
              </Box>

              {/* Jobs Table */}
              {filteredJobs.length === 0 ? (
                <Box className={classes.noResults}>
                  <WorkIcon className={classes.noResultsIcon} />
                  <Typography variant="h5" gutterBottom>
                    No jobs found
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {searchTerm || jobTypeFilter !== "all" ? "Try adjusting your filters" : "There are no jobs in the system"}
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        <TableCell>Job Details</TableCell>
                        <TableCell>Company & Salary</TableCell>
                        <TableCell>Skills Required</TableCell>
                        <TableCell>Duration & Dates</TableCell>
                        <TableCell align="center">Rating</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job._id} className={classes.tableRow}>
                          <TableCell>
                            <Box>
                              <Box className={classes.jobTitleContainer}>
                                <WorkIcon fontSize="small" />
                                <Typography variant="body1" style={{ fontWeight: 600 }}>
                                  {job.title}
                                </Typography>
                              </Box>
                              <Box mt={1}>
                                <Chip 
                                  label={job.jobType} 
                                  size="small" 
                                  className={classes.jobTypeChip}
                                  style={{
                                    backgroundColor: getJobTypeColor(job.jobType),
                                  }}
                                />
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography className={classes.jobCompany}>
                                <BusinessIcon />
                                {job.recruiter ? job.recruiter.name : "Unknown Company"}
                              </Typography>
                              <Box mt={1}>
                                <Chip 
                                  icon={<LocalAtmIcon />}
                                  label={`₹${job.salary} per month`} 
                                  size="small" 
                                  className={classes.salaryChip}
                                />
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" flexWrap="wrap" maxWidth="200px">
                              {job.skillsets && job.skillsets.length > 0 ? (
                                job.skillsets.map((skill) => (
                                  <Chip
                                    key={skill}
                                    label={skill}
                                    className={classes.skillChip}
                                    size="small"
                                  />
                                ))
                              ) : (
                                <Typography variant="body2" color="textSecondary">
                                  No skills listed
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {job.duration !== 0
                                ? `${job.duration} month${job.duration === 1 ? "" : "s"}`
                                : "Flexible"}
                            </Typography>
                            <Typography variant="caption" className={classes.dateInfo}>
                              <EventIcon /> Posted: {formatDate(job.dateOfPosting)}
                            </Typography>
                            <Typography variant="caption" className={classes.dateInfo} style={{ color: new Date(job.deadline) < new Date() ? "#f44336" : "inherit" }}>
                              <EventIcon /> Deadline: {formatDate(job.deadline)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box display="flex" flexDirection="column" alignItems="center">
                              <Rating
                                value={job.rating !== -1 ? job.rating : 0}
                                readOnly
                                precision={0.5}
                                size="small"
                              />
                              {job.rating === -1 ? (
                                <Typography variant="caption" color="textSecondary" style={{ marginTop: 4 }}>
                                  Not Rated
                                </Typography>
                              ) : (
                                <Typography variant="caption" color="textSecondary" style={{ marginTop: 4 }}>
                                  {job.rating.toFixed(1)}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </Fade>
        )}
      </Container>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Jobs; 