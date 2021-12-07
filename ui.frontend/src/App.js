import React, {useEffect, useState, useRef} from "react";
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/navbar/Navbar";
import axios from 'axios'

const AuthTokenContext = React.createContext()
const LocationDiscountContext = React.createContext()
const ToRetainDiscountContext = React.createContext()

const get_url = () => {
  const full_path = window.location.href
  let path = full_path.split(':')
  let domain = path[0] + ':' + path[1] + ':'
  let port_num = path[2].split('/')[0]  
  let local_host_path = domain + port_num
  return local_host_path + "/bin/adobe/data.offer.json"
}


function App() {
  
  const auth_token_ref = useRef(null)
  const location_discount_ref = useRef(0)
  const to_retain_discount = useRef(0)
  const imgURL_ref = useRef(null)

  const [ajaxReturn, setAjaxReturn] = useState(false)
  const [flag, setFlag] = useState(false)
  const [user, setUser] = useState(null)

  const [showInsurancePage , setShowInsurance] = useState(false)
  
  const get_ImageUrl= ()=> {
  	return imgURL_ref.current;
  }
  
    const get_RetainDiscount= ()=> {
    console.log('IN retain :' + to_retain_discount.current );
  	return to_retain_discount.current;
  }
  
  useEffect(() => {
    if (flag) {
      let url = get_url()
      fetch(url)
        .then(response => response.json())
        .then(jayson => {
          let discount_text = jayson["xdm:propositions"][0]["xdm:options"][0]["xdm:name"]
          console.log("text " + discount_text)
          location_discount_ref.current = discount_text.split(" ")[2]
          console.log("final " + location_discount_ref.current)

          let discount_json = JSON.parse(jayson["xdm:propositions"][1]["xdm:fallback"]["xdm:content"])
          to_retain_discount.current = discount_json["text"].split(' ')[2]
          imgURL_ref.current  = discount_json["ImageURL"]
          console.log("final 2 vals discoutn fw wqd \n"  + to_retain_discount.current)
          console.log(imgURL_ref.current)  
          setAjaxReturn(true)      
        });
    }
    // location_discount_ref.current = "20%"
    // to_retain_discount.current = "3%"
    // imgURL_ref.current = "https://d8rvi9tcdu8g2.cloudfront.net/a74cff00-e3ce-11e9-8f5d-7f27416c5f0d/urn:aaid:aem:68343a81-f5f6-4ec2-a88d-513f17ad013c/oak:1.0::ci:827dfebd6be999bbc40096bcd0cecbc7/a38ffde4-682b-31f1-94bc-20961f644632"
 
  }, [flag])


  let componentToShow = (showInsurancePage, flag, ajax_return) => {
  	if(ajaxReturn){
	    if (!showInsurancePage && flag) {
	      return(
	        <AuthTokenContext.Provider value={auth_token_ref.current}>
	          <HomePage user={user} setShowInsurance={setShowInsurance}/>
	        </AuthTokenContext.Provider>
	      )
	    }
	    else if (showInsurancePage && flag){
	      return(
	        <AuthTokenContext.Provider value={auth_token_ref.current}>
	          <LocationDiscountContext.Provider value={location_discount_ref.current}>
	            <ToRetainDiscountContext.Provider value={to_retain_discount.current}>
	              <ProductPage user={user} location_discount={location_discount_ref.current} setShowInsurance={setShowInsurance}/>
	            </ToRetainDiscountContext.Provider>
	          </LocationDiscountContext.Provider>
	        </AuthTokenContext.Provider>
	      )
	    }
    }
  }

  if (!ajaxReturn){
    return (
      <AuthTokenContext.Provider value={auth_token_ref.current}>
        <LoginPage setFlag={setFlag} setUser={setUser}/>
      </AuthTokenContext.Provider>
    )
  }
  else{
    return(
      <>
      <Navbar user={user} setShowInsurance={setShowInsurance} image_url={imgURL_ref.current} getImageURL={get_ImageUrl} retain_discount={get_RetainDiscount} to_retain_discount={to_retain_discount.current}/>
      {componentToShow(showInsurancePage, flag)}
      </>
    )
  }

}

export default App;
export {AuthTokenContext, LocationDiscountContext, ToRetainDiscountContext}