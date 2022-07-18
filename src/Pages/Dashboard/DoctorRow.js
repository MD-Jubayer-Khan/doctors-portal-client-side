import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({doctor, index, refetch}) => {
const { name, email, specialty, img} = doctor;

const handleDelete = email => {
    fetch(`http://localhost:5000/doctor/${email}`,{
        method:'delete',
        headers:{
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        if(data.deletedCount){
            toast(`Doctor ${name} deleted successfully`)
            refetch()
        }
    });

}
    return (
       <tr>
            <th>{index + 1}</th>
            <td>
                <div class="avatar">
                    <div class="w-14 rounded-full ">
                      <img src={img} alt={name} />
                    </div>
                </div>
            </td>
            <td>{name}</td>
            <td>{specialty}</td>
            <td><button onClick={()=>handleDelete(email)} class="btn btn-xs btn-error">Remove Doctor</button></td>
        </tr>
    );
};

export default DoctorRow;