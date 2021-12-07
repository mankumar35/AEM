import React, {useContext} from 'react'
import "./CartModal.css"
import { LocationDiscountContext, ToRetainDiscountContext } from "../App"
let item_prices = [80, 120, 100, 90, 110, 150]

let CartModal = ({list_of_items , user}) => {

    const location_discount = useContext(LocationDiscountContext)
    const to_retain_discount = useContext(ToRetainDiscountContext)

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

    const calculateFinalPrice = (location_discount , to_retain_discount, list_of_items) => {
        let location_discount_int = parseInt(location_discount.substr(0, location_discount.length-1))
        let to_retain_discount_int = parseInt(to_retain_discount.substr(0, to_retain_discount.length-1))
        let basePrice = 0
        for (let item of list_of_items){
            basePrice += item_prices[item]
        }
        let applied_location_discount = 0
        let applied_to_retain_discount = 0
        console.log("ok  " + applied_to_retain_discount )
        if (user.locationCity === "melbourne"){
            applied_location_discount = location_discount_int
        }
        if (user.profile === "to retain"){
            applied_to_retain_discount =  to_retain_discount_int
        }
        return basePrice * (100 - applied_location_discount)/100 * (100 - applied_to_retain_discount)/100
    }

    const discountText = () => {
        return (
            <h3 className="discountApplied">Discount Applied : {user.profile=== "to retain" ? to_retain_discount : "0"} {user.locationCity == "melbourne" ? " and an additional 20%" : ''}</h3>
        )
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
                {(user.profile === "to retain" || (user.locationCity === "melbourne")) ? discountText() : ''}
                
                <h3>Final Price : {calculateFinalPrice(location_discount, to_retain_discount , list_of_items)}</h3>
                <button>Purchase</button>
            </div>
        </div>
    )
}

export default CartModal