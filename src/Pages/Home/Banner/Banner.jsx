import React from 'react'
// import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import bannerImg1 from '../../../assets/banner/banner1.png';
// import bannerImg2 from '../../../assets/banner/banner2.png';
// import bannerImg3 from '../../../assets/banner/banner3.png';
// import bannerImg4 from '../../../assets/banner/banner4.png';

import bannerImg1 from '../../../assets/banner6.png'
import bannerImg2 from '../../../assets/banner2.png'

import bannerImg4 from '../../../assets/banner4.png'
import { Carousel } from 'react-responsive-carousel';

const Banner = () => {
    return (
        <div >

            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                dynamicHeight={true}
                

            >
                <div>
                    <img src={bannerImg1} />

                </div>
                <div>
                    <img src={bannerImg2} />

                </div>
                
                <div>
                    <img src={bannerImg4} />

                </div>
            </Carousel>

        </div>
    )
}

export default Banner
