import React from 'react';
import { Spin  } from 'antd';
class Loading extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
        <Spin spinning = {this.props.isLoading} size="large">
        </Spin>
        )
    }
}
export default Loading;