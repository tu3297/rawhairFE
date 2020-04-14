import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import '../../../css/cart.css';
import {cartAction} from '../../floatcart/duck/cart'
const { Meta } = Card;
class CartProduct extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
          product : this.props.product
        }
      }
    // componentWillReceiveProps(nextProps){
    //     this.setState({ product : nextProps.product})
    // }
    handleOnDecrease = (e) => {
        const { changeProductQuantity } = this.props;
        const { product } = this.state;
        product.product.quantity = product.product.quantity - 1;
        changeProductQuantity(product);
    }
    handleOnIncrease = e =>{
      const { changeProductQuantity } = this.props;
        const { product } = this.state;
        product.product.quantity = product.product.quantity + 1;
        changeProductQuantity(product);
    }
      render() {
        let {removeProduct} = this.props
        let product = this.state.product
        console.log(this.state);
        if(this.state.product.product !== undefined){
        return (
            <div className="shelf-item">
              <div className ="shelf-item__thumb">
              <Card
                    title = {<span onClick = {() =>removeProduct(product)}> X </span>}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={`http://localhost:5000/getImage?image=images${this.state.product.product.image[0]}`}  />}>
                    <Meta title= {this.state.product.product.productTypeName} description= {this.state.product.product.price} />
                  </Card>
              </div>
              <div className="shelf-item__details"></div>
              <div className="shelf-item__price">
                  <button  className="change-product-button" onClick = {this.handleOnDecrease}>-</button>
                  <span>{this.state.product.product.quantity}</span>
                  <button  className="change-product-button" onClick = {this.handleOnIncrease}>+</button>
                </div>
            </div>
        )
    } else {
      return null;
    }
  }
}
export default  (CartProduct);