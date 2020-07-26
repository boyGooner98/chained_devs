import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ alerts }) =>
  alerts != null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.key} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.prototype = {
  alerts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => {
  return {
    alerts: state.alert,
  };
};
export default connect(mapStateToProps)(Alert);
