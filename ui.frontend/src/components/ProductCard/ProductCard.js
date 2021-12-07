import React, { useState }  from 'react';
import "./ProductCard.css"

let ProductCard = ({ id , src, text, cardAddToCartHandler}) => {

    const [added, setAdded] = useState(false)

    let addToCart = () => {
        setAdded(true)

        cardAddToCartHandler(id)
    }

    return (
        <div className={`productCard + ${added ? " blocked" : "" }`}>
            <img src={src} />
            <p className="productDescription">
                {text}
            </p>
            <button onClick={addToCart}>
                {added ? "Added" : "Add insurance"}
            </button>
        </div>       
    )
}

export default ProductCard