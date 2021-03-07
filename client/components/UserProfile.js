import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import AllOrders from './AllOrders'

class UserProfile extends React.Component {
  componentDidMount() {
    // load user's order history here
    // load advertisements/items if we so choose
  }

  render() {
    const {singleUser} = this.props || {}

    return (
      <div className="userAndAds">
        <div className="profileContainer">
          <div className="headerAdsContainer">
            header ads here {/* test purposes only */}
          </div>

          {Object.keys(singleUser).length ? (
            <div className="singleUserContainer">
              {/* OrderHistory and PaymentOptions components
          to be created ... */}
              <div className="ordersLabel">Order History</div>
              <AllOrders user={singleUser} />

              <div className="profileLabel">Profile Info</div>
              <div className="userProfileContainer">
                <div className="userProfileName">Name: {singleUser.name}</div>
                <div className="userProfileEmail">
                  Email: {singleUser.email}
                </div>
                <div className="userProfilePhone">
                  Phone: {singleUser.phoneNumber}
                </div>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        {/* <PaymentOptions /> */}

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
