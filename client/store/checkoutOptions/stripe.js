import {loadStripe} from '@stripe/stripe-js'

const STRIPE_PUBLIC_KEY =
  'pk_test_51IRAGrKvkOozTd9WXjudcSnBXHoLITwEcGCrPGGRo4J7T2eYAnoREEYKFDNhMyC1HkrUAcXtMC37AMKUOl678a5A00sAd1ES3S'

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY)

export default stripePromise
