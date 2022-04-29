import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from "react-icons/ai";

import { Cart } from './';
import {useStateContext} from "../context/StateContext";

const Navbar = () => {
    const {setShowCart, showCart, totalQuantities} = useStateContext();
    const onShowCart = () => setShowCart(prev => !prev)
    return (
        <div className="navbar-container">
            <p className="logo">
               <Link href="/">JSM Headphones</Link>
            </p>

            <button
                type="button"
                className="cart-icon"
                onClick={onShowCart}
            >
                <AiOutlineShopping />
                <span className="cart-item-qty">{totalQuantities}</span>
            </button>

            {
                showCart && <Cart />
            }


        </div>
    );
};

export default Navbar;