# SITE OVERVIEW FOR CODE REVIEW

## Frontend

### Routes (Higher-Order-Component)

1.  JSX

* a Switch component that places AllProducts view at /home, with paths to login, signup, singleProduct, and singleUser views

2.  Containers

* mapState: places user and an isLoggedIn flag on this.props
* mapDispatch: places loadInitialData() on this.props, which loads the user instance onto state if user isLoggedIn; also places loadCart() on this.props, which calls a thunk that merges the user's persisted cart from the db with the localStorage guest cart that user may or may not have created. guestCart state is spread OVER the persisted state, since user's most recent actions are those made in guest-mode

3.  Class methods

* getUserCart(): this method filters the user's order history to grab the unfulfilledOrder (ie., !order.date && !order.isPaid) and convert it to a Cart object with the reduceOrderToGetPastCart() helper fn, then sends the pastCart as a param to this.props.loadCart, which merges past/present carts and places them on state
* a note about componentDidUpdate(): this method loads the cart on state if the user is NOT being redirected from /api/login, ie. any page refresh or navigation other than direct user login

### AllProducts

1.  JSX

* A loading page if products are still being fetched -- otherwise, we map the products array and generate a linked ProductCard, passing each product down through props
* The cart

2.  Containers

* mapState: places products on this.props
* mapDispatch: fetches products in componentDidMount lifecycle

### SingleProduct

1.  JSX

* A loading page if singleProduct is still being fetched -- otherwise, we generate a link back to the AllProducts component, the product details, addToCart buttons and a quantity tracker
* The cart

2.  Containers

* mapState: places singleProduct on this.props
* mapDispatch: fetches products (for use by cart), singleProduct, and places an updateCart(productId, quantity) method on this.props so that addToCart functionality updates the cart

3.  The cart

* The cart is an object structured: { productId: quantity }
* in SingleProduct's constructor we set a quantity equal to the quantity of the singleProduct using route props to grab the productId with the helper fn getQuantityFromCart(productId)
* If the item doesn't exist OR the cart doesn't exist, we set the quantity field in SingleProduct to 0, else we set it equal to the amount of product in the cart

4.  Class Methods

* handleChange(addOrSubtract, inventory): this method grabs the current quantity from local state and updates it to whatever value the user has input with the -/+ buttons -- this method ALSO restricts the user to quantities between 0 and available inventory
* handleUpdateCart(): this method calls this.props.updateCart and dispatches a thunk to the redux store that updates the cart on the store AND the cart in localStorage

5.  formatPrice() helper
    this helper function converts pennies to $0.00 representation

### ProductCard

1.  JSX

* A functional component that takes in a product and displays the relevant product data -- also uses the formatPrice() helper fn

### Cart

1.  JSX

* we take in all available products and map only those products that are IN the cart to CartProductCards, similar to ProductCards with slightly different layout to accommodate the Cart layout

2.  Containers

* mapState: places cart and all products on this.props
* mapDispatch: places updateCart() thunk dispatcher on this.props

3.  Class Methods

* handleQuantityChange(): this method is bound to the Cart constructor and passed down to CartProductCards so that Cart can be updated in the redux store when buttons on the CartProductCard are used to adjust quantity

4.  Redux Store

* fetchUpdateCart(): this method makes a call to /api/carts/:cartId so that users can be authenticated and make modifications to ONLY their cart. It calls ProductOrder instances associated with each product in the user's cart and handles them according to the quantity passed in the fn's params
* fetchClearCart(): this method destroys all ProductOrders associated with a user's cart, ie. unfulfilledOrder

### CartProductCard

1.  JSX

* A functional component that displays a miniaturized version of a ProductCard as well as a user interface to adjust the quantity of an item in the cart

### Total

## Backend

### Database

### Schema

* The following relationships were defined for this app:
  * One-to-many relationship between users and orders
  * Many-to-many relationship between users and addresses
    * The logic behind this is that a user's billing and shipping address may be different. Additionally, a user may have multiple shipping addresses
  * Many-to-many relationship between products and orders

### Models

### Seed

1.  How does the seeding process work?

* seed logic is located in script/seed
* seed arrays are static arrays on module.exports in each individual seed file
* seedGenerator is a tool to generate those static arrays; we don't actually need to use it anymore, but it's there to show how the seed arrays were created and to adjust them easily in the future if we need to
* seedRoutine does the heavy lifting: users, address, products, and orders models are generated by mapping each array and outputting Model.create(modelInstance), the productOrders through table is also generated in the same way ...
* UserAddress through table: this is the tricky one. UserAddress records contain foreign keys to users and addresses, and in order to stick them directly in the table we grab queryInterface() from the Sequelize constructor and use it to seed the associations directly. To do so, we have to manually add createdAt, updatedAt fields to the userAddresses instances before calling queryInterface.

2.  How are users and addresses associated?

* Users can have many addresses but the address field is not required, so some users have an empty array of addresses, others have several associated addresses

3.  How are products and orders associated and how are users associated with particular orders?

* Products and orders are m:n associations, and orders contain a foreign key to a particular user
* important! each user is associated with TWO ORDERS: one that is FULFILLED and has a DATE field value, and one that is UNFUFILLED and has a DATE field value of NULL. the UNFULFILLED order is the user's cart and should always be persisted -- to clear the cart, rather than deleting a user's unfulfilledOrder from their order history, we can use the /api/carts/:userId router's DELETE method to disassociate all ProductOrders with the unfulfilledOrder instance

### API

### Routes

1.  /api/carts

* GET /api/carts/:userId: returns the unfulfilledOrder that holds a user's "cart", or list of associated products with this orderId, through model.ProductOrder
* PUT /api/carts/:userId: grabs the User instance and uses it to grab the user's orderId representing the cart, then updates the cartItem passed in req.body as { productId : quantity } by either a) finding or creating the instance, and b) deleting or updating the foundInstance
* DELETE /api/carts/:userId: destroys each ProductOrder that associates products in user's unfulfilledOrder.products array

2.  /api/orders

* GET /api/orders returns a list of all orders. This route is only available to admins.
* GET /api/orders/:orderId returns a specific order along with all of it's associated products
* POST /api/orders creates an order
* PUT /api/orders/:orderId takes in one more of the following items and updates those items in an existing order:
  * date
  * isPaid
  * products
  * userId
* DELETE /api/orders/:orderId deletes the order specified in the request

### Oauth-local

### GatekeepingMiddleware

* This middleware protects the routes and ensures that only users with the proper rights are able to view certain information.
* We defined two levels of permission:
  * Admins only
  * Registered users and admins (registered users can only view their respective information)
* Using the above two permissions, access is restricted for all routes that are not available to guests. Some examples of this are as follows:
  * The route to view all users is only availabe to admins
  * Products can be viewed by guests, registered users, and admins (the middleware was not used in this case)
  * Registered users can view their own information such as shopping cart, profile, etc.
  * For testing purposes, this middleware checks if "superagenet" is included in the header of the request. If so, the test is given access to the respective route as well

## Deployment

### Heroku

### Oauth-deployed
