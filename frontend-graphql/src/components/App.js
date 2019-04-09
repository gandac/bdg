import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/index.css';
import Header from './Header/HeaderContainer';
import Footer from './Footer/Footer';
import Home from './HomePage';
import Login from './LoginPage';
import Search from './SearchPage';
import Page from './Page';
import PostPage from './PostPage';
import Category from './Category';
import LocationPage from './LocationPage/LocationPage';
import LocationCategoryPage from './LocationCategoryPage/LocationCategoryPage';
import MapContainer from './Map/MapContainer';

export default () => (
  <div className="center">
    <Header />
    <div className="mainPageWrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/page/:slug" component={Page} />
        <Route exact path="/post/:slug" component={PostPage} />
        <Route exact path="/location/:slug" component={LocationPage} />
        <Route exact path="/location_category/:parent/:slug?" component={LocationCategoryPage} />
        <Route exact path="/category/:slug" component={Category} />
      </Switch>
    </div>
    <div>
       <MapContainer /> 
    </div>
    
    <Footer />
  </div>
);
