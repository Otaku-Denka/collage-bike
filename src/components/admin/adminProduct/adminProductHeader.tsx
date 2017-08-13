import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminProductHeader = () => {
    return (
        <div className="admin-products-header">
            <div className="admin-products-title-bar">
                <div className="admin-product-title-main-group">
                    <h1
                        style={{
                            fontSize: '3rem',
                            display: 'inline'
                        }}
                    >
                        Products
                    </h1>
                </div>
                <Link to="/admin/products/new">
                    <Button
                        bsStyle="primary"
                        style={{
                            float: 'right',
                            marginTop: '10px',
                            background: '#5c6ac4'
                        }}
                    >
                        Add product
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default AdminProductHeader;
