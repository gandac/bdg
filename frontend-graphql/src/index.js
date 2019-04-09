import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { createHttpLink } from 'apollo-link-http';

import {createStore, applyMiddleware , compose , combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';
import Config from './config';

import categoryReducer from './components/LocationCategoryPage/categoryReducer';
import locationReducer from './components/LocationPage/locationReducer';
import menusReducer from './components/Header/menusReducer';
import mapReducer from './components/Map/mapReducer';
import locationsReducer from './components/LocationsLoop/locationsReducer';
import searchReducer from './components/Search/searchReducer';

const rootReducer = combineReducers({
  category : categoryReducer,
  location : locationReducer,
  menus: menusReducer,
  map: mapReducer,
  locations: locationsReducer,
  search: searchReducer,
  // page: pageReducer
});

// Apollo GraphQL client
const client = new ApolloClient({
  link: createHttpLink({
    uri: Config.gqlUrl,
  }),
  cache: new InMemoryCache(),
});

// Redux Local Store

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)) );

ReactDOM.render(  
  <BrowserRouter>
    <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
