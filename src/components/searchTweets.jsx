import React, { useState } from 'react';
import { Box, Paper, makeStyles, Typography } from '@material-ui/core';
import SearchBar from './searchBar';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './itemTypes';
import Twit from 'twit';
var config = require('../config.json');

const useStyles = makeStyles((theme) => ({
  searchComponent: {
    display: 'flex',
    justifyContent: 'center',
  },
  tweetTextContainer: {
    dispaly: 'flex',
  },
  tweetText: {
    marginTop: '10px',
    padding: theme.spacing(1),
  },
  errorMessage: {
    marginTop: theme.spacing(2),
  }
}));

const SearchTweets = () => {

  const classes = useStyles();
  var T = new Twit(config);

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function handleFetchTweets() { 
    try {
      T.get('search/tweets', { 
        q: `'${searchValue} since:2011-07-11'`, 
        count: 10 
      }, function(err, data, response) {
        if (response.statusCode === 401) {
          setError(true);
          setErrorMessage(
            'Please follow instructions in the README file on how to add your Twitter API credentials and disable CORS!'
          );
          return;
        }
        if (data.statuses === undefined) {
          setError(true);
          setErrorMessage('No matches found!');
          return;
        };
          setError(false);
          setData(data.statuses);
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const [{ opacity }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
  }));

  return (
    <>
      <Box className={classes.searchComponent}>
        <SearchBar 
          fetchTweets={handleFetchTweets}
          setNewSearchValue={setSearchValue}
        />
      </Box>
      {!error ? (
        <Box className={classes.tweetTextContainer}>
          {data?.map(item => (
            <Paper ref={drag} key={item.id} className={classes.tweetText}>{item.text}</Paper>
          ))}
        </Box>
      ) : (
        <Typography className={classes.errorMessage}>{errorMessage}</Typography>
      )}
    </>
  )
};

export default SearchTweets;