import React, { Fragment } from 'react'
import spinner from './spinner.gif'

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      alt='Loading...'
      style={{
        width: '200px',
        margin: 'auto',
        marginTop: '40px',
        display: 'block',
      }}
    />
  </Fragment>
)

export default Spinner
