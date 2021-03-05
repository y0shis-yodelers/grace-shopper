import React from 'react'

class ShippingData extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      houseOrApt: '',
      streetName: '',
      city: '',
      state: '',
      zip: ''
    }
  }

  componentDidMount() {
    this.setState(this.props.getAddress())
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {number, houseOrApt, streetName, city, state, zip} = this.state
    const {handleChange} = this

    return (
      <form id="shippingData">
        <div className="formHeader">Please enter shipping data</div>

        <div className="formField">
          <label htmlFor="number">House Number:</label>
          <textarea name="number" onChange={handleChange} value={number} />
        </div>

        <div className="formField">
          <label htmlFor="streetName">Street:</label>
          <textarea
            name="streetName"
            onChange={handleChange}
            value={streetName}
          />
        </div>

        <div className="formField">
          <label htmlFor="houseOrApt">Apt/Suite:</label>
          <textarea
            name="houseOrApt"
            onChange={handleChange}
            value={houseOrApt}
          />
        </div>

        <div className="formField">
          <label htmlFor="city">City:</label>
          <textarea name="city" onChange={handleChange} value={city} />
        </div>

        <div className="formField">
          <label htmlFor="state">Street:</label>
          <textarea name="state" onChange={handleChange} value={state} />
        </div>

        <div className="formField">
          <label htmlFor="zip">Street:</label>
          <textarea name="zip" onChange={handleChange} value={zip} />
        </div>
      </form>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  products: state.products
})

const mapDispatch = dispatch => ({
  updateCart: (productId, quantity) =>
    dispatch(fetchUpdateCart(productId, quantity))
})

export default connect(mapState, mapDispatch)(ShippingData)
