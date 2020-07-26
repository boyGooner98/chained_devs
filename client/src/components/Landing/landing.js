import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import '../../App.css';
const Landing = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to = "/dashboard"/>
  }
    return (
      <Fragment>
        <div className='landingContainer'>
          <section className='landing'>
            <div className='dark-overlay'>
              <div className='landing-inner'>
                <p className='lead'>
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <div className='buttons'>
                  <Link to='/signup' className='btn btn-primary'>
                    Sign Up
                  </Link>
                  <Link to='/login' className='btn btn-newButton'>
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    );
}
const mapStateToProps = (state) => {
  return {
    auth:state.auth
  }
}
export default connect(mapStateToProps)(Landing);