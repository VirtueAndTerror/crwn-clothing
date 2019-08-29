import React from 'react';

// 'withRouter' is Highter Order Component, that is a function component which accepts another component as a argument and returns a new modified component.

import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

//We are destructuring 'title', 'imageUrl' and 'size' form 'props-object'.
const MenuItem = ({title, imageUrl, size, history, linkUrl, match}) => ( 
  <div className={`${size} menu-item`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
  
    <div className='background-image'style={{
      backgroundImage: `url(${imageUrl})`
    }} />
    <div className="content">
      <h1 className="title">{title.toUpperCase()}</h1>
      <span className="subtitle">SHOP NOW!</span>
    </div>
  </div>
);

export default withRouter(MenuItem);