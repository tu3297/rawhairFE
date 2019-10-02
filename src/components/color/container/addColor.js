import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Input,Modal,Table,Icon,Button,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import Types from '../ducks/color/type';
import Loading from '../../loading/loading.js';
import { 
  colorActions,
  colorTypes
} from '../ducks/color';
const data = [
  ];
  const mapStateToProps = (state) => {
    const {listColor , isFetching } = state.color;
    return {
      listColors : listColor,
      isFetching : isFetching
    };
  };
  const mapDispatchToProps = (dispatch) => ({
    fetchGetAllColor : () => {
      dispatch(colorActions.fetchGetListColor());
    },
    createColor : (colorData) => {
      dispatch(colorActions.addColor(colorData))
    }
  });
class AddColor extends React.Component {
  state = {
    listColors : [],
    displayColorPicker: false,
    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },
    nameColor : '',
    hexColor :'',
    visible : false
  };
  componentDidMount(){
    const { fetchGetAllColor } = this.props;
    fetchGetAllColor();
  }
  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb , hexColor : color.hex})
  };
   handleOk = async(e) => {
    const {hexColor , nameColor } = this.state;
    let corlor = {
      colorCode : hexColor,
      colorName : nameColor
    }
    const { createColor } = this.props;
    const flagAdd = await createColor(corlor);
    this.setState({
      visible : false
    })
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleInput = e =>{
       this.setState({
           nameColor : e.target.value
       })
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });
  handAddColor = () =>{
    this.setState({
        visible: true
      });
  }
  handleDelete = ()=>{
    this.setState({
        visible: false
      });
  }
  handleEdit = (record) =>{
        console.log(record);
        this.setState({
            visible:true,
            nameColor : record.name,
            hexColor:record.colorCode
        });
  }
  render() {
    const {listColors , isFetching} = this.props;
    const styles = reactCSS({
        'default': {
          color: {
            width: '70px',
            height: '15px',
            color :'#8B0000',
            borderRadius: '2px',
            background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
          },
          swatch: {
            padding: '5px',
            background: '#fff',
            borderRadius: '1px',
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
          },
          popover: {
            position: 'absolute',
            zIndex: '2',
          },
          cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
          }
        },
      });
     let pickColor = <div>
     <div style={ styles.swatch } onClick={ this.handleClick }>
       <div style={ styles.color } > {this.state.hexColor} </div>
     </div>
     { this.state.displayColorPicker ? <div style={ styles.popover }>
       <div style={ styles.cover } onClick={ this.handleClose }/>
       <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
     </div> : null }
   </div>
    const columns = [
      {
        title: 'Color name',
        dataIndex: 'colorName',
        key: 'colorName',
        width: '20%',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: 'Color Code',
        dataIndex: 'colorCode',
        key: 'colorCode',
        width: '10%'
      },
      {
          width:'5%',
          title : 'Action',
          key : 'action',
          render : (text, record) => 
          <div className="d-flex justify-content-center">
              <Button className="mr-1" onClick={() => this.handleEdit(record)}>Edit</Button>
              <Popconfirm title="Sure to delte?" onConfirm={() => this.handleDelete(record.key)}>
                <Button type="danger">Delete</Button>
              </Popconfirm>
          </div> 
      }
    ];
    let modalAdd =<div>
        <Modal
            title="Add Color"
            visible= {this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>
        <div className="pickColor">
            <Input value={this.state.nameColor} onChange={this.handleInput} placeholder="Pick Color" addonAfter={pickColor} />
        </div>
       </Modal>
    </div>
    return (
    <div className="container">
      <Loading isLoading ={ isFetching }/>
         <div className="float-right mb-1 mt-1">
        <Button onClick = {this.handAddColor}>
              Add Color
         </Button>
         </div>
         <div className="clearfix"/>
        <div class = "row ">
           <div className="col-12">
             <Table columns={columns} bordered dataSource={listColors}/>
           </div>
        </div>
        {this.state.visible ? modalAdd : null}
    </div>
   );
  }
}
export default  connect(
  mapStateToProps, 
  mapDispatchToProps,
)(AddColor);