import React, { Fragment } from 'react';
import spin from './img/Ellipsis-1s-200px.gif';

export default () => (
  <Fragment>
    <img
      src={spin}
      style={{ width: '200px', display: 'block', margin: 'auto' }}
      alt='loading.....'
    />
  </Fragment>
);
