import React from 'react';
import RenderImage from './RenderImage';
import Main from './../view/Main';
import './MainSection.css'
import Image from './../images/apes1.jpeg'

class MainSection extends React.Component {
    render() {
        return (
            <div className='upper-div'>
                <div className='main-section'>
                    <Main />
                </div>
            </div>
        );
    }
}

export default MainSection;