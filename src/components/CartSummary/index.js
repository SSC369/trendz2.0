import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let cartValue = 0
      let cartQuantity = 0
      cartList.forEach(eachProduct => {
        cartValue += eachProduct.quantity * eachProduct.price
        cartQuantity += eachProduct.quantity
      })
      return (
        <div className="cart-summary-container">
          <p>
            Order Total: <span>{cartValue}</span>
          </p>
          <p>{cartQuantity} items in a cart</p>
          <button type="button" className="checkout-button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
