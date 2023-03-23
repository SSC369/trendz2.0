import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartItems = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: filteredCartItems})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isProductInCart = cartList.find(item => item.id === product.id)
    if (isProductInCart === undefined) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newList = cartList.map(eachProduct => {
        if (product.id === eachProduct.id) {
          const newItem = {
            ...eachProduct,
            quantity: eachProduct.quantity + product.quantity,
          }
          return newItem
        }
        return eachProduct
      })
      this.setState({cartList: newList})
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newList = cartList.map(eachProduct => {
      if (id === eachProduct.id) {
        const newItem = {
          ...eachProduct,
          quantity: eachProduct.quantity + 1,
        }
        return newItem
      }
      return eachProduct
    })
    this.setState({cartList: newList})
  }
  
   decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const requiredItem = cartList.find(item => item.id === id)

    if (requiredItem.quantity === 1) {
      const filteredCartItems = cartList.filter(
        eachProduct => eachProduct.id !== id,
      )
      this.setState({cartList: filteredCartItems})
    } else {
      const newList = cartList.map(eachProduct => {
        if (id === eachProduct.id) {
          if (eachProduct.quantity > 1) {
            const newItem = {
              ...eachProduct,
              quantity: eachProduct.quantity > 1 && eachProduct.quantity - 1,
            }
            return newItem
          }
        }
        return eachProduct
      })
      this.setState({cartList: newList})
    }
  }


  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
