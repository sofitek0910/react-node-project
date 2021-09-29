import React, { useState, useEffect } from 'react';
import { ContextTotal } from "./Context"
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import '../styles/App.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart';
import Glasses from './Glasses';
import Sunglasses from './Sunglasses';

const App = () => {

    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0)

    const getDB = async () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {

            let response = await fetch('https://mr-brilli-shop.herokuapp.com/allproducts', options);
            let DB = await response.json();
            // console.log('DB: ', DB);
            setProducts(DB.products);

            let response2 = await fetch('/cart', options);
            let data = await response2.json();
            let newTotal = await data.reduce((acc, el) => acc += el.price * el.quantity, 0).toFixed(2);
            setTotal(newTotal);
            setCart(data);

        } catch (error) {
            console.log('ERROR in getDB: ', error);
        }
    };

    console.log('PRODUCTS: ', products);
    console.log('CART: ', cart);

    useEffect(() => {
        getDB();
    }, [])

    return (
        <ContextTotal.Provider value={{ products, setProducts, cart, setCart, total, setTotal, getDB }}>
            <BrowserRouter>
                <div className="app">
                    <header className="header">
                        <Link to="/"><h1 className="logo-blue">Mr <FontAwesomeIcon style={{ transform: `rotate(-90deg)`, marginRight: '-0.4rem' }} icon={faGlasses} />rilli</h1></Link>
                    </header>
                    <main>
                        <div className="dividing-box">
                            <div className="glasses">
                                <Link className="link-to-section" to="/eyeglasses">
                                    <div className="circle circle-view">
                                        <h2>VIEWGLASSES</h2>
                                    </div>
                                </Link>
                            </div>
                            <div className="sunglasses">
                                <Link className="link-to-section" to="/sunglasses">
                                    <div className="light"></div>
                                    <div className="circle circle-sun">
                                        <h2>SUNGLASSES</h2>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </main>
                </div>
                <Switch>
                    <Route path="/eyeglasses" component={Glasses} />
                    <Route path="/sunglasses" component={Sunglasses} />
                    <Route path="/cart" component={Cart} />
                </Switch>
            </BrowserRouter>
        </ContextTotal.Provider>
    );
}

export default App;