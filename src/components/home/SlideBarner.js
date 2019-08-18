import { Carousel } from 'antd';
import React, {Component} from 'react';
class SlideBar extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container">
            <Carousel autoplay>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
          </div>
        );
    }
}
export default SlideBar;