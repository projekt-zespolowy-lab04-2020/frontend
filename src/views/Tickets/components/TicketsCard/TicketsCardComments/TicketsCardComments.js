import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createComments } from '../../../../../actions/tickets/createComments';

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
    borderRadius: 20,
    marginTop: 30
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

const TicketsCardComments = ({
  author,
  commentsObj,
  createCommentsAction,
  id,
  userObject
}) => {
  const [comments, setComments] = useState([]);
  const [formValue, setFormValue] = useState('');
  const classes = useStyles();

  const handleChange = event => {
    setFormValue(event.target.value);
  };

  useEffect(() => {
    setComments(commentsObj);
  }, [commentsObj]);

  const createComments = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const content = {
        author: `${userObject.firstName} ${userObject.lastName}`,
        content: formValue
      };

      const response = await createCommentsAction(content, id, token);
      if (response.status !== 200) {
        throw new Error('Error during creating comments tickets.');
      }
    }
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
      createComments().catch(e => console.error(e.message));
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
                {`${author.firstName} ${author.lastName}`}
                <span className={classes.date}>
                  {' '}
                  {new Date().toLocaleDateString()}
                </span>
              </span>
              {comment.content}
            </Typography>
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
  author: PropTypes.object,
  commentsObj: PropTypes.arrayOf(PropTypes.object),
  createCommentsAction: PropTypes.func,
  id: PropTypes.number,
  userObject: PropTypes.object
};

const mapStateToProps = state => {
  const { user } = state;

  return {
    userObject: user
  };
};

export default connect(mapStateToProps, {
  createCommentsAction: createComments
})(withRouter(TicketsCardComments));
