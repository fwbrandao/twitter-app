import React from 'react';
import { Box, Paper, Grid, makeStyles, Tooltip } from '@material-ui/core';
import SaveTweets from './saveTweets';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import SearchTweets from './searchTweets';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '50px'
  },
  displayComponents: {
    height: '70vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'auto',
  },
  swapIcon: {
    display: 'flex',
    alignItems: 'center',
    height: '70vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    justifyContent: 'center'
  }
}));

const MainComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Paper className={classes.displayComponents} elevation={3}>
            <SearchTweets />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Box className={classes.swapIcon}>
            <Tooltip title="Drag and Drop">
              <SwapHorizIcon fontSize='large'/>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Paper className={classes.displayComponents} elevation={3}>
              <SaveTweets allowedDropEffect="move"/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainComponent;
