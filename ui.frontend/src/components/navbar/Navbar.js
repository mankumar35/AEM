import React from 'react'
import {calculateRemainingDays} from "../../CustomerModel/Customers"
import { useEffect, useState } from "react"
import "./Navbar.css"
import NotificationComponent from "./NotificationComponent"

const THRESHOLD_DAYS = 30
let Navbar = ({user ,setShowInsurance, image_url, getImageURL, retain_discount, to_retain_discount}) => {

    let [showAlert, setShowAlert] = useState(null)
    let [showImage, setShowImage] = useState(false)
    let checkIfUserNeedsAlert = (user) => {
        let days = calculateRemainingDays(user)
        if (days <= THRESHOLD_DAYS) {
            user.profile = "to retain"
            setShowAlert(true)
        }
    }

    let alertUser = () => {
        if (showAlert){
            setShowImage(true)
        }
    }
    useEffect(() => {
        checkIfUserNeedsAlert(user)
        return () => clearInterval(timerId)
    }, [])

    const timerId  = setInterval(() => {
        if (user.secondsLeft === 0){
            if (user.daysLeft === 0){
                alert("EXPIREDDD")
            }
            else{
                user.daysLeft = user.daysLeft - 1
                user.secondsLeft = 24*60*60

                if (user.daysLeft <= THRESHOLD_DAYS) {
                    checkIfUserNeedsAlert(user)
                }
            }
        }
        else{
            user.secondsLeft -= 1
        }
    }, 1000);

    const hideImg = () => {
        if (showImage){
            setShowImage(false)
        }
    }
    const imageComponent = () => {
    image_url = getImageURL(); 
    to_retain_discount = retain_discount();
    console.log('Image Url :' + image_url);
        return (
            <div className="image_backshadow" onClick={hideImg}>
                <div>
                    <img className="discountImage" src={image_url} />
                    <h3>Congrats!!, you get a {to_retain_discount} discount</h3>
                </div>
            </div>
        )
    }
    return(
        <header onClick={() => console.log(user)}>
            <div className="container">
                <a href="#">
                    <img src="https://abdullahuc.github.io/bank-ui/assets/images/logo.svg" alt="" />
                </a>

                <nav>
                    <i className="fas fa-bars"></i>
                    <ul>

                        <li> <a href="#">Home</a></li>
                        <li> <a href="#">About</a></li>
                        <li> <a href="#">Contact</a></li>
                        <li> <a href="#">Stores</a></li>
                        <li> <a href="#">Offers</a></li>
                        <li> <a href="" onClick={(e) => { e.preventDefault();  
                            window.digitalData.category='insurance page'; 
                            setShowInsurance(true)} }>Insurance</a> </li>
                        <li> <NotificationComponent showAlert={showAlert} alertUser={alertUser} /></li>
                        <li> Hello {user.givenName} {user.lastName}</li>
                    </ul>
                </nav>
            </div>
            {showImage ? imageComponent() : ''}
            
        </header>
)
}

export default Navbar

// export default ToMap("...path...")