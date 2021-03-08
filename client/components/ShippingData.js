import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleAddress} from '../store/address'

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
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {number, houseOrApt, streetName, city, state, zip} = this.state
    const {handleChange} = this

    return (
      <form className="shippingData">
        <div className="formHeader">Please enter shipping data</div>

        <div className="formField">
          <label htmlFor="number">House Number:</label>
          <input
            type="text"
            name="number"
            onChange={handleChange}
            value={number || ''}
          />
        </div>

        <div className="formField">
          <label htmlFor="streetName">Street:</label>
          <input
            type="text"
            name="streetName"
            onChange={handleChange}
            value={streetName || ''}
          />
        </div>

        <div className="formField">
          <label htmlFor="houseOrApt">Apt/Suite:</label>
          <input
            type="text"
            name="houseOrApt"
            onChange={handleChange}
            value={houseOrApt || ''}
          />
        </div>

        <div className="formField">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={city || ''}
          />
        </div>

        <div className="formField">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            name="state"
            onChange={handleChange}
            value={state || ''}
          />
        </div>

        <div className="formField">
          <label htmlFor="zip">Zip:</label>
          <input
            type="text"
            name="zip"
            onChange={handleChange}
            value={zip || ''}
          />
        </div>
      </form>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  address: state.address.address,
  name: state.address.name
})

const mapDispatch = dispatch => ({
  getAddress: () => dispatch(fetchSingleAddress(6))
})

export default connect(mapState, mapDispatch)(ShippingData)
