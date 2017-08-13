import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import './font-awesome-4.7.0/css/font-awesome.min.css';

const LinkIcon = styled.span`
    font-size: 2.3rem;
    margin: 10px;
    opacity: 0.7;
`;
const LinkLabel = styled.span`
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2rem;
    width: 100%;
`;

const LinkLi = styled.li`
    box-sizing: content-box;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 15px;
    &:hover ${LinkIcon} {
        opacity: 1;
    }
    &:hover ${LinkLabel} {
        text-decoration: none;
`;

const LinkBadge = styled.span`
    font-weight: 600;
    padding: 0 0.6rem;
    margin: 10px 0.8rem 0px;
    background-color: #47c1bf;
    color: #fff;
    font-size: 1.1rem;
    line-height: 1.6rem;
    float: right;
    border-radius: 50%;
`;

export interface LinkItemProps {
    src: string;
    iconClass: string;
    label: string;
    badge: number;
    active: boolean;
    onClick?(): void | undefined;
}

const LinkItem = ({
    src,
    iconClass,
    label,
    badge,
    onClick,
    active
}: LinkItemProps) => {
    return (
        <LinkLi onClick={onClick}>
            <NavLink to={src} style={{ display: 'block', width: '100%' }}>
                <LinkIcon
                    style={active ? { color: '#5c6ac4' } : { color: '#919eab' }}
                >
                    <i className={iconClass} aria-hidden="true" />
                </LinkIcon>
                <LinkLabel
                    style={active ? { color: '#5c6ac4' } : { color: '#919eab' }}
                >
                    {' '}{label}{' '}
                </LinkLabel>
                {badge <= 0
                    ? ''
                    : <LinkBadge>
                          {' '}{badge}{' '}
                      </LinkBadge>}
            </NavLink>
        </LinkLi>
    );
};

export default LinkItem;
