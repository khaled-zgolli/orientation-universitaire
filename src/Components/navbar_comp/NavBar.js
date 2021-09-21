import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import Dropdown_université from "./Dropdown_université";
import Dropdown_diplome from "./Dropdown_diplome";
import Dropdown_domaine from "./Dropdown_domaine";
import Swal from "sweetalert2";

function NavBar() {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);
  const [isCons, setisCons] = useState(false);
  const [isEtud, setisEtud] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem("Loggedin"));
    setisAdmin(localStorage.getItem("isAdmin"));
    setisCons(localStorage.getItem("isCons"));
    setisEtud(localStorage.getItem("isEtud"));
  }, []);

  const Deconnect = () => {
    localStorage.clear();
    window.location.href = "/connexion";
  };

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdownDip, setDropdownDip] = useState(false);
  const [dropdownDom, setDropdownDom] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
/***********************universite****************************** */
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

/************************diplome***************************** */
  const onMouseEnterDip = () => {
    if (window.innerWidth < 960) {
      setDropdownDip(false);
    } else {
      setDropdownDip(true);
    }
  };

  const onMouseLeaveDip = () => {
    if (window.innerWidth < 960) {
      setDropdownDip(false);
    } else {
      setDropdownDip(false);
    }
  };


  /*******************************domaine************************** */
  const onMouseEnterDom = () => {
    if (window.innerWidth < 960) {
      setDropdownDom(false);
    } else {
      setDropdownDom(true);
    }
  };

  const onMouseLeaveDom = () => {
    if (window.innerWidth < 960) {
      setDropdownDom(false);
    } else {
      setDropdownDom(false);
    }
  };

  const choose = () => {
    Swal.fire({
      title: "S'inscrire comme",
      icon: "question",
      html:
        '<br><div><button class="btn" > <a style="text-decoration:none ; color:#FFF6C5" href="/sign_up"> Etudiant </a> </button>' +
        ' <button class="btn"><a style="text-decoration:none ; color:#FFF6C5" href="/sign_up_cons"> Conseiller </a> </button></div>',
      showCloseButton: true,
      showConfirmButton: false,
      background: "black",
    });
  };

  var jsonString = localStorage.getItem("user");
  var user = JSON.parse(jsonString);

  return (
    <div >
      <nav className="navbar" >
      {LoggedIn && isAdmin ? ( 
        <div className="navbarlogo"> 
        <img src={logo} alt="Logo" />
        </div>
      )
       : 
      ( <Link to="/" className="navbarlogo" onClick={closeMobileMenu}>
      <img src={logo} alt="Logo" />
    </Link>)
      } 
       

        {/* display on phone screen version */}
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {LoggedIn && isAdmin ? 
          (
            <div></div>
          ) 
          : 
          (
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Acceuil
              </Link>
            </li>
          )}

          {LoggedIn && isAdmin ? 
          (
            <div></div>
          ) 
          : 
          (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              >
              <span
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Université <i className="fas fa-caret-down" />
              </span>
              {dropdown && <Dropdown_université />}
            </li>
          )}

          {LoggedIn && isAdmin ? (
            <div></div>
          ) 
          : 
          (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnterDip}
              onMouseLeave={onMouseLeaveDip}
            >
              <span
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Diplôme <i className="fas fa-caret-down" />
              </span>
              {dropdownDip && <Dropdown_diplome />}

            </li>
          )}

          {LoggedIn && isAdmin ? (
            <div></div>
          ) 
          : 
          (
            <li className="nav-item"
            onMouseEnter={onMouseEnterDom}
            onMouseLeave={onMouseLeaveDom}

            >
              <span
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Domaine <i className="fas fa-caret-down" />
              </span>
              {dropdownDom && <Dropdown_domaine />}

            </li>
          )}
          {LoggedIn ? (
            <li className="nav-item">
              <Link to="" className="nav-links" onClick={Deconnect}>
                Déconnexion
              </Link>
            </li>
          )
          : 
          (
            <li className="nav-item">
              <Link
                to="/connexion"
                className="nav-links"
                onClick={closeMobileMenu}>
                Connexion
              </Link>
            </li>
          )}
        </ul>

        
        {LoggedIn && isAdmin ? (
          <Link to="/Admin_table">
          <button className="btn">
            <i class="fas fa-user" /> {user === null ? "" : user.Nom_prénom}
          </button>
          </Link>
        ) 
        : LoggedIn && isEtud ? (
        
          <Link to="/Etud_profile/">
            <button className="btn">
              <i class="fas fa-user" /> {user === null ? "" : user.Nom_prénom}
            </button>
          </Link>
        )
         : LoggedIn && isCons ? (
          <Link to="/Cons_profile/">
            <button className="btn">
              <i class="fas fa-user" /> {user === null ? "" : user.Nom_prénom}
            </button>
          </Link>
        ) 
        : 
        (
          <Link to="">
            <button className="btn" onClick={choose}>
              S'inscrire
            </button>
           
          </Link>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
