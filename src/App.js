import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import UserSettings from './views/UserSettings';
import Plan from './views/Plan';
import Dishes from './views/Dishes';
import NotFound from './views/NotFound';
import Header from './Header';

// for apollo client
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

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
      
      
        <BrowserRouter>
        <Header />
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <Switch>
              <Route exact path='/' component={Plan} />
              <Route exact path='/user-settings' component={UserSettings} />
              <Route exact path='/dishes' component={Dishes} />
              <Route path='/' component={NotFound} />
          </Switch>
          </div>  
        </BrowserRouter>       
        
    </ApolloProvider>
  );
}

export default App;

