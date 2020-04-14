import { Drawer, Button } from 'antd';
import { connect } from 'react-redux';
import React, {Component} from 'react';
import '../../../css/cart.css';
import CartProduct from '../cartproduct/cartproduct'
import {cartAction} from '../../floatcart/duck/cart'
const mapStateToProps = (state) => {
  console.log(state);
  let {productNew} = state.cartReducer.cart
  let {cartData} =  state.cartReducer.cart
  let {isAdd} =  state.cartReducer.cart
   return {
    productNew : productNew,
    cartData : cartData,
    isAdd : isAdd
    }  
  };
  const mapDispatchToProps = (dispatch) => ({
    updateCart : (data) => {
      dispatch(cartAction.updateCart(data));
  }
  })
class FloatCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            isOpen: false,
            numberProductInCart : 0,
            cart : [],
        }
    }
    componentWillReceiveProps(nextProps) {
      let {updateCart} = this.props
      if(nextProps.productNew !== this.state.productNew && nextProps.isAdd){
          let product = nextProps.productNew;
          let productAlreadyInCart = false;
          this.state.cart.forEach(cp => {
            if (cp.product.idProductType === product.product.idProductType && cp.product.length === product.product.length) {
              cp.product.quantity += product.product.quantity;
              productAlreadyInCart = true;
            }
          });
          if (!productAlreadyInCart) {
            this.state.cart.push(product);
          }
          updateCart(this.state.cart);
          this.openFloatCart()
        
    }
    if(nextProps.cartData !== this.state.cartData){
       this.setState({
        cartData : nextProps.cartData,
       })
    }
  }
  componentDidUpdate() {
    console.log(this.state)
  }
  removeProduct = (product) =>{
    let {updateCart} = this.props
    const index = this.state.cart.findIndex(p => (p.product.idProductType === product.product.idProductType && p.product.idProductType === product.product.idProductType) );
    if (index >= 0) {
      this.state.cart.splice(index, 1);
      updateCart(this.state.cart);
    }
  }
  changeQuantity = (changedProduct) =>{
    let {updateCart} = this.props
    const product = this.state.cart.find ( p =>(p.product.idProductType === changedProduct.product.idProductType && p.product.idProductType === changedProduct.product.idProductType));
    product.product.quantity = changedProduct.product.quantity;
    if (product.product.quantity <= 0) {
      this.removeProduct(product);
    }
    updateCart(this.state.cart)
  }
  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };
  openFloatCart = () => {
    this.setState({ isOpen: true });
  };
  render() {
    let  cartTotals = this.state.cart !== undefined ? this.state.cart : [];
    let  cartData = this.state.cartData !== undefined ? this.state.cartData : {'productQuantity' : 0,'totalPrice' : 0};
    let totalProduct = cartTotals.length;
    const products = cartTotals.map((product,index) => {
      return (
        <CartProduct product = {product} removeProduct={this.removeProduct} changeProductQuantity={this.changeQuantity} key = {index}></CartProduct>
      );
    });
    return (
      <div className ="float-cart">
        <span
          onClick={() => this.openFloatCart()}
          className="bag bag--float-cart-closed">
          <span className="bag__quantity">{totalProduct}</span>
        </span>
        <Drawer
          title = {<span> Your Cart {totalProduct}</span>}
          placement="right"
          width ={350}
          onClose={this.onClose}
          visible={this.state.isOpen}>
          {products}
          <div className ="row">
             <p>Total quantity {cartData.productQuantity}</p>
             <br></br>
             <p>Total {cartData.totalPrice}</p>
          </div>
          <Button  style={{ marginRight: 8 }}>
              Check Out
            </Button>
        </Drawer>
    </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FloatCart);