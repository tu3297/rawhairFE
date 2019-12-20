import { Table, Divider, Tag , Input , Button,Pagination } from 'antd';
import React,{ Component } from 'react';
import { Select } from 'antd';
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
    return {
      listProductType : listProductType,
      listColor : listColor
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
        this.state ={
          curentPage : 1,
          pageSize : Constants.PAGE_SIZE,
          producttype : [],
          color : [],
          length : [],
          idProduct :"",
          listColor : [],
          listProductType : [],
        }
    }
    componentDidMount(){
      let {fetchGetAllProductType,fetchGetAllColor} = this.props;
      fetchGetAllColor();
      fetchGetAllProductType();
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
         listProductType : nextProps.listProductType,
         listColor : nextProps.listColor
      });
    }
    onChange = (value,key) =>{
      console.log(key)
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
    search = () =>{
      console.log(this.state)
      let data = {
          pageSize : this.state.pageSize,
          curentPage : this.state.curentPage,
          id : this.state.idProduct,
          productType : this.state.producttype.join(),
          length : this.state.length.join(),
          color : this.state.color.join()
      }
      console.log(data);
      let {fetchGetAllProduct} = this.props;
      fetchGetAllProduct(data);
    }
    render(){
    console.log(this.state);
    const length = [8,10,12,14,16,18,20,22,24,26,28,30,32,34,36].map(item => item +"");
    let lengthData = length.map(item => <Option key="length" value ={item} >{item}</Option>)
    let colorData = this.state.listColor.map(item => <Option key="color" value ={item.colorId} >{item.colorName}</Option>)
    let producttypeData = this.state.listProductType.map(item => <Option key="productType" value ={item.id} >{item.name}</Option>)
   const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'ID',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Product Type',
    dataIndex: 'producttype',
    key: 'producttype',
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
        <a>Update</a>
        <Divider type="vertical"/>
        <a>Delete</a>
      </span>
    ),
  },
];
let pagination =<Pagination defaultCurrent={this.state.curentPage} defaultPageSize={this.state.pageSize} 
total ={this.state.total}
onChange={this.onPageChange}>
</Pagination>
const data = [];
 return (
    <div> 
    <div>
       <Input style={{ width: 200 }} placeholder="ID" />
       <Select style={{ width: 200 }} placeholder="Length" mode="multiple" onChange ={this.onChange}>
          {lengthData}
       </Select>
       <Select   style={{ width: 200 }} placeholder="Product Type" mode="multiple" onChange ={this.onChange}>
          {colorData}
       </Select>
       <Select   style={{ width: 200 }} placeholder="Color" mode="multiple" onChange ={this.onChange}>
          {producttypeData}
       </Select>
       <Button shape="circle" icon="search" onClick = {this.search}/>
       <Button type="primary" shape="circle" icon ="plus"></Button>
       </div>
    <div> 
        <Table columns={columns} dataSource={data} />
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