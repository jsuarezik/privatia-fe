import React, { Component } from "react";
import { Container, Typography, Grid, Paper } from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles'
 

const useStyle = makeStyles({
  title : { 
    marginTop : 10
  },
  container : {
    marginTop : 20,
  },
  card : {
    minHeight : 300,
    margin : 10
  }
})
const Dashboard = (props) => {
  const classes = useStyle();

  const renderDashBoard = () => {
    return <>
      <Container maxWidth='lg'>
        <Typography className={classes.title}>
          Privatia DashBoard
        </Typography>
        <Grid container className={classes.container} direction="column">
          <Grid item >
            <Grid container justify="space-between"  direction="row" spacing={2}>
              <Grid Item lg={6}>
                <Paper className={classes.card}>
                  Total Companies
                </Paper>
              </Grid>
              <Grid Item lg={6}>
                <Paper className={classes.card}>
                  Total Clients
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item className={classes.container}>
            <Grid container justify="space-between"direction="row" spacing={2}>
              <Grid Item lg={6}>
                <Paper className={classes.card}>
                  Total Companies
                </Paper>
              </Grid>
              <Grid Item lg={6}>
                <Paper className={classes.card}>
                  Total Clients
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  }
  return (renderDashBoard())
}

export default Dashboard;