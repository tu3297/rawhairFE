import React,{ Component } from 'react';
import { Upload, Icon, Modal,message,Button } from 'antd';
import { Select ,Input} from 'antd';
import { connect } from 'react-redux';
import Loading from '../../loading/loading';
import {
  productTypeAction
} from '../../product/productType/ducks/productType'
import {
  productAction
} from '../../product/ducks/product'
const { Option } = Select;
let productType = null;
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
const mapStateToProps = (state, ownProps) => {
  const { listProductType} = state.productTypeReducer.producttype;
  let isFetching1 = state.productTypeReducer.producttype.isFetching;
  const {productUpdate,  initData} = state.productReducer.product;
  let isFetching2 = state.productReducer.product.isFetching;
  return {
    listProductType : listProductType,
    isFetching : isFetching1 || isFetching2,
    update : productUpdate,
    initData : initData
  };
};
const mapDispatchToProps = (dispatch) => ({
  fetchGetAllProductType : () => {
     dispatch(productTypeAction.fetchGetListProductType());
  },
  getData : (data) => {
    dispatch(productAction.getData());
  },
  saveProduct : (data) => {
    dispatch(productAction.saveProduct(data))
  },
  fetchGetProduct : (data) => {
    dispatch(productAction.getProduct(data))
  }
});
class AddProduct extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this._isMounted = false;
        let idProduct = '',isFrontalClosure = false
        const search = props.location.search;
        const params = new URLSearchParams(search);
        const mode = params.get('mode');
        if(mode === 'update') {
          idProduct = props.location.state.idProduct
          isFrontalClosure = props.location.state.isFrontalClosure
          this.state = {
            loading: true,
            previewVisible: false,
            previewImage: '',
            fileList : [],
            isEnablelength : false,
            isEnableFrontal : isFrontalClosure === true ? false : true,
            product : [],
            idProductUpdate : idProduct,
            isClosureFrontal : isFrontalClosure,
            colorOfProductType: [],
            sizeFrontalClosure : [],
            lengthOfProductType : [],
            mode : mode,
        };
        } else {
        this.state = {
            loading: true,
            previewVisible: false,
            previewImage: '',
            fileList : [],
            isEnablelength : true,
            isEnableFrontal : true,
            product : [],
            idProductUpdate : idProduct,
            isClosureFrontal : isFrontalClosure,
            colorOfProductType: [],
            sizeFrontalClosure : [],
            lengthOfProductType : [],
            mode : mode,
        };
      }
    }
    componentDidMount(){
    this._isMounted = true;
    let { fetchGetAllProductType , getData , fetchGetProduct } = this.props;
    if(this.state.idProductUpdate !== "") {
        let data = {
          idProduct : this.state.idProductUpdate
        }
        fetchGetProduct(data)
      }
      fetchGetAllProductType();
      getData();
    }
    componentWillUnmount() {
     this._isMounted = false
   }
    componentWillReceiveProps(nextProps) {
      this.setState({
        ...this.state,
        listProductType : nextProps.listProductType,
        product : {
           ...this.state.product,
           idProduct : nextProps.initData !== undefined ?nextProps.initData.idProduct : ""
        },
        initData : nextProps.initData,
        loading : nextProps.isFetching,
        update : nextProps.update
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
      onChange = (value , key) => {
        if(key.key === 'productType'){
        productType = this.state.initData.productypeData.find(data => data.productTypeId === value);
        let colorOfProductType = productType['colors'];
        let flag =true,sizeFrontalClosure
        if (productType.productTypeName === 'Closure' || productType.productTypeName === 'Frontal') {
            flag = false;
            sizeFrontalClosure = productType.frontalClosure.map(item =>({'sizeFrontal' : item.sizeFrontal}))
        } else {
            let lengthOfProductType = productType.frontalClosure.map(item => ({'id' : item.sizeId,'length' : item.length}))
            this.setState({
              lengthOfProductType : lengthOfProductType
            })
        }
        this.setState({
          colorOfProductType : colorOfProductType,
          sizeOfProductType : sizeFrontalClosure,
          isEnableFrontal : flag,
          isEnablelength : !flag
        })
        this.setState({product : Object.assign({}, this.state.product, { 'idProductType' : value })});
       } else if(key.key === 'color'){
         this.setState({
          product : Object.assign({}, this.state.product, { 'idColor' : value })});
       } else if (key.key === 'frontal'){
        let lengthOfProductType = productType.frontalClosure.filter(item => item.sizeFrontal === value).map(data => ({'id' : data.sizeId,'length' : data.length}))
         this.setState({
          product : Object.assign({}, this.state.product, { 'sizeFrontal' : value }),
          lengthOfProductType : lengthOfProductType,
          isEnablelength : false
        });
       } else {
        this.setState({
          product : Object.assign({}, this.state.product, { 'idSize' : value })});
       }
     }
     InputPriceChange = (e) => {
        let price = e.target.value;
        this.setState({
          product : Object.assign({}, this.state.product, { 'price' : price })});
     }
     InputInfoChange = (e) => {
        let info = e.target.value;
     }
    save = () => {
           let {saveProduct} = this.props;
           let productData = this.state.product;
           saveProduct(productData)
    }
    handleChangeUpload = ({ fileList ,file}) =>{
      console.log(file)
       this.setState({ 
         fileList : fileList
       });
    }
    render(){
      console.log(this.state)
      if(this.state.initData !== undefined || (this.state.mode === 'update' && this.state.update !== undefined)){
      this.uploaderProps = {
        name : "file",
        listType :"picture-card",
        className : "avatar-uploader",
        showUploadList : true,
        action : 'http://localhost:5000/upload?id=' + (this.state.mode !== 'update' ? this.state.initData.idProduct : this.state.idProductUpdate)+'',
        data : (file) => new FormData().append('file',file),
      }
       let dataProductType,dataColor,dataLength,dataSizeFrontal,sizeFrontalClosure,lengthOfProductType
       if(this.state.mode === 'update'){
        if(this.state.initData !== undefined && this.state.update !== undefined){
        let productType = this.state.initData.productypeData.find(data => data.productTypeId === this.state.update.idProductType);
        let  colorOfProductType = productType['colors'];
        let sizeFrontalClosure = []
        if (productType.productTypeName === 'Closure' || productType.productTypeName === 'Frontal') {
            sizeFrontalClosure = productType.frontalClosure.map(item =>({'sizeFrontal' : item.sizeFrontal}))
            lengthOfProductType = productType.frontalClosure.filter(item => item.sizeFrontal === this.state.update.frontal).map(data => ({'id' : data.sizeId,'length' : data.length}))
        } else {
            lengthOfProductType = productType.frontalClosure.map(item => ({'id' : item.sizeId,'length' : item.length}))
        }
         sizeFrontalClosure = Array.from(new Set(sizeFrontalClosure.map(item => item.sizeFrontal)));
         dataProductType = (this.state.listProductType !== undefined ? this.state.listProductType : []).map(item => <Option value = {item.id} key = 'productType'> {item.name}</Option>)
         dataColor = colorOfProductType.map(item => <Option value = {item.colorId} key ='color'> {item.colorCode}</Option>)
         dataLength =[];
         dataLength = lengthOfProductType.map(item => <Option value = {item.id} key ='size'> {item.length}</Option>)
         dataSizeFrontal = sizeFrontalClosure.map(item => <Option value = {item} key ='frontal'> {item}</Option>)
          }
        } else {
         sizeFrontalClosure = Array.from(new Set((this.state.sizeOfProductType !== undefined ? this.state.sizeOfProductType : []).map(item => item.sizeFrontal)));
         dataProductType = (this.state.listProductType !== undefined ? this.state.listProductType : []).map(item => <Option value = {item.id} key = 'productType'> {item.name}</Option>)
         dataColor = (this.state.colorOfProductType !== undefined ? this.state.colorOfProductType : []).map(item => <Option value = {item.colorId} key ='color'> {item.colorCode}</Option>)
         dataLength =[];
         dataLength = (this.state.lengthOfProductType !== undefined ? this.state.lengthOfProductType : []).map(item => <Option value = {item.id} key ='size'> {item.length}</Option>)
         dataSizeFrontal = sizeFrontalClosure.map(item => <Option value = {item} key ='frontal'> {item}</Option>)
        }
        let { previewVisible, previewImage ,fileList} = this.state;
        if(this.state.update !== undefined){
        let listImage = ((this.state.update.urlImage !== undefined) ? this.state.update.urlImage : []).map((item,index) => (   
          {
             'uid' : this.state.update.ref_key[index],
             'name' : item,
             'url' : 'http://localhost:5000/getImage?image=images' + item,
             'status' :'done'
          } 
        ))
        fileList =listImage
        console.log(fileList)
        }
        const uploadButton = (
            <div>
              <Icon type = {this.state.loading ? "loading" : "plus"} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
          this.state.loading ? <Loading spinning = {this.state.loading}></Loading> 
          : (
            <div className="container">
                { this.state.mode === 'update' ?  
                <Input size="small" disabled  value = {this.state.idProductUpdate}  style={{ width: 250 }} /> :
                <Input size="small" disabled  value = {this.state.initData.idProduct}  style={{ width: 250 }} />
                }
                <div className="row">
                <Upload
                    {...this.uploaderProps}
                    beforeUpload={beforeUpload}
                    onChange={this.handleChangeUpload}
                    fileList={fileList}
                    onPreview={this.handlePreview}>
                    {uploadButton}
               </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
      </div>
        <div className="row">
      {this.state.mode === 'update' && this.state.update !== undefined ?
      <Select
              style={{ width: 200 }}
              placeholder="Select product type"
              optionFilterProp="children"
              defaultValue = {this.state.update.idProductType}
              onChange ={this.onChange}>
           {dataProductType}
      </Select>
      :
      <Select
      style={{ width: 200 }}
      placeholder="Select product type"
      optionFilterProp="children"
      onChange ={this.onChange}>
          {dataProductType}
      </Select>      
      }
      </div>
      <div className="row">
      {this.state.mode === 'update'  && this.state.update !== undefined?
        <Select
              style={{ width: 200 }}
              placeholder="Select color"
              optionFilterProp="children"
              defaultValue = {this.state.update.idColor}
              onChange ={this.onChange}>
           {dataColor}
      </Select>
      :
      <Select
      style={{ width: 200 }}
      placeholder="Select color"
      optionFilterProp="children"
      onChange ={this.onChange}>
        {dataColor}
    </Select>
    }
    </div>
      <div className ="row">
      {this.state.mode === 'update'  && this.state.update !== undefined ?
      <Select
          disabled = {this.state.isEnableFrontal}
          style={{ width: 200 }}
          placeholder="Select size frontal or closure"
          optionFilterProp="children"
          defaultValue = {this.state.update.frontal}
          onChange ={this.onChange}>
             {dataSizeFrontal}
      </Select>
      :
      <Select
      disabled = {this.state.isEnableFrontal }
      style={{ width: 200 }}
      placeholder="Select size frontal or closure"
      optionFilterProp="children"
      onChange ={this.onChange}>
         {dataSizeFrontal}
     </Select>
    }
      </div>
        <div className ="row">
        {this.state.mode === 'update'  && this.state.update !== undefined?
      <Select
          disabled = {this.state.isEnablelength}
          style={{ width: 200 }}
          placeholder="Select size"
          optionFilterProp="children"
          defaultValue = {this.state.update.idSize}
          onChange ={this.onChange}>
             {dataLength}
      </Select>
      :
      <Select
      disabled = {this.state.isEnablelength}
      style={{ width: 200 }}
      placeholder="Select size"
      optionFilterProp="children"
      onChange ={this.onChange}>
         {dataLength}
  </Select>
    }
        </div>
        <div className ="row">
        {this.state.mode === 'update'  && this.state.update !== undefined? 
         <Input size="small" defaultValue ={this.state.update.price} placeholder ="PRICE" style={{ width: 250 }} key = "price" onChange = {this.InputPriceChange}/>
         :   <Input size="small" placeholder ="PRICE" style={{ width: 250 }} key = "price" onChange = {this.InputPriceChange}/>
        }
        </div>
        <div className="row">
        <Input size="large" placeholder="INFO" style={{ width: 250 }} key = "info" onChange = {this.InputInfoChange}/>
        </div>
        <Button type="primary" onClick = {this.save}>Save</Button>
       </div>))
    }
}
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddProduct);