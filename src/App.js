import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import MyListing from './pages/MyListing';
import AccomodationInterest from './pages/AccomodationInterest';
import Transactions from './pages/Transactions';
import Layout from './components/Layout';
import Profile from './pages/Profile'


function App() {
  
  return (
        <>
          <Router>
            <Switch>
              <Route path='/'  exact component={Login} />
          <Layout>
              <Route path='/profile' exact component={Profile} />
              <Route path='/home' exact component={Home} />
              <Route path='/MyListing' exact component={MyListing} />
              <Route path='/AccomodationInterest' exact component={AccomodationInterest} />
              <Route path='/transactions'exact  component={Transactions} />
          </Layout> 
            </Switch>
          </Router>
        </> 
      
  );
}

export default App;