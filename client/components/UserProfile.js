import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import OrderCard from './OrderCard'

class UserProfile extends React.Component {
  componentDidMount() {
    // load user's order history here
    // load advertisements/items if we so choose
  }

  render() {
    const {singleUser} = this.props || {}
    const orders = this.props.orders || []

    /* const orders = [
      {
        id: 1,
        imageUrl: 'https://imgur.com/qHp9pGM.jpg',
        name: 'alice',
        pricePaid: 200,
        quantity: 1,
        description:
          'The right guitar pick can make you sound like Pearl Jam any day of the week! This silver plated drop guitar pick with a pearl setting, bring a hint of luxury to your gig and draw attention with every flick of your wrist.'
      },
      {
        id: 2,
        imageUrl: 'https://imgur.com/qHp9pGM.jpg',
        name: 'alice',
        pricePaid: 200,
        quantity: 1,
        description:
          'The right guitar pick can make you sound like Pearl Jam any day of the week! This silver plated drop guitar pick with a pearl setting, bring a hint of luxury to your gig and draw attention with every flick of your wrist.'
      },
      {
        id: 3,
        imageUrl: 'https://imgur.com/qHp9pGM.jpg',
        name: 'alice',
        pricePaid: 200,
        quantity: 1,
        description:
          'The right guitar pick can make you sound like Pearl Jam any day of the week! This silver plated drop guitar pick with a pearl setting, bring a hint of luxury to your gig and draw attention with every flick of your wrist.'
      },
      {
        id: 4,
        imageUrl: 'https://imgur.com/qHp9pGM.jpg',
        name: 'alice',
        pricePaid: 200,
        quantity: 1,
        description:
          'The right guitar pick can make you sound like Pearl Jam any day of the week! This silver plated drop guitar pick with a pearl setting, bring a hint of luxury to your gig and draw attention with every flick of your wrist.'
      }
    ] */

    return (
      <div>
        <div className="su-ads-container">
          header ads here {/* test purposes only */}
        </div>

        {Object.keys(singleUser).length ? (
          <div>
            <div className="singleUserContainer">
              {/* OrderHistory and PaymentOptions components
          to be created ... */}
              <div>Order History</div>
              <div className="userOrdersContainer">
                {orders.length ? (
                  orders.map(order => (
                    <div key={order.id}>
                      <OrderCard order={order} />
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>

              {/* <OrderHistory /> */}
              <div className="userProfileContainer">
                <div>Name: {singleUser.name}</div>
                <div>Email: {singleUser.email}</div>
                <div>Phone: {singleUser.phoneNumber}</div>
              </div>
            </div>
          </div>
        ) : (
          <div>Guest profile</div>
        )}
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
