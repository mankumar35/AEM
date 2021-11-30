import React from 'react';
import Navbar from "../components/navbar/Navbar"
import ProductCard from "../components/ProductCard/ProductCard"
import "./productPage.css"

let productPage = ({user}) => {

    let getCardModal = () => {
        
    }
    return(
        <>
        <Navbar user={user}/>
        <main> 
            <ProductCard id="1"/>
            <ProductCard id="2"/>
            <ProductCard id="3"/>
            <ProductCard id="4"/>
            <ProductCard id="5"/>
            <ProductCard id="6"/>
        </main>
        <button onClick="getCartModal" className="cartButton">QUOTE</button>
        </>
    )
}

export default productPage