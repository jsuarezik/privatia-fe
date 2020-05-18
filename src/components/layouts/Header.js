import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

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

export default props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Privatia
            </Typography>
            <Tabs centered >
              <Tab component={Link} to="/companies" label="Companies" />
              <Tab component={Link} to="/dashboard" label="Dashboard" />
              <Tab component={Link} to="/monitoring" label="Monitoring" />
            </Tabs>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
