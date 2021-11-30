import React, { Component }  from 'react';
import "./ProductCard.css"

let ProductCard = ({ id }) => {

    let addToCart = () => {
        console.log(id)
    }

    return (
        <div className="productCard">
            <img src="https://via.placeholder.com/400x200" />
            <p className="productDescription">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
            <button onClick={addToCart}>
                Add insurance
            </button>
        </div>       
    )
}

export default ProductCard