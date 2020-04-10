import React from 'react';

class Splash extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <>
            
            <div className='splash-wrapper'>
                <div className='splash-1-left'>
                    <p className='splash-1-left-p-1'>WORK FROM HOME</p>
                    <h1 className='splash-1-left-h1'>Slick brings the team together, wherever you are</h1>
                    <p className='splash-1-left-p-2'>With all of your communication and tools in one place, remote teams will stay productive no matter where you're working from.</p>
                    <button className='splash-1-left-button-1'>LEARN MORE</button>
                    <button className='splash-1-left-button-2'>CONTACT US</button>
                </div>

                <img
                className='splash-1-img'
                src={splash1}/>

            </div>
            
            <div className='splash-wrapper-2'>
                <video class="c-youtube-video--showcase__video" autoplay="" loop="" muted="" playsinline="" poster={splashVideoPoster}><source src="/marketing/img/homepage/video/brand-campaign_inline-video.mp4" type="video/mp4"/></video>
            </div>
            <div className='splash-wrapper-3'></div>
            </>
        )
    }
}

export default Splash