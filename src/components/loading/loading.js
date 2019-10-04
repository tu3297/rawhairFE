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
            <Spin style = {{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   margintop: '-50px',
                   marginleft: '-50px',
                   width: '100px',
                   height: '100px'
            }}
            spinning = {this.props.isLoading} size="large"></Spin>
        </div>

        )
    }
}
export default Loading;