import React  from 'react';

import './RenderHeader.css';

const RenderHeader = (props) => {
    const {Header} =props

    return (
        <div className='render-header'>
            <img src={Header} alt="Logo" style={{ 'width': '100%' }} />
        </div>
    );
}

export default RenderHeader;