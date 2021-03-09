import React from 'react'
import {connect} from 'react-redux'
import {updateUser} from '../store'
import {notify} from './helperFunctions'

const validate = (name, email, phone, password) => {
  let errors = []

  if (!name.length) errors.push('Name must not be empty!')

  if (email.length < 5) errors.push('Email must be at least 5 characters long!')
  if (!email.includes('@')) errors.push('Email must contain an @ symbol!')
  if (!email.includes('.')) errors.push('Email must contain at least one dot!')

  if (phone.length !== 10) {
    errors.push('Phone number must be 10 characters long!')
  }

  if (!password.length) {
    errors.push('Password must not be empty!')
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
      password: ''
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

    const {userId} = this.props.user
    const {name, email, phoneNumber, password} = this.state
    const errors = validate(name, email, phoneNumber, password)

    if (errors.length) errors.forEach(error => notify(error, 'error'))
    else {
      this.props.updateUser(this.state)
      this.props.history.push(`/users/${userId}/`)
      notify('Updated profile information!', 'success')
    }
  }

  render() {
    const {userId} = this.props.match.params
    const {name, email, phoneNumber, password} = this.state
    const {handleChange, handleSubmit} = this

    return this.props.user.id && this.props.user.id === +userId ? (
      <div>
        <form className="shippingData" onSubmit={handleSubmit}>
          <div className="formField">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={name}
            />
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

          <div className="formField">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={password}
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
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
