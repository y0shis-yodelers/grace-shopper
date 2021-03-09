/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './AllProducts'
export {default as ProductCard} from './ProductCard'
export {default as SingleProduct} from './SingleProduct'
export {default as UserProfile} from './UserProfile'
export {default as SingleOrder} from './SingleOrder'
export {default as OrderInfo} from './OrderInfo'
export {default as Cart} from './Cart'
export {AllUsers} from './AllUsers'
export {AdminAllProducts} from './AdminAllProducts'
export {default as Checkout} from './Checkout'
export {default as Total} from './Total'
export {default as ShippingData} from './ShippingData'
export {default as EditProfile} from './EditProfile'
export {default as OrderSuccess, OrderFailure} from './StripeOrderComplete'
export {default as About} from './About'
