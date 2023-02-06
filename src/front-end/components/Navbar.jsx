import React from "react";
import { NavLink } from "react-router-dom";
import './styles/NavBar.css'
import { deleteCartItem } from "../api/fetch";
const Navbar = ({token, user, setCart, cart}) => {
    const handleLeave = async() => {
        setCart([])
        for (let i=0; i<cart.length; i++) {
            deleteCartItem(token, cart[i].id)
        }
    }
    return (
        <div className='navbar'>
            {location.pathname.includes('ordercomplete')?
            <nav>
                <NavLink onClick={handleLeave} to='/'>Homepage </NavLink>
                {!token &&
                <NavLink onClick={handleLeave} to='/loginregister'>Login/Register </NavLink>
                }
                {token &&
                <NavLink onClick={handleLeave} to='/profile'>Profile </NavLink>
                }
                <NavLink onClick={handleLeave} to='/products'>Products </NavLink>
                { (user.id === 1) &&
                <NavLink onClick={handleLeave} to='/admin'>Admin</NavLink>
                }
            </nav>
            :
            <nav>
                <NavLink to='/'>Homepage </NavLink>
                {!token &&
                <NavLink to='/loginregister'>Login/Register </NavLink>
                }
                {token &&
                <NavLink to='/profile'>Profile </NavLink>
                }
                <NavLink to='/products'>Products </NavLink>
                { (user.id === 1) &&
                <NavLink to='/admin'>Admin</NavLink>
                }
            </nav>
            }
        </div>
    );
};

export default Navbar;