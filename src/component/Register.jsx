import React, { useState } from "react";
import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth'
import app from "../config/config";
const Register = () => {
    const [successMessage,setSuccessMessage]=useState('');
    const [error,setErrorMessage]=useState('');
    const auth=getAuth(app);

    const handleFormDetails=(event)=>{
        setSuccessMessage('');
        setErrorMessage('');
        event.preventDefault();
        console.log(event.target.name.value);
        const name=event.target.name.value;
        const password=event.target.password.value;
        const email=event.target.email.value;

        //validate the process
        if(password.length<6){
            setErrorMessage('Password Length must be above 6 digits');
            return;
        }
        else if(!/(?=.*[A-Z])/.test(password)){
            setErrorMessage('Password contain atleast one uppercase');
            return;
        }
        //console.log(name,password,email);
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            const loggedUser=result.user;
            verifyEmail(loggedUser);
            updateName(loggedUser,name);
            console.log(loggedUser);
            setSuccessMessage('Registration Successfull')
        })
        .catch(error =>{
            console.log(error.message);
        })  
    }

  const updateName=(user,name)=>{
    updateProfile(user,{
        displayName:name
    })
  }

  const verifyEmail=(user)=>{
    sendEmailVerification(user)
  .then((result) => {
        console.log(result);
        alert('verify your email')
  });
  }






  return (
    <div className="mt-8">
      <form onSubmit={handleFormDetails} className="w-1/2 mx-auto">
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="text"
            name="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <p className="text-2xl mt-4 text-green-600">{successMessage}</p>
        <p className="text-2xl mt-4 text-red-600">{error}</p>
      </form>
    </div>
  );
};

export default Register;
