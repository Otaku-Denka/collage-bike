import * as React from 'react';
import './style.css';
import styled from 'styled-components';
import Searchbar from './searchBar';
import NavbarProfile from './navbarProfile';

const NavBarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 5.6rem;
    z-index: 502;
    display: flex;
    align-item: center;
    box-sizing: border-box;
    background: #1c2260;
`;

const NavbarBrand = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 100%;
    width: 24rem;
    min-width: 24rem;
    padding-left: 1.6rem;
    padding-right: 0.8rem;
    background-color: #00044c;
    color: #fff;
`;

const NavbarItembar = styled.div`
    display: flex;
    flex: 1;
`;

const SearchBarWrapper = styled.div`
    box-sizing: border-box;
    align-items: center;
    justify-center: center;
    min-width: 5.6rem;
    padding: 0.4rem;
    width: 100%;
`;

export default class NavBar extends React.Component {
    render() {
        return (
            <NavBarContainer>
                <NavbarBrand>LOGO</NavbarBrand>
                <NavbarItembar>
                    <SearchBarWrapper>
                        <Searchbar />
                    </SearchBarWrapper>
                    <NavbarProfile />
                </NavbarItembar>
            </NavBarContainer>
        );
    }
}
