import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth.context";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  return (
    <nav>
      <div className='nav-wrapper blue darken-1'>
        <span className='brand-logo'>Cократи ссылку</span>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <Link to='/links'>Ссылки</Link>
          </li>
          <li>
            <Link to='/detail'>Детали</Link>
          </li>
          <li>
            <Link to='/create'>Создать</Link>
          </li>
          <li>
            <button
              className='waves-effect waves-light btn-small'
              to='/create'
              onClick={auth.logout}
            >
              Выйти
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
