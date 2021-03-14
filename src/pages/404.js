import React from 'react'
import Layout from '../components/layout'
import styles from './ErrorPage.module.scss'

export default function Error404Page() {
    return (
        <Layout>
            <div className={styles.errorPage}>
                <h1>Oh no! This page could not be found <span role="img" aria-label="Sad face">😢</span></h1>
            </div>
        </Layout>
    )
}
