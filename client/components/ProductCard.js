import React from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import {formatPrice} from './helperFunctions'
import QuantityInterface from './QuantityInterface'

class ProductCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity || 0
    }
    this.setQuantity = this.setQuantity.bind(this)
  }

  componentDidMount() {
    this.setQuantity(this.props.quantity || 0)
  }

  // absolutely necessary
  componentDidUpdate(prevProps) {
    if (!prevProps.quantity && this.props.quantity)
      this.setQuantity(this.props.quantity || 0)
  }

  setQuantity(newQuantity) {
    this.setState({
      quantity: newQuantity
    })
  }

  render() {
    const {setQuantity} = this
    const {quantity} = this.state || 0
    const {userId, product} = this.props
    const {name, imageUrl, price, inventory} = product || {}

    return (
      <div>
        {product && !product.id ? (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          <div>
            <div className="productContainer">
              <img src={imageUrl} />
              <div className="nameAndPrice">
                <div className="productName">{name}</div>
                <div className="productPrice">
                  {formatPrice(price.toString())}
                </div>
              </div>
              <div className="productInventory">
                {inventory > 0
                  ? `In-stock: ${inventory} items remaining`
                  : 'Sold out'}
              </div>
            </div>
            <QuantityInterface
              setQuantity={setQuantity}
              quantity={quantity}
              userId={userId}
              productId={product.id}
              inventory={inventory}
            />
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  cart: state.cart
})

export default connect(mapState)(ProductCard)
