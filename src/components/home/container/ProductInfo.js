import { connect } from 'react-redux';
import React, {Component} from 'react';
import { Card,List,Form,Input,BackTop } from 'antd';
import '../../../css/header.css';
import { Select } from 'antd';
import { Button } from 'antd';
import {productAction} from '../../product/ducks/product'
import {cartAction} from '../../floatcart/duck/cart'
const { Option } = Select;
const { Meta } = Card;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
  };
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
            return <option value= {dataColor[0].sizePrice[key].price}> {key} </option>
        })
        let head = <option value = {0}> {0}</option>
        dataSize.unshift(head);
        this.setState({
            dataSize : dataSize,
            color : color
        })

    }
    chageSize = (e) =>{
       if(e.target.value != 0){
        let dataColor = this.state.productInfo.filter(item => item.color === this.state.color)
        let dataImage = Object.keys(dataColor[0].sizePrice).map((key, index) => {
            if(dataColor[0].sizePrice[key].price == e.target.value) return dataColor[0].sizePrice[key].urlImage
        }).filter(item => item !== undefined)
        let length = Object.keys(dataColor[0].sizePrice).map((key, index) => {
            if(dataColor[0].sizePrice[key].price == e.target.value) return key
        }).filter(item => item !== undefined)
        this.setState({
            priceNow : e.target.value,
            lengthNow : length[0],
            urlImage : dataImage[0]
        })
      }
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
            let listImage = "";
            this.state.urlImage.map((item,index) => {
               if (index % 2 === 0){
                    listImage += `<div className = "row1"><div style="width :50%;float : left;"><img style = "max-width : 100%; max-height : 100%;"  src = http://localhost:5000/getImage?image=images${item} /></div>`;
                } else {
                    listImage += `<div style="width :50%;float : left;"><img style = "max-width : 100%; max-height : 100%;"  src = http://localhost:5000/getImage?image=images${item} /></div> </div>`;
                }
            });
            if(listImage === "") listImage = "<p></p>"
        return(
        <div class ="clearfix">
            <div className ="col-7 md-auto float-left" dangerouslySetInnerHTML={{ __html: listImage }}>
                {/* <div className ="row">
                  <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={ <img  src = {`http://localhost:5000/getImage?image=images${this.state.imgageSelect}`} />}>
                 </Card>
                 </div> */}
                 {/* <div className="row overflow-auto">
                 <List 
                        grid={{
                            gutter: 16,
                            column: 3 
                        }}
                        dataSource={this.state.urlImage}
                        renderItem={item => (
                            <List.Item>
                            <Card
                             title={item.idProduct}
                             cover ={<img style={{width:75},{height :75}}  src = {`http://localhost:5000/getImage?image=images${item}`} onClick = {() => this.changeImage(item)}/>}>
                            </Card>
                            </List.Item>
                        )}/>
                 </div> */}
                 {/* <div className="row">
                 {this.state.urlImage.map(item => {
                         return ( <div className = "col"><img  src = {`http://localhost:5000/getImage?image=images${item}`} /></div>)
                     })}
                 </div> */}
                 {/* {listImage} */}
            </div>
            <div className ="col-4 md-auto float-right">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text">Select Length</label>
                    </div>
                    <select class="custom-select" onChange = {this.chageSize}>
                        {this.state.dataSize}
                    </select>
                    <div class="input-group-append">
                            <label class="input-group-text" >{this.state.priceNow}$</label>
                    </div>
                    <div class="input-group mb-3 mt-2">
                        {
                            listColor.map(item => {
                                return  <Button shape="circle" style={{ background: item.colorCode}} onClick ={() =>this.changeColor(item.color)}></Button>
                            })
                        }
                    </div>
                    <div class="input-group mb-3 mt-2">
                    <Button onClick = {() => this.addToCart('add to card')}> Add to cart</Button>
                    </div>
                </div>
            {/* <Form {...layout}> 
                          <Form.Item>
                            <Select   style={{ width: 200 }} placeholder = "Select Length" onChange = {this.chageSize}>
                                  {this.state.dataSize}
                            </Select>
                        <Button type="circle">{this.state.priceNow}$</Button>
                            </Form.Item>
                            <Form.Item>
                                        {
                                            listColor.map(item => {
                                                return  <Button shape="circle" style={{ background: item.colorCode}} onClick ={() =>this.changeColor(item.color)}></Button>
                                            })
                                        }
                           </Form.Item>
                           <Form.Item>
                                   <Button onClick = {() => this.addToCart('add to card')}> Add to cart</Button>
                           </Form.Item>
                </Form> */}
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