import React from 'react';
import { useDrop } from 'react-dnd';
import { ItemTypes } from './itemTypes';
import { Paper, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tweetText: {
    marginTop: '10px',
    padding: theme.spacing(1),
  },
}));

const SavedTweets = ({ allowedDropEffect }) => {
  const classes = useStyles();

  var savedTweets = JSON.parse(localStorage.getItem("items")) || [];

  console.log('savedTweets', savedTweets);

  const [, drop] = useDrop(() => ({
      accept: ItemTypes.CARD,
      drop: () => ({
          name: `${allowedDropEffect} Dustbin`,
          allowedDropEffect,
      }),
      collect: (monitor) => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
      }),
  }), [allowedDropEffect]);


return (
    <>
      <Typography>Saved Tweets</Typography>
      {savedTweets.map(text => (
        <Paper 
          key={text}
          ref={drop} 
          className={classes.tweetText} 
        >
          {text}
        </Paper>
      ))}
    </>
  );
};

export default SavedTweets;