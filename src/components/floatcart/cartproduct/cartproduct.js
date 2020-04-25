import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card,Row,Col, Button } from 'antd';
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
        let title = 
        <Row gutter = {[16,16]}>
          <Col span ={8}><Button type = "circle" onClick = {() =>removeProduct(product)}> X </Button></Col>
          <Col span ={8}>
              <Button type = "circle" onClick = {this.handleOnDecrease}>-</Button>
              <span>{this.state.product.product.quantity}</span>
              <Button type = "circle" onClick = {this.handleOnIncrease}>+</Button>
          </Col>
        </Row>
        if(this.state.product.product !== undefined){
        return (
            <Row >              
                <Col>
                    <Card
                          title = {title}
                          cover={<img alt="example" src={`http://localhost:5000/getImage?image=images${this.state.product.product.image[0]}`}  />}>
                          <Meta title= {this.state.product.product.productTypeName} description= {this.state.product.product.price} />
                        </Card>
                  </Col>
              </Row>

        )
    } else {
      return null;
    }
  }
}
export default  (CartProduct);