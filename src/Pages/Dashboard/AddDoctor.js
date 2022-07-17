import React from 'react';
import { useForm } from 'react-hook-form';

const AddDoctor = () => {
    const { register, handleSubmit, formState: { errors } }= useForm();

    const onSubmit = async data => {
            console.log('data', data);
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
                        <span className="label-text">Password</span>
                      </label>
                      <input 
                      {...register("specialty", { 
                        required:{
                            value: true,
                            message: 'specialty required'
                        }                  
                    })}
                      type="text" placeholder="Enter your specialty" 
                      className="input input-bordered w-full max-w-xs" />
                      <label className="label">
                        {errors.specialty?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.specialty.message}</span>} 
                       
                      </label>
                    </div>
                       <input className='btn w-full max-w-xs' type="submit" value="Add"/>
              </form>
        </div>
        </>
    );
};

export default AddDoctor;