import React, { useContext, useEffect, useState } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';
import { warningToaster } from '../../Toaster/ALertToaster';

const Cart = (props) => {

  const { cartItem, productList, removeFromCard, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  const [cartAmount,setCartAmount] = useState(0)

  useEffect(()=>{ 
  const value =   getTotalCartAmount()
   setCartAmount(value)
  // eslint-disable-next-line
},[])


  const processToCheckOut = ()=>{
   const isLogged = localStorage.getItem("Token")
    if(!!isLogged){
      navigate('/order')
    }else{
      warningToaster("please Login")
      props.setShowLogin(true)
    }
  }

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {productList.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>₹{item.price * cartItem[item._id]}</p>
                  <p onClick={() => removeFromCard(item._id)} className='cross'>-</p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>₹{cartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{cartAmount === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{cartAmount === 0 ? 0 : cartAmount + 2}</b>
            </div>
          </div>
          <button onClick={() => processToCheckOut()}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;