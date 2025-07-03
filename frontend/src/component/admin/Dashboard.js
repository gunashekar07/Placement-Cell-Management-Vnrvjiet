import { useState, useEffect, useContext } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  makeStyles,
  Card,
  CardContent,
  Divider,
  Box,
  Container,
  CircularProgress,
  Avatar,
  Fade,
  Grow,
  useTheme,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import {
  PeopleOutline,
  BusinessCenter,
  WorkOutline,
  AssignmentOutlined,
  CheckCircleOutline,
  TrendingUp,
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
  ArrowForward as ArrowForwardIcon,
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
  statsGrid: {
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
  statIcon: {
    position: "absolute",
    top: theme.spacing(2),
    right: theme.spacing(2),
    width: 40,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    color: "#fff",
  },
  statValue: {
    fontSize: "2.5rem",
    fontWeight: 700,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0.5),
  },
  statLabel: {
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    fontWeight: 500,
  },
  actionSection: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    "& h4": {
      fontWeight: 600,
      marginLeft: theme.spacing(1),
    },
  },
  actionCard: {
    height: "100%",
    borderRadius: "16px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.3s, box-shadow 0.3s",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 12px 25px rgba(0, 0, 0, 0.09)",
    },
  },
  actionCardContent: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  actionIcon: {
    backgroundColor: theme.palette.primary.light + "30",
    color: theme.palette.primary.main,
    width: 50,
    height: 50,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  actionTitle: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  actionDescription: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  actionButton: {
    marginTop: "auto",
    borderRadius: "8px",
    padding: theme.spacing(1, 2),
    fontWeight: 600,
    alignSelf: "flex-start",
    textTransform: "none",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
  },
  refreshButton: {
    position: "absolute",
    right: 0,
    top: 10,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: theme.spacing(10),
    width: "100%",
  },
  welcomeMessage: {
    background: `linear-gradient(45deg, ${theme.palette.primary.main}dd 30%, ${theme.palette.secondary.main}dd 90%)`,
    color: "#fff",
    padding: theme.spacing(3),
    borderRadius: "16px",
    marginBottom: theme.spacing(4),
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
  },
  welcomeTitle: {
    marginBottom: theme.spacing(1),
    fontWeight: 700,
  },
  divider: {
    margin: theme.spacing(3, 0),
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .get(apiList.adminStats, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: "Error fetching statistics",
        });
        setLoading(false);
      });
  };

  // Get the current time to determine greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Function to format large numbers
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  const statItems = [
    {
      label: "Total Applicants",
      value: stats?.applicantCount || 0,
      icon: <PeopleOutline />,
      color: "#2196f3",
      path: "/admin/applicants"
    },
    {
      label: "Total Recruiters",
      value: stats?.recruiterCount || 0,
      icon: <BusinessCenter />,
      color: "#ff9800",
      path: "/admin/recruiters"
    },
    {
      label: "Total Jobs",
      value: stats?.jobCount || 0,
      icon: <WorkOutline />,
      color: "#4caf50",
      path: "/admin/jobs"
    },
    {
      label: "Total Applications",
      value: stats?.applicationCount || 0,
      icon: <AssignmentOutlined />,
      color: "#9c27b0",
      path: "/admin/applications"
    },
    {
      label: "Accepted Applications",
      value: stats?.acceptedCount || 0,
      icon: <CheckCircleOutline />,
      color: "#00bcd4",
      path: "/admin/applications"
    },
    {
      label: "Acceptance Rate",
      value: `${stats?.acceptanceRate ? stats.acceptanceRate.toFixed(1) : 0}%`,
      icon: <TrendingUp />,
      color: "#f44336",
      path: "/admin/applications"
    },
  ];

  const actionItems = [
    {
      title: "Manage Applicants",
      description: "View and manage all applicants registered in the portal",
      icon: <PersonIcon fontSize="large" />,
      color: theme.palette.primary.main,
      path: "/admin/applicants"
    },
    {
      title: "Manage Recruiters",
      description: "View and manage all recruiters and their companies",
      icon: <BusinessCenter fontSize="large" />,
      color: theme.palette.secondary.main,
      path: "/admin/recruiters"
    },
    {
      title: "Manage Jobs",
      description: "View, edit, and moderate all job postings on the portal",
      icon: <WorkOutline fontSize="large" />,
      color: "#4caf50",
      path: "/admin/jobs"
    },
    {
      title: "Manage Applications",
      description: "Review all applications and their statuses",
      icon: <AssignmentOutlined fontSize="large" />,
      color: "#9c27b0",
      path: "/admin/applications"
    },
  ];

  return isAuth() ? (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        <Box className={classes.pageHeader}>
          <Avatar className={classes.headerIcon}>
            <DashboardIcon />
          </Avatar>
          <Typography variant="h3">Admin Dashboard</Typography>
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
                Loading dashboard data...
              </Typography>
            </Box>
          </Fade>
        ) : (
          <Fade in={!loading}>
            <div>
              {/* Welcome Message */}
              <Paper className={classes.welcomeMessage} elevation={0}>
                <Typography variant="h4" className={classes.welcomeTitle}>
                  {getGreeting()}, Admin!
                </Typography>
                <Typography variant="body1">
                  Welcome to your dashboard. Here's an overview of the portal's current statistics.
                </Typography>
              </Paper>

              {/* Statistics Cards */}
              <Grid container spacing={3} className={classes.statsGrid}>
                {statItems.map((stat, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Grow in={!loading} timeout={(index + 1) * 200}>
                      <Link to={stat.path} style={{ textDecoration: 'none' }}>
                        <Card className={classes.statCard} elevation={0}>
                          <Box style={{ background: `${stat.color}20`, padding: '12px', borderRadius: '12px', width: 'fit-content' }}>
                            <Avatar style={{ backgroundColor: stat.color }}>
                              {stat.icon}
                            </Avatar>
                          </Box>
                          <Typography variant="h4" className={classes.statValue}>
                            {formatNumber(stat.value)}
                          </Typography>
                          <Typography className={classes.statLabel}>{stat.label}</Typography>
                        </Card>
                      </Link>
                    </Grow>
                  </Grid>
                ))}
              </Grid>

              {/* Action Section */}
              <div className={classes.actionSection}>
                <Box className={classes.sectionTitle}>
                  <Avatar style={{ backgroundColor: theme.palette.primary.main }}>
                    <DashboardIcon />
                  </Avatar>
                  <Typography variant="h4">Quick Actions</Typography>
                </Box>

                <Grid container spacing={3}>
                  {actionItems.map((item, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Grow in={!loading} timeout={(index + 1) * 200}>
                        <Card className={classes.actionCard} elevation={0}>
                          <CardContent className={classes.actionCardContent}>
                            <Box className={classes.actionIcon}>
                              {item.icon}
                            </Box>
                            <Typography variant="h6" className={classes.actionTitle}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" className={classes.actionDescription}>
                              {item.description}
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              component={Link}
                              to={item.path}
                              className={classes.actionButton}
                              endIcon={<ArrowForwardIcon />}
                            >
                              Go to {item.title}
                            </Button>
                          </CardContent>
                        </Card>
                      </Grow>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </Fade>
        )}
      </Container>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Dashboard; 