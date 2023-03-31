import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { MENU_OBJECT } from '../common/const';
import './header.css';

export default function Header() {
  const activeHeaderKey = useLocation().pathname;
  let activeHeader = '';
  const navLinks = Object.entries(MENU_OBJECT).map(([url, value]) => {
    let className = 'header-link';
    if (activeHeaderKey === url) {
      activeHeader = value;
      className += ' active-link';
    }
    return (
      <li key={'nav_link_' + url}>
        <NavLink to={url} className={className}>
          {value}
        </NavLink>
      </li>
    );
  });

  return (
    <div className="main-header__wrapper">
      <h2 className="nav-header">{activeHeader}</h2>
      <nav>
        <ul>{navLinks}</ul>
      </nav>
    </div>
  );
}
