import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllProducts} from '../store/products'
import ProductCard from './ProductCard'
import {Card, Icon, Image} from 'semantic-ui-react'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products || []

    return (
      <div>
        {!products[0] ? (
          <div>Loading ...</div>
        ) : (
          <Card.Group itemsPerRow={5} stackable={true} doubling={true}>
            {products.map(product => (
              <Card key={product.id} className="fluid">
                <Image size="tiny" src={product.imageUrl} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{product.name}</Card.Header>

                  <Icon name="users" />
                  {product.price}
                </Card.Content>
                <Card.Description>{product.description}</Card.Description>
                {/* <Link className="productLink" to={`/products/${product.id}`}>
                    Go to {product.name}
                  </Link> */}
              </Card>
            ))}
          </Card.Group>
          // <div className=".cartContainer">{/* <Cart /> */}</div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchAllProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
