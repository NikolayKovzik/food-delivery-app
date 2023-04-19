import React from 'react'
import { mockCards } from '../../mock'

function CartPage() {
  const cartOrders = mockCards
  return (
    <div>
      <div>
        <p>My Order</p>
        <span>X</span>
      </div>
      <ul>
        {cartOrders.map((item, index) => {
          return (
            <li key={index}>
              <img src={item.imgSrc} alt='' />
              <p>{item.name}</p>
              <p>{item.description}</p>
              <div>
                <span>{item.moneySign}</span>
                <span>{item.price}</span>
              </div>
              <div>
                <span>-</span>
                <span>0</span>
                <span>+</span>
              </div>
            </li>
          )
        })}
      </ul>
      <div>
        <p>Promo code...</p>
        <button>Apply</button>
      </div>
      <div>
        <div>
          <div>Subtotal</div>
          <div>$15.00</div>
        </div>
        <div>
          <div>Delivery</div>
          <div>Free</div>
        </div>
        <div>
          <div>Total</div>
          <div>$15.00</div>
        </div>
      </div>
      <button>Confirm order</button>
    </div>
  )
}

export default CartPage
