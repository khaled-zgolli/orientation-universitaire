import React , {useState} from 'react'
import {Link} from 'react-router-dom'
import './Dropdown.css' 
import MenuItems_domaine from './MenuItems_domaine'


function Dropdown_domaine() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
  
    return (
      <>
        <ul
          onClick={handleClick}
          className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
        >
          {MenuItems_domaine.map((item, index) => {
            return (
              <li key={index}>
                <Link className={item.cName} to={item.path} onClick={() => setClick(false)}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  
  export default Dropdown_domaine;