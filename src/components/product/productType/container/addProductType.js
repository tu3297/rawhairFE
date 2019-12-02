import { Table, Input, Button, Form,Select } from 'antd';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Loading from '../../../loading/loading.js';
import { 
  productTypeAction,
  ptTypes
} from '../ducks/productType';
import { deleteProductTypeSuccess } from '../ducks/productType/action';
import { 
  colorActions
} from '../../../color/ducks/color';
const EditableContext = React.createContext();
const { Option } = Select;
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
    colorName :'pls enter data',
    colorId : ''
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        if(this.inputName !== undefined){
            this.inputName.focus();
        }
        if(this.inputDes !== undefined){
           this.inputDes.focus();
        }
      }  
    });
  };
  getInput = (e) => {
    let option = this.props.listColor.map(item => <Option value = {item.colorId} >{item.colorName}</Option>)
    if (this.props.inputType === 'select') {
      return <Select ref={node => (this.input = node)} onBlur={this.save} onChange = {this.change}>
         {option}
      </Select>;
     
    } else if(this.props.dataIndex === 'name') {
      return <Input ref={node => (this.inputName = node)} onPressEnter={this.save} onBlur={this.save}/>;
    } else {
      return <Input ref={node => (this.inputDes = node)} onPressEnter={this.save} onBlur={this.save}/>;
    }
  };
  change = e =>{
    let color = this.props.listColor.filter(item => item.colorId === e);
    this.setState({
     colorId : e,
     colorName: color[0].colorName
    })
 }
  save = e => {
    const { record, handleSave , listColor } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      record.editing = this.state.editing;
      record.color = this.state.colorName;
      record.colorId = this.state.colorId;
      if(this.inputName !== undefined) record.name =  this.inputName.state.value;
      if(this.inputDes !== undefined) record.description = this.inputDes.state.value;
      handleSave({...record});
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
              message: 'loi'
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
  const {listColor} = state.colorReducer.color;
  return {
    listProductType : listProductType,
    listColor : listColor,
    isFetching : isFetching
  };
};
const mapDispatchToProps = (dispatch) => ({
    createProductType : (productTypeData) => {
       dispatch(productTypeAction.addProductType(productTypeData));
    },
    fetchGetAllProductType : () => {
      dispatch(productTypeAction.fetchGetListProductType());
    },
    deleteProductType : (listId) => {
      dispatch(productTypeAction.deleteProductType(listId));
    },
    fetchGetAllColor : () => {
      dispatch(colorActions.fetchGetListColor());
    },
});
class AddProductType extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        editable :true
      },
      {
        title: 'Color',
        dataIndex: 'color',
        width: '20%',
        editable: true
      },
    ];

    this.state = {
      selectedRowKeys: [],
      dataSource: [],
      count : 0
    };
  }
  componentDidMount(){
    const { fetchGetAllProductType ,fetchGetAllColor} = this.props;
    fetchGetAllProductType();
    fetchGetAllColor();
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
        dataSource : nextProps.listProductType,
        listColor : nextProps.listColor
      })
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleDelete = key => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    const listId = selectedRowKeys.map(item =>{
      return Number(this.props.listProductType.find(data => data.key === item)['id'])
    });
    const {deleteProductType} = this.props;
    deleteProductType(listId);
  };

  handleAdd = () => {
    const { dataSource, count } = this.state;
    const newData = {
      id : '',
      key: count,
      name: 'Pls enter data',
      description: 'Pls enter data',
      color : 'pls enter data',
      editing : false
    };
    this.setState({
      count : count +1,
      dataSource: [...dataSource, newData]
    });
  };

  handleSave = (data) => {
    const { dataSource } = this.state;
    let index = dataSource.findIndex(item => item.key === data.key);
    dataSource[index] = data;
    this.setState({
      dataSource : dataSource
    })
  };
  saveProductType = () =>{
     let {createProductType} = this.props;
     let {dataSource , selectedRowKeys } = this.state;
     let productTypeData = {
        dataSource : dataSource,
        selectedRowKeys : selectedRowKeys
     }
     createProductType(productTypeData);
  }
  render() {
    const {isFetching} = this.props;
    const {selectedRowKeys,dataSource } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
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
          inputType :col.dataIndex === 'color' ? 'select' : 'text',
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          listColor : this.state.listColor,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
         <Loading  isLoading ={ isFetching }/>
        <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
          Add a row
        </Button>
        <Button className="ml-2" onClick={this.saveProductType} type="primary" style={{ marginBottom: 16 }}>
           Save
        </Button>
        <Button className="ml-2" onClick={this.handleDelete} type="primary" style={{ marginBottom: 16 }}>
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
)(AddProductType);