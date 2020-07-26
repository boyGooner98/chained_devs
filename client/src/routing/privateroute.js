import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Link, Route } from 'react-router-dom'

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  path,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);
PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired,
}
const mapStateToProps = (state) => {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)