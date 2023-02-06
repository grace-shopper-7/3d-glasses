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
        <div className='totalNavBar'>
          {location.pathname.includes('ordercomplete')?
            <nav>
                <div className='navbarTop'>
                <div className="navigation">
                <NavLink onClick={handleLeave} to='/'>Homepage </NavLink>
                </div>
                <div className="navigation">
                {!token &&
                <NavLink onClick={handleLeave} to='/loginregister'>Login/Register </NavLink>
                }
                </div>
                <div className="navigation">
                <NavLink onClick={handleLeave} to='/products'>Products </NavLink>
                </div>
                </div>

                <div className='navbarBottom'>
                <div className="navigation">
                {token &&
                <NavLink onClick={handleLeave} to='/profile'>Profile </NavLink>
                }
                </div>

                <div className="navigation">
                { (user.id === 1) &&
                <NavLink onClick={handleLeave} to='/admin'>Admin</NavLink>
                }
                </div>
                </div>
            </nav>
            :
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
                { (user.id === 1) &&
                <NavLink to='/admin'>Admin</NavLink>
                }
                </div>
                </div>
            </nav>
            }
        </div>
    );
};

export default Navbar;