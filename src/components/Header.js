import React from 'react'
import { Link } from '@reach/router'
import './Header.css'

const Header = ( props ) => {
    return(
        <header>
            <Link to='/'>home</Link>
            <Link to='/contact'>kontakt</Link>
            <Link to='/login'>
                {
                props.signedIn 
                ? 'profile'
                : 'login'
                }
            </Link>
        </header>        
    )
}

export default Header