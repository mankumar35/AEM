import React from 'react';
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import LoginPage from "./pages/LoginPage";
import {useState} from 'react'

function App() {
  let [flag, setFlag] = useState(false)
  let [user, setUser] = useState(null)

  let [showInsurancePage , setShowInsurance] = useState(false)
  console.log(flag, showInsurancePage)

  if (!flag){
    return (
      <LoginPage setFlag={setFlag} setUser={setUser}/>
    )
  }
  else if (!showInsurancePage && flag) {
    return(
      <HomePage user={user} setShowInsurance={setShowInsurance}/>
    )
  }
  else if (showInsurancePage && flag){
    return(
      <ProductPage user={user} />
    )
  }
}

export default App;
