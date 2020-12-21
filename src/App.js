import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  RouteComponentProps
} from "react-router-dom";
import Login from './views/Login';
import Signup from './views/Signup';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import Header from './header';

// for apollo client
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";

const App = () => {

  // for apollo client
  const httpLink = new HttpLink({
    uri:"https://trusty-donkey-75.hasura.app/v1/graphql"
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <Header />
      <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route path='/' component={NotFound} />
        </Switch>
      </BrowserRouter>     
    </ApolloProvider>
  );
}

export default App;

