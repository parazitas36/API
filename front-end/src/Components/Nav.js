import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../Assets/images/nba.png';
import { CSSTransition } from 'react-transition-group';


var list = (
    <svg id="navSvg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="navSvg" viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
    </svg>
);

var close = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="navSvg" viewBox="0 0 16 16">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
);

export const Nav = () => {
    const [navClass, setNavClass] = useState('nav-expanded');
    const [navIcon, setNavIcon] = useState(list);

    const expand = () => {
        if (navClass === 'nav-expanded') {
            setNavClass('nav-expanded on');
            setNavIcon(close);
        } else {
            setNavClass('nav-expanded');
            setNavIcon(list);
        }
    }
    return (
        <>
            <nav className='Nav'>
                <div className='logo'>
                    <Link className='linkLogo' to="/main">
                        <img className="logoimg" src={logo} />
                        <span className='logoname'>STATS API</span>
                    </Link>
                </div>

                <div className='hamburger'>
                    <button className="navToggleButton" onClick={expand}>{navIcon}</button>
                </div>
                <div className="nav-links">
                    <Link className='navButton' to='/main'>Main</Link>
                    <Link className='navButton' to='/playerstats'>Players</Link>
                    <Link className='navButton' to='/teams'>Teams</Link>
                    <Link className='navButton' to='/favorites'>Favorites</Link>
                    <Link className='navButton bg-red' to='/logout'>Logout</Link>
                </div>
            </nav>

            <CSSTransition
                in={navClass === 'nav-expanded on'}
                timeout={500}
                classNames='on'
            >
                <nav className={navClass}>
                    <Link className='navButton' onClick={expand} to='/main'>Main</Link>
                    <Link className='navButton' onClick={expand} to='/playerstats'>Players</Link>
                    <Link className='navButton' onClick={expand} to='/teams'>Teams</Link>
                    <Link className='navButton' onClick={expand} to='/favorites'>Favorites</Link>
                    <Link className='navButton bg-red' onClick={expand} to='/logout'>Logout</Link>
                </nav>
            </CSSTransition>
        </>
    );
}
