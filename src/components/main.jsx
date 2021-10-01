import React, { useState } from 'react';
import Twit from 'twit'
import { Box, Paper, Grid, makeStyles, Typography, Tooltip } from '@material-ui/core';
import SearchBar from './searchBar';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
var config = require('../config.json');


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: '50px'
  },
  searchComponent: {
    display: 'flex',
    justifyContent: 'center',
  },
  displayComponents: {
    height: '70vh',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflow: 'auto',
  },
  tweetTextContainer: {
    dispaly: 'flex',
  },
  tweetText: {
    marginTop: '10px',
    padding: theme.spacing(1),
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
  var T = new Twit(config);

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  function handleFetchTweets() { 
    try {
      T.get('search/tweets', { 
        q: `'${searchValue} since:2011-07-11'`, 
        count: 10 
      }, function(err, data, response) {
        if (data.statuses === undefined ) {
          setErrorMessage(true);
          return;
        };
          setErrorMessage(false);
          setData(data.statuses);
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Paper className={classes.displayComponents} elevation={3}>
            <Box className={classes.searchComponent}>
              <SearchBar 
                fetchTweets={handleFetchTweets}
                setNewSearchValue={setSearchValue}
              />
            </Box>
            {!errorMessage ? (
              <Box className={classes.tweetTextContainer}>
                {data?.map(item => (
                  <Paper key={item.id} className={classes.tweetText}>{item.text}</Paper>
                ))}
              </Box>
            ) : (
              <Typography>No matches found!</Typography>
            )}
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
              Save
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainComponent;
