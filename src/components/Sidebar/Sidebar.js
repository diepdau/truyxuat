import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {menu} from "./data.ts"
import { Link } from "react-router-dom";
function Sidebar0() {
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
          <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
        </Helmet>
        <nav className="sidebar">
        <div className="menu-items">
          {menu.map((item) => (
            <Link className="menu-link" key={item.id} to={item.url}>
              <li className="item" >
                <i className={item.icon}></i>
                <span className="title">{item.label}</span>
              </li>
            </Link>
          ))}
        </div>
      </nav>
      </div>
    </HelmetProvider>
  );
}

export default Sidebar0;
