import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, getCurrentPost } from '../../actions/posts';
import Comment from './comment';

const ShowSinglePost = (props) => {
  const { postData } = props.location.aboutProps;
  const { addComment, getCurrentPost, currentPost } = props;
  const [text, setText] = useState('');
  useEffect(() => {
    getCurrentPost(postData);
  }, []);
  return (
    currentPost && (
      <section class='container'>
        <a href='posts.html' class='btn'>
          Back To Posts
        </a>
        <div class='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img class='round-img' src={currentPost.avatar} alt='' />
              <h4>{currentPost.name}</h4>
            </a>
          </div>
          <div>
            <p class='my-1'>{currentPost.text}</p>
          </div>
        </div>

        <div class='post-form'>
          <div class='bg-primary p'>
            <h3>Leave A Comment</h3>
          </div>
          <form
            class='form my-1'
            onSubmit={(e) => {
              e.preventDefault();
              addComment({ text }, currentPost._id);
              setText('');
            }}
          >
            <textarea
              name='text'
              cols='30'
              rows='5'
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Comment on this post'
              required
            ></textarea>
            <input type='submit' class='btn btn-dark my-1' value='Submit' />
          </form>
        </div>

        {currentPost.comments &&
          currentPost.comments.length > 0 &&
          currentPost.comments.map((comment) => (
            <Comment comments={comment} id={currentPost._id} />
          ))}
      </section>
    )
  );
};

ShowSinglePost.propTypes = {};
const mapStateToProps = (state) => {
  return {
    currentPost: state.posts.post,
  };
};

export default connect(mapStateToProps, { addComment, getCurrentPost })(
  ShowSinglePost
);
