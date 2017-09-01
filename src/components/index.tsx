import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import storeConfig from '../store/index';
import AdminApp from './admin/layout';

import AdminProductContainer from './admin/adminProduct/adminProductContainer';
import AddNewProductContainer from './admin/adminProduct/addNewProduct/addNewProductContainer';

injectTapEventPlugin();

let initialStore = {
    router: {}
};

let store = storeConfig(initialStore);
const history = createBrowserHistory();
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route exact={true} path="/" render={() => <h1>Home</h1>} />

                <Route path="/admin" component={AdminApp} />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
