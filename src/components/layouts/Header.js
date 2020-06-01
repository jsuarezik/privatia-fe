import React, { useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import { Link, useLocation, useHistory } from "react-router-dom";
import { getLocalStorageItem, removeLocalStorageItem } from "../../utils/localstorage";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header =  props => {
  const classes = useStyles();
  const token = getLocalStorageItem('auth')
  const location = useLocation()
  const history = useHistory();
  useEffect ( () => {
    if (token && location.pathname == '/' ) {
      history.push('/companies')
    } else if (!token && location.pathname != '/') {
      history.push('/')
    }
  } , [location.pathname])

  const renderTabs = () => {
    if (token) {
      return (
        <>
          <Tab component={Link} to="/dashboard" label="Dashboard" />
          <Tab component={Link} to="/companies" label="Companies" />
          <Tab component={Link} to="/monitoring" label="Monitoring" />
          { location.pathname != '/' && renderLogoutLink()}
        </>
      )
    }
  }
  const renderLogoutLink = () => {
    return (
      <Tab component={Link} to='/' label='Logout' onClick={handleLogout}/>
    )
  }
  const handleLogout = () => {
    removeLocalStorageItem('auth')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Privatia
            </Typography>
            <Tabs >
              {renderTabs()}     
            </Tabs>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header