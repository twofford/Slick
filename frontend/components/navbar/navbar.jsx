import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/session';

const Navbar = ({currentUser, logout}) => {

    if (currentUser) {
        return (
            <div className='navbar-div'>
                <ul className='navbar-ul'>
                    <li><img className="navbar-logo" src={slackLogo}></img></li>

                    <ul className='navbar-button-ul'>
                        <button className='logout-button' onClick={logout}>Log out</button>
                    </ul>
                </ul>
            </div>
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