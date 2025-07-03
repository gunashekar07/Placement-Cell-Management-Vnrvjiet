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
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { Redirect } from "react-router-dom";
import {
  Visibility as VisibilityIcon,
  Email as EmailIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Phone as PhoneIcon,
  FilterList as FilterListIcon,
  GetApp as GetAppIcon,
  PeopleAlt as PeopleAltIcon,
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
  educationItem: {
    marginBottom: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    "&:last-child": {
      marginBottom: 0,
      paddingBottom: 0,
      borderBottom: "none",
    },
  },
  institutionName: {
    fontWeight: 500,
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
}));

const Applicants = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);
  const [applicants, setApplicants] = useState([]);
  const [filteredApplicants, setFilteredApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredApplicants(applicants);
    } else {
      const filtered = applicants.filter((applicant) => 
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (applicant.skills && applicant.skills.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
      setFilteredApplicants(filtered);
    }
  }, [searchTerm, applicants]);

  const getData = () => {
    setLoading(true);
    axios
      .get(apiList.adminApplicants, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplicants(response.data);
        setFilteredApplicants(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching applicants",
        });
        setLoading(false);
      });
  };

  const viewResume = (resumeUrl) => {
    if (resumeUrl) {
      const url = `${apiList.host}${resumeUrl}`;
      window.open(url, "_blank");
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "No resume available",
      });
    }
  };

  // Stats for the dashboard
  const totalApplicants = applicants.length;
  const applicantsWithSkills = applicants.filter(a => a.skills && a.skills.length > 0).length;
  const applicantsWithResume = applicants.filter(a => a.resume).length;

  return isAuth() ? (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.pageHeader}>
          <Avatar className={classes.headerIcon}>
            <PeopleAltIcon />
          </Avatar>
          <Typography variant="h3">Applicants Management</Typography>
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
                Loading applicants data...
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
                          <PersonIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {totalApplicants}
                      </Typography>
                      <Typography className={classes.statLabel}>Total Applicants</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grow in={!loading} timeout={400}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `${theme.palette.secondary.main}20`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: theme.palette.secondary.main }}>
                          <SchoolIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {applicantsWithSkills}
                      </Typography>
                      <Typography className={classes.statLabel}>Applicants with Skills</Typography>
                    </Card>
                  </Grow>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grow in={!loading} timeout={500}>
                    <Card className={classes.statCard} elevation={0}>
                      <Box style={{ background: `#4caf5020`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                        <Avatar style={{ backgroundColor: "#4caf50" }}>
                          <GetAppIcon />
                        </Avatar>
                      </Box>
                      <Typography variant="h4" className={classes.statValue}>
                        {applicantsWithResume}
                      </Typography>
                      <Typography className={classes.statLabel}>Applicants with Resume</Typography>
                    </Card>
                  </Grow>
                </Grid>
              </Grid>

              {/* Search & Filters */}
              <Box className={classes.flexBetween}>
                <TextField
                  className={classes.searchBox}
                  variant="outlined"
                  placeholder="Search by name or skills"
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

              {/* Applicants Table */}
              {filteredApplicants.length === 0 ? (
                <Box className={classes.noResults}>
                  <PersonIcon className={classes.noResultsIcon} />
                  <Typography variant="h5" gutterBottom>
                    No applicants found
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {searchTerm ? "Try adjusting your search term" : "There are no applicants registered in the system"}
                  </Typography>
                </Box>
              ) : (
                <TableContainer component={Paper} className={classes.tableContainer}>
                  <Table>
                    <TableHead className={classes.tableHeader}>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Skills</TableCell>
                        <TableCell>Education</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredApplicants.map((applicant) => (
                        <TableRow key={applicant._id} className={classes.tableRow}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Avatar 
                                src={applicant.profile ? `${apiList.host}${applicant.profile}` : undefined}
                                style={{ marginRight: 12 }}
                              >
                                {applicant.name ? applicant.name.charAt(0).toUpperCase() : "A"}
                              </Avatar>
                              <Box>
                                <Typography variant="body1" style={{ fontWeight: 500 }}>
                                  {applicant.name}
                                </Typography>
                                {applicant.email && (
                                  <Typography variant="body2" color="textSecondary" style={{ display: 'flex', alignItems: 'center' }}>
                                    <EmailIcon fontSize="small" style={{ marginRight: 4, fontSize: 16 }} />
                                    {applicant.email}
                                  </Typography>
                                )}
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" flexWrap="wrap" maxWidth="250px">
                              {applicant.skills && applicant.skills.length > 0 ? (
                                applicant.skills.map((skill) => (
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
                          <TableCell style={{ maxWidth: "250px" }}>
                            {applicant.education && applicant.education.length > 0 ? (
                              applicant.education.map((edu, index) => (
                                <Box key={index} className={classes.educationItem}>
                                  <Typography variant="body2" className={classes.institutionName}>
                                    {edu.institutionName}
                                  </Typography>
                                  <Typography variant="caption" color="textSecondary">
                                    {edu.startYear}
                                    {edu.endYear ? ` - ${edu.endYear}` : " - Present"}
                                  </Typography>
                                </Box>
                              ))
                            ) : (
                              <Typography variant="body2" color="textSecondary">
                                No education listed
                              </Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Box display="flex" flexDirection="column">
                              <Rating
                                value={applicant.rating !== -1 ? applicant.rating : 0}
                                readOnly
                                precision={0.5}
                                size="small"
                              />
                              {applicant.rating === -1 && (
                                <Typography variant="caption" color="textSecondary">
                                  Not Rated
                                </Typography>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <Tooltip title={applicant.resume ? "View Resume" : "No Resume Available"}>
                              <span>
                                <IconButton
                                  onClick={() => viewResume(applicant.resume)}
                                  disabled={!applicant.resume}
                                  className={applicant.resume ? classes.actionIcon : ""}
                                  size="small"
                                >
                                  <VisibilityIcon fontSize="small" />
                                </IconButton>
                              </span>
                            </Tooltip>
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

export default Applicants; 