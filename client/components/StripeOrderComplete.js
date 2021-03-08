import React from 'react'

export const OrderSuccess = () => {
  return (
    <div>
      <h4>Thank you for ordering at the Bass Shopper</h4>
      <h6>
        You should expect and email at test@test.com and SMS at (123)-456-7890
      </h6>
    </div>
  )
}

export const OrderFailure = () => {
  return (
    <div>
      <h4>Your Order did not go through</h4>
      <h6>Please try again and/or contact customer service</h6>
    </div>
  )
}
