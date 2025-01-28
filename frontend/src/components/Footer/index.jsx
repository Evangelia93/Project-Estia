import styles from './Footer.module.css';

import React from 'react';


function Footer() {
    return (
        <footer className={styles.footer}>
            <p>&copy; {new Date().getFullYear()} Estia.  All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;