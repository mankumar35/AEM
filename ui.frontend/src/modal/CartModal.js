import React, {useContext} from 'react'
import "./CartModal.css"
let item_prices = [80, 120, 100, 90, 110, 150]

let CartModal = ({list_of_items , user}) => {

    const discount = 0;
    console.log("wowoowowow " +discount)
    const html_list_of_items = list_of_items.map((id) => {
        return(
            <li key={id}>
                insurance {id}
            </li>
        )
    })

    const generateListOfPrices = (list_of_items) => {
        let prices_list = []
        console.log(list_of_items)
        for (let id of list_of_items){
            prices_list.push([item_prices[id], id])
        }

        return prices_list.map((prices) => {
            console.log(prices)
            return(
                <li key= {prices[1]}>
                    {prices[0]}
                </li>
            )
        })
    }

    const calculateFinalPrice = (discount , list_of_items) => {
        let discount_int = parseInt(discount.substr(0, discount.length-1))
        let basePrice = 0
        for (let item of list_of_items){
            basePrice += item_prices[item]
        }
        if (user.locationCity === "melbourne"){
            return basePrice * (100 - discount_int)/100 * 0.8
        }
        return basePrice * (100 - discount_int)/100
    }

    const hideModal = () => {
        const modal = document.querySelector("#CartModal")
        modal.classList.remove("ShowModal")
    }
    return (
        <div id="CartModal" className="backshadow" onClick={hideModal}>
            <div className="cartModalContainer">
                <h2>The following items are in your cart, confirm purchase by clicking on the Purchase</h2>
                <div className="flexItems">
                    <ul>
                        <h3>Product name</h3>
                        {html_list_of_items}
                    </ul>
                    <ul>
                        <h3>Prices</h3>
                        {generateListOfPrices(list_of_items)}
                    </ul>
                </div>
                <h3 className="discountApplied">Discount Applied : {discount} {user.locationCity == "melbourne" ? " and an additional 20%" : ''}</h3>
                <h3>Final Price : {calculateFinalPrice(discount , list_of_items)}</h3>
                <button>Purchase</button>
            </div>
        </div>
    )
}

export default CartModal