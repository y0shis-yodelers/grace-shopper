import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {OrderInfo} from '.'
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

    return (
      <div>
        {products.length ? (
          <div className="productsAndCart">
            <div className="allProductContainer">
              {products.map(product => (
                <Link
                  key={product.id}
                  className="productCardOutline"
                  to={`/products/${product.id}`}
                >
                  <div className="productContainer">
                    <img src={product.imageUrl} />
                    <div className="orderName">{product.name}</div>
                    <div className="orderQuantityCost">
                      <span>Quantity: {product.ProductOrder.quantity}</span>
                      <span>
                        Cost: {formatPrice(product.ProductOrder.pricePaid)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <OrderInfo
              products={products}
              orderDate={order.updatedAt}
              orderId={order.id}
            />
          </div>
        ) : (
          <Loader
            type="TailSpin"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
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
