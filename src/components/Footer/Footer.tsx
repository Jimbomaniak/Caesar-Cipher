import * as React from 'react';
import './Footer.css'

interface IFooterProps {
  text: string;
}

const Footer = (props: IFooterProps) => {
  return <div className='footer'>
    <p>
      {props.text}
    </p>
  </div>
};


export default Footer