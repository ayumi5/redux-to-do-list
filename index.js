import 'babel-core/polyfill';
import React from 'react';
import App from './containers/App';
import todoApp from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  createStore
);

const store = finalCreateStore(todoApp);

//let store = createStore(todoApp);

let rootElement = document.getElementById('root');
React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  rootElement,
  <DebugPanel top right bottom>
    <DevTools store={store} monitor={LogMonitor} />
  </DebugPanel>
);
