import React from 'react';
import img from '../../assets/images/chair.png';
import bgImg from '../../assets/images/bg.png';


const Banner = () => {
    return (
        <div style={{backgroundImage: `url(${bgImg})`}} className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img className='lg:w-3/6' src={img} alt=''/>
            <div>
              <h1 className="text-5xl font-bold">Your New Smile Starts Here</h1>
              <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
              <button className="btn btn-primary text-white uppercase font-bold bg-gradient-to-r from-secondary to-primary">Get Started</button>
            </div>
          </div>
        </div>
    );
};

export default Banner;