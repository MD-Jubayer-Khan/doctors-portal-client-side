import React from 'react';
import { useQuery } from 'react-query';
import DoctorRow from './DoctorRow';

const ManageDoctor = () => {
    const {data: doctors, isLoading, refetch} = useQuery('doctors', ()=> fetch('http://localhost:5000/doctor',{
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if(isLoading){
        return <p>Loading...</p>
    }
    return (
        <div>
            <h2 className="text-2xl">All Users: {doctors.length}</h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                       {
                           doctors.map((doctor, index)=><DoctorRow
                           key={doctor._key}
                           doctor={doctor}
                           index={index}
                           refetch={refetch}
                           ></DoctorRow>)
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDoctor;