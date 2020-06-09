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
import DescriptionIcon from '@material-ui/icons/Description';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DnsIcon from '@material-ui/icons/Dns';
import TodayIcon from '@material-ui/icons/Today';
import PeopleIcon from '@material-ui/icons/People';
import CloseEditButton from './CloseEditButton';
import MapWrapper from '../../../../components/TripsCreator/MapWrapper/MapWrapper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { joinTrip } from '../../../../actions/users/joinTrip';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 800
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  edited: {
    display: 'flex',
    justifyContent: 'center'
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
    marginLeft: 70
  },
  icons: {
    marginRight: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const TicketsCard = ({ data, isTrip, joinTripAction }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [showEditedText, setShowEditedText] = useState(false);
  const [cardValues, setCardValues] = useState({
    comments: [],
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
      setCardValues({
        ...cardValues,
        comments: data.comments,
        id: data.id,
        contact: data.guide.email,
        content: {
          firstName: data.guide.firstName,
          lastName: data.guide.lastName
        }
      });
    }
  }, [data]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleJoin = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const response = await joinTripAction(cardValues.id, token);

      if (response.status === 204) {
        setShowEditedText(true);
        setTimeout(function() {
          setShowEditedText(false);
        }, 3000);
      } else {
        throw new Error('Error retrieving tickets.');
      }
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {`${cardValues.content.firstName[0]}${cardValues.content.lastName[0]}`}
          </Avatar>
        }
        action={!isTrip && <CloseEditButton id={cardValues.id} />}
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
            <MapWrapper
              width={600}
              height={250}
              points={data.route.points}
              isEditable={false}
            />
            <div className={classes.tripDetails}>
              <DnsIcon className={classes.icons} color="error" />
              <Typography variant="h6" color="textSecondary" component="p">
                Name: {data.name}
              </Typography>
            </div>
            <div className={classes.tripDetails}>
              <DescriptionIcon className={classes.icons} color="error" />
              <Typography variant="h6" color="textSecondary" component="p">
                Description: {data.description}
              </Typography>
            </div>
            <div className={classes.tripDetails}>
              <MonetizationOnIcon className={classes.icons} color="error" />
              <Typography variant="h6" color="textSecondary" component="p">
                Cost: {data.cost} PLN
              </Typography>
            </div>
            <div className={classes.tripDetails}>
              <PeopleIcon className={classes.icons} color="error" />
              <Typography variant="h6" color="textSecondary" component="p">
                Peoples: {data.peopleLimit}
              </Typography>
            </div>
            <div className={classes.tripDetails}>
              <TodayIcon className={classes.icons} color="error" />
              <Typography variant="h6" color="textSecondary" component="p">
                When: {data.dateTrip.toLocaleString()}
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                padding: 10
              }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleJoin}
                style={{
                  width: 80
                }}>
                join
              </Button>
            </div>
            {showEditedText && (
              <div className={classes.edited}>
                <Typography color="primary" variant="h5">
                  Joined successfully.
                </Typography>
              </div>
            )}
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
          isTrip={isTrip}
          id={cardValues.id}
          commentsObj={cardValues.comments}
          contact={cardValues.contact}
        />
      </Collapse>
    </Card>
  );
};

TicketsCard.propTypes = {
  data: PropTypes.object,
  isTrip: PropTypes.bool,
  joinTripAction: PropTypes.func
};

export default connect(null, {
  joinTripAction: joinTrip
})(withRouter(TicketsCard));
