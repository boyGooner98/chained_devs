import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../../actions/posts';
import {format } from 'date-fns'

const Comment = (props) => {
  const { comments, id,deleteComment } = props;

  const deleteTheComment = (postId, commentId) => {
    deleteComment(postId, commentId);
  };
  return (
    <div class='comment bg-light p-1 my-1'>
      <div>
        <a href='profile.html'>
          <img class='round-img' src={comments.avatar} alt='' />
          <h4>{comments.name}</h4>
        </a>
      </div>
      <div>
        <p class='my-1'>
          {comments.text}{' '}
        </p>
        <p class='post-date'>
          Posted on {format(new Date(comments.date), 'MM/dd/yyyy')}
        </p>
      </div>
    </div>
  );
};

export default connect(null,{deleteComment})(Comment);
