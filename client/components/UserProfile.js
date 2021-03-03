import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UserProfile extends React.Component {
  componentDidMount() {
    // load user's order history here
    // load advertisements/items if we so choose
  }

  render() {
    // restore this when db functional
    // const {singleUser} = this.props || {}

    const singleUser = {
      name: 'albert schweitzer',
      address: '101 alschweitz lane chicago il 60660',
      isAdmin: false,
      email: 'alschweitz@hotmail.com',
      phoneNumber: '5551234567'
    }

    return (
      <div className="su-ads-container">
        hello world! {/* test purposes only */}
        <div className="singleUserContainer">
          {/* OrderHistory and PaymentOptions components
          to be created ... */}

          {/* <OrderHistory /> */}
          <div className="userProfileContainer">user profile here</div>
          {/* <PaymentOptions /> */}
        </div>
        <div className="advertisementSidePanel">ads side panel</div>
      </div>
    )
  }
}

const mapState = state => ({
  singleUser: state.user
})

// no mapDispatch since user info is available
// on state after login!

export default withRouter(connect(mapState)(UserProfile))
