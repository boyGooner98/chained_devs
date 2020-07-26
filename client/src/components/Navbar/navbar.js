import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import '../../App.css'
const Navbar = ({auth:{isAuthenticated,loading},logout}) => {

  const authLinks = (
    <ul>
      <li>
        <i class='fa fa-dashcube' aria-hidden='true'></i>
        <Link to='/dashboard'>Dashboard</Link>
      </li>
      <li>
        <i class='fa fa-user' aria-hidden='true'></i>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <i class='fa fa-sign-out' aria-hidden='true'></i>
        <Link onClick={logout} to='/'>
          LogOut
        </Link>
      </li>
      <li>
      <i class="fa fa-podcast" aria-hidden="true"></i><Link to='/posts'>Posts</Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <i class='fa fa-user' aria-hidden='true'></i>{' '}
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
       <i class="fa fa-user-plus" aria-hidden="true"></i> <Link to='/register'>Register</Link>
      </li>
      <li>
        <i class="fa fa-sign-in" aria-hidden="true"></i><Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <Fragment>
      <nav class='navbar bg-dark'>
        <h1>
          <Link to='/'>
            CHAINED <i class="fa fa-chain-broken" aria-hidden="true"></i> DEVS
          </Link>
        </h1>
        {!loading && (<Fragment>{isAuthenticated?authLinks:guestLinks}</Fragment>)}
      </nav>
    </Fragment>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => {
  return {
   auth:state.auth
  }
}
export default connect(mapStateToProps,{logout})(Navbar);