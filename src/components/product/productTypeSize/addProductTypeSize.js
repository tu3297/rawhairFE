import { Table, Input, Button, Popconfirm, Form,Select } from 'antd';
import React, {Component} from 'react';
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
            editing :false
        })
    }
  getInput = () => {
     console.log(this.props);
    if (this.props.inputType === 'select') {
      return <Select onBlur={this.save}>
           <Option value="jack">Jack</Option>
           <Option value="lucy">Lucy</Option>
           <Option value="tom">Tom</Option>
      </Select>;
    } else if (this.props.inputType === 'select1'){
        return <Select onBlur={this.save}>
           <Option value="jack">Jack</Option>
           <Option value="lucy">Lucy</Option>
           <Option value="tom">Tom</Option>
      </Select>;

    } else if (this.props.inputType === 'select2'){
        return <Select onBlur={this.save}>
           <Option value="jack">Jack</Option>
           <Option value="lucy">Lucy</Option>
           <Option value="tom">Tom</Option>
      </Select>;
    } else return<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />;
  };
  toggleEdit = () => {
      console.log(this.select);
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        if(this.input !== undefined){
            this.input.focus();
        }
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

class EditableTable extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Product Type',
        dataIndex: 'producttype',
        width: '30%',
        editable: true,
      },
      {
        title: 'Product',
        dataIndex: 'product',
        width: '30%',
        editable: true,
      },
      {
        title: 'Size',
        dataIndex: 'size',
        width: '20%',
        editable: true
      },
      {
        title: 'Price',
        dataIndex: 'price',
        width: '20%',
        editable: true
      }
    ];

    this.state = {
    selectedRowKeys: [],
      dataSource: [
        {
          key: '0',
          producttype: 'Edward King 0',
          product: 'Edward King 0',
          size: '32',
          price: 'London, Park Lane no. 0',
        }
      ],
      count: 1,
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
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

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
          inputType :col.dataIndex === 'producttype'? 'select' : col.dataIndex === 'product' ? 'select1' : col.dataIndex === 'size' ? 'select2' : 'input',
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
export default EditableTable;