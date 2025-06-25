import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';

const Register = () => {
  const { createUser, setUser, updateUser } = use(AuthContext);
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate()
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
     const password = form.password.value;
    if (name.length < 6) {
      setNameError("Name Should be more than 6 characters");
      return;
    } else {
      setNameError("");
    }
    const passwordRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegEx.test(password)) {
      toast.error("Password must have at least 1 uppercase letter, 1 lowercase letter,1 special characters and be at least 6 characters long.");
      return;
    }
    const photo = form.photo.value;
    const email = form.email.value;
   
    console.log(name, photo, email, password);
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser(result.user,{ displayName: name, photoURL: photo }).then(() => {
          setUser({...user,displayName: name, photoURL: photo});
           navigate('/')
          toast.success("User created successfully!");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        toast.error(`Error (${errorCode}): ${errorMessage}`);
      })
      .catch((error,user) => {
        setUser(user)
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Error (${errorCode}): ${errorMessage}`);
      });
  };
  return (
    <div className="card mx-auto m-7 max-w-md p-8 space-y-3 rounded-xl bg-gradient-to-r from-green-200 via-lime-200 to-amber-100  shadow-lgl">
      <Helmet>
              <title>GardenHub | Register</title>
            </Helmet>
      <div className="card-body">
        <form onSubmit={handleRegister} className="fieldset">
          <h1 className="text-5xl font-bold text-green-500">Register now!</h1>
          <label className="label">Name</label>
          <input
            type="name"
            name="name"
            className="input"
            placeholder="Name"
            required
          />
          {nameError && <p className="text-xs text-error">{nameError}</p>}
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            required
          />
          <label className="label">PhotoURL</label>
          <input
            type="text"
            name="photo"
            className="input"
            placeholder="Enter PhotoURL"
            required
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            required
          />
          <p className="text-sm text-center sm:px-6 dark:text-gray-600 pt-5">
            Already have an account?
            <Link
              to="/auth/login"
              rel="noopener noreferrer"
              href="#"
              className="underline text-green-500"
            >
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="block  w-full btn p-3 text-center px-6 py-3 text-white font-semibold rounded-full shadow-md 
                bg-gradient-to-r from-green-500 via-lime-400 to-amber-300 
                hover:from-green-600 hover:via-lime-500 hover:to-yellow-400 
                transition-all duration-300 ease-in-out"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
