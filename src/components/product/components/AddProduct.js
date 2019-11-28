import React,{ Component } from 'react';
import { Upload, Icon, Modal,message } from 'antd';
import { Select ,Input} from 'antd';
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
const fetch = window.fetch.bind(window);
class AddProduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList : []
        };
        this.uploaderProps = {
        name : "file",
        listType :"picture-card",
        className : "avatar-uploader",
        showUploadList : true,
        action : 'http://localhost:5000/upload',
        data : (file) => new FormData().append('file', file)
       }
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
    render(){
        console.log('upload')
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? "loading" : "plus"} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        return (
            <div className="container">
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
              showSearch
              style={{ width: 200 }}
              placeholder="Select product type"
              optionFilterProp="children">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
           <Option value="tom">Tom</Option>
      </Select>
      </div>
      <div className ="row">
      <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select color"
              optionFilterProp="children">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
           <Option value="tom">Tom</Option>
      </Select>
        </div>
        <div className ="row">
      <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select size"
          optionFilterProp="children">
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
           <Option value="tom">Tom</Option>
      </Select>
        </div>
        <div className ="row">
        <Input size="large" placeholder="large size" />
        </div>
       </div>)
    }

}
export default AddProduct;