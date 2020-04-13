import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    borderRadius: '20px'
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
    fontWeight: 600,
    display: 'block',
    marginBottom: '10px'
  },
  footerComments: {
    display: 'inline',
    padding: '3px 3px'
  },
  date: {
    fontWeight: 400
  },
  commentsInput: {
    background: '#F4F6F8'
  }
});

const TicketsCardComments = ({ userObject }) => {
  const [edited, setEdited] = useState(true);
  const [comments, setComments] = useState([
    {
      content: 'content content content content',
      author: 'John '
    },
    {
      content: 'string string string',
      author: 'Sins '
    }
  ]);
  const [formValue, setFormValue] = useState('');
  const classes = useStyles();

  const handleChange = event => {
    setFormValue(event.target.value);
  };

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      if (formValue) {
        setComments([
          ...comments,
          {
            author: `${userObject.firstName} ${userObject.lastName}`,
            content: formValue
          }
        ]);
      }
      setFormValue('');
      event.preventDefault();
    }
  };

  return (
    <CardContent>
      <>
        {comments.map((comment, index) => (
          <div key={index}>
            <Typography className={classes.comments}>
              <span className={classes.author}>
                {comment.author}
                <span className={classes.date}>
                  {' '}
                  {new Date().toLocaleDateString()}
                </span>
              </span>
              {comment.content}
            </Typography>
            <div className={classes.footerCommentsWrapper}>
              {edited && (
                <Typography className={classes.footerComments}>
                  Edited
                </Typography>
              )}
            </div>
          </div>
        ))}

        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Leave comments"
            variant="outlined"
            fullWidth
            type="text"
            value={formValue || ''}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className={classes.commentsInput}
          />
        </form>
      </>
    </CardContent>
  );
};

TicketsCardComments.propTypes = {
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, null)(withRouter(TicketsCardComments));
