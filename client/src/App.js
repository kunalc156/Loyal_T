import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Checkin from './pages/Checkin';
import Login from './pages/Login';
import Header from './components/AppHeader';
import Footer from './components/AppFooter';
import { Layout, Menu } from 'antd';
const { Content, Sider } = Layout;

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Sider/>
        <Content>
        <Switch>
           <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/me">
                <Profile />
              </Route>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/checkin">
                <Checkin />
              </Route>
        </Switch>
        </Content>
        <Footer /> 
      </Router>
    </ApolloProvider>
  );
}

export default App;
