import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({token, user}) => {
    return (
        <div className='navbar'>
            <nav>
                <NavLink to='/'>Homepage </NavLink>
                {!token &&
                <NavLink to='/loginregister'>Login/Register </NavLink>
                }
                {token &&
                <NavLink to='/profile'>Profile </NavLink>
                }
                {token &&
                <NavLink to='/profile/myorders'>My Orders </NavLink>
                }
                <NavLink to='/products'>Products </NavLink>
                { (user.id === 1) &&
                <NavLink to='/admin'>Admin</NavLink>
                }
            </nav>
        </div>
    );
};

export default Navbar;