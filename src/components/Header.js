import React, {useState} from 'react'
import { Link } from '@reach/router'
import { MdMenu } from "react-icons/md"
import './Header.css'

const Header = ( props ) => {
    console.log('header renders')

    const [show,setShow] = useState(false)

    const isPartiallyActive = ({
        isPartiallyCurrent
    }) => {
        return isPartiallyCurrent
        ? { className: 'active'}
        : null
    }

    return(
        <div className='header-container'>
            <MdMenu className='burger' color='white' size='42' onClick={ () => setShow(!show) } />
            <header className={ show ? 'visible' : ''} onClick={ () => setShow(false) }>
                <Link getProps={isPartiallyActive} to='/projects'>projects</Link>
                <Link to='/contact'>kontakt</Link>
                <Link to='/login'>
                    {
                    props.signedIn 
                    ? 'profile'
                    : 'login'
                    }
                </Link>
            </header>        
        </div>
    )
}

export default Header