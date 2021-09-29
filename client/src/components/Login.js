import React, { Fragment, useState, useContext } from 'react';
import '../styles/Login.scss';
import { ContextRegistration } from './Context';

const Login = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const { setToDelivery, setUserInformation } = useContext(ContextRegistration);

    const handleSubmit = async () => {
        if (username === null || password === null) {
            alert('Please complete the fields')
        } else {
            const userData = {
                username: username,
                password: password
            };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            };
            const response = await fetch('https://mr-brilli-shop.herokuapp.com/cart/login', options);
            const data = await response.json();
            console.log('RESPONSE DATA: ', data);
            if (data.status === 'Username and password correct') {
                setUserInformation(data);
                setToDelivery(true);
            } else {
                alert(data.status);
                setToDelivery(false);
            }
        }
    }

    return (
        <Fragment>
            <form className="login-container">
                <label htmlFor="username" className="username">
                    <input type="text" id="login-username" name="username" placeholder="username" onChange={(e) => setUsername(e.target.value)} required />
                </label>
                <label htmlFor="password" className="userpassword">
                    <input type="password" id="login-password" name="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <label htmlFor="" className="submit-btn">
                    <input type="submit" value="LOG IN" id="login-btn" className="active-button" onClick={(e) => { e.preventDefault(); handleSubmit() }} />
                </label>
            </form>
        </Fragment>
    );
}

export default Login;
