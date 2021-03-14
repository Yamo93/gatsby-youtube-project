import React from 'react'
import styles from './Navbar.module.scss'
import { Link } from 'gatsby'
import SearchBar from '../SearchBar/SearchBar'

export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <span className={styles.logoName}>
                <Link to="/">Yamo Gebrewold</Link>
            </span>
            <ul className={styles.menuList}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About me</Link></li>
                <li><Link to="/blogs">Blog posts</Link></li>
                <li><Link to="/contact">Contact me</Link></li>
            </ul>
            <SearchBar />
        </div>
    )
}
