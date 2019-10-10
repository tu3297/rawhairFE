import React from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Input,Modal,Table,Icon,Button,Popconfirm } from 'antd';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import Loading from '../../loading/loading.js';
import { 
  colorActions,
  colorTypes
} from '../ducks/color';
const data = [];
  const mapStateToProps = (state) => {
    console.log(state);
    const {listColor , isFetching } = state.colorReducer.color;
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
    },
    deleteColor : (colorId) => {
      dispatch(colorActions.deleteColor(colorId))
    }
  });
class AddColor extends React.Component {
  state = {
    listColors : [],
    displayColorPicker: false,
    color: {
      r: '',
      g: '',
      b: '',
      a: '',
    },
    nameColor : '',
    hexColor :'',
    colorId :'',
    visible : false,
    error :{
      blank :
          {
            isBlank : false,
            blankContent : 'Không để dữ liệu trống !!'
          },
      duplicate :
      {
            isDuplicate : false,
            duplicateData :'Màu này đã tồn tại !!'
      }
    }
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
    console.log(color);
    let isDuplicate = this.props.listColors.some(item => {
      return (item.colorCode === color.hex)
    });
    if(isDuplicate){
      this.setState(state => (
        state.error.duplicate.isDuplicate = true,
        state.hexColor = color.hexColor,
        state)
      );
    } else {
      this.setState(state => (
        state.error.duplicate.isDuplicate = false,
        state.hexColor = color.hex,
        state.hexColor = color.hex,
        state)
      );
    }
  };
  handleOk = async(e) => {
    if(this.state.error.blank.isBlank || this.state.error.duplicate.isDuplicate || this.state.hexColor === ''){
      this.setState(state => (
        state.error.blank.isBlank = true,state))
    } else {
    const { hexColor , nameColor ,colorId } = this.state;
    let color = {
      colorId : colorId,
      colorCode : hexColor,
      colorName : nameColor
    }
  const { createColor } = this.props;
   const flagAdd = await createColor(color);
    this.setState({
      visible : false
    })
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleInput = e =>{
    let nameColor = e.target.value;
    let isDuplicate = this.props.listColors.some(color => {
          return (color.colorName === nameColor)
    });
    if(nameColor === ""){
      this.setState(state => (
        state.error.blank.isBlank = true,
        state.nameColor = "",
        state)
      );
      console.log(this.state);
    } else if (isDuplicate) {
      this.setState(state => (
        state.error.duplicate.isDuplicate = true,
        state.nameColor = nameColor,
        state)
      );
    } else {
      this.setState(state => (
        state.error.blank.isBlank = false,
        state.error.duplicate.isDuplicate = false,
        state.nameColor = nameColor,
        state)
      );
    }
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
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
  handAddColor = () => {
    this.setState(state => (state.error.blank.isBlank = false, state));
    this.setState(state => (state.error.duplicate.isDuplicate = false, state));
    this.setState({
      nameColor : '',
      hexColor :''
    })
    this.setState({
        visible: true
      });
  }
  handleDelete = async(key)=>{
    console.log(key);
    const { deleteColor } = this.props;
    const flagAdd = await deleteColor(key);
  }
  handleEdit = (record) =>{
        console.log(record);
        this.setState({
            visible:true,
            colorId : record.colorId,
            nameColor : record.colorName,
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
              <Popconfirm title="Sure to delte?" onConfirm={() => this.handleDelete(record.colorId)}>
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
        {this.state.error.blank.isBlank ? <div>{this.state.error.blank.blankContent}</div> : null}
        {this.state.error.duplicate.isDuplicate ? <div>{this.state.error.duplicate.duplicateData}</div> : null}
       </Modal>
    </div>
    return (
    
    <div className="container">
        <Loading  isLoading ={ isFetching }/>
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
export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(AddColor);