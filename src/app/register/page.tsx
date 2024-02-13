"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const {push} = useRouter()

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestPayload = {
        fullname:e.currentTarget.fullname.value,
        email:e.currentTarget.email.value,
        password:e.currentTarget.password.value,
    }
    console.log('requestPayload',requestPayload)
   
    try{
      const {data} = await axios.post("/api/auth/register", requestPayload);
        console.log('request data >>', data)
      push("/")
    } catch(err) {

      console.error('login error',err as AxiosError)
    }

  };


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mt-2">Fill all fields to register</h1>
      <form onSubmit={handleOnSubmit} className="grid gap-y-4">
      <div className="flex gap-x-1">
          <label htmlFor="fullname">Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required
            className="border rounded border-slate-700"
          />
        </div>
        <div className="flex gap-x-1">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            className="border rounded border-slate-700"
          />
        </div>
        <div className="flex gap-x-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border rounded border-slate-700"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-orange-600 text-white w-fit rounded"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage