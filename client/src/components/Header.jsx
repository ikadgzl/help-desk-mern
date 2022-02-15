import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header'>
      <div className='logo'>
        <Link to='/'>Support Desk</Link>
      </div>

      <nav>
        <ul>
          <li>
            <Link to='/login'>
              <FaSignInAlt /> Login
            </Link>
          </li>

          <li>
            <Link to='/register'>
              <FaSignOutAlt /> Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
