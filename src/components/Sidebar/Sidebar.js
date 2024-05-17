import React,{useContext,useState} from 'react';
import {menu} from "./data.ts";
import {menuUser} from "./dataUser.ts";
import { Link } from "react-router-dom";
import 'primeicons/primeicons.css';
import "./Sidebar.css";
import { AuthContext } from "../../asset/service/user_service.js";

function Sidebar0() {
  const { currentUser } = useContext(AuthContext);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <nav className="sidebar">
        <div className="menu-items">
          {currentUser.role === "admin" ? (
            menu.map((item) => (
              <Link className="menu-link" key={item.id} to={item.url}>
                <li
                  className={selectedItem === item ? 'selected item' : 'item'}
                  onClick={() => handleItemClick(item)}
                >
                  <i id="icon"className={item.icon}></i>
                  <span className="title">{item.label}</span>
                </li>
              </Link>
            ))
          ) : (
            menuUser.map((item) => (
              <Link className="menu-link" key={item.id} to={item.url}>
                <li
                  className={selectedItem === item ? 'selected item' : 'item'}
                  onClick={() => handleItemClick(item)}
                >
                  <i id="icon" className={item.icon}></i>
                  <span className="title">{item.label}</span>
                </li>
              </Link>
            ))
          )}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar0;

