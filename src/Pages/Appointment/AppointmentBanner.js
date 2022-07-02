import React from 'react';
import img from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import bgImg from '../../assets/images/bg.png'

const AppointmentBanner = ({date, setDate}) => {

    return (
        <div style={{backgroundImage: `url(${bgImg})`}} class="hero min-h-screen sm:mx-auto">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img className='lg:w-3/6' src={img} alt=''/>
          <div className='lg:mx-20 bg-[#fefeff] rounded-xl shadow-lg'>
             <DayPicker 
                   mode="single"
                   selected={date}
                   onSelect={setDate}/>
          </div>
        </div>
      </div>
    );
};

export default AppointmentBanner;