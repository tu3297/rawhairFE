import React,{ Component } from 'react';
import { connect } from 'react-redux';
import colorReducer, { colorActions } from '../../../../color/ducks/color';
import { Select ,Input,Checkbox, Table} from 'antd';
import { productTypeAction } from '../../../../product/productType/ducks/productType';
const mapStateToProps = (state) => {
    console.log(state);
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
    render(){
        console.log(this.state);
        let listProductType = this.state.listProductType !== undefined ? this.state.listProductType : [];
        listProductType.unshift({});
        let column = listProductType.map((item,index) => {
            if(index === 0){
                return {
                    title : 'Color / Product Type',
                    dataIndex :'colorName',
                }
            } else {
               return {
                 title : item.name,
                 dataIndex :'',
                 render : (text,row,index) => {
                     return <Checkbox></Checkbox>
                }
            }
            }
        });
        console.log(column);
        return <Table columns={column} dataSource={this.state.listColor} bordered />
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps)(PTColor);