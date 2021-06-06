import { createStore, applyMiddleware, Store } from 'redux';
import { History } from 'history';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from '../reducers';

export default function configureStore(initialState: any, history: History) {
    // Installs hooks that always keep react-router and redux store in sync
    const middleware = [thunk, routerMiddleware(history)];
    let store: Store;

    middleware.push(createLogger());
    store = createStore(createRootReducer(history), initialState, composeWithDevTools(applyMiddleware(...middleware)));
    return store;
}
