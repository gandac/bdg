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

import categoryReducer from './store/categoryReducer';
import locationReducer from './store/locationReducer';


const rootReducer = combineReducers({
  category : categoryReducer,
  location : locationReducer,
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
