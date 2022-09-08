import React, { Component } from "react";
import { Link } from 'react-router-dom';
import style from "./Nav.module.css";

// CUIDADO! SI O SI CLASS COMPONENT! SINO SE ROMPEN LOS TEST EN CASO CONTRARIO!
class Nav extends Component {
  render() {
    return(
      <nav>
        <div className={style.container}>
          <ul>
          <Link to={"/pokemon"}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"/>
          </Link>
        
            <li>
              <Link to={"/create"}>Create Your Own</Link>
            </li>
       
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;
