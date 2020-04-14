import { connect } from 'react-redux';
import React, {Component} from 'react';
import { Card,List } from 'antd';
import '../../../css/header.css';
import { Select } from 'antd';
import { Button } from 'antd';
import {productAction} from '../../product/ducks/product'
import {cartAction} from '../../floatcart/duck/cart'
const { Option } = Select;
const { Meta } = Card;
const mapStateToProps = (state) => {
    console.log(state);
    const {productInfo } = state.productReducer.product;
    let isFetching1 = state.productReducer.product.isFetching;
    return {
        isFetching : isFetching1,
        productInfo : productInfo
      }  
    };
    const mapDispatchToProps = (dispatch) => ({
        fetchGetProductInfo : (data) => {
            dispatch(productAction.getProductInfo(data));
          },
        addToCart : (data) => {
            dispatch(cartAction.addToCart(data));
        }
    })
class ProductInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isFetching : true,
            idProductType :this.props.location.state.idProductType,
            productTypeName : this.props.location.state.productTypeName,
            priceNow : '0',
            urlImage : [],
            imgageSelect : ''
        }
    }
    componentDidMount(){
        let {fetchGetProductInfo} = this.props;
        let data ={'idProductType' :this.state.idProductType};
        fetchGetProductInfo(data);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            isFetching : nextProps.isFetching,
            productInfo : nextProps.productInfo,
            listImage : [],
            dataSize : []
          })
    }
    changeColor = (color) =>{
        console.log(color);
        let dataColor = this.state.productInfo.filter(item => item.color === color)
        let dataSize = Object.keys(dataColor[0].sizePrice).map((key, index) => {
            return <Option value= {dataColor[0].sizePrice[key].price}> {key} </Option>
        })
        this.setState({
            dataSize : dataSize,
            color : color
        })

    }
    chageSize = (e) =>{
        console.log(e);
        let dataColor = this.state.productInfo.filter(item => item.color === this.state.color)
        let dataImage = Object.keys(dataColor[0].sizePrice).map((key, index) => {
            if(dataColor[0].sizePrice[key].price == e) return dataColor[0].sizePrice[key].urlImage
        }).filter(item => item !== undefined)
        let length = Object.keys(dataColor[0].sizePrice).map((key, index) => {
            if(dataColor[0].sizePrice[key].price == e) return key
        }).filter(item => item !== undefined)
        this.setState({
            priceNow : e,
            lengthNow : length[0],
            urlImage : dataImage
        })
    }
    changeImage = (e) => {
         console.log(e);
         this.setState({
             imgageSelect : e
         })
    }
    addToCart = (e) => {
        let {addToCart} = this.props;
        let productSelect = {
            productTypeName : this.state.productTypeName,
            idProductType : this.state.idProductType,
            quantity : 1,
            length : this.state.lengthNow,
            color : this.state.color,
            price : this.state.priceNow,
            image : this.state.imgageSelect
        }
        let arr = [];
        let product = {product :productSelect}
        addToCart(product);
    }
    render(){
        if(!this.state.isFetching){
            let listColor = this.state.productInfo.map(item => {
                return {
                    'color' : item.color,
                    'colorCode' : item.colorCode
                }
            })
        return(
        <div class ="container">
            <div className ="row">
            <div className ="col-8">
                <div className ="row">
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={ <img alt="example" src = {`http://localhost:5000/getImage?image=images${this.state.imgageSelect}`} />}>
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                 </Card>
                 </div>
                 <div className="row">
                 <List 
                        grid={{
                            gutter: 16,
                            column: 4 
                        }}
                        dataSource={this.state.urlImage}
                        renderItem={item => (
                            <List.Item>
                            <Card
                             title={item.idProduct}
                             cover ={<img  src = {`http://localhost:5000/getImage?image=images${item}`} onClick = {() => this.changeImage(item)}/>}>
                            </Card>
                            </List.Item>
                        )}/>
                 </div>
            </div>
            <div className ="col-4">
                <div className ="row">
                            <Select  style={{ width: 120 }} onChange = {this.chageSize}>
                                  {this.state.dataSize}
                            </Select>
                            <div>{this.state.priceNow}</div>
                </div>
                <div className="row">
                       {
                           listColor.map(item => {
                               return  <Button shape="circle" style={{ background: item.colorCode}} onClick ={() =>this.changeColor(item.color)}></Button>
                           })
                       }
                </div>
                <div className="row">
                    <Button onClick = {() => this.addToCart('add to card')}> Add to cart</Button>
                </div>
            </div>
            </div>
        </div>
        )
    } else {
        return null;
    }
  }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ProductInfo);