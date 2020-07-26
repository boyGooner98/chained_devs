import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { findProfile } from '../../actions/profiles';
import { loadUser } from '../../actions/auth';
import Experience from './experience';
import Education from './education';
import { deleteAccount } from '../../actions/profiles';
import Spinner from '../../spinner';

const DashBoard = ({ profile, findProfile, deleteAccount, loadUser, auth }) => {
  useEffect(() => {
    loadUser();
    findProfile();
  }, []);
  const delAccount = () => {
    deleteAccount();
 
  };
  return auth.loading || !auth.user ? (
    <Spinner />
  ) : (
      <Fragment>
        <div className='container container-dashboard'>
          <h1 class='large text-primary'>Dashboard</h1>
          <div>
            {profile ? (
              <div>
                {' '}
                <p class='lead'>
                  <i class='fas fa-user'></i> Welcome {auth.user.name}
                </p>
                <div class='dash-buttons'>
                  <Link to='/editprofile' class='btn btn-light'>
                    <i class='fas fa-user-circle text-primary'></i> Edit Profile
                </Link>
                  <Link to='/addexperience' class='btn btn-light'>
                    <i class='fab fa-black-tie text-primary'></i> Add Experience
                </Link>
                  <Link to='/addeducation' class='btn btn-light'>
                    <i class='fas fa-graduation-cap text-primary'></i> Add
                  Education
                </Link>
                </div>
                {profile.education != null && profile.education.length > 0 ? (
                  <Education education={profile.education}></Education>
                ) : (
                    ''
                  )}
                {profile.experience != null && profile.experience.length > 0 ? (
                  <Experience experiences={profile.experience}></Experience>
                ) : (
                    ''
                  )}
              </div>
            ) : (
                <Fragment>
                  <h4>No Profile Exist</h4>
                  <Link to='/createprofile' className='btn btn-success'>
                    create Profile
              </Link>
                </Fragment>
              )}
          </div>
          <br />
          <br />
          <button
            className='btn btn-danger'
            style={{
              borderRadius: '1px',
            }}
            onClick={() => delAccount(), <Redirect to='/' />}
          >
            Delete your Account
        </button>
        </div>
      </Fragment>
    );
};

DashBoard.propTypes = {
  profile: PropTypes.object.isRequired,
  findProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  findProfile,
  deleteAccount,
  loadUser,
})(DashBoard);
