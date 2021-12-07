import React, { useState } from "react"
import ProductCard from "../components/ProductCard/ProductCard"
import "./productPage.css"
import CartModal from "../modal/CartModal"

let ProductPage = ({user}) => {

    const [list_of_added_insurance, setListOfAddedInsurance] = useState([])

    const addToCartHandler = (id) => {
        // console.log(id)
        let oldlist = [...list_of_added_insurance]
        oldlist.push(id)
        setListOfAddedInsurance(oldlist)
    }

    const getCartModal = () => {
        console.log(list_of_added_insurance)
        const cartModal = document.querySelector("#CartModal")
        cartModal.classList.add("ShowModal")
    }

    return(
        <>
        <main> 
        <CartModal user={user} list_of_items={list_of_added_insurance}/>
        <ProductCard id="1" src="https://www.commbank.com.au/content/dam/commbank-assets/insurance/2019-09/home-insurance_prodcard.jpg" text="home insurance" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="2" src="https://www.commbank.com.au/content/dam/commbank-assets/insurance/2019-09/car-insurance_prodcard.jpg" text="home insurance 2" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="3" src="https://www.commbank.com.au/content/dam/commbank-assets/insurance/2020-10/health-insurance_standard.jpg" text="car insurance" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="4" src="https://www.commbank.com.au/content/dam/commbank-assets/insurance/2019-10/dinner-party_prodcard.jpg" text="life insurance" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="5" src="https://www.commbank.com.au/content/dam/commbank-assets/insurance/2019-10/father-child-asleep_prodcard.jpg" text="table insurance" cardAddToCartHandler={addToCartHandler}/>
            <ProductCard id="6" src="https://www.westpac.com.au/content/dam/public/wbc/images/personal/insurance/wbc-fb_m_car-insurance-W_356x200.jpg" text="leg insurance" ardAddToCartHandler={addToCartHandler}/>        </main>
        <button onClick={getCartModal} className="cartButton">QUOTE</button>
        </>
    )
}

export default ProductPage