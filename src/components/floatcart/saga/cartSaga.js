import { 
    put,
    call 
  } from 'redux-saga/effects';
  import {cartAction} from '../../floatcart/duck/cart'
export function* addToCart(action){
   let product = action.payload;
   yield put(cartAction.addToCartSuccess(product));
}
export function* updateCart(action){
  let cartProducts = action.payload;
  let productQuantity = cartProducts.reduce((sum, p) => {
    sum += p.product.quantity;
    return sum;
  }, 0);
  let totalPrice = cartProducts.reduce((sum, p) => {
    sum += p.product.price * p.product.quantity;
    return sum;
  }, 0);
  let cartTotal = {
    productQuantity,
    totalPrice,
    currencyId: 'USD',
    currencyFormat: '$'
  };
  yield put(cartAction.updateCartSuccess(cartTotal));
}