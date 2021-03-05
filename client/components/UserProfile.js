import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class UserProfile extends React.Component {
  componentDidMount() {
    // load user's order history here
    // load advertisements/items if we so choose
  }

  render() {
    const {singleUser} = this.props || {}

    return (
      <div>
        <div className="su-ads-container">
          header ads here {/* test purposes only */}
        </div>
        <div className="singleUserContainer">
          {/* OrderHistory and PaymentOptions components
          to be created ... */}
          <div className="userOrdersContainer" />

          {/* <OrderHistory /> */}
          <div className="userProfileContainer">
            {Object.keys(singleUser).length ? (
              <div>
                <div>Name: {singleUser.name}</div>
                <div>Email: {singleUser.email}</div>
                <div>Phone: {singleUser.phoneNumber}</div>
              </div>
            ) : (
              <div>Guest profile</div>
            )}
          </div>
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
