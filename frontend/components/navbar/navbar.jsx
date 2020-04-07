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
                <img className="navbar-logo" src={slackLogo}></img>
                <ul className='navbar-ul'>
                    <li className='navbar-li'>Logo</li>
                    <li className='navbar-li'>Why Slick?</li>
                    <li className='navbar-li'>Solutions</li>
                    <li className='navbar-li'>Resources</li>
                    <li className='navbar-li'>Enterprise</li>
                    <li className='navbar-li'>Pricing</li>
                    <li className='navbar-li'><Link to='/login'>Sign in</Link></li>
                    <li className='navbar-li'><Link to='/signup'>GET STARTED</Link></li>
                </ul>
            </div>
        );
    }

};

export default Navbar;