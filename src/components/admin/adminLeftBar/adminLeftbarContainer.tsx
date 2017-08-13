import * as React from 'react';
import styled from 'styled-components';
import LinkItem from './LinkItem';
import { LinkItemProps } from './LinkItem';

const AdminLeftbar = styled.aside`
    border-right: 1px solid #dfe4e8;
    top: 5.6rem;
    width: 24rem;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #f4f6f8;
    box-sizing: border-box;
`;

const LeftbarLinkList = styled.ul`
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    list-style: none;
    padding-left: 10px;
`;

const fakeLink: LinkItemProps[] = [
    {
        src: '/admin',
        iconClass: 'fa fa-home',
        label: 'Home',
        badge: 0,
        active: false
        // onClick: () => undefined
    },
    {
        src: '/admin/orders',
        iconClass: 'fa fa-pencil-square-o',
        label: 'Orders',
        badge: 2,
        active: false
        // onClick: () => undefined
    },
    {
        src: '/admin/products',
        iconClass: 'fa fa-bicycle',
        label: 'Products',
        badge: 0,
        active: false
        // onClick: () => undefined
    },
    {
        src: '/admin/Customers',
        iconClass: 'fa fa-user-circle',
        label: 'Customers',
        badge: 0,
        active: false
        // onClick: () => undefined
    }
];

export default class AdminLeftbarContainer extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            activeLink: ''
        };
    }
    render() {
        const renderLink = fakeLink.map((data, i) => {
            let nestLink =
                location.pathname.split('/').length > 2
                    ? location.pathname.split('/').slice(0, 3).join('/')
                    : '';
            return (
                <LinkItem
                    {...data}
                    key={i}
                    active={
                        this.state.activeLink === i ||
                        location.pathname === data.src ||
                        nestLink === data.src
                    }
                    onClick={() => {
                        this.setState({ activeLink: i });
                    }}
                />
            );
        });
        return (
            <AdminLeftbar>
                <LeftbarLinkList>
                    {renderLink}
                </LeftbarLinkList>
            </AdminLeftbar>
        );
    }
}
