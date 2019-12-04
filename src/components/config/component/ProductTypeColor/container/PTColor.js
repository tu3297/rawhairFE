import React,{ Component } from 'react';
import { connect } from 'react-redux';
import colorReducer, { colorActions } from '../../../../color/ducks/color';
import { Select ,Input,Checkbox, Table} from 'antd';
import { productTypeAction } from '../../../../product/productType/ducks/productType';
const mapStateToProps = (state) => {
    return {
        listColor : state.colorReducer.color.listColor,
        listProductType : state.productTypeReducer.producttype.listProductType
    }
  };
  const mapDispatchToProps = (dispatch) => ({
    fetchGetAllProductType : () => {
      dispatch(productTypeAction.fetchGetListProductType());
    },
    fetchGetAllColor : () => {
        dispatch(colorActions.fetchGetListColor());
    },
    updateProductTypeColor : (data) => {
        dispatch(productTypeAction.updateProductTypeColor(data))
    },
    fethGetAllProductTypeColor : () => {
        dispatch(productTypeAction.getAllProductTypeColor())
    }
  });
class PTColor extends Component {
    constructor(props){
        super(props);
        this.state = {
            listColor : [],
            listProductType : []
        }
    }
    componentDidMount(){
        let { fetchGetAllColor , fetchGetAllProductType} = this.props;
        fetchGetAllColor();
        fetchGetAllProductType();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
          listProductType : nextProps.listProductType,
          listColor : nextProps.listColor
        })
    }
    onChange = (e) => {
        let check = e.target.checked;
        let dataId = e.target.value;
        if(check === false ){
        }
        let { updateProductTypeColor} = this.props;
        updateProductTypeColor(dataId);
      }
    render(){
        let listProductType = this.state.listProductType !== undefined ? this.state.listProductType : [];
        listProductType.unshift({});
        let column = listProductType.map((item,index) => {
            if(index === 0){
                return {
                    title : <span>Color&#95;ProductType</span>,
                    dataIndex :'colorName',
                }
            } else {
               return {
                 title : item.name,
                 dataIndex :'',
                 render : (text,row,index) => {
                     return <Checkbox value = {item.id + ',' + row.colorId} onChange = {this.onChange}></Checkbox>
                 }
              }
            }
        });
        return <Table columns={column} dataSource={this.state.listColor} bordered />
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(PTColor);