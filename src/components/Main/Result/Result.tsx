import * as React from 'react';
import './Result.css'

interface IResultProps {
  shiftValue: number;
  text: string;
}

const Result = (props: IResultProps) => (
  <div className='result'>
    <div className='text'>
      Shift on {`${props.shiftValue} ${props.shiftValue === 1 ? 'character' : 'characters'}`}
    </div>
    <span>{props.text}</span>
  </div>
)

export default Result