import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user.slice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(store => store.user)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState({
    username: '',
    password: ''
  })

  const onChangeHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value})
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      })

      if (response?.data?.success){
        toast.success(response?.data?.message)
        dispatch(setUser(response?.data?.data))
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response ? error?.response?.data?.message : error?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!user) return;
    navigate('/')
  }, [navigate, user])

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 ">
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
              name='username'
              value={input.username}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
              name='password'
              value={input.password}
              onChange={onChangeHandler}
            />
          </div>
          <div className="flex items-center justify-center gap-2 my-2">
            <p>Don't have an account? </p>
            <Link to="/register" className="cursor-pointer underline font-medium">
              SignUp
            </Link>
          </div>
          <div>
            {loading ? (
              <>
                <button className="btn w-full">
                  <span className="loading loading-spinner"></span>
                  loading
                </button>
              </>
            ) : (
              <>
                <button className="btn w-full bg-white text-black border-[#e5e5e5]">
                  Login 
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
