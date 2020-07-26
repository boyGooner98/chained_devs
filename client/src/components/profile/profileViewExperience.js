import React, { Fragment } from 'react';
import {format } from 'date-fns';


const ProfileViewExperience = (props) => {
  return (
    <div>
      {props.experience && props.experience.length > 0 ? (
        <Fragment>
          {props.experience.map((experience) => (
           
              <div>
                <h3 class='text-dark'>Company: <span style={{
                  fontWeight: '100'
                }}>{experience.company}</span></h3>
                <p>
                  {format(new Date(experience.from), 'MM/dd/yyyy')}-
                    {format(new Date(experience.to), 'MM/dd/yyyy')}
                </p>
                <p>
                  <strong>Position: </strong>
                  {experience.title}
                </p>
                <p>
                  <strong>Description: </strong>
                  {experience.description}
                </p>
                <hr />
              </div>
              
            
          ))}
        </Fragment>
      ) : (
        <div>nothing to show</div>
      )}
      </div>
  );
};

export default ProfileViewExperience;
