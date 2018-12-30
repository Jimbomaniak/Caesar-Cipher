import * as React from 'react';
import './Textarea.css'

interface ITextareaProps {
  changed(e: Object): void;
}

const Textarea = (props : ITextareaProps) => (
  <div className='user-input'>
    <textarea placeholder="Enter text" onChange={props.changed}></textarea>
  </div>
)

export default Textarea