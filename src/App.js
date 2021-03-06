import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history, store } from './store';
import Index from 'components/index';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Index store={store} />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
