
import styles from "./Header.module.css";
import { useAuth } from '../../../context/Authcontext.jsx';
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
      const handleLogout = () => {
    setAuth({
      user: null,
      token: ""
    });
    localStorage.removeItem('auth');
    toast.success('Logged out');
    navigate('/');
    };
  return (
    <header className={styles.header}>
      <nav className={styles.leftMenu}>
  <a style={{textDecoration: 'none', color: '#333'}} href="/booking">Booking</a>
  <a style={{textDecoration: 'none', color: '#333'}} href="/admin">Admin</a>
        <a style={{textDecoration: 'none', color: '#333'}} href="/admin/menu">Menu</a>
        <a style={{textDecoration: 'none', color: '#333'}} href="/admin/tables">Tables</a>
        <a style={{textDecoration: 'none', color: '#333'}} href="/admin/orders">Orders</a>
         <a style={{textDecoration: 'none', color: '#333'}} href="/reports">Reports</a>
      </nav>

      <div className={styles.logo}>
        <a style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold', fontSize: '27px' }} href="/">CAFE</a>
      </div>

      <div className={styles.rightMenu}>
        {!auth?.user ? (
          <>
            <a style={{textDecoration: 'none', color: '#333'}} href="/register">Register</a>
            <a style={{textDecoration: 'none', color: '#333'}} href="/login">Login</a>
          </>
        ) : (
          <div className={styles.userMenu}>
            <div className={styles.userIcon} title={auth.user?.name || 'Account'}>
              <FaUserCircle size={28} />
            </div>
            <div className={styles.userDropdown}>
              <a href="/profile">Profile</a>
              <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
