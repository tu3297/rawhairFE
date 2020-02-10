import {
    productAction
  } from '../../product/ducks/product'
  import * as Constants from '../../../commom/Constants'
 import { 
    productTypeAction
  } from '../../product/productType/ducks/productType';
  import { connect } from 'react-redux';
  import React, {Component} from 'react';
  import { List, Card } from 'antd';
import { Button } from 'antd';
const mapStateToProps = (state) => {
    const {listProduct } = state.productReducer.product;
    let isFetching1 = state.productReducer.product.isFetching;
    const {listProductType  } = state.productTypeReducer.producttype;
    let isFetching2 =state.productTypeReducer.producttype.isFetching;
        return {
          isFetching : isFetching1 || isFetching2,
          listProductType : listProductType,
          listProduct : listProduct
        }  
  };
  const mapDispatchToProps = (dispatch) => ({
  fetchGetAllProduct : (data) => {
    dispatch(productAction.getAllProduct(data));
  },
  fetchGetAllProductType : () => {
    dispatch(productTypeAction.fetchGetListProductType());
  },
  })
  class HomdeData extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            pageSize : Constants.PAGE_SIZE,
            curentPage : 1
          }
    }
    componentDidMount(){
        let {fetchGetAllProduct,fetchGetAllProductType} = this.props;
       fetchGetAllProductType();
        let data = {
          pageSize : this.state.pageSize,
          curentPage : this.state.curentPage,
          id : null,
          productType : null,
          length : null,
          color : null,
          sort : null
         }
      fetchGetAllProduct(data);
      }
      selectType = (e) =>{
        let {fetchGetAllProduct} = this.props;
        let data = {
         pageSize : this.state.pageSize,
         curentPage : this.state.curentPage,
         id : null,
         productType : Array.from(e).join(),
         length : null,
         color : null,
         sort : null
        }
        fetchGetAllProduct(data);
      }
      componentWillReceiveProps(nextProps) {
        this.setState({
          listProductType : nextProps.listProductType,
          isFetching : nextProps.isFetching,
          listProduct : nextProps.listProduct
        })
      }
      productSelect(idProductType){

      }
    render(){
        console.log(this.state)
        const dataType = this.state.listProductType !== undefined ? this.state.listProductType.filter((item) => {
                  return item.parent === '0'
        }) : []
        let seem = {}
        const dataProduct = this.state.listProduct !== undefined ? this.state.listProduct.filter((item) => {
          let k = item.idProductType
          return seem.hasOwnProperty(k) ? false : (seem[k]= true)
        }) : []
        console.log(seem)
        return(
                <div className ="container">
                <div className ="float-left col-2">
                    <List
                        size = "large"
                        dataSource={dataType}
                        itemLayout ="vertical"
                        renderItem={item => (
                            <List.Item>
                                <Button type="primary" onClick={() => this.selectType(item.id)}>{item.name}</Button>
                        </List.Item>
                        )}/>
                </div>
                <div className = "float-left col-10">
                    <List 
                        grid={{
                            gutter: 16,
                            column: 4 
                        }}
                         dataSource={dataProduct}
                        renderItem={item => (
                            <List.Item>
                            <Card
                             title={item.idProduct}
                             cover ={<img  src = {`http://localhost:5000/getImage?image=images${item.urlImage[0]}`} onClick = {() => this.productSelect(item.idProductType)}/>}>
                               {item.price}$</Card>
                            </List.Item>
                        )}/>
                </div>
                </div>
        )}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomdeData);