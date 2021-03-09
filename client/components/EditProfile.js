import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store'

const validate = (name, email, phone) => {
  let errors = []

  if (!name.length) errors.push('Name must not be empty')

  if (email.length < 5) errors.push('Email must be at least 5 characters long')
  if (!email.includes('@')) errors.push('Email must contain an @ symbol')
  if (!email.includes('.')) errors.push('Email must contain at least one dot')

  if (phone.length !== 10) {
    errors.push('Phone number must be 10 characters long')
  }

  return errors
}

class EditProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.user.id || '',
      name: this.props.user.name || '',
      email: this.props.user.email || '',
      phoneNumber: this.props.user.phoneNumber || '',
      // password: '',
      errors: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    const {name, email, phoneNumber} = this.state
    const errors = validate(name, email, phoneNumber)

    if (errors.length) this.setState({errors})
    else this.props.updateUser(this.state)
  }

  render() {
    const {userId} = this.props.match.params
    const {name, email, phoneNumber, /* password, */ errors} = this.state
    const {handleChange, handleSubmit} = this

    return this.props.user.id && this.props.user.id === +userId ? (
      <form className="shippingData" onSubmit={handleSubmit}>
        {errors.map(error => <p key={error}>Error: {error}</p>)}

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
          <label htmlFor="phoneNumber">Phone:</label>
          <input
            type="text"
            name="phoneNumber"
            onChange={handleChange}
            value={phoneNumber}
          />
        </div>

        {/* <div className="formField">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </div> */}

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

const mapDispatch = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapState, mapDispatch)(EditProfile)
