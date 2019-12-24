import { Table, Input, Button, Radio , Form,Select } from 'antd';
import { Pagination } from 'antd';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as Constants from '../../../commom/Constants.js'
import Loading from '../../loading/loading';
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
  getInput = (e) => {
    console.log(e.producttype);
    let option = this.props.listProductType.map(item => <Option value = {item.id} >{item.name}</Option>)
    if (this.props.inputType === 'select') {
      return <Select onBlur={this.save} onChange = {this.change}>
          {option}
      </Select>;
    }
    if(e.producttype !== 'Closure' && e.producttype !== 'Frontal') {
       if(this.props.dataIndex === 'sizefrontal'){
          return <Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} disabled ="true"/>;
       }
    }
    if (this.props.dataIndex === 'length') return <Input ref={node => (this.inputLength = node)} onPressEnter={this.save} onBlur={this.save} />;
    else return <Input ref={node => (this.inputFrontal = node)} onPressEnter={this.save} onBlur={this.save} />;
  };
  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing}, () => {
      if (editing) {
        if(this.inputLength !== undefined){
            this.inputLength.focus();
        }
        if(this.inputFrontal !== undefined){
          this.inputFrontal.focus();
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
      } else {
       if(this.inputLength !== undefined) record.length =  this.inputLength.state.value;
       if(this.inputFrontal !== undefined) record.sizefrontal = this.inputFrontal.state.value;
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
        })(this.getInput(record))}
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
  const {listProductType} = state.productTypeReducer.producttype;
  const {listSize} = state.sizeReducer.size;
  let isFetching = state.productTypeReducer.producttype.isFetching && state.sizeReducer.size.isFetching
  return {
    listProductType : listProductType,
    isFetching : isFetching,
    listSize : listSize
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchGetAllSize : (data) => {
    dispatch(sizeAction.fetchGetListSize(data));
  },
  fetchGetAllProductType : () => {
    dispatch(productTypeAction.fetchGetListProductType());
  },
  fetchAddSize : (data) => {
    dispatch(sizeAction.addSize(data));
  },
  deleteSize : (listId) => {
    dispatch(sizeAction.deleteSize(listId));
  }
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
      pageSize : Constants.PAGE_SIZE,
      total : 0,
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
    fetchGetAllSize(sizeData);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource : nextProps.listSize.listSize,
      total : nextProps.listSize.totalElemt,
      listProductType : nextProps.listProductType,
    })
  }
  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      id : '',
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
    let {fetchAddSize} = this.props;
    let {dataSource , selectedRowKeys } = this.state;
    let data = {
        sizeData : {
            dataSource : dataSource,
            selectedRowKeys : selectedRowKeys
        },
        getList : {
                  curentPage :this.state.curentPage,
                  pageSize : this.state.pageSize,
                  productType : this.state.filterProductType
        }
   }
   fetchAddSize(data);
  }
  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };
  handleTable = (pagination,filters,sorter) =>{
        let {fetchGetAllSize} = this.props;
        this.setState({
          filterProductType : filters.producttype
        })
        let sizeData = {
          curentPage : this.state.curentPage,
          pageSize : this.state.pageSize,
          productType : filters.producttype
        }
        fetchGetAllSize(sizeData);
  }
  onPageChange = (page,pageSize) => {
    let {fetchGetAllSize} = this.props;
    this.setState({
      curentPage : page
    })
    let sizeData = {
      curentPage :page,
      pageSize : pageSize,
      productType : this.state.filterProductType
    }
    fetchGetAllSize(sizeData);
  }
  handleDelete = key => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const listId = selectedRowKeys.map(item =>{
      return Number(this.props.listSize.listSize.find(data => data.key === item)['id'])
    });
    const {deleteSize} = this.props;
    let sizeData = {
       getList : {
              curentPage :this.state.curentPage,
              pageSize : this.state.pageSize,
              productType : this.state.filterProductType
       },
      listId : listId
    }
    deleteSize(sizeData);
  };
  render() {
    const { isFetching } = this.props;
    const filter = this.state.listProductType.map(item => ({text :item.name,value :item.id}))
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
    let pagination =<Pagination defaultCurrent={this.state.curentPage} defaultPageSize={this.state.pageSize} 
                     total ={this.state.total}
                     onChange={this.onPageChange}>
                     </Pagination>
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
         <Loading  isLoading ={ isFetching }/>
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
        <Button className="ml-2" onClick={this.handleDelete} type="primary" style={{ marginBottom: 16 }}>
           Delete
        </Button>
        <Table
         rowSelection = {rowSelection} 
          components = {components}
          rowClassName = {() => 'editable-row'}
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