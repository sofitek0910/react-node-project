import React, { useContext, useEffect } from 'react';
import { ContextTotal } from './Context';
import '../styles/Glasses.scss';
import { Link, Route } from 'react-router-dom';
import Item from './Item';
import MiniCart from './MiniCart';
import Sunglasses from './Sunglasses';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';


const Glasses = () => {

    const { total, setTotal, setCart, products, getDB } = useContext(ContextTotal);

    const addToCart = async (e, item) => {
        e.preventDefault();
        console.log('ADD TO CART IS RUNNING');
        const data = item;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        try {

            let response = await fetch('https://mr-brilli-shop.herokuapp.com/cart', options);
            let data = await response.json();
            console.log('RESPONSE FROM SERVER:', data);
            console.log('TOTAL: ', total);
            let newTotal = await data.reduce((acc, el) => acc += el.price * el.quantity, 0).toFixed(2);
            console.log('NEW-TOTAL: ', newTotal);
            await setTotal(newTotal);
            await setCart(data);

        } catch (error) {
            console.log('ERROR in addToCart: ', error);
        }
    };

    useEffect(() => {
        getDB()
    }, []);

    return (
        <div className="glasses-bk">
            <Link className="active-button small-link-btn" to="/sunglasses">watch <FontAwesomeIcon icon={faGlasses} /> sunglasses</Link>
            <MiniCart />
            <section className="section-glasses">
                {
                    products ?
                        products.filter(el => el.type === 'view').map((el, i) => <Item key={el.type.concat(i.toString())} properties={el} addToCart={addToCart} />)
                        :
                        <div className="loading-message">
                            <p><FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(7, 104, 104)" }} /> Loading...</p>
                        </div>
                }
            </section>
            <Route path="/sunglasses" component={Sunglasses} />
            <Route path="/" />
        </div>
    );
}

export default Glasses;