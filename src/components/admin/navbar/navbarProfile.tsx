import styled from 'styled-components';
import * as React from 'react';

const NavbarUserInfo = styled.div`
    border-left: 1px solid black
    box-sizing: border-box
    align-items: center
    justify-content: center;
    min-width: 5.6rem;
    color: #ffffff;
    display: flex;
    position: relative;
    background: #1c2260;
`;

const NavbarProfileBtn = styled.button`
    cursor: pointer;
    height: 5.6rem;
    padding: 0.8rem 3.2rem 0.8rem 1.6rem;
    margin: 0;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 3.6rem;
    min-height: 3.6rem;
    transition: background-color 0.1s;
    color: #fff;
    appearance: none;
    background: #1c2260;
`;

const ProfileContainer = styled.div`
    display: flex;
    color: #fff;
`;

const ProfileAvatar = styled.div`margin-right: 0.8rem;`;

const UserAvatar = styled.span`
    border-radius: 50%;
    background: #96bf48;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    text-align: center;
    z-index: 2;
`;

const NavbarProfileSummary = styled.div`
    max-width: 15rem;
    text-align: left;
`;

const NavbarProfileTitle = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1.4rem;
    line-height: 1.6rem;
    font-weight: 500;
    margin: 0;
`;

const NavbarProfileDesc = styled.p`
    line-height: 1.6rem;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text0overflow: ellipsis;
    opacity: 0.7;
    margin: 0;
`;

export default class NavbarProfile extends React.Component<any, any> {
    render() {
        return (
            <NavbarUserInfo>
                <NavbarProfileBtn>
                    <ProfileContainer>
                        <ProfileAvatar>
                            <UserAvatar>Jay</UserAvatar>
                        </ProfileAvatar>
                        <NavbarProfileSummary>
                            <NavbarProfileTitle>Wang Jay</NavbarProfileTitle>
                            <NavbarProfileDesc>Wang jay</NavbarProfileDesc>
                        </NavbarProfileSummary>
                    </ProfileContainer>
                </NavbarProfileBtn>
            </NavbarUserInfo>
        );
    }
}
