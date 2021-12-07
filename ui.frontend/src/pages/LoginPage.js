import React from "react"
import "./LoginPage.css"
import {customerList} from "../CustomerModel/Customers"
import {useState} from "react"


let LoginPage = ({setFlag, setUser}) => {

    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    let handleSubmit = (e) => {
        e.preventDefault()
        for (let customer of customerList) {
            if ( userName === customer.username && password === customer.password){
                window.digitalData.user.userInfo.authState='logged in';
            	window.digitalData.category='home page';
            	window.digitalData.user.userInfo.age= customer.age;
            	window.digitalData.user.userInfo.insuranceAge= customer.insuranceAge;
            	window.digitalData.location.locationCity= customer.locationCity;
                setFlag(true)
                setUser(customer)
                return
            }
        }
        setFlag(false)
        setUser(null)
        console.log("bad")
        
    }

    let handleUsernameChange = (e) => {
        setUserName(e.target.value);
    }

    let handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    return (
        <main className="loginPage">
            <div className="loginCard">
                <form onSubmit={handleSubmit}> 
                    <label className="label" htmlFor="username">username</label>
                    <input className="input" type="text" name="username" value={userName} onChange={handleUsernameChange}/>
                    <label className="label" htmlFor="password">password</label>
                    <input className="input" type="password" name="password" value={password} onChange={handlePasswordChange}/>
                    <input className="submit" type="submit" value="submit" />
                </form> 
            </div>
        </main>
    )
}

export default LoginPage