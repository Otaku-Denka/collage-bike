import * as React from 'react';
import AdminProductHeader from './adminProductHeader';
import './style.css';

export default class AdminProductContainer extends React.Component {
    render() {
        return (
            <div className="admin-product-container">
                <div className="admin-products-wrapper">
                    <AdminProductHeader />
                </div>
            </div>
        );
    }
}
