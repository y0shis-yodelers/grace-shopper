import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder} from '../store/singleOrder'
import {formatPrice} from './helperFunctions'

class SingleOrder extends React.Component {
  componentDidMount() {
    const {userId, orderId} = this.props.match.params

    this.props.getOrder(userId, orderId)
  }

  render() {
    const order = this.props.order[0] || {}
    const products = order.products || []

    console.log(this.props.order)

    return (
      <div>
        {products.length ? (
          <div className="productsAndCart">
            <div className="allProductContainer">
              {products.map(product => (
                <Link
                  key={product.id}
                  className="productLink"
                  to={`/products/${product.id}`}
                >
                  <div className="productContainer">
                    <img src={product.imageUrl} />
                    <div className="orderName">{product.name}</div>
                    <div>Quantity: {product.ProductOrder.quantity}</div>
                    <div>
                      Cost: {formatPrice(product.ProductOrder.pricePaid)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div>Loading ...</div>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.singleOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: (userId, orderId) => dispatch(fetchOrder(userId, orderId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
