import { Table, Divider, Tag , Input , Button,Pagination } from 'antd';
import React,{ Component } from 'react';
import { Select } from 'antd';
import { Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as Constants from '../../../commom/Constants.js'
import {
  productTypeAction
} from '../../product/productType/ducks/productType'
import {
  colorActions
} from '../../color/ducks/color'
import {
  productAction
} from '../../product/ducks/product'
const { Option } = Select;
const mapStateToProps = (state) => {
    const { listProductType , isFetching } = state.productTypeReducer.producttype;
    const {listColor} = state.colorReducer.color;
    const {listProduct} = state.productReducer.product;
    return {
      listProductType : listProductType,
      listColor : listColor,
      listProduct : listProduct
    }
}
const mapDispatchToProps = (dispatch) => ({
  fetchGetAllProductType : () => {
    dispatch(productTypeAction.fetchGetListProductType());
 },
  fetchGetAllColor : () => {
    dispatch(colorActions.fetchGetListColor());
 },
  fetchGetAllProduct : (data) => {
    dispatch(productAction.getAllProduct(data));
  }
})
class ListProduct extends Component {
    constructor(props){
        super(props);
        console.log(props)
        this.state ={
          curentPage : 1,
          pageSize : Constants.PAGE_SIZE,
          producttype : [],
          color : [],
          length : [],
          idProduct :"",
          listColor : [],
          listProductType : [],
          sort : {
            price : 'none'
          }
        }
    }
    componentDidMount(){
      let {fetchGetAllProductType,fetchGetAllColor} = this.props;
      let {fetchGetAllProduct} = this.props;
      let data = {
        pageSize : this.state.pageSize,
        curentPage : this.state.curentPage,
        id : this.state.idProduct,
        productType : this.state.producttype.join(),
        length : this.state.length.join(),
        color : this.state.color.join(),
        sort : this.state.sort.price
    }
      fetchGetAllProduct(data);
      fetchGetAllColor();
      fetchGetAllProductType();
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
         listProductType : nextProps.listProductType,
         listColor : nextProps.listColor,
         listProduct : nextProps.listProduct
      });
    }
    onChange = (value,key) =>{

        if(key[0].key === 'length'){
          this.setState({
              ...this.state,
              length : value
          })
       } else if (key[0].key === "color"){
        this.setState({
            ...this.state,
            color : value
        })
        } else if (key[0].key === "productType"){
          this.setState({
              ...this.state,
              producttype : value
          })
         }
    }
    handleTable = (pagination,filters,sorter) =>{
      let {fetchGetAllProduct} = this.props;
      let data = {
        pageSize : this.state.pageSize,
        curentPage : this.state.curentPage,
        id : this.state.idProduct,
        productType : this.state.producttype.join(),
        length : this.state.length.join(),
        color : this.state.color.join(),
        sort : sorter.order === undefined ? 'none' : sorter.order
    }
    fetchGetAllProduct(data);
    }
    search = () =>{
      let data = {
          pageSize : this.state.pageSize,
          curentPage : this.state.curentPage,
          id : this.state.idProduct,
          productType : this.state.producttype.join(),
          length : this.state.length.join(),
          color : this.state.color.join(),
          sort : this.state.sort.price
      }
      let {fetchGetAllProduct} = this.props;
      fetchGetAllProduct(data);
    }
    createNew = () => {
      this.props.history.push(`${this.props.match.path}/createProduct`)
    }
    update = (value) => {
      console.log(value);
      this.props.history.push({
        pathname :`${this.props.match.path}/createProduct`,
        search : '?mode=update',
        state : { idProduct : value }
     })
    }
    render(){
    const length = [8,10,12,14,16,18,20,22,24,26,28,30,32,34,36].map(item => item +"");
    let lengthData = length.map(item => <Option key="length" value ={item} >{item}</Option>)
    let colorData = this.state.listColor.map(item => <Option key="color" value ={item.colorId} >{item.colorName}</Option>)
    let producttypeData = this.state.listProductType.map(item => <Option key="productType" value ={item.id} >{item.name}</Option>)
   const columns = [
  {
    title: 'Id',
    dataIndex: 'idProduct',
    key: 'idProduct',
    render: (text,record) => <a style ={{textDecoration : 'underline'}} onClick ={ () => this.update(record.idProduct)} value ={record.idProduct}>{text}</a>,
  },
  {
    title: 'Product Type',
    dataIndex: 'productTypeName',
    key: 'productTypeName',
  },
  {
    title: 'Length',
    dataIndex: 'length',
    key: 'length',
  },
  {
    title: 'Color',
    dataIndex: 'color',
    key: 'color',
    render : (text,record) => (
      <span>
        <Button style={{backgroundColor: record.colorName,display : 'inline-block'}} shape="circle" icon="" />
        <Divider type ="vertical"/>
      </span>
    )
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    sorter : true
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Delete</a>
      </span>
    ),
  },
];
let pagination =<Pagination defaultCurrent={this.state.curentPage} defaultPageSize={this.state.pageSize} 
total ={this.state.total}
onChange={this.onPageChange}>
</Pagination>
const data = this.state.listProduct;
const match = this.props.match;
 return (
    <div> 
    <div>
       <Input style={{ width: 200 }} placeholder="ID" />
       <Select style={{ width: 200 }} placeholder="Length" mode="multiple" onChange ={this.onChange}>
          {lengthData}
       </Select>
       <Select   style={{ width: 200 }} placeholder="Color" mode="multiple" onChange ={this.onChange}>
          {colorData}
       </Select>
       <Select   style={{ width: 200 }} placeholder="Product Type" mode="multiple" onChange ={this.onChange}>
          {producttypeData}
       </Select>
       <Button shape="circle" icon="search" onClick = {this.search}/>
       <Button type="primary" shape="circle" icon ="plus" onClick = {this.createNew}></Button>
       </div>
    <div> 
        <Table 
          columns={columns} 
          dataSource={data} 
          pagination = {false}
          onChange = {this.handleTable} />
    </div>
    <div className="float-right">
            {pagination}
    </div>
    </div>
 );
}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListProduct);