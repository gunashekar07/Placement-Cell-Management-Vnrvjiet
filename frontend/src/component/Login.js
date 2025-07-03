import { useContext, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  Container,
  Box,
  Card,
  CardContent,
  Divider,
  CircularProgress,
  Fade,
  Link,
  useTheme,
} from "@material-ui/core";
import axios from "axios";
import { Redirect, Link as RouterLink } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "93vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
  },
  card: {
    maxWidth: 500,
    width: "100%",
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
    overflow: "hidden",
  },
  cardHeader: {
    textAlign: "center",
    background: `linear-gradient(60deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    color: "#fff",
    padding: theme.spacing(4, 2),
    position: "relative",
    "& h3": {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
    opacity: 0.2,
  },
  cardContent: {
    padding: theme.spacing(4, 3),
  },
  formIcon: {
    display: "flex",
    alignItems: "center",
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  inputBox: {
    width: "100%",
  },
  submitButton: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1.2),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius * 2,
    backgroundImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    color: "#fff",
    transition: "all 0.3s",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
      transform: "translateY(-2px)",
    },
    "&::after": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: "-100%",
      background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
      transition: "all 0.5s",
    },
    "&:hover::after": {
      left: "100%",
    },
  },
  divider: {
    margin: theme.spacing(3, 0),
    position: "relative",
    "&::after": {
      content: '"OR"',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: theme.palette.background.paper,
      padding: "0 16px",
      color: theme.palette.text.secondary,
      fontSize: "0.875rem",
    },
  },
  signupPrompt: {
    textAlign: "center",
    marginTop: theme.spacing(2),
  },
  link: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    marginLeft: theme.spacing(1),
    textDecoration: "none",
    transition: "color 0.3s",
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());
  const [loading, setLoading] = useState(false);

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    
    if (verified) {
      setLoading(true);
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          setLoading(false);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          setLoading(false);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Please correct the highlighted errors",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Card className={classes.card} elevation={0}>
            <Box className={classes.cardHeader}>
              <div className={classes.headerOverlay}></div>
              <Typography variant="h3">
                Welcome Back
              </Typography>
              <Typography variant="subtitle1">
                Sign in to access your account
              </Typography>
            </Box>
            
            <CardContent className={classes.cardContent}>
              <form noValidate>
                <div className={classes.inputWrapper}>
                  <div className={classes.formIcon}>
                    <EmailOutlinedIcon />
                  </div>
                  <EmailInput
                    label="Email Address"
                    variant="outlined"
                    value={loginDetails.email}
                    onChange={(event) => handleInput("email", event.target.value)}
                    inputErrorHandler={inputErrorHandler}
                    handleInputError={handleInputError}
                    className={classes.inputBox}
                    placeholder="Enter your email"
                    fullWidth
                  />
                </div>
                
                <div className={classes.inputWrapper}>
                  <div className={classes.formIcon}>
                    <LockOutlinedIcon />
                  </div>
                  <PasswordInput
                    label="Password"
                    variant="outlined"
                    value={loginDetails.password}
                    onChange={(event) => handleInput("password", event.target.value)}
                    className={classes.inputBox}
                    placeholder="Enter your password"
                    fullWidth
                  />
                </div>
                
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  onClick={handleLogin}
                  className={classes.submitButton}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign In"
                  )}
                </Button>
                
                <Divider className={classes.divider} />
                
                <Box className={classes.signupPrompt}>
                  <Typography variant="body1" color="textSecondary">
                    Don't have an account?
                    <Link 
                      component={RouterLink} 
                      to="/signup" 
                      className={classes.link}
                    >
                      Sign up
                    </Link>
                  </Typography>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Fade>
      </Container>
    </div>
  );
};

export default Login;
