import React from 'react';
import './Textarea.css'


const Textarea = (props) => {
  return <div className='user-input'>
          <textarea placeholder="Enter text"
                    onChange={props.changed}>
          </textarea>
          <div className='output'>{props.text}</div>
        </div>
};



export default Textarea