import { Table, Input, Button, Radio , Form,Select } from 'antd';
import { Pagination } from 'antd';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as Constants from '../../../commom/Constants.js'
import { 
  sizeAction
} from '../../size/ducks/size';
import {
  productTypeAction
} from '../../product/productType/ducks/productType'
const EditableContext = React.createContext();
const { Option } = Select;
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    constructor(props){
        super(props);
        this.state =({
            productTypeId :'',
            productTypeName :'',
            editing :false
        })
    }
  getInput = () => {
    console.log(this.props);
    let option = this.props.listProductType.map(item => <Option value = {item.id} >{item.name}</Option>)
    if (this.props.inputType === 'select') {
      return <Select ref={node => (this.input = node)} onBlur={this.save} onChange = {this.change}>
          {option}
      </Select>;
    }
    if(this.props.productType !== 'Closure' && this.props.productType !== 'Frontal') {
       if(this.props.dataIndex === 'sizefrontal'){
          return <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} disabled ="true"/>;
       }
    }
    return <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />;
  };
  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing}, () => {
      if (editing) {
        if(this.input !== undefined){
            this.input.focus();
        }
      }
    });
  };
  change = e =>{
     let productType = this.props.listProductType.filter(item => item.id === e);
     this.setState({
      productTypeId : e,
      productTypeName: productType[0].name
     })
  }
  save = e => {
    console.log(this.state)
    const { record, handleSave } = this.props;
    let {editing , productTypeId , productTypeName} = this.state;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      if(typeof e === 'string' && e !== 'pls enter data'){
         record.producttype = productTypeName;
         record.productTypeId = productTypeId;
      }
      record.editing = editing;
      handleSave({ ...record});
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: 'fail',
            },
          ],
          initialValue: record[dataIndex],
        })(this.getInput())}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}>
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
const mapStateToProps = (state) => {
  const {listProductType , isFetching } = state.productTypeReducer.producttype;
  return {
    listProductType : listProductType,
    isFetching : isFetching
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchGetAllSize : (data) => {
    dispatch(sizeAction.fetchGetListSize(data));
  },
  fetchGetAllProductType : () => {
    dispatch(productTypeAction.fetchGetListProductType());
  },
});
class Size extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      listProductType : [],
      dataSource: [],
      type : 'Cm',
      count: 0,
      productType :'',
      curentPage : 1,
      filterProductType : [],
      pageSize : Constants.PAGE_SIZE
    };
  }
  componentDidMount(){
    let {fetchGetAllSize , fetchGetAllProductType} = this.props;
    let sizeData ={
      curentPage : this.state.curentPage,
      pageSize : this.state.pageSize,
      productType : this.state.filterProductType
    }
    fetchGetAllProductType();
    //fetchGetAllSize(sizeData);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      listSize : nextProps.listSize,
      listProductType : nextProps.listProductType
    })
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    console.log(this.state);
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      producttype: 'pls enter data',
      length: 32,
      sizefrontal: 'pls enter data',
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = data => {
    const { dataSource } = this.state;
    let index = dataSource.findIndex(item => item.key === data.key);
    dataSource[index] = data;
    this.setState({
      dataSource : dataSource,
      producttype : data.producttype
    })
  };
  saveSize = () => {
    console.log(this.state);
    let {dataSource , selectedRowKeys } = this.state;
    let sizeData = {
      dataSource : dataSource,
      selectedRowKeys : selectedRowKeys
   }
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  handleTable = (pagination,filters,sorter) =>{
        let {fetchGetAllSize} = this.props;
        let sizeData ={
          curentPage : this.state.curentPage,
          pageSize : this.state.pageSize,
          productType : filters.producttype
        }
        fetchGetAllSize(sizeData);
  }
  render() {
    const filter = this.state.listProductType.map(item => ({text :item.name,value :item.id}))
    console.log(filter);
    const columns1 = [
      {
        title: 'Product Type',
        dataIndex: 'producttype',
        filters : filter,
        width: '50%',
        editable: true,
      },
      {
        title: 'Length',
        dataIndex: 'length',
        width: '20%',
        editable: true
      },
      {
        title: 'Size Frontal',
        dataIndex: 'sizefrontal',
        width: '20%',
        editable: true
      },
    ];
    let pagination =<Pagination defaultCurrent={this.state.curentPage} defaultPageSize={this.state.pageSize}></Pagination>
    const {type} = this.state;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = columns1.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType :col.dataIndex === 'producttype' ? 'select' : 'text',
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          filters : col.filters,
          listProductType : this.state.listProductType,
          productType : this.state.producttype,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
       <Radio.Group value ={type} className ="float-right">
          <Radio.Button value="Cm">Cm</Radio.Button>
          <Radio.Button value="Inch">Inch</Radio.Button>
        </Radio.Group>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Button className="ml-2" onClick={this.saveSize} type="primary" style={{ marginBottom: 16 }}>
           Save
        </Button>
        <Button className="ml-2" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
           Delete
        </Button>
        <Table
         rowSelection={rowSelection} 
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination = {false}
          onChange ={this.handleTable}/>
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
)(Size);