"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const router = useRouter();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        {
          username,
          email,
          password,
        }
      );
      console.log(response.data);
      toast.success("🎉 Registration successful!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setUsername("");
      setEmail("");
      setPassword("");

      if (typeof window !== "undefined") {
        router.push("/auth/signin");
      }
    } catch (error: any) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      toast.error(
        "Registration failed. Username or email invalid or already taken",
        {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    }
  };

  return (
    <>
      <main className="container mx-auto grid grid-cols-2 overflow-y-hidden h-full">
        <div className="pl-20 py-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col h-full justify-center"
          >
            <label className="text-2xl sm:py-5 py-10 font-semibold">
              Sign Up
            </label>

            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              className="border w-96 p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label htmlFor="email" className="mb-1 mt-4">
              Email Address
            </label>
            <input
              className="border w-96 p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative w-96 mt-4">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="border w-full p-4 mb-6 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400 pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                onClick={handleTogglePassword}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center lg:max-w-sm bg-black my-5 rounded-lg py-4 text-white"
            >
              Sign Up
            </button>

            <p className="text-gray-400">
              Already have an account?
              <Link href="/auth/signin">
                <span className="ml-2 underline cursor-pointer hover:text-brandColor">
                  Login
                </span>
              </Link>
            </p>
          </form>
        </div>

        <section className="bg-teal-400 h-screen hidden sm:flex items-center flex justify-center px-5">
          <Image src="/fin 1.png" alt="sign up" width={400} height={200} />
        </section>
      </main>

      <ToastContainer />
    </>
  );
};

export default SignUp;