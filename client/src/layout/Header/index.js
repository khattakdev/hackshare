import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import styles from './index.module.css'

const links = [
  {
    name: 'Profile',
    route: '/profile'
  },
  {
    name: 'Experts',
    route: '/experts'
  },
  {
    name: 'Learners',
    route: '/learners'
  },
]

const Header = () => {
  const {
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  // @TODO: Change window.location to react router
  const handleLogout = () => logout({ returnTo: window.location.origin })

  return (
    <header className={styles.header}>
      <p className={styles.logo}>HackShare</p>
      <div className={styles.spacer}></div>
      { links.map((link, i) => <Link className={styles.link} to={link.route} key={i}>{ link.name }</Link>)}
      <button className={styles.login} onClick={isAuthenticated ? handleLogout : loginWithRedirect}>{isAuthenticated ? 'Log out' : 'Log in'}</button>
      { error && <div>Oops, Somethign went wrong... {JSON.stringify(error)}</div> }
      { user && user.name }
    </header>
  )
}

export default Header;