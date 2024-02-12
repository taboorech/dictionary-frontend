import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/auth';

export default function Navbar() {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const logoutClickHandler = () => {
    dispatch(logout());
  }

  return(
    <div className='navbar-fixed'>
      <nav>
        <div className="nav-wrapper">
          <NavLink to="/" className="brand-logo">Logo</NavLink>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/">Main</NavLink></li>
            {!auth.isAuth ? 
              <li><NavLink to="/auth">Auth</NavLink></li> :
              <li><NavLink className={"logoutButton"} to="/" onClick={logoutClickHandler}>Logout</NavLink></li>
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}