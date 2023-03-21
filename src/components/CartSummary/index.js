import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let cartValue = 0

      cartList.forEach(eachProduct => {
        cartValue += eachProduct.quantity * eachProduct.price
      })
      return (
        <div className="cart-summary-container">
          <h1 className="order-details">
            Order Total:<span className="cart-value"> Rs: {cartValue}/- </span>
          </h1>
          <p className="cart-summary-quantity">
            {cartList.length} Items in cart
          </p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
