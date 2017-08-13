import * as React from 'react';
import { Provider } from 'react-redux';
import * as ReactDOM from 'react-dom';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, Switch } from 'react-router';
// import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
// import App from './app/app';
import createBrowserHistory from 'history/createBrowserHistory';
import storeConfig from '../store/index';
import AdminApp from './admin/layout';

import AdminProductContainer from './admin/adminProduct/adminProductContainer';
import AddNewProductContainer from './admin/adminProduct/addNewProduct/addNewProductContainer';

injectTapEventPlugin();

let initialStore = {
    router: {}
};

const routes = {
    path: '/admin',
    component: AdminApp,
    childRoutes: [
        {
            path: '/products',
            component: AdminProductContainer,
            childRoutes: [
                { path: '/post/new', component: AddNewProductContainer }
            ]
        }
    ]
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
