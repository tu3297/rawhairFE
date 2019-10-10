import { Table, Input, Button, Form,Select } from 'antd';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { 
  productTypeAction,
  ptTypes
} from '../ducks/productType';
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      let {editing} = this.state;
      record.editing = editing;
      handleSave({...record, ...values });
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
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
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
    return {};
};
const mapDispatchToProps = (dispatch) => ({
    createProductType : (productTypeData) => {
       dispatch(productTypeAction.addProductType(productTypeData));
    }
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
      }
    ];

    this.state = {
      selectedRowKeys: [],
      dataSource: [],
      count : 0
    };
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = () => {
    const { dataSource, count } = this.state;
    const newData = {
      id : '',
      key: count,
      name: 'Pls enter data',
      description: 'Pls enter data',
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
    console.log(dataSource);
    this.setState({
      dataSource : dataSource
    })
  };
  saveProductType = () =>{
     let {createProductType} = this.props;
     let {dataSource , selectedRowKeys } = this.state;
     console.log(this.state);
     let productTypeData = {
        dataSource : dataSource,
        selectedRowKeys : selectedRowKeys
     }
     createProductType(productTypeData);
  }
  render() {
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
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
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