import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const AddDoctor = () => {
    const { register, handleSubmit, reset, formState: { errors } }= useForm();
    const {data: services, isLoading,} = useQuery('services', ()=> fetch('http://localhost:5000/service').then(res => res.json()))
     
    if(isLoading){
      return <p>Loading...</p>
    }


    const imageStorageKey ='f0e3bde59d2d4abb9a6d72e309319e96';

    const onSubmit = async data => {
          const image = data.image[0];
          const formData = new FormData();
          formData.append('image', image)
          const url =`https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
          fetch(url, {
            method: 'POST',
            body: formData
          })
          .then(res => res.json())
          .then(result =>{
            if(result.success){
              const img = result.data.url;
              const doctor = {
                name: data.name,
                email:data.email,
                specialty: data.specialty,
                img: img
              }
              fetch('http://localhost:5000/doctor', {
                method: 'POST',
                headers: {
                  'content-type' : 'application/json',
                  authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(doctor)
               })
               .then(res => res.json())
               .then(inserted => {
                if(inserted.insertedId){
                  toast.success('Doctor added successfully')
                }
               })
            }

          })
          
            reset()
    };

    return (
        <>   
        <h2 className='text-3xl text-center mt-7'>Add a new doctor</h2>
         <div className='flex justify-center items-center'>
             <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Name</span>
                      </label>
                      <input 
                      {...register("name", { 
                        required:{
                            value: true,
                            message: 'name required'
                        }
                    })}
                      type="name" placeholder="Enter your name" 
                      className="input input-bordered w-full max-w-xs" />
                      <label className="label">
                        {errors.name?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.name.message}</span>} 
                       
                      </label>
                    </div>

                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input 
                      {...register("email", { 
                        required:{
                            value: true,
                            message: 'email required'
                        },
                        pattern: {
                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                            message: 'Please enter a valid email'
                        }
                        
                    })}
                      type="email" placeholder="Enter your email" 
                      className="input input-bordered w-full max-w-xs" />
                      <label className="label">
                        {errors.email?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.email.message}</span>} 
                        {errors.email?.type === 'pattern' &&  <span class="label-text-alt text-red-500">{errors.email.message}</span>} 
                       
                      </label>
                    </div>


                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Specialty</span>
                      </label>
                      <select {...register("specialty")} className="select input-bordered w-full max-w-xs mb-4">
                               {
                                services.map((service)=> <option key={service._id} value={service.name}> {service.name}</option>)
                               }
                             </select>     
                    </div>

                    <div className="form-control w-full max-w-xs">
                      <label className="label">
                        <span className="label-text">Photo</span>
                      </label>
                      <input 
                      {...register("image", { 
                        required:{
                            value: true,
                            message: 'image required'
                        }
                    })}
                      type="file"
                      className="input input-bordered w-full max-w-xs p-2" />
                      <label className="label">
                        {errors.image?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.image.message}</span>} 
                       
                      </label>
                    </div>
                       <input className='btn w-full max-w-xs' type="submit" value="Add"/>
              </form>
        </div>
        </>
    );
};

export default AddDoctor;