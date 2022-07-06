import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
import { success } from 'daisyui/src/colors';


const BookingModal = ({date, treatment, setTreatment}) => {
    const {_id, name, slots} = treatment;
    const [user] = useAuthState(auth);
    const formattedDate = format(date, 'PP')

    const handleSubmit = event =>{
        event.preventDefault();
        const slot = event.target.slot.value;

        const booking = {
          treatmentId : _id,
          treatment : name,
          slot,
          date: formattedDate,
          patient: user.email,
          patientName: user.displayName,
          phone: event.target.phone.value

        }

        fetch('http://localhost:5000/booking', {
          method: 'post',
          headers:{
            'content-type' : 'application/json'
          },
          body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if(data.success){
            toast(`Appointment is set on, ${formattedDate} at ${slot}`)
          }
          else{
            toast.error(`Already have an appointment on, ${formattedDate} at ${slot}`)
          }

        })

        setTreatment(null);

    };

    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box">
                  <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary text-center mb-2">Booking for{name}</h3>
                        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 justify-items-center'>
                             <input type="text" disabled value={format(date, 'PP')} className="input input-bordered input-secondary w-full max-w-xs" />
                             <select name='slot' className="select select-secondary w-full max-w-xs">
                               {
                                slots.map((slot, index )=> <option key={index} value={slot}> {slot}</option>)
                               }
                             </select>
                             <input type="text" name='name' disabled value={user?.displayName || ''} className="input input-bordered input-secondary w-full max-w-xs" />
                             <input type="email" name='email' disabled value={user?.email} className="input input-bordered input-secondary w-full max-w-xs" />
                             <input type="text" name='phone' placeholder="your number" className="input input-bordered input-secondary w-full max-w-xs" />
                             <input type="submit" value="submit" className="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary w-full max-w-xs" />
                        </form>
                  </div>
                </div>
        </div>
    );
};

export default BookingModal;