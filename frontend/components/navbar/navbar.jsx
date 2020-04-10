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
                    <li className='navbar-li navbar-hideable'>Why Slick?</li>
                    <li className='navbar-li navbar-hideable'>Solutions</li>
                    <li className='navbar-li navbar-hideable'>Resources</li>
                    <li className='navbar-li navbar-hideable'>Enterprise</li>
                    <li className='navbar-li navbar-hideable'>Pricing</li>
               
                <ul className='navbar-button-ul navbar-hideable'>
                    <li className='navbar-form-li'><Link to='/login'>Sign in</Link></li>
                    <li className='navbar-form-signup'><Link to='/signup'>GET STARTED</Link></li>
                </ul>
                </ul>
            </div>
        );
    }

};

export default Navbar;