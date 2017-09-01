import createBrowserHistory from 'history/createBrowserHistory';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as promise from 'redux-promise';
import { reducer as formReducer } from 'redux-form';
import * as ACTIONS from '../actions/constants';

import admin from '../reducers/admin';

const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const logger = createLogger({
    collapsed: () => true
});

export const rootReducer = combineReducers({
    admin,
    router: routerReducer,
    form: formReducer.plugin({
        EditProduct: (state = { values: {} }, action) => {
            switch (action.type) {
                case ACTIONS.RESET_VARIANT_VALUE:
                    if (state.values) {
                        return {
                            ...state,
                            values: {
                                ...state.values,
                                variantValue0: '',
                                variantValue1: '',
                                variantValue2: ''
                            }
                        };
                    }
                    return { ...state };
                default:
                    return { ...state };
            }
        }
    })
});

const createStoreWithMiddleware = applyMiddleware(
    promise,
    thunk,
    middleware,
    logger
)(createStore);

export default function storeConfig(initialState: object) {
    return createStoreWithMiddleware(rootReducer, initialState);
}
