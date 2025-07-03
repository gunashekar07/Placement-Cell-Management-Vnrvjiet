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
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  AssignmentOutlined as AssignmentIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  Work as WorkIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterListIcon,
  Timeline as TimelineIcon,
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
  statusChip: {
    borderRadius: "20px",
    fontWeight: 500,
    color: "#fff",
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
  nameContainer: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      fontSize: "1rem",
      marginRight: theme.spacing(0.5),
      color: theme.palette.primary.main,
    },
  },
  jobContainer: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      fontSize: "1rem",
      marginRight: theme.spacing(0.5),
      color: theme.palette.secondary.main,
    },
    marginTop: theme.spacing(1),
  },
  recruiterContainer: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      fontSize: "1rem",
      marginRight: theme.spacing(0.5),
      color: theme.palette.text.secondary,
    },
    marginTop: theme.spacing(1),
  },
  progressContainer: {
    position: "relative",
    marginTop: theme.spacing(1),
    height: 30,
    width: "100%",
  },
  progress: {
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.palette.grey[200],
    position: "relative",
    overflow: "hidden",
    width: "100%",
  },
  progressStep: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(0.5),
  },
  progressText: {
    fontSize: "0.7rem",
    color: theme.palette.text.secondary,
  },
}));

const Applications = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [searchTerm, statusFilter, applications]);

  const filterApplications = () => {
    let filtered = [...applications];
    
    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (application) =>
          (application.job && application.job.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (application.jobApplicant && application.jobApplicant.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (application.recruiter && application.recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(application => application.status === statusFilter);
    }
    
    setFilteredApplications(filtered);
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(apiList.adminApplications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplications(response.data);
        setFilteredApplications(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching applications",
        });
        setLoading(false);
      });
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "applied":
        return "#2196f3";
      case "shortlisted":
        return "#ff9800";
      case "accepted":
        return "#4caf50";
      case "rejected":
        return "#f44336";
      case "cancelled":
        return "#e0e0e0";
      case "finished":
        return "#9c27b0";
      case "deleted":
        return "#424242";
      default:
        return "#424242";
    }
  };

  const getStatusProgress = (status) => {
    switch (status) {
      case "applied":
        return 20;
      case "shortlisted":
        return 50;
      case "accepted":
        return 100;
      case "rejected":
        return 100;
      case "cancelled":
        return 100;
      case "finished":
        return 100;
      case "deleted":
        return 100;
      default:
        return 0;
    }
  };

  // Stats calculations
  const totalApplications = applications.length;
  const pendingApplications = applications.filter(a => a.status === "applied").length;
  const acceptedApplications = applications.filter(a => a.status === "accepted").length;
  const rejectedApplications = applications.filter(a => a.status === "rejected").length;

  return isAuth() ? (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.pageHeader}>
          <Avatar className={classes.headerIcon}>
            <AssignmentIcon />
          </Avatar>
          <Typography variant="h3">Applications Management</Typography>
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
                Loading applications data...
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
                          <AssignmentIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {totalApplications}
                      </Typography>
                      <Typography className={classes.statLabel}>Total Applications</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Grow in={!loading} timeout={400}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `${theme.palette.secondary.main}20`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: theme.palette.secondary.main }}>
                          <TimelineIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {pendingApplications}
                      </Typography>
                      <Typography className={classes.statLabel}>Pending Applications</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Grow in={!loading} timeout={500}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `#4caf5020`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: "#4caf50" }}>
                          <CheckCircleIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {acceptedApplications}
                      </Typography>
                      <Typography className={classes.statLabel}>Accepted Applications</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Grow in={!loading} timeout={600}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `#f4433620`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: "#f44336" }}>
                          <CancelIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {rejectedApplications}
                      </Typography>
                      <Typography className={classes.statLabel}>Rejected Applications</Typography>
                    </Card>
                  </Grow>
                </Grid>
              </Grid>

              {/* Search & Filters */}
              <Box className={classes.flexBetween}>
                <TextField
                  className={classes.searchBox}
                  variant="outlined"
                  placeholder="Search by job, applicant or recruiter"
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
                  Filter by Status:
                </Typography>
                <Chip
                  label="All Applications"
                  onClick={() => setStatusFilter("all")}
                  color={statusFilter === "all" ? "primary" : "default"}
                  variant={statusFilter === "all" ? "default" : "outlined"}
                  className={classes.filterChip}
                />
                <Chip
                  label="Applied"
                  onClick={() => setStatusFilter("applied")}
                  style={{
                    backgroundColor: statusFilter === "applied" ? "#2196f3" : "transparent",
                    color: statusFilter === "applied" ? "white" : "inherit",
                    border: statusFilter === "applied" ? "none" : "1px solid #e0e0e0"
                  }}
                  className={classes.filterChip}
                />
                <Chip
                  label="Shortlisted"
                  onClick={() => setStatusFilter("shortlisted")}
                  style={{
                    backgroundColor: statusFilter === "shortlisted" ? "#ff9800" : "transparent",
                    color: statusFilter === "shortlisted" ? "white" : "inherit",
                    border: statusFilter === "shortlisted" ? "none" : "1px solid #e0e0e0"
                  }}
                  className={classes.filterChip}
                />
                <Chip
                  label="Accepted"
                  onClick={() => setStatusFilter("accepted")}
                  style={{
                    backgroundColor: statusFilter === "accepted" ? "#4caf50" : "transparent",
                    color: statusFilter === "accepted" ? "white" : "inherit",
                    border: statusFilter === "accepted" ? "none" : "1px solid #e0e0e0"
                  }}
                  className={classes.filterChip}
                />
                <Chip
                  label="Rejected"
                  onClick={() => setStatusFilter("rejected")}
                  style={{
                    backgroundColor: statusFilter === "rejected" ? "#f44336" : "transparent",
                    color: statusFilter === "rejected" ? "white" : "inherit",
                    border: statusFilter === "rejected" ? "none" : "1px solid #e0e0e0"
                  }}
                  className={classes.filterChip}
                />
              </Box>

              {/* Applications Table */}
              {filteredApplications.length === 0 ? (
                <Box className={classes.noResults}>
                  <AssignmentIcon className={classes.noResultsIcon} />
                  <Typography variant="h5" gutterBottom>
                    No applications found
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {searchTerm || statusFilter !== "all" ? "Try adjusting your filters" : "There are no applications in the system"}
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        <TableCell>Application Details</TableCell>
                        <TableCell>Job Information</TableCell>
                        <TableCell>Status & Timeline</TableCell>
                        <TableCell>Dates</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow key={application._id} className={classes.tableRow}>
                          <TableCell>
                            <Box>
                              <Typography className={classes.nameContainer}>
                                <PersonIcon />
                                <strong>{application.jobApplicant.name}</strong>
                              </Typography>
                              
                              <Typography className={classes.recruiterContainer}>
                                <BusinessIcon />
                                {application.recruiter.name}
                              </Typography>
                              
                              <Box mt={1}>
                                <Tooltip title="View Applicant Profile" arrow>
                                  <IconButton size="small" className={classes.actionIcon}>
                                    <VisibilityIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography className={classes.jobContainer}>
                                <WorkIcon />
                                <strong>{application.job.title}</strong>
                              </Typography>
                              
                              <Typography variant="caption" className={classes.dateInfo}>
                                <EventIcon />
                                Applied: {formatDate(application.dateOfApplication)}
                              </Typography>
                              
                              {application.dateOfJoining && (
                                <Typography variant="caption" className={classes.dateInfo}>
                                  <EventIcon />
                                  Joining: {formatDate(application.dateOfJoining)}
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Chip
                                label={application.status.toUpperCase()}
                                style={{
                                  backgroundColor: getStatusColor(application.status),
                                  color: "#fff",
                                }}
                                className={classes.statusChip}
                              />
                              
                              <Box className={classes.progressContainer}>
                                <Box className={classes.progress}>
                                  <Box 
                                    style={{ 
                                      width: `${getStatusProgress(application.status)}%`,
                                      height: '100%',
                                      backgroundColor: getStatusColor(application.status),
                                      borderRadius: 4,
                                    }} 
                                  />
                                </Box>
                                <Box className={classes.progressStep}>
                                  <Typography className={classes.progressText}>Applied</Typography>
                                  <Typography className={classes.progressText}>Shortlisted</Typography>
                                  <Typography className={classes.progressText}>Decision</Typography>
                                </Box>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2">
                              {formatDate(application.dateOfApplication)}
                            </Typography>
                            {application.status === "accepted" && (
                              <Typography variant="body2" style={{ marginTop: 8, color: "#4caf50" }}>
                                Accepted on: {formatDate(application.dateOfJoining || new Date())}
                              </Typography>
                            )}
                            {application.status === "rejected" && (
                              <Typography variant="body2" style={{ marginTop: 8, color: "#f44336" }}>
                                Rejected on: {formatDate(application.dateOfJoining || new Date())}
                              </Typography>
                            )}
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

export default Applications; 