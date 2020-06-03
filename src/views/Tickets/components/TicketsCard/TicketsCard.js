import React, { useEffect, useState } from 'react';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TicketsCardComments from './TicketsCardComments';
import PropTypes from 'prop-types';
import PublicIcon from '@material-ui/icons/Public';
import TodayIcon from '@material-ui/icons/Today';
import PeopleIcon from '@material-ui/icons/People';
import CloseEditButton from './CloseEditButton';
import MapWrapper from '../../../../components/TripsCreator/MapWrapper/MapWrapper';

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
  tripDetails: {
    display: 'flex',
    alignItems: 'center',
    '&:last-of-type': {
      marginBottom: 20
    }
  },
  icons: {
    marginRight: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const TicketsCard = ({ data, isTrip }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  console.log(data);
  const [cardValues, setCardValues] = useState({
    comments: '',
    ticket: '',
    id: -1,
    content: {
      firstName: '',
      lastName: ''
    },
    contact: ''
  });

  useEffect(() => {
    if (!isTrip) {
      setCardValues({
        comments: data.comments,
        ticket: data.ticket,
        id: data.ticket.id,
        content: data.ticket.content,
        contact: data.ticket.content.contact
      });
    } else {
    }
  }, [data]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {`${cardValues.content.firstName[0]}${cardValues.content.lastName[0]}`}
          </Avatar>
        }
        action={<CloseEditButton id={cardValues.id} />}
        title={`${cardValues.content.firstName} ${cardValues.content.lastName}`}
        subheader={new Date().toLocaleString()}
      />

      <CardContent>
        <div className={classes.title}>
          <Typography variant="h4" color="textSecondary" component="p">
            {cardValues.content.subject}
          </Typography>
        </div>
        {isTrip && (
          <>
            <div className={classes.tripDetails}>
              <PublicIcon className={classes.icons} color="primary" />
              <Typography variant="h6" color="textSecondary" component="p">
                Where: {data.destination}
              </Typography>
              {/*<MapWrapper width={500} height={100} isStaticMap={false} />*/}
            </div>
            <div className={classes.tripDetails}>
              <TodayIcon className={classes.icons} color="primary" />
              <Typography variant="h6" color="textSecondary" component="p">
                {/*When: {data.dateTrip}*/}
                When:
              </Typography>
            </div>

            <div className={classes.tripDetails}>
              <PeopleIcon className={classes.icons} color="primary" />
              <Typography variant="h6" color="textSecondary" component="p">
                Peoples: {data.peopleLimit}
              </Typography>
            </div>
          </>
        )}
        <Typography variant="body1" color="textSecondary" component="p">
          {cardValues.content.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
        <TicketsCardComments
          id={cardValues.ticket.id}
          commentsObj={cardValues.comments}
          contact={cardValues.contact}
        />
      </Collapse>
    </Card>
  );
};

TicketsCard.propTypes = {
  data: PropTypes.object,
  isTrip: PropTypes.bool
};

export default TicketsCard;
