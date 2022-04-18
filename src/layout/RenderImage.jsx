import React from 'react';
import './RenderImage.css'

class RenderImage extends React.Component {
    render() { 
        return(
            <div className='render-image'>
                <img src={this.props.Image} alt="GIF" />
                {/* <video src={Mov} autoPlay loop></video> */}
            </div>
        );
    }
}
 
export default RenderImage;