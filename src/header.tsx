import * as React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth0 } from './auth/react-auth0-wrapper';

interface IAppProps {
}

const Header: React.FunctionComponent<IAppProps> = (props) => {
    const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  return (
      <div>
          <Link to="/">
              News
          </Link>
          {!isAuthenticated && (
              <button onClick={() => loginWithRedirect({})}>
                log ins
              </button>
          )}
          {isAuthenticated && (
              <>
              <div>is logged in</div>
              <button onClick={() => logout({})}>
                log out
              </button>
              </>
          )}
      </div>
  );
};

export default withRouter(Header);
