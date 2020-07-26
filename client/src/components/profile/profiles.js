import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions/profiles';
import { Link } from 'react-router-dom'
import Spinner from '../../spinner';

const Profiles = ({ getAllProfiles, profile: { profiles } }) => {
  useEffect(() => {
    getAllProfiles();
  }, []);
  const showSkills = (skills) =>
    skills.map((skill) => (
      <li className='text-primary'>
        <i className='fas fa-check'></i> {skill}
      </li>
    ));
  const showProfiles = profiles.map((profile) => (
    <div className='profiles'>
      <div className='profile bg-light'>
        <img className='round-img' src={`${profile.userGravatar}`} alt='' />
        <div>
          <h2>John Doe</h2>
          <p>Developer at {profile.company}</p>
          <p>{profile.location}</p>
          <Link
            to={`/${profile.user}`}
            className='btn btn-primary'
          >
            View Profile
          </Link>
        </div>
        <ul>{showSkills(profile.skills)}</ul>
      </div>
    </div>
  ));
  return !profiles || profiles.length === 0?(<Spinner/>):(
    <Fragment>
      {profiles.length > 0 ? (
        <div>
          <div className='container'>
            <h1 class='large text-primary'>Developers</h1>
            <p className='lead'>
              <i className='fab fa-connectdevelop'></i> Browse and connect with
              developers
            </p>
            {showProfiles}
          </div>
        </div>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
    
};

Profiles.propTypes = {
  getAllProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, { getAllProfiles })(Profiles);
