import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
  Avatar,
  Container,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Slide,
  useScrollTrigger,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: theme.palette.primary.contrastText,
    fontWeight: 600,
    letterSpacing: "0.5px",
  },
  logo: {
    marginRight: theme.spacing(2),
    height: "40px",
    width: "40px",
    border: `2px solid ${theme.palette.primary.contrastText}`,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  appBar: {
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  },
  navLinkDesktop: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1, 2),
    borderRadius: "50px",
    fontWeight: 500,
    letterSpacing: "0.5px",
    position: "relative",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: "white",
      transform: "translateX(-100%)",
      transition: "transform 0.3s ease",
    },
    "&:hover::after": {
      transform: "translateX(0)",
    },
  },
  navLinkMobile: {
    width: "100%",
    textAlign: "left",
    padding: theme.spacing(1.5, 3),
  },
  mobileMenuIcon: {
    color: theme.palette.primary.contrastText,
  },
  mobileMenu: {
    "& .MuiPaper-root": {
      borderRadius: "12px",
      marginTop: theme.spacing(2),
      minWidth: "200px",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
    },
  },
  activeNavLink: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    "&::after": {
      transform: "translateX(0)",
    },
  },
  logoutButton: {
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchor);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const handleNavigation = (location) => {
    history.push(location);
    handleMobileMenuClose();
  };

  // Get current path to highlight active link
  const currentPath = window.location.pathname;

  const isActive = (path) => {
    return currentPath === path;
  };

  // Navigation links based on user type
  const getNavigationLinks = () => {
    if (!isAuth()) {
      return [
        { name: "Login", path: "/login" },
        { name: "Signup", path: "/signup" },
      ];
    }

    if (userType() === "recruiter") {
      return [
        { name: "Jobs", path: "/home" },
        { name: "Add Jobs", path: "/addjob" },
        { name: "My Jobs", path: "/myjobs" },
        { name: "Employees", path: "/employees" },
        { name: "Profile", path: "/profile" },
      ];
    }

    if (userType() === "admin") {
      return [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Applicants", path: "/admin/applicants" },
        { name: "Recruiters", path: "/admin/recruiters" },
        { name: "Jobs", path: "/admin/jobs" },
        { name: "Applications", path: "/admin/applications" },
        { name: "Profile", path: "/profile" },
      ];
    }

    return [
      { name: "Jobs", path: "/home" },
      { name: "Applications", path: "/applications" },
      { name: "Profile", path: "/profile" },
    ];
  };

  const renderDesktopNavLinks = () => {
    const links = getNavigationLinks();

    return links.map((link) => (
      <Button
        key={link.path}
        color="inherit"
        onClick={() => handleNavigation(link.path)}
        className={`${classes.navLinkDesktop} ${
          isActive(link.path) ? classes.activeNavLink : ""
        }`}
      >
        {link.name}
      </Button>
    ));
  };

  const renderMobileNavLinks = () => {
    const links = getNavigationLinks();

    return links.map((link) => (
      <MenuItem
        key={link.path}
        onClick={() => handleNavigation(link.path)}
        className={classes.navLinkMobile}
        selected={isActive(link.path)}
      >
        {link.name}
      </MenuItem>
    ));
  };

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar position="fixed" className={classes.appBar}>
          <Container>
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                className={classes.title}
                onClick={() => handleNavigation("/")}
              >
                <Avatar
                  src="/vnrvjiet-logo.png"
                  alt="VNRVJIET Logo"
                  className={classes.logo}
                />
                VNRVJIET
              </Typography>

              {/* Desktop Navigation */}
              <Hidden smDown>
                <Box display="flex" alignItems="center">
                  {renderDesktopNavLinks()}
                  
                  {/* Logout Button (only if authenticated) */}
                  {isAuth() && (
                    <Button
                      variant="contained"
                      onClick={() => handleNavigation("/logout")}
                      className={classes.logoutButton}
                    >
                      Logout
                    </Button>
                  )}
                </Box>
              </Hidden>

              {/* Mobile Navigation */}
              <Hidden mdUp>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMobileMenuOpen}
                >
                  <MenuIcon className={classes.mobileMenuIcon} />
                </IconButton>
                <Menu
                  id="mobile-menu"
                  anchorEl={mobileMenuAnchor}
                  keepMounted
                  open={isMobileMenuOpen}
                  onClose={handleMobileMenuClose}
                  className={classes.mobileMenu}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  getContentAnchorEl={null}
                >
                  {renderMobileNavLinks()}
                  
                  {/* Logout Button (only if authenticated) */}
                  {isAuth() && (
                    <MenuItem 
                      onClick={() => handleNavigation("/logout")}
                      className={classes.navLinkMobile}
                    >
                      Logout
                    </MenuItem>
                  )}
                </Menu>
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar /> {/* This empty toolbar ensures content starts below the app bar */}
    </div>
  );
};

export default Navbar;
