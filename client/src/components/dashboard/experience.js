import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profiles'
const Experience = ({ experiences,deleteExperience }) => {

  const experience = experiences.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment>-
        {exp.to != null ? (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        ) : (
          ' Now'
        )}
      </td>
      <td>
        <button className='btn btn-danger' onClick={()=>deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            {' '}
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th/>
          </tr>
        </thead>
        <tbody>{experiences.length !== 0?experience:<Fragment/>}</tbody>
      </table>
    </Fragment>
  );
};
Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
  deleteExperience:PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience);
