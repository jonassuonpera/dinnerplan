import React, { useState, useEffect, useContext } from 'react'


// for authentication using auth0
import { useAuth0 } from "./auth/react-auth0-wrapper";

// for routing
import SecuredRoute from './components/SecuredRoute';
import { Route, Switch } from "react-router-dom";

// for apollo client
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from '@apollo/client/link/context';

import UserSettings from './views/UserSettings';
import PlanView from './views/PlanView';
import DishView from './views/DishView';
import NotFound from './views/NotFound';
import Header from './Header';
import UserContext from './UserContext';

const httpLink = new HttpLink({
  uri: 'https://trusty-donkey-75.hasura.app/v1/graphql',
});

const App = () => {
  const { isAuthenticated } = useAuth0();

  const [accessToken, setAccessToken] = useState("");
  const [client, setClient] = useState();
  const { getTokenSilently, loading, user } = useAuth0();

  useEffect(() => {
    const getAccessToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getTokenSilently();
          setAccessToken(token);
        } catch (e) {
          console.log(e);
        }        
      }
    };
    getAccessToken();
    
  });

  useEffect(() => {
    const authLink = setContext((_, { headers }) => {
      const token = accessToken;
      if (token) {
        return {
          headers: {
            ...headers,
            authorization: `Bearer ${token}`,
          },
        };
      } else {
        return {
          headers: {
            ...headers,
          },
        };
      }
    });

    const client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
    setClient(client);
  }, [accessToken]);
  


  if (loading) {
    return "Loading...";
  }

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={user}>
        <Header />
        <div className="px-6 mx-auto flex flex-wrap items-center justify-between">
          <Switch>
            <Route exact path='/' component={PlanView} />
            <Route exact path='/dishes' component={DishView} />
              {/* <Route exact path='/user-settings' component={UserSettings} />
              <Route exact path='/dishes' component={Dishes} />
              <Route path='/' component={NotFound} /> */}
          </Switch>
        </div>  
      </UserContext.Provider>            
    </ApolloProvider>
  );
}

export default App;

