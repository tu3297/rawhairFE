import { Table, Divider, Tag , Input , Button,Pagination } from 'antd';
import React,{ Component } from 'react';
import { Select } from 'antd';
import * as Constants from '../../../commom/Constants.js'
const { Option } = Select;
class ListProduct extends Component {
    constructor(props){
        super(props);
        this.state ={
          curentPage : 1,
          pageSize : Constants.PAGE_SIZE,
          producttype : [],
          color : [],
          length : [],

        }
    }
    render(){
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
       <Select style={{ width: 200 }} placeholder="Length" mode="multiple">
           <Option value="jack">Jack</Option>
       </Select>
       <Select   style={{ width: 200 }} placeholder="Product Type" mode="multiple">
           <Option value="jack">Jack</Option>
       </Select>
       <Select   style={{ width: 200 }} placeholder="Color" mode="multiple">
           <Option value="jack">Jack</Option>
       </Select>
       <Button shape="circle" icon="search" />
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
export default ListProduct;