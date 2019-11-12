import { Table, Divider, Tag , Input , Button } from 'antd';
import React,{ Component } from 'react';
import { Select } from 'antd';
const { Option } = Select;
class ListProduct extends Component {
    constructor(props){
        super(props);
    }
    render(){
   const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <span>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a>Invite {record.name}</a>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
 ];
 return (
    <div> 
    <div>
       <Input style={{ width: 200 }} placeholder="Code" />
       <Input style={{ width: 200 }} placeholder="Name" />
       <Select style={{ width: 200 }} placeholder="Length">
           <Option value="jack">Jack</Option>
       </Select>
       <Select   style={{ width: 200 }} placeholder="Product Type">
           <Option value="jack">Jack</Option>
       </Select>
       <Select   style={{ width: 200 }} placeholder="Color">
           <Option value="jack">Jack</Option>
       </Select>
       <Button shape="circle" icon="search" />
       <Button type="primary" shape="circle" icon ="plus"></Button>
       </div>
    <div> 
        <Table columns={columns} dataSource={data} />
    </div>
    </div>
 );
}
}
export default ListProduct;