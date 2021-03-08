import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import AllOrders from './AllOrders'

class UserProfile extends React.Component {
  componentDidMount() {
    // load user's order history here
    // load advertisements/items if we so choose
  }

  render() {
    const {singleUser} = this.props || {}
    const {history} = this.props

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
                <div>
                  <div className="userProfileName">Name: {singleUser.name}</div>
                  <div className="userProfileEmail">
                    Email: {singleUser.email}
                  </div>
                  <div className="userProfilePhone">
                    Phone: {singleUser.phoneNumber}
                  </div>

                  <button
                    type="button"
                    onClick={() => history.push(`/users/${singleUser.id}/edit`)}
                  >
                    Edit
                  </button>
                </div>
              </div>
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
