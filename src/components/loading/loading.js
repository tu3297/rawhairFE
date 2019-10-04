import React from 'react';
import { Spin  } from 'antd';
import '../../css/loader.css';
class Loading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <div className="loader">        
            <Spin class ="loader" spinning = {this.props.isLoading} size="large"></Spin>
        </div>

        )
    }
}
export default Loading;