import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = ({currentUser, logout}) => {

    if (currentUser) {
        return (
            <div>A user is logged in</div>
        );
    } else {
        return (
            <div className='navbar-div'>
                <ul className='navbar-ul'>
                    <li><img className="navbar-logo" src={slackLogo}></img></li>
                    <li className='navbar-li'>Why Slick?</li>
                    <li className='navbar-li'>Solutions</li>
                    <li className='navbar-li'>Resources</li>
                    <li className='navbar-li'>Enterprise</li>
                    <li className='navbar-li'>Pricing</li>
               
                    <ul className='navbar-button-ul'>
                    <li className='navbar-form-li'><Link to='/login'>Sign in</Link></li>
                    <li className='navbar-form-signup'><Link to='/signup'>GET STARTED</Link></li>
                    </ul>
                </ul>
                
            </div>
        );
    }

};

export default Navbar;