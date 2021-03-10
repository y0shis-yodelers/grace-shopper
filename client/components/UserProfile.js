import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {format} from 'phone-fns'
import AllOrders from './AllOrders'

class UserProfile extends React.Component {
  componentDidMount() {
    // load advertisements/items if we so choose
  }

  render() {
    const {singleUser} = this.props || {}
    const {history} = this.props

    return (
      <div className="user">
        <div className="profileContainer">
          {Object.keys(singleUser).length ? (
            <div className="singleUserContainer">
              <div className="profileLabel">Profile Info</div>
              <div className="profileAndBlank">
                <div className="userProfileContainer">
                  <div className="userProfileItem">
                    <span>Name:</span>
                    <span>{singleUser.name}</span>
                  </div>
                  <div className="userProfileItem">
                    <span>Email:</span>
                    <span>{singleUser.email}</span>
                  </div>
                  <div className="userProfileItem">
                    <span>Phone:</span>
                    <span>
                      {format('(NNN) NNN-NNNN', singleUser.phoneNumber)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => history.push(`/users/${singleUser.id}/edit`)}
                  >
                    Edit My Profile
                  </button>
                </div>
              </div>
              <div className="ordersLabel">Order History</div>
              <AllOrders user={singleUser} />
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
