import { Modal } from 'antd';
import { Input ,Button,Radio,DatePicker  } from 'antd';
import React, {Component} from 'react';
import '../../css/modal.css';
class LoginModal extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            modal2Visible: props.location.state.modal,
            viewType : true,
            forgotPass : false
        }
    }
  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  changeType = () =>{
         this.setState({viewType :false});
  }
  forGotPass = () =>{
    this.setState({forGotPass :!this.state.forGotPass});
  }
  onChange = (date, dateString) => {
    console.log(date, dateString);
  }
  back = ()=>{
    this.setState({viewType :true});
  }
  render() {
    return (
      this.state.viewType ?
      <div>
        <Modal
          centered
          visible={this.state.modal2Visible}
          footer={[
            null,
            null,
          ]}
          onCancel={() => this.setModal2Visible(false)}>
          <div class="main-modal">
             <div class="main-modal-left">
                <img src ="/img/imghair.png"></img>
             </div>
             <div class ="main-modal-right">
                <form class="login">
                   <p>Đăng Nhập</p>
                   <Input placeholder="User Name" />
                   <Input placeholder="Password" />
                   <Button type="primary"> Login</Button>
                </form>
                <div class ="register">
                <button class="forgot-pass"  onClick={this.forGotPass}>Forgot password</button>
                <span>Do not have an account?</span>
                <Button  class="btn-res" type="default" onClick={this.changeType}> Create new account</Button>
                </div>
                {this.state.forGotPass ? 
              <div class="reset-password">
                  <p class="forgot-p2">Mật khẩu mới sẽ được gửi về email:</p>
                  <Input placeholder="Type your Email.."></Input>
                  <Button type="primary"> Reset</Button>
              </div>
              : null }
             </div>
          </div>
        </Modal>
      </div> : 
      <div>
        <Modal
        visible={this.state.modal2Visible}
        centered
        footer={[
          null,
          null,
        ]}
        onCancel={() => this.setModal2Visible(false)}>
        <Button type="link" onClick={this.back}>Back</Button>
        <form class="form-register">
        <Input placeholder="Email*" />
        <Input placeholder="Password*" />
        <Input placeholder=" Repeat Password*" />
        <p class="info">Infomartion</p>
        <Input placeholder="First Name*" />
        <Input placeholder="Last Name*" />
        <DatePicker class="date" placeholder="Date (dd/mm/yyyy)*" onChange={this.onChange} size="default" />
        <Input placeholder="Phone*" />
        <Radio.Group  defaultValue="Man">
        <Radio.Button value="Man">Men</Radio.Button>
        <Radio.Button value="Woman">Woman</Radio.Button>
        </Radio.Group>
        <Button  class="btn-res" type="primary"> Register</Button>
        <p>* is valid</p>
        </form>
        </Modal>
      </div>
    );
  }
}
export default LoginModal;