import * as React from 'react';
import './Prediction.css'

interface IPredictionProps {
  shift: number;
  text: string;
}


const Prediction = (props: IPredictionProps) => {
  return  <div className='prediction'>
    <div className='pred-number'>Possible shift : {props.shift ? props.shift : ''}</div>
    <span>{props.text}</span>
  </div>
};

export default Prediction