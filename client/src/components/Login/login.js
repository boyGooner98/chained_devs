import React, { Fragment, useState } from 'react';
import '../../App.css';
import { login } from '../../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link,Redirect } from 'react-router-dom'

const LogIn = ({login,isAuthenticated}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    login({ email, password })
  
  };
    if (isAuthenticated === true) {
      return <Redirect to='/dashBoard' />;
    }
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Log Into Your Account
        </p>
        <form
          className='form'
          action='create-profile.html'
          onSubmit={(e) => onSubmit(e)}
        >
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              onChange={(e) => onChange(e)}
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength='6'
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-primary' value='Register'/>
        </form>
        <p className='my-1'>
          Don't have an account? <Link to = '/signup'>Sign In</Link>
        </p>
      </section>
    </Fragment>
  );
};
LogIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated:state.auth.isAuthenticated
  }
}
export default connect(mapStateToProps,{login})(LogIn);
