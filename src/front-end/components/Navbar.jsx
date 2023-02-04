import React from "react";
import { NavLink } from "react-router-dom";
import './styles/NavBar.css'

const Navbar = ({token, user}) => {
    return (
        <div className='totalNavBar'>
            <nav>
                <div className='navbarTop'>
                <div className="navigation">
                <NavLink to='/'>Homepage </NavLink>
                </div>
                <div className="navigation">
                {!token &&
                <NavLink to='/loginregister'>Login/Register </NavLink>
                }
                </div>
                <div className="navigation">
                <NavLink to='/products'>Products </NavLink>
                </div>
                </div>

                <div className='navbarBottom'>
                <div className="navigation">
                {token &&
                <NavLink to='/profile'>Profile </NavLink>
                }
                </div>
                <div className="navigation">
                {token &&
                <NavLink to='/profile/myorders'>My Orders </NavLink>
                }
                </div>
                <div className="navigation">
                { (user.id === 1) &&
                <NavLink to='/admin'>Admin</NavLink>
                }
                </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;