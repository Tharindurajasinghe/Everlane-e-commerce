import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>EVERLANE</h1>
      </div>

      {/* 3. Hamburger Icon - visible on mobile, controls the menu */}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        {/* Shows FaTimes (X) when open, FaBars (Hamburger) when closed */}
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* 4. Links Section - conditionally apply 'active' class */}
      <div className={`${styles.links} ${isMenuOpen ? styles.active : ''}`}>
        <Link to="/Home" className={styles.navLink} onClick={toggleMenu}>Home</Link>
        <Link to="/courses" className={styles.navLink} onClick={toggleMenu}>Products</Link>
        <Link to="/aboutus" className={styles.navLink} onClick={toggleMenu}>Contacts</Link>
      </div>

      {/* Icons remain visible on desktop and mobile */}
      <div className={styles.icons}>
        {/* Note: It's better to use react-icons for consistency */}
        <Link to="/productPage" className={styles.navLink}><i className="fa fa-search" aria-hidden="true"></i></Link>
        <Link to="/cart" className={styles.navLink}><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>
        <Link to="/productPage" className={styles.navLink}><i className="fa fa-user" aria-hidden="true"></i></Link>
      </div>
    </div>
  );
}

export default Navbar;