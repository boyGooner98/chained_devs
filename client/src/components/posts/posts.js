import React, { useEffect, Fragment } from 'react';
import { getPosts } from '../../actions/posts';
import { connect } from 'react-redux';
import posts from '../../reducers/posts';
import SinglePost from './singlepost';
import AddPost from './addPost';
import PropTypes from 'prop-types';
import Spinner from '../../spinner';
const Posts = ({ getPosts, Posts }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);
  return !Posts || Posts.length === 0 ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className='container'>
        <h2 className='large text-primary'>Posts</h2>
        <AddPost />
        {Posts &&
          Posts.length > 0 &&
          Posts.map((post) => <SinglePost data={post} />)}
      </div>
    </Fragment>
  );
};

posts.PropTypes = {
  getPosts: PropTypes.func.isRequired,
  Posts: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  Posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(Posts);
