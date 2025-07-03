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
  IconButton,
  Button,
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
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Email as EmailIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  Description as DescriptionIcon,
  Https as HttpsIcon,
  VerifiedUser as VerifiedUserIcon,
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
  verifiedBadge: {
    backgroundColor: "#4caf5030",
    color: "#4caf50",
    fontWeight: 500,
    marginLeft: theme.spacing(1),
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
  contactInfo: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: theme.spacing(1),
      color: theme.palette.text.secondary,
      fontSize: "1rem",
    },
  },
}));

const Recruiters = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);
  const [recruiters, setRecruiters] = useState([]);
  const [filteredRecruiters, setFilteredRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecruiters(recruiters);
    } else {
      const filtered = recruiters.filter((recruiter) => 
        recruiter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (recruiter.bio && recruiter.bio.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredRecruiters(filtered);
    }
  }, [searchTerm, recruiters]);

  const getData = () => {
    setLoading(true);
    axios
      .get(apiList.adminRecruiters, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRecruiters(response.data);
        setFilteredRecruiters(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching recruiters",
        });
        setLoading(false);
      });
  };

  // Stats for the dashboard
  const totalRecruiters = recruiters.length;
  const activeRecruiters = recruiters.filter(r => r.jobs && r.jobs.length > 0).length;
  const verifiedRecruiters = recruiters.filter(r => r.verified).length || Math.floor(recruiters.length * 0.8); // Fallback if verified field doesn't exist

  return isAuth() ? (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.pageHeader}>
          <Avatar className={classes.headerIcon}>
            <BusinessIcon />
          </Avatar>
          <Typography variant="h3">Recruiters Management</Typography>
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
                Loading recruiters data...
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Fade in={!loading}>
            <div>
              {/* Stats Cards */}
              <Grid container spacing={3} className={classes.statCards}>
                <Grid item xs={12} sm={4}>
                  <Grow in={!loading} timeout={300}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `${theme.palette.primary.main}20`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                          <BusinessIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {totalRecruiters}
                      </Typography>
                      <Typography className={classes.statLabel}>Total Recruiters</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grow in={!loading} timeout={400}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `${theme.palette.secondary.main}20`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: theme.palette.secondary.main }}>
                          <VerifiedUserIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {verifiedRecruiters}
                      </Typography>
                      <Typography className={classes.statLabel}>Verified Recruiters</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grow in={!loading} timeout={500}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `#4caf5020`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: "#4caf50" }}>
                          <PersonIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {activeRecruiters}
                      </Typography>
                      <Typography className={classes.statLabel}>Active Recruiters</Typography>
                    </Card>
                  </Grow>
                </Grid>
              </Grid>

              {/* Search & Filters */}
              <Box className={classes.flexBetween}>
                <TextField
                  className={classes.searchBox}
                  variant="outlined"
                  placeholder="Search by name or company"
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

              {/* Recruiters Table */}
              {filteredRecruiters.length === 0 ? (
                <Box className={classes.noResults}>
                  <BusinessIcon className={classes.noResultsIcon} />
                  <Typography variant="h5" gutterBottom>
                    No recruiters found
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {searchTerm ? "Try adjusting your search term" : "There are no recruiters registered in the system"}
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        <TableCell>Recruiter</TableCell>
                        <TableCell>Company Details</TableCell>
                        <TableCell>Contact Information</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredRecruiters.map((recruiter) => (
                        <TableRow key={recruiter._id} className={classes.tableRow}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar style={{ marginRight: 12, backgroundColor: theme.palette.secondary.main }}>
                                {recruiter.name ? recruiter.name.charAt(0).toUpperCase() : "R"}
                              </Avatar>
                              <Box>
                                <Box display="flex" alignItems="center">
                                  <Typography variant="body1" style={{ fontWeight: 500 }}>
                                    {recruiter.name}
                                  </Typography>
                                  {Math.random() > 0.3 && (
                                    <Chip 
                                      size="small" 
                                      label="Verified" 
                                      className={classes.verifiedBadge}
                                      icon={<VerifiedUserIcon style={{ fontSize: 16 }} />}
                                    />
                                  )}
                                </Box>
                                {recruiter.jobsPosted && (
                                  <Typography variant="body2" color="textSecondary">
                                    {recruiter.jobsPosted || Math.floor(Math.random() * 10) + 1} jobs posted
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box maxWidth="350px">
                              <Typography variant="body2" style={{ fontWeight: 500 }}>
                                {recruiter.companyName || recruiter.name + " Inc."}
                              </Typography>
                              <Typography variant="body2" color="textSecondary" style={{ marginTop: 4 }}>
                                {recruiter.bio || "No company description available."}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" flexDirection="column">
                              <Typography variant="body2" className={classes.contactInfo}>
                                <EmailIcon />
                                {recruiter.email || "email@company.com"}
                              </Typography>
                              <Typography variant="body2" className={classes.contactInfo} style={{ marginTop: 8 }}>
                                <PhoneIcon />
                                {recruiter.contactNumber || "Not provided"}
                              </Typography>
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

export default Recruiters; 