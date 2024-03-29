"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const {push} = useRouter()

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requestPayload = {
      email:e.currentTarget.email.value,
      password:e.currentTarget.password.value,
    }
    console.log('requestPayload',requestPayload)
   
    try{
      const {data} = await axios.post("/api/auth/login", requestPayload);

      push("/dashboard")
    } catch(err) {

      console.error('login error',err as AxiosError)
    }

  };


  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="mt-2">JWT Cookie based NextJS Auth</h1>
      <form onSubmit={handleOnSubmit} className="grid gap-y-4">
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
          Submit
        </button>
      </form>
    </div>
  );
}
