import React from 'react';
import {menu} from "./data.ts"
import { Link } from "react-router-dom";
import 'primeicons/primeicons.css';
import "./Sidebar.css"
function Sidebar0() {
  return (
      <div>
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
  );
}

export default Sidebar0;
