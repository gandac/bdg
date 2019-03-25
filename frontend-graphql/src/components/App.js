import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Login from './Login';
import Search from './Search';
import Page from './Page';
import Post from './Post';
import Category from './Category';
import Location from './Location';
import LocationCategory from './LocationCategory';
import MapContainer from './Map/MapContainer';

export default () => (
  <div className="center">
    <Header />
    <div className="pa1 padding table">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/page/:slug" component={Page} />
        <Route exact path="/post/:slug" component={Post} />
        <Route exact path="/location/:slug" component={Location} />
        <Route exact path="/location_category/:parent/:slug?" component={LocationCategory} />
        <Route exact path="/category/:slug" component={Category} />
      </Switch>

    </div>
    <div>
      <MapContainer />
    </div>
    
    <Footer />
  </div>
);
