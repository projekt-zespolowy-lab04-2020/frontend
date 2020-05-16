import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    },
    flexDirection: 'column',
    alignItems: 'center',
    margin: 80
  }
}));

const Spinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
      <Typography variant="h6" color="textSecondary" component="p">
        Downloading from database...
      </Typography>
    </div>
  );
};

export default Spinner;
