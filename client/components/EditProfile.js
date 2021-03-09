import React from 'react'
import {connect} from 'react-redux'

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.user.name || '',
      email: this.props.user.email || '',
      password: '',
      phone: +this.props.user.phone || ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {userId} = this.props.match.params
    const {name, email, password, phone} = this.state
    const {handleChange} = this

    return this.props.user.id && this.props.user.id === +userId ? (
      <form className="shippingData">
        <div className="formField">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" onChange={handleChange} value={name} />
        </div>

        <div className="formField">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={email}
          />
        </div>

        <div className="formField">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div>

        <div className="formField">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={phone}
          />
        </div>

        <input type="submit" value="Submit" />
      </form>
    ) : (
      <div>User auth failure!</div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(EditProfile)
