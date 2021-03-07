import React, {Component} from 'react'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

class StripeCheckout extends React.Component {
  constructor(props) {
    super(props)
  }
}
