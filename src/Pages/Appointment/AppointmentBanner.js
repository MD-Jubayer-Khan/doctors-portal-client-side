import React, { useState } from 'react';
import img from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = () => {
    const [selected, setSelected] = useState(new Date())
    return (
        <div class="hero min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <img className='lg:w-3/6' src={img} alt=''/>
          <div className='border-2 lg:mx-20 rounded-xl drop-shadow-2xl'>
             <DayPicker 
                   mode="single"
                   selected={selected}
                   onSelect={setSelected}/>
          </div>
        </div>
      </div>
    );
};

export default AppointmentBanner;