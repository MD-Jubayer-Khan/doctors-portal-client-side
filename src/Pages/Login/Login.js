import React from 'react';
import auth from '../../firebase.init'
import { useForm } from "react-hook-form";
import { useSignInWithGoogle, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const [signInWithGoogle, gUser] = useSignInWithGoogle(auth);
    const { register, handleSubmit, formState: { errors } }= useForm();

    const [
      signInWithEmailAndPassword,
      user,
      loading,
      error,
    ] = useSignInWithEmailAndPassword(auth);

    let errorElement;  

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/'
    
    if(gUser || user){
        navigate(from, { replace: true})
    };

    if(error){
      errorElement = <p className='text-red-500'>{error?.message}</p>
    };
    
    if(loading){
      return <p>Loading...</p>
    }
    const onSubmit = data => {
        console.log(data);
        signInWithEmailAndPassword(data.email, data.password)
    };

    return (
        <div className=' flex justify-center items-center mt-20'>
           <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("password", { 
                        required:{
                            value: true,
                            message: 'password required'
                        },
                        minLength: {
                            value: 6,
                            message: 'password must contain at last six characters'
                        }
                        
                    })}
                      type="password" placeholder="Enter your password" 
                      className="input input-bordered w-full max-w-xs" />
                      <label className="label">
                        {errors.password?.type === 'required' &&  <span class="label-text-alt text-red-500">{errors.password.message}</span>} 
                        {errors.password?.type === 'minLength' &&  <span class="label-text-alt text-red-500">{errors.password.message}</span>} 
                       
                      </label>
                    </div>
                    {errorElement}
                       <input className='btn w-full max-w-xs' type="submit" value="Login"/>
                      <small>  <p className='mt-4'>New to doctors portal?  <Link to="/signup" className='text-secondary'> Sign up</Link></p></small>
                    </form>
                   
                <div className="divider">OR</div>
                <button
                onClick={()=> signInWithGoogle()}
                 className="btn btn-outline btn-secondary"
                 >Google sign In</button>
              </div>
            </div>
        </div>
    );
};

export default Login;