import Container from 'react-bootstrap/Container';
import styles from "./App.module.css";
import NavBar from './components/NavBar';
import { Route, Switch } from 'react-router-dom'
import './api/axiosDefaults'
import SignUpForm from './pages/auth/SignUpForm';
import SignInForm from './pages/auth/SignInForm';
import PostCreateForm from './pages/posts/PostCreateForm';
import PostPage from "./pages/posts/PostPage";
import PostsPage from './pages/posts/PostsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import PostEditForm from './pages/posts/PostEditForm';
import ProfilePage from './pages/profiles/ProfilePage';
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";
import NotFound from './components/NotFound';
import DisplayNotifications from './pages/notifications/Notifications';
import DisplayMessages from './pages/messages/MessagesPage';
import AllMessagesPage from './pages/messages/AllMessagesPage';




function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <Switch>
          {!currentUser ? (
             <Route exact path="/" render={() =><SignInForm/>} />
          ) : (
            <Route
              exact
              path="/"
              render={() => (
                <PostsPage message="No results found. Adjust the search keyword."/>
              )}
            />
         )}
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or follow a user."
                filter={`owner__followed__owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <PostsPage
                message="No results found. Adjust the search keyword or like a post."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/signin"
            render={() =><SignInForm />}
          />
          <Route
            exact
            path="/signup"
            render={() =><SignUpForm />}
          />
          <Route
            exact
            path="/posts/create"
            render={() =><PostCreateForm />}
          />
          <Route
            exact
            path="/posts/:id"
            render={() => <PostPage
            />}
          />
          <Route
            exact
            path="/posts/:id/edit"
            render={() => <PostEditForm />}
          />
          <Route
            exact
            path="/profiles/:id"
            render={() => <ProfilePage />}
          />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
           <Route
            exact
            path="/notifications"
            render={() => <DisplayNotifications />}
          />
          <Route
            exact
            path="/direct-messages/:id"
            render={() => <DisplayMessages />}
          />
           <Route
            exact
            path="/direct-messages"
            render={() => <AllMessagesPage />}
          />
          <Route render={() => <NotFound />}
          />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
