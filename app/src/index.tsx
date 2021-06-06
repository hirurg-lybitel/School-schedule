import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory, Location } from 'history';
import configureStore from './store';
import { ConnectedRouter } from 'connected-react-router';

import App from './pages/App';

const initialState = window.__INITIAL_STATE__;
const history = createBrowserHistory();
const store = configureStore(initialState, history);
/*
interface Props {
    location: Location;
  }
  
interface State {
    previousLocation: Location | null;
    currentLocation: Location;
  }

  class PendingNavDataLoader extends Component<Props, State> {
    state = {
        previousLocation: null,
        currentLocation: this.props.location,
      };

  };
*/
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
