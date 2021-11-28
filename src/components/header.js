import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import useUser from '../hooks/use-user';
import * as ROUTES from '../constants/routes';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = useUser(loggedInUser?.displayName);
  const { firebase } = useContext(FirebaseContext);
  const history = useHistory();

  return (
    <header className="h-16 bg-white border-b border-gray-primary">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <a className="flex justify-center w-full" href={ROUTES.DASHBOARD}>
                <img aria-label="logo" src="/images/logo.png" alt="Logo" className="mt-2 w-2/5 h-2/5" />
            </a>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            <>
              <Navbar className="bg-white" variant="light" bg="light" expand="lg">
                <Container fluid>
                  <Navbar.Collapse id="navbar-light-example">
                    <Nav>
                      <NavDropdown
                        id="nav-dropdown-light-example"
                        title={<span className="text-2xl">{user?.username}</span>}
                        menuVariant="light"
                      >
                        <NavDropdown.Item href={`/p/${user?.username}`}>
                            プロフィール
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item title="Sign Out"
                          onClick={() => {
                            firebase.auth().signOut();
                            history.push(ROUTES.LOGIN);
                          }}>
                          サインアウト
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
            </>
          </div>
        </div>
      </div>
    </header>
  );
}
