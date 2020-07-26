import React, { useEffect, Fragment } from 'react';
import { getRepos, getProfileById } from '../../actions/profiles';
import { connect } from 'react-redux';
import profile from '../../reducers/profile';

const ShowRepos = ({
  accountName,
  getRepos,
  repos,
  getProfileById,
  Profile,
}) => {
  useEffect(() => {
    getRepos(accountName);
  }, []);
  return (
    <div className='container'>
      {repos && repos.length > 0 ? (
        <div class='profile-github'>
          <h2 class='text-primary my-1'>
            <i class='fab fa-github'></i> Github Repos
          </h2>
          {repos.map((repo,index) => (
              <div class='repo bg-white p-1 my-1' key = {index}>
                <div>
                  <h4>
                    <a href='#' target='_blank' rel='noopener noreferrer'>
                      Repo #{index+1}
                    </a>
                  </h4>
                  <p>
                    {repo.description}
                  </p>
                </div>
                <div>
                  <ul>
                          <li class='badge badge-primary'>Stars: {repo.stars}</li>
                          <li class='badge badge-dark'>Watchers: {repo.watchers}</li>
                          <li class='badge badge-light'>Forks: {repo.forks_count}</li>
                  </ul>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Repos Exist for {accountName}</div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
    Profile: state.profile,
  };
};

export default connect(mapStateToProps, { getRepos, getProfileById })(
  ShowRepos
);
