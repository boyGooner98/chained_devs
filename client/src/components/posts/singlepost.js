import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { delPost, getPosts, addLike, removeLike } from '../../actions/posts';

const SinglePost = (props) => {
  const { data, auth, delPost, addLike, removeLike } = props;
  const deletepost = (id) => {
    delPost(id);
  };
  const addALike = (id) => {
    addLike(id);
  };
  const removeALike = (id) => {
    removeLike(id);
  };
  return (
    <div className='container'>
      <div class='posts'>
        <div class='post bg-white p-1 my-1'>
          <div>
            <a href='profile.html'>
              <img class='round-img' src={data.avatar} alt='alt' />
              <h4>{data.name}</h4>
            </a>
          </div>
          <div>
            <p class='my-1'>{data.text}</p>
            <p class='post-date'>{format(new Date(data.date), 'MM/dd/yyyy')}</p>
            <button
              type='button'
              class='btn btn-light'
              onClick={() => addALike(data._id)}
            >
              <i class='fas fa-thumbs-up'></i>
              <span>{data.likes.length}</span>
            </button>
            <button
              type='button'
              class='btn btn-light'
              onClick={() => removeALike(data._id)}
            >
              <i class='fas fa-thumbs-down'></i>
            </button>
            <Link
              to={{
                pathname: `/posts/${data._id}`,
                aboutProps: {
                  postData: data._id,
                },
              }}
              class='btn btn-primary'
            >
              Discussion{' '}
              <span class='comment-count'>{data.comments.length}</span>
            </Link>
            {auth.user._id === data.user && (
              <button
                type='button'
                class='btn btn-danger'
                onClick={() => deletepost(data._id)}
              >
                <i class='fa fa-trash' aria-hidden='true'></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
SinglePost.propTypes = {
  auth: PropTypes.object.isRequired,
  delPost: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps, {
  delPost,
  getPosts,
  addLike,
  removeLike,
})(SinglePost);
