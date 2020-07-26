import React, { Fragment } from 'react';
import ProfileViewExperience from './profileViewExperience';
import {format} from 'date-fns'

const ProfileViewEducation = (props) => {
  return (
    <div>
    <Fragment>
      <div className='profile-exp bg-white p-2'>
        <h2 className='text-primary'>Education</h2>
        {props.education && props.education.length > 0 ? (
          <Fragment>
            <div className>
              {props.education.map((education) => (
                <div key={1}>
                  <h3>{education.school}</h3>
                  <p>
                    {format(new Date(education.from), 'MM/dd/yyyy')}-
                    {format(new Date(education.to), 'MM/dd/yyyy')}
                  </p>
                  <p>
                    <strong>Degree: </strong>
                    {education.degree}
                  </p>
                  <p>
                    <strong>Field Of Study: </strong>
                    {education.fieldofstudy}
                  </p>
                  <p>
                    <strong>Description: </strong>Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Dignissimos placeat, dolorum
                    ullam ipsam, sapiente suscipit dicta eius velit amet
                    aspernatur asperiores modi quidem expedita fugit.
                  </p>
                  <hr />
                </div>
                
              ))}
              </div>
             
          </Fragment>
        ) : (
          <div>Nothing to Show</div>
        )}
      </div>
      </Fragment>
    </div>
  );
};
export default ProfileViewEducation;
