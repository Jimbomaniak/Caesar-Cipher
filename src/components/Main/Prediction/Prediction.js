import React from 'react';
import './Prediction.css'

const Prediction = (props) => {
  return  <div className='prediction'>
    <div className='pred-number'>Possible shift : {props.number ? props.number : ''}</div>
    <span>{props.text}</span>
  </div>
};

export default Prediction