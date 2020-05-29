import React from 'react';
import {Link} from 'react-router-dom';
import {logout} from '../../actions/session_actions';

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
                    <li className='navbar-li navbar-hideable navbar-icon'><a href="https://www.linkedin.com/in/taylor-wofford-931b3695/" target="_blank"><i class="fab fa-linkedin-in"/></a></li>
                    <li className='navbar-li navbar-hideable navbar-icon'><a href="https://github.com/twofford" target="_blank"><i class="fab fa-github"></i></a></li>
                    <li className='navbar-li navbar-hideable navbar-icon'><a href="https://angel.co/u/taylor-wofford" target="_blank"><i class="fab fa-angellist"></i></a></li>
                    <li className='navbar-li navbar-hideable'><a href="https://twofford.github.io/" target="_blank">About me</a></li>
               
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