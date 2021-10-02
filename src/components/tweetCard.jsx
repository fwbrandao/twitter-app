import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './itemTypes';
import { Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  tweetText: {
    marginTop: '10px',
    padding: theme.spacing(1),
  },
}));

const TweetCard = ({ text }) => {
  const classes = useStyles();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setItems(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);
  
  const [, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { text },
    end(item, monitor) {
      // TODO push new items into localStorage array
      setItems([...items, item.text]);
    },
    collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
    }),
}), [text]);

  return (
    <>
      <Paper 
        ref={drag} 
        className={classes.tweetText} 
      >
        {text}
      </Paper>
    </>
  )
};

export default TweetCard;