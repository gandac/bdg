import React from 'react';
import { Switch, Route } from 'react-router-dom';
import '../styles/index.css';
import Header from './Header/HeaderContainer';
import Footer from './Footer/Footer';
import Home from './Homepage/Homepage';
import Login from './LoginPage';
import Search from './Search/searchPage';
import Page from './Page/Page';
import PostPage from './Posts/PostPage';
import Blog from './Posts/BlogPosts';
import LocationPage from './LocationPage/LocationPage';
import LocationCategoryPage from './LocationCategoryPage/LocationCategoryPage';
import MapContainer from './Map/MapContainer';

export default () => (
  <div className="center theMainWrapper">
    <Header />
    <div className="mainPageWrapper">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/page/:slug" component={Page} />
        <Route exact path="/insiders/:slug?" component={Blog} />
        <Route exact path="/insiders-post/:slug" component={PostPage} />
        <Route exact path="/location/:slug" component={LocationPage} />
        <Route exact path="/location_category/:parent/:slug?" component={LocationCategoryPage} />
      </Switch>
    </div>

    <MapContainer /> 
    
    <Footer />
  </div>
);
