import React,{ Component } from 'react';
import { Upload, Icon, Modal,message,Button } from 'antd';
import { Select ,Input} from 'antd';
import { connect } from 'react-redux';
import {
  productTypeAction
} from '../../product/productType/ducks/productType'
import {
  colorAction, colorActions
} from '../../color/ducks/color'
import {
  sizeAction
} from '../../size/ducks/size'
import {
  productAction
} from '../../product/ducks/product'
const { Option } = Select;
function getBase64(img, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    if(callback!== undefined) reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
 });
}
function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
}
const mapStateToProps = (state) => {
  console.log(state);
  const { listProductType , isFetching } = state.productTypeReducer.producttype;
  const {colorOfProductType} = state.colorReducer.color;
  const {sizeOfProductType} = state.sizeReducer.size;
  const {id} = state.productReducer.product;
  return {
    listProductType : listProductType,
    isFetching : isFetching,
    colorOfProductType : colorOfProductType,
    sizeOfProductType :sizeOfProductType,
    idProduct : id
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchGetAllProductType : () => {
     dispatch(productTypeAction.fetchGetListProductType());
  },
  fetchGetAllSizeOfProductType : (data) => {
      dispatch(sizeAction.fetchGetListSizeOfProductType(data))
  },
  fetchGetAllColorOfProductType : (data) => {
    dispatch(colorActions.fetchGetListColorOfProductType(data));
  },
  getData : (data) => {
    dispatch(productAction.getNextId());
  }
});
class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList : [],
            isSelectProductType : false,
            isClosureFrontal : false

        };
    }
    componentDidMount(){
      let { fetchGetAllProductType,getData } = this.props;
      fetchGetAllProductType();
      getData();
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        listProductType : nextProps.listProductType,
        colorOfProductType : nextProps.colorOfProductType,
        sizeOfProductType : nextProps.sizeOfProductType,
        idProduct : nextProps.idProduct
      });
    }
    handleChange = info => {
        if (info.file.status === "uploading") {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === "done") {
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false
            })
          );
        }
      };
      handlePreview = async file => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
          previewImage: file.url || file.preview,
          previewVisible: true,
        });
      };
      handleCancel = () => this.setState({ previewVisible: false });
      onChange = (value,key) => {
        if(key.key === 'productType'){
        this.setState({
          isSelectProductType : true
        })
        let {fetchGetAllColorOfProductType,fetchGetAllSizeOfProductType } = this.props;
        let data = {
          productTypeId : value
        }
        fetchGetAllColorOfProductType(data);
        fetchGetAllSizeOfProductType(data);
       } else if(key.key === 'color'){
             
       } else if (key.key === 'frontal'){
            
       } else {
           
       }
     }
      save = () => {
           
      }
    render(){
      console.log(this.state);
      this.uploaderProps = {
        name : "file",
        listType :"picture-card",
        className : "avatar-uploader",
        showUploadList : true,
        action : 'http://localhost:5000/upload?id=' + this.state.idProduct,
        data : (file) => new FormData().append('file',file),
       }
        let dataProductType = (this.state.listProductType !== undefined ? this.state.listProductType : []).map(item => <Option value = {item.id} key ='productType' > {item.name}</Option>)
        let dataColor = (this.state.colorOfProductType !== undefined ? this.state.colorOfProductType : []).map(item => <Option value = {item.colorId} key ='color'> {item.colorName}</Option>)
        let dataSize = (this.state.sizeOfProductType !== undefined ? this.state.sizeOfProductType : []).map(item => <Option value = {item.id} key ='size'> {item.length}</Option>)
        let dataSizeFrontal = (this.state.sizeOfProductType !== undefined ? this.state.sizeOfProductType : []).map(item => <Option value = {item.id} key ='frontal'> {item.sizeFrontal}</Option>)
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? "loading" : "plus"} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
            <div className="container">
               <Input size="small" disabled  value = {this.state.idProduct}  style={{ width: 250 }} />
                <div className="row">
                <Upload
                    {...this.uploaderProps}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                    onPreview={this.handlePreview}>
                    {uploadButton}
               </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      </div>
        <div className="row">
      <Select
              style={{ width: 200 }}
              placeholder="Select product type"
              optionFilterProp="children"
              onChange ={this.onChange}>
           {dataProductType}
      </Select>
      </div>
      <div className="row">
        <Select
              disabled ={!this.state.isSelectProductType}
              style={{ width: 200 }}
              placeholder="Select color"
              optionFilterProp="children"
              onChange ={this.onChange}>
           {dataColor}
      </Select>
      </div>
      <div className ="row">
      <Select
          disabled ={!this.state.isSelectProductType}
          style={{ width: 200 }}
          placeholder="Select size frontal or closure"
          optionFilterProp="children"
          onChange ={this.onChange}>
             {dataSizeFrontal}
      </Select>
      </div>
        <div className ="row">
      <Select
          disabled ={!this.state.isSelectProductType}
          style={{ width: 200 }}
          placeholder="Select size"
          optionFilterProp="children"
          onChange ={this.onChange}>
              {dataSize}
      </Select>
        </div>
        <div className ="row">
        <Input size="small" placeholder ="PRICE"  style={{ width: 250 }}/>
        </div>
        <div className="row">
        <Input size="large" placeholder="INFO"  style={{ width: 250 }}/>
        </div>
        <Button type="primary" onClick = {this.save}>Primary</Button>
       </div>)
    }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct);