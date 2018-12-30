import * as React from 'react';
import './Header.css'

interface IHeaderProps {
  children?: Node | string;
}

const Header = (props: IHeaderProps) => (
  <div className='header'>
    <div className="title">
      {props.children}
    </div>
  </div>
)

export default Header