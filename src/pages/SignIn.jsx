import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import {
  Google,
  facebook,
  hope,
  hope_ui,
  instagram,
  linkedin,
} from "../assets/img";
import axios from "../api/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("email format is not valid")
      .required("email is required"),
    password: yup.string().min(4).max(15).required("password is required"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  const fetchLogin = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(`/api/auth/login`, data);

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        // alert("logged in Successfuly");
        setLoading(false);
      } else {
        console.error("Authentication failed");
      }
    } catch (error) {
      console.log("Login failed");
    }
  };

  if (loading === true) {
    return <h1 className="text-3xl font-semibold ml-[53rem]">Loading...</h1>;
  }

  return (
    <div className="flex bg-slate-100">
      <div>
        <di className="absolute">
          <img src={hope_ui} alt="" className="w-[10rem] h-10 mt-10 ml-10" />
        </di>
        <img src={hope} alt="" className="h-screen w-[80rem]" />
      </div>
      <form
        onSubmit={handleSubmit(fetchLogin)}
        className="flex flex-col ml-[16rem] mr-80 mb-12 mt-28 gap-1 bg-white shadow-slate-300 shadow-sm w-[55rem] h-[40rem] rounded-xl p-3"
      >
        <div className="pb-16 ml-5 mt-8">
          <div>
            <h2 className="text-3xl ml-48">Sign In</h2>
            <h2 className="text-lg ml-32 mt-2">Sign In to stay Connected</h2>
          </div>

          <div className="flex flex-col mt-4 gap-5">
            <div>
              <span className="flex flex-col gap-1">
                <label>Email </label>
                <input
                  type="text"
                  {...register("email")}
                  className=" bg-[#F9F9F9] placeholder:text-slate-400 p-3 mr-1 rounded-lg w-[30rem]"
                  placeholder="xyz@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              <p className="text-red-400 ml-2">{errors.email?.message}</p>
            </div>

            <div>
              <span className="flex flex-col gap-1">
                <label>Password</label>
                <input
                  type="password"
                  {...register("password")}
                  className=" bg-[#F9F9F9] placeholder:text-slate-400 p-3 mr-1 rounded-lg w-[30rem]"
                  placeholder="xxxxxx"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </span>
              <p className="text-red-400 ml-2">{errors.password?.message}</p>
            </div>
          </div>

          <div className="flex mt-6 gap-4 ">
            <input type="checkbox" />
            <p>Remember Me ?</p>
            <a className="text-sky-600 ml-[12rem]">Forget Password</a>
          </div>
          <button
            type="submit"
            className="p-1 mr-1 rounded-lg w-28 h-12 ml-48 mt-10 bg-blue-700 text-white text-xl "
          >
            Sign In
          </button>
        </div>

        <div className="flex flex-col">
          <h2 className="relative bottom-10 text-center">
            or Sign In with other Account?
          </h2>

          <div className="flex justify-center gap-3 ">
            <img src={Google} alt="" />
            <img src={facebook} alt="" className="h-6 mt-1" />
            <img src={instagram} alt="" />
            <img src={linkedin} alt="" />
          </div>

          <h2 className="text-center mt-3">
            Don't have an account?
            <Link className="text-blue-600 ml-1" to="/signUp">
              Click here to SignUp
            </Link>
          </h2>
        </div>
      </form>
    </div>
  );
};
