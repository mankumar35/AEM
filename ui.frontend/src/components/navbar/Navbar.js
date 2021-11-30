import React, { Component }  from 'react';
import sendCoords from "../../functions/sendCoords"
import {calculateRemainingDays} from "../../CustomerModel/Customers"
import { useEffect, useState } from "react"
import "./Navbar.css"
import NotificationComponent from "./NotificationComponent"

let Navbar = ({user ,setShowInsurance}) => {
    
    let [showAlert, setShowAlert] = useState(null)

    let checkIfUserNeedsAlert = (user) => {
        let days = calculateRemainingDays(user)
        if (days <= 28) {
            user.profile = "to retain"
            setShowAlert(true)
        }
    }

    let alertUser = () => {
        if (showAlert){
            alert(`Hello ${user.givenName} , you have less than 28 days left with your insurance. Let us give you some incentives`)
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

                if (user.daysLeft <= 28) {
                    checkIfUserNeedsAlert(user)
                }
            }
        }
        else{
            user.secondsLeft -= 1
        }
    }, 1000);
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
                        <li> <a href="#">Blog</a></li>
                        <li> <a href="#">Careers</a></li>
                        <li> <a href="" onClick={(e) => { e.preventDefault(); setShowInsurance(true)} }>Insurance</a> </li>
                        <li> <NotificationComponent showAlert={showAlert} alertUser={alertUser} /></li>
                        <li> Hello {user.givenName} {user.lastName}</li>
                    </ul>
                </nav>
            </div>
        </header>
)
}

export default Navbar

// export default ToMap("...path...")