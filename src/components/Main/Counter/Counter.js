import React from 'react';
import './Counter.css'

const Counter = (props) => {
    return <div className='counter'>
      <span className="minus" onClick={props.decrease}>-</span>
      <div className='number'>{props.num}</div>
      <span className="plus" onClick={props.increase}>+</span>
    </div>
};


export default Counter