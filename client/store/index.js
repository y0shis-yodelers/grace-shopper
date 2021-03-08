import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import cart from './cart'
import products from './products'
import singleProduct from './singleProduct'
import orders from './orders'
import singleOrder from './singleOrder'
import address from './address'

const reducer = combineReducers({
  user,
  products,
  singleProduct,
  cart,
  orders,
  singleOrder,
  address
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
