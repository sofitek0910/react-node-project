import React, { useContext } from 'react';
import { ContextTotal } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/MiniCart.scss';
import { Link, Route } from 'react-router-dom';
import Cart from './Cart';


const MiniCart = () => {

    const { total } = useContext(ContextTotal);

    return (
        <div className="minicart">
            <p><FontAwesomeIcon icon={faShoppingCart} /> TOTAL: {total} €</p>
            <Link to="/cart"><button className="active-button">GO TO CART</button></Link>
            <Route path="/cart">
                <Cart />
            </Route>
        </div>
    )
};

export default MiniCart;