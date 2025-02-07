import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChartNoAxesCombined } from 'lucide-react';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">
        StockApp <ChartNoAxesCombined />
      </NavLink>
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" exact activeClassName="active">
            News & Insights
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/data" activeClassName="active">
            Stock Data
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

