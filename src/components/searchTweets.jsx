import React, { useState } from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import SearchBar from './searchBar';
import Twit from 'twit';
import TweetCard from './tweetCard';
var config = require('../config.json');

const useStyles = makeStyles((theme) => ({
  searchComponent: {
    display: 'flex',
    justifyContent: 'center',
  },
  tweetTextContainer: {
    dispaly: 'flex',
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
        if (response?.statusCode === 401) {
          setError(true);
          setErrorMessage(
            'Please follow instructions in the README file on how to add your Twitter API credentials and disable CORS!'
          );
          return;
        }
        if (data?.statuses === undefined) {
          setError(true);
          setErrorMessage('No matches found!');
          return;
        };
          setError(false);
          setData(data?.statuses);
      });
    } catch (err) {
      console.log('err', err);
    }
  };


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
          {data?.map(({ text }, index) => (
            <TweetCard key={index} text={text} isDropped={text}/>
          ))}
        </Box>
      ) : (
        <Typography className={classes.errorMessage}>{errorMessage}</Typography>
      )}
    </>
  )
};

export default SearchTweets;