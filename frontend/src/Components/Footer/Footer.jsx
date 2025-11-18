import React from 'react';
import styles from './Footer.module.css'; 
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const footerLinks = [
    { 
        title: "Information", 
        links: ["About", "Product", "Blog"] 
    },
    { 
        title: "Company", 
        links: ["Community", "Career", "Our story"] 
    },
    { 
        title: "Contact", 
        links: ["Getting Started", "Pricing", "Resources"] 
    }
];

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.mainContent}>
                    {/* Left Section: Motto and Social Icons */}
                    <div className={styles.leftSection}>
                        <p className={styles.motto}>
                            We help you find <br /> your dream plant
                        </p>
                        <div className={styles.socialIcons}>
                            <a href="#" aria-label="Facebook" className={styles.iconCircle}><FaFacebookF /></a>
                            <a href="#" aria-label="Instagram" className={styles.iconCircle}><FaInstagram /></a>
                            <a href="#" aria-label="Twitter" className={styles.iconCircle}><FaTwitter /></a>
                        </div>
                    </div>

                    {/* Right Section: Link Columns */}
                    <div className={styles.linkColumns}>
                        {footerLinks.map((column, index) => (
                            <div key={index} className={styles.column}>
                                <h4 className={styles.columnTitle}>{column.title}</h4>
                                <ul className={styles.linkList}>
                                    {column.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <a href="#" className={styles.linkItem}>{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Copyright */}
                <div className={styles.copyright}>
                    <p>2025 all Right Reserved Term of use EVERLANE</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;