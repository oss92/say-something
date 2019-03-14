import React from 'react';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
import bg from '../../header-bk.png';

export function Footer() {
  return (
    <div style={{ background: `#FFF url(${bg}) center` }} className={styles.footer}>
      <p>&copy; 2019 &middot; Ossterdam </p>
      <p><FormattedMessage id="twitterMessage" /> : <a href="https://twitter.com/ossterdam" target="_Blank">@ossterdam</a></p>
    </div>
  );
}

export default Footer;
