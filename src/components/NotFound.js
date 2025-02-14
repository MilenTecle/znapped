import React from 'react'
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from './Asset';

/**
 * This component is displayed when the user navigates to a page
 * that doesn't exist or is unavailable.
 */
const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message="Sorry, the page you're looking for doesn't exist">
      </Asset>
    </div>
  )
}

export default NotFound