import { 
  Grid, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  makeStyles, 
  Button, 
  Container, 
  Box, 
  Divider, 
  Paper, 
  Avatar, 
  Chip,
  Fade,
  Zoom,
  Grow
} from "@material-ui/core";
import { 
  BusinessCenter, 
  School, 
  TrendingUp, 
  WorkOutline, 
  CheckCircle 
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
  },
  hero: {
    position: "relative",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    background: `linear-gradient(75deg, ${theme.palette.primary.main}dd 0%, ${theme.palette.secondary.main}dd 100%)`,
    color: "#fff",
    borderRadius: "0 0 16px 16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    overflow: "hidden",
    marginBottom: theme.spacing(8),
  },
  heroBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.15,
  },
  heroContent: {
    position: "relative",
    zIndex: 1,
    padding: theme.spacing(6),
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
  heroStats: {
    display: "flex",
    marginTop: theme.spacing(4),
    "& > div": {
      marginRight: theme.spacing(4),
      textAlign: "center",
    },
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: theme.spacing(6),
    position: "relative",
    "& .MuiDivider-root": {
      width: "80px",
      height: "4px",
      backgroundColor: theme.palette.primary.main,
      margin: "16px auto",
    },
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.3s, box-shadow 0.3s",
    overflow: "hidden",
    "&:hover": {
      transform: "translateY(-8px)",
    },
  },
  recruiterCard: {
    borderTop: `4px solid ${theme.palette.primary.main}`,
  },
  studentCard: {
    borderTop: `4px solid ${theme.palette.secondary.main}`,
  },
  cardMedia: {
    width: "80px",
    height: "80px",
    margin: "20px auto 0",
    borderRadius: "50%",
    border: `3px solid ${theme.palette.background.paper}`,
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(1),
  },
  studentAvatar: {
    width: "80px",
    height: "80px",
    margin: "20px auto 0",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  cardContent: {
    flexGrow: 1,
    textAlign: "center",
    padding: theme.spacing(3),
  },
  package: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
    marginTop: theme.spacing(1),
  },
  recruitsChip: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
  },
  companyChip: {
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
  },
  section: {
    marginBottom: theme.spacing(10),
  },
  errorPage: {
    height: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  errorCode: {
    fontSize: "8rem",
    fontWeight: "bold",
    color: theme.palette.error.main,
    marginBottom: theme.spacing(2),
  },
  errorMessage: {
    fontSize: "2rem",
    marginBottom: theme.spacing(4),
    color: theme.palette.text.secondary,
  },
  callToAction: {
    marginTop: theme.spacing(8),
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(0, 1),
    },
  },
  featureSection: {
    padding: theme.spacing(8, 0),
    backgroundColor: theme.palette.background.paper,
    borderRadius: "16px",
    marginBottom: theme.spacing(8),
  },
  featureIcon: {
    fontSize: "3rem",
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
  featureCard: {
    height: "100%",
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    border: "none",
    boxShadow: "none",
    backgroundColor: "transparent",
  },
}));

// Enhanced data for recruiters and students
const recruiters = [
  { name: "Google", logo: "https://logo.clearbit.com/google.com", highestPackage: "45 LPA", recruits: 10, year: "2024" },
  { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", highestPackage: "40 LPA", recruits: 8, year: "2024" },
  { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", highestPackage: "38 LPA", recruits: 12, year: "2024" },
  { name: "Facebook", logo: "https://logo.clearbit.com/facebook.com", highestPackage: "35 LPA", recruits: 9, year: "2023" },
  { name: "Apple", logo: "https://logo.clearbit.com/apple.com", highestPackage: "50 LPA", recruits: 5, year: "2023" },
  { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", highestPackage: "48 LPA", recruits: 6, year: "2023" },
  { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com", highestPackage: "18 LPA", recruits: 20, year: "2024" },
  { name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com", highestPackage: "30 LPA", recruits: 14, year: "2024" },
];

const students = [
  { name: "Charles", image: "https://publichealth.uga.edu/wp-content/uploads/2020/01/Thomas-Cameron_Student_Profile.jpg", company: "Google", package: "45 LPA", role: "Software Engineer", year: "2024" },
  { name: "Pari Purna", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkwiruafD-4A_k3Pq1s0qLoLzRP5LENJ8qFA&s", company: "Microsoft", package: "40 LPA", role: "Data Scientist", year: "2024" },
  { name: "Shreekar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHWjuNjL58mec8NfxQznWboSaylHNsIUIZwg&s", company: "Amazon", package: "38 LPA", role: "Cloud Architect", year: "2024" },
  { name: "Nithin", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Qv5s5REahX2Vcj11jPnU1ibiEUfTc-VMAQ&s", company: "Facebook", package: "35 LPA", role: "Product Manager", year: "2024" },
  { name: "Shirisha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEhfNZTuKqQVBMKQPkHabC9NI0bzHFkaMCAg&s", company: "Apple", package: "50 LPA", role: "UI/UX Designer", year: "2023" },
  { name: "Divya vani", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB_UoXwaGYHlqsTfmvIrH2bSyE2NpcA62_hw&s", company: "Netflix", package: "48 LPA", role: "Data Analyst", year: "2023" },
];

// Features for the platform
const features = [
  {
    title: "Find Dream Jobs",
    description: "Access to a wide range of job opportunities from top companies across various industries.",
    icon: <WorkOutline className="featureIcon" />,
  },
  {
    title: "Top Companies",
    description: "Connect with leading companies like Google, Microsoft, Amazon, and many more.",
    icon: <BusinessCenter className="featureIcon" />,
  },
  {
    title: "Career Growth",
    description: "Boost your career with high-paying jobs and opportunities for professional development.",
    icon: <TrendingUp className="featureIcon" />,
  },
  {
    title: "Placement Success",
    description: "High placement rates with our industry connections and preparation resources.",
    icon: <CheckCircle className="featureIcon" />,
  },
];

const Welcome = (props) => {
  const classes = useStyles();
  const history = useHistory();
  
  const navigateTo = (path) => {
    history.push(path);
  };

  // Calculate stats
  const totalRecruits = recruiters.reduce((sum, recruiter) => sum + recruiter.recruits, 0);
  const avgPackage = Math.round(students.reduce((sum, student) => sum + parseInt(student.package), 0) / students.length);
  const topPackage = students.reduce((max, student) => Math.max(max, parseInt(student.package)), 0);

  return (
    <div className={classes.root}>
      {/* Hero Section */}
      <Fade in timeout={1000}>
        <div className={classes.hero}>
          <div className={classes.heroBg}></div>
          <Container>
            <div className={classes.heroContent}>
              <Typography variant="h2" gutterBottom>
                VNRVJIET Job Portal
              </Typography>
              <Typography variant="h5" style={{ marginBottom: "24px" }}>
                Connecting talented students with top employers for exciting career opportunities
              </Typography>
              
              <div className={classes.heroStats}>
                <div>
                  <Typography variant="h3">{totalRecruits}+</Typography>
                  <Typography variant="body1">Placements</Typography>
                </div>
                <div>
                  <Typography variant="h3">{recruiters.length}+</Typography>
                  <Typography variant="body1">Companies</Typography>
                </div>
                <div>
                  <Typography variant="h3">{avgPackage} LPA</Typography>
                  <Typography variant="body1">Avg Package</Typography>
                </div>
              </div>
              
              {!isAuth() && (
                <Box mt={4}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large" 
                    onClick={() => navigateTo("/signup")}
                    style={{ marginRight: "16px" }}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outlined" 
                    style={{ color: "#fff", borderColor: "#fff" }} 
                    size="large" 
                    onClick={() => navigateTo("/login")}
                  >
                    Login
                  </Button>
                </Box>
              )}
            </div>
          </Container>
        </div>
      </Fade>

      {/* Features Section */}
      <Container>
        <Zoom in timeout={800}>
          <Paper elevation={0} className={classes.featureSection}>
            <Container>
              <div className={classes.sectionTitle}>
                <Typography variant="h3">Our Platform Features</Typography>
                <Divider />
                <Typography variant="subtitle1">
                  What makes our job portal the best choice for students and recruiters
                </Typography>
              </div>
              
              <Grid container spacing={4}>
                {features.map((feature, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <Grow in timeout={600 + (index * 200)}>
                      <Card className={classes.featureCard}>
                        <Box className={classes.featureIcon}>
                          {feature.icon}
                        </Box>
                        <Typography variant="h6" gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {feature.description}
                        </Typography>
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Paper>
        </Zoom>
      </Container>

      {/* Top Recruiters Section */}
      <Container className={classes.section}>
        <div className={classes.sectionTitle}>
          <Typography variant="h3">Top Recruiters</Typography>
          <Divider />
          <Typography variant="subtitle1">
            Leading companies that recruit from our campus
          </Typography>
        </div>
        
        <Grid container spacing={4}>
          {recruiters.map((recruiter, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in timeout={600 + (index * 100)}>
                <Card className={`${classes.card} ${classes.recruiterCard}`}>
                  <CardMedia
                    component="img"
                    className={classes.cardMedia}
                    image={recruiter.logo}
                    title={recruiter.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {recruiter.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Highest Package
                    </Typography>
                    <div className={classes.package}>
                      {recruiter.highestPackage}
                    </div>
                    <Chip 
                      label={`${recruiter.recruits} Students Hired`} 
                      className={classes.recruitsChip}
                      size="small"
                    />
                    <Typography variant="caption" display="block" style={{ marginTop: 8 }}>
                      {recruiter.year}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Top Placements Section */}
      <Container className={classes.section}>
        <div className={classes.sectionTitle}>
          <Typography variant="h3">Top Placements</Typography>
          <Divider />
          <Typography variant="subtitle1">
            Our students with highest packages
          </Typography>
        </div>
        
        <Grid container spacing={4}>
          {students.map((student, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Zoom in timeout={600 + (index * 100)}>
                <Card className={`${classes.card} ${classes.studentCard}`}>
                  <Avatar 
                    src={student.image} 
                    className={classes.studentAvatar}
                    alt={student.name}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {student.name}
                    </Typography>
                    <Chip 
                      label={student.company} 
                      className={classes.companyChip}
                      size="small"
                    />
                    <div className={classes.package} style={{ margin: "12px auto" }}>
                      {student.package}
                    </div>
                    <Typography variant="body2" color="textSecondary">
                      {student.role}
                    </Typography>
                    <Typography variant="caption" display="block" style={{ marginTop: 8 }}>
                      Batch {student.year}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Container>
        <Zoom in timeout={800}>
          <Paper 
            elevation={3} 
            style={{ 
              padding: "40px", 
              textAlign: "center", 
              borderRadius: "16px",
              background: `linear-gradient(75deg, ${makeStyles().createPalette?.primary?.main || '#1e88e5'}22 0%, ${makeStyles().createPalette?.secondary?.main || '#26a69a'}22 100%)`,
            }}
          >
            <Typography variant="h4" gutterBottom>
              Ready to Start Your Career Journey?
            </Typography>
            <Typography variant="body1" paragraph style={{ maxWidth: "700px", margin: "0 auto 24px" }}>
              Join our job portal today and connect with top employers looking for talent like you. Find opportunities that align with your skills and career goals.
            </Typography>
            
            <div className={classes.callToAction}>
              {!isAuth() ? (
                <>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    onClick={() => navigateTo("/signup")}
                  >
                    Sign Up Now
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="large" 
                    onClick={() => navigateTo("/login")}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large" 
                  onClick={() => navigateTo("/home")}
                >
                  Go to Dashboard
                </Button>
              )}
            </div>
          </Paper>
        </Zoom>
      </Container>
    </div>
  );
};

export const ErrorPage = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.errorPage}>
      <Fade in timeout={600}>
        <div>
          <Typography variant="h1" className={classes.errorCode}>
            404
          </Typography>
          <Typography variant="h4" className={classes.errorMessage}>
            Oops! Page not found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            size="large" 
            onClick={() => history.push("/")}
            style={{ marginTop: "24px" }}
          >
            Return to Home Page
          </Button>
        </div>
      </Fade>
    </Container>
  );
};

export default Welcome;
