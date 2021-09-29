import React, { useState, useContext } from 'react';
import '../styles/Delivery.scss';
import { ContextRegistration } from './Context';

const Delivery = () => {

    const { toPayment, setToPayment, userInformation, setUserInformation } = useContext(ContextRegistration);

    console.log('userInformation: ', userInformation);

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [address, setAddress] = useState(null);
    const [addressNr, setAddressNr] = useState(null);
    const [postCode, setPostCode] = useState(null);
    const [city, setCity] = useState(null);
    const [country, setCountry] = useState(null);

    const [deliveryAddress, setDeliveryAddress] = useState(true);

    const handleSubmitSameAddress = async () => {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userInformation)
        };
        const response = await fetch('https://mr-brilli-shop.herokuapp.com/cart/delivery', options);
        const data = await response.json();
        console.log('RESPONSE DATA: ', data);
        if (data.status === 'Item will be sent to the invoice address') {
            setToPayment(true);
        } else {
            alert('Please review your information');
            setToPayment(false);
        }
    };


    const handleSubmitDifferentAddress = async () => {
        if (firstName === null ||
            lastName === null ||
            address === null ||
            addressNr === null ||
            postCode === null ||
            city === null ||
            country === null) {
            alert('Please complete all the fields');
        } else {
            const userData = [
                userInformation.data,
                {
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    addressNr: addressNr,
                    postCode: postCode,
                    city: city,
                    country: country
                }
            ];
            console.log('userData: ', userData);
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            };
            const response = await fetch('https://mr-brilli-shop.herokuapp.com/cart/delivery/otheraddress', options);
            const data = await response.json();
            console.log('RESPONSE DATA: ', data);
            if (data.status === 'New delivery address registered') {
                setUserInformation(data);
                setToPayment(true);
            } else {
                alert('Please review your information');
                setToPayment(false);
            }
        }
    };

    console.log('toPayment: ', toPayment);

    return (

        <div className="delivery-container">
            <h4> Hello {userInformation.data.firstName}, please insert the delivery address:</h4>
            {
                deliveryAddress ?
                    <div className="invoice-address">
                        <p>{userInformation.data.firstName} {userInformation.data.lastName}</p>
                        <p>{userInformation.data.address} {userInformation.data.addressNr},</p>
                        <p>{userInformation.data.city} ({userInformation.data.country})</p>
                    </div>
                    :
                    null
            }
            <form className="delivery-form" onChange={() => setDeliveryAddress(!deliveryAddress)}>
                <button className={deliveryAddress ? "active-button same-address pressed-btn" : "active-button same-address"} onClick={(e) => { e.preventDefault(); setDeliveryAddress(true) }} defaultChecked>
                    <input type="radio" id="same-address" name="delivery-address" style={{ display: 'none' }} />Same as invoice address
                </button><br />
                <button className={!deliveryAddress ? "active-button different-address pressed-btn" : "active-button different-address"} onClick={(e) => { e.preventDefault(); setDeliveryAddress(false) }} >
                    <input type="radio" id="different-address" name="delivery-address" style={{ display: 'none' }} />Different delivery address
                </button>
                <label htmlFor="" className="delivery-btn" style={{ display: deliveryAddress ? 'inherit' : 'none' }}>
                    <input type="submit" value="TO PAYMENT" id="delivery-btn" className="active-button" onClick={(e) => { e.preventDefault(); handleSubmitSameAddress() }} />
                </label>
            </form>

            {
                deliveryAddress ?
                    null
                    :
                    <form className="delivery-data-container">
                        <label htmlFor="firstName" className="first-name">
                            <input type="text" id="first-name-L" name="firstName" onChange={(e) => setFirstName(e.target.value)} required />
                        </label>
                        <label htmlFor="lastName" className="second-name">
                            <input type="text" id="second-name-L" name="lastName" onChange={(e) => setLastName(e.target.value)} required />
                        </label>
                        <label htmlFor="address" className="address">
                            <input type="text" id="address-L" name="address" onChange={(e) => setAddress(e.target.value)} required />
                        </label>
                        <label htmlFor="addressNr" className="address-nr">
                            <input type="number" id="address-nr-L" name="addressNr" onChange={(e) => setAddressNr(e.target.value)} required />
                        </label>
                        <label htmlFor="postCode" className="address-post">
                            <input type="text" id="address-post-L" name="postCode" onChange={(e) => setPostCode(e.target.value)} required />
                        </label>
                        <label htmlFor="city" className="city">
                            <input type="text" id="city-L" name="city" onChange={(e) => setCity(e.target.value)} required />
                        </label>
                        <label htmlFor="country" className="country">
                            <input type="text" id="country-L" name="country" onChange={(e) => setCountry(e.target.value)} required />
                        </label>
                        <label htmlFor="" className="delivery-btn-L">
                            <input type="submit" value="TO PAYMENT" id="delivery-btn-L" className="active-button" onClick={(e) => { e.preventDefault(); handleSubmitDifferentAddress() }} />
                        </label>
                    </form>
            }
        </div>

    );
}

export default Delivery;
