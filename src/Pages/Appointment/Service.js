import React from 'react';

const Service = ({service, setTreatment}) => {
    const {name, slots} = service;
    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-secondary  justify-center">{name}</h2>
            <p className=' text-center'>
                {
                    slots.length ? <span>{slots[0]}</span>
                    : <span className='text-red-500'>No slot Available</span>
                }
            </p>
            <p className=' text-center'>{slots.length} {slots.length > 1 ? 'spaces': 'space'} Available</p>
            <div class="card-actions justify-center">
            <label for="my-modal-6"
             onClick={()=> setTreatment(service)}  disabled={slots.length === 0}
             className='btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary'>Book Appointment</label>
            </div>
          </div>
        </div>
    );
};

export default Service;