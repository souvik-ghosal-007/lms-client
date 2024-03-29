import { Dashboard } from "@mui/icons-material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar/Navbar";

const EditUser = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  async function fetchData() {
    try {
      const res = await axios.get(
        `https://lms-server-tktv.onrender.com/users/${id}`,
      );

      const user = res.data[0];
      console.log(res.data[0]);

      setName(user.user_name);
      setEmail(user.user_email);
      setPassword(user.user_password);
      setRole(user.user_role);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  useEffect(() => {
    fetchData();
    return;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.put(
      `https://lms-server-tktv.onrender.com/users/${id}`,
      {
        user_id: userId,
        user_name: name,
        user_email: email,
        user_password: password,
        user_role: role,
      },
    );
  };

  return (
    <>
      <Navbar />
      <div className='w-[1024px] flex flex-col justify-center items-center gap-10 overflow-hidden h-full'>
        <h2 className='text-4xl pt-10 text-center font-extrabold dark:text-grey-600'>
          Edit User :<span className='text-red-600 pl-3'>{id}</span>
        </h2>
        <div className='h-screen flex flex-row justify-center'>
          <form className=' mx-auto w-[400px]' onSubmit={handleSubmit}>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='number'
                name='userid'
                id='userid'
                value={id}
                onChange={(e) => setUserId(e.target.value)}
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                required
              />
              <label
                htmlFor='userid'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                User Id
              </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='text'
                name='username'
                id='username'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                required
              />
              <label
                htmlFor='username'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                User Name
              </label>
            </div>
            <div className='relative z-0 w-full mb-5 group'>
              <input
                type='email'
                name='userEmail'
                id='userEmail'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                required
              />
              <label
                htmlFor='userEmail'
                className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
              >
                User Email
              </label>
            </div>
            <div className='grid  md:gap-6'>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='password'
                  name='userPassword'
                  id='userPassword'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  required
                />
                <label
                  htmlFor='userPassword'
                  className='peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  User Password
                </label>
              </div>
            </div>
            <div className='grid md:gap-6'>
              <div className='relative z-0 w-full mb-5 group'>
                <input
                  type='text'
                  name='userRole'
                  id='userRole'
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
                  required
                />
                <label
                  htmlFor='userRole'
                  className='peer-focus:font-medium absolute text-sm text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
                >
                  User Role
                </label>
              </div>
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
