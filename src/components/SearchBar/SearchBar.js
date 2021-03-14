import React, { useContext } from 'react';
import styles from './SearchBar.module.scss'
import AppContext from '../../context/AppContext'
import { globalHistory as history } from '@reach/router'

export default function SearchBar () {
    const appContext = useContext(AppContext)
    const { searchQuery, setSearchQuery } = appContext;
    const { location: { pathname } } = history;

    const handleSearchChange = (event) => {
        if (pathname === '/') {
            setSearchQuery(event.target.value);
        }
    };

    return (
        <form
            action="/"
            method="get"
            autoComplete="off"
        >
            <label htmlFor="header-search">
                <span className={styles.visuallyHidden}>
                    Search blog posts
                </span>
            </label>
            <input
                value={searchQuery}
                onChange={handleSearchChange}
                type="text"
                id="header-search"
                placeholder="Search blog posts"
                name="s"
            />
            <button type="submit">Search</button>
        </form>
    );
}