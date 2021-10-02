import React, { useState } from 'react';
import { makeStyles, Paper, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
    maxWidth: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const SearchBar = ({ fetchTweets, setNewSearchValue }) => {
  const classes = useStyles();
  const [value, ] = useState();

  const handleValueChange = (event) => {
    setNewSearchValue(event.target.value);
    fetchTweets();
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search for Tweets"
        inputProps={{ 'aria-label': 'search for tweets' }}
        value={value}
        onChange={handleValueChange}
      />
      <IconButton 
        aria-label="search"
        className={classes.iconButton} 
        onClick={fetchTweets}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
