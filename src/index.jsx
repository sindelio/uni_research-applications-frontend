import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import './styles/index.css';

// Website pages
import Intro from './pages/website/intro.jsx';

// App pages
import SignIn from './pages/app/signin.jsx';
import SignUp from './pages/app/signup.jsx';
import EmailConfirmation from './pages/app/email-confirmation.jsx';
import PasswordRecovery from './pages/app/password-recovery.jsx';
import PasswordReset from './pages/app/password-reset.jsx';
import ParticipantDashboard from './pages/app/participant/dashboard.jsx';

// 404 page
import NoMatch from './pages/no-match.jsx';

const root = document.getElementById('root');

render(
  () => (
    <Router>
      {/* Website routes */}
      <Route path="/" component={Intro}></Route>
      <Route path="/event" component={() => <Intro section="event" />}></Route>
      <Route
        path="/organization"
        component={() => <Intro section="organization" />}
      ></Route>
      <Route
        path="/support"
        component={() => <Intro section="support" />}
      ></Route>
      <Route
        path="/sponsors"
        component={() => <Intro section="sponsors" />}
      ></Route>
      <Route path="/certificates" component={Intro}></Route>

      {/* App routes */}
      <Route path="/app">
        <Route path="/" component={SignIn}></Route>
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/email-confirmation" component={EmailConfirmation}></Route>
        <Route path="/password-recovery" component={PasswordRecovery}></Route>
        <Route path="/password-reset" component={PasswordReset}></Route>
        <Route
          path="/participant/dashboard"
          component={ParticipantDashboard}
        ></Route>
      </Route>
      {/* 404 route */}
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  root,
);
