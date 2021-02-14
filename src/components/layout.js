import React from 'react'
import './layout.css'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <div className="pagecontainer">
            {children}
            </div>
            <Footer />
        </>
    )
}
