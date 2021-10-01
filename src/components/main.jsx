import React, { useState } from 'react';
import Twit from 'twit'
import { Box, Paper, Grid, makeStyles } from '@material-ui/core';
// import { fetchTweets } from '../server.js';
import SearchBar from './searchBar';
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
  }
}));

const MainComponent = () => {
  const classes = useStyles();
  var T = new Twit(config);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('bitcoin');

  function handleFetchTweets() { 
    try {
      T.get('search/tweets', { 
        q: `'${search} since:2011-07-11'`, 
        count: 10 
      }, function(err, data, response) {
        setData(data.statuses);
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.displayComponents}>
            <Box className={classes.searchComponent}>
              <SearchBar fetchTweets={handleFetchTweets}/>
            </Box>
            <Box className={classes.tweetTextContainer}>
              {data.map(item => (
                <Paper className={classes.tweetText}>{item.text}</Paper>
              ))}
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.displayComponents}>
              Save
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainComponent;
