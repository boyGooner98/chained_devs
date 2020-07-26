import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { getProfileById } from '../../actions/profiles';
import ProfileViewExperience from './profileViewExperience'
import ProfileViewEducation from './profileViewEducation';
import ShowRepos from './showRepos.js'
import '../../App.css';
import Spinner from '../../spinner';

const ProfileView = ({
  match,
  getProfileById,
  Profile,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, []);
  return !Profile || Profile.length === 0?(<Spinner/>):(
    <Fragment>
      <div className='container'>
        <Link to='/profiles' class='btn btn-light'>
          Back To Profiles
        </Link>
        {Profile !== null ? (
          <Fragment>
            <div className='profile-grid my-1'>
              <div className='profile-top bg-primary p-2'>
                <img
                  className='round-img my-1'
                  src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
                  alt=''
                />
                <h1 className='large'>{Profile.userName}</h1>
                <p className='lead'>{Profile.status}</p>
                <p>{Profile.location}</p>
                <div className='icons my-1'>
                  <Link
                    to={Profile.website}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <i className='fas fa-globe fa-2x'></i>
                  </Link>
                  <Link to='#!' target='_blank' rel='noopener noreferrer'>
                    <i className='fab fa-twitter fa-2x'></i>
                  </Link>
                  <Link to='#!' target='_blank' rel='noopener noreferrer'>
                    <i className='fab fa-facebook fa-2x'></i>
                  </Link>
                  <Link to='#!' target='_blank' rel='noopener noreferrer'>
                    <i className='fab fa-linkedin fa-2x'></i>
                  </Link>
                  <Link to='#!' target='_blank' rel='noopener noreferrer'>
                    <i className='fab fa-youtube fa-2x'></i>
                  </Link>
                  <Link to='#!' target='_blank' rel='noopener noreferrer'>
                    <i className='fab fa-instagram fa-2x'></i>
                  </Link>
                </div>
              </div>
              <div className='profile-about bg-light p-2'>
                <h2 className='text-primary'>
                  {Profile.userName}'s Bio
                </h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
                  doloremque nesciunt, repellendus nostrum deleniti recusandae
                  nobis neque modi perspiciatis similique?
                </p>
                <div className='line'></div>
                <h2 className='text-primary'>Skill Set</h2>
                <div>{Profile.skills}</div>
              </div>
              <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>
                {Profile.experience !== [] ? <ProfileViewExperience experience={Profile.experience}/>:<Fragment></Fragment>}
              </div>
              {Profile.education !== [] ? <ProfileViewEducation education={Profile.education} /> : <Fragment></Fragment>}
              {Profile.githubuseraccount && Profile.githubuseraccount.length > 0 ? (
                <Fragment>
                  <ShowRepos accountName={Profile.githubuseraccount}/>
                 </Fragment>
               ):<div>No Github Account in Profile</div>}
            </div>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    </Fragment>
  );
};

ProfileView.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  Profile: PropTypes.object.isRequired,
  repos:PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    Profile: state.profile.currentUserProfile
  };
};
export default connect(mapStateToProps, { getProfileById })(ProfileView);
