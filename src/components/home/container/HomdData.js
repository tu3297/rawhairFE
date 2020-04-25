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
  import { Tree } from 'antd';
  import { Row, Col } from 'antd';
  const { TreeNode } = Tree;
const mapStateToProps = (state) => {
  console.log(state);
    const {listProduct } = state.productReducer.product;
    let isFetching1 = state.productReducer.product.isFetching;
        return {
          isFetching : isFetching1,
          listProduct : listProduct
        }  
  };
  const mapDispatchToProps = (dispatch) => ({
  fetchGetAllProduct : (data) => {
    dispatch(productAction.getAllProduct(data));
  },
  })
  class HomdeData extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            pageSize : Constants.PAGE_SIZE,
            curentPage : 1,
            isFetching : true,
            expandedKeys: [],
            selectedKeys: [],
          }
    }
    onExpand = expandedKeys => {
      this.setState({
        expandedKeys,
      });
    };
    componentDidMount(){
        let {fetchGetAllProduct} = this.props;
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
          listProductTypeHome : nextProps.listProductTypeHome,
          isFetching : nextProps.isFetching,
          listProduct : nextProps.listProduct
        })
      }
      productSelect(idProductType,productTypeName){
           this.props.history.push(`/home/productInfo`,{idProductType:idProductType, productTypeName : productTypeName});
      }
    render(){
        console.log(this.state)
        if(!this.state.isFetching){
        const treeData = this.state.listProductTypeHome
        let seem = {}
        const dataProduct = this.state.listProduct !== undefined ? this.state.listProduct.filter((item) => {
          let k = item.idProductType
          return seem.hasOwnProperty(k) ? false : (seem[k]= true)
        }) : []
        return(
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
                                    cover ={<img style={{width:250},{height :250}} src = {`http://localhost:5000/getImage?image=images${item.urlImage[0]}`} onClick = {() => this.productSelect(item.idProductType,item.productTypeName)}/>}>
                                    {item.price}$
                                 </Card>
                            </List.Item>
                        )}/>
        )} else {
          return null
        }
      }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(HomdeData);