import * as React from 'react';
import Navbar from './navbar/navbar';
import AdminLeftbarContainer from './adminLeftBar/adminLeftbarContainer';
import { Route } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// import ProductsContainer from './products/productsContainer';
import AdminProductContainer from './adminProduct/adminProductContainer';
import AddNewProductContainer from './adminProduct/addNewProduct/addNewProductContainer';

class AdminLayout extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <AdminLeftbarContainer />

                <Route
                    exact={true}
                    path="/admin/products"
                    component={AdminProductContainer}
                />
                <Route
                    path="/admin/products/new"
                    component={AddNewProductContainer}
                />
            </div>
        );
    }
}

export default class AdminApp extends React.Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
                <AdminLayout />
            </MuiThemeProvider>
        );
    }
}
