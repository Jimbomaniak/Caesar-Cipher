import React from 'react';
import './Counter.css'

interface ICounterProps {
  decrease(): void;
  increase(): void;
  num: number;
}

const Counter = (props: ICounterProps) => (
 <div className='counter'>
  <div className="minus" onClick={props.decrease}>
    <i className="fas fa-minus"></i>
  </div>
  <div className='number'>{props.num}</div>
  <div className="plus" onClick={props.increase}>
    <i className="fas fa-plus"></i>
  </div>
 </div>
)


export default Counter