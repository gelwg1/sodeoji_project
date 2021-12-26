import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ReactLoader from './components/loader';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './helpers/protected-route';

const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/sign-up'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Admin = lazy(() => import('./pages/admin'));
const AdminQuizz = lazy(() => import('./pages/admin_quizz'));
const Profile = lazy(() => import('./pages/profile'));
const EditProfile = lazy(() => import('./pages/edit-profile'));
const NotFound = lazy(() => import('./pages/not-found'));
// const PostDetail = lazy(() => import('./pages/post-detail'));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<ReactLoader />}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <Redirect to={`${ROUTES.DASHBOARD}`} />
                )
              }}
            />
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.PROFILE} component={Profile} />
            {/* <Route path={ROUTES.POST_DETAILS} component={PostDetail} /> */}
            <Route path={ROUTES.EDIT_PROFILE} component={EditProfile} />
            <ProtectedRoute user={user} path={`${ROUTES.DASHBOARD}/:type?/:param2?`} exact>
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute user={user} path={`${ROUTES.ADMIN}/:type?/:param2?`} exact>
              <Admin />
            </ProtectedRoute><ProtectedRoute user={user} path={`${ROUTES.ADMIN_QUIZZ}/:type?/:param2?`} exact>
              <AdminQuizz />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
