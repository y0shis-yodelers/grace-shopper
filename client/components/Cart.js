import React from 'react'
import CartProductCard from './CartProductCard'
import Total from './Total'
import Submit from './Submit'

class Cart extends React.Component {
  render() {
    return (
      <div>
        <CartProductCard />
        <Total />
        <Submit />
      </div>
    )
  }
}

export default Cart
