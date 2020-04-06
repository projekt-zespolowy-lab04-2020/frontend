import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  avatar: {
    backgroundColor: red[500]
  },
  footerCommentsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '10px'
  },
  comments: {
    background: '#F4F6F8',
    borderRadius: '5px',
    padding: '20px 20px',
    marginTop: '15px'
  },
  author: {
    fontWeight: 600
  },
  footerComments: {
    display: 'inline',
    padding: '3px 3px'
  }
}));

const TicketsCard = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [edited, setEdited] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more">
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <>
            <Typography className={classes.comments}>
              <span className={classes.author}>Laex Adsd </span>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.Set aside off of the heat to let rest for 10 minutes, and
              then serve.
            </Typography>
            <div className={classes.footerCommentsWrapper}>
              <Typography className={classes.footerComments}>
                5 hours ago
              </Typography>{' '}
              {edited && (
                <Typography className={classes.footerComments}>
                  Edited
                </Typography>
              )}
            </div>
          </>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TicketsCard;
