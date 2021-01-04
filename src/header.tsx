import * as React from 'react';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from './auth/react-auth0-wrapper';
import UserIcon from './images/user-profile.svg';


interface IAppProps {
}

const Header: React.FunctionComponent<IAppProps> = (props) => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-green-500 mb-3">
        <div className="px-4 flex flex-wrap items-center justify-between w-full">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
              href="/"
            >
              DinnerPlan
            </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                <g fill="none" fillRule="evenodd">
                  <circle cx="15" cy="15" r="15" fill="#FFF" fillOpacity=".01" />
                  <g stroke="#535353" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                    <path d="M2 2L10.485 10.485" transform="translate(9 6) rotate(-45 6.243 6.243)" />
                    <path d="M10.485 7L2 15.485" transform="translate(9 6) rotate(-135 6.243 11.243)" />
                  </g>
                </g>
              </svg>

            </button>
          </div>
          <div
            className={
              "md:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col md:flex-row list-none ml-auto">
              <NavLink className="nav-item my-auto ml-5 hover:text-white" exact to="/" activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}>
                Plan
              </NavLink>
              <NavLink className="nav-item my-auto ml-5 hover:text-white" to="/dishes" activeStyle={{
                fontWeight: "bold",
                color: "white"
              }}>
                Dishes
              </NavLink>
              <NavLink className="nav-item my-auto ml-5" to="/user-settings">
                <img width="50" height="50" src={user?.picture || UserIcon} alt="user-icon" />
              </NavLink>
              <li className="nav-item my-auto ml-5">
                {!isAuthenticated && (
                  <button onClick={() => loginWithRedirect({})}>
                    Log in
                  </button>
                )}
                {isAuthenticated && (
                  <>
                    <button className="hover:text-white" onClick={() => logout({})}>
                      Log out
              </button>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>


  );
};

export default withRouter(Header);
