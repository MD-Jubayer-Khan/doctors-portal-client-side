import React from 'react';
import auth from '../../firebase.init'
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const Login = () => {
    const [signInWithGoogle, user] = useSignInWithGoogle(auth)
    
    if(user){
        console.log(user);
    }

    return (
        <div className=' flex justify-center items-center mt-20'>
           <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="text-center text-2xl font-bold">Login</h2>

                <div className="divider">OR</div>
                <button
                onClick={()=> signInWithGoogle()}
                 className="btn btn-outline btn-secondary"
                 >Google signIn</button>
              </div>
            </div>
        </div>
    );
};

export default Login;