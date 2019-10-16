import { Table, Input, Button, Radio , Form,Select } from 'antd';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { 
  productTypeAction
} from '../../product/productType/ducks/productType';
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
            productType :'',
            editing :false
        })
    }
  getInput = () => {
    console.log(this.props);
    let option = this.props.listProductType.map(item => <Option value ={item.name}>{item.name}</Option>)
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
    console.log(this.state)
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
     this.setState({
       productType : e
     })
  }
  save = e => {
    const { record, handleSave , productType} = this.props;
    let {editing} = this.state;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      record.productType = productType;
      record.editing = editing;
      handleSave({ ...record, ...values });
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
              message: `${title} is required.`,
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
  fetchGetAllProductType : () => {
    dispatch(productTypeAction.fetchGetListProductType());
  },
});
class Size extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Product Type',
        dataIndex: 'producttype',
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

    this.state = {
      selectedRowKeys: [],
      listProductType : [],
      dataSource: [],
      type : 'Cm',
      count: 2,
      productType :''
    };
  }
  componentDidMount(){
    let {fetchGetAllProductType} = this.props;
       fetchGetAllProductType();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
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

  handleSave = row => {
    console.log(row);
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData,productType : row.producttype });
  };
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    const {type} = this.state;
    const {selectedRowKeys } = this.state;
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
    const columns = this.columns.map(col => {
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
          listProductType : this.state.listProductType,
          productType : this.state.productType,
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
        <Button className="ml-2" onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
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
        />
      </div>
    );
  }
}
export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(Size);