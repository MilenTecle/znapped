import Container from 'react-bootstrap/Container';
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import { useState } from 'react';
import { useCurrentUser } from "./contexts/CurrentUserContext"

function App() {
  const currentUser = useCurrentUser();

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          <Route exact path="/" render={()=> <h1>Home page</h1>} />
          <Route exact path="/signin" render={() =><h1>Sign in</h1>} />
          <Route exact path="/signin" render={() =><SignUpForm />} />
          <Route render={() => <p>Page not found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
