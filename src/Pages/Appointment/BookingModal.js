import { format } from 'date-fns';
import React from 'react';


const BookingModal = ({date, treatment, setTreatment}) => {
    const {name, slots} = treatment;

    const handleSubmit = event =>{
        event.preventDefault();
        const slot = event.target.slot.value;
        console.log(slot, name);
        setTreatment(null)
    }

    return (
        <div>
            <input type="checkbox" id="my-modal-6" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                  <div class="modal-box">
                  <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg text-secondary text-center mb-2">Booking for{name}</h3>
                        <form onSubmit={handleSubmit} className='grid grid-cols-1 gap-3 justify-items-center'>
                             <input type="text" disabled value={format(date, 'PP')} class="input input-bordered input-secondary w-full max-w-xs" />
                             <select name='slot' class="select select-secondary w-full max-w-xs">
                               {
                                slots.map(slot => <option value={slot}> {slot}</option>)
                               }
                             </select>
                             <input type="text" name='name' placeholder="your name" class="input input-bordered input-secondary w-full max-w-xs" />
                             <input type="email" name='email' placeholder="your email" class="input input-bordered input-secondary w-full max-w-xs" />
                             <input type="text" name='phone' placeholder="your number" class="input input-bordered input-secondary w-full max-w-xs" />
                             <input type="submit" value="submit" class="btn btn-primary uppercase text-white font-bold bg-gradient-to-r from-secondary to-primary w-full max-w-xs" />
                        </form>
                  </div>
                </div>
        </div>
    );
};

export default BookingModal;