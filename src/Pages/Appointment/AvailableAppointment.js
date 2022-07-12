import { format } from 'date-fns';
// import servicesData from '../../ServicesData/services.json'
import React, { useEffect, useState } from 'react';
import Service from './Service';
import BookingModal from './BookingModal';
import { useQuery } from 'react-query';

const AvailableAppointment = ({date}) => {
    const [treatment, setTreatment] = useState(null)

    const formattedDate = format(date, 'PP');

    // useEffect(()=>setServices(servicesData), [])
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/available?date=${formattedDate}`)
    //     .then(res => res.json())
    //     .then(data => setServices(data))
    // },[formattedDate])
    const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () => fetch(`http://localhost:5000/available?date=${formattedDate}`)
        .then(res => res.json()))

    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <div>
            <h4 className='text-xl text-secondary text-center'>Available appointment on {format(date, 'PP')}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service => <Service key={service._id} service={service}
                    setTreatment={setTreatment}></Service>)
                }
            </div>
            {treatment &&  <BookingModal 
            date={date} 
            treatment={treatment}
            setTreatment={setTreatment}
            refetch = {refetch}
            ></BookingModal>}
        </div>
    );
};

export default AvailableAppointment;