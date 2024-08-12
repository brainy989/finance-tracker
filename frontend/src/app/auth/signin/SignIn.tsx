"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (!email || !password) {
        throw new Error("Please fill in all fields.");
      }
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password,
        }
      );
      console.log(response.data);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Save user information in local storage
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to the dashboard page
      if (typeof window !== "undefined") {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Invalid login details", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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
              Sign In
            </label>

            <label htmlFor="email" className="mb-1 mt-4">
              Email Address
            </label>
            <input
              className="border w-96 p-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-400"
              placeholder="Enter your email address"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Sign in
            </button>

            <p className="text-gray-500">
              Don&apos;t have an account?
              <Link href="/">
                <span className="ml-2 underline cursor-pointer hover:text-brandColor">
                  Sign Up
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

export default SignIn;
