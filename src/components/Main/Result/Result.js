import React from 'react';
import './Result.css'

const Result = (props) => {
  return  <div className='result'>
      <div className='text'>Shift on {props.shiftValue === 1 ? props.shiftValue + " character" : props.shiftValue + " characters" }.</div>
      <span>{props.text}</span>
    </div>
};

export default Result