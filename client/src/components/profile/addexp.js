import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addExperience } from '../../actions/profiles';
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

const AddExp = ({addExperience,history}) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
      to: '',
    current:false,
    description: '',
  });
    const { title, company, location, from, to, description,current } = formData;
    const [toDateDisable, changeToDate] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <div className='container'>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e=>onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            required
            onChange={(e) => onChange(e)}
            value={title}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            required
            onChange={(e) => onChange(e)}
            value={company}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => onChange(e)}
            value={location}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
                      <input type='checkbox' name='current' value={current} onChange={(e) => {
                          setFormData({
                              ...formData,current:!current
                          })
                          changeToDate(!toDateDisable)
                      }} /> Current Job
          </p>
              </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            onChange={(e) => onChange(e)}
            value={to}
            disabled={toDateDisable?'disabled':null}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </div>
  );
};
AddExp.propTypes = {
    addExperience:PropTypes.func.isRequired,
};

export default connect(null,{addExperience})(withRouter(AddExp));
