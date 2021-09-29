import React, { useState, useContext, Fragment, useEffect } from 'react';
import '../styles/Payment.scss';
import { ContextTotal } from './Context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';


const Payment = ({ userInformation, setCartAndTotal }) => {

    const [method, setMethod] = useState('paypal');
    const { cart, total } = useContext(ContextTotal);

    const [loading, setLoading] = useState(false);

    const togglePayment = (e) => {
        console.log(e);
        switch (e) {
            case 'paypal':
                setMethod('paypal');
                break;
            case 'credit-card':
                setMethod('credit-card');
                break;
            case 'cash':
                setMethod('cash');
                break;
            default:
                break;
        }
    };

    const [cardholder, setCardholder] = useState(null);
    const [cardnumber, setCardnumber] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [cvv, setCvv] = useState(null);

    const handleSubmit = async (e, method) => {
        e.preventDefault();
        if (method === 'paypal') {
            // alert('PAYPAL PAYMENT DONE');
            setLoading(true);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ cart: cart, total: total }),
                mode: 'no-cors'
            };
            const response = await fetch('https://mr-brilli-shop.herokuapp.com/payment/paypal', options);
            console.log(' RESPONSE: ', response);

            const data = await response.json();
            console.log(' RESPONSE: ', data);
            await window.location.assign(data);

        } else if (method === 'credit-card') {

            if (cardholder === null ||
                cardnumber === null ||
                month === null ||
                year === null ||
                cvv === null) {

                alert('Please complete all the fields');

            } else {

                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    setTimeout(() => {
                        alert('PAYMENT DONE');
                        window.location.assign('/');
                    }, 50);
                }, 2000);
            }
        } else if (method === 'cash') {

            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setTimeout(() => {
                    alert('ORDER COMPLETED');
                    window.location.assign('/');
                }, 50);
            }, 2000);
        }

    };

    useEffect(() => {
        setLoading(false);
    }, []);


    return (
        <div className="payment-container">
            <p className="total-payment">TOTAL: {total}€</p>
            <h4>Please select the payment method: (no data will be saved)</h4>
            <div className="payment-methods">

                <button className={method === 'paypal' ? "active-button pressed-btn" : "active-button"} onClick={() => { togglePayment('paypal') }}>PAYPAL</button>
                <button className={method === 'credit-card' ? "active-button pressed-btn" : "active-button"} onClick={() => { togglePayment('credit-card') }}>CREDIT CARD</button>
                <button className={method === 'cash' ? "active-button pressed-btn" : "active-button"} onClick={() => { togglePayment('cash') }}>CASH ON DELIVERY</button>

            </div>
            <div className="payment-details">
                {
                    method === 'paypal' ?
                        <div className="paypal-container">

                            {
                                loading ?
                                    <div className="loading-message">
                                        <p><FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(7, 104, 104)" }} /> Connecting to PayPal...</p>
                                    </div>
                                    :
                                    <div className="payment-option-container">
                                        <h5>IMPORTANT INFORMATION</h5>
                                        <p>By clicking on 'PAY' we will transfer you to a testing PayPal portal.</p>
                                        <p>This is a fake PayPal portal. It means that you won't pay anything in this application.</p>
                                        <p>It's just an API for testing purposes.</p>
                                        <input className="active-button payment-btn" type="submit" onClick={(e) => handleSubmit(e, 'paypal')} value="PAY" />
                                    </div>
                            }
                        </div>

                        : method === 'credit-card' ?

                            <Fragment>
                                {
                                    loading ?

                                        <div className="loading-message">
                                            <p> <FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(7, 104, 104)" }} /> Completing payment...</p>
                                        </div>

                                        :

                                        <form className="credit-card-container" required>
                                            <label htmlFor="cardholder" className="cardholder">
                                                <input type="text" name="cardholder" onChange={(e) => setCardholder(e.target.value)} />
                                            </label>
                                            <label htmlFor="cardnumber" className="cardnumber">
                                                <input type="tel" maxLength="16" name="cardnumber" onChange={(e) => setCardnumber(e.target.value)} />
                                            </label>
                                            <label htmlFor="month" className="month">
                                                <input type="number" min="01" max="12" name="month" list="month" onChange={(e) => setMonth(e.target.value)} />
                                                <datalist id="month">
                                                    <option value="01"></option>
                                                    <option value="02"></option>
                                                    <option value="03"></option>
                                                    <option value="04"></option>
                                                    <option value="05"></option>
                                                    <option value="06"></option>
                                                    <option value="07"></option>
                                                    <option value="08"></option>
                                                    <option value="09"></option>
                                                    <option value="10"></option>
                                                    <option value="11"></option>
                                                    <option value="12"></option>
                                                </datalist>
                                            </label>
                                            <label htmlFor="year" className="year">
                                                <input type="number" min="2020" max="2030" name="year" list="year" onChange={(e) => setYear(e.target.value)} />
                                                <datalist id="year">
                                                    <option value="2020"></option>
                                                    <option value="2021"></option>
                                                    <option value="2022"></option>
                                                    <option value="2023"></option>
                                                    <option value="2024"></option>
                                                    <option value="2025"></option>
                                                    <option value="2026"></option>
                                                    <option value="2027"></option>
                                                    <option value="2028"></option>
                                                    <option value="2029"></option>
                                                    <option value="2030"></option>
                                                </datalist>
                                            </label>
                                            <label htmlFor="cvv" className="cvv">
                                                <input type="number" maxLength="3" name="cvv" onChange={(e) => setCvv(e.target.value)} />
                                            </label>
                                            <input className="active-button payment-btn" type="submit" onClick={(e) => handleSubmit(e, 'credit-card')} value="PAY" />
                                        </form>
                                }
                            </Fragment>

                            :

                            <Fragment>
                                {
                                    loading ?

                                        <div className="loading-message">
                                            <p> <FontAwesomeIcon icon={faSpinner} spin style={{ color: "rgb(7, 104, 104)" }} /> Completing order...</p>
                                        </div>

                                        :
                                        <div className="payment-option-container">
                                            <h5>IMPORTANT INFORMATION</h5>
                                            <p>In the next 24 hours we will send you an invoice to <strong>{userInformation.data.email}</strong></p>
                                            <p>We will also send you an email with the delivery details and a return form as soon as the package leaves our warehouse.</p>
                                            <p>Please proceed with the payment once you've received your order.</p>
                                            <p>You will have 14 days after the delivery to complete the payment.</p>

                                            <input className="active-button payment-btn" type="submit" onClick={(e) => handleSubmit(e, 'cash')} value="PAY" />
                                        </div>
                                }
                            </Fragment>
                }
            </div>
        </div>
    );
}


export default Payment;
